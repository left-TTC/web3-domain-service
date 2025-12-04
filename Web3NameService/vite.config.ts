import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; 
import path from "path";

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(), 
    ],

    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            buffer: "buffer",
            process: "process/browser",
            stream: "stream-browserify",
            zlib: "browserify-zlib",
            crypto: "crypto-browserify",
            util: "util",
        },
    },

    define: {
        global: "globalThis",
        "process.env": {},
    },

    optimizeDeps: {
        include: [
            "buffer",
            "process",
            "@solana/web3.js",
            "@solana/spl-token",
        ],
        esbuildOptions: {
            define: {
                global: "globalThis",
            },
        },
    },

    build: {
        rollupOptions: {
            output: {
                manualChunks: undefined,
            },
        },
    },
});