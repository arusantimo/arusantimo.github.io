import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from jongga.collectors.base import CollectionRequest, CollectorError, ManualRequired
from jongga.collectors.browser import PlaywrightCollector


class BrowserCollectorTest(unittest.TestCase):
    def test_fixture_html_uses_browser_extraction_contract(self):
        collector = PlaywrightCollector()
        result = collector.collect(CollectionRequest(
            metric="global_gap_metric",
            key="^VIX",
            params={
                "fixtureHtml": "<main><div>VIX</div><span>18.42</span></main>",
                "regexes": [{"pattern": r"VIX</div><span>([\d.]+)</span>"}],
                "selectors": ["main"],
            },
        ))

        self.assertEqual(result.value, "18.42")
        self.assertEqual(result.layer, "headless_browser")

    def test_login_or_captcha_stops_without_bypass(self):
        collector = PlaywrightCollector()
        with self.assertRaises(ManualRequired):
            collector.collect(CollectionRequest(
                metric="toss_execution_strength",
                key="005930",
                params={"fixtureHtml": "<html>로그인 후 이용하세요</html>"},
            ))

    def test_missing_playwright_is_reported_as_collector_error(self):
        collector = PlaywrightCollector()
        try:
            collector.collect(CollectionRequest(
                metric="current_price",
                key="005930",
                params={"url": ""},
            ))
        except CollectorError as error:
            self.assertIn("url is required", str(error))
        else:
            self.fail("CollectorError expected")


if __name__ == "__main__":
    unittest.main()

