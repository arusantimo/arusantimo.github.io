import unittest
from dataclasses import replace

from jongga.generate_latest import StockSnapshot
from jongga.stock_indicators import attach_stock_indicators_to_entry, build_stock_indicator_snapshot


def sample_snapshot(**overrides):
    base = StockSnapshot(
        rank=17,
        code="005930",
        name="삼성전자",
        current_price=279000.0,
        prev_close=255500.0,
        open_price=239500.0,
        high_price=279500.0,
        low_price=238500.0,
        volume=1000000.0,
        trading_value_text="1조",
        market_cap_trillion=43.7,
        foreign_net=-147900.0,
        institution_net=135906.0,
        foreign_previous=0.0,
        institution_previous=0.0,
        close_history=[279000.0, 255500.0, 250000.0, 245000.0, 240000.0] + [230000.0] * 20,
        high_history=[280000.0] * 25,
        low_history=[230000.0] * 25,
        volume_history=[1000000.0, 800000.0] + [700000.0] * 20,
        ma5=260000.0,
        ma10=250000.0,
        ma20=221620.0,
        ma60=210000.0,
        ma5_prev=255000.0,
        ma20_prev=218045.0,
        ma60_prev=205000.0,
        weekly_rsi=63.0,
        macd_hist=[],
        high_20d=280000.0,
        low_5d=235000.0,
        high_52w=307000.0,
        return_5d=5.0,
        return_20d=12.5,
        return_21d=11.0,
        volume_avg_5d=750000.0,
        volume_avg_20d=680000.0,
        industry_code="",
        industry_compare_change_pct=-6.6,
        industry_compare_count=10,
        intraday_30m={},
        event_filter=None,
        market_cap_rank=17,
        market_cap_universe_count=2560,
        per=24.2,
        pbr=1.4,
        cns_per=22.0,
        low_52w=190800.0,
        foreign_rate=34.6,
    )
    return replace(base, **overrides)


class StockIndicatorTests(unittest.TestCase):
    def test_build_snapshot_includes_pullback_metrics(self):
        entry = {
            "strategy": "pullback",
            "currentPrice": 279000,
            "pullbackContext": {
                "support": {
                    "primaryLine": {"price": 269062, "distancePct": 3.56}
                }
            },
        }
        snapshot = build_stock_indicator_snapshot(sample_snapshot(), "pullback", entry)
        self.assertAlmostEqual(snapshot["vs52wHighPct"], 279000 / 307000 * 100, places=2)
        self.assertAlmostEqual(snapshot["ma20GapPct"], ((279000 - 221620) / 221620) * 100, places=2)
        self.assertEqual(snapshot["supportDistancePct"], 3.56)
        self.assertEqual(snapshot["per"], 24.2)
        self.assertEqual(snapshot["pbr"], 1.4)

    def test_attach_stock_indicators_to_entry_sets_analysis_source(self):
        entry = {
            "strategy": "pullback",
            "currentPrice": 279000,
            "pullbackContext": {"support": {"primaryLine": {"distancePct": 3.56}}},
        }
        attach_stock_indicators_to_entry(entry, sample_snapshot())
        self.assertEqual(entry["stockIndicators"]["source"], "jongga_analysis")
        self.assertIn("rsi14", entry["stockIndicators"]["snapshot"])


if __name__ == "__main__":
    unittest.main()
