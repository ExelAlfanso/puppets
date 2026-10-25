# Engineering Conventions

Status: Baseline for initial implementation. Application source structure, formatter, lint tooling, and script names have not been selected. This document governs project code; [AGENTS.md](../../AGENTS.md) governs agent working rules.

## Repository and Module Boundaries

Follow the [architecture boundaries](../architecture/overview.md) and [documentation ownership](../README.md). Select application source structure once boundaries are known; add layers or services only when needed.

Shared contract types and schemas must not import secrets, database connections, or server implementations into the frontend. Give application modules clear responsibilities and connect dependencies across boundaries through agreed contracts.

## Naming and Dependencies

Use consistent domain terminology; create a glossary when shared definitions are needed. Technology choices follow the [stack guide](../javascript-typescript-stack.md). Link to it rather than duplicating the stack list. Commit dependency lockfiles and document scripts once tooling is available.

## Validation and Error Handling

Validate external input at system boundaries. TypeScript types alone do not establish runtime validity. Keep shared schemas at contract boundaries and link their implementations from the API contract when available.

Distinguish expected input/domain errors from internal failures. Contracts define public error shapes; internal details and stack traces are not sent to users. Select effects/error patterns according to project needs and technical decisions.

## Initial Security and Logging Rules

- Keep secrets out of source, documentation, logs, and test artifacts. Document configuration names and provisioning methods when integrations exist.
- Do not log credentials, session tokens, or sensitive payloads. Select diagnostic metadata according to agreed data classification.
- Private-access features must enforce authorization at the server boundary for each resource. UI restrictions alone are insufficient.
- Authentication, access models, auditing, retention, and sensitive integrations are TBD. Move details to `security.md` when those boundaries are defined, keeping a single source of rules.

## Code Review

Behavior changes include requirement IDs and verification evidence following the [testing strategy](testing-strategy.md). Review covers contracts across boundaries, sensitive data, dependency changes, and updates to owning documents. Project-specific branch/release workflows are TBD; no CI or merge rules are claimed active.
