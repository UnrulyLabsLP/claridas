// GAM-012 — "The Number", the ten-second game: one statistic a day drawn from a Claridas
// finding, guessed on a bounded range slider. The bounds make it answerable rather than a
// blind guess; the reveal shows the true value, your error, the source + retrieval date, and
// a link to the article. Deterministic per UTC date. Score by proximity; a rolling accuracy
// figure lives in stats. Reuses the GAM-011 data plumbing.
//
// Zero third-party scripts; items fetched same-origin (CSP connect-src 'self').
import { dateSeed, seededRng, shuffle, recordResult, offerShare, getStats, loadState, saveState } from './game-shell.js';

const SLUG = 'the-number';
function dayNumber(dateStr) { return Math.floor(Date.parse(dateStr + 'T00:00:00Z') / 86400000); }

export function itemFor(dateStr, pool) {
  const seq = shuffle(pool, seededRng(dateSeed(dateStr, 'the-number-seq')));
  return seq[((dayNumber(dateStr) % seq.length) + seq.length) % seq.length];
}
// Proximity score 0-100: 100 = exact; falls linearly with error as a fraction of the range.
export function proximity(guess, answer, min, max) {
  const span = Math.max(1e-9, max - min);
  const err = Math.abs(guess - answer) / span;
  return Math.max(0, Math.round(100 * (1 - err)));
}

export async function mountNumber(host, { date } = {}) {
  if (!host) return;
  const today = date || new Date().toISOString().slice(0, 10);
  let pool;
  try { pool = (await (await fetch('/data/games/the-number.json')).json()).items; }
  catch (e) { host.innerHTML = '<p style="color:var(--muted)">Today\'s number could not load. Please refresh.</p>'; return; }
  const item = itemFor(today, pool);
  const min = item.min, max = item.max;
  const step = item.step || pickStep(min, max);

  const saved = loadState(SLUG, today);
  let done = !!(saved && saved.done);
  let guessVal = (saved && saved.guess != null) ? saved.guess : +(min + (max - min) / 2).toFixed(stepDecimals(step));

  host.innerHTML = '';
  host.className = 'tn';
  const q = el('p', 'tn__q', null, null, item.prompt);
  const readout = el('p', 'tn__readout', 'aria-live', 'polite');
  const slider = el('input', 'tn__slider');
  slider.type = 'range'; slider.min = String(min); slider.max = String(max); slider.step = String(step);
  slider.value = String(guessVal);
  slider.setAttribute('aria-label', item.prompt);
  const bounds = el('div', 'tn__bounds');
  bounds.append(el('span', null, null, null, fmt(min, item.unit)), el('span', null, null, null, fmt(max, item.unit)));
  const submit = el('button', 'tn__submit', null, null, 'Lock in my guess');
  submit.type = 'button';
  const reveal = el('div', 'tn__reveal'); reveal.hidden = true;
  host.append(q, readout, slider, bounds, submit, reveal);

  slider.addEventListener('input', () => { guessVal = +slider.value; drawReadout(); });
  submit.addEventListener('click', lockIn);
  drawReadout();
  if (done && saved) { guessVal = saved.guess; slider.value = String(guessVal); showReveal(saved.score); slider.disabled = true; submit.hidden = true; }

  function drawReadout() { readout.textContent = 'Your guess: ' + fmt(guessVal, item.unit); }

  function lockIn() {
    if (done) return;
    done = true;
    const score = proximity(guessVal, item.answer, min, max);
    saveState(SLUG, today, { done: true, guess: guessVal, score });
    // record: solved if within 5% of the range; store score in dist for rolling accuracy
    recordResult(SLUG, today, { solved: score >= 95, guesses: score });
    slider.disabled = true; submit.hidden = true;
    showReveal(score);
  }

  function showReveal(score) {
    reveal.hidden = false;
    reveal.innerHTML = '';
    const err = Math.abs(guessVal - item.answer);
    reveal.appendChild(el('p', 'tn__actual', null, null, 'The answer: ' + fmt(item.answer, item.unit)));
    reveal.appendChild(el('p', 'tn__err', null, null, 'You guessed ' + fmt(guessVal, item.unit) + ' — off by ' + fmt(round(err, step), item.unit) + '. Proximity ' + score + '/100.'));
    if (item.context) reveal.appendChild(el('p', 'tn__context', null, null, item.context));
    const cite = el('p', 'tn__cite');
    cite.appendChild(el('span', null, null, null, 'Source: ' + item.source + (item.retrieved ? ' · retrieved ' + item.retrieved : '')));
    if (item.articleUrl) {
      const a = el('a', 'tn__link', 'href', item.articleUrl, 'Read the Claridas article');
      a.setAttribute('rel', 'noopener');
      cite.appendChild(document.createTextNode(' · '));
      cite.appendChild(a);
    }
    reveal.appendChild(cite);
    // rolling accuracy from stats dist
    const st = getStats(SLUG);
    const avg = st ? avgOf(st.dist) : null;
    if (avg != null) reveal.appendChild(el('p', 'tn__avg', null, null, 'Your rolling accuracy: ' + avg.toFixed(0) + '/100 over ' + st.played + (st.played === 1 ? ' day.' : ' days.')));
    offerShare(host, 'Claridas The Number ' + today + ' — proximity ' + score + '/100.');
  }
  function avgOf(dist) { if (!dist) return null; let s = 0, n = 0; for (const k in dist) { s += Number(k) * dist[k]; n += dist[k]; } return n ? s / n : null; }
}

function pickStep(min, max) { const span = max - min; if (span <= 10) return 0.1; if (span <= 100) return 1; if (span <= 10000) return 1; return Math.pow(10, Math.floor(Math.log10(span)) - 2); }
function stepDecimals(step) { const s = String(step); return s.includes('.') ? s.split('.')[1].length : 0; }
function round(v, step) { const d = stepDecimals(step); return +v.toFixed(d); }
function fmt(v, unit) { const n = (typeof v === 'number') ? v.toLocaleString(undefined, { maximumFractionDigits: 2 }) : v; return n + (unit ? ' ' + unit : ''); }
function el(tag, cls, attr, val, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (attr) e.setAttribute(attr, val);
  if (text != null) e.textContent = text;
  return e;
}

if (typeof document !== 'undefined') {
  document.querySelectorAll('[data-number]').forEach((host) => {
    mountNumber(host, { date: host.getAttribute('data-date') || undefined });
  });
}
