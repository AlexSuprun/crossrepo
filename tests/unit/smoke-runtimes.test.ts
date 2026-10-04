import { describe, expect, test } from "bun:test";
import { smokeRuntimes } from "../helpers/smoke-runtimes.ts";

const bunPath = "/path/to/bun";

describe("smokeRuntimes", () => {
  test("returns Node and Bun when XR_SMOKE_RUNTIMES is not set", () => {
    expect(smokeRuntimes(undefined, bunPath)).toEqual([
      ["node", "node"],
      ["bun", bunPath],
    ]);
  });

  test("returns Node and Bun when XR_SMOKE_RUNTIMES is empty", () => {
    expect(smokeRuntimes("", bunPath)).toEqual([
      ["node", "node"],
      ["bun", bunPath],
    ]);
  });

  test("returns only Bun for bun", () => {
    expect(smokeRuntimes("bun", bunPath)).toEqual([["bun", bunPath]]);
  });

  test("returns only Node for node", () => {
    expect(smokeRuntimes("node", bunPath)).toEqual([["node", "node"]]);
  });

  test("reads a comma list with spaces in the given order", () => {
    expect(smokeRuntimes(" bun , node ", bunPath)).toEqual([
      ["bun", bunPath],
      ["node", "node"],
    ]);
  });

  test("throws on an unknown runtime name", () => {
    expect(() => smokeRuntimes("bun,deno", bunPath)).toThrow(
      "XR_SMOKE_RUNTIMES has unknown runtime 'deno'; use a comma list of node, bun",
    );
  });
});
