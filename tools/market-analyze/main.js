// 동기화 버튼 클릭 이벤트 바인딩
btnSync.addEventListener('click', fetchLiveFinanceData);

// 수동 종토방 슬라이더 연동
document.getElementById('input-sent').addEventListener('input', (e) => {
    marketData.sentiment = parseInt(e.target.value);
    document.getElementById('val-sent').innerText = marketData.sentiment + "점";
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
}

// JSON 파일 백업(저장) 버튼 이벤트
document.getElementById('btn-export').addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(marketData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `market_cycle_data_${new Date().getTime()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
});

// JSON 파일 복구(불러오기) 버튼 및 파일 인풋 이벤트
document.getElementById('btn-import').addEventListener('click', () => {
    document.getElementById('file-import').click();
});

document.getElementById('file-import').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        try {
            const parsed = JSON.parse(evt.target.result);
            marketData = { ...marketData, ...parsed };
            saveMarketData();
            updateDashboardUI();
            calculateCycle();
            document.getElementById('data-status').innerText = "파일 데이터 로드 완료";
            document.getElementById('data-status').className = "text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded";
            alert("데이터가 성공적으로 복구되었습니다.");
        } catch (err) {
            alert("잘못된 형태의 JSON 파일입니다.");
        }
    };
    reader.readAsText(file);
});

// 초기 화면 구동 시 로컬 스토리지 데이터가 있으면 로드 후 UI 갱신
if (loadMarketData()) {
    updateDashboardUI();
    document.getElementById('data-status').innerText = "로컬 저장소 로드됨";
    document.getElementById('data-status').className = "text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded";
}

// 초기 화면 퀀트 스코어 산출
calculateCycle();
