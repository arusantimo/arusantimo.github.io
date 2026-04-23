let allTableRows = [];
let yearGroups = {};
let actualValues = {}; // { month: { shortTerm: number|null, longTermCumul: number|null } }
let profitChartInstance = null;
let showShortCumul = true;
let longTermPrincipalGlobal = 0;
let shortTermPrincipalGlobal = 0;

function toggleShortCumul() {
    showShortCumul = !showShortCumul;
    document.querySelectorAll('.col-short-cumul').forEach(el => {
        el.style.display = showShortCumul ? '' : 'none';
    });
    document.getElementById('shortCumulToggleBtn').textContent = showShortCumul ? '단기누적 숨기기' : '단기누적 보기';
}

function setActual(month, field, value) {
    if (!actualValues[month]) actualValues[month] = {};
    const num = parseFloat(value);
    actualValues[month][field] = (value === '' || isNaN(num)) ? null : num;
    saveToLocalStorage();
    // 실제값 입력 시 전체 계산을 다시 실행하여 이월 자산에 반영
    calculateAndDisplay();
}

function renderChart() {
    const canvas = document.getElementById('profitChart');
    if (!canvas || allTableRows.length === 0) return;

    const labels = allTableRows.map(r => {
        const d = new Date(document.getElementById('startDate').value);
        d.setMonth(d.getMonth() + r.month - 1);
        return d.getFullYear() + '.' + String(d.getMonth() + 1).padStart(2, '0');
    });

    // 목표 자산: 초기 목표 자산
    const targetAssets = allTableRows.map(r => r.initialAssetAfter);

    // 실제 자산: 실제 입력값 기반, 없으면 null
    const actualAssets = allTableRows.map(r => {
        const v = r.actualEndAsset;
        return (v !== null && v !== undefined) ? v : null;
    });

    // 저축만 했을 때: 초기 원금 + 월 재투자 * 월차 (수익 없음)
    const principal = allTableRows[0].assetBefore;
    const monthlyInvest = allTableRows[0].monthlyInvest;
    const savingsOnly = allTableRows.map(r => principal + monthlyInvest * r.month);

    // 연 2.5% 적금 복리: 매월 이전 자산 * (1 + 월이율) + 월 재투자
    const annualSavingsRate = 0.025;
    const monthlySavingsRate = Math.pow(1 + annualSavingsRate, 1 / 12) - 1;
    const savingsWithInterest = [];
    let savingsAsset = principal;
    for (const r of allTableRows) {
        savingsAsset = savingsAsset * (1 + monthlySavingsRate) + monthlyInvest;
        savingsWithInterest.push(savingsAsset);
    }

    const fmt = v => {
        if (v === null) return null;
        if (Math.abs(v) >= 100000000) return (v / 100000000).toFixed(1) + '억';
        if (Math.abs(v) >= 10000) return (v / 10000).toFixed(0) + '만';
        return v.toLocaleString('ko-KR');
    };

    const chartData = {
        labels,
        datasets: [
            {
                label: '초기 목표 자산',
                data: targetAssets,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                tension: 0.3,
                pointRadius: 2,
                pointHoverRadius: 5,
                borderWidth: 2,
                fill: false,
            },
            {
                label: '실제 자산',
                data: actualAssets,
                borderColor: '#00d9ff',
                backgroundColor: 'rgba(0, 217, 255, 0.1)',
                tension: 0.3,
                pointRadius: 4,
                pointHoverRadius: 6,
                borderWidth: 2,
                fill: false,
                spanGaps: false,
            },
            {
                label: '저축만 (수익 없음)',
                data: savingsOnly,
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.06)',
                tension: 0.3,
                pointRadius: 2,
                pointHoverRadius: 4,
                borderWidth: 1.5,
                borderDash: [5, 4],
                fill: false,
            },
            {
                label: '적금 연 2.5%',
                data: savingsWithInterest,
                borderColor: '#f97316',
                backgroundColor: 'rgba(249, 115, 22, 0.06)',
                tension: 0.3,
                pointRadius: 2,
                pointHoverRadius: 4,
                borderWidth: 1.5,
                borderDash: [3, 3],
                fill: false,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: {
                labels: { color: '#a0aec0', font: { size: 11 }, boxWidth: 14 }
            },
            tooltip: {
                backgroundColor: 'rgba(26,31,40,0.95)',
                titleColor: '#e2e8f0',
                bodyColor: '#a0aec0',
                borderColor: '#2d3748',
                borderWidth: 1,
                callbacks: {
                    label: ctx => {
                        if (ctx.parsed.y === null) return null;
                        return ` ${ctx.dataset.label}: ${Math.floor(ctx.parsed.y).toLocaleString('ko-KR')}원`;
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: { color: '#a0aec0', font: { size: 10 }, maxRotation: 45 },
                grid: { color: 'rgba(255,255,255,0.04)' }
            },
            y: {
                ticks: {
                    color: '#a0aec0',
                    font: { size: 10 },
                    callback: v => fmt(v)
                },
                grid: { color: 'rgba(255,255,255,0.04)' }
            }
        }
    };

    if (profitChartInstance) {
        profitChartInstance.data = chartData;
        profitChartInstance.update('none');
        return;
    }

    profitChartInstance = new Chart(canvas, {
        type: 'line',
        data: chartData,
        options: chartOptions
    });
}

function formatNumber(num) {
    if (num === null || num === undefined) return '-';
    return Math.floor(num).toLocaleString('ko-KR');
}

function getMonthsDifference(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let months = 0;
    let current = new Date(start);

    while (current < end) {
        months++;
        current.setMonth(current.getMonth() + 1);
    }

    return Math.max(1, months);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월';
}

function renderTableByYear(year) {
    const tableBody = document.getElementById('tableBody');
    const rows = yearGroups[year] || [];
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    tableBody.innerHTML = rows.map(row => {
        const idx = row.month - 1;
        // 시뮬레이션 기준 이전 장기 누적 (필요 수익금 계산용)
        const prevLongTermAccumulated = idx === 0 ? longTermPrincipalGlobal : allTableRows[idx - 1].longTermAccumulated;
        // 실제 입력 기준 이전 장기 누적 (실제 달성율 계산용 — 이전 달 실제값이 있으면 그것을 기준으로)
        const prevActualLongAccum = idx === 0
            ? longTermPrincipalGlobal
            : (actualValues[allTableRows[idx - 1].month]?.longTermCumul != null
                ? Number(actualValues[allTableRows[idx - 1].month].longTermCumul)
                : allTableRows[idx - 1].longTermAccumulated);

        // 장기투자 수익률 계산
        const longTermROI = row.longTermPrincipal > 0
            ? (((row.longTermAccumulated - row.longTermPrincipal) / row.longTermPrincipal) * 100).toFixed(2)
            : 0;

        // 실제 달성 수익 입력값 (없으면 목표값을 기본으로 사용)
        const actualShort = actualValues[row.month]?.shortTerm ?? null;
        const actualLongCumul = actualValues[row.month]?.longTermCumul ?? null;
        const displayShortInput = actualShort !== null ? actualShort : '';
        const displayLongCumulInput = actualLongCumul !== null ? actualLongCumul : '';

        // 실제 입력값이 하나라도 있을 때만 달성율/실제자산 계산
        const hasActualInput = actualShort !== null || actualLongCumul !== null;
        const effectiveShort = actualShort !== null ? actualShort : row.shortTermProfit;
        const effectiveLongCumul = actualLongCumul !== null ? actualLongCumul : row.longTermAccumulated;
        // 실제 장기 수익 = 실제 누적 - 실제 이전 누적 - 재투자금
        const actualLongProfit = effectiveLongCumul - prevActualLongAccum - row.longTermInvest;
        const actualTotalProfit = effectiveShort + actualLongProfit;
        const rate = hasActualInput && row.profit > 0 ? ((actualTotalProfit / row.profit) * 100).toFixed(1) : null;
        const actualEndAssetDisplay = hasActualInput
            ? (row.assetBefore + row.monthlyInvest + actualTotalProfit)
            : null;
        const rateColor = rate !== null && parseFloat(rate) >= 100 ? 'var(--accent-primary)' : '#ef4444';
        const achievementHtml = rate !== null ? ` <span style="color:${rateColor}; font-size:11px;">(${rate}%)</span>` : '';

        // 실제 입력값 기준 단기 누적 수익금 계산 (1월차 ~ 현재월 합산)
        let actualShortCumulative = 0;
        for (let m = 1; m <= row.month; m++) {
            const r = allTableRows[m - 1];
            actualShortCumulative += actualValues[m]?.shortTerm ?? r.shortTermProfit;
        }

        const shortCumulStyle = showShortCumul ? '' : 'display:none;';

        // 초기 투자금 + 단기 누적 합계
        const shortInitPlusCumul = shortTermPrincipalGlobal + actualShortCumulative;
        // 단기 달성률: 실제 단기 입력이 있을 때만 계산
        const shortAchievePercent = (actualShort !== null && row.shortTermProfit > 0) ? (actualShort / row.shortTermProfit) * 100 : null;
        const shortAchievePercentFixed = shortAchievePercent !== null ? shortAchievePercent.toFixed(1) : null;
        const shortAchieveColor = shortAchievePercentFixed !== null && parseFloat(shortAchievePercentFixed) >= 100 ? 'var(--accent-primary)' : '#ef4444';

        // 장기 실제 달성률 — 목표 수익(수익금) 대비 실제 수익 비율로 변경
        let longTermProfitRate = null;
        const longTermTargetProfit = row.longTermAccumulated - prevLongTermAccumulated - row.longTermInvest;
        if (actualLongCumul !== null && !isNaN(Number(actualLongCumul))) {
            const actualLongCumulNum = Number(actualLongCumul);
            // 실제 수익 = 현재 잔액 - 이전 잔액 - 재투자금
            const longTermActualProfit = actualLongCumulNum - prevActualLongAccum - row.longTermInvest;

            if (longTermTargetProfit > 0) {
                longTermProfitRate = (longTermActualProfit / longTermTargetProfit) * 100;
            } else {
                longTermProfitRate = longTermActualProfit >= 0 ? 100 : 0;
            }
        }
        const longTermRateDisplay = longTermProfitRate !== null ? longTermProfitRate.toFixed(1) : null;
        const longTermRateColor = longTermRateDisplay !== null && parseFloat(longTermRateDisplay) >= 100 ? 'var(--accent-primary)' : '#ef4444';

        const isCurrentMonth = row.year === currentYear && (() => {
            const d = new Date(document.getElementById('startDate').value);
            d.setMonth(d.getMonth() + row.month - 1);
            return d.getFullYear() === currentYear && (d.getMonth() + 1) === currentMonth;
        })();
        const rowClass = row.highlight ? 'highlight-row' : isCurrentMonth ? 'current-month-row' : '';

        return `
            <tr ${rowClass ? `class="${rowClass}"` : ''}>
                <td>${row.month}월차${isCurrentMonth ? ' <span style="color:var(--accent-primary); font-size:10px;">◀ 현재</span>' : ''}<br><span style="color:var(--text-secondary); font-size:10px;">${row.dateStr}</span></td>
                <td>
                    <div style="font-size:9px; color:var(--text-secondary); margin-bottom:2px;">목표</div>
                    <div class="number">${formatNumber(idx === 0 ? row.assetBefore : allTableRows[idx - 1].assetAfter)}</div>
                    ${(() => {
                        if (idx === 0) return '';
                        const prevMonth = allTableRows[idx - 1].month;
                        const prevHasInput = actualValues[prevMonth]?.shortTerm != null || actualValues[prevMonth]?.longTermCumul != null;
                        if (!prevHasInput) return '';
                        const prevActualEndAsset = allTableRows[idx - 1].actualEndAsset;
                        if (prevActualEndAsset == null) return '';
                        return `<div style="font-size:9px; color:var(--text-secondary); margin-top:6px; margin-bottom:2px;">실제 이월</div><div class="number" style="color:var(--accent-primary);">${formatNumber(prevActualEndAsset)}</div>`;
                    })()}
                </td>
                <td class="number" style="color: var(--accent-success);">
                    ${formatNumber(row.profit)}
                    <div style="color: var(--text-secondary); font-size:11px; margin-top:6px;">
                        (장)${formatNumber(row.profit - row.shortTermProfit)} + (단)${formatNumber(row.shortTermProfit)}
                    </div>
                </td>
                <td>
                    <div class="number" style="color: var(--accent-warning);">${formatNumber(row.shortTermProfit)}
                        <span style="color: var(--text-secondary); font-size: 9px; font-weight: normal; margin-left: 4px;">(${formatNumber(row.shortTermPrincipal)})</span>
                    </div>
                    <input type="number" class="actual-input" placeholder="실제 단기 수익"
                        value="${displayShortInput}"
                        onchange="setActual(${row.month}, 'shortTerm', this.value)"
                        style="margin-top:5px;">
                </td>
                <td class="col-short-cumul" style="${shortCumulStyle}">
                    <div class="number" style="color: var(--accent-warning);">${formatNumber(actualShortCumulative)}</div>
                    <div style="color: var(--text-secondary); margin-top: 3px;">
                        <span style="font-size:9px;">초기 투자금 + 누적</span><br>
                        <span class="number" style="font-size:11px; color: var(--text-primary);">${formatNumber(shortInitPlusCumul)}</span>
                        ${shortAchievePercentFixed !== null ? `<span style="font-size:11px; color:${shortAchieveColor}; margin-left:6px;">(${shortAchievePercentFixed}%)</span>` : ''}
                    </div>
                </td>
                <td>
                    <div class="number">${formatNumber(row.longTermAccumulated)} 
                        <span style="color: var(--text-secondary); font-size: 9px; font-weight: normal; margin-left: 4px;">(${formatNumber(row.longTermPrincipal)})</span>
                        <span style="color: var(--accent-success); font-size: 11px;">(+${longTermROI}%)</span>                                
                    </div>
                    <div style="display:flex; justify-content:flex-end; align-items:center; gap:6px;">
                        <input type="number" class="actual-input" placeholder="실제 장기 잔액 총액"
                            value="${displayLongCumulInput}"
                            onchange="setActual(${row.month}, 'longTermCumul', this.value)"
                            style="margin-top:5px;"
                        >
                        
                        ${longTermRateDisplay !== null ? `<span style="color:${longTermRateColor}; margin-top:6px; margin-left:6px; font-size:10px;" title="장기 수익 달성률">(${longTermRateDisplay}%)</span>` : ''}
                    </div>
                </td>
                <td class="number">
                    <div>${formatNumber(row.assetAfter)}${achievementHtml}</div>
                    ${actualEndAssetDisplay !== null ? `
                    <div style="margin-top:6px;">
                        <span style="color:${actualEndAssetDisplay >= row.assetAfter ? 'var(--accent-primary)' : '#ef4444'}; font-family: 'Monaco', 'Courier New', monospace; font-weight:700; font-size:12px;">${formatNumber(actualEndAssetDisplay)}</span>
                    </div>
                    <div style="margin-top:2px; font-family: 'Monaco', 'Courier New', monospace; font-size:9px; color:var(--text-secondary);">${formatNumber(row.initialAssetAfter)}(초기 목표)</div>` : ''}
                </td>
            </tr>
        `;
    }).join('');
}

function createYearTabs() {
    const yearTabs = document.getElementById('yearTabs');
    const years = Object.keys(yearGroups).sort((a, b) => a - b);
    const currentYear = new Date().getFullYear();
    const defaultYear = years.includes(String(currentYear)) ? currentYear : parseInt(years[0]);

    yearTabs.innerHTML = years.map(year => `
        <button class="tab ${parseInt(year) === defaultYear ? 'active' : ''}" data-year="${year}">
            ${year}년
        </button>
    `).join('');

    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function () {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            renderTableByYear(parseInt(this.dataset.year));
        });
    });

    return defaultYear;
}

function calculateAndDisplay() {
    const principal = parseFloat(document.getElementById('principal').value) || 0;
    const monthlyInvestment = parseFloat(document.getElementById('monthlyInvestment').value) || 0;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const longTermRatio = parseFloat(document.getElementById('longTermRatio').value) || 0;
    const shortTermRatio = parseFloat(document.getElementById('shortTermRatio').value) || 0;
    const annualTargetRate = parseFloat(document.getElementById('annualTargetRate').value) || 12; // 기본값 12% (연)
    const longTermAnnualTarget = parseFloat(document.getElementById('longTermAnnualTarget').value) || 10; // 기본값 10% (연)

    // 투자 비율 정규화
    const totalRatio = longTermRatio + shortTermRatio;
    const normalizedLongTerm = totalRatio > 0 ? (longTermRatio / totalRatio) : 0.5;
    const normalizedShortTerm = totalRatio > 0 ? (shortTermRatio / totalRatio) : 0.5;

    // 초기 자산 분할
    const longTermPrincipal = principal * normalizedLongTerm;
    const shortTermPrincipal = principal * normalizedShortTerm;
    longTermPrincipalGlobal = longTermPrincipal;
    shortTermPrincipalGlobal = shortTermPrincipal;

    const months = getMonthsDifference(startDate, endDate);

    // 월 수익 목표 비율 (전체 목표): 연 수익률을 월 복리 수익률로 변환
    const targetMonthlyRate = Math.pow(1 + annualTargetRate / 100, 1 / 12) - 1;

    // 장기 투자 월 수익률 계산 (연 → 월)
    const longTermMonthlyRate = (Math.pow(1 + longTermAnnualTarget / 100, 1 / 12) - 1);

    // 필요한 단기 투자 월 수익률 계산
    // 전체 월 수익 = 장기 수익 + 단기 수익
    // totalMonthlyProfit = longTermAccumulated * longTermMonthlyRate + shortTermAccumulated * shortTermMonthlyRate
    // 간단하게: 필요 단기 수익률 = (전체 목표 - 장기 기여분) / 단기 비율
    const totalMonthlyRequired = targetMonthlyRate;
    const longTermContribution = normalizedLongTerm * longTermMonthlyRate;
    const shortTermMonthlyRequired = (totalMonthlyRequired - longTermContribution) / normalizedShortTerm;
    const shortTermMonthlyPercent = shortTermMonthlyRequired * 100;

    // 비율 시각화
    document.getElementById('longTermBar').style.width = normalizedLongTerm * 100 + '%';
    document.getElementById('longTermText').textContent = (normalizedLongTerm * 100).toFixed(0) + '%';
    document.getElementById('shortTermBar').style.width = normalizedShortTerm * 100 + '%';
    document.getElementById('shortTermText').textContent = (normalizedShortTerm * 100).toFixed(0) + '%';

    // 월 재투자 금액 분배 업데이트
    const longTermInvestAmount = monthlyInvestment * normalizedLongTerm;
    const shortTermInvestAmount = monthlyInvestment * normalizedShortTerm;
    const totalInvestEl = document.getElementById('monthlyInvestmentTotal');
    const longInvestEl = document.getElementById('longTermInvestAmount');
    const shortInvestEl = document.getElementById('shortTermInvestAmount');
    if (totalInvestEl) totalInvestEl.textContent = formatNumber(monthlyInvestment);
    if (longInvestEl) longInvestEl.textContent = formatNumber(longTermInvestAmount);
    if (shortInvestEl) shortInvestEl.textContent = formatNumber(shortTermInvestAmount);

    // 월별 테이블 생성
    allTableRows = [];
    yearGroups = {};

    const startObj = new Date(startDate);
    let currentAsset = principal;
    let longTermAccumulated = longTermPrincipal; // 장기투자 초기 원금 (수익 포함 누계)
    let runningLongPrincipal = longTermPrincipal; // 장기 누적 원금
    let runningShortPrincipal = shortTermPrincipal; // 단기 누적 원금
    let shortTermCumulativeProfitTotal = 0; // 단기 누적 수익금
    let carryAssetForNextMonth = null; // 이전달 실제 자산을 다음달 월초로 사용
    let cleanCurrentAsset = principal; // 초기 목표 순수 시뮬레이션용 (실제값 미반영)

    for (let month = 1; month <= months; month++) {
        const currentDate = new Date(startObj);
        currentDate.setMonth(currentDate.getMonth() + month - 1);
        const year = currentDate.getFullYear();

        const dateStr = formatDate(currentDate.toISOString().split('T')[0]);

        // 월초 자산: 이전달에 실제값이 입력되었다면 그 실제값을 이월(우선 사용), 아니면 시뮬레이션 값 사용
        const assetAtMonthStart = carryAssetForNextMonth !== null ? carryAssetForNextMonth : currentAsset;
        // carry는 한달만 적용
        carryAssetForNextMonth = null;

        // 이전 장기 누적(계산용)
        const prevLongTermAccumulated = longTermAccumulated;

        // 월초 기준으로 각 자산의 크기
        const longTermAssetAtMonth = assetAtMonthStart * normalizedLongTerm;
        const shortTermAssetAtMonth = assetAtMonthStart * normalizedShortTerm;

        // 장기 투자 필요 수익금 (월 수익률 기반)
        const longTermMonthlyProfit = longTermAssetAtMonth * longTermMonthlyRate;

        // 단기 투자 필요 수익금 (계산된 월 수익률 기반)
        const shortTermMonthlyProfit = shortTermAssetAtMonth * shortTermMonthlyRequired;

        // 단기 누적 수익금 누적 (실제값이 있으면 실제 단기 수익을 사용)
        const actualShortInput = actualValues[month]?.shortTerm ?? null;
        const shortToAdd = (actualShortInput !== null && !isNaN(Number(actualShortInput))) ? Number(actualShortInput) : shortTermMonthlyProfit;
        shortTermCumulativeProfitTotal += shortToAdd;

        // 전체 필요 수익금
        const monthlyProfitDynamic = longTermMonthlyProfit + shortTermMonthlyProfit;

        // 장기투자 누적 = 기존 + 월 장기 재투자 + 월 장기 수익
        const longTermInvest = (monthlyInvestment * normalizedLongTerm);
        const shortTermInvest = (monthlyInvestment * normalizedShortTerm);
        longTermAccumulated = longTermAccumulated + longTermInvest + longTermMonthlyProfit;

        // 월말 자산(시뮬레이션)
        currentAsset = assetAtMonthStart + monthlyInvestment + monthlyProfitDynamic;

        // 초기 목표 순수 시뮬레이션 (실제 입력값 미반영 — 비교용 기준값)
        const cleanLongProfit = cleanCurrentAsset * normalizedLongTerm * longTermMonthlyRate;
        const cleanShortProfit = cleanCurrentAsset * normalizedShortTerm * shortTermMonthlyRequired;
        const initialAssetAfter = cleanCurrentAsset + monthlyInvestment + cleanLongProfit + cleanShortProfit;
        cleanCurrentAsset = initialAssetAfter;

        // 실제 입력값이 있으면 이번달 실제 종료 자산을 계산하여 다음달 이월 자산으로 사용
        const actualShort = actualValues[month]?.shortTerm ?? null;
        const actualLongCumul = actualValues[month]?.longTermCumul ?? null;
        const effectiveShort = actualShort !== null && !isNaN(Number(actualShort)) ? Number(actualShort) : shortTermMonthlyProfit;
        const effectiveLongCumul = actualLongCumul !== null && !isNaN(Number(actualLongCumul)) ? Number(actualLongCumul) : longTermAccumulated;
        const actualLongProfit = effectiveLongCumul - prevLongTermAccumulated - longTermInvest;
        const actualTotalProfit = effectiveShort + actualLongProfit;
        const actualEndAsset = assetAtMonthStart + monthlyInvestment + actualTotalProfit;

        // 이전달 실제 입력(단기 또는 장기 누적)이 있으면 이 값을 다음달 시작 자산으로 사용
        if ((actualShort !== null && !isNaN(Number(actualShort))) || (actualLongCumul !== null && !isNaN(Number(actualLongCumul)))) {
            carryAssetForNextMonth = actualEndAsset;
        }

        const rowData = {
            month: month,
            dateStr: dateStr,
            assetBefore: assetAtMonthStart,
            monthlyInvest: monthlyInvestment,
            longTermInvest: longTermInvest,
            profit: monthlyProfitDynamic,
            shortTermProfit: shortTermMonthlyProfit,
            shortTermPrincipal: runningShortPrincipal,
            shortTermCumulativeProfit: shortTermCumulativeProfitTotal,
            longTermAccumulated: longTermAccumulated,
            longTermPrincipal: runningLongPrincipal,
            assetAfter: currentAsset,
            initialAssetAfter: initialAssetAfter,
            actualEndAsset: ((actualShort !== null && !isNaN(Number(actualShort))) || (actualLongCumul !== null && !isNaN(Number(actualLongCumul)))) ? actualEndAsset : null,
            highlight: month === months,
            year: year
        };

        // 누적 원금 업데이트 (다음 달 계산에 반영)
        runningLongPrincipal += longTermInvest;
        runningShortPrincipal += shortTermInvest;

        allTableRows.push(rowData);

        if (!yearGroups[year]) {
            yearGroups[year] = [];
        }
        yearGroups[year].push(rowData);
    }

    // 비율 표시 업데이트
    const ratioDisplayEl = document.getElementById('ratioDisplay');
    if (ratioDisplayEl) {
        ratioDisplayEl.textContent = (normalizedLongTerm * 100).toFixed(0) + '% / ' + (normalizedShortTerm * 100).toFixed(0) + '%';
    }

    const defaultYear = createYearTabs();
    renderTableByYear(defaultYear);
    renderChart();
}

// 로컬스토리지 키
const STORAGE_KEY = 'assetSimulatorConfig';

// 로컬스토리지에 저장
function saveToLocalStorage() {
    const config = {
        principal: document.getElementById('principal').value,
        annualTargetRate: document.getElementById('annualTargetRate').value,
        monthlyInvestment: document.getElementById('monthlyInvestment').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        longTermRatio: document.getElementById('longTermRatio').value,
        longTermAnnualTarget: document.getElementById('longTermAnnualTarget').value,
        shortTermRatio: document.getElementById('shortTermRatio').value,
        actualValues: actualValues
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

// 로컬스토리지에서 복원
function loadFromLocalStorage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const config = JSON.parse(saved);
            document.getElementById('principal').value = config.principal || 500000000;
            document.getElementById('annualTargetRate').value = config.annualTargetRate || 12;
            document.getElementById('monthlyInvestment').value = config.monthlyInvestment || 5000000;
            document.getElementById('startDate').value = config.startDate || '2026-01-01';
            document.getElementById('endDate').value = config.endDate || '2028-01-01';
            document.getElementById('longTermRatio').value = config.longTermRatio || 60;
            document.getElementById('longTermAnnualTarget').value = config.longTermAnnualTarget || 10;
            document.getElementById('shortTermRatio').value = config.shortTermRatio || 40;
            if (config.actualValues) actualValues = config.actualValues;
        } catch (error) {
            console.error('로컬스토리지 복원 실패:', error);
        }
    }
}

// 설정 저장 함수
function saveConfig() {
    const config = {
        principal: document.getElementById('principal').value,
        annualTargetRate: document.getElementById('annualTargetRate').value,
        monthlyInvestment: document.getElementById('monthlyInvestment').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        longTermRatio: document.getElementById('longTermRatio').value,
        longTermAnnualTarget: document.getElementById('longTermAnnualTarget').value,
        shortTermRatio: document.getElementById('shortTermRatio').value,
        actualValues: actualValues,
        timestamp: new Date().toISOString()
    };

    const jsonString = JSON.stringify(config, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `자산운용설정_${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('설정이 저장되었습니다!');
}

// 설정 로드 함수
function loadConfig() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const config = JSON.parse(event.target.result);

                // 입력값 복원
                document.getElementById('principal').value = config.principal;
                document.getElementById('annualTargetRate').value = config.annualTargetRate;
                document.getElementById('monthlyInvestment').value = config.monthlyInvestment;
                document.getElementById('startDate').value = config.startDate;
                document.getElementById('endDate').value = config.endDate;
                document.getElementById('longTermRatio').value = config.longTermRatio;
                document.getElementById('longTermAnnualTarget').value = config.longTermAnnualTarget;
                document.getElementById('shortTermRatio').value = config.shortTermRatio;
                if (config.actualValues) actualValues = config.actualValues;

                // 계산 재실행
                calculateAndDisplay();

                alert('설정이 로드되었습니다!');
            } catch (error) {
                alert('파일을 읽을 수 없습니다. JSON 형식을 확인해주세요.');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// 버튼 이벤트 리스너
document.getElementById('saveConfigBtn').addEventListener('click', saveConfig);
document.getElementById('loadConfigBtn').addEventListener('click', loadConfig);

// 입력값 변경 이벤트 리스너
document.getElementById('principal').addEventListener('change', () => {
    saveToLocalStorage();
    calculateAndDisplay();
});
document.getElementById('annualTargetRate').addEventListener('input', () => {
    saveToLocalStorage();
    calculateAndDisplay();
});
document.getElementById('monthlyInvestment').addEventListener('change', () => {
    saveToLocalStorage();
    calculateAndDisplay();
});
document.getElementById('startDate').addEventListener('change', () => {
    saveToLocalStorage();
    calculateAndDisplay();
});
document.getElementById('endDate').addEventListener('change', () => {
    saveToLocalStorage();
    calculateAndDisplay();
});
document.getElementById('longTermRatio').addEventListener('input', () => {
    saveToLocalStorage();
    calculateAndDisplay();
});
document.getElementById('shortTermRatio').addEventListener('input', () => {
    saveToLocalStorage();
    calculateAndDisplay();
});
document.getElementById('longTermAnnualTarget').addEventListener('input', () => {
    saveToLocalStorage();
    calculateAndDisplay();
});

// 페이지 로드 시 로컬스토리지에서 복원
loadFromLocalStorage();
calculateAndDisplay();
