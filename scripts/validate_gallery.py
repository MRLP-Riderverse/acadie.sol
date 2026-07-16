#!/usr/bin/env python3
"""Validate the public Acadie.sol album catalogue and its static assets."""

from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "assets" / "gallery" / "albums.json"
REQUIRED_LOCALES = ("en", "fr")
VALID_STATUS = {"public", "preview", "members", "private", "archived"}
VALID_POLICY = {"preview", "request", "download", "members"}


def require_localized(album: dict, field: str, errors: list[str]) -> None:
    value = album.get(field)
    if not isinstance(value, dict):
        errors.append(f"{album.get('slug', '?')}: {field} must be localized")
        return
    for locale in REQUIRED_LOCALES:
        if not str(value.get(locale, "")).strip():
            errors.append(f"{album.get('slug', '?')}: {field}.{locale} is required")


def local_path(value: str) -> Path:
    return ROOT / value.lstrip("/")


def validate() -> list[str]:
    errors: list[str] = []
    try:
        payload = json.loads(MANIFEST.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        return [f"cannot read {MANIFEST.relative_to(ROOT)}: {exc}"]

    albums = payload.get("albums")
    if not isinstance(albums, list):
        return ["albums must be a list"]
    if not isinstance(payload.get("public_limit"), int) or payload["public_limit"] < 1:
        errors.append("public_limit must be a positive integer")

    seen: set[str] = set()
    featured_public = 0
    for album in albums:
        slug = str(album.get("slug", "")).strip()
        if not slug:
            errors.append("album slug is required")
            continue
        if slug in seen:
            errors.append(f"duplicate slug: {slug}")
        seen.add(slug)

        require_localized(album, "title", errors)
        require_localized(album, "summary", errors)
        status = album.get("status")
        if status not in VALID_STATUS:
            errors.append(f"{slug}: invalid status {status!r}")
        if status == "public" and album.get("featured"):
            featured_public += 1

        href = str(album.get("href", "")).strip()
        if not href or not (local_path(href) / "index.html").is_file():
            errors.append(f"{slug}: static album route is missing: {href}")

        cover = album.get("cover") or {}
        require_localized({"slug": slug, "alt": cover.get("alt")}, "alt", errors)
        for field in ("src",):
            asset = str(cover.get(field, "")).strip()
            if not asset or not local_path(asset).is_file():
                errors.append(f"{slug}: cover {field} is missing: {asset}")
        if not all(isinstance(cover.get(key), int) and cover[key] > 0 for key in ("width", "height")):
            errors.append(f"{slug}: cover width/height must be positive integers")

        resolution = album.get("full_resolution") or {}
        policy = resolution.get("policy")
        if policy not in VALID_POLICY:
            errors.append(f"{slug}: invalid full-resolution policy {policy!r}")
        public_original = resolution.get("public_original")
        if public_original and not local_path(str(public_original)).is_file():
            errors.append(f"{slug}: public original is missing: {public_original}")

    if albums and featured_public != 1:
        errors.append(f"expected exactly one featured public album, found {featured_public}")
    return errors


def main() -> int:
    errors = validate()
    if errors:
        print("Gallery validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1
    payload = json.loads(MANIFEST.read_text(encoding="utf-8"))
    print(f"Gallery validation passed: {len(payload['albums'])} album(s)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
