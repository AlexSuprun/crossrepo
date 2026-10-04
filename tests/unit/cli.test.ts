import { describe, expect, test } from "bun:test";
import { main, toXrError } from "../../src/cli/index.ts";
import { XrError } from "../../src/errors/index.ts";

function run(argv: string[]) {
  let stdout = "";
  let stderr = "";
  const code = main({
    version: "1.2.3",
    argv,
    stdout: (text) => {
      stdout += text;
    },
    stderr: (text) => {
      stderr += text;
    },
  });
  return { code, stdout, stderr };
}

describe("main", () => {
  test("--version prints only the version on stdout and exits 0", () => {
    expect(run(["--version"])).toEqual({
      code: 0,
      stdout: "1.2.3\n",
      stderr: "",
    });
  });

  test("--help prints usage with the global flags on stdout and exits 0", () => {
    const result = run(["--help"]);
    expect(result.code).toBe(0);
    expect(result.stderr).toBe("");
    expect(result.stdout).toContain("Usage: xr");
    expect(result.stdout).toContain("--codebase-path <path>");
    expect(result.stdout).toContain("--json");
    expect(result.stdout).toContain("--no-interactive");
  });

  test("no arguments prints usage on stdout and exits 0", () => {
    const result = run([]);
    expect(result.code).toBe(0);
    expect(result.stderr).toBe("");
    expect(result.stdout).toContain("Usage: xr");
  });

  test("global flags are accepted", () => {
    const result = run([
      "--codebase-path",
      "/tmp/x",
      "--json",
      "--no-interactive",
    ]);
    expect(result.code).toBe(0);
    expect(result.stderr).toBe("");
  });

  test("unknown option prints an error on stderr only and exits 2", () => {
    const result = run(["--nope"]);
    expect(result.code).toBe(2);
    expect(result.stdout).toBe("");
    expect(result.stderr).toBe(
      "error: unknown option '--nope'\nRun `xr --help` for usage.\n",
    );
  });

  test("an unexpected argument is a usage error with exit 2", () => {
    const result = run(["extra"]);
    expect(result.code).toBe(2);
    expect(result.stdout).toBe("");
    expect(result.stderr).not.toBe("");
  });

  test("a missing option value is a usage error with exit 2", () => {
    const result = run(["--codebase-path"]);
    expect(result.code).toBe(2);
    expect(result.stdout).toBe("");
  });
});

describe("toXrError", () => {
  test("keeps an XrError as is", () => {
    const error = new XrError({ code: "usage", message: "x" });
    expect(toXrError(error)).toBe(error);
  });

  test("turns any other error into an internal XrError", () => {
    const error = toXrError(new Error("boom"));
    expect(error.code).toBe("internal");
    expect(error.message).toBe("boom");
  });

  test("turns a thrown non-error into an internal XrError", () => {
    const error = toXrError("boom");
    expect(error.code).toBe("internal");
    expect(error.message).toBe("boom");
  });
});
