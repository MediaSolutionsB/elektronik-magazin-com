import { site } from '../site.config.js';
import fs from 'node:fs';
import path from 'node:path';

export async function GET() {
  const reviews = JSON.parse(fs.readFileSync(path.resolve('content/reviews/index.json'), 'utf-8'));
  const tools = JSON.parse(fs.readFileSync(path.resolve('content/tools/index.json'), 'utf-8'));
  const ratgeber = JSON.parse(fs.readFileSync(path.resolve('content/ratgeber/index.json'), 'utf-8'));

  const staticUrls = [
    '/',
    '/elektronik-services/',
    '/ratgeber/',
    '/tools/',
    '/kontakt/',
    '/ueber-uns/',
    '/oliver-bechstein/',
    '/individuelle-kaufberatung/',
    '/installationsservice-fuer-heimkino-und-hifi-systeme/',
    '/fernwartung-und-technischer-support/',
    '/impressum/',
    '/datenschutzerklaerung/',
    '/sitemap-html/'
  ];

  const urls = [
    ...staticUrls.map((u) => ({ loc: `${site.url}${u}`, lastmod: '2026-10-12' })),
    ...reviews.map((r) => ({ loc: `${site.url}/${r.slug}/`, lastmod: r.date })),
    ...tools.map((t) => ({ loc: `${site.url}/tools/${t.slug}/`, lastmod: t.date })),
    ...ratgeber.map((g) => ({ loc: `${site.url}/ratgeber/${g.slug}/`, lastmod: g.date }))
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
}
