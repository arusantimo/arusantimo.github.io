from __future__ import annotations

import re
from typing import Any
from urllib.error import URLError

from collectors._html import parse_number, parse_tables
from router.quality import MetricEnvelope
from scripts.fetch_bridge import fetch_text, normalize_request_error

FRGN_URL = "https://finance.naver.com/item/frgn.naver?code={code}"


def collect_foreign_inst_flow(code: str) -> dict[str, Any] | None:
    try:
        html = fetch_text(FRGN_URL.format(code=code), timeout=12)
    except (URLError, OSError, TimeoutError):
        return None
    foreign_net = None
    inst_net = None
    for table in parse_tables(html):
        for row in table:
            joined = " ".join(row)
            if "외국인" in joined and foreign_net is None:
                foreign_net = parse_number(row[-1] if row else "")
            if "기관" in joined and inst_net is None:
                inst_net = parse_number(row[-1] if row else "")
    return {"foreignNet": foreign_net, "instNet": inst_net}


def collect_foreign_inst_flow_batch(codes: list[str]) -> MetricEnvelope:
    flows: dict[str, Any] = {}
    for code in codes[:20]:
        flow = collect_foreign_inst_flow(code)
        if flow:
            flows[code] = flow
    if not flows:
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
