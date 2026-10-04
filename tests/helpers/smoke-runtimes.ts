export type SmokeRuntime = readonly [name: "node" | "bun", command: string];

/**
 * Runtimes the smoke tests run `dist/xr.js` under, picked by `XR_SMOKE_RUNTIMES`
 * (a comma list of `node` and `bun`). Unset or empty means both.
 */
export function smokeRuntimes(
  setting: string | undefined,
  bunPath: string,
): SmokeRuntime[] {
  const all: Record<SmokeRuntime[0], SmokeRuntime> = {
    node: ["node", "node"],
    bun: ["bun", bunPath],
  };
  if (!setting?.trim()) return [all.node, all.bun];
  return setting.split(",").map((raw) => {
    const name = raw.trim();
    if (name !== "node" && name !== "bun") {
      throw new Error(
        `XR_SMOKE_RUNTIMES has unknown runtime '${name}'; use a comma list of node, bun`,
      );
    }
    return all[name];
  });
}
