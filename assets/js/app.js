/* ============================================================
 * 功能模組：全文搜尋、標籤篩選、詞條卡片、互動思維導圖
 * ============================================================ */
(function () {
  'use strict';
  var S = window.SITE;
  var ENTRIES = S.ENTRIES;

  /* ---------------- 詞條卡片工具 ---------------- */
  function typeClass(t) { return 'type-' + t; }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function evHtml(key) {
    var e = S.EVIDENCE[key];
    if (!e) return '';
    return '<span class="ev ' + e.cls + '" title="' + e.desc + '">' + e.label + '</span>';
  }
  function tagsHtml(tags) {
    return (tags || []).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('');
  }

  function cardHtml(it) {
    return '' +
      '<article class="entry-card" data-id="' + it.id + '" tabindex="0" role="button" aria-label="查看 ' + esc(it.name) + ' 詳情">' +
        '<div class="entry-top">' +
          '<span class="entry-name">' + esc(it.name) + (it.alias ? ' <small style="font-size:.72rem;color:#999">' + esc(it.alias) + '</small>' : '') + '</span>' +
          '<span class="entry-type ' + typeClass(it.type) + '">' + esc(it.type) + '</span>' +
        '</div>' +
        '<div class="entry-summary">' + esc(it.summary) + '</div>' +
        '<div class="entry-tags">' + tagsHtml(it.tags.slice(0, 4)) + '</div>' +
      '</article>';
  }

  function showModal(id) {
    var it = ENTRIES.filter(function (x) { return x.id === id; })[0];
    if (!it) return;
    var mask = document.getElementById('modalMask');
    var body = document.getElementById('modalBody');
    if (!mask || !body) return;
    var html = '' +
      '<button class="modal-close" aria-label="關閉">×</button>' +
      '<span class="entry-type ' + typeClass(it.type) + '">' + esc(it.type) + '</span>' +
      '<h2>' + esc(it.name) + '</h2>' +
      '<div class="modal-meta">' + evHtml(it.evidence) +
        '<span class="tag-ochre tag">' + esc(it.category) + '</span>' +
        '<span class="tag">' + esc(it.chapter) + '</span>' +
      '</div>' +
      '<div class="modal-sec"><h4>提要</h4><p>' + esc(it.summary) + '</p></div>' +
      (it.detail ? '<div class="modal-sec"><h4>詳述</h4><p>' + esc(it.detail) + '</p></div>' : '') +
      (it.caution ? '<div class="modal-sec"><h4>注意</h4><p style="color:var(--cinnabar)">' + esc(it.caution) + '</p></div>' : '') +
      '<div class="modal-sec"><h4>標籤</h4><div class="entry-tags">' + tagsHtml(it.tags) + '</div></div>';
    body.innerHTML = html;
    mask.classList.add('open');
    body.querySelector('.modal-close').addEventListener('click', closeModal);
    if (location.hash !== '#' + it.id) history.replaceState(null, '', '#' + it.id);
  }
  function closeModal() {
    var mask = document.getElementById('modalMask');
    if (mask) mask.classList.remove('open');
  }

  /* ---------------- 資料庫頁：搜尋 + 篩選 ---------------- */
  function initDatabase() {
    var grid = document.getElementById('entryGrid');
    if (!grid) return;

    var searchInput = document.getElementById('entrySearch');
    var resultMeta = document.getElementById('resultMeta');
    var state = { q: '', type: '', tag: '' };

    // 動態生成類型篩選
    var types = [];
    ENTRIES.forEach(function (e) { if (types.indexOf(e.type) < 0) types.push(e.type); });
    var typeBar = document.getElementById('filterType');
    if (typeBar) {
      typeBar.innerHTML = '<span class="flabel">類別</span>' +
        '<button class="chip active" data-type="">全部</button>' +
        types.map(function (t) { return '<button class="chip" data-type="' + t + '">' + t + '</button>'; }).join('');
    }

    // 動態生成熱門標籤
    var tagCount = {};
    ENTRIES.forEach(function (e) { e.tags.forEach(function (t) { tagCount[t] = (tagCount[t] || 0) + 1; }); });
    var topTags = Object.keys(tagCount).sort(function (a, b) { return tagCount[b] - tagCount[a]; }).slice(0, 16);
    var tagBar = document.getElementById('filterTag');
    if (tagBar) {
      tagBar.innerHTML = '<span class="flabel">標籤</span>' +
        '<button class="chip active" data-tag="">全部</button>' +
        topTags.map(function (t) { return '<button class="chip" data-tag="' + esc(t) + '">' + esc(t) + ' <small>(' + tagCount[t] + ')</small></button>'; }).join('');
    }

    function render() {
      var q = state.q.trim().toLowerCase();
      var list = ENTRIES.filter(function (e) {
        if (state.type && e.type !== state.type) return false;
        if (state.tag && e.tags.indexOf(state.tag) < 0) return false;
        if (q) {
          var hay = [e.name, e.alias, e.summary, e.detail, e.chapter, e.category, e.tags.join(' ')]
            .join(' ').toLowerCase();
          if (hay.indexOf(q) < 0) return false;
        }
        return true;
      });
      grid.innerHTML = list.length ? list.map(cardHtml).join('')
        : '<div class="empty-state"><div class="big">🔎</div><p>查無符合「' + esc(state.q) + '」的詞條，試試其他關鍵字或清除篩選。</p></div>';
      if (resultMeta) resultMeta.textContent = '共 ' + list.length + ' 筆詞條' +
        (state.q ? ' · 搜尋：「' + state.q + '」' : '') + (state.tag ? ' · 標籤：' + state.tag : '');
      bindCards();
    }

    function bindCards() {
      Array.prototype.forEach.call(grid.querySelectorAll('.entry-card'), function (el) {
        el.addEventListener('click', function () { showModal(el.getAttribute('data-id')); });
        el.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); showModal(el.getAttribute('data-id')); } });
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', function () { state.q = this.value; render(); });
    }
    document.addEventListener('click', function (ev) {
      var t = ev.target.closest('.chip');
      if (!t) return;
      if (t.hasAttribute('data-type')) {
        state.type = t.getAttribute('data-type');
        var bar = document.getElementById('filterType');
        Array.prototype.forEach.call(bar.querySelectorAll('.chip'), function (c) { c.classList.toggle('active', c === t); });
      } else if (t.hasAttribute('data-tag')) {
        state.tag = t.getAttribute('data-tag');
        var bar2 = document.getElementById('filterTag');
        Array.prototype.forEach.call(bar2.querySelectorAll('.chip'), function (c) { c.classList.toggle('active', c === t); });
      }
      render();
    });

    // 首頁搜尋列帶過來的 q 參數
    var params = new URLSearchParams(location.search);
    var q0 = params.get('q');
    if (q0 && searchInput) { searchInput.value = q0; state.q = q0; }

    render();

    // 從 hash 直接開啟詞條（如 #huang-qi-duo-tang）
    if (location.hash && location.hash !== '#search' && location.hash !== '#top') {
      var hid = location.hash.replace('#', '');
      if (ENTRIES.some(function (e) { return e.id === hid; })) showModal(hid);
    }
  }

  /* ---------------- 思維導圖 ---------------- */
  function initMindmap() {
    var svg = document.getElementById('mindmapSvg');
    if (!svg) return;

    var nodeW = 148, nodeH = 40, gapX = 40, gapY = 14;
    var root = S.MINDMAP;
    var branches = root.children || [];

    // 計算分支 y 位置（垂直積木）
    var branchY = [];
    var totalH = 0;
    branches.forEach(function (b) {
      var n = (b.children || []).length;
      var h = Math.max(nodeH, n * (nodeH + gapY));
      branchY.push({ node: b, h: h, kids: b.children || [] });
      totalH += h + 24;
    });

    var rootX = 40, rootY = totalH / 2 - nodeH / 2;
    var branchX = rootX + nodeW + gapX + 70;
    var leafX = branchX + nodeW + gapX + 60;
    var width = leafX + nodeW + 60;
    var height = Math.max(totalH + 40, 460);

    svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);

    function node(x, y, text, cls, href, anchor) {
      var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'mm-node ' + cls);
      var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', x); rect.setAttribute('y', y);
      rect.setAttribute('width', nodeW); rect.setAttribute('height', nodeH);
      rect.setAttribute('rx', 8);
      var tx = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      tx.setAttribute('x', x + nodeW / 2); tx.setAttribute('y', y + nodeH / 2 + 5);
      tx.setAttribute('text-anchor', 'middle');
      tx.setAttribute('class', 'mm-node-text');
      tx.textContent = text;
      g.appendChild(rect); g.appendChild(tx);
      if (href) {
        g.style.cursor = 'pointer';
        g.addEventListener('click', function () { location.href = href; });
      }
      return { g: g, cx: x + nodeW / 2, cy: y + nodeH / 2, left: x, right: x + nodeW };
    }

    function curve(x1, y1, x2, y2) {
      var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      var mx = (x1 + x2) / 2;
      p.setAttribute('d', 'M ' + x1 + ' ' + y1 + ' C ' + mx + ' ' + y1 + ', ' + mx + ' ' + y2 + ', ' + x2 + ' ' + y2);
      p.setAttribute('class', 'mm-link');
      return p;
    }

    // 根節點
    var rootNode = node(rootX, rootY, root.name, 'mm-node-root', root.href);
    svg.appendChild(rootNode.g);

    var yCursor = 20;
    branchY.forEach(function (item) {
      var bTop = yCursor;
      var kids = item.kids;
      var kidsH = kids.length * (nodeH + gapY) - gapY;
      var bCy = bTop + Math.max(0, (item.h - kidsH) / 2) + nodeH / 2;
      yCursor += item.h + 24;

      // 分支連線與節點
      svg.appendChild(curve(rootNode.right, rootY + nodeH / 2, branchX, bCy));
      var bNode = node(branchX, bCy - nodeH / 2, item.node.name, 'mm-node-branch', item.node.href);
      svg.appendChild(bNode.g);

      // 葉子節點
      var ky = bTop + Math.max(0, (item.h - kidsH) / 2);
      kids.forEach(function (k, i) {
        var cy = ky + i * (nodeH + gapY) + nodeH / 2;
        svg.appendChild(curve(bNode.right, bCy, leafX, cy));
        var kNode = node(leafX, cy - nodeH / 2, k.name, 'mm-node-leaf', k.href);
        svg.appendChild(kNode.g);
      });
    });

    // 縮放控制
    var zoom = 1;
    function applyZoom() { svg.style.transform = 'scale(' + zoom + ')'; svg.style.transformOrigin = 'top left'; }
    var zin = document.getElementById('zoomIn');
    var zout = document.getElementById('zoomOut');
    var zreset = document.getElementById('zoomReset');
    if (zin) zin.addEventListener('click', function () { zoom = Math.min(1.6, zoom + 0.15); applyZoom(); });
    if (zout) zout.addEventListener('click', function () { zoom = Math.max(0.6, zoom - 0.15); applyZoom(); });
    if (zreset) zreset.addEventListener('click', function () { zoom = 1; applyZoom(); });
  }

  /* ---------------- 首頁：即時搜尋 ---------------- */
  function initHomeSearch() {
    var input = document.getElementById('homeSearchInput');
    var btn = document.getElementById('homeSearchBtn');
    if (!input) return;
    function go() {
      var q = input.value.trim();
      location.href = 'database.html' + (q ? '?q=' + encodeURIComponent(q) : '');
    }
    if (btn) btn.addEventListener('click', go);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
  }

  /* ---------------- 資料庫頁：側邊 modal 容器 ---------------- */
  function ensureModal() {
    if (document.getElementById('modalMask')) return;
    var mask = document.createElement('div');
    mask.className = 'modal-mask'; mask.id = 'modalMask';
    mask.innerHTML = '<div class="modal" id="modalBody" role="dialog" aria-modal="true"></div>';
    document.body.appendChild(mask);
    mask.addEventListener('click', function (e) { if (e.target === mask) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
  }

  function init() {
    ensureModal();
    initDatabase();
    initMindmap();
    initHomeSearch();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
