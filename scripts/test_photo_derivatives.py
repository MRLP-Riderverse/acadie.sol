#!/usr/bin/env python3
from __future__ import annotations

import sys
import tempfile
import unittest
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPT_DIR))
from build_photo_derivatives import build, dimensions

ROOT = SCRIPT_DIR.parent
SOURCE = ROOT / "assets" / "images" / "acadie-in-the-stars.jpg"


class DerivativeBuilderTests(unittest.TestCase):
    def test_builds_requested_sizes_without_upscaling(self) -> None:
        with tempfile.TemporaryDirectory(prefix="acadie-derivatives-") as temporary:
            outputs = build(SOURCE, Path(temporary), "cover", [480, 960, 1600], 80)
            self.assertEqual(len(outputs), 3)
            self.assertEqual(dimensions(Path(outputs[0]["path"])), (480, 360))
            self.assertEqual(dimensions(Path(outputs[1]["path"])), (960, 720))
            self.assertEqual(dimensions(Path(outputs[2]["path"])), (1280, 960))
            self.assertTrue(all(Path(item["path"]).is_file() for item in outputs))

    def test_rejects_tiny_preview_size(self) -> None:
        with tempfile.TemporaryDirectory(prefix="acadie-derivatives-") as temporary:
            with self.assertRaises(ValueError):
                build(SOURCE, Path(temporary), "cover", [32], 80)


if __name__ == "__main__":
    unittest.main()
