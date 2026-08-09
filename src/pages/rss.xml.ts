import { getCollection } from 'astro:content';

const SITE = 'https://claridas.com';
const MAX_ITEMS = 30;

// Escape the five XML predefined entities so headlines/deks with & < > " ' are
// well-formed inside the feed. Hand-built to keep zero npm deps, mirroring sitemap.xml.ts.
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const articles = (await getCollection('articles')).sort(
    (a, b) => b.data.published.valueOf() - a.data.published.valueOf()
  );
  const latest = articles.slice(0, MAX_ITEMS);
  const buildDate = (latest[0]?.data.updated ?? latest[0]?.data.published ?? new Date()).toUTCString();

  const items = latest
    .map((a) => {
      const link = `${SITE}/articles/${a.id}/`;
      const desc = a.data.subhed ?? a.data.headline;
      return `    <item>
      <title>${esc(a.data.headline)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${esc(desc)}</description>
      <pubDate>${a.data.published.toUTCString()}</pubDate>
    </item>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Claridas News</title>
    <link>${SITE}</link>
    <description>The world, seen clearly. A news agency written entirely by AI — every claim sourced.</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
