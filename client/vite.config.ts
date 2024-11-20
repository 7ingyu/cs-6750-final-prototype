import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../server/dist",
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  resolve: {
    alias: {
      "@": "/src",
      "@design": "/src/design",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@utils": "/src/utils",
      "~": "/node_modules",
      // "/device-mockups": "node_modules/html5-device-mockups"
    },
  },
});
