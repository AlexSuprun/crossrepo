#!/usr/bin/env node
import { main } from "./index.ts";

/** Replaced at build time by `bun build --define`. */
declare const XR_VERSION: string;

process.exitCode = main({
  version: XR_VERSION,
  argv: process.argv.slice(2),
  stdout: (text) => process.stdout.write(text),
  stderr: (text) => process.stderr.write(text),
});
