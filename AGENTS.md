# AGENTS.md

Instructions for AI agents working on crossrepo. These rules apply as code arrives in the repo.

## Commands

- `bun install`: install dev tools and turn on the pre-commit format check.
- `bun run validate`: run lint, typecheck, tests and the build, and stop at the first failure. Run it before you finish a change.
- `bun run lint`: lint and format check with Biome.
- `bun run format`: fix lint and format issues that Biome can fix.
- `bun run typecheck`: typecheck `src/` and, separately, `tests/` and `scripts/`.
- `bun run test`: run the tests with the coverage floor.
- `bun run build`: bundle the CLI to `dist/xr.js`.

Tests and `scripts/` may use `Bun`. `src/` may not: a Biome rule on `src/` rejects the `Bun` global and imports of `bun` and `bun:*`.

For Conventional Commits, changesets and docs in the same pull request, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Layers

Code in `src/` follows this layer order:

```
cli → commands → services → domain + adapters
```

- `domain` imports only `errors`.
- Commands never import each other.
- Services never import commands.
- `config` and `output` import nothing else from crossrepo.
- Only adapters, `config` and `output` touch `node:fs` and `node:child_process`.
- `src/` uses `node:` APIs only, never `Bun`.

## Tests

- Use test-driven development: write a failing test first, then the code that makes it pass.
- Tests have a coverage floor. Do not lower it.

## Docs

User docs live only in `docs/src/content/docs/`. Do not copy them anywhere else.
