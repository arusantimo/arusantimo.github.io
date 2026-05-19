// 동기화 버튼 클릭 이벤트 바인딩
btnSync.addEventListener('click', fetchLiveFinanceData);

// 수동 종토방 슬라이더 연동
document.getElementById('input-sent').addEventListener('input', (e) => {
    marketData.sentiment = parseInt(e.target.value);
    document.getElementById('val-sent').innerText = marketData.sentiment + "점 (수동/AI)";
    saveMarketData(); // 수동 조작 시에도 로컬 스토리지에 즉각 저장
    calculateCycle();
});

function getFlowToneClass(value) {
    if (value === null || value === undefined || Number.isNaN(value)) return 'text-slate-300';
    if (value > 0) return 'text-rose-400';
    if (value < 0) return 'text-cyan-400';
    return 'text-slate-300';
}

function formatKrwMillion(value) {
    if (value === null || value === undefined || Number.isNaN(value)) return "-";
    const absValue = Math.abs(value);
    const sign = value < 0 ? "-" : "";
    if (absValue >= 1_000_000) return `${sign}${(absValue / 1_000_000).toFixed(absValue >= 10_000_000 ? 1 : 2)}조`;
    if (absValue >= 100) return `${sign}${(absValue / 100).toFixed(absValue >= 10_000 ? 0 : 1)}억`;
    return `${sign}${absValue.toFixed(0)}백만`;
}

function formatSignedPercent(value, digits = 1) {
    if (value === null || value === undefined || Number.isNaN(value)) return "-";
    const sign = value > 0 ? "+" : "";
    return `${sign}${value.toFixed(digits)}%`;
}

function getPercentToneClass(value, reverse = false) {
    if (value === null || value === undefined || Number.isNaN(value)) return 'text-slate-400';
    if (Math.abs(value) < 0.001) return 'text-slate-300';
    if (reverse) return value <= 0 ? 'text-rose-400' : 'text-cyan-400';
    return value >= 0 ? 'text-rose-400' : 'text-cyan-400';
}

function updateMarketFlowUI() {
    const flowDateEl = document.getElementById('val-flow-bizdate');
    if (!flowDateEl) return;

    const flowDateLabel = marketData.flowBizDate ? formatFlowBizDateLabel(marketData.flowBizDate) : "기준일";
    flowDateEl.innerText = marketData.flowBizDate ? `기준일 ${flowDateLabel}` : "기준일 -";

    const bindings = [
        { todayId: 'flow-retail-today', cumId: 'flow-retail-10d', todayValue: marketData.retailNetToday, cumValue: marketData.retailNet10dCum },
        { todayId: 'flow-foreign-today', cumId: 'flow-foreign-10d', todayValue: marketData.foreignNetToday, cumValue: marketData.foreignNet10dCum },
        { todayId: 'flow-institution-today', cumId: 'flow-institution-10d', todayValue: marketData.institutionNetToday, cumValue: marketData.institutionNet10dCum }
    ];

    bindings.forEach(({ todayId, cumId, todayValue, cumValue }) => {
        const todayEl = document.getElementById(todayId);
        const cumEl = document.getElementById(cumId);
        if (!todayEl || !cumEl) return;

        todayEl.innerText = `${flowDateLabel} ${formatSignedFlowValue(todayValue)}`;
        todayEl.className = `font-mono font-bold text-sm ${getFlowToneClass(todayValue)}`;
        cumEl.innerText = `10일 누적 ${formatSignedFlowValue(cumValue)}`;
        cumEl.className = `text-[10px] mt-1 ${cumValue === null || cumValue === undefined || Number.isNaN(cumValue) ? 'text-slate-500' : getFlowToneClass(cumValue)}`;
    });

    const reasonEl = document.getElementById('val-flow-reason');
    reasonEl.innerText = marketData.flowReason || "수급 데이터 대기 중 (중립 처리)";
    reasonEl.className = `mt-3 text-[10px] leading-relaxed ${marketData.flowBonus > 0 ? 'text-rose-300' : 'text-slate-500'}`;
}

function updateLeaderTrapUI() {
    const dateEl = document.getElementById('val-leader-date');
    const bodyEl = document.getElementById('leader-trap-body');
    const summaryEl = document.getElementById('val-leader-summary');
    if (!dateEl || !bodyEl || !summaryEl) return;

    dateEl.innerText = marketData.leaderSnapshotDate ? `기준일 ${formatFlowBizDateLabel(marketData.leaderSnapshotDate)}` : "기준일 -";

    if (!Array.isArray(marketData.leaderStocks) || !marketData.leaderStocks.length) {
        bodyEl.innerHTML = `<div class="text-[11px] text-slate-500 bg-slate-900/40 p-3 rounded-lg border border-slate-700/50">대표주 데이터 대기 중</div>`;
        summaryEl.innerText = marketData.trapReason || "트랩 데이터 대기 중 (중립 처리)";
        summaryEl.className = "mt-3 text-[10px] leading-relaxed text-slate-500";
        return;
    }

    bodyEl.innerHTML = marketData.leaderStocks.map(stock => `
        <div class="leader-card">
            <div class="flex items-start justify-between gap-3">
                <div>
                    <div class="text-xs font-bold text-slate-100">${stock.name}</div>
                    <div class="text-[10px] text-slate-500">15일 누적 ${formatKrwMillion(stock.cum15dTradingValue)} · 비중 ${(stock.weight * 100).toFixed(0)}%</div>
                </div>
                <div class="text-right">
                    <div class="text-xs font-bold ${getPercentToneClass(stock.dayReturnPct)}">${formatSignedPercent(stock.dayReturnPct)}</div>
                    <div class="text-[10px] text-slate-500">당일</div>
                </div>
            </div>
            <div class="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[10px]">
                <div class="text-slate-400">15일 낙폭</div>
                <div class="text-right ${getPercentToneClass(stock.drawdown15dPct, true)}">${formatSignedPercent(stock.drawdown15dPct)}</div>
                <div class="text-slate-400">첫 음봉 폭발</div>
                <div class="text-right ${stock.shockValueRatio >= 1 ? 'text-rose-300' : 'text-slate-400'}">${stock.shockValueRatio ? `${stock.shockValueRatio.toFixed(2)}x` : '-'}</div>
                <div class="text-slate-400">3일 누적 낙폭</div>
                <div class="text-right ${getPercentToneClass(stock.threeDayDropPct, true)}">${formatSignedPercent(stock.threeDayDropPct)}</div>
                <div class="text-slate-400">종가 회복률</div>
                <div class="text-right ${stock.closeRecoveryRate <= 0.45 ? 'text-rose-300' : 'text-slate-400'}">${stock.closeRecoveryRate !== null && stock.closeRecoveryRate !== undefined ? `${(stock.closeRecoveryRate * 100).toFixed(0)}%` : '-'}</div>
            </div>
        </div>
    `).join('');

    summaryEl.innerText = marketData.trapReason || "트랩 데이터 대기 중 (중립 처리)";
    summaryEl.className = `mt-3 text-[10px] leading-relaxed ${marketData.trapScore >= 10 ? 'text-rose-300' : 'text-slate-500'}`;
}

// 대시보드 UI를 상태에 맞게 수동 강제 업데이트하는 함수
function updateDashboardUI() {
    document.getElementById('val-fx').innerText = marketData.fx.toLocaleString() + " 원";
    document.getElementById('val-fx').className = "font-mono font-bold text-emerald-400 text-lg";

    document.getElementById('val-vix').innerText = marketData.vix.toFixed(2);
    document.getElementById('val-vix').className = "font-mono font-bold text-emerald-400 text-lg";

    document.getElementById('val-gold').innerText = "$ " + marketData.gold.toLocaleString();
    document.getElementById('val-gold').className = "font-mono font-bold text-emerald-400 text-lg";

    document.getElementById('val-disparity').innerText = marketData.disparity.toFixed(2) + " %";
    document.getElementById('val-disparity').className = "font-mono font-bold text-emerald-400 text-lg";

    document.getElementById('val-bull-ratio').innerText = marketData.bullRatio.toFixed(1) + " %";
    document.getElementById('val-bull-ratio').className = "font-mono font-bold text-emerald-400 text-lg";

    const slope = marketData.marginSlope;
    document.getElementById('val-margin-slope').innerText = (slope > 0 ? "+" : "") + slope.toFixed(2);
    document.getElementById('val-margin-slope').className = `font-mono font-bold text-lg ${slope > 0 ? 'text-rose-400' : 'text-cyan-400'}`;

    document.getElementById('val-sent').innerText = marketData.sentiment + "점 (수동/AI)";
    document.getElementById('val-sent').className = "font-mono text-cyan-400 font-bold text-lg";
    document.getElementById('input-sent').value = marketData.sentiment;

    if (marketData.lastSyncTime) {
        document.getElementById('current-time').innerText = "마지막 동기화: " + marketData.lastSyncTime;
    }

    updateMarketFlowUI();
    updateLeaderTrapUI();

    // 포트폴리오 입력 필드 업데이트
    updatePortfolioUI();
}

// 포트폴리오 입력 필드 값들을 데이터 상태와 동기화
function updatePortfolioUI() {
    const inputs = document.querySelectorAll('.portfolio-input');
    inputs.forEach(input => {
        const key = input.getAttribute('data-key');
        const field = input.getAttribute('data-field') || 'cashRatio';
        if (portfolioData[key]) {
            const val = portfolioData[key][field] || 0;
            input.value = val;
            const valSpan = input.nextElementSibling;
            if (valSpan && valSpan.classList.contains('portfolio-val')) {
                valSpan.innerText = val + "%";
            }
        }
    });
}

// 포트폴리오 입력 이벤트 리스너 (위임 방식)
const portfolioBody = document.getElementById('portfolio-guide-body');
if (portfolioBody) {
    portfolioBody.addEventListener('input', (e) => {
        if (e.target.classList.contains('portfolio-input')) {
            const key = e.target.getAttribute('data-key');
            const field = e.target.getAttribute('data-field') || 'cashRatio';
            portfolioData[key][field] = e.target.value;
            
            const valSpan = e.target.nextElementSibling;
            if (valSpan && valSpan.classList.contains('portfolio-val')) {
                valSpan.innerText = e.target.value + "%";
            }
            
            saveMarketData();
            calculateCycle();
        }
    });
}

// --- 마켓 데이터 전용 JSON 백업(저장) ---
document.getElementById('btn-export').addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(marketData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `market_analyze_data_${new Date().getTime()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
});

// --- 포트폴리오 설정 전용 JSON 백업(저장) ---
document.getElementById('btn-portfolio-export').addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(portfolioData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `portfolio_settings_${new Date().getTime()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
});

// JSON 파일 복구(불러오기) 버튼 및 파일 인풋 이벤트
document.getElementById('btn-import').addEventListener('click', () => {
    document.getElementById('file-import').click();
});

// --- 마켓 데이터 전용 파일 인풋 이벤트 ---
document.getElementById('file-import').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        try {
            const parsed = JSON.parse(evt.target.result);
            // 만약 통합 포맷이나 포트폴리오 전용 파일이 들어왔을 경우를 대비한 처리
            const dataToLoad = parsed.marketData || parsed;
            marketData = { ...marketData, ...dataToLoad };

            saveMarketData();
            updateDashboardUI();
            calculateCycle();
            
            document.getElementById('data-status').innerText = "시장 데이터 로드 완료";
            alert("시장 분석 데이터가 성공적으로 복구되었습니다.");
        } catch (err) {
            alert("잘못된 형태의 JSON 파일입니다.");
        }
    };
    reader.readAsText(file);
});

// --- 포트폴리오 설정 전용 불러오기 버튼 및 파일 인풋 이벤트 ---
document.getElementById('btn-portfolio-import').addEventListener('click', () => {
    document.getElementById('file-portfolio-import').click();
});

document.getElementById('file-portfolio-import').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        try {
            const parsed = JSON.parse(evt.target.result);
            const dataToLoad = parsed.portfolioData || parsed;
            portfolioData = { ...portfolioData, ...dataToLoad };

            saveMarketData();
            updateDashboardUI();
            calculateCycle();
            
            alert("포트폴리오 설정이 성공적으로 복구되었습니다.");
        } catch (err) {
            alert("잘못된 형태의 포트폴리오 설정 파일입니다.");
        }
    };
    reader.readAsText(file);
});

// 거장 이론 서브탭 전환
const theorySubtabBar = document.getElementById('theory-subtab-bar');
if (theorySubtabBar) {
    theorySubtabBar.addEventListener('click', (e) => {
        const btn = e.target.closest('.theory-subtab-btn');
        if (!btn) return;
        const target = btn.dataset.subtab;
        document.querySelectorAll('.theory-subtab-btn').forEach(b => b.classList.toggle('is-active', b === btn));
        document.querySelectorAll('.theory-subtab-panel').forEach(p => p.classList.toggle('is-active', p.dataset.subtabPanel === target));
        renderTheorySubtabs();
    });
}

function formatNullable(value, suffix = '', digits = 2) {
    if (value === null || value === undefined || Number.isNaN(value)) return '-';
    const num = Number(value);
    if (!Number.isFinite(num)) return '-';
    return `${num.toFixed(digits)}${suffix}`;
}

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getWyckoffActionGuide(phase, confidence) {
    const confidencePct = Math.round((Number(confidence) || 0) * 100);
    const guides = {
        A: {
            title: '하락 정지 대응',
            body: `급락 진정 여부를 먼저 확인하세요. ${confidencePct >= 55 ? '소액 분할 진입을 검토할 수 있지만' : '아직은'} 추세 반전 확정 전까지는 현금과 관찰 비중을 유지하는 편이 좋습니다.`
        },
        B: {
            title: '매집 구간 대응',
            body: `박스권 분할 매수에 유리한 구간입니다. 다만 상단 돌파 전까지는 한 번에 크게 들어가기보다 여러 번 나눠 담는 쪽이 안정적입니다.`
        },
        C: {
            title: 'Spring 구간 대응',
            body: `하단 테스트 후 회복 신호입니다. 회복이 하루 이틀 더 이어지는지 확인하면서 확인 매수 성격으로 접근하는 것이 좋습니다.`
        },
        D: {
            title: '상승 추세 대응',
            body: `보유 유지나 눌림목 추가 대응이 가능한 구간입니다. 다만 과열 추격보다는 거래량이 실린 돌파 이후 눌림을 기다리는 편이 좋습니다.`
        },
        E: {
            title: '분배 구간 대응',
            body: `신규 진입은 보수적으로 보고, 기존 보유분은 분할 익절이나 비중 축소를 우선 검토하세요. 반등이 나와도 회복 매수보다 리스크 관리가 먼저입니다.`
        },
        NEUTRAL: {
            title: '관망 대응',
            body: `증거가 아직 한쪽으로 충분히 모이지 않았습니다. 후보 단계와 신뢰도를 참고하되, 포지션은 가볍게 유지하고 다음 동기화에서 구조 변화를 확인하는 편이 좋습니다.`
        }
    };
    return guides[phase] || guides.NEUTRAL;
}

function initializeWyckoffHelpModal() {
    const modal = document.getElementById('wyckoff-help-modal');
    const openBtn = document.getElementById('wyckoff-help-open');
    if (!modal || !openBtn) return;

    const closeModal = () => modal.classList.add('hidden');
    const openModal = () => modal.classList.remove('hidden');

    openBtn.addEventListener('click', openModal);
    modal.addEventListener('click', (e) => {
        const target = e.target;
        if (target instanceof HTMLElement && target.dataset.wyckoffClose === 'true') {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

function renderSorosPanel() {
    const synergy = Number(marketData.reflexivitySynergyPoints) || 0;
    const synergyValue = document.getElementById('soros-synergy-value');
    const synergyBar = document.getElementById('soros-synergy-bar');
    const stateLabel = document.getElementById('soros-state-label');
    const stateNote = document.getElementById('soros-state-note');
    const dispValue = document.getElementById('soros-disparity-value');
    const sentValue = document.getElementById('soros-sentiment-value');
    const banner = document.getElementById('soros-debasement-banner');
    if (!synergyValue) return;

    synergyValue.innerText = synergy.toFixed(1);
    synergyBar.style.width = `${Math.min(100, (synergy / 25) * 100)}%`;

    const state = marketData.reflexivityState || 'normal';
    const labels = {
        normal: { label: '상태: 정상 (피드백 루프 없음)', color: '#cbd5e1', note: '이격도와 심리 모두 안정 구간. 정상적인 추세를 따르세요.' },
        caution: { label: '상태: 주의 (재귀 루프 형성 중)', color: '#fbbf24', note: '가격과 심리가 동조하기 시작합니다. 신규 공격 매수 속도를 늦추세요.' },
        runaway: { label: '상태: 폭주 (정점 임박)', color: '#f43f5e', note: '가격이 가격을 강화하는 폭주 구간. 분할 익절과 현금 비중 확대가 우선입니다.' }
    };
    const meta = labels[state];
    stateLabel.innerText = meta.label;
    stateLabel.style.color = meta.color;
    stateNote.innerText = meta.note;

    dispValue.innerText = formatNullable(marketData.disparity, '%', 2);
    sentValue.innerText = formatNullable(marketData.sentiment, '점', 0);
    banner.classList.toggle('hidden', !marketData.debasementAlert);
}

const KOSTOLANY_STAGE_NAMES = {
    A1: '하락 1 · 안도', A2: '하락 2 · 부인', A3: '하락 3 · 항복',
    B1: '상승 1 · 회복', B2: '상승 2 · 정석', B3: '상승 3 · 환희'
};

function renderKostolanyPanel() {
    const stage = marketData.kostolanyStage || 'B2';
    const stageLabel = document.getElementById('kostolany-stage-label');
    if (!stageLabel) return;

    stageLabel.innerText = `${stage} · ${KOSTOLANY_STAGE_NAMES[stage] || ''}`;
    document.getElementById('kostolany-divergence-note').innerText = marketData.kostolanyDivergenceNote || '-';
    document.getElementById('kostolany-p-index').innerText = Math.round(marketData.riskIndex || 0);
    document.getElementById('kostolany-bull-ratio').innerText = formatNullable(marketData.bullRatio, '%', 1);
    document.getElementById('kostolany-deposit').innerText = Number.isFinite(marketData.customerDeposit)
        ? `${Math.round(marketData.customerDeposit).toLocaleString()}억`
        : '-';
    const slope = marketData.customerDepositSlope;
    document.getElementById('kostolany-deposit-slope').innerText = Number.isFinite(slope)
        ? `${slope > 0 ? '+' : ''}${slope.toFixed(1)}`
        : '-';

    document.querySelectorAll('.kostolany-egg-cell').forEach(cell => {
        cell.classList.toggle('is-active', cell.dataset.egg === stage);
    });
}

function renderWyckoffPanel() {
    const body = document.getElementById('wyckoff-body');
    if (!body) return;

    const stocks = Array.isArray(marketData.leaderStocks) ? marketData.leaderStocks : [];
    if (!stocks.length) {
        body.innerHTML = `<div class="text-[11px] text-slate-500 bg-slate-900/40 p-3 rounded-lg border border-slate-700/50">대표주 데이터 대기 중</div>`;
        return;
    }

    const phaseLabel = typeof getWyckoffPhaseLabel === 'function' ? getWyckoffPhaseLabel : (p => p);
    const phaseAccent = typeof getWyckoffPhaseAccent === 'function' ? getWyckoffPhaseAccent : (() => '#64748b');

    body.innerHTML = stocks.map(stock => {
        const phase = stock.wyckoffPhase || 'NEUTRAL';
        const accent = phaseAccent(phase);
        const isNeutral = phase === 'NEUTRAL';
        const candidatePhase = stock.wyckoffCandidatePhase || 'NEUTRAL';
        const candidateLabel = phaseLabel(candidatePhase);
        const actionGuide = getWyckoffActionGuide(phase, stock.wyckoffConfidence);
        const wyckoffHistoryCount = Number(stock.historyWyckoffCount ?? stock.history60dCount) || 0;
        const investorSeriesCount = Number(stock.investorSeriesCount) || 0;
        const foreignCum = stock.foreignNetCumWyckoff ?? stock.foreignNetCum60d;
        const instCum = stock.instNetCumWyckoff ?? stock.instNetCum60d;
        const flowPeriodLabel = investorSeriesCount > 0 ? `${investorSeriesCount}일` : '-';
        const foreignTone = !Number.isFinite(foreignCum)
            ? 'text-slate-500'
            : foreignCum > 0 ? 'text-emerald-300' : 'text-rose-300';
        const instTone = !Number.isFinite(instCum)
            ? 'text-slate-500'
            : instCum > 0 ? 'text-emerald-300' : 'text-rose-300';
        const investorReason = stock.investorSeriesAvailable === false
            ? ` · ${stock.investorSeriesReason || '투자자 수급 미연동'}`
            : investorSeriesCount > 0 && investorSeriesCount < wyckoffHistoryCount
                ? ` · 수급 ${investorSeriesCount}영업일`
                : '';
        const historyReason = wyckoffHistoryCount < 120
            ? ` · 구조 ${wyckoffHistoryCount}영업일`
            : ' · 구조 120영업일';
        return `
            <div class="wyckoff-card">
                <div>
                    <div class="flex items-center gap-2 mb-1">
                        <span class="text-sm font-bold text-slate-100">${stock.name}</span>
                        <span class="text-[10px] text-slate-500">${stock.code} · 비중 ${(stock.weight * 100).toFixed(0)}%</span>
                    </div>
                    <div class="grid grid-cols-3 gap-x-3 gap-y-1 text-[10px]">
                        <div class="text-slate-400">15일 낙폭</div>
                        <div class="text-slate-400">외인 누적 (${flowPeriodLabel})</div>
                        <div class="text-slate-400">기관 누적 (${flowPeriodLabel})</div>
                        <div class="${stock.drawdown15dPct <= -5 ? 'text-rose-300' : 'text-slate-200'} font-mono">${formatNullable(stock.drawdown15dPct, '%', 1)}</div>
                        <div class="${foreignTone} font-mono">${Number.isFinite(foreignCum) ? foreignCum.toLocaleString() : '-'}</div>
                        <div class="${instTone} font-mono">${Number.isFinite(instCum) ? instCum.toLocaleString() : '-'}</div>
                    </div>
                    <div class="text-[10px] text-slate-500 mt-1">${stock.wyckoffReason || ''}${historyReason}${investorReason}</div>
                    <div class="text-[10px] mt-1 ${isNeutral ? 'text-amber-300' : 'text-slate-500'}">후보 단계 ${candidateLabel}${stock.wyckoffCandidateReason ? ` · ${stock.wyckoffCandidateReason}` : ''}</div>
                </div>
                <div class="text-right">
                    <span class="phase-badge-wrap" tabindex="0">
                        <span class="phase-badge ${isNeutral ? 'is-neutral' : ''}" style="${isNeutral ? '' : `background:${accent};`}">${phaseLabel(phase)}</span>
                        <span class="phase-hover-tip"><strong>${escapeHtml(actionGuide.title)}</strong>${escapeHtml(actionGuide.body)}</span>
                    </span>
                    <div class="text-[10px] text-slate-500 mt-1">${isNeutral ? '보류 신뢰도' : '신뢰도'} ${Math.round((stock.wyckoffConfidence || 0) * 100)}%</div>
                </div>
            </div>
        `;
    }).join('');
}

function renderMinskyPanel() {
    const slopeEl = document.getElementById('minsky-margin-slope');
    if (!slopeEl) return;
    const slope = marketData.marginSlope;
    slopeEl.innerText = Number.isFinite(slope) ? `${slope > 0 ? '+' : ''}${slope.toFixed(2)}` : '-';
    slopeEl.style.color = slope > 0 ? '#f87171' : slope < 0 ? '#22d3ee' : '#cbd5e1';

    const ratio = marketData.depositMarginRatio;
    const ratioEl = document.getElementById('minsky-deposit-ratio');
    ratioEl.innerText = Number.isFinite(ratio) ? `${(ratio * 100).toFixed(1)}%` : '-';
    ratioEl.style.color = Number.isFinite(ratio) && ratio >= 0.20 ? '#f87171' : '#e2e8f0';
    document.getElementById('minsky-deposit-state').innerText = !Number.isFinite(ratio)
        ? '금액 기준 비율 · 데이터 부족'
        : Number.isFinite(ratio) && ratio >= 0.20
            ? '금액 기준 비율 · 폰지 임계 초과'
            : '금액 기준 비율 · 계좌 수 지표 아님';

    const shock = marketData.marginShockChangePct;
    const shockEl = document.getElementById('minsky-shock-change');
    const shockStateEl = document.getElementById('minsky-shock-state');
    shockEl.innerText = Number.isFinite(shock) ? `${shock > 0 ? '+' : ''}${shock.toFixed(2)}%` : '-';
    shockEl.style.color = Number.isFinite(shock) && shock >= 0 ? '#f87171' : '#22d3ee';
    const shockAnchorLabel = marketData.shockAnchorDate
        ? (typeof formatFlowBizDateLabel === 'function' ? formatFlowBizDateLabel(marketData.shockAnchorDate) : marketData.shockAnchorDate)
        : '';
    if (Number.isFinite(shock)) {
        shockStateEl.innerText = shock >= 0
            ? '0% 이상 유지 시 마진콜 임박'
            : '충격 이후 신용이 감소 중';
    } else if (!marketData.shockAnchorDate) {
        shockStateEl.innerText = '대표주 충격일 미검출로 비교 보류';
    } else if (!Number.isFinite(marketData.marginBalanceBeforeShock)) {
        shockStateEl.innerText = `${shockAnchorLabel} 이전 기준 신용잔고 없음`;
    } else {
        shockStateEl.innerText = '비교용 신용 데이터 부족';
    }

    const trapState = marketData.trapState;
    const banner = document.getElementById('minsky-banner');
    const showBanner = (trapState === 'complacency' || trapState === 'denial') && Number.isFinite(shock) && shock >= 0;
    banner.classList.toggle('hidden', !showBanner);
}

function renderTheorySubtabs() {
    renderSorosPanel();
    renderKostolanyPanel();
    renderWyckoffPanel();
    renderMinskyPanel();
}

initializeWyckoffHelpModal();

// 초기 화면 구동 시 로컬 JSON 파일에서 데이터 로드 (Async)
async function initData() {
    try {
        // 1. 마켓 데이터 로드
        const marketRes = await fetch('store/market_analyze_data.json');
        if (marketRes.ok) {
            const mData = await marketRes.json();
            marketData = { ...marketData, ...mData };
            document.getElementById('data-status').innerText = "서버 데이터 로드됨";
        }

        // 2. 포트폴리오 설정 로드
        const portfolioRes = await fetch('store/portfolio_settings.json');
        if (portfolioRes.ok) {
            const pData = await portfolioRes.json();
            portfolioData = { ...portfolioData, ...pData };
        }

        // UI 업데이트 및 계산
        updateDashboardUI();
        calculateCycle();
        
        document.getElementById('data-status').className = "text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded";
    } catch (err) {
        console.error("초기 데이터 로드 중 오류:", err);
        // 오류 발생 시 로컬 스토리지 시도 (백업용)
        if (loadMarketData()) {
            updateDashboardUI();
            calculateCycle();
            document.getElementById('data-status').innerText = "로컬 저장소 로드됨";
        }
    }
}

initData();
