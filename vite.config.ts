import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
    plugins: [sveltekit(), enhancedImages(), viteCompression({ algorithm: "brotliCompress" })],
});
