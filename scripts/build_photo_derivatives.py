#!/usr/bin/env python3
"""Create privacy-safe responsive WebP previews from a local photograph.

The source is never modified. This is deliberately small and deterministic so an
intake adapter (Telegram, Discord, local folder) can call the same build step.
"""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from pathlib import Path


def image_command() -> str:
    command = shutil.which("magick") or shutil.which("convert")
    if not command:
        raise RuntimeError("ImageMagick is required (magick or convert)")
    return command


def dimensions(path: Path) -> tuple[int, int]:
    identify = shutil.which("identify")
    if not identify:
        raise RuntimeError("ImageMagick identify is required")
    result = subprocess.run(
        [identify, "-format", "%w %h", str(path)],
        check=True,
        capture_output=True,
        text=True,
    )
    width, height = result.stdout.split()
    return int(width), int(height)


def build(source: Path, output_dir: Path, stem: str, sizes: list[int], quality: int) -> list[dict]:
    if not source.is_file():
        raise FileNotFoundError(source)
    output_dir.mkdir(parents=True, exist_ok=True)
    command = image_command()
    outputs: list[dict] = []
    for size in sorted(set(sizes)):
        if size < 64:
            raise ValueError("preview sizes must be at least 64 pixels")
        target = output_dir / f"{stem}-{size}.webp"
        subprocess.run(
            [
                command,
                str(source),
                "-auto-orient",
                "-colorspace", "sRGB",
                "-strip",
                "-resize", f"{size}x{size}>",
                "-quality", str(quality),
                str(target),
            ],
            check=True,
            capture_output=True,
        )
        width, height = dimensions(target)
        outputs.append({
            "path": target.as_posix(),
            "width": width,
            "height": height,
            "bytes": target.stat().st_size,
        })
    return outputs


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    parser.add_argument("--output-dir", type=Path, required=True)
    parser.add_argument("--stem", default="photo")
    parser.add_argument("--sizes", nargs="+", type=int, default=[480, 960, 1600])
    parser.add_argument("--quality", type=int, default=82, choices=range(50, 96), metavar="50..95")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    try:
        outputs = build(args.source, args.output_dir, args.stem, args.sizes, args.quality)
    except (FileNotFoundError, RuntimeError, ValueError, subprocess.CalledProcessError) as exc:
        print(f"Derivative build failed: {exc}", file=sys.stderr)
        return 1
    print(json.dumps({"source": args.source.as_posix(), "outputs": outputs}, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
