(function (app) {
    const STORAGE_KEY = 'assetSimulatorConfig';

    function buildConfigPayload(state, includeTimestamp) {
        const payload = {
            principal: state.globalSettings.principal,
            annualTargetRate: state.globalSettings.annualTargetRate,
            monthlyInvestment: state.globalSettings.monthlyInvestment,
            startDate: state.globalSettings.startDate,
            endDate: state.globalSettings.endDate,
            longTermRatio: state.globalSettings.longTermRatio,
            longTermAnnualTarget: state.globalSettings.longTermAnnualTarget,
            shortTermRatio: state.globalSettings.shortTermRatio,
            actualValues: state.actualValues,
            monthSettingsOverrides: state.monthSettingsOverrides
        };

        if (includeTimestamp) {
            payload.timestamp = new Date().toISOString();
        }

        return payload;
    }

    function applyConfigToState(state, config) {
        const source = config || {};
        state.globalSettings.principal = source.principal ?? app.DEFAULT_SETTINGS.principal;
        state.globalSettings.annualTargetRate = source.annualTargetRate ?? app.DEFAULT_SETTINGS.annualTargetRate;
        state.globalSettings.monthlyInvestment = source.monthlyInvestment ?? app.DEFAULT_SETTINGS.monthlyInvestment;
        state.globalSettings.startDate = source.startDate ?? app.DEFAULT_SETTINGS.startDate;
        state.globalSettings.endDate = source.endDate ?? app.DEFAULT_SETTINGS.endDate;
        state.globalSettings.longTermRatio = source.longTermRatio ?? app.DEFAULT_SETTINGS.longTermRatio;
        state.globalSettings.longTermAnnualTarget = source.longTermAnnualTarget ?? app.DEFAULT_SETTINGS.longTermAnnualTarget;
        state.globalSettings.shortTermRatio = source.shortTermRatio ?? app.DEFAULT_SETTINGS.shortTermRatio;
        state.actualValues = source.actualValues ?? {};
        state.monthSettingsOverrides = source.monthSettingsOverrides ?? {};
    }

    function saveToLocalStorage(state) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(buildConfigPayload(state, false)));
    }

    function loadFromLocalStorage(state) {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return;

        try {
            applyConfigToState(state, JSON.parse(saved));
        } catch (error) {
            console.error('로컬스토리지 복원 실패:', error);
        }
    }

    function saveConfig(state) {
        const jsonString = JSON.stringify(buildConfigPayload(state, true), null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = `자산운용설정_${Date.now()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        alert('설정이 저장되었습니다!');
    }

    function loadConfig(state, options) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (event) => {
            const file = event.target.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                try {
                    const config = JSON.parse(loadEvent.target.result);
                    applyConfigToState(state, config);
                    saveToLocalStorage(state);
                    options.onLoaded();
                    alert('설정이 로드되었습니다!');
                } catch (error) {
                    console.error('설정 파일 로드 실패:', error);
                    alert('파일을 읽을 수 없습니다. JSON 형식을 확인해주세요.');
                }
            };
            reader.readAsText(file);
        };

        input.click();
    }

    app.persistence = {
        applyConfigToState,
        saveToLocalStorage,
        loadFromLocalStorage,
        saveConfig,
        loadConfig
    };
})(window.CompoundAsset = window.CompoundAsset || {});
