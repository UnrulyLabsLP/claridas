// CLD-009 — section archive: pagination + sort toggle.
// Operates on .story-item elements already in the DOM. No dependencies.
// PAGE_SIZE articles shown at first; "Load more" reveals the next page.
const PAGE_SIZE = 20;

function getItems() {
  return Array.from(document.querySelectorAll('#articlelist .story-item'));
}

let sortAsc = false;  // newest-first default matches server sort
let visibleCount = PAGE_SIZE;

function sortItems(items, asc) {
  return items.slice().sort((a, b) => {
    const da = a.dataset.published || '';
    const db = b.dataset.published || '';
    return asc ? da.localeCompare(db) : db.localeCompare(da);
  });
}

function render() {
  const list = document.getElementById('articlelist');
  if (!list) return;
  const items = sortItems(getItems(), sortAsc);
  // Re-order DOM in sorted order; then show/hide by position.
  items.forEach((el, i) => {
    list.appendChild(el);          // moves to sorted position
    el.hidden = i >= visibleCount;
  });
  // Update load-more visibility.
  const btn = document.getElementById('archive-more');
  if (btn) btn.hidden = visibleCount >= items.length;
  // Update sort button label.
  const sortBtn = document.getElementById('archive-sort');
  if (sortBtn) sortBtn.textContent = sortAsc ? 'Newest first' : 'Oldest first';
}

function init() {
  const list = document.getElementById('articlelist');
  if (!list) return;

  // Inject controls bar above the list.
  const bar = document.createElement('div');
  bar.className = 'archive-bar';
  bar.innerHTML =
    '<span class="archive-count"></span>' +
    '<button id="archive-sort" type="button">Oldest first</button>';
  list.parentNode.insertBefore(bar, list);

  // Inject load-more button after the list.
  const more = document.createElement('button');
  more.id = 'archive-more';
  more.type = 'button';
  more.className = 'archive-more';
  more.textContent = 'Load more';
  list.after(more);

  // Update article count.
  const countEl = bar.querySelector('.archive-count');
  if (countEl) countEl.textContent = getItems().length + ' articles';

  document.getElementById('archive-sort').addEventListener('click', () => {
    sortAsc = !sortAsc;
    visibleCount = PAGE_SIZE;   // reset to first page on sort change
    render();
  });

  more.addEventListener('click', () => {
    visibleCount += PAGE_SIZE;
    render();
  });

  render();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
