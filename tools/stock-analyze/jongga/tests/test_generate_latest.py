import unittest

from jongga.generate_latest import analyze_reversal_intraday_signal, build_auto_event_filter, build_gap_score, build_market_context, grade_from_score, parse_cnbc_quote_html, parse_market_cap_trillion


class GenerateLatestTest(unittest.TestCase):
    def test_parse_cnbc_quote_html(self):
        quote = parse_cnbc_quote_html('{"symbol":".KSVKOSPI","last":"71.37","open":"71.44","high":"72.95","low":"71.37","change":"-1.14","change_pct":"-1.57%","previous_day_closing":"72.51"}')
        self.assertEqual(quote["current"], 71.37)
        self.assertEqual(quote["previousClose"], 72.51)
        self.assertEqual(quote["changePct"], -1.57)

    def test_parse_market_cap_trillion(self):
        self.assertAlmostEqual(parse_market_cap_trillion("1,613조 5,729억"), 1613.5729)
        self.assertAlmostEqual(parse_market_cap_trillion("29조 9,000억"), 29.9)

    def test_build_gap_score_matches_grade_thresholds(self):
        payload = build_gap_score({
            "nq": {"changePct": 0.8},
            "vix": {"current": 16.0},
            "tnx": {"bpChange": -4.0},
            "krw": {"changeWon": -7.0},
            "sox": {"changePct": 0.7},
        })
        self.assertEqual(payload["code"], "G-A")
        self.assertTrue(payload["totalScore"].startswith("+"))

    def test_build_market_context_detects_bear_when_proxy_is_high(self):
        history = []
        base = 100.0
        for index in range(90):
            history.append({"closePrice": f"{base - index * 0.2:.2f}", "fluctuationsRatio": "-0.5"})
        context = build_market_context(history, {"grade": "G-D 🟠", "totalScore": "-3.5점", "entryAdjustment": "", "code": "G-D"}, {"current": 31.0, "label": "VKOSPI", "source": "cnbc_quote", "isFallback": False, "confidence": 0.85})
        self.assertEqual(context["regimeLabel"], "약세장 ⛔")

    def test_grade_from_score_thresholds(self):
        self.assertEqual(grade_from_score(8.6, "reversal"), "S")
        self.assertEqual(grade_from_score(7.6, "pullback"), "A")

    def test_analyze_reversal_intraday_signal_detects_bullish_reclaim(self):
        signal = analyze_reversal_intraday_signal([
            {"timestamp": 1.0, "open": 100.0, "high": 101.0, "low": 96.0, "close": 98.0},
            {"timestamp": 2.0, "open": 97.0, "high": 103.0, "low": 95.0, "close": 102.0},
        ])
        self.assertTrue(signal["available"])
        self.assertTrue(signal["signal"])

    def test_build_auto_event_filter_reads_meeting_schedule(self):
        event_filter = build_auto_event_filter({
            "shareholdersMeetingInfo": {
                "meetingDate": "2026-05-28",
                "meetingDDay": 8,
            },
            "irScheduleInfo": None,
        })
        self.assertIsNotNone(event_filter)
        self.assertEqual(event_filter["corporateActionDays"], 8)
        self.assertFalse(event_filter["blocked"])
        self.assertIn("주총 D-8", event_filter["note"])


if __name__ == "__main__":
    unittest.main()