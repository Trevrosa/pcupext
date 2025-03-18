// This file is to be run by `bun run` by the package.json `build` script.

import { removeInlineScript } from "./src/removeInlineScript";
import { resolve } from "path";

removeInlineScript(resolve(__dirname, "build"));
