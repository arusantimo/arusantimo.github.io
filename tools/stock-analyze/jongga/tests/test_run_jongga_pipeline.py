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
    def test_select_replay_dates_from_history_uses_recent_month_and_skips_latest_day(self):
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
                window_months=1,
            )

            self.assertEqual(replay_dates, [date(2026, 6, 2), date(2026, 6, 3)])

    def test_run_replay_backtest_uses_current_stable_recent_month_defaults(self):
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
                    window_months=1,
                )

            self.assertEqual(code, 0)
            self.assertEqual(meta["status"], "complete")
            kwargs = run_replay.call_args.kwargs
            self.assertEqual(kwargs["variant"], "stable")
            self.assertEqual(kwargs["threshold_profile"], "current")
            self.assertEqual(kwargs["analysis_dates"], [date(2026, 6, 1), date(2026, 6, 2), date(2026, 6, 3)])

    def test_select_replay_dates_from_history_falls_back_to_available_dates_when_no_month_window(self):
        with TemporaryDirectory() as tmp:
            history_path = Path(tmp) / "jongga_history.js"
            history_path.write_text(
                _render_history([
                    {"date": "2026-06-05", "variant": "stable"},
                    {"date": "2026-04-30", "variant": "stable"},
                ]),
                encoding="utf-8",
            )

            replay_dates = pipeline.select_replay_dates_from_history(
                history_js=history_path,
                cutoff_date=date(2026, 6, 5),
                variant="stable",
                window_months=1,
            )

            self.assertEqual(replay_dates, [date(2026, 4, 30)])

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
                    window_months=1,
                )

            self.assertEqual(code, 0)
            self.assertEqual(meta["status"], "failed")
            self.assertEqual(meta["message"], "boom")
            write_bridge.assert_called_once()


if __name__ == "__main__":
    unittest.main()
