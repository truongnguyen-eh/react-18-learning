import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const inputPath = process.env.INPUT || 'fundamentals/event-handling/event-lifecycle.ts';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 'react': 'react17',
      // 'react-dom/client': 'react-dom17'
    },
  },
  server: {
    open: '/index.html?input=/' + inputPath.replace(/^\/+|\\/g, '/'),
  },
});
