import { describe, expect, it } from 'vitest';
import { getIngredientItems } from '../src/lib/ingredients';
import JSON5 from 'json5';
import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

describe('ingredient groups', () => {
  it('flattens groups in their original order for search and SEO', () => {
    expect(
      getIngredientItems([
        { title: 'Saté', items: ['600 g kip', '5 el ketjap'] },
        { title: 'Saus', items: ['100 g pindakaas', '150 ml water'] },
      ]),
    ).toEqual(['600 g kip', '5 el ketjap', '100 g pindakaas', '150 ml water']);
  });

  it('stores all recipes in the new group format', async () => {
    const directory = fileURLToPath(new URL('../src/content/recipes/', import.meta.url));
    const files = (await readdir(directory)).filter((file) => file.endsWith('.json5'));
    expect(files.length).toBeGreaterThan(0);

    for (const file of files) {
      const data = JSON5.parse(await readFile(join(directory, file), 'utf8'));
      expect(Array.isArray(data.ingredients), file).toBe(true);
      expect(data.ingredients.length, file).toBeGreaterThan(0);
      for (const group of data.ingredients) {
        expect(Array.isArray(group.items), file).toBe(true);
        expect(group.items.length, file).toBeGreaterThan(0);
        if (data.ingredients.length > 1) {
          expect(group.title?.length, file).toBeGreaterThan(1);
        }
      }
    }
  });
});
