# Contributing to crossrepo

Thanks for your interest in crossrepo. This guide explains how to contribute.

## Setup

1. Install [Bun](https://bun.sh) at the version in `packageManager` in `package.json`.
2. Run `bun install`. This installs the dev tools and turns on the pre-commit hook in `.githooks/`, which rejects a commit when a staged file is not formatted. Run `bun run format` to fix the format.
3. Run `bun run validate`. It runs lint, typecheck, tests and the build. Run it before you open a pull request.

## Test scripts

- `bun run test`: run all tests except smoke tests, with the coverage floor.
- `bun run test:unit`: run the tests in `tests/unit/`.
- `bun run test:adapters`: run the tests in `tests/adapters/`.
- `bun run test:commands`: run the tests in `tests/commands/`.
- `bun run test:smoke`: build `dist/xr.js`, then run the smoke tests (`tests/smoke/*.smoke.ts`) against it under Node and under Bun. Node and Bun must both be installed.

## Open an issue first for big changes

For a big change, open an issue first and describe what you want to do. This lets us agree on the approach before you write code. Small fixes, such as typos, can go straight to a pull request.

## Tests first (TDD)

Write a failing test first, then the code that makes it pass. A bug fix starts with a test that reproduces the bug.

## Conventional Commits

Use [Conventional Commits](https://www.conventionalcommits.org/) such as `feat: ...`, `fix: ...` or `docs: ...`. Pull requests are squash merged and the PR title becomes the commit message, so the PR title is checked.

## CI

Every pull request runs CI on Linux, macOS and Windows: `checks` (lint, typecheck, unit, adapter and command tests), `smoke` (smoke tests under Node 22.13 and Node 24), `bun-only` (the bundle under the pinned Bun and Bun 1.3.0 with Node removed from PATH) and `pr-title`. All of them must pass before merge.

## Dependency updates

[Renovate](https://docs.renovatebot.com/) keeps dev dependencies, GitHub Action hashes and the Bun version in `packageManager` up to date (see `renovate.json`). Every Monday it opens grouped pull requests with the `dependencies` label: one for all minor and patch updates, one for each major update and one for Bun. The "Dependency Dashboard" issue lists pending and upcoming updates. You do not need to bump these by hand.

## Changesets

Once releases start, every pull request adds one changeset that describes the change for the changelog.

## Docs in the same pull request

User docs live in `docs/src/content/docs/`. When your change affects users, update the docs in the same pull request.

## Where to ask

Ask questions in [GitHub Discussions](https://github.com/AlexSuprun/crossrepo/discussions).

## No CLA

There is no contributor license agreement. By contributing, you agree that your contribution is licensed under the [MIT License](LICENSE).

## Code of conduct

This project follows the [Code of Conduct](CODE_OF_CONDUCT.md).
