import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: { exclude: ['@imgly/background-removal'] },
  build: { target: 'es2020', chunkSizeWarningLimit: 2000 },
});
