// 동기화 버튼 클릭 이벤트 바인딩
btnSync.addEventListener('click', fetchLiveFinanceData);

// 수동 종토방 슬라이더 연동
document.getElementById('input-sent').addEventListener('input', (e) => {
    marketData.sentiment = parseInt(e.target.value);
    document.getElementById('val-sent').innerText = marketData.sentiment + "점 (수동/AI)";
    saveMarketData(); // 수동 조작 시에도 로컬 스토리지에 즉각 저장
    calculateCycle();
});

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
