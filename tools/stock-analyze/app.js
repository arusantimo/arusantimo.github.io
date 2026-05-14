// CORS Proxy to bypass Naver's block (여러 개의 프록시 서버를 두어 안정성을 높임)
const PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://api.codetabs.com/v1/proxy?quest=',
  'https://corsproxy.io/?'
];

let stocks = {
  pullback: [], // 눌림목
  momentum: []  // 수급매집형
};

// 분석 완료된 종목별 상세 데이터 저장소
const stockDetailMap = {};

function log(msg) {
  const out = document.getElementById('log-output');
  const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false });
  out.innerHTML += `<div><span class="time">[${timeStr}]</span> ${msg}</div>`;
  out.scrollTop = out.scrollHeight;
}

// 1. 노션 데이터 불러오기
async function fetchNotionData() {
  const urlInput = document.getElementById('notion-url').value;
  const matchId = urlInput.replace(/-/g, '').match(/[a-f0-9]{32}/i);
  if (!matchId) {
    alert('유효한 노션 주소 또는 페이지 ID를 입력해주세요.');
    return;
  }
  const notionId = matchId[0];
  const apiUrl = `https://notion-api.splitbee.io/v1/page/${notionId}`;

  // 성공적으로 형식을 통과한 URL을 로컬 스토리지에 저장
  localStorage.setItem('savedNotionUrl', urlInput);

  log(`노션(Notion) 공용 페이지(${notionId.substring(0, 6)}...) 파싱 중입니다...`);
  const btn = document.getElementById('btn-fetch-notion');
  btn.disabled = true;
  btn.innerHTML = '<span>⏳</span> 파싱 중...';

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error("Notion API fetch failed");
    const data = await res.json();

    // 기존 데이터 초기화
    stocks.pullback = [];
    stocks.momentum = [];

    let currentSection = '';

    Object.values(data).forEach(blockWrapper => {
      if (!blockWrapper.value || !blockWrapper.value.value) return;
      const block = blockWrapper.value.value;
      if (!block || !block.properties || !block.properties.title) return;

      const titleText = block.properties.title.map(t => t[0]).join('');

      if (titleText.includes('눌림목 종가베팅 추천 종목')) {
        currentSection = 'pullback';
      } else if (titleText.includes('수급 매집형 종가베팅 추천 종목')) {
        currentSection = 'momentum';
      } else if (block.type === 'bulleted_list' && currentSection) {
        const match = titleText.match(/([가-힣A-Za-z0-9]+)\s*\((\d{6})\)/);
        if (match) {
          const stockObj = {
            name: match[1],
            code: match[2],
            type: currentSection
          };
          if (!stocks[currentSection].find(s => s.code === stockObj.code)) {
            stocks[currentSection].push(stockObj);
          }
        }
      }
    });

    log(`성공적으로 불러왔습니다. (눌림목: ${stocks.pullback.length}개, 수급매집형: ${stocks.momentum.length}개)`);
    renderStockCards();

    if (stocks.pullback.length > 0 || stocks.momentum.length > 0) {
      document.getElementById('btn-analyze').disabled = false;
    }
  } catch (e) {
    log('<span style="color:var(--text-danger)">오류: 노션 데이터를 파싱하는 데 실패했습니다. 올바른 공개 페이지인지 확인해주세요.</span>');
    console.error(e);
  } finally {
    btn.disabled = false;
    btn.innerHTML = '불러오기';
  }
}

document.getElementById('btn-fetch-notion').addEventListener('click', fetchNotionData);

// 수동 추가 로직 헬퍼 함수
function handleManualAdd(type, nameInputId, codeInputId) {
  const name = document.getElementById(nameInputId).value.trim();
  const code = document.getElementById(codeInputId).value.trim();

  if (!name || !code) {
    alert('종목명과 종목코드(6자리)를 모두 입력해주세요.');
    return;
  }
  if (!/^\d{6}$/.test(code)) {
    alert('종목코드는 6자리 숫자여야 합니다.');
    return;
  }

  if (!stocks[type].find(s => s.code === code)) {
    stocks[type].push({ name, code, type });
    renderStockCards();
    document.getElementById('btn-analyze').disabled = false;
    log(`▶ 수동 추가: ${name} (${code}) -> ${type === 'pullback' ? '눌림목 베팅' : '수급 매집형'}`);

    document.getElementById(nameInputId).value = '';
    document.getElementById(codeInputId).value = '';
    document.getElementById(nameInputId).focus();
  } else {
    alert('이미 추가된 종목입니다.');
  }
}

document.getElementById('btn-add-pullback').addEventListener('click', () => handleManualAdd('pullback', 'pullback-name', 'pullback-code'));
document.getElementById('btn-add-momentum').addEventListener('click', () => handleManualAdd('momentum', 'momentum-name', 'momentum-code'));

function renderStockCards() {
  const renderGroup = (arr, containerId) => {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    if (arr.length === 0) {
      container.innerHTML = '<div style="font-size: 14px; color: var(--text-tertiary); padding: 20px; background: var(--bg-secondary); border-radius: 8px;">추출된 종목이 없습니다.</div>';
      return;
    }
    arr.forEach(s => {
      container.innerHTML += `
                <div class="scard" id="card-${s.code}">
                    <div class="scard-head">
                        <div><div class="scard-name">${s.name}</div><div class="scard-code">${s.code}</div></div>
                        <span class="badge badge-pending" id="badge-${s.code}">대기 중</span>
                    </div>
                    <div class="price-row" id="price-row-${s.code}">
                        <span class="price" style="font-size:16px;color:var(--text-tertiary);font-weight:500;">대기 중</span>
                    </div>
                    <div class="meta" id="meta-${s.code}">
                        매수가(전일종가): 대기 중
                    </div>
                    <div class="indicators" id="ind-${s.code}">
                        <div class="ind-item unknown">상단에서 '분석 시작' 버튼을 눌러주세요.</div>
                    </div>
                </div>
            `;
    });
  };

  renderGroup(stocks.pullback, 'list-pullback');
  renderGroup(stocks.momentum, 'list-momentum');
}

// 현재 시각 표시 업데이트
function updateCurrentTime() {
  const now = new Date();
  const hh = now.getHours().toString().padStart(2, '0');
  const mm = now.getMinutes().toString().padStart(2, '0');
  const ss = now.getSeconds().toString().padStart(2, '0');
  const totalMins = now.getHours() * 60 + now.getMinutes();
  const isBefore = totalMins < (9 * 60 + 8);
  const label = isBefore ? '[1차 분석] 9:08 이전 (수급 매집형 손절 점검)' : '[2차 분석] 9:08 이후 (전체 매도/손절 분석)';
  const el = document.getElementById('current-time-display');
  if (el) el.innerHTML = `🕒 현재 시각: <strong>${hh}:${mm}:${ss}</strong> &nbsp;|&nbsp; 적용 로직: <strong style="color:${isBefore ? 'var(--text-warning)' : 'var(--text-success)'}">${label}</strong>`;
  
  // 버튼 텍스트 업데이트 (분석 중이 아닐 때만)
  const analyzeBtn = document.getElementById('btn-analyze');
  if (analyzeBtn && !analyzeBtn.disabled) {
      const btnText = analyzeBtn.innerHTML.includes('다시') ? '다시 분석' : '분석 시작';
      analyzeBtn.innerHTML = `<span>⚡</span> ${isBefore ? '1차' : '2차'} ${btnText}`;
  }
}
updateCurrentTime();
setInterval(updateCurrentTime, 1000);

// 2. 분석 시작
document.getElementById('btn-analyze').addEventListener('click', async () => {
  const now = new Date();
  const totalMins = now.getHours() * 60 + now.getMinutes();
  const isBefore0908 = totalMins < (9 * 60 + 8);
  const timeStr = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;

  const btn = document.getElementById('btn-analyze');
  btn.disabled = true;
  btn.innerHTML = '<span>⚡</span> 분석 진행 중...';

  log(`▶ [현재 시각: ${timeStr}] 분석을 시작합니다. (9시 8분 <b>${isBefore0908 ? '이전' : '이후'}</b> 로직 적용)`);

  const allStocks = [...stocks.pullback, ...stocks.momentum];

  for (let s of allStocks) {
    await analyzeStock(s, isBefore0908);
    // 안정적인 수집을 위해 종목 간 대기 시간을 1.5초로 증가
    await new Promise(r => setTimeout(r, 1500));
  }

  log('✅ 모든 종목의 시그널 분석이 완료되었습니다.');
  btn.disabled = false;
  btn.innerHTML = '<span>⚡</span> 다시 분석';
});

async function analyzeStock(stock, isBefore0908) {
  log(`- [${stock.name}] 네이버 증권 데이터 파싱 중...`);
  const maxRetries = 2; // 최대 2회 재시도 (총 3번 시도)
  
  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    try {
      // CORS 우회 프록시 선택 (attempt 순서에 따라 교체)
      const proxy = PROXIES[(attempt - 1) % PROXIES.length];

      // ── 네이버 모바일 API: /basic (현재가, 등락률) ──
      const basicUrl = `https://m.stock.naver.com/api/stock/${stock.code}/basic`;
      const basicRes = await fetch(proxy + encodeURIComponent(basicUrl));
      if (!basicRes.ok) throw new Error(`basic API error (${basicRes.status})`);
      const basicJson = await basicRes.json();

      // closePrice 는 문자열 "394,500" 형태
      const parseNum = s => parseInt(String(s).replace(/,/g, '')) || 0;
      const parseFloat2 = s => parseFloat(String(s).replace(/,/g, '').replace('%', '')) || 0;

      const currentPrice = parseNum(basicJson.closePrice ?? basicJson.stockPrice ?? 0);
      const chgRateRaw   = parseFloat2(basicJson.fluctuationsRatio ?? basicJson.changeRate ?? 0);

      // ── 네이버 모바일 API: /integration (전일종가, 시가) ──
      const intUrl = `https://m.stock.naver.com/api/stock/${stock.code}/integration`;
      const intRes = await fetch(proxy + encodeURIComponent(intUrl));
      if (!intRes.ok) throw new Error(`integration API error (${intRes.status})`);
      const intJson = await intRes.json();

      // totalInfos = [{code, key, value}, ...] 배열 구조
      const findInfo = code => (intJson.totalInfos ?? []).find(i => i.code === code);
      const prevClose = parseNum(findInfo('lastClosePrice')?.value ?? 0) || currentPrice;
      const openPrice = parseNum(findInfo('openPrice')?.value ?? 0);

      // ── 등락률: API 값 우선, 없으면 직접 계산 ──
      const chgRate = chgRateRaw !== 0 ? chgRateRaw
        : (prevClose > 0 ? ((currentPrice - prevClose) / prevClose) * 100 : 0);

      // ── 체결강도: 네이버 모든 API 미제공 ──
      const strength = null;

      // ── 이동평균선 계산: dealTrendInfos (최근 5영업일 종가) ──
      // dealTrendInfos[0] = 어제, [1] = 그제 ... (최신순 정렬)
      const deals = intJson.dealTrendInfos ?? [];
      const pastPrices = deals.map(d => parseNum(d.closePrice ?? 0)).filter(p => p > 0);
      // 5일 MA: 어제 포함 5일 종가 평균 (오늘 현재가는 제외, 순수 이동평균)
      const ma5 = pastPrices.length >= 5
        ? Math.round(pastPrices.slice(0, 5).reduce((a, b) => a + b, 0) / 5)
        : 0;

      const data = { currentPrice, prevClose, openPrice, chgRate, strength, ma5 };
      log(`- [${stock.name}] 완료. (현재가: ${data.currentPrice.toLocaleString()}, 등락률: ${data.chgRate.toFixed(2)}%, 시가: ${data.openPrice.toLocaleString()}, 전일종가: ${data.prevClose.toLocaleString()}, 5일MA: ${ma5.toLocaleString()}원)`);

      applyRules(stock, data, isBefore0908);
      return; // 성공 시 루프 종료

    } catch (e) {
      if (attempt <= maxRetries) {
        log(`<span style="color:var(--text-warning)">- [${stock.name}] 통신 지연 (${attempt}회 실패). 다른 우회 서버로 재시도합니다...</span>`);
        await new Promise(r => setTimeout(r, 2000)); // 다음 시도 전 2초 대기
      } else {
        log(`<span style="color:var(--text-danger)">- [${stock.name}] 데이터 수집 최종 실패</span>`);
        console.error(e);
        updateCardError(stock.code);
      }
    }
  }
}

function buildIndicators(stock, data, isBefore0908) {
  // 각 지표를 { title, criterion, status:'triggered'|'clear'|'unknown', result } 객체로 구성
  const indicators = [];
  let decision = 'hold';

  if (stock.type === 'momentum') {
    // ── 수급 매집형 ──
    if (isBefore0908) {
      // 헤더 정보
      indicators.push({
        title: '분석 단계',
        criterion: '9시 8분 이전: 수급 매집형 손절 점검 로직이 활성화됩니다.',
        status: 'unknown',
        result: '1차 분석 진행 중'
      });

      // 지표 1: 시초가 회복 여부
      const openRecovered = data.currentPrice >= data.openPrice;
      indicators.push({
        title: '시초가 회복 여부',
        criterion: '장 시작 후 시초가를 강하게 회복하지 못하고 밀릴 때 손절/경계 신호입니다.\n기준: 현재가 < 시가',
        status: openRecovered ? 'clear' : 'triggered',
        result: openRecovered
          ? `시초가 대비 양호 (현재가 ${data.currentPrice.toLocaleString()} ≥ 시가 ${data.openPrice.toLocaleString()})`
          : `시초가 미회복 · 손절/경계 (현재가 ${data.currentPrice.toLocaleString()} < 시가 ${data.openPrice.toLocaleString()})`,
        value: `현재가 ${data.currentPrice.toLocaleString()} ${openRecovered ? '≥' : '<'} 시가 ${data.openPrice.toLocaleString()}`
      });
      if (!openRecovered) decision = 'caution';

      // 지표 2: 전일종가 이탈
      const belowPrevClose = data.currentPrice < data.prevClose;
      indicators.push({
        title: '전일종가(매수가) 이탈',
        criterion: '전일 종가(매수가)를 하향 이탈하면 즉각 손절을 권장합니다.\n기준: 현재가 < 전일종가',
        status: belowPrevClose ? 'triggered' : 'clear',
        result: belowPrevClose
          ? `전일종가 이탈! 즉각 손절 (현재가 ${data.currentPrice.toLocaleString()} < 전일종가 ${data.prevClose.toLocaleString()})`
          : `전일종가 위에서 유지 중 (현재가 ${data.currentPrice.toLocaleString()} ≥ 전일종가 ${data.prevClose.toLocaleString()})`,
        value: `현재가 ${data.currentPrice.toLocaleString()} / 전일종가 ${data.prevClose.toLocaleString()} / 차이 ${(data.currentPrice - data.prevClose).toLocaleString()}원`
      });
      if (belowPrevClose) decision = 'sell';

    } else {
      indicators.push({
        title: '분석 단계',
        criterion: '9시 8분 이후: 수급 매집형 매도·손절 전체 로직이 활성화됩니다.',
        status: 'unknown',
        result: '2차 분석 진행 중'
      });

      // 지표 1: 체결강도
      if (data.strength) {
        const weakStrength = data.strength < 100;
        indicators.push({
          title: '체결강도',
          criterion: '체결강도가 100% 미만이면 메이저 설거지(매도) 가능성이 있으며 전량 익절/매도를 고려합니다.\n기준: 체결강도 < 100%',
          status: weakStrength ? 'triggered' : 'clear',
          result: weakStrength
            ? `체결강도 ${data.strength.toFixed(2)}% — 메이저 설거지 가능성 (전량 익절/매도)`
            : `체결강도 ${data.strength.toFixed(2)}% — 매수세 양호 (홀딩 대기)`,
          value: `체결강도 ${data.strength.toFixed(2)}% (기준: 100%)`
        });
        if (weakStrength) decision = 'sell';
      } else {
        indicators.push({
          title: '체결강도',
          criterion: '체결강도가 100% 미만이면 메이저 설거지 가능성이 있습니다.',
          status: 'unknown',
          result: '체결강도 데이터 없음'
        });
      }

      // 지표 2: 전일종가 이탈
      const belowPrevClose2 = data.currentPrice < data.prevClose;
      indicators.push({
        title: '전일종가(매수가) 이탈',
        criterion: '전일 종가(매수가)를 하향 이탈하면 즉각 손절을 권장합니다.\n기준: 현재가 < 전일종가',
        status: belowPrevClose2 ? 'triggered' : 'clear',
        result: belowPrevClose2
          ? `전일종가 이탈! 즉각 손절 (현재가 ${data.currentPrice.toLocaleString()} < 전일종가 ${data.prevClose.toLocaleString()})`
          : `전일종가 위에서 유지 중 (현재가 ${data.currentPrice.toLocaleString()} ≥ 전일종가 ${data.prevClose.toLocaleString()})`
      });
      if (belowPrevClose2) decision = 'sell';
    }

  } else if (stock.type === 'pullback') {
    // ── 눌림목 베팅 ──
    if (isBefore0908) {
      indicators.push({
        title: '분석 단계',
        criterion: '눌림목 베팅은 9시 8분 이후에 매도/손절 분석이 시작됩니다.\n현재는 대기 상태입니다.',
        status: 'unknown',
        result: '1차: 눌림목 베팅 분석 대기 중 (9:08 이후 시작)'
      });
      decision = 'hold';
    } else {
      indicators.push({
        title: '분석 단계',
        criterion: '9시 8분 이후: 눌림목 베팅 매도·손절 전체 로직이 활성화됩니다.',
        status: 'unknown',
        result: '2차 분석 진행 중'
      });

      // [손절] 개파락 여부 — 0-division 방어 포함
      if (data.openPrice > 0 && data.prevClose > 0) {
        const gapRate = ((data.openPrice - data.prevClose) / data.prevClose) * 100;
        const isGapDown = gapRate <= -3;
        indicators.push({
          title: '[손절] 개파락 여부',
          criterion: '다음 날 시가가 전일 종가 대비 -3% 이상 낮게 시작(개파락)하는 경우 즉각 손절을 권장합니다.\n기준: (시가 - 전일종가) / 전일종가 ≤ -3%',
          status: isGapDown ? 'triggered' : 'clear',
          result: isGapDown
            ? `개파락 발생 (갭 ${gapRate.toFixed(2)}%) — 즉각 손절`
            : `갭 정상 (${gapRate.toFixed(2)}%) — 개파락 없음`,
          value: `(${data.openPrice.toLocaleString()} - ${data.prevClose.toLocaleString()}) / ${data.prevClose.toLocaleString()} = ${gapRate.toFixed(2)}% (기준: ≤ -3%)`
        });
        if (isGapDown) decision = 'sell';
      } else {
        indicators.push({
          title: '[손절] 개파락 여부',
          criterion: '다음 날 시가가 전일 종가 대비 -3% 이상 낮게 시작(개파락)하는 경우 즉각 손절을 권장합니다.',
          status: 'unknown',
          result: '시가 또는 전일종가 데이터 없음 — 확인 불가'
        });
      }

      // [손절] 이동평균선 하탈 — 5일선 우선, 없으면 시가 근사
      if (data.ma5 > 0 && data.currentPrice > 0) {
        const dropFromMA5 = ((data.currentPrice - data.ma5) / data.ma5) * 100;
        const isBelowMA5  = dropFromMA5 <= -2;
        indicators.push({
          title: '[손절] 5일 이동평균선 하탈',
          criterion: '5일 이동평균선 기준 -2% 이상 하탈 시 손절을 권장합니다.\n(최근 5영업일 종가 평균 사용)\n기준: (현재가 - 5일MA) / 5일MA <= -2%',
          status: isBelowMA5 ? 'triggered' : 'clear',
          result: isBelowMA5
            ? `5일선(${data.ma5.toLocaleString()}원) 하탈 ${dropFromMA5.toFixed(2)}% — 손절 고려`
            : `5일선(${data.ma5.toLocaleString()}원) 위에서 유지 (${dropFromMA5.toFixed(2)}%)`,
          value: `(${data.currentPrice.toLocaleString()} - ${data.ma5.toLocaleString()}) / ${data.ma5.toLocaleString()} = ${dropFromMA5.toFixed(2)}% (기준: <= -2%)`
        });
        if (isBelowMA5) decision = 'sell';
      } else if (data.openPrice > 0 && data.currentPrice > 0) {
        const dropFromOpen = ((data.currentPrice - data.openPrice) / data.openPrice) * 100;
        const isBelowMA    = dropFromOpen <= -2;
        indicators.push({
          title: '[손절] 이동평균선 하탈 (근사)',
          criterion: '5일선 데이터 미계산 — 시가 대비 -2% 이하 하락으로 MA 이탈을 근사합니다.\n기준: (현재가 - 시가) / 시가 <= -2%',
          status: isBelowMA ? 'triggered' : 'clear',
          result: isBelowMA
            ? `시가 대비 ${dropFromOpen.toFixed(2)}% 하탈 — MA 이탈 의심 (손절 고려)`
            : `시가 대비 ${dropFromOpen.toFixed(2)}% — MA 위에서 유지`,
          value: `(${data.currentPrice.toLocaleString()} - ${data.openPrice.toLocaleString()}) / ${data.openPrice.toLocaleString()} = ${dropFromOpen.toFixed(2)}% (기준: <= -2%)`
        });
        if (isBelowMA) decision = 'sell';
      } else {
        indicators.push({
          title: '[손절] 이동평균선 하탈',
          criterion: '이동평균선(5일선)을 -2% 이상 하탈 시 손절을 권장합니다.',
          status: 'unknown',
          result: '가격 데이터 없음 — 확인 불가'
        });
      }

      // [손절] 외국인/기관 대량 매도 전환 — 체결강도 기준
      if (data.strength) {
        const weakStr = data.strength < 80;
        indicators.push({
          title: '[손절] 외국인/기관 대량 매도 전환',
          criterion: '외국인/기관의 수급이 대량 매도로 전환될 때 손절을 고려합니다.\n체결강도 80% 미만이면 매도 전환을 의심합니다.\n기준: 체결강도 < 80%',
          status: weakStr ? 'triggered' : 'clear',
          result: weakStr
            ? `체결강도 ${data.strength.toFixed(2)}% — 대규모 매도 전환 의심 (손절 고려)`
            : `체결강도 ${data.strength.toFixed(2)}% — 정상 범위`,
          value: `체결강도 ${data.strength.toFixed(2)}% (기준: < 80%)`
        });
        if (weakStr) decision = 'sell';
      } else {
        indicators.push({
          title: '[손절] 외국인/기관 대량 매도 전환',
          criterion: '외국인/기관의 수급이 대량 매도로 전환될 때 손절을 고려합니다.\n체결강도 80% 미만이면 매도 전환을 의심합니다.',
          status: 'unknown',
          result: '체결강도 데이터 없음 — 확인 불가'
        });
      }

      // [매도] 상승세 둔화 — 음봉 중간값·5일선 저항
      if (data.currentPrice > 0 && data.prevClose > 0) {
        const isStagnant = data.chgRate > -1.5 && data.chgRate < 1.5;
        const isStrong   = data.chgRate >= 1.5;
        const mStatus = isStagnant ? 'triggered' : (isStrong ? 'clear' : 'unknown');
        const mResult = isStagnant
          ? `등락률 ${data.chgRate.toFixed(2)}% — 상승세 둔화/보합 (음봉 중간값·5일선 저항, 매도·익절 고려)`
          : isStrong
            ? `등락률 ${data.chgRate.toFixed(2)}% — 강한 상승세 유지 (+1.5% 이상, 홀딩)`
            : `등락률 ${data.chgRate.toFixed(2)}% — 하락 구간 (손절 조건 중복 확인)`;
        indicators.push({
          title: '[매도] 상승세 둔화 / 저항 구간',
          criterion: '전일 음봉의 중간값이나 5일 이동평균선에 닿으면서 상승세가 둔화될 때 매도/익절을 고려합니다.\n기준: -1.5% < 등락률 < +1.5%',
          status: mStatus,
          result: mResult,
          value: `등락률 = (${data.currentPrice.toLocaleString()} - ${data.prevClose.toLocaleString()}) / ${data.prevClose.toLocaleString()} = ${data.chgRate.toFixed(2)}% (기준: -1.5% ~ +1.5%)`
        });
        if (isStagnant && decision !== 'sell') decision = 'caution';
      } else {
        indicators.push({
          title: '[매도] 상승세 둔화 / 저항 구간',
          criterion: '전일 음봉의 중간값이나 5일 이동평균선에 닿으면서 상승세가 둔화될 때 매도/익절을 고려합니다.',
          status: 'unknown',
          result: '현재가 또는 전일종가 데이터 없음 — 확인 불가'
        });
      }
    }
  }

  return { indicators, decision };
}

function applyRules(stock, data, isBefore0908) {
  const card     = document.getElementById(`card-${stock.code}`);
  const priceRow = document.getElementById(`price-row-${stock.code}`);
  const meta     = document.getElementById(`meta-${stock.code}`);
  const indBox   = document.getElementById(`ind-${stock.code}`);
  const badge    = document.getElementById(`badge-${stock.code}`);

  // 1. 가격 정보 업데이트
  const chgClass  = data.chgRate > 0 ? 'up' : (data.chgRate < 0 ? 'dn' : 'nt');
  const chgPrefix = data.chgRate > 0 ? '▲ ' : (data.chgRate < 0 ? '▼ ' : '');
  const absChg    = Math.abs(data.chgRate).toFixed(2);

  priceRow.innerHTML = `
    <span class="price">${data.currentPrice.toLocaleString()}원</span>
    <span class="chg ${chgClass}" style="font-size:14px;font-weight:700">${chgPrefix}${absChg}%</span>
  `;
  meta.innerHTML = `
    <span style="opacity:0.7">매수가(전일가):</span> <strong>${data.prevClose.toLocaleString()}원</strong> &nbsp;|&nbsp;
    <span style="opacity:0.7">시가:</span> <strong>${data.openPrice.toLocaleString()}원</strong> &nbsp;|&nbsp;
    <span style="opacity:0.7">체결강도:</span> <strong>${data.strength ? data.strength.toFixed(2) + '%' : '-'}</strong>
  `;

  // 2. 지표 계산
  const { indicators, decision } = buildIndicators(stock, data, isBefore0908);

  // 3. 카드 요약 렌더링 (triggered/clear 항목만 간략 표시)
  indBox.innerHTML = indicators
    .filter(ind => ind.status !== 'unknown')
    .map(ind => `<div class="ind-item ${ind.status}">${ind.title}: ${ind.result}</div>`)
    .join('') || indicators.map(ind => `<div class="ind-item ${ind.status}">${ind.result}</div>`).join('');

  // 4. 배지 및 카드 스타일 적용
  card.className = 'scard ' + decision;
  if (decision === 'sell') {
    badge.className = 'badge badge-sell';
    badge.innerText = '매도/손절';
  } else if (decision === 'caution') {
    badge.className = 'badge badge-caution';
    badge.innerText = '주의/익절 검토';
  } else {
    badge.className = 'badge badge-hold';
    badge.innerText = '홀딩/양호';
  }

  // 5. 상세 데이터 저장 (모달용)
  stockDetailMap[stock.code] = { stock, data, indicators, decision, isBefore0908 };

  // 6. 클릭 핸들러 등록 (중복 방지를 위해 clone으로 교체)
  const newCard = card.cloneNode(true);
  card.parentNode.replaceChild(newCard, card);
  newCard.addEventListener('click', () => openModal(stock.code));
}

function updateCardError(code) {
  const card = document.getElementById(`card-${code}`);
  const indBox = document.getElementById(`ind-${code}`);
  const badge = document.getElementById(`badge-${code}`);

  card.className = 'scard';
  badge.className = 'badge badge-pending';
  badge.innerText = '통신 오류';
  indBox.innerHTML = `<div class="ind-item unknown">네이버 증권 데이터를 가져오는 데 실패했습니다.<br>잠시 후 다시 시도해주세요.</div>`;
}

// ── 모달 열기 ──
function openModal(code) {
  const detail = stockDetailMap[code];
  if (!detail) return;
  const { stock, data, indicators, decision, isBefore0908 } = detail;

  document.getElementById('modal-name').textContent = stock.name;
  document.getElementById('modal-code').textContent = stock.code;
  document.getElementById('modal-type').textContent =
    stock.type === 'pullback' ? '📉 눌림목 종가베팅' : '🔥 수급 매집형 종가베팅';

  const chgClass  = data.chgRate > 0 ? 'up' : (data.chgRate < 0 ? 'dn' : 'nt');
  const chgPrefix = data.chgRate > 0 ? '▲ ' : (data.chgRate < 0 ? '▼ ' : '');
  const absChg    = Math.abs(data.chgRate).toFixed(2);

  const verdictMap = {
    sell:    { label: '🚨 매도 / 손절 권장', cls: 'sell' },
    caution: { label: '⚠️ 주의 / 익절 검토', cls: 'caution' },
    hold:    { label: '✅ 홀딩 / 양호',       cls: 'hold' }
  };
  const verdict = verdictMap[decision] || verdictMap.hold;
  const stageCls  = isBefore0908 ? 'stage1' : 'stage2';
  const stageText = isBefore0908 ? '1차 분석 (9:08 이전)' : '2차 분석 (9:08 이후)';

  document.getElementById('modal-body').innerHTML = `
    <div class="modal-price-bar">
      <span class="price-big">${data.currentPrice.toLocaleString()}원</span>
      <span class="chg-big ${chgClass}">${chgPrefix}${absChg}%</span>
      <div class="modal-stats">
        <div class="modal-stat">
          <span class="modal-stat-label">전일종가(매수가)</span>
          <span class="modal-stat-value">${data.prevClose.toLocaleString()}원</span>
        </div>
        <div class="modal-stat">
          <span class="modal-stat-label">시가</span>
          <span class="modal-stat-value">${data.openPrice.toLocaleString()}원</span>
        </div>
        <div class="modal-stat">
          <span class="modal-stat-label">체결강도</span>
          <span class="modal-stat-value">${data.strength ? data.strength.toFixed(2) + '%' : '—'}</span>
        </div>
      </div>
    </div>

    <div>
      <div class="modal-stage-badge ${stageCls}">⚡ ${stageText}</div>
      <div class="modal-section-label">지표별 분석 결과</div>
      <div class="modal-ind-list">
        ${indicators.map(ind => {
          const icon = ind.status === 'triggered' ? '🚨' : ind.status === 'clear' ? '✅' : '➖';
          const criterionLines = ind.criterion.split('\n').map(l => `<span>${l}</span>`).join('<br>');
          return `
            <div class="modal-ind-card ${ind.status}">
              <div class="modal-ind-icon">${icon}</div>
              <div class="modal-ind-content">
                <div class="modal-ind-title">${ind.title}</div>
                <div class="modal-ind-criterion">${criterionLines}</div>
                <div class="modal-ind-result">→ ${ind.result}</div>
                ${ind.value ? `<div class="modal-ind-value">📐 ${ind.value}</div>` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <div class="modal-verdict ${verdict.cls}">${verdict.label}</div>
  `;

  document.getElementById('modal-overlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

// 페이지 로드 시 로컬 스토리지에서 노션 주소 복원 및 자동 불러오기
window.addEventListener('DOMContentLoaded', () => {
  const savedUrl = localStorage.getItem('savedNotionUrl');
  if (savedUrl) {
    document.getElementById('notion-url').value = savedUrl;
    fetchNotionData();
  }

  // 모달 닫기 이벤트
  document.getElementById('modal-close-btn').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});
