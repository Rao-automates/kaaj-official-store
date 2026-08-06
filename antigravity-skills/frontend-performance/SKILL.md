---
name: frontend-performance
description: Use this skill whenever optimizing page load speed, Core Web Vitals (LCP, INP, CLS), bundle size, image loading, or rendering performance for any website or web app. Trigger this before shipping any frontend feature to production, when the user mentions "slow", "performance", "loading time", "bundle size", "lighthouse score", or "optimize", and proactively whenever building image-heavy or JS-heavy pages even if not explicitly asked.
---

# Frontend Performance

## Mission
Ship pages that feel instant: fast first paint, no layout jank, minimal JS shipped to the client, and Core Web Vitals in the "Good" range — because performance is a correctness requirement, not a nice-to-have.

## The three metrics that matter (Core Web Vitals, 2026 thresholds)
- **LCP (Largest Contentful Paint)** ≤ 2.5s — time until the biggest visible element renders.
- **INP (Interaction to Next Paint)** ≤ 200ms — responsiveness to clicks/taps/keys (replaced FID).
- **CLS (Cumulative Layout Shift)** ≤ 0.1 — visual stability; nothing should jump around as content loads.

## LCP checklist
- [ ] The LCP element (usually a hero image or heading) is not lazy-loaded, and its image uses `fetchpriority="high"`.
- [ ] Critical CSS for above-the-fold content is inlined or loaded without render-blocking; non-critical CSS is deferred.
- [ ] Fonts use `font-display: swap` (or `optional`) and are preloaded if custom (`<link rel="preload" as="font">`).
- [ ] Server/API response for the initial data is fast, or the page renders a meaningful skeleton immediately rather than a blank screen waiting on a slow fetch.
- [ ] No render-blocking third-party scripts (analytics, chat widgets) placed before main content — defer or lazy-load them.

## INP checklist
- [ ] Long JS tasks (>50ms) on the main thread are broken up (`requestIdleCallback`, chunked work, or moved to a Web Worker for heavy computation).
- [ ] Event handlers don't do expensive synchronous work (large loops, JSON.parse of huge payloads, layout thrash) directly in the click/input handler.
- [ ] Avoid excessive re-renders on every keystroke in controlled inputs over large lists — debounce or virtualize.
- [ ] Third-party scripts are audited — a single ad/analytics script can dominate INP; load them `async`/`defer` or after first interaction.

## CLS checklist
- [ ] Every image/video has explicit `width`/`height` (or `aspect-ratio` in CSS) so space is reserved before load.
- [ ] Ads, embeds, and dynamically injected banners have reserved space (min-height) — never injected into a zero-height container.
- [ ] Web fonts don't cause a visible reflow (use `size-adjust`/matched fallback fonts, or `font-display: optional` when layout stability outweighs custom-font-on-first-paint).
- [ ] No content is inserted above existing content after initial render without user interaction triggering it.

## Bundle size & code splitting
- Route-based code splitting by default; don't ship the admin dashboard's JS to the marketing homepage.
- Audit bundle composition regularly (`webpack-bundle-analyzer`, `vite-bundle-visualizer`, or the framework's built-in equivalent) — look for accidental full-library imports (`import _ from 'lodash'` instead of `import debounce from 'lodash/debounce'`).
- Tree-shake: prefer ESM libraries, avoid re-exporting entire modules through a barrel file that defeats tree-shaking.
- Lazy-load below-the-fold, rarely-used, or interaction-gated UI (modals, rich text editors, charting libraries) with dynamic `import()`.
- Check for duplicate dependencies (two versions of the same library) — a common silent bundle-size killer in monorepos.

## Image & asset optimization
- Serve modern formats (AVIF/WebP) with fallback, via `<picture>` or the framework's image component (Next/Image, Nuxt Image, etc.).
- Always set explicit dimensions and use responsive `srcset`/`sizes` rather than one oversized asset scaled down by CSS/browser.
- Lazy-load offscreen images (`loading="lazy"`) — except the LCP image itself, which should load eagerly.
- Compress and right-size assets at build time, not by shipping source-quality images to production.

## Rendering strategy
- Choose the rendering mode per page, not globally: static generation (SSG) for content that rarely changes, server-side rendering (SSR) for personalized/dynamic-but-SEO-relevant pages, client-side rendering only for behind-auth, non-SEO-relevant app views.
- Stream HTML (React Server Components streaming, `<Suspense>` boundaries, or equivalent) so users see content progressively instead of waiting on the slowest data dependency.
- Cache aggressively at the edge/CDN for anything not user-specific; use stale-while-revalidate patterns for semi-fresh data.

## Measuring (don't guess — verify)
- Lab data: Lighthouse / PageSpeed Insights / WebPageTest for a controlled, repeatable baseline.
- Field data: Chrome UX Report (CrUX) or Real User Monitoring (RUM) — lab scores can look great while real users on slow networks/devices suffer.
- Always test on throttled network + mid-tier device profile, not just a fast dev machine on fiber.

## Anti-patterns to flag and fix
- Loading an entire icon library instead of tree-shaken individual icon imports.
- Client-side fetching data that could have been fetched server-side and inlined into the initial HTML.
- Un-debounced search/filter inputs re-rendering large lists on every keystroke.
- Blocking the main thread with synchronous heavy computation instead of deferring or offloading to a worker.
- Shipping polyfills for browsers the analytics data shows nobody uses.
