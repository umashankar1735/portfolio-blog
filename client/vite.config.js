import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const apiPort = globalThis.process?.env?.VITE_API_PORT || 5001;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': `http://localhost:${apiPort}`,
      '/uploads': `http://localhost:${apiPort}`,
    },
  },
});
