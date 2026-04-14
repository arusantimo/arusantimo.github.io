function toggleCL(el) {
  var body, arrow, toggle;
  if (el && el.nodeType) {
    toggle = el;
    body = el.nextElementSibling;
    arrow = el.querySelector('.arrow');
  } else {
    body  = document.getElementById('clBody');
    arrow = document.getElementById('clArrow');
    toggle = document.getElementById('clToggle');
  }
  var open = body.classList.toggle('open');
  toggle.classList.toggle('open', open);
  arrow.textContent = open ? '\u25bc' : '\u25b6';
}

// ─── Custom Tooltip ───
(function() {
  const tt = document.createElement('div');
  tt.id = 'cl-tooltip';
  document.body.appendChild(tt);
  let active = false;
  function show(t, x, y) {
    tt.innerHTML = '<div class="tt-title">'+t.dataset.ttTitle+'</div><div>'+t.dataset.ttDesc+'</div>'
      + (t.dataset.ttExample ? '<div class="tt-label">\uc608\uc2dc</div><div class="tt-example">'+t.dataset.ttExample+'</div>' : '');
    tt.style.display = 'block'; active = true; move(x, y);
  }
  function move(x, y) {
    const p=14, w=tt.offsetWidth, h=tt.offsetHeight, vw=window.innerWidth, vh=window.innerHeight;
    let l=x+p, t=y+p;
    if(l+w>vw-8) l=x-w-p; if(t+h>vh-8) t=y-h-p;
    tt.style.left=Math.max(8,l)+'px'; tt.style.top=Math.max(8,t)+'px';
  }
  function hide() { tt.style.display='none'; active=false; }
  document.addEventListener('mouseover', e => { const t=e.target.closest('.cl-tip'); if(t&&t.dataset.ttTitle) show(t,e.clientX,e.clientY); else if(active) hide(); });
  document.addEventListener('mousemove', e => { if(active) move(e.clientX,e.clientY); });
  document.addEventListener('mouseleave', hide);
})();

// ─── Tooltip Apply (sync, for pre-loaded data) ───
function applyTooltips(data, root) {
  var container = root || document;
  container.querySelectorAll('.row-key code').forEach(function(el) {
    var key = el.textContent.trim();
    var entry = data[key];
    if (!entry) return;
    var rowKey = el.closest('.row-key');
    if (!rowKey) return;
    rowKey.classList.add('cl-tip');
    if (entry.title) rowKey.dataset.ttTitle = entry.title;
    if (entry.desc)  rowKey.dataset.ttDesc  = entry.desc;
    if (entry.example) rowKey.dataset.ttExample = entry.example;
  });
}

// ─── JSON-driven Tooltips (fetch fallback) ───
async function loadTooltips(jsonPath, root) {
  function apply(data) {
    var container = root || document;
    container.querySelectorAll('.row-key code').forEach(function(el) {
      var key = el.textContent.trim();
      var entry = data[key];
      if (!entry) return;
      var rowKey = el.closest('.row-key');
      if (!rowKey) return;
      rowKey.classList.add('cl-tip');
      if (entry.title) rowKey.dataset.ttTitle = entry.title;
      if (entry.desc)  rowKey.dataset.ttDesc  = entry.desc;
      if (entry.example) rowKey.dataset.ttExample = entry.example;
    });
  }
  try {
    var res = await fetch(jsonPath);
    if (!res.ok) return;
    var data = await res.json();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() { apply(data); });
    } else {
      apply(data);
    }
  } catch (e) {}
}