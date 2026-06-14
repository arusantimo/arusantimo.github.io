"""전략 품질 게이트(Q1) 단위 테스트.

임계값과 판정 로직(통과/차단/데이터부족)을 고정한다. 백테스트로 검증된
방향성 — '진짜 눌림·실제 매집·과열 아닌 반등'만 통과 — 을 회귀로 보호한다.
"""

import unittest

from jongga.strategy_quality import (
    ACCUMULATION_MIN_FOREIGN_RATE_PCT,
    PULLBACK_MIN_DROP_FROM_52W_PCT,
    REVERSAL_MAX_RSI14,
    evaluate_accumulation_quality,
    evaluate_pullback_quality,
    evaluate_quality_from_indicators,
    evaluate_reversal_quality,
)


class PullbackQualityTest(unittest.TestCase):
    def test_genuine_pullback_passes(self):
        v = evaluate_pullback_quality(
            drop_from_52w_high_pct=18.0, volume_ratio_20d_pct=120.0, supply_trend_score=2.0
        )
        self.assertEqual(v.status, "met")
        self.assertTrue(v.passed)

    def test_shallow_pullback_blocked(self):
        # 고가권 얕은 조정 = 추격 → 차단
        v = evaluate_pullback_quality(
            drop_from_52w_high_pct=5.0, volume_ratio_20d_pct=120.0, supply_trend_score=2.0
        )
        self.assertTrue(v.blocked)
        self.assertIn("얕은 조정", v.note)

    def test_supply_outflow_blocked(self):
        v = evaluate_pullback_quality(
            drop_from_52w_high_pct=18.0, volume_ratio_20d_pct=120.0, supply_trend_score=-1.0
        )
        self.assertTrue(v.blocked)
        self.assertIn("수급 이탈", v.note)

    def test_low_volume_blocked(self):
        v = evaluate_pullback_quality(
            drop_from_52w_high_pct=18.0, volume_ratio_20d_pct=40.0, supply_trend_score=2.0
        )
        self.assertTrue(v.blocked)

    def test_missing_data_passes_conservatively(self):
        v = evaluate_pullback_quality(
            drop_from_52w_high_pct=None, volume_ratio_20d_pct=120.0, supply_trend_score=2.0
        )
        self.assertEqual(v.status, "data_missing")
        self.assertTrue(v.passed)

    def test_boundary_is_inclusive(self):
        v = evaluate_pullback_quality(
            drop_from_52w_high_pct=PULLBACK_MIN_DROP_FROM_52W_PCT,
            volume_ratio_20d_pct=80.0,
            supply_trend_score=0.0,
        )
        self.assertEqual(v.status, "met")


class AccumulationQualityTest(unittest.TestCase):
    def test_real_accumulation_passes(self):
        v = evaluate_accumulation_quality(foreign_rate_pct=35.0, rs20_pct=4.0)
        self.assertEqual(v.status, "met")

    def test_falling_knife_blocked(self):
        # 20일 약세 = 매집이 가격을 지탱 못 함 → 차단
        v = evaluate_accumulation_quality(foreign_rate_pct=35.0, rs20_pct=-3.0)
        self.assertTrue(v.blocked)
        self.assertIn("낙하 칼날", v.note)

    def test_no_foreign_base_blocked(self):
        v = evaluate_accumulation_quality(
            foreign_rate_pct=ACCUMULATION_MIN_FOREIGN_RATE_PCT - 1.0, rs20_pct=4.0
        )
        self.assertTrue(v.blocked)
        self.assertIn("매집 주체", v.note)

    def test_missing_data_passes(self):
        v = evaluate_accumulation_quality(foreign_rate_pct=None, rs20_pct=4.0)
        self.assertEqual(v.status, "data_missing")
        self.assertTrue(v.passed)


class ReversalQualityTest(unittest.TestCase):
    def test_calm_rebound_passes(self):
        v = evaluate_reversal_quality(ma20_gap_pct=5.0, rsi14=55.0)
        self.assertEqual(v.status, "met")

    def test_overextended_gap_blocked(self):
        v = evaluate_reversal_quality(ma20_gap_pct=30.0, rsi14=55.0)
        self.assertTrue(v.blocked)
        self.assertIn("과이격", v.note)

    def test_overbought_rsi_blocked(self):
        v = evaluate_reversal_quality(ma20_gap_pct=5.0, rsi14=REVERSAL_MAX_RSI14 + 1.0)
        self.assertTrue(v.blocked)
        self.assertIn("과매수", v.note)


class PullbackRescoreTest(unittest.TestCase):
    """2026-06 눌림목 재채점 항목 D1·D2·D3 (깊이·수급·반등 거래량) 등급 점수."""

    def test_d1_depth_graduated(self):
        from jongga.rule_evaluation import evaluate_pullback_d1_depth
        self.assertEqual(evaluate_pullback_d1_depth({"dropFrom52wHighPct": 18.0}).score, 1.0)
        self.assertEqual(evaluate_pullback_d1_depth({"dropFrom52wHighPct": 10.0}).score, 0.5)
        self.assertEqual(evaluate_pullback_d1_depth({"dropFrom52wHighPct": 4.0}).score, 0.0)
        self.assertEqual(evaluate_pullback_d1_depth({}).eval_status, "data_missing")

    def test_d2_supply_graduated(self):
        from jongga.rule_evaluation import evaluate_pullback_d2_supply
        self.assertEqual(evaluate_pullback_d2_supply({"supplyTrendScore": 2.0}).score, 1.0)
        self.assertEqual(evaluate_pullback_d2_supply({"supplyTrendScore": 1.0}).score, 0.5)
        self.assertEqual(evaluate_pullback_d2_supply({"supplyTrendScore": -1.0}).score, 0.0)

    def test_d3_rebound_volume_graduated(self):
        from jongga.rule_evaluation import evaluate_pullback_d3_rebound_volume
        self.assertEqual(evaluate_pullback_d3_rebound_volume({"volumeRatio20d": 130.0}).score, 1.0)
        self.assertEqual(evaluate_pullback_d3_rebound_volume({"volumeRatio20d": 90.0}).score, 0.5)
        self.assertEqual(evaluate_pullback_d3_rebound_volume({"volumeRatio20d": 50.0}).score, 0.0)

    def test_d4_short_covering_graduated(self):
        from jongga.rule_evaluation import evaluate_pullback_d4_short_covering
        # 대차잔고 12% 감소 -> 숏커버링 강한 징후 (만점)
        self.assertEqual(evaluate_pullback_d4_short_covering({"shortBalanceChangePct": -12.0}).score, 1.0)
        # 대차잔고 7% 감소 -> 부분 충족
        self.assertEqual(evaluate_pullback_d4_short_covering({"shortBalanceChangePct": -7.0}).score, 0.5)
        # 대차잔고 증가 -> 미충족
        self.assertEqual(evaluate_pullback_d4_short_covering({"shortBalanceChangePct": 5.0}).score, 0.0)
        # 대형주가 아니거나 수집 실패 -> 데이터 부족 (등급에 영향 없음)
        self.assertEqual(evaluate_pullback_d4_short_covering({}).eval_status, "data_missing")


class BalanceTrendCrossStrategyTest(unittest.TestCase):
    """2026-06: 매집·돌파/주도주 전략의 대차잔고(L1) 추이 채점."""

    def test_accumulation_l1_decrease_graduated(self):
        from jongga.rule_evaluation import (
            evaluate_accumulation_l1_short_balance_decrease,
        )
        # 대차잔고 12% 감소 -> 클린 매집 강한 징후 (만점)
        self.assertEqual(evaluate_accumulation_l1_short_balance_decrease({"shortBalanceChangePct": -12.0}).score, 1.0)
        # 7% 감소 -> 부분 충족
        self.assertEqual(evaluate_accumulation_l1_short_balance_decrease({"shortBalanceChangePct": -7.0}).score, 0.5)
        # 증가 -> 미충족
        self.assertEqual(evaluate_accumulation_l1_short_balance_decrease({"shortBalanceChangePct": 5.0}).score, 0.0)
        # 데이터 부족
        self.assertEqual(evaluate_accumulation_l1_short_balance_decrease({}).eval_status, "data_missing")

    def test_breakout_l1_increase_graduated(self):
        from jongga.rule_evaluation import (
            evaluate_breakout_l1_short_balance_increase,
        )
        # 대차잔고 12% 증가 -> 숏스퀴즈 강한 징후 (만점)
        self.assertEqual(evaluate_breakout_l1_short_balance_increase({"shortBalanceChangePct": 12.0}).score, 1.0)
        # 7% 증가 -> 부분 충족
        self.assertEqual(evaluate_breakout_l1_short_balance_increase({"shortBalanceChangePct": 7.0}).score, 0.5)
        # 감소 -> 미충족
        self.assertEqual(evaluate_breakout_l1_short_balance_increase({"shortBalanceChangePct": -5.0}).score, 0.0)
        # 데이터 부족
        self.assertEqual(evaluate_breakout_l1_short_balance_increase({}).eval_status, "data_missing")


class DispatchTest(unittest.TestCase):
    def test_dispatch_by_strategy(self):
        ind = {
            "dropFrom52wHighPct": 18.0,
            "volumeRatio20d": 120.0,
            "supplyTrendScore": 2.0,
        }
        self.assertEqual(evaluate_quality_from_indicators("pullback", ind).status, "met")

    def test_momentum_alias_has_no_quality_gate(self):
        self.assertIsNone(evaluate_quality_from_indicators("breakout", {}))
        self.assertIsNone(evaluate_quality_from_indicators("momentum", {}))

    def test_unknown_strategy_returns_none(self):
        self.assertIsNone(evaluate_quality_from_indicators("unknown", {}))


if __name__ == "__main__":
    unittest.main()
