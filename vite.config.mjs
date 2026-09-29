import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // Cloudflare Pages のドメインルートから配信
  base: "/",

  build: {
    outDir: "dist",
  },
});