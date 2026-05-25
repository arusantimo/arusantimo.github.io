from __future__ import annotations

import sys
import unittest
from pathlib import Path
from unittest.mock import patch


ROOT_DIR = Path(__file__).resolve().parents[1]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from scripts.anchor_collectors import (  # noqa: E402
    LEADER_PICK_COUNT,
    LEADER_SECTOR_MAX_COUNT,
    LEADER_WEIGHT_CAP,
    apply_leader_weight_cap,
    collect_export_momentum,
    is_preferred_leader_candidate,
    merge_export_patch_with_cache,
    normalize_leader_issuer_name,
    parse_indicator_page_export_data,
    parse_tradingeconomics_export_summary,
    select_leader_stocks_with_sector_cap,
    select_leader_stocks_with_issuer_cap,
)


class AnchorCollectorsTests(unittest.TestCase):
    def test_indicator_page_uses_script_month_array_when_label_block_missing(self) -> None:
        parsed = parse_indicator_page_export_data(
            """
            <html>
              <script>
                var vPrdDeArry = ['2026.01','2026.02','2026.03','2026.04'];
              </script>
            </html>
            """
        )

        self.assertEqual(parsed["latestMonth"], "202604")
        self.assertIsNone(parsed["exportValueUsd"])

    def test_tradingeconomics_summary_accepts_current_wording(self) -> None:
        parsed = parse_tradingeconomics_export_summary(
            """
            <html>
              <body>
                South Korea's exports decreased to 85890 USD Million in April
                from 86630 USD Million in March 2026.
              </body>
            </html>
            """
        )

        self.assertEqual(parsed["latestMonth"], "202604")
        self.assertEqual(parsed["exportValueUsd"], 85890)

    def test_merge_export_patch_prefers_richer_same_month_snapshot(self) -> None:
        with patch(
            "scripts.anchor_collectors.load_anchor_component_cache",
            return_value={
                "dataPatch": {
                    "exportLatestMonth": "202604",
                    "exportValueUsd": 85890.0,
                    "exportYoY": 48.0,
                    "exportYoYDelta": -1.2,
                    "export3mAvgYoY": None,
                }
            },
        ), patch(
            "scripts.anchor_collectors.load_best_export_result_patch",
            return_value={
                "exportLatestMonth": "202604",
                "exportValueUsd": 85890.0,
                "exportYoY": 48.0,
                "exportYoYDelta": -1.2,
                "export3mAvgYoY": 41.97,
            },
        ):
            merged = merge_export_patch_with_cache(
                {
                    "exportLatestMonth": "202604",
                    "exportValueUsd": 85890.0,
                    "exportYoY": 48.0,
                    "exportYoYDelta": -1.2,
                    "export3mAvgYoY": None,
                }
            )

        self.assertEqual(merged["export3mAvgYoY"], 41.97)

    def test_public_sources_win_even_without_kosis_key(self) -> None:
        with patch(
            "scripts.anchor_collectors.fetch_indicator_page_export_data",
            return_value={"latestMonth": "202604", "exportValueUsd": 85890.0},
        ), patch(
            "scripts.anchor_collectors.fetch_tradingeconomics_export_data",
            return_value={
                "latestMonth": "202604",
                "exportValueUsd": 85890.0,
                "exportYoY": 48.0,
                "exportYoYDelta": -1.2,
                "export3mAvgYoY": None,
            },
        ), patch("scripts.anchor_collectors.save_anchor_component_cache"):
            result = collect_export_momentum({}, {})

        self.assertEqual(result.status["state"], "ok")
        self.assertEqual(result.status["message"], "수출 모멘텀 202604 기준 갱신")
        self.assertIn("tradingeconomics.com", result.status["source"])
        self.assertNotIn("KOSIS API 키", result.status["message"])

    def test_public_success_masks_invalid_kosis_key(self) -> None:
        with patch(
            "scripts.anchor_collectors.fetch_indicator_page_export_data",
            return_value={"latestMonth": "202604", "exportValueUsd": 85890.0},
        ), patch(
            "scripts.anchor_collectors.fetch_tradingeconomics_export_data",
            return_value={
                "latestMonth": "202604",
                "exportValueUsd": 85890.0,
                "exportYoY": 48.0,
                "exportYoYDelta": -1.2,
                "export3mAvgYoY": None,
            },
        ), patch(
            "scripts.anchor_collectors.fetch_text",
            side_effect=ValueError("유효하지 않은 인증KEY입니다."),
        ), patch("scripts.anchor_collectors.save_anchor_component_cache"):
            result = collect_export_momentum({}, {"kosisApiKey": "invalid"})

        self.assertEqual(result.status["state"], "ok")
        self.assertEqual(result.status["message"], "수출 모멘텀 202604 기준 갱신")
        self.assertNotIn("인증KEY", result.status["message"])

    def test_indicator_page_only_is_partial_not_error(self) -> None:
        with patch(
            "scripts.anchor_collectors.fetch_indicator_page_export_data",
            return_value={"latestMonth": "202604", "exportValueUsd": 85890.0},
        ), patch(
            "scripts.anchor_collectors.fetch_tradingeconomics_export_data",
            side_effect=ValueError("summary parse failed"),
        ):
            result = collect_export_momentum({}, {})

        self.assertEqual(result.status["state"], "partial")
        self.assertIn("KOSIS 공개 페이지 기준 최신 발표월/레벨 반영", result.status["message"])
        self.assertEqual(result.data_patch["exportLatestMonth"], "202604")

    def test_normalize_leader_issuer_name_strips_preferred_suffix(self) -> None:
        self.assertEqual(normalize_leader_issuer_name("삼성전자우"), "삼성전자")
        self.assertEqual(normalize_leader_issuer_name("미래에셋증권2우B"), "미래에셋증권")
        self.assertEqual(normalize_leader_issuer_name("현대차"), "현대차")

    def test_preferred_flag_detects_preferred_share_names(self) -> None:
        self.assertTrue(is_preferred_leader_candidate({"name": "삼성전자우"}))
        self.assertTrue(is_preferred_leader_candidate({"name": "미래에셋증권2우B"}))
        self.assertFalse(is_preferred_leader_candidate({"name": "삼성전자"}))

    def test_select_leader_stocks_with_issuer_cap_prefers_common_stock(self) -> None:
        selected = select_leader_stocks_with_issuer_cap(
            [
                {"code": "005935", "name": "삼성전자우", "cum15dTradingValue": 120},
                {"code": "005930", "name": "삼성전자", "cum15dTradingValue": 100},
                {"code": "000660", "name": "SK하이닉스", "cum15dTradingValue": 95},
                {"code": "066570", "name": "LG전자", "cum15dTradingValue": 80},
                {"code": "005380", "name": "현대차", "cum15dTradingValue": 70},
                {"code": "000270", "name": "기아", "cum15dTradingValue": 60},
                {"code": "035420", "name": "NAVER", "cum15dTradingValue": 50},
                {"code": "105560", "name": "KB금융", "cum15dTradingValue": 40},
            ],
            LEADER_PICK_COUNT,
        )

        self.assertEqual(len(selected), LEADER_PICK_COUNT)
        self.assertIn("005930", [item["code"] for item in selected])
        self.assertNotIn("005935", [item["code"] for item in selected])
        self.assertEqual(
            len({normalize_leader_issuer_name(item["name"]) for item in selected}),
            len(selected),
        )

    def test_select_leader_stocks_with_sector_cap_limits_two_per_sector(self) -> None:
        selection = select_leader_stocks_with_sector_cap(
            [
                {"code": "A1", "name": "섹터A-1", "industryCode": "A", "cum15dTradingValue": 1200},
                {"code": "A2", "name": "섹터A-2", "industryCode": "A", "cum15dTradingValue": 1100},
                {"code": "A3", "name": "섹터A-3", "industryCode": "A", "cum15dTradingValue": 1000},
                {"code": "B1", "name": "섹터B-1", "industryCode": "B", "cum15dTradingValue": 900},
                {"code": "B2", "name": "섹터B-2", "industryCode": "B", "cum15dTradingValue": 800},
                {"code": "C1", "name": "섹터C-1", "industryCode": "C", "cum15dTradingValue": 700},
                {"code": "D1", "name": "섹터D-1", "industryCode": "D", "cum15dTradingValue": 600},
            ],
            LEADER_PICK_COUNT,
            LEADER_SECTOR_MAX_COUNT,
        )

        selected = selection["selected"]
        self.assertEqual(len(selected), LEADER_PICK_COUNT)
        self.assertEqual(len(selection["skippedBySector"]), 1)
        self.assertEqual([item["code"] for item in selected], ["A1", "A2", "B1", "B2", "C1", "D1"])
        sector_counts = {}
        for item in selected:
            sector_counts[item["industryCode"]] = sector_counts.get(item["industryCode"], 0) + 1
        self.assertEqual(sector_counts, {"A": 2, "B": 2, "C": 1, "D": 1})

    def test_apply_leader_weight_cap_limits_single_stock_to_35_percent(self) -> None:
        weighted = apply_leader_weight_cap(
            [
                {"code": "A1", "name": "A1", "cum15dTradingValue": 1200},
                {"code": "A2", "name": "A2", "cum15dTradingValue": 1100},
                {"code": "B1", "name": "B1", "cum15dTradingValue": 300},
                {"code": "B2", "name": "B2", "cum15dTradingValue": 200},
                {"code": "C1", "name": "C1", "cum15dTradingValue": 120},
                {"code": "D1", "name": "D1", "cum15dTradingValue": 80},
            ],
            LEADER_WEIGHT_CAP,
        )

        self.assertEqual(len(weighted), LEADER_PICK_COUNT)
        self.assertEqual(sum(1 for item in weighted if item.get("weightCapApplied")), 2)
        self.assertTrue(all(item["weight"] <= LEADER_WEIGHT_CAP + 1e-9 for item in weighted))
        self.assertAlmostEqual(sum(item["weight"] for item in weighted), 1.0, places=9)


if __name__ == "__main__":
    unittest.main()
