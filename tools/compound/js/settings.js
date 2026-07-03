(function (app) {
    const { getMonthDate, normalizeRatios } = app.utils;

    function setInputValue(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.value = value ?? '';
        }
    }

    function clampAmount(value, maxAmount) {
        const parsedValue = parseFloat(value);
        if (Number.isNaN(parsedValue)) return 0;
        return Math.min(Math.max(parsedValue, 0), Math.max(maxAmount, 0));
    }

    function amountToRatios(amount, baseAmount) {
        if (baseAmount <= 0) {
            return { longTermRatio: 0, shortTermRatio: 0 };
        }

        const longTermRatio = (amount / baseAmount) * 100;
        return {
            longTermRatio: Number(longTermRatio.toFixed(4)),
            shortTermRatio: Number((100 - longTermRatio).toFixed(4))
        };
    }

    function getAllocationBaseForMonth(state, month) {
        if (!month) {
            return parseFloat(state.globalSettings.principal) || 0;
        }

        const row = state.allTableRows.find((item) => item.month === month);
        return parseFloat(row?.assetBefore ?? state.globalSettings.principal) || 0;
    }

    function getAllocationAmounts(baseAmount, longTermRatio, shortTermRatio) {
        const { normalizedLongTerm, normalizedShortTerm } = normalizeRatios(
            parseFloat(longTermRatio) || 0,
            parseFloat(shortTermRatio) || 0
        );

        return {
            longTermAmount: Math.round(baseAmount * normalizedLongTerm),
            shortTermAmount: Math.round(baseAmount * normalizedShortTerm)
        };
    }

    function getCurrentMonthAllocationAmounts(state, month, fallbackLongTermRatio, fallbackShortTermRatio) {
        const baseAmount = getAllocationBaseForMonth(state, month);
        const row = state.allTableRows.find((item) => item.month === month);

        if (month && row && row.longTermBalanceBefore !== undefined) {
            const longTermAmount = clampAmount(row.longTermBalanceBefore, baseAmount);
            return {
                longTermAmount: Math.round(longTermAmount),
                shortTermAmount: Math.round(baseAmount - longTermAmount)
            };
        }

        return getAllocationAmounts(baseAmount, fallbackLongTermRatio, fallbackShortTermRatio);
    }

    function getMonthlyInvestmentAmounts(settings) {
        const monthlyInvestment = parseFloat(settings.monthlyInvestment) || 0;
        const hasLongTermMonthlyInvestment = settings.longTermMonthlyInvestment !== undefined
            && settings.longTermMonthlyInvestment !== null;
        const hasShortTermMonthlyInvestment = settings.shortTermMonthlyInvestment !== undefined
            && settings.shortTermMonthlyInvestment !== null;

        if (hasLongTermMonthlyInvestment || hasShortTermMonthlyInvestment) {
            const longTermMonthlyInvestment = Math.max(parseFloat(settings.longTermMonthlyInvestment) || 0, 0);
            const shortTermMonthlyInvestment = Math.max(parseFloat(settings.shortTermMonthlyInvestment) || 0, 0);
            return { longTermMonthlyInvestment, shortTermMonthlyInvestment };
        }

        const { normalizedLongTerm, normalizedShortTerm } = normalizeRatios(
            parseFloat(settings.longTermRatio) || 0,
            parseFloat(settings.shortTermRatio) || 0
        );

        return {
            longTermMonthlyInvestment: Math.round(monthlyInvestment * normalizedLongTerm),
            shortTermMonthlyInvestment: Math.round(monthlyInvestment * normalizedShortTerm)
        };
    }

    function setAllocationInputValues(longInputId, shortInputId, baseAmount, longTermRatio, shortTermRatio) {
        const { longTermAmount, shortTermAmount } = getAllocationAmounts(baseAmount, longTermRatio, shortTermRatio);
        setInputValue(longInputId, longTermAmount);
        setInputValue(shortInputId, shortTermAmount);
    }

    function syncMainAllocationInputs(state) {
        const effective = state.currentSettingsTab === 0
            ? state.globalSettings
            : getEffectiveSettingsForMonth(state, state.currentSettingsTab);
        if (state.currentSettingsTab === 0) {
            setAllocationInputValues(
                'longTermRatio',
                'shortTermRatio',
                getAllocationBaseForMonth(state, state.currentSettingsTab),
                effective.longTermRatio,
                effective.shortTermRatio
            );
            return;
        }

        const { longTermAmount, shortTermAmount } = getCurrentMonthAllocationAmounts(
            state,
            state.currentSettingsTab,
            effective.longTermRatio,
            effective.shortTermRatio
        );
        setInputValue('longTermRatio', longTermAmount);
        setInputValue('shortTermRatio', shortTermAmount);
    }

    function setAllocationRatios(state, longTermAmount, baseAmount) {
        const ratios = amountToRatios(longTermAmount, baseAmount);
        if (state.currentSettingsTab === 0) {
            state.globalSettings.longTermRatio = ratios.longTermRatio;
            state.globalSettings.shortTermRatio = ratios.shortTermRatio;
            return;
        }

        if (!state.monthSettingsOverrides[state.currentSettingsTab]) {
            state.monthSettingsOverrides[state.currentSettingsTab] = {};
        }
        state.monthSettingsOverrides[state.currentSettingsTab].longTermRatio = ratios.longTermRatio;
        state.monthSettingsOverrides[state.currentSettingsTab].shortTermRatio = ratios.shortTermRatio;
    }

    function handleAllocationAmountInput(state, side, value, dependencies) {
        const baseAmount = getAllocationBaseForMonth(state, state.currentSettingsTab);
        const changedAmount = clampAmount(value, baseAmount);
        const longTermAmount = side === 'long' ? changedAmount : baseAmount - changedAmount;

        setAllocationRatios(state, longTermAmount, baseAmount);
        setInputValue('longTermRatio', Math.round(longTermAmount));
        setInputValue('shortTermRatio', Math.round(baseAmount - longTermAmount));

        dependencies.saveToLocalStorage();
        dependencies.calculateAndDisplay();
        syncMainAllocationInputs(state);
    }

    function syncModalCounterpart(state, side, value) {
        const baseAmount = getAllocationBaseForMonth(state, state.currentEditingMonth);
        const changedAmount = clampAmount(value, baseAmount);
        if (side === 'long') {
            setInputValue('modalLongTermRatio', Math.round(changedAmount));
            setInputValue('modalShortTermRatio', Math.round(baseAmount - changedAmount));
            return;
        }

        setInputValue('modalShortTermRatio', Math.round(changedAmount));
        setInputValue('modalLongTermRatio', Math.round(baseAmount - changedAmount));
    }

    function getEffectiveSettingsForMonth(state, month) {
        const effective = {
            annualTargetRate: parseFloat(state.globalSettings.annualTargetRate) || 12,
            monthlyInvestment: parseFloat(state.globalSettings.monthlyInvestment) || 0,
            longTermRatio: parseFloat(state.globalSettings.longTermRatio) || 0,
            shortTermRatio: parseFloat(state.globalSettings.shortTermRatio) || 0,
            longTermAnnualTarget: parseFloat(state.globalSettings.longTermAnnualTarget) || 10
        };

        for (let index = 1; index <= month; index += 1) {
            if (state.monthSettingsOverrides[index]) {
                Object.assign(effective, state.monthSettingsOverrides[index]);
            }
        }

        return effective;
    }

    function handleSettingInput(state, field, value, isNumber, dependencies) {
        let parsedValue = isNumber ? parseFloat(value) : value;
        if (isNumber && Number.isNaN(parsedValue)) {
            parsedValue = 0;
        }

        if (state.currentSettingsTab === 0) {
            state.globalSettings[field] = parsedValue;
        } else {
            if (!state.monthSettingsOverrides[state.currentSettingsTab]) {
                state.monthSettingsOverrides[state.currentSettingsTab] = {};
            }
            state.monthSettingsOverrides[state.currentSettingsTab][field] = parsedValue;
        }

        dependencies.saveToLocalStorage();
        dependencies.calculateAndDisplay();
    }

    function bindSettingInputs(state, dependencies) {
        const bindings = [
            ['principal', 'change', 'principal', true],
            ['annualTargetRate', 'input', 'annualTargetRate', true],
            ['monthlyInvestment', 'change', 'monthlyInvestment', true],
            ['startDate', 'change', 'startDate', false],
            ['endDate', 'change', 'endDate', false],
            ['longTermAnnualTarget', 'input', 'longTermAnnualTarget', true],
            ['additionalSeed', 'change', 'additionalSeed', true]
        ];

        bindings.forEach(([id, eventName, field, isNumber]) => {
            const element = document.getElementById(id);
            if (!element) return;
            element.addEventListener(eventName, (event) => {
                handleSettingInput(state, field, event.target.value, isNumber, dependencies);
                syncMainAllocationInputs(state);
            });
        });

        document.getElementById('longTermRatio')?.addEventListener('input', (event) => {
            handleAllocationAmountInput(state, 'long', event.target.value, dependencies);
        });
        document.getElementById('shortTermRatio')?.addEventListener('input', (event) => {
            handleAllocationAmountInput(state, 'short', event.target.value, dependencies);
        });
        document.getElementById('modalLongTermRatio')?.addEventListener('input', (event) => {
            syncModalCounterpart(state, 'long', event.target.value);
        });
        document.getElementById('modalShortTermRatio')?.addEventListener('input', (event) => {
            syncModalCounterpart(state, 'short', event.target.value);
        });
    }

    function renderSettingsTabs(state) {
        const tabsContainer = document.getElementById('globalSettingsTabs');
        if (!tabsContainer) return;

        const overridesKeys = Object.keys(state.monthSettingsOverrides).map(Number).sort((a, b) => a - b);
        const tabsHtml = overridesKeys.map((month) => {
            const date = getMonthDate(state.globalSettings.startDate, month);
            const dateText = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`;
            return `
            <div class="tab ${state.currentSettingsTab === month ? 'active' : ''}" style="display:inline-flex; align-items:center; gap:8px; padding-right:12px;">
                <span onclick="selectSettingTab(${month})" style="cursor:pointer; height:100%; display:flex; align-items:center;">${dateText}</span>
                <button onclick="deleteSettingTab(${month}, event)" style="background:none; border:none; color:rgba(239, 68, 68, 0.7); font-size:10px; cursor:pointer; padding:4px;" title="탭 삭제">❌</button>
            </div>
            `;
        }).join('');

        tabsContainer.innerHTML = `<button class="tab ${state.currentSettingsTab === 0 ? 'active' : ''}" onclick="selectSettingTab(0)">초기</button>${tabsHtml}`;
    }

    function selectSettingTab(state, month) {
        state.currentSettingsTab = month;
        renderSettingsTabs(state);

        const principalGroup = document.getElementById('principalGroup');
        const principalInput = document.getElementById('principal');
        const additionalSeedGroup = document.getElementById('additionalSeedGroup');
        const additionalSeedInput = document.getElementById('additionalSeed');
        const startDateInput = document.getElementById('startDate');
        const endDateInput = document.getElementById('endDate');
        const override = state.monthSettingsOverrides[month] ?? {};

        if (month === 0) {
            setInputValue('annualTargetRate', state.globalSettings.annualTargetRate);
            setInputValue('monthlyInvestment', state.globalSettings.monthlyInvestment);
            syncMainAllocationInputs(state);
            setInputValue('longTermAnnualTarget', state.globalSettings.longTermAnnualTarget);

            if (principalGroup) principalGroup.style.display = 'block';
            if (additionalSeedGroup) additionalSeedGroup.style.display = 'none';

            if (principalInput) principalInput.value = state.globalSettings.principal;
            if (startDateInput) {
                startDateInput.value = state.globalSettings.startDate;
                startDateInput.disabled = false;
            }
            if (endDateInput) {
                endDateInput.value = state.globalSettings.endDate;
                endDateInput.disabled = false;
            }
            return;
        }

        setInputValue('annualTargetRate', override.annualTargetRate ?? state.globalSettings.annualTargetRate);
        setInputValue('monthlyInvestment', override.monthlyInvestment ?? state.globalSettings.monthlyInvestment);
        syncMainAllocationInputs(state);
        setInputValue('longTermAnnualTarget', override.longTermAnnualTarget ?? state.globalSettings.longTermAnnualTarget);

        if (principalGroup) principalGroup.style.display = 'none';
        if (additionalSeedGroup) additionalSeedGroup.style.display = 'block';
        if (additionalSeedInput) additionalSeedInput.value = override.additionalSeed ?? '';
        if (startDateInput) {
            startDateInput.value = '';
            startDateInput.disabled = true;
        }
        if (endDateInput) {
            endDateInput.value = '';
            endDateInput.disabled = true;
        }
    }

    function deleteSettingTab(state, month, event, dependencies) {
        if (event) event.stopPropagation();
        if (!confirm(`${month}월차 설정을 정말 삭제하시겠습니까?`)) return;

        delete state.monthSettingsOverrides[month];
        dependencies.saveToLocalStorage();

        if (state.currentSettingsTab === month) {
            selectSettingTab(state, 0);
        } else {
            renderSettingsTabs(state);
        }

        dependencies.calculateAndDisplay();
    }

    function openMonthSettings(state, month) {
        state.currentEditingMonth = month;

        const modal = document.getElementById('monthSettingsModal');
        const monthText = document.getElementById('modalMonthText');
        const title = document.getElementById('modalMonthTitle');

        if (monthText) monthText.innerText = `${month}월차`;
        if (title) {
            title.innerHTML = state.monthSettingsOverrides[month]
                ? `${month}월차 설정 변경 <span style="font-size:12px; color:var(--accent-warning); font-weight:normal;">(수정됨)</span>`
                : `${month}월차 설정 변경`;
        }

        const effective = getEffectiveSettingsForMonth(state, month);
        const monthlyInvestments = getMonthlyInvestmentAmounts(effective);
        const allocationAmounts = getCurrentMonthAllocationAmounts(
            state,
            month,
            effective.longTermRatio,
            effective.shortTermRatio
        );
        setInputValue('modalAnnualTargetRate', effective.annualTargetRate);
        setInputValue('modalLongTermMonthlyInvestment', monthlyInvestments.longTermMonthlyInvestment);
        setInputValue('modalShortTermMonthlyInvestment', monthlyInvestments.shortTermMonthlyInvestment);
        setInputValue('modalLongTermRatio', allocationAmounts.longTermAmount);
        setInputValue('modalShortTermRatio', allocationAmounts.shortTermAmount);
        setInputValue('modalLongTermAnnualTarget', effective.longTermAnnualTarget);
        setInputValue('modalAdditionalSeed', state.monthSettingsOverrides[month]?.additionalSeed ?? '');

        if (modal) modal.style.display = 'flex';
    }

    function closeMonthSettings(state) {
        const modal = document.getElementById('monthSettingsModal');
        if (modal) modal.style.display = 'none';
        state.currentEditingMonth = null;
    }

    function saveMonthSettings(state, dependencies) {
        if (!state.currentEditingMonth) return;

        const baseAmount = getAllocationBaseForMonth(state, state.currentEditingMonth);
        const longTermAmount = clampAmount(document.getElementById('modalLongTermRatio')?.value, baseAmount);
        const allocationRatios = amountToRatios(longTermAmount, baseAmount);
        const longTermMonthlyInvestment = Math.max(parseFloat(document.getElementById('modalLongTermMonthlyInvestment')?.value) || 0, 0);
        const shortTermMonthlyInvestment = Math.max(parseFloat(document.getElementById('modalShortTermMonthlyInvestment')?.value) || 0, 0);

        const settings = {
            annualTargetRate: parseFloat(document.getElementById('modalAnnualTargetRate')?.value),
            monthlyInvestment: longTermMonthlyInvestment + shortTermMonthlyInvestment,
            longTermMonthlyInvestment,
            shortTermMonthlyInvestment,
            longTermRatio: allocationRatios.longTermRatio,
            shortTermRatio: allocationRatios.shortTermRatio,
            longTermAnnualTarget: parseFloat(document.getElementById('modalLongTermAnnualTarget')?.value)
        };

        const additionalSeedValue = parseFloat(document.getElementById('modalAdditionalSeed')?.value);
        if (!Number.isNaN(additionalSeedValue) && additionalSeedValue !== 0) {
            settings.additionalSeed = additionalSeedValue;
        }

        state.monthSettingsOverrides[state.currentEditingMonth] = settings;
        dependencies.saveToLocalStorage();
        dependencies.renderSettingsTabs();
        dependencies.calculateAndDisplay();
        closeMonthSettings(state);
    }

    function clearMonthSettings(state, dependencies) {
        if (!state.currentEditingMonth) return;

        const month = state.currentEditingMonth;
        delete state.monthSettingsOverrides[month];
        dependencies.saveToLocalStorage();

        if (state.currentSettingsTab === month) {
            selectSettingTab(state, 0);
        } else {
            dependencies.renderSettingsTabs();
        }

        dependencies.calculateAndDisplay();
        closeMonthSettings(state);
    }

    app.settings = {
        bindSettingInputs,
        renderSettingsTabs,
        selectSettingTab,
        deleteSettingTab,
        openMonthSettings,
        closeMonthSettings,
        saveMonthSettings,
        clearMonthSettings
    };
})(window.CompoundAsset = window.CompoundAsset || {});
