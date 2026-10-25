# Worker Skill Policy

This policy applies only to implementation workers: frontend, backend, or an agent explicitly assigned a worker implementation task. It does not apply to the orchestrator, architect, explorer, reviewer, tester, or debugger roles.

## Required Skills

After loading shared rules, the assigned role, and task context, implementation workers load these files from the shared workspace:

- [Ponytail](../skills/worker/ponytail/SKILL.md): prefer existing code, standard libraries, native features, and the smallest correct implementation. Use the upstream default level `full` unless the user requests another level.
- [Caveman](../skills/worker/caveman/SKILL.md): keep conversational updates concise while retaining exact technical meaning. Use the upstream default level `full` unless the user requests another level.

These modes apply only for the worker assignment. Their upstream persistence rules do not extend them to another role or the orchestrator's user-facing report. Stop or level changes requested by the user take precedence.

## Project Requirements Take Precedence

Do not simplify away requested behavior, acceptance criteria, security, accessibility, scope restrictions, or required verification. Read the relevant source and task before choosing an implementation.

Worker reports must still include actual outputs, changed files, verification commands/results, and deviations or remaining uncertainty. Compression must not conceal failed checks or missing evidence. Follow mandatory communication instructions even where the upstream skills suggest fewer progress updates.

Caveman applies to conversational prose only. Write normal English in code comments, documentation, task files, commit messages, PR descriptions, and other durable artifacts.

## Storage and Discovery

The skill snapshots are stored in `skills/worker/`. Do not install or mirror them into `.agents/skills/`, which makes them available for automatic activation across roles. Workers load them explicitly from the paths above. Workspace initialization and ZIP export preserve this separation.
