// GAM-006 — Claridas daily Sudoku. One self-contained client-side module: a
// date-seeded generator (backtracking fill → uniqueness-preserving clue removal),
// a technique-based difficulty rater that guarantees a puzzle is solvable WITHOUT
// guessing, and the full interactive board (pencil marks, digit highlight, remaining
// counter, undo, Check, Reveal, keyboard + touch). Deterministic per date+tier, so
// every reader gets the same four puzzles and a re-derivation always agrees.
//
// Zero deps beyond the shared shell, no network, CSP-clean (same-origin ES module).
import { dateSeed, seededRng, shuffle, recordResult, offerShare, loadState, saveState } from './game-shell.js';

const N = 9, CELLS = 81;
const TIERS = ['easy', 'medium', 'hard', 'expert'];
const TIER_LABEL = { easy: 'Easy', medium: 'Medium', hard: 'Hard', expert: 'Expert' };
// Minimum clues to leave per tier — a floor that keeps the removal loop from thinning
// a grid past a humane count. The technique rater sets the real difficulty; this only
// bounds the search so Easy stays fuller than Expert.
const MIN_CLUES = { easy: 40, medium: 34, hard: 30, expert: 26 };

// ---- Unit geometry (rows, columns, boxes) --------------------------------------
const ROW = i => Math.floor(i / N);
const COL = i => i % N;
const BOX = i => Math.floor(ROW(i) / 3) * 3 + Math.floor(COL(i) / 3);
// Peers: the 20 cells sharing a row, column, or box with cell i (precomputed once).
const PEERS = (() => {
  const p = Array.from({ length: CELLS }, () => new Set());
  for (let i = 0; i < CELLS; i++) {
    for (let j = 0; j < CELLS; j++) {
      if (i === j) continue;
      if (ROW(i) === ROW(j) || COL(i) === COL(j) || BOX(i) === BOX(j)) p[i].add(j);
    }
  }
  return p.map(s => [...s]);
})();
// The 27 units (9 rows + 9 cols + 9 boxes) as arrays of cell indices.
const UNITS = (() => {
  const u = [];
  for (let r = 0; r < N; r++) u.push([...Array(N)].map((_, c) => r * N + c));
  for (let c = 0; c < N; c++) u.push([...Array(N)].map((_, r) => r * N + c));
  for (let b = 0; b < N; b++) {
    const br = Math.floor(b / 3) * 3, bc = (b % 3) * 3, box = [];
    for (let dr = 0; dr < 3; dr++) for (let dc = 0; dc < 3; dc++) box.push((br + dr) * N + bc + dc);
    u.push(box);
  }
  return u;
})();

// ---- Backtracking solver (counts solutions up to `limit`) ----------------------
// Returns { count, solution }. count is capped at `limit` (2 is enough to test
// uniqueness). Uses the most-constrained-cell heuristic for speed.
export function solveCount(grid, limit = 2) {
  const g = grid.slice();
  let count = 0, solution = null;
  function candidates(i) {
    const used = new Set();
    for (const p of PEERS[i]) if (g[p]) used.add(g[p]);
    const out = [];
    for (let v = 1; v <= N; v++) if (!used.has(v)) out.push(v);
    return out;
  }
  function recurse() {
    if (count >= limit) return;
    let best = -1, bestC = null;
    for (let i = 0; i < CELLS; i++) {
      if (g[i]) continue;
      const c = candidates(i);
      if (c.length === 0) return;          // dead end
      if (!bestC || c.length < bestC.length) { best = i; bestC = c; if (c.length === 1) break; }
    }
    if (best === -1) { count++; if (!solution) solution = g.slice(); return; }
    for (const v of bestC) {
      g[best] = v;
      recurse();
      g[best] = 0;
      if (count >= limit) return;
    }
  }
  recurse();
  return { count, solution };
}

// ---- Seeded full-grid generator ------------------------------------------------
// Randomised backtracking fill: try digits in a seeded-shuffled order at the first
// empty cell. Produces a complete valid solution deterministic to the rng.
function fillGrid(rng) {
  const g = new Array(CELLS).fill(0);
  function recurse(pos) {
    if (pos === CELLS) return true;
    if (g[pos]) return recurse(pos + 1);
    const used = new Set();
    for (const p of PEERS[pos]) if (g[p]) used.add(g[p]);
    const order = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9], rng);
    for (const v of order) {
      if (used.has(v)) continue;
      g[pos] = v;
      if (recurse(pos + 1)) return true;
      g[pos] = 0;
    }
    return false;
  }
  recurse(0);
  return g;
}

// ---- Technique-based difficulty rater ------------------------------------------
// A candidate-propagation solver using only NON-GUESSING human techniques, in order
// of difficulty. Returns the hardest technique it needed, or null if the techniques
// can't finish (→ the puzzle would require guessing; we reject it). This is what
// guarantees "no shipped puzzle requires guessing" across every tier.
function candMap(grid) {
  const cand = new Array(CELLS).fill(null);
  for (let i = 0; i < CELLS; i++) {
    if (grid[i]) continue;
    const s = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (const p of PEERS[i]) s.delete(grid[p]);
    cand[i] = s;
  }
  return cand;
}
export function rate(puzzle) {
  const g = puzzle.slice();
  let hardest = 0; // 1 naked-single, 2 hidden-single, 3 pair/locked
  for (;;) {
    if (g.every(v => v)) return hardest;   // solved by logic alone
    const cand = candMap(g);
    // dead cell → contradiction (shouldn't happen on a unique puzzle) → bail
    for (let i = 0; i < CELLS; i++) if (!g[i] && cand[i].size === 0) return null;

    // 1) Naked single.
    let did = false;
    for (let i = 0; i < CELLS; i++) {
      if (!g[i] && cand[i].size === 1) { g[i] = [...cand[i]][0]; hardest = Math.max(hardest, 1); did = true; }
    }
    if (did) continue;

    // 2) Hidden single: a digit with exactly one home in a unit.
    for (const unit of UNITS) {
      for (let v = 1; v <= N; v++) {
        const spots = unit.filter(i => !g[i] && cand[i].has(v));
        if (spots.length === 1) { g[spots[0]] = v; hardest = Math.max(hardest, 2); did = true; }
      }
    }
    if (did) continue;

    // 3) Locked candidates (pointing/claiming) + naked pairs — candidate elimination
    // only; if any elimination happens we loop again and let singles finish.
    if (eliminate(g, cand)) { hardest = Math.max(hardest, 3); continue; }

    return null; // no technique applies → would need a guess → reject
  }
}
// Candidate eliminations that don't place a digit. Returns true if it changed anything.
function eliminate(g, cand) {
  let changed = false;
  // Naked pairs: two cells in a unit with the same two candidates remove those from peers in the unit.
  for (const unit of UNITS) {
    const open = unit.filter(i => !g[i]);
    for (let a = 0; a < open.length; a++) {
      const ca = cand[open[a]];
      if (ca.size !== 2) continue;
      for (let b = a + 1; b < open.length; b++) {
        const cb = cand[open[b]];
        if (cb.size !== 2 && cb.size !== 0) continue;
        if (cb.size === 2 && [...ca].every(v => cb.has(v))) {
          for (const i of open) {
            if (i === open[a] || i === open[b]) continue;
            for (const v of ca) if (cand[i].delete(v)) changed = true;
          }
        }
      }
    }
  }
  // Pointing: in a box, if a digit's candidates all share one row/col, remove it from the rest of that row/col.
  for (let b = 0; b < N; b++) {
    const box = UNITS[18 + b];
    for (let v = 1; v <= N; v++) {
      const spots = box.filter(i => !g[i] && cand[i].has(v));
      if (spots.length < 2) continue;
      if (spots.every(i => ROW(i) === ROW(spots[0]))) {
        for (const i of UNITS[ROW(spots[0])]) if (BOX(i) !== b && cand[i] && cand[i].delete(v)) changed = true;
      }
      if (spots.every(i => COL(i) === COL(spots[0]))) {
        for (const i of UNITS[9 + COL(spots[0])]) if (BOX(i) !== b && cand[i] && cand[i].delete(v)) changed = true;
      }
    }
  }
  return changed;
}

// ---- Generate one puzzle for a given seed + tier -------------------------------
// Fill a solution, then remove clues (in seeded order, symmetric pairs) as long as
// the puzzle keeps a unique solution AND stays solvable by this tier's technique
// ceiling. Returns { puzzle, solution, tier }.
export function generate(dateStr, tier) {
  const rng = seededRng(dateSeed(dateStr, 'sudoku-' + tier));
  const solution = fillGrid(rng);
  const puzzle = solution.slice();
  const cap = { easy: 1, medium: 2, hard: 3, expert: 3 }[tier];
  const floor = MIN_CLUES[tier];
  const order = shuffle([...Array(CELLS).keys()], rng);
  let clues = CELLS;
  for (const i of order) {
    if (clues <= floor) break;
    const j = CELLS - 1 - i; // 180° rotational symmetry
    const removed = [];
    for (const k of (i === j ? [i] : [i, j])) if (puzzle[k]) { removed.push([k, puzzle[k]]); puzzle[k] = 0; }
    if (!removed.length) continue;
    const unique = solveCount(puzzle, 2).count === 1;
    const diff = unique ? rate(puzzle) : null;
    // Keep the removal only if the puzzle stays unique AND solvable within this tier's
    // technique ceiling (so Easy needs only singles, Expert may need pairs/locked — but
    // NEVER a guess: rate() returns null when guessing would be required).
    const ok = unique && diff !== null && diff <= cap && (tier !== 'expert' || diff >= 3 || clues - removed.length <= floor + 4);
    if (ok) clues -= removed.length;
    else for (const [k, v] of removed) puzzle[k] = v; // restore
  }
  return { puzzle, solution, tier };
}

// ---- Interactive board ---------------------------------------------------------
// Renders into a host element and wires all input. Called from the page with the
// grid host, the tier, and the puzzle date.
export function mountSudoku(host, { tier = 'easy', date } = {}) {
  if (!host) return;
  const today = date || new Date().toISOString().slice(0, 10);
  const slug = 'sudoku-' + tier;
  const { puzzle, solution } = generate(today, tier);
  const given = puzzle.map(v => v !== 0);

  // Restore an in-progress board for this date/tier if present.
  const saved = loadState(slug, today);
  const values = saved?.values?.length === CELLS ? saved.values.slice() : puzzle.slice();
  const notes = saved?.notes?.length === CELLS ? saved.notes.map(a => new Set(a)) : Array.from({ length: CELLS }, () => new Set());
  const history = [];
  let sel = -1, pencil = false, done = !!saved?.done;

  host.innerHTML = '';
  host.className = 'sudoku';

  const status = el('p', 'sudoku__status', 'aria-live', 'polite');
  const board = el('div', 'sudoku__grid');
  board.setAttribute('role', 'grid');
  board.setAttribute('aria-label', 'Sudoku grid, ' + TIER_LABEL[tier]);
  const cellEls = [];
  for (let i = 0; i < CELLS; i++) {
    const c = el('button', 'sudoku__cell');
    c.type = 'button';
    c.dataset.i = i;
    c.setAttribute('role', 'gridcell');
    if (given[i]) c.classList.add('is-given');
    if (COL(i) % 3 === 2 && COL(i) !== 8) c.classList.add('br');
    if (ROW(i) % 3 === 2 && ROW(i) !== 8) c.classList.add('bb');
    c.addEventListener('click', () => select(i));
    cellEls.push(c);
    board.appendChild(c);
  }

  // On-screen number pad (touch) + a remaining-per-digit counter.
  const pad = el('div', 'sudoku__pad');
  const padBtns = {};
  for (let v = 1; v <= 9; v++) {
    const b = el('button', 'sudoku__key');
    b.type = 'button';
    b.innerHTML = '<span class="k">' + v + '</span><span class="rem" data-v="' + v + '"></span>';
    b.addEventListener('click', () => enter(v));
    padBtns[v] = b;
    pad.appendChild(b);
  }
  const erase = el('button', 'sudoku__key sudoku__key--wide', null, null, '⌫');
  erase.type = 'button';
  erase.addEventListener('click', () => enter(0));
  pad.appendChild(erase);

  const tools = el('div', 'sudoku__tools');
  const pencilBtn = toolBtn('Pencil', () => { pencil = !pencil; pencilBtn.setAttribute('aria-pressed', String(pencil)); pencilBtn.classList.toggle('is-on', pencil); });
  pencilBtn.setAttribute('aria-pressed', 'false');
  tools.append(
    pencilBtn,
    toolBtn('Undo', undo),
    toolBtn('Check', check),
    toolBtn('Reveal cell', revealCell),
  );

  host.append(status, board, pad, tools);
  render();

  // --- interaction ---
  function select(i) { sel = i; render(); }
  function pushHistory() { history.push({ values: values.slice(), notes: notes.map(s => [...s]) }); if (history.length > 200) history.shift(); }
  function persist() { saveState(slug, today, { values, notes: notes.map(s => [...s]), done }); }

  function enter(v) {
    if (done || sel < 0 || given[sel]) return;
    pushHistory();
    if (v === 0) { values[sel] = 0; notes[sel].clear(); }
    else if (pencil) { values[sel] = 0; notes[sel].has(v) ? notes[sel].delete(v) : notes[sel].add(v); }
    else { values[sel] = v; notes[sel].clear(); }
    persist();
    render();
    if (values.every((x, k) => x === solution[k])) win();
  }
  function undo() {
    const prev = history.pop();
    if (!prev) return;
    for (let i = 0; i < CELLS; i++) { values[i] = prev.values[i]; notes[i] = new Set(prev.notes[i]); }
    persist(); render();
  }
  function check() {
    let wrong = 0;
    for (let i = 0; i < CELLS; i++) if (values[i] && values[i] !== solution[i]) wrong++;
    setStatus(wrong === 0 ? 'No mistakes so far.' : wrong + (wrong === 1 ? ' cell is wrong.' : ' cells are wrong.'));
    render(wrong > 0);
  }
  function revealCell() {
    if (done || sel < 0 || given[sel]) return;
    pushHistory();
    values[sel] = solution[sel]; notes[sel].clear();
    persist(); render();
    if (values.every((x, k) => x === solution[k])) win();
  }
  function win() {
    if (done) return;
    done = true; persist();
    recordResult(slug, today, { solved: true });
    setStatus('Solved — ' + TIER_LABEL[tier] + ', ' + today + '.');
    offerShare(tools, 'Claridas Sudoku (' + TIER_LABEL[tier] + ') ' + today + ' ✓ solved.');
    render();
  }

  function render(markWrong = false) {
    for (let i = 0; i < CELLS; i++) {
      const c = cellEls[i];
      c.classList.toggle('is-sel', i === sel);
      c.classList.toggle('is-peer', sel >= 0 && i !== sel && PEERS[sel].includes(i));
      const v = values[i];
      const hl = sel >= 0 && values[sel] && v === values[sel];
      c.classList.toggle('is-hl', !!hl && v !== 0);
      const bad = markWrong && v && v !== solution[i] && !given[i];
      c.classList.toggle('is-bad', !!bad);
      if (v) {
        // invalid cells carry BOTH colour and a symbol (never colour alone).
        c.textContent = bad ? v + '✕' : String(v);
        c.setAttribute('aria-label', 'Row ' + (ROW(i) + 1) + ' column ' + (COL(i) + 1) + ', ' + v + (given[i] ? ' given' : ''));
      } else if (notes[i].size) {
        c.textContent = '';
        c.setAttribute('aria-label', 'Row ' + (ROW(i) + 1) + ' column ' + (COL(i) + 1) + ', notes ' + [...notes[i]].sort().join(' '));
        const n = el('span', 'sudoku__notes');
        for (let d = 1; d <= 9; d++) { const s = el('span', null, null, null, notes[i].has(d) ? String(d) : ''); n.appendChild(s); }
        c.appendChild(n);
      } else {
        c.textContent = '';
        c.setAttribute('aria-label', 'Row ' + (ROW(i) + 1) + ' column ' + (COL(i) + 1) + ', empty');
      }
    }
    // per-digit remaining counter on the pad
    for (let v = 1; v <= 9; v++) {
      const placed = values.filter(x => x === v).length;
      const rem = padBtns[v].querySelector('.rem');
      if (rem) rem.textContent = placed >= 9 ? '' : String(9 - placed);
      padBtns[v].classList.toggle('is-full', placed >= 9);
    }
  }
  function setStatus(t) { status.textContent = t; }

  // keyboard: arrows move, 1-9 enter, 0/Backspace clear, P/N toggle pencil.
  board.addEventListener('keydown', (e) => {
    if (sel < 0) sel = 0;
    let r = ROW(sel), c = COL(sel), handled = true;
    if (e.key === 'ArrowUp') r = (r + 8) % 9;
    else if (e.key === 'ArrowDown') r = (r + 1) % 9;
    else if (e.key === 'ArrowLeft') c = (c + 8) % 9;
    else if (e.key === 'ArrowRight') c = (c + 1) % 9;
    else if (/^[1-9]$/.test(e.key)) { enter(+e.key); return; }
    else if (e.key === '0' || e.key === 'Backspace' || e.key === 'Delete') { enter(0); e.preventDefault(); return; }
    else if (e.key === 'p' || e.key === 'P' || e.key === 'n' || e.key === 'N') { pencilBtn.click(); return; }
    else handled = false;
    if (handled) { sel = r * N + c; render(); cellEls[sel].focus(); e.preventDefault(); }
  });
  board.tabIndex = 0;
}

// ---- tiny DOM helpers ----------------------------------------------------------
function el(tag, cls, attr, val, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (attr) e.setAttribute(attr, val);
  if (text != null) e.textContent = text;
  return e;
}
function toolBtn(label, fn) {
  const b = el('button', 'sudoku__tool', null, null, label);
  b.type = 'button';
  b.addEventListener('click', fn);
  return b;
}

// Auto-mount when a host element declares the tier via data attributes, and wire any
// tier tabs (a container of [data-tier] buttons) to re-mount the host — all input stays
// in this module, so the page needs no inline script (CSP-clean).
if (typeof document !== 'undefined') {
  document.querySelectorAll('[data-sudoku]').forEach((host) => {
    const date = host.getAttribute('data-date') || undefined;
    let tier = host.getAttribute('data-tier') || 'easy';
    mountSudoku(host, { tier, date });
    const tabs = document.querySelector('[data-sudoku-tabs]');
    if (tabs) {
      tabs.querySelectorAll('[data-tier]').forEach((btn) => {
        btn.addEventListener('click', () => {
          tier = btn.getAttribute('data-tier');
          tabs.querySelectorAll('[data-tier]').forEach((b) => {
            const on = b === btn;
            b.classList.toggle('is-on', on);
            b.setAttribute('aria-selected', String(on));
          });
          mountSudoku(host, { tier, date });
        });
      });
    }
  });
}
