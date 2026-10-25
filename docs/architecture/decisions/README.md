# Architecture Decision Records

ADRs explain technical choices with meaningful trade-offs, effects across several boundaries, costly reversals, or reasoning future developers need to understand. User preferences in the [stack guide](../../javascript-typescript-stack.md) remain decision inputs; no application stack choice has become an Accepted ADR.

## Register

No application ADRs exist yet. Examples are not treated as actual decisions.

## Recording Rules

- Use sequential filenames such as `ADR-001-title.md`; never reuse IDs.
- Status: Proposed, Accepted, Rejected, or Superseded.
- Include Context, Decision, Alternatives Considered, and Consequences. Link to the relevant requirements or boundaries.
- Explain why alternatives were rejected and the costs/risks of the choice, beyond naming a library.
- Replace an Accepted decision with a new ADR. Mark the original Superseded, link both records, and preserve the historical reasoning.
- Link each ADR from this register and from the overview when it changes system boundaries.

## Format

```md
# ADR-XXX — Decision Title

Status: Proposed

## Context
The problem, requirements, constraints, and conditions requiring a decision.

## Decision
The proposed or accepted choice and its scope.

## Alternatives Considered
Actual alternatives, their advantages and limitations, and the reasons for selection.

## Consequences
Benefits, costs, risks, and required changes.
```
