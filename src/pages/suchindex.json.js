import { allReviews, urlOf } from '../lib/reviews.js';
import { tools, gruppen } from '../rechner/tools.js';
import fs from 'node:fs';
import path from 'node:path';

export function GET() {
  const gruppenMap = Object.fromEntries(gruppen.map((g) => [g.id, g.name]));

  // 1. Reviews (Tests & Checks)
  const reviews = allReviews().map((r) => ({
    title: r.productName || r.title,
    fullTitle: r.title,
    url: urlOf(r),
    type: r.type === 'check' ? 'Check' : 'Test',
    category: (r.category && r.category.name) || (r.category && r.category.slug) || 'Hardware',
    excerpt: (r.excerpt || '').replace(/<[^>]+>/g, '').slice(0, 160).trim(),
    score: r.score || null,
  }));

  // 2. Ratgeber & Kaufberater
  let guides = [];
  try {
    const guideFile = path.resolve('content/ratgeber/index.json');
    if (fs.existsSync(guideFile)) {
      const parsed = JSON.parse(fs.readFileSync(guideFile, 'utf-8'));
      guides = parsed.map((g) => ({
        title: g.title,
        fullTitle: g.title,
        url: `/ratgeber/${g.slug}/`,
        type: 'Ratgeber',
        category: 'Kaufberatung',
        excerpt: (g.excerpt || '').replace(/<[^>]+>/g, '').slice(0, 160).trim(),
        score: null,
      }));
    }
  } catch (e) {
    console.error('Error loading guides for search index:', e);
  }

  // 3. Online-Rechner
  const rechner = tools.map((t) => ({
    title: t.name,
    fullTitle: t.name,
    url: `/tools/${t.slug}/`,
    type: 'Rechner',
    category: gruppenMap[t.gruppe] || 'Online-Rechner',
    excerpt: t.kurz || '',
    score: null,
  }));

  const allItems = [...reviews, ...guides, ...rechner];

  return new Response(JSON.stringify(allItems), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
