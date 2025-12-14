
import React, { useState, useRef } from 'react';
import { Calculator, Languages, BookOpen, Rocket, ArrowRight, FlaskConical, ChevronLeft, ChevronRight, FileText, Clock, Users, Calendar, Map, Target, CheckCircle2, ChevronUp, ChevronsDown } from 'lucide-react';
import BrochureViewer from './BrochureViewer';
import Modal from './Modal';

const BROCHURE_IMAGES = [
  "https://www.dropbox.com/scl/fi/5bo3d78bk5ygpww4xx7oo/251202_-_-DM_AH_01.jpg?rlkey=n6914auenialxg11u9tlv4dv1&raw=1",
  "https://www.dropbox.com/scl/fi/18rfzi9vqv67a0j5rufhd/251202_-_-DM_AH_02.jpg?rlkey=j35bxn0slkh7ubwtp56bp7un3&raw=1"
];

const COURSE_DATA = [
  {
    id: 'math',
    label: '數學',
    description: '數學不僅是計算，更是邏輯思維的訓練。育豪國中部數學課程強調「觀念理解」與「嚴謹推演」，從國七的代數基礎到國八的幾何證明，循序漸進建立完整的數學架構。我們深入分析各版本教科書與歷屆會考題型，透過獨創的圖解教學與系統化筆記，引導學生突破思考盲點，培養舉一反三的解題能力，讓數學成為會考最強的得分利器。',
    icon: <Calculator size={20} />,
    color: 'text-blue-500', 
    classes: [
      { name: '國七數學班', desc: '銜接國小數學，建立代數觀念基礎', age: '國七', time: '週二/五 18:30' },
      { name: '國八數學班', desc: '幾何圖形證明與乘法公式精熟', age: '國八', time: '週三/六 18:30' },
      { name: '國九數學班', desc: '總複習與模考演練，衝刺A++', age: '國九', time: '週日 09:00' },
    ]
  },
  {
    id: 'english',
    label: '英文',
    description: '英語是接軌國際的必備工具。課程著重於紮實的文法架構建立與閱讀測驗技巧訓練，並透過系統化教學大幅擴充會考必備單字量。結合時事議題與跨領域主題教學，提升長篇閱讀理解與聽力實戰能力。我們不只教考試技巧，更培養語感，讓學生在面對會考素養題型時能游刃有餘，輕鬆拿下 A++。',
    icon: <Languages size={20} />,
    color: 'text-purple-400', 
    classes: [
      { name: '國七英文班', desc: '基礎文法與句型架構建立', age: '國七', time: '週一/四 18:30' },
      { name: '國八英文班', desc: '進階閱讀與克漏字解析技巧', age: '國八', time: '週二/五 18:30' },
      { name: '國九英文班', desc: '會考題型全攻略，聽讀實力養成', age: '國九', time: '週六 13:30' },
    ]
  },
  {
    id: 'chinese',
    label: '國文',
    description: '面對素養導向的國文命題，閱讀理解是關鍵。課程精選古文觀止與現代文學名篇，深入解析文章意涵與寫作背景，提升閱讀素養與批判性思考能力。針對會考作文，提供模組化的寫作架構與修辭技巧指導，引導學生從生活經驗出發，運用名言佳句豐富內容，精準掌握評分標準，寫出有深度、有溫度的佳作。',
    icon: <BookOpen size={20} />,
    color: 'text-teal-400', 
    classes: [
      { name: '國七國文班', desc: '閱讀素養與基礎寫作訓練', age: '國七', time: '週六 13:30' },
      { name: '國八國文班', desc: '文言文閱讀理解與修辭應用', age: '國八', time: '週六 15:30' },
      { name: '國九國文班', desc: '會考重點複習與作文衝刺', age: '國九', time: '週六 18:30' },
    ]
  },
  {
    id: 'science',
    label: '自然',
    description: '自然科包含生物、理化與地科，範圍廣且觀念抽象。育豪自然團隊堅持「觀念重於死背」，透過生動的實驗演示與圖解教學，將抽象的科學原理具象化，讓學生深刻理解自然現象背後的成因。課程緊扣會考趨勢，強化跨科整合與圖表分析能力，幫助學生釐清易混淆觀念，輕鬆應對靈活多變的素養題型。',
    icon: <FlaskConical size={20} />,
    color: 'text-orange-400', 
    classes: [
      { name: '國七生物班', desc: '生命科學與生態環境探討', age: '國七', time: '週六 10:00' },
      { name: '國八理化班', desc: '物理化學基礎觀念與計算', age: '國八', time: '週六 13:30' },
      { name: '國九理化班', desc: '力學、電學與地科總整理', age: '國九', time: '週五 18:30' },
    ]
  },
  {
    id: 'sprint',
    label: '寒暑衝刺',
    description: '寒暑假是超前進度與弭平落差的黃金時期。我們規劃了紮實的銜接課程與考前衝刺班，利用假期進行重點單元的預習或複習。提供安靜舒適的 K 書中心與專職導師的解惑輔導，營造專注的讀書氛圍。透過規律的作息安排與高強度的模擬考演練，幫助學生調整最佳備戰狀態，贏在起跑點。',
    icon: <Rocket size={20} />,
    color: 'text-red-400', 
    classes: [
      { name: '新生銜接課程', desc: '國小升國中暑期先修，贏在起跑點', age: '小六升國七', time: '暑期 09:00' },
      { name: '模考K書班', desc: '模擬考前密集複習與解題輔導', age: '國七 ~ 國九', time: '考前週日' },
      { name: '國九考衝班', desc: '會考前最後衝刺，精準猜題', age: '國九', time: '考前一個月' },
    ]
  }
];

const TIMELINE_DATA = [
  { 
    grade: '小六升國七', 
    subtitle: '國中銜接啟動期', 
    goal: '提前適應 × 降低轉換焦慮', 
    courses: ['國中銜接課程（國文／英文／數學／自然）', '國中學習方法與時間管理指導', '暑期銜接先修班'] 
  },
  { 
    grade: '國中七年級', 
    subtitle: '打穩基礎關鍵年', 
    goal: '建立學科根基 × 穩定學習節奏', 
    courses: ['國七國文系統閱讀與寫作', '國七英文文法 × 閱讀 × 單字養成', '國七數學觀念理解與題型練習', '國七自然（生物／理化入門）', '寒暑假基礎強化班'] 
  },
  { 
    grade: '升國中八年級', 
    subtitle: '能力銜接強化期', 
    goal: '補弱扶強 × 銜接進階內容', 
    courses: ['國七總複習銜接課程', '國八先修課程（數學／英文／自然）', '暑期衝刺強化班'] 
  },
  { 
    grade: '國中八年級', 
    subtitle: '實力拉開差距期', 
    goal: '深化理解 × 提升解題能力', 
    courses: ['國八國文閱讀理解與寫作深化', '國八英文文法整合 × 閱讀理解', '國八數學重點單元強化', '國八自然（理化、生物）系統訓練', '寒暑假實力提升班'] 
  },
  { 
    grade: '升國中九年級', 
    subtitle: '會考準備啟動期', 
    goal: '重點整合 × 提前布局會考', 
    courses: ['國中全科重點銜接課程', '國九先修課程（國／英／數／自然）', '暑期會考基礎啟動班'] 
  },
  { 
    grade: '國中九年級', 
    subtitle: '會考衝刺關鍵期', 
    goal: '穩定輸出 × 精準得分', 
    courses: ['國九全科會考複習班', '模擬考解析與學習追蹤', '會考衝刺班／寒假總複習班'] 
  },
  { 
    grade: '升高中', 
    subtitle: '銜接新階段，提前準備', 
    goal: '平穩過渡 × 預備高中課程', 
    courses: ['高中先修銜接課程（數學／英文／自然）', '高中學習方法與課程規劃指導'] 
  },
];

const JuniorCourseRoadmap: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const nextTab = () => {
    setActiveTab((prev) => (prev + 1) % COURSE_DATA.length);
  };

  const prevTab = () => {
    setActiveTab((prev) => (prev - 1 + COURSE_DATA.length) % COURSE_DATA.length);
  };

  const handleTogglePlan = () => {
    if (!isPlanOpen) {
      // Opening
      setIsPlanOpen(true);
      setTimeout(() => {
        if (timelineRef.current) {
          const y = timelineRef.current.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Closing
      handleCollapse();
    }
  };

  const handleCollapse = () => {
    // Scroll back to top of section first
    if (sectionRef.current) {
      const y = sectionRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    // Delay closing to allow scroll to complete visibly
    setTimeout(() => {
      setIsPlanOpen(false);
    }, 500);
  };

  // Generate Mock Schedule Data
  const generateSchedule = (cls: any) => {
    const daysMap: Record<string, string> = { '週一': 'Mon', '週二': 'Tue', '週三': 'Wed', '週四': 'Thu', '週五': 'Fri', '週六': 'Sat', '週日': 'Sun' };
    let primaryDay = '週六';
    for (const d of Object.keys(daysMap)) {
      if (cls.time.includes(d)) {
        primaryDay = d;
        break;
      }
    }

    const topics = [
      '課程介紹 & 重點觀念建立',
      '核心單元導讀 & 範例解析',
      '精選試題演練 (一)',
      '精選試題演練 (二)',
      '進階題型解析與實作',
      '歷屆會考題型分析',
      '模擬測驗與檢討',
      '階段性總結評量'
    ];

    return Array.from({ length: 8 }).map((_, i) => ({
      date: `07/${String(i * 7 + 5).padStart(2, '0')}`,
      day: primaryDay,
      time: cls.time.includes(':') ? cls.time.split(' ')[1] + '-' + (parseInt(cls.time.split(' ')[1].split(':')[0]) + 3) + ':00' : '18:30-21:30',
      unit: `第 ${i+1} 單元`,
      courseName: topics[i]
    }));
  };

  const commonNotes = [
    "請準時出席，遲到超過 15 分鐘請先至櫃檯報到。",
    "請攜帶指定教材、筆記本與文具用品。",
    "課堂中請勿使用手機，並將手機轉為靜音。",
    "請假請提前 24 小時告知，以利安排補課。",
    "補習班保有課程異動之權利，如有變動將另行通知。"
  ];

  return (
    <section ref={sectionRef} id="course-roadmap" className="py-20 bg-blue-600 scroll-mt-24 relative overflow-hidden">
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-5 md:mb-12">
          <h2 className="text-blue-200 font-bold tracking-wide uppercase text-sm mb-3">育豪資優</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white">國中課程規劃</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:gap-8">
          
          {/* Mobile Navigation (Arrows) */}
          <div className="md:hidden flex flex-col gap-4">
            <div className="flex items-center justify-between bg-blue-700/50 rounded-xl p-2 backdrop-blur-sm border border-blue-500/30">
              <button 
                onClick={prevTab}
                className="p-3 rounded-lg text-white hover:bg-blue-600 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex items-center gap-2">
                <span className={`p-2 rounded-full ${COURSE_DATA[activeTab].color.replace('text-', 'bg-').replace('500', '100').replace('400', '100')} text-blue-900`}>
                  {React.cloneElement(COURSE_DATA[activeTab].icon as React.ReactElement, { size: 20, className: 'text-blue-900' })}
                </span>
                <span className="text-xl font-bold text-white">{COURSE_DATA[activeTab].label}</span>
              </div>
              <button 
                onClick={nextTab}
                className="p-3 rounded-lg text-white hover:bg-blue-600 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Desktop/Tablet Sidebar Tabs */}
          <div className="hidden md:flex md:w-1/4 flex-col gap-2">
            {COURSE_DATA.map((subject, index) => (
              <button
                key={subject.id}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2 lg:gap-3 px-3 py-3 lg:px-6 lg:py-4 rounded-xl transition-all whitespace-nowrap text-left ${
                  activeTab === index 
                    ? `bg-white text-blue-900 shadow-lg font-bold transform scale-105` 
                    : 'bg-blue-700/50 text-blue-100 hover:bg-blue-700 border border-blue-500/30'
                }`}
              >
                <span className={`p-1.5 lg:p-2 rounded-full ${activeTab === index ? 'bg-blue-100 text-blue-600' : 'bg-blue-800 text-blue-300'} shrink-0`}>
                   {React.cloneElement(subject.icon as React.ReactElement, { size: 18 })}
                </span>
                <span className="text-sm lg:text-lg truncate">{subject.label}</span>
              </button>
            ))}

            {/* Desktop Action Buttons */}
            <button
              onClick={() => setIsBrochureOpen(true)}
              className="mt-4 flex items-center justify-center gap-2 px-6 py-4 rounded-xl transition-all bg-yellow-400 text-blue-900 font-bold hover:bg-yellow-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <FileText size={20} />
              <span className="text-lg">查閱簡章</span>
            </button>

            <button
              onClick={handleTogglePlan}
              className={`mt-2 flex items-center justify-center gap-2 px-6 py-4 rounded-xl transition-all font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                isPlanOpen 
                  ? 'bg-white text-blue-800 ring-2 ring-white' 
                  : 'bg-blue-800 text-white hover:bg-blue-700 border border-blue-600'
              }`}
            >
              <Map size={20} />
              <span className="text-lg">完整規劃</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="md:w-3/4">
            
            {/* Category Description */}
            <div className="mb-8 animate-in fade-in duration-300">
               <p className="text-blue-50 leading-relaxed md:leading-loose text-base md:text-lg font-medium text-justify">
                  {COURSE_DATA[activeTab].description}
               </p>
            </div>

            {/* Class Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
              {COURSE_DATA[activeTab].classes.map((cls, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-blue-100 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full"
                >
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {cls.name}
                    </h4>

                    {/* Meta Tags: Age & Time */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-blue-50 px-2.5 py-1.5 rounded-md border border-blue-100">
                         <Users size={14} className="text-blue-600" /> 
                         <span>{cls.age}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-blue-50 px-2.5 py-1.5 rounded-md border border-blue-100">
                         <Clock size={14} className="text-blue-600" /> 
                         <span>{cls.time}</span>
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {cls.desc}
                    </p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-auto">
                     <button 
                       onClick={() => setSelectedClass(cls)}
                       className="flex-1 py-2.5 rounded-lg bg-blue-50 text-blue-700 text-sm font-bold hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5 border border-blue-200"
                     >
                        查看課表 <Calendar size={14} />
                     </button>
                     <a 
                       href="#contact"
                       className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors text-center flex items-center justify-center gap-1.5 shadow-md shadow-blue-200"
                     >
                        立即報名 <ArrowRight size={14} />
                     </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Action Buttons (Moved below cards) */}
             <div className="grid grid-cols-2 gap-3 mt-6 md:hidden">
               <button
                onClick={() => setIsBrochureOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all bg-yellow-400 text-blue-900 font-bold hover:bg-yellow-300 shadow-sm"
              >
                <FileText size={18} />
                <span>查閱簡章</span>
              </button>
              <button
                onClick={handleTogglePlan}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all font-bold shadow-sm ${isPlanOpen ? 'bg-white text-blue-700' : 'bg-blue-700 text-white border border-blue-500'}`}
              >
                <Map size={18} />
                <span>完整規劃</span>
              </button>
             </div>

          </div>
        </div>

        {/* Full Plan Timeline Section (Vertical Centered) */}
        {isPlanOpen && (
          <div ref={timelineRef} className="mt-16 py-12 px-4 md:px-12 bg-white rounded-3xl shadow-xl animate-in fade-in slide-in-from-top-4 duration-500">
             <div className="flex flex-col items-center justify-center gap-2 mb-16 md:mb-20">
               <div className="flex items-center gap-3">
                 <Map className="text-blue-600" size={32} />
                 <h3 className="text-2xl md:text-3xl font-extrabold text-blue-800 text-center">國中完整學習規劃路徑</h3>
               </div>
               <p className="text-slate-500 font-medium">三年扎根，穩健迎戰升學關鍵</p>
             </div>
             
             {/* Timeline Container: padding-bottom 12 (48px) to reserve space for rocket */}
             <div className="relative max-w-5xl mx-auto pt-4 md:pt-10 pb-12">
                {/* Central Line (Desktop) - Ends at 24px from bottom (bottom-6) which is center of rocket */}
                <div className="absolute left-1/2 top-0 bottom-6 w-1 bg-blue-100 -translate-x-1/2 rounded-full hidden md:block"></div>
                
                {/* Side Line (Mobile) - Ends at 24px from bottom (bottom-6) */}
                <div className="absolute left-6 top-0 bottom-6 w-1 bg-blue-100 -translate-x-1/2 rounded-full md:hidden"></div>

                {/* NEW: Start Icon - Bouncing ChevronsDown */}
                <div className="absolute top-0 left-6 md:left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                   <div className="bg-blue-50 p-2 rounded-full border-2 border-blue-100 animate-bounce shadow-sm">
                      <ChevronsDown size={20} className="text-blue-600" />
                   </div>
                </div>
                
                <div className="space-y-8 md:space-y-16 mb-8"> 
                   {TIMELINE_DATA.map((step, idx) => (
                      <div key={idx} className={`flex flex-col md:flex-row items-center md:justify-between relative ${idx % 2 !== 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                         
                         {/* Side Content: Recommended Course Direction (Desktop Only) */}
                         <div className={`hidden md:flex w-5/12 flex-col justify-center ${idx % 2 !== 0 ? 'items-end text-right' : 'items-start text-left'}`}>
                            <div className={`flex items-center gap-2 text-amber-500 font-bold mb-2 ${idx % 2 !== 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                               <span className="font-bold text-lg">推薦選課方向</span>
                               <CheckCircle2 size={20} />
                            </div>
                            <ul className="space-y-2">
                                {step.courses.map(c => (
                                    <li key={c} className={`text-slate-600 font-medium hover:text-blue-600 transition-colors ${idx % 2 !== 0 ? 'mr-1' : 'ml-1'}`}>
                                        {c}
                                    </li>
                                ))}
                            </ul>
                         </div>
                         
                         {/* Center Dot */}
                         <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-yellow-400 border-4 border-blue-50 z-10 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                             <div className="w-2 h-2 bg-blue-800 rounded-full"></div>
                         </div>

                         {/* Main Content Card */}
                         <div className={`w-[calc(100%-4rem)] ml-auto md:ml-0 md:w-5/12 group`}>
                            <div className={`bg-blue-50 rounded-2xl p-6 border border-blue-100 hover:bg-blue-100 transition-all hover:-translate-y-1 hover:shadow-lg relative flex flex-col ${idx % 2 !== 0 ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
                                
                                {/* Step Label */}
                                <span className="inline-block px-3 py-1 bg-white rounded-lg text-blue-700 text-xs font-bold mb-3 border border-blue-200">
                                  Step {idx + 1}
                                </span>
                                
                                <h4 className="text-xl md:text-2xl font-bold text-blue-900 mb-1">{step.grade}</h4>
                                <p className="text-blue-700 font-bold text-sm md:text-base mb-4 tracking-wide">{step.subtitle}</p>
                                
                                <div className={`w-16 h-1.5 bg-yellow-400 rounded-full mb-5 opacity-90`}></div>
                                
                                <div className="w-full space-y-4">
                                    {/* Goal Section */}
                                    <div className={`text-sm md:text-base bg-white p-3 rounded-xl border border-blue-200 ${idx % 2 !== 0 ? 'md:text-left' : 'md:text-right'}`}>
                                        <div className={`flex items-center gap-2 text-amber-500 font-bold mb-1.5 ${idx % 2 !== 0 ? '' : 'md:flex-row-reverse'}`}>
                                            <Target size={16} />
                                            <span>學習目標</span>
                                        </div>
                                        <p className="text-slate-600 font-medium">{step.goal}</p>
                                    </div>

                                    {/* Mobile Only: Courses Section inside card */}
                                    <div className="md:hidden pt-4 border-t border-blue-200/50 mt-2">
                                        <div className="flex items-center gap-2 text-amber-500 font-bold mb-2">
                                            <CheckCircle2 size={16} />
                                            <span>推薦選課方向</span>
                                        </div>
                                        <ul className="space-y-1.5">
                                            {step.courses.map(c => (
                                                <li key={c} className="flex items-center gap-2 text-slate-700 text-sm">
                                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>
                                                    {c}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>

                {/* Bouncing Rocket Icon - Absolute position at bottom-0 */}
                <div className="absolute bottom-0 left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-12 h-12 bg-white border-4 border-blue-100 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <Rocket className="text-blue-600 w-6 h-6" />
                  </div>
                </div>
             </div>

             {/* Collapse Button - Moved OUTSIDE the timeline container */}
             <div className="flex justify-center mt-4">
                <button 
                  onClick={handleCollapse}
                  className="flex items-center gap-2 text-slate-500 hover:text-blue-700 transition-colors py-3 px-6 rounded-full hover:bg-slate-100 text-sm font-medium"
                >
                  <ChevronUp size={16} />
                  收起時間軸
                </button>
             </div>
          </div>
        )}
      </div>
      
      <BrochureViewer 
        isOpen={isBrochureOpen} 
        onClose={() => setIsBrochureOpen(false)} 
        images={BROCHURE_IMAGES} 
      />

      {/* Schedule Modal */}
      <Modal
        isOpen={!!selectedClass}
        onClose={() => setSelectedClass(null)}
        title={selectedClass ? `${selectedClass.name} - 課程表` : '課程表'}
        maxWidth="max-w-4xl"
      >
        {selectedClass && (
          <div className="space-y-6">
             {/* Info Header */}
             <div className="flex flex-wrap gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2">
                   <span className="text-slate-500 font-bold text-sm">上課對象：</span>
                   <span className="text-slate-900 font-medium">{selectedClass.age}</span>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-slate-500 font-bold text-sm">上課時間：</span>
                   <span className="text-slate-900 font-medium">{selectedClass.time}</span>
                </div>
             </div>

             {/* Schedule Table */}
             <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left min-w-[600px]">
                       <thead className="bg-slate-100 text-slate-700 font-bold uppercase">
                          <tr>
                             <th className="px-4 py-3 whitespace-nowrap">日期</th>
                             <th className="px-4 py-3 whitespace-nowrap">星期</th>
                             <th className="px-4 py-3 whitespace-nowrap">時間</th>
                             <th className="px-4 py-3 whitespace-nowrap">單元名稱</th>
                             <th className="px-4 py-3 whitespace-nowrap">課程名稱</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          {generateSchedule(selectedClass).map((row, idx) => (
                             <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                <td className="px-4 py-3 font-medium text-slate-900">{row.date}</td>
                                <td className="px-4 py-3 text-slate-500">{row.day}</td>
                                <td className="px-4 py-3 text-slate-500">{row.time}</td>
                                <td className="px-4 py-3 text-blue-600 font-bold">{row.unit}</td>
                                <td className="px-4 py-3 text-slate-700">{row.courseName}</td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                </div>
             </div>

             {/* Notes */}
             <div>
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                   <div className="w-1.5 h-6 bg-yellow-400 rounded-full"></div>
                   課程注意事項
                </h4>
                <ul className="space-y-2 bg-yellow-50 p-5 rounded-xl text-slate-700 text-sm border border-yellow-100">
                   {commonNotes.map((note, i) => (
                      <li key={i} className="flex items-start gap-2">
                         <span className="text-yellow-500 font-bold">•</span>
                         {note}
                      </li>
                   ))}
                </ul>
             </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default JuniorCourseRoadmap;
