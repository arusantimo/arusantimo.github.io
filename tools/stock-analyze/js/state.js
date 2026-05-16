let activeTab = 'buy';
let stocks = {
  pullback: [],
  momentum: [],
  swing: []
};
let notionSnapshot = createEmptySnapshot();
let liveGapState = createEmptyLiveGapState();
const stockDetailMap = {};
let currentModalState = { code: null, mode: null };
let isRegimeSummaryCollapsed = false;
