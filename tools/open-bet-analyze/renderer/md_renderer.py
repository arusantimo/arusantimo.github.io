from __future__ import annotations

from typing import Any


def render_morning_report(result: dict[str, Any]) -> str:
    trade_date = result.get("tradeDate", "")
    lines = [
        f"## {trade_date} — 시가베팅 오전 분석",
        "",
        f"> phase: {result.get('phase')} · quality: {(result.get('dataQuality') or {}).get('status')}",
        f"> 레짐: {(result.get('regime') or {}).get('label')} · 시가베팅: "
        f"{(result.get('regime') or {}).get('openBetActive')}",
        "",
    ]
    sched = result.get("executionSchedule") or {}
    lines.append(f"> ATS: {(sched.get('ats') or {}).get('entryWindow', '08:00~08:30')} · 09:00 잔량매도")
    lines.append("")
    for index, cand in enumerate(result.get("candidates") or [], start=1):
        plan = cand.get("entryPlan") or {}
        buy = (plan.get("buyOrder") or {}).get("limitPrice")
        liq = (plan.get("krxLiquidation") or {}).get("limitPrice")
        lines.extend(
            [
                f"### {index}위. {cand.get('name')} ({cand.get('code')}) — {cand.get('finalScore')}/10 [{cand.get('grade')}]",
                f"- 트랙: {cand.get('primaryTrack')}",
                f"- 갭: {(cand.get('gap') or {}).get('expectedPct')}%",
                f"- ATS 매수(08:00~08:30): {buy:,}원" if buy else "- ATS 매수: —",
                f"- 09:00 잔량 매도 지정가: {liq:,}원" if liq else "- 09:00 잔량 매도: —",
                "",
            ]
        )
    held = result.get("heldBack") or []
    if held:
        lines.append("### 진입 보류")
        for row in held:
            lines.append(f"- {row.get('code')}: {row.get('reason')}")
    return "\n".join(lines) + "\n"
