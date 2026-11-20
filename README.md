# 中藥藥理學知識庫 · 靜態網站

以吳雄志《中藥藥理學》（遼寧科學技術出版社，2024）為主軸的繁體中文、響應式靜態知識庫網站。共 12 頁，古籍簡約風，附全文搜尋、標籤篩選、互動思維導圖與詞條卡片。**不含會員、後台、金流或 API 串接**。

---

## 一、目錄結構

```
zyaoli-site/
├── index.html          # 首頁（含全站搜尋入口）
├── guide.html          # 書籍導讀
├── intro.html          # 概論：理氣象數
├── faxiang.html        # 法象藥理
├── qiutong.html        # 藥理求同
├── qiuyi.html          # 藥理求異
├── modern.html         # 現代藥理
├── topics.html         # 專題拓展（免疫、菌群、腫瘤、毒理）
├── database.html       # 方藥資料庫（搜尋＋標籤篩選＋詞條卡片）
├── mindmap.html        # 互動思維導圖
├── gallery.html        # 彩圖與用藥法
├── about.html          # 關於與免責
├── sitemap.xml         # 網站地圖
├── robots.txt
└── assets/
    ├── css/style.css   # 設計系統與 RWD 樣式
    └── js/
        ├── data.js            # 基礎資料層：詞條、導航、導圖、證據層級
        ├── content.js         # 深度內容庫：PDF 原文提煉的詞條／章節詳解／醫案／金句
        ├── content-render.js  # 深度內容渲染至各頁容器
        ├── common.js          # 頁頭／頁尾注入、選單、返回頂部
        └── app.js             # 搜尋、篩選、卡片 Modal、導圖渲染
```

---

## 二、本機預覽

不需安裝任何套件。用任一靜態伺服器在資料夾根目錄啟動，例如：

```bash
cd zyaoli-site
python3 -m http.server 8000
# 瀏覽器開啟 http://localhost:8000
```

> 直接用 `file://` 開啟亦可顯示，但建議用本機伺服器以確保搜尋參數（URL query）與 hash 定位行為一致。

---

## 三、部署方式

本站為純靜態檔案，可部署到任何靜態託管服務。以下列出常見方式：

### 1. GitHub Pages
1. 將整個 `zyaoli-site/` 資料夾內容推送到儲存庫（例如 `main` 分支的 `/docs` 或直接根目录）。
2. 進入 **Settings → Pages**，Source 選擇「Deploy from a branch」，選定分支與資料夾，儲存。
3. 部署完成後，將 `sitemap.xml`、`robots.txt` 與每個 HTML 中的 `https://example.com/zyaoli/` 替換為你的實際網址。

### 2. Netlify
1. 將資料夾拖曳到 Netlify Drop，或連接 Git 儲存庫。
2. Build command 留空（纯静态），Publish directory 設為 `.`（或資料夾根）。
3. 可在 **Site settings → Domain** 更換自定义網域，并同步更新 sitemap 中的網址。

### 3. Vercel
1. `vercel` CLI 于資料夾根目录执行 `vercel`，或于網頁匯入儲存庫，Framework 選「Other」。
2. 部署後于專案 Settings 綁定網域，更新 sitemap 網址。

### 4. 自有伺服器（Nginx / Apache）
將資料夾內容上傳到網站根目录（例：`/var/www/zyaoli/`），設定索引頁為 `index.html` 即可。Nginx 范例：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/zyaoli;
    index index.html;
    location / { try_files $uri $uri/ =404; }
}
```

---

## 四、上線前請替換

1. **網域名稱**：將所有 HTML `<link rel="canonical">`、`sitemap.xml`、`robots.txt` 中的 `https://example.com/zyaoli/` 換成實際網址。
2. **字型**：本站预設载入 Google Fonts（Noto Sans TC / Noto Serif TC）。若目标环境無法連外網，可改為自托管字型，或在 `style.css` 的 `--serif` / `--sans` 變數中指定系统字体（已內建 fallback）。
3. **ISBN／出版資訊**：位于 `data.js` 的 `BOOK` 物件與各頁文案，如有再版资讯请同步更新。

---

## 五、功能說明

| 功能 | 位置 | 說明 |
|---|---|---|
| 全文搜尋 | 首頁搜尋框、`database.html` | 首頁輸入後跳轉資料庫並帶 `?q=` 參數；資料庫頁即時過濾詞條 |
| 標籤篩選 | `database.html` | 依「類別」與「熱門標籤」交叉篩選，可與搜尋同時使用 |
| 詞條卡片 | `database.html` | 點擊卡片開啟 Modal，顯示提要／詳述／注意／標籤／證據層級 |
| 互動思維導圖 | `mindmap.html` | SVG 節點可點擊導覽；支援放大／縮小／重置 |
| 證據層級 | 各詞條卡片 | 傳統理論／臨床經驗／現代實驗／動物模型／臨床研究，避免把假說當療效 |
| RWD | 全站 | 手机／平板／电脑自适應，手机版含折叠式選单 |
| SEO | 各頁 `<head>` | 標題、描述、關鍵字、canonical、JSON-LD（首頁 WebSite＋SearchAction）、sitemap、robots |

---

## 六、內容規模與來源

本站內容由吳雄志《中藥藥理學》（遼寧科學技術出版社，2024）PDF 原文（ABBYY OCR）提取整理：

- **詞條卡片 113 筆**：涵蓋概念、藥材、方劑、成分、疾病、機制六大類
- **章節深度詳解 40 條**：法象藥理七法、藥理求同八節、藥理求異、現代藥理逐節
- **方劑詳解 10 首**：三子養親湯、犀黃丸、陽和湯、黃連阿膠湯、白虎湯等
- **作者學術金句 9 則**：中體西用、小心求證、同中求異等核心觀點
- **具體醫案與有效成分**：如雞內金化石、枇杷養胃飲治放療潰瘍、苦參鹼、薏苡仁素等

資料層分為 `data.js`（基礎詞條／導航／導圖）與 `content.js`（PDF 深度提取內容），由 `content-render.js` 渲染至各頁。修改詳見下節。

## 七、內容維護

- **新增／修改詞條**：編輯 `assets/js/data.js` 的 `ENTRIES` 陣列。每個詞條欄位：`id`、`name`、`alias?`、`type`（藥材／方劑／成分／疾病／機制／概念）、`category`、`chapter`、`tags[]`、`evidence`、`summary`、`detail?`、`caution?`。搜尋與篩選會自動納入新詞條，無需改動其他檔案。
- **修改導圖**：編輯 `data.js` 的 `MINDMAP` 樹狀結構（`name` / `href` / `children`）。
- **修改導航**：編輯 `data.js` 的 `NAV` 陣列；頁頭頁尾會自動更新。

---

## 八、免責聲明

本站內容僅供中醫藥學習整理，不構成醫療建議，不替代醫師診斷、處方或用藥指導。多數現代機制證據來自動物實驗、細胞實驗或綜述研究，不能直接等同臨床療效。腫瘤、自身免疫病或正在接受免疫治療者，請勿自行以中藥成分替代或疊加正規治療。
