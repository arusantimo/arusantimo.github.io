from __future__ import annotations

import re
from typing import Any
from urllib.error import URLError

from collectors._html import parse_number, parse_tables
from collectors._stale_fallback import load_recent_metric_snapshot
from router.quality import MetricEnvelope
from scripts.fetch_bridge import ROOT_DIR, fetch_text, normalize_request_error

FRGN_URL = "https://finance.naver.com/item/frgn.naver?code={code}"


def collect_foreign_inst_flow(code: str) -> dict[str, Any] | None:
    try:
        html = fetch_text(FRGN_URL.format(code=code), timeout=12)
    except (URLError, OSError, TimeoutError):
        return None
    prev_volume = None
    foreign_net = None
    inst_net = None
    
    # 일별 동향 테이블에서 가장 최근 영업일 데이터 파싱
    for table in parse_tables(html):
        for row in table:
            if len(row) < 7:
                continue
            # 날짜 형식 체크 (YYYY.MM.DD)
            if not re.match(r"^\d{4}\.\d{2}\.\d{2}$", row[0]):
                continue
            
            # row: [날짜, 종가, 전일비, 등락률, 거래량, 기관순매매, 외국인순매매, ...]
            prev_volume = parse_number(row[4])
            inst_net = parse_number(row[5])
            foreign_net = parse_number(row[6])
            break
        if prev_volume is not None:
            break
            
    # 일별 데이터 파싱 실패 시 상단 요약 fallback
    if prev_volume is None:
        for table in parse_tables(html):
            for row in table:
                joined = " ".join(row)
                if "외국인" in joined and foreign_net is None:
                    foreign_net = parse_number(row[-1] if row else "")
                if "기관" in joined and inst_net is None:
                    inst_net = parse_number(row[-1] if row else "")
                    
    return {
        "foreignNet": foreign_net,
        "instNet": inst_net,
        "prevVolume": prev_volume
    }


def collect_foreign_inst_flow_batch(codes: list[str]) -> MetricEnvelope:
    flows: dict[str, Any] = {}
    for code in codes[:20]:
        flow = collect_foreign_inst_flow(code)
        if flow:
            flows[code] = flow
    if not flows:
        snapshot = load_recent_metric_snapshot(ROOT_DIR, ["foreign_inst_flow"])
        if snapshot:
            payload = snapshot["payload"]
            stale_flows = payload.get("value") or {}
            if stale_flows:
                return MetricEnvelope(
                    metric="foreign_inst_flow",
                    value=stale_flows,
                    source="raw_snapshot",
                    confidence=0.65,
                    stale=True,
                    errors=[f"no flow rows — snapshot {snapshot['tradeDate']} fallback"],
                )
        if codes:
            neutral_flows = {
                str(code): {"foreignNet": None, "instNet": None, "prevVolume": None}
                for code in codes[:20]
                if str(code).strip()
            }
            if neutral_flows:
                return MetricEnvelope(
                    metric="foreign_inst_flow",
                    value=neutral_flows,
                    source="neutral_fallback",
                    confidence=0.5,
                    stale=True,
                    errors=["no flow rows — neutral fallback"],
                )
        return MetricEnvelope(
            metric="foreign_inst_flow",
            status="blocked",
            source="naver_frgn",
            confidence=0.0,
            errors=["no flow rows"],
        )
    return MetricEnvelope(
        metric="foreign_inst_flow",
        value=flows,
        source="naver_frgn",
        confidence=0.75,
    )
