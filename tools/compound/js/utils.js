(function (app) {
    function formatNumber(num) {
        if (num === null || num === undefined) return '-';
        return Math.floor(num).toLocaleString('ko-KR');
    }

    function getMonthsDifference(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        let months = 0;
        const current = new Date(start);

        while (current < end && months < 1200) {
            months += 1;
            current.setMonth(current.getMonth() + 1);
        }

        return Math.max(1, months);
    }

    function formatDate(dateInput) {
        const date = new Date(dateInput);
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
    }

    function getMonthDate(startDate, month) {
        const date = new Date(startDate);
        date.setMonth(date.getMonth() + month - 1);
        return date;
    }

    function normalizeRatios(longTermRatio, shortTermRatio) {
        const totalRatio = longTermRatio + shortTermRatio;
        return {
            normalizedLongTerm: totalRatio > 0 ? longTermRatio / totalRatio : 0.5,
            normalizedShortTerm: totalRatio > 0 ? shortTermRatio / totalRatio : 0.5
        };
    }

    function hasNumericValue(value) {
        return value !== null && value !== undefined && !Number.isNaN(Number(value));
    }

    app.utils = {
        formatNumber,
        getMonthsDifference,
        formatDate,
        getMonthDate,
        normalizeRatios,
        hasNumericValue
    };
})(window.CompoundAsset = window.CompoundAsset || {});
