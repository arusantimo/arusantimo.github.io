import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from collectors.news_theme import _mention_counts  # noqa: E402


class ThemeNoveltyTest(unittest.TestCase):
    def test_mention_counts(self):
        headlines = ["AI 반도체 HBM 수주", "AI 반도체 실적 호재", "일반 시황"]
        counts = _mention_counts(headlines, ["AI", "반도체", "HBM"])
        self.assertGreater(counts["AI"], 0)
        self.assertGreater(counts["반도체"], 0)


if __name__ == "__main__":
    unittest.main()
