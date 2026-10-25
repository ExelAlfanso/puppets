# Orchestration per Repository/Project

The central workspace holds shared rules and agent roles. Each project repository keeps its own orchestration state at the active checkout root. The agent selects the target repository from the user's instructions and uses that directory for the project's tasks and runs.

## Minimal Structure

```text
workspace/
├── AGENTS.md
├── .agents/                 # Shared roles
├── skills/                  # Shared skill references
└── repos/
    └── project-a/           # Separate Git repository
        ├── AGENTS.md        # Project rules, committed
        ├── .gitignore       # Ignore rules, committed
        ├── docs/            # Project requirements/decisions, committed
        └── .orchestration/  # Local coordination, ignored
            ├── state.md
            ├── tasks/
            └── runs/
```

Repositories may live outside `repos/`; always specify the target path. Shared roles and skills do not need to be copied into every project. When a repository is opened independently or outside the central workspace, the orchestrator explicitly loads shared rules/roles rather than assuming parent instructions are available.

| Content | Purpose |
| --- | --- |
| `state.md` | Target repository/checkout, branch, active goal, phase, tasks, and blockers |
| `tasks/<ID>.md` | Scope, dependencies, related requirements, acceptance criteria, and outcome report for one task |
| `runs/` | Command evidence, attempts, failures, and review results useful to the active run |

Follow the task protocol in [AGENTS.md](../../AGENTS.md). Task IDs are local to each repository/checkout. Include the repository name and task ID in communication across projects.

## Setting Up the Selected Repository

The source CLI can perform the initial setup from the shared workspace checkout:

```sh
node <shared-workspace-path>/bin/puppets.mjs init-project <repo-path> --workspace <shared-workspace-path>
```

The command preserves existing state and adds project guidance and ignore rules. It rejects already-tracked orchestration state before modifying the repository. See the [workspace README](../../README.md) for source setup.

For manual setup or ongoing work:

1. Confirm the absolute target path, Git root, branch, and checkout/worktree. Run implementation commands from that checkout.
2. Read its `AGENTS.md` and existing documentation, then load relevant shared roles.
3. Add `/.orchestration/` to the target's `.gitignore`, preserving existing rules.
4. Create `.orchestration/state.md`, `tasks/`, and `runs/` if missing. Preserve existing state and reconcile it against the branch, code, and current goal before continuing.
5. Record the target identity in state. Create local tasks before delegation and follow the shared dependency and acceptance protocol.
6. When switching projects, read the destination project's state. Keep each project's tasks and progress in its own checkout.

Each worktree has its own local `.orchestration/`. Keep state separate for parallel checkouts and verify older checkout state against the current branch.

Initial `state.md` example:

```md
# Project State

## Target
- Project: <repository name>
- Checkout: <absolute path>
- Branch: <current branch>

## Goal
TBD — set from the user's instructions.

## Phase
Ready for task planning.

## Active Tasks
None.

## Blockers
None identified; reassess when the goal is defined.
```

## Required Git Ignore Rule

Add this rule to `.gitignore` at each project repository root:

```gitignore
# Local agent coordination state
/.orchestration/
```

State, assignments, attempts, and run evidence change during agent work and belong to a local checkout. Ignoring the directory keeps temporary progress out of commits, diffs, and merge conflicts. Commit `.gitignore` so the rule applies to all clones. Bootstrap `.orchestration/` when work begins in a new clone or checkout.

Durable requirements, technical decisions, contracts, and operational guidance belong in the project's `docs/`. Stable project rules belong in `AGENTS.md`. Commit both. Record verification evidence needed by collaborators in a PR or CI; durable documentation must remain useful without ignored local files.

Verify from the target repository root:

```sh
git check-ignore -v -- .orchestration/state.md
git ls-files -- .orchestration
```

The first command must show the ignore rule; the second must return no files. `.gitignore` does not untrack existing files. If state is already tracked, report it. Migrate it out of the index as a separately agreed change, preserving local files and first moving durable decisions into `docs/`.

For projects under `repos/`, add `/repos/` to the central workspace's `.gitignore` so project repositories are excluded from its Git history. Each project still needs its own `/.orchestration/` rule. This bootstrap guide does not automatically change the tracked orchestration foundation in the source workspace.

## Ready-to-Use Agent Context

```text
Target project: <absolute repository/checkout path>
Shared orchestration workspace: <absolute shared workspace path>

Read the shared AGENTS.md and relevant role, then the target's AGENTS.md and docs.
Confirm the Git root, branch, and target checkout before changing files.
Bootstrap .orchestration/state.md, tasks/, and runs/ at the target root if missing.
Preserve existing content and reconcile state against the code and user goal.
Add /.orchestration/ to the target's .gitignore without replacing other rules.
Verify the ignore rule and confirm no .orchestration files are tracked.
Report tracked state; do not automatically remove files or index entries.
Use only the target's .orchestration for tasks, dependencies, progress, and run evidence.
Keep durable requirements, decisions, and conventions in the target's docs/ or AGENTS.md,
and commit them with related changes.
Keep target project implementation state separate from shared workspace coordination.
```
