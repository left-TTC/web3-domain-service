import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      buffer: "buffer",
      process: "process/browser",
    },
  },
  define: {
    global: "globalThis", // 让 CJS 代码里的 global 可用
    "process.env": {},
  },
  optimizeDeps: {
    include: [
      "buffer",
      "process",
      "@solana/spl-token",
      "@solana/web3.js"
    ],
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
});
