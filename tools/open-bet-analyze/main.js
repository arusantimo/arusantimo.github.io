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

// 1. 헤더 영역 렌더링
function renderHeader(result) {
    const regime = result.regime || {};
    const macro = result.macro || {};
    const quality = result.dataQuality || {};
    const sched = result.executionSchedule || {};
    const ats = sched.ats || {};
    
    const qualityBadgeClass = quality.status === "complete" ? "badge-good" : "badge-warn";
    const openBetBadgeClass = regime.openBetActive ? "badge-good" : "badge-bad";
    
    return `
        <header class="hero-panel">
            <div class="hero-top">
                <span class="eyebrow">OPEN BET ANALYZE ENGINE</span>
                <span class="badge ${qualityBadgeClass}">수집: ${escapeHtml(quality.status || "미확인")}</span>
            </div>
            <h1>시가베팅 실시간 추천 대시보드</h1>
            <div class="regime-grid">
                <div class="regime-card">
                    <span class="regime-label">적용 레짐</span>
                    <span class="regime-value">${escapeHtml(regime.label || "—")}</span>
                </div>
                <div class="regime-card">
                    <span class="regime-label">시가베팅 가동 여부</span>
                    <span class="regime-value badge-text ${openBetBadgeClass}">${regime.openBetActive ? "활성 ✅" : "중단 ⛔"}</span>
                </div>
                <div class="regime-card">
                    <span class="regime-label">글로벌 갭 스코어</span>
                    <span class="regime-value">${escapeHtml(macro.gapGrade || "—")} (${formatPct(macro.nightFuture)})</span>
                </div>
                <div class="regime-card">
                    <span class="regime-label">매크로 위험 중단</span>
                    <span class="regime-value badge-text ${result.macroHalt ? "badge-bad" : "badge-good"}">${result.macroHalt ? "HALT 🚨" : "정상 SAFE"}</span>
                </div>
            </div>
            <div class="schedule-banner">
                <div class="schedule-icon">⏰</div>
                <div class="schedule-content">
                    <strong>분석 기준일</strong>: ${escapeHtml(result.tradeDate)} | 
                    <strong>분석 마감</strong>: ${escapeHtml((sched.analysis || {}).deadline || "07:40")} | 
                    <strong>검토 구간</strong>: ${escapeHtml(sched.reviewWindow || "07:40~08:00")} | 
                    <strong>대체거래소(ATS) 진입</strong>: ${escapeHtml(ats.entryWindow || "08:00~08:30")}
                </div>
            </div>
        </header>
    `;
}

// 2. 갭상승 돌파 전략 추천 영역 렌더링 (최대 3종목)
function renderGapBreakCandidates(result) {
    const list = result.candidatesGapBreak || [];
    if (!list.length) {
        return `
            <section class="strategy-section">
                <div class="section-header">
                    <div class="section-title-wrap">
                        <h2>갭상승 돌파 전략</h2>
                        <span class="section-desc">당일 아침 호재로 시가가 전일 종가보다 갭을 띄워 출발할 때 진입</span>
                    </div>
                    <span class="strategy-badge gapbreak-badge">최대 3종목</span>
                </div>
                <div class="empty-card">
                    <p class="empty-title">추천 종목 없음</p>
                    <p class="empty-sub">수집 데이터 누락, 또는 당일 갭상승 및 전일 거래량 10% 기준을 만족하는 종목이 없습니다.</p>
                </div>
            </section>
        `;
    }

    const cards = list.map((item, index) => {
        const gap = item.gap || {};
        const plan = item.entryPlan || {};
        return `
            <article class="stock-card" data-code="${escapeHtml(item.code)}" data-strategy="GapBreak">
                <div class="card-header">
                    <div class="stock-info">
                        <h3>${escapeHtml(item.name)}</h3>
                        <span class="stock-code">${escapeHtml(item.code)}</span>
                    </div>
                    <span class="score-badge">SCORE ${item.strategyScore}</span>
                </div>
                <div class="card-metrics">
                    <div class="metric-row">
                        <span class="metric-lbl">예상 갭상승률</span>
                        <span class="metric-val highlight-val">${formatPct(gap.expectedPct)}</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-lbl">전일 거래량 대비 비율</span>
                        <span class="metric-val highlight-val">${item.volRatio ? item.volRatio.toFixed(2) + '%' : '—'}</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-lbl">ATS 매수 조건</span>
                        <span class="metric-val">${formatPrice((plan.buyOrder || {}).limitPrice)}</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-lbl">목표 / 손절가</span>
                        <span class="metric-val target-val">${formatPrice(plan.tp1Price)} / ${formatPrice((plan.stopLoss || {}).limitPrice)}</span>
                    </div>
                </div>
                <div class="card-footer">
                    <span>비중 ${Math.round((plan.entryWeight || 0) * 100)}%</span>
                    <button class="btn-detail">분석 상세 보기 →</button>
                </div>
            </article>
        `;
    }).join("");

    return `
        <section class="strategy-section">
            <div class="section-header">
                <div class="section-title-wrap">
                    <h2>갭상승 돌파 전략</h2>
                    <span class="section-desc">당일 아침 호재로 시가가 전일 종가보다 갭을 띄워 출발할 때 진입</span>
                </div>
                <span class="strategy-badge gapbreak-badge">최대 3종목</span>
            </div>
            <div class="stock-grid">${cards}</div>
        </section>
    `;
}

// 3. 시간외 단일가 연계 전략 추천 영역 렌더링 (최대 3종목)
function renderOvertimeFollowCandidates(result) {
    const list = result.candidatesOvertimeFollow || [];
    if (!list.length) {
        return `
            <section class="strategy-section">
                <div class="section-header">
                    <div class="section-title-wrap">
                        <h2>시간외 단일가 연계 전략</h2>
                        <span class="section-desc">전일 시간외 단일가 거래에서 강한 상승 흐름을 보인 종목을 아침에 포착</span>
                    </div>
                    <span class="strategy-badge overtime-badge">최대 3종목</span>
                </div>
                <div class="empty-card">
                    <p class="empty-title">추천 종목 없음</p>
                    <p class="empty-sub">시간외 급등 요건(+4~7%) 및 시간외 거래량 요건을 통과한 종목이 존재하지 않습니다.</p>
                </div>
            </section>
        `;
    }

    const cards = list.map((item, index) => {
        const gap = item.gap || {};
        const plan = item.entryPlan || {};
        return `
            <article class="stock-card" data-code="${escapeHtml(item.code)}" data-strategy="OvertimeFollow">
                <div class="card-header">
                    <div class="stock-info">
                        <h3>${escapeHtml(item.name)}</h3>
                        <span class="stock-code">${escapeHtml(item.code)}</span>
                    </div>
                    <span class="score-badge overtime-score">SCORE ${item.strategyScore}</span>
                </div>
                <div class="card-metrics">
                    <div class="metric-row">
                        <span class="metric-lbl">시간외 상승률</span>
                        <span class="metric-val highlight-val">${formatPct(item.gap?.expectedPct)}</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-lbl">전일 거래량 대비 비율</span>
                        <span class="metric-val highlight-val">${item.volRatio ? item.volRatio.toFixed(2) + '%' : '—'}</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-lbl">ATS 매수 조건</span>
                        <span class="metric-val">${formatPrice((plan.buyOrder || {}).limitPrice)}</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-lbl">목표 / 손절가</span>
                        <span class="metric-val target-val">${formatPrice(plan.tp1Price)} / ${formatPrice((plan.stopLoss || {}).limitPrice)}</span>
                    </div>
                </div>
                <div class="card-footer">
                    <span>비중 ${Math.round((plan.entryWeight || 0) * 100)}%</span>
                    <button class="btn-detail">분석 상세 보기 →</button>
                </div>
            </article>
        `;
    }).join("");

    return `
        <section class="strategy-section">
            <div class="section-header">
                <div class="section-title-wrap">
                    <h2>시간외 단일가 연계 전략</h2>
                    <span class="section-desc">전일 시간외 단일가 거래에서 강한 상승 흐름을 보인 종목을 아침에 포착</span>
                </div>
                <span class="strategy-badge overtime-badge">최대 3종목</span>
            </div>
            <div class="stock-grid">${cards}</div>
        </section>
    `;
}

// 4. ATS 실행 구간 타임라인 렌더링
function renderExecutionTimeline(result) {
    const list = result.candidates || [];
    if (!list.length) return "";
    const rows = list.map((item) => {
        const plan = item.entryPlan || {};
        const exits = (plan.intradayExits || [])
            .map((e) => `${e.time} ${e.label} @ ${formatPrice(e.limitPrice)} (${Math.round((e.sellRatio || 0) * 100)}%)`)
            .join("<br>");
        return `
            <tr>
                <td class="font-semibold">${escapeHtml(item.name)} <span class="sub-code">${escapeHtml(item.code)}</span></td>
                <td><span class="strategy-pill ${item.strategy === 'GapBreak' ? 'pill-gap' : 'pill-overtime'}">${item.strategy === 'GapBreak' ? '갭상승 돌파' : '시간외 연계'}</span></td>
                <td class="text-accent">${escapeHtml(plan.entryWindow?.start || "08:00")}~${escapeHtml(plan.entryWindow?.end || "08:30")}</td>
                <td class="price-val">${formatPrice((plan.buyOrder || {}).limitPrice)}</td>
                <td>${exits || "—"}</td>
                <td class="price-val font-semibold">${formatPrice((plan.krxLiquidation || {}).limitPrice)}</td>
            </tr>
        `;
    }).join("");

    return `
        <section class="panel">
            <h2>ATS 실행 타임라인 (08:00 ~ 08:30)</h2>
            <p class="hint">08:30까지 매수 및 청산(익절/손절)을 마치고, 남은 수량은 09:00 정규장 시작과 함께 지정가 매도 처리합니다.</p>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>종목</th>
                            <th>적용 전략</th>
                            <th>ATS 거래 구간</th>
                            <th>매수 지정가</th>
                            <th>구간 내 청산 조건</th>
                            <th>09:00 잔량 청산가</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        </section>
    `;
}

// 5. 09:00 잔량 시스템 매도 주문 정보
function renderKrxLiquidationOrders(result) {
    const orders = result.krxLiquidationOrders || [];
    if (!orders.length) return "";
    const body = orders.map((o) => `
        <tr>
            <td class="font-semibold">${escapeHtml(o.name)} <span class="sub-code">${escapeHtml(o.code)}</span></td>
            <td>${escapeHtml(o.at)}</td>
            <td><span class="order-type-badge">${escapeHtml(o.orderType.toUpperCase())}</span></td>
            <td class="price-val">${formatPrice(o.buyLimitPrice)}</td>
            <td class="price-val text-good font-semibold">${formatPrice(o.limitPrice)}</td>
        </tr>
    `).join("");

    return `
        <section class="panel highlight-panel">
            <div class="panel-header">
                <h2>09:00 잔량 시스템 매도 (HTS/MTS 예약용)</h2>
                <span class="panel-tag tag-warn">정규장 개장 즉시 집행</span>
            </div>
            <p class="hint">ATS 청산 데드라인(08:30)까지 미청산된 잔량에 대해 아래 조건으로 HTS/MTS에 미리 지정가 매도 예약을 등록하십시오.</p>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>종목</th>
                            <th>주문 예약 시간</th>
                            <th>주문 종류</th>
                            <th>ATS 매수가</th>
                            <th>지정가 매도 주문 가격</th>
                        </tr>
                    </thead>
                    <tbody>${body}</tbody>
                </table>
            </div>
        </section>
    `;
}

// 6. 감지된 테마 렌더링
function renderThemes(result) {
    const themes = result.themes || [];
    if (!themes.length) return "";
    const body = themes.map((t) => `
        <tr>
            <td class="font-semibold">${escapeHtml(t.label)}</td>
            <td><span class="novelty-tag">${t.novelty}</span></td>
            <td><span class="theme-status ${t.isNewTheme ? 'text-good' : 'text-muted'}">${t.isNewTheme ? "신규 감지" : "기존 테마"}</span></td>
            <td class="theme-stocks">${(t.stocks || []).join(", ")}</td>
        </tr>
    `).join("");

    return `
        <section class="panel">
            <h2>신규 테마 동향 (Track B)</h2>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>테마 이름</th>
                            <th>Novelty 강도</th>
                            <th>상태</th>
                            <th>연관 종목 코드</th>
                        </tr>
                    </thead>
                    <tbody>${body}</tbody>
                </table>
            </div>
        </section>
    `;
}

// 7. 진입 보류 및 제한 종목 목록
function renderHeldBack(result) {
    const rows = result.heldBack || [];
    if (!rows.length) return "";
    const body = rows.map((row) => `
        <tr>
            <td class="font-semibold">${escapeHtml(row.code)}</td>
            <td><span class="strategy-pill pill-neutral">${escapeHtml(row.strategy || "공통")}</span></td>
            <td class="text-bad">${escapeHtml(row.reason)}</td>
        </tr>
    `).join("");

    return `
        <section class="panel">
            <h2>진입 및 추천 보류 내역</h2>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>종목 코드</th>
                            <th>대상 전략</th>
                            <th>보류 및 제한 사유</th>
                        </tr>
                    </thead>
                    <tbody>${body}</tbody>
                </table>
            </div>
        </section>
    `;
}

// 8. 모달 상세 보기 로직
let currentResultData = null;

function setupModalEvents() {
    const overlay = document.getElementById("modal-overlay");
    const closeBtn = document.getElementById("modal-close-btn");
    
    closeBtn.addEventListener("click", () => {
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    });
    
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
}

function showDetailModal(code, strategy) {
    if (!currentResultData) return;
    
    const candidates = strategy === "GapBreak" 
        ? currentResultData.candidatesGapBreak 
        : currentResultData.candidatesOvertimeFollow;
        
    const item = candidates.find(c => c.code === code);
    if (!item) return;
    
    const overlay = document.getElementById("modal-overlay");
    const nameEl = document.getElementById("modal-name");
    const codeEl = document.getElementById("modal-code");
    const typeEl = document.getElementById("modal-type");
    const bodyEl = document.getElementById("modal-body");
    
    nameEl.textContent = item.name;
    codeEl.textContent = item.code;
    typeEl.textContent = strategy === "GapBreak" ? "갭상승 돌파 전략 (Track A)" : "시간외 단일가 연계 전략 (Track C)";
    
    let detailHtml = "";
    
    if (strategy === "GapBreak") {
        const gates = item.gates || {};
        detailHtml = `
            <div class="modal-section">
                <h4>🎯 전략 상세 점수</h4>
                <div class="modal-score-wrap">
                    <span class="modal-score-value">${item.strategyScore}</span>
                    <span class="modal-score-total">/ 10</span>
                </div>
            </div>
            
            <div class="modal-section">
                <h4>🚪 시가베팅 핵심 Gate 검증 결과</h4>
                <div class="gate-list">
                    <div class="gate-item ${gates.G1 ? 'passed' : 'failed'}">
                        <span class="gate-status">${gates.G1 ? '● PASS' : '○ FAIL'}</span>
                        <span class="gate-name">Gate 1: 전일 거래대금 TOP40 여부</span>
                    </div>
                    <div class="gate-item ${gates.G2 ? 'passed' : 'failed'}">
                        <span class="gate-status">${gates.G2 ? '● PASS' : '○ FAIL'}</span>
                        <span class="gate-name">Gate 2: 단기 이평선 정배열 상태</span>
                    </div>
                    <div class="gate-item ${gates.G3 ? 'passed' : 'failed'}">
                        <span class="gate-status">${gates.G3 ? '● PASS' : '○ FAIL'}</span>
                        <span class="gate-name">Gate 3: 주봉 강세 강도 (RSI 50 이상)</span>
                    </div>
                    <div class="gate-item ${gates.G4 ? 'passed' : 'failed'}">
                        <span class="gate-status">${gates.G4 ? '● PASS' : '○ FAIL'}</span>
                        <span class="gate-name">Gate 4: 외국인/기관 대량 매수 유입 (5억 이상)</span>
                    </div>
                    <div class="gate-item ${gates.G5 ? 'passed' : 'failed'}">
                        <span class="gate-status">${gates.G5 ? '● PASS' : '○ FAIL'}</span>
                        <span class="gate-name">Gate 5: 시간외 상승세 및 강력한 뉴스 재료</span>
                    </div>
                    <div class="gate-item ${gates.G6 ? 'passed' : 'failed'}">
                        <span class="gate-status">${gates.G6 ? '● PASS' : '○ FAIL'}</span>
                        <span class="gate-name">Gate 6: 거래량 10% 조건 (전일 거래량 대비 실측 비율)</span>
                    </div>
                </div>
            </div>
            
            <div class="modal-section">
                <h4>📊 거래량 실측 통계</h4>
                <div class="progress-bar-wrap">
                    <div class="progress-bar-lbl">시간외 거래량 비율: <strong>${item.volRatio ? item.volRatio.toFixed(2) + '%' : '—'}</strong></div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width: ${Math.min(item.volRatio || 0, 100)}%; background: ${gates.G6 ? 'var(--good)' : 'var(--bad)'}"></div>
                    </div>
                    <div class="progress-bar-limit">최소 요구치: 10.00%</div>
                </div>
            </div>
        `;
    } else {
        const breakdown = item.breakdown || {};
        detailHtml = `
            <div class="modal-section">
                <h4>🎯 전략 상세 점수</h4>
                <div class="modal-score-wrap">
                    <span class="modal-score-value">${item.strategyScore}</span>
                    <span class="modal-score-total">/ 10</span>
                </div>
            </div>
            
            <div class="modal-section">
                <h4>📊 채점 내역 (Breakdown)</h4>
                <div class="breakdown-list">
                    <div class="breakdown-item">
                        <span class="breakdown-name">시간외 등락률 가점 (+4~7% 최적)</span>
                        <span class="breakdown-val">+${breakdown.S1 || 0}점</span>
                    </div>
                    <div class="breakdown-item">
                        <span class="breakdown-name">시간외 거래량 기준 부합</span>
                        <span class="breakdown-val">+${breakdown.S2 || 0}점</span>
                    </div>
                    <div class="breakdown-item">
                        <span class="breakdown-name">시가 갭 상승 돌파 강도 (strongOpen)</span>
                        <span class="breakdown-val">+${breakdown.S3 || 0}점</span>
                    </div>
                    <div class="breakdown-item">
                        <span class="breakdown-name">관련 테마 키워드 매칭 가점</span>
                        <span class="breakdown-val">+${breakdown.S5 || 0}점</span>
                    </div>
                    <div class="breakdown-item">
                        <span class="breakdown-name">필라델피아 반도체지수(SOX) 보조 호재</span>
                        <span class="breakdown-val">+${breakdown.S6 || 0}점</span>
                    </div>
                </div>
            </div>

            <div class="modal-section">
                <h4>📊 거래량 실측 통계</h4>
                <div class="progress-bar-wrap">
                    <div class="progress-bar-lbl">시간외 거래량 비율: <strong>${item.volRatio ? item.volRatio.toFixed(2) + '%' : '—'}</strong></div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width: ${Math.min(item.volRatio || 0, 100)}%; background: var(--accent)"></div>
                    </div>
                </div>
            </div>
        `;
    }
    
    bodyEl.innerHTML = detailHtml;
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function bindCardClicks() {
    const cards = document.querySelectorAll(".stock-card");
    cards.forEach(card => {
        card.addEventListener("click", () => {
            const code = card.getAttribute("data-code");
            const strategy = card.getAttribute("data-strategy");
            showDetailModal(code, strategy);
        });
    });
}

// 9. 엔트리 부트스트랩 및 로드
async function boot() {
    const root = document.getElementById("app");
    try {
        const result = await OpenBetArtifactLoader.loadLatestResult();
        currentResultData = result;
        
        root.innerHTML = [
            renderHeader(result),
            renderKrxLiquidationOrders(result),
            renderExecutionTimeline(result),
            renderGapBreakCandidates(result),
            renderOvertimeFollowCandidates(result),
            renderThemes(result),
            renderHeldBack(result)
        ].join("");
        
        setupModalEvents();
        bindCardClicks();
    } catch (error) {
        root.innerHTML = `
            <div class="panel error-panel">
                <h2>데이터 로드 실패</h2>
                <p class="error-msg">${escapeHtml(error.message)}</p>
                <div class="retry-hint">
                    배치 결과 파일이 생성되지 않았거나 JSON 형식이 다릅니다.<br>
                    로컬 환경의 터미널에서 <code>python run_open_bet.py --phase final</code> 명령을 실행한 다음 브라우저를 새로고침하십시오.
                </div>
            </div>
        `;
    }
}

document.addEventListener("DOMContentLoaded", boot);
