# Contributing to crossrepo

Thanks for your interest in crossrepo. This guide explains how to contribute.

## Open an issue first for big changes

For a big change, open an issue first and describe what you want to do. This lets us agree on the approach before you write code. Small fixes, such as typos, can go straight to a pull request.

## Tests first (TDD)

Write a failing test first, then the code that makes it pass. A bug fix starts with a test that reproduces the bug.

## Conventional Commits

Use [Conventional Commits](https://www.conventionalcommits.org/) such as `feat: ...`, `fix: ...` or `docs: ...`. Pull requests are squash merged and the PR title becomes the commit message, so the PR title is checked.

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
