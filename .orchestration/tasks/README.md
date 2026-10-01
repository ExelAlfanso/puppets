# Task Files

Create one `ID.md` file per concrete task, such as `FE-001.md`. The orchestrator owns metadata and status. Use a narrow scope and name shared files explicitly so concurrent tasks do not write to the same place. A task may start only when every `depends_on` task is `done`. Those fields define the task graph; use a short flow sketch only if it clarifies a multi-step handoff.

```md
---
id: FE-001
type: implementation
agent: frontend
status: pending
depends_on: []
priority: normal
---

# Task Title

## Goal

Describe the single result.

## Why

Explain how this result serves the user goal.

## Inputs

- Relevant docs and source paths.

## Allowed Scope

- Files or directories the worker may edit.

## Read Only

- Relevant files the worker may inspect but not edit.

## Forbidden Scope

- Boundaries that must not change.

## Expected Outputs

- Artifacts and what a dependent task will consume.

## Verification

- Exact relevant commands or observable checks; use `not available yet` with a reason when the project has no such check.

## Acceptance Criteria

- Observable outcomes required for acceptance.

## Implementation Report

Fill after work: actual outputs, changed files, checks and results, and any deviation from the expected work. The worker reports evidence; the orchestrator controls final status.
```

Statuses: `pending → ready → in_progress → verification → done`. A failed check moves the task to `needs_fix`, then back to `in_progress` with concrete feedback. Compare the implementation report with the task scope and acceptance criteria; use the diff and independent checks as evidence. Keep attempts bounded; involve a debugger or architect when repeated fixes fail.
