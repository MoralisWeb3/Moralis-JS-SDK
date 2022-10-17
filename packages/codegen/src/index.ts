import path from "node:path";
import { fileURLToPath } from "node:url";
import minimist from "minimist";
import { Plop, run } from "plop";

// == Types ================================================================

// == Constants ============================================================

const args = process.argv.slice(2);
const argv = minimist(args);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// == Exports ==============================================================

Plop.prepare(
  {
    cwd: argv.cwd,
    configPath: path.join(__dirname, "plopfile.ts"),
    preload: argv.preload || [],
    completion: argv.completion,
  },
  (env) => {
    return run(env, undefined, true);
  }
);
