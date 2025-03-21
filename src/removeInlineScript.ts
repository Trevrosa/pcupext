import glob from "tiny-glob";
import * as fs from "node:fs/promises";
import { existsSync } from "node:fs";
import { format, resolveConfig } from "prettier";
import path from "node:path";

function hash(value: string | number[]) {
    let hash = 5381;
    let i = value.length;
    if (typeof value === "string") {
        while (i) hash = (hash * 33) ^ value.charCodeAt(--i);
    } else {
        while (i) hash = (hash * 33) ^ value[--i];
    }
    return (hash >>> 0).toString(36);
}

async function formatJs(input: string): Promise<string> {
    const config = await resolveConfig("script.js");
    return await format(input, { ...config!, parser: "typescript" });
}

/**
 * Remove inline scripts from all html files in the build directory.
 */
export async function removeInlineScript(directory: string) {
    if (!existsSync(directory)) {
        console.warn(`${directory} doesnt exist, aborting.`);
        return;
    }

    const scriptRegex = /<script>([\s\S]+)<\/script>/;
    const files = await glob("**/*.{html}", {
        cwd: directory,
        dot: true,
        absolute: true,
        filesOnly: true,
    });

    for (const file of files) {
        const f = await fs.readFile(file, { encoding: "utf-8" });

        const script = f.match(scriptRegex);
        if (script && script[1]) {
            const inlineScript = script[1]
                .replace("__sveltekit", "const __sveltekit")
                .replace("document.currentScript.parentElement", "document.body.firstElementChild");

            const formattedScript = await formatJs(inlineScript);

            const scriptFileName = `script-${hash(formattedScript)}.js`;
            const newHtml = f.replace(
                scriptRegex,
                `<script type="module" src="${scriptFileName}"></script>`
            );

            const scriptPath = path.resolve(directory, scriptFileName);

            await fs.writeFile(file, newHtml);
            await fs.writeFile(scriptPath, formattedScript);
            console.log(
                `inline script in '${path.relative(".", file)}' extracted and saved at: '${path.relative(".", scriptPath)}'`
            );
        }
    }
}
