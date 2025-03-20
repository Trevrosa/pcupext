import type { Plugin } from "vite";
import { removeInlineScript } from "./src/removeInlineScript";
import * as path from "node:path";
import { readFile, writeFile } from "node:fs/promises";

const buildDir = path.resolve(__dirname, "build");

/**
 * Remove the $schema key from the manifest in the build directory.
 */
async function cleanManifest() {
    const manifestPath = path.resolve(buildDir, "manifest.json");
    const read = await readFile(manifestPath, { encoding: "utf-8" });
    
    const manifest = JSON.parse(read);
    delete manifest["$schema"];
    
    await writeFile(manifestPath, JSON.stringify(manifest));
    console.log("cleaned manifest.json");
}

/**
 * Build scripts.
 */
function postBuild(): Plugin {
    return {
        name: "post-build scripts",

        closeBundle: async () => {
            await removeInlineScript(buildDir);
            await cleanManifest();
        },
    };
}

export default postBuild;
