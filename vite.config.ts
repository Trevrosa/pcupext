import { defineConfig, type UserConfig } from "vite";

import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import postBuild from "./postBuild";
import tailwindcss from "@tailwindcss/vite";

const config: UserConfig = defineConfig({
    plugins: [tailwindcss(), sveltekit(), enhancedImages(), postBuild()],
});

export default config;
