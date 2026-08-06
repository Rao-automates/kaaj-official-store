---
name: testing-strategy
description: Use this skill whenever writing tests, setting up a testing framework, deciding what to test, or reviewing test coverage for any frontend or backend code. Trigger this whenever the user asks to "add tests", "set up testing", "write unit tests", "add e2e tests", or after implementing any non-trivial feature — tests should be proposed alongside the implementation, not only when explicitly requested.
---

# Testing Strategy

## Mission
Build a test suite that catches real regressions with fast feedback, follows the test pyramid instead of inverting it, and tests behavior/contracts rather than implementation details that break on every refactor.

## The test pyramid (proportion, not absolute rule)
```
        /\
       /e2e\      few — slow, expensive, highest confidence for critical flows
      /------\
     /integr. \   more — test how pieces work together (API + DB, component + store)
    /----------\
   /    unit    \ most — fast, isolated, test one function/component's logic
  /--------------\
```
Most tests should be unit tests (fast, cheap, pinpoint failures). A shrinking number should be integration tests. Only the most critical user journeys (signup, checkout, core workflow) need full e2e coverage — e2e suites that try to cover everything become slow, flaky, and get skipped/ignored.

## What to unit test
- Pure functions: business logic, calculations, formatters, validators — these are the highest-value, cheapest tests to write.
- Component logic in isolation: given these props/state, does it render the right thing / call the right callback? Test behavior (what the user sees/can do), not internals (state variable names, private methods).
- Edge cases deliberately: empty input, null/undefined, boundary values (0, negative, max), malformed input — not just the happy path.

## What to integration test
- API endpoint + real (test) database: does the full request→handler→DB→response cycle work, including validation and error responses?
- Component + real store/router: does a page correctly fetch, render, and update state together, not just each piece mocked in isolation?
- Third-party integration boundaries with a test double (mock server like MSW, or a sandbox environment) rather than hitting real external services in the test suite.

## What to e2e test
- The critical revenue/core-value paths only: sign-up, login, checkout, the app's primary workflow. Run against a real (staging) browser via Playwright/Cypress.
- Keep the e2e suite small and fast enough to run on every PR (minutes, not tens of minutes) — a slow e2e suite gets disabled, which is worse than not having one.

## Test quality checklist
- [ ] Test names describe behavior and expected outcome ("returns 400 when email is missing", not "test1" or "it works").
- [ ] Tests are independent — no test depends on another test's side effects or run order.
- [ ] Arrange-Act-Assert (or Given-When-Then) structure, one logical assertion focus per test.
- [ ] Mocks/stubs are used at true external boundaries (network, time, randomness, filesystem) — not to mock the very logic being tested, which produces a test that always passes and proves nothing.
- [ ] Tests fail for the right reason — deliberately break the implementation once while writing a test to confirm it actually catches the bug (mutation-testing mindset even without a formal tool).
- [ ] Flaky tests are fixed or deleted immediately — a flaky test that's tolerated trains the team to ignore red CI.

## TDD (when appropriate — offer, don't force)
Red → Green → Refactor: write a failing test for the next small behavior, write the minimum code to pass it, then refactor with the safety net in place. Best fit for: well-understood business logic, bug fixes (write a failing test reproducing the bug first), library/API code with a clear contract. Less essential for: exploratory UI work where the design is still changing rapidly — write tests once the shape stabilizes, but don't skip them entirely.

## Coverage
- Use coverage (`istanbul`/`c8`, `pytest-cov`, etc.) as a signal to find untested areas, not as a target to game. 100% coverage with weak assertions is worse than 80% coverage with meaningful ones.
- Prioritize coverage on business-critical and high-change-frequency code over auto-generated boilerplate/config.

## CI integration
- Tests run automatically on every PR/push; PRs can't merge with failing tests or (ideally) with coverage dropping below an agreed threshold on changed files.
- Fast unit/integration tests run on every commit; slower e2e suites can run on merge to main or on a schedule if PR-time budget is tight — but never skip them entirely.

## Anti-patterns to flag and fix
- Testing implementation details (internal state, private function calls) instead of observable behavior — causes tests to break on harmless refactors.
- Snapshot tests with no real assertions, rubber-stamped/updated blindly whenever they fail ("`--updateSnapshot` reflex") without reading the diff.
- An inverted pyramid: heavy e2e suite, few unit tests — slow CI, flaky, hard to pinpoint failures.
- Tests that mock so much of the system that they only verify the mocks were called, not that the feature works.
- Skipped/`.only`'d tests left committed to the codebase.
