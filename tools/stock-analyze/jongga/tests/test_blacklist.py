import unittest

from jongga.blacklist import (
    REASON_CAUTION,
    REASON_SHORT_OVERHEAT,
    STATUS_CONFIRMED,
    STATUS_UNCONFIRMED,
    blacklisted_codes,
    build_blacklist_record,
    detect_kind_blacklist_reasons,
    detect_toss_blacklist_reasons,
    extract_blacklist_records,
    normalize_blacklist_code,
)


class DetectKindReasonsTest(unittest.TestCase):
    def test_detects_short_overheat_designation(self):
        titles = ["코스닥시장본부 공매도 과열종목 지정 안내"]
        self.assertEqual(detect_kind_blacklist_reasons(titles), [REASON_SHORT_OVERHEAT])

    def test_detects_caution_designation(self):
        titles = ["투자주의종목 지정"]
        self.assertEqual(detect_kind_blacklist_reasons(titles), [REASON_CAUTION])

    def test_ignores_unrelated_titles(self):
        titles = ["현금배당 결정", "주주총회소집결의"]
        self.assertEqual(detect_kind_blacklist_reasons(titles), [])


class DetectTossReasonsTest(unittest.TestCase):
    def test_detects_badge_text(self):
        text = "리노공업 058470 공매도 과열 매수 매도 체결강도 59.0%"
        self.assertEqual(detect_toss_blacklist_reasons(text), [REASON_SHORT_OVERHEAT])

    def test_no_badge(self):
        text = "리노공업 058470 매수 매도 체결강도 59.0%"
        self.assertEqual(detect_toss_blacklist_reasons(text), [])


class BuildRecordTest(unittest.TestCase):
    def test_confirmed_when_kind_hits(self):
        record = build_blacklist_record(
            "058470", "리노공업",
            kind_reasons=[REASON_SHORT_OVERHEAT],
            kind_checked=True,
            toss_checked=True,
        )
        self.assertEqual(record["status"], STATUS_CONFIRMED)
        self.assertEqual(record["reasons"], [REASON_SHORT_OVERHEAT])
        self.assertIn("kind", record["sources"])

    def test_union_of_sources(self):
        record = build_blacklist_record(
            "058470", "리노공업",
            kind_reasons=[REASON_SHORT_OVERHEAT],
            toss_reasons=[REASON_SHORT_OVERHEAT, REASON_CAUTION],
            kind_checked=True,
            toss_checked=True,
        )
        self.assertEqual(record["reasons"], [REASON_SHORT_OVERHEAT, REASON_CAUTION])
        self.assertEqual(record["sources"], ["kind", "toss"])

    def test_clean_when_checked_and_no_reason(self):
        record = build_blacklist_record(
            "005930", "삼성전자",
            kind_checked=True,
            toss_checked=True,
        )
        self.assertIsNone(record)

    def test_unconfirmed_when_checks_failed(self):
        record = build_blacklist_record("005930", "삼성전자", kind_checked=False, toss_checked=False)
        self.assertEqual(record["status"], STATUS_UNCONFIRMED)
        self.assertEqual(record["reasons"], [])

    def test_invalid_code_returns_none(self):
        self.assertIsNone(build_blacklist_record("12", "잘못된코드", kind_checked=True, toss_checked=True))


class HelpersTest(unittest.TestCase):
    def test_normalize_code(self):
        self.assertEqual(normalize_blacklist_code("A058470"), "058470")
        self.assertEqual(normalize_blacklist_code("5847"), "")

    def test_blacklisted_codes_only_confirmed(self):
        records = [
            {"code": "058470", "status": STATUS_CONFIRMED},
            {"code": "005930", "status": STATUS_UNCONFIRMED},
        ]
        self.assertEqual(blacklisted_codes(records), {"058470"})

    def test_extract_records_normalizes(self):
        payload = {"blacklist": [
            {"code": "A058470", "name": "리노공업", "reasons": [REASON_SHORT_OVERHEAT, "잡음"], "status": STATUS_CONFIRMED},
            {"code": "bad"},
        ]}
        records = extract_blacklist_records(payload)
        self.assertEqual(len(records), 1)
        self.assertEqual(records[0]["code"], "058470")
        self.assertEqual(records[0]["reasons"], [REASON_SHORT_OVERHEAT])


if __name__ == "__main__":
    unittest.main()
