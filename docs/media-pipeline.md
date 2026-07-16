# Acadie.sol media pipeline

## Boundary

The website repository is a **public derivative layer**, not the canonical home for camera originals.

```text
iPhone / Sony camera / Telegram drop / future Discord drop
                    ↓
        private intake queue (temporary)
                    ↓
~/ExoCortex/media/acadie-sol/originals/YYYY/album-slug/
                    ↓
          metadata + derivative build
          ↙                         ↘
public previews in Git       private full-resolution library
          ↓                         ↓
https://acadie.sol.site      request / sale / licensed delivery
```

Recommended canonical original root:

```text
~/ExoCortex/media/acadie-sol/originals/
```

That keeps source photographs inside ExoCortex without mixing multi-megabyte originals into the site repository. Maintain a second encrypted backup; the home PC must not be the only copy.

## Intake while away from home

### First bridge: Telegram

Use a private intake chat or topic rather than the public announcement channel.

1. Send selected images as **files/documents**, not compressed Telegram photos, when the original matters.
2. Include an album seed in the message: `album: slug`, event/place, date, photographer, and public/private intent.
3. The home agent downloads into a temporary queue.
4. It computes a checksum, records Telegram message provenance, and moves the verified file into the ExoCortex original root.
5. Nothing publishes automatically. A review step selects covers, captions, faces/privacy handling, and release policy.

Telegram is a bridge, not the archive. Platform retention and image processing are not source-of-truth guarantees.

### Second bridge: Discord

Discord can later provide an album-specific drop channel, but it should feed the same intake queue and metadata contract. Do not build separate Telegram and Discord publishing logic; build adapters that produce the same local intake record.

### Optional private object store

For many 24 MP Sony files, a small S3-compatible bucket (Backblaze B2, Cloudflare R2, or self-hosted MinIO) can be a transport and off-site backup layer. Keep encryption, lifecycle rules, and cost ceilings explicit. ExoCortex remains the editable truth.

## Album release policy

Each album declares one of these public states:

| Policy | Public site | Full resolution |
|---|---|---|
| `preview` | Responsive WebP/JPEG previews | Offline only |
| `request` | Responsive previews | Delivered manually after request |
| `download` | Responsive previews | Public original/download link |
| `members` | Public cover/teaser only | Served from a future authenticated origin |

The current first album uses `request` while exposing its existing 1280×960 public original. Future 6000×4000 originals should default to `request`, not `download`.

## Derivative targets

Default public outputs:

| Use | Long edge | Format | Quality target |
|---|---:|---|---:|
| card/phone | 480 px | WebP | 76–80 |
| standard view | 960 px | WebP | 80–84 |
| large display | 1600 px | WebP or progressive JPEG | 82–86 |
| social preview | 1200×630 | JPEG/WebP | 82 |

Rules:

- Auto-orient before resizing.
- Strip GPS and private EXIF from public derivatives.
- Preserve color profile or convert predictably to sRGB.
- Never upscale.
- Store width/height in the album manifest to prevent layout shift.
- Use `srcset`/`sizes`; do not make phones fetch the desktop preview.
- Keep animation away from the first homepage screen unless the file is tightly budgeted.

## Asset budgets

- Home initial image: aim below 150 KB.
- Album card preview: aim below 200 KB.
- Individual standard photo: aim below 350 KB when visual quality allows.
- Large preview: aim below 900 KB.
- Full-resolution originals: off the public critical path.

The generated homepage cover currently has 480 px and 960 px WebP variants. The untracked 10 MB GIF should not become a startup dependency.

## Recent-ten and membership

`assets/gallery/albums.json` has `public_limit: 10`. This is a presentation limit, **not security**.

GitHub Pages cannot securely paywall committed files. If older albums become member-only:

1. Remove protected derivatives/originals from the public Git history before launch if they were ever committed.
2. Keep public teaser metadata and cover images on Acadie.sol.
3. Serve protected assets through an authenticated origin or expiring signed URLs.
4. Let membership grant access at delivery time; do not hide public URLs with CSS or JavaScript and call it a paywall.

## Publishing contract

1. Originals are ingested and checksummed privately.
2. Album metadata is reviewed.
3. Public derivatives are generated with metadata stripped:
   `python3 scripts/build_photo_derivatives.py SOURCE --output-dir assets/gallery/YYYY/album-slug --stem cover`
4. `assets/gallery/albums.json` is updated.
5. Static album HTML is generated or updated.
6. `python3 scripts/validate_gallery.py` passes.
7. Local mobile/desktop browser QA passes.
8. Commit/push only after visual approval.

For Sony RAW files, preserve the `.ARW` original privately and feed the derivative builder an intentionally developed JPEG or TIFF. HEIC support depends on the local ImageMagick build; convert to a high-quality local intermediate when unavailable.
