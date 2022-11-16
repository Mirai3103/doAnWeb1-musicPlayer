import { defineConfig } from "vite";
import { resolve } from "path";
export default defineConfig({
    esbuild: {
        minify: false,
        minifySyntax: false,
    },
    build: {
        minify: false,
    },
    rollupOptions: {
        input: {
            main: new URL("index.html", import.meta.url).pathname,
            auth: new URL("auth.html", import.meta.url).pathname,
        },
    },
});
