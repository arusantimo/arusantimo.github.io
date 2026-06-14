import unittest

from unittest import mock

from jongga.rescore_credit_balance import rescore_entry, rescore_payload


def _pullback_entry() -> dict:
    return {
        "code": "066570",
        "strictScore": 6.8,
        "signalScore": 6.8,
        "score": 6.8,
        "scoreMax": 11.5,
        "effectiveScoreMax": 11.5,
        "gradeScore": 5.9,
        "grade": "B",
        "gates": [
            {"code": "G14", "status": "✅", "evalStatus": "met", "note": "legacy credit gate"},
        ],
        "scoreBreakdown": [
            {"code": "S2", "strictPoints": 2.0, "signalPoints": 2.0, "maxPoints": 2.0, "evalStatus": "met", "note": "S2"},
            {"code": "P2", "strictPoints": 1.5, "signalPoints": 1.5, "maxPoints": 1.5, "evalStatus": "met", "note": "P2"},
            {"code": "C1", "strictPoints": 1.0, "signalPoints": 1.0, "maxPoints": 1.0, "evalStatus": "met", "note": "C1"},
            {"code": "C5", "strictPoints": 0.0, "signalPoints": 0.0, "maxPoints": 0.5, "evalStatus": "not_met", "note": "C5"},
            {"code": "D1", "strictPoints": 2.5, "signalPoints": 2.5, "maxPoints": 2.5, "evalStatus": "met", "note": "D1"},
            {"code": "D2", "strictPoints": 0.0, "signalPoints": 0.0, "maxPoints": 2.0, "evalStatus": "not_met", "note": "D2"},
            {"code": "D3", "strictPoints": 1.0, "signalPoints": 1.0, "maxPoints": 2.0, "evalStatus": "met", "note": "D3"},
            {"code": "D5", "strictPoints": 0.75, "signalPoints": 0.75, "maxPoints": 1.5, "evalStatus": "met", "note": "legacy credit"},
            {"code": "V1", "strictPoints": 0.75, "signalPoints": 0.75, "maxPoints": 1.0, "evalStatus": "met", "note": "유리한 변동성"},
        ],
        "stockIndicators": {
            "snapshot": {
                "marketCapRank": 22.0,
                "creditBalanceChangePct": -8.0,
                "creditBalanceRatioPct": 3.0,
                "rs20Pct": 80.23,
            }
        },
    }


def _breakout_entry() -> dict:
    return {
        "name": "테스트 돌파",
        "code": "005930",
        "strictScore": 5.0,
        "signalScore": 5.0,
        "score": 5.0,
        "scoreMax": 11.5,
        "effectiveScoreMax": 11.5,
        "gradeScore": 4.3,
        "grade": "C",
        "gates": [],
        "scoreBreakdown": [
            {"code": "RS", "strictPoints": 1.5, "signalPoints": 1.5, "maxPoints": 1.5, "evalStatus": "met", "note": "RS"},
            {"code": "S1", "strictPoints": 2.0, "signalPoints": 2.0, "maxPoints": 2.0, "evalStatus": "met", "note": "S1"},
            {"code": "S2", "strictPoints": 0.0, "signalPoints": 0.0, "maxPoints": 2.0, "evalStatus": "not_met", "note": "S2"},
            {"code": "P1", "strictPoints": 0.0, "signalPoints": 0.75, "maxPoints": 1.5, "evalStatus": "not_met", "note": "P1"},
            {"code": "P2", "strictPoints": 1.5, "signalPoints": 1.5, "maxPoints": 1.5, "evalStatus": "met", "note": "P2"},
            {"code": "C1", "strictPoints": 0.0, "signalPoints": 0.0, "maxPoints": 1.0, "evalStatus": "not_met", "note": "C1"},
            {"code": "C2", "strictPoints": 0.0, "signalPoints": 0.0, "maxPoints": 1.0, "evalStatus": "not_met", "note": "C2"},
            {"code": "C3", "strictPoints": 0.0, "signalPoints": 0.0, "maxPoints": 1.0, "evalStatus": "not_met", "note": "C3"},
            {"code": "L2", "strictPoints": 1.0, "signalPoints": 1.0, "maxPoints": 1.0, "evalStatus": "met", "note": "legacy credit"},
            {"code": "V1", "strictPoints": 0.5, "signalPoints": 0.5, "maxPoints": 1.0, "evalStatus": "met", "note": "변동성"},
        ],
        "stockIndicators": {
            "snapshot": {
                "marketCapRank": 1.0,
                "currentPrice": 101000.0,
                "high20d": 100000.0,
                "toss": {"avgStrength": 115.0, "intradayAbove100Ratio": 75.0},
                "orderbook": {"bidAskRatio": 1.25},
            }
        },
    }


class RescoreCreditBalanceTest(unittest.TestCase):
    def test_rescore_entry_pullback_adds_d4_only(self):
        entry = _pullback_entry()

        changed = rescore_entry(entry, "pullback", {"066570": -12.0})

        breakdown_by_code = {row["code"]: row for row in entry["scoreBreakdown"]}
        self.assertEqual(breakdown_by_code["D4"]["evalStatus"], "met")
        self.assertAlmostEqual(breakdown_by_code["D4"]["strictPoints"], 1.5)
        self.assertAlmostEqual(breakdown_by_code["D4"]["maxPoints"], 1.5)
        self.assertNotIn("D5", breakdown_by_code)

        self.assertEqual(entry["strictScore"], 7.9)
        self.assertEqual(entry["signalScore"], 7.9)
        self.assertEqual(entry["score"], 7.9)
        self.assertEqual(entry["scoreMax"], 13.0)
        self.assertEqual(entry["effectiveScoreMax"], 13.0)
        self.assertEqual(entry["gradeScore"], 6.1)
        self.assertEqual(entry["grade"], "B")

        snapshot = entry["stockIndicators"]["snapshot"]
        self.assertEqual(snapshot["shortBalanceChangePct"], -12.0)
        self.assertNotIn("creditBalanceChangePct", snapshot)
        self.assertEqual(entry["gates"], [])
        self.assertIsNotNone(changed)
        self.assertIn("strictScore", changed["changedFields"])

    def test_rescore_entry_missing_short_balance_data_marks_d4_missing(self):
        entry = _pullback_entry()

        rescore_entry(entry, "pullback", short_balance_map={})

        snapshot = entry["stockIndicators"]["snapshot"]
        self.assertNotIn("shortBalanceChangePct", snapshot)
        self.assertNotIn("creditBalanceChangePct", snapshot)

        breakdown_by_code = {row["code"]: row for row in entry["scoreBreakdown"]}
        self.assertEqual(breakdown_by_code["D4"]["evalStatus"], "data_missing")
        self.assertNotIn("D5", breakdown_by_code)

    def test_rescore_entry_breakout_adds_l1_and_signal_score(self):
        entry = _breakout_entry()

        changed = rescore_entry(
            entry,
            "breakout",
            short_balance_map={"005930": 12.0},
        )

        breakdown_by_code = {row["code"]: row for row in entry["scoreBreakdown"]}
        self.assertEqual(breakdown_by_code["L1"]["evalStatus"], "met")
        self.assertNotIn("L2", breakdown_by_code)
        self.assertGreater(entry["strictScore"], 5.0)
        self.assertGreaterEqual(entry["signalScore"], entry["strictScore"])
        self.assertEqual(entry["score"], entry["signalScore"])
        self.assertIn("signalScore", changed["changedFields"])

    def test_rescore_payload_records_short_only_meta(self):
        payload = {
            "analysisDate": "2026-06-11",
            "generatedAt": "2026-06-11T15:40:00+09:00",
            "pointInTimeStatus": "legacy_unknown",
            "slots": [{
                "entries": {
                    "pullback": [],
                    "accumulation": [],
                    "breakout": [_breakout_entry()],
                    "reversal": [],
                }
            }],
        }

        short_result = mock.Mock(
            values={"005930": 12.0},
            provider_health={"krx_pykrx_short_balance": {"ok": 1}},
        )

        with mock.patch("jongga.rescore_credit_balance.collect_short_balance_trend", return_value=short_result):
            rescored = rescore_payload(payload)

        self.assertEqual(rescored["pointInTimeStatus"], "confirmed")
        self.assertIn("changedEntries", rescored["rescoreMeta"])
        self.assertEqual(rescored["rescoreMeta"]["sourcePointInTimeStatus"], "confirmed")
        self.assertEqual(sorted(rescored["rescoreMeta"]["rescoredRules"]["breakout"]), ["L1"])
        self.assertIn("krx_pykrx_short_balance", rescored["rescoreMeta"]["providerHealth"])
        self.assertNotIn("creditBalanceCodes", rescored["rescoreMeta"])


if __name__ == "__main__":
    unittest.main()
