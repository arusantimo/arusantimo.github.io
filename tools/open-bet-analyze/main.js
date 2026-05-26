/* global OpenBetArtifactLoader */

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function formatPct(value) {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
        return "—";
    }
    const num = Number(value);
    const sign = num > 0 ? "+" : "";
    return `${sign}${num.toFixed(2)}%`;
}

function formatPrice(value) {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
        return "—";
    }
    return `${Number(value).toLocaleString("ko-KR")}원`;
}

function renderHeader(result) {
    const regime = result.regime || {};
    const macro = result.macro || {};
    const quality = result.dataQuality || {};
    const sched = result.executionSchedule || {};
    const ats = sched.ats || {};
    return `
        <header class="hero">
            <p class="eyebrow">Open Bet Analyze · ${escapeHtml(result.tradeDate)} · ${escapeHtml(result.phase)}</p>
            <h1>시가베팅 추천 엔진</h1>
            <p class="meta">
                레짐: <strong>${escapeHtml(regime.label || "—")}</strong>
                · 시가베팅: <strong>${regime.openBetActive ? "활성" : "비활성"}</strong>
                · 갭: <strong>${escapeHtml(macro.gapGrade || "—")}</strong>
                · 매크로 중단: <strong>${result.macroHalt ? "예" : "아니오"}</strong>
            </p>
            <p class="meta schedule">
                분석 마감 <strong>${escapeHtml((sched.analysis || {}).deadline || "07:40")}</strong>
                · 검토 <strong>${escapeHtml(sched.reviewWindow || "07:40~08:00")}</strong>
                · <strong>대체거래소(ATS)</strong> ${escapeHtml(ats.entryWindow || "08:00~08:30")} 매매
                · <strong>08:30</strong> 전량 청산 · <strong>09:00</strong> 잔량 지정가 매도
            </p>
            <p class="meta">생성: ${escapeHtml(result.generatedAt)} · 수집: <strong>${escapeHtml(quality.status)}</strong> (${Math.round((quality.coverage || 0) * 100)}%)</p>
        </header>
    `;
}

function renderExecutionTimeline(result) {
    const list = result.candidates || [];
    if (!list.length) return "";
    const rows = list
        .map((item) => {
            const plan = item.entryPlan || {};
            const exits = (plan.intradayExits || [])
                .map((e) => `${e.time} ${e.label} @ ${formatPrice(e.limitPrice)} (${Math.round((e.sellRatio || 0) * 100)}%)`)
                .join("<br>");
            return `
                <tr>
                    <td>${escapeHtml(item.name || item.code)}</td>
                    <td>${escapeHtml(plan.entryWindow?.start || "08:00")}~${escapeHtml(plan.entryWindow?.end || "08:30")}</td>
                    <td>${formatPrice((plan.buyOrder || {}).limitPrice)}</td>
                    <td>${exits || "—"}</td>
                    <td><strong>09:00</strong> ${formatPrice((plan.krxLiquidation || {}).limitPrice)}</td>
                </tr>
            `;
        })
        .join("");
    return `
        <section class="panel">
            <h2>ATS 실행 타임라인 (08:00~08:30)</h2>
            <p class="hint">08:30까지 매수·매도를 끝내고, 남은 수량은 09:00 정규장 지정가(추천가)로 예약 매도합니다.</p>
            <table>
                <thead>
                    <tr>
                        <th>종목</th>
                        <th>ATS 구간</th>
                        <th>매수 지정가</th>
                        <th>구간 내 매도</th>
                        <th>09:00 잔량 매도가</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </section>
    `;
}

function renderKrxLiquidationOrders(result) {
    const orders = result.krxLiquidationOrders || [];
    if (!orders.length) return "";
    const body = orders
        .map(
            (o) => `
            <tr>
                <td>${escapeHtml(o.name || o.code)} <span class="code">${escapeHtml(o.code)}</span></td>
                <td>${escapeHtml(o.at)}</td>
                <td>${escapeHtml(o.orderType)}</td>
                <td>${formatPrice(o.buyLimitPrice)}</td>
                <td><strong>${formatPrice(o.limitPrice)}</strong></td>
            </tr>
        `
        )
        .join("");
    return `
        <section class="panel highlight">
            <h2>09:00 잔량 시스템 매도 (예약 주문)</h2>
            <p class="hint">08:30까지 청산하지 못한 수량에 대해, 아래 지정가로 09:00 정규장 매도를 HTS/MTS에 미리 넣으세요.</p>
            <table>
                <thead>
                    <tr><th>종목</th><th>시각</th><th>유형</th><th>ATS 매수가</th><th>매도 지정가</th></tr>
                </thead>
                <tbody>${body}</tbody>
            </table>
        </section>
    `;
}

function renderCandidates(result) {
    const list = result.candidates || [];
    if (!list.length) {
        return `<section class="panel"><h2>최종 TOP 3</h2><p class="empty">추천 보류 — 수집 미완료 또는 조건 미충족</p></section>`;
    }
    const cards = list
        .map((item, index) => {
            const gap = item.gap || {};
            const plan = item.entryPlan || {};
            return `
                <article class="card">
                    <div class="card-rank">${index + 1}</div>
                    <h3>${escapeHtml(item.name || item.code)} <span class="code">${escapeHtml(item.code)}</span></h3>
                    <p class="score">${item.finalScore} / 10 <span class="grade">${escapeHtml(item.grade)}</span> · 트랙 ${escapeHtml(item.primaryTrack)}</p>
                    <ul>
                        <li>예상 갭: ${formatPct(gap.expectedPct)} · strong open: ${gap.strongOpen ? "✅" : "—"}</li>
                        <li>ATS: ${escapeHtml(plan.entryWindow?.start || "08:00")}~${escapeHtml(plan.entryWindow?.end || "08:30")} · 매수 ${formatPrice((plan.buyOrder || {}).limitPrice)}</li>
                        <li>손절 ${(plan.stopLoss || {}).limitPrice ? formatPrice(plan.stopLoss.limitPrice) : `${plan.stopLossPct || -2}%`} · 1차 익절 ${formatPrice(plan.tp1Price)}</li>
                        <li>09:00 잔량 매도: <strong>${formatPrice((plan.krxLiquidation || {}).limitPrice)}</strong></li>
                        <li>비중: ${Math.round((plan.entryWeight || 0) * 100)}%</li>
                    </ul>
                </article>
            `;
        })
        .join("");
    return `<section class="panel"><h2>최종 TOP 3</h2><div class="grid">${cards}</div></section>`;
}

function renderTrackC(result) {
    const rows = result.trackCScanner || [];
    if (!rows.length) {
        return `<section class="panel"><h2>Track C · 시간외 +4~7%</h2><p class="empty">후보 없음</p></section>`;
    }
    const body = rows
        .slice(0, 15)
        .map(
            (row) => `
            <tr>
                <td>${escapeHtml(row.name || row.code)}</td>
                <td>${escapeHtml(row.code)}</td>
                <td>${formatPct(row.ahChangePct)}</td>
                <td>${row.strongOpen ? "✅" : "—"}</td>
            </tr>
        `
        )
        .join("");
    return `
        <section class="panel">
            <h2>Track C · 시간외 +4~7%</h2>
            <table>
                <thead><tr><th>종목</th><th>코드</th><th>시간외</th><th>강한 시가</th></tr></thead>
                <tbody>${body}</tbody>
            </table>
        </section>
    `;
}

function renderThemes(result) {
    const themes = result.themes || [];
    if (!themes.length) {
        return `<section class="panel"><h2>신규 테마</h2><p class="empty">감지된 테마 없음</p></section>`;
    }
    const body = themes
        .map(
            (theme) => `
            <tr>
                <td>${escapeHtml(theme.label)}</td>
                <td>${theme.novelty}</td>
                <td>${theme.isNewTheme ? "신규" : "—"}</td>
                <td>${(theme.stocks || []).join(", ")}</td>
            </tr>
        `
        )
        .join("");
    return `
        <section class="panel">
            <h2>신규 테마 (Track B)</h2>
            <table>
                <thead><tr><th>테마</th><th>novelty</th><th>상태</th><th>종목</th></tr></thead>
                <tbody>${body}</tbody>
            </table>
        </section>
    `;
}

function renderQuality(result) {
    const quality = result.dataQuality || {};
    const missing = (quality.missingRequired || []).join(", ") || "없음";
    return `
        <section class="panel quality">
            <h2>수집 상태</h2>
            <p>status: <strong>${escapeHtml(quality.status)}</strong> · coverage: ${Math.round((quality.coverage || 0) * 100)}%</p>
            <p>누락 필수 메트릭: ${escapeHtml(missing)}</p>
        </section>
    `;
}

function renderHeldBack(result) {
    const rows = result.heldBack || [];
    if (!rows.length) return "";
    const body = rows
        .map((row) => `<tr><td>${escapeHtml(row.code)}</td><td>${escapeHtml(row.reason)}</td></tr>`)
        .join("");
    return `
        <section class="panel">
            <h2>진입 보류</h2>
            <table><thead><tr><th>코드</th><th>사유</th></tr></thead><tbody>${body}</tbody></table>
        </section>
    `;
}

async function boot() {
    const root = document.getElementById("app");
    try {
        const result = await OpenBetArtifactLoader.loadLatestResult();
        root.innerHTML = [
            renderHeader(result),
            renderQuality(result),
            renderKrxLiquidationOrders(result),
            renderExecutionTimeline(result),
            renderCandidates(result),
            renderTrackC(result),
            renderThemes(result),
            renderHeldBack(result),
        ].join("");
    } catch (error) {
        root.innerHTML = `<section class="panel error"><h2>로드 실패</h2><p>${escapeHtml(error.message)}</p><p>로컬에서 <code>python run_open_bet.py --phase final</code> 실행 후 새로고침하세요.</p></section>`;
    }
}

document.addEventListener("DOMContentLoaded", boot);
