import * as path from "node:path";
import { defineConfig, type UserConfig } from "vite";

import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import viteCompression from "vite-plugin-compression";
import { removeInlineScript } from "./src/removeInlineScript";


const config: UserConfig = defineConfig({
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

export default config;
