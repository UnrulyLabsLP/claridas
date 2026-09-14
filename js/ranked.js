// GAM-013 — "Ranked", a weekly ordering puzzle. Five items, put them in order by a stated
// metric. Keyboard-first: every item moves with ↑/↓ buttons (no drag required — drag alone is
// inaccessible). On reveal the true values render as a small bar chart, with the source and a
// link to the article. Weekly cadence (the good ranking questions run out fast), deterministic
// per ISO-ish week so everyone gets the same puzzle.
//
// Zero third-party scripts; lists fetched same-origin (CSP connect-src 'self'). The ranked
// LISTS (real ordered data + source + article link) are editorial; this engine orders + scores.
import { dateSeed, seededRng, shuffle, recordResult, offerShare, loadState, saveState } from './game-shell.js';

const SLUG = 'ranked';
function weekNumber(dateStr) { return Math.floor(Math.floor(Date.parse(dateStr + 'T00:00:00Z') / 86400000) / 7); }

export function listFor(dateStr, pool) {
  const seq = shuffle(pool, seededRng(dateSeed('week-' + weekNumber(dateStr), 'ranked')));
  return seq[((weekNumber(dateStr) % seq.length) + seq.length) % seq.length];
}
// The correct order: sort items by value. direction 'desc' (default) = most first; 'asc' = least first.
export function correctOrder(list) {
  const dir = list.direction === 'asc' ? 1 : -1;
  return list.items.map((it, i) => ({ it, i })).sort((a, b) => dir * (a.it.value - b.it.value)).map((x) => x.i);
}
// Score = number of items whose current position matches the correct order.
export function scoreOrder(currentIdx, correctIdx) {
  let n = 0;
  for (let pos = 0; pos < correctIdx.length; pos++) if (currentIdx[pos] === correctIdx[pos]) n++;
  return n;
}

export async function mountRanked(host, { date } = {}) {
  if (!host) return;
  const today = date || new Date().toISOString().slice(0, 10);
  let pool;
  try { pool = (await (await fetch('/data/games/ranked.json')).json()).lists; }
  catch (e) { host.innerHTML = '<p style="color:var(--muted)">This week\'s ranking could not load. Please refresh.</p>'; return; }
  const list = listFor(today, pool);
  const correct = correctOrder(list);

  // starting arrangement: a seeded shuffle of item indices that is NOT already correct
  const saved = loadState(SLUG, today);
  let order = (saved && Array.isArray(saved.order) && saved.order.length === list.items.length) ? saved.order.slice() : startOrder();
  let done = !!(saved && saved.done);

  host.innerHTML = '';
  host.className = 'rk';
  const q = el('p', 'rk__q', null, null, list.question);
  const hint = el('p', 'rk__hint', null, null, list.direction === 'asc' ? 'Order them from least to most.' : 'Order them from most to least.');
  const ol = el('ol', 'rk__list');
  ol.setAttribute('aria-label', list.question);
  const submit = el('button', 'rk__submit', null, null, 'Reveal the ranking');
  submit.type = 'button';
  const reveal = el('div', 'rk__reveal'); reveal.hidden = true;
  host.append(q, hint, ol, submit, reveal);
  submit.addEventListener('click', lockIn);
  draw();
  if (done) showReveal();

  function startOrder() {
    for (let a = 0; a < 30; a++) {
      const o = shuffle(list.items.map((_, i) => i), seededRng(dateSeed(today + '-' + a, 'ranked-start')));
      if (o.some((v, p) => v !== correct[p])) return o;
    }
    return list.items.map((_, i) => i).reverse();
  }
  function persist() { saveState(SLUG, today, { order, done }); }

  function move(pos, delta) {
    if (done) return;
    const np = pos + delta;
    if (np < 0 || np >= order.length) return;
    [order[pos], order[np]] = [order[np], order[pos]];
    persist(); draw();
    // keep focus on the moved item's new button
    setTimeout(() => { const b = ol.querySelectorAll('.rk__row')[np]?.querySelector('.rk__' + (delta < 0 ? 'up' : 'down')); if (b) b.focus(); }, 0);
  }

  function draw() {
    ol.innerHTML = '';
    order.forEach((itemIdx, pos) => {
      const it = list.items[itemIdx];
      const li = el('li', 'rk__row');
      li.appendChild(el('span', 'rk__rank', null, null, String(pos + 1)));
      li.appendChild(el('span', 'rk__label', null, null, it.label));
      const ctrls = el('span', 'rk__ctrls');
      const up = ctrlBtn('rk__up', '▲', 'Move ' + it.label + ' up', () => move(pos, -1));
      up.disabled = pos === 0 || done;
      const dn = ctrlBtn('rk__down', '▼', 'Move ' + it.label + ' down', () => move(pos, 1));
      dn.disabled = pos === order.length - 1 || done;
      ctrls.append(up, dn);
      li.appendChild(ctrls);
      ol.appendChild(li);
    });
  }

  function lockIn() {
    if (done) return;
    done = true; persist();
    const s = scoreOrder(order, correct);
    recordResult(SLUG, today, { solved: s === correct.length, guesses: s });
    submit.hidden = true;
    draw();
    showReveal(s);
  }

  function showReveal(scoreArg) {
    const s = scoreArg != null ? scoreArg : scoreOrder(order, correct);
    submit.hidden = true;
    reveal.hidden = false;
    reveal.innerHTML = '';
    reveal.appendChild(el('p', 'rk__verdict', null, null, s + ' of ' + correct.length + ' in the right place.'));
    // bar chart of the TRUE values, in correct order (accessible: each bar shows its value)
    const chart = el('div', 'rk__chart');
    const maxV = Math.max(...list.items.map((it) => Math.abs(it.value)), 1);
    correct.forEach((itemIdx, rank) => {
      const it = list.items[itemIdx];
      const row = el('div', 'rk__bar');
      row.appendChild(el('span', 'rk__bar-label', null, null, (rank + 1) + '. ' + it.label));
      const track = el('span', 'rk__bar-track');
      const fill = el('span', 'rk__bar-fill');
      fill.style.width = Math.max(3, Math.round((Math.abs(it.value) / maxV) * 100)) + '%';
      track.appendChild(fill);
      row.appendChild(track);
      row.appendChild(el('span', 'rk__bar-val', null, null, fmt(it.value, it.unit)));
      chart.appendChild(row);
    });
    reveal.appendChild(chart);
    if (list.context) reveal.appendChild(el('p', 'rk__context', null, null, list.context));
    const cite = el('p', 'rk__cite');
    cite.appendChild(el('span', null, null, null, 'Source: ' + list.source + (list.retrieved ? ' · retrieved ' + list.retrieved : '')));
    if (list.articleUrl) {
      const a = el('a', 'rk__link', 'href', list.articleUrl, 'Read the Claridas article');
      a.setAttribute('rel', 'noopener');
      cite.appendChild(document.createTextNode(' · '));
      cite.appendChild(a);
    }
    reveal.appendChild(cite);
    offerShare(host, 'Claridas Ranked ' + today + ' — ' + s + '/' + correct.length + ' correctly placed.');
  }

  function ctrlBtn(cls, glyph, aria, fn) {
    const b = el('button', 'rk__ctl ' + cls, null, null, glyph);
    b.type = 'button'; b.setAttribute('aria-label', aria);
    b.addEventListener('click', fn);
    return b;
  }
}

function fmt(v, unit) { const n = (typeof v === 'number') ? v.toLocaleString(undefined, { maximumFractionDigits: 2 }) : v; return n + (unit ? ' ' + unit : ''); }
function el(tag, cls, attr, val, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (attr) e.setAttribute(attr, val);
  if (text != null) e.textContent = text;
  return e;
}

if (typeof document !== 'undefined') {
  document.querySelectorAll('[data-ranked]').forEach((host) => {
    mountRanked(host, { date: host.getAttribute('data-date') || undefined });
  });
}
