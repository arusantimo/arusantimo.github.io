import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from jongga.collectors.base import CollectionRequest, ManualRequired
from jongga.collectors.http_scraper import HttpScraperCollector


class HttpScraperTest(unittest.TestCase):
    def test_regex_extraction_from_fixture_html(self):
        collector = HttpScraperCollector(provider="naver_html")
        result = collector.collect(CollectionRequest(
            metric="current_price",
            key="005930",
            params={
                "url": "https://example.test/005930",
                "fixtureHtml": "<html><strong>현재가</strong><span>73,200</span></html>",
                "regexes": [{"pattern": r"현재가</strong><span>([\d,]+)</span>"}],
            },
        ))

        self.assertEqual(result.value, "73,200")
        self.assertEqual(result.provider, "naver_html")
        self.assertIn("regex:", result.audit["selector"])

    def test_blocked_page_requires_manual_handling(self):
        collector = HttpScraperCollector()
        with self.assertRaises(ManualRequired):
            collector.collect(CollectionRequest(
                metric="current_price",
                key="005930",
                params={"fixtureHtml": "<html>captcha required</html>"},
            ))

    def test_validation_keyword_failure_is_collector_error(self):
        collector = HttpScraperCollector()
        with self.assertRaises(Exception) as raised:
            collector.collect(CollectionRequest(
                metric="top_trading_value",
                key="all",
                params={"fixtureHtml": "<html>empty</html>", "validationKeyword": "거래대금"},
            ))

        self.assertIn("validation keyword", str(raised.exception))


if __name__ == "__main__":
    unittest.main()

