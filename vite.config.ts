import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const inputPath = process.env.INPUT || 'fundamentals/event-handling/event-lifecycle.ts';

export default defineConfig({
  plugins: [react()],
  server: {
    open: '/index.html?input=/' + inputPath.replace(/^\/+|\\/g, '/'),
  },
})
