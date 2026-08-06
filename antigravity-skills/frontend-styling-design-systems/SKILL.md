---
name: frontend-styling-design-systems
description: Use this skill whenever writing CSS, building UI visuals, styling components, working with Tailwind/CSS-in-JS/design tokens, building a design system, or making layout/responsive/typography decisions. Trigger on requests like "make this look good", "style this page", "build a component library", "make it responsive", "add dark mode", or any visual polish request — even if the user doesn't say "CSS" or "design" explicitly.
---

# Frontend Styling & Design Systems

## Mission
Produce interfaces that look intentionally designed, not templated — consistent, responsive, accessible, and built on a token system so changes propagate instead of requiring hunt-and-replace.

## Core principles
1. **Tokens before values.** Never hardcode a hex color, an arbitrary pixel spacing, or a one-off font size in a component. Define a scale once (colors, spacing, radius, shadow, type) and reference it everywhere. This is what makes a "redesign the primary color" request a one-line change instead of a grep-and-replace.
2. **Design in constraints, not pixels.** Use a spacing scale (4/8px base grid: 4, 8, 12, 16, 24, 32, 48, 64...) and a type scale (e.g. a modular scale like 12/14/16/20/24/32/40/48px) rather than freeform arbitrary values.
3. **Mobile-first, fluid, not just "responsive breakpoints."** Build the small-screen layout first, then enhance upward. Prefer fluid techniques (`clamp()`, `grid-template-columns: repeat(auto-fit, minmax(...))`, flexbox wrap) over rigid pixel-perfect breakpoints wherever content allows it.
4. **Avoid generic AI-template aesthetics.** Don't default to: centered hero + 3-column feature grid + generic blue/purple gradient + Inter font + emoji icons, unless that's genuinely the right fit. Make an intentional typographic and color choice suited to the brand/context, and justify it briefly.
5. **Consistency over cleverness.** A component's states (default, hover, active, focus, disabled, loading, error) should follow the same visual language as every other interactive element in the app.

## Design token starter (CSS custom properties — adapt to Tailwind config / theme object as needed)
```css
:root {
  /* Color — use a real scale, not just brand + gray */
  --color-primary-500: #...;
  --color-primary-600: #...; /* hover/active */
  --color-neutral-50: #...;  /* backgrounds */
  --color-neutral-900: #...; /* text */
  --color-danger-500: #...;
  --color-success-500: #...;

  /* Spacing (4px base) */
  --space-1: 0.25rem; --space-2: 0.5rem; --space-3: 0.75rem;
  --space-4: 1rem; --space-6: 1.5rem; --space-8: 2rem; --space-12: 3rem;

  /* Radius */
  --radius-sm: 0.25rem; --radius-md: 0.5rem; --radius-lg: 1rem; --radius-full: 9999px;

  /* Type scale */
  --text-xs: 0.75rem; --text-sm: 0.875rem; --text-base: 1rem;
  --text-lg: 1.125rem; --text-xl: 1.25rem; --text-2xl: 1.5rem; --text-3xl: 2rem;

  /* Elevation */
  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 12px rgb(0 0 0 / 0.10);
}
```
For Tailwind projects, put the equivalent scale in `tailwind.config.js` under `theme.extend` and use utility classes — never inline arbitrary values like `mt-[13px]` except as a rare, justified escape hatch.

## Layout patterns
- **Flexbox** for one-dimensional alignment (nav bars, button groups, form rows).
- **CSS Grid** for two-dimensional layout (page shells, card grids, dashboards). Prefer `grid-template-areas` for named regions over deeply nested flex wrappers.
- **Container queries** (`@container`) over media queries when a component's layout should respond to its parent's size, not the viewport — e.g. a card that's 2-column in a wide sidebar and 1-column in a narrow one.
- Use `gap` for spacing between flex/grid children instead of margins on children — it composes better and avoids margin-collapsing bugs.

## Responsive checklist
- [ ] Tested/considered at 320px (small phone), 768px (tablet), 1024px+ (desktop) at minimum.
- [ ] Text remains readable without horizontal scroll at any width.
- [ ] Tap targets are ≥44x44px on touch layouts.
- [ ] Images use `srcset`/`sizes` or a responsive image component, not one fixed large asset shrunk via CSS.
- [ ] Fluid type/spacing via `clamp(min, preferred, max)` where it reduces breakpoint sprawl.

## Component states checklist (every interactive element)
- [ ] Default, hover, focus-visible, active/pressed, disabled, and loading states are all designed — not just default+hover.
- [ ] Focus state is visible and consistent (don't remove `outline` without a real replacement — see `accessibility-a11y`).
- [ ] Motion/transition on state change is subtle (150-250ms, ease-out) — not instant snaps, not sluggish.

## Dark mode (when relevant)
- Drive it from tokens (swap the CSS variable values under `[data-theme="dark"]` or `.dark`), never by duplicating component styles.
- Check contrast in both themes independently — a color pairing that passes in light mode can fail in dark mode.

## Anti-patterns to flag and fix
- Inline styles / magic numbers scattered through components instead of tokens.
- Deeply nested divs for layout that Grid/Flexbox could flatten.
- `!important` as a first resort instead of fixing specificity/source order.
- Fixed pixel widths on containers that should be fluid (`width: 375px` instead of `max-width` + fluid).
- Icon-only buttons with no accessible label (pair with `accessibility-a11y`).
- Shipping only a desktop design and "hoping" mobile works — mobile-first from the start.
