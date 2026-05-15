(function (app) {
    const { getMonthDate } = app.utils;

    function setInputValue(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.value = value ?? '';
        }
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
            ['longTermRatio', 'input', 'longTermRatio', true],
            ['shortTermRatio', 'input', 'shortTermRatio', true],
            ['longTermAnnualTarget', 'input', 'longTermAnnualTarget', true],
            ['additionalSeed', 'change', 'additionalSeed', true]
        ];

        bindings.forEach(([id, eventName, field, isNumber]) => {
            const element = document.getElementById(id);
            if (!element) return;
            element.addEventListener(eventName, (event) => {
                handleSettingInput(state, field, event.target.value, isNumber, dependencies);
            });
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
            setInputValue('longTermRatio', state.globalSettings.longTermRatio);
            setInputValue('shortTermRatio', state.globalSettings.shortTermRatio);
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
        setInputValue('longTermRatio', override.longTermRatio ?? state.globalSettings.longTermRatio);
        setInputValue('shortTermRatio', override.shortTermRatio ?? state.globalSettings.shortTermRatio);
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
        setInputValue('modalAnnualTargetRate', effective.annualTargetRate);
        setInputValue('modalMonthlyInvestment', effective.monthlyInvestment);
        setInputValue('modalLongTermRatio', effective.longTermRatio);
        setInputValue('modalShortTermRatio', effective.shortTermRatio);
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

        const settings = {
            annualTargetRate: parseFloat(document.getElementById('modalAnnualTargetRate')?.value),
            monthlyInvestment: parseFloat(document.getElementById('modalMonthlyInvestment')?.value),
            longTermRatio: parseFloat(document.getElementById('modalLongTermRatio')?.value),
            shortTermRatio: parseFloat(document.getElementById('modalShortTermRatio')?.value),
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
