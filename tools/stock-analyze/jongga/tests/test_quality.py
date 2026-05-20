import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from jongga.collectors.base import CollectResult
from jongga.router.audit import AuditRecorder
from jongga.router.quality import build_data_quality


class QualitySummaryTest(unittest.TestCase):
    def test_quality_summary_exposes_fallback_and_provider_health(self):
        audit = AuditRecorder()
        audit.record({"provider": "kis", "status": "failed"})
        audit.record({"provider": "naver_html", "status": "ok"})
        result = CollectResult(
            metric="current_price",
            key="005930",
            value=73200,
            provider="naver_html",
            layer="http_scraper",
            fallback_level=3,
            confidence=0.72,
        )

        summary = build_data_quality({"current_price:005930": result}, audit)

        self.assertEqual(summary["status"], "partial")
        self.assertEqual(summary["counts"]["fallback"], 1)
        self.assertEqual(summary["providerHealth"]["kis"]["failed"], 1)
        self.assertEqual(summary["fallbackUsage"][0]["provider"], "naver_html")


if __name__ == "__main__":
    unittest.main()

