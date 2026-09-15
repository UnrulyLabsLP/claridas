// GAM-016 — Killer Sudoku. Standard Sudoku rules (1–9 once per row/column/box) PLUS cages: a
// group of cells with a target sum and no repeated digit inside the cage. No given digits — the
// cages are the whole clue. The SAME backtracking solver the game ships with proves, at build
// time, that every shipped puzzle has exactly one solution (AC). Shares the Sudoku grid visual
// layer (games.css) and the date-seeded / persistence patterns of GAM-006.
import { dateSeed, seededRng, shuffle, recordResult, offerShare, loadState, saveState } from './game-shell.js';

const N = 9, CELLS = 81, SLUG = 'killer-sudoku';
const ROW = (i) => Math.floor(i / N), COL = (i) => i % N;
const BOX = (i) => Math.floor(ROW(i) / 3) * 3 + Math.floor(COL(i) / 3);
const PEERS = (() => {
  const p = Array.from({ length: CELLS }, () => new Set());
  for (let i = 0; i < CELLS; i++) for (let j = 0; j < CELLS; j++) {
    if (i !== j && (ROW(i) === ROW(j) || COL(i) === COL(j) || BOX(i) === BOX(j))) p[i].add(j);
  }
  return p.map((s) => [...s]);
})();

function weekNumber(dateStr) { return Math.floor(Math.floor(Date.parse(dateStr + 'T00:00:00Z') / 86400000) / 7); }

// ---- solver: count solutions of a Killer puzzle (cages only, no givens) up to `limit` ----
// cageOf[i] = cage index; cages[k] = { cells:[...], sum } . Returns { count, solution }.
export function solveKiller(cages, limit = 2, givens = {}) {
  const g = new Array(CELLS).fill(0);
  for (const k in givens) g[+k] = givens[k];       // pre-placed given cells
  const cageOf = new Array(CELLS).fill(-1);
  cages.forEach((c, k) => c.cells.forEach((i) => { cageOf[i] = k; }));
  let count = 0, solution = null;
  function candidates(i) {
    const used = new Set();
    for (const p of PEERS[i]) if (g[p]) used.add(g[p]);
    const k = cageOf[i], cage = cages[k];
    let partial = 0, filled = 0, empties = 0;
    const inCage = new Set();
    for (const c of cage.cells) { if (g[c]) { partial += g[c]; filled++; inCage.add(g[c]); } else empties++; }
    const out = [];
    for (let v = 1; v <= N; v++) {
      if (used.has(v) || inCage.has(v)) continue;          // row/col/box + cage no-repeat
      const rem = cage.sum - partial - v;                   // remaining sum after placing v
      const leftAfter = empties - 1;
      // feasibility: remaining cells must be able to reach rem with distinct 1-9 not already used in cage
      if (leftAfter === 0) { if (rem !== 0) continue; }
      else { if (rem < leftAfter * 1 || rem > minMaxRem(leftAfter, v, inCage)) continue; }
      out.push(v);
    }
    return out;
  }
  // max achievable with `left` distinct digits from 1-9, excluding `v` and cage-used, is the sum of
  // the largest available; min is the sum of the smallest. Here approximate max via top digits.
  function minMaxRem(left, v, inCage) {
    const avail = [];
    for (let d = N; d >= 1; d--) if (d !== v && !inCage.has(d)) avail.push(d);
    let s = 0; for (let x = 0; x < left && x < avail.length; x++) s += avail[x];
    return s;
  }
  function recurse() {
    if (count >= limit) return;
    let best = -1, bestC = null;
    for (let i = 0; i < CELLS; i++) {
      if (g[i]) continue;
      const c = candidates(i);
      if (c.length === 0) return;
      if (!bestC || c.length < bestC.length) { best = i; bestC = c; if (c.length === 1) break; }
    }
    if (best === -1) { count++; if (!solution) solution = g.slice(); return; }
    for (const v of bestC) { g[best] = v; recurse(); g[best] = 0; if (count >= limit) return; }
  }
  recurse();
  return { count, solution };
}

// ---- no-guess (logic-only) solver ----------------------------------------------
// Solves a Killer puzzle using only sound human techniques: candidate elimination from
// row/col/box + cage no-repeat, cage-combination restriction (a cell can only hold a digit
// that appears in some valid way to complete its cage's sum with distinct digits), naked
// singles, and hidden singles in rows/cols/boxes. Returns the solved grid if logic alone
// finishes it (no guessing) — else null. This is the AC "no-guessing" gate for Killer.
const UNITS = (() => {
  const u = [];
  for (let r = 0; r < N; r++) u.push([...Array(N)].map((_, c) => r * N + c));
  for (let c = 0; c < N; c++) u.push([...Array(N)].map((_, r) => r * N + c));
  for (let b = 0; b < N; b++) { const br = Math.floor(b / 3) * 3, bc = (b % 3) * 3, box = []; for (let dr = 0; dr < 3; dr++) for (let dc = 0; dc < 3; dc++) box.push((br + dr) * N + bc + dc); u.push(box); }
  return u;
})();
// all size-k subsets of `pool` (distinct digits) summing to target
function subsetsSumming(pool, k, target) {
  const res = [];
  (function rec(start, chosen, sum) {
    if (chosen.length === k) { if (sum === target) res.push(chosen.slice()); return; }
    for (let i = start; i < pool.length; i++) {
      if (sum + pool[i] > target) break;
      chosen.push(pool[i]); rec(i + 1, chosen, sum + pool[i]); chosen.pop();
    }
  })(0, [], 0);
  return res;
}
export function solveKillerLogical(cages, givens = {}) {
  const g = new Array(CELLS).fill(0);
  for (const k in givens) g[+k] = givens[k];       // pre-placed given cells
  const cageOf = new Array(CELLS).fill(-1);
  cages.forEach((c, k) => c.cells.forEach((i) => { cageOf[i] = k; }));
  for (let guard = 0; guard < 400; guard++) {
    // 1) candidates from peers + cage-placed
    const cand = new Array(CELLS).fill(null);
    for (let i = 0; i < CELLS; i++) {
      if (g[i]) continue;
      const s = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      for (const p of PEERS[i]) if (g[p]) s.delete(g[p]);
      for (const c of cages[cageOf[i]].cells) if (g[c]) s.delete(g[c]);
      if (s.size === 0) return null;           // contradiction
      cand[i] = s;
    }
    // 2) cage-combination restriction: intersect each empty cell with the union of digits that
    // appear in SOME valid completion of its cage
    for (const cage of cages) {
      const empties = cage.cells.filter((i) => !g[i]);
      if (!empties.length) continue;
      const used = new Set(cage.cells.filter((i) => g[i]).map((i) => g[i]));
      const rem = cage.sum - cage.cells.filter((i) => g[i]).reduce((a, i) => a + g[i], 0);
      const pool = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((d) => !used.has(d) && empties.some((i) => cand[i].has(d)));
      const combos = subsetsSumming(pool, empties.length, rem);
      const allowed = new Set(); combos.forEach((cb) => cb.forEach((d) => allowed.add(d)));
      for (const i of empties) for (const d of [...cand[i]]) if (!allowed.has(d)) cand[i].delete(d);
      for (const i of empties) if (cand[i].size === 0) return null;
    }
    // 3) the 45-rule (single-cell innie): each unit's 9 cells sum to 45. If every cell of a unit
    // except ONE is covered by cages wholly inside the unit, that one leftover cell = 45 minus
    // those cages' sums. Sound and powerful — the core Killer technique.
    let changed = false;
    for (const unit of UNITS) {
      const uSet = new Set(unit);
      const contained = cages.filter((c) => c.cells.every((i) => uSet.has(i)));
      const coveredSum = contained.reduce((s, c) => s + c.sum, 0);
      const covered = new Set(); contained.forEach((c) => c.cells.forEach((i) => covered.add(i)));
      const leftover = unit.filter((i) => !covered.has(i));
      if (leftover.length === 1) {
        const cell = leftover[0], val = 45 - coveredSum;
        if (val >= 1 && val <= 9 && !g[cell]) { g[cell] = val; changed = true; }
      }
    }
    if (changed) continue;
    // 4) naked singles
    for (let i = 0; i < CELLS; i++) if (!g[i] && cand[i].size === 1) { g[i] = [...cand[i]][0]; changed = true; }
    if (changed) continue;
    // 4) hidden singles in rows/cols/boxes
    for (const unit of UNITS) {
      for (let v = 1; v <= N; v++) {
        const spots = unit.filter((i) => !g[i] && cand[i].has(v));
        if (spots.length === 1) { g[spots[0]] = v; changed = true; }
      }
    }
    if (!changed) break;
  }
  return g.every((v) => v) ? g : null;
}

// ---- full-solution generator (randomised backtracking fill) ----
function fillSolution(rng) {
  const g = new Array(CELLS).fill(0);
  (function rec(pos) {
    if (pos === CELLS) return true;
    if (g[pos]) return rec(pos + 1);
    const used = new Set(); for (const p of PEERS[pos]) if (g[p]) used.add(g[p]);
    for (const v of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9], rng)) {
      if (used.has(v)) continue;
      g[pos] = v; if (rec(pos + 1)) return true; g[pos] = 0;
    }
    return false;
  })(0);
  return g;
}
// partition the 81 cells into contiguous cages of size 2-4 (seeded), no repeated digit within a cage
function makeCages(solution, rng) {
  const cageId = new Array(CELLS).fill(-1);
  const order = shuffle([...Array(CELLS).keys()], rng);
  const cages = [];
  for (const start of order) {
    if (cageId[start] !== -1) continue;
    const size = 2 + Math.floor(rng() * 3); // 2..4
    const cells = [start]; cageId[start] = cages.length;
    const digits = new Set([solution[start]]);
    while (cells.length < size) {
      // neighbours of any cell in the cage, unassigned, digit not already in cage
      const frontier = [];
      for (const c of cells) for (const nb of neighbours(c)) {
        if (cageId[nb] === -1 && !digits.has(solution[nb])) frontier.push(nb);
      }
      if (!frontier.length) break;
      const pick = frontier[Math.floor(rng() * frontier.length)];
      cells.push(pick); cageId[pick] = cages.length; digits.add(solution[pick]);
    }
    cages.push({ cells, sum: cells.reduce((s, i) => s + solution[i], 0) });
  }
  return cages;
}
function neighbours(i) {
  const r = ROW(i), c = COL(i), out = [];
  if (r > 0) out.push(i - N); if (r < 8) out.push(i + N);
  if (c > 0) out.push(i - 1); if (c < 8) out.push(i + 1);
  return out;
}
// generate a Killer puzzle that is UNIQUELY solvable (cages only). Retries partitions until unique.
export function generateKiller(dateStr, tier = 'weekly') {
  const rng = seededRng(dateSeed(dateStr, 'killer-' + tier));
  const solution = fillSolution(rng);
  for (let attempt = 0; attempt < 40; attempt++) {
    const cages = makeCages(solution, seededRng(dateSeed(dateStr + '#' + attempt, 'killer-cage')));
    if (solveKiller(cages, 2).count !== 1) continue;          // must be uniquely solvable
    // NO-GUESS GUARANTEE (AC): inject the FEWEST given cells needed until the logic-only solver
    // finishes with no guessing. Most puzzles need a handful; the givens render as locked cells.
    const givens = {};
    for (let inject = 0; inject <= 20; inject++) {
      const partial = solveKillerLogical(cages, givens);
      if (partial) return { solution, cages, givens };        // logic-solvable to completion
      // find a cell logic couldn't place yet and reveal it (progress; keeps the puzzle unique)
      const stuck = progressGrid(cages, givens);
      const cell = stuck.findIndex((v, i) => v === 0 && !(i in givens));
      if (cell < 0) break;
      givens[cell] = solution[cell];
    }
  }
  return { solution, cages: makeCages(solution, rng), givens: {} }; // fallback (test guards)
}
// how far pure logic gets from the current givens (returns the partially-filled grid)
function progressGrid(cages, givens) {
  const solved = solveKillerLogical(cages, givens);
  if (solved) return solved;
  // rerun the propagation but capture the partial grid (solveKillerLogical returns null when stuck,
  // so replicate its final state): simplest is to seed a grid with givens + one pass of singles.
  const g = new Array(CELLS).fill(0);
  for (const k in givens) g[+k] = givens[k];
  const cageOf = new Array(CELLS).fill(-1); cages.forEach((c, k) => c.cells.forEach((i) => { cageOf[i] = k; }));
  for (let it = 0; it < 400; it++) {
    let changed = false;
    for (let i = 0; i < CELLS; i++) {
      if (g[i]) continue;
      const s = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      for (const p of PEERS[i]) if (g[p]) s.delete(g[p]);
      for (const c of cages[cageOf[i]].cells) if (g[c]) s.delete(g[c]);
      if (s.size === 1) { g[i] = [...s][0]; changed = true; }
    }
    if (!changed) break;
  }
  return g;
}

// Pick a pre-generated weekly puzzle from the pool (fast — generation is a build-time step,
// not a client-side blocking op). Falls back to on-the-fly generation only if the pool is absent.
export function puzzleForWeek(dateStr, pool) {
  const seq = shuffle(pool, seededRng(dateSeed('week-' + weekNumber(dateStr), 'killer')));
  return seq[((weekNumber(dateStr) % seq.length) + seq.length) % seq.length];
}

// ---- interactive board (shares the Sudoku visual layer via games.css .sudoku*) ----
export function mountKiller(host, { date, pool } = {}) {
  if (!host) return;
  const today = date || new Date().toISOString().slice(0, 10);
  if (!pool) { fetch('/data/games/killer-sudoku.json').then((r) => r.json()).then((d) => mountKiller(host, { date, pool: d.puzzles })).catch(() => { host.innerHTML = '<p style="color:var(--muted)">This week\'s Killer Sudoku could not load. Please refresh.</p>'; }); return; }
  const puz = puzzleForWeek(today, pool);
  const solution = puz.solution, cages = puz.cages, givens = puz.givens || {};
  const cageOf = new Array(CELLS).fill(-1), cageSumAt = {};
  cages.forEach((c, k) => { c.cells.forEach((i) => { cageOf[i] = k; }); cageSumAt[Math.min(...c.cells)] = c.sum; });
  const isGiven = new Array(CELLS).fill(false);
  for (const k in givens) isGiven[+k] = true;

  const saved = loadState(SLUG, today);
  const values = (saved && saved.values && saved.values.length === CELLS) ? saved.values.slice() : new Array(CELLS).fill(0);
  for (const k in givens) values[+k] = givens[k];   // pre-fill locked given cells
  const notes = (saved && saved.notes) ? saved.notes.map((a) => new Set(a)) : Array.from({ length: CELLS }, () => new Set());
  let sel = -1, pencil = false, done = !!(saved && saved.done);

  host.innerHTML = '';
  host.className = 'sudoku killer';
  const status = el('p', 'sudoku__status', 'aria-live', 'polite');
  const board = el('div', 'sudoku__grid');
  board.setAttribute('role', 'grid'); board.tabIndex = 0;
  const pad = el('div', 'sudoku__pad');
  const tools = el('div', 'sudoku__tools');
  host.append(status, board, pad, tools);
  const cells = [];
  for (let i = 0; i < CELLS; i++) {
    const c = el('button', 'sudoku__cell killer__cell');
    c.type = 'button'; c.dataset.i = i;
    if (COL(i) % 3 === 2 && COL(i) !== 8) c.classList.add('br');
    if (ROW(i) % 3 === 2 && ROW(i) !== 8) c.classList.add('bb');
    // cage borders: thin dashed edge where the neighbour is a different cage
    if (ROW(i) === 0 || cageOf[i - N] !== cageOf[i]) c.classList.add('cage-t');
    if (COL(i) === 0 || cageOf[i - 1] !== cageOf[i]) c.classList.add('cage-l');
    c.addEventListener('click', () => { sel = i; render(); });
    cells.push(c); board.appendChild(c);
  }
  for (let v = 1; v <= 9; v++) { const b = el('button', 'sudoku__key', null, null, String(v)); b.type = 'button'; b.addEventListener('click', () => enter(v)); pad.appendChild(b); }
  const er = el('button', 'sudoku__key sudoku__key--wide', null, null, '⌫'); er.type = 'button'; er.addEventListener('click', () => enter(0)); pad.appendChild(er);
  const pBtn = tbtn('Pencil', () => { pencil = !pencil; pBtn.classList.toggle('is-on', pencil); pBtn.setAttribute('aria-pressed', String(pencil)); });
  tools.append(pBtn, tbtn('Check', check), tbtn('Reset', reset));

  board.addEventListener('keydown', (e) => {
    if (sel < 0) sel = 0; let r = ROW(sel), c = COL(sel), h = true;
    if (e.key === 'ArrowUp') r = (r + 8) % 9; else if (e.key === 'ArrowDown') r = (r + 1) % 9;
    else if (e.key === 'ArrowLeft') c = (c + 8) % 9; else if (e.key === 'ArrowRight') c = (c + 1) % 9;
    else if (/^[1-9]$/.test(e.key)) { enter(+e.key); return; }
    else if (e.key === '0' || e.key === 'Backspace') { enter(0); e.preventDefault(); return; }
    else if (e.key === 'p' || e.key === 'P') { pBtn.click(); return; }
    else h = false;
    if (h) { sel = r * N + c; render(); cells[sel].focus(); e.preventDefault(); }
  });
  render();

  function enter(v) {
    if (done || sel < 0 || isGiven[sel]) return;   // given cells are locked
    if (v === 0) { values[sel] = 0; notes[sel].clear(); }
    else if (pencil) { values[sel] = 0; notes[sel].has(v) ? notes[sel].delete(v) : notes[sel].add(v); }
    else { values[sel] = v; notes[sel].clear(); }
    persist(); render();
    if (values.every((x, k) => x === solution[k])) win();
  }
  function check() { let wrong = 0; for (let i = 0; i < CELLS; i++) if (values[i] && values[i] !== solution[i]) wrong++; setStatus(wrong ? wrong + ' cell(s) wrong.' : 'No mistakes so far.'); render(wrong > 0); }
  function reset() { if (done) return; for (let i = 0; i < CELLS; i++) values[i] = isGiven[i] ? givens[i] : 0; notes.forEach((n) => n.clear()); persist(); render(); }
  function win() { done = true; persist(); recordResult(SLUG, today, { solved: true }); setStatus('Solved.'); offerShare(tools, 'Claridas Killer Sudoku (week of ' + today + ') ✓ solved.'); render(); }
  function persist() { saveState(SLUG, today, { values, notes: notes.map((s) => [...s]), done }); }
  function setStatus(t) { status.textContent = t; }

  function render(markWrong = false) {
    for (let i = 0; i < CELLS; i++) {
      const c = cells[i], v = values[i];
      c.classList.toggle('is-sel', i === sel);
      c.classList.toggle('is-peer', sel >= 0 && i !== sel && PEERS[sel].includes(i));
      c.classList.toggle('is-cagemate', sel >= 0 && i !== sel && cageOf[i] === cageOf[sel]);
      const bad = markWrong && v && v !== solution[i];
      c.classList.toggle('is-bad', !!bad);
      c.classList.toggle('is-given', isGiven[i]);
      c.innerHTML = '';
      if (cageSumAt[i] != null) { const s = el('span', 'killer__sum', null, null, String(cageSumAt[i])); c.appendChild(s); }
      if (v) { const d = el('span', 'killer__v' + (isGiven[i] ? ' killer__v--given' : ''), null, null, bad ? v + '✕' : String(v)); c.appendChild(d); c.setAttribute('aria-label', 'Row ' + (ROW(i) + 1) + ' col ' + (COL(i) + 1) + ' = ' + v + (isGiven[i] ? ' (given)' : '')); }
      else if (notes[i].size) { const n = el('span', 'sudoku__notes'); for (let d = 1; d <= 9; d++) n.appendChild(el('span', null, null, null, notes[i].has(d) ? String(d) : '')); c.appendChild(n); }
    }
  }
}

function tbtn(label, fn) { const b = el('button', 'sudoku__tool', null, null, label); b.type = 'button'; b.addEventListener('click', fn); return b; }
function el(tag, cls, attr, val, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (attr) e.setAttribute(attr, val); if (text != null) e.textContent = text; return e; }

if (typeof document !== 'undefined') {
  document.querySelectorAll('[data-killer]').forEach((host) => mountKiller(host, { date: host.getAttribute('data-date') || undefined }));
}
