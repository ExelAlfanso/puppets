#!/usr/bin/env node
import { existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, realpathSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const roles = ['orchestrator', 'architect', 'backend', 'frontend', 'explorer', 'debugger', 'reviewer', 'tester'];
const help = `Puppets Orchestration

Usage:
  puppets-orchestration init [workspace-directory]
  puppets-orchestration init-project [repo-directory] --workspace <workspace-directory>

init creates the shared workspace without Git history.
init-project adds local coordination state to an existing Git checkout.
Existing files are preserved. Project AGENTS.md and .gitignore receive additive guidance.
`;

function ensureDirectory(root, directory) {
  const segments = relative(root, directory).split(sep).filter(Boolean);
  if (segments.includes('..')) throw new Error('Destination must stay inside the selected directory.');
  let current = root;
  for (const segment of segments) {
    current = join(current, segment);
    if (existsSync(current)) {
      const stat = lstatSync(current);
      if (stat.isSymbolicLink() || !stat.isDirectory()) throw new Error(`Expected a normal directory: ${current}`);
    } else {
      mkdirSync(current);
    }
  }
}

function writeMissing(root, destination, content) {
  const path = join(root, destination);
  ensureDirectory(root, dirname(path));
  try {
    writeFileSync(path, content, { flag: 'wx' });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
    if (lstatSync(path).isSymbolicLink() || !lstatSync(path).isFile()) throw new Error(`Expected a normal file: ${path}`);
  }
}

function copyMissing(root, source, destination) {
  const stat = lstatSync(source);
  if (stat.isSymbolicLink()) throw new Error(`Symlink is not a distributable asset: ${source}`);
  if (stat.isDirectory()) {
    ensureDirectory(root, join(root, destination));
    for (const entry of readdirSync(source)) copyMissing(root, join(source, entry), join(destination, entry));
  } else {
    writeMissing(root, destination, readFileSync(source));
  }
}

function appendText(root, filename, update) {
  const path = join(root, filename);
  if (existsSync(path) && (lstatSync(path).isSymbolicLink() || !lstatSync(path).isFile())) {
    throw new Error(`Expected a normal file: ${path}`);
  }
  const current = existsSync(path) ? readFileSync(path, 'utf8') : '';
  const addition = update(current);
  if (addition) writeFileSync(path, current + (current && !current.endsWith('\n') ? '\n' : '') + addition);
}

function ignoreRules(root, rules) {
  appendText(root, '.gitignore', current => {
    const existing = new Set(current.split(/\r?\n/).map(line => line.trim()));
    const missing = rules.filter(rule => !existing.has(rule));
    return missing.length ? '\n# Puppets local coordination and workspace outputs\n' + missing.join('\n') + '\n' : '';
  });
}

function scaffoldState(root, state) {
  ensureDirectory(root, join(root, '.orchestration/tasks'));
  ensureDirectory(root, join(root, '.orchestration/runs'));
  writeMissing(root, '.orchestration/state.md', state);
}

function initWorkspace(path) {
  mkdirSync(path, { recursive: true });
  const root = realpathSync(path);
  if (root === packageRoot || packageRoot.startsWith(root + sep) || root.startsWith(packageRoot + sep)) {
    throw new Error('Choose a workspace outside the installed package directory.');
  }
  for (const asset of ['README.md', 'AGENTS.md', 'skills-lock.json', 'docs', 'skills', '.agents/worker-skills.md']) {
    copyMissing(root, join(packageRoot, asset), asset);
  }
  for (const role of roles) copyMissing(root, join(packageRoot, `.agents/${role}.md`), `.agents/${role}.md`);
  for (const category of readdirSync(join(packageRoot, 'skills'), { withFileTypes: true }).filter(entry => entry.isDirectory())) {
    if (category.name === 'worker') continue;
    for (const skill of readdirSync(join(packageRoot, 'skills', category.name), { withFileTypes: true }).filter(entry => entry.isDirectory())) {
      copyMissing(root, join(packageRoot, 'skills', category.name, skill.name), `.agents/skills/${skill.name}`);
    }
  }
  scaffoldState(root, readFileSync(join(packageRoot, 'templates/state.md'), 'utf8'));
  ignoreRules(root, ['/.orchestration/', '/repos/', '/dist/']);
  console.log(`Workspace ready: ${root}\nShared roles, documentation, and skills installed; existing files preserved.`);
}

function git(root, args) {
  return execFileSync('git', ['-C', root, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

function initProject(path, workspacePath) {
  const root = realpathSync(path);
  const workspace = realpathSync(workspacePath);
  const gitRoot = realpathSync(git(root, ['rev-parse', '--show-toplevel']));
  if (root !== gitRoot) throw new Error('Select the Git checkout root, not a subdirectory.');
  if (root === workspace) throw new Error('The project and shared workspace must be separate directories.');
  if (!existsSync(join(workspace, '.agents/orchestrator.md')) || !existsSync(join(workspace, 'AGENTS.md'))) {
    throw new Error('Shared workspace is missing its AGENTS.md or orchestrator role. Run init first.');
  }
  if (git(root, ['ls-files', '--', '.orchestration'])) {
    throw new Error('.orchestration is already tracked. Resolve its migration before running init-project; no files have been changed.');
  }
  let branch;
  try { branch = git(root, ['symbolic-ref', '--quiet', '--short', 'HEAD']); }
  catch { branch = `detached ${git(root, ['rev-parse', '--short', 'HEAD'])}`; }
  const state = readFileSync(join(packageRoot, 'templates/state.md'), 'utf8')
    .replace('TBD — select a project checkout and record its branch.', `- Checkout: ${root}\n- Branch: ${branch}\n- Shared workspace: ${workspace}`);
  scaffoldState(root, state);
  ignoreRules(root, ['/.orchestration/']);
  const workspaceLink = relative(root, workspace).split(sep).join('/');
  appendText(root, 'AGENTS.md', current => current.includes('<!-- puppets-orchestration -->') ? '' : `\n<!-- puppets-orchestration -->\n## Shared Orchestration Context\n\nShared workspace: ${JSON.stringify(workspaceLink)} (relative to this repo root).\nLoad its AGENTS.md, the applicable role in .agents/, and docs/engineering/project-orchestration.md explicitly.\nUse this checkout's .orchestration/ for task state and evidence; keep it ignored by Git.\nKeep durable requirements and decisions in this repo's docs/ and project rules in AGENTS.md.\nExisting project instructions remain authoritative for project-specific behavior.\n`);
  git(root, ['check-ignore', '--', '.orchestration/state.md']);
  console.log(`Project ready: ${root}\nLocal .orchestration is ignored; commit AGENTS.md and .gitignore after review.`);
}

try {
  const args = process.argv.slice(2);
  const command = args.shift();
  if (!command || command === '--help' || command === '-h') {
    console.log(help);
  } else if (command === 'init') {
    if (args.length > 1 || args[0]?.startsWith('-')) throw new Error(help);
    initWorkspace(resolve(args[0] || '.'));
  } else if (command === 'init-project') {
    const workspaceIndex = args.indexOf('--workspace');
    if (workspaceIndex < 0 || !args[workspaceIndex + 1] || args[workspaceIndex + 1].startsWith('-')) throw new Error(help);
    const workspace = args[workspaceIndex + 1];
    args.splice(workspaceIndex, 2);
    if (args.length > 1 || args[0]?.startsWith('-')) throw new Error(help);
    initProject(resolve(args[0] || '.'), resolve(workspace));
  } else {
    throw new Error(`Unknown command: ${command}\n${help}`);
  }
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
}
