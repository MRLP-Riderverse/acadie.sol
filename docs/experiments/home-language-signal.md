# Homepage language signal experiment

Status: implemented locally; verification and owner review recorded in the commit handoff.

## Intent

The homepage question line (`What if we tried something different?`) is an isolated visual experiment. It alternates between authored English and French copies every five seconds, with a brief VHS-style jitter during the handoff. The rest of the homepage and the global EN/FR control remain unchanged.

The Chiac Bodies text stays static.

## Implementation boundary

- Semantic HTML contains both translations with `lang="en"` and `lang="fr"`.
- CSS reserves one text box so the longer French line does not shift the card.
- The merch teaser uses the contrasting replacement treatment: centered, same slot, one copy visible at a time.
- Small inline JavaScript owns only this line's timer and visibility state.
- `prefers-reduced-motion: reduce` pins the line to English and disables the jitter.
- Hidden tabs do not advance the signal.
- The effect uses HTML/CSS rather than a GIF, canvas, or additional asset.

## Review notes

- The effect is intentionally slow: a five-second hold followed by a short transition.
- The animation is decorative; it does not use `aria-live`, so screen readers are not repeatedly interrupted.
- This is a bounded homepage pilot, not a site-wide replacement of language infrastructure.

## Verification target

Check at mobile/PWA width and desktop width that:

1. English is visible initially.
2. French appears after approximately five seconds.
3. The transition produces a short, restrained jitter without layout shift.
4. The global language control does not reset or own this line.
5. Reduced-motion mode leaves one stable readable line.
