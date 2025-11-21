import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  define: {
    "process.browser": true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          abcjs: ["abcjs"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@models": path.resolve(__dirname, "src/models/"),
      "@": path.resolve(__dirname, "src/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@parsers": path.resolve(__dirname, "src/parsers/"),
      "@database": path.resolve(__dirname, "src/database/"),
      "@services": path.resolve(__dirname, "src/services/"),
      "@context": path.resolve(__dirname, "src/context/"),
      "@errors": path.resolve(__dirname, "src/errors/"),
    },
  },
});
