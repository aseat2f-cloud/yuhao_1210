
import { useState, useEffect, lazy, Suspense } from 'react';
import { ArrowUp, Loader2 } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import ContactForm from './components/ContactForm';
import HomeBanner from './components/HomeBanner';
import ProgramPlanning from './components/ProgramPlanning';
import OutstandingResults from './components/OutstandingResults';
import HonorRoll from './components/HonorRoll';
import ParentTestimonials from './components/ParentTestimonials';
import MobileFloatingNav from './components/MobileFloatingNav';
import { PageType, NewsItem } from './types';

// Lazy load heavy page components
const ElementaryPage = lazy(() => import('./components/ElementaryPage'));
const JuniorPage = lazy(() => import('./components/JuniorPage'));
const SeniorPage = lazy(() => import('./components/SeniorPage'));
const BulletinPage = lazy(() => import('./components/BulletinPage'));

// --- MOCK DATA ---

const MOCK_NEWS_BASE: NewsItem[] = [
  {
    id: '1',
    title: '賀！本校學員 113 會考 5A++ 人數創新高',
    summary: '恭喜敦化校區陳O豪、林O真等 15 位同學榮獲 5A++ 作文 6 級分佳績，錄取建中、北一女！',
    content: '狂賀！\n\n育豪資優 113 年會考榜單再創輝煌！\n\n本年度共計 15 位同學獲得 5A++ 滿級分殊榮，全校錄取第一志願比率達 35%。\n\n其中敦化校區陳O豪同學更以總分 36 分、作文 6 級分的完美成績奪得榜首。\n感謝老師們的辛勤指導與同學們的努力不懈。\n\n我們將於下週舉辦頒獎典禮，邀請學長姐回娘家分享讀書心得，傳承成功經驗。',
    image: '', // Will be overridden
    date: '2025-06-15',
    category: 'highlight',
    externalLink: 'https://www.instagram.com/yuhao.school/'
  },
  {
    id: '2',
    title: '狂賀！114 學測滿級分 勇奪台大醫科',
    summary: '高中部張O銘同學以四科 60 級分優異成績，強勢錄取台灣大學醫學系！',
    content: '金榜題名！\n\n恭喜高中部菁英班 張O銘 同學，在 114 學年度學科能力測驗中展現驚人實力，國、英、數A、自然四科皆獲滿級分 (60級分)，並順利通過繁星推薦，錄取國立台灣大學醫學系！\n\n張同學表示：「感謝育豪資優的老師們，特別是物理張志豪老師的觀念引導，讓我在面對素養題時能冷靜分析，找出解題關鍵。」\n\n育豪資優高中部，持續為頂尖大學輸送優秀人才！',
    image: '', // Will be overridden
    date: '2025-03-20',
    category: 'highlight',
    externalLink: 'https://www.instagram.com/yuhao.school/'
  },
  {
    id: '3',
    title: '捷報！全國奧林匹亞數學競賽 金牌三連霸',
    summary: '國小資優班團隊代表參賽，擊敗眾多好手，連續三年榮獲團體組金牌殊榮。',
    content: '實力見證！\n\n本校國小資優數學團隊參加「2024 全國奧林匹亞數學競賽」，在全台 500 多支隊伍中脫穎而出，勇奪團體組金牌！這已經是育豪資優連續第三年獲得此項殊榮。\n\n參賽同學：林O恩(小六)、王O凱(小六)、李O宣(小五)。\n\n指導老師王大明表示：「我們不只教解題技巧，更重視邏輯推演與團隊合作。」\n孩子們的優異表現，再次證明了育豪資優在數理培訓上的專業與領先地位。',
    image: '', // Will be overridden
    date: '2025-04-12',
    category: 'highlight',
    externalLink: 'https://www.instagram.com/yuhao.school/'
  }
];

// --- SPECIFIC IMAGE SETS (Converted to raw=1 for direct access) ---

const HOME_IMAGES = [
  "https://www.dropbox.com/scl/fi/kje8gvmr642sfejxslovh/pic-1.jpg?rlkey=3wt3kclyge1fmjy5bt2lggat2&raw=1",
  "https://www.dropbox.com/scl/fi/mau4zf24fpof2q48kilcf/pic-2.jpg?rlkey=75tycw8sxbaql9uhti1e2kpnd&raw=1",
  "https://www.dropbox.com/scl/fi/mc139monzq1ngj8rj5kwi/pic-3.jpg?rlkey=yhyklzgzo1gdsi4os955daquv&raw=1"
];

const ELEMENTARY_IMAGES = [
  "https://www.dropbox.com/scl/fi/02bku21xf9kcds9976086/250603_-PO-_-_AH_-A.jpg?rlkey=36lldwmj1t91wp5izhm806m96&raw=1",
  "https://www.dropbox.com/scl/fi/2cxysztok0xjwqflocxf3/250813_-_-PO-_AH_01.jpg?rlkey=we58ed84mufdgg08t1yjkjc4r&raw=1",
  "https://www.dropbox.com/scl/fi/d2xelxpkbrwxuz24hoebu/250603_-PO-_-_AH_-A.jpg?rlkey=jzz1uyi20nztjdz2jk0tgn15t&raw=1"
];

const JUNIOR_IMAGES = [
  "https://www.dropbox.com/scl/fi/zw32ughf91fbojjl5segu/pic-11.jpg?rlkey=fd5nq5iehkuq95iq1huksfrjq&raw=1",
  "https://www.dropbox.com/scl/fi/phtn7hq6cxd7x92e0mh5q/pic-12.jpg?rlkey=yi3ty0hwmbb6ysnu8uo362ww2&raw=1",
  "https://www.dropbox.com/scl/fi/mau4zf24fpof2q48kilcf/pic-2.jpg?rlkey=75tycw8sxbaql9uhti1e2kpnd&raw=1"
];

const SENIOR_IMAGES = [
  "https://www.dropbox.com/scl/fi/01n0d94pei1taghllxih6/pic-8.jpg?rlkey=0tqlkcxlw2yqr46elr2aidif5&raw=1",
  "https://www.dropbox.com/scl/fi/zf1dccc6y6k4ebdmpwc59/pic-4.jpg?rlkey=rgqsyiwuwoxz0lu2lk3mtdfpp&raw=1",
  "https://www.dropbox.com/scl/fi/gcnvcfz85ursljtartje4/pic-6.jpg?rlkey=fwleioau7oexj3gfjas7p6rx5&raw=1"
];

// Helper to create page-specific news items
const createPageHighlights = (images: string[], prefix: string): NewsItem[] => {
  return images.map((img, index) => ({
    ...MOCK_NEWS_BASE[index % MOCK_NEWS_BASE.length],
    id: `${prefix}-${index}`,
    image: img,
    externalLink: 'https://www.instagram.com/yuhao.school/'
  }));
};

const HOME_HIGHLIGHTS = createPageHighlights(HOME_IMAGES, 'home');
const ELEMENTARY_HIGHLIGHTS = createPageHighlights(ELEMENTARY_IMAGES, 'elem');
const JUNIOR_HIGHLIGHTS = createPageHighlights(JUNIOR_IMAGES, 'junior');
const SENIOR_HIGHLIGHTS = createPageHighlights(SENIOR_IMAGES, 'senior');

// New Highlights for Bulletin Page
const NEW_HIGHLIGHTS: NewsItem[] = [
  {
    id: 'h-new-1',
    title: '賀！JHMC 國中數學競賽 團體金牌',
    summary: '本校國中數理資優班代表隊勇奪 JHMC 全國總決賽團體金牌，個人賽三人滿分！',
    content: '狂賀！\n\n本校國中數理資優班代表隊參加 JHMC 國中數學競賽，在全國頂尖高手的激烈競爭中脫穎而出，勇奪團體組金牌！\n\n個人賽部分，林O緯、陳O安、張O豪三位同學更以滿分成績榮獲金牌獎。\n\n感謝王大明老師每週日的加強培訓，以及同學們的努力不懈。這份榮耀屬於大家！',
    image: 'https://www.dropbox.com/scl/fi/phtn7hq6cxd7x92e0mh5q/pic-12.jpg?rlkey=yi3ty0hwmbb6ysnu8uo362ww2&raw=1',
    date: '2025-05-20',
    category: 'highlight',
    externalLink: 'https://www.instagram.com/yuhao.school/'
  },
  {
    id: 'h-new-2',
    title: '捷報！北市科展 特優晉級全國',
    summary: '國小資優班「物理實驗組」榮獲北市科展特優，將代表台北市參加全國科展。',
    content: '小小科學家發光發熱！\n\n國小資優班物理實驗組以「水火箭的飛行軌跡研究」為題，榮獲台北市中小學科學展覽會特優！\n\n評審讚賞同學們的研究方法嚴謹，數據分析透徹。特別感謝指導老師張志豪老師的陪伴與指導。\n\n接下來將代表台北市進軍全國科展，預祝同學們再創佳績！',
    image: 'https://www.dropbox.com/scl/fi/nip7i3xceui1mndxsfri6/pic-5.jpg?rlkey=e57w7gbfqfguxilrw0t3k3tc7&raw=1',
    date: '2025-05-15',
    category: 'highlight',
    externalLink: 'https://www.instagram.com/yuhao.school/'
  },
  {
    id: 'h-new-3',
    title: '狂賀！全民英檢中高級 通過率 100%',
    summary: '國三菁英班全體學員通過 GEPT 中高級複試，實力等同大學畢業水準。',
    content: '英語實力最強見證！\n\n本屆國三英文菁英班共 25 位同學，全數通過 GEPT 全民英檢中高級複試！\n\n其中口說與寫作項目，更有 10 位同學獲得滿分評價。\n\nSarah 老師表示：「沉浸式的全美語教學環境，讓孩子們能自然而然地使用英語思考與表達。」恭喜各位同學！',
    image: 'https://www.dropbox.com/scl/fi/zw32ughf91fbojjl5segu/pic-11.jpg?rlkey=fd5nq5iehkuq95iq1huksfrjq&raw=1',
    date: '2025-04-28',
    category: 'highlight',
    externalLink: 'https://www.instagram.com/yuhao.school/'
  },
  {
    id: 'h-new-4',
    title: '霸榜！段考校排前十名 本班包辦七名',
    summary: '敦化國中七年級第一次段考成績揭曉，本班學員表現亮眼，強勢霸榜！',
    content: '實力碾壓，捨我其誰！\n\n敦化國中七年級第一次段考成績出爐，校排前十名中，育豪資優學員強勢包辦七個席次！\n\n校排一：林O軒\n校排二：陳O廷\n校排三：黃O慈\n...\n\n優異的成績絕非偶然，而是透過系統化的複習與精準的考題演練累積而來。恭喜以上獲獎同學！',
    image: 'https://www.dropbox.com/scl/fi/nbwfsiv3oczx8pqve2tim/pic-9.jpg?rlkey=q2lss7ajn2wz8s77kw0fu8zzl&raw=1',
    date: '2025-04-10',
    category: 'highlight',
    externalLink: 'https://www.instagram.com/yuhao.school/'
  },
  {
    id: 'h-new-5',
    title: '賀！APCS 程式設計檢測 實級分人數創新高',
    summary: '高中資訊培訓班學員參加 APCS 檢測，觀念題與實作題皆獲佳績。',
    content: '資訊能力也是升學關鍵！\n\n恭喜高中資訊培訓班學員在最新的 APCS 大學程式設計先修檢測中表現優異。\n\n共有 8 位同學獲得觀念 5 級分、實作 5 級分的滿級分成績！這將成為未來申請頂尖大學資工系的最佳利器。\n\n在這個 AI 時代，程式設計已是必備技能，育豪資優帶領孩子走在科技最前端。',
    image: 'https://www.dropbox.com/scl/fi/ufoxfgm6xe38y84zhfqt2/pic-14.jpg?rlkey=dmiyhj1bacmttqfiocp395qam&raw=1',
    date: '2025-03-05',
    category: 'highlight',
    externalLink: 'https://www.instagram.com/yuhao.school/'
  },
  {
    id: 'h-new-6',
    title: '榮耀！國際發明展 銀牌獎',
    summary: '高中部科研社團參加馬來西亞國際發明展，創意作品榮獲銀牌肯定。',
    content: '創意無限，揚名國際！\n\n高中部科研社團以「智慧型節能路燈系統」為主題，遠赴馬來西亞參加 ITEX 國際發明展，在二十多個國家、上千件作品中脫穎而出，榮獲銀牌獎！\n\n評審對同學們將物理知識應用於解決實際環境問題的創意給予高度評價。\n\n感謝學校與家長的支持，讓孩子們有機會站上國際舞台，開拓視野。',
    image: 'https://www.dropbox.com/scl/fi/5q1mv00gh1bbh4bafwnjq/pic-15.jpg?rlkey=i18oonvk881urja14d9nd18w9&raw=1',
    date: '2025-02-20',
    category: 'highlight',
    externalLink: 'https://www.instagram.com/yuhao.school/'
  }
];

// New Events Items (Category: event)
const EVENT_NEWS_ITEMS: NewsItem[] = [
  {
    id: 'e-1',
    title: '2025 暑期資優數學營：玩出數學力',
    summary: '透過趣味競賽與邏輯遊戲，激發對數學的熱情。從幾何拼圖到邏輯推理，讓孩子愛上思考！',
    content: '暑假不留白，一起來玩數學！\n\n育豪資優特別企劃「暑期資優數學營」，打破枯燥的計算練習，用遊戲引導思考。\n\n課程亮點：\n1. 幾何拼圖挑戰：培養空間概念\n2. 邏輯推理大賽：訓練分析能力\n3. 數感培養課程：建立數字敏銳度\n\n名額有限，早鳥報名享優惠！',
    image: 'https://www.dropbox.com/scl/fi/66jsydgxwxs59agw2uwv5/pic-21.jpg?rlkey=zalfs9l4rwsdq1m02uimebrt5&raw=1',
    date: '2025-07-01',
    category: 'event'
  },
  {
    id: 'e-5',
    title: '大自然生態探索營：陽明山一日遊',
    summary: '走出教室，向大自然學習。在陽明山國家公園進行植物辨識與昆蟲觀察，培養對環境的愛護。',
    content: '讀萬卷書，不如行萬里路！\n\n育豪資優帶領孩子走出冷氣房，前進陽明山國家公園，體驗大自然的奧妙。\n\n活動內容：\n- 常見植物辨識\n- 昆蟲生態觀察\n- 森林步道健行\n- 生態攝影比賽\n\n名額有限，歡迎親子一同參加！',
    image: 'https://www.dropbox.com/scl/fi/bbzjuqls82ti9apn70ejm/pic-22.jpg?rlkey=wh08bk7s53oq85f0z0diupwfg&raw=1',
    date: '2025-05-25',
    category: 'event'
  },
  {
    id: 'e-3',
    title: '高中英文寫作工作坊：突破學測 15 級分',
    summary: '破解學測作文高分祕訣，由資深名師親自指導架構規劃與加分句型，讓你的文字更有感染力。',
    content: '想在學測英文作文拿高分嗎？\n\n本工作坊針對高中生設計，深入解析學測作文評分標準。\n\n講師：Sarah 老師\n\n課程內容：\n- 文章架構規劃技巧\n- 萬用加分句型運用\n- 歷屆佳作賞析\n- 現場實戰演練與批改\n\n一天特訓，掌握寫作關鍵！',
    image: 'https://www.dropbox.com/scl/fi/gcnvcfz85ursljtartje4/pic-6.jpg?rlkey=fwleioau7oexj3gfjas7p6rx5&raw=1',
    date: '2025-06-20',
    category: 'event'
  },
  {
    id: 'e-4',
    title: 'APCS 程式設計先修班：Python 入門',
    summary: '從零開始學 Python，接軌大學資訊課程，培養運算思維與解決問題的能力。',
    content: '程式設計是未來的共通語言！\n\n「APCS 程式設計先修班」專為國高中生打造，零基礎也能輕鬆上手。\n\n適合對象：國中八年級至高中一年級\n\n課程目標：\n- 掌握 Python 基本語法\n- 培養運算思維\n- 訓練解決問題能力\n- APCS 檢測觀念建立\n\n贏在起跑點，就從寫程式開始！',
    image: 'https://www.dropbox.com/scl/fi/qkrpxzx5lbu1ep6vtshwv/pic-10.jpg?rlkey=3wwxzcbmc2pobzsppo9lzxana&raw=1',
    date: '2025-08-05',
    category: 'event'
  },
  {
    id: 'e-2',
    title: '小小科學家實驗班：神奇的化學反應',
    summary: '動手做實驗，探索科學奧秘。親自操作火山爆發模擬、酸鹼值變色龍等趣味實驗。',
    content: '科學好好玩！\n\n為什麼小蘇打加醋會冒泡？紫高麗菜汁為什麼會變色？\n\n「小小科學家實驗班」帶領孩子動手操作，觀察神奇的化學反應。\n\n本期實驗：\n- 火山爆發模擬\n- 酸鹼值變色龍\n- 史萊姆製作\n\n穿上實驗袍，變身小小科學家！',
    image: 'https://www.dropbox.com/scl/fi/7xpir6068ax2ciby0hyy3/pic-7.jpg?rlkey=qusvdgacxmjsc36ufmdov230p&raw=1',
    date: '2025-07-15',
    category: 'event'
  }
];

const MORE_NEWS_ITEMS: NewsItem[] = [
  {
    id: 'n-5',
    title: '春節休假公告',
    summary: '本班於春節期間休假 7 天，祝大家新年快樂。',
    content: '【休假公告】\n\n配合農曆春節假期，本班將於 1/28 (二) 至 2/3 (一) 休假，共計 7 天。\n\n2/4 (二) 恢復正常上課。\n\n預祝大家 新年快樂，學業進步！',
    image: 'https://www.dropbox.com/scl/fi/zf1dccc6y6k4ebdmpwc59/pic-4.jpg?rlkey=rgqsyiwuwoxz0lu2lk3mtdfpp&raw=1',
    date: '2025-01-20',
    category: 'normal'
  },
  {
    id: 'n-1',
    title: '113學年度暑期班開課通知',
    summary: '暑期班將於 7/1 正式開課，請各位家長留意上課時間。',
    content: '親愛的家長您好，113學年度暑期班將於 7/1 (週一) 正式開課。\n\n上課時間：\n早班：09:00 - 12:00\n午班：13:30 - 16:30\n\n請協助提醒孩子攜帶文具與教材。若有請假需求，請提前致電櫃檯。',
    image: 'https://www.dropbox.com/scl/fi/2gyl620emdw7ihecwgz6n/pic-13.jpg?rlkey=oabpnaej0x9rbxypc5ui4dmm1&raw=1',
    date: '2025-06-25',
    category: 'normal'
  },
  {
    id: 'n-2',
    title: '防疫措施公告',
    summary: '為維護師生健康，請配合補習班防疫規定。',
    content: '親愛的家長與同學：\n\n近期流感升溫，為維護大家的健康，請配合以下防疫措施：\n1. 進入補習班請佩戴口罩。\n2. 若有發燒或感冒症狀，請在家休息。\n3. 教室定期消毒，請安心上課。\n\n感謝您的配合。',
    image: 'https://www.dropbox.com/scl/fi/yacybf07znbif857xk29o/pic-16.jpg?rlkey=su4eyhtgdtm5vfa94wm01ioda&raw=1',
    date: '2025-06-10',
    category: 'normal'
  },
  {
    id: 'n-7',
    title: '夏日消暑綠豆湯',
    summary: '炎炎夏日，補習班貼心準備冰涼綠豆湯，為同學消暑解渴。',
    content: '夏天到了，天氣好熱！\n\n為了讓同學能更專心上課，補習班貼心準備了冰涼消暑的綠豆湯，將於下週起每週三下午供應。\n\n請同學自備環保杯，一起愛地球！',
    image: 'https://www.dropbox.com/scl/fi/tmeihc1i24pd596i672ot/pic-19.jpg?rlkey=1sm9qd7srr5lg3tlfzows5pqj&raw=1',
    date: '2025-06-01',
    category: 'normal'
  },
  {
    id: 'n-8',
    title: '優良學生表揚大會',
    summary: '恭喜本期表現優異的同學，將於週六舉行頒獎典禮。',
    content: '榮譽時刻！\n\n本期優良學生名單已公佈，恭喜所有獲獎同學！\n\n我們將於本週六上午 10:00 舉行頒獎典禮，頒發獎狀與獎學金，以資鼓勵。\n\n期許大家繼續保持，再接再厲！',
    image: 'https://www.dropbox.com/scl/fi/01n0d94pei1taghllxih6/pic-8.jpg?rlkey=0tqlkcxlw2yqr46elr2aidif5&raw=1',
    date: '2025-04-15',
    category: 'normal'
  },
  {
    id: 'n-3',
    title: '國中部段考加強班',
    summary: '第一次段考將至，本班特別開設考前加強班，歡迎同學參加。',
    content: '面對第一次段考感到緊張嗎？\n\n育豪資優特別開設「段考加強班」，針對各校版本重點複習，並提供精選試題演練。\n\n時間：每週六日下午 13:30 - 16:30\n地點：各分校教室\n\n請洽櫃檯報名。',
    image: 'https://www.dropbox.com/scl/fi/azaky2ebmuypp1phmrb74/pic-17.jpg?rlkey=l4nio8m2se2oygtfmgmwewtea&raw=1',
    date: '2025-09-20',
    category: 'normal'
  },
  {
    id: 'n-6',
    title: '母親節感恩活動',
    summary: '感謝辛勞的媽媽，本班舉辦母親節卡片製作活動。',
    content: '溫馨五月天，感恩母親節。\n\n為了感謝媽媽的辛勞，我們將在課堂上帶領孩子製作母親節卡片，寫下對媽媽的愛與感謝。\n\n歡迎家長屆時欣賞孩子的作品！',
    image: 'https://www.dropbox.com/scl/fi/37ni6uiuda2e5hztudoox/pic-20.jpg?rlkey=ij206dn25tx2texel3aa1v4cr&raw=1',
    date: '2025-05-01',
    category: 'normal'
  },
  {
    id: 'n-4',
    title: '親師座談會邀請',
    summary: '誠摯邀請家長參加本學期親師座談會，了解孩子的學習狀況。',
    content: '親愛的家長：\n\n為了讓您更了解孩子在補習班的學習狀況與升學規劃，我們將舉辦親師座談會。\n\n時間：2025/10/15 (六) 10:00 - 12:00\n地點：本班大禮堂\n\n歡迎撥冗參加。',
    image: 'https://www.dropbox.com/scl/fi/p95ekvg6xcvk4ao48ul52/pic-18.jpg?rlkey=hnyzw6tki59326n3i8ytevcdr&raw=1',
    date: '2025-10-01',
    category: 'normal'
  }
];

// Combined news for the News Page
const ALL_NEWS: NewsItem[] = [
  ...HOME_HIGHLIGHTS,
  ...NEW_HIGHLIGHTS, // 6 highlight items
  ...MORE_NEWS_ITEMS, // 8 normal items
  ...EVENT_NEWS_ITEMS // 5 event items
];

// --- APP COMPONENT ---

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle browser back button (optional, simple implementation)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Scroll To Top Logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading Component for Suspense
  const LoadingScreen = () => (
    <div className="flex items-center justify-center min-h-[50vh] w-full">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">載入中...</p>
      </div>
    </div>
  );

  const renderContent = () => {
    return (
      <Suspense fallback={<LoadingScreen />}>
        {currentPage === 'elementary' && (
          <ElementaryPage 
            heroNews={ELEMENTARY_HIGHLIGHTS}
            onNavigate={setCurrentPage}
          />
        )}
        {currentPage === 'junior' && (
          <JuniorPage 
            heroNews={JUNIOR_HIGHLIGHTS}
            onNavigate={setCurrentPage}
          />
        )}
        {currentPage === 'senior' && (
          <SeniorPage 
            heroNews={SENIOR_HIGHLIGHTS}
            onNavigate={setCurrentPage}
          />
        )}
        {currentPage === 'bulletin' && (
          <BulletinPage 
            news={ALL_NEWS} 
          />
        )}
        {currentPage === 'home' && (
          <>
            <Hero 
              title={
                <>
                  <span className="block mb-2">啟發潛能</span>
                  <span className="text-primary-600 block">成就未來</span>
                </>
              } 
              subtitle="從國小到高中的完整規劃，陪伴孩子每個成長階段！讓學習成為一種享受，讓進步看得見！"
              newsItems={HOME_HIGHLIGHTS}
              onNavigate={setCurrentPage}
              showQuickLinks={true}
              gradeLabel="讀好書.交好友"
              courseLabel="品德優先.成績第一"
            />
            <HomeBanner />
            <Features />
            <ProgramPlanning onNavigate={setCurrentPage} />
            <OutstandingResults />
            <HonorRoll />
            <ParentTestimonials />
          </>
        )}
      </Suspense>
    );
  };

  const getPageTheme = (): 'primary' | 'green' | 'blue' | 'purple' => {
    switch (currentPage) {
      case 'elementary': return 'green';
      case 'junior': return 'blue';
      case 'senior': return 'purple';
      default: return 'primary';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative">
      <Header 
        onNavigate={setCurrentPage} 
        currentPage={currentPage} 
        onOpenChat={() => setIsChatOpen(true)}
      />
      
      <main>
        {renderContent()}
        <ContactForm theme={getPageTheme()} />
      </main>

      <Footer />
      <ChatBot isOpen={isChatOpen} onToggle={setIsChatOpen} />
      
      {/* Mobile Nav including ScrollTop & Chat buttons */}
      <MobileFloatingNav 
        currentPage={currentPage} 
        theme={getPageTheme()} 
        onOpenChat={() => setIsChatOpen(true)}
        showScrollTop={showScrollTop}
        onScrollTop={scrollToTop}
      />

      {/* Scroll To Top Button - Desktop Only */}
      <button
        onClick={scrollToTop}
        className={`hidden md:flex fixed bottom-24 right-6 z-30 p-3 rounded-full bg-white shadow-lg border border-slate-200 text-slate-600 hover:text-primary-600 hover:border-primary-600 transition-all duration-300 transform ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
}

export default App;
