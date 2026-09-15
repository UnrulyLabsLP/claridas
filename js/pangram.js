// GAM-014 — "Pangram", the weekly letter game. Seven letters, one required CENTER letter;
// build words of four or more letters that use only those letters and always include the
// center (letters reusable). At least one pangram (all seven) exists; finding it pays a bonus.
// Rank tiers are newspaper grades — Stringer → Staff → Byline → Masthead — by share of the
// week's maximum score. Full keyboard entry (the letter hex is a convenience, not the only
// input). Progress persists. Deterministic per week.
//
// Zero third-party scripts; the weekly sets (letters + the valid-word list) are fetched
// same-origin (CSP connect-src 'self'). The word list is pre-built by scripts/generate-pangram.mjs
// and gets Onett's per-puzzle obscurity/offensiveness human pass (AC).
import { dateSeed, seededRng, shuffle, recordResult, shareResult, loadState, saveState } from './game-shell.js';

const SLUG = 'pangram';
const TIERS = [ // ascending share-of-max thresholds; newspaper grades
  { name: 'Stringer', at: 0 }, { name: 'Staff', at: 0.15 }, { name: 'Byline', at: 0.40 }, { name: 'Masthead', at: 0.70 },
];
function weekNumber(dateStr) { return Math.floor(Math.floor(Date.parse(dateStr + 'T00:00:00Z') / 86400000) / 7); }

export function setFor(dateStr, sets) {
  const seq = shuffle(sets, seededRng(dateSeed('week-' + weekNumber(dateStr), 'pangram')));
  return seq[((weekNumber(dateStr) % seq.length) + seq.length) % seq.length];
}
export function scoreWord(w) {
  const base = w.length === 4 ? 1 : w.length;
  return base + (new Set(w).size === 7 ? 7 : 0);
}
export function tierFor(score, maxScore) {
  const pct = maxScore > 0 ? score / maxScore : 0;
  let t = TIERS[0].name;
  for (const tier of TIERS) if (pct >= tier.at) t = tier.name;
  return t;
}

export async function mountPangram(host, { date } = {}) {
  if (!host) return;
  const today = date || new Date().toISOString().slice(0, 10);
  let sets;
  try { sets = (await (await fetch('/data/games/pangram.json')).json()).sets; }
  catch (e) { host.innerHTML = '<p style="color:var(--muted)">This week\'s letters could not load. Please refresh.</p>'; return; }
  const set = setFor(today, sets);
  const letterSet = new Set(set.letters);
  const valid = new Set(set.validWords);

  const saved = loadState(SLUG, today);
  const found = (saved && Array.isArray(saved.found)) ? saved.found.slice() : [];
  let score = found.reduce((s, w) => s + scoreWord(w), 0);
  let typed = '';

  host.innerHTML = '';
  host.className = 'pg';
  const status = el('p', 'pg__status', 'aria-live', 'polite');
  const scoreEl = el('p', 'pg__score');
  const input = el('div', 'pg__input', 'aria-live', 'polite');
  const hex = el('div', 'pg__hex');
  const controls = el('div', 'pg__controls');
  const foundBox = el('div', 'pg__found');
  host.append(status, scoreEl, input, hex, controls, foundBox);

  // letter hex — center first + visually distinct + aria-labeled as the required letter
  const order = [set.center, ...set.letters.filter((c) => c !== set.center)];
  order.forEach((c) => {
    const b = el('button', 'pg__key' + (c === set.center ? ' pg__key--center' : ''), null, null, c.toUpperCase());
    b.type = 'button';
    b.setAttribute('aria-label', c === set.center ? 'Required center letter ' + c : 'Letter ' + c);
    b.addEventListener('click', () => { typed += c; drawInput(); });
    hex.appendChild(b);
  });

  controls.append(
    ctlBtn('Delete', () => { typed = typed.slice(0, -1); drawInput(); }),
    ctlBtn('Shuffle', () => { const rest = shuffle(set.letters.filter((c) => c !== set.center), seededRng(dateSeed(today + typed + Math.floor(score), 'pg-sh'))); renderHex([set.center, ...rest]); }),
    ctlBtn('Enter', submit),
    ctlBtn('Share', () => shareResult({ line: shareLine() })),
  );

  host.tabIndex = 0;
  host.addEventListener('keydown', (e) => {
    if (/^[a-zA-Z]$/.test(e.key)) { const c = e.key.toLowerCase(); if (letterSet.has(c)) { typed += c; drawInput(); e.preventDefault(); } }
    else if (e.key === 'Enter') { submit(); e.preventDefault(); }
    else if (e.key === 'Backspace') { typed = typed.slice(0, -1); drawInput(); e.preventDefault(); }
  });

  drawAll();

  function submit() {
    const w = typed.toLowerCase();
    typed = '';
    if (w.length < 4) return announce('Words must be at least four letters.');
    if (!w.includes(set.center)) return announce('Every word must use the center letter.');
    if ([...w].some((c) => !letterSet.has(c))) return announce('Use only the seven letters.');
    if (found.includes(w)) { drawInput(); return announce('Already found.'); }
    if (!valid.has(w)) { drawInput(); return announce('Not in the word list.'); }
    found.push(w);
    const pts = scoreWord(w);
    score += pts;
    persist();
    const pangram = new Set(w).size === 7;
    announce((pangram ? 'Pangram! +' : '+') + pts + (pangram ? ' (all seven letters)' : ''));
    drawAll();
    if (found.length === set.validWords.length) recordResult(SLUG, today, { solved: true, guesses: found.length });
  }
  function shareLine() { return 'Claridas Pangram (week of ' + today + ') — ' + tierFor(score, set.maxScore) + ', ' + found.length + ' words, ' + score + ' pts.'; }

  function renderHex(letters) {
    hex.innerHTML = '';
    letters.forEach((c) => {
      const b = el('button', 'pg__key' + (c === set.center ? ' pg__key--center' : ''), null, null, c.toUpperCase());
      b.type = 'button';
      b.setAttribute('aria-label', c === set.center ? 'Required center letter ' + c : 'Letter ' + c);
      b.addEventListener('click', () => { typed += c; drawInput(); });
      hex.appendChild(b);
    });
  }
  function persist() { saveState(SLUG, today, { found, done: found.length === set.validWords.length }); }
  function announce(t) { status.textContent = t; }
  function drawInput() { input.textContent = typed.toUpperCase() || ' '; }
  function drawAll() {
    drawInput();
    const tier = tierFor(score, set.maxScore);
    scoreEl.innerHTML = '';
    scoreEl.appendChild(el('span', 'pg__rank', null, null, tier));
    scoreEl.appendChild(el('span', 'pg__pts', null, null, '  ' + score + ' / ' + set.maxScore + ' pts  ·  ' + found.length + ' of ' + set.validWords.length + ' words'));
    foundBox.innerHTML = '';
    if (found.length) {
      foundBox.appendChild(el('p', 'pg__found-title', null, null, 'Found'));
      const list = el('div', 'pg__found-list');
      found.slice().sort().forEach((w) => list.appendChild(el('span', 'pg__word' + (new Set(w).size === 7 ? ' pg__word--pangram' : ''), null, null, w)));
      foundBox.appendChild(list);
    }
  }
  function ctlBtn(label, fn) { const b = el('button', 'pg__ctl', null, null, label); b.type = 'button'; b.addEventListener('click', fn); return b; }
}

function el(tag, cls, attr, val, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (attr) e.setAttribute(attr, val);
  if (text != null) e.textContent = text;
  return e;
}

if (typeof document !== 'undefined') {
  document.querySelectorAll('[data-pangram]').forEach((host) => {
    mountPangram(host, { date: host.getAttribute('data-date') || undefined });
  });
}
