# Project Documentation

These documents are the source of truth for product and engineering information. The repository currently provides a foundation; no product application has been implemented. Technology preferences exist, but the application stack has not been selected.

## Sources of Truth

| Information | Document | Status |
| --- | --- | --- |
| Product problem, users, goals, scope, and outcomes | [PRD](product/PRD.md) | Draft; product decisions TBD |
| Software behavior and acceptance criteria | [SRS](requirements/SRS.md) | Draft; no accepted product requirements |
| System boundaries and responsibilities | [Architecture overview](architecture/overview.md) | Repository baseline recorded; product architecture TBD |
| Technology preferences | [JavaScript/TypeScript stack](javascript-typescript-stack.md) | Includes Rust/Tauri backends for large desktop applications; application stack undecided |
| Technical decision rationale | [ADR index](architecture/decisions/README.md) | No application ADRs yet |
| Code structure and engineering standards | [Conventions](engineering/conventions.md) | Baseline for initial implementation, including commit and PR title prefixes |
| Verification approach | [Testing strategy](engineering/testing-strategy.md) | Strategy available; product tooling and CI TBD |
| Coordination setup per repository/checkout | [Project orchestration](engineering/project-orchestration.md) | Local state per project, required to be ignored by Git |

Flow: PRD goals → SRS requirements → architecture boundaries and ADRs → implementation → tests → operations. Technology decisions belong in architecture and ADRs rather than product requirements.

## Documents Created When Needed

| Document | Create when | Implementation source to reference |
| --- | --- | --- |
| `requirements/glossary.md` | Domain terms require shared definitions | PRD and SRS |
| `architecture/api-contract.md` | An interface will be consumed by another component | Machine-readable specification or contract types/schemas; select during architecture design |
| `architecture/erd.md` | Persistent domain entities and relationships are defined | Migrations for exact schema details |
| `engineering/security.md` | Data boundaries, authentication, authorization, or sensitive integrations are defined | Security requirements in SRS; initial rules are in conventions |
| `operations/deployment.md` | Deployment targets and release procedures are selected | Actual build/IaC configuration and migration/rollback procedures |
| `operations/runbook.md` | Services are operated and diagnosis/recovery procedures exist | Available health checks, logs, metrics, and recovery procedures |

Do not infer endpoints, entities, staging/production environments, queues, or recovery procedures from documentation examples. Mark unknown information as **TBD** or **Open Question** in its owning document.

## IDs and Traceability

- Product goals: `PG-001`, `PG-002`, and so on, owned by the PRD.
- Requirements: `FR-<DOMAIN>-001` or `NFR-<AREA>-001`; use `SEC`, `PERF`, `REL`, and `OBS` for specific categories when useful.
- Decisions: `ADR-001`, `ADR-002`, and so on, following the [ADR rules](architecture/decisions/README.md).
- IDs remain stable when titles or details change. Retired IDs are not reused.
- Implementation tasks in `.orchestration/tasks/` reference requirement IDs, acceptance criteria, and relevant documents. Maintenance tasks such as documentation setup may state that product requirements do not yet apply.
- The SRS links requirements to PRD goals and implementation/test evidence when available. Avoid duplicating that matrix elsewhere.

## Loading Context for Humans and Agents

Use [AGENTS.md](../AGENTS.md) and roles in `.agents/` for agent working rules. Then select documentation according to the task:

| Work | Documentation context |
| --- | --- |
| Product/planning | PRD, SRS, glossary when available |
| Architecture | SRS, overview, relevant ADRs, stack preferences |
| Backend/data | Relevant requirements, API contract/ERD when available, ADRs, conventions, related source/migrations |
| Frontend | Relevant requirements, API contract and UI specification when available, conventions, related source |
| Testing/review | Task, requirement IDs, acceptance criteria, relevant constraints/ADRs, diff, verification results |

Progress, assignments, and run records belong only in `.orchestration/`. Documentation retains facts and decisions that remain useful after a task ends.

## Update Policy

Update each source of truth with its implementation change: behavior → SRS and tests; interfaces → contracts and tests; boundaries → overview and ADRs when trade-offs matter; data relationships → migrations and ERD; release/recovery → operations documentation.

When documents conflict, record the inconsistency, resolve it through the owning document, and correct affected documents. Do not silently select one account. Review changes for valid links and consistency with the implementation.

## Next Step

Answer the [PRD open questions](product/PRD.md#open-questions) about the user problem and MVP scope. Translate agreed goals into SRS requirements with acceptance criteria before selecting the application architecture.
