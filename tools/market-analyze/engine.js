// 하워드 막스-제임스 리카즈 시계추 산출 퀀트 엔진 v3.7
function calculateCycle() {
    const { fx, vix, sentiment, disparity, bullRatio, marginSlope } = marketData;

    // 1. 매크로 스트레스 지수 (Macro Stress Index: M_stress) 연산
    let f_fx = 0;
    if (fx >= 1450) f_fx = 1.5;
    else if (fx >= 1420) f_fx = 1.0;
    else if (fx >= 1350) f_fx = 0.5;
    
    let g_vix = 0;
    if (vix >= 30) g_vix = 1.5;
    else if (vix >= 22) g_vix = 1.0;
    else if (vix >= 15) g_vix = 0.5;

    let m_stress = (40 * f_fx) + (30 * g_vix);
    m_stress = Math.min(70, m_stress);

    // 2. 증시 탐욕 지수 (Equity Greed Index: E_greed) 연산
    let i_disparity = Math.max(0, (disparity - 95)) * 2; // 이격도가 높을수록 탐욕
    i_disparity = Math.min(100, i_disparity + (bullRatio * 0.5));
    
    // L_credit: 신용잔고 5일 기울기 반영
    let l_credit = Math.max(0, marginSlope / 200);
    l_credit = Math.min(100, l_credit);

    // S_text: 종토방 투심 점수 (0~100)
    let s_text = sentiment;

    let e_greed = (i_disparity * 0.4) + (l_credit * 0.3) + (s_text * 0.3);
    e_greed = Math.min(100, Math.max(0, e_greed)) || 50; // NaN 방지

    // 3. 종합 마켓 시계추 지수 (Pendulum Base Index: P_index)
    let p_index = 50 + (e_greed - m_stress);
    p_index = Math.max(0, Math.min(100, p_index)) || 50; // NaN 방지

    // 4. 제임스 리카즈 오버라이드 제어 필터 (디커플링 모순)
    let isDebasement = false;
    if (fx >= 1450 && (i_disparity >= 75 || marginSlope >= 15000 || gold >= 3000)) {
        isDebasement = true;
        p_index = Math.max(p_index, 85); // 강제로 Stage 6 구간으로 밀어넣음
    }

    let riskIndex = p_index;

    // UI 바인딩 및 프로그레스 바 연동
    document.getElementById('pendulum-score').innerText = `(종합 리스크 심리 P-Index: ${Math.round(riskIndex)}/100)`;
    
    const stepperLine = document.getElementById('stepper-line');
    stepperLine.style.width = `${riskIndex}%`;

    const cycleStatus = document.getElementById('cycle-status');
    const cycleDesc = document.getElementById('cycle-desc');

    const circles = [];
    const labels = [];
    for(let i=1; i<=6; i++) {
        circles.push(document.getElementById(`step-${i}-circle`));
        labels.push(document.getElementById(`step-${i}-label`));
    }

    circles.forEach(el => {
        el.className = "w-5 h-5 md:w-7 md:h-7 rounded-full bg-slate-800 border-2 border-slate-500 flex items-center justify-center transition-all duration-500 shadow-md";
        el.firstElementChild.className = "text-[10px] font-bold text-slate-400";
    });
    labels.forEach(el => {
        el.className = "absolute top-8 whitespace-nowrap text-[10px] md:text-xs font-semibold text-slate-400 mt-1";
    });
    stepperLine.className = "absolute left-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full z-0 transition-all duration-500 bg-slate-500";

    const stageConfigs = [
        { limit: 20, bgClass: 'bg-cyan-500', borderClass: 'border-cyan-500', shadowClass: 'shadow-cyan-500/30', textClass: 'text-cyan-500', name: '1단계: 극단적 공포 (패닉 셀링)', desc: '모든 사람들이 상황이 악화될 수밖에 없다고 확신하며 자산을 던지는 시기입니다. 역사적으로 가장 매력적인 저가 매수 기회입니다.' },
        { limit: 35, bgClass: 'bg-sky-400', borderClass: 'border-sky-400', shadowClass: 'shadow-sky-400/30', textClass: 'text-sky-400', name: '2단계: 비관 속 태동', desc: '여전히 시장에 비관론이 팽배하지만, 소수의 선각자들만이 상황이 호전될 것이라고 믿고 조용히 매집을 시작하는 단계입니다.' },
        { limit: 50, bgClass: 'bg-emerald-400', borderClass: 'border-emerald-400', shadowClass: 'shadow-emerald-400/30', textClass: 'text-emerald-400', name: '3단계: 회의 속 성장', desc: '상황이 점진적으로 호전되고 있음을 일부가 눈치채기 시작합니다. 시장은 서서히 반등하며 펀더멘털에 수렴해 나갑니다.' },
        { limit: 65, bgClass: 'bg-amber-400', borderClass: 'border-amber-400', shadowClass: 'shadow-amber-400/30', textClass: 'text-amber-400', name: '4단계: 낙관주의 확산', desc: '경계심이 저하되고 다수의 투자자가 강세장임을 확신합니다. 소수의 신중한 투자자는 영원한 장밋빛은 없음을 인지하기 시작합니다.' },
        { limit: 80, bgClass: 'bg-orange-500', borderClass: 'border-orange-500', shadowClass: 'shadow-orange-500/30', textClass: 'text-orange-500', name: '5단계: 탐욕과 과열', desc: '대부분의 투자자들이 맹목적으로 시장의 상승을 추종하며 위험을 망각합니다. 빚투(레버리지)가 증가하는 시기입니다.' },
        { limit: 100, bgClass: 'bg-rose-500', borderClass: 'border-rose-500', shadowClass: 'shadow-rose-500/30', textClass: 'text-rose-500', name: '6단계: 극단적 환희 (버블)', desc: '모든 사람들이 상황이 영원히 호전될 것이라고 결론짓고 최고점에서 매수하는 거품 국면입니다. 곧 폭락이 시작될 위험이 큽니다.' }
    ];

    let currentStageIdx = stageConfigs.findIndex(c => riskIndex <= c.limit);
    if (currentStageIdx === -1) currentStageIdx = 5;
    
    if (vix >= 25) currentStageIdx = 0;
    if (vix <= 12.5) currentStageIdx = 5;

    const config = stageConfigs[currentStageIdx];
    const activeCircle = circles[currentStageIdx];
    const activeLabel = labels[currentStageIdx];
    
    activeCircle.className = `w-5 h-5 md:w-7 md:h-7 rounded-full ${config.bgClass} border-2 ${config.borderClass} flex items-center justify-center transition-all duration-500 shadow-lg ${config.shadowClass}`;
    activeCircle.firstElementChild.className = "text-[10px] font-bold text-slate-900";
    activeLabel.className = `absolute top-8 whitespace-nowrap text-[10px] md:text-xs font-bold ${config.textClass} mt-1`;
    stepperLine.classList.replace('bg-slate-500', config.bgClass);

    cycleStatus.innerText = config.name;
    cycleStatus.className = `text-2xl font-extrabold ${config.textClass}`;
    cycleDesc.innerHTML = `<b>진단:</b> ${config.desc}`;

    const actionableCard = document.getElementById('actionable-guide-card');
    const actionableText = document.getElementById('actionable-guide-text');

    if (currentStageIdx >= 4) {
        actionableCard.className = "bg-rose-900/40 p-6 rounded-xl border-2 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)] mb-6";
        actionableCard.querySelector('h3').className = "text-base font-bold mb-2 text-rose-400 flex items-center";
        actionableText.className = "text-rose-100 text-xs md:text-sm font-bold leading-relaxed";
        actionableText.innerHTML = isDebasement ? "🚨 <b>화폐 가치 하락 경고:</b> 실물 자산 비중 유지 및 현금 유동성 극대화가 시급합니다." : "🚨 <b>위험 경고:</b> 탐욕 국면입니다. 신규 진입을 멈추고 현금 비중을 대폭 확대하세요.";
    } else if (currentStageIdx <= 1) {
        actionableCard.className = "bg-cyan-900/40 p-6 rounded-xl border-2 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] mb-6 animate-pulse";
        actionableCard.querySelector('h3').className = "text-base font-bold mb-2 text-cyan-400 flex items-center";
        actionableText.className = "text-cyan-100 text-xs md:text-sm font-bold leading-relaxed";
        actionableText.innerHTML = "🎯 <b>역발상 기회:</b> 공포가 지배하는 시장입니다. 보유한 현금을 자산으로 전환할 최적의 시기입니다.";
    } else {
        actionableCard.className = "bg-emerald-900/40 p-6 rounded-xl border border-emerald-700 shadow-lg mb-6";
        actionableCard.querySelector('h3').className = "text-base font-bold mb-2 text-emerald-400 flex items-center";
        actionableText.className = "text-emerald-100 text-xs md:text-sm leading-relaxed";
        actionableText.innerHTML = "✅ <b>정석 투자:</b> 시장이 합리적 범위 내에 있습니다. 기존 투자 원칙을 기계적으로 고수하세요.";
    }

    updatePortfolioRebalancing(currentStageIdx, isDebasement);
}

/**
 * 포트폴리오 리밸런싱 가이드 업데이트
 * ISA/연금: 공격성 판단
 * 일반(장기): 현금/투자 비중 + 공격성 판단
 * 단기: 현금/투자 비중 가이드
 */
function updatePortfolioRebalancing(stage, isDebasement) {
    // 1. 목표 현금 비중 (Cash Ratio)
    let targetCashRatio = 15;
    if (stage <= 1) targetCashRatio = 5;
    else if (stage === 4) targetCashRatio = 30;
    else if (stage === 5) targetCashRatio = 70;
    if (isDebasement) targetCashRatio = 85;

    // 2. 목표 공격성 비중 (Aggressive Ratio)
    let targetAggressiveRatio = 70; // 중립
    if (stage <= 1) targetAggressiveRatio = 90; // 공포 -> 공격 극대화
    else if (stage === 4) targetAggressiveRatio = 40; // 과열 -> 방어 전환
    else if (stage === 5) targetAggressiveRatio = 15; // 버블 -> 극단적 방어
    if (isDebasement) targetAggressiveRatio = 10;

    const keys = ['isa', 'pension', 'genLong', 'quant'];
    
    keys.forEach(key => {
        const targetEl = document.getElementById(`eval-${key === 'genLong' ? 'gen-long' : key}`);
        if (!targetEl) return;

        let directionText = "";
        const data = portfolioData[key];

        if (key === 'isa' || key === 'pension') {
            const currentAgg = parseFloat(data.aggressiveRatio) || 0;
            const diff = currentAgg - targetAggressiveRatio;
            
            if (Math.abs(diff) <= 10) {
                directionText = `<span class='text-emerald-400 font-bold'>성향 유지</span><br/><span class='text-[10px] text-slate-500'>현재 사이클 적합 (목표:${targetAggressiveRatio}%)</span>`;
            } else if (diff < 0) {
                directionText = `<span class='text-cyan-400 font-bold'>공격성 상향</span><br/><span class='text-[10px] text-slate-500'>주식/성장주 비중 확대 권고</span>`;
            } else {
                directionText = `<span class='text-rose-400 font-bold'>방어력 강화</span><br/><span class='text-[10px] text-slate-500'>채권/배당주 비중 확대 권고</span>`;
            }
        } else if (key === 'genLong') {
            const currentCash = parseFloat(data.cashRatio) || 0;
            const currentAgg = parseFloat(data.aggressiveRatio) || 0;
            
            let cashAdvice = currentCash > targetCashRatio ? "현금 과다" : (currentCash < targetCashRatio ? "현금 부족" : "현금 적정");
            let aggAdvice = currentAgg > targetAggressiveRatio ? "방어 필요" : (currentAgg < targetAggressiveRatio ? "공격 필요" : "성향 적정");
            
            const color = (Math.abs(currentCash - targetCashRatio) <= 10 && Math.abs(currentAgg - targetAggressiveRatio) <= 10) ? 'text-emerald-400' : 'text-amber-400';
            
            directionText = `<span class='${color} font-bold'>복합 조정 필요</span><br/><span class='text-[10px] text-slate-500'>${cashAdvice} & ${aggAdvice}</span>`;
        } else if (key === 'quant') {
            const currentCash = parseFloat(data.cashRatio) || 0;
            const targetInvestRatio = 100 - targetCashRatio;
            const statusColor = Math.abs(currentCash - targetCashRatio) <= 5 ? 'text-emerald-400' : (currentCash > targetCashRatio ? 'text-cyan-400' : 'text-rose-400');
            directionText = `<span class='${statusColor} font-bold'>현금 ${targetCashRatio}% / 투자 ${targetInvestRatio}%</span><br/><span class='text-[10px] text-slate-500'>현재 현금:${currentCash}% (${currentCash > targetCashRatio ? '과다' : '부족'})</span>`;
        }

        targetEl.innerHTML = directionText;
    });
}
