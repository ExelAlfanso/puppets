# Puppets Orchestration

Puppets is a reusable, file-based workspace for coordinating AI coding agents across multiple project repositories. It provides shared agent roles, engineering skills, task protocols, and documentation guidance.

Each project keeps its own requirements, source code, Git history, and local orchestration state. The shared workspace provides the working rules and tools that agents use to plan, implement, verify, and review changes.

## What Is Included

- Agent roles for orchestration, frontend, backend, architecture, exploration, review, testing, and debugging.
- Task coordination with explicit scope, dependencies, acceptance criteria, and verification evidence.
- Categorized Vue, React, frontend, backend, and QA skills.
- Ponytail and Caveman for implementation workers only, governed by the [worker skill policy](.agents/worker-skills.md).
- Product, requirements, architecture, ADR, and engineering documentation foundations.
- A source CLI for creating a shared workspace and bootstrapping individual project repositories.

See the [documentation index](docs/README.md), [skill catalog](skills/README.md), and [technology preferences](docs/javascript-typescript-stack.md) for details. Product drafts contain explicit TBDs rather than invented product requirements.

## Requirements

- Node.js 20 or newer to run the installer CLI.
- Git to clone this source repository and initialize orchestration in an existing project checkout.
- An AI coding agent that can read repository instructions and files.

The CLI uses Node.js standard libraries and has no external runtime dependencies. Installer requirements are separate from the application's preferred runtime and package manager.

## Install from Source

```sh
git clone https://github.com/ExelAlfanso/puppets.git
cd puppets
node ./bin/puppets.mjs init ../puppets-workspace
```

The command creates a shared workspace with rules, roles, documentation, skills, and fresh coordination state. The generated workspace contains no `.git` history. No package installation is needed to run the source CLI.

Choose a destination outside the source directory. Retain the source checkout to run the CLI while using the generated workspace for project work.

## Set Up a Project

The target must already be a Git repository or worktree. From the source repository directory, run:

```sh
node ./bin/puppets.mjs init-project ../my-project --workspace ../puppets-workspace
```

Replace `../my-project` with the root of the checkout you want to work on. The command:

- Creates `.orchestration/state.md`, `tasks/`, and `runs/` if missing.
- Records the checkout, branch, and shared workspace in fresh state.
- Adds shared workspace guidance to the project's `AGENTS.md`.
- Adds `/.orchestration/` to the project's `.gitignore`.
- Preserves existing files and progress when run again.

Shared roles and skills stay in the central workspace. The command does not copy the entire foundation or overwrite existing project documentation. If `.orchestration/` is already tracked, it stops before changing the project so that migration can be resolved separately.

Commit the project's `AGENTS.md` and `.gitignore` changes after review. Keep local orchestration state ignored. See the [per-project orchestration guide](docs/engineering/project-orchestration.md) for manual setup and worktree isolation.

## Use the Workspace with an Agent

Give the agent an explicit shared workspace path, target checkout path, and goal. For example:

```text
Shared workspace: /path/to/puppets-workspace
Target project: /path/to/my-project
Goal: <describe the requested change>

Load the shared AGENTS.md and relevant agent role, then the project's
AGENTS.md and relevant documentation. Use the target project's
.orchestration/ for tasks, progress, and verification evidence.
```

Agents must read the selected project's state when switching repositories. Permanent requirements and decisions belong in that project's committed `docs/`. The shared workspace's state is reserved for its own work.

Ponytail and Caveman are explicitly loaded by frontend/backend implementation workers and agents assigned worker implementation tasks. Their snapshots remain in `skills/worker/` rather than the auto-discovered `.agents/skills/` directory. Other roles retain their normal behavior.

## Repository Structure

| Location | Purpose |
| --- | --- |
| [AGENTS.md](AGENTS.md) | Shared agent working rules |
| `.agents/*.md` | Agent roles and worker skill policy |
| [skills/](skills/README.md) | Categorized skill snapshots and references |
| [docs/](docs/README.md) | Documentation foundation and engineering guidance |
| `bin/puppets.mjs` | `init` and `init-project` CLI commands |
| `templates/` | Fresh coordination state template |
| `tests/` | CLI behavior checks |
| `.orchestration/` | Local coordination for work on this repository |
| `dist/` | Generated ZIP archives, ignored by Git |

Initialized workspaces also receive `.agents/skills/` copies for general skill discovery. Worker-only skills are kept separate.

## Git Ignore and Existing Files

Every project repository must ignore `/.orchestration/` because its state, assignments, and run evidence are temporary and checkout-specific. Commit stable project rules and documentation. If repositories live under a shared workspace's `repos/`, that directory is ignored by the shared workspace as well.

Both initialization commands preserve existing files. Repeating initialization does not upgrade installed rules, documents, or skill snapshots. Review and update existing workspace files separately when adopting a new package version.

## Optional ZIP Export

From the source repository root, use PowerShell:

```powershell
./scripts/build-package.ps1
```

Output: `dist/puppets-orchestration.zip`. Extract it to use the shared workspace manually. For another build, choose a new output filename with `-OutputPath`; existing archives are preserved. The exporter is source tooling and is not installed by `init`.

Bundled skills retain their upstream metadata and available license files. Their sources are documented in the [skill catalog](skills/README.md), `skills-lock.json`, and the worker snapshot notes.
