import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://olegushakov-pl.github.io',
  output: 'static',
  integrations: [
    react(),
    markdoc(),
    // Keystatic только локально (не в production)
    ...(process.env.NODE_ENV === 'production' ? [] : [keystatic()]),
  ],
});
