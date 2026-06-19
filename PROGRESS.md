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

### Commit
`79712f7` — `feat(search): flash-card chrome, divider results, bottom-up, keyboard handling`

## Next Up
- [ ] Mobile test: verify scroll hide/show feels right with soft keyboard
- [ ] Dark mode: check controls contrast against dark background when fixed/visible
- [ ] Desktop: confirm fixed controls don't feel oversized on wider viewports
- [ ] Consider: do result cards need any visual differentiation when scrolling past hidden chrome?
