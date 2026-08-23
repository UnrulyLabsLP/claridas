  // Copy-link for the reader share widget (DASH-020). Same-origin bundled module —
  // no inline script, so it stays inside the strict CSP script-src ('self').
  // The URL comes from a data-attribute the server rendered (already UTM-tagged +
  // scheme-validated in ShareWidget.astro); this script never builds a URL itself.
  const btn = document.querySelector('.share__copy');
  const url = btn?.getAttribute('data-copy-url');
  if (btn && url) {
    const original = btn.textContent;
    btn.addEventListener('click', async () => {
      let ok = false;
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(url);
          ok = true;
        }
      } catch (e) { /* fall through to prompt */ }
      if (ok) {
        btn.textContent = 'Copied';
        setTimeout(() => { btn.textContent = original; }, 1600);
      } else {
        // Clipboard API unavailable/denied — show the link so the reader can copy it.
        window.prompt('Copy this link', url);
      }
    });
  }
