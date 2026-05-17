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
