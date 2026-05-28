import json
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

ROOT = Path(__file__).resolve().parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from collectors import flow_supply, global_macro, news_theme, overtime_single  # noqa: E402


class StaleFallbacksTest(unittest.TestCase):
    def test_overtime_board_uses_recent_snapshot_when_live_page_is_error(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            raw_dir = root / "store" / "raw" / "20260527"
            raw_dir.mkdir(parents=True)
            (raw_dir / "overnight_volume.json").write_text(
                json.dumps(
                    {
                        "metric": "overnight_volume",
                        "status": "ok",
                        "value": {
                            "rows": [
                                {"code": "000660", "name": "SK하이닉스", "ahChangePct": 4.5, "ahPrice": 198500}
                            ]
                        },
                    },
                    ensure_ascii=False,
                ),
                encoding="utf-8",
            )
            with (
                patch.object(overtime_single, "ROOT_DIR", root),
                patch.object(overtime_single, "_fetch_overtime_html", return_value=("<html>error_content</html>", "naver_html", [])),
            ):
                env = overtime_single.collect_overtime_board(save_raw=False, trade_date="20260528")
            self.assertTrue(env.is_filled())
            self.assertTrue(env.stale)
            self.assertEqual(env.source, "raw_snapshot")
            self.assertEqual(env.value["rows"][0]["code"], "000660")

    def test_foreign_flow_uses_recent_snapshot_when_live_fetch_returns_empty(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            raw_dir = root / "store" / "raw" / "20260527"
            raw_dir.mkdir(parents=True)
            (raw_dir / "foreign_inst_flow.json").write_text(
                json.dumps(
                    {
                        "metric": "foreign_inst_flow",
                        "status": "ok",
                        "value": {
                            "000660": {"foreignNet": 1000, "instNet": -500, "prevVolume": 123456}
                        },
                    },
                    ensure_ascii=False,
                ),
                encoding="utf-8",
            )
            with (
                patch.object(flow_supply, "ROOT_DIR", root),
                patch.object(flow_supply, "collect_foreign_inst_flow", return_value=None),
            ):
                env = flow_supply.collect_foreign_inst_flow_batch(["000660"])
            self.assertTrue(env.is_filled())
            self.assertTrue(env.stale)
            self.assertEqual(env.source, "raw_snapshot")
            self.assertEqual(env.value["000660"]["prevVolume"], 123456)

    def test_global_macro_uses_market_snapshot_when_yahoo_is_unavailable(self):
        with patch.object(global_macro, "_fetch_yahoo_chart_payload", return_value=None), patch.object(
            global_macro, "load_market_analyze_latest_data", return_value={"vix": 17.01}
        ):
            env = global_macro.collect_global_macro()
        self.assertTrue(env.is_filled())
        self.assertEqual(env.source, "market_snapshot_mix")
        self.assertEqual(env.value["vix"], 17.01)

    def test_news_theme_uses_recent_snapshot_on_fetch_error(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            raw_dir = root / "store" / "raw" / "20260527"
            raw_dir.mkdir(parents=True)
            (raw_dir / "news_headlines.json").write_text(
                json.dumps(
                    {
                        "metric": "news_headlines",
                        "status": "ok",
                        "value": {"headlineCount": 1, "themes": [], "headlines": ["테스트"]},
                    },
                    ensure_ascii=False,
                ),
                encoding="utf-8",
            )
            with patch.object(news_theme, "ROOT_DIR", root), patch.object(
                news_theme, "fetch_text", side_effect=OSError("network down")
            ):
                env = news_theme.collect_news_theme()
            self.assertTrue(env.is_filled())
            self.assertTrue(env.stale)
            self.assertEqual(env.source, "raw_snapshot")

    def test_foreign_flow_uses_neutral_fallback_without_snapshot(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            with (
                patch.object(flow_supply, "ROOT_DIR", root),
                patch.object(flow_supply, "collect_foreign_inst_flow", return_value=None),
            ):
                env = flow_supply.collect_foreign_inst_flow_batch(["000660"])
            self.assertTrue(env.is_filled())
            self.assertTrue(env.stale)
            self.assertEqual(env.source, "neutral_fallback")
            self.assertIn("000660", env.value)


if __name__ == "__main__":
    unittest.main()
