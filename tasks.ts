#!/usr/bin/env -S sh -c '"`dirname $0`/node_modules/.bin/tsx" "$0" "$@"'

import { boot } from "@lumphammer/shared-fvtt-bits/task-core/boot";
import {
  clean,
  link,
  packidge,
  unlink,
  updateManifestFromCITagPush,
} from "@lumphammer/shared-fvtt-bits/task-core/tasks";

import { TaskArgs } from "@lumphammer/shared-fvtt-bits/task-core/types";
import path from "path";
import { promisify } from "util";
import { exec, spawn } from "child_process";
import { fileURLToPath } from "url";
import fs from "fs-extra";

const execPromise = promisify(exec);
const spawnPromise = promisify(spawn);

// This file replaces gulp/grunt/jake/whatever and just provides a place to put
// little build-related chunks of code and way to run them from the command
// line.

const rootPath = path.dirname(fileURLToPath(import.meta.url));
process.chdir(rootPath);

/**
 * Build TypeScript
 */
export async function buildCode({ buildPath, log }: TaskArgs) {
  log("Building TypeScript...");
  await fs.ensureDir(buildPath);
  await execPromise("npx tsc --project tsconfig.build.json");
  log("Finished building TypeScript.");
}

export async function copyAllFiles({ buildPath, log }: TaskArgs) {
  log("Copying all files...");
  await fs.ensureDir(buildPath);
  await fs.copy("public", buildPath);
  log("Finished copying all files.");
}

async function build(args: TaskArgs) {
  await clean(args);
  await Promise.all([buildCode(args), copyAllFiles(args)]);
}

boot({
  config: {
    rootPath,
    publicPath: "public",
    manifestName: "module.json",
    buildPath: "build",
    packagePath: "build_package",
  },

  commands: [
    clean,
    link,
    unlink,
    updateManifestFromCITagPush,
    packidge,
    buildCode,
    build,
    copyAllFiles,
  ],
});
