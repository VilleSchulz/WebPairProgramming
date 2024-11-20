import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
//The proxy configuration allows you to forward requests from the frontend (e.g., running on localhost:3000) to a backend server (e.g., running on localhost:4000), avoiding CORS issues.

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});

