from __future__ import annotations

import json
from copy import deepcopy
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional

from .anchor_collectors import (
    build_anchor_universes,
    calculate_fundamental_anchor_values,
    calculate_support_adjusted_cycle_values,
    calculate_fundamental_support_values,
    collect_broadening,
    collect_earnings_breadth,
    collect_export_momentum,
    collect_market_valuation,
    collect_sector_breadth,
)
from .collectors import (
    CollectorResult,
    collect_disparity,
    collect_flow,
    collect_fx,
    collect_gold,
    collect_margin,
    collect_vix,
    has_value,
    safe_number,
    status_entry,
)


SCHEMA_VERSION = "1.1.0"
RESULT_VAR_NAME = "window.__MARKET_ANALYZE_RESULT__"

ROOT_DIR = Path(__file__).resolve().parent.parent
STORE_DIR = ROOT_DIR / "store"
RESULTS_DIR = STORE_DIR / "results"
BASE_DATA_PATH = STORE_DIR / "market_analyze_data.json"
MANIFEST_PATH = RESULTS_DIR / "manifest.json"
LATEST_RESULT_PATH = RESULTS_DIR / "latest.js"


def now_local() -> datetime:
    return datetime.now().astimezone()


def result_date_key(dt: Optional[datetime] = None) -> str:
    current = dt or now_local()
    return current.strftime("%Y%m%d")


def load_base_data() -> Dict[str, Any]:
    if not BASE_DATA_PATH.exists():
        return {}
    return json.loads(BASE_DATA_PATH.read_text(encoding="utf-8"))


def get_status_priority(state: str) -> int:
    return {"ok": 0, "partial": 1, "missing": 2, "error": 3}.get(state, 2)


def infer_snapshot_statuses(data: Dict[str, Any], source: str = "store/market_analyze_data.json") -> Dict[str, Any]:
    def snapshot_status(has_data: bool, ready_message: str, missing_message: str) -> Dict[str, str]:
        return (
            status_entry("partial", source, f"{ready_message} · 기존 스냅샷 기준")
            if has_data
            else status_entry("missing", source, missing_message)
        )

    flow_available = has_value(
        data.get("retailNetToday"),
        data.get("foreignNetToday"),
        data.get("institutionNetToday"),
        data.get("retailNet10dCum"),
        data.get("foreignNet10dCum"),
        data.get("institutionNet10dCum"),
    ) or bool(data.get("flowBizDate"))
    leaders_available = bool(data.get("leaderStocks"))
    margin_available = has_value(
        data.get("marginSlope"),
        data.get("customerDeposit"),
        data.get("depositMarginRatio"),
        data.get("marginShockChangePct"),
        data.get("marginBalanceToday"),
    )
    export_available = bool(data.get("exportLatestMonth")) or has_value(
        data.get("exportValueUsd"),
        data.get("exportYoY"),
        data.get("exportYoYDelta"),
        data.get("export3mAvgYoY"),
    )
    earnings_available = (data.get("earningsCoverageCount") or 0) > 0 or has_value(
        data.get("opIncomeBreadth"),
        data.get("netIncomeBreadth"),
        data.get("turnaroundBreadth"),
        data.get("positiveRoeBreadth"),
    )
    broadening_available = has_value(
        data.get("broadeningScore"),
        data.get("supportBreadth20d"),
        data.get("supportBreadth60d"),
        data.get("supportPositiveReturnBreadth"),
    )
    sector_breadth_available = (data.get("nonSemiconductorMomentumCoverageCount") or 0) > 0 or has_value(
        data.get("nonSemiconductorMomentum"),
    )
    valuation_available = (data.get("marketValuationCoverageCount") or 0) > 0 or has_value(
        data.get("marketValuationForwardPerAvg"),
        data.get("marketValuationScore"),
    ) or data.get("marketValuationStability") in {True, False}
    support_available = has_value(
        data.get("fundamentalSupportScore"),
        data.get("supportOffsetPoints"),
    ) or str(data.get("fundamentalSupportState") or "") in {"validated", "supportive", "fragile"}

    status = {
        "fx": snapshot_status(safe_number(data.get("fx")) is not None, "환율 값 확보", "환율 값 없음"),
        "vix": snapshot_status(safe_number(data.get("vix")) is not None, "VIX 값 확보", "VIX 값 없음"),
        "gold": snapshot_status(safe_number(data.get("gold")) is not None, "금 시세 값 확보", "금 시세 값 없음"),
        "disparity": snapshot_status(safe_number(data.get("disparity")) is not None, "이격도 값 확보", "이격도 값 없음"),
        "flow": snapshot_status(flow_available, "시장 수급 값 확보", "시장 수급 값 없음"),
        "leaders": snapshot_status(leaders_available, "대표주/와이코프 입력 확보", "대표주 유니버스 없음"),
        "margin": snapshot_status(margin_available, "신용/예탁금 값 확보", "신용/예탁금 값 없음"),
        "soros": snapshot_status(
            safe_number(data.get("disparity")) is not None and safe_number(data.get("sentiment")) is not None,
            "이격도/심리 입력 확보",
            "소로스 입력 부족",
        ),
        "minsky": snapshot_status(margin_available, "신용/예탁금 입력 확보", "민스키 입력 부족"),
        "kostolany": snapshot_status(
            has_value(data.get("riskIndex"), data.get("bullRatio"), data.get("customerDeposit")),
            "P-Index/거래량 입력 확보",
            "코스톨라니 입력 부족",
        ),
        "wyckoff": snapshot_status(leaders_available, "대표주 구조 입력 확보", "와이코프 입력 부족"),
        "anchor": {
            "export": snapshot_status(export_available, "수출 근거 확보", "수출 근거 없음"),
            "earnings": snapshot_status(earnings_available, "실적 breadth 확보", "실적 breadth 없음"),
            "broadening": snapshot_status(broadening_available, "확산 근거 확보", "확산 근거 없음"),
            "sectorBreadth": snapshot_status(sector_breadth_available, "업종 확산 근거 확보", "업종 확산 근거 없음"),
            "valuation": snapshot_status(valuation_available, "밸류에이션 근거 확보", "밸류에이션 근거 없음"),
            "support": snapshot_status(support_available, "펀더멘털 지지력 확보", "펀더멘털 지지력 없음"),
        },
    }
    return status


def summarize_statuses(entries: List[Dict[str, str]]) -> Dict[str, str]:
    unique_entries = [entry for entry in entries if entry]
    if not unique_entries:
        return status_entry("missing", "artifact", "상태 정보 없음")
    worst = max(unique_entries, key=lambda item: get_status_priority(item["state"]))
    sources = " · ".join(dict.fromkeys(entry["source"] for entry in unique_entries if entry.get("source")))
    messages = " · ".join(dict.fromkeys(entry["message"] for entry in unique_entries if entry.get("message")))
    return status_entry(worst["state"], sources or worst["source"], messages or worst["message"])


def derive_anchor_support_status(data: Dict[str, Any], statuses: Dict[str, Any]) -> Dict[str, str]:
    sector_status = statuses.get("anchor", {}).get("sectorBreadth")
    valuation_status = statuses.get("anchor", {}).get("valuation")
    entries = [entry for entry in (sector_status, valuation_status) if entry]
    if not entries:
        return status_entry("missing", "artifact", "펀더멘털 지지력 입력 상태 없음")

    available_entries = [entry for entry in entries if entry.get("state") in {"ok", "partial"}]
    problem_entries = [entry for entry in entries if entry.get("state") in {"missing", "error"}]
    source = " · ".join(dict.fromkeys(entry.get("source") for entry in entries if entry.get("source"))) or "artifact"
    reason = str(data.get("fundamentalSupportReason") or "펀더멘털 지지력 계산 완료")
    support_computed = has_value(
        data.get("fundamentalSupportScore"),
        data.get("supportOffsetPoints"),
    ) or str(data.get("fundamentalSupportState") or "") in {"validated", "supportive", "fragile"}

    if available_entries and not problem_entries:
        state = "ok" if all(entry.get("state") == "ok" for entry in available_entries) else "partial"
        return status_entry(state, source, reason)
    if available_entries and problem_entries:
        labels = ", ".join(f"{entry.get('source', '입력')} {entry.get('state')}" for entry in problem_entries)
        return status_entry("partial", source, f"{reason} · 일부 항목 중립값 반영 ({labels})")
    if support_computed and problem_entries:
        labels = ", ".join(f"{entry.get('source', '입력')} {entry.get('state')}" for entry in problem_entries)
        return status_entry("partial", source, f"{reason} · 입력 부족으로 중립값 반영 ({labels})")
    if any(entry.get("state") == "error" for entry in problem_entries):
        return status_entry("error", source, f"{reason} · 지지력 입력 수집 실패")
    return status_entry("missing", source, f"{reason} · 지지력 입력 미수집")


def derive_model_statuses(data: Dict[str, Any], statuses: Dict[str, Any]) -> None:
    disparity_status = statuses["disparity"]
    margin_status = statuses["margin"]
    leaders_status = statuses["leaders"]

    if safe_number(data.get("sentiment")) is None:
        statuses["soros"] = status_entry("missing", "manual", "수동 심리 입력 없음")
    elif disparity_status["state"] == "ok":
        statuses["soros"] = status_entry("partial", f"{disparity_status['source']} · manual", "이격도는 최신 수집, 심리 입력은 수동/스냅샷 값 사용")
    elif disparity_status["state"] == "partial":
        statuses["soros"] = status_entry("partial", disparity_status["source"], "소로스 입력은 일부만 최신화되었습니다.")
    else:
        statuses["soros"] = summarize_statuses([disparity_status, status_entry("partial", "manual", "심리 입력은 수동/스냅샷 값 사용")])

    if margin_status["state"] in {"ok", "partial"}:
        statuses["minsky"] = margin_status
    else:
        statuses["minsky"] = status_entry(margin_status["state"], margin_status["source"], f"민스키 입력 부족 · {margin_status['message']}")

    bull_ratio_available = safe_number(data.get("bullRatio")) is not None
    if bull_ratio_available and (safe_number(data.get("riskIndex")) is not None or safe_number(data.get("customerDeposit")) is not None):
        if margin_status["state"] == "ok":
            statuses["kostolany"] = status_entry("partial", f"{margin_status['source']} · store/market_analyze_data.json", "예탁금은 갱신했고, 양봉 비율/P-Index는 스냅샷 기준입니다.")
        else:
            statuses["kostolany"] = status_entry("partial", "store/market_analyze_data.json", "코스톨라니 입력은 스냅샷 기준입니다.")
    else:
        statuses["kostolany"] = status_entry("missing", "store/market_analyze_data.json", "코스톨라니 입력 부족")

    statuses["wyckoff"] = leaders_status


def set_status_value(statuses: Dict[str, Any], key: str, result: CollectorResult) -> None:
    if key.startswith("anchor."):
        _, anchor_key = key.split(".", 1)
        statuses["anchor"][anchor_key] = deepcopy(result.status)
    else:
        statuses[key] = deepcopy(result.status)


def merge_patch(target: Dict[str, Any], patch: Dict[str, Any]) -> None:
    for key, value in patch.items():
        target[key] = value


def build_result_payload(result_date: str, generated_at: str, data: Dict[str, Any], statuses: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "meta": {
            "resultDate": result_date,
            "generatedAt": generated_at,
            "schemaVersion": SCHEMA_VERSION,
        },
        "data": data,
        "status": statuses,
    }


def write_result_artifact(payload: Dict[str, Any], result_date: str) -> Path:
    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    result_path = RESULTS_DIR / f"result-{result_date}.js"
    payload_json = json.dumps(payload, ensure_ascii=False, indent=2)
    artifact_text = f"{RESULT_VAR_NAME} = {payload_json};\n"
    result_path.write_text(artifact_text, encoding="utf-8")
    LATEST_RESULT_PATH.write_text(artifact_text, encoding="utf-8")
    return result_path


def write_manifest(latest_file: str, latest_date: str, generated_at: str) -> Dict[str, Any]:
    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    available_files = sorted(RESULTS_DIR.glob("result-*.js"))
    available_dates = [path.stem.replace("result-", "") for path in available_files]
    manifest = {
        "latestDate": latest_date,
        "latestFile": latest_file,
        "generatedAt": generated_at,
        "availableDates": available_dates,
        "schemaVersion": SCHEMA_VERSION,
    }
    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return manifest


def generate_result(
    skip_remote: bool = False,
    explicit_date: Optional[str] = None,
    settings: Optional[Dict[str, str]] = None,
) -> Dict[str, Any]:
    base_data = load_base_data()
    data = deepcopy(base_data)
    statuses = infer_snapshot_statuses(data)
    settings = settings or {}
    collectors = [
        ("fx", collect_fx),
        ("vix", collect_vix),
        ("gold", collect_gold),
        ("disparity", collect_disparity),
        ("flow", collect_flow),
        ("margin", collect_margin),
    ]

    if not skip_remote:
        for status_key, collector in collectors:
            result = collector(data)
            merge_patch(data, result.data_patch)
            set_status_value(statuses, status_key, result)

        export_result = collect_export_momentum(data, settings)
        merge_patch(data, export_result.data_patch)
        set_status_value(statuses, "anchor.export", export_result)

        anchor_universes: Dict[str, Any] = {}
        anchor_universe_error: Optional[Exception] = None
        try:
            anchor_universes = build_anchor_universes(data)
        except Exception as error:  # noqa: BLE001
            anchor_universes = {}
            anchor_universe_error = error

        earnings_result = collect_earnings_breadth(data, settings, anchor_universes)
        merge_patch(data, earnings_result.data_patch)
        set_status_value(statuses, "anchor.earnings", earnings_result)

        broadening_result = collect_broadening(data, anchor_universes)
        merge_patch(data, broadening_result.data_patch)
        set_status_value(statuses, "anchor.broadening", broadening_result)

        sector_breadth_result = collect_sector_breadth(data)
        merge_patch(data, sector_breadth_result.data_patch)
        set_status_value(statuses, "anchor.sectorBreadth", sector_breadth_result)

        valuation_result = collect_market_valuation(data, anchor_universes)
        merge_patch(data, valuation_result.data_patch)
        set_status_value(statuses, "anchor.valuation", valuation_result)

        if anchor_universe_error and statuses["anchor"]["broadening"]["state"] == "error":
            statuses["anchor"]["broadening"] = status_entry(
                "error",
                "finance.naver.com",
                f"확산 유니버스 구축 실패 ({anchor_universe_error})",
            )
        if anchor_universe_error and settings.get("dartApiKey") and statuses["anchor"]["earnings"]["state"] == "missing":
            statuses["anchor"]["earnings"] = status_entry(
                statuses["anchor"]["earnings"]["state"],
                statuses["anchor"]["earnings"]["source"],
                f"{statuses['anchor']['earnings']['message']} · 유니버스 구축 실패 ({anchor_universe_error})",
            )
        if anchor_universe_error and statuses["anchor"]["valuation"]["state"] == "missing":
            statuses["anchor"]["valuation"] = status_entry(
                statuses["anchor"]["valuation"]["state"],
                statuses["anchor"]["valuation"]["source"],
                f"{statuses['anchor']['valuation']['message']} · 유니버스 구축 실패 ({anchor_universe_error})",
            )

    merge_patch(data, calculate_fundamental_anchor_values(data))
    merge_patch(data, calculate_fundamental_support_values(data))
    merge_patch(data, calculate_support_adjusted_cycle_values(data))
    statuses["anchor"]["support"] = derive_anchor_support_status(data, statuses)
    derive_model_statuses(data, statuses)
    generated_at = now_local().isoformat(timespec="seconds")
    result_date = explicit_date or result_date_key()
    payload = build_result_payload(result_date, generated_at, data, statuses)
    result_path = write_result_artifact(payload, result_date)
    manifest = write_manifest(str(result_path.relative_to(ROOT_DIR)).replace("\\", "/"), result_date, generated_at)
    return {
        "payload": payload,
        "result_path": result_path,
        "manifest": manifest,
    }
