// GAM-010 — "The Cipher", a daily cryptogram. A monoalphabetic substitution over a
// sentence from a primary document Claridas has cited. Deterministic per UTC date: the
// same cipher for everyone. No letter ever maps to itself (a derangement of the alphabet),
// so the puzzle is always solvable by frequency analysis. Assists (reveal a letter, a
// frequency table) are optional. On solve it reveals the source, the date, and — when the
// corpus entry carries one — a link to the Claridas article that cited it.
//
// Zero third-party scripts; corpus fetched same-origin (CSP connect-src 'self'). The corpus
// CONTENT (which cited sentences, their attribution + article links) is editorial; this
// engine only ciphers and renders what the corpus holds.
import { dateSeed, seededRng, shuffle, recordResult, offerShare, loadState, saveState } from './game-shell.js';

const SLUG = 'cipher';
const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function dayNumber(dateStr) { return Math.floor(Date.parse(dateStr + 'T00:00:00Z') / 86400000); }

// Build a derangement of A-Z (no letter maps to itself), deterministic per seed. plain[i] -> cipher.
export function makeCipher(seed) {
  const rng = seededRng(seed);
  for (let attempt = 0; attempt < 100; attempt++) {
    const perm = shuffle(ALPHA, seededRng(seed + attempt * 7919));
    if (perm.every((c, i) => c !== ALPHA[i])) {
      const map = {};
      ALPHA.forEach((p, i) => { map[p] = perm[i]; });
      return map;
    }
  }
  // Fallback: rotate by 1 (a guaranteed derangement) if shuffling somehow never deranged.
  const map = {};
  ALPHA.forEach((p, i) => { map[p] = ALPHA[(i + 1) % 26]; });
  return map;
}
export function encrypt(text, map) {
  return text.toUpperCase().replace(/[A-Z]/g, (ch) => map[ch] || ch);
}

export function puzzleFor(dateStr, corpus) {
  const n = corpus.length;
  return corpus[((dayNumber(dateStr) % n) + n) % n];
}

export async function mountCipher(host, { date } = {}) {
  if (!host) return;
  const today = date || new Date().toISOString().slice(0, 10);
  let corpus;
  try { corpus = (await (await fetch('/data/games/cipher.json')).json()).quotes; }
  catch (e) { host.innerHTML = '<p style="color:var(--muted)">Today\'s cryptogram could not load. Please refresh.</p>'; return; }
  const entry = puzzleFor(today, corpus);
  const plain = entry.text.toUpperCase();
  const map = makeCipher(dateSeed(today, 'cipher'));
  const cipherText = encrypt(plain, map);
  // inverse: ciphertext letter -> correct plaintext letter (used by Check + Reveal)
  const inverse = {}; ALPHA.forEach((p) => { inverse[map[p]] = p; });

  // guesses: cipher letter -> the solver's plaintext guess (or '')
  const saved = loadState(SLUG, today);
  const guess = (saved && saved.guess) || {};
  let done = !!(saved && saved.done);
  let selected = null; // currently highlighted cipher letter

  host.innerHTML = '';
  host.className = 'cipher';
  const status = el('p', 'cipher__status', 'aria-live', 'polite');
  const puzzle = el('div', 'cipher__text');
  const tools = el('div', 'cipher__tools');
  const freqBox = el('div', 'cipher__freq');
  freqBox.hidden = true;
  const source = el('p', 'cipher__source');
  source.hidden = true;
  host.append(status, puzzle, tools, freqBox, source);

  tools.append(
    toolBtn('Reveal a letter', revealLetter),
    toolBtn('Frequency table', () => { freqBox.hidden = !freqBox.hidden; if (!freqBox.hidden) drawFreq(); }),
    toolBtn('Check', check),
    toolBtn('Clear', () => { for (const k in guess) delete guess[k]; persist(); draw(); }),
  );

  draw();
  if (done) reveal();

  function persist() { saveState(SLUG, today, { guess, done }); }

  function setGuess(cipherLetter, val) {
    if (done || !cipherLetter) return;
    if (val) guess[cipherLetter] = val;
    else delete guess[cipherLetter];
    persist();
    draw();
    // auto-check on completion
    if (ALPHA.every((c) => !cipherText.includes(c) || guess[c])) {
      if (isSolved()) win();
    }
  }
  function isSolved() {
    return [...cipherText].every((ch) => !/[A-Z]/.test(ch) || guess[ch] === inverse[ch]);
  }
  function revealLetter() {
    if (done) return;
    // reveal one still-unknown or wrong cipher letter that appears in the text
    const present = [...new Set([...cipherText].filter((c) => /[A-Z]/.test(c)))];
    const target = present.find((c) => guess[c] !== inverse[c]);
    if (!target) return;
    guess[target] = inverse[target];
    persist(); draw();
    if (isSolved()) win();
  }
  function check() {
    let wrong = 0, filled = 0;
    for (const c of new Set([...cipherText].filter((x) => /[A-Z]/.test(x)))) {
      if (guess[c]) { filled++; if (guess[c] !== inverse[c]) wrong++; }
    }
    setStatus(filled === 0 ? 'Type a guess for a letter to begin.' : (wrong === 0 ? 'No wrong letters so far.' : wrong + (wrong === 1 ? ' letter is wrong.' : ' letters are wrong.')));
  }
  function win() {
    if (done) return;
    done = true; persist();
    recordResult(SLUG, today, { solved: true });
    setStatus('Solved.');
    reveal();
    offerShare(tools, 'Claridas The Cipher ' + today + ' ✓ solved.');
  }
  function reveal() {
    source.hidden = false;
    source.innerHTML = '';
    source.appendChild(el('span', 'cipher__source-doc', null, null, '“' + entry.text + '”'));
    const cite = el('span', 'cipher__source-cite', null, null, ' — ' + entry.source + (entry.date ? ', ' + entry.date : ''));
    source.appendChild(cite);
    if (entry.articleUrl) {
      const a = el('a', 'cipher__source-link', 'href', entry.articleUrl, 'Read the Claridas article');
      a.setAttribute('rel', 'noopener');
      source.appendChild(document.createTextNode(' · '));
      source.appendChild(a);
    }
  }

  function setStatus(t) { status.textContent = t; }

  function draw() {
    puzzle.innerHTML = '';
    // render word by word so lines wrap on spaces
    const tokens = cipherText.split(/(\s+)/);
    tokens.forEach((tok) => {
      if (/^\s+$/.test(tok)) { puzzle.appendChild(el('span', 'cipher__space', null, null, ' ')); return; }
      const word = el('span', 'cipher__word');
      [...tok].forEach((ch) => {
        if (!/[A-Z]/.test(ch)) { word.appendChild(el('span', 'cipher__punct', null, null, ch)); return; }
        const cell = el('span', 'cipher__cell');
        cell.classList.toggle('is-sel', selected === ch);
        const g = el('input', 'cipher__in');
        g.type = 'text'; g.maxLength = 1; g.value = guess[ch] || '';
        g.setAttribute('aria-label', 'Cipher letter ' + ch + (guess[ch] ? ', your guess ' + guess[ch] : ', no guess'));
        g.dataset.c = ch;
        g.disabled = done;
        g.addEventListener('focus', () => { selected = ch; draw(); setTimeout(() => focusCell(ch), 0); });
        g.addEventListener('input', (e) => {
          const v = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
          setGuess(ch, v);
          if (v) setTimeout(() => focusNext(ch), 0);
        });
        const lab = el('span', 'cipher__clabel', null, null, ch);
        cell.append(g, lab);
        word.appendChild(cell);
      });
      puzzle.appendChild(word);
    });
  }
  function focusCell(ch) { const i = puzzle.querySelector('input[data-c="' + ch + '"]'); if (i) i.focus(); }
  function focusNext(ch) {
    const inputs = [...puzzle.querySelectorAll('input.cipher__in')];
    const idx = inputs.findIndex((i) => i.dataset.c === ch && i.value);
    for (let k = idx + 1; k < inputs.length; k++) { if (!inputs[k].value) { inputs[k].focus(); return; } }
  }
  function drawFreq() {
    freqBox.innerHTML = '';
    freqBox.appendChild(el('p', 'cipher__freq-title', null, null, 'Ciphertext letter frequency'));
    const counts = {};
    for (const ch of cipherText) if (/[A-Z]/.test(ch)) counts[ch] = (counts[ch] || 0) + 1;
    const row = el('div', 'cipher__freq-row');
    Object.keys(counts).sort((a, b) => counts[b] - counts[a]).forEach((c) => {
      row.appendChild(el('span', 'cipher__freq-cell', null, null, c + ' ' + counts[c]));
    });
    freqBox.appendChild(row);
  }
}

function el(tag, cls, attr, val, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (attr) e.setAttribute(attr, val);
  if (text != null) e.textContent = text;
  return e;
}
function toolBtn(label, fn) { const b = el('button', 'cipher__tool', null, null, label); b.type = 'button'; b.addEventListener('click', fn); return b; }

if (typeof document !== 'undefined') {
  document.querySelectorAll('[data-cipher]').forEach((host) => {
    mountCipher(host, { date: host.getAttribute('data-date') || undefined });
  });
}
