from __future__ import annotations

import json
import re
from datetime import date, datetime, timedelta
from pathlib import Path
from typing import Any

from jongga.strategy_regime import slot_limits_for_regime

MARKET_ANALYZE_RELATIVE = Path("market-analyze") / "store" / "results" / "latest.js"
MARKET_RESULT_GLOBAL = "__MARKET_ANALYZE_RESULT__"

SUPPORTIVE_REGIME_KEYS = frozenset({"anchor-buffered-overheat", "secular-expansion"})
SUPPORTIVE_ANCHOR_STATES = frozenset({"validated", "supportive"})

REGIME_STRONG_BULL = "강세장 ✅ (펀더·지수 정당)"
REGIME_ROTATION_BUFFERED = "순환매장 🔄 (거시·지수 완충)"
REGIME_BOX_MACRO = "박스권 ⚠️ (거시 완충)"
REGIME_BOX_INDEX = "박스권 ⚠️ (지수 우선)"

# pullback G5 — keep in sync with js/market-analyze-bridge.js
PULLBACK_G5_VKOSPI_STRICT = 30
PULLBACK_G5_VKOSPI_WARN_CAP = 75
PULLBACK_G5_VKOSPI_MACRO_CAP = 85


def tools_root_from_jongga_module() -> Path:
    return Path(__file__).resolve().parents[2]


def market_analyze_latest_path(repo_root: Path | None = None) -> Path:
    root = repo_root or tools_root_from_jongga_module()
    return root / MARKET_ANALYZE_RELATIVE


def _compact_date(value: str | date | None) -> str:
    if value is None:
        return ""
    if isinstance(value, date):
        return value.strftime("%Y%m%d")
    text = str(value).strip()
    if not text:
        return ""
    digits = re.sub(r"\D", "", text)
    return digits[:8] if len(digits) >= 8 else digits


def _parse_analysis_date(value: str | date | None) -> date | None:
    compact = _compact_date(value)
    if len(compact) != 8:
        return None
    try:
        return datetime.strptime(compact, "%Y%m%d").date()
    except ValueError:
        return None


def dates_within_tolerance(left: str | date | None, right: str | date | None, tolerance_days: int = 1) -> bool:
    left_date = _parse_analysis_date(left)
    right_date = _parse_analysis_date(right)
    if not left_date or not right_date:
        return False
    return abs((left_date - right_date).days) <= tolerance_days


def load_market_analyze_snapshot(repo_root: Path | None = None) -> dict[str, Any] | None:
    path = market_analyze_latest_path(repo_root)
    if not path.is_file():
        return None
    raw = path.read_text(encoding="utf-8")
    match = re.search(rf"{re.escape(MARKET_RESULT_GLOBAL)}\s*=\s*(\{{.*\}})\s*;", raw, re.DOTALL)
    if not match:
        return None
    try:
        payload = json.loads(match.group(1))
    except json.JSONDecodeError:
        return None
    return payload if isinstance(payload, dict) else None


def market_analyze_data(snapshot: dict[str, Any] | None) -> dict[str, Any]:
    if not snapshot:
        return {}
    data = snapshot.get("data")
    return data if isinstance(data, dict) else {}


def market_analyze_meta(snapshot: dict[str, Any] | None) -> dict[str, Any]:
    if not snapshot:
        return {}
    meta = snapshot.get("meta")
    return meta if isinstance(meta, dict) else {}


def is_rise_justified_by_macro(snapshot: dict[str, Any] | None, analysis_date: str | date | None = None) -> bool:
    if not snapshot:
        return False
    meta = market_analyze_meta(snapshot)
    if analysis_date and not dates_within_tolerance(meta.get("resultDate"), analysis_date):
        return False
    data = market_analyze_data(snapshot)
    if data.get("bubbleCriticalTrigger") is True:
        return False
    anchor_state = str(data.get("fundamentalAnchorState") or "").strip().lower()
    if anchor_state not in SUPPORTIVE_ANCHOR_STATES:
        return False
    anchor_score = float(data.get("fundamentalAnchorScore") or 0)
    if anchor_score < 70:
        return False
    regime_key = str(data.get("marketRegimeKey") or "").strip()
    if regime_key in SUPPORTIVE_REGIME_KEYS:
        pass
    elif anchor_score < 80:
        return False
    bubble_index = data.get("bubbleIndex")
    if bubble_index is not None and float(bubble_index) >= 85:
        return False
    return True


def classify_kospi_bull_tier(context: dict[str, Any]) -> str:
    close = float(context.get("kospiClose") or 0)
    ma20 = float(context.get("kospiMa20") or 0)
    ma60 = float(context.get("kospiMa60") or 0)
    ma20_up = bool(context.get("kospiMa20Up"))
    ma60_up = bool(context.get("kospiMa60Up"))
    if close >= ma60 and ma60_up and ma20_up and close >= ma20:
        return "strong"
    if close >= ma60 and ma60_up:
        return "maintain"
    return "weak"


def _is_technical_soft_regime(regime_label: str) -> bool:
    label = str(regime_label or "")
    return label.startswith("약세장") or label.startswith("박스권") or label.startswith("순환매장")


def _regime_tuple(label: str) -> tuple[str, str, str, str, str, str]:
    if label.startswith("강세장"):
        return "강세장 ✅", "breakout", "pullback", "accumulation", "적극", "활성"
    if label.startswith("순환매장"):
        return "순환매장 🔄", "breakout", "pullback", "accumulation", "제한", "제한 활성"
    if label.startswith("박스권"):
        return "박스권 ⚠️", "accumulation", "pullback", "breakout", "조건부", "활성"
    return "약세장 ⛔", "none", "none", "none", "금지", "비활성"


def compute_effective_regime_label(
    technical_regime: str,
    rise_justified: bool,
    kospi_tier: str,
) -> tuple[str, str]:
    technical = str(technical_regime or "")
    if technical.startswith("강세장") and not rise_justified:
        return technical, "기술 레짐 유지"
    if technical.startswith("강세장"):
        return technical, "기술 강세 유지"

    if rise_justified and kospi_tier == "strong" and _is_technical_soft_regime(technical):
        return REGIME_STRONG_BULL, "펀더·버블 정당 + KOSPI 강세 확정 → 강세장 상향"
    if rise_justified and kospi_tier == "maintain" and _is_technical_soft_regime(technical):
        return REGIME_ROTATION_BUFFERED, "펀더·버블 정당 + KOSPI 강세 유지 → 순환매 상향"
    if rise_justified and kospi_tier == "weak" and _is_technical_soft_regime(technical):
        return REGIME_BOX_MACRO, "펀더·버블 정당 → 박스권 완화"
    if technical.startswith("약세장") and not rise_justified and kospi_tier == "strong":
        return REGIME_BOX_INDEX, "KOSPI 구조 강세 → 지수 우선 박스권"
    return technical, "기술 레짐 유지"


def build_regime_adjustment_reason(
    snapshot: dict[str, Any] | None,
    rise_justified: bool,
    kospi_tier: str,
    adjustment_note: str,
) -> str:
    parts: list[str] = []
    data = market_analyze_data(snapshot)
    if rise_justified:
        anchor = data.get("fundamentalAnchorScore")
        if anchor is not None:
            parts.append(f"펀더 앵커 {int(round(float(anchor)))}")
        parts.append("버블 critical off" if not data.get("bubbleCriticalTrigger") else "버블 critical on")
    if kospi_tier == "strong":
        parts.append("KOSPI 60/20MA 상향")
    elif kospi_tier == "maintain":
        parts.append("KOSPI 60MA 상향")
    if adjustment_note and adjustment_note != "기술 레짐 유지":
        parts.append(adjustment_note)
    return " · ".join(parts) if parts else adjustment_note


def apply_regime_fields_to_context(
    context: dict[str, Any],
    snapshot: dict[str, Any] | None,
    analysis_date: str | date | None = None,
) -> dict[str, Any]:
    technical = str(context.get("technicalRegimeLabel") or context.get("regimeLabel") or "")
    rise_justified = is_rise_justified_by_macro(snapshot, analysis_date)
    kospi_tier = classify_kospi_bull_tier(context)
    effective, adjustment_note = compute_effective_regime_label(technical, rise_justified, kospi_tier)
    _, primary, secondary, tertiary, swing_mode, reversal_track = _regime_tuple(effective)
    meta = market_analyze_meta(snapshot)
    reason = build_regime_adjustment_reason(snapshot, rise_justified, kospi_tier, adjustment_note)
    context.update(
        {
            "technicalRegimeLabel": technical,
            "regimeLabel": effective,
            "effectiveRegimeLabel": effective,
            "regimeAdjustmentReason": reason,
            "riseJustifiedByMacro": rise_justified,
            "kospiBullTier": kospi_tier,
            "primaryStrategy": primary,
            "secondaryStrategy": secondary,
            "tertiaryStrategy": tertiary,
            "strategySlotLimits": slot_limits_for_regime(effective),
            "swingMode": swing_mode,
            "reversalTrack": reversal_track,
            "openingBet": "활성" if effective.startswith("강세장") or effective.startswith("순환매장") else "비활성",
            "macroOverlay": {
                "loaded": snapshot is not None,
                "dateAligned": bool(snapshot) and dates_within_tolerance(meta.get("resultDate"), analysis_date),
                "marketAnalyzeDate": str(meta.get("resultDate") or ""),
                "technicalRegimeLabel": technical,
                "effectiveRegimeLabel": effective,
                "regimeAdjustmentReason": reason,
                "riseJustified": rise_justified,
                "kospiBullTier": kospi_tier,
            },
        }
    )
    # regimeLabel used by scoring must match effective label for startswith checks
    context["regimeLabel"] = effective
    return context


def trend_status_label(
    strategy: str,
    grade: str,
    regime_label: str,
    gap_code: str,
    gates: list[dict[str, Any]],
    *,
    rise_justified: bool = False,
    technical_regime: str = "",
) -> str:
    blocked_codes = [
        str(gate.get("code") or "").strip().upper()
        for gate in gates
        if gate.get("status") == "⛔"
    ]
    if blocked_codes:
        if all(code == "G5" for code in blocked_codes):
            return "시장 Gate 차단 · 신규 진입 보류"
        joined = ", ".join(code for code in blocked_codes if code)
        return f"매매금지(핵심 Gate 미충족{': ' + joined if joined else ''})"
    if gap_code == "G-E":
        return "매매금지(갭다운 경고 · 신규 진입 금지)"
    effective = str(regime_label or "")
    technical = str(technical_regime or effective)
    if effective.startswith("약세장"):
        if rise_justified or (technical.startswith("약세장") and rise_justified):
            if grade == "S":
                return "강력매수(소액·거시완충)"
            if grade == "A":
                return "매수추천(거시완충)"
        if grade == "S":
            return "강력매수(소액)"
        if grade == "A":
            return "관심후보(약세·소액)"
        if strategy == "pullback" and grade == "B":
            return "관심후보(B·조건부)"
        return "매매금지(약세장)"
    if grade == "S":
        return "강력매수"
    if grade == "A":
        return "매수추천"
    if strategy == "pullback" and grade == "B":
        return "진입 가능(B·조건부)"
    if grade == "B":
        return "관심후보"
    return "제외"


def reversal_status_label(
    grade: str,
    regime_label: str,
    gap_code: str,
    filters: list[dict[str, Any]],
    gates: list[dict[str, Any]],
    *,
    rise_justified: bool = False,
    technical_regime: str = "",
) -> str:
    if any(row.get("status") == "⛔" for row in filters + gates):
        return "매매금지"
    effective = str(regime_label or "")
    technical = str(technical_regime or effective)
    if gap_code == "G-E":
        return "매매금지(갭다운 경고 · 신규 진입 금지)"
    if gap_code == "G-D":
        return "매매금지(갭다운 주의 · 신규 진입 보류)"
    if effective.startswith("약세장"):
        if rise_justified and grade in {"S", "A"} and gap_code in {"G-A", "G-B", "G-C"}:
            return "진입 가능(거시완충)"
        if technical.startswith("약세장") and grade in {"S", "A"} and gap_code in {"G-A", "G-B", "G-C"}:
            return "관심후보(약세·소액)"
        return "매매금지"
    if grade == "S":
        return "최우선 진입"
    if grade == "A":
        return "진입 가능"
    if grade == "B":
        return "매매금지"
    return "제외"


def is_macro_friendly_for_g5(context: dict[str, Any]) -> bool:
    if bool(context.get("riseJustifiedByMacro")):
        return True
    regime = str(context.get("regimeLabel") or context.get("effectiveRegimeLabel") or "")
    return regime.startswith("강세장") or regime.startswith("순환매장")


def build_pullback_g5_gate(context: dict[str, Any]) -> dict[str, Any]:
    kospi_close = float(context.get("kospiClose") or 0)
    kospi_ma5 = float(context.get("kospiMa5") or 0)
    vkospi = float(context.get("vkospiValue") or 0)
    vkospi_label = str(context.get("vkospiLabel") or "VKOSPI")

    # KOSPI 종가 vs 5MA 비교를 명확히 표기 — 기존 노트는 "KOSPI>8582" 형태로
    # KOSPI가 5MA 위인 것처럼 보여 차단 이유를 역방향으로 오해시켰음.
    if kospi_ma5 > 0 and kospi_close > 0:
        pct = (kospi_close / kospi_ma5 - 1) * 100
        sign = "+" if pct >= 0 else ""
        kospi_note = f"KOSPI {kospi_close:,.0f} / 5MA {kospi_ma5:,.0f} ({sign}{pct:.1f}%)"
    elif kospi_ma5 > 0:
        kospi_note = f"KOSPI 데이터 없음 / 5MA {kospi_ma5:,.0f}"
    else:
        kospi_note = "KOSPI 5MA 데이터 없음"
    vkospi_note = f"{vkospi_label} {vkospi:.1f}"
    note_base = f"{kospi_note} · {vkospi_note}"

    if kospi_ma5 <= 0:
        return {"code": "G5", "status": "⚠️", "note": f"{note_base} · KOSPI 5MA 데이터 부족"}
    if kospi_close <= kospi_ma5:
        return {"code": "G5", "status": "⚠️", "note": f"{note_base} · KOSPI 단기 추세 이탈"}

    macro_friendly = is_macro_friendly_for_g5(context)
    if vkospi <= PULLBACK_G5_VKOSPI_STRICT:
        return {"code": "G5", "status": "✅", "note": note_base}
    if vkospi <= PULLBACK_G5_VKOSPI_WARN_CAP:
        return {"code": "G5", "status": "⚠️", "note": f"{note_base} · 변동성 경계"}
    if macro_friendly and vkospi <= PULLBACK_G5_VKOSPI_MACRO_CAP:
        return {"code": "G5", "status": "⚠️", "note": f"{note_base} · 거시·레짐 완화"}
    return {"code": "G5", "status": "⛔", "note": f"{note_base} · VKOSPI 과열"}


def build_macro_overlay_block(snapshot: dict[str, Any] | None, context: dict[str, Any]) -> dict[str, Any]:
    data = market_analyze_data(snapshot)
    overlay = context.get("macroOverlay") if isinstance(context.get("macroOverlay"), dict) else {}
    return {
        **overlay,
        "marketRegimeLabel": str(data.get("marketRegimeLabel") or ""),
        "marketRegimeKey": str(data.get("marketRegimeKey") or ""),
        "fundamentalAnchorScore": data.get("fundamentalAnchorScore"),
        "fundamentalAnchorState": str(data.get("fundamentalAnchorState") or ""),
        "bubbleIndex": data.get("bubbleIndex"),
        "bubbleCriticalTrigger": data.get("bubbleCriticalTrigger"),
        "bubbleRegimeLabel": str(data.get("bubbleRegimeLabel") or ""),
        "riskIndex": data.get("riskIndex"),
        "stageOverrideReason": str(data.get("stageOverrideReason") or data.get("marketRegimeReason") or ""),
        "kospiClose": context.get("kospiClose"),
        "kospiMa5": context.get("kospiMa5"),
        "vkospiValue": context.get("vkospiValue"),
        "vkospiLabel": context.get("vkospiLabel"),
        "riseJustifiedByMacro": bool(context.get("riseJustifiedByMacro")),
    }
