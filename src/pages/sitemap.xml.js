import { site } from '../site.config.js';
import fs from 'node:fs';
import path from 'node:path';
import { allReviews, urlOf } from '../lib/reviews.js';
import { tools } from '../rechner/tools.js';

export async function GET() {
  const reviews = allReviews();
  const ratgeber = JSON.parse(fs.readFileSync(path.resolve('content/ratgeber/index.json'), 'utf-8'));
  const staticUrls = ['/', '/tests/', '/elektronik-services/', '/ratgeber/', '/tools/', '/kontakt/', '/ueber-uns/', '/oliver-bechstein/',
    '/individuelle-kaufberatung/', '/installationsservice-fuer-heimkino-und-hifi-systeme/', '/fernwartung-und-technischer-support/',
    '/impressum/', '/datenschutzerklaerung/', '/sitemap-html/'];
  const urls = [
    ...staticUrls.map((u) => ({ loc: u })),
    ...Object.entries(site.types).filter(([k]) => k !== 'info' && reviews.some((r) => r.type === k)).map(([, t]) => ({ loc: `/${t.base}/` })),
    ...site.categories.filter((c) => reviews.some((r) => r.category?.slug === c.slug)).map((c) => ({ loc: `/kategorie/${c.slug}/` })),
    ...reviews.map((r) => ({ loc: urlOf(r), lastmod: r.modified || r.published })),
    ...tools.map((t) => ({ loc: `/tools/${t.slug}/` })),
    ...ratgeber.map((g) => ({ loc: `/ratgeber/${g.slug}/`, lastmod: g.date })),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${site.url}${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n')}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
