let activeTab = 'buy';
let stocks = {
  pullback: [],
  momentum: [],
  reversal: [],
  swing: []
};
let notionSnapshot = createEmptySnapshot();
let currentNotionPageId = '';
let liveGapState = createEmptyLiveGapState();
const stockDetailMap = {};
let currentModalState = { code: null, mode: null };
let isRegimeSummaryCollapsed = true;
