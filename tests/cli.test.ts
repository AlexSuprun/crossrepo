import { expect, test } from "bun:test";
import { main } from "../src/cli/index.ts";

test("main returns exit code 0", () => {
  expect(main()).toBe(0);
});
