// GAM-008 — "The Desks", the daily grouping puzzle. Sixteen tiles, four groups of
// four, four mistakes allowed — the Connections format, mapped onto Claridas's own
// desks. Puzzles are CURATED (not generated): the engine picks today's puzzle from a
// pool by UTC day index and plays it. Group identity never rides on colour alone (each
// solved group shows a difficulty glyph + its name). The share grid shows the ORDER
// groups were solved without revealing the categories.
//
// Zero third-party scripts; word lists/puzzles fetched same-origin (CSP connect-src 'self').
import { dateSeed, seededRng, shuffle, recordResult, offerShare, loadState, saveState } from './game-shell.js';

const SLUG = 'desks', GROUPS = 4, SIZE = 4, MAX_MISTAKES = 4;
// Difficulty glyph — a non-colour cue for each group's tier (easiest→hardest).
const DIFF_GLYPH = { 1: '●', 2: '◆', 3: '▲', 4: '★' };
// Share-grid emoji, keyed by a group's solved-order rank (not its category).
const SHARE = ['🟩', '🟦', '🟪', '🟥'];

function dayNumber(dateStr) { return Math.floor(Date.parse(dateStr + 'T00:00:00Z') / 86400000); }

// Pick today's puzzle from the pool (deterministic per UTC date).
export function puzzleFor(dateStr, puzzles) {
  const n = puzzles.length;
  return puzzles[((dayNumber(dateStr) % n) + n) % n];
}

// Build the 16-tile play order: tag each member with its group index, then seeded-shuffle.
export function layout(puzzle, dateStr) {
  const tiles = [];
  puzzle.groups.forEach((g, gi) => g.members.forEach((word) => tiles.push({ word, group: gi })));
  return shuffle(tiles, seededRng(dateSeed(dateStr, 'desks-' + puzzle.id)));
}

export async function mountDesks(host, { date } = {}) {
  if (!host) return;
  const today = date || new Date().toISOString().slice(0, 10);
  let pool;
  try { pool = (await (await fetch('/data/games/desks.json')).json()).puzzles; }
  catch (e) { host.innerHTML = '<p style="color:var(--muted)">Today\'s grouping puzzle could not load. Please refresh.</p>'; return; }
  const puzzle = puzzleFor(today, pool);
  const tiles = layout(puzzle, today);

  const saved = loadState(SLUG, today);
  const solvedGroups = Array.isArray(saved?.solved) ? saved.solved.slice() : []; // group indices, in solve order
  const attempts = Array.isArray(saved?.attempts) ? saved.attempts.slice() : []; // arrays of group-indices per guess (for the share grid)
  let mistakes = saved?.mistakes || 0;
  let selected = [];               // indices into `tiles`
  let done = !!saved?.done;

  host.innerHTML = '';
  host.className = 'desks';
  const live = el('p', 'desks__status', 'aria-live', 'polite');
  const solvedBox = el('div', 'desks__solved');
  const grid = el('div', 'desks__grid');
  grid.setAttribute('role', 'group');
  grid.setAttribute('aria-label', 'Sixteen tiles — select four that belong together');
  const mistakeEl = el('p', 'desks__mistakes');
  const controls = el('div', 'desks__controls');
  const shuffleBtn = ctlBtn('Shuffle', doShuffle);
  const clearBtn = ctlBtn('Deselect all', () => { selected = []; draw(); });
  const submitBtn = ctlBtn('Submit', submit);
  submitBtn.classList.add('desks__submit');
  controls.append(shuffleBtn, clearBtn, submitBtn);
  host.append(live, solvedBox, grid, mistakeEl, controls);
  draw();
  if (done) finish(solvedGroups.length === GROUPS);

  function tileState() {
    // remaining tiles = those whose group isn't solved yet, in current `tiles` order
    return tiles.map((t, i) => ({ ...t, i })).filter((t) => !solvedGroups.includes(t.group));
  }
  function doShuffle() {
    if (done) return;
    // reshuffle only the unsolved tiles (seeded reshuffle by attempt count → stable within a state)
    const rng = seededRng(dateSeed(today, 'desks-shuffle-' + attempts.length + '-' + Math.floor(mistakes)));
    const idx = tileState().map((t) => t.i);
    const shuffledIdx = shuffle(idx, rng);
    // rewrite tiles array positions for unsolved slots
    const remaining = shuffledIdx.map((i) => tiles[i]);
    let r = 0;
    for (let i = 0; i < tiles.length; i++) if (!solvedGroups.includes(tiles[i].group)) tiles[i] = remaining[r++];
    selected = [];
    draw();
  }

  function submit() {
    if (done || selected.length !== SIZE) return;
    const groupsSel = selected.map((i) => tiles[i].group);
    attempts.push(groupsSel.slice());
    const uniq = [...new Set(groupsSel)];
    if (uniq.length === 1) {
      // correct group
      solvedGroups.push(uniq[0]);
      selected = [];
      persist();
      draw();
      if (solvedGroups.length === GROUPS) { done = true; persist(); finish(true); }
      else announce('Group found: ' + puzzle.groups[uniq[0]].name + '.');
    } else {
      mistakes++;
      // "one away" — three of four share a group
      const counts = {};
      for (const g of groupsSel) counts[g] = (counts[g] || 0) + 1;
      const oneAway = Object.values(counts).some((c) => c === 3);
      announce(oneAway ? 'One away.' : 'Not a group.');
      persist();
      draw();
      if (mistakes >= MAX_MISTAKES) { done = true; persist(); finish(false); }
    }
  }

  function finish(won) {
    // reveal any unsolved groups (loss) in the solved box
    recordResult(SLUG, today, { solved: won, guesses: won ? attempts.length : null });
    draw();
    announce(won ? ('Solved with ' + mistakes + ' mistake' + (mistakes === 1 ? '' : 's') + '.') : 'Out of guesses — all groups revealed.');
    // share grid: each attempt is a row of 4 emoji keyed by solve-RANK of each tile's group
    const rankOf = {};
    solvedGroups.forEach((g, r) => { rankOf[g] = r; });
    // any never-solved group gets a trailing rank so the emoji is stable but category-free
    puzzle.groups.forEach((_, g) => { if (!(g in rankOf)) rankOf[g] = Object.keys(rankOf).length; });
    const rows = attempts.map((a) => a.map((g) => SHARE[rankOf[g] % SHARE.length]).join('')).join('\n');
    const head = 'Claridas The Desks ' + today + ' ' + (won ? '✓' : 'X') + ' (' + mistakes + '/' + MAX_MISTAKES + ' mistakes)';
    offerShare(controls, head + '\n' + rows);
  }

  function persist() { saveState(SLUG, today, { solved: solvedGroups, attempts, mistakes, done }); }
  function announce(t) { live.textContent = t; }

  function draw() {
    // solved groups (with name + difficulty glyph — identity is NOT colour-only)
    solvedBox.innerHTML = '';
    const reveal = done ? puzzle.groups.map((_, g) => g) : solvedGroups;
    reveal.forEach((g) => {
      const grp = puzzle.groups[g];
      const band = el('div', 'desks__band');
      band.dataset.rank = String((solvedGroups.indexOf(g) + SHARE.length) % SHARE.length);
      const wasSolved = solvedGroups.includes(g);
      band.classList.toggle('desks__band--missed', done && !wasSolved);
      band.appendChild(el('p', 'desks__band-title', null, null, (DIFF_GLYPH[grp.difficulty] || '●') + ' ' + grp.name));
      band.appendChild(el('p', 'desks__band-words', null, null, grp.members.join(' · ')));
      band.appendChild(el('p', 'desks__band-exp', null, null, grp.explanation));
      if (grp.articleUrl) {
        const a = el('a', 'desks__band-link', 'href', grp.articleUrl, 'Read the story');
        a.setAttribute('rel', 'noopener');
        band.appendChild(a);
      }
      solvedBox.appendChild(band);
    });

    // remaining tiles
    grid.innerHTML = '';
    if (!done) {
      tiles.forEach((t, i) => {
        if (solvedGroups.includes(t.group)) return;
        const b = el('button', 'desks__tile', null, null, t.word);
        b.type = 'button';
        b.setAttribute('aria-pressed', String(selected.includes(i)));
        b.classList.toggle('is-sel', selected.includes(i));
        b.addEventListener('click', () => toggle(i));
        grid.appendChild(b);
      });
    }
    mistakeEl.textContent = done ? '' : ('Mistakes: ' + mistakes + ' / ' + MAX_MISTAKES + (selected.length ? '  ·  ' + selected.length + ' selected' : ''));
    submitBtn.disabled = done || selected.length !== SIZE;
  }

  function toggle(i) {
    if (done) return;
    const at = selected.indexOf(i);
    if (at >= 0) selected.splice(at, 1);
    else if (selected.length < SIZE) selected.push(i);
    draw();
  }

  // keyboard: the tiles are buttons (Enter/Space toggle natively); the controls are buttons too.
  function ctlBtn(label, fn) {
    const b = el('button', 'desks__ctl', null, null, label);
    b.type = 'button';
    b.addEventListener('click', fn);
    return b;
  }
}

function el(tag, cls, attr, val, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (attr) e.setAttribute(attr, val);
  if (text != null) e.textContent = text;
  return e;
}

if (typeof document !== 'undefined') {
  document.querySelectorAll('[data-desks]').forEach((host) => {
    mountDesks(host, { date: host.getAttribute('data-date') || undefined });
  });
}
