# Acadie.sol — Project Progress

## 2025-06-19 · Search Page Redesign

**Scope:** `search.html` — first-class finding surface

### What changed
- **Clean entry surface** — fresh page render shows zero cards, no marketing copy, no instructional paragraph, no visible suggestion/chip row. Placeholder is just `?`.
- **Fixed low chrome** — search bar + action pills (`View All`, `Filters`) are now fixed-position just above the dock (~8px gap), not centered in the page. Finger-zone friendly on mobile.
- **Safari-style scroll hide/show** — search controls tuck away on downward scroll (slide down + fade out), restore on upward scroll or input focus. Filter menu open blocks hiding.
- **Font sizing tightened** — search input reduced ~50% (`clamp(1rem, 3.4vw, 1.15rem)`), button/pill text reduced ~10% (`.79rem`). Input stays ≥16px to avoid iOS auto-zoom.
- **No page-specific background** — `background: var(--page-bg)` only. Stripped the old blue/gold radial gradient.
- **Transparent underlined input** — no pill/cage styling, just a bottom-border input line. Focus turns the underline gold.
- **Filters collapsed** — chips hidden behind a `Filters` summary pill; expands on tap. Active filter label replaces the summary text.
- **hasIntent gate** — `render()` checks `Boolean(query) || state.filter !== 'all'` before showing any results or count text.
- **Bilingual copy updated** — terse empty/no-match states, minimal placeholder (`?` in both EN/FR).

### Commit
`b55b7b1` — `feat(search): clean entry surface, fixed low chrome, Safari-style scroll hide`

## 2025-06-19 · Search Page Redesign (continued)

**Scope:** `search.html` — search UX polish round 2

### What changed
- **Flash-card search chrome** — search controls now have `var(--page-bg)` background, subtle top border, and soft shadow. Results scroll behind the bar cleanly — gives a parallax/layered feel.
- **Dock hides when keyboard opens** — visual-viewport detection toggles `keyboard-open` class on body. Dock slides away (opacity + translate), search chrome repositions to just above the bottom edge. Only the search bar stacks above the keyboard.
- **Gap doubled** — search chrome ↔ dock gap now ~14px (was ~8px).
- **Divider lines instead of container cards** — results separated by thin `border-bottom` dividers, no cards/borders/rounded boxes. More elegant for search.
- **Bottom-up results** — `flex-direction: column-reverse` so the first/best result sits lowest, nearest the user's thumb. Single-result queries appear right above the search chrome.
- **Enter key dismisses keyboard** — `keydown` listener on the search input blurs on Enter.
- **Scroll dismisses keyboard** — scrolling results auto-blurs the input so the keyboard drops, matching Safari URL bar feel.
- **Rounded pill search chrome** — search controls now fully rounded (`border-radius: 18px`) with a thin black border (`#000 32%`) for a pill-like appearance.
- **Filter menu centered above** — filter options now appear centered horizontally above the search field (not offset) and positioned above the search controls for better thumb reach.

### Commit
`20fcbfc` — `fix(search): focus-keyboard loop, flash-card styling`

## 2025-06-20 · Search Page Redesign (final polish)

**Scope:** `search.html` — resolve remaining keyboard/focus conflicts and polishing

### What changed
- **Focus-scroll bug fixed** — removed erroneous scroll-to-input behavior on focus by ensuring the search input is truly fixed-bottom and eliminating layout shifts from redundant focus calls.
- **Keyboard conflict eliminated** — debounced visual-viewport listener, removed `visualViewport.scroll` listener, and prevented forced re-focus after filter selection. Keyboard now stays open for typing, dismisses only on Enter or deliberate downward scroll.
- **Filter menu placement refined** — fixed-position filter menu now appears 16px above the search controls (adjusted bottom) and retains full width, ensuring it never overlaps the input or results.
- **Visual polishing** — search glyph size adjusted to 1rem for better visual weight; result divider opacity tuned for subtle separation.

### Commit
`[upcoming]` — `fix(search): focus-scroll, keyboard stability, filter placement`

## Next Up
- [ ] Mobile test: verify scroll hide/show feels right with soft keyboard
- [ ] Dark mode: check controls contrast against dark background when fixed/visible
- [ ] Desktop: confirm fixed controls don't feel oversized on wider viewports
- [ ] Consider: do result cards need any visual differentiation when scrolling past hidden chrome?