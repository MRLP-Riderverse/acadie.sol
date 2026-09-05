# Acadie.sol worker entry point

## Read first
- `README.md` — source/site boundary and local serving.
- `todo/README.md` — durable project-work index.
- `docs/visual-direction-2026-09.md` and `todo/visual-overhaul.md` — current visual review and proposed next pass. Recommendations are not owner-approved public copy.

## Boundaries
- This repository renders public data exported from `acadie_sol_directory`; do not hand-edit generated payloads for a styling task.
- Preserve existing menu/search mechanics unless explicitly included in scope. Shared navigation and theme belong in `assets/site-shell.*` / `assets/site-colors.css`.
- New static copy must have EN/FR hydration; test dynamic content after language changes too.
- Keep private notes, raw inbox excerpts, personal circumstances, camera originals and credentials outside this public repository. Public worker docs should contain only operational project synthesis.
- Preserve unrelated untracked files. Stage exact paths; no broad add, cleanup or ignore changes.

## Verification and handoff
- Serve this repository root locally (`python3 -m http.server 5173`). Confirm the serving root before diagnosing missing assets.
- Run `node scripts/check_inline_scripts.mjs`, `python3 scripts/validate_gallery.py`, `python3 scripts/test_photo_derivatives.py`, relevant behavior tests and `git diff --check`.
- Syntax success is not behavior proof. Verify successful and failed fetch states, actual rendered latest content, language changes, responsive layouts and shared-menu interaction.
- Use uniquely named screenshot files; capture helpers may overwrite a common `shot.png`. Separate observed layout from inferred visitor behavior and mark untested matrices honestly.
- Update the matching `todo/` checklist with completed versus pending evidence. `PROGRESS.md` contains historical search experiments, not a current layout specification.
- Obtain visual approval before final design commit unless the current request explicitly authorizes that design. Documentation-only handoff commits may be made when requested. A commit request is not automatic deployment approval.
- Keep checkpoints reversible; record commit and verification results in the handoff. After an authorized push, read back the deployed target before claiming success.
