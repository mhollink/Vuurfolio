import type { Loader } from 'astro/loaders';
import JSON5 from 'json5';
import { access, readdir, readFile } from 'node:fs/promises';
import { basename, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Build-time JSON5 loader with validation through the collection schema. */
export function json5RecipesLoader(relativeDir: string): Loader {
  return {
    name: 'json5-recipes',
    async load({ config, store, parseData, watcher, logger }) {
      const directory = resolve(fileURLToPath(config.root), relativeDir);
      const isRecipeFile = (name: string) => name.endsWith('.json5');

      async function sync() {
        const filenames = (await readdir(directory)).filter(isRecipeFile).sort();
        const entries = await Promise.all(
          filenames.map(async (filename) => {
            const filePath = join(directory, filename);
            const id = basename(filename, extname(filename));
            if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
              throw new Error(`Invalid recipe filename (URL slug): ${filename}`);
            }
            const raw = await readFile(filePath, 'utf8');
            let value: unknown;
            try {
              value = JSON5.parse(raw);
            } catch (error) {
              throw new Error(`Cannot parse JSON5 recipe ${filename}`, { cause: error });
            }
            if (!value || typeof value !== 'object' || Array.isArray(value)) {
              throw new Error(`Recipe ${filename} must contain a JSON5 object`);
            }
            const data = await parseData({ id, data: value as Record<string, unknown> });
            if (typeof data.image === 'string') {
              try {
                await access(resolve(fileURLToPath(config.root), 'public', data.image.slice(1)));
              } catch {
                throw new Error(`Image for ${filename} does not exist: ${data.image}`);
              }
            }
            return { id, data, filePath: `${relativeDir}/${filename}` };
          }),
        );

        // Only replace the store after all files have parsed and validated.
        store.clear();
        for (const entry of entries) store.set(entry);
      }

      await sync();
      watcher?.add(directory);
      for (const event of ['add', 'change', 'unlink'] as const) {
        watcher?.on(event, async (changedPath) => {
          if (changedPath.startsWith(`${directory}/`) && isRecipeFile(changedPath)) {
            logger.info(`Recipe changed: ${basename(changedPath)}`);
            await sync();
          }
        });
      }
    },
  };
}
