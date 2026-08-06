---
name: git-workflow-code-review
description: Use this skill whenever making commits, opening pull requests, choosing a branching strategy, or reviewing code changes. Trigger this for every commit/PR the agent creates, and whenever the user asks about "git workflow", "branching strategy", "commit messages", or "code review", so contributions are clean, well-described, and easy to review or revert.
---

# Git Workflow & Code Review

## Mission
Make the commit history and PR trail useful on its own — a future engineer (or agent) should be able to understand why a change was made from the commit/PR alone, without needing to ask the author, and any single commit should be safely revertable in isolation.

## Branching strategy (default: trunk-based / GitHub flow)
- `main` is always deployable. Feature work happens on short-lived branches (`feat/checkout-validation`, `fix/order-total-rounding`) branched from and merged back to `main` via PR.
- Prefer short-lived branches (days, not weeks) — long-lived feature branches accumulate merge conflicts and drift from `main`. Use feature flags to merge incomplete work safely rather than keeping a branch open for weeks.
- Reserve GitFlow-style `develop`/`release` branches for projects with genuinely scheduled, versioned releases (e.g. shipped desktop software) — it's unnecessary overhead for continuously-deployed web apps.

## Commit messages (Conventional Commits style, adaptable)
```
<type>(<scope>): <short summary, imperative mood, no period>

<optional body: what changed and why, not just what — the diff already shows "what">

<optional footer: BREAKING CHANGE: ..., Fixes #123>
```
Types: `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `chore`, `build`, `ci`.
- Imperative mood: "add validation" not "added validation" or "adds validation."
- Summary ≤ 50-72 chars; body wrapped, explaining reasoning/trade-offs if non-obvious.
- One logical change per commit — a commit that says "fix bug and refactor unrelated module" should be two commits.
- Commit messages should explain *why*, since the diff already shows *what*: "fix(cart): prevent negative quantity — user could decrement past 0 via rapid clicks" is far more useful later than "fix bug."

## Pull request checklist
- [ ] **Title** summarizes the change the way a commit summary would.
- [ ] **Description** covers: what changed, why, how it was tested, and any follow-up work deliberately deferred (link a tracking issue rather than silently leaving it out).
- [ ] **Scope is focused** — one feature/fix per PR. A PR mixing a refactor with a feature makes both harder to review and harder to revert independently.
- [ ] **Screenshots/recordings** included for any visible UI change.
- [ ] **Tests** added/updated for the behavior change (see `testing-strategy`) — a PR changing behavior with no test change is a review flag, not a rule broken freely.
- [ ] **Self-review first**: read your own diff before requesting review — catches leftover debug code, commented-out blocks, and stray console.logs before a reviewer has to.
- [ ] CI (lint, tests, build) passes before requesting human review — don't use reviewers as a CI substitute.

## Code review — as author
- Keep PRs small enough to review in one sitting (rough guideline: under ~400 lines of diff where possible; split larger work into a stacked sequence of PRs if it's genuinely one feature).
- Respond to every review comment (agree-and-fix, or explain the reasoning if not incorporating the suggestion) — don't silently ignore feedback.
- Don't take review comments personally; treat them as improving the code, not a judgment of the author.

## Code review — as reviewer
- Review for correctness and design first (does this solve the right problem, is the approach sound), then style/nits second — don't bikeshed formatting that a linter should catch automatically.
- Distinguish blocking issues ("this has a bug," "this is a security problem") from suggestions ("consider extracting this," "nit: naming") — label nits explicitly so authors know what's optional.
- Ask questions instead of issuing commands where the reasoning isn't obvious: "What happens if `orderId` is null here?" invites explanation and catches more real issues than "Add a null check."
- Approve once genuinely satisfied — reviewer rubber-stamping ("LGTM" without reading) defeats the purpose, but so does review-as-gatekeeping that blocks on personal style preference not covered by team conventions.

## Merge strategy
- Squash-merge feature branches into `main` by default for a clean, one-commit-per-feature history — unless the team specifically wants to preserve granular commit history (e.g. for bisecting a large, multi-commit feature).
- Delete branches after merge to keep the branch list meaningful.
- Never force-push to `main`/shared branches; force-push is fine on your own not-yet-reviewed feature branch to clean up history before opening a PR.

## Anti-patterns to flag and fix
- Commit messages like "fix," "wip," "asdf," or "final final v2" with no context.
- Giant PRs mixing formatting-only changes with logic changes, making the real diff unreadable.
- Committing directly to `main` bypassing review for anything beyond a trivial, pre-agreed exception (e.g. an emergency hotfix with after-the-fact review).
- Merge commits with unresolved conflict markers or commented-out code left in.
- Force-pushing over a shared branch other people have already pulled.
