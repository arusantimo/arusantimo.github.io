(function (root) {
    const FUNDAMENTAL_EARNINGS_UNIVERSE_COUNT = 12;
    const FUNDAMENTAL_BROADENING_UNIVERSE_COUNT = 20;
    const FUNDAMENTAL_CORP_CACHE_KEY = "marketAnalyzeDartCorpMap";
    const FUNDAMENTAL_CORP_CACHE_MONTH_KEY = "marketAnalyzeDartCorpMapMonth";
    const FUNDAMENTAL_CORP_CACHE_FINGERPRINT_KEY = "marketAnalyzeDartCorpMapFingerprint";
    const KOSIS_EXPORT_INDICATOR_URL = "https://kosis.kr/visual/nsportalStats/detailContents.do?listId=B&statJipyoId=3660&vStatJipyoId=5193";
    const TRADING_ECONOMICS_EXPORT_URL = "https://tradingeconomics.com/south-korea/exports";
    const TRADING_ECONOMICS_EXPORT_YOY_URL = "https://tradingeconomics.com/south-korea/exports-yoy";
    const KOSIS_EXPORT_SERIES_CONFIG = {
        orgId: "360",
        tblId: "DT_1R11001_FRM101",
        lookbackMonths: 26
    };
    const MONTH_NAME_REGEX = "(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)";
    const MONTH_NAME_TO_NUMBER = {
        jan: 1,
        feb: 2,
        mar: 3,
        apr: 4,
        may: 5,
        jun: 6,
        jul: 7,
        aug: 8,
        sep: 9,
        oct: 10,
        nov: 11,
        dec: 12
    };

    function clampLocal(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }

    function normalizeMonthKey(raw) {
        const normalized = String(raw || "").replace(/\D/g, "");
        if (normalized.length >= 6) return normalized.slice(0, 6);
        return "";
    }

    function formatMonthLabel(raw) {
        const monthKey = normalizeMonthKey(raw);
        if (monthKey.length !== 6) return "-";
        return `${monthKey.slice(0, 4)}.${monthKey.slice(4, 6)}`;
    }

    function shiftMonthKey(raw, delta) {
        const monthKey = normalizeMonthKey(raw);
        if (monthKey.length !== 6) return "";
        const year = Number(monthKey.slice(0, 4));
        const monthIndex = Number(monthKey.slice(4, 6)) - 1;
        if (!Number.isFinite(year) || !Number.isFinite(monthIndex)) return "";
        const date = new Date(year, monthIndex + delta, 1);
        return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}`;
    }

    function buildMonthWindow(lookbackMonths = 24) {
        const count = Math.max(13, Number(lookbackMonths) || 24);
        const end = new Date();
        end.setDate(1);
        const start = new Date(end.getFullYear(), end.getMonth() - (count - 1), 1);
        return {
            startMonth: `${start.getFullYear()}${String(start.getMonth() + 1).padStart(2, "0")}`,
            endMonth: `${end.getFullYear()}${String(end.getMonth() + 1).padStart(2, "0")}`
        };
    }

    function parseSignedAmount(raw) {
        const normalized = String(raw || "")
            .replace(/,/g, "")
            .replace(/\s+/g, "")
            .replace(/[()]/g, match => (match === "(" ? "-" : ""));
        const match = normalized.match(/-?\d+(?:\.\d+)?/);
        return match ? Number(match[0]) : null;
    }

    function sumWeighted(items, predicate) {
        let weightSum = 0;
        let hitSum = 0;
        items.forEach(item => {
            const weight = Number(item.weight);
            if (!Number.isFinite(weight) || weight <= 0) return;
            weightSum += weight;
            if (predicate(item)) hitSum += weight;
        });
        return weightSum > 0 ? hitSum / weightSum : null;
    }

    function buildNeutralExportData(reason = "수출 모멘텀 대기 중") {
        return {
            latestMonth: "",
            exportValueUsd: null,
            exportYoY: null,
            exportYoYDelta: null,
            export3mAvgYoY: null,
            state: "neutral",
            score: 17,
            reason
        };
    }

    function getMonthNumber(monthName) {
        return MONTH_NAME_TO_NUMBER[String(monthName || "").replace(/[^A-Za-z]/g, "").slice(0, 3).toLowerCase()] ?? null;
    }

    function monthNameToKey(monthName, year) {
        const monthNumber = getMonthNumber(monthName);
        const yearValue = Number(year);
        if (!monthNumber || !Number.isFinite(yearValue)) return "";
        return `${yearValue}${String(monthNumber).padStart(2, "0")}`;
    }

    function inferLatestMonthKey(latestMonthName, previousMonthName, previousYear) {
        const latestMonthNumber = getMonthNumber(latestMonthName);
        const previousMonthNumber = getMonthNumber(previousMonthName);
        const yearValue = Number(previousYear);
        if (!latestMonthNumber || !previousMonthNumber || !Number.isFinite(yearValue)) return "";
        return monthNameToKey(latestMonthName, latestMonthNumber < previousMonthNumber ? yearValue + 1 : yearValue);
    }

    function htmlToCompactText(rawHtml) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(String(rawHtml || ""), "text/html");
        const text = doc.body?.textContent || doc.documentElement?.textContent || "";
        return text.replace(/\s+/g, " ").trim();
    }

    function extractJsStringArray(rawHtml, variableName) {
        const match = String(rawHtml || "").match(new RegExp(`var\\s+${variableName}\\s*=\\s*\\[(.*?)\\]\\s*;`, "is"));
        if (!match) return [];
        return match[1]
            .split(",")
            .map(token => token.trim().replace(/^['"]|['"]$/g, ""))
            .filter(Boolean);
    }

    function hasExportCoreMetrics(payload = {}) {
        return Boolean(normalizeMonthKey(payload.latestMonth || "")) && Number.isFinite(payload.exportYoY) && Number.isFinite(payload.exportYoYDelta);
    }

    function mergeExportData(primary = {}, secondary = {}) {
        const merged = { ...primary };
        Object.entries(secondary || {}).forEach(([key, value]) => {
            if ((merged[key] === null || merged[key] === "" || merged[key] === undefined) && value !== null && value !== "" && value !== undefined) {
                merged[key] = value;
            }
        });
        return merged;
    }

    function buildExportData(payload = {}, fallbackReason = "공개 수출 소스 수집 실패") {
        const latestMonth = normalizeMonthKey(payload.latestMonth || "");
        const exportValueUsd = Number.isFinite(payload.exportValueUsd) ? payload.exportValueUsd : null;
        const exportYoY = Number.isFinite(payload.exportYoY) ? payload.exportYoY : null;
        const exportYoYDelta = Number.isFinite(payload.exportYoYDelta) ? payload.exportYoYDelta : null;
        const export3mAvgYoY = Number.isFinite(payload.export3mAvgYoY) ? payload.export3mAvgYoY : null;
        const hasLevel = Boolean(latestMonth) || Number.isFinite(exportValueUsd);

        let state = "supportive";
        let score = 24;
        if (Number.isFinite(exportYoY) && exportYoY > 5 && Number.isFinite(exportYoYDelta) && exportYoYDelta > 0) {
            state = "validated";
            score = 35;
        } else if (Number.isFinite(exportYoY) && exportYoY <= 0 && Number.isFinite(exportYoYDelta) && exportYoYDelta < 0) {
            state = "fragile";
            score = 10;
        } else if (!Number.isFinite(exportYoY) && !Number.isFinite(export3mAvgYoY)) {
            state = hasLevel ? "neutral" : "neutral";
            score = hasLevel ? 17 : 17;
        }

        const reason = [
            latestMonth ? `최신 발표월 ${formatMonthLabel(latestMonth)}` : null,
            Number.isFinite(exportYoY) ? `수출 YoY ${formatSignedPercentText(exportYoY)}` : null,
            Number.isFinite(exportYoYDelta) ? `가속도 ${formatSignedPercentText(exportYoYDelta, 1, "%p")}` : null,
            Number.isFinite(export3mAvgYoY) ? `3개월 평균 ${formatSignedPercentText(export3mAvgYoY)}` : null,
            !hasExportCoreMetrics({ latestMonth, exportYoY, exportYoYDelta }) && hasLevel ? "최신 발표월/레벨 반영" : null
        ].filter(Boolean).join(" · ") || fallbackReason;

        return {
            latestMonth,
            exportValueUsd,
            exportYoY,
            exportYoYDelta,
            export3mAvgYoY,
            state,
            score,
            reason
        };
    }

    function buildNeutralEarningsData(reason = "실적 breadth 대기 중") {
        return {
            coverageCount: 0,
            snapshotQuarter: "",
            opIncomeBreadth: null,
            netIncomeBreadth: null,
            turnaroundBreadth: null,
            positiveRoeBreadth: null,
            state: "neutral",
            score: 18,
            reason
        };
    }

    function buildNeutralBroadeningData(reason = "상승 확산 대기 중") {
        return {
            broadeningScore: 15,
            broadeningState: "neutral",
            supportBreadth20d: null,
            supportBreadth60d: null,
            supportPositiveReturnBreadth: null,
            coverageCount: 0,
            reason
        };
    }

    function formatSignedPercentText(value, digits = 1, unit = "%") {
        if (!Number.isFinite(value)) return "-";
        const sign = value > 0 ? "+" : "";
        return `${sign}${value.toFixed(digits)}${unit}`;
    }

    function getObjectField(row, candidates = []) {
        if (!row || typeof row !== "object") return undefined;
        for (const candidate of candidates) {
            if (row[candidate] !== undefined && row[candidate] !== null) return row[candidate];
            const matchedKey = Object.keys(row).find(key => key.toLowerCase() === String(candidate).toLowerCase());
            if (matchedKey && row[matchedKey] !== undefined && row[matchedKey] !== null) {
                return row[matchedKey];
            }
        }
        return undefined;
    }

    function collectKosisClassFields(row, suffix) {
        const values = [];
        for (let index = 1; index <= 8; index += 1) {
            const fieldValue = getObjectField(row, [
                `C${index}${suffix}`,
                `c${index}${suffix}`,
                `OBJL${index}${suffix}`,
                `objL${index}${suffix}`
            ]);
            if (!fieldValue) continue;
            const normalized = String(fieldValue).trim();
            if (normalized) values.push(normalized);
        }
        return [...new Set(values)];
    }

    function parseKosisPayload(rawText) {
        const trimmed = String(rawText || "").trim().replace(/^\uFEFF/, "");
        const arrayIndex = trimmed.indexOf("[");
        const objectIndex = trimmed.indexOf("{");
        const startIndex = [arrayIndex, objectIndex].filter(index => index >= 0).sort((left, right) => left - right)[0] ?? 0;
        const jsonText = trimmed.slice(startIndex);
        const payload = JSON.parse(jsonText);
        if (Array.isArray(payload)) return payload;
        if (Array.isArray(payload?.data)) return payload.data;
        if (Array.isArray(payload?.result)) return payload.result;
        if (Array.isArray(payload?.response)) return payload.response;
        if (payload?.errMsg || payload?.error || payload?.message) {
            throw new Error(payload.errMsg || payload.error || payload.message);
        }
        throw new Error("KOSIS JSON 구조를 해석하지 못했습니다.");
    }

    function buildKosisExportUrl(apiKey) {
        const { orgId, tblId, lookbackMonths } = KOSIS_EXPORT_SERIES_CONFIG;
        const { startMonth, endMonth } = buildMonthWindow(lookbackMonths);
        const query = new URLSearchParams({
            method: "getList",
            apiKey,
            format: "json",
            jsonVD: "Y",
            orgId,
            tblId,
            itmId: "ALL",
            objL1: "ALL",
            prdSe: "M",
            startPrdDe: startMonth,
            endPrdDe: endMonth
        });
        return `https://kosis.kr/openapi/Param/statisticsParameterData.do?${query.toString()}`;
    }

    function normalizeKosisSeriesRows(rows = []) {
        return rows
            .map(row => {
                const monthKey = normalizeMonthKey(getObjectField(row, ["PRD_DE", "prd_de", "prdDe", "prdde"]));
                const value = parseSignedAmount(getObjectField(row, ["DT", "dt", "DATA_VALUE", "data_value"]));
                const itemName = String(getObjectField(row, ["ITM_NM", "itm_nm", "itmNm", "itmNmKor"]) || "").trim();
                const itemId = String(getObjectField(row, ["ITM_ID", "itm_id", "itmId"]) || "").trim();
                const classNames = collectKosisClassFields(row, "_NM");
                const classCodes = collectKosisClassFields(row, "");
                return {
                    monthKey,
                    value,
                    itemName,
                    itemId,
                    classNames,
                    classCodes
                };
            })
            .filter(row => row.monthKey && Number.isFinite(row.value));
    }

    function isMonthlyExportItem(itemName) {
        const normalized = String(itemName || "");
        return /수출/.test(normalized) && !/수입|무역수지|증감률|구성비|지수|누계|누적/.test(normalized);
    }

    function scoreKosisExportSeries(series) {
        const hasTotalLabel = (series.classNames || []).some(name => ["총계", "합계", "전체", "계"].includes(String(name).trim()));
        let score = 0;
        if (isMonthlyExportItem(series.itemName)) score += 25;
        if (hasTotalLabel) score += 18;
        if (/누계|누적/.test(series.itemName)) score -= 14;
        score -= Math.max(0, (series.classNames || []).length - 1) * 2;
        score += Math.log10(Math.max(1, series.latestValue || series.avgValue || 1));
        score += Math.min(series.count || 0, KOSIS_EXPORT_SERIES_CONFIG.lookbackMonths) / 10;
        return score;
    }

    function selectBestKosisExportSeries(rows = []) {
        const normalizedRows = normalizeKosisSeriesRows(rows).filter(row => isMonthlyExportItem(row.itemName));
        if (!normalizedRows.length) {
            throw new Error("KOSIS 수출 월간 시계열 후보가 없습니다.");
        }

        const grouped = new Map();
        normalizedRows.forEach(row => {
            const classKey = (row.classCodes.length ? row.classCodes : row.classNames).join("|") || "ALL";
            const groupKey = `${row.itemId || row.itemName}|${classKey}`;
            if (!grouped.has(groupKey)) {
                grouped.set(groupKey, {
                    key: groupKey,
                    itemName: row.itemName,
                    itemId: row.itemId,
                    classNames: [...row.classNames],
                    rows: []
                });
            }
            grouped.get(groupKey).rows.push(row);
        });

        const candidates = [...grouped.values()]
            .map(series => {
                series.rows.sort((left, right) => left.monthKey.localeCompare(right.monthKey));
                series.latestValue = series.rows.at(-1)?.value ?? null;
                series.avgValue = series.rows.reduce((sum, row) => sum + row.value, 0) / Math.max(1, series.rows.length);
                series.count = series.rows.length;
                series.score = scoreKosisExportSeries(series);
                return series;
            })
            .sort((left, right) =>
                right.score - left.score
                || (right.latestValue || 0) - (left.latestValue || 0)
                || right.count - left.count
            );

        return candidates[0];
    }

    async function fetchKosisExportSeries(apiKey) {
        const rawText = await fetchWithProxyFallback(
            buildKosisExportUrl(apiKey),
            "",
            { proxyOrder: ["alloriginsRaw", "codetabs", "allorigins"], timeoutMs: 15000 }
        );
        const payload = parseKosisPayload(rawText);
        return selectBestKosisExportSeries(payload);
    }

    function calculateExportMomentumFromSeries(series) {
        const rows = Array.isArray(series?.rows) ? series.rows : [];
        if (!rows.length) return buildNeutralExportData("수출 시계열 부족");

        const latest = rows.at(-1);
        const lookup = new Map(rows.map(row => [row.monthKey, row]));
        const latestPrevYear = lookup.get(shiftMonthKey(latest.monthKey, -12));
        const exportYoY = Number.isFinite(latestPrevYear?.value) && latestPrevYear.value > 0
            ? ((latest.value / latestPrevYear.value) - 1) * 100
            : null;

        const prevMonthKey = shiftMonthKey(latest.monthKey, -1);
        const prevMonth = lookup.get(prevMonthKey);
        const prevMonthPrevYear = lookup.get(shiftMonthKey(prevMonthKey, -12));
        const prevMonthYoY = Number.isFinite(prevMonth?.value) && Number.isFinite(prevMonthPrevYear?.value) && prevMonthPrevYear.value > 0
            ? ((prevMonth.value / prevMonthPrevYear.value) - 1) * 100
            : null;
        const exportYoYDelta = Number.isFinite(exportYoY) && Number.isFinite(prevMonthYoY)
            ? exportYoY - prevMonthYoY
            : null;

        const export3mYoYs = rows
            .slice(-3)
            .map(row => {
                const previous = lookup.get(shiftMonthKey(row.monthKey, -12));
                if (!Number.isFinite(previous?.value) || previous.value <= 0) return null;
                return ((row.value / previous.value) - 1) * 100;
            })
            .filter(Number.isFinite);
        const export3mAvgYoY = export3mYoYs.length
            ? export3mYoYs.reduce((sum, value) => sum + value, 0) / export3mYoYs.length
            : null;

        let state = "supportive";
        let score = 24;
        if (Number.isFinite(exportYoY) && exportYoY > 5 && Number.isFinite(exportYoYDelta) && exportYoYDelta > 0) {
            state = "validated";
            score = 35;
        } else if (Number.isFinite(exportYoY) && exportYoY <= 0 && Number.isFinite(exportYoYDelta) && exportYoYDelta < 0) {
            state = "fragile";
            score = 10;
        } else if (!Number.isFinite(exportYoY) && !Number.isFinite(export3mAvgYoY)) {
            state = "neutral";
            score = 17;
        }

        return {
            latestMonth: latest.monthKey,
            exportValueUsd: latest.value,
            exportYoY,
            exportYoYDelta,
            export3mAvgYoY,
            state,
            score,
            reason: [
                `최신 발표월 ${formatMonthLabel(latest.monthKey)}`,
                `수출 YoY ${formatSignedPercentText(exportYoY)}`,
                `가속도 ${formatSignedPercentText(exportYoYDelta, 1, "%p")}`,
                `3개월 평균 ${formatSignedPercentText(export3mAvgYoY)}`
            ].join(" · ")
        };
    }

    function parseIndicatorPageExportData(html) {
        const valueMatch = String(html || "").match(/현재값[^<]*<\/dt>\s*<dd[^>]*>([\d,.-]+)<\/dd>/i);
        const monthMatch = String(html || "").match(/기준일[^<]*<\/dt>\s*<dd[^>]*>([\d.]+)<\/dd>/i);
        const latestMonth = normalizeMonthKey(monthMatch?.[1] || "") || normalizeMonthKey(extractJsStringArray(html, "vPrdDeArry").at(-1) || "");
        return {
            latestMonth,
            exportValueUsd: parseSignedAmount(valueMatch?.[1] || "")
        };
    }

    async function fetchIndicatorPageExportData() {
        const html = await fetchWithProxyFallback(KOSIS_EXPORT_INDICATOR_URL, "수출액", { timeoutMs: 12000 });
        return parseIndicatorPageExportData(html);
    }

    function parseTradingEconomicsExportSummary(rawHtml) {
        const text = htmlToCompactText(rawHtml);
        const patterns = [
            new RegExp(`Exports in South Korea .*? to ([\\d,.\\-]+) USD (Million|Billion) in (${MONTH_NAME_REGEX}) from ([\\d,.\\-]+) USD (Million|Billion) in (${MONTH_NAME_REGEX})(?: of)? (\\d{4})`, "i"),
            new RegExp(`Exports in South Korea .*? to ([\\d,.\\-]+) in (${MONTH_NAME_REGEX}) from ([\\d,.\\-]+) in (${MONTH_NAME_REGEX})(?: of)? (\\d{4})`, "i"),
            new RegExp(`South Korea.?s exports .*? to ([\\d,.\\-]+) USD (Million|Billion) in (${MONTH_NAME_REGEX}) from ([\\d,.\\-]+) USD (Million|Billion) in (${MONTH_NAME_REGEX})(?: of)? (\\d{4})`, "i"),
            new RegExp(`South Korea.?s exports .*? to ([\\d,.\\-]+) in (${MONTH_NAME_REGEX}) from ([\\d,.\\-]+) in (${MONTH_NAME_REGEX})(?: of)? (\\d{4})`, "i")
        ];

        for (const pattern of patterns) {
            const match = text.match(pattern);
            if (!match) continue;
            if (match.length >= 8) {
                const exportValue = parseSignedAmount(match[1]);
                return {
                    latestMonth: inferLatestMonthKey(match[3], match[6], match[7]),
                    exportValueUsd: String(match[2] || "").toLowerCase() === "billion" && Number.isFinite(exportValue)
                        ? exportValue * 1000
                        : exportValue
                };
            }
            return {
                latestMonth: inferLatestMonthKey(match[2], match[4], match[5]),
                exportValueUsd: parseSignedAmount(match[1])
            };
        }
        throw new Error("TradingEconomics 수출 레벨 요약을 해석하지 못했습니다.");
    }

    function parseTradingEconomicsExportYoY(rawHtml) {
        const text = htmlToCompactText(rawHtml);
        const summaryMatch = text.match(
            new RegExp(`Exports YoY in South Korea .*? to ([\\d,.\\-]+) percent in (${MONTH_NAME_REGEX}) from ([\\d,.\\-]+) percent in (${MONTH_NAME_REGEX})(?: of)? (\\d{4})`, "i")
        );
        if (!summaryMatch) {
            throw new Error("TradingEconomics 수출 YoY 요약을 해석하지 못했습니다.");
        }
        const latestYoy = parseSignedAmount(summaryMatch[1]);
        const previousYoy = parseSignedAmount(summaryMatch[3]);
        return {
            latestMonth: inferLatestMonthKey(summaryMatch[2], summaryMatch[4], summaryMatch[5]),
            exportYoY: latestYoy,
            exportYoYDelta: Number.isFinite(latestYoy) && Number.isFinite(previousYoy) ? latestYoy - previousYoy : null,
            export3mAvgYoY: null
        };
    }

    async function fetchTradingEconomicsExportData() {
        const [summaryHtml, yoyHtml] = await Promise.all([
            fetchWithProxyFallback(TRADING_ECONOMICS_EXPORT_URL, "South Korea Exports", { timeoutMs: 15000 }),
            fetchWithProxyFallback(TRADING_ECONOMICS_EXPORT_YOY_URL, "South Korea Exports YoY", { timeoutMs: 15000 })
        ]);
        const summary = parseTradingEconomicsExportSummary(summaryHtml);
        const yoy = parseTradingEconomicsExportYoY(yoyHtml);
        return {
            latestMonth: yoy.latestMonth || summary.latestMonth || "",
            exportValueUsd: summary.exportValueUsd,
            exportYoY: yoy.exportYoY,
            exportYoYDelta: yoy.exportYoYDelta,
            export3mAvgYoY: yoy.export3mAvgYoY
        };
    }

    async function fetchExportMomentumData(settings = {}) {
        const apiKey = String(settings.kosisApiKey || "").trim();
        let pageData = null;
        try {
            pageData = await fetchIndicatorPageExportData();
        } catch (error) {
            pageData = null;
        }

        let publicData = null;
        try {
            publicData = buildExportData(mergeExportData(pageData || {}, await fetchTradingEconomicsExportData()));
        } catch (error) {
            publicData = null;
        }

        if (hasExportCoreMetrics(publicData || {})) {
            if (apiKey) {
                try {
                    const series = await fetchKosisExportSeries(apiKey);
                    const momentum = calculateExportMomentumFromSeries(series);
                    publicData = buildExportData(mergeExportData(publicData, {
                        latestMonth: momentum.latestMonth || pageData?.latestMonth || "",
                        exportValueUsd: Number.isFinite(momentum.exportValueUsd) ? momentum.exportValueUsd : pageData?.exportValueUsd ?? null,
                        exportYoY: momentum.exportYoY,
                        exportYoYDelta: momentum.exportYoYDelta,
                        export3mAvgYoY: momentum.export3mAvgYoY
                    }), publicData.reason);
                } catch (error) {
                    // 공개 소스가 충분하면 KOSIS 보강 실패는 무시합니다.
                }
            }
            return publicData;
        }

        if (apiKey) {
            try {
                const series = await fetchKosisExportSeries(apiKey);
                const momentum = calculateExportMomentumFromSeries(series);
                return buildExportData(
                    mergeExportData(publicData || pageData || {}, {
                        latestMonth: momentum.latestMonth || pageData?.latestMonth || "",
                        exportValueUsd: Number.isFinite(momentum.exportValueUsd) ? momentum.exportValueUsd : pageData?.exportValueUsd ?? null,
                        exportYoY: momentum.exportYoY,
                        exportYoYDelta: momentum.exportYoYDelta,
                        export3mAvgYoY: momentum.export3mAvgYoY
                    })
                );
            } catch (error) {
                // 공개 소스로 충분하면 그대로 사용하고, 아니면 아래 페이지 레벨/중립으로 내려갑니다.
            }
        }

        if (publicData) return publicData;
        if (pageData?.latestMonth || Number.isFinite(pageData?.exportValueUsd)) {
            return buildExportData(pageData, "KOSIS 공개 페이지 기준 최신 발표월/레벨 반영");
        }
        return buildNeutralExportData("공개 수출 소스 수집 실패");
    }

    function getCurrentMonthFingerprint(settings = {}) {
        const now = new Date();
        const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
        const fingerprint = settings.dartApiKey ? settings.dartApiKey.slice(-4) : "";
        return { monthKey, fingerprint };
    }

    async function fetchCorpCodeMap(settings = {}) {
        const apiKey = String(settings.dartApiKey || "").trim();
        if (!apiKey) return {};
        const { monthKey, fingerprint } = getCurrentMonthFingerprint(settings);
        const cachedMonth = localStorage.getItem(FUNDAMENTAL_CORP_CACHE_MONTH_KEY);
        const cachedFingerprint = localStorage.getItem(FUNDAMENTAL_CORP_CACHE_FINGERPRINT_KEY);
        const cached = localStorage.getItem(FUNDAMENTAL_CORP_CACHE_KEY);

        if (cached && cachedMonth === monthKey && cachedFingerprint === fingerprint) {
            try {
                return JSON.parse(cached);
            } catch (error) {
                // fall through
            }
        }

        if (!root.JSZip) {
            throw new Error("JSZip 미연동으로 DART 법인코드 캐시를 생성할 수 없습니다.");
        }

        const response = await fetch(`https://opendart.fss.or.kr/api/corpCode.xml?crtfc_key=${encodeURIComponent(apiKey)}`);
        if (!response.ok) {
            throw new Error(`DART corpCode 응답 실패 (${response.status})`);
        }

        const zipBuffer = await response.arrayBuffer();
        const zip = await root.JSZip.loadAsync(zipBuffer);
        const xmlName = Object.keys(zip.files).find(name => /\.xml$/i.test(name));
        if (!xmlName) {
            throw new Error("corpCode.xml 압축 해제 실패");
        }

        const xmlText = await zip.files[xmlName].async("text");
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");
        const items = [...xmlDoc.getElementsByTagName("list")];
        const corpMap = {};

        items.forEach(item => {
            const stockCode = item.getElementsByTagName("stock_code")[0]?.textContent?.trim();
            const corpCode = item.getElementsByTagName("corp_code")[0]?.textContent?.trim();
            if (!stockCode || !corpCode) return;
            corpMap[stockCode] = corpCode;
        });

        localStorage.setItem(FUNDAMENTAL_CORP_CACHE_KEY, JSON.stringify(corpMap));
        localStorage.setItem(FUNDAMENTAL_CORP_CACHE_MONTH_KEY, monthKey);
        localStorage.setItem(FUNDAMENTAL_CORP_CACHE_FINGERPRINT_KEY, fingerprint);

        return corpMap;
    }

    function getQuarterTargets(now = new Date()) {
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        if (month >= 5 && month < 8) {
            return {
                current: { bsnsYear: year, reprtCode: "11013", label: `${year} 1Q`, roeMultiplier: 4 },
                previous: { bsnsYear: year - 1, reprtCode: "11013", label: `${year - 1} 1Q`, roeMultiplier: 4 }
            };
        }
        if (month >= 8 && month < 11) {
            return {
                current: { bsnsYear: year, reprtCode: "11012", label: `${year} 반기`, roeMultiplier: 2 },
                previous: { bsnsYear: year - 1, reprtCode: "11012", label: `${year - 1} 반기`, roeMultiplier: 2 }
            };
        }
        if (month >= 11) {
            return {
                current: { bsnsYear: year, reprtCode: "11014", label: `${year} 3Q`, roeMultiplier: 4 / 3 },
                previous: { bsnsYear: year - 1, reprtCode: "11014", label: `${year - 1} 3Q`, roeMultiplier: 4 / 3 }
            };
        }
        return {
            current: { bsnsYear: year - 1, reprtCode: "11011", label: `${year - 1} 연간`, roeMultiplier: 1 },
            previous: { bsnsYear: year - 2, reprtCode: "11011", label: `${year - 2} 연간`, roeMultiplier: 1 }
        };
    }

    async function fetchDartStatement(settings, corpCode, quarterTarget) {
        const apiKey = String(settings.dartApiKey || "").trim();
        if (!apiKey || !corpCode || !quarterTarget) return [];
        const url = [
            "https://opendart.fss.or.kr/api/fnlttSinglAcnt.json",
            `?crtfc_key=${encodeURIComponent(apiKey)}`,
            `&corp_code=${encodeURIComponent(corpCode)}`,
            `&bsns_year=${quarterTarget.bsnsYear}`,
            `&reprt_code=${quarterTarget.reprtCode}`
        ].join("");
        const rawText = await fetchWithProxyFallback(url, "\"status\"", { proxyOrder: ["alloriginsRaw", "codetabs"], timeoutMs: 15000 });
        const payload = JSON.parse(rawText);
        if (payload.status !== "000") {
            throw new Error(payload.message || `DART 재무 응답 오류 (${payload.status})`);
        }
        return Array.isArray(payload.list) ? payload.list : [];
    }

    function normalizeStatementName(name) {
        return String(name || "").replace(/\s+/g, "");
    }

    function pickStatementAmount(rows, matcher) {
        const match = rows.find(row => matcher(normalizeStatementName(row.account_nm)));
        return match ? parseSignedAmount(match.thstrm_amount) : null;
    }

    function extractStatementMetrics(rows, quarterTarget) {
        const operatingIncome = pickStatementAmount(rows, accountName => accountName.includes("영업이익"));
        const netIncome = pickStatementAmount(
            rows,
            accountName => /(당기순이익|분기순이익|반기순이익)/.test(accountName) && !/(지배기업|비지배)/.test(accountName)
        );
        const equity = pickStatementAmount(rows, accountName => accountName.includes("자본총계"));
        const annualizedRoe = Number.isFinite(netIncome) && Number.isFinite(equity) && equity > 0
            ? (netIncome * (quarterTarget?.roeMultiplier || 1) / equity) * 100
            : null;

        return {
            operatingIncome,
            netIncome,
            equity,
            annualizedRoe
        };
    }

    async function fetchEarningsBreadthData(settings = {}, universe = []) {
        const apiKey = String(settings.dartApiKey || "").trim();
        if (!apiKey) {
            return buildNeutralEarningsData("OpenDART 키 미입력");
        }
        if (!Array.isArray(universe) || !universe.length) {
            return buildNeutralEarningsData("실적 breadth 유니버스 없음");
        }

        const corpMap = await fetchCorpCodeMap(settings);
        const quarterTargets = getQuarterTargets();
        const eligibleUniverse = universe
            .map(candidate => ({
                ...candidate,
                corpCode: corpMap[candidate.code]
            }))
            .filter(candidate => candidate.corpCode)
            .slice(0, FUNDAMENTAL_EARNINGS_UNIVERSE_COUNT);

        if (!eligibleUniverse.length) {
            return buildNeutralEarningsData("DART 종목 매핑 실패");
        }

        const totalTradingValue = eligibleUniverse.reduce((sum, candidate) => sum + (Number(candidate.todayTradingValue) || 0), 0) || 1;
        const concurrency = typeof LEADER_FETCH_CONCURRENCY === "number" ? LEADER_FETCH_CONCURRENCY : 4;
        const runner = typeof runWithConcurrency === "function"
            ? runWithConcurrency
            : async (items, limit, worker) => Promise.all(items.map(worker));

        const results = await runner(
            eligibleUniverse,
            concurrency,
            async candidate => {
                const [currentRows, previousRows] = await Promise.all([
                    fetchDartStatement(settings, candidate.corpCode, quarterTargets.current),
                    fetchDartStatement(settings, candidate.corpCode, quarterTargets.previous)
                ]);
                const currentMetrics = extractStatementMetrics(currentRows, quarterTargets.current);
                const previousMetrics = extractStatementMetrics(previousRows, quarterTargets.previous);

                return {
                    code: candidate.code,
                    name: candidate.name,
                    weight: (Number(candidate.todayTradingValue) || 0) / totalTradingValue,
                    currentMetrics,
                    previousMetrics
                };
            }
        );

        const successes = results.filter(result => result && !result.error);
        if (!successes.length) {
            return buildNeutralEarningsData("DART 재무 데이터 확보 실패");
        }

        const opIncomeBreadth = sumWeighted(successes, item => {
            const current = item.currentMetrics.operatingIncome;
            const previous = item.previousMetrics.operatingIncome;
            return Number.isFinite(current) && Number.isFinite(previous) && (current > previous || (current > 0 && previous <= 0));
        });
        const netIncomeBreadth = sumWeighted(successes, item => {
            const current = item.currentMetrics.netIncome;
            const previous = item.previousMetrics.netIncome;
            return Number.isFinite(current) && Number.isFinite(previous) && (current > previous || (current > 0 && previous <= 0));
        });
        const turnaroundBreadth = sumWeighted(successes, item => {
            const opTurn = Number.isFinite(item.currentMetrics.operatingIncome) && Number.isFinite(item.previousMetrics.operatingIncome)
                && item.currentMetrics.operatingIncome > 0 && item.previousMetrics.operatingIncome <= 0;
            const netTurn = Number.isFinite(item.currentMetrics.netIncome) && Number.isFinite(item.previousMetrics.netIncome)
                && item.currentMetrics.netIncome > 0 && item.previousMetrics.netIncome <= 0;
            return opTurn || netTurn;
        });
        const positiveRoeBreadth = sumWeighted(successes, item => Number.isFinite(item.currentMetrics.annualizedRoe) && item.currentMetrics.annualizedRoe > 0);

        let state = "fragile";
        let score = 12;
        if (opIncomeBreadth >= 0.6 && netIncomeBreadth >= 0.5) {
            state = "validated";
            score = 35;
        } else if (opIncomeBreadth >= 0.4 || netIncomeBreadth >= 0.4) {
            state = "supportive";
            score = 24;
        }

        return {
            coverageCount: successes.length,
            snapshotQuarter: quarterTargets.current.label,
            opIncomeBreadth,
            netIncomeBreadth,
            turnaroundBreadth,
            positiveRoeBreadth,
            state,
            score,
            reason: `영업이익 breadth ${Math.round((opIncomeBreadth || 0) * 100)}% · 순이익 breadth ${Math.round((netIncomeBreadth || 0) * 100)}%`
        };
    }

    function computeMovingAverage(history, days) {
        if (!Array.isArray(history) || history.length < days) return null;
        const window = history.slice(-days);
        const sum = window.reduce((acc, row) => acc + (Number(row.close) || 0), 0);
        return window.length ? sum / window.length : null;
    }

    function calculateBroadeningData(universeHistory = [], leaderStocks = []) {
        if (!Array.isArray(universeHistory) || !universeHistory.length) {
            return buildNeutralBroadeningData("확산용 시세 유니버스 없음");
        }

        const leaderCodes = new Set((leaderStocks || []).map(stock => stock.code));
        const supportUniverse = universeHistory
            .filter(item => item && !leaderCodes.has(item.code) && Array.isArray(item.history) && item.history.length >= 60)
            .slice(0, FUNDAMENTAL_BROADENING_UNIVERSE_COUNT);

        if (!supportUniverse.length) {
            return buildNeutralBroadeningData("비주도주 확산 유니버스 부족");
        }

        const totalTradingValue = supportUniverse.reduce((sum, item) => sum + (Number(item.todayTradingValue) || 0), 0) || 1;
        const enriched = supportUniverse.map(item => {
            const history = item.history;
            const latest = history.at(-1);
            const close20 = history.at(-21)?.close;
            const sma20 = computeMovingAverage(history, 20);
            const sma60 = computeMovingAverage(history, 60);
            return {
                code: item.code,
                name: item.name,
                weight: (Number(item.todayTradingValue) || 0) / totalTradingValue,
                positiveReturn20d: Number.isFinite(close20) && close20 > 0 ? ((latest.close / close20) - 1) * 100 > 0 : false,
                aboveSma20: Number.isFinite(sma20) && latest.close > sma20,
                aboveSma60: Number.isFinite(sma60) && latest.close > sma60
            };
        });

        const supportPositiveReturnBreadth = sumWeighted(enriched, item => item.positiveReturn20d);
        const supportBreadth20d = sumWeighted(enriched, item => item.aboveSma20);
        const supportBreadth60d = sumWeighted(enriched, item => item.aboveSma60);

        const components = [
            supportPositiveReturnBreadth,
            supportBreadth20d,
            supportBreadth60d
        ].map(value => {
            if (!Number.isFinite(value)) return 5;
            if (value >= 0.6) return 10;
            if (value >= 0.4) return 6;
            return 2;
        });

        const broadeningScore = components.reduce((sum, value) => sum + value, 0);
        let broadeningState = "fragile";
        if ([supportPositiveReturnBreadth, supportBreadth20d, supportBreadth60d].filter(value => Number.isFinite(value) && value >= 0.6).length >= 2) {
            broadeningState = "validated";
        } else if ([supportPositiveReturnBreadth, supportBreadth20d, supportBreadth60d].filter(value => Number.isFinite(value) && value >= 0.4).length >= 2) {
            broadeningState = "supportive";
        }

        return {
            broadeningScore,
            broadeningState,
            supportBreadth20d,
            supportBreadth60d,
            supportPositiveReturnBreadth,
            coverageCount: enriched.length,
            reason: `20일 양수 breadth ${Math.round((supportPositiveReturnBreadth || 0) * 100)}% · 20일선 ${Math.round((supportBreadth20d || 0) * 100)}% · 60일선 ${Math.round((supportBreadth60d || 0) * 100)}%`
        };
    }

    function calculateFundamentalAnchor({ exportMomentum, earningsBreadth, broadeningData }) {
        const exportScore = Number.isFinite(exportMomentum?.score) ? exportMomentum.score : 17;
        const earningsScore = Number.isFinite(earningsBreadth?.score) ? earningsBreadth.score : 18;
        const broadeningScore = Number.isFinite(broadeningData?.broadeningScore) ? broadeningData.broadeningScore : 15;
        const totalScore = clampLocal(exportScore + earningsScore + broadeningScore, 0, 100);

        let state = "fragile";
        if (totalScore >= 70) state = "validated";
        else if (totalScore >= 45) state = "supportive";

        return {
            score: totalScore,
            state,
            reason: `수출 ${Math.round(exportScore)}/35 · 실적 ${Math.round(earningsScore)}/35 · 확산 ${Math.round(broadeningScore)}/30`
        };
    }

    function normalizeBooleanFlagLocal(value) {
        if (value === true || value === false) return value;
        const normalized = String(value || "").trim().toLowerCase();
        if (["true", "1", "stable", "validated"].includes(normalized)) return true;
        if (["false", "0", "unstable", "fragile"].includes(normalized)) return false;
        return null;
    }

    function calculateFundamentalSupport(data = {}) {
        const sectorMomentum = Number(data.nonSemiconductorMomentum);
        const sectorCoverage = Number(data.nonSemiconductorMomentumCoverageCount) || 0;
        const sectorPassCount = Number(data.nonSemiconductorMomentumPassCount) || 0;
        const hasSectorMeasurement = sectorCoverage >= 3 && Number.isFinite(sectorMomentum);
        const sectorSupportPoints = hasSectorMeasurement
            ? clampLocal(sectorMomentum * 0.5, 0, 50)
            : 25;

        const valuationThreshold = Number.isFinite(Number(data.marketValuationThreshold))
            ? Number(data.marketValuationThreshold)
            : 13;
        const valuationStability = normalizeBooleanFlagLocal(data.marketValuationStability);
        const valuationSupportPoints = valuationStability === true
            ? 50
            : valuationStability === false
                ? 0
                : 25;

        const score = clampLocal(sectorSupportPoints + valuationSupportPoints, 0, 100);
        let state = "fragile";
        if (score >= 70) state = "validated";
        else if (score >= 45) state = "supportive";

        const valuationAvg = Number.isFinite(Number(data.marketValuationForwardPerAvg))
            ? Number(data.marketValuationForwardPerAvg)
            : null;
        const sectorReason = hasSectorMeasurement
            ? `업종 확산 ${sectorPassCount}/${sectorCoverage}개 통과`
            : sectorCoverage > 0 && Number.isFinite(sectorMomentum)
                ? `업종 확산 커버리지 ${sectorCoverage}개로 중립값`
                : "업종 확산 중립값";
        const valuationReason = valuationStability === true
            ? `가중 Fwd PER ${valuationAvg !== null ? valuationAvg.toFixed(1) : "-"}배 <= ${valuationThreshold.toFixed(1)}배`
            : valuationStability === false
                ? `가중 Fwd PER ${valuationAvg !== null ? valuationAvg.toFixed(1) : "-"}배 > ${valuationThreshold.toFixed(1)}배`
                : "밸류에이션 중립값";

        return {
            fundamentalSupportScore: score,
            fundamentalSupportState: state,
            fundamentalSupportReason: `업종 확산 ${Math.round(sectorSupportPoints)}/50 · 밸류에이션 ${Math.round(valuationSupportPoints)}/50 · ${sectorReason} · ${valuationReason}`,
            marketValuationScore: valuationSupportPoints,
            marketValuationThreshold: valuationThreshold,
            supportOffsetPoints: Number((score * 0.3).toFixed(2))
        };
    }

    function hydrateFundamentalSupportData(data = {}) {
        return {
            ...calculateFundamentalSupport(data)
        };
    }

    function getAdviceStanceLabel(bias) {
        const labels = ["분할 확대", "선별 유지", "균형 유지", "비중 조절", "현금 우선"];
        return labels[clampLocal(bias, 0, labels.length - 1)] || labels[2];
    }

    function buildAdviceActions(finalState, stance, context = {}) {
        const exportLabel = formatMonthLabel(context.exportLatestMonth);
        const anchorBufferedAdvance = finalState === "validated-overheat"
            && context.marketRegimeKey === "anchor-buffered-overheat"
            && !context.bubbleCriticalTrigger
            && (Number(context.trapScore) || 0) < 10;
        const peakConfirmed = context.cycleStageKey === "euphoria";
        if (anchorBufferedAdvance) {
            if (peakConfirmed) {
                return {
                    now: "정점 확인 전까지는 현금 비중을 급하게 늘리지 말고, 기존 주도 포지션만 선별 유지합니다.",
                    watch: "환희 고착, Bull Trap, 버블 Critical 전환처럼 꼭지 확인 신호가 붙는지 점검합니다.",
                    break: "정점 신호가 확인되면 그때부터 분할 익절과 현금 비중 확대를 시작합니다."
                };
            }
            return {
                now: "현금 비중을 서둘러 늘리기보다 주도주와 실적 개선 축 중심으로 공격 비중을 유지합니다.",
                watch: "탐욕이 환희로 넘어가는지, 아니면 수출·실적이 계속 따라오는지 구분합니다.",
                break: "꼭지 확인이나 Bull Trap 신호가 나오면 그때부터 분할 익절과 현금화로 전환합니다."
            };
        }
        const actions = {
            "분할 확대": {
                now: "투매나 조정이 확대될 때 분할 매수 계획을 기계적으로 실행합니다.",
                watch: "대표주 급락이 멎고 비주도주 breadth가 다시 올라오는지 확인합니다.",
                break: "실적 breadth가 꺾이거나 신용 리스크가 다시 올라오면 공격 강도를 줄입니다."
            },
            "선별 유지": {
                now: "주도주와 실적 개선 종목 중심으로 선별 보유를 유지합니다.",
                watch: `${exportLabel !== "-" ? `${exportLabel} 수출 발표` : "다음 수출 발표"}와 분기 실적 breadth 유지 여부를 확인합니다.`,
                break: "비주도주 확산이 약해지거나 와이코프 분배 비중이 커지면 균형/방어로 이동합니다."
            },
            "균형 유지": {
                now: "추세는 존중하되 신규 공격 매수는 속도를 조절합니다.",
                watch: "확산 breadth와 수급 분배가 동시에 악화되는지 점검합니다.",
                break: "Bull Trap, 민스키, 분배 신호가 겹치면 비중 조절로 바로 전환합니다."
            },
            "비중 조절": {
                now: "기존 수익 포지션은 분할 익절하고 현금 비중을 천천히 올립니다.",
                watch: "수출/실적이 계속 따라오는지, 아니면 심리만 앞서는지 구분합니다.",
                break: "분배 폭이 더 넓어지거나 신용이 버티면 현금 우선으로 강화합니다."
            },
            "현금 우선": {
                now: "신규 진입보다 현금 버퍼 확보와 리스크 축소를 우선합니다.",
                watch: "강한 되돌림 후에도 실적/확산 근거가 살아있는지 확인합니다.",
                break: "펀더멘털 앵커가 다시 회복되고 분배/신용 경고가 꺾일 때만 한 단계 완화합니다."
            }
        };
        return actions[stance] || actions["균형 유지"];
    }

    function getSupportStateLabel(state) {
        if (state === "validated") return "강함";
        if (state === "supportive") return "보통";
        if (state === "fragile") return "약함";
        return "중립";
    }

    function getReflexivityModelLabel(state) {
        if (state === "runaway") return "폭주";
        if (state === "caution") return "주의";
        return "정상";
    }

    function getMinskyModelLabel(data = {}) {
        const ratio = Number(data.depositMarginRatio);
        const shock = Number(data.marginShockChangePct);
        const slope = Number(data.marginSlope);
        if ((Number.isFinite(shock) && shock >= 0) || (Number.isFinite(ratio) && ratio >= 0.2) || (Number.isFinite(slope) && slope >= 300)) {
            return "경고";
        }
        if ((Number.isFinite(slope) && slope > 0) || (Number.isFinite(ratio) && ratio >= 0.12)) {
            return "주의";
        }
        if ((Number.isFinite(shock) && shock < 0) || (Number.isFinite(slope) && slope < 0)) {
            return "완화";
        }
        return "중립";
    }

    function getKostolanyModelLabel(stage) {
        const labels = {
            A1: "A1 하락 준비",
            A2: "A2 하락 조정",
            A3: "A3 하락 과열",
            B1: "B1 상승 준비",
            B2: "B2 상승 조정",
            B3: "B3 상승 과열"
        };
        return labels[stage] || "단계 대기";
    }

    function getWyckoffModelLabel(data = {}) {
        const leaderStocks = Array.isArray(data.leaderStocks) ? data.leaderStocks : [];
        if (!leaderStocks.length) return "관망";

        const phaseWeight = {};
        leaderStocks.forEach(stock => {
            const phase = stock?.wyckoffPhase || "NEUTRAL";
            phaseWeight[phase] = (phaseWeight[phase] || 0) + (Number(stock.weight) || 0);
        });

        const phaseLabels = {
            A: "A 하락 정지",
            B: "B 매집",
            C: "C Spring",
            D: "D 상승",
            E: "E 분배",
            NEUTRAL: "관망"
        };
        const topEntry = Object.entries(phaseWeight).sort((left, right) => right[1] - left[1])[0];
        const topPhase = topEntry?.[0] || "NEUTRAL";
        const topWeight = topEntry?.[1] || 0;

        if ((Number(data.wyckoffDistributionBreadth) || 0) >= 0.5 || (phaseWeight.E || 0) >= 0.35) {
            return "E 분배 우세";
        }
        if (topPhase === "NEUTRAL" || topWeight < 0.3) {
            return "관망";
        }
        return `${phaseLabels[topPhase] || topPhase} 우세`;
    }

    function deriveMarketEvaluation(data = {}) {
        const supportPatch = calculateFundamentalSupport(data);
        const stageKey = data.cycleStageKey || "skepticism";
        const anchorState = data.fundamentalAnchorState || "neutral";
        const broadeningState = data.broadeningState || "neutral";
        const supportState = data.fundamentalSupportState || supportPatch.fundamentalSupportState || "supportive";
        const trapScore = Number(data.trapScore) || 0;
        const wyckoffDistributionBreadth = Number(data.wyckoffDistributionBreadth) || 0;
        const reflexivityState = data.reflexivityState || "normal";
        const marketRegimeKey = data.marketRegimeKey || "standard";
        const marketRegimeLabel = data.marketRegimeLabel || "표준 레짐";
        const marketRegimeReason = data.marketRegimeReason || "특수 레짐 조건 없음";
        const anchorBufferedOverheat = marketRegimeKey === "anchor-buffered-overheat";
        const bubbleCriticalTrigger = !!data.bubbleCriticalTrigger;
        const bubbleRegimeLabel = data.bubbleRegimeLabel || "표준 버블 경계";
        const bubbleCriticalReason = data.bubbleCriticalReason || "Critical Trigger 미발동";
        const hotPsychology = stageKey === "greed" || stageKey === "euphoria";
        const lowCycle = ["panic", "capitulation", "pessimism"].includes(stageKey);
        const anchorStrong = anchorState === "validated";
        const anchorSupportive = anchorState === "validated" || anchorState === "supportive";
        const broadeningStrong = broadeningState === "validated";
        const broadeningSupportive = broadeningState === "validated" || broadeningState === "supportive";
        const supportStrong = supportState === "validated";
        const supportSupportive = supportState === "validated" || supportState === "supportive";
        const minskyWarning = (Number.isFinite(data.depositMarginRatio) && data.depositMarginRatio >= 0.2)
            || (data.shockAnchorDate && Number.isFinite(data.marginShockChangePct) && data.marginShockChangePct >= 0)
            || (Number.isFinite(data.marginSlope) && data.marginSlope >= 300);
        const marksView = data.cycleStageLabel || stageKey;
        const sorosView = getReflexivityModelLabel(reflexivityState);
        const minskyView = getMinskyModelLabel(data);
        const kostolanyView = getKostolanyModelLabel(data.kostolanyStage);
        const wyckoffView = getWyckoffModelLabel(data);
        const anchorView = getSupportStateLabel(anchorState);
        const broadeningView = getSupportStateLabel(broadeningState);
        const supportView = getSupportStateLabel(supportState);

        let state = "balanced";
        let label = "균형 국면";

        if (bubbleCriticalTrigger) {
            state = "critical-bubble";
            label = "버블 파국 임계";
        } else if (trapScore >= 10) {
            state = "distribution-risk";
            label = "분배/하락 전환 경계";
        } else if (anchorBufferedOverheat) {
            state = "validated-overheat";
            label = "과열이지만 정당화됨";
        } else if (wyckoffDistributionBreadth >= 0.5 || minskyWarning) {
            state = "distribution-risk";
            label = "분배/하락 전환 경계";
        } else if (lowCycle && anchorSupportive) {
            state = "reaccumulation";
            label = "투매 후 재축적 대기";
        } else if (hotPsychology && anchorStrong && broadeningStrong && trapScore < 10 && !minskyWarning) {
            state = "structural-bull";
            label = "구조 강세 연장";
        } else if (hotPsychology && anchorSupportive && broadeningSupportive) {
            state = "validated-overheat";
            label = "과열이지만 정당화됨";
        } else if (hotPsychology && (!anchorSupportive || !broadeningSupportive)) {
            state = "overheat-only";
            label = "과열만 앞선 구간";
        } else if (anchorStrong && broadeningSupportive) {
            state = "structural-bull";
            label = "구조 강세 연장";
        }

        if (marketRegimeKey === "secular-expansion" && state !== "distribution-risk" && state !== "critical-bubble") {
            if (anchorStrong && broadeningSupportive) {
                state = "structural-bull";
                label = "구조 강세 연장";
            } else {
                state = "validated-overheat";
                label = "과열이지만 정당화됨";
            }
        } else if (anchorBufferedOverheat && state !== "distribution-risk" && state !== "critical-bubble") {
            state = "validated-overheat";
            label = "과열이지만 정당화됨";
        }

        const baseBiasMap = {
            panic: 0,
            pessimism: 0,
            capitulation: 1,
            skepticism: 1,
            optimism: 2,
            greed: 3,
            euphoria: 4,
            complacency: 4,
            denial: 4
        };
        let marketAdviceBias = baseBiasMap[stageKey] ?? 2;
        if (bubbleCriticalTrigger) {
            marketAdviceBias = 4;
        }
        if (hotPsychology && anchorStrong && broadeningStrong) {
            marketAdviceBias = Math.max(0, marketAdviceBias - 1);
        }
        const riskSignals = [
            trapScore >= 10,
            minskyWarning,
            reflexivityState === "runaway",
            wyckoffDistributionBreadth >= 0.5
        ].filter(Boolean).length;
        if (riskSignals >= 2) {
            marketAdviceBias = Math.min(4, marketAdviceBias + 1);
        }
        if (marketRegimeKey === "secular-expansion" && riskSignals < 2) {
            marketAdviceBias = Math.max(0, marketAdviceBias - 1);
        }
        if (marketRegimeKey === "debasement-bubble") {
            marketAdviceBias = Math.min(4, marketAdviceBias + 1);
            marketAdviceBias = Math.max(3, marketAdviceBias);
        }
        if (anchorBufferedOverheat && !bubbleCriticalTrigger && trapScore < 10) {
            marketAdviceBias = stageKey === "euphoria"
                ? Math.min(marketAdviceBias, 2)
                : Math.min(marketAdviceBias, 1);
        }
        if (state === "critical-bubble") {
            marketAdviceBias = 4;
        }
        if (state === "distribution-risk") {
            marketAdviceBias = Math.max(marketAdviceBias, 3);
        }
        if (state === "reaccumulation") {
            marketAdviceBias = Math.min(marketAdviceBias, 1);
        }
        const marketAdviceStance = getAdviceStanceLabel(marketAdviceBias);
        const actions = buildAdviceActions(state, marketAdviceStance, data);

        const regimePhrase = marketRegimeKey === "standard"
            ? "표준 레짐"
            : marketRegimeLabel;
        let title = "모델별 신호를 하나의 흐름으로 묶으면 아직 혼합 국면입니다.";
        let narrative = `하워드 막스는 ${marksView}, 소로스는 ${sorosView}, 민스키는 ${minskyView}, 코스톨라니는 ${kostolanyView}, 와이코프는 ${wyckoffView}, 펀더멘털 앵커는 ${anchorView}, 지지력 인덱스는 ${supportView}로 읽힙니다. 현재 레짐은 ${regimePhrase}이며, 심리와 가치 근거가 얼마나 함께 움직이는지 계속 대조해야 합니다.`;

        if (state === "critical-bubble") {
            title = "버블 엔진이 파국 임계기를 감지했습니다.";
            narrative = `하워드 막스 ${marksView}, 소로스 ${sorosView}, 민스키 ${minskyView}, 와이코프 ${wyckoffView} 위에 버블 엔진 ${bubbleRegimeLabel}가 겹쳤습니다. ${bubbleCriticalReason} 상태이므로 기존 P-Index와 별도로 현금 우선, 신규 추격 금지, 익절/방어 강화를 최우선으로 둡니다.`;
        } else if (state === "structural-bull") {
            title = "상단 심리는 뜨겁지만, 종합 평가는 아직 강세 연장 쪽입니다.";
            narrative = `하워드 막스 ${marksView}, 코스톨라니 ${kostolanyView}가 상단 심리를 가리켜도 펀더멘털 앵커 ${anchorView}, 확산 ${broadeningView}, 지지력 ${supportView}가 이를 받치고 있습니다. ${marketRegimeKey === "secular-expansion" ? `${marketRegimeLabel}로 분류되는 만큼, 환율 부담보다 실적 정당화 신호를 더 비중 있게 봅니다.` : `현재 레짐은 ${regimePhrase}이며, 아직은 고점 체류나 추가 오버슈팅까지 열어둘 만한 조합입니다.`}`;
        } else if (state === "validated-overheat") {
            if (anchorBufferedOverheat) {
                title = "리스크 경고는 남아 있지만, 메인 평가는 정당화 과열로 완충됩니다.";
                const stanceNarrative = marketAdviceStance === "선별 유지"
                    ? "따라서 통합 포트폴리오 가이드는 현금을 서둘러 늘리기보다 선별 보유와 공격 비중 유지에 무게를 둡니다."
                    : marketAdviceStance === "균형 유지"
                        ? "따라서 통합 포트폴리오 가이드는 꼭지 확인 전까지는 추세를 존중하되, 정점 확인 시 분할 익절을 준비하는 쪽으로 맞춥니다."
                        : "따라서 메인 평가는 방어 전환보다 속도 조절에 무게를 둡니다.";
                narrative = `하워드 막스 ${marksView}, 소로스 ${sorosView}, 민스키 ${minskyView}, 와이코프 ${wyckoffView}가 상단 경고를 내더라도 펀더멘털 앵커 ${anchorView}, 확산 ${broadeningView}, 지지력 ${supportView}, 버블 엔진 ${bubbleRegimeLabel}는 아직 파국 임계기가 아님을 보여줍니다. ${marketRegimeReason} ${stanceNarrative}`;
            } else {
                title = "과열 경고와 정당화 근거가 함께 공존하는 구간입니다.";
                narrative = `하워드 막스 ${marksView}, 소로스 ${sorosView}, 코스톨라니 ${kostolanyView}가 뜨거움을 보여주지만, 펀더멘털 앵커 ${anchorView}, 확산 ${broadeningView}, 지지력 ${supportView}가 아직 완전히 꺾이지 않았습니다. 레짐은 ${regimePhrase}이며, 민스키 ${minskyView}와 와이코프 ${wyckoffView}가 더 나빠지는지 확인하면서 속도 조절이 맞는 장면입니다.`;
            }
        } else if (state === "overheat-only") {
            title = "상승 심리는 앞서가지만 근거 모델의 합치는 약합니다.";
            narrative = `하워드 막스 ${marksView}, 소로스 ${sorosView}, 코스톨라니 ${kostolanyView}가 상단 심리를 가리키는 반면 펀더멘털 앵커 ${anchorView}, 확산 ${broadeningView}, 지지력 ${supportView}는 충분한 합의를 만들지 못하고 있습니다. ${marketRegimeKey === "debasement-bubble" ? `${marketRegimeLabel}로 분류되는 만큼 환율 급등과 고이격이 가치보다 앞서가는지 더 엄격하게 봐야 합니다.` : `현재 레짐은 ${regimePhrase}이며, 추가 경고가 겹치면 방어 강도가 빠르게 높아질 수 있습니다.`}`;
        } else if (state === "distribution-risk") {
            title = "경고 모델들이 메인 뷰에서 우세해지고 있습니다.";
            narrative = `하워드 막스 ${marksView}의 상단 심리 위에 소로스 ${sorosView}, 민스키 ${minskyView}, 와이코프 ${wyckoffView}가 겹치며 리스크 모델들이 주도권을 잡고 있습니다. 펀더멘털 앵커 ${anchorView}, 지지력 ${supportView}, 레짐 ${regimePhrase}가 일부 버텨도 Bull Trap과 분배 경고가 함께 뜨는 구간에서는 방어가 우선입니다.`;
        } else if (state === "reaccumulation") {
            title = "약세 말기 모델과 회복 근거가 함께 나타나는 구간입니다.";
            narrative = `하워드 막스 ${marksView}와 코스톨라니 ${kostolanyView}는 하단 국면을, 와이코프 ${wyckoffView}, 펀더멘털 앵커 ${anchorView}, 지지력 ${supportView}는 재축적 가능성을 시사합니다. 레짐은 ${regimePhrase}이며, 소로스 ${sorosView}와 민스키 ${minskyView}가 진정되는지 확인하면서 분할 접근이 유리합니다.`;
        }

        return {
            marketEvaluationState: state,
            marketEvaluationLabel: label,
            marketFlowTitle: title,
            marketFlowNarrative: narrative,
            marketAdviceBias,
            marketAdviceStance,
            marketAdviceReason: `막스 ${marksView} · 소로스 ${sorosView} · 민스키 ${minskyView} · 코스톨라니 ${kostolanyView} · 와이코프 ${wyckoffView} · 앵커 ${anchorView} · 확산 ${broadeningView} · 지지력 ${supportView} · 레짐 ${regimePhrase} · 버블 ${bubbleRegimeLabel} · 리스크 ${riskSignals}개`,
            marketAdviceActions: actions
        };
    }

    async function buildAnchorUniverses(options = {}) {
        const quantHtml = options.quantHtml || "";
        const candidates = await fetchLeaderSeedCandidates(quantHtml);
        const filtered = candidates
            .filter(candidate => !isLeaderExcluded(candidate))
            .sort((left, right) => right.todayTradingValue - left.todayTradingValue);
        const earningsUniverse = filtered.slice(0, FUNDAMENTAL_EARNINGS_UNIVERSE_COUNT);
        const broadeningUniverse = filtered.slice(0, FUNDAMENTAL_BROADENING_UNIVERSE_COUNT);
        const concurrency = typeof LEADER_FETCH_CONCURRENCY === "number" ? LEADER_FETCH_CONCURRENCY : 4;
        const runner = typeof runWithConcurrency === "function"
            ? runWithConcurrency
            : async (items, limit, worker) => Promise.all(items.map(worker));

        const histories = await runner(
            broadeningUniverse,
            concurrency,
            async candidate => ({
                ...candidate,
                history: await fetchLeaderHistory(candidate)
            })
        );

        return {
            earningsUniverse,
            broadeningUniverse: histories.filter(item => item && !item.error && Array.isArray(item.history))
        };
    }

    function resetFundamentalAnchorData(reason = "펀더멘털 앵커 대기 중") {
        marketData.fundamentalAnchorScore = null;
        marketData.fundamentalAnchorState = "neutral";
        marketData.fundamentalAnchorReason = reason;
        marketData.fundamentalSupportScore = null;
        marketData.fundamentalSupportState = "neutral";
        marketData.fundamentalSupportReason = "펀더멘털 지지력 대기 중";
        marketData.exportLatestMonth = "";
        marketData.exportValueUsd = null;
        marketData.exportYoY = null;
        marketData.exportYoYDelta = null;
        marketData.export3mAvgYoY = null;
        marketData.earningsCoverageCount = 0;
        marketData.earningsSnapshotQuarter = "";
        marketData.opIncomeBreadth = null;
        marketData.netIncomeBreadth = null;
        marketData.turnaroundBreadth = null;
        marketData.positiveRoeBreadth = null;
        marketData.broadeningScore = null;
        marketData.broadeningState = "neutral";
        marketData.supportBreadth20d = null;
        marketData.supportBreadth60d = null;
        marketData.supportPositiveReturnBreadth = null;
        marketData.nonSemiconductorMomentum = null;
        marketData.nonSemiconductorMomentumCoverageCount = 0;
        marketData.nonSemiconductorMomentumPassCount = 0;
        marketData.marketValuationStability = null;
        marketData.marketValuationScore = null;
        marketData.marketValuationCoverageCount = 0;
        marketData.marketValuationForwardPerAvg = null;
        marketData.marketValuationThreshold = 13;
        marketData.supportOffsetPoints = 0;
        marketData.marketRegimeKey = "standard";
        marketData.marketRegimeLabel = "표준 레짐";
        marketData.marketRegimeReason = "특수 레짐 조건 대기 중";
    }

    async function fetchFundamentalAnchorBundle(options = {}) {
        const settings = options.settings || {};
        const leaderStocks = Array.isArray(options.leaderStocks) ? options.leaderStocks : [];

        const [exportMomentum, universes] = await Promise.all([
            fetchExportMomentumData(settings),
            buildAnchorUniverses(options).catch(error => {
                log?.(`<span class='text-amber-400'>[ANCHOR]</span> 확산 유니버스 구축 실패(${error.message})`);
                return { earningsUniverse: [], broadeningUniverse: [] };
            })
        ]);

        const broadeningData = calculateBroadeningData(universes.broadeningUniverse, leaderStocks);
        const earningsBreadth = await fetchEarningsBreadthData(settings, universes.earningsUniverse)
            .catch(error => buildNeutralEarningsData(`실적 breadth 조회 실패 (${error.message})`));
        const fundamentalAnchor = calculateFundamentalAnchor({
            exportMomentum,
            earningsBreadth,
            broadeningData
        });

        return {
            exportMomentum,
            earningsBreadth,
            broadeningData,
            fundamentalAnchor
        };
    }

    root.fetchExportMomentumData = fetchExportMomentumData;
    root.fetchCorpCodeMap = fetchCorpCodeMap;
    root.fetchEarningsBreadthData = fetchEarningsBreadthData;
    root.calculateBroadeningData = calculateBroadeningData;
    root.calculateFundamentalAnchor = calculateFundamentalAnchor;
    root.calculateFundamentalSupport = calculateFundamentalSupport;
    root.hydrateFundamentalSupportData = hydrateFundamentalSupportData;
    root.deriveMarketEvaluation = deriveMarketEvaluation;
    root.fetchFundamentalAnchorBundle = fetchFundamentalAnchorBundle;
    root.resetFundamentalAnchorData = resetFundamentalAnchorData;
})(typeof window !== "undefined" ? window : globalThis);
