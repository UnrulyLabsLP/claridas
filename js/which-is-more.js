// GAM-011 — "Which Is More?", the data game only Claridas can make: each round shows two
// entities and one metric, the reader picks the larger, and the real figures are revealed
// with their source, retrieval date, and a link to the article the data came from. Ten
// rounds a day, deterministic per UTC date. The rounds are DATA (public/data/games/
// which-is-more.json) so the game can never contradict the journalism; the engine only
// presents and scores what the data holds. Correct/incorrect is marked by symbol + text,
// never colour alone.
//
// Zero third-party scripts; rounds fetched same-origin (CSP connect-src 'self').
import { dateSeed, seededRng, shuffle, recordResult, offerShare, getStats, loadState, saveState } from './game-shell.js';

const SLUG = 'which-is-more', ROUNDS = 10;
function dayNumber(dateStr) { return Math.floor(Date.parse(dateStr + 'T00:00:00Z') / 86400000); }

// Deterministic daily selection: seeded-shuffle the pool, take up to ROUNDS. Also decide
// (seeded) which side each option renders on, so the correct answer isn't always the same button.
export function roundsFor(dateStr, pool) {
  const rng = seededRng(dateSeed(dateStr, 'wim'));
  const picked = shuffle(pool, rng).slice(0, Math.min(ROUNDS, pool.length));
  const flip = shuffle(picked.map((_, i) => i), seededRng(dateSeed(dateStr, 'wim-flip')));
  return picked.map((r, i) => ({ ...r, _flip: flip.includes(i) && i % 2 === 0 }));
}
// Which option (a|b) is the larger value — the correct answer, derived from the figures.
export function correctOf(round) { return round.a.value >= round.b.value ? 'a' : 'b'; }

export async function mountWim(host, { date } = {}) {
  if (!host) return;
  const today = date || new Date().toISOString().slice(0, 10);
  let pool;
  try { pool = (await (await fetch('/data/games/which-is-more.json')).json()).rounds; }
  catch (e) { host.innerHTML = '<p style="color:var(--muted)">Today\'s data game could not load. Please refresh.</p>'; return; }
  const rounds = roundsFor(today, pool);

  const saved = loadState(SLUG, today);
  let idx = saved && Number.isInteger(saved.idx) ? saved.idx : 0;
  let score = saved && Number.isInteger(saved.score) ? saved.score : 0;
  const picks = (saved && Array.isArray(saved.picks)) ? saved.picks.slice() : []; // 'a'|'b' per answered round
  let revealed = false;

  host.innerHTML = '';
  host.className = 'wim';
  const progress = el('p', 'wim__progress');
  const q = el('p', 'wim__q', 'aria-live', 'polite');
  const opts = el('div', 'wim__opts');
  const reveal = el('div', 'wim__reveal');
  reveal.hidden = true;
  const nextBtn = el('button', 'wim__next', null, null, 'Next');
  nextBtn.type = 'button'; nextBtn.hidden = true;
  nextBtn.addEventListener('click', advance);
  host.append(progress, q, opts, reveal, nextBtn);

  host.tabIndex = 0;
  host.addEventListener('keydown', (e) => {
    if (revealed) { if (e.key === 'Enter' || e.key === ' ') { advance(); e.preventDefault(); } return; }
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') { pick('a'); e.preventDefault(); }
    else if (e.key === 'ArrowRight' || e.key === 'b' || e.key === 'B') { pick('b'); e.preventDefault(); }
  });

  persistAndDraw();

  function persist() { saveState(SLUG, today, { idx, score, picks, done: idx >= rounds.length }); }
  function persistAndDraw() { persist(); draw(); }

  function draw() {
    if (idx >= rounds.length) return finish();
    const r = rounds[idx];
    progress.textContent = 'Round ' + (idx + 1) + ' of ' + rounds.length + '  ·  Score ' + score;
    q.textContent = r.question;
    opts.innerHTML = '';
    reveal.hidden = true; nextBtn.hidden = true; revealed = false;
    const order = r._flip ? ['b', 'a'] : ['a', 'b'];
    for (const side of order) {
      const o = r[side];
      const b = el('button', 'wim__opt', null, null, o.label);
      b.type = 'button';
      b.dataset.side = side;
      b.setAttribute('aria-label', 'Choose ' + o.label);
      b.addEventListener('click', () => pick(side));
      opts.appendChild(b);
    }
  }

  function pick(side) {
    if (revealed || idx >= rounds.length) return;
    const r = rounds[idx];
    const correct = correctOf(r);
    const right = side === correct;
    if (right) score++;
    picks[idx] = side;
    revealed = true;
    persist();
    // mark options: correct one gets ✓, wrong pick gets ✗ (symbol + text, not colour alone)
    [...opts.children].forEach((b) => {
      const s = b.dataset.side;
      b.disabled = true;
      if (s === correct) { b.classList.add('is-correct'); b.textContent = '✓ ' + r[s].label + ' — ' + fmt(r[s]); }
      else { b.classList.add('is-wrong'); b.textContent = (s === side ? '✗ ' : '') + r[s].label + ' — ' + fmt(r[s]); }
    });
    // context + source + retrieval + article link
    reveal.hidden = false;
    reveal.innerHTML = '';
    reveal.appendChild(el('p', 'wim__verdict', null, null, right ? 'Correct.' : 'Not quite.'));
    if (r.context) reveal.appendChild(el('p', 'wim__context', null, null, r.context));
    const cite = el('p', 'wim__cite');
    cite.appendChild(el('span', null, null, null, 'Source: ' + r.source + (r.retrieved ? ' · retrieved ' + r.retrieved : '')));
    if (r.articleUrl) {
      const a = el('a', 'wim__link', 'href', r.articleUrl, 'Read the Claridas article');
      a.setAttribute('rel', 'noopener');
      cite.appendChild(document.createTextNode(' · '));
      cite.appendChild(a);
    }
    reveal.appendChild(cite);
    progress.textContent = 'Round ' + (idx + 1) + ' of ' + rounds.length + '  ·  Score ' + score;
    nextBtn.hidden = false;
    nextBtn.textContent = idx + 1 >= rounds.length ? 'See result' : 'Next';
    nextBtn.focus();
  }

  function advance() { idx++; persistAndDraw(); }

  function finish() {
    progress.textContent = '';
    q.textContent = 'You scored ' + score + ' of ' + rounds.length + '.';
    opts.innerHTML = ''; reveal.hidden = true; nextBtn.hidden = true;
    // record once; store the score in the dist for a running average
    recordResult(SLUG, today, { solved: score === rounds.length, guesses: score });
    // running average from the game-shell dist histogram
    const st = getStats(SLUG);
    const avg = st ? runningAverage(st.dist) : null;
    if (avg != null) host.appendChild(el('p', 'wim__avg', null, null, 'Your running average: ' + avg.toFixed(1) + ' / ' + rounds.length + ' over ' + st.played + (st.played === 1 ? ' day.' : ' days.')));
    // spoiler-free share: score + a ✓/✗ row
    const grid = picks.map((s, i) => (s === correctOf(rounds[i]) ? '🟩' : '⬜')).join('');
    offerShare(host, 'Claridas Which Is More ' + today + ' ' + score + '/' + rounds.length + '\n' + grid);
  }
  function runningAverage(dist) {
    if (!dist) return null;
    let sum = 0, n = 0;
    for (const k in dist) { sum += Number(k) * dist[k]; n += dist[k]; }
    return n ? sum / n : null;
  }
}

function fmt(o) { return (o.value != null ? o.value.toLocaleString() : '') + (o.unit ? ' ' + o.unit : ''); }
function el(tag, cls, attr, val, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (attr) e.setAttribute(attr, val);
  if (text != null) e.textContent = text;
  return e;
}

if (typeof document !== 'undefined') {
  document.querySelectorAll('[data-wim]').forEach((host) => {
    mountWim(host, { date: host.getAttribute('data-date') || undefined });
  });
}
