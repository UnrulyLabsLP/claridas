/**
 * search.js — CLD-010
 * Reads the build-time JSON index, filters on input, renders results.
 * CSP-safe: external module loaded via <script type="module" src="/js/search.js">.
 */

const LIMIT = 30;
const DEBOUNCE_MS = 150;

document.addEventListener('DOMContentLoaded', () => {
  const blob = document.getElementById('claridas-search-index');
  const input = document.getElementById('q');
  const results = document.getElementById('results');

  if (!blob || !input || !results) return;

  let index;
  try {
    index = JSON.parse(blob.textContent || '[]');
  } catch {
    return;
  }

  let timer = null;

  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => render(input.value.trim()), DEBOUNCE_MS);
  });

  function render(query) {
    if (!query) {
      results.innerHTML = '';
      return;
    }

    const q = query.toLowerCase();
    const matches = index
      .filter((a) =>
        a.headline.toLowerCase().includes(q) ||
        a.subhed.toLowerCase().includes(q)
      )
      .slice(0, LIMIT);

    if (matches.length === 0) {
      results.innerHTML = '<p class="search-none">No results.</p>';
      return;
    }

    results.innerHTML = matches
      .map((a) => {
        const hl = escHtml(a.headline);
        const dek = a.subhed ? `<p class="story-item__dek">${escHtml(a.subhed)}</p>` : '';
        const meta = a.vertical
          ? `<p class="story-item__meta">${escHtml(a.vertical)}</p>`
          : '';
        return `<div class="story-item">
  <div class="story-item__hl"><a href="/articles/${escHtml(a.id)}">${hl}</a></div>
  ${dek}${meta}
</div>`;
      })
      .join('');
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
});
