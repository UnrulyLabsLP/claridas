// GAM-002 + GAM-003 — the shared Claridas game shell.
// One module every daily game loads (per game route, NOT sitewide). Provides:
//   • a deterministic date-seeded PRNG (mulberry32) — a given date always yields the
//     same puzzle, so the server-generated backlog and any client re-derivation agree;
//   • a game manifest registry (slug, name, cadence, blurb, payload id);
//   • localStorage persistence: per-game/per-date board state + per-game stats & streaks,
//     all try/catch-wrapped so private browsing / blocked storage degrades to a playable
//     game with no stats (never throws, never blocks play).
// Zero deps, no network, CSP-clean (same-origin ES module). Import what you need:
//   import { seededRng, dateSeed, registerGame, loadState, saveState, recordResult,
//            getStats, STREAK_RULE } from '/js/game-shell.js';

const NS = 'claridas_games_v1';
export const STREAK_RULE =
  'A streak survives if you finish a puzzle on its own date or the next calendar day.';

// ---- Deterministic PRNG ---------------------------------------------------------
// mulberry32: tiny, fast, well-distributed 32-bit PRNG. Same seed → same sequence.
export function seededRng(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Turn a 'YYYY-MM-DD' string (optionally salted per game) into a 32-bit seed.
export function dateSeed(dateStr, salt = '') {
  const s = String(dateStr) + '|' + String(salt);
  let h = 2166136261 >>> 0; // FNV-1a
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Fisher–Yates shuffle using a provided rng() (so shuffles are reproducible per date).
export function shuffle(arr, rng) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---- Manifest registry ----------------------------------------------------------
const REGISTRY = new Map();
export function registerGame(def) {
  if (def && def.slug) REGISTRY.set(def.slug, def);
  return def;
}
export function getGame(slug) {
  return REGISTRY.get(slug) || null;
}
export function allGames() {
  return [...REGISTRY.values()];
}

// ---- Persistence (fail-open) ----------------------------------------------------
function readStore() {
  try {
    return JSON.parse(localStorage.getItem(NS) || '{}') || {};
  } catch (e) {
    return {};
  }
}
function writeStore(obj) {
  try {
    localStorage.setItem(NS, JSON.stringify(obj));
    return true;
  } catch (e) {
    return false; // private mode / quota / blocked — play continues, stats just don't persist
  }
}

// Board state for one game on one date (grid progress, so a returning reader resumes).
export function loadState(slug, date) {
  const store = readStore();
  return (store.boards && store.boards[slug] && store.boards[slug][date]) || null;
}
export function saveState(slug, date, state) {
  const store = readStore();
  store.boards = store.boards || {};
  store.boards[slug] = store.boards[slug] || {};
  store.boards[slug][date] = state;
  return writeStore(store);
}

// Streak: survives if the previous solve was the puzzle's own date or the day before.
function nextCalendarDay(dateStr) {
  const d = new Date(dateStr + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

// Record a completed (or failed) attempt and roll up stats + streak.
export function recordResult(slug, date, { solved, guesses = null } = {}) {
  const store = readStore();
  store.stats = store.stats || {};
  const s =
    store.stats[slug] ||
    (store.stats[slug] = {
      played: 0,
      solved: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastSolvedDate: null,
      dist: {},
    });
  // De-dupe: one recorded result per (slug,date).
  store.results = store.results || {};
  store.results[slug] = store.results[slug] || {};
  if (store.results[slug][date]) return getStatsFrom(store, slug);
  store.results[slug][date] = { solved: !!solved, guesses };

  s.played += 1;
  if (solved) {
    s.solved += 1;
    // Streak continues if the last solve was this date's own day or the day before.
    if (s.lastSolvedDate && (s.lastSolvedDate === date || nextCalendarDay(s.lastSolvedDate) === date)) {
      s.currentStreak += 1;
    } else {
      s.currentStreak = 1;
    }
    s.lastSolvedDate = date;
    s.longestStreak = Math.max(s.longestStreak, s.currentStreak);
    if (guesses != null) s.dist[guesses] = (s.dist[guesses] || 0) + 1;
  } else {
    s.currentStreak = 0; // a miss breaks the streak
  }
  writeStore(store);
  return getStatsFrom(store, slug);
}

function getStatsFrom(store, slug) {
  const s = (store.stats && store.stats[slug]) || {
    played: 0,
    solved: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastSolvedDate: null,
    dist: {},
  };
  return { ...s, solveRate: s.played ? s.solved / s.played : 0 };
}
export function getStats(slug) {
  return getStatsFrom(readStore(), slug);
}

// ---- Shareable result (GAM-004) -------------------------------------------------
// A small toast (fixed, bottom-center, auto-dismiss). Inline styles keep it in this
// one file — no CSS/markup change needed in any game or the Astro template. Single
// toast at a time; fail-open (never throws).
function showToast(msg) {
  try {
    const prev = document.getElementById('claridas-toast');
    if (prev) prev.remove();
    const t = document.createElement('div');
    t.id = 'claridas-toast';
    t.setAttribute('role', 'status');
    t.textContent = msg;
    t.style.cssText =
      'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:200;' +
      'background:var(--ink,#1a1512);color:var(--paper,#faf8f4);font-family:var(--sans,sans-serif);' +
      'font-size:.85rem;padding:9px 16px;border-radius:3px;box-shadow:0 2px 10px rgba(0,0,0,.25);' +
      'opacity:0;transition:opacity .15s ease;max-width:90vw;text-align:center;';
    document.body.appendChild(t);
    // next frame → fade in; then fade out + remove.
    requestAnimationFrame(() => { t.style.opacity = '1'; });
    setTimeout(() => {
      t.style.opacity = '0';
      setTimeout(() => t.remove(), 200);
    }, 1900);
  } catch (e) { /* toast is a bonus — never block */ }
}

// Share a completed result. Uses the Web Share API when available (mobile/PWA),
// falls back to clipboard copy, and to a manual-copy toast if clipboard is blocked.
// `line` is the human summary; `url` defaults to the current page. Fail-open.
export function shareResult({ line, url } = {}) {
  const link = url || (typeof location !== 'undefined' ? location.href : '');
  const text = link ? line + '\n' + link : line;
  try {
    if (navigator.share) {
      navigator.share({ text }).catch(() => {/* user cancelled / not allowed — no-op */});
      return;
    }
  } catch (e) { /* fall through to clipboard */ }
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => showToast('Result copied to clipboard'),
        () => showToast(text),
      );
      return;
    }
  } catch (e) { /* fall through */ }
  showToast(text); // last resort: show it so the reader can copy manually
}

// Inject a one-off "Share result" button into `container` (idempotent — only the
// first call adds it) wired to shareResult(line). Returns the button or null.
export function offerShare(container, line) {
  try {
    if (!container) return null;
    if (container.querySelector('.game-share')) return null; // already offered
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'puzzle__btn game-share';
    btn.textContent = 'Share result';
    btn.addEventListener('click', () => shareResult({ line }));
    container.appendChild(btn);
    return btn;
  } catch (e) { return null; }
}

// Export / import the whole stats blob (GAM-003 — a streak isn't hostage to one browser).
export function exportStats() {
  return JSON.stringify(readStore());
}
export function importStats(blob) {
  try {
    const obj = JSON.parse(blob);
    return writeStore(obj);
  } catch (e) {
    return false;
  }
}
