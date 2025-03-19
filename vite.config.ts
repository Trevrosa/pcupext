import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import { removeInlineScript } from "./src/removeInlineScript";
import * as path from "node:path";

export default defineConfig({
    plugins: [
        sveltekit(),
        enhancedImages(),
        viteCompression({ algorithm: "brotliCompress" }),
        {
            name: "removeInlineScript",

            closeBundle: () => {
                removeInlineScript(path.resolve(__dirname, "build"));
            },
        },
    ],
});
