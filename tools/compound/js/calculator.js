(function (app) {
    const {
        formatDate,
        getMonthDate,
        getMonthsDifference,
        hasNumericValue,
        normalizeRatios
    } = app.utils;

    function updateAllocationDisplay(normalizedLongTerm, normalizedShortTerm, monthlyInvestment, principal) {
        const longTermBar = document.getElementById('longTermBar');
        const longTermText = document.getElementById('longTermText');
        const shortTermBar = document.getElementById('shortTermBar');
        const shortTermText = document.getElementById('shortTermText');
        const { formatKoreanCurrency } = app.utils;

        const longTermPrincipalAmount = principal * normalizedLongTerm;
        const shortTermPrincipalAmount = principal * normalizedShortTerm;
        const longTermPrincipalText = `${Math.floor(longTermPrincipalAmount).toLocaleString('ko-KR')}원`;
        const shortTermPrincipalText = `${Math.floor(shortTermPrincipalAmount).toLocaleString('ko-KR')}원`;

        if (longTermBar) longTermBar.style.width = `${normalizedLongTerm * 100}%`;
        if (longTermText) {
            longTermText.textContent = longTermPrincipalText;
            longTermText.setAttribute('data-tooltip', `장기 투자 원금 (${formatKoreanCurrency(longTermPrincipalAmount)})`);
        }
        if (shortTermBar) shortTermBar.style.width = `${normalizedShortTerm * 100}%`;
        if (shortTermText) {
            shortTermText.textContent = shortTermPrincipalText;
            shortTermText.setAttribute('data-tooltip', `단기 투자 원금 (${formatKoreanCurrency(shortTermPrincipalAmount)})`);
        }

        const longTermInvestAmount = monthlyInvestment * normalizedLongTerm;
        const shortTermInvestAmount = monthlyInvestment * normalizedShortTerm;

        const totalPrincipalEl = document.getElementById('principalAllocationTotal');
        const longPrincipalEl = document.getElementById('longTermPrincipalAmount');
        const shortPrincipalEl = document.getElementById('shortTermPrincipalAmount');
        const totalInvestEl = document.getElementById('monthlyInvestmentTotal');
        const longInvestEl = document.getElementById('longTermInvestAmount');
        const shortInvestEl = document.getElementById('shortTermInvestAmount');

        if (totalPrincipalEl) {
            totalPrincipalEl.textContent = Math.floor(principal).toLocaleString('ko-KR');
            totalPrincipalEl.setAttribute('data-tooltip', formatKoreanCurrency(principal));
        }
        if (longPrincipalEl) {
            longPrincipalEl.textContent = Math.floor(longTermPrincipalAmount).toLocaleString('ko-KR');
            longPrincipalEl.setAttribute('data-tooltip', `장기 투자 원금 (${formatKoreanCurrency(longTermPrincipalAmount)})`);
        }
        if (shortPrincipalEl) {
            shortPrincipalEl.textContent = Math.floor(shortTermPrincipalAmount).toLocaleString('ko-KR');
            shortPrincipalEl.setAttribute('data-tooltip', `단기 투자 원금 (${formatKoreanCurrency(shortTermPrincipalAmount)})`);
        }
        if (totalInvestEl) {
            totalInvestEl.textContent = Math.floor(monthlyInvestment).toLocaleString('ko-KR');
            totalInvestEl.setAttribute('data-tooltip', formatKoreanCurrency(monthlyInvestment));
        }
        if (longInvestEl) {
            longInvestEl.textContent = Math.floor(longTermInvestAmount).toLocaleString('ko-KR');
            longInvestEl.setAttribute('data-tooltip', `장기 투자 배분액 (${formatKoreanCurrency(longTermInvestAmount)})`);
        }
        if (shortInvestEl) {
            shortInvestEl.textContent = Math.floor(shortTermInvestAmount).toLocaleString('ko-KR');
            shortInvestEl.setAttribute('data-tooltip', `단기 투자 배분액 (${formatKoreanCurrency(shortTermInvestAmount)})`);
        }
    }

    function getMonthlyInvestmentSplit(settings, normalizedRatios) {
        const hasLongTermMonthlyInvestment = settings.longTermMonthlyInvestment !== undefined
            && settings.longTermMonthlyInvestment !== null;
        const hasShortTermMonthlyInvestment = settings.shortTermMonthlyInvestment !== undefined
            && settings.shortTermMonthlyInvestment !== null;

        if (hasLongTermMonthlyInvestment || hasShortTermMonthlyInvestment) {
            const longTermMonthlyInvestment = Math.max(parseFloat(settings.longTermMonthlyInvestment) || 0, 0);
            const shortTermMonthlyInvestment = Math.max(parseFloat(settings.shortTermMonthlyInvestment) || 0, 0);
            return {
                currentMonthlyInvestment: longTermMonthlyInvestment + shortTermMonthlyInvestment,
                longTermMonthlyInvestment,
                shortTermMonthlyInvestment
            };
        }

        const currentMonthlyInvestment = parseFloat(settings.monthlyInvestment) || 0;
        return {
            currentMonthlyInvestment,
            longTermMonthlyInvestment: currentMonthlyInvestment * normalizedRatios.normalizedLongTerm,
            shortTermMonthlyInvestment: currentMonthlyInvestment * normalizedRatios.normalizedShortTerm
        };
    }

    function calculateAndDisplay(state, { createYearTabs, renderTableByYear, renderChart }) {
        const principal = parseFloat(state.globalSettings.principal) || 0;
        const monthlyInvestment = parseFloat(state.globalSettings.monthlyInvestment) || 0;
        const startDate = state.globalSettings.startDate;
        const endDate = state.globalSettings.endDate;
        const longTermRatio = parseFloat(state.globalSettings.longTermRatio) || 0;
        const shortTermRatio = parseFloat(state.globalSettings.shortTermRatio) || 0;
        const annualTargetRate = parseFloat(state.globalSettings.annualTargetRate) || 12;
        const longTermAnnualTarget = parseFloat(state.globalSettings.longTermAnnualTarget) || 10;

        const { normalizedLongTerm, normalizedShortTerm } = normalizeRatios(longTermRatio, shortTermRatio);
        state.longTermPrincipalGlobal = principal * normalizedLongTerm;
        state.shortTermPrincipalGlobal = principal * normalizedShortTerm;

        updateAllocationDisplay(normalizedLongTerm, normalizedShortTerm, monthlyInvestment, principal);

        const months = getMonthsDifference(startDate, endDate);
        let currentSettings = {
            annualTargetRate,
            monthlyInvestment,
            longTermRatio,
            shortTermRatio,
            longTermAnnualTarget
        };

        state.allTableRows = [];
        state.yearGroups = {};

        let currentAsset = principal;
        let longTermAccumulated = state.longTermPrincipalGlobal;
        let runningLongPrincipal = state.longTermPrincipalGlobal;
        let runningShortPrincipal = state.shortTermPrincipalGlobal;
        let shortTermCumulativeProfitTotal = 0;
        let carryAssetForNextMonth = null;
        let cleanCurrentAsset = principal;

        for (let month = 1; month <= months; month += 1) {
            const currentDate = getMonthDate(startDate, month);
            const year = currentDate.getFullYear();
            const dateStr = formatDate(currentDate);

            let currentAdditionalSeed = 0;
            let shouldRebalanceAllocation = false;
            if (state.monthSettingsOverrides[month]) {
                const { additionalSeed, ...persistentSettings } = state.monthSettingsOverrides[month];
                currentSettings = { ...currentSettings, ...persistentSettings };
                currentAdditionalSeed = additionalSeed || 0;
                shouldRebalanceAllocation = Object.prototype.hasOwnProperty.call(persistentSettings, 'longTermRatio')
                    || Object.prototype.hasOwnProperty.call(persistentSettings, 'shortTermRatio');
            }

            const normalizedCurrentRatios = normalizeRatios(currentSettings.longTermRatio, currentSettings.shortTermRatio);
            const targetMonthlyRate = Math.pow(1 + currentSettings.annualTargetRate / 100, 1 / 12) - 1;
            const longTermMonthlyRate = Math.pow(1 + currentSettings.longTermAnnualTarget / 100, 1 / 12) - 1;
            const {
                currentMonthlyInvestment,
                longTermMonthlyInvestment,
                shortTermMonthlyInvestment
            } = getMonthlyInvestmentSplit(currentSettings, normalizedCurrentRatios);

            const assetAtMonthStart = carryAssetForNextMonth !== null ? carryAssetForNextMonth : currentAsset;
            carryAssetForNextMonth = null;

            const prevActualLongCumulInput = month > 1 ? state.actualValues[month - 1]?.longTermCumul ?? null : null;
            if (hasNumericValue(prevActualLongCumulInput)) {
                longTermAccumulated = Number(prevActualLongCumulInput);
            }

            const longTermAssetAtMonth = assetAtMonthStart * normalizedCurrentRatios.normalizedLongTerm;
            const shortTermAssetAtMonth = assetAtMonthStart * normalizedCurrentRatios.normalizedShortTerm;
            if (shouldRebalanceAllocation) {
                longTermAccumulated = longTermAssetAtMonth;
                runningLongPrincipal = longTermAssetAtMonth;
                runningShortPrincipal = shortTermAssetAtMonth;
                shortTermCumulativeProfitTotal = 0;
            }

            const prevLongTermAccumulated = longTermAccumulated;
            const monthlyProfitDynamic = assetAtMonthStart * targetMonthlyRate;
            const longTermMonthlyProfit = longTermAssetAtMonth * longTermMonthlyRate;
            const shortTermMonthlyProfit = monthlyProfitDynamic - longTermMonthlyProfit;

            const actualShortInput = state.actualValues[month]?.shortTerm ?? null;
            const shortToAdd = hasNumericValue(actualShortInput) ? Number(actualShortInput) : shortTermMonthlyProfit;
            shortTermCumulativeProfitTotal += shortToAdd;

            const longTermInvest = longTermMonthlyInvestment
                + (currentAdditionalSeed * normalizedCurrentRatios.normalizedLongTerm);
            const shortTermInvest = shortTermMonthlyInvestment
                + (currentAdditionalSeed * normalizedCurrentRatios.normalizedShortTerm);

            longTermAccumulated += longTermInvest + longTermMonthlyProfit;
            currentAsset = assetAtMonthStart + currentMonthlyInvestment + currentAdditionalSeed + monthlyProfitDynamic;

            const cleanTargetProfit = cleanCurrentAsset * targetMonthlyRate;
            const cleanLongProfit = cleanCurrentAsset * normalizedCurrentRatios.normalizedLongTerm * longTermMonthlyRate;
            const cleanShortProfit = cleanTargetProfit - cleanLongProfit;
            const initialAssetAfter = cleanCurrentAsset + currentMonthlyInvestment + currentAdditionalSeed + cleanLongProfit + cleanShortProfit;
            cleanCurrentAsset = initialAssetAfter;

            const actualShort = state.actualValues[month]?.shortTerm ?? null;
            const actualLongCumul = state.actualValues[month]?.longTermCumul ?? null;
            const effectiveShort = hasNumericValue(actualShort) ? Number(actualShort) : shortTermMonthlyProfit;
            const effectiveLongCumul = hasNumericValue(actualLongCumul) ? Number(actualLongCumul) : longTermAccumulated;
            const actualLongProfit = effectiveLongCumul - prevLongTermAccumulated - longTermInvest;
            const actualTotalProfit = effectiveShort + actualLongProfit;
            const actualEndAsset = assetAtMonthStart + currentMonthlyInvestment + currentAdditionalSeed + actualTotalProfit;

            if (hasNumericValue(actualShort) || hasNumericValue(actualLongCumul)) {
                carryAssetForNextMonth = actualEndAsset;
            }

            const rowData = {
                month,
                dateStr,
                assetBefore: assetAtMonthStart,
                monthlyInvest: currentMonthlyInvestment + currentAdditionalSeed,
                longTermMonthlyInvest: longTermMonthlyInvestment,
                shortTermMonthlyInvest: shortTermMonthlyInvestment,
                longTermInvest,
                profit: monthlyProfitDynamic,
                shortTermProfit: shortTermMonthlyProfit,
                shortTermAssetAtMonth,
                shortTermPrincipal: runningShortPrincipal,
                shortTermCumulativeProfit: shortTermCumulativeProfitTotal,
                allocationRebalanced: shouldRebalanceAllocation,
                longTermBalanceBefore: prevLongTermAccumulated,
                longTermAccumulated,
                longTermPrincipal: runningLongPrincipal,
                assetAfter: currentAsset,
                initialAssetAfter,
                actualEndAsset: hasNumericValue(actualShort) || hasNumericValue(actualLongCumul) ? actualEndAsset : null,
                highlight: month === months,
                year
            };

            runningLongPrincipal += longTermInvest;
            runningShortPrincipal += shortTermInvest;

            state.allTableRows.push(rowData);
            if (!state.yearGroups[year]) {
                state.yearGroups[year] = [];
            }
            state.yearGroups[year].push(rowData);
        }

        const defaultYear = createYearTabs(state, renderTableByYear);
        if (defaultYear !== null) {
            renderTableByYear(state, defaultYear);
        }
        renderChart(state);
    }

    app.calculator = { calculateAndDisplay };
})(window.CompoundAsset = window.CompoundAsset || {});
