import { access, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url);
const required = [
  'index.html',
  'recepten/index.html',
  'over/index.html',
  'categorie/rund/index.html',
  'robots.txt',
  'sitemap-index.xml',
];
for (const path of required) await access(new URL(path, dist));
const recipes = await readdir(new URL('recepten/', dist), { withFileTypes: true });
if (!recipes.some((item) => item.isDirectory())) throw new Error('No generated recipe pages found');
console.info(`Static output verified (${recipes.length} recipe route entries).`);
