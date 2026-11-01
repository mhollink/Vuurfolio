import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://bbq.hollink.dev',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
