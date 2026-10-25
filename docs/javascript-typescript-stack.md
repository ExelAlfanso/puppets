# JavaScript and TypeScript Stack

Status: user preferences for JavaScript/TypeScript projects, with Rust through Tauri as the backend for large desktop applications. This project's application stack has not been selected. Record final decisions with meaningful trade-offs in [ADRs](architecture/decisions/README.md). The [architecture overview](architecture/overview.md) owns application boundaries.

Choose frameworks according to project size and complexity. Not every project needs every component below.

## Rust Backend Through Tauri

For large desktop projects, use Tauri with Rust as the application backend. The frontend uses JavaScript/TypeScript with React or Vue. This covers backend logic and native capabilities through Tauri; frontend choices follow the desktop application's needs.

The frontend/Tauri backend communication contract is TBD during architecture design. ElysiaJS and Eden Treaty apply when a project has a TypeScript API server. Bun and pnpm serve the JavaScript/TypeScript parts; Rust/Tauri build configuration is selected during implementation.

## Core Tools

| Area | Choice | Notes |
| --- | --- | --- |
| Runtime | Bun | Runtime for server-side JavaScript and TypeScript. |
| Package manager | pnpm | Install and manage project dependencies with pnpm. |
| API server backend | ElysiaJS | Build TypeScript APIs, especially when running on Bun. |
| Large desktop backend | Rust + Tauri | Desktop application backend with a JavaScript/TypeScript frontend. |
| Frontend/backend API types | Eden Treaty | Share Elysia route types with the frontend for typed API calls. |
| Validation | Zod | Define schemas at input boundaries and share schemas or inferred types where needed. |
| Authentication | Better Auth | Preferred authentication library. |
| Infrastructure as code | Alchemy | Preferred IaC tool. |
| Effects | Effect TS | Use for typed effects and structured error handling when helpful; keep simple code direct. |
| Event/job delivery to workers | BullMQ | Queue events as jobs for background workers. |
| Queue storage | Redis | BullMQ dependency for queue and job state storage. |

## Events and Background Workers

Use BullMQ for asynchronous event/job delivery to workers when background processing is needed. A producer adds an event as a job to a BullMQ queue stored in Redis; a worker picks up and processes the job. This follows the [BullMQ queue model](https://docs.bullmq.io/guide/queues/).

Flow: producer → BullMQ/Redis queue → worker.

Payload schemas, queue names, retry/backoff, idempotency, concurrency, and failed-job handling are TBD according to product needs. If the producer runs in the Rust/Tauri backend, define its integration boundary with BullMQ during architecture design. Record event contracts in the API contract and integration decisions with meaningful trade-offs in ADRs.

## UI Libraries

- React: shadcn/ui.
- Vue: VUX.

Open Question: confirm the intended VUX package and version before implementing Vue. This preference is retained as requested by the user.

## Database Selection

- SQLite for small, uncomplicated projects with limited relational needs.
- PostgreSQL for complex projects, many related entities, or substantial relational queries.

## Frameworks by Project Size

| Project size | React | Vue | Build/framework direction |
| --- | --- | --- | --- |
| Small to medium | React + TanStack Router | Vue + Vue Router | Vite |
| Large web application | TanStack Start | Nuxt | Select the full-stack framework for the chosen UI ecosystem. |
| Large desktop application | React | Vue | JavaScript/TypeScript frontend + Rust backend through Tauri; build/router integration TBD. |

## Selection Guidance

Start with the smallest setup that meets product needs. For small or medium client-focused applications, use Vite and the router for the chosen framework. For large web applications that need server rendering and full-stack conventions, use TanStack Start for React or Nuxt for Vue.
