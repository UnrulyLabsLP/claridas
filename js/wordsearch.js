// PUZZLE-001 — interactive word search. Client-side only, no backend, works offline.
// Reads the puzzle from a non-executable <script type="application/json"> block
// (CSP-safe: no inline script). The user selects a straight run of letters — either
// by clicking two endpoints or by click/tap-dragging across cells. A run that spells
// a listed word (in any of the 8 directions, forward or reversed) locks in: the cells
// stay marked, the word checks off the list, and when all are found a win state shows.
// Guards every DOM lookup so a missing node never throws.

(function () {
  const root = document.getElementById('wordsearch');
  const dataEl = document.getElementById('wordsearch-data');
  if (!root || !dataEl) return; // no puzzle on this page — nothing to do

  let data;
  try {
    data = JSON.parse(dataEl.textContent || '{}');
  } catch (e) {
    return; // malformed data — fail quiet, leave the static grid readable
  }

  // Normalize the grid to a 2D array of single upper-case letters.
  const rawGrid = Array.isArray(data.grid) ? data.grid : [];
  const grid = rawGrid.map((row) =>
    (typeof row === 'string' ? row.split('') : (row || [])).map((ch) => String(ch).toUpperCase()),
  );
  const rows = grid.length;
  const cols = rows ? grid[0].length : 0;
  if (!rows || !cols) return;

  // Normalize the word list. Each entry may be a bare string or { word }.
  const words = (Array.isArray(data.words) ? data.words : [])
    .map((w) => (typeof w === 'string' ? w : (w && w.word) || ''))
    .map((w) => String(w).toUpperCase().replace(/[^A-Z]/g, ''))
    .filter(Boolean);

  const gridEl = root.querySelector('.ws-grid');
  const listEl = root.querySelector('.ws-words');
  const statusEl = root.querySelector('.ws-status');
  const revealBtn = root.querySelector('.ws-reveal');
  if (!gridEl) return;

  const found = new Set(); // words already located
  const cellEls = []; // cellEls[r][c] -> button element

  // --- Build the grid as a table of buttons (keyboard-focusable, accessible). ---
  gridEl.setAttribute('role', 'grid');
  for (let r = 0; r < rows; r++) {
    const rowArr = [];
    const tr = document.createElement('div');
    tr.className = 'ws-row';
    tr.setAttribute('role', 'row');
    for (let c = 0; c < cols; c++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ws-cell';
      btn.textContent = grid[r][c];
      btn.dataset.r = String(r);
      btn.dataset.c = String(c);
      btn.setAttribute('role', 'gridcell');
      btn.setAttribute('aria-label', grid[r][c] + ' row ' + (r + 1) + ' column ' + (c + 1));
      tr.appendChild(btn);
      rowArr.push(btn);
    }
    gridEl.appendChild(tr);
    cellEls.push(rowArr);
  }

  // --- Word list ---
  const wordItemEls = {};
  if (listEl) {
    words.forEach((w) => {
      const li = document.createElement('li');
      li.className = 'ws-word';
      li.textContent = w;
      listEl.appendChild(li);
      wordItemEls[w] = li;
    });
  }

  function setStatus(msg) {
    if (statusEl) statusEl.textContent = msg;
  }

  // Selection state.
  let anchor = null; // {r,c} first endpoint (click-two-endpoints mode)
  let dragging = false;
  let dragPath = []; // cells during a drag

  function clearPreview() {
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) cellEls[r][c].classList.remove('is-preview', 'is-anchor');
  }

  // Return the straight-line list of cells from a->b if they share a row, column,
  // or a 45-degree diagonal; otherwise null (word searches only run in 8 directions).
  function lineBetween(a, b) {
    const dr = b.r - a.r;
    const dc = b.c - a.c;
    const adr = Math.abs(dr);
    const adc = Math.abs(dc);
    const straight = dr === 0 || dc === 0 || adr === adc;
    if (!straight) return null;
    const steps = Math.max(adr, adc);
    const sr = Math.sign(dr);
    const sc = Math.sign(dc);
    const path = [];
    for (let i = 0; i <= steps; i++) path.push({ r: a.r + sr * i, c: a.c + sc * i });
    return path;
  }

  function pathToWord(path) {
    return path.map((p) => grid[p.r][p.c]).join('');
  }

  // A path matches if its string (forward or reversed) is an un-found listed word.
  function matchWord(path) {
    if (!path || path.length < 2) return null;
    const s = pathToWord(path);
    const rev = s.split('').reverse().join('');
    if (words.includes(s) && !found.has(s)) return s;
    if (words.includes(rev) && !found.has(rev)) return rev;
    return null;
  }

  function lockPath(path, word) {
    found.add(word);
    path.forEach((p) => cellEls[p.r][p.c].classList.add('is-found'));
    const li = wordItemEls[word];
    if (li) li.classList.add('is-done');
    if (found.size === words.length) {
      root.classList.add('is-won');
      setStatus('Solved — all ' + words.length + ' found.');
    } else {
      setStatus('Found ' + word + '. ' + (words.length - found.size) + ' to go.');
    }
  }

  // Attempt to resolve a full selection (two endpoints or a drag path) into a word.
  function tryResolve(a, b) {
    const path = lineBetween(a, b);
    if (!path) {
      setStatus('Pick a straight line — across, down, or diagonal.');
      return false;
    }
    const word = matchWord(path);
    if (word) {
      lockPath(path, word);
      return true;
    }
    return false;
  }

  function cellFrom(el) {
    if (!el || !el.classList || !el.classList.contains('ws-cell')) return null;
    return { r: Number(el.dataset.r), c: Number(el.dataset.c) };
  }

  // --- Click-two-endpoints (also the keyboard path: buttons fire click on Enter/Space) ---
  gridEl.addEventListener('click', (e) => {
    if (dragging || dragPath.length) return; // a drag already handled it
    const cell = cellFrom(e.target);
    if (!cell) return;
    if (!anchor) {
      anchor = cell;
      clearPreview();
      cellEls[cell.r][cell.c].classList.add('is-anchor');
      setStatus('First letter set. Click the other end of the word.');
      return;
    }
    const resolved = tryResolve(anchor, cell);
    clearPreview();
    anchor = null;
    if (!resolved) setStatus('Not a word on the list. Try another pair of ends.');
  });

  // --- Drag selection (mouse + touch via pointer events) ---
  function pointerCell(e) {
    const t = e.touches && e.touches[0] ? e.touches[0] : e;
    const el = document.elementFromPoint(t.clientX, t.clientY);
    return cellFrom(el);
  }

  function startDrag(e) {
    const cell = pointerCell(e);
    if (!cell) return;
    dragging = true;
    anchor = null; // a drag cancels any pending endpoint selection
    dragPath = [cell];
    clearPreview();
    cellEls[cell.r][cell.c].classList.add('is-preview');
  }

  function moveDrag(e) {
    if (!dragging) return;
    const cell = pointerCell(e);
    if (!cell || !dragPath.length) return;
    const start = dragPath[0];
    const path = lineBetween(start, cell);
    clearPreview();
    if (path) {
      dragPath = path;
      path.forEach((p) => cellEls[p.r][p.c].classList.add('is-preview'));
    } else {
      dragPath = [start];
      cellEls[start.r][start.c].classList.add('is-preview');
    }
    if (e.cancelable) e.preventDefault();
  }

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    if (dragPath.length >= 2) {
      const word = matchWord(dragPath);
      if (word) lockPath(dragPath, word);
      else setStatus('Not a word on the list. Try again.');
    }
    clearPreview();
    dragPath = [];
  }

  gridEl.addEventListener('mousedown', startDrag);
  gridEl.addEventListener('mousemove', moveDrag);
  document.addEventListener('mouseup', endDrag);
  gridEl.addEventListener('touchstart', startDrag, { passive: true });
  gridEl.addEventListener('touchmove', moveDrag, { passive: false });
  document.addEventListener('touchend', endDrag);

  // --- Reveal all ---
  if (revealBtn) {
    revealBtn.addEventListener('click', () => {
      const dirs = [[0, 1], [1, 0], [1, 1], [1, -1], [0, -1], [-1, 0], [-1, -1], [-1, 1]];
      words.forEach((w) => {
        if (found.has(w)) return;
        for (let r = 0; r < rows && !found.has(w); r++) {
          for (let c = 0; c < cols && !found.has(w); c++) {
            for (const [dr, dc] of dirs) {
              const path = [];
              let ok = true;
              for (let i = 0; i < w.length; i++) {
                const rr = r + dr * i, cc = c + dc * i;
                if (rr < 0 || rr >= rows || cc < 0 || cc >= cols || grid[rr][cc] !== w[i]) { ok = false; break; }
                path.push({ r: rr, c: cc });
              }
              if (ok) { lockPath(path, w); break; }
            }
          }
        }
      });
      clearPreview();
      anchor = null;
    });
  }

  setStatus('Find all ' + words.length + ' words. Click two ends of a word, or drag across it.');
})();
