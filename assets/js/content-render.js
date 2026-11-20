/* ============================================================
 * 內容渲染模組：將 BOOK_CONTENT 深度內容注入各頁容器
 * 依賴 data.js → content.js → 本檔
 * ============================================================ */
(function () {
  'use strict';
  var BC = window.BOOK_CONTENT;
  if (!BC) return;

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function sectionHead(no, title) {
    return '<div class="section-head"><span class="no">' + no + '</span><h2>' + title + '</h2></div>';
  }

  // 渲染章節詳解（可摺疊 details）
  function renderChapter(key) {
    var host = document.getElementById('deep-' + key);
    if (!host || !BC.chapters[key]) return;
    var ch = BC.chapters[key];
    var html = sectionHead('深', ch.title) + '<p class="lead-text">' + esc(ch.intro) + '</p>';
    html += '<div class="deep-list">';
    ch.items.forEach(function (it, i) {
      html += '<details class="deep-item"' + (i === 0 ? ' open' : '') + '>' +
        '<summary><span class="deep-num">' + (i + 1) + '</span>' + esc(it.h) + '</summary>' +
        '<div class="deep-body">' + esc(it.t) + '</div></details>';
    });
    html += '</div>';
    host.innerHTML = html;
  }

  // 渲染方劑表
  function renderFormulas() {
    var host = document.getElementById('deep-formulas');
    if (!host) return;
    var html = sectionHead('方', '方劑詳解一覽') +
      '<div class="table-wrap"><table><thead><tr><th>方名</th><th>組成</th><th>主治</th><th>要點</th></tr></thead><tbody>';
    BC.formulas.forEach(function (f) {
      html += '<tr><td><strong>' + esc(f.name) + '</strong></td><td>' + esc(f.comp) +
        '</td><td>' + esc(f.use) + '</td><td>' + esc(f.note) + '</td></tr>';
    });
    html += '</tbody></table></div>';
    host.innerHTML = html;
  }

  // 渲染金句
  function renderQuotes() {
    var host = document.getElementById('deep-quotes');
    if (!host) return;
    var html = sectionHead('語', '作者金句・學術觀點');
    html += '<div class="quote-grid">';
    BC.quotes.forEach(function (q) {
      html += '<blockquote class="quote-card"><p>「' + esc(q.t) + '」</p><cite>— ' + esc(q.from) + '</cite></blockquote>';
    });
    html += '</div>';
    host.innerHTML = html;
  }

  function init() {
    ['faxiang', 'qiutong', 'qiuyi', 'modern'].forEach(renderChapter);
    renderFormulas();
    renderQuotes();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
