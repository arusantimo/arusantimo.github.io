document.addEventListener('DOMContentLoaded', () => {
    const btnCurrentTab = document.getElementById('btn-current-tab');
    const btnAll = document.getElementById('btn-all');
    const statusEl = document.getElementById('status');

    function showStatus(message, isError = false) {
        statusEl.textContent = message;
        
        if (isError) {
            statusEl.classList.add('error');
        } else {
            statusEl.classList.remove('error');
        }
        
        statusEl.classList.add('show');
        
        setTimeout(() => {
            statusEl.classList.remove('show');
        }, 3000);
    }

    function downloadAsJson(data, filename) {
        // 데이터를 예쁘게 포맷팅한 JSON 문자열로 변환
        const jsonString = JSON.stringify(data, null, 2);
        
        // Blob 객체 생성
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        // a 태그를 생성하여 프로그래밍 방식으로 클릭 이벤트를 트리거해 다운로드 실행
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        
        // 메모리 누수 방지
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 100);
    }

    // 현재 탭 쿠키 다운로드
    btnCurrentTab.addEventListener('click', async () => {
        try {
            // 현재 활성화된 탭 정보 가져오기
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            if (!tab || !tab.url) {
                // chrome:// URL 등의 특수 탭에서는 작동하지 않을 수 있음
                showStatus('현재 탭의 URL 정보를 가져올 수 없습니다.', true);
                return;
            }

            const url = new URL(tab.url);
            
            // 현재 URL에 유효한 모든 쿠키 가져오기 (상위 도메인 포함)
            const cookies = await chrome.cookies.getAll({ url: tab.url });
            
            if (cookies.length === 0) {
                showStatus('이 사이트에 저장된 쿠키가 없습니다.', true);
                return;
            }
            
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
            const cleanHostname = url.hostname.replace(/[^a-zA-Z0-9]/g, '_');
            
            downloadAsJson(cookies, `cookies_${cleanHostname}_${timestamp}.json`);
            showStatus(`${cookies.length}개의 쿠키를 성공적으로 다운로드했습니다.`);
            
        } catch (error) {
            console.error('쿠키 추출 중 오류:', error);
            showStatus('오류가 발생했습니다. 특수 페이지(chrome://)인지 확인하세요.', true);
        }
    });

    // 모든 쿠키 다운로드
    btnAll.addEventListener('click', async () => {
        try {
            // 모든 도메인의 쿠키 가져오기
            const cookies = await chrome.cookies.getAll({});
            
            if (cookies.length === 0) {
                showStatus('브라우저에 저장된 쿠키가 없습니다.', true);
                return;
            }
            
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
            downloadAsJson(cookies, `all_cookies_${timestamp}.json`);
            showStatus(`총 ${cookies.length}개의 쿠키를 성공적으로 다운로드했습니다.`);
            
        } catch (error) {
            console.error('전체 쿠키 추출 중 오류:', error);
            showStatus('쿠키 데이터를 가져오는 중 오류가 발생했습니다.', true);
        }
    });
});
