// GAM-007 — "Five Column", the daily five-letter word game (a newspaper pun on
// column inches). Six guesses at a five-letter word; per-letter feedback that never
// relies on colour alone (each state also carries a distinct glyph + border + an
// aria-label, and the shareable grid uses distinct emoji). The answer is chosen from
// a curated common-word list by a FIXED-seed shuffle indexed by the UTC day number, so
// every reader gets the same word and no answer repeats until the list cycles.
//
// Word lists are fetched from /data/words/ (same-origin, CSP connect-src 'self').
// Zero third-party scripts. Wired to the shared shell for streak + guess-distribution.
import { seededRng, shuffle, recordResult, offerShare, getStats, loadState, saveState } from './game-shell.js';

const LEN = 5, ROWS = 6, SLUG = 'five-column';
const SEQ_SEED = 0x5c01;            // fixed sequence seed — the answer order is stable forever
const GLYPH = { 2: '🟥', 1: '🟨', 0: '⬜' }; // share-grid emoji: correct / present / absent
const STATE_WORD = { 2: 'correct position', 1: 'in the word', 0: 'not in the word' };

// UTC day number since the Unix epoch — the same integer worldwide for a given date.
function dayNumber(dateStr) {
  return Math.floor(Date.parse(dateStr + 'T00:00:00Z') / 86400000);
}

// Score a guess against the answer with correct duplicate-letter handling: mark exact
// positions first, then mark "present" only from the answer's remaining letter pool.
export function score(guess, answer) {
  const res = new Array(LEN).fill(0);
  const pool = {};
  for (let i = 0; i < LEN; i++) {
    if (guess[i] === answer[i]) res[i] = 2;
    else pool[answer[i]] = (pool[answer[i]] || 0) + 1;
  }
  for (let i = 0; i < LEN; i++) {
    if (res[i] === 2) continue;
    const c = guess[i];
    if (pool[c] > 0) { res[i] = 1; pool[c]--; }
  }
  return res;
}

// Pick the answer for a date from the shuffled sequence (deterministic, no-repeat until cycle).
export function answerFor(dateStr, answers) {
  const seq = shuffle(answers, seededRng(SEQ_SEED));
  return seq[((dayNumber(dateStr) % seq.length) + seq.length) % seq.length];
}

async function loadWords() {
  const [ansRes, allowRes] = await Promise.all([
    fetch('/data/words/answers.txt'),
    fetch('/data/words/allowed.txt'),
  ]);
  const answers = (await ansRes.text()).split(/\s+/).map(w => w.trim().toLowerCase()).filter(w => w.length === LEN);
  const allowed = (await allowRes.text()).split(/\s+/).map(w => w.trim().toLowerCase()).filter(w => w.length === LEN);
  // Valid guesses = the big acceptance list ∪ every answer (so an answer is always legal
  // even when the system dictionary happens to omit it, e.g. "proud").
  const valid = new Set(allowed);
  for (const w of answers) valid.add(w);
  return { answers, valid };
}

export async function mountFiveColumn(host, { date } = {}) {
  if (!host) return;
  const today = date || new Date().toISOString().slice(0, 10);
  let words;
  try { words = await loadWords(); }
  catch (e) { host.innerHTML = '<p style="color:var(--muted)">Today\'s word game could not load. Please refresh.</p>'; return; }
  const answer = answerFor(today, words.answers);

  const saved = loadState(SLUG, today);
  const guesses = Array.isArray(saved?.guesses) ? saved.guesses.slice() : []; // array of 5-letter strings
  let cur = '';
  let done = !!saved?.done;

  host.innerHTML = '';
  host.className = 'fc';
  const live = el('p', 'fc__status', 'aria-live', 'polite');
  const grid = el('div', 'fc__grid');
  const kb = el('div', 'fc__kb');
  host.append(live, grid, kb);

  // physical keyboard
  const keyHandler = (e) => {
    if (e.key === 'Enter') submit();
    else if (e.key === 'Backspace') { cur = cur.slice(0, -1); draw(); }
    else if (/^[a-zA-Z]$/.test(e.key) && cur.length < LEN) { cur += e.key.toLowerCase(); draw(); }
    else return;
    e.preventDefault();
  };
  document.addEventListener('keydown', keyHandler);

  // on-screen keyboard
  const ROWS_KB = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
  const keyEls = {};
  ROWS_KB.forEach((row, ri) => {
    const r = el('div', 'fc__kbrow');
    if (ri === 2) r.appendChild(actionKey('enter', 'Enter', submit));
    for (const ch of row) {
      const k = el('button', 'fc__key', null, null, ch);
      k.type = 'button';
      k.setAttribute('aria-label', 'Letter ' + ch);
      k.addEventListener('click', () => { if (!done && cur.length < LEN) { cur += ch; draw(); } });
      keyEls[ch] = k;
      r.appendChild(k);
    }
    if (ri === 2) r.appendChild(actionKey('back', '⌫', () => { cur = cur.slice(0, -1); draw(); }));
    kb.appendChild(r);
  });

  draw();
  if (done) finish(guesses.some(g => g === answer));

  function submit() {
    if (done) return;
    if (cur.length < LEN) { announce('Not enough letters.'); return; }
    if (!words.valid.has(cur)) { announce('Not in the word list.'); flashRow(); return; }
    guesses.push(cur);
    const sc = score(cur, answer);
    // per-key state, keeping the strongest (correct > present > absent)
    for (let i = 0; i < LEN; i++) {
      const k = keyEls[cur[i]];
      if (!k) continue;
      const rank = { '': -1, absent: 0, present: 1, correct: 2 };
      const nowState = sc[i] === 2 ? 'correct' : sc[i] === 1 ? 'present' : 'absent';
      const prev = k.dataset.state || '';
      if (rank[nowState] > rank[prev]) k.dataset.state = nowState;
    }
    announce('Row ' + guesses.length + ': ' + cur.split('').map((c, i) => c + ' ' + STATE_WORD[sc[i]]).join(', '));
    const won = cur === answer;
    cur = '';
    done = won || guesses.length >= ROWS;
    saveState(SLUG, today, { guesses, done });
    draw();
    if (done) finish(won);
  }

  function finish(won) {
    done = true;
    saveState(SLUG, today, { guesses, done });
    // record once (game-shell de-dupes per date); guesses = row count on a win, else null (miss)
    recordResult(SLUG, today, { solved: won, guesses: won ? guesses.length : null });
    const st = getStats(SLUG);
    announce(won ? ('Solved in ' + guesses.length + '. Streak ' + st.currentStreak + '.') : ('The word was ' + answer.toUpperCase() + '.'));
    renderHistogram(st);
    // spoiler-free share grid — emoji only, no letters, ends with the dated URL.
    const gridText = guesses.map(g => score(g, answer).map(s => GLYPH[s]).join('')).join('\n');
    const head = 'Claridas Five Column ' + today + ' ' + (won ? guesses.length : 'X') + '/' + ROWS;
    offerShare(host, head + '\n' + gridText);
  }

  function renderHistogram(st) {
    let box = host.querySelector('.fc__hist');
    if (!box) { box = el('div', 'fc__hist'); host.appendChild(box); }
    box.innerHTML = '';
    box.appendChild(el('p', 'fc__hist-title', null, null, 'Guess distribution'));
    const dist = st.dist || {};
    const max = Math.max(1, ...Object.values(dist));
    for (let n = 1; n <= ROWS; n++) {
      const row = el('div', 'fc__bar');
      row.appendChild(el('span', 'fc__bar-n', null, null, String(n)));
      const fill = el('span', 'fc__bar-fill', null, null, String(dist[n] || 0));
      fill.style.width = Math.round(((dist[n] || 0) / max) * 100) + '%';
      row.appendChild(fill);
      box.appendChild(row);
    }
  }

  function draw() {
    grid.innerHTML = '';
    for (let r = 0; r < ROWS; r++) {
      const rowEl = el('div', 'fc__row');
      const g = guesses[r];
      const sc = g ? score(g, answer) : null;
      for (let c = 0; c < LEN; c++) {
        const t = el('div', 'fc__tile');
        let ch = '';
        if (g) {
          ch = g[c];
          const s = sc[c];
          t.dataset.state = s === 2 ? 'correct' : s === 1 ? 'present' : 'absent';
          t.setAttribute('aria-label', ch + ' ' + STATE_WORD[s]);
        } else if (r === guesses.length) {
          ch = cur[c] || '';
          if (ch) t.dataset.state = 'filled';
          t.setAttribute('aria-label', ch ? ch : 'empty');
        } else {
          t.setAttribute('aria-label', 'empty');
        }
        t.textContent = ch.toUpperCase();
        rowEl.appendChild(t);
      }
      grid.appendChild(rowEl);
    }
  }

  function flashRow() {
    const rowEl = grid.children[guesses.length];
    if (!rowEl) return;
    rowEl.classList.add('fc__row--bad');
    setTimeout(() => rowEl.classList.remove('fc__row--bad'), 500);
  }
  function announce(t) { live.textContent = t; }

  function actionKey(kind, label, fn) {
    const k = el('button', 'fc__key fc__key--action', null, null, label);
    k.type = 'button';
    k.setAttribute('aria-label', kind === 'enter' ? 'Enter guess' : 'Delete letter');
    k.addEventListener('click', fn);
    return k;
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
  document.querySelectorAll('[data-five-column]').forEach((host) => {
    mountFiveColumn(host, { date: host.getAttribute('data-date') || undefined });
  });
}
