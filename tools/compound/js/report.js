(function (app) {
    const { formatNumber, getMonthDate, hasNumericValue } = app.utils;

    function findReportRow(state) {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1;

        const currentIndex = state.allTableRows.findIndex((row) => {
            const date = getMonthDate(state.globalSettings.startDate, row.month);
            return date.getFullYear() === currentYear && date.getMonth() + 1 === currentMonth;
        });

        return currentIndex !== -1
            ? state.allTableRows[currentIndex]
            : state.allTableRows[state.allTableRows.length - 1];
    }

    function getSavingsValue(row, rows) {
        const principal = rows[0].assetBefore;
        const monthlyInvest = rows[0].monthlyInvest;
        const annualSavingsRate = 0.025;
        const monthlySavingsRate = Math.pow(1 + annualSavingsRate, 1 / 12) - 1;

        let savingsValue = principal;
        for (let index = 0; index < row.month; index += 1) {
            savingsValue = savingsValue * (1 + monthlySavingsRate) + monthlyInvest;
        }
        return savingsValue;
    }

    async function savePerformanceReport(state) {
        const { formatNumber, getMonthDate, hasNumericValue, formatKoreanCurrency } = app.utils;
        const reportRow = findReportRow(state);
        if (!reportRow) return;

        const actualShort = hasNumericValue(state.actualValues[reportRow.month]?.shortTerm)
            ? Number(state.actualValues[reportRow.month].shortTerm)
            : reportRow.shortTermProfit;
        const targetShort = reportRow.shortTermProfit;

        const actualLongCumul = hasNumericValue(state.actualValues[reportRow.month]?.longTermCumul)
            ? Number(state.actualValues[reportRow.month].longTermCumul)
            : reportRow.longTermAccumulated;
        const previousLongActual = reportRow.month > 1
            ? (state.actualValues[reportRow.month - 1]?.longTermCumul ?? state.allTableRows[reportRow.month - 2].longTermAccumulated)
            : state.longTermPrincipalGlobal;
        const actualLongProfit = actualLongCumul - previousLongActual - reportRow.longTermInvest;
        const targetLongProfit = reportRow.profit - reportRow.shortTermProfit;

        const hasActualInput = hasNumericValue(state.actualValues[reportRow.month]?.shortTerm)
            || hasNumericValue(state.actualValues[reportRow.month]?.longTermCumul);
        const actualTotalAsset = hasActualInput ? reportRow.actualEndAsset : reportRow.assetAfter;
        const targetAsset = reportRow.initialAssetAfter;
        const savingsValue = getSavingsValue(reportRow, state.allTableRows);

        const initialPrincipal = state.longTermPrincipalGlobal + state.shortTermPrincipalGlobal;
        const totalInvested = initialPrincipal + state.allTableRows
            .slice(0, reportRow.month)
            .reduce((sum, row) => sum + row.monthlyInvest, 0);
        const accumulatedProfit = actualTotalAsset - totalInvested;
        const growthPercent = totalInvested > 0
            ? (((actualTotalAsset - totalInvested) / totalInvested) * 100).toFixed(1)
            : '0.0';

        const reportMonth = reportRow.dateStr.split(' ')[1].replace('월', '');
        const now = new Date();
        const timestampText = `추출일: ${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        document.getElementById('report-main-title').textContent = `${reportMonth}월 성과 보고서`;
        document.getElementById('report-date').textContent = reportRow.dateStr;
        document.getElementById('report-timestamp').textContent = timestampText;

        const monthTotalProfit = actualShort + actualLongProfit;
        document.getElementById('report-total-asset').textContent = `${formatNumber(actualTotalAsset)}원`;
        document.getElementById('report-total-asset-ko').textContent = formatKoreanCurrency(actualTotalAsset);
        document.getElementById('report-month-total-profit').textContent = `금월 수익 합계: +${formatNumber(monthTotalProfit)}원`;
        
        document.getElementById('report-short-profit').textContent = `${formatNumber(actualShort)}원`;
        document.getElementById('report-short-profit-ko').textContent = formatKoreanCurrency(actualShort);
        document.getElementById('report-long-profit').textContent = `${formatNumber(actualLongProfit)}원`;
        document.getElementById('report-long-profit-ko').textContent = formatKoreanCurrency(actualLongProfit);
        
        document.getElementById('report-short-target').textContent = `목표: ${formatNumber(targetShort)}원`;
        document.getElementById('report-long-target').textContent = `목표: ${formatNumber(targetLongProfit)}원`;

        const shortMultiple = targetShort > 0 ? (actualShort / targetShort).toFixed(1) : (actualShort >= 0 ? '1.0' : '0.0');
        const longMultiple = targetLongProfit > 0 ? (actualLongProfit / targetLongProfit).toFixed(1) : (actualLongProfit >= 0 ? '1.0' : '0.0');
        document.getElementById('report-short-mult').textContent = `${shortMultiple}배 달성`;
        document.getElementById('report-long-mult').textContent = `${longMultiple}배 달성`;

        const maxValue = Math.max(actualTotalAsset, targetAsset, savingsValue);
        const targetAchievement = ((actualTotalAsset / targetAsset) * 100).toFixed(1);
        const savingsDiffPercent = (((actualTotalAsset - savingsValue) / savingsValue) * 100).toFixed(1);

        document.getElementById('comp-actual-val').textContent = `${formatNumber(actualTotalAsset)}원`;
        document.getElementById('comp-actual-val-ko').textContent = formatKoreanCurrency(actualTotalAsset);
        document.getElementById('comp-actual-bar').style.width = `${(actualTotalAsset / maxValue) * 100}%`;
        
        // 누적 투자 수익 표시
        document.getElementById('report-passed-months').textContent = `(${reportRow.month}개월)`;
        document.getElementById('comp-acc-profit-val').textContent = `${accumulatedProfit >= 0 ? '+' : ''}${formatNumber(accumulatedProfit)}원`;
        document.getElementById('comp-acc-profit-val-ko').textContent = formatKoreanCurrency(accumulatedProfit);
        document.getElementById('comp-acc-profit-bar').style.width = `${Math.max(0, (accumulatedProfit / maxValue) * 100)}%`;

        document.getElementById('comp-target-val').textContent = `${formatNumber(targetAsset)}원`;
        document.getElementById('comp-target-val-ko').textContent = formatKoreanCurrency(targetAsset);
        document.getElementById('comp-target-status').textContent = `${targetAchievement}%`;
        document.getElementById('comp-target-bar').style.width = `${(targetAsset / maxValue) * 100}%`;
        
        document.getElementById('comp-savings-val').textContent = `${formatNumber(savingsValue)}원`;
        document.getElementById('comp-savings-val-ko').textContent = formatKoreanCurrency(savingsValue);
        document.getElementById('comp-savings-status').textContent = `${savingsDiffPercent >= 0 ? '+' : ''}${savingsDiffPercent}%`;
        document.getElementById('comp-savings-bar').style.width = `${(savingsValue / maxValue) * 100}%`;
        document.getElementById('report-total-growth-percent').textContent = `${growthPercent >= 0 ? '+' : ''}${growthPercent}%`;

        const captureArea = document.getElementById('monthly-report-template');
        try {
            const canvas = await html2canvas(captureArea, {
                backgroundColor: '#0f172a',
                scale: 2,
                logging: false
            });

            const link = document.createElement('a');
            link.download = `투자보고서_${reportRow.dateStr.replace(' ', '')}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (error) {
            console.error('보고서 생성 실패:', error);
            alert('보고서 이미지 생성 중 오류가 발생했습니다.');
        }
    }

    app.report = { savePerformanceReport };
})(window.CompoundAsset = window.CompoundAsset || {});
