import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':  ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-icons':  ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
  preview: {
    allowedHosts: [
      'themobifixx.com',
      'www.themobifixx.com',
      'themobifixx.onrender.com',
      'all',
    ],
    host: '0.0.0.0',
    port: 4173,
    strictPort: false,
  },
});
