/* ============================================================
 * 《中藥藥理學》知識庫 — 資料層
 * 資料來源：吳雄志《中藥藥理學》（遼寧科學技術出版社，2024）
 *          ＋ 對話中整理之腦圖、現代藥理、免疫藥理、腸道菌群與腫瘤免疫內容
 * 供搜尋、標籤篩選、詞條卡片、思維導圖共用
 * ============================================================ */
(function (global) {
  'use strict';

  var BOOK = {
    title: '中藥藥理學',
    subtitle: '理、氣、象、數 — 法象與現代藥理互參',
    author: '吳雄志',
    publisher: '遼寧科學技術出版社',
    imprint: '北方聯合出版傳媒（集團）股份有限公司',
    edition: '2024年3月第1版',
    isbn: '978-7-5591-3265-9',
    words: '270千字',
    price: '78.00元',
    prefaceBy: '雲陽子（癸卯年仲夏）'
  };

  // 12 頁導航
  var NAV = [
    { id: 'index',    file: 'index.html',    label: '首頁',       en: 'Home' },
    { id: 'guide',    file: 'guide.html',    label: '書籍導讀',   en: 'Guide' },
    { id: 'intro',    file: 'intro.html',    label: '概論',       en: 'Intro' },
    { id: 'faxiang',  file: 'faxiang.html',  label: '法象藥理',   en: 'Analogy' },
    { id: 'qiutong',  file: 'qiutong.html',  label: '藥理求同',   en: 'Sameness' },
    { id: 'qiuyi',    file: 'qiuyi.html',    label: '藥理求異',   en: 'Difference' },
    { id: 'modern',   file: 'modern.html',   label: '現代藥理',   en: 'Modern' },
    { id: 'topics',   file: 'topics.html',   label: '專題拓展',   en: 'Topics' },
    { id: 'database', file: 'database.html', label: '方藥資料庫', en: 'Database' },
    { id: 'mindmap',  file: 'mindmap.html',  label: '思維導圖',   en: 'Mindmap' },
    { id: 'gallery',  file: 'gallery.html',  label: '彩圖與用藥法', en: 'Gallery' },
    { id: 'about',    file: 'about.html',    label: '關於與免責', en: 'About' }
  ];

  // 證據層級（避免把假說寫成確定療效）
  var EVIDENCE = {
    'traditional': { label: '傳統理論', cls: 'ev-trad', desc: '源於經典與法象類比' },
    'experience':  { label: '臨床經驗', cls: 'ev-exp',  desc: '源於臨證驗案與心得' },
    'experiment':  { label: '現代實驗', cls: 'ev-exp2', desc: '體外或機理實驗研究' },
    'animal':      { label: '動物模型', cls: 'ev-animal', desc: '動物模型研究，未等同人體療效' },
    'clinical':    { label: '臨床研究', cls: 'ev-clin', desc: '人體臨床研究或綜述' }
  };

  // 詞條卡片資料（type: 藥材 / 方劑 / 成分 / 疾病 / 機制 / 概念）
  var ENTRIES = [
    /* ---------- 概念 ---------- */
    {
      id: 'li-qi-xiang-shu', name: '理氣象數', type: '概念', category: '認識方法',
      chapter: '第一章 概論', tags: ['概論', '中醫認識方法'], evidence: 'traditional',
      summary: '中醫認識中藥的四種方法：以功效分析的「理」、以藥性理論的「氣」、以用藥法象的「象」、以及不屬世間法的「數」。',
      detail: '「理」指功效分析，須以中醫理論指導，否則只是天然藥；「氣」指四氣五味、升降浮沉、歸經；「象」指取類比象的用藥法象；「數」如採收時節，不屬世間法。現代藥理據種屬與有效成分判斷療效，與臨床經驗、法象類比相互印證。',
      caution: '四法宜合參，不可偏執一端。'
    },
    {
      id: 'zhong-ti-xi-yong', name: '中體西用', type: '概念', category: '學術思想',
      chapter: '序／第十一節 中體西用', tags: ['概論', '中體西用', '中西匯通'], evidence: 'traditional',
      summary: '以中學為體、西學為用，兼容並蓄；臨證不可拘泥現代研究而忘中醫之本。',
      detail: '序云：醫之道無非理法方藥；藥理古有法象藥理，今有現代藥理。中西醫學有同有異，並非一一對應，凡夫當小心求證。以現代研究方法為「用」，以中醫理論為「體」。',
      caution: '現代研究為參考，不可照貓畫虎。'
    },
    {
      id: 'fa-xiang-yao-li', name: '法象藥理', type: '概念', category: '用藥法象',
      chapter: '第二章 法象藥理', tags: ['法象藥理', '取類比象'], evidence: 'traditional',
      summary: '以取類比象為核心的用藥理論，包括同氣相求、以皮治皮、氣升水布、苔如微草、以臟補臟、以濁化濁等。',
      detail: '金元李東垣豐富此法。取類比象屬或然性推理，用於藏象、審證求因、用藥法象、天人合一；優點在於啟發，缺點在以現象釋現象、難明本質。',
      caution: '類比具或然性，須與臨床、現代研究互參。'
    },
    {
      id: 'yao-li-qiu-tong', name: '藥理求同', type: '概念', category: '方法論',
      chapter: '第三章 藥理求同', tags: ['藥理求同', '共性'], evidence: 'traditional',
      summary: '按植物種屬與有效成分，歸納相似藥物的共性，如禾本科清熱利尿、豆科苦參鹼、菊科疏肝清肝。',
      detail: '「相似之藥求其同」，發現共性便於以類推廣、尋找替代與配伍規律；如三子養親湯、犀黃丸、陽和湯體現的用藥邏輯。',
      caution: '共性之外仍有個性，需與求異互補。'
    },
    {
      id: 'yao-li-qiu-yi', name: '藥理求異', type: '概念', category: '方法論',
      chapter: '第四章 藥理求異', tags: ['藥理求異', '個性'], evidence: 'traditional',
      summary: '在相似藥物中辨析差異，如黃芩、黃連、黃柏瀉不同之火，人參與黃耆一走裡一走表。',
      detail: '「相異之藥求其同，相似之藥求其異」，以達專病專藥或良藥相須為用。比較維度包括病位、性味、經絡、現代成分與作用趨勢。',
      caution: '辨析須落到臨證適應證，非空談。'
    },

    /* ---------- 藥材 ---------- */
    {
      id: 'huang-qi', name: '黃耆', alias: '黃芪', type: '藥材', category: '豆科',
      chapter: '第三章／第四章／第五章', tags: ['補氣', '扶正', '免疫調節', '豆科'], evidence: 'clinical',
      summary: '補氣要藥，走表，雙向調節血壓與免疫；黃耆多糖為現代免疫藥理研究熱點。',
      detail: '性味歸經：甘、微溫，歸脾、肺經。功效：補氣升陽、固表止汗、利水消腫。現代研究：黃耆多糖富集雙歧桿菌、阿克曼菌，促進短鏈脂肪酸，下調 PD-L1，增敏 PD-1 抑制劑；黃耆甲苷調節 Th1/Th2、Th17/Treg 平衡。',
      caution: '表實邪盛、陰虛火旺者慎用。'
    },
    {
      id: 'ren-shen', name: '人參', type: '藥材', category: '五加科',
      chapter: '第三章 藥理求同／第四章 藥理求異', tags: ['扶正', '適應原', '補氣'], evidence: 'experiment',
      summary: '扶正固本，具適應原樣作用，走裡、長肌；與五靈脂配伍治虛勞兼血痹。',
      detail: '人參皂苷 Rb1 可透過 Treg 恢復免疫平衡；人參皂苷 Rg2 促進 Parabacteroides distasonis 定植，其膽汁酸代謝物抑制 Th17 分化。與五味子皆有適應原樣、強心作用。',
      caution: '實證、熱證而正氣不虛者慎用；注意與抗凝藥相互作用。'
    },
    {
      id: 'gan-cao', name: '甘草', type: '藥材', category: '豆科',
      chapter: '第五章 第三節 甘草法', tags: ['甘草法', '免疫抑制', '清熱解毒', '豆科'], evidence: 'clinical',
      summary: '「甘草法」代表藥，甘草酸類具皮質醇樣抗炎、解毒、強心、抗休克作用，亦具免疫抑制。',
      detail: '甘草酸類：抗炎解毒、強心抗休克、抗心律、矯味健胃、長苔。副作用：甘令中滿生濕、升血壓、丟鈣（假性醛固酮增多症）。與西醫激素區別在於作用溫和、多靶點。',
      caution: '高血壓、水腫、低血鉀者慎用；不宜長期大量。'
    },
    {
      id: 'wu-wei-zi', name: '五味子', type: '藥材', category: '木蘭科',
      chapter: '第三章 藥理求同', tags: ['免疫抑制', '保肝', '適應原'], evidence: 'experiment',
      summary: '收斂固澀、益氣生津，具免疫抑制與保肝作用，與人參皆有適應原樣、強心之效。',
      detail: '體現「扶正祛邪」中扶正兼收斂的思路；現代研究關注其保肝、抗氧化與免疫調節雙向作用。',
      caution: '外有表邪、內有實熱者慎用。'
    },
    {
      id: 'huang-lian', name: '黃連', type: '藥材', category: '毛茛科',
      chapter: '第四章 第一節 清熱利濕', tags: ['清熱利濕', '瀉火', '小檗鹼'], evidence: 'clinical',
      summary: '清熱燥濕、瀉火解毒，瀉厥陰相火；主含小檗鹼（黃連素）。',
      detail: '與黃芩、黃柏並稱「三黃」：黃芩瀉少陽，黃連、黃柏瀉厥陰相火。黃連解毒湯、葛根芩連湯等用於濕熱證，現代研究涉及菌群與抗炎。',
      caution: '苦寒敗胃，脾胃虛寒者慎用。'
    },
    {
      id: 'huang-qin', name: '黃芩', type: '藥材', category: '唇形科',
      chapter: '第四章 第一節 清熱利濕', tags: ['清熱利濕', '瀉少陽', '黃芩苷'], evidence: 'animal',
      summary: '清熱燥濕、瀉火解毒，瀉少陽之火；黃芩苷為抗結腸炎研究熱點。',
      detail: '黃芩苷在 TNBS 大鼠潰瘍性結腸炎模型中降低 Th17/Treg 比值，恢復糞便丁酸水平，增加產丁酸菌（Butyricimonas、Roseburia 等），提示「黃芩苷—菌群—丁酸—Treg/Th17」鏈條。',
      caution: '苦寒，脾胃虛寒者慎用。'
    },
    {
      id: 'huang-bai', name: '黃柏', type: '藥材', category: '芸香科',
      chapter: '第四章 第一節／第二章 以皮治皮', tags: ['清熱利濕', '以皮治皮', '瀉火'], evidence: 'traditional',
      summary: '清熱燥濕、瀉火除蒸；梔子柏皮湯治黃疸，體現「以皮治皮」。',
      detail: '與黃連同瀉厥陰相火；黃柏皮入皮，古方用以治黃疸、皮膚濕熱。',
      caution: '苦寒沉降，脾虛便溏者忌。'
    },
    {
      id: 'ku-shen', name: '苦參', type: '藥材', category: '豆科',
      chapter: '第三章 第一節 清熱利濕', tags: ['清熱利濕', '苦參鹼', '抗癌', '豆科'], evidence: 'experiment',
      summary: '豆科，含苦參鹼，清熱利濕、保肝、養心、抗癌；與山豆根病位有上下之別。',
      detail: '苦參偏於下焦，山豆根偏於上焦（咽喉）。苦參鹼具抗炎、抗腫瘤、保肝等現代藥理活性。',
      caution: '苦寒傷胃，脾胃虛弱者慎用。'
    },
    {
      id: 'shan-dou-gen', name: '山豆根', type: '藥材', category: '豆科',
      chapter: '第三章 第一節 清熱利濕', tags: ['清熱利濕', '苦參鹼', '利咽喉'], evidence: 'traditional',
      summary: '豆科，含苦參鹼，清熱解毒、利咽喉，病位偏上。',
      detail: '與苦參同科同成分而病位不同，為「藥理求異」之例。',
      caution: '有毒，過量易致中毒，須嚴格劑量。'
    },
    {
      id: 'yi-yi-ren', name: '薏苡仁', type: '藥材', category: '禾本科',
      chapter: '第三章 第一節 清熱利濕', tags: ['清熱利濕', '利尿', '抗病毒', '禾本科'], evidence: 'traditional',
      summary: '禾本科，利水滲濕、清熱排膿，具清熱利尿抗病毒共性。',
      detail: '與蘆根、白茅根、淡竹葉同屬禾本科，共性清熱利尿抗病毒，個性各異。',
      caution: '孕婦慎用；虛寒體質不宜久服。'
    },
    {
      id: 'dang-gui', name: '當歸', type: '藥材', category: '傘形科',
      chapter: '第四章 第二節 扶正祛邪', tags: ['活血', '補血', '阿魏酸', '傘形科'], evidence: 'experiment',
      summary: '補血活血、調經止痛；抗炎抗栓，與川芎同含阿魏酸。',
      detail: '當歸偏於抗炎抗栓、補血；川芎偏於鎮靜止痛、行氣活血，二者同含阿魏酸而功效各異。',
      caution: '濕盛中滿、大便洩瀉者慎用。'
    },
    {
      id: 'chuan-xiong', name: '川芎', type: '藥材', category: '傘形科',
      chapter: '第四章 第二節 扶正祛邪', tags: ['活血', '止痛', '阿魏酸', '傘形科'], evidence: 'experiment',
      summary: '活血行氣、祛風止痛；鎮靜止痛，與當歸同含阿魏酸。',
      detail: '傘形科藥物，氣分、血分兼顧，為活血止痛要藥。',
      caution: '陰虛火旺、月經過多者慎用。'
    },
    {
      id: 'shi-gao', name: '石膏', type: '藥材', category: '礦物藥',
      chapter: '第五章 第七節 石膏法', tags: ['石膏法', '清熱', '解熱鎮痛', '陽明經熱'], evidence: 'experiment',
      summary: '含水硫酸鈣，清熱瀉火；白虎湯、麻杏石甘湯主藥，對應「陽明經熱」。',
      detail: '現代研究提示解熱、抗炎、鎮痛、免疫調節與電解質平衡作用；解熱可能與鈣離子、炎症因子抑制及體溫調節有關。「大熱、大汗、大渴、脈洪大」可作 modern 化解釋。',
      caution: '脾胃虛寒、陰虛內熱者忌；劑量與體質、配伍需謹慎。'
    },
    {
      id: 'shao-yao', name: '芍藥', type: '藥材', category: '毛茛科',
      chapter: '第五章 第八節 芍藥法／第三章', tags: ['芍藥法', '柔肝', '緩急止痛', '芍藥苷'], evidence: 'clinical',
      summary: '養血柔肝、緩急止痛、斂陰；芍藥苷、白芍總苷為研究的活性成分。',
      detail: '芍藥苷具鎮痛、抗炎、免疫調節、緩解平滑肌痙攣作用；與甘草配伍的「芍藥甘草湯」治拘急疼痛。與丹皮同含芍藥苷而丹皮偏涼血。便秘用芍藥，久利用烏梅。',
      caution: '虛寒、下滑者慎用。'
    },
    {
      id: 'mu-dan-pi', name: '牡丹皮', type: '藥材', category: '毛茛科',
      chapter: '第三章 第六節 疏肝清肝', tags: ['涼血', '清肝', '芍藥苷'], evidence: 'traditional',
      summary: '清熱涼血、活血化瘀，清肝與芍藥同含芍藥苷而偏涼血。',
      detail: '為「相似之藥求其異」的比較案例。',
      caution: '血虛有寒、孕婦慎用。'
    },
    {
      id: 'shan-ci-gu', name: '山慈姑', type: '藥材', category: '百合科',
      chapter: '第三章 第四／五節', tags: ['清熱解毒', '秋水仙鹼', '肝毒性', '百合科'], evidence: 'clinical',
      summary: '百合科，含秋水仙鹼，清熱解毒、消癰散結；與百合同治痛風腫瘤而體質有別。',
      detail: '易引起肝損傷，服用一至二週需查肝功能。與百合同含秋水仙鹼，百合偏養陰（陰虛），山慈姑偏清熱利濕（濕熱）。',
      caution: '含秋水仙鹼，有毒；須監測肝功能，嚴格劑量。'
    },
    {
      id: 'bai-he', name: '百合', type: '藥材', category: '百合科',
      chapter: '第三章 第四／五節', tags: ['養陰', '多糖', '秋水仙鹼', '百合科'], evidence: 'traditional',
      summary: '百合科，富含多糖胺基酸養陰潤肺；與山慈姑同含秋水仙鹼而偏陰虛。',
      detail: '百合科多養陰；天冬、麥冬、玉竹強心養陰各有差異，石斛促胃酸，黃精甾體皂苷降壓降脂。',
      caution: '風寒咳嗽、中寒便溏者忌。'
    },
    {
      id: 'ban-xia', name: '半夏', type: '藥材', category: '天南星科',
      chapter: '第三章 第三節 化痰活血', tags: ['化痰', '抗腫瘤', '生用先煎', '天南星科'], evidence: 'traditional',
      summary: '燥濕化痰、降逆止嘔、消痞散結；南星科化痰抗腫瘤，生用須先煎。',
      detail: '與天南星等化痰抗腫瘤；生半夏有毒，須先煎久煎以減毒。三子養親湯、小半夏湯、生薑半夏湯皆用之。',
      caution: '生品有毒，須炮製、先煎；孕婦慎用。'
    },
    {
      id: 'da-huang', name: '大黃', type: '藥材', category: '蓼科',
      chapter: '第三章 第八節 攻下中藥', tags: ['攻下', '蒽醌', '蓼科'], evidence: 'clinical',
      summary: '瀉下攻積、清熱瀉火、逐瘀通經；蓼科含蒽醌，通便、修復、免疫抑制。',
      detail: '與虎杖、何首烏、夜交藤同屬蓼科含蒽醌；小承氣湯、厚朴三物湯等用于攻下，與補氣藥配伍標本兼治。',
      caution: '脾胃虛弱、孕婦、哺乳期慎用。'
    },
    {
      id: 'he-shou-wu', name: '何首烏', type: '藥材', category: '蓼科',
      chapter: '第三章 第八節／第五章 第九節', tags: ['補腎', '蒽醌', '肝毒性', '蓼科'], evidence: 'clinical',
      summary: '補腎益精、養血；蓼科含蒽醌，亦為肝毒性監測重點藥。',
      detail: '生用與製用功效有別；肝毒性監測：何首烏、山慈姑等為代表。',
      caution: '有肝毒性風險，須監測肝功能，避免長期大量生用。'
    },
    {
      id: 'gou-qi', name: '枸杞', type: '藥材', category: '茄科',
      chapter: '第五章 第一節／免疫藥理', tags: ['補腎', '多糖', '維生素C', '免疫'], evidence: 'animal',
      summary: '滋補肝腎、益精明目；含枸杞多糖與維生素 C。',
      detail: '枸杞多糖促進 CD8⁺T 細胞浸潤，抑制 Treg 過度積累，減輕 T 細胞耗竭；在結腸炎研究中降低條件致病菌、增加益生菌。',
      caution: '外邪實熱、脾虛濕滯者慎用。'
    },
    {
      id: 'yin-yang-huo', name: '淫羊藿', type: '藥材', category: '小檗科',
      chapter: '第五章 第二節 中藥補骨', tags: ['補腎', '雌激素', '淫羊藿次苷', '免疫'], evidence: 'animal',
      summary: '補腎陽、強筋骨；具雌激素樣作用與骨代謝調節。',
      detail: '淫羊藿次苷可透過 CD8⁺T 細胞依賴方式增強抗腫瘤免疫。',
      caution: '陰虛火旺者不宜。'
    },

    /* ---------- 方劑 ---------- */
    {
      id: 'san-zi-yang-qin-tang', name: '三子養親湯', type: '方劑', category: '化痰',
      chapter: '第三章 第三節 化痰活血', tags: ['化痰', '三子', '甲狀腺病', '十字花科'], evidence: 'traditional',
      summary: '蘇子、萊菔子、白芥子三味，化痰消食通便；治「皮裡膜外之痰」如甲狀腺病。',
      detail: '三子含芥子素，強心理氣；十字花科共性。注意：甲狀腺病攝碘（radioiodine）治療期禁忌。',
      caution: '攝碘治療期間禁用；氣虛下陷者慎用。'
    },
    {
      id: 'xi-huang-wan', name: '犀黃丸', type: '方劑', category: '活血消腫',
      chapter: '第三章 第三節 化痰活血', tags: ['乳腺癌', '乳香沒藥', '活血', '抗腫瘤'], evidence: 'experience',
      summary: '乳香、沒藥配麝香、牛黃，活血消腫、解毒散結；用於乳腺癌等。',
      detail: '體現「全身寒、局部熱」的乳腺癌病機思路；與仙方活命飲等活血消腫方區別在於適應證與配伍層次。可歸入「腫瘤炎症—凝血—瘀血」交叉板塊。',
      caution: '孕婦禁用；須由醫師辨證使用。'
    },
    {
      id: 'xian-fang-huo-ming-yin', name: '仙方活命飲', type: '方劑', category: '活血消腫',
      chapter: '第三章 第三節 化痰活血', tags: ['活血消腫', '瘡瘍', '清熱解毒'], evidence: 'traditional',
      summary: '活血消腫、清熱解毒、止痛散結，治瘡瘍腫毒初起。',
      detail: '與犀黃丸同屬活血消腫，但在病位、配伍與階段上有別，為「藥理求異」案例。',
      caution: '瘡瘍已潰者慎用。'
    },
    {
      id: 'yang-he-tang', name: '陽和湯', type: '方劑', category: '溫陽散寒',
      chapter: '第二章 以皮治皮／第五章', tags: ['肉桂', '皮下腫瘤', '溫陽', '以皮治皮'], evidence: 'experience',
      summary: '熟地、鹿角膠、肉桂、薑炭等，溫陽補血、散寒通滯；治皮下腫瘤、陰疽。',
      detail: '肉桂配薑炭，以皮治皮，治皮下腫瘤、通經；督脈腫瘤用陽和湯變方。',
      caution: '陰虛火旺、實熱證忌用。'
    },
    {
      id: 'bai-hu-tang', name: '白虎湯', type: '方劑', category: '清熱',
      chapter: '第五章 第七節 石膏法', tags: ['石膏法', '陽明經熱', '清熱'], evidence: 'traditional',
      summary: '石膏、知母、甘草、粳米，清陽明經熱；對應「大熱大汗大渴脈洪大」。',
      detail: '石膏為君，現代研究其解熱、抗炎、電解質調節作用。',
      caution: '表證未解、陰虛內熱、脾胃虛寒者忌。'
    },
    {
      id: 'shao-yao-gan-cao-tang', name: '芍藥甘草湯', type: '方劑', category: '緩急止痛',
      chapter: '第五章 第八節 芍藥法', tags: ['芍藥法', '緩急止痛', '痙攣'], evidence: 'clinical',
      summary: '芍藥、甘草二味，酸甘化陰、緩急止痛；治拘急疼痛、腹痛、經痛。',
      detail: '與「柔肝、緩急止痛、養陰」銜接；芍藥苷與甘草酸協同鎮痛抗炎。',
      caution: '甘草過量致水腫血壓者注意。'
    },
    {
      id: 'huang-lian-e-jiao-tang', name: '黃連阿膠湯', type: '方劑', category: '養陰',
      chapter: '第二章 以臟補臟', tags: ['以臟補臟', '雞子黃', '養陰潛陽'], evidence: 'traditional',
      summary: '黃連、黃芩、芍藥、阿膠、雞子黃，養陰瀉火；雞子黃養陰潛陽。',
      detail: '與四烏賊骨一藎茹丸（雀卵溫陽）同為「以臟補臟」之例。',
      caution: '脾胃虛寒者慎用。'
    },
    {
      id: 'wu-ling-san', name: '五苓散', type: '方劑', category: '利水',
      chapter: '第四章 第一節 清熱利濕', tags: ['茯苓', '豬苓', '澤瀉', '利水'], evidence: 'traditional',
      summary: '豬苓、茯苓、澤瀉、白朮、桂枝，利水滲濕、溫陽化氣；太陰茯苓、少陰豬苓、肝胆澤瀉。',
      detail: '與腎氣丸等配伍比較，見「藥理求異」。',
      caution: '津液虧損者不宜過用。'
    },

    /* ---------- 成分 ---------- */
    {
      id: 'huang-qi-duo-tang', name: '黃耆多糖', type: '成分', category: '多糖',
      chapter: '免疫藥理／專題拓展', tags: ['免疫調節', '腸道菌群', '腫瘤免疫', '增敏PD-1', '扶正'], evidence: 'animal',
      summary: '黃耆多糖富集雙歧桿菌、阿克曼菌，促進短鏈脂肪酸、增強腸屏障、下調 PD-L1，增敏 PD-1 抑制劑。',
      detail: 'CT26 結直腸癌模型中，黃耆多糖聯合 PD-1 較單藥縮小腫瘤、提高 CD8⁺T 比例、降低 TGF-β1/IL-17A；AOM/DSS 模型中激活 CD8⁺T、逆轉抑制狀態，涉及 STAT3/Gal-3/LAG3 通路。關節炎模型中經「腸—關節軸」減輕炎症與骨破壞。',
      caution: '多為動物流型研究，人體臨床證據仍在積累。'
    },
    {
      id: 'xiao-bi-jian', name: '小檗鹼', alias: '黃連素', type: '成分', category: '生物鹼',
      chapter: '專題拓展／免疫藥理', tags: ['潰瘍性結腸炎', '腸道菌群', 'Treg/Th17', '抗炎'], evidence: 'animal',
      summary: '提高嗜黏蛋白阿克曼氏菌比例，抑制 Th17/IL-17A、上調 Foxp3，恢復菌群與 Treg/Th17 平衡。',
      detail: '上調 ZO-1、claudin-1 緊密連接蛋白，減少細菌易位，降低 IL-6、TNF-α；重塑產短鏈脂肪酸菌群與膽汁酸代謝。',
      caution: '動物與體外研究為主。'
    },
    {
      id: 'huang-qin-gan', name: '黃芩苷', type: '成分', category: '黃酮',
      chapter: '專題拓展／疾病例子', tags: ['潰瘍性結腸炎', '丁酸', '產丁酸菌', 'Treg/Th17'], evidence: 'animal',
      summary: '在 TNBS 大鼠結腸炎模型中降低疾病活動指數與 Th17/Treg 比值，恢復丁酸與產丁酸菌。',
      detail: '增加 Butyricimonas、Roseburia、Subdoligranulum、Eubacterium 丰度，提示「黃芩苷—菌群—丁酸—Treg/Th17」鏈條。',
      caution: '動物實驗，未等同人體療效。'
    },
    {
      id: 'shuang-qing-hao-su', name: '雙氫青蒿素', type: '成分', category: '萜類',
      chapter: '專題拓展／疾病例子', tags: ['肝細胞癌', '抗PD-1', 'YAP1', '膽汁酸', '腫瘤免疫'], evidence: 'animal',
      summary: '抑制 YAP1、改善膽汁酸代謝紊亂、提高 Akkermansia muciniphila 丰度，提高抗 PD-1 敏感性。',
      detail: 'A. muciniphila 增加促進 CD8⁺T 浸潤與 IFN-γ 分泌、降低 IL-10；肝腫瘤體積與數量明顯減少。',
      caution: '動物模型研究。'
    },
    {
      id: 'ren-shen-zhe-g-Rg2', name: '人參皂苷 Rg2', type: '成分', category: '皂苷',
      chapter: '專題拓展／疾病例子', tags: ['類風濕關節炎', '膽汁酸', 'Th17', 'M2極化'], evidence: 'animal',
      summary: '促進 Parabacteroides distasonis 定植，其膽汁酸代謝物 LCA、DCA、isoLCA、3-oxoLCA 抑制 Th17 分化。',
      detail: '相關綜述提到可促進巨噬細胞 M2 極化，表現抗類風濕關節炎作用。',
      caution: '動物與綜述研究。'
    },
    {
      id: 'gan-cao-suan', name: '甘草酸', type: '成分', category: '皂苷',
      chapter: '第五章 甘草法', tags: ['甘草法', '皮質醇樣', '抗炎', '免疫抑制'], evidence: 'clinical',
      summary: '甘草酸類具皮質醇樣抗炎、解毒、強心、抗休克作用，為甘草法主要活性成分。',
      detail: '副作用包括中滿生濕、升血壓、丟鈣。',
      caution: '長期大量可致假性醛固酮增多症。'
    },
    {
      id: 'shao-yao-gan', name: '芍藥苷', type: '成分', category: '單萜苷',
      chapter: '第五章 芍藥法', tags: ['芍藥法', '鎮痛', '抗炎', '免疫調節'], evidence: 'clinical',
      summary: '白芍總苷主要活性成分，具鎮痛、抗炎、免疫調節與平滑肌解痙作用。',
      detail: '與甘草配伍協同緩急止痛；芍藥、丹皮同含此成分。',
      caution: '臨床套用須辨證。'
    },
    {
      id: 'qiu-shui-xian-jian', name: '秋水仙鹼', type: '成分', category: '生物鹼',
      chapter: '第三章 百合科', tags: ['痛風', '抗腫瘤', '肝毒性', '百合科'], evidence: 'clinical',
      summary: '百合、山慈姑所含成分，治痛風與腫瘤，易致肝損傷。',
      detail: '服用山慈姑一至二週需查肝功能。',
      caution: '有毒，須監測肝功能。'
    },
    {
      id: 'a-wei-suan', name: '阿魏酸', type: '成分', category: '酚酸',
      chapter: '第四章 扶正祛邪', tags: ['活血', '當歸', '川芎'], evidence: 'experiment',
      summary: '當歸、川芎共有成分，活血抗炎；二者功效差異在於當歸偏抗炎抗栓、川芎偏鎮靜止痛。',
      detail: '為「相似之藥求其異」的物質基礎案例。',
      caution: '無單獨臨床推薦。'
    },
    {
      id: 'duan-lian-zhi-fang-suan', name: '短鏈脂肪酸', alias: 'SCFAs／丁酸', type: '成分', category: '菌群代謝物',
      chapter: '專題拓展／腸道菌群', tags: ['腸道菌群', '丁酸', 'Treg', '腸屏障', '免疫'], evidence: 'experiment',
      summary: '乙酸、丙酸、丁酸等，由多糖經菌群發酵生成；丁酸促 Treg 分化、修復腸屏障、增強 PD-1 療效。',
      detail: 'SCFAs 激活 GPR43 促 IL-18、GPR109a 增強巨噬細胞與樹突狀細胞抗炎；丁酸影響 FoxP3 與組蛋白乙醯化，增加 IL-10；真氣扶正顆粒經 SCFAs-GPR109A 軸協同 PD-1 阻斷。',
      caution: '人體因果驗證仍不足。'
    },

    /* ---------- 疾病 ---------- */
    {
      id: 'jie-zhi-chang-ai', name: '結直腸癌', type: '疾病', category: '腫瘤',
      chapter: '專題拓展／疾病例子', tags: ['腫瘤免疫', '增敏PD-1', '黃耆多糖', '腸道菌群'], evidence: 'animal',
      summary: '黃耆多糖、真氣扶正顆粒等經菌群—免疫軸改善免疫微環境，提高 PD-1 治療敏感性。',
      detail: '真氣扶正顆粒重塑菌群、增加丁酸、激活 GPR109A，抑制 AKT/mTOR/HIF-1α，增加 CD8⁺T 浸潤與 M1 巨噬細胞極化。',
      caution: '腫瘤患者不應自行用中藥成分替代或疊加正規治療。'
    },
    {
      id: 'kui-chang', name: '潰瘍性結腸炎', type: '疾病', category: '炎症性腸病',
      chapter: '專題拓展／疾病例子', tags: ['腸道菌群', 'Treg/Th17', '小檗鹼', '黃芩苷'], evidence: 'animal',
      summary: '小檗鹼、黃芩苷等透過恢復菌群、增加丁酸、調節 Treg/Th17 平衡減輕腸道免疫失衡。',
      detail: '表現為菌群穩態恢復、促炎因子下降、屏障功能改善。',
      caution: '須與正規治療配合，勿自行停用藥物。'
    },
    {
      id: 'lei-feng-shi-guan-jie-yan', name: '類風濕關節炎', type: '疾病', category: '自身免疫病',
      chapter: '專題拓展／疾病例子', tags: ['自身免疫', '腸—關節軸', '黃耆多糖', 'Th17/Treg'], evidence: 'animal',
      summary: '黃耆多糖經「腸—關節軸」、人參皂苷 Rg2 經膽汁酸抑制 Th17，減輕關節炎症與骨破壞。',
      detail: '獨活寄生湯被報道抑制 eEF2K、改善細胞衰老，減輕關節炎症與骨破壞，為絕經後類風濕關節炎提供新靶點。',
      caution: '自身免疫病患者用藥須由醫師評估。'
    },
    {
      id: 'gan xi bao ai', name: '肝細胞癌', type: '疾病', category: '腫瘤',
      chapter: '專題拓展／疾病例子', tags: ['腫瘤免疫', '雙氫青蒿素', '抗PD-1', '膽汁酸'], evidence: 'animal',
      summary: '雙氫青蒿素透過 YAP1、脂代謝、腫瘤微環境與腸道菌群影響肝癌免疫治療反應。',
      detail: '提高 A. muciniphila 丰度，促進 CD8⁺T 浸潤與 IFN-γ，增強抗 PD-1 療效。',
      caution: '動物模型研究。'
    },
    {
      id: 'ru xian ai', name: '乳腺癌', type: '疾病', category: '腫瘤',
      chapter: '第三章 化痰活血', tags: ['乳腺癌', '犀黃丸', '腫瘤炎症', '高凝狀態'], evidence: 'experience',
      summary: '中醫辨識「全身寒、局部熱」；白介素-6 與炎症相關高凝狀態，可歸入「腫瘤炎症—凝血—瘀血」交叉板塊。',
      detail: '犀黃丸（乳香、沒藥、麝香、牛黃）活血消腫解毒散結。',
      caution: '須整合常規治療，勿以中藥替代。'
    },
    {
      id: 'tong-feng', name: '痛風', type: '疾病', category: '代謝病',
      chapter: '第三章 扶正祛邪', tags: ['痛風', '秋水仙鹼', '百合', '山慈姑'], evidence: 'experience',
      summary: '百合、山慈姑同含秋水仙鹼，可用於痛風；二者分別偏陰虛與濕熱。',
      detail: '秋水仙鹼為抗痛風現代藥理基礎，但有毒須監測肝功能。',
      caution: '肝功能異常者慎用。'
    },

    /* ---------- 機制 ---------- */
    {
      id: 'chang-dao-jun-qun-mian-yi-zhou', name: '腸道菌群—免疫軸', type: '機制', category: '免疫',
      chapter: '專題拓展', tags: ['腸道菌群', '免疫', '短鏈脂肪酸', '腸屏障'], evidence: 'experiment',
      summary: '中藥成分 → 重塑菌群 → 改變代謝物 → 修復腸屏障、降低炎症 → 調節免疫細胞 → 影響局部或全身免疫。',
      detail: '多糖、黃酮、皂苷、生物鹼重塑菌群；代謝物如 SCFAs、膽汁酸、吲哚為免疫信號分子；修復屏障減少 LPS 易位；調節 Treg/Th17、巨噬細胞、CD8⁺T。',
      caution: '人體臨床證據仍在積累，個體差異大。'
    },
    {
      id: 'Treg-Th17', name: 'Treg / Th17 平衡', type: '機制', category: '免疫',
      chapter: '免疫藥理／專題拓展', tags: ['Treg', 'Th17', '自身免疫', 'FoxP3', '免疫耐受'], evidence: 'experiment',
      summary: 'Treg 主免疫抑制與耐受，Th17 偏促炎；中藥透過 SCFAs、吲哚類、膽汁酸等調控 FoxP3 與 Il-10。',
      detail: '中藥多層調控 Treg：直接調 FoxP3、影響分化穩定性、調 IL-2/TGF-β/IL-10 網絡、影響菌群—免疫軸、介導表觀遺傳修飾。粉防己鹼激活 mTNF-TNFR2 促進 Treg；野黃芩苷為 TNFR2 小分子抑制劑。',
      caution: '雙向調節機制仍需釐清。'
    },
    {
      id: 'zhong-liu-mian-yi-wei-huan-jing', name: '腫瘤免疫微環境', type: '機制', category: '腫瘤免疫',
      chapter: '免疫藥理', tags: ['腫瘤免疫', 'PD-1', 'T細胞', 'MDSC', 'γδT'], evidence: 'experiment',
      summary: '中藥調節 CD8⁺T、NK、樹突狀細胞、巨噬細胞、Treg、MDSC，干預 PD-1/PD-L1、CTLA-4、Tim-3 等檢查點。',
      detail: '改善腫瘤血管異常與細胞外基質屏障，促進免疫浸潤與藥物遞送；多成分多靶點逆轉免疫逃逸與耐藥。',
      caution: '多為實驗與綜述。'
    },
    {
      id: 'dan-zhi-suan-dai-xie', name: '膽汁酸代謝', type: '機制', category: '菌群代謝',
      chapter: '專題拓展／腸道菌群', tags: ['膽汁酸', 'FXR', 'TGR5', '免疫'], evidence: 'experiment',
      summary: '菌群修飾膽汁酸形成次級膽汁酸，透過 FXR、TGR5 受體影響 NK、巨噬細胞與 T 細胞功能。',
      detail: '三七總皂苷、玉屏風散、蒿類提取物被報道調節膽汁酸代謝改善免疫穩態與腸屏障。',
      caution: '機制研究為主。'
    }
  ];

  // 思維導圖資料（可點擊，href 指向頁面或詞條）
  var MINDMAP = {
    name: '中藥藥理學', href: 'index.html',
    children: [
      {
        name: '概論：理氣象數', href: 'intro.html',
        children: [
          { name: '理・功效分析', href: 'intro.html' },
          { name: '氣・四氣五味升降歸經', href: 'intro.html' },
          { name: '象・取類比象', href: 'faxiang.html' },
          { name: '數・採收時節', href: 'intro.html' }
        ]
      },
      {
        name: '法象藥理', href: 'faxiang.html',
        children: [
          { name: '取類比象', href: 'faxiang.html' },
          { name: '同氣相求', href: 'faxiang.html' },
          { name: '以皮治皮', href: 'faxiang.html' },
          { name: '氣升水布', href: 'faxiang.html' },
          { name: '苔如微草', href: 'faxiang.html' },
          { name: '以臟補臟', href: 'faxiang.html' },
          { name: '以濁化濁', href: 'faxiang.html' }
        ]
      },
      {
        name: '藥理求同', href: 'qiutong.html',
        children: [
          { name: '清熱利濕・禾本科', href: 'qiutong.html' },
          { name: '疏風勝濕・傘形科', href: 'qiutong.html' },
          { name: '化痰活血・三子養親湯', href: 'database.html#san-zi-yang-qin-tang' },
          { name: '扶正補虛・豆科/百合科', href: 'qiutong.html' },
          { name: '扶正祛邪・犀黃丸', href: 'database.html#xi-huang-wan' },
          { name: '疏肝清肝・茜草科', href: 'qiutong.html' },
          { name: '理氣開胃・姜科/芸香科', href: 'qiutong.html' },
          { name: '攻下中藥・蓼科', href: 'qiutong.html' }
        ]
      },
      {
        name: '藥理求異', href: 'qiuyi.html',
        children: [
          { name: '三黃：芩連柏', href: 'qiuyi.html' },
          { name: '茯苓豬苓澤瀉', href: 'qiuyi.html' },
          { name: '當歸川芎', href: 'database.html#dang-gui' },
          { name: '人參黃耆', href: 'qiuyi.html' },
          { name: '麻黃桂枝', href: 'qiuyi.html' },
          { name: '荊芥防風', href: 'qiuyi.html' }
        ]
      },
      {
        name: '現代藥理', href: 'modern.html',
        children: [
          { name: '維生素・補骨鈣鐵', href: 'modern.html' },
          { name: '激素・HPA/HPT/HPG', href: 'modern.html' },
          { name: '甘草法・芍藥法・石膏法', href: 'modern.html' },
          { name: '解熱鎮痛抗炎', href: 'modern.html' },
          { name: '濕熱病與病原微生物', href: 'modern.html' },
          { name: '免疫藥理', href: 'topics.html' },
          { name: '中體西用與研究方法', href: 'modern.html' }
        ]
      },
      {
        name: '專題拓展', href: 'topics.html',
        children: [
          { name: '腸道菌群—免疫軸', href: 'database.html#chang-dao-jun-qun-mian-yi-zhou' },
          { name: '腫瘤免疫與檢查點', href: 'database.html#zhong-liu-mian-yi-wei-huan-jing' },
          { name: 'Treg/Th17', href: 'database.html#Treg-Th17' },
          { name: '毒理與安全性', href: 'topics.html' },
          { name: '疾病—成分例子', href: 'topics.html' }
        ]
      }
    ]
  };

  global.SITE = {
    BOOK: BOOK,
    NAV: NAV,
    EVIDENCE: EVIDENCE,
    ENTRIES: ENTRIES,
    MINDMAP: MINDMAP
  };
})(window);
