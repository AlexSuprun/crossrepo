import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(
  readFileSync(new URL("../../package.json", import.meta.url), "utf8"),
);

describe("package.json publish contract", () => {
  test("name is crossrepo", () => {
    expect(pkg.name).toBe("crossrepo");
  });

  test("license is MIT", () => {
    expect(pkg.license).toBe("MIT");
  });

  test("type is module", () => {
    expect(pkg.type).toBe("module");
  });

  test("engines.node is >=22.13", () => {
    expect(pkg.engines?.node).toBe(">=22.13");
  });

  test("bin.crossrepo points at dist/xr.js", () => {
    expect(pkg.bin?.crossrepo).toBe("dist/xr.js");
  });

  test("bin.xr points at dist/xr.js", () => {
    expect(pkg.bin?.xr).toBe("dist/xr.js");
  });

  test("files ships only dist", () => {
    expect(pkg.files).toEqual(["dist"]);
  });

  // npm provenance fails when this url does not match the GitHub repo exactly.
  test("repository.url is the exact GitHub repo", () => {
    expect(pkg.repository?.url).toBe(
      "git+https://github.com/alexsuprun/crossrepo.git",
    );
  });

  test("homepage is the docs site", () => {
    expect(pkg.homepage).toBe("https://alexsuprun.github.io/crossrepo/");
  });

  test("bugs.url is the GitHub issues page", () => {
    expect(pkg.bugs?.url).toBe(
      "https://github.com/alexsuprun/crossrepo/issues",
    );
  });

  test("description is not empty", () => {
    expect(typeof pkg.description).toBe("string");
    expect(pkg.description.trim()).not.toBe("");
  });

  test("keywords equal the GitHub repo topics", () => {
    expect(pkg.keywords).toEqual([
      "ai-agents",
      "bun",
      "cli",
      "developer-tools",
      "git",
      "git-worktree",
      "multi-repo",
      "typescript",
      "worktree",
    ]);
  });

  for (const field of [
    "dependencies",
    "optionalDependencies",
    "peerDependencies",
    "bundleDependencies",
  ]) {
    test(`${field} is empty or absent`, () => {
      const value = pkg[field];
      if (value === undefined) return;
      const size = Array.isArray(value)
        ? value.length
        : Object.keys(value).length;
      expect(size).toBe(0);
    });
  }
});
