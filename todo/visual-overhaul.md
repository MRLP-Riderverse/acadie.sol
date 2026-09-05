# Visual overhaul — worker checklist

Status: review complete; implementation pending owner selection. Recommended worker: Luna. No redesign or deployment has been performed. Design rationale and evidence: [visual direction](../docs/visual-direction-2026-09.md).

## Completed groundwork
- [x] Read project-relevant owner notes and indexed GBrain intentions; keep private raw material out of this repository.
- [x] Review live Home on phone/desktop plus browse/search/photos/Extras surfaces.
- [x] Reproduce homepage album-selection defect with an isolated fixture.
- [x] Specify a bounded composition/style pass and verification gates.

## V0 — Small correctness repair (separate commit)
- [ ] Add a Node test around actual `index.html` `loadHomeData()` (VM harness or a small testable extraction; no dependencies required). First reproduce that a successful public-album fixture results in null.
- [ ] Destructure the settled result instead of treating the array as one result.
- [ ] Test newest-public selection, nonpublic exclusion, rejected fetch and empty manifest. Preserve safe same-origin links.
- [ ] Browser-test a fixture with a different album title/cover and verify EN/FR updates. Do not modify the real album catalogue for test data.
- [ ] Review honest empty/failure presentation; avoid portraying a missing/deleted fallback album as current.

## V1 — One local visual candidate, not a site rewrite
- [ ] Owner gate: approve/revise the proposed value-before-sharing direction and any new visible wording. This checklist is not copy approval.
- [ ] Record a baseline branch/commit and uniquely named screenshots. Leave unrelated `todo/weekly-open-mic.md` and local media untouched.
- [ ] In `index.html`, promote the existing count/browse anchor to a readable invitation; do not add a duplicate directory route.
- [ ] Reorder the existing sections welcome → recent → share; update DOM, dot `data-section`, `aria-controls`, labels and `renderStaticCopy()` EN/FR wiring together.
- [ ] Desktop: retain identity left, recent upper-right, quieter share lower-right. Do not change the shared menu route model.
- [ ] Limit Pokemon GB to identity/short headings; start essential utility text at 14–16px; maintain 16px inputs and 44px action targets.
- [ ] Reduce GIF shadow/glow, subordinate merch, and distinguish primary from secondary action treatments. Preserve artwork, attribution and existing destinations.
- [ ] Keep original palette initially; make count/link text readable rather than changing decorative gold globally.
- [ ] Supply before/after mobile and desktop screenshots for owner review. If rejected, revert this isolated candidate rather than layering more overrides.

## V2 — After V1 approval only
- [ ] Assess desktop nav contrast against its actual composited backdrop; compare paper/ink chrome with current glass. Changes belong in shared shell assets, not page-local patches.
- [ ] Implement a verified static-media fallback for reduced-motion/data-sensitive use; do not assume CSS disables GIF motion.
- [ ] Review social metadata positioning with owner-approved copy (current metadata leads with web3 inspiration).
- [ ] Consider quieter project-log treatment on directory; preserve provenance access.
- [ ] Consider real, authorized local imagery/editorial selection as a content pass, not invented assets or fake activity.
- [ ] Distill repeated visual tokens only after the chosen composition proves useful.

## Required implementation acceptance gates
- [ ] Run `node scripts/check_inline_scripts.mjs`, `python3 scripts/validate_gallery.py`, `python3 scripts/test_photo_derivatives.py`, and new homepage behavior tests.
- [ ] `git diff --check`; no generated JSON/exporter/calendar churn.
- [ ] Browser matrix: 320×568, 390×844, 430×932, 820×1180, 900×900, 1280×900; EN/FR and light/dark. Explicitly record any untested combinations.
- [ ] First-screen useful action is visible at normal phone size; final CTA remains reachable on short screens and enlarged text.
- [ ] Real dot clicks/native scrolling select the matching panel; desktop shows all sections; no nested carousel/autoplay.
- [ ] Keyboard menu opening, focus trap, Escape/return focus, no hidden overlay hit interception; no menu overlap with final actions.
- [ ] No runtime errors; image natural dimensions and URLs succeed; rejected data fetch has an honest usable state.
- [ ] Human visual approval before final design commit; stage exact paths. Push only if separately authorized, then verify deployed SHA and changed content/assets.

## Retention follow-up (not an implementation prerequisite)
- [ ] Observe willing newcomers choosing a first action without coaching; include FR and unfamiliar visitors.
- [ ] Ask what they would return for; do not equate longer visits with benefit.
- [ ] Keep analytics/visitor counters deferred under the existing privacy decision gate.
