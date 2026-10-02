# Security policy

## Reporting a vulnerability

Report security issues only through GitHub private vulnerability reporting: [open a private report](https://github.com/AlexSuprun/crossrepo/security/advisories/new).

Never report a vulnerability in a public issue, pull request or discussion.

## Supported versions

Only the latest released version gets security fixes. Update to the latest version before you report a problem.

## Hooks run code from config

crossrepo runs hooks from its config files. Hooks run as you, with your permissions, and there is no trust step. A config that is kept in git runs its hooks on the machine of every person who uses it.

Read a config and its hooks before your first run.
