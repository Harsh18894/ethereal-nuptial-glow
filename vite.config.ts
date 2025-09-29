import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// import { componentTagger } from "lovable-tagger";
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react({
      // Enable SWC optimizations
    }),
    mode === 'analyze' &&
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: mode === 'production' ? 'es2015' : 'esnext',
    minify: mode === 'production' ? 'esbuild' : false,
    cssMinify: mode === 'production',
    sourcemap: mode === 'development',
    commonjsOptions: {
      include: [/node_modules/],
    },
      rollupOptions: {
        output: {
          // Simplified chunking to avoid React loading issues
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              // Keep React and React-DOM together
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                return 'react-vendor';
              }
              if (id.includes('firebase')) {
                return 'firebase-vendor';
              }
              return 'vendor';
            }
          },
        },
      },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'firebase/app', 
      'firebase/firestore',
      '@tanstack/react-query',
      'lucide-react',
      'react-router-dom'
    ],
    exclude: ['@vite/client', '@vite/env'],
  },
  esbuild: {
    target: 'esnext',
    minifyIdentifiers: mode === 'production',
    minifySyntax: mode === 'production',
    minifyWhitespace: mode === 'production',
  },
}));
