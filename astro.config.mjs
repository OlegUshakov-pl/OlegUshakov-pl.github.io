import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';

export default defineConfig({
  site: 'https://olegushakov-pl.github.io',
  output: 'static',
  integrations: [
    react(),
    markdoc(),
  ],
});
