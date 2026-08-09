import { getCollection } from 'astro:content';

const SITE = 'https://claridas.com';

export async function GET() {
  const articles = await getCollection('articles');
  const statics = ['', 'about', 'methodology', 'contact', 'corrections',
    'sections/sports', 'sections/travel', 'sections/world', 'sections/us', 'sections/local'];
  const urls: { loc: string; lastmod?: string }[] = [
    ...statics.map((p) => ({ loc: `${SITE}/${p}` })),
    ...articles.map((a) => ({
      loc: `${SITE}/articles/${a.id}/`,
      lastmod: (a.data.updated ?? a.data.published).toISOString(),
    })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n')}
</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
