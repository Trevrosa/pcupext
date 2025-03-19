import svelte from "eslint-plugin-svelte";
import svelteConfig from "./svelte.config.js";
import globals from "globals";
import ts from "typescript-eslint";
import js from "@eslint/js";
import { fileURLToPath } from "node:url";
import { includeIgnoreFile } from "@eslint/compat";

import stylistic from "@stylistic/eslint-plugin";
import prettier from "eslint-config-prettier";

const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));

export default ts.config(
    includeIgnoreFile(gitignorePath),
    js.configs.recommended,
    ...ts.configs.recommended,
    ...svelte.configs.recommended,
    prettier,
    ...svelte.configs.prettier,
    {
        plugins: {
            "@stylistic": stylistic,
        },
    },
    {
        rules: {
            "@stylistic/quotes": "warn",
            "@stylistic/semi": "warn",
            "@stylistic/eol-last": "warn",
        },
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    {
        files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
        ignores: ["eslint.config.js", "svelte.config.js"],

        languageOptions: {
            parserOptions: {
                projectService: true,
                extraFileExtensions: [".svelte"],
                parser: ts.parser,
                svelteConfig,
            },
        },
    }
);
