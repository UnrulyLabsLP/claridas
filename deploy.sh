#!/usr/bin/env bash
# Claridas deploy — build locally, push the static dist/ to the gh-pages branch.
# Least-privilege: no CI, no workflow scope. Serves via GitHub Pages (gh-pages branch).
# Usage: ./deploy.sh <git-remote-url>
#   e.g. ./deploy.sh https://<fine-grained-PAT>@github.com/UnrulyLabsLP/claridas.git
# The token is passed in / lives in a configured remote — NEVER hardcoded here.
set -euo pipefail
REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
REMOTE="${1:-$(git -C "$REPO_DIR" remote get-url origin 2>/dev/null || true)}"
[ -n "$REMOTE" ] || { echo "usage: ./deploy.sh <git-remote-url>  (or configure origin)"; exit 1; }

cd "$REPO_DIR"
echo "→ building…"
npm run build

# Fault-tolerant rail: only deploy if the build produced output + the CNAME.
[ -f dist/index.html ] || { echo "ABORT: build produced no dist/index.html"; exit 1; }
[ -f dist/CNAME ] || echo "claridas.com" > dist/CNAME
# GitHub Pages runs Jekyll, which strips any folder starting with "_" — including
# Astro's _astro/ asset dir (all CSS/JS). .nojekyll disables Jekyll so assets serve.
# Without this the site renders UNSTYLED (every _astro/*.css 404s). MANDATORY.
touch dist/.nojekyll

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
rsync -a --delete --exclude='.git' "$REPO_DIR/dist/" "$TMP/"
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
CSS_REF=$(grep -oE '/_astro/[^"]+\.css' dist/index.html | head -1 || true)
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
