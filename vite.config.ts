import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

// GitHub Pages serves 404.html for unknown paths — use it as an SPA fallback
// so deep links like /film, /live, /post load the app instead of a 404 page.
function spaFallback(): Plugin {
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    closeBundle() {
      const outDir = fileURLToPath(new URL('./dist', import.meta.url));
      copyFileSync(`${outDir}/index.html`, `${outDir}/404.html`);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Portfolio-Website/',
  server: {
    port: 3000,
  },
  plugins: [react(), spaFallback()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
