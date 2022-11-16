import { defineConfig } from "vite";
export default defineConfig({
    esbuild: {
        minify: false,
        minifySyntax: false,
    },
    build: {
        minify: false,
    },
});
