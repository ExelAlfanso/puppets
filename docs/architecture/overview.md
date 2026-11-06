# Architecture Overview

Status: Modular-monolith monorepo baseline for product repositories under `repos/`. This is a reusable structure; individual product boundaries and technology choices remain owned by each project's architecture documents.

## System Context

Puppets is a shared orchestration workspace. Each project under `repos/` is an independent Git repository with its own source, requirements, decisions, and `.orchestration/` state. This overview defines a small default for those product repositories.

## Modular Monolith in a Monorepo

Use one repository for the applications and shared packages that change together. Keep domain behavior inside a single backend application, divided into cohesive modules. Modules call one another in-process through explicit functions and contracts; they do not become separate services just because they have separate folders. Deployable applications remain explicit entry points under `app/`.

```text
project/
├── app/
│   ├── web/                    # Public web application
│   └── api/
│       └── src/
│           ├── modules/        # Cohesive domain modules; in-process calls
│           ├── db/             # Schema and migrations
│           └── index.ts        # Runtime entry point
├── packages/
│   ├── contracts/              # Shared API schemas and inferred types
│   ├── ui/                      # Shared UI only when multiple apps need it
│   └── config/                  # Shared lint/TypeScript configuration when useful
├── docs/                        # Durable requirements, decisions, operations
├── .github/workflows/           # CI and deployment workflows
├── .orchestration/              # Local task state; ignored by Git
├── package.json                 # Bun workspace root and shared scripts
└── bun.lock
```

`packages/` is for code consumed by more than one application. Keep database connections, secrets, runtime bindings, and server implementations inside their owning application. Share API types and validation schemas across the frontend/backend boundary; do not import backend modules into the frontend.

## Responsibilities and Dependencies

| Boundary | Responsibility |
| --- | --- |
| `app/web` | User-facing pages and browser interactions; calls the API through its public contract. |
| `app/api/src/modules/<domain>` | Domain behavior, validation, authorization, and application use cases. Modules share one process and database unless a documented need requires otherwise. |
| `app/api/src/db` | Persistence schema, migrations, and database access. Domain modules use this through the API's internal code boundary. |
| `packages/contracts` | Runtime input/output schemas and types used by both applications. No secrets, database clients, or server code. |
| `packages/ui` | Shared accessible interface components, only when more than one app needs them. |
| `.github/workflows` | Reproducible checks on pull requests and deployment from the configured integration branch. Secrets come from the CI secret store. |

Allowed dependency direction: applications may depend on shared packages; the backend owns its domain modules and persistence. Shared packages must not depend on either application. Keep module-to-module calls explicit and local. Add a network boundary only for a concrete scaling, security, or ownership requirement, and record the change in an ADR.

## Data Flow and Trust Boundaries

The browser treats the API as an external trust boundary. The API validates all input, authenticates and authorizes each protected request, and owns writes to persistent data. Shared TypeScript types help callers but do not replace runtime validation. Secrets and infrastructure credentials stay in server/runtime bindings or CI secret storage, never in browser bundles or committed `.env` files.

## CI and Deployment

`.github/workflows/ci.yml` runs the repository's install, format/lint, type, test, and build checks for pull requests. A separate deployment workflow deploys only the selected app or stack from the configured integration branch, using the same checked lockfile and protected repository secrets. Keep deployment configuration in the app or infrastructure entry point; workflows should call it rather than duplicate infrastructure definitions.

The monorepo does not require every app to share one release. Deployable app boundaries are declared in `app/`; shared package changes are verified against their consumers. A project records its actual provider, bindings, environment names, migration order, and rollback steps in `docs/operations/deployment.md` once those choices are made.

## Documentation and Coordination

Project-specific behavior belongs in its PRD/SRS; boundaries and trade-offs belong here and in ADRs; API interfaces belong in a contract or source schemas; data relationships belong in schema/migrations and an ERD when useful. Temporary tasks, dependencies, and run evidence belong only in the target repository's `.orchestration/` directory. See the [project orchestration guide](../engineering/project-orchestration.md).
