# acadie_sol

The public face of Acadie.sol — the website that renders the directory.

**This repo is the SITE only.** The directory data lives in `acadie_sol_directory`.

## Architecture

```
acadie_sol_directory/  ← DATA (entries, schema, RSS feed)
         ↓ export script writes JSON
acadie_sol/            ← SITE (HTML, CSS, renders the exported data)
         ↓ deploys to
GitHub Pages           ← PUBLIC (acadie.sol)
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

## Channels

| Channel | Purpose | Frequency |
|---------|---------|-----------|
| RSS | The record — releases, signals, briefings | On publish |
| TG | The pulse — announcements, low noise | 1-2/week |
| Discord | The conversation — community discussion | Ongoing |
| Signal | The action — live coordination | As needed |
| Hero | The boost — one thing, max reach | Rotational |

## Author

MidnightRider.sol — created June 8 2026
