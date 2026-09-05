// CLD-007 — correct the masthead date to the visitor's own clock.
// The server renders the build date (ET) as a readable fallback; a page served
// from cache can be a day stale, so on load we rewrite it to the visitor's local
// date. Same en-US long format as the server so nothing changes but the value.
// External module (not inline) to stay inside the strict CSP script-src 'self'.
const el = document.querySelector('.masthead__date');
if (el) {
  const now = new Date();
  el.textContent = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  // Keep <time datetime> machine-readable and in sync (local calendar day).
  el.setAttribute('datetime', now.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }));
}
