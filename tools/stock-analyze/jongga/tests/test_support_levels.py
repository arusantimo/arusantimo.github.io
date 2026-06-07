import unittest

from jongga.support_levels import analyze_pullback_support_levels, build_pullback_support_gate


def make_bar(close, low=None, high=None, volume=100):
    low_price = low if low is not None else close - 1
    high_price = high if high is not None else close + 1
    return {
        "open": close,
        "high": high_price,
        "low": low_price,
        "close": close,
        "volume": volume,
    }


class SupportLevelsTest(unittest.TestCase):
    def test_horizontal_support_clusters_repeated_low_band(self):
        bars = [
            make_bar(104, 103, 105),
            make_bar(103, 101, 104),
            make_bar(102, 100, 103),
            make_bar(105, 104, 106),
            make_bar(103, 100, 104),
            make_bar(106, 105, 107),
            make_bar(105, 104, 106),
        ]
        payload = analyze_pullback_support_levels(bars, 106)
        lines = payload["families"]["horizontal"]
        self.assertTrue(lines)
        self.assertEqual(lines[0]["family"], "horizontal")
        self.assertGreaterEqual(lines[0]["count"], 2)

    def test_swing_support_clusters_pivot_lows(self):
        bars = [
            make_bar(108, 107, 109),
            make_bar(105, 104, 106),
            make_bar(102, 100, 103),
            make_bar(106, 105, 107),
            make_bar(109, 108, 110),
            make_bar(106, 105, 107),
            make_bar(103, 100, 104),
            make_bar(107, 106, 108),
            make_bar(110, 109, 111),
        ]
        payload = analyze_pullback_support_levels(bars, 110)
        lines = payload["families"]["swingCluster"]
        self.assertTrue(lines)
        self.assertGreaterEqual(lines[0]["pivotCount"], 2)

    def test_volume_shelf_prefers_high_volume_bin_below_current_price(self):
        bars = [
            make_bar(99, 98, 100, 5000),
            make_bar(100, 99, 101, 4800),
            make_bar(100, 99, 101, 4700),
            make_bar(108, 107, 109, 400),
            make_bar(109, 108, 110, 350),
            make_bar(110, 109, 111, 300),
        ]
        payload = analyze_pullback_support_levels(bars, 110)
        lines = payload["families"]["volumeShelf"]
        self.assertTrue(lines)
        self.assertLessEqual(lines[0]["price"], 110)
        self.assertGreater(lines[0]["volume"], 4000)

    def test_event_anchor_keeps_unbroken_burst_low_and_discards_broken_anchor(self):
        bars = [make_bar(100 + (index % 3), 99 + (index % 3), 101 + (index % 3), 100) for index in range(30)]
        bars[21] = make_bar(104, 98, 105, 500)
        bars[22] = make_bar(97, 96, 99, 120)
        bars[26] = make_bar(106, 100, 107, 520)
        bars[27] = make_bar(107, 103, 108, 130)
        bars[28] = make_bar(108, 104, 109, 130)
        bars[29] = make_bar(109, 105, 110, 130)
        payload = analyze_pullback_support_levels(bars, 106)
        anchors = payload["families"]["eventAnchors"]
        self.assertTrue(anchors)
        prices = [line["price"] for line in anchors]
        self.assertIn(100, prices)
        self.assertNotIn(98, prices)

    def test_g9_gate_classifies_pass_warn_and_block(self):
        passed = build_pullback_support_gate({"support": {"strengthScore": 80, "activeFamilyCount": 2, "primaryLine": {"price": 100}, "warningReason": ""}})
        warned = build_pullback_support_gate({"support": {"strengthScore": 55, "activeFamilyCount": 1, "primaryLine": {"price": 100}, "warningReason": "단일 family"}})
        blocked = build_pullback_support_gate({"support": {"strengthScore": 20, "activeFamilyCount": 0, "primaryLine": None, "warningReason": "현재가 아래 유효 지지 family가 거의 없습니다."}})

        self.assertEqual(passed["status"], "✅")
        self.assertEqual(warned["status"], "⚠️")
        self.assertEqual(blocked["status"], "⛔")


if __name__ == "__main__":
    unittest.main()
