// GAM-015 — "Halftone", the weekly nonogram (picross). A logic puzzle whose solution is a
// picture; the name is the newspaper dot-printing process. Row and column clues give runs of
// filled cells; three cell states (filled / marked-empty / unknown). The SAME line-solver the
// game ships with proves, at build time, that every shipped puzzle is uniquely solvable by
// logic alone — no guessing (AC1). Clues are DERIVED from the solution so they always match.
//
// Zero third-party scripts; grids fetched same-origin (CSP connect-src 'self'). Full keyboard
// operation; filled/empty carry a glyph, never colour alone.
import { dateSeed, seededRng, shuffle, recordResult, offerShare, loadState, saveState } from './game-shell.js';

const SLUG = 'halftone';
const UNKNOWN = 0, FILLED = 1, EMPTY = 2;
function weekNumber(dateStr) { return Math.floor(Math.floor(Date.parse(dateStr + 'T00:00:00Z') / 86400000) / 7); }

// runs of consecutive 1s in a 0/1 line → the clue list (e.g. [1,1,0,1,1,1] → [2,3])
export function runsOf(line) {
  const out = []; let n = 0;
  for (const c of line) { if (c === 1) n++; else if (n) { out.push(n); n = 0; } }
  if (n) out.push(n);
  return out.length ? out : [0];
}
export function deriveClues(solution) {
  const rows = solution.map(runsOf);
  const cols = [];
  for (let c = 0; c < solution[0].length; c++) cols.push(runsOf(solution.map((r) => r[c])));
  return { rows, cols };
}

// all valid 0/1 lines of length L matching clue list (ignores current state); cached per (L,key)
const _lineCache = new Map();
function allLines(L, clues) {
  const key = L + '|' + clues.join(',');
  if (_lineCache.has(key)) return _lineCache.get(key);
  const res = [];
  const runs = clues[0] === 0 ? [] : clues;
  (function place(idx, pos, acc) {
    if (idx === runs.length) { const line = acc.slice(); while (line.length < L) line.push(0); res.push(line); return; }
    const remain = runs.slice(idx).reduce((s, r) => s + r, 0) + (runs.length - idx - 1);
    for (let start = pos; start <= L - remain; start++) {
      const a = acc.slice();
      while (a.length < start) a.push(0);
      for (let k = 0; k < runs[idx]; k++) a.push(1);
      if (idx < runs.length - 1) a.push(0); // mandatory gap
      place(idx + 1, a.length, a);
    }
  })(0, 0, []);
  _lineCache.set(key, res);
  return res;
}
// given current known states, return forced cells: 1 (filled), 0 (empty), -1 (still unknown)
function forced(L, clues, known) {
  const cands = allLines(L, clues).filter((line) =>
    line.every((v, i) => known[i] === UNKNOWN || (known[i] === FILLED) === (v === 1)));
  if (!cands.length) return null; // contradiction
  const out = new Array(L).fill(-1);
  for (let i = 0; i < L; i++) {
    const allFilled = cands.every((c) => c[i] === 1);
    const allEmpty = cands.every((c) => c[i] === 0);
    out[i] = allFilled ? 1 : allEmpty ? 0 : -1;
  }
  return out;
}

// Line-solver: iterate rows/cols applying forced cells until stable. Returns the solved 0/1
// grid if fully resolved by logic alone, else null (would need guessing).
export function solveLogically(clues) {
  const R = clues.rows.length, C = clues.cols.length;
  const g = Array.from({ length: R }, () => new Array(C).fill(UNKNOWN));
  let changed = true, guard = 0;
  while (changed && guard++ < 1000) {
    changed = false;
    for (let r = 0; r < R; r++) {
      const f = forced(C, clues.rows[r], g[r]);
      if (!f) return null;
      for (let c = 0; c < C; c++) { const want = f[c] === 1 ? FILLED : f[c] === 0 ? EMPTY : UNKNOWN; if (want !== UNKNOWN && g[r][c] !== want) { g[r][c] = want; changed = true; } }
    }
    for (let c = 0; c < C; c++) {
      const col = g.map((row) => row[c]);
      const f = forced(R, clues.cols[c], col);
      if (!f) return null;
      for (let r = 0; r < R; r++) { const want = f[r] === 1 ? FILLED : f[r] === 0 ? EMPTY : UNKNOWN; if (want !== UNKNOWN && g[r][c] !== want) { g[r][c] = want; changed = true; } }
    }
  }
  if (g.some((row) => row.some((v) => v === UNKNOWN))) return null; // stuck → needs guessing
  return g.map((row) => row.map((v) => (v === FILLED ? 1 : 0)));
}
// AC1 check: clues derived from the solution are uniquely logic-solvable back to the solution.
export function isUniqueLogical(solution) {
  const solved = solveLogically(deriveClues(solution));
  return !!solved && solved.every((row, r) => row.every((v, c) => v === solution[r][c]));
}

function puzzleFor(dateStr, pool) {
  const seq = shuffle(pool, seededRng(dateSeed('week-' + weekNumber(dateStr), 'halftone')));
  return seq[((weekNumber(dateStr) % seq.length) + seq.length) % seq.length];
}

export function mountHalftone(host, { date, puzzles } = {}) {
  if (!host) return;
  const today = date || new Date().toISOString().slice(0, 10);
  const go = (pool) => {
    const puz = puzzleFor(today, pool);
    const sol = puz.solution, R = sol.length, C = sol[0].length;
    const clues = deriveClues(sol);
    const saved = loadState(SLUG, today);
    const state = (saved && saved.grid && saved.grid.length === R) ? saved.grid.map((r) => r.slice()) : Array.from({ length: R }, () => new Array(C).fill(UNKNOWN));
    let done = !!(saved && saved.done);
    let cur = [0, 0];

    host.innerHTML = '';
    host.className = 'ht';
    const status = el('p', 'ht__status', 'aria-live', 'polite');
    const title = el('p', 'ht__title', null, null, done ? (puz.title || 'Solved') : 'A picture hides in the grid');
    const wrap = el('div', 'ht__wrap');
    const tools = el('div', 'ht__tools');
    host.append(status, title, wrap, tools);
    tools.append(tbtn('Check', check), tbtn('Reset', reset));

    function maxRowClue() { return Math.max(...clues.rows.map((r) => r.length)); }
    function maxColClue() { return Math.max(...clues.cols.map((c) => c.length)); }

    function render() {
      wrap.innerHTML = '';
      const grid = el('div', 'ht__grid');
      const rcw = maxRowClue(), ccw = maxColClue();
      grid.style.gridTemplateColumns = `${rcw * 1.1}rem repeat(${C}, 1.6rem)`;
      // top-left corner
      grid.appendChild(el('div', 'ht__corner'));
      // column clues
      for (let c = 0; c < C; c++) {
        const cell = el('div', 'ht__cclue' + (colDone(c) ? ' is-done' : ''));
        cell.appendChild(el('span', null, null, null, clues.cols[c].join(' ')));
        grid.appendChild(cell);
      }
      for (let r = 0; r < R; r++) {
        const rc = el('div', 'ht__rclue' + (rowDone(r) ? ' is-done' : ''), null, null, clues.rows[r].join(' '));
        grid.appendChild(rc);
        for (let c = 0; c < C; c++) {
          const b = el('button', 'ht__cell', null, null, '');
          b.type = 'button';
          const s = state[r][c];
          b.classList.toggle('is-filled', s === FILLED);
          b.classList.toggle('is-empty', s === EMPTY);
          b.classList.toggle('is-cur', r === cur[0] && c === cur[1]);
          b.textContent = s === FILLED ? '■' : s === EMPTY ? '×' : '';
          b.setAttribute('aria-label', 'Row ' + (r + 1) + ' column ' + (c + 1) + ', ' + (s === FILLED ? 'filled' : s === EMPTY ? 'marked empty' : 'unknown'));
          b.addEventListener('click', (e) => { cur = [r, c]; cycle(r, c, e.shiftKey); });
          grid.appendChild(b);
        }
      }
      wrap.appendChild(grid);
    }
    function rowDone(r) { return runsOf(state[r].map((v) => (v === FILLED ? 1 : 0))).join(',') === clues.rows[r].join(',') && stateMatchesCountRow(r); }
    function stateMatchesCountRow(r) { return state[r].filter((v) => v === FILLED).length === clues.rows[r].reduce((a, b) => a + b, 0); }
    function colDone(c) { const col = state.map((row) => row[c]); return runsOf(col.map((v) => (v === FILLED ? 1 : 0))).join(',') === clues.cols[c].join(',') && col.filter((v) => v === FILLED).length === clues.cols[c].reduce((a, b) => a + b, 0); }

    function cycle(r, c, toEmptyFirst) {
      if (done) return;
      const s = state[r][c];
      state[r][c] = toEmptyFirst
        ? (s === EMPTY ? UNKNOWN : EMPTY)
        : (s === UNKNOWN ? FILLED : s === FILLED ? EMPTY : UNKNOWN);
      persist(); render(); checkWin();
    }
    function checkWin() {
      // win = every solution-filled cell is FILLED (marked-empty on the rest is optional)
      const win = sol.every((row, r) => row.every((v, c) => (v === 1) === (state[r][c] === FILLED)));
      if (win && !done) { done = true; persist(); recordResult(SLUG, today, { solved: true }); title.textContent = puz.title || 'Solved'; setStatus('Solved — ' + (puz.title || 'picture revealed') + '.'); offerShare(host, 'Claridas Halftone (week of ' + today + ') — solved “' + (puz.title || 'picture') + '”.'); render(); }
    }
    function check() {
      let wrong = 0;
      for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (state[r][c] === FILLED && sol[r][c] !== 1) wrong++;
      setStatus(wrong === 0 ? 'No filled cell is wrong so far.' : wrong + (wrong === 1 ? ' filled cell is wrong.' : ' filled cells are wrong.'));
    }
    function reset() { if (done) return; for (let r = 0; r < R; r++) state[r].fill(UNKNOWN); persist(); render(); }
    function persist() { saveState(SLUG, today, { grid: state, done }); }
    function setStatus(t) { status.textContent = t; }

    host.tabIndex = 0;
    host.addEventListener('keydown', (e) => {
      let [r, c] = cur, handled = true;
      if (e.key === 'ArrowUp') r = (r + R - 1) % R;
      else if (e.key === 'ArrowDown') r = (r + 1) % R;
      else if (e.key === 'ArrowLeft') c = (c + C - 1) % C;
      else if (e.key === 'ArrowRight') c = (c + 1) % C;
      else if (e.key === ' ' || e.key === 'f' || e.key === 'F' || e.key === 'Enter') { cycle(cur[0], cur[1], false); return; }
      else if (e.key === 'x' || e.key === 'X' || e.key === 'm' || e.key === 'M') { cycle(cur[0], cur[1], true); return; }
      else handled = false;
      if (handled) { cur = [r, c]; render(); e.preventDefault(); }
    });

    render();
    if (done) { title.textContent = puz.title || 'Solved'; }
  };

  if (puzzles) { go(puzzles); return; }
  fetch('/data/games/halftone.json').then((r) => r.json()).then((d) => go(d.puzzles)).catch(() => { host.innerHTML = '<p style="color:var(--muted)">This week\'s nonogram could not load. Please refresh.</p>'; });
}

function tbtn(label, fn) { const b = el('button', 'ht__tool', null, null, label); b.type = 'button'; b.addEventListener('click', fn); return b; }
function el(tag, cls, attr, val, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (attr) e.setAttribute(attr, val);
  if (text != null) e.textContent = text;
  return e;
}

if (typeof document !== 'undefined') {
  document.querySelectorAll('[data-halftone]').forEach((host) => {
    mountHalftone(host, { date: host.getAttribute('data-date') || undefined });
  });
}
