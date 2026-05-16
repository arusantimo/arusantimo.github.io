// 전역 상태 변수 설정 (기본 기본값)
let marketData = { fx: 1350, vix: 15.0, sentiment: 50, gold: 2300, disparity: 100, bullRatio: 50, marginSlope: 0, lastSyncTime: "" };
let portfolioData = {
    isa: { aggressiveRatio: 0 },
    pension: { aggressiveRatio: 0 },
    genLong: { cashRatio: 0, aggressiveRatio: 0 },
    quant: { cashRatio: 0 }
};

// DOM 캐싱
const btnSync = document.getElementById('btn-sync');
const syncIcon = document.getElementById('sync-icon');
const syncText = document.getElementById('sync-text');
const logContainer = document.getElementById('sys-log');
const currentTimeEl = document.getElementById('current-time');

// 로그 출력 함수
function log(message) {
    const time = new Date().toLocaleTimeString('ko-KR', { hour12: false });
    const logRow = document.createElement('div');
    logRow.innerHTML = `<span class="text-slate-600">[${time}]</span> ${message}`;
    logContainer.appendChild(logRow);
    logContainer.scrollTop = logContainer.scrollHeight;
}

// 로컬 스토리지 저장 및 불러오기 함수
function saveMarketData() {
    localStorage.setItem('marketAnalyzeData', JSON.stringify(marketData));
    localStorage.setItem('portfolioAnalyzeData', JSON.stringify(portfolioData));
}

function loadMarketData() {
    const savedMarket = localStorage.getItem('marketAnalyzeData');
    const savedPortfolio = localStorage.getItem('portfolioAnalyzeData');
    
    if (savedMarket) {
        try {
            const parsed = JSON.parse(savedMarket);
            marketData = { ...marketData, ...parsed };
        } catch (e) { console.error("시장 데이터 파싱 오류", e); }
    }
    
    if (savedPortfolio) {
        try {
            const parsed = JSON.parse(savedPortfolio);
            portfolioData = { ...portfolioData, ...parsed };
        } catch (e) { console.error("포트폴리오 데이터 파싱 오류", e); }
    }
    
    return !!(savedMarket || savedPortfolio);
}
