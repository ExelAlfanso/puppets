# Worker-Only Skills

These snapshots are explicitly loaded by implementation workers through [the worker skill policy](../../.agents/worker-skills.md). They are not part of the shared auto-discovered skill directory.

| Skill | Snapshot source | Purpose |
| --- | --- | --- |
| Ponytail | Installed Ponytail plugin, version 4.10.0 | Minimal, correct implementations |
| Caveman | Installed user-level Caveman skill | Concise conversational output |

`SKILL.md` contains each skill's activation instructions. The project policy restricts activation and persistence to worker assignments. Other roles retain their normal behavior. These local snapshots are distributed with the package rather than managed by `npx skills` or `skills-lock.json`.
