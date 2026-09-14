// GAM-009 — "Stacks", a block-carrying logic puzzle (an original take on the
// carry-a-block-to-build-steps mechanic). A LEVEL PACK, not a daily: hand-authored
// levels, each proven solvable by the BFS solver in this same module (single source of
// truth for the move rules — the game, the build-time test, and the solver all call the
// SAME step()). Reach the door. No enemies, no timer, no death; a stuck board is fixed
// with unlimited Undo or a one-key Restart.
//
// Rendered as CSS div tiles (no canvas — canvas is a dead end for screen readers and the
// no-dependency rule). Original name, original levels, original tile art.
import { recordResult, offerShare, loadState, saveState, getStats } from './game-shell.js';

// ---- Tiles ---------------------------------------------------------------------
const BRICK = '#', BLOCK = 'b', DOOR = 'D', PLAYER = '@';
export const isBrickChar = (c) => c === BRICK;

// A level parses into: static bricks + door (immutable) and a mutable state
// { x, y, face, carry, blocks:Set('y,x') }.
export function parseLevel(grid) {
  const rows = grid.length, cols = Math.max(...grid.map((r) => r.length));
  const bricks = new Set(), blocks = new Set();
  let start = null, door = null;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const c = grid[y][x] || ' ';
      if (c === BRICK) bricks.add(y + ',' + x);
      else if (c === BLOCK) blocks.add(y + ',' + x);
      else if (c === PLAYER) start = { x, y };
      else if (c === DOOR) door = { x, y };
    }
  }
  return { rows, cols, bricks, door, start, blocks };
}
export function initState(level) {
  return { x: level.start.x, y: level.start.y, face: 1, carry: false, blocks: new Set(level.blocks) };
}

// A cell is solid if it's a brick, a resting block, off the sides, or below the floor.
function solid(level, s, y, x) {
  if (x < 0 || x >= level.cols) return true;
  if (y >= level.rows) return true;     // floor
  if (y < 0) return false;              // open sky
  if (level.bricks.has(y + ',' + x)) return true;
  return s.blocks.has(y + ',' + x);
}
// Let the player fall to rest on the nearest solid below.
function settle(level, s) {
  while (!solid(level, s, s.y + 1, s.x)) s.y++;
}
function clone(s) { return { x: s.x, y: s.y, face: s.face, carry: s.carry, blocks: new Set(s.blocks) }; }

// The ONE move function. action ∈ {'left','right','up','act'}. Returns a NEW state, or
// null if the move is illegal (no change). 'act' = pick up if empty-handed, else drop.
export function step(level, state) {
  return (action) => {
    let s = clone(state);
    if (action === 'left' || action === 'right') {
      const d = action === 'left' ? -1 : 1;
      s.face = d;
      const nx = s.x + d;
      const frontSolid = solid(level, s, s.y, nx);
      if (!frontSolid) {
        // step into the empty cell in front — but if carrying, the head cell must be clear too
        if (s.carry && solid(level, s, s.y - 1, nx)) return null;
        s.x = nx; settle(level, s);
        return s;
      }
      // climb one up: front is solid, the cell above-front and above-player must be clear
      if (solid(level, s, s.y - 1, nx)) return null;        // wall too tall / blocked
      if (solid(level, s, s.y - 1, s.x)) return null;        // ceiling above player
      if (s.carry && solid(level, s, s.y - 2, nx)) return null; // no room for carried block
      if (s.carry && solid(level, s, s.y - 2, s.x)) return null;
      s.x = nx; s.y = s.y - 1; settle(level, s);
      return s;
    }
    if (action === 'up') {
      // 'up' is a courtesy alias for climb in the facing direction
      return step(level, s)(s.face === -1 ? 'left' : 'right');
    }
    if (action === 'act') {
      const fx = s.x + s.face;
      if (!s.carry) {
        // pick up the block directly in front, at feet level, with nothing on top of it
        if (!s.blocks.has(s.y + ',' + fx)) return null;
        if (solid(level, s, s.y - 1, fx)) return null;   // something on top of the block
        if (solid(level, s, s.y - 1, s.x)) return null;  // no room above the player's head
        s.blocks.delete(s.y + ',' + fx);
        s.carry = true;
        return s;
      }
      // drop: the carried block is set down at feet level in the cell in front. Blocks do
      // NOT fall — they stay where placed, which is exactly what lets you build a staircase
      // upward (stand on a block, drop the next one one step higher and further).
      if (solid(level, s, s.y, fx)) return null;         // feet-front cell occupied
      if (solid(level, s, s.y - 1, fx)) return null;     // head-front cell blocks the path out
      s.blocks.add(s.y + ',' + fx);
      s.carry = false;
      return s;
    }
    return null;
  };
}

export function won(level, s) { return s.x === level.door.x && s.y === level.door.y; }

// Canonical key for the solver's visited-set.
function key(s) { return s.x + '|' + s.y + '|' + s.face + '|' + (s.carry ? 1 : 0) + '|' + [...s.blocks].sort().join(';'); }

// BFS solver — returns the shortest action sequence to the door, or null if unsolvable.
// This is what AC1 uses to PROVE every shipped level is solvable.
export function solve(grid, limit = 200000) {
  const level = parseLevel(grid);
  const s0 = initState(level); settle(level, s0);
  if (won(level, s0)) return [];
  const q = [[s0, []]]; const seen = new Set([key(s0)]);
  let head = 0;
  while (head < q.length && head < limit) {
    const [s, path] = q[head++];
    for (const a of ['left', 'right', 'act']) {
      const ns = step(level, s)(a);
      if (!ns) continue;
      const k = key(ns);
      if (seen.has(k)) continue;
      const np = path.concat(a);
      if (won(level, ns)) return np;
      seen.add(k); q.push([ns, np]);
    }
  }
  return null;
}

// ---- Interactive board (browser) -----------------------------------------------
export function mountStacks(host, { levelIndex = 0, levels } = {}) {
  if (!host || !levels || !levels.length) return;
  const li = Math.max(0, Math.min(levelIndex, levels.length - 1));
  const def = levels[li];
  const level = parseLevel(def.grid);
  const slug = 'stacks-' + def.id;
  let state = initState(level); settle(level, state);
  const undoStack = [];
  let moves = 0, done = false;

  host.innerHTML = '';
  host.className = 'stacks';
  const info = el('p', 'stacks__info');
  const live = el('p', 'stacks__grid-desc', 'aria-live', 'polite');
  live.classList.add('visually-hidden');
  const boardEl = el('div', 'stacks__board');
  boardEl.setAttribute('role', 'img');
  const pad = el('div', 'stacks__pad');
  const tools = el('div', 'stacks__tools');

  // touch pad: ← ↑(climb) → and Grab/Drop
  const mk = (label, aria, fn) => { const b = el('button', 'stacks__key', null, null, label); b.type = 'button'; b.setAttribute('aria-label', aria); b.addEventListener('click', fn); return b; };
  pad.append(
    mk('◄', 'Move left', () => act('left')),
    mk('▲', 'Climb', () => act('up')),
    mk('►', 'Move right', () => act('right')),
    mk('Grab / Drop', 'Grab or drop a block', () => act('act')),
  );
  tools.append(
    toolBtn('Undo', undo),
    toolBtn('Restart', restart),
  );
  host.append(info, live, boardEl, pad, tools);

  boardEl.tabIndex = 0;
  boardEl.addEventListener('keydown', (e) => {
    const map = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up' };
    if (map[e.key]) { act(map[e.key]); e.preventDefault(); }
    else if (e.key === ' ' || e.key === 'Enter' || e.key === 'x' || e.key === 'X') { act('act'); e.preventDefault(); }
    else if (e.key === 'z' || e.key === 'Z') { undo(); e.preventDefault(); }
    else if (e.key === 'r' || e.key === 'R') { restart(); e.preventDefault(); }
  });

  render();

  function act(a) {
    if (done) return;
    const ns = step(level, state)(a);
    if (!ns) return;
    undoStack.push(state);
    state = ns; moves++;
    render();
    if (won(level, state)) finish();
  }
  function undo() { if (done || !undoStack.length) return; state = undoStack.pop(); moves++; render(); }
  function restart() { state = initState(level); settle(level, state); undoStack.length = 0; moves = 0; done = false; render(); }

  function finish() {
    done = true;
    const prev = loadState(slug, 'pack');
    const best = prev && prev.best != null ? Math.min(prev.best, moves) : moves;
    saveState(slug, 'pack', { done: true, best });
    recordResult(slug, 'pack', { solved: true, guesses: moves });
    info.textContent = 'Level ' + def.id + ' solved in ' + moves + ' moves (best ' + best + ').';
    offerShare(tools, 'Claridas Stacks — level ' + def.id + ' solved in ' + moves + ' moves.');
    // unlock the next level in the pack
    const unlocked = getUnlocked();
    if (li + 1 < levels.length) { saveState('stacks-unlocked', 'pack', { max: Math.max(unlocked, li + 1) }); }
    render();
  }

  function render() {
    // build the grid of div tiles
    boardEl.style.setProperty('--cols', level.cols);
    boardEl.innerHTML = '';
    const descRows = [];
    for (let y = 0; y < level.rows; y++) {
      let line = '';
      for (let x = 0; x < level.cols; x++) {
        const t = el('div', 'stacks__cell');
        let kind = 'empty', ch = '·';
        if (level.bricks.has(y + ',' + x)) { kind = 'brick'; ch = '#'; }
        else if (state.blocks.has(y + ',' + x)) { kind = 'block'; ch = 'b'; }
        if (level.door.x === x && level.door.y === y) { kind = 'door'; ch = 'D'; }
        if (state.x === x && state.y === y) { kind = state.carry ? 'player carry' : 'player'; ch = state.carry ? 'P' : 'p'; }
        // carried block sits above the head
        if (state.carry && state.x === x && state.y - 1 === y) { t.classList.add('stacks__cell--carry'); if (kind === 'empty') ch = 'b'; }
        t.classList.add('stacks__cell--' + kind.split(' ')[0]);
        if (kind.startsWith('player')) t.dataset.face = state.face === -1 ? 'l' : 'r';
        boardEl.appendChild(t);
        line += ch;
      }
      descRows.push(line);
    }
    info.textContent = done ? info.textContent : ('Level ' + def.id + ' · ' + (def.name || '') + ' · moves ' + moves + (state.carry ? ' · carrying a block' : ''));
    // screen-reader grid description
    live.textContent = 'Grid, ' + level.rows + ' by ' + level.cols + '. ' + descRows.join(' / ') +
      '. Player at row ' + (state.y + 1) + ' column ' + (state.x + 1) + ', facing ' + (state.face === -1 ? 'left' : 'right') + (state.carry ? ', carrying a block' : '') + '.';
  }
  function getUnlocked() { const u = loadState('stacks-unlocked', 'pack'); return u && u.max != null ? u.max : 0; }
}

function el(tag, cls, attr, val, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (attr) e.setAttribute(attr, val);
  if (text != null) e.textContent = text;
  return e;
}
function toolBtn(label, fn) { const b = el('button', 'stacks__tool', null, null, label); b.type = 'button'; b.addEventListener('click', fn); return b; }

// Auto-mount: a host with data-stacks + data-level (0-based) + a JSON levels payload by id.
if (typeof document !== 'undefined') {
  const host = document.querySelector('[data-stacks]');
  if (host) {
    const payload = document.getElementById('stacks-levels');
    let levels = [];
    try { levels = JSON.parse(payload.textContent).levels; } catch (e) { levels = []; }
    mountStacks(host, { levelIndex: parseInt(host.getAttribute('data-level') || '0', 10), levels });
  }
}
