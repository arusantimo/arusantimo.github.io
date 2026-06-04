import unittest

from jongga.output_contract import extract_top_recommendations


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


if __name__ == "__main__":
    unittest.main()
