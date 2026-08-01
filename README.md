# acadie_sol

The public face of Acadie.sol — the website that renders the directory.

**This repo is the SITE only.** The directory data lives in `acadie_sol_directory`.

## Architecture

```
acadie_sol_directory/  ← DATA (entries, schema, RSS feed)
         ↓ export script writes JSON
acadie_sol/            ← SITE (HTML, CSS, renders the exported data)
         ↓ deploys to
GitHub Pages           ← PUBLIC (https://acadie.sol.site)
```

## Data Source

The directory data is exported from: `github.com/MRLP-Riderverse/acadie-sol-directory`

- Canonical source of truth: `acadie_sol_directory`
- Manual export tool: `acadie_sol_directory/scripts/export_to_site.py`
- Website payload: `acadie_sol/assets/directory-data.json`

## Quick Start

```bash
# Clone both repos
git clone https://github.com/MRLP-Riderverse/acadie.sol.git
git clone https://github.com/MRLP-Riderverse/acadie-sol-directory.git

# Serve locally
python -m http.server 5173
```

## Media and live surfaces

- Owner-controlled LIVE signal: `assets/live.json`
- Public album catalogue: `assets/gallery/albums.json`
- Public photo archive: `photos/`
- Album contract check: `python3 scripts/validate_gallery.py`
- Original/derivative policy: `docs/media-pipeline.md`

Camera originals do **not** belong in this repository. Keep them in the private ExoCortex media library; commit only reviewed public derivatives.

## Channels

| Channel | Purpose | Frequency |
|---------|---------|-----------|
| RSS | The record — releases, signals, briefings | On publish |
| TG | The pulse and private media-intake bridge | As needed |
| Discord | The after-hours conversation layer | Ongoing |
| Signal | Live coordination | As needed |
| LIVE | One owner-controlled point of attention on Home | Rotational |

## Author

MRLP.Acadie.sol — created June 8 2026
