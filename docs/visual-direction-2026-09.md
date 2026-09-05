# Visual direction: a living Acadian place, not a project splash

Status: design-review handoff, not an approved redesign. Reviewed 2026-09-05 against site commit `452b56e`. No production HTML/CSS/JS changes in this pass. Implementation checklist: [visual-overhaul.md](../todo/visual-overhaul.md).

## Decision in one sentence

Keep the authored, playful Acadian identity, but make the useful invitation visually stronger than the project's self-promotion: **recognize → discover something real → connect → optionally support/share**.

This is a working design thesis, not a final public mission statement. The site can communicate one useful invitation without resolving the whole organization's future.

## Intent recovered, with evidence boundaries

Project-relevant QuickThoughts entries, surrounding inbox material, and indexed GBrain pages were consulted. Raw private notes are deliberately not copied into the public repository.

- June 7–8 captured framing: continuity, a cultural signal fire, and helping Acadians find one another; contemporary creation belongs alongside preservation. These include earlier agent/GPT syntheses, not exclusively verbatim owner statements.
- June 18 indexed UX transfer: useful, fun, local, mobile-first; an in-life pause menu; an old ledger or maritime bulletin-board feeling with modern speed. Historical feature wishlists are not current implementation orders.
- August 4 owner-authored rough list: public mission remains to be clarified, community feedback matters, and helping people regain control of their attention is part of the purpose.
- August 12 indexed transfer: the technical infrastructure should support continuity without becoming a prerequisite for belonging. This is interpreted context, not a new public claim.
- August 29 owner-authored note: Acadie.sol's website/brand role and relationship with Riderverse still need clarification. Do not silently recast the cultural public surface as a storefront.
- Current request: investigate feeling, styling, placement and attention; preserve functioning mechanics; hand straightforward implementation to Luna.

Useful distinction: **retention through relevance, not captivity**. A visitor finding a place and leaving to visit/contact it can be success. Longer sessions alone are not the goal. No analytics or tracking added; the existing events/location TODO explicitly defers visitor counters pending privacy decisions.

## What was directly verified

- Local baseline: `main...origin/main`, HEAD `452b56e`, unrelated untracked `todo/weekly-open-mic.md` preserved.
- Local screenshot evidence is preserved under `.hermes/evidence/2026-09-05-astra/` (ignored, same-machine only): desktop Home, mobile Home, browse, search and Photos. These are not shipped public assets or portable clone evidence.
- Live Home screenshots: Chromium at 390×844 and 1280×900. Mobile section bounds: welcome starts at x=0, share at x=390, recent at x=780. Desktop welcome occupies left column; share/recent occupy right column.
- Home currently advertises 65 entries and 0 events. These are observed display values, not a new completeness audit of the directory.
- Live browse exposes actual businesses, artists and places; search arrives intentionally empty. Photos exposes one public album; Extras exposes secondary routes. Search is not broken merely because it begins empty.
- Actual homepage copy is broad positioning, a slogan, counts, merch teaser, sharing/Discord, and one album. There is no visible first-screen named local example on mobile.
- Computed mobile type: project subtitle uses Pokemon GB at 9.92px; entry labels and swipe hint 10.88px; footer 8.96px. The latter three use system text, not Pokemon GB. Do not repeat the earlier blanket pixel-font diagnosis.
- Current `loadHomeData()` has a reproduced selection bug (below). A successful catalogue request does not prove the latest item is rendered.

Re-run during this handoff: `node scripts/check_inline_scripts.mjs` passed (14 HTML files); `python3 scripts/validate_gallery.py` passed (1 album); `python3 scripts/test_photo_derivatives.py` passed (2 tests); `git diff --check` passed. These checks do not cover the reproduced album-selection behavior.

Evidence limits: no visitor study, retention analytics, complete accessibility audit, real iOS keyboard test, or full responsive regression matrix was performed. Screenshots are rendered observations, not proof of user behavior. Extras DOM was read, but its screenshot capture timed out. Earlier Luna checks are historical baseline, not proof of dynamic data correctness. The earlier handoff lives under ignored `.hermes/plans/`; this tracked document is the portable worker reference.

## Diagnosis: why the feeling can be wrong

### 1. The strongest objects ask for belief before offering value

Home's mobile opening is an identity/slogan composition. The next panel asks for sharing or Discord; the content example is third. Desktop gives a substantial upper-right region to a QR code. Those are useful tools, but they serve the project before a newcomer has discovered why it matters.

**Recommendation:** make existing discovery the immediate invitation; show existing public content before sharing. Keep sharing available but subordinate. A QR is useful for cross-device transfer, not a same-phone visitor's primary destination. This is a proposed change to the previously accepted order, not a correction of an accidental layout bug.

### 2. The style has several competing centers of attention

Pixel wordmark, pixel microcopy, ornamental divider, emoji row, black chromatic GIF, gold accents, red merch teaser, and blue/gold pills each carry identity. Together they make nearly every short line an announcement. The heavy black media object can become the emotional center while the real discovery path remains small metadata.

**Recommendation:** keep the wordmark, one ornament, and one expressive media object. Reduce competing display treatments before removing personality. Plain readable utility typography should make the expressive typography feel special again.

### 3. The surface materials do not always agree

Warm flat paper, translucent slate navigation, deep navy/gold pill actions, a black glowing GIF and rounded photo frames coexist. The individual parts are intentional; their relative weight is not consistently ranked.

**Recommendation:** paper/ink is the resting surface, navy is a deliberate action/wayfinding material, gold is the signal accent, red is a sparse emphasis. Do not use the same heavy button treatment for every action. Avoid introducing another font, background texture, gradient or animation to solve hierarchy.

### 4. The content is real but its richness is not evenly visible

Browse contains meaningful local information. Repeated initial placeholders and alphabetic ordering make the first screen feel more like a contact inventory than inhabited culture. The one public album is a branded artwork, not evidence of a broad photography archive.

**Recommendation:** use what is genuinely published; do not fabricate testimonials, events, crowds or apparent activity. Better photography requires authorized source material, not simply a CSS fix. A future editorial selection can demonstrate local life, but is separate from this bounded first pass.

### 5. Small promises can undermine the larger invitation

The prominent zero event count and coming-soon merch label expose absence/future intent. Share metadata currently emphasizes `Inspiré par web3`, which may frame the site as technology-first before someone reaches it.

**Recommendation:** keep counts truthful but avoid using an empty count as the welcome's proof of life. Keep Events reachable through existing navigation. Make merch secondary without deleting its route. Review metadata only after public wording is approved; do not change identity, domain or provenance by inference.

## Recommended first composition: inhabited pause menu

Do not rebuild navigation, search, the exporter or content schemas.

### Mobile

Opening panel reading order:
1. Compact centered wordmark + existing pilot identity.
2. One existing expressive artwork/slogan treatment, less visually heavy than today's black slab.
3. A clearly named browse invitation, using the existing entry-count link rather than adding a duplicate directory button.
4. Quiet deck navigation, with readable labels or another explicit way to identify the destination panels.

Suggested route wording for review: `Meet Acadie →` / `À la rencontre de l’Acadie →`. This is proposed copy, not approved text. It points to `directory.html#browse`, which already works. If the metaphor is too vague, prefer `Explore the directory →` / `Explorer le répertoire →`.

Panel order proposal: **welcome → existing recent album → share/community**. Keep native swiping, no autoplay, no nested carousel. Reorder real DOM, dot targets/indices and localized labels together. Do not just apply CSS `order`.

Keep the first welcome inviting on its own; visitors should not need to discover a swipe gesture to find a useful route. Retain internal vertical scrolling on short screens. Do not globally tighten empty space: preserve the deliberate centering and adjust grouping rather than packing every screen.

### Desktop

Keep the established two-column system. Identity remains left. Put the existing recent-content module at the top right; sharing becomes the lower, quieter utility group. Let the image and title read as one content invitation; avoid a huge title paired with a tiny generic Open button. Change only the existing module, not a new homepage grid of feeds/widgets.

### Alternative, only if the deck still feels wrong

A short native vertical page could make continuation self-evident, but it changes a deliberate interaction choice. Do not build it in parallel by default. First compare the reordered deck with the baseline; ask the owner whether the horizontal pause-menu model still belongs before replacing it.

## Concrete style starting points for Luna

These are prototype constraints, not claims that these exact values are optimal.

- Preserve `--page-bg`, `--ink`, current brand hues and the local Pokemon font for the first composition experiment.
- Restrict Pokemon GB to wordmark and short section titles. Set utility/action copy in the existing system stack. Start primary action text at 16px and secondary text at 14px; essential controls get at least a 44px target. Footer can remain quiet and unchanged initially.
- Use an 8/16/24/32px spacing rhythm for newly touched groups. Do not refactor every existing gap in the repo.
- Reduce GIF shadow/glow first; compare no shadow with one restrained shadow. Keep the actual artwork and explicit dimensions. Do not force an arbitrary crop or replace it with stock cultural imagery.
- Two action levels: one primary navy action; secondary underlined text or quiet outline. Merch must not be the only red/high-salience action while discovery looks like metadata.
- Use gold for ornament/state, not small text on paper. Computed palette `#b57910` on `#f5ede1` has contrast approximately 3.17:1, below 4.5:1 for ordinary small text. Keep this decorative gold; use existing dark ink/link tokens for the count's readable text.
- Desktop unselected nav uses dark ink on translucent blue. Flat-background compositing gives roughly 3.22:1 for ink and 2.90:1 for gold on that blue; these are estimates because backdrop effects can alter pixels. Treat as a measured follow-up, not a certified WCAG failure. Compare a paper/ink navigation surface against the existing glass before changing global tokens.
- Do not expand this experiment into directory card redesign. The project-log pill's prominence and repeated initial placeholders are secondary-route follow-ups.
- Reduced motion must cover animated media, not just CSS dots: CSS animation rules do not stop a GIF. A static derivative/fallback needs explicit implementation and asset verification.

## Confirmed freshness defect: small, separate repair

`index.html` → `loadHomeData()` stores the array returned by `Promise.allSettled()` in `albumResult`, then reads `albumResult.status` and `.value`. Those properties belong to an array element, so the success branch is skipped.

Observed live: catalogue resource loaded; `recentAlbum` remained null. Local Node VM reproduction of the actual function with a clearly synthetic one-public-album fixture returned:

```text
renderRecent received: null
Expected fixture selected: false
```

Minimal fix candidate: destructure `const [albumResult] = await Promise.allSettled([...])`. An in-memory-only version of this one-line change passed three isolated Node VM cases: newest public selection with private exclusion, empty catalogue, and fetch rejection. This does not alter source, establish an approved empty-state design, or replace a committed regression test. Add that test before implementing. Also cover EN/FR hydration. Decide an honest empty-state policy instead of silently treating a hard-coded fallback as current. Do not edit real catalogue data to manufacture a test.

## Attention and return: hypotheses, not promises

- First visit: can a newcomer tell that this is a place to discover Acadian people/places/creation, and choose one useful action without instruction?
- Exploration: does the first swipe reveal value rather than a request to promote the project?
- Return: does genuinely new published work actually appear? Fix freshness before claiming repeat-visit value.
- Connection: can an interested person reach a real entry or album, then share/contact as appropriate?

Use an informal observed walkthrough with a few willing people, including a French-speaking visitor and someone unfamiliar with the project. Ask what they think it is, what they would tap, and what would bring them back. Record confusion, not just compliments. This is qualitative feedback, not a statistically validated retention improvement.

## Economics / handoff decision

Astra's useful contribution here is diagnosing the mismatch between intent, composition and next action. The next work is bounded DOM/CSS/localization plus one small data bug: suitable for Luna. Use Astra again only if the compared renderings still feel wrong or a fundamental identity decision remains unresolved. No measured model cost or performance comparison was conducted.
