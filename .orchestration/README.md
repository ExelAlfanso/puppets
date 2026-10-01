# Orchestration Workspace

This directory holds current coordination state. The orchestrator maintains `state.md`, writes one focused task file per assigned task under `tasks/`, and keeps only useful attempt or review records under `runs/`.

Start a run by inspecting the repository and durable `docs/`, naming the tasks and their output dependencies, then moving dependency-free tasks to `ready`. For multiple tasks, `depends_on` in each task file is the executable graph; optionally summarize its waves in `state.md` for readability. A small, single-worker task needs no extra diagram.

Assign an agent only the shared rules, its role file, its task file, relevant artifacts, and outputs of completed dependencies. Each assignment should convey the reason for the work and how to verify it. Independent tasks may run together when their write scopes do not overlap. After a worker reports what it actually changed, compare that with the task's expected work; resolve omissions or extra scope using the diff and acceptance evidence. The orchestrator advances tasks to `done` only after required checks and any independent review.

Store decisions that should survive a run in `docs/`. Keep progress, blockers, attempts, and temporary assignments here. No orchestration software is required to use these files.
