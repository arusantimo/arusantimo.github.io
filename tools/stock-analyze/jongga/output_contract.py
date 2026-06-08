from __future__ import annotations

import json
from copy import deepcopy
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from typing import Any
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError


try:
    KST = ZoneInfo("Asia/Seoul")
except ZoneInfoNotFoundError:
    KST = timezone(timedelta(hours=9), name="KST")
STRATEGY_ORDER = ("pullback", "accumulation", "breakout", "reversal", "swing")
VARIANT_STABLE = "stable"
VARIANT_CANARY = "canary"
INPUT_ARCHIVE_VERSION = "jongga_inputs.v1"
PAYLOAD_SOURCE_LIVE = "live"
PAYLOAD_SOURCE_ARCHIVE_REBUILD = "archive_rebuild"
PAYLOAD_SOURCE_BEST_EFFORT_LEGACY = "best_effort_legacy"
CANARY_CHANNEL_ENABLED = False
VARIANT_LABELS = {
    VARIANT_STABLE: "현재 버전",
    VARIANT_CANARY: "카나리",
}


def is_canary_channel_enabled() -> bool:
    return CANARY_CHANNEL_ENABLED


def resolve_generation_variants(value: str | None = None) -> list[str]:
    text = str(value or "all").strip().lower()
    if text == "all":
        return [VARIANT_STABLE, VARIANT_CANARY] if is_canary_channel_enabled() else [VARIANT_STABLE]
    if text == VARIANT_CANARY:
        return [VARIANT_CANARY] if is_canary_channel_enabled() else []
    return [VARIANT_STABLE]


def resolve_outcome_variant_filter(value: str | None = None) -> str:
    text = str(value or "all").strip().lower()
    if text == "all":
        return "all" if is_canary_channel_enabled() else VARIANT_STABLE
    if text == VARIANT_CANARY and not is_canary_channel_enabled():
        raise ValueError("canary channel is disabled")
    return normalize_variant(text)


def is_weekend_day(value: date) -> bool:
    return value.weekday() >= 5


def previous_trading_day(value: date) -> date:
    current = value
    while is_weekend_day(current):
        current -= timedelta(days=1)
    return current


def resolve_analysis_date(value: str | None = None, *, today: date | None = None) -> date:
    if value:
        resolved = date.fromisoformat(value)
        if is_weekend_day(resolved):
            raise ValueError(f"주말 날짜({resolved.isoformat()})는 일별 분석일로 사용할 수 없습니다.")
        return resolved
    base_day = today or datetime.now(KST).date()
    return previous_trading_day(base_day)


def compact_date(value: date | str) -> str:
    if isinstance(value, str):
        value = date.fromisoformat(value)
    return value.strftime("%Y%m%d")


def normalize_variant(value: str | None = None) -> str:
    text = str(value or VARIANT_STABLE).strip().lower()
    return VARIANT_CANARY if text == VARIANT_CANARY else VARIANT_STABLE


def variant_label(value: str | None = None) -> str:
    return VARIANT_LABELS[normalize_variant(value)]


def variant_suffix(value: str | None = None) -> str:
    variant = normalize_variant(value)
    return "" if variant == VARIANT_STABLE else f"_{variant}"


def bridge_namespace(value: str | None = None) -> str:
    variant = normalize_variant(value)
    return "window.JONGGA_DAILY_DATA" if variant == VARIANT_STABLE else "window.JONGGA_CANARY_DAILY_DATA"


def build_daily_output_paths(out_dir: str | Path, analysis_date: date, *, variant: str = VARIANT_STABLE) -> tuple[Path, Path]:
    month_folder = analysis_date.strftime("%Y%m")
    directory = Path(out_dir) / month_folder
    compact = compact_date(analysis_date)
    suffix = variant_suffix(variant)
    return directory / f"latest_{compact}{suffix}.json", directory / f"jongga_data_{compact}{suffix}.js"


def build_input_archive_path(out_dir: str | Path, analysis_date: date, *, variant: str = VARIANT_STABLE) -> Path:
    month_folder = analysis_date.strftime("%Y%m")
    directory = Path(out_dir) / "archive" / month_folder
    compact = compact_date(analysis_date)
    suffix = variant_suffix(variant)
    return directory / f"inputs_{compact}{suffix}.json"


def payload_with_analysis_date(payload: dict[str, Any], analysis_date: date, *, variant: str = VARIANT_STABLE) -> dict[str, Any]:
    next_payload = deepcopy(payload)
    next_payload["analysisDate"] = analysis_date.isoformat()
    next_payload["variant"] = normalize_variant(variant)
    return next_payload


def render_daily_bridge_js(payload: dict[str, Any], *, variant: str | None = None) -> str:
    analysis_date = str(payload.get("analysisDate") or "").strip()
    if not analysis_date:
        raise ValueError("payload.analysisDate is required")
    namespace = bridge_namespace(variant or str(payload.get("variant") or ""))
    return (
        f"{namespace} = {namespace} || {{}};\n"
        f"{namespace}[{json.dumps(analysis_date)}] = "
        f"{json.dumps(payload, ensure_ascii=False, indent=2)};\n"
    )


def read_js_assignment(path: str | Path, marker: str) -> Any:
    """`window.<marker> = <json>;` 형태의 JS 파일에서 JSON 값을 파싱합니다.

    같은 파일에 여러 할당이 있어도 marker 이후 첫 JSON 리터럴만 정확히 읽습니다.
    파일/마커 부재 또는 파싱 실패 시 None을 반환합니다.
    """
    p = Path(path)
    if not p.exists():
        return None
    text = p.read_text(encoding="utf-8")
    idx = text.find(marker)
    if idx < 0:
        return None
    eq = text.find("=", idx)
    if eq < 0:
        return None
    pos = eq + 1
    while pos < len(text) and text[pos] in " \t\r\n":
        pos += 1
    try:
        value, _ = json.JSONDecoder().raw_decode(text, pos)
        return value
    except json.JSONDecodeError:
        return None


def render_history_bridge_js(entries: list[dict[str, Any]]) -> str:
    return f"window.JONGGA_HISTORY_INDEX = {json.dumps(entries, ensure_ascii=False, indent=2)};\n"


def read_history_index(path: str | Path) -> list[dict[str, Any]]:
    history_path = Path(path)
    if not history_path.exists():
        return []
    text = history_path.read_text(encoding="utf-8")
    start = text.find("[")
    end = text.rfind("]")
    if start < 0 or end <= start:
        return []
    parsed = json.loads(text[start:end + 1])
    return parsed if isinstance(parsed, list) else []


def web_path(path: str | Path) -> str:
    candidate = Path(path)
    try:
        if candidate.is_absolute():
            candidate = candidate.relative_to(Path.cwd())
    except ValueError:
        pass
    return candidate.as_posix()


def write_input_archive(
    archive_payload: dict[str, Any],
    out_dir: str | Path,
    analysis_date: date,
    *,
    variant: str = VARIANT_STABLE,
) -> Path:
    archive_path = build_input_archive_path(out_dir, analysis_date, variant=variant)
    archive_path.parent.mkdir(parents=True, exist_ok=True)
    archive_path.write_text(json.dumps(archive_payload, ensure_ascii=False, indent=2), encoding="utf-8")
    return archive_path


def build_history_entry(
    payload: dict[str, Any],
    daily_js_path: str | Path,
    daily_json_path: str | Path,
    *,
    variant: str | None = None,
    input_archive_path: str | Path | None = None,
    top_limit: int = 10,
) -> dict[str, Any]:
    quality = payload.get("dataQuality") if isinstance(payload.get("dataQuality"), dict) else {}
    resolved_variant = normalize_variant(variant or str(payload.get("variant") or ""))
    payload_source_mode = str(payload.get("payloadSourceMode") or PAYLOAD_SOURCE_LIVE)
    input_archive_version = str(payload.get("inputArchiveVersion") or "")
    rebuildable = bool(payload.get("rebuildable")) or input_archive_path is not None
    return {
        "date": str(payload.get("analysisDate") or ""),
        "variant": resolved_variant,
        "variantLabel": variant_label(resolved_variant),
        "jsFile": web_path(daily_js_path),
        "jsonFile": web_path(daily_json_path),
        "inputArchiveFile": web_path(input_archive_path) if input_archive_path else "",
        "inputArchiveVersion": input_archive_version,
        "payloadSourceMode": payload_source_mode,
        "rebuildable": rebuildable,
        "generatedAt": payload.get("generatedAt") or "",
        "status": quality.get("status") or "unknown",
        "buyCount": count_buy_entries(payload),
        "topRecommendations": extract_top_recommendations(payload, per_strategy=max(1, min(3, top_limit // 3))),
    }


def update_history_index(existing: list[dict[str, Any]], entry: dict[str, Any]) -> list[dict[str, Any]]:
    target_date = entry.get("date")
    target_variant = normalize_variant(str(entry.get("variant") or ""))
    merged = [
        item for item in existing
        if (
            (item.get("date") != target_date or normalize_variant(str(item.get("variant") or "")) != target_variant)
            and not _history_entry_is_weekend(item)
        )
    ]
    merged.append(entry)
    return sorted(
        merged,
        key=lambda item: (
            str(item.get("date") or ""),
            1 if normalize_variant(str(item.get("variant") or "")) == VARIANT_STABLE else 0,
        ),
        reverse=True,
    )


def _history_entry_is_weekend(entry: dict[str, Any]) -> bool:
    try:
        return is_weekend_day(date.fromisoformat(str(entry.get("date") or "")))
    except ValueError:
        return False


def write_daily_outputs(
    payload: dict[str, Any],
    out_dir: str | Path,
    history_js_path: str | Path,
    *,
    variant: str | None = None,
    input_archive: dict[str, Any] | None = None,
    top_limit: int = 10,
) -> tuple[Path, Path, Path]:
    raw_date = payload.get("analysisDate")
    analysis_date = resolve_analysis_date(str(raw_date) if raw_date else None)
    resolved_variant = normalize_variant(variant or str(payload.get("variant") or ""))
    json_path, js_path = build_daily_output_paths(out_dir, analysis_date, variant=resolved_variant)
    history_path = Path(history_js_path)
    input_archive_path = None

    json_path.parent.mkdir(parents=True, exist_ok=True)
    history_path.parent.mkdir(parents=True, exist_ok=True)

    json_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    js_path.write_text(render_daily_bridge_js(payload, variant=resolved_variant), encoding="utf-8")
    if input_archive is not None:
        input_archive_path = write_input_archive(input_archive, out_dir, analysis_date, variant=resolved_variant)

    entry = build_history_entry(
        payload,
        js_path,
        json_path,
        variant=resolved_variant,
        input_archive_path=input_archive_path,
        top_limit=top_limit,
    )
    history = update_history_index(read_history_index(history_path), entry)
    history_path.write_text(render_history_bridge_js(history), encoding="utf-8")
    return json_path, js_path, history_path


def count_buy_entries(payload: dict[str, Any]) -> int:
    total = 0
    for _, entry in iter_buy_entries(payload):
        total += 1
    return total


def extract_top_recommendations(payload: dict[str, Any], *, per_strategy: int = 2) -> list[dict[str, Any]]:
    """전략별 상위만 추출합니다. 서로 다른 전략의 점수는 비교하지 않습니다."""
    rows: list[dict[str, Any]] = []
    for strategy in STRATEGY_ORDER:
        if strategy == "swing":
            continue
        strategy_rows: list[dict[str, Any]] = []
        for row_strategy, entry in iter_buy_entries(payload):
            if row_strategy != strategy:
                continue
            strategy_rows.append({
                "strategy": strategy,
                "scoreScope": strategy,
                "name": entry.get("name") or "",
                "code": entry.get("code") or "",
                "score": entry.get("signalScore", entry.get("score")),
                "signalScore": entry.get("signalScore", entry.get("score")),
                "strictScore": entry.get("strictScore", entry.get("score")),
                "scoreMax": entry.get("scoreMax"),
                "grade": entry.get("grade") or "",
                "gradeScore": entry.get("gradeScore"),
                "statusLabel": entry.get("statusLabel") or entry.get("status") or "",
                "entryEligible": entry.get("entryEligible"),
                "currentPrice": entry.get("currentPrice"),
            })
        strategy_rows.sort(key=lambda item: _score_sort_value(item.get("signalScore") or item.get("score")), reverse=True)
        rows.extend(strategy_rows[:per_strategy])
    return rows


def iter_buy_entries(payload: dict[str, Any]):
    for slot in payload.get("slots") or []:
        entries = slot.get("entries") if isinstance(slot, dict) else {}
        if not isinstance(entries, dict):
            continue
        for strategy in STRATEGY_ORDER:
            bucket = entries.get(strategy) or []
            if strategy == "breakout" and not bucket:
                bucket = entries.get("momentum") or []
            for entry in bucket:
                if isinstance(entry, dict):
                    yield strategy, entry


def _score_sort_value(value: Any) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return float("-inf")
