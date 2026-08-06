---
name: accessibility-a11y
description: Use this skill whenever writing or reviewing any HTML, UI component, form, or interactive element — accessibility is a default requirement, not an opt-in. Trigger this proactively on every frontend task, and especially when the user mentions "accessibility", "a11y", "WCAG", "screen reader", "keyboard navigation", or when building forms, modals, menus, or any custom interactive widget.
---

# Accessibility (a11y)

## Mission
Every UI built should be usable by keyboard-only users, screen reader users, and people with low vision or motor impairments by default — not retrofitted after a complaint or audit.

## The non-negotiable baseline (apply to everything, always)
1. **Semantic HTML first.** Use `<button>` for actions, `<a href>` for navigation, `<nav>`, `<main>`, `<header>`, `<footer>`, `<h1>`-`<h6>` in real hierarchical order. A `<div onClick>` is not a button — it gets none of the free keyboard support, focus handling, or screen-reader semantics a real `<button>` gets.
2. **Every interactive element is keyboard operable.** Tab reaches it, Enter/Space activates it, Escape closes overlays it opened, arrow keys navigate composite widgets (menus, tabs, listboxes) per the [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) patterns.
3. **Focus is visible and managed.** Never remove `outline` without a clear, equally visible replacement (`:focus-visible` styling). When a modal opens, focus moves into it and is trapped there; when it closes, focus returns to the trigger element.
4. **Every image/icon/control has a text alternative.** Meaningful images: descriptive `alt`. Decorative images: `alt=""`. Icon-only buttons: `aria-label`. Form inputs: an associated `<label>` (via `for`/`id` or wrapping) — placeholder text is never a substitute for a label.
5. **Color is never the only signal.** Errors, required fields, statuses need an icon, text, or pattern in addition to color, for colorblind users and screen reader users alike.
6. **Contrast meets WCAG AA at minimum:** 4.5:1 for normal text, 3:1 for large text (≥18pt/24px or 14pt/18.5px bold) and UI component boundaries.

## Forms checklist
- [ ] Every input has a programmatically associated `<label>`.
- [ ] Required fields are marked both visually and with `aria-required="true"` or the `required` attribute.
- [ ] Errors are announced: associate the error message with the input via `aria-describedby`, and set `aria-invalid="true"` on the field.
- [ ] Error messages describe how to fix the problem ("Enter a valid email like name@example.com"), not just "Invalid input."
- [ ] Grouped related fields (e.g. radio button sets, address fields) use `<fieldset>` + `<legend>`.
- [ ] Submitting doesn't rely on color/shape alone to show a disabled state — also set `aria-disabled`/`disabled`.

## Custom widgets (when a native element truly can't do the job)
Use the ARIA Authoring Practices pattern for the widget type (dialog, tabs, menu, combobox, accordion, tooltip) rather than inventing custom keyboard behavior. At minimum:
- [ ] Correct `role` for the widget (`dialog`, `tablist`/`tab`/`tabpanel`, `menu`/`menuitem`, etc.).
- [ ] `aria-expanded`, `aria-selected`, `aria-checked` etc. kept in sync with actual visual state.
- [ ] Modal dialogs: `role="dialog"` + `aria-modal="true"`, labeled via `aria-labelledby`, focus trapped, `Escape` closes, background is `inert`/`aria-hidden` while open.
- [ ] Dynamic content updates (toasts, live validation, loading states) use `aria-live="polite"` (or `"assertive"` only for urgent/blocking errors) so screen readers announce them without the user needing to be focused there.

## Semantic structure checklist
- [ ] One `<h1>` per page; heading levels don't skip (no `<h2>` straight to `<h4>`).
- [ ] Landmarks used correctly: one `<main>`, `<nav>` for navigation blocks, `<header>`/`<footer>` for page or section chrome.
- [ ] Lists (`<ul>`/`<ol>`) used for actual list content, not just for CSS convenience on non-list content.
- [ ] Tables used for tabular data only, with `<th scope="col|row">` — never for layout.
- [ ] Page `<title>` and `lang` attribute are set and accurate; each route/page has a distinct, descriptive title.

## Testing approach
- Automated: run axe-core / Lighthouse accessibility audit as a baseline — it catches maybe 30-40% of real issues (missing labels, contrast, missing alt text). Necessary, not sufficient.
- Manual keyboard pass: unplug the mouse, Tab through the entire page/flow, confirm every action is reachable and focus order is logical.
- Screen reader spot-check: VoiceOver (Mac/iOS), NVDA (Windows, free), or TalkBack (Android) on the critical flows (checkout, sign-up, primary CTA) at minimum.
- Zoom to 200% and check nothing breaks or gets clipped (WCAG reflow requirement).

## Anti-patterns to flag and fix
- `<div>`/`<span>` with `onClick` used as a button (no keyboard support, no semantics).
- `outline: none` with no `:focus-visible` replacement.
- Placeholder used as the only label.
- `aria-label` slapped on everything indiscriminately, overriding perfectly good native semantics ("aria smell").
- Auto-playing carousels/videos with no pause control.
- Content that only appears on `:hover` with no keyboard/touch equivalent.
- Skip-to-content link missing on pages with heavy navigation before the main content.
