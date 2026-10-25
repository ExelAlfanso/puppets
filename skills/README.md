# Skill Catalog

Skills are grouped by topic for browsing. The installed copies in `.agents/skills/` are the active project skills; `npx skills` manages those. Most categorized folders mirror them for an easy overview. `worker/` is an exception: its snapshots are loaded explicitly by implementation workers and are not mirrored into `.agents/skills/`.

- `vue/`: Vue and Vue ecosystem
- `react/`: React and composition patterns
- `fe/`: General frontend design and interface guidelines
- `be/`: Backend architecture, feature delivery, Node.js patterns, and security
- `qa/`: QA skills for reviewing tests, coverage, risks, and release evidence; role guidance is in `.agents/reviewer.md`
- `worker/`: Ponytail and Caveman for implementation workers only; see [worker policy](../.agents/worker-skills.md)

Sources include `vuejs-ai/skills`, `vercel-labs/agent-skills`, `anthropics/skills`, `agent-skills-hub/agent-skills-hub`, and `petrkindlmann/qa-skills`.
