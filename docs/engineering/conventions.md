# Engineering Conventions

Status: Baseline for initial implementation. Application source structure, formatter, lint tooling, and script names have not been selected. This document governs project code; [AGENTS.md](../../AGENTS.md) governs agent working rules.

## Repository and Module Boundaries

Follow the [architecture boundaries](../architecture/overview.md) and [documentation ownership](../README.md). Select application source structure once boundaries are known; add layers or services only when needed.

Shared contract types and schemas must not import secrets, database connections, or server implementations into the frontend. Give application modules clear responsibilities and connect dependencies across boundaries through agreed contracts.

## Naming and Dependencies

Use consistent domain terminology; create a glossary when shared definitions are needed. Technology choices follow the [stack guide](../javascript-typescript-stack.md). Link to it rather than duplicating the stack list. Commit dependency lockfiles and document scripts once tooling is available.

## Commit and Pull Request Titles

Use `<type>: <short description>` for commit subjects and pull request titles. Choose one of these lowercase prefixes:

- `feat:` for a new capability.
- `fix:` for a bug correction.
- `chore:` for maintenance that does not change product behavior.
- `docs:` for documentation changes.

Examples: `feat: add invite flow`, `fix: handle empty workspace names`, `chore: update lint config`, and `docs: clarify repository conventions`.

## Branching and Pull Requests

For every `feat`, `fix`, `docs`, or `chore` task:

This workflow applies to this repository and every independent Git repository under `repos/`. Run Git commands in the target repository and use that repository's own `dev` and integration branches.

1. Start from the latest `dev` branch and create a task branch named `<type>/<short-kebab-name>`, using the matching type prefix. Examples: `feat/invite-flow`, `fix/empty-name`, `docs/branching-workflow`, and `chore/update-lint`.
2. Commit the task changes on that branch; do not push task changes directly to `dev` or the integration branch.
3. Open a pull request from the task branch into the repository's integration branch. Use `master` when that is the repository's integration branch; use its configured default branch when it is named differently. This repository uses `main`; Tinkerbin under `repos/` uses `master`.
4. Before merging, review the complete PR diff yourself for scope, correctness, regressions, secrets, and needed documentation. Run the relevant checks and record their results in the PR. Merge only after the self-review is clear and required checks pass.

If a repository does not yet have `dev`, create it from its current integration branch before starting task branches. Keep `dev` aligned with the integration branch after merges.

## Validation and Error Handling

Validate external input at system boundaries. TypeScript types alone do not establish runtime validity. Keep shared schemas at contract boundaries and link their implementations from the API contract when available.

Distinguish expected input/domain errors from internal failures. Contracts define public error shapes; internal details and stack traces are not sent to users. Select effects/error patterns according to project needs and technical decisions.

## Initial Security and Logging Rules

- Keep secrets out of source, documentation, logs, and test artifacts. Document configuration names and provisioning methods when integrations exist.
- Do not log credentials, session tokens, or sensitive payloads. Select diagnostic metadata according to agreed data classification.
- Private-access features must enforce authorization at the server boundary for each resource. UI restrictions alone are insufficient.
- Authentication, access models, auditing, retention, and sensitive integrations are TBD. Move details to `security.md` when those boundaries are defined, keeping a single source of rules.

## Code Review

Behavior changes include requirement IDs and verification evidence following the [testing strategy](testing-strategy.md). Review covers contracts across boundaries, sensitive data, dependency changes, and updates to owning documents. Repository-specific CI and release automation remain TBD; use the [branching and pull request workflow](#branching-and-pull-requests) for changes.
