import { Command, CommanderError } from "commander";
import { EXIT_OK, exitCodeFor, XrError } from "../errors/index.ts";

export interface MainOptions {
  version: string;
  argv: readonly string[];
  stdout: (text: string) => void;
  stderr: (text: string) => void;
}

/** Runs the `xr` CLI on `argv` (without the node and script paths) and returns the exit code. */
export function main({ version, argv, stdout, stderr }: MainOptions): number {
  const program = new Command("xr")
    .description(
      "Create, sync and remove the same git worktree branch across many sibling repos.",
    )
    .version(version, "-V, --version", "print the version")
    .helpOption("-h, --help", "print this help")
    .option("--codebase-path <path>", "path to the codebase")
    .option("--json", "print the result as one JSON object")
    .option("--no-interactive", "never ask questions")
    .exitOverride()
    .configureOutput({
      writeOut: stdout,
      writeErr: stderr,
      outputError: () => {},
    })
    .action(() => {
      program.outputHelp();
    });

  try {
    program.parse([...argv], { from: "user" });
    return EXIT_OK;
  } catch (thrown) {
    if (thrown instanceof CommanderError && thrown.exitCode === EXIT_OK) {
      return EXIT_OK;
    }
    const error = toXrError(thrown);
    stderr(`error: ${error.message}\n`);
    if (error.hint) {
      stderr(`${error.hint}\n`);
    }
    return exitCodeFor(error);
  }
}

/** Turns anything thrown into an `XrError`: commander errors become `usage`, the rest `internal`. */
export function toXrError(thrown: unknown): XrError {
  if (thrown instanceof XrError) {
    return thrown;
  }
  if (thrown instanceof CommanderError) {
    return new XrError({
      code: "usage",
      message: thrown.message.replace(/^error: /, ""),
      hint: "Run `xr --help` for usage.",
    });
  }
  const message = thrown instanceof Error ? thrown.message : String(thrown);
  return new XrError({ code: "internal", message });
}
