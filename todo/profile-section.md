# Profile subset handoff

## Scope

- Directory source: `acadie_sol_directory/entries/mrlp-acadie-sol/`
- Export contract: `profile: true` becomes `item.profile === true`
- Website routes: `/profile/` and `/profile/mrlp/`
- Extras → Community points to `/profile/`

## Completed

- [x] Opt MRLP's existing directory entry into the public profile subset.
- [x] Add the optional `profile` schema field and exporter output.
- [x] Add a profile cascade page driven by exported JSON.
- [x] Add the MRLP nested static profile route.
- [x] Keep profile source copy in the directory repo; keep HTML/CSS in the site repo.

## Verification still expected

- [x] Run directory exporter and tests.
- [x] Serve the site from its repository root and check `/profile/` and `/profile/mrlp/`.
- [x] Check EN/FR switching, light/dark shell, and direct nested-route loading.
- [x] Commit the source and site changes separately with exact-path staging.