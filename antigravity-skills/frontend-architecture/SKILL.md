---
name: frontend-architecture
description: Use this skill whenever building, structuring, or refactoring any frontend application (React, Vue, Next.js, Svelte, or vanilla JS) — component design, folder structure, state management choices, data fetching patterns, and routing. Trigger this any time the user asks to "build a page", "add a component", "structure the app", "set up the frontend", or scaffold a new UI feature, even if they don't mention architecture explicitly. This is the default lens for any non-trivial frontend work.
---

# Frontend Architecture

## Mission
Ship frontend code that a senior engineer would approve in code review on the first pass: predictable structure, clear data flow, and components that are easy to delete, not just easy to add to.

## Core principles
1. **Colocate by feature, not by file type.** Prefer `features/checkout/{Checkout.tsx, useCheckout.ts, checkout.api.ts, checkout.test.tsx}` over global `components/`, `hooks/`, `services/` folders that force jumping across the repo to understand one feature.
2. **Components have one reason to change.** If a component both fetches data, manages complex local state, AND renders a large UI tree, split it: a container/hook for data + logic, a presentational component for markup. Presentational components should be prop-driven and easy to storybook/test in isolation.
3. **Lift state only as far as it needs to go.** Default to local state (`useState`/`ref`). Move to a shared store (Zustand, Redux Toolkit, Pinia, Context) only when 2+ unrelated components need the same state. Don't reach for global state management on day one of a project.
4. **Server state is not client state.** Data fetched from an API (lists, records, anything that can go stale) belongs in a data-fetching library (TanStack Query, SWR, RTK Query) — not manually copied into `useState` + `useEffect`. This eliminates whole classes of bugs: stale caches, race conditions, duplicate fetches, manual loading/error flags.
5. **Props over prop-drilling past 2 levels.** If a prop is threaded through 3+ layers untouched, that's a signal for context, composition (children props), or a store — not a rule to blindly apply everywhere.

## Default project structure (adapt names to the framework)
```
src/
  app/                # routing, layout shells, providers (framework-specific: app router, main.tsx)
  features/
    <feature-name>/
      components/      # feature-local UI
      hooks/           # feature-local logic
      api.ts           # feature-local data-fetching functions
      types.ts
      <feature>.test.tsx
  components/ui/       # truly generic, reusable primitives (Button, Modal, Input) — design-system level only
  lib/                 # framework-agnostic utilities, api client instance, formatting helpers
  hooks/               # genuinely cross-feature hooks only (useDebounce, useMediaQuery)
  types/               # shared/global types
```
If the app is small (a handful of pages), don't over-engineer this — a flatter structure is fine. Scale structure to actual size, not projected size.

## Component design checklist
- [ ] Name describes what it renders, not what it does internally (`OrderSummaryCard`, not `Card2`).
- [ ] Props typed explicitly (TypeScript interfaces, PropTypes, or JSDoc if plain JS) — no implicit `any`.
- [ ] No prop is optional "just in case" — every optional prop has a real default or a real absent-state.
- [ ] Side effects (fetches, subscriptions, timers) live in hooks, not inline in JSX-adjacent code.
- [ ] Loading, error, and empty states are handled explicitly — never assume the happy path is the only path.
- [ ] Lists render with a stable, unique `key` (never array index if the list can reorder/filter).

## Data fetching pattern (framework-agnostic shape)
```ts
// api.ts — pure function, no React
export async function getOrder(id: string): Promise<Order> {
  const res = await apiClient.get(`/orders/${id}`);
  return res.data;
}

// useOrder.ts — the only place React touches the fetch
export function useOrder(id: string) {
  return useQuery({ queryKey: ['order', id], queryFn: () => getOrder(id) });
}
```
Why this shape: `api.ts` is testable without mocking React, and swapping the fetching library later only touches one file.

## State management decision guide
| Situation | Reach for |
|---|---|
| Value used by one component/subtree | `useState` / local `ref` |
| Value derived from other state | computed value, not duplicated state |
| Server data (list, record, anything cacheable) | TanStack Query / SWR / RTK Query |
| Truly global UI state (theme, auth session, modal-open) | Context (rarely-changing) or lightweight store (Zustand/Pinia) |
| Complex, interdependent state transitions | `useReducer` or a state machine (XState) — not a pile of booleans |

Red flag to call out to the user: more than ~5 `useState` calls tracking related, interdependent values in one component — that's almost always a `useReducer` or state machine in disguise.

## Routing & code splitting
- Route-level code splitting by default (`React.lazy` + `Suspense`, dynamic `import()`, or framework file-based routing) — don't ship the whole app in one bundle.
- Guard routes (auth-required pages) at the routing layer, not inside every page component.
- Keep route params validated/typed at the boundary — don't trust `useParams()` output blindly downstream.

## Anti-patterns to flag and fix
- Fetching the same data in multiple sibling components instead of lifting the query or sharing a cache key.
- Business logic (pricing math, validation rules) embedded in JSX — extract to plain, unit-testable functions.
- Using `useEffect` to derive state from props (`useEffect(() => setX(propY), [propY])`) — compute it directly during render instead.
- God components over ~200-300 lines mixing layout, data, and business logic — split by responsibility.
- Passing entire objects as props when only 2 fields are used — narrows the component's contract and causes needless re-renders.

## When wiring this up in Antigravity
Pair this skill with `frontend-styling-design-systems` for visual work, `accessibility-a11y` for anything user-facing, and `frontend-performance` before shipping to production.
