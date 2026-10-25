# Architecture Overview

Status: Repository baseline — application architecture TBD. This document records existing boundaries and will describe product boundaries once the [SRS](../requirements/SRS.md) is agreed.

## System Context

Human developers and AI coding agents use this repository to prepare software work. No product client, API service, database, or application runtime workload has been implemented.

Workspace tooling is available as a Node.js CLI in `bin/puppets.mjs`. It creates a shared workspace and local state in a target repository. See the [workspace README](../../README.md) for usage.

## Major Components and Responsibilities

| Repository boundary | Responsibility |
| --- | --- |
| `AGENTS.md` and `.agents/*.md` | Shared rules and agent roles |
| `docs/` | Durable product intent, requirements, architecture, decisions, and engineering guidance |
| `.orchestration/` | Temporary tasks, dependencies, progress, and run records |
| `skills/` | Categorized skill references |
| `bin/` and `templates/` | Bootstrap CLI with no external runtime dependencies and fresh state templates |

Application boundaries, service ownership, and communication are TBD. Agent roles do not define the product architecture.

## Data Flow

Application data flow: TBD. The [documentation index](../README.md) describes the documentation and implementation flow.

## External Dependencies

Application dependencies have not been installed or selected. Use the [stack preferences](../javascript-typescript-stack.md) as input and record choices with meaningful trade-offs in [ADRs](decisions/README.md).

## Trust Boundaries

Client/server boundaries, identity, access permissions, data classification, and external integrations are TBD until product scope is defined. Initial engineering rules are in [conventions](../engineering/conventions.md).

## Deployment Model

TBD: hosting targets, application processes, and environments. No staging, production, or deployment pipeline is documented as available.

## Important Constraints

Keep the repository foundation small and file-based, following [AGENTS.md](../../AGENTS.md). Create the API contract and ERD when interfaces and persistent entities are defined, following the [documentation triggers](../README.md#documents-created-when-needed).
