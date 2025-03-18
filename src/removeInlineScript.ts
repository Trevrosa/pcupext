import glob from "tiny-glob";
import * as fs from "node:fs";
import { format, resolveConfig } from "prettier";

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

function formatJs(input: string, callback: (formatted: string) => void) {
    resolveConfig("script.js").then((config) => {
        format(input, { ...config!, parser: "typescript" }).then(callback);
    });
}

/**
 * Remove inline scripts from all html files in the build directory.
 */
export function removeInlineScript(directory: string) {
    console.log("removing inline scripts");

    if (!fs.existsSync(directory)) {
        console.warn(`${directory} doesnt exist, aborting.`);
        return;
    }

    const scriptRegex = /<script>([\s\S]+)<\/script>/;
    glob("**/*.{html}", {
        cwd: directory,
        dot: true,
        absolute: true,
        filesOnly: true,
    }).then((files: string[]) => {
        files
            // .map((f) => path.join(directory, f))
            .forEach((file) => {
                console.log(`editing file: ${file}`);
                const f = fs.readFileSync(file, { encoding: "utf-8" });

                const script = f.match(scriptRegex);
                if (script && script[1]) {
                    const inlineScript = script[1]
                        .replace("__sveltekit", "const __sveltekit")
                        .replace(
                            "document.currentScript.parentElement",
                            "document.body.firstElementChild"
                        );

                    formatJs(inlineScript, (formattedScript) => {
                        const scriptFileName = `/script-${hash(formattedScript)}.js`;
                        const newHtml = f.replace(
                            scriptRegex,
                            `<script type="module" src="${scriptFileName}"></script>`
                        );

                        fs.writeFileSync(file, newHtml);
                        fs.writeFileSync(`${directory}${scriptFileName}`, formattedScript);
                        console.log(
                            `inline script extracted and saved at: ${directory}${scriptFileName}`
                        );
                    });
                }
            });
    });
}
