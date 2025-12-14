
// ... (imports remain same)
import React, { useState, useRef } from 'react';
import { Rocket, TrendingUp, Crown, Zap, ArrowRight, ChevronLeft, ChevronRight, FileText, Clock, Users, Calendar, Map, Target, CheckCircle2, ChevronUp } from 'lucide-react';
import BrochureViewer from './BrochureViewer';

// ... (constants remain same)
const BROCHURE_IMAGES = [
  "https://www.dropbox.com/scl/fi/4x16xwu4vfqvpb66uhf9g/250325_02_114-A3-_-_02-728x1030.jpg?rlkey=903e438du7nwl2zxdvtuhkz0g&raw=1",
  "https://www.dropbox.com/scl/fi/y9rcf40o9pitgvjd7jf52/250430_114-A3-_-_B_-_-_01-729x1030.jpg?rlkey=biml4jgq8djcs680m2yqjp2u3&raw=1",
  "https://www.dropbox.com/scl/fi/3s5k7qr7ktc0rfh27v1z2/250430_114-A3-_-_B_-_-_02-729x1030.jpg?rlkey=7fzoxarncbiz63gbdttaj5iar&raw=1",
  "https://www.dropbox.com/scl/fi/30exwirm2iyfnaug61hzw/251204_-K-_02.jpg?rlkey=xlzhjv4d038j09siau6fkqpps&raw=1",
  "https://www.dropbox.com/scl/fi/e5ns81cucqjhw9v65h8jz/251204_-K-_03.jpg?rlkey=ytefc19dpfvy7vj49da6lvnhf&raw=1"
];

const COURSE_DATA = [
  {
    id: 'g10',
    label: '升高一',
    description: '高一是銜接國高中課程的關鍵期。課程首重弭平學科落差，強化核心觀念的建構。針對新課綱素養導向，我們引導學生調整讀書方法，培養自主學習與探究實作的能力。透過加深加廣的課程內容，為高中三年的學業奠定堅實基礎，並協助學生探索興趣，提早規劃未來的升學方向。',
    icon: <Rocket size={20} />,
    color: 'text-green-500', 
    classes: [
      { name: '高一數學班', desc: '銜接教材與基礎觀念建立，邏輯訓練', age: '高一', time: '週一/四 18:30' },
      { name: '高一英文班', desc: '字彙量擴充與長篇閱讀技巧', age: '高一', time: '週二/五 18:30' },
      { name: '高一國文班', desc: '古文觀止與閱讀素養導讀', age: '高一', time: '週六 13:30' },
      { name: '高一物化班', desc: '基礎物理化學觀念建構與實驗', age: '高一', time: '週六 10:00' },
    ]
  },
  {
    id: 'g11',
    label: '升高二',
    description: '高二面臨選組分流與課程加深的挑戰。我們提供分流分班的專業教學，全面提升各科的深度與廣度，建立強大的學科自信。同步輔導學生累積高品質的學習歷程檔案，並透過專業諮詢協助釐清科系志向。在鞏固校內成績的同時，提前為學測與申請入學累積競爭優勢。',
    icon: <TrendingUp size={20} />,
    color: 'text-blue-500', 
    classes: [
      { name: '高二數學班', desc: '代數、幾何進階與三角函數', age: '高二', time: '週二/五 18:30' },
      { name: '高二英文班', desc: '進階文法與寫作架構訓練', age: '高二', time: '週一/四 18:30' },
      { name: '高二國文班', desc: '國學常識與深究鑑賞', age: '高二', time: '週六 10:00' },
      { name: '高二物化班', desc: '力學、電磁學與化學反應速率', age: '高二', time: '週六 13:30' },
    ]
  },
  {
    id: 'g12',
    label: '升高三',
    description: '進入高三備戰狀態，我們提供全方位的學測複習規劃與模擬考實戰演練。精準掌握最新的大考命題趨勢，透過大量題型練習提升解題速度與準確率。針對個人弱點進行精準補強，並提供申請入學的模擬面試與備審資料一對一輔導，全力協助學生在學測與分科測驗中脫穎而出，直攻頂尖大學。',
    icon: <Crown size={20} />,
    color: 'text-purple-500', 
    classes: [
      { name: '高三數學班', desc: '學測範圍總複習與難題解析', age: '高三', time: '週六 13:30' },
      { name: '高三英文班', desc: '模擬試題演練與翻譯寫作衝刺', age: '高三', time: '週六 10:00' },
      { name: '高三國文班', desc: '混合題型與知性情意作文攻略', age: '高三', time: '週日 09:00' },
      { name: '高三物化班', desc: '自然科綜合題型與跨科整合', age: '高三', time: '週五 18:30' },
    ]
  },
  {
    id: 'sprint',
    label: '寒暑衝刺',
    description: '把握寒暑假與考前的黃金衝刺期，集中火力進行高強度的密集訓練。我們提供嚴謹的作息管理與安靜的 K 書環境，營造良性競爭的讀書氛圍。透過地毯式的重點複習與擬真模考，搭配專業老師的即時解惑，幫助學生在短時間內大幅提升實力，穩定軍心，以最佳狀態迎戰大考。',
    icon: <Zap size={20} />,
    color: 'text-red-500', 
    classes: [
      { name: '模考K書班', desc: '仿真模擬考與專人解惑輔導', age: '高一 ~ 高三', time: '考前/週日' },
      { name: '考前總複習班', desc: '重點觀念地毯式複習與猜題', age: '高三', time: '考前衝刺' },
    ]
  }
];

const TIMELINE_DATA = [
  { 
    grade: '升高中', 
    subtitle: '高中先修與學習轉換期', 
    goal: '提前起跑 × 適應高中節奏', 
    courses: ['高中先修課程（國文／英文／數學／物理／化學）', '高中學習方法與時間管理指導', '暑期銜接先修班'] 
  },
  { 
    grade: '高一', 
    subtitle: '基礎扎根關鍵年', 
    goal: '觀念建立 × 穩定輸出', 
    courses: ['高一國文閱讀理解與寫作訓練', '高一英文文法 × 閱讀 × 字彙累積', '高一數學觀念建構與題型練習', '高一物理／化學基礎課程', '寒暑假基礎強化班'] 
  },
  { 
    grade: '升高二', 
    subtitle: '能力整合與銜接期', 
    goal: '補強弱點 × 銜接進階內容', 
    courses: ['高一總複習銜接課程', '高二先修課程（數學／物理／化學／英文）', '暑期實力銜接班'] 
  },
  { 
    grade: '高二', 
    subtitle: '實力拉開差距期', 
    goal: '深化理解 × 建立解題效率', 
    courses: ['高二國文素養閱讀與寫作提升', '高二英文閱讀理解 × 長文分析', '高二數學重點單元強化', '高二物理／化學進階課程', '寒暑假實力提升衝刺班'] 
  },
  { 
    grade: '升高三', 
    subtitle: '升學戰力啟動期', 
    goal: '整合重點 × 對接升學考試', 
    courses: ['高中全科重點銜接課程', '學測／分科先修課程', '暑期升學啟動班'] 
  },
  { 
    grade: '高三', 
    subtitle: '全面備考實戰期', 
    goal: '穩定表現 × 精準得分', 
    courses: ['高三國文／英文／數學總複習', '物理／化學重點題型與觀念整合', 'K書班（讀書計畫訂定＋現場輔導）', '擬真模考與考後解析'] 
  },
  { 
    grade: '考前衝刺', 
    subtitle: '關鍵分數決勝期', 
    goal: '穩定心態 × 發揮實力', 
    courses: ['考前總複習衝刺班', '高頻考點快速掃描', '擬真模考實戰演練', '考前K書與個別重點指導'] 
  },
];

const SeniorCourseRoadmap: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
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

  return (
    <section ref={sectionRef} id="course-roadmap" className="py-20 bg-slate-950 scroll-mt-24 relative overflow-hidden">
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-5 md:mb-12">
          <h2 className="text-purple-300 font-bold tracking-wide uppercase text-sm mb-3">育豪菁英</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white">高中課程規劃</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:gap-8">
          
          {/* Mobile Navigation (Arrows) */}
          <div className="md:hidden flex flex-col gap-4">
            <div className="flex items-center justify-between bg-purple-800 rounded-xl p-2 border border-purple-700">
              <button 
                onClick={prevTab}
                className="p-3 rounded-lg text-white hover:bg-purple-700 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex items-center gap-2">
                <span className={`p-2 rounded-full ${COURSE_DATA[activeTab].color.replace('text-', 'bg-').replace('500', '100')} text-purple-900`}>
                  {React.cloneElement(COURSE_DATA[activeTab].icon as React.ReactElement, { size: 20, className: 'text-purple-900' })}
                </span>
                <span className="text-xl font-bold text-white">{COURSE_DATA[activeTab].label}</span>
              </div>
              <button 
                onClick={nextTab}
                className="p-3 rounded-lg text-white hover:bg-purple-700 transition-colors"
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
                    ? `bg-white text-purple-900 shadow-lg font-bold transform scale-105` 
                    : 'bg-purple-900/50 text-purple-200 hover:bg-purple-800 border border-purple-800'
                }`}
              >
                <span className={`p-1.5 lg:p-2 rounded-full ${activeTab === index ? 'bg-purple-100 text-purple-600' : 'bg-purple-700 text-purple-300'} shrink-0`}>
                   {React.cloneElement(subject.icon as React.ReactElement, { size: 18 })}
                </span>
                <span className="text-sm lg:text-lg truncate">{subject.label}</span>
              </button>
            ))}

            {/* Desktop Action Buttons */}
            <button
              onClick={() => setIsBrochureOpen(true)}
              className="mt-4 flex items-center justify-center gap-2 px-6 py-4 rounded-xl transition-all bg-yellow-400 text-purple-900 font-bold hover:bg-yellow-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <FileText size={20} />
              <span className="text-lg">查閱簡章</span>
            </button>

            <button
              onClick={handleTogglePlan}
              className={`mt-2 flex items-center justify-center gap-2 px-6 py-4 rounded-xl transition-all font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                isPlanOpen 
                  ? 'bg-white text-purple-800 ring-2 ring-white' 
                  : 'bg-purple-800 text-white hover:bg-purple-700 border border-purple-600'
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
               <p className="text-purple-100 leading-relaxed md:leading-loose text-base md:text-lg font-medium text-justify">
                  {COURSE_DATA[activeTab].description}
               </p>
            </div>

            {/* Class Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
              {COURSE_DATA[activeTab].classes.map((cls, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-purple-200 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full"
                >
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {cls.name}
                    </h4>

                     {/* Meta Tags: Age & Time */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-purple-50 px-2.5 py-1.5 rounded-md border border-purple-100">
                         <Users size={14} className="text-purple-600" /> 
                         <span>{cls.age}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-purple-50 px-2.5 py-1.5 rounded-md border border-purple-100">
                         <Clock size={14} className="text-purple-600" /> 
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
                       onClick={() => setIsBrochureOpen(true)}
                       className="flex-1 py-2.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
                     >
                        查看課表 <Calendar size={14} />
                     </button>
                     <a 
                       href="#contact"
                       className="flex-1 py-2.5 rounded-lg bg-purple-600 text-white text-sm font-bold hover:bg-purple-700 transition-colors text-center flex items-center justify-center gap-1.5 shadow-md shadow-purple-200"
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
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all bg-yellow-400 text-purple-900 font-bold hover:bg-yellow-300 shadow-sm"
              >
                <FileText size={18} />
                <span>查閱簡章</span>
              </button>
              <button
                onClick={handleTogglePlan}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all font-bold shadow-sm ${isPlanOpen ? 'bg-white text-purple-700' : 'bg-purple-700 text-white border border-purple-500'}`}
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
             <div className="flex flex-col items-center justify-center gap-2 mb-10">
               <div className="flex items-center gap-3">
                 <Map className="text-purple-600" size={32} />
                 <h3 className="text-2xl md:text-3xl font-extrabold text-purple-800 text-center">高中完整學習規劃路徑</h3>
               </div>
               <p className="text-slate-500 font-medium">三年佈局，穩健迎戰學測與分科</p>
             </div>
             
             {/* Timeline Container: padding-bottom 12 (48px) to reserve space for rocket */}
             <div className="relative max-w-5xl mx-auto pt-4 md:pt-10 pb-12">
                {/* Central Line (Desktop) - Ends at 24px from bottom (bottom-6) which is center of rocket */}
                <div className="absolute left-1/2 top-0 bottom-6 w-1 bg-purple-100 -translate-x-1/2 rounded-full hidden md:block"></div>
                
                {/* Side Line (Mobile) - Ends at 24px from bottom (bottom-6) */}
                <div className="absolute left-6 top-0 bottom-6 w-1 bg-purple-100 -translate-x-1/2 rounded-full md:hidden"></div>
                
                <div className="space-y-8 md:space-y-16 mb-8"> 
                   {TIMELINE_DATA.map((step, idx) => (
                      <div key={idx} className={`flex flex-col md:flex-row items-center md:justify-between relative ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                         
                         {/* Spacer for Desktop Alignment */}
                         <div className="hidden md:block w-5/12"></div>
                         
                         {/* Center Dot */}
                         <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-yellow-400 border-4 border-purple-50 z-10 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                             <div className="w-2 h-2 bg-purple-800 rounded-full"></div>
                         </div>

                         {/* Content Card */}
                         <div className={`w-[calc(100%-4rem)] ml-auto md:ml-0 md:w-5/12 group`}>
                            <div className={`bg-purple-50 rounded-2xl p-6 border border-purple-100 hover:bg-purple-100 transition-all hover:-translate-y-1 hover:shadow-lg relative flex flex-col ${idx % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
                                
                                {/* Step Label */}
                                <span className="inline-block px-3 py-1 bg-white rounded-lg text-purple-700 text-xs font-bold mb-3 border border-purple-200">
                                  Step {idx + 1}
                                </span>
                                
                                <h4 className="text-xl md:text-2xl font-bold text-purple-900 mb-1">{step.grade}</h4>
                                <p className="text-purple-700 font-bold text-sm md:text-base mb-4 tracking-wide">{step.subtitle}</p>
                                
                                <div className={`w-16 h-1.5 bg-yellow-400 rounded-full mb-5 opacity-90`}></div>
                                
                                <div className="w-full space-y-4">
                                    {/* Goal Section */}
                                    <div className={`text-sm md:text-base bg-white p-3 rounded-xl border border-purple-200 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        <div className={`flex items-center gap-2 text-amber-500 font-bold mb-1.5 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                            <Target size={16} />
                                            <span>學習目標</span>
                                        </div>
                                        <p className="text-slate-600 font-medium">{step.goal}</p>
                                    </div>

                                    {/* Courses Section */}
                                    <div className={`text-sm md:text-base ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        <div className={`flex items-center gap-2 text-amber-500 font-bold mb-2 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                            <CheckCircle2 size={16} />
                                            <span>推薦課程</span>
                                        </div>
                                        <ul className="space-y-1.5">
                                            {step.courses.map(c => (
                                                <li key={c} className={`flex items-center gap-2 text-slate-700 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full shrink-0"></span>
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
                {/* 
                   Vertical Alignment: 
                   - Timeline line ends at bottom-6 (24px)
                   - Rocket is h-12 (48px). bottom-0 places its center at 24px.
                   - Thus, line ends at center of rocket.
                   - Wrapped in a div to separate positioning transform from animation transform
                */}
                <div className="absolute bottom-0 left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-12 h-12 bg-white border-4 border-purple-100 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                       <Rocket className="text-purple-600 w-6 h-6" />
                  </div>
                </div>
             </div>

             {/* Collapse Button - Moved OUTSIDE the timeline container */}
             <div className="flex justify-center mt-4">
                <button 
                  onClick={handleCollapse}
                  className="flex items-center gap-2 text-slate-500 hover:text-purple-700 transition-colors py-3 px-6 rounded-full hover:bg-slate-100 text-sm font-medium"
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
    </section>
  );
};

export default SeniorCourseRoadmap;
