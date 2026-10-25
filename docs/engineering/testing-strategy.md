# Testing Strategy

Status: Initial product strategy; no application or CI checks exist. Workspace CLI tooling has tests using Node.js's built-in test runner. Product test tooling has not been selected.

## Workspace Tooling Verification

Run `node --test tests/cli.test.mjs` from the source repository. CLI tests cover workspace bootstrap without Git history, preservation of existing files/progress on repeat setup, per-repository state isolation, ignore rules, and rejection of tracked coordination state. Tests use temporary directories rather than user project repositories.

## Testing Goals

Verify [SRS acceptance criteria](../requirements/SRS.md) deterministically and according to risk. Focus on observable behavior, error paths, and data/access boundaries. Avoid tests that merely repeat implementation details.

## Selecting Test Types

| Type | Use for |
| --- | --- |
| Unit | Pure domain logic and boundary cases that need no real services |
| Integration | Behavior between modules and database/auth interactions when those components exist |
| Contract | Schema, request/response, and error consistency across client/server boundaries; API typing does not replace runtime validation |
| End-to-end | Primary user flows and important failures agreed in the PRD/SRS |
| Performance | Measurable performance requirements; establish budgets and load profiles from actual needs |

Not every change needs every test type. Select verification that provides evidence for affected requirements.

## Traceability

The SRS stores requirement → task/code/test links when available. Test names or descriptions may include requirement IDs to make evidence easy to find. Update acceptance criteria and related tests with implementation when requirements change.

## Test Environment

Product test tooling and configuration are TBD after framework selection. Isolate test data, control time/randomness when relevant, and clean up state. Fixtures must not contain production data or secrets.

## Required CI Checks

No CI is configured. During initial application implementation, select available lint/format, typecheck, build, and test commands and record their passing criteria here. Mark checks required/active only once their workflows exist.

## Documentation Verification

For documentation changes, check local links, source-of-truth consistency, IDs, and accuracy against the repository. Documentation-only changes do not require runtime tests. Keep temporary evidence in `.orchestration/` rather than treating it as a permanent product fact.
