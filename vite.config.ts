import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { copyFileSync } from 'node:fs'

// Vite config — https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Production build is deployed to GitHub Pages under the `por` repository,
  // so assets must be rooted at /por/. The dev server keeps a root base.
  const isProduction = mode === 'production'

  return {
    base: isProduction ? '/por/' : '/',
    build: {
      sourcemap: false,
    },
    plugins: [react(), tailwindcss(), spaFallback()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      dedupe: ['react', 'react-dom', 'three'],
    },
    server: {
      host: '0.0.0.0',
      port: parseInt(process.env.PORT || '8443'),
      strictPort: true,
    },
    preview: {
      host: '0.0.0.0',
      port: parseInt(process.env.PORT || '8443'),
    },
  }
})

/**
 * SPA fallback for GitHub Pages: the site uses react-router with clean
 * sub-paths (/en, /uk). GitHub Pages has no history-rewriting, so any
 * deep link resolves to a 404 — we serve 404.html as a copy of index.html
 * and let the router pick up the actual URL client-side.
 */
function spaFallback(): Plugin {
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    closeBundle() {
      copyFileSync(path.resolve(__dirname, 'dist/index.html'), path.resolve(__dirname, 'dist/404.html'))
    },
  }
}
