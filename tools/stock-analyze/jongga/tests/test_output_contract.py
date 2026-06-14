import json
import unittest
from datetime import date
from pathlib import Path
from tempfile import TemporaryDirectory

from jongga.output_contract import (
    POINT_IN_TIME_HISTORY_START_DATE,
    ANALYSIS_SESSION_1500,
    INPUT_ARCHIVE_VERSION,
    PAYLOAD_SOURCE_LIVE,
    POINT_IN_TIME_STATUS_CONFIRMED,
    POINT_IN_TIME_STATUS_HISTORICAL_REGEN,
    POINT_IN_TIME_STATUS_LEGACY_UNKNOWN,
    VARIANT_CANARY,
    VARIANT_STABLE,
    build_input_archive_path,
    build_session_archive_path,
    extract_top_recommendations,
    infer_payload_point_in_time_status,
    is_canary_channel_enabled,
    is_point_in_time_run,
    point_in_time_status,
    payload_with_analysis_date,
    previous_trading_day,
    resolve_analysis_date,
    resolve_generation_variants,
    resolve_outcome_variant_filter,
    update_history_index,
    write_daily_outputs,
)


class OutputContractTests(unittest.TestCase):
    def test_extract_top_recommendations_groups_by_strategy_without_global_sort(self):
        payload = {
            "slots": [
                {
                    "entries": {
                        "pullback": [{"name": "A", "code": "000010", "score": 5.0, "signalScore": 5.0, "strictScore": 5.0, "grade": "C"}],
                        "breakout": [{"name": "B", "code": "000020", "score": 9.0, "signalScore": 9.0, "strictScore": 8.0, "grade": "S"}],
                        "accumulation": [{"name": "D", "code": "000040", "score": 7.0, "signalScore": 7.0, "strictScore": 7.0, "grade": "A"}],
                        "reversal": [{"name": "C", "code": "000030", "score": 10.0, "signalScore": 10.0, "strictScore": 10.0, "grade": "S"}],
                    }
                }
            ]
        }

        rows = extract_top_recommendations(payload, per_strategy=1)

        self.assertEqual(len(rows), 4)
        self.assertEqual([row["strategy"] for row in rows], ["pullback", "accumulation", "breakout", "reversal"])
        self.assertEqual(rows[0]["code"], "000010")
        self.assertEqual(rows[1]["code"], "000040")
        self.assertEqual(rows[2]["code"], "000020")
        self.assertEqual(rows[3]["code"], "000030")
        self.assertEqual(rows[2]["scoreScope"], "breakout")
        self.assertNotEqual(rows[0]["code"], "000030")

    def test_resolve_generation_variants_skips_canary_when_disabled(self):
        self.assertFalse(is_canary_channel_enabled())
        self.assertEqual(resolve_generation_variants("all"), [VARIANT_STABLE])
        self.assertEqual(resolve_generation_variants("stable"), [VARIANT_STABLE])
        self.assertEqual(resolve_generation_variants("canary"), [])

    def test_resolve_outcome_variant_filter_maps_all_to_stable_when_disabled(self):
        self.assertEqual(resolve_outcome_variant_filter("all"), VARIANT_STABLE)
        self.assertEqual(resolve_outcome_variant_filter("stable"), VARIANT_STABLE)
        with self.assertRaises(ValueError):
            resolve_outcome_variant_filter("canary")

    def test_resolve_analysis_date_rewinds_implicit_weekend_to_previous_trading_day(self):
        self.assertEqual(resolve_analysis_date(today=date(2026, 6, 7)), date(2026, 6, 5))
        self.assertEqual(previous_trading_day(date(2026, 6, 6)), date(2026, 6, 5))

    def test_resolve_analysis_date_rejects_explicit_weekend(self):
        with self.assertRaisesRegex(ValueError, "주말 날짜"):
            resolve_analysis_date("2026-06-07")

    def test_is_point_in_time_run_true_for_natural_analysis_date(self):
        # 2026-06-08(월)에 --date 없이 실행하면 자연 분석일은 2026-06-08
        self.assertTrue(is_point_in_time_run(date(2026, 6, 8), today=date(2026, 6, 8)))

    def test_is_point_in_time_run_false_for_weekend_no_date_execution(self):
        self.assertFalse(is_point_in_time_run(date(2026, 6, 5), today=date(2026, 6, 7)))

    def test_is_point_in_time_run_false_for_past_date_regen(self):
        # 2026-06-14에 5/22 데이터를 재생성하면 vintage 오염 위험
        self.assertFalse(is_point_in_time_run(date(2026, 5, 22), today=date(2026, 6, 14)))

    def test_explicit_date_marks_historical_regen_even_on_same_day(self):
        self.assertEqual(
            point_in_time_status(date(2026, 6, 8), today=date(2026, 6, 8), explicit_date_used=True),
            POINT_IN_TIME_STATUS_HISTORICAL_REGEN,
        )

    def test_payload_with_analysis_date_stamps_point_in_time_fields(self):
        payload = payload_with_analysis_date({}, date(2026, 5, 22), variant=VARIANT_STABLE, today=date(2026, 5, 22))
        self.assertIn("pointInTime", payload)
        self.assertIsInstance(payload["pointInTime"], bool)
        self.assertEqual(payload["pointInTimeStatus"], POINT_IN_TIME_STATUS_CONFIRMED)

    def test_infer_payload_point_in_time_status_marks_missing_meta_as_legacy_unknown(self):
        self.assertEqual(infer_payload_point_in_time_status({}), POINT_IN_TIME_STATUS_LEGACY_UNKNOWN)

    def test_infer_payload_point_in_time_status_upgrades_legacy_unknown_when_generated_same_day(self):
        payload = {
            "analysisDate": "2026-06-09",
            "generatedAt": "2026-06-09T15:40:00+09:00",
            "pointInTime": False,
            "pointInTimeStatus": POINT_IN_TIME_STATUS_LEGACY_UNKNOWN,
        }
        self.assertEqual(infer_payload_point_in_time_status(payload), POINT_IN_TIME_STATUS_CONFIRMED)

    def test_infer_payload_point_in_time_status_upgrades_legacy_unknown_when_generated_later(self):
        payload = {
            "analysisDate": "2026-06-05",
            "generatedAt": "2026-06-08T22:00:00+09:00",
            "pointInTime": False,
            "pointInTimeStatus": POINT_IN_TIME_STATUS_LEGACY_UNKNOWN,
        }
        self.assertEqual(infer_payload_point_in_time_status(payload), POINT_IN_TIME_STATUS_HISTORICAL_REGEN)

    def test_write_daily_outputs_writes_input_archive_and_history_metadata(self):
        with TemporaryDirectory() as tmp:
            out_dir = Path(tmp) / "jongga" / "output"
            history_js = out_dir / "jongga_history.js"
            payload = {
                "analysisDate": "2026-06-08",
                "variant": VARIANT_STABLE,
                "generatedAt": "2026-06-08T15:40:00+09:00",
                "payloadSourceMode": PAYLOAD_SOURCE_LIVE,
                "rebuildable": True,
                "inputArchiveVersion": INPUT_ARCHIVE_VERSION,
                "slots": [{"entries": {"pullback": []}}],
                "dataQuality": {"status": "partial"},
            }
            archive = {
                "schemaVersion": INPUT_ARCHIVE_VERSION,
                "analysisDate": "2026-06-08",
                "variant": VARIANT_STABLE,
            }

            json_path, js_path, history_path = write_daily_outputs(
                payload,
                out_dir,
                history_js,
                variant=VARIANT_STABLE,
                input_archive=archive,
            )

            self.assertTrue(json_path.exists())
            self.assertTrue(js_path.exists())
            self.assertTrue(history_path.exists())
            archive_path = build_input_archive_path(out_dir, date(2026, 6, 8), variant=VARIANT_STABLE)
            self.assertTrue(archive_path.exists())
            history_text = history_path.read_text(encoding="utf-8")
            self.assertIn("inputArchiveFile", history_text)
            self.assertIn("payloadSourceMode", history_text)
            self.assertIn("rebuildable", history_text)
            self.assertIn("jongga/output/archive/202606/inputs_20260608.json", history_text.replace("\\\\", "/"))
            written_payload = json.loads(json_path.read_text(encoding="utf-8"))
            self.assertEqual(written_payload["pointInTimeStatus"], POINT_IN_TIME_STATUS_CONFIRMED)
            self.assertTrue(written_payload["pointInTime"])

    def test_build_session_archive_path_uses_date_session_and_variant(self):
        stable_path = build_session_archive_path("jongga/output", date(2026, 6, 8), session=ANALYSIS_SESSION_1500, variant=VARIANT_STABLE)
        canary_path = build_session_archive_path("jongga/output", date(2026, 6, 8), session=ANALYSIS_SESSION_1500, variant=VARIANT_CANARY)
        self.assertEqual(stable_path.as_posix(), "jongga/output/archive/202606/session_20260608_1500.json")
        self.assertEqual(canary_path.as_posix(), "jongga/output/archive/202606/session_20260608_1500_canary.json")

    def test_write_daily_outputs_rejects_weekend_analysis_date(self):
        with TemporaryDirectory() as tmp:
            out_dir = Path(tmp) / "jongga" / "output"
            history_js = out_dir / "jongga_history.js"
            payload = {
                "analysisDate": "2026-06-07",
                "variant": VARIANT_STABLE,
                "generatedAt": "2026-06-07T15:40:00+09:00",
                "slots": [{"entries": {"pullback": []}}],
                "dataQuality": {"status": "partial"},
            }

            with self.assertRaisesRegex(ValueError, "주말 날짜"):
                write_daily_outputs(payload, out_dir, history_js, variant=VARIANT_STABLE)

    def test_update_history_index_drops_existing_weekend_rows(self):
        rows = update_history_index(
            [
                {"date": "2026-06-07", "variant": VARIANT_STABLE},
                {"date": "2026-06-06", "variant": VARIANT_STABLE},
                {"date": "2026-06-08", "variant": VARIANT_STABLE},
            ],
            {"date": "2026-06-09", "variant": VARIANT_STABLE},
        )

        self.assertEqual(
            [row["date"] for row in rows],
            ["2026-06-09", "2026-06-08"],
        )

    def test_update_history_index_drops_entries_before_active_window(self):
        rows = update_history_index(
            [
                {"date": "2026-06-09", "variant": VARIANT_STABLE},
                {"date": "2026-06-05", "variant": VARIANT_STABLE},
            ],
            {"date": POINT_IN_TIME_HISTORY_START_DATE.isoformat(), "variant": VARIANT_STABLE},
        )

        self.assertEqual(
            [row["date"] for row in rows],
            ["2026-06-09", POINT_IN_TIME_HISTORY_START_DATE.isoformat()],
        )


if __name__ == "__main__":
    unittest.main()
