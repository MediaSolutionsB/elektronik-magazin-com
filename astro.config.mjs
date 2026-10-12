import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://elektronik-magazin.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
