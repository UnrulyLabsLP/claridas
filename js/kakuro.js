// GAM-016 pt2 — Kakuro. A number crossword: fill white cells with digits 1–9 so
// each run (consecutive white cells in a row or column) sums to its clue, using no
// digit twice within that run. No Sudoku row/column constraints — only run constraints.
//
// Grid: 9×9 (rows/cols 0–8). Row 0 and col 0 are all-black borders.
// 12 h-runs + 12 v-runs = 24 runs, 49 white cells. Every white cell is in exactly
// one h-run (length 2–8) and one v-run (length 2–7). No singletons.
//
// Two 8-cell anchor rows (rows 2 and 6) give very strong constraints: an 8-cell run
// with distinct digits from 1–9 uses every digit except one, so sum = 45 − missing.
// This drives high uniqueness rates in the generator.
//
// The same backtracking solver proves uniqueness at build time; the logic-only solver
// is the AC no-guessing gate. Weekly puzzle pool, pre-generated at build time.
import { dateSeed, seededRng, shuffle, recordResult, offerShare, loadState, saveState } from './game-shell.js';

const ROWS = 9, COLS = 9, CELLS = ROWS * COLS, SLUG = 'kakuro';
function idx(r, c) { return r * COLS + c; }

// ─── run templates (sums are 0 — filled by the data file / generator) ──────────
// H-runs: {dir:'h', cells:[idx,...]}
// V-runs: {dir:'v', cells:[idx,...]}
export const BASE_RUNS = [
  // ─ h-runs ─
  { dir:'h', cells:[idx(1,2),idx(1,3),idx(1,4)] },                                       // row 1 left
  { dir:'h', cells:[idx(1,6),idx(1,7),idx(1,8)] },                                       // row 1 right
  { dir:'h', cells:[idx(2,1),idx(2,2),idx(2,3),idx(2,4),idx(2,5),idx(2,6),idx(2,7),idx(2,8)] }, // row 2 anchor (8 cells)
  { dir:'h', cells:[idx(3,1),idx(3,2),idx(3,3)] },                                       // row 3 left
  { dir:'h', cells:[idx(3,5),idx(3,6),idx(3,7),idx(3,8)] },                              // row 3 right
  { dir:'h', cells:[idx(4,1),idx(4,2),idx(4,3),idx(4,4)] },                              // row 4 left
  { dir:'h', cells:[idx(4,6),idx(4,7),idx(4,8)] },                                       // row 4 right
  { dir:'h', cells:[idx(5,1),idx(5,2)] },                                                 // row 5 left
  { dir:'h', cells:[idx(5,4),idx(5,5),idx(5,6),idx(5,7)] },                              // row 5 right
  { dir:'h', cells:[idx(6,1),idx(6,2),idx(6,3),idx(6,4),idx(6,5),idx(6,6),idx(6,7),idx(6,8)] }, // row 6 anchor (8 cells)
  { dir:'h', cells:[idx(7,1),idx(7,2),idx(7,3),idx(7,4)] },                              // row 7 left
  { dir:'h', cells:[idx(7,6),idx(7,7),idx(7,8)] },                                       // row 7 right
  // ─ v-runs ─
  { dir:'v', cells:[idx(2,1),idx(3,1),idx(4,1),idx(5,1),idx(6,1),idx(7,1)] },           // col 1
  { dir:'v', cells:[idx(1,2),idx(2,2),idx(3,2),idx(4,2),idx(5,2),idx(6,2),idx(7,2)] }, // col 2
  { dir:'v', cells:[idx(1,3),idx(2,3),idx(3,3),idx(4,3)] },                              // col 3 top
  { dir:'v', cells:[idx(6,3),idx(7,3)] },                                                 // col 3 bot
  { dir:'v', cells:[idx(1,4),idx(2,4)] },                                                 // col 4 top
  { dir:'v', cells:[idx(4,4),idx(5,4),idx(6,4),idx(7,4)] },                              // col 4 bot
  { dir:'v', cells:[idx(2,5),idx(3,5)] },                                                 // col 5 top
  { dir:'v', cells:[idx(5,5),idx(6,5)] },                                                 // col 5 bot
  { dir:'v', cells:[idx(1,6),idx(2,6),idx(3,6),idx(4,6),idx(5,6),idx(6,6),idx(7,6)] }, // col 6
  { dir:'v', cells:[idx(1,7),idx(2,7),idx(3,7),idx(4,7),idx(5,7),idx(6,7),idx(7,7)] }, // col 7
  { dir:'v', cells:[idx(1,8),idx(2,8),idx(3,8),idx(4,8)] },                              // col 8 top
  { dir:'v', cells:[idx(6,8),idx(7,8)] },                                                 // col 8 bot
].map((r) => ({ ...r, sum: 0 }));

export const IS_WHITE = new Uint8Array(CELLS);
BASE_RUNS.forEach((run) => run.cells.forEach((i) => { IS_WHITE[i] = 1; }));

const H_RUN_IDX = new Int8Array(CELLS).fill(-1);
const V_RUN_IDX = new Int8Array(CELLS).fill(-1);
BASE_RUNS.forEach((run, ri) => {
  run.cells.forEach((i) => { if (run.dir === 'h') H_RUN_IDX[i] = ri; else V_RUN_IDX[i] = ri; });
});

// ─── combinatorics ────────────────────────────────────────────────────────────
// All k-element subsets of sorted `pool` summing to `target`.
function combosFor(pool, k, target) {
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

// Union of digits that appear in any valid completion of the run's empty cells.
function allowedDigits(run, g) {
  const filled = run.cells.filter((i) => g[i]);
  const empties = run.cells.filter((i) => !g[i]);
  if (!empties.length) return new Set();
  const used = new Set(filled.map((i) => g[i]));
  const partial = filled.reduce((s, i) => s + g[i], 0);
  const rem = run.sum - partial;
  const pool = [1,2,3,4,5,6,7,8,9].filter((d) => !used.has(d));   // pool already sorted
  const combos = combosFor(pool, empties.length, rem);
  const out = new Set();
  combos.forEach((cb) => cb.forEach((d) => out.add(d)));
  return out;
}

// ─── backtracking solver ──────────────────────────────────────────────────────
// `givens`: {cellIdx: digit} — pre-filled locked cells (optional).
export function solveKakuro(runs, limit = 2, givens = {}) {
  const g = new Uint8Array(CELLS);
  for (const k in givens) g[+k] = givens[k];
  let count = 0, solution = null;

  function candidates(i) {
    const ha = allowedDigits(runs[H_RUN_IDX[i]], g);
    const va = allowedDigits(runs[V_RUN_IDX[i]], g);
    return [...ha].filter((d) => va.has(d));
  }

  function recurse() {
    if (count >= limit) return;
    let best = -1, bestC = null;
    for (let i = 0; i < CELLS; i++) {
      if (!IS_WHITE[i] || g[i]) continue;
      const c = candidates(i);
      if (c.length === 0) return;
      if (!bestC || c.length < bestC.length) { best = i; bestC = c; if (c.length === 1) break; }
    }
    if (best === -1) { count++; if (!solution) solution = Array.from(g); return; }
    for (const d of bestC) {
      g[best] = d; recurse(); g[best] = 0;
      if (count >= limit) return;
    }
  }
  recurse();
  return { count, solution };
}

// ─── logic-only solver — AC no-guessing gate ──────────────────────────────────
export function solveKakuroLogical(runs, givens = {}) {
  const g = new Uint8Array(CELLS);
  for (const k in givens) g[+k] = givens[k];
  const cand = Array.from({ length: CELLS }, (_, i) =>
    IS_WHITE[i] ? new Set([1,2,3,4,5,6,7,8,9]) : null
  );
  // Seed candidate sets: given cells are already placed, remove their digits from peers
  for (const k in givens) {
    const i = +k, d = givens[k];
    if (cand[i]) cand[i] = null;
    const hr = H_RUN_IDX[i], vr = V_RUN_IDX[i];
    if (hr >= 0) for (const c of runs[hr].cells) if (cand[c]) cand[c].delete(d);
    if (vr >= 0) for (const c of runs[vr].cells) if (cand[c]) cand[c].delete(d);
  }

  function place(i, d) {
    g[i] = d; cand[i] = null;
    const hr = H_RUN_IDX[i], vr = V_RUN_IDX[i];
    if (hr >= 0) for (const c of runs[hr].cells) if (cand[c]) cand[c].delete(d);
    if (vr >= 0) for (const c of runs[vr].cells) if (cand[c]) cand[c].delete(d);
  }

  for (let guard = 0; guard < 300; guard++) {
    // 1) combination restriction
    let contradiction = false;
    for (const run of runs) {
      if (run.cells.every((i) => g[i])) continue;
      const allowed = allowedDigits(run, g);
      if (!allowed.size) { contradiction = true; break; }
      for (const i of run.cells) {
        if (!cand[i]) continue;
        for (const d of [...cand[i]]) if (!allowed.has(d)) cand[i].delete(d);
        if (cand[i].size === 0) { contradiction = true; break; }
      }
      if (contradiction) break;
    }
    if (contradiction) return null;

    let changed = false;
    // 2) naked singles
    for (let i = 0; i < CELLS; i++) {
      if (!cand[i]) continue;
      if (cand[i].size === 0) return null;
      if (cand[i].size === 1) { place(i, [...cand[i]][0]); changed = true; }
    }
    if (changed) continue;

    // 3) hidden singles within runs
    for (const run of runs) {
      for (let d = 1; d <= 9; d++) {
        const spots = run.cells.filter((i) => cand[i] && cand[i].has(d));
        if (spots.length === 0 && run.cells.some((i) => !g[i])) return null;
        if (spots.length === 1) { place(spots[0], d); changed = true; }
      }
    }
    if (!changed) break;
  }
  return g.every((v, i) => !IS_WHITE[i] || v) ? Array.from(g) : null;
}

// ─── generator ────────────────────────────────────────────────────────────────
// Fills 49 white cells, derives run sums, then injects the fewest given cells
// needed to make the puzzle uniquely solvable by logic alone (no guessing).
// Same pattern as Killer Sudoku's no-guess guarantee.
export function generateKakuro(dateStr) {
  const rng = seededRng(dateSeed(dateStr, 'kakuro'));
  const g = new Uint8Array(CELLS);

  // Fill cells via constraint backtracking (no repeats within any run)
  const whiteCells = [];
  for (let i = 0; i < CELLS; i++) if (IS_WHITE[i]) whiteCells.push(i);

  function validDigits(i) {
    const hr = H_RUN_IDX[i], vr = V_RUN_IDX[i];
    const hUsed = new Set(BASE_RUNS[hr].cells.filter((c) => g[c]).map((c) => g[c]));
    const vUsed = new Set(BASE_RUNS[vr].cells.filter((c) => g[c]).map((c) => g[c]));
    const avail = [];
    for (let d = 1; d <= 9; d++) if (!hUsed.has(d) && !vUsed.has(d)) avail.push(d);
    return shuffle(avail, rng);
  }

  const order = shuffle(whiteCells.slice(), rng);
  function rec(pos) {
    if (pos === order.length) return true;
    const i = order[pos];
    for (const d of validDigits(i)) {
      g[i] = d;
      if (rec(pos + 1)) return true;
      g[i] = 0;
    }
    return false;
  }
  if (!rec(0)) return null;

  const runs = BASE_RUNS.map((tmpl) => ({
    dir: tmpl.dir,
    cells: tmpl.cells.slice(),
    sum: tmpl.cells.reduce((s, i) => s + g[i], 0),
  }));

  const solution = Array.from(g);

  // NO-GUESS GUARANTEE (same as Killer Sudoku): inject fewest given cells until
  // the logic-only solver finishes without guessing. Each given reveals one cell
  // from the cells logic couldn't yet place (using the partial progress grid).
  const givens = {};
  for (let inject = 0; inject <= 25; inject++) {
    if (solveKakuro(runs, 2, givens).count === 1) {
      // Unique — now check logic-solvable
      const logical = solveKakuroLogical(runs, givens);
      if (logical && logical.join(',') === solution.join(',')) {
        return { solution, runs, givens };
      }
      // Unique but needs guessing — reveal the cell logic got stuck on
      const partial = partialProgress(runs, givens, g);
      const stuck = partial.findIndex((v, i) => IS_WHITE[i] && !v && !(i in givens));
      if (stuck < 0) break;
      givens[stuck] = g[stuck];
    } else {
      // Not yet unique — reveal a stuck cell to break ambiguity
      const partial = partialProgress(runs, givens, g);
      const stuck = partial.findIndex((v, i) => IS_WHITE[i] && !v && !(i in givens));
      if (stuck < 0) break;
      givens[stuck] = g[stuck];
    }
  }
  return null; // could not achieve no-guess unique within 25 injections
}

// Advance logic as far as possible from current givens; return partially-filled grid.
function partialProgress(runs, givens, fullSolution) {
  const logical = solveKakuroLogical(runs, givens);
  if (logical) return logical;
  // Logic stalled — return what we can derive with just naked singles
  const g = new Uint8Array(CELLS);
  for (const k in givens) g[+k] = givens[k];
  for (let it = 0; it < 200; it++) {
    let changed = false;
    for (const run of runs) {
      if (run.cells.every((i) => g[i])) continue;
      const allowed = allowedDigits(run, g);
      for (const i of run.cells) {
        if (g[i]) continue;
        // cells in this run not yet placed: check if only one digit is allowed here
        const hr = H_RUN_IDX[i], vr = V_RUN_IDX[i];
        const hA = allowedDigits(runs[hr], g), vA = allowedDigits(runs[vr], g);
        const inter = [...hA].filter((d) => vA.has(d));
        if (inter.length === 1) { g[i] = inter[0]; changed = true; }
      }
    }
    if (!changed) break;
  }
  return Array.from(g);
}

// ─── week selection ───────────────────────────────────────────────────────────
function weekNumber(d) { return Math.floor(Math.floor(Date.parse(d + 'T00:00:00Z') / 86400000) / 7); }
export function puzzleForWeek(dateStr, pool) {
  const wn = weekNumber(dateStr);
  const seq = shuffle(pool.slice(), seededRng(dateSeed('week-' + wn, 'kakuro')));
  return seq[((wn % seq.length) + seq.length) % seq.length];
}

// ─── interactive board ─────────────────────────────────────────────────────────
export function mountKakuro(host, { date, pool } = {}) {
  if (!host) return;
  const today = date || new Date().toISOString().slice(0, 10);
  if (!pool) {
    fetch('/data/games/kakuro.json')
      .then((r) => r.json())
      .then((d) => mountKakuro(host, { date, pool: d.puzzles }))
      .catch(() => { host.innerHTML = '<p style="color:var(--muted)">This week\'s Kakuro could not load. Please refresh.</p>'; });
    return;
  }
  const puz = puzzleForWeek(today, pool);
  const { solution, runs, givens: puzGivens = {} } = puz;
  const sol = new Uint8Array(solution);
  const isGiven = new Uint8Array(CELLS);
  for (const k in puzGivens) isGiven[+k] = 1;

  const hRunOf = new Array(CELLS).fill(null);
  const vRunOf = new Array(CELLS).fill(null);
  runs.forEach((run) => run.cells.forEach((i) => {
    if (run.dir === 'h') hRunOf[i] = run; else vRunOf[i] = run;
  }));

  // Clue cells: the black cell immediately LEFT of an h-run carries the across sum;
  // the black cell immediately ABOVE a v-run carries the down sum.
  const hClueAt = new Map(), vClueAt = new Map();
  runs.forEach((run) => {
    if (run.dir === 'h') hClueAt.set(run.cells[0] - 1, run.sum);
    else vClueAt.set(run.cells[0] - COLS, run.sum);
  });

  const saved = loadState(SLUG, today);
  const values = new Uint8Array(
    (saved && Array.isArray(saved.values) && saved.values.length === CELLS) ? saved.values : CELLS
  );
  // Pre-fill given cells (locked)
  for (const k in puzGivens) values[+k] = puzGivens[k];
  let sel = -1, done = !!(saved && saved.done);

  host.innerHTML = '';
  host.className = 'kakuro';
  const status = el('p', 'kakuro__status', 'aria-live', 'polite');
  host.appendChild(status);

  const table = el('table', 'kakuro__grid');
  table.setAttribute('role', 'grid');
  table.setAttribute('aria-label', 'Kakuro grid');
  const cellEls = new Array(CELLS).fill(null);

  for (let r = 0; r < ROWS; r++) {
    const tr = el('tr', null);
    for (let c = 0; c < COLS; c++) {
      const i = idx(r, c);
      const td = el('td', null);
      if (IS_WHITE[i]) {
        td.className = 'kakuro__white';
        td.setAttribute('role', 'gridcell');
        td.setAttribute('tabindex', '-1');
        td.addEventListener('click', () => { sel = i; render(); td.focus(); });
        cellEls[i] = td;
      } else if (hClueAt.has(i) || vClueAt.has(i)) {
        td.className = 'kakuro__clue';
        td.setAttribute('aria-hidden', 'true');
        const inner = el('div', 'kakuro__clue-inner');
        // Convention: down sum (v) top-right half; across sum (h) bottom-left half.
        if (vClueAt.has(i)) inner.appendChild(el('span', 'kakuro__clue-down', null, null, String(vClueAt.get(i))));
        if (hClueAt.has(i)) inner.appendChild(el('span', 'kakuro__clue-across', null, null, String(hClueAt.get(i))));
        td.appendChild(inner);
      } else {
        td.className = 'kakuro__black';
        td.setAttribute('aria-hidden', 'true');
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  host.appendChild(table);

  const pad = el('div', 'kakuro__pad');
  for (let v = 1; v <= 9; v++) {
    const b = el('button', 'kakuro__key', null, null, String(v));
    b.type = 'button'; b.addEventListener('click', () => enter(v)); pad.appendChild(b);
  }
  const er = el('button', 'kakuro__key kakuro__key--wide', null, null, '⌫');
  er.type = 'button'; er.addEventListener('click', () => enter(0)); pad.appendChild(er);
  host.appendChild(pad);

  const toolsEl = el('div', 'kakuro__tools');
  toolsEl.append(tbtn('Check', check), tbtn('Reset', reset));
  host.appendChild(toolsEl);

  // Set initial focus tabindex
  const firstWhite = runs[0] && runs[0].cells[0];
  if (firstWhite != null && cellEls[firstWhite]) cellEls[firstWhite].setAttribute('tabindex', '0');

  table.addEventListener('keydown', (e) => {
    if (sel < 0) sel = firstWhite || 0;
    let next = sel;
    if (e.key === 'ArrowRight' && hRunOf[sel]) {
      const run = hRunOf[sel], pos = run.cells.indexOf(sel);
      next = run.cells[Math.min(pos + 1, run.cells.length - 1)];
    } else if (e.key === 'ArrowLeft' && hRunOf[sel]) {
      const run = hRunOf[sel], pos = run.cells.indexOf(sel);
      next = run.cells[Math.max(pos - 1, 0)];
    } else if (e.key === 'ArrowDown' && vRunOf[sel]) {
      const run = vRunOf[sel], pos = run.cells.indexOf(sel);
      next = run.cells[Math.min(pos + 1, run.cells.length - 1)];
    } else if (e.key === 'ArrowUp' && vRunOf[sel]) {
      const run = vRunOf[sel], pos = run.cells.indexOf(sel);
      next = run.cells[Math.max(pos - 1, 0)];
    } else if (/^[1-9]$/.test(e.key)) { enter(+e.key); return; }
    else if (e.key === '0' || e.key === 'Backspace') { enter(0); e.preventDefault(); return; }
    else return;
    if (IS_WHITE[next]) { sel = next; render(); if (cellEls[next]) cellEls[next].focus(); }
    e.preventDefault();
  });

  render();

  function enter(v) {
    if (done || sel < 0 || isGiven[sel]) return;
    values[sel] = v; persist(); render();
    if (values.every((v, i) => !IS_WHITE[i] || v === sol[i])) win();
  }

  function check() {
    let wrong = 0;
    for (let i = 0; i < CELLS; i++) if (IS_WHITE[i] && values[i] && values[i] !== sol[i]) wrong++;
    setStatus(wrong ? `${wrong} cell${wrong > 1 ? 's' : ''} wrong.` : 'No mistakes so far.');
    render(true);
  }

  function reset() {
    if (done) return;
    for (let i = 0; i < CELLS; i++) values[i] = isGiven[i] ? sol[i] : 0;
    persist(); render();
  }

  function win() {
    done = true; persist();
    recordResult(SLUG, today, { solved: true });
    setStatus('Solved.');
    offerShare(toolsEl, `Claridas Kakuro (week of ${today}) ✓ solved.`);
    render();
  }

  function persist() { saveState(SLUG, today, { values: Array.from(values), done }); }
  function setStatus(t) { status.textContent = t; }

  function render(markWrong = false) {
    for (let i = 0; i < CELLS; i++) {
      if (!IS_WHITE[i]) continue;
      const td = cellEls[i]; if (!td) continue;
      const v = values[i];
      const isSel = i === sel;
      const peer = !isSel && sel >= 0 && (
        (hRunOf[sel] && hRunOf[sel] === hRunOf[i]) ||
        (vRunOf[sel] && vRunOf[sel] === vRunOf[i])
      );
      td.classList.toggle('is-sel', isSel);
      td.classList.toggle('is-peer', !!peer);
      td.classList.toggle('is-given', !!isGiven[i]);
      td.classList.toggle('is-bad', !!(markWrong && v && v !== sol[i] && !isGiven[i]));
      td.textContent = v ? String(v) : '';
      td.setAttribute('aria-label',
        `Row ${Math.floor(i/COLS)+1} col ${i%COLS+1}${v ? ' ' + v : ', empty'}${isGiven[i] ? ' (given)' : ''}`
      );
      td.setAttribute('tabindex', isSel ? '0' : '-1');
    }
  }
}

function tbtn(label, fn) { const b = el('button', 'kakuro__tool', null, null, label); b.type = 'button'; b.addEventListener('click', fn); return b; }
function el(tag, cls, attr, val, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (attr) e.setAttribute(attr, val); if (text != null) e.textContent = text; return e; }

if (typeof document !== 'undefined') {
  document.querySelectorAll('[data-kakuro]').forEach((host) =>
    mountKakuro(host, { date: host.getAttribute('data-date') || undefined })
  );
}
