import json
import unittest
from datetime import date
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest import mock

import run_jongga_pipeline as pipeline


def _render_history(entries):
    return f"window.JONGGA_HISTORY_INDEX = {json.dumps(entries, ensure_ascii=False, indent=2)};\n"


class RunJonggaPipelineReplayTests(unittest.TestCase):
    def test_select_replay_dates_from_history_uses_recent_days_and_skips_latest_day(self):
        with TemporaryDirectory() as tmp:
            history_path = Path(tmp) / "jongga_history.js"
            history_path.write_text(
                _render_history([
                    {"date": "2026-06-05", "variant": "stable"},
                    {"date": "2026-06-04", "variant": "stable"},
                    {"date": "2026-06-04", "variant": "canary"},
                    {"date": "2026-06-03", "variant": "stable"},
                    {"date": "2026-06-02", "variant": "stable"},
                ]),
                encoding="utf-8",
            )

            replay_dates = pipeline.select_replay_dates_from_history(
                history_js=history_path,
                cutoff_date=date(2026, 6, 5),
                variant="stable",
            )

            self.assertEqual(replay_dates, [date(2026, 6, 2), date(2026, 6, 3)])

    def test_select_replay_dates_from_history_skips_weekends(self):
        with TemporaryDirectory() as tmp:
            history_path = Path(tmp) / "jongga_history.js"
            history_path.write_text(
                _render_history([
                    {"date": "2026-06-07", "variant": "stable"},
                    {"date": "2026-06-06", "variant": "stable"},
                    {"date": "2026-06-05", "variant": "stable"},
                    {"date": "2026-06-04", "variant": "stable"},
                    {"date": "2026-06-03", "variant": "stable"},
                    {"date": "2026-06-02", "variant": "stable"},
                    {"date": "2026-06-01", "variant": "stable"},
                ]),
                encoding="utf-8",
            )

            replay_dates = pipeline.select_replay_dates_from_history(
                history_js=history_path,
                cutoff_date=date(2026, 6, 8),
                variant="stable",
            )

            self.assertEqual(replay_dates, [date(2026, 6, 1), date(2026, 6, 2), date(2026, 6, 3), date(2026, 6, 4)])

    def test_select_replay_dates_can_use_cutoff_day_as_followup(self):
        with TemporaryDirectory() as tmp:
            history_path = Path(tmp) / "jongga_history.js"
            history_path.write_text(
                _render_history([
                    {"date": "2026-06-09", "variant": "stable"},
                    {"date": "2026-06-08", "variant": "stable"},
                    {"date": "2026-06-05", "variant": "stable"},
                ]),
                encoding="utf-8",
            )

            replay_dates = pipeline.select_replay_dates_from_history(
                history_js=history_path,
                cutoff_date=date(2026, 6, 9),
                variant="stable",
                include_cutoff_date=True,
            )

            self.assertEqual(replay_dates, [date(2026, 6, 5), date(2026, 6, 8)])

    def test_build_replay_recommendation_keys_uses_entry_eligible_rows(self):
        with TemporaryDirectory() as tmp:
            out_dir = Path(tmp) / "jongga" / "output"
            daily_json = out_dir / "202606" / "latest_20260603.json"
            daily_json.parent.mkdir(parents=True, exist_ok=True)
            daily_json.write_text(json.dumps({
                "slots": [
                    {
                        "entries": {
                            "pullback": [
                                {"code": "000001", "strategy": "pullback", "entryEligible": True},
                                {"code": "000002", "strategy": "pullback", "entryEligible": False},
                            ],
                            "accumulation": [
                                {"code": "000003", "strategy": "accumulation", "entryEligible": True},
                            ],
                        }
                    }
                ]
            }, ensure_ascii=False), encoding="utf-8")

            history_path = Path(tmp) / "jongga_history.js"
            history_path.write_text(
                _render_history([
                    {
                        "date": "2026-06-03",
                        "variant": "stable",
                        "jsonFile": str(daily_json),
                    }
                ]),
                encoding="utf-8",
            )

            keys = pipeline.build_replay_recommendation_keys_from_history(
                history_js=history_path,
                variant="stable",
                analysis_dates=[date(2026, 6, 3)],
            )

            self.assertEqual(
                keys,
                {
                    "2026-06-03|stable|pullback|000001",
                    "2026-06-03|stable|accumulation|000003",
                },
            )

    def test_build_replay_recommendation_keys_skips_best_effort_legacy_history(self):
        with TemporaryDirectory() as tmp:
            out_dir = Path(tmp) / "jongga" / "output"
            daily_json = out_dir / "202606" / "latest_20260603.json"
            daily_json.parent.mkdir(parents=True, exist_ok=True)
            daily_json.write_text(json.dumps({
                "slots": [
                    {
                        "entries": {
                            "pullback": [
                                {"code": "000001", "strategy": "pullback", "entryEligible": True},
                            ],
                        }
                    }
                ]
            }, ensure_ascii=False), encoding="utf-8")

            history_path = Path(tmp) / "jongga_history.js"
            history_path.write_text(
                _render_history([
                    {
                        "date": "2026-06-03",
                        "variant": "stable",
                        "jsonFile": str(daily_json),
                        "payloadSourceMode": "best_effort_legacy",
                    }
                ]),
                encoding="utf-8",
            )

            keys = pipeline.build_replay_recommendation_keys_from_history(
                history_js=history_path,
                variant="stable",
                analysis_dates=[date(2026, 6, 3)],
            )

            self.assertEqual(keys, set())

    def test_run_replay_backtest_uses_current_stable_recent_days_defaults(self):
        with TemporaryDirectory() as tmp:
            history_path = Path(tmp) / "jongga_history.js"
            out_dir = Path(tmp) / "jongga" / "output"
            history_path.write_text(
                _render_history([
                    {"date": "2026-06-05", "variant": "stable"},
                    {"date": "2026-06-04", "variant": "stable"},
                    {"date": "2026-06-03", "variant": "stable"},
                    {"date": "2026-06-02", "variant": "stable"},
                    {"date": "2026-06-01", "variant": "stable"},
                ]),
                encoding="utf-8",
            )

            with mock.patch("jongga.replay_backtest.run_replay", return_value={"runId": "run-1", "summary": {"candidateCount": 5, "eligibleCount": 2, "includedCount": 3, "tradeCount": 2}}) as run_replay:
                code, meta = pipeline.run_replay_backtest(
                    analysis_date="2026-06-05",
                    history_js=history_path,
                    out_dir=out_dir,
                    variant="stable",
                    threshold_profile="current",
                )

            self.assertEqual(code, 0)
            self.assertEqual(meta["status"], "complete")
            kwargs = run_replay.call_args.kwargs
            self.assertEqual(kwargs["variant"], "stable")
            self.assertEqual(kwargs["threshold_profile"], "current")
            self.assertEqual(kwargs["analysis_dates"], [date(2026, 6, 1), date(2026, 6, 2), date(2026, 6, 3), date(2026, 6, 4)])

    def test_run_replay_backtest_rebuilds_when_rule_signature_changes(self):
        with TemporaryDirectory() as tmp:
            history_path = Path(tmp) / "jongga_history.js"
            out_dir = Path(tmp) / "jongga" / "output"
            history_path.write_text(
                _render_history([
                    {"date": "2026-06-05", "variant": "stable"},
                    {"date": "2026-06-04", "variant": "stable"},
                    {"date": "2026-06-03", "variant": "stable"},
                ]),
                encoding="utf-8",
            )
            replay_dir = out_dir / "replay"
            replay_dir.mkdir(parents=True, exist_ok=True)
            (replay_dir / "replay_runs.json").write_text(
                json.dumps([
                    {
                        "runId": "run-old",
                        "generatedAt": "2026-06-04T19:30:00",
                        "analysisDates": ["2026-06-03"],
                        "replayRuleSignature": "legacy-signature",
                    }
                ], ensure_ascii=False, indent=2),
                encoding="utf-8",
            )

            with mock.patch("jongga.replay_backtest.run_replay", return_value={"runId": "run-2", "summary": {"candidateCount": 3, "eligibleCount": 1, "includedCount": 1, "tradeCount": 1}}) as run_replay:
                code, meta = pipeline.run_replay_backtest(
                    analysis_date="2026-06-05",
                    history_js=history_path,
                    out_dir=out_dir,
                    variant="stable",
                    threshold_profile="current",
                )

            self.assertEqual(code, 0)
            self.assertEqual(meta["mode"], "full")
            self.assertTrue(meta["runId"])
            kwargs = run_replay.call_args.kwargs
            self.assertTrue(kwargs["replace_existing_runs"])
            self.assertEqual(kwargs["analysis_dates"], [date(2026, 6, 3), date(2026, 6, 4)])

    def test_run_replay_backtest_includes_previous_trading_day_when_cutoff_day_exists(self):
        with TemporaryDirectory() as tmp:
            history_path = Path(tmp) / "jongga_history.js"
            out_dir = Path(tmp) / "jongga" / "output"
            daily_json = out_dir / "202606" / "latest_20260608.json"
            daily_json.parent.mkdir(parents=True, exist_ok=True)
            daily_json.write_text(json.dumps({
                "slots": [
                    {
                        "entries": {
                            "pullback": [
                                {"code": "000001", "strategy": "pullback", "entryEligible": True},
                            ],
                        }
                    }
                ]
            }, ensure_ascii=False), encoding="utf-8")
            history_path.write_text(
                _render_history([
                    {"date": "2026-06-09", "variant": "stable"},
                    {"date": "2026-06-08", "variant": "stable", "jsonFile": str(daily_json)},
                    {"date": "2026-06-05", "variant": "stable"},
                ]),
                encoding="utf-8",
            )

            with mock.patch("jongga.replay_backtest.run_replay", return_value={"runId": "run-3", "summary": {"candidateCount": 1, "eligibleCount": 1, "includedCount": 1, "tradeCount": 1}}) as run_replay:
                code, meta = pipeline.run_replay_backtest(
                    analysis_date="2026-06-09",
                    history_js=history_path,
                    out_dir=out_dir,
                    variant="stable",
                    threshold_profile="current",
                )

            self.assertEqual(code, 0)
            self.assertEqual(meta["status"], "complete")
            kwargs = run_replay.call_args.kwargs
            self.assertEqual(kwargs["analysis_dates"], [date(2026, 6, 5), date(2026, 6, 8)])
            self.assertIn("2026-06-08|stable|pullback|000001", kwargs["recommendation_keys"])

    def test_run_replay_backtest_skips_when_no_new_dates_exist(self):
        with TemporaryDirectory() as tmp:
            history_path = Path(tmp) / "jongga_history.js"
            out_dir = Path(tmp) / "jongga" / "output"
            history_path.write_text(
                _render_history([
                    {"date": "2026-06-05", "variant": "stable"},
                    {"date": "2026-06-04", "variant": "stable"},
                    {"date": "2026-06-03", "variant": "stable"},
                ]),
                encoding="utf-8",
            )
            replay_dir = out_dir / "replay"
            replay_dir.mkdir(parents=True, exist_ok=True)
            (replay_dir / "replay_runs.json").write_text(
                json.dumps([
                    {
                        "runId": "run-1",
                        "generatedAt": "2026-06-04T19:30:00",
                        "analysisDates": ["2026-06-03", "2026-06-04"],
                        "replayRuleSignature": pipeline._current_replay_rule_signature(variant="stable", threshold_profile="current", bar="1m"),
                    }
                ], ensure_ascii=False, indent=2),
                encoding="utf-8",
            )

            with mock.patch("jongga.replay_backtest.run_replay") as run_replay, \
                 mock.patch("jongga.replay_backtest.write_replay_bridge") as write_bridge:
                code, meta = pipeline.run_replay_backtest(
                    analysis_date="2026-06-05",
                    history_js=history_path,
                    out_dir=out_dir,
                    variant="stable",
                    threshold_profile="current",
                )

            self.assertEqual(code, 0)
            self.assertEqual(meta["status"], "complete")
            self.assertTrue(meta["skipped"])
            run_replay.assert_not_called()
            write_bridge.assert_called_once()

    def test_run_replay_backtest_warns_but_keeps_pipeline_green_on_failure(self):
        with TemporaryDirectory() as tmp:
            history_path = Path(tmp) / "jongga_history.js"
            out_dir = Path(tmp) / "jongga" / "output"
            history_path.write_text(
                _render_history([
                    {"date": "2026-06-05", "variant": "stable"},
                    {"date": "2026-06-04", "variant": "stable"},
                    {"date": "2026-06-03", "variant": "stable"},
                ]),
                encoding="utf-8",
            )

            with mock.patch("jongga.replay_backtest.run_replay", side_effect=RuntimeError("boom")), \
                 mock.patch("jongga.replay_backtest.write_replay_bridge") as write_bridge:
                code, meta = pipeline.run_replay_backtest(
                    analysis_date="2026-06-05",
                    history_js=history_path,
                    out_dir=out_dir,
                    variant="stable",
                    threshold_profile="current",
                )

            self.assertEqual(code, 0)
            self.assertEqual(meta["status"], "failed")
            self.assertEqual(meta["message"], "boom")
            write_bridge.assert_called_once()

    def test_main_replay_only_skips_generate_and_outcome_steps(self):
        with mock.patch.object(pipeline, "run_preflight") as run_preflight, \
             mock.patch.object(pipeline, "run_outcome_backfill") as run_outcome_backfill, \
             mock.patch.object(pipeline, "run_generate") as run_generate, \
             mock.patch.object(pipeline, "run_replay_backtest", return_value=(0, {"status": "complete"})) as run_replay_backtest, \
             mock.patch.object(pipeline, "validate_outputs", return_value=(0, {"status": "complete"})) as validate_outputs, \
             mock.patch.object(pipeline, "print_summary") as print_summary, \
             mock.patch.object(pipeline.sys, "argv", ["run_jongga_pipeline.py", "--replay-only"]):
            exit_code = pipeline.main()

        self.assertEqual(exit_code, 0)
        run_preflight.assert_called_once()
        run_outcome_backfill.assert_not_called()
        run_generate.assert_not_called()
        run_replay_backtest.assert_called_once()
        validate_outputs.assert_called_once()
        print_summary.assert_called_once()


if __name__ == "__main__":
    unittest.main()
