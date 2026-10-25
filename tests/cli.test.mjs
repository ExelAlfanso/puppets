import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const cli = resolve(dirname(fileURLToPath(import.meta.url)), '../bin/puppets.mjs');
const run = (...args) => execFileSync(process.execPath, [cli, ...args], { encoding: 'utf8' });
const git = (root, ...args) => execFileSync('git', ['-C', root, ...args], { encoding: 'utf8' });

test('workspace init installs assets without Git history and preserves existing files on repeat', () => {
  const root = mkdtempSync(join(tmpdir(), 'puppets-workspace-'));
  writeFileSync(join(root, 'AGENTS.md'), '# Existing instructions\n');
  run('init', root);
  assert.equal(readFileSync(join(root, 'AGENTS.md'), 'utf8'), '# Existing instructions\n');
  assert.equal(existsSync(join(root, '.git')), false);
  assert.ok(existsSync(join(root, '.agents/skills/ai-qa-review/SKILL.md')));
  assert.ok(existsSync(join(root, '.agents/worker-skills.md')));
  for (const skill of ['ponytail', 'caveman']) {
    assert.ok(existsSync(join(root, `skills/worker/${skill}/SKILL.md`)));
    assert.equal(existsSync(join(root, `.agents/skills/${skill}`)), false);
  }
  assert.ok(existsSync(join(root, 'docs/engineering/project-orchestration.md')));
  writeFileSync(join(root, '.orchestration/state.md'), 'Existing progress\n');
  run('init', root);
  assert.equal(readFileSync(join(root, '.orchestration/state.md'), 'utf8'), 'Existing progress\n');
  assert.equal(readFileSync(join(root, '.gitignore'), 'utf8').split('/.orchestration/').length, 2);
});

test('project init creates only local state and additive rules, with repeat-safe edits', () => {
  const parent = mkdtempSync(join(tmpdir(), 'puppets-project-'));
  const workspace = join(parent, 'workspace');
  const project = join(parent, 'project');
  run('init', workspace);
  mkdirSync(project);
  git(project, 'init', '--quiet');
  writeFileSync(join(project, 'AGENTS.md'), '# Project rules\n');
  writeFileSync(join(project, '.gitignore'), 'node_modules/\n');
  run('init-project', project, '--workspace', workspace);
  assert.match(readFileSync(join(project, 'AGENTS.md'), 'utf8'), /^# Project rules/);
  assert.match(readFileSync(join(project, '.gitignore'), 'utf8'), /^node_modules\//);
  assert.ok(git(project, 'check-ignore', '--', '.orchestration/state.md').trim());
  assert.equal(git(project, 'ls-files', '--', '.orchestration').trim(), '');
  assert.equal(existsSync(join(project, '.agents')), false);
  assert.equal(existsSync(join(project, 'docs')), false);
  const agents = readFileSync(join(project, 'AGENTS.md'), 'utf8');
  writeFileSync(join(project, '.orchestration/state.md'), 'Keep active tasks\n');
  run('init-project', project, '--workspace', workspace);
  assert.equal(readFileSync(join(project, 'AGENTS.md'), 'utf8'), agents);
  assert.equal(readFileSync(join(project, '.orchestration/state.md'), 'utf8'), 'Keep active tasks\n');
});

test('project init rejects tracked state before changing repo files', () => {
  const parent = mkdtempSync(join(tmpdir(), 'puppets-tracked-'));
  const workspace = join(parent, 'workspace');
  const project = join(parent, 'project');
  run('init', workspace);
  mkdirSync(join(project, '.orchestration'), { recursive: true });
  git(project, 'init', '--quiet');
  writeFileSync(join(project, '.orchestration/state.md'), 'Tracked state\n');
  git(project, 'add', '.orchestration/state.md');
  assert.throws(() => run('init-project', project, '--workspace', workspace));
  assert.equal(existsSync(join(project, 'AGENTS.md')), false);
  assert.equal(existsSync(join(project, '.gitignore')), false);
  assert.equal(readFileSync(join(project, '.orchestration/state.md'), 'utf8'), 'Tracked state\n');
});
