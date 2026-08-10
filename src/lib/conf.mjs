/**
 * Confidence-tag rendering — the SINGLE SOURCE OF TRUTH.
 *
 * Ryan-directed 2026-08-08: VERIFIED is the DEFAULT state. Every factual claim
 * is sourced, so chipping each one is noise that drowns the signal. We render an
 * inline marker ONLY for departures from verified — modeled / speculative /
 * preprint — and STRIP `[verified]` / `[verified: detail]` from display entirely
 * (it stays in the source as an audit marker).
 *
 * The old colored chips are gone. In their place: a small, accessible superscript
 * marker (`<sup><abbr>`) that carries the full meaning in the abbr title so it is
 * screen-reader friendly and non-decorative. Both render paths — the structured
 * block fields in [slug].astro (conf()) and the long-form markdown body (the
 * remark plugin) — MUST call confMarkerHtml() so there is exactly one
 * implementation of the marker HTML.
 */

// Single-letter marker + full accessible description per level.
const MARKERS = {
  modeled: { letter: 'm', title: 'modeled — our inference/estimate, assumptions linked' },
  speculative: { letter: 's', title: 'speculative — plausible but unconfirmed, treat as a hypothesis' },
  preprint: { letter: 'p', title: 'preprint — not yet peer-reviewed, cited with that caveat' },
};

/**
 * confMarkerHtml(level) → the accessible superscript marker HTML for one level.
 * Unknown levels return an empty string (never emit a broken/unstyled marker).
 */
export function confMarkerHtml(level) {
  const m = MARKERS[level];
  if (!m) return '';
  // Accessibility (Vista-required): <abbr title> alone does NOT announce — screen readers
  // read the element text ("m"); the title is spoken only if abbreviation-expansion is on
  // (off by default in NVDA/JAWS/VoiceOver). So the abbr is aria-hidden (decorative, for
  // sighted readers + hover tooltip) and a visually-hidden .sr-only span carries the spoken
  // word. Sighted see "m" + tooltip; screen readers say "modeled".
  return `<sup class="conf-marker conf-${level}"><abbr title="${m.title}" aria-hidden="true">${m.letter}</abbr><span class="sr-only">${level}</span></sup>`;
}

// Strip `[verified]` / `[verified: detail]` (and any leading space) from display.
export const VERIFIED_RE = /\s*\[verified(?::[^\]]*)?\]/g;
// Match `[modeled]` / `[speculative]` / `[preprint]` (with optional `: detail`).
export const MARKER_RE = /\[(modeled|speculative|preprint)(?::[^\]]*)?\]/g;
