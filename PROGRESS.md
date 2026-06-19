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

## Next Up
- [ ] Mobile test: verify scroll hide/show feels right with soft keyboard
- [ ] Dark mode: check controls contrast against dark background when fixed/visible
- [ ] Desktop: confirm fixed controls don't feel oversized on wider viewports
- [ ] Consider: do result cards need any visual differentiation when scrolling past hidden chrome?
