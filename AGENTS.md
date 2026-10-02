# AGENTS.md

Instructions for AI agents working on crossrepo. These rules apply as code arrives in the repo.

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
