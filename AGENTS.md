# Project Instructions

## Goal and boundaries

This repository is being prepared for product work. The product goal has not been defined yet. Technology preferences are recorded in `docs/javascript-typescript-stack.md`; the application's stack and architecture remain undecided. Start with `docs/README.md` for documentation ownership and relevant context. Keep this orchestration foundation small, readable, and easy to extend; do not infer or implement product features without a task.

- `AGENTS.md` holds stable rules shared by every agent.
- `.agents/` holds role-specific instructions.
- `docs/` holds durable architecture, conventions, and decisions when they exist.
- `.orchestration/` holds current state, task specifications, and useful run records. It is the only place for short-lived coordination state.
- Follow existing project conventions once code is added. Prefer narrow changes and standard tools over new orchestration dependencies.

## Orchestration protocol

The orchestrator owns the user goal, task graph, assignments, acceptance decisions, and final report. It writes a focused task file in `.orchestration/tasks/` before delegating substantial work. Each task states why it exists, inputs, allowed and forbidden scope, expected outputs, dependencies, verification method, and measurable acceptance criteria. Give agents this file, their role file, these shared rules, and only the relevant source and docs.

For work spanning multiple tasks, identify task nodes and dependencies before assignment. The task files' `depends_on` fields define the execution graph; a compact diagram in `state.md` may help humans read it. Give each worker only its assigned part and the outputs of completed dependencies. The worker records actual outputs, changed files, checks, and deviations. The orchestrator compares that report with the task's expected work and verifies any deviation before acceptance.

Tasks move through `pending → ready → in_progress → verification → done`. A failed check moves a task to `needs_fix`; a concrete fix returns it to `in_progress`. Only begin work when dependencies are `done`. Independent tasks may run concurrently if their write scopes do not overlap. Sequence shared-file edits or give one task explicit ownership. Agents communicate through task files, durable docs, and concise run records; important decisions must be recorded in files rather than relying on chat history.

The worker reports its output and evidence but cannot alone mark its task `done`. The orchestrator checks acceptance criteria and requests deterministic verification and independent review when appropriate. Prefer relevant tests, lint, typecheck, build, and browser or API checks over unsupported claims. Record actual commands and outcomes. If verification fails, return actionable feedback; after repeated failures, use a debugger, then an architect for design issues, and escalate unresolved decisions to the user. Do not retry without new evidence.

## Working rules

- Stay within assigned file ownership. Ask the orchestrator to change scope or dependencies before editing outside it.
- Do not overwrite user work or existing documentation. Keep source changes tied to the active task.
- Do not add databases, queues, workflow engines, or extra agent roles to coordinate this workflow without a demonstrated need.
- Put stable context first when constructing agent prompts: this file, the role file, then task-specific inputs and latest feedback. Include enough context for correctness without dumping the repository.
- Use Markdown for human-readable coordination. Use YAML frontmatter only for task metadata that benefits from structure; use JSON for tool-produced machine data when needed.
