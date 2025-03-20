import { defineConfig, type UserConfig } from "vite";

import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import viteCompression from "vite-plugin-compression";
import postBuild from "./postBuild";
import tailwindcss from "@tailwindcss/vite";

const config: UserConfig = defineConfig({
    plugins: [
        tailwindcss(),
        sveltekit(),
        enhancedImages(),
        viteCompression({ algorithm: "brotliCompress" }),
        postBuild(),
    ],
});

export default config;
