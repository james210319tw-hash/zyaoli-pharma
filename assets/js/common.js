/* ============================================================
 * 公共元件：頁頭、頁尾、導航高亮、搜尋跳轉、返回頂部
 * 所有頁面引入此檔，統一注入導航與頁尾
 * ============================================================ */
(function () {
  'use strict';
  var S = window.SITE;

  function currentId() {
    var f = location.pathname.split('/').pop() || 'index.html';
    var id = f.replace(/\.html$/, '');
    return id || 'index';
  }

  function buildHeader() {
    var id = currentId();
    var navHtml = S.NAV.map(function (n) {
      var active = n.id === id ? ' class="active"' : '';
      return '<a href="' + n.file + '"' + active + ' title="' + n.en + '">' + n.label + '</a>';
    }).join('');
    return '' +
      '<header class="site-header"><div class="header-inner">' +
        '<a class="brand" href="index.html" aria-label="回到首頁">' +
          '<span class="seal">中藥<br>藥理</span>' +
          '<span class="brand-text"><strong>中藥藥理學</strong><small>知識庫 · 吳雄志</small></span>' +
        '</a>' +
        '<button class="nav-toggle" id="navToggle" aria-label="展開選單">☰</button>' +
        '<nav class="main-nav" id="mainNav">' + navHtml + '</nav>' +
        '<a class="nav-search" href="database.html#search" title="搜尋詞條">🔍 搜尋</a>' +
      '</div></header>';
  }

  function buildFooter() {
    var quick = S.NAV.slice(0, 8).map(function (n) {
      return '<li><a href="' + n.file + '">' + n.label + '</a></li>';
    }).join('');
    return '' +
      '<footer class="site-footer"><div class="wrap">' +
        '<div class="footer-grid">' +
          '<div>' +
            '<h4>關於本站</h4>' +
            '<p>以吳雄志《中藥藥理學》（遼寧科學技術出版社，2024）為主軸，整理全書架構、法象藥理、藥理求同求異、現代藥理與中西匯通思路，並延伸現代免疫藥理、腸道菌群與腫瘤免疫研究。</p>' +
            '<p>本站為學習整理用途，不替代醫師診斷、處方或用藥建議。</p>' +
          '</div>' +
          '<div><h4>章節導覽</h4><ul>' + quick + '</ul></div>' +
          '<div><h4>資源</h4><ul>' +
            '<li><a href="database.html">方藥資料庫</a></li>' +
            '<li><a href="mindmap.html">互動思維導圖</a></li>' +
            '<li><a href="gallery.html">彩圖與用藥法</a></li>' +
            '<li><a href="about.html">資料來源與免責</a></li>' +
            '<li><a href="sitemap.xml">網站地圖</a></li>' +
          '</ul></div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span>© 2026 中藥藥理學知識庫 · 繁體中文 · 靜態網站</span>' +
          '<span>内容僅供學習參考，臨床用藥請遵從執業醫師</span>' +
        '</div>' +
      '</div></footer>' +
      '<button class="to-top" id="toTop" aria-label="返回頂部">↑</button>';
  }

  function init() {
    var headerHost = document.getElementById('site-header');
    var footerHost = document.getElementById('site-footer');
    if (headerHost) headerHost.innerHTML = buildHeader();
    if (footerHost) footerHost.innerHTML = buildFooter();

    // 手機選單
    var toggle = document.getElementById('navToggle');
    var nav = document.getElementById('mainNav');
    if (toggle && nav) {
      toggle.addEventListener('click', function () { nav.classList.toggle('open'); });
    }

    // 返回頂部
    var toTop = document.getElementById('toTop');
    if (toTop) {
      toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
      window.addEventListener('scroll', function () {
        if (window.scrollY > 400) toTop.classList.add('show');
        else toTop.classList.remove('show');
      });
    }

    // hash 定位（資料庫頁查無此字時，定位到搜尋框）
    if (location.hash === '#search') {
      var target = document.getElementById('entrySearch');
      if (target) { setTimeout(function () { target.focus(); target.scrollIntoView({ block: 'center' }); }, 60); }
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
