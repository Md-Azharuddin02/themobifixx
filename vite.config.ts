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
  preview: {
    // Allow requests from the custom domain and Render's subdomain
    allowedHosts: [
      'themobifixx.com',
      'www.themobifixx.com',
      'themobifixx.onrender.com',
      'all',         // catch-all for any Render preview URLs
    ],
    host: '0.0.0.0',
    port: 4173,
    strictPort: false,
  },
});
