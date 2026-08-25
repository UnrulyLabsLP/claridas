// PUZZLE-001 (Phase 2) — interactive crossword. Client-side only, no backend, offline.
// Reads the puzzle from a non-executable <script type="application/json"> block (CSP-safe).
// In-cell typing, arrow-key + Tab navigation between cells, clue highlighting for the
// active word, check-letter / reveal-letter / reveal-puzzle, and a win state when every
// fillable cell holds its correct letter. Guards every DOM lookup so nothing throws.

(function () {
  const root = document.getElementById('crossword');
  const dataEl = document.getElementById('crossword-data');
  if (!root || !dataEl) return;

  let data;
  try {
    data = JSON.parse(dataEl.textContent || '{}');
  } catch (e) {
    return;
  }

  const rawGrid = Array.isArray(data.grid) ? data.grid : [];
  const grid = rawGrid.map((row) =>
    (typeof row === 'string' ? row.split('') : (row || [])).map((ch) => String(ch).toUpperCase()),
  );
  const rows = grid.length;
  const cols = rows ? grid[0].length : 0;
  if (!rows || !cols) return;
  const isBlock = (ch) => ch === '#' || ch === '.';

  const clues = data.clues || { across: [], down: [] };
  const across = Array.isArray(clues.across) ? clues.across : [];
  const down = Array.isArray(clues.down) ? clues.down : [];

  const gridEl = root.querySelector('.cw-grid');
  const acrossListEl = root.querySelector('.cw-clues--across');
  const downListEl = root.querySelector('.cw-clues--down');
  const statusEl = root.querySelector('.cw-status');
  const checkBtn = root.querySelector('.cw-check');
  const revealCellBtn = root.querySelector('.cw-reveal-cell');
  const revealAllBtn = root.querySelector('.cw-reveal-all');
  if (!gridEl) return;

  // Solution letters per cell (from clue answers); null for block cells.
  const sol = Array.from({ length: rows }, () => Array(cols).fill(null));
  function layAnswer(entry, dir) {
    const ans = String(entry.answer || '').toUpperCase();
    for (let i = 0; i < ans.length; i++) {
      const r = entry.row + (dir === 'down' ? i : 0);
      const c = entry.col + (dir === 'across' ? i : 0);
      if (r >= 0 && r < rows && c >= 0 && c < cols) sol[r][c] = ans[i];
    }
  }
  across.forEach((e) => layAnswer(e, 'across'));
  down.forEach((e) => layAnswer(e, 'down'));

  // Any grid cell not marked as a block is fillable. Fall back to solution presence.
  function fillable(r, c) {
    const g = grid[r] && grid[r][c];
    if (g === undefined) return false;
    if (isBlock(g)) return false;
    return true;
  }

  // Cell -> clue number label (a cell starts a word if it begins an across or down run).
  const numAt = {};
  function keyRC(r, c) { return r + ',' + c; }
  across.forEach((e) => { numAt[keyRC(e.row, e.col)] = e.num; });
  down.forEach((e) => { numAt[keyRC(e.row, e.col)] = e.num; });

  const inputEls = Array.from({ length: rows }, () => Array(cols).fill(null));
  let dir = 'across'; // active direction
  let cur = null; // {r,c} active cell

  gridEl.setAttribute('role', 'grid');
  for (let r = 0; r < rows; r++) {
    const tr = document.createElement('div');
    tr.className = 'cw-row';
    tr.setAttribute('role', 'row');
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement('div');
      cell.className = 'cw-cell';
      cell.setAttribute('role', 'gridcell');
      if (!fillable(r, c)) {
        cell.classList.add('is-block');
      } else {
        const n = numAt[keyRC(r, c)];
        if (n) {
          const tag = document.createElement('span');
          tag.className = 'cw-num';
          tag.textContent = String(n);
          cell.appendChild(tag);
        }
        const inp = document.createElement('input');
        inp.type = 'text';
        inp.className = 'cw-input';
        inp.maxLength = 1;
        inp.autocomplete = 'off';
        inp.setAttribute('aria-label', 'row ' + (r + 1) + ' column ' + (c + 1));
        inp.dataset.r = String(r);
        inp.dataset.c = String(c);
        cell.appendChild(inp);
        inputEls[r][c] = inp;
      }
      tr.appendChild(cell);
    }
    gridEl.appendChild(tr);
  }

  function setStatus(msg) { if (statusEl) statusEl.textContent = msg; }

  // The set of cells forming the active word (through cur, in dir).
  function wordCells(r, c, d) {
    if (!fillable(r, c)) return [];
    const cells = [];
    // walk back to the word start
    let sr = r, sc = c;
    while (true) {
      const pr = sr - (d === 'down' ? 1 : 0);
      const pc = sc - (d === 'across' ? 1 : 0);
      if (pr < 0 || pc < 0 || !fillable(pr, pc)) break;
      sr = pr; sc = pc;
    }
    // walk forward to the end
    let er = sr, ec = sc;
    while (fillable(er, ec)) {
      cells.push({ r: er, c: ec });
      er += (d === 'down' ? 1 : 0);
      ec += (d === 'across' ? 1 : 0);
    }
    return cells;
  }

  function clearHighlight() {
    gridEl.querySelectorAll('.cw-cell').forEach((el) => el.classList.remove('is-active', 'is-word'));
    [acrossListEl, downListEl].forEach((el) => {
      if (el) el.querySelectorAll('.cw-clue').forEach((li) => li.classList.remove('is-active'));
    });
  }

  function cellDiv(r, c) {
    const inp = inputEls[r][c];
    return inp ? inp.parentElement : null;
  }

  function activeClueEntry() {
    if (!cur) return null;
    const cells = wordCells(cur.r, cur.c, dir);
    if (!cells.length) return null;
    const start = cells[0];
    const list = dir === 'across' ? across : down;
    return list.find((e) => e.row === start.r && e.col === start.c) || null;
  }

  function highlight() {
    clearHighlight();
    if (!cur) return;
    const cells = wordCells(cur.r, cur.c, dir);
    cells.forEach((p) => { const d = cellDiv(p.r, p.c); if (d) d.classList.add('is-word'); });
    const activeDiv = cellDiv(cur.r, cur.c);
    if (activeDiv) activeDiv.classList.add('is-active');
    const entry = activeClueEntry();
    if (entry) {
      const li = document.querySelector('.cw-clue[data-dir="' + dir + '"][data-num="' + entry.num + '"]');
      if (li) li.classList.add('is-active');
      setStatus(dir.toUpperCase() + ' ' + entry.num + ': ' + entry.clue);
    }
  }

  function focusCell(r, c) {
    if (!fillable(r, c) || !inputEls[r][c]) return;
    cur = { r, c };
    inputEls[r][c].focus();
    inputEls[r][c].select();
    highlight();
  }

  function nextFillable(r, c, d, back) {
    const step = back ? -1 : 1;
    let rr = r, cc = c;
    for (let i = 0; i < rows * cols; i++) {
      rr += (d === 'down' ? step : 0);
      cc += (d === 'across' ? step : 0);
      if (rr < 0 || rr >= rows || cc < 0 || cc >= cols) return null;
      if (fillable(rr, cc)) return { r: rr, c: cc };
    }
    return null;
  }

  function checkWin() {
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        if (fillable(r, c)) {
          const v = (inputEls[r][c].value || '').toUpperCase();
          if (v !== sol[r][c]) return false;
        }
    root.classList.add('is-won');
    setStatus('Solved — the whole grid is correct.');
    return true;
  }

  // --- Input + navigation ---
  gridEl.addEventListener('click', (e) => {
    const inp = e.target.closest ? e.target.closest('.cw-input') : null;
    if (!inp) return;
    const r = Number(inp.dataset.r), c = Number(inp.dataset.c);
    if (cur && cur.r === r && cur.c === c) dir = dir === 'across' ? 'down' : 'across'; // toggle on re-click
    focusCell(r, c);
  });

  gridEl.addEventListener('input', (e) => {
    const inp = e.target;
    if (!inp.classList || !inp.classList.contains('cw-input')) return;
    inp.parentElement.classList.remove('is-wrong');
    const raw = (inp.value || '').toUpperCase().replace(/[^A-Z]/g, '');
    inp.value = raw.slice(-1); // keep one letter
    if (inp.value) {
      const r = Number(inp.dataset.r), c = Number(inp.dataset.c);
      const nxt = nextFillable(r, c, dir, false);
      if (nxt) focusCell(nxt.r, nxt.c);
      checkWin();
    }
  });

  gridEl.addEventListener('keydown', (e) => {
    const inp = e.target;
    if (!inp.classList || !inp.classList.contains('cw-input')) return;
    const r = Number(inp.dataset.r), c = Number(inp.dataset.c);
    let nxt = null;
    switch (e.key) {
      case 'ArrowRight': dir = 'across'; nxt = nextFillable(r, c, 'across', false); break;
      case 'ArrowLeft': dir = 'across'; nxt = nextFillable(r, c, 'across', true); break;
      case 'ArrowDown': dir = 'down'; nxt = nextFillable(r, c, 'down', false); break;
      case 'ArrowUp': dir = 'down'; nxt = nextFillable(r, c, 'down', true); break;
      case 'Tab': {
        e.preventDefault();
        const entry = activeClueEntry();
        const list = dir === 'across' ? across : down;
        if (entry && list.length) {
          const idx = list.findIndex((x) => x.num === entry.num);
          const step = e.shiftKey ? -1 : 1;
          const nextEntry = list[(idx + step + list.length) % list.length];
          if (nextEntry) focusCell(nextEntry.row, nextEntry.col);
        }
        return;
      }
      case 'Backspace':
        if (!inp.value) {
          const prev = nextFillable(r, c, dir, true);
          if (prev) { inputEls[prev.r][prev.c].value = ''; focusCell(prev.r, prev.c); }
          e.preventDefault();
        }
        return;
      default:
        return;
    }
    if (nxt) { e.preventDefault(); focusCell(nxt.r, nxt.c); }
    else { e.preventDefault(); highlight(); }
  });

  // --- Clue lists ---
  function buildClueList(entries, d, el) {
    if (!el) return;
    entries.slice().sort((a, b) => a.num - b.num).forEach((entry) => {
      const li = document.createElement('li');
      li.className = 'cw-clue';
      li.dataset.dir = d;
      li.dataset.num = String(entry.num);
      li.innerHTML = '';
      const num = document.createElement('b');
      num.textContent = entry.num + '. ';
      li.appendChild(num);
      li.appendChild(document.createTextNode(entry.clue));
      li.addEventListener('click', () => { dir = d; focusCell(entry.row, entry.col); });
      el.appendChild(li);
    });
  }
  buildClueList(across, 'across', acrossListEl);
  buildClueList(down, 'down', downListEl);

  // --- Tools ---
  if (checkBtn) {
    checkBtn.addEventListener('click', () => {
      let wrong = 0, blank = 0;
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          if (fillable(r, c)) {
            const v = (inputEls[r][c].value || '').toUpperCase();
            const div = cellDiv(r, c);
            if (!v) { blank++; if (div) div.classList.remove('is-wrong'); }
            else if (v !== sol[r][c]) { wrong++; if (div) div.classList.add('is-wrong'); }
            else if (div) div.classList.remove('is-wrong');
          }
      if (wrong === 0 && blank === 0) checkWin();
      else setStatus(wrong + ' wrong, ' + blank + ' still blank.');
    });
  }

  if (revealCellBtn) {
    revealCellBtn.addEventListener('click', () => {
      if (!cur || !fillable(cur.r, cur.c)) { setStatus('Pick a cell first, then reveal it.'); return; }
      inputEls[cur.r][cur.c].value = sol[cur.r][cur.c] || '';
      const div = cellDiv(cur.r, cur.c);
      if (div) div.classList.remove('is-wrong');
      checkWin();
    });
  }

  if (revealAllBtn) {
    revealAllBtn.addEventListener('click', () => {
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          if (fillable(r, c)) {
            inputEls[r][c].value = sol[r][c] || '';
            const div = cellDiv(r, c);
            if (div) div.classList.remove('is-wrong');
          }
      checkWin();
    });
  }

  // Start focused on the first across clue if present.
  const first = across[0] || down[0];
  if (first) { dir = across[0] ? 'across' : 'down'; focusCell(first.row, first.col); }
  else setStatus('Type answers into the grid. Use the clues to guide you.');
})();
