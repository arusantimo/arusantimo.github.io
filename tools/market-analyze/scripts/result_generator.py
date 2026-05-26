from __future__ import annotations

import json
from copy import deepcopy
from datetime import datetime
from pathlib import Path
from typing import Any, Callable, Dict, List, Optional

from .anchor_collectors import (
    build_cached_component_result,
    build_export_seed_result,
    build_export_patch,
    build_anchor_universes,
    calculate_fundamental_anchor_values,
    calculate_support_adjusted_cycle_values,
    calculate_fundamental_support_values,
    collect_broadening,
    collect_earnings_breadth,
    collect_export_momentum,
    collect_leader_stocks,
    collect_market_valuation,
    collect_sector_breadth,
)
from .bubble_collectors import (
    collect_fed_brake_flag,
    collect_ipo_glut_flag,
    collect_margin_debt_flag,
    collect_trash_flag,
)
from .bubble_engine import calculate_bubble_values
from .collectors import (
    CollectorResult,
    collect_bull_ratio,
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
from .sentiment_policy import (
    SENTIMENT_SOURCE_LIVE_AI,
    SENTIMENT_SOURCE_MANUAL_CONFIRMED,
    derive_auto_sentiment,
    get_sentiment_source_message,
    get_sentiment_status_source,
    get_sentiment_status_state,
    normalize_sentiment_source,
)


SCHEMA_VERSION = "1.2.2"
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


def parse_result_artifact(path: Path) -> Optional[Dict[str, Any]]:
    if not path.exists():
        return None
    try:
        raw_text = path.read_text(encoding="utf-8")
        trimmed = raw_text.strip()
        if trimmed.startswith(f"{RESULT_VAR_NAME}"):
            trimmed = trimmed.split("=", 1)[1].strip()
        trimmed = trimmed.rstrip(";\n ")
        payload = json.loads(trimmed)
        return payload if isinstance(payload, dict) else None
    except (OSError, json.JSONDecodeError, IndexError):
        return None


def load_existing_latest_payload() -> Optional[Dict[str, Any]]:
    manifest_payload = None
    if MANIFEST_PATH.exists():
        try:
            manifest_payload = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError):
            manifest_payload = None
    latest_file = str((manifest_payload or {}).get("latestFile") or "")
    if latest_file:
        candidate = (ROOT_DIR / latest_file).resolve()
        payload = parse_result_artifact(candidate)
        if payload:
            return payload
    return parse_result_artifact(LATEST_RESULT_PATH)


def load_manifest_payload() -> Dict[str, Any]:
    if not MANIFEST_PATH.exists():
        return {}
    try:
        payload = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return {}
    return payload if isinstance(payload, dict) else {}


def get_status_priority(state: str) -> int:
    return {"ok": 0, "partial": 1, "missing": 2, "error": 3}.get(state, 2)


def iter_status_entries(statuses: Any) -> List[Dict[str, str]]:
    collected: List[Dict[str, str]] = []
    if isinstance(statuses, dict):
        if {"state", "source", "message"} <= set(statuses.keys()):
            collected.append(statuses)
        else:
            for value in statuses.values():
                collected.extend(iter_status_entries(value))
    elif isinstance(statuses, list):
        for value in statuses:
            collected.extend(iter_status_entries(value))
    return collected


def calculate_status_health(statuses: Dict[str, Any]) -> tuple[int, int, int]:
    counts = {"error": 0, "missing": 0, "partial": 0}
    for entry in iter_status_entries(statuses):
        state = str(entry.get("state") or "")
        if state in counts:
            counts[state] += 1
    return counts["error"], counts["missing"], counts["partial"]


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
    bubble_signals = data.get("bubbleSignals") if isinstance(data.get("bubbleSignals"), dict) else {}

    def bubble_signal_available(signal_key: str) -> bool:
        signal = bubble_signals.get(signal_key)
        if not isinstance(signal, dict):
            return False
        return has_value(signal.get("score")) or bool(signal.get("updatedAt")) or bool(signal.get("reason"))

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
        "bubble": {
            "marginDebt": snapshot_status(bubble_signal_available("marginDebt"), "버블-신용매수 근거 확보", "버블-신용매수 근거 없음"),
            "ipo": snapshot_status(bubble_signal_available("ipo"), "버블-IPO 근거 확보", "버블-IPO 근거 없음"),
            "trash": snapshot_status(bubble_signal_available("trash"), "버블-적자 혁신주 근거 확보", "버블-적자 혁신주 근거 없음"),
            "fed": snapshot_status(bubble_signal_available("fed"), "버블-Fed 근거 확보", "버블-Fed 근거 없음"),
            "critical": snapshot_status(
                has_value(data.get("bubbleIndex")) or isinstance(data.get("bubbleCriticalTrigger"), bool),
                "버블 종합 근거 확보",
                "버블 종합 근거 없음",
            ),
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


def format_offline_reason(network_failures: Optional[List[tuple[str, str]]] = None) -> str:
    if not network_failures:
        return "오프라인 모드"
    hosts = [host for host, _reason in network_failures[:3]]
    host_summary = ", ".join(hosts)
    if len(network_failures) > 3:
        host_summary += " 외"
    return f"DNS/네트워크 프리플라이트 실패 ({host_summary})"


def build_snapshot_fallback_result(
    data: Dict[str, Any],
    source: str,
    reason: str,
    key: str,
) -> CollectorResult:
    value_checks = {
        "fx": lambda payload: safe_number(payload.get("fx")) is not None,
        "vix": lambda payload: safe_number(payload.get("vix")) is not None,
        "gold": lambda payload: safe_number(payload.get("gold")) is not None,
        "disparity": lambda payload: safe_number(payload.get("disparity")) is not None,
        "flow": lambda payload: has_value(
            payload.get("retailNetToday"),
            payload.get("foreignNetToday"),
            payload.get("institutionNetToday"),
            payload.get("retailNet10dCum"),
            payload.get("foreignNet10dCum"),
            payload.get("institutionNet10dCum"),
        ) or bool(payload.get("flowBizDate")),
        "margin": lambda payload: has_value(
            payload.get("marginSlope"),
            payload.get("customerDeposit"),
            payload.get("depositMarginRatio"),
            payload.get("marginShockChangePct"),
            payload.get("marginBalanceToday"),
        ),
    }
    labels = {
        "fx": "환율",
        "vix": "VIX",
        "gold": "금 시세",
        "disparity": "이격도",
        "flow": "시장 수급",
        "margin": "신용/예탁금",
    }
    has_snapshot = value_checks[key](data)
    if has_snapshot:
        return CollectorResult({}, status_entry("partial", source, f"{reason} · 최근 성공 스냅샷 유지"))
    return CollectorResult({}, status_entry("missing", source, f"{reason} · {labels[key]} 로컬 스냅샷 없음"))


def build_offline_anchor_result(
    component: str,
    data: Dict[str, Any],
    source: str,
    reason: str,
) -> CollectorResult:
    component_labels = {
        "export": "수출 모멘텀",
        "earnings": "실적 breadth",
        "broadening": "확산",
        "sectorBreadth": "비반도체 업종 확산",
        "valuation": "밸류에이션 안정도",
    }
    cached_result = build_cached_component_result(component, f"{reason} · {component_labels[component]} 라이브 수집 건너뜀")
    if cached_result:
        return cached_result

    if component == "export":
        seed_result = build_export_seed_result(f"{reason} · {component_labels[component]} 라이브 수집 건너뜀")
        if seed_result:
            return seed_result
        export_available = bool(data.get("exportLatestMonth")) or has_value(
            data.get("exportValueUsd"),
            data.get("exportYoY"),
            data.get("exportYoYDelta"),
            data.get("export3mAvgYoY"),
        )
        if export_available:
            return CollectorResult({}, status_entry("partial", source, f"{reason} · 최근 성공 수출 스냅샷 유지"))
        return CollectorResult(
            build_export_patch(),
            status_entry("missing", source, f"{reason} · 수출 캐시 없음 · 중립값 적용"),
        )

    if component == "earnings":
        earnings_available = (data.get("earningsCoverageCount") or 0) > 0 or has_value(
            data.get("opIncomeBreadth"),
            data.get("netIncomeBreadth"),
            data.get("turnaroundBreadth"),
            data.get("positiveRoeBreadth"),
        )
        if earnings_available:
            return CollectorResult({}, status_entry("partial", source, f"{reason} · 최근 성공 실적 스냅샷 유지"))
        return CollectorResult(
            {},
            status_entry("missing", source, f"{reason} · 실적 breadth 캐시 없음 · 중립값 적용"),
        )

    if component == "broadening":
        broadening_available = has_value(
            data.get("broadeningScore"),
            data.get("supportBreadth20d"),
            data.get("supportBreadth60d"),
            data.get("supportPositiveReturnBreadth"),
        )
        if broadening_available:
            return CollectorResult({}, status_entry("partial", source, f"{reason} · 최근 성공 확산 스냅샷 유지"))
        return CollectorResult(
            {},
            status_entry("missing", source, f"{reason} · 확산 캐시 없음 · 중립값 적용"),
        )

    if component == "sectorBreadth":
        sector_available = (data.get("nonSemiconductorMomentumCoverageCount") or 0) > 0 or has_value(
            data.get("nonSemiconductorMomentum"),
        )
        if sector_available:
            return CollectorResult({}, status_entry("partial", source, f"{reason} · 최근 성공 업종 확산 스냅샷 유지"))
        return CollectorResult(
            {},
            status_entry("missing", source, f"{reason} · 업종 확산 캐시 없음 · 중립값 적용"),
        )

    valuation_available = (data.get("marketValuationCoverageCount") or 0) > 0 or has_value(
        data.get("marketValuationForwardPerAvg"),
        data.get("marketValuationScore"),
    ) or data.get("marketValuationStability") in {True, False}
    if valuation_available:
        return CollectorResult({}, status_entry("partial", source, f"{reason} · 최근 성공 밸류에이션 스냅샷 유지"))
    return CollectorResult(
        {},
        status_entry("missing", source, f"{reason} · 밸류에이션 캐시 없음 · 중립값 적용"),
    )


def should_promote_result(
    new_payload: Dict[str, Any],
    existing_payload: Optional[Dict[str, Any]],
    offline_reason: str = "",
) -> bool:
    if not existing_payload:
        return True

    new_health = calculate_status_health(new_payload.get("status") or {})
    existing_health = calculate_status_health(existing_payload.get("status") or {})
    if not offline_reason:
        return True
    return new_health < existing_health


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
    sentiment_available = safe_number(data.get("sentiment")) is not None
    sentiment_source = normalize_sentiment_source(data.get("sentimentSource"), has_sentiment=sentiment_available)
    data["sentimentSource"] = sentiment_source

    if not sentiment_available:
        statuses["soros"] = status_entry("missing", "manual", "심리 입력 없음")
    elif disparity_status["state"] == "ok":
        statuses["soros"] = status_entry(
            get_sentiment_status_state(sentiment_source, has_sentiment=True),
            f"{disparity_status['source']} · {get_sentiment_status_source(sentiment_source, has_sentiment=True)}",
            f"이격도 최신 수집 · {get_sentiment_source_message(sentiment_source, has_sentiment=True)}",
        )
    elif disparity_status["state"] == "partial":
        statuses["soros"] = status_entry(
            "partial",
            f"{disparity_status['source']} · {get_sentiment_status_source(sentiment_source, has_sentiment=True)}",
            f"이격도는 일부만 최신화 · {get_sentiment_source_message(sentiment_source, has_sentiment=True)}",
        )
    else:
        statuses["soros"] = summarize_statuses(
            [
                disparity_status,
                status_entry(
                    get_sentiment_status_state(sentiment_source, has_sentiment=True),
                    get_sentiment_status_source(sentiment_source, has_sentiment=True),
                    get_sentiment_source_message(sentiment_source, has_sentiment=True),
                ),
            ]
        )

    if margin_status["state"] in {"ok", "partial"}:
        statuses["minsky"] = margin_status
    else:
        statuses["minsky"] = status_entry(margin_status["state"], margin_status["source"], f"민스키 입력 부족 · {margin_status['message']}")

    bull_ratio_available = safe_number(data.get("bullRatio")) is not None
    if bull_ratio_available and (safe_number(data.get("riskIndex")) is not None or safe_number(data.get("customerDeposit")) is not None):
        if margin_status["state"] == "ok":
            source = f"{margin_status['source']} · finance.naver.com/sise"
            statuses["kostolany"] = status_entry("ok", source, "예탁금, P-Index 및 양봉 비율 수집 완료")
        else:
            statuses["kostolany"] = status_entry("partial", "store/market_analyze_data.json", "코스톨라니 입력 일부가 스냅샷 기준입니다.")
    else:
        statuses["kostolany"] = status_entry("missing", "store/market_analyze_data.json", "코스톨라니 입력 부족")

    statuses["wyckoff"] = leaders_status


def derive_bubble_critical_status(data: Dict[str, Any], statuses: Dict[str, Any]) -> Dict[str, str]:
    bubble_status = statuses.get("bubble", {})
    entries = [
        bubble_status.get("marginDebt"),
        bubble_status.get("ipo"),
        bubble_status.get("trash"),
        bubble_status.get("fed"),
    ]
    summary = summarize_statuses([entry for entry in entries if entry])
    bubble_index = safe_number(data.get("bubbleIndex"))
    active_flags = int(data.get("bubbleActiveFlagCount") or 0)
    reason = str(data.get("bubbleCriticalReason") or "").strip()
    if not reason:
        if bubble_index is None:
            reason = "Critical Trigger 판정 대기 중"
        else:
            reason = f"Critical Trigger 미발동 · BI {round(bubble_index)} / active {active_flags}개"
    return status_entry(summary["state"], summary["source"], reason)


def set_status_value(statuses: Dict[str, Any], key: str, result: CollectorResult) -> None:
    if key.startswith("anchor."):
        _, anchor_key = key.split(".", 1)
        statuses["anchor"][anchor_key] = deepcopy(result.status)
    elif key.startswith("bubble."):
        _, bubble_key = key.split(".", 1)
        statuses["bubble"][bubble_key] = deepcopy(result.status)
    else:
        statuses[key] = deepcopy(result.status)


def merge_patch(target: Dict[str, Any], patch: Dict[str, Any]) -> None:
    for key, value in patch.items():
        if isinstance(value, dict) and isinstance(target.get(key), dict):
            merge_patch(target[key], value)
        else:
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


def emit_progress(progress_callback: Optional[Callable[[str], None]], message: str) -> None:
    if progress_callback:
        progress_callback(message)


def summarize_collector_result(result: CollectorResult) -> str:
    def unique_parts(raw: str) -> List[str]:
        parts: List[str] = []
        for chunk in raw.split("·"):
            label = chunk.strip()
            if label and label not in parts:
                parts.append(label)
        return parts

    def trim_with_suffix(raw: str, limit: int) -> str:
        if len(raw) <= limit:
            return raw
        return f"{raw[: limit - 3].rstrip()}..."

    def compact_source(raw: str) -> str:
        parts = unique_parts(raw)
        if len(parts) > 2:
            parts = [*parts[:2], f"+{len(parts) - 2} more"]
        return trim_with_suffix(" · ".join(parts), 84)

    def compact_message(raw: str) -> str:
        parts = [part for part in unique_parts(raw) if "라이브 수집 건너뜀" not in part]
        if len(parts) > 3:
            parts = [*parts[:2], f"+{len(parts) - 2} more"]
        return trim_with_suffix(" · ".join(parts), 132)

    status = result.status or {}
    state = str(status.get("state") or "missing")
    source = str(status.get("source") or "")
    message = str(status.get("message") or "")
    source_label = compact_source(source) if source else ""
    message_label = compact_message(message) if message else ""
    parts = [f"state={state}"]
    if source_label:
        parts.append(f"source={source_label}")
    if message_label:
        parts.append(f"message={message_label}")
    return " | ".join(parts)


def generate_result(
    skip_remote: bool = False,
    explicit_date: Optional[str] = None,
    settings: Optional[Dict[str, str]] = None,
    network_failures: Optional[List[tuple[str, str]]] = None,
    progress_callback: Optional[Callable[[str], None]] = None,
) -> Dict[str, Any]:
    emit_progress(progress_callback, "기존 스냅샷과 최신 생성본을 불러오는 중...")
    base_data = load_base_data()
    manifest_payload = load_manifest_payload()
    existing_latest_payload = load_existing_latest_payload()
    existing_latest_data = (
        deepcopy(existing_latest_payload.get("data"))
        if isinstance(existing_latest_payload, dict) and isinstance(existing_latest_payload.get("data"), dict)
        else {}
    )
    data = {**deepcopy(base_data), **existing_latest_data}
    if "sentiment" in base_data:
        data["sentiment"] = deepcopy(base_data.get("sentiment"))
        data["sentimentSource"] = deepcopy(base_data.get("sentimentSource")) if "sentimentSource" in base_data else ""
    if "bullRatio" in base_data:
        data["bullRatio"] = deepcopy(base_data.get("bullRatio"))
    data["sentimentSource"] = normalize_sentiment_source(
        data.get("sentimentSource"),
        has_sentiment=safe_number(data.get("sentiment")) is not None,
    )
    settings = settings or {}
    preflight_warning = format_offline_reason(network_failures) if network_failures and not skip_remote else ""
    snapshot_source = str(manifest_payload.get("latestFile") or "store/market_analyze_data.json")
    statuses = infer_snapshot_statuses(data, snapshot_source)
    emit_progress(
        progress_callback,
        "초기 입력 준비 완료 "
        f"(snapshot={snapshot_source}, remote={'skip' if skip_remote else ('live-with-warning' if preflight_warning else 'live')})",
    )
    collectors = [
        ("fx", collect_fx),
        ("vix", collect_vix),
        ("gold", collect_gold),
        ("disparity", collect_disparity),
        ("flow", collect_flow),
    ]

    if not skip_remote:
        if preflight_warning:
            emit_progress(progress_callback, f"프리플라이트 경고 -> {preflight_warning} · curl/Playwright/개별 대체 경로를 포함해 라이브 수집 계속 시도")
        for status_key, collector in collectors:
            emit_progress(progress_callback, f"{status_key} 수집 시작")
            result = collector(data)
            merge_patch(data, result.data_patch)
            set_status_value(statuses, status_key, result)
            emit_progress(progress_callback, f"{status_key} 수집 완료 -> {summarize_collector_result(result)}")

        emit_progress(progress_callback, "leaders 수집 시작")
        leaders_result = collect_leader_stocks(data)
        merge_patch(data, leaders_result.data_patch)
        set_status_value(statuses, "leaders", leaders_result)
        emit_progress(progress_callback, f"leaders 수집 완료 -> {summarize_collector_result(leaders_result)}")

        emit_progress(progress_callback, "margin 수집 시작")
        margin_result = collect_margin(data)
        merge_patch(data, margin_result.data_patch)
        set_status_value(statuses, "margin", margin_result)
        emit_progress(progress_callback, f"margin 수집 완료 -> {summarize_collector_result(margin_result)}")

        emit_progress(progress_callback, "anchor.export 수집 시작")
        export_result = collect_export_momentum(data, settings)
        merge_patch(data, export_result.data_patch)
        set_status_value(statuses, "anchor.export", export_result)
        emit_progress(progress_callback, f"anchor.export 수집 완료 -> {summarize_collector_result(export_result)}")

        anchor_universes: Dict[str, Any] = {}
        anchor_universe_error: Optional[Exception] = None
        try:
            emit_progress(progress_callback, "앵커 유니버스 구성 시작")
            anchor_universes = build_anchor_universes(data)
            emit_progress(
                progress_callback,
                "앵커 유니버스 구성 완료 "
                f"(earnings={len(anchor_universes.get('earningsUniverse') or [])}, "
                f"valuation={len(anchor_universes.get('valuationUniverse') or [])}, "
                f"broadening={len(anchor_universes.get('broadeningUniverse') or [])})",
            )
        except Exception as error:  # noqa: BLE001
            anchor_universes = {}
            anchor_universe_error = error
            emit_progress(progress_callback, f"앵커 유니버스 구성 실패 -> {error}")

        emit_progress(progress_callback, "anchor.earnings 수집 시작")
        earnings_result = collect_earnings_breadth(data, settings, anchor_universes)
        merge_patch(data, earnings_result.data_patch)
        set_status_value(statuses, "anchor.earnings", earnings_result)
        emit_progress(progress_callback, f"anchor.earnings 수집 완료 -> {summarize_collector_result(earnings_result)}")

        emit_progress(progress_callback, "anchor.broadening 수집 시작")
        broadening_result = collect_broadening(data, anchor_universes)
        merge_patch(data, broadening_result.data_patch)
        set_status_value(statuses, "anchor.broadening", broadening_result)
        emit_progress(progress_callback, f"anchor.broadening 수집 완료 -> {summarize_collector_result(broadening_result)}")

        emit_progress(progress_callback, "anchor.sectorBreadth 수집 시작")
        sector_breadth_result = collect_sector_breadth(data)
        merge_patch(data, sector_breadth_result.data_patch)
        set_status_value(statuses, "anchor.sectorBreadth", sector_breadth_result)
        emit_progress(progress_callback, f"anchor.sectorBreadth 수집 완료 -> {summarize_collector_result(sector_breadth_result)}")

        emit_progress(progress_callback, "anchor.valuation 수집 시작")
        valuation_result = collect_market_valuation(data, anchor_universes)
        merge_patch(data, valuation_result.data_patch)
        set_status_value(statuses, "anchor.valuation", valuation_result)
        emit_progress(progress_callback, f"anchor.valuation 수집 완료 -> {summarize_collector_result(valuation_result)}")

        bubble_collectors = [
            ("bubble.marginDebt", collect_margin_debt_flag),
            ("bubble.ipo", collect_ipo_glut_flag),
            ("bubble.trash", collect_trash_flag),
            ("bubble.fed", collect_fed_brake_flag),
        ]
        for status_key, collector in bubble_collectors:
            emit_progress(progress_callback, f"{status_key} 수집 시작")
            result = collector(data)
            merge_patch(data, result.data_patch)
            set_status_value(statuses, status_key, result)
            emit_progress(progress_callback, f"{status_key} 수집 완료 -> {summarize_collector_result(result)}")

        # 코스톨라니 양봉 비율 수집 및 반영
        emit_progress(progress_callback, "양봉 비율(bullRatio) 수집 시작")
        bull_ratio = collect_bull_ratio()
        if bull_ratio is not None:
            data["bullRatio"] = bull_ratio
            emit_progress(progress_callback, f"양봉 비율 수집 완료 -> {bull_ratio:.4f}")
        else:
            emit_progress(progress_callback, "양봉 비율 수집 실패")

        # 소로스 자동 심리 추정 및 반영
        sentiment_available = safe_number(data.get("sentiment")) is not None
        sentiment_source = normalize_sentiment_source(data.get("sentimentSource"), has_sentiment=sentiment_available)
        if not sentiment_available or sentiment_source != SENTIMENT_SOURCE_MANUAL_CONFIRMED:
            disparity_val = safe_number(data.get("disparity"))
            if disparity_val is not None:
                auto_sent = derive_auto_sentiment(disparity_val)
                data["sentiment"] = auto_sent
                data["sentimentSource"] = SENTIMENT_SOURCE_LIVE_AI
                emit_progress(progress_callback, f"심리 지수 자동 추정 완료 (이격도: {disparity_val} -> 심리: {auto_sent:.4f})")

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
    else:
        emit_progress(progress_callback, "원격 수집을 건너뛰고 로컬 스냅샷만 사용합니다.")

    emit_progress(progress_callback, "합성 지표 계산 시작 (anchor/support/cycle/bubble)")
    merge_patch(data, calculate_fundamental_anchor_values(data))
    merge_patch(data, calculate_fundamental_support_values(data))
    merge_patch(data, calculate_support_adjusted_cycle_values(data))
    merge_patch(data, calculate_bubble_values(data))
    statuses["anchor"]["support"] = derive_anchor_support_status(data, statuses)
    derive_model_statuses(data, statuses)
    statuses["bubble"]["critical"] = derive_bubble_critical_status(data, statuses)
    emit_progress(
        progress_callback,
        "합성 지표 계산 완료 "
        f"(riskIndex={data.get('riskIndex')}, "
        f"anchor={data.get('fundamentalAnchorScore')}, "
        f"support={data.get('fundamentalSupportScore')}, "
        f"bubble={data.get('bubbleIndex')})",
    )
    generated_at = now_local().isoformat(timespec="seconds")
    result_date = explicit_date or result_date_key()
    payload = build_result_payload(result_date, generated_at, data, statuses)
    emit_progress(progress_callback, f"결과 아티팩트 저장 시작 ({result_date})")
    result_path = write_result_artifact(payload, result_date)
    promote_result = should_promote_result(payload, existing_latest_payload, preflight_warning)
    if promote_result:
        LATEST_RESULT_PATH.write_text(result_path.read_text(encoding="utf-8"), encoding="utf-8")
        emit_progress(progress_callback, "latest.js 승격 완료")
    else:
        emit_progress(progress_callback, "latest.js 승격 건너뜀 (기존 latest 유지)")
    if promote_result:
        manifest_latest_file = str(result_path.relative_to(ROOT_DIR)).replace("\\", "/")
        manifest_latest_date = result_date
    else:
        manifest_latest_file = str(manifest_payload.get("latestFile") or str(result_path.relative_to(ROOT_DIR)).replace("\\", "/"))
        manifest_latest_date = str(manifest_payload.get("latestDate") or result_date)
    manifest = write_manifest(manifest_latest_file, manifest_latest_date, generated_at)
    emit_progress(progress_callback, f"manifest 갱신 완료 (latest={manifest['latestDate']})")
    return {
        "payload": payload,
        "result_path": result_path,
        "manifest": manifest,
    }
