import json
import unittest
from datetime import date
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest import mock

from jongga.output_contract import VARIANT_STABLE, build_daily_output_paths, read_js_assignment
from jongga.replay_backtest import REPLAY_RUNS_MARKER, grade_from_threshold_profile, iter_dates, normalize_analysis_dates, replay_entry_view, run_replay
from jongga.replay_market_data import build_replay_market_data


class ReplayBacktestTests(unittest.TestCase):
    def _payload(self):
        return {
            "analysisDate": "2026-06-03",
            "variant": "stable",
            "slots": [
                {
                    "regime": {
                        "effectiveRegimeLabel": "강세장 ✅",
                        "macroOverlay": {"effectiveRegimeLabel": "강세장 ✅", "kospiBullTier": "strong"},
                    },
                    "gapScore": {"code": "G-A"},
                    "entries": {
                        "pullback": [
                            {
                                "name": "A",
                                "code": "000001",
                                "strategy": "pullback",
                                "grade": "A",
                                "gradeScore": 7.2,
                                "strictScore": 7.2,
                                "signalScore": 7.2,
                                "score": 7.2,
                                "entryEligible": True,
                                "statusLabel": "매수추천",
                                "gates": [{"code": "G1", "status": "✅", "note": "ok"}],
                                "tradePlanRows": [
                                    {"stage": "🌅 프리마켓", "quantity": "40% 익절", "targetYield": "+2.0%", "targetPrice": "10,200원"},
                                    {"stage": "🔔 장초반", "quantity": "30% 익절", "targetYield": "+4.0%", "targetPrice": "10,400원"},
                                    {"stage": "📈 장중 1차", "quantity": "30% 익절", "targetYield": "+6.0%", "targetPrice": "10,600원"},
                                    {"stage": "🛑 손절", "quantity": "전량", "targetYield": "-3.0%", "targetPrice": "9,700원"},
                                ],
                                "entryPrice": 10000.0,
                            }
                        ],
                        "accumulation": [
                            {
                                "name": "B",
                                "code": "000002",
                                "strategy": "accumulation",
                                "grade": "B",
                                "gradeScore": 7.1,
                                "strictScore": 7.1,
                                "signalScore": 7.1,
                                "score": 7.1,
                                "entryEligible": False,
                                "statusLabel": "관심후보",
                                "gates": [{"code": "G1", "status": "✅", "note": "ok"}],
                                "tradePlanRows": [
                                    {"stage": "🌅 프리마켓", "quantity": "50% 익절", "targetYield": "+2.0%", "targetPrice": "20,400원"},
                                    {"stage": "🔔 장초반", "quantity": "50% 익절", "targetYield": "+4.0%", "targetPrice": "20,800원"},
                                    {"stage": "🛑 손절", "quantity": "전량", "targetYield": "-3.0%", "targetPrice": "19,400원"},
                                ],
                                "entryPrice": 20000.0,
                            }
                        ],
                    },
                }
            ],
        }

    def _write_payload(self, out_dir: Path, payload: dict):
        json_path, _ = build_daily_output_paths(out_dir, date.fromisoformat(payload["analysisDate"]), variant=VARIANT_STABLE)
        json_path.parent.mkdir(parents=True, exist_ok=True)
        json_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

    def test_threshold_profile_changes_grade_cut(self):
        self.assertEqual(grade_from_threshold_profile(7.2, "pullback", "current"), "A")
        self.assertEqual(grade_from_threshold_profile(7.2, "pullback", "strict-doc"), "B")
        self.assertEqual(grade_from_threshold_profile(6.8, "pullback", "relaxed"), "A")

    def test_replay_inclusion_uses_grade_score_threshold_even_when_entry_is_not_eligible(self):
        candidate = replay_entry_view(
            {
                "name": "B",
                "code": "000002",
                "grade": "B",
                "gradeScore": 7.1,
                "signalScore": 7.1,
                "score": 7.1,
                "entryEligible": False,
                "statusLabel": "관심후보",
                "gates": [{"code": "G1", "status": "✅", "note": "ok"}],
                "filters": [],
            },
            "accumulation",
            "current",
        )
        self.assertFalse(candidate["entryEligible"])
        self.assertTrue(candidate["replayIncluded"])
        self.assertTrue(candidate["replayA7Plus"])

        min_cut = replay_entry_view(
            {
                "name": "D",
                "code": "000004",
                "grade": "B",
                "gradeScore": 6.0,
                "signalScore": 6.0,
                "score": 6.0,
                "entryEligible": False,
                "statusLabel": "관심후보",
                "gates": [{"code": "G1", "status": "✅", "note": "ok"}],
                "filters": [],
            },
            "pullback",
            "current",
        )
        self.assertTrue(min_cut["replayIncluded"])
        self.assertEqual(min_cut["replayIncludeRule"], "gradeScore>=6.0 AND replayGrade>=B")

        excluded = replay_entry_view(
            {
                "name": "C",
                "code": "000003",
                "grade": "A",
                "gradeScore": 5.9,
                "signalScore": 5.9,
                "score": 5.9,
                "entryEligible": True,
                "statusLabel": "매수추천",
                "gates": [{"code": "G1", "status": "✅", "note": "ok"}],
                "filters": [],
            },
            "pullback",
            "current",
        )
        self.assertFalse(excluded["replayIncluded"])

        grade_c = replay_entry_view(
            {
                "name": "E",
                "code": "000005",
                "grade": "C",
                "gradeScore": 5.4,
                "signalScore": 5.4,
                "score": 5.4,
                "entryEligible": False,
                "statusLabel": "관심후보",
                "gates": [{"code": "G1", "status": "✅", "note": "ok"}],
                "filters": [],
            },
            "reversal",
            "strict-doc",
        )
        self.assertFalse(grade_c["replayIncluded"])

    def test_market_data_is_marked_degraded_when_falling_back_to_daily(self):
        rows = [
            {"localTradedAt": "20260604", "openPrice": "10050", "highPrice": "10500", "lowPrice": "9800", "closePrice": "10200", "accumulatedTradingVolume": "1000"},
            {"localTradedAt": "20260603", "openPrice": "9900", "highPrice": "10100", "lowPrice": "9800", "closePrice": "10000", "accumulatedTradingVolume": "1000"},
        ]
        market_data = build_replay_market_data(code="000001", entry_date="2026-06-03", entry_price=10000.0, history_rows=rows)
        self.assertEqual(market_data["status"], "resolved")
        self.assertEqual(market_data["dataQuality"]["status"], "degraded")
        self.assertEqual(market_data["nextTradingDate"], "20260604")
        self.assertEqual(market_data["futureTradingDates"], ["20260604"])
        self.assertEqual(len(market_data["replayBars"]), 3)
        self.assertEqual(market_data["entryBar"]["timestamp"], "2026-06-03T15:30:00+09:00")
        self.assertEqual(market_data["replayBars"][-1]["timestamp"], "2026-06-04T15:00:00+09:00")

    def test_market_data_with_second_followup_day_keeps_three_day_schedule(self):
        rows = [
            {"localTradedAt": "20260605", "openPrice": "10150", "highPrice": "10300", "lowPrice": "9950", "closePrice": "10250", "accumulatedTradingVolume": "900"},
            {"localTradedAt": "20260604", "openPrice": "10050", "highPrice": "10500", "lowPrice": "9800", "closePrice": "10200", "accumulatedTradingVolume": "1000"},
            {"localTradedAt": "20260603", "openPrice": "9900", "highPrice": "10100", "lowPrice": "9800", "closePrice": "10000", "accumulatedTradingVolume": "1000"},
        ]
        market_data = build_replay_market_data(code="000001", entry_date="2026-06-03", entry_price=10000.0, history_rows=rows)
        self.assertEqual(market_data["futureTradingDates"], ["20260604", "20260605"])
        self.assertEqual(len(market_data["replayBars"]), 5)
        self.assertEqual(market_data["replayBars"][-1]["timestamp"], "2026-06-05T15:00:00+09:00")

    def test_iter_dates_skips_weekends(self):
        self.assertEqual(
            list(iter_dates(date(2026, 5, 29), date(2026, 6, 2))),
            [date(2026, 5, 29), date(2026, 6, 1), date(2026, 6, 2)],
        )

    def test_normalize_analysis_dates_skips_weekends(self):
        self.assertEqual(
            normalize_analysis_dates([date(2026, 6, 1), date(2026, 6, 6), date(2026, 6, 7), date(2026, 6, 2)]),
            [date(2026, 6, 1), date(2026, 6, 2)],
        )

    def test_run_replay_writes_expected_artifacts(self):
        with TemporaryDirectory() as tmp:
            out_dir = Path(tmp) / "jongga" / "output"
            self._write_payload(out_dir, self._payload())
            rows_by_code = {
                "000001": [
                    {"localTradedAt": "20260605", "openPrice": "10320", "highPrice": "10400", "lowPrice": "10020", "closePrice": "10250", "accumulatedTradingVolume": "900"},
                    {"localTradedAt": "20260604", "openPrice": "10050", "highPrice": "10450", "lowPrice": "9900", "closePrice": "10350", "accumulatedTradingVolume": "1000"},
                    {"localTradedAt": "20260603", "openPrice": "9950", "highPrice": "10050", "lowPrice": "9800", "closePrice": "10000", "accumulatedTradingVolume": "1000"},
                ],
                "000002": [
                    {"localTradedAt": "20260605", "openPrice": "20050", "highPrice": "20100", "lowPrice": "19850", "closePrice": "20050", "accumulatedTradingVolume": "900"},
                    {"localTradedAt": "20260604", "openPrice": "20000", "highPrice": "20100", "lowPrice": "19800", "closePrice": "19950", "accumulatedTradingVolume": "1000"},
                    {"localTradedAt": "20260603", "openPrice": "19900", "highPrice": "20100", "lowPrice": "19800", "closePrice": "20000", "accumulatedTradingVolume": "1000"},
                ],
            }

            import jongga.replay_backtest as replay_backtest

            original_fetch = replay_backtest.__dict__.get("fetch_naver_price_history")
            from unittest import mock

            with mock.patch("jongga.generate_latest.fetch_naver_price_history", side_effect=lambda code, count=40: rows_by_code[code]), \
                 mock.patch("jongga.replay_market_data.fetch_naver_price_history", side_effect=lambda code, count=40: rows_by_code[code]), \
                 mock.patch("jongga.replay_backtest.fetch_naver_price_history", side_effect=lambda code, count=40: rows_by_code[code], create=True):
                run_record = run_replay(
                    date_from=date(2026, 6, 3),
                    date_to=date(2026, 6, 3),
                    variant="stable",
                    bar="1m",
                    threshold_profile="relaxed",
                    out_dir=out_dir,
                )

            replay_dir = out_dir / "replay"
            self.assertTrue((replay_dir / "replay_runs.json").exists())
            self.assertTrue((replay_dir / "replay_runs.js").exists())
            self.assertTrue((replay_dir / "sim_orders_20260603.json").exists())
            self.assertTrue((replay_dir / "sim_fills_20260603.json").exists())
            self.assertTrue((replay_dir / "replay_summary_20260603.json").exists())

            summary = json.loads((replay_dir / "replay_summary_20260603.json").read_text(encoding="utf-8"))
            bridge = read_js_assignment(replay_dir / "replay_runs.js", REPLAY_RUNS_MARKER)
            self.assertEqual(summary["candidateCount"], 2)
            self.assertEqual(summary["eligibleCount"], 1)
            self.assertEqual(summary["includedCount"], 2)
            self.assertEqual(summary["tradeCount"], 2)
            self.assertEqual(summary["degradedCount"], 2)
            self.assertEqual(run_record["summary"]["tradeCount"], 2)
            self.assertEqual(run_record["summary"]["candidateCount"], 2)
            self.assertEqual(run_record["summary"]["includedCount"], 2)
            self.assertIn("overall", run_record["summary"])
            self.assertIn("byStrategy", run_record["summary"])
            self.assertIn("byStock", run_record["summary"])
            self.assertEqual(run_record["summary"]["byStrategy"]["accumulation"]["includedCount"], 1)
            self.assertEqual(len(run_record["summary"]["byStock"]), 2)
            self.assertIn("lastEntryFillPrice", run_record["summary"]["byStock"][0])
            self.assertIn("lastExitAvgFillPrice", run_record["summary"]["byStock"][0])
            self.assertTrue(any(item.get("entryFillPrice") for item in summary["results"]))
            self.assertTrue(any(item.get("exitAvgFillPrice") for item in summary["results"]))
            self.assertIn("strategyViews", run_record)
            self.assertIn("pullback", run_record["strategyViews"])
            self.assertTrue(summary["trades"])
            self.assertTrue(run_record["days"][0]["trades"])
            self.assertTrue(run_record["strategyViews"]["pullback"]["days"][0]["trades"])
            self.assertEqual(
                [item["name"] for item in run_record["strategyViews"]["pullback"]["caseViews"]["recommendation"]["days"][0]["trades"]],
                ["A"],
            )
            self.assertEqual(run_record["strategyViews"]["pullback"]["caseViews"]["recommendation"]["summary"]["candidateCount"], 1)
            self.assertEqual(run_record["strategyViews"]["pullback"]["caseViews"]["a7plus"]["summary"]["candidateCount"], 1)
            self.assertEqual(
                [item["name"] for item in run_record["strategyViews"]["pullback"]["caseViews"]["a7plus"]["days"][0]["trades"]],
                ["A"],
            )
            self.assertEqual(run_record["strategyViews"]["pullback"]["caseViews"]["replay"]["summary"]["candidateCount"], 1)
            self.assertEqual([day["date"] for day in run_record["strategyViews"]["pullback"]["caseViews"]["replay"]["days"]], ["2026-06-03"])
            self.assertEqual(
                [item["name"] for item in run_record["strategyViews"]["accumulation"]["caseViews"]["replay"]["days"][0]["trades"]],
                ["B"],
            )
            self.assertEqual(run_record["strategyViews"]["accumulation"]["caseViews"]["replay"]["summary"]["candidateCount"], 1)
            self.assertTrue(
                all(
                    (item.get("entryFilledAt") or "")[:10] != (item.get("exitFilledAt") or "")[:10]
                    for item in summary["results"]
                )
            )
            self.assertTrue(
                all(
                    (item.get("exitFilledAt") or "")[11:16] in {"10:00", "15:00"}
                    for item in summary["results"]
                    if item.get("exitFilledAt")
                )
            )
            self.assertIsInstance(bridge, dict)
            self.assertEqual(bridge["latestRun"]["runId"], run_record["runId"])
            self.assertEqual(bridge["latestAttempt"]["status"], "complete")
            self.assertEqual(bridge["latestSummary"]["tradeCount"], 2)

    def test_run_replay_omits_weekend_dates_from_analysis_window(self):
        with TemporaryDirectory() as tmp:
            out_dir = Path(tmp) / "jongga" / "output"
            self._write_payload(out_dir, self._payload())
            rows_by_code = {
                "000001": [
                    {"localTradedAt": "20260603", "openPrice": "9950", "highPrice": "10050", "lowPrice": "9800", "closePrice": "10000", "accumulatedTradingVolume": "1000"},
                    {"localTradedAt": "20260602", "openPrice": "9950", "highPrice": "10050", "lowPrice": "9800", "closePrice": "10000", "accumulatedTradingVolume": "1000"},
                ],
                "000002": [
                    {"localTradedAt": "20260603", "openPrice": "19900", "highPrice": "20100", "lowPrice": "19800", "closePrice": "20000", "accumulatedTradingVolume": "1000"},
                    {"localTradedAt": "20260602", "openPrice": "19900", "highPrice": "20100", "lowPrice": "19800", "closePrice": "20000", "accumulatedTradingVolume": "1000"},
                ],
            }

            with mock.patch("jongga.generate_latest.fetch_naver_price_history", side_effect=lambda code, count=40: rows_by_code[code]), \
                 mock.patch("jongga.replay_market_data.fetch_naver_price_history", side_effect=lambda code, count=40: rows_by_code[code]), \
                 mock.patch("jongga.replay_backtest.fetch_naver_price_history", side_effect=lambda code, count=40: rows_by_code[code], create=True):
                run_record = run_replay(
                    date_from=date(2026, 5, 30),
                    date_to=date(2026, 6, 2),
                    variant="stable",
                    bar="1m",
                    threshold_profile="relaxed",
                    out_dir=out_dir,
                )

            self.assertEqual(run_record["analysisDates"], ["2026-06-01", "2026-06-02"])
            self.assertEqual([day["date"] for day in run_record["days"]], ["2026-06-01", "2026-06-02"])

    def test_run_replay_uses_history_recommendation_keys(self):
        with TemporaryDirectory() as tmp:
            out_dir = Path(tmp) / "jongga" / "output"
            self._write_payload(out_dir, self._payload())
            rows_by_code = {
                "000001": [
                    {"localTradedAt": "20260605", "openPrice": "10320", "highPrice": "10400", "lowPrice": "10020", "closePrice": "10250", "accumulatedTradingVolume": "900"},
                    {"localTradedAt": "20260604", "openPrice": "10050", "highPrice": "10450", "lowPrice": "9900", "closePrice": "10350", "accumulatedTradingVolume": "1000"},
                    {"localTradedAt": "20260603", "openPrice": "9950", "highPrice": "10050", "lowPrice": "9800", "closePrice": "10000", "accumulatedTradingVolume": "1000"},
                ],
                "000002": [
                    {"localTradedAt": "20260605", "openPrice": "20050", "highPrice": "20100", "lowPrice": "19850", "closePrice": "20050", "accumulatedTradingVolume": "900"},
                    {"localTradedAt": "20260604", "openPrice": "20000", "highPrice": "20100", "lowPrice": "19800", "closePrice": "19950", "accumulatedTradingVolume": "1000"},
                    {"localTradedAt": "20260603", "openPrice": "19900", "highPrice": "20100", "lowPrice": "19800", "closePrice": "20000", "accumulatedTradingVolume": "1000"},
                ],
            }

            recommendation_keys = {"2026-06-03|stable|pullback|000001"}

            with mock.patch("jongga.generate_latest.fetch_naver_price_history", side_effect=lambda code, count=40: rows_by_code[code]), \
                 mock.patch("jongga.replay_market_data.fetch_naver_price_history", side_effect=lambda code, count=40: rows_by_code[code]), \
                 mock.patch("jongga.replay_backtest.fetch_naver_price_history", side_effect=lambda code, count=40: rows_by_code[code], create=True):
                run_record = run_replay(
                    date_from=date(2026, 6, 3),
                    date_to=date(2026, 6, 3),
                    variant="stable",
                    bar="1m",
                    threshold_profile="relaxed",
                    out_dir=out_dir,
                    recommendation_keys=recommendation_keys,
                )

            recommendation_view = run_record["strategyViews"]["pullback"]["caseViews"]["recommendation"]
            self.assertEqual(recommendation_view["summary"]["candidateCount"], 1)
            self.assertEqual([day["date"] for day in recommendation_view["days"]], ["2026-06-03"])
            self.assertTrue(recommendation_view["days"][0]["candidates"][0]["historyRecommendation"])


if __name__ == "__main__":
    unittest.main()
