import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/SIOReact/", // Nom exact de votre dépôt
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
});