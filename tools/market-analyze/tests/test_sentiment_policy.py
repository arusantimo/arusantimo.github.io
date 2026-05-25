from __future__ import annotations

import sys
import unittest
from pathlib import Path


ROOT_DIR = Path(__file__).resolve().parents[1]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from scripts.collectors import status_entry  # noqa: E402
from scripts.result_generator import derive_model_statuses  # noqa: E402
from scripts.sentiment_policy import (  # noqa: E402
    get_sentiment_source_message,
    get_sentiment_status_state,
    normalize_sentiment_source,
)


def build_statuses(disparity_state: str = "ok") -> dict:
    return {
        "disparity": status_entry(disparity_state, "query1.finance.yahoo.com", "이격도 최신 수집"),
        "margin": status_entry("ok", "finance.naver.com", "신용/예탁금 입력 확보"),
        "leaders": status_entry("ok", "finance.naver.com", "대표주 구조 입력 확보"),
    }


class SentimentPolicyTests(unittest.TestCase):
    def test_normalize_sentiment_source_defaults_to_snapshot_when_missing(self) -> None:
        self.assertEqual(
            normalize_sentiment_source("", has_sentiment=True),
            "snapshot-fallback",
        )
        self.assertEqual(
            get_sentiment_status_state("", has_sentiment=True),
            "partial",
        )
        self.assertEqual(
            get_sentiment_source_message("", has_sentiment=True),
            "심리 입력은 최근 저장본 사용",
        )

    def test_derive_model_statuses_marks_live_ai_sentiment_as_ok(self) -> None:
        data = {
            "sentiment": 58,
            "sentimentSource": "live-ai",
            "bullRatio": 50,
        }
        statuses = build_statuses("ok")

        derive_model_statuses(data, statuses)

        self.assertEqual(statuses["soros"]["state"], "ok")
        self.assertIn("AI 추정 최신값", statuses["soros"]["message"])
        self.assertIn("board.naver", statuses["soros"]["source"])

    def test_derive_model_statuses_marks_manual_sentiment_as_ok(self) -> None:
        data = {
            "sentiment": 58,
            "sentimentSource": "manual-confirmed",
            "bullRatio": 50,
        }
        statuses = build_statuses("ok")

        derive_model_statuses(data, statuses)

        self.assertEqual(statuses["soros"]["state"], "ok")
        self.assertIn("수동 확정값", statuses["soros"]["message"])
        self.assertTrue(statuses["soros"]["source"].endswith("manual"))

    def test_derive_model_statuses_marks_snapshot_sentiment_as_partial(self) -> None:
        data = {
            "sentiment": 58,
            "bullRatio": 50,
        }
        statuses = build_statuses("ok")

        derive_model_statuses(data, statuses)

        self.assertEqual(data["sentimentSource"], "snapshot-fallback")
        self.assertEqual(statuses["soros"]["state"], "partial")
        self.assertIn("최근 저장본 사용", statuses["soros"]["message"])


if __name__ == "__main__":
    unittest.main()
