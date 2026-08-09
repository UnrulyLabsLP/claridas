#!/usr/bin/env bash
# Claridas deploy — build from a CLEAN detached worktree pinned to committed main, then
# push the static dist/ to the gh-pages branch.
# Least-privilege: no CI, no workflow scope. Serves via GitHub Pages (gh-pages branch).
# Usage: ./deploy.sh <git-remote-url>
#   e.g. ./deploy.sh https://<fine-grained-PAT>@github.com/UnrulyLabsLP/claridas.git
# The token is passed in / lives in a configured remote — NEVER hardcoded here.
#
# BYPASS-CLOSE (Vista): the live site is built from a persistent DETACHED WORKTREE reset to
# the committed `main` ref — NOT from the repo working tree. This guarantees only COMMITTED
# content ships; uncommitted gated WIP in REPO_DIR can never be auto-published by the grid.
set -euo pipefail
REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
REMOTE="${1:-$(git -C "$REPO_DIR" remote get-url origin 2>/dev/null || true)}"
[ -n "$REMOTE" ] || { echo "usage: ./deploy.sh <git-remote-url>  (or configure origin)"; exit 1; }

# ── Single-deploy lock (mirrors pod-runner's .pod.lock; mkdir is atomic) ────────────────
# At an hourly cadence two deploys must never race the gh-pages push or the shared build
# worktree. If the lock is held, SKIP LOUDLY and exit non-zero-but-benign so pod-runner logs
# "committed but not live; next tick recovers" (it does NOT hard-fail the pod).
DEPLOY_LOCK="${REPO_DIR}/.deploy.lock"
# Clear a stale lock (>30 min = a crashed/killed deploy) so the grid can't deadlock.
[ -d "$DEPLOY_LOCK" ] && [ -n "$(find "$DEPLOY_LOCK" -maxdepth 0 -mmin +30 2>/dev/null)" ] && rmdir "$DEPLOY_LOCK" 2>/dev/null
if ! mkdir "$DEPLOY_LOCK" 2>/dev/null; then
  echo "⚠ DEPLOY SKIP — another deploy holds .deploy.lock (concurrent deploy in progress)."
  echo "  committed but not live; next tick recovers."
  exit 3
fi
trap 'rmdir "$DEPLOY_LOCK" 2>/dev/null' EXIT

# ── Detached build worktree pinned to committed main ────────────────────────────────────
# A sibling path so it never lives inside REPO_DIR (avoids self-nesting / rsync recursion).
BUILD_WT="${REPO_DIR}/../claridas-build-wt"

# Prune any stale worktree registration (e.g. from a prior crash) so `worktree add` is clean.
git -C "$REPO_DIR" worktree prune 2>/dev/null || true

# Create the detached worktree if absent. If the dir exists but is corrupt / not a registered
# worktree, tear it down, prune, and recreate — never build from a half-broken tree.
if [ ! -d "$BUILD_WT/.git" ] && [ ! -f "$BUILD_WT/.git" ]; then
  rm -rf "$BUILD_WT" 2>/dev/null || true
  git -C "$REPO_DIR" worktree prune 2>/dev/null || true
  git -C "$REPO_DIR" worktree add --detach "$BUILD_WT" main
fi

# CRITICAL (Vista): reset to the BRANCH ref `main`, NOT `HEAD`. A detached worktree's HEAD
# does not advance when main gets new commits, so `reset --hard HEAD` would rebuild STALE
# content (missing the newest article). Resetting a detached HEAD to a branch ref is allowed
# and is exactly the point — it fast-forwards this worktree to the tip of LOCAL committed
# main (the pod's just-committed tip). NEVER reset to origin/main — origin intentionally
# lags, and resetting to it would rebuild stale content (the exact bug this avoids).
git -C "$BUILD_WT" reset --hard main
# Drop stray untracked files but PRESERVE node_modules (avoids re-install cost hourly).
git -C "$BUILD_WT" clean -fd -e node_modules -e .deps.lockhash

# ── Dependencies: npm ci only when needed ───────────────────────────────────────────────
# Run `npm ci` if node_modules is absent OR if package-lock.json changed since the last build
# (never silently reuse stale deps on a lockfile bump). Otherwise reuse node_modules.
LOCK_HASH_FILE="$BUILD_WT/.deps.lockhash"
CUR_LOCK_HASH=""
if [ -f "$BUILD_WT/package-lock.json" ]; then
  CUR_LOCK_HASH=$(shasum -a 256 "$BUILD_WT/package-lock.json" 2>/dev/null | awk '{print $1}')
fi
PREV_LOCK_HASH=""
[ -f "$LOCK_HASH_FILE" ] && PREV_LOCK_HASH=$(cat "$LOCK_HASH_FILE" 2>/dev/null || true)

if [ ! -d "$BUILD_WT/node_modules" ] || [ "$CUR_LOCK_HASH" != "$PREV_LOCK_HASH" ]; then
  echo "→ installing deps in build worktree (npm ci — node_modules missing or lockfile changed)…"
  ( cd "$BUILD_WT" && npm ci )
  [ -n "$CUR_LOCK_HASH" ] && printf '%s' "$CUR_LOCK_HASH" > "$LOCK_HASH_FILE"
else
  echo "→ reusing existing node_modules (lockfile unchanged)."
fi

echo "→ building from detached worktree pinned to committed main…"
( cd "$BUILD_WT" && npm run build )

# Fault-tolerant rail: only deploy if the build produced output + the CNAME.
# ALL dist/ paths below point at $BUILD_WT/dist — NOT REPO_DIR/dist.
[ -f "$BUILD_WT/dist/index.html" ] || { echo "ABORT: build produced no dist/index.html"; exit 1; }
[ -f "$BUILD_WT/dist/CNAME" ] || echo "claridas.com" > "$BUILD_WT/dist/CNAME"
# GitHub Pages runs Jekyll, which strips any folder starting with "_" — including
# Astro's _astro/ asset dir (all CSS/JS). .nojekyll disables Jekyll so assets serve.
# Without this the site renders UNSTYLED (every _astro/*.css 404s). MANDATORY.
touch "$BUILD_WT/dist/.nojekyll"

echo "→ publishing dist/ to gh-pages (INCREMENTAL — no branch teardown, no 404 window)…"
# Force-pushing a fresh branch every deploy made GitHub tear down + rebuild the site,
# opening a brief 404 window each deploy (bad at a packed hourly cadence). Instead we
# update the existing gh-pages IN PLACE and do a NORMAL push, so Pages serves the old
# build until the new one is ready — no teardown, no 404.
TMP="$(mktemp -d)"
if git clone -q --depth 1 --branch gh-pages --single-branch "$REMOTE" "$TMP" 2>/dev/null; then
  :
else
  echo "  (gh-pages not found — creating it)"
  rm -rf "$TMP"; mkdir -p "$TMP"; git -C "$TMP" init -q; git -C "$TMP" checkout -q -b gh-pages
fi
# Sync the new build over the branch: --delete removes stale files, .git is preserved.
rsync -a --delete --exclude='.git' "$BUILD_WT/dist/" "$TMP/"
cd "$TMP"
git add -A
if git -c user.name="Forge" -c user.email="forge@claridas.com" commit -q -m "Deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)" 2>/dev/null; then
  git push -q "$REMOTE" gh-pages
  echo "  ✓ incremental push complete."
else
  echo "  (no changes to deploy)"
fi
cd "$REPO_DIR"; rm -rf "$TMP"
echo "✓ pushed to gh-pages. Verifying the live site actually serves its CSS (Pages rebuild is async)…"

# Right-and-tight gate: a deploy that leaves the site UNSTYLED (CSS 404) is a failure,
# not a success. Poll the live homepage's referenced stylesheet until it returns 200.
IP=185.199.108.153
CSS_REF=$(grep -oE '/_astro/[^"]+\.css' "$BUILD_WT/dist/index.html" | head -1 || true)
if [ -z "$CSS_REF" ]; then
  echo "  note: no external _astro CSS referenced (CSS may be inlined) — skipping asset check."
else
  ok=0
  for i in $(seq 1 9); do
    code=$(curl -s -o /dev/null -w "%{http_code}" --resolve claridas.com:443:$IP "https://claridas.com$CSS_REF" || true)
    if [ "$code" = "200" ]; then ok=1; echo "  ✓ live CSS $CSS_REF → 200 (styled)."; break; fi
    echo "  …waiting for Pages rebuild (attempt $i, css=$code)"; sleep 20
  done
  [ "$ok" = "1" ] || echo "  ⚠ WARNING: live CSS still 404 after polling — site may be UNSTYLED. Check .nojekyll + Pages build."
fi
echo "✓ deploy complete. GitHub Pages serves gh-pages, custom domain claridas.com."
