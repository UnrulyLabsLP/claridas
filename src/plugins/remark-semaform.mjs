import { visit } from 'unist-util-visit';
import { confMarkerHtml, VERIFIED_RE, MARKER_RE } from '../lib/conf.mjs';

/**
 * Claridas feature-body remark plugins.
 *
 * These two plugins let long-form INVESTIGATIVE FEATURES carry a rich markdown
 * body (rendered via Astro's <Content/>) that speaks the same visual language as
 * the structured Semaform blocks in [slug].astro. Body-less routine articles are
 * untouched — they have no body, so neither plugin fires.
 */

/**
 * remarkSemaform — turn `:::semaform{type=X}` container directives into
 * `<aside class="sf sf--X">…</aside>`.
 *
 * Requires `remark-directive` to run first (it parses the `:::` syntax into
 * containerDirective / leafDirective / textDirective nodes). Any directive that
 * is NOT a `semaform` container (leaf/text directives, other names) is passed
 * through harmlessly: we leave the node as-is so remark's default handling of an
 * unknown directive (render its literal text) can't crash the build. We never
 * throw on unexpected shapes.
 */
export function remarkSemaform() {
  const ALLOWED = new Set(['key-insight', 'data-point', 'comparison', 'caveat']);
  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== 'containerDirective') return;
      if (node.name !== 'semaform') return;

      const attrs = node.attributes || {};
      const rawType = (attrs.type || '').trim();
      // Fall back to a neutral variant if the type is missing/unknown so we
      // never emit an unstyled/broken aside — but still render the content.
      const type = ALLOWED.has(rawType) ? rawType : 'caveat';

      const data = node.data || (node.data = {});
      data.hName = 'aside';
      data.hProperties = { className: ['sf', `sf--${type}`] };
    });
  };
}

// Confidence-tag rule — renders via the SINGLE SOURCE (src/lib/conf.mjs):
//   VERIFIED is the default state, so `[verified]` (and `[verified: detail]`)
//   are STRIPPED from display. modeled / speculative / preprint (with optional
//   `: detail`) render as the accessible marker from confMarkerHtml(). We
//   operate over markdown text nodes so it works inside the rendered <Content/>
//   body without double-processing the block strings (those are handled by
//   conf() at render time, which calls the same single source).

/**
 * remarkConfidenceTags — strip [verified]/[verified: …] and convert
 * [modeled]/[speculative]/[preprint] (with optional detail) inside the body into
 * the accessible marker from confMarkerHtml() (the single source).
 *
 * We replace matching text nodes with raw HTML nodes. `allowDangerousHtml` is
 * on for Astro's markdown pipeline, so an `html` mdast node renders verbatim —
 * this is the same trusted-authoring surface as the front-matter blocks.
 */
export function remarkConfidenceTags() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index === null || index === undefined) return;
      const value = node.value;
      // Reset lastIndex — these regexes are global and shared (single source).
      VERIFIED_RE.lastIndex = 0;
      MARKER_RE.lastIndex = 0;
      if (!VERIFIED_RE.test(value) && !MARKER_RE.test(value)) return;

      // Build a mixed sequence of text + html nodes preserving order.
      const out = [];
      let last = 0;
      // Combined matcher: verified-strip OR marker.
      const combined = /\s*\[verified(?::[^\]]*)?\]|\[(modeled|speculative|preprint)(?::[^\]]*)?\]/g;
      let m;
      while ((m = combined.exec(value)) !== null) {
        const [full, level] = m;
        if (m.index > last) {
          out.push({ type: 'text', value: value.slice(last, m.index) });
        }
        if (level) {
          out.push({
            type: 'html',
            value: confMarkerHtml(level),
          });
        }
        // verified match: emit nothing (stripped).
        last = m.index + full.length;
      }
      if (last < value.length) {
        out.push({ type: 'text', value: value.slice(last) });
      }
      if (out.length === 0) {
        out.push({ type: 'text', value: '' });
      }
      parent.children.splice(index, 1, ...out);
      return index + out.length;
    });
  };
}
