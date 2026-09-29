import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  base: "/",

  // ログを消さずに残す
  clearScreen: false,
  logLevel: "info",

  build: {
    outDir: "dist",
    minify: true,
    sourcemap: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 400,
    emptyOutDir: true,
  },
});