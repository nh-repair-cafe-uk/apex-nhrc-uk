import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://nhrc.uk',
  output: 'static',
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin'),
    }),
  ],
  vite: {
    build: {
      // Astro reuses this Vite setting to decide whether a small
      // per-page <script> chunk gets inlined straight into the HTML
      // instead of emitted as an external /_astro/*.js file. Inlined
      // scripts violate our CSP (script-src has no 'unsafe-inline' and
      // no per-script hash), so force everything external regardless
      // of size.
      assetsInlineLimit: 0,
    },
  },
});
