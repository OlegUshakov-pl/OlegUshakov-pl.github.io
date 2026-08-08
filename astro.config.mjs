// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://olegushakov-pl.github.io',
  output: 'static',          // ← обязательно
  integrations: [
    react(),
    markdoc(),
    keystatic(),
  ],
});
