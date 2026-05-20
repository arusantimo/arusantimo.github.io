import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from jongga.collectors.api import JsonApiCollector
from jongga.collectors.base import CollectionRequest, MissingCredentials


class JsonApiCollectorTest(unittest.TestCase):
    def test_extracts_nested_json_path_from_fixture(self):
        collector = JsonApiCollector("yahoo_chart")
        result = collector.collect(CollectionRequest(
            metric="global_gap_metric",
            key="^VIX",
            params={
                "fixtureJson": {"chart": {"result": [{"meta": {"regularMarketPrice": 18.42}}]}},
                "jsonPath": "chart.result.0.meta.regularMarketPrice",
            },
        ))

        self.assertEqual(result.value, 18.42)
        self.assertEqual(result.provider, "yahoo_chart")
        self.assertEqual(result.audit["jsonPath"], "chart.result.0.meta.regularMarketPrice")

    def test_missing_required_env_is_explicit(self):
        collector = JsonApiCollector("kis")
        with self.assertRaises(MissingCredentials):
            collector.collect(CollectionRequest(
                metric="current_price",
                key="005930",
                params={
                    "fixtureJson": {"price": 73200},
                    "jsonPath": "price",
                    "requiredEnv": ["__JONGGA_TEST_MISSING_ENV__"],
                },
            ))


if __name__ == "__main__":
    unittest.main()

