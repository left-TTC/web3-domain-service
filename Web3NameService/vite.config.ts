import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import inject from '@rollup/plugin-inject';

export default defineConfig({
  plugins: [
    react(),
    inject({
      Buffer: ['buffer', 'Buffer'],
      process: 'process',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      buffer: 'buffer',
      process: 'process/browser',
    },
  },
  define: {
    'process.env': {}, // For using process.env safely in browser
    global: {},         // For some libraries expecting global object
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
});
