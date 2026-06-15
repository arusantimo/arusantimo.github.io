import unittest
from datetime import date
from pathlib import Path
from tempfile import TemporaryDirectory

from jongga import outcome_tracker as ot


def _rows(*dates):
    """최신순 Naver 시세 행 생성 (dates는 YYYYMMDD, 최신부터)."""
    out = []
    for i, d in enumerate(dates):
        base = 10000 + i
        out.append({
            "localTradedAt": d,
            "openPrice": str(base),
            "highPrice": str(base + 500),
            "lowPrice": str(base - 300),
            "closePrice": str(base + 100),
            "accumulatedTradingVolume": "1000",
        })
    return out


def _plan(targets, stop):
    """단순 trade_plan_rows (targetPrice, qty) 구성."""
    rows = [
        {"stage": "🌅 프리마켓", "quantity": "40% 익절", "targetYield": f"+{targets[0][1]}%", "targetPrice": f"{targets[0][0]:,}원"},
        {"stage": "🔔 장초반", "quantity": "30% 익절", "targetYield": f"+{targets[1][1]}%", "targetPrice": f"{targets[1][0]:,}원"},
        {"stage": "📈 장중 1차", "quantity": "30% 익절", "targetYield": f"+{targets[2][1]}%", "targetPrice": f"{targets[2][0]:,}원"},
        {"stage": "🛑 손절", "quantity": "전량", "targetYield": f"{stop[1]}%", "targetPrice": f"{stop[0]:,}원"},
    ]
    return rows


class NextTradingDayTest(unittest.TestCase):
    def test_index_minus_one_skips_weekend(self):
        # 금(0605) → 그 다음 거래일은 월(0608); rows는 최신순
        rows = _rows("20260609", "20260608", "20260605", "20260604")
        status, next_date, ohlc = ot.next_trading_day_ohlc("2026-06-05", rows)
        self.assertEqual(status, "resolved")
        self.assertEqual(next_date, "20260608")
        self.assertIsNotNone(ohlc)

    def test_pending_when_entry_is_latest(self):
        rows = _rows("20260605", "20260604")
        status, next_date, ohlc = ot.next_trading_day_ohlc("2026-06-05", rows)
        self.assertEqual(status, "pending")
        self.assertIsNone(ohlc)

    def test_no_data_when_missing(self):
        rows = _rows("20260604", "20260603")
        status, next_date, ohlc = ot.next_trading_day_ohlc("2026-06-05", rows)
        self.assertEqual(status, "no_data")


class ComputeOutcomeTest(unittest.TestCase):
    def setUp(self):
        self.identity = {"date": "2026-06-03", "variant": "stable", "strategy": "pullback", "code": "000010"}

    def test_hits_and_best_stage(self):
        # entry 10000; high 10620 hits premarket(10200)+open(10400)+intraday1(10600); low 9900 > stop 9700
        plan = _plan([(10200, 2.0), (10400, 4.0), (10600, 6.0)], (9700, -3.0))
        ohlc = {"open": 10000, "high": 10620, "low": 9900, "close": 10500}
        rec = ot.compute_outcome(self.identity, plan, 10000, "20260604", ohlc)
        self.assertEqual(rec["outcomeStatus"], "resolved")
        self.assertFalse(rec["stopHit"])
        self.assertEqual(rec["bestStageHit"], "intraday1")
        self.assertTrue(all(s["hit"] for s in rec["stages"]))
        self.assertGreater(rec["realizedReturnProxy"], 0)

    def test_stop_only(self):
        # high never reaches premarket(10200); low 9600 <= stop 9700
        plan = _plan([(10200, 2.0), (10400, 4.0), (10600, 6.0)], (9700, -3.0))
        ohlc = {"open": 10000, "high": 10100, "low": 9600, "close": 9700}
        rec = ot.compute_outcome(self.identity, plan, 10000, "20260604", ohlc)
        self.assertTrue(rec["stopHit"])
        self.assertIsNone(rec["bestStageHit"])
        self.assertEqual(rec["outcomeStatus"], "resolved")
        self.assertAlmostEqual(rec["realizedReturnProxy"], -0.03, places=4)

    def test_stop_first_ambiguous(self):
        # both a target hit AND stop hit on same day → ambiguous
        plan = _plan([(10200, 2.0), (10400, 4.0), (10600, 6.0)], (9700, -3.0))
        ohlc = {"open": 10000, "high": 10300, "low": 9600, "close": 9800}
        rec = ot.compute_outcome(self.identity, plan, 10000, "20260604", ohlc)
        self.assertTrue(rec["stopHit"])
        self.assertEqual(rec["bestStageHit"], "premarket")
        self.assertEqual(rec["outcomeStatus"], "stop_first_ambiguous")


class EntryPriceResolutionTest(unittest.TestCase):
    def test_session_entry_without_explicit_entry_price_does_not_fallback_to_current_price(self):
        entry = {
            "analysisSession": "1500",
            "currentPrice": 12345.0,
        }
        self.assertEqual(ot.resolve_outcome_entry_price(entry), 0.0)

    def test_legacy_entry_can_still_fallback_to_current_price(self):
        entry = {
            "currentPrice": 12345.0,
        }
        self.assertEqual(ot.resolve_outcome_entry_price(entry), 12345.0)


class RollupTest(unittest.TestCase):
    def test_two_granularities_and_ambiguous_excluded(self):
        index = [
            {"strategy": "pullback", "regimeBucket": "bull", "vkospiTier": "strong", "gapGrade": "G-A",
             "outcomeStatus": "resolved", "realizedReturnProxy": 0.05,
             "stages": [{"stageKey": "premarket", "hit": True}, {"stageKey": "openPhase", "hit": False}]},
            {"strategy": "pullback", "regimeBucket": "bull", "vkospiTier": "strong", "gapGrade": "G-A",
             "outcomeStatus": "stop_first_ambiguous", "realizedReturnProxy": -0.02,
             "stages": [{"stageKey": "premarket", "hit": True}, {"stageKey": "openPhase", "hit": False}]},
            {"strategy": "pullback", "regimeBucket": "bull", "vkospiTier": "strong", "gapGrade": "G-A",
             "outcomeStatus": "no_data"},
        ]
        rollup = ot.build_rollup(index)
        cell = rollup["byStrategyStage"]["pullback|premarket"]
        # 2 resolved/ambiguous samples (no_data excluded), both premarket hit
        self.assertEqual(cell["sampleCount"], 2)
        self.assertEqual(cell["hitRate"], 1.0)
        # avgRealizedReturn excludes the ambiguous record → only 0.05
        self.assertAlmostEqual(cell["avgRealizedReturn"], 0.05, places=4)
        self.assertIn("pullback|bull|strong|G-A|premarket", rollup["byCell"])


class StoreRoundTripTest(unittest.TestCase):
    def test_dedup_idempotent_and_roundtrip(self):
        with TemporaryDirectory() as tmp:
            path = Path(tmp) / "jongga_outcomes.js"
            rec = {"date": "2026-06-03", "variant": "stable", "strategy": "pullback", "code": "000010",
                   "outcomeStatus": "resolved", "stages": [], "realizedReturnProxy": 0.01}
            index = ot.update_outcomes_index([], rec)
            index = ot.update_outcomes_index(index, dict(rec))  # same key again
            self.assertEqual(len(index), 1)
            path.write_text(ot.render_outcomes_js(index, ot.build_rollup(index)), encoding="utf-8")
            self.assertEqual(len(ot.read_outcomes_index(path)), 1)
            self.assertIn("byCell", ot.read_outcomes_rollup(path))

    def test_prune_outcomes_index_for_blacklisted_codes_removes_matching_day_only(self):
        index = [
            {"date": "2026-06-12", "variant": "stable", "strategy": "reversal", "code": "095340"},
            {"date": "2026-06-12", "variant": "stable", "strategy": "pullback", "code": "000010"},
            {"date": "2026-06-11", "variant": "stable", "strategy": "reversal", "code": "095340"},
        ]
        pruned = ot.prune_outcomes_index_for_blacklisted_codes(
            index,
            date_str="2026-06-12",
            variant="stable",
            excluded_codes={"095340"},
        )
        self.assertEqual(len(pruned), 2)
        self.assertNotIn(("2026-06-12", "stable", "reversal", "095340"), {ot.outcome_key(item) for item in pruned})
        self.assertIn(("2026-06-11", "stable", "reversal", "095340"), {ot.outcome_key(item) for item in pruned})


if __name__ == "__main__":
    unittest.main()
