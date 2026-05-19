/**
 * keyword.js — 공포/탐욕 키워드 히트맵 렌더링
 */

const KeywordRenderer = (() => {

  function render(fearEl, greedEl, keywords) {
    if (!keywords) return;
    renderList(fearEl, keywords.fear || [], 'is-fear');
    renderList(greedEl, keywords.greed || [], 'is-greed');
  }

  function renderList(container, items, cls) {
    if (!container || !items.length) return;
    const maxCount = Math.max(...items.map(k => k.count), 1);

    container.innerHTML = items.slice(0, 10).map((k, i) => {
      const pct     = Math.round((k.count / maxCount) * 100);
      const upDown  = k.change > 0 ? 'up' : 'dn';
      const absChg  = Math.abs(k.change);
      return `
        <div class="keyword-item">
          <span class="keyword-rank">${i + 1}</span>
          <span class="keyword-word">${k.word}</span>
          <div class="keyword-bar-bg">
            <div class="keyword-bar-fill ${cls}" data-pct="${pct}" style="width:0%"></div>
          </div>
          <span class="keyword-count">${k.count}</span>
          <span class="keyword-change ${upDown}">${absChg}</span>
        </div>
      `;
    }).join('');

    // 애니메이션 딜레이
    requestAnimationFrame(() => {
      container.querySelectorAll('.keyword-bar-fill').forEach((el, i) => {
        setTimeout(() => {
          el.style.width = el.dataset.pct + '%';
        }, i * 60);
      });
    });
  }

  return { render };
})();
