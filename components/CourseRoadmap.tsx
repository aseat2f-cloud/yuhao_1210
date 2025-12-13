
import React, { useState, useRef } from 'react';
import { Calculator, Languages, BookOpen, Rocket, ArrowRight, FlaskConical, ChevronLeft, ChevronRight, FileText, Clock, Users, Calendar, Map, Target, CheckCircle2, ChevronUp } from 'lucide-react';
import BrochureViewer from './BrochureViewer';

const BROCHURE_IMAGES = [
  "https://www.dropbox.com/scl/fi/02bku21xf9kcds9976086/250603_-PO-_-_AH_-A.jpg?rlkey=36lldwmj1t91wp5izhm806m96&raw=1",
  "https://www.dropbox.com/scl/fi/2cxysztok0xjwqflocxf3/250813_-_-PO-_AH_01.jpg?rlkey=we58ed84mufdgg08t1yjkjc4r&raw=1"
];

const COURSE_DATA = [
  {
    id: 'math',
    label: '數學',
    description: '小育豪資優數學，透過教具操作與圖解教學，將抽象概念具象化。培養孩子主動思考與邏輯推理能力，打好數理根基。',
    icon: <Calculator size={20} />,
    color: 'text-green-600',
    classes: [
      { name: '低年級啟蒙班', desc: '透過遊戲與教具，建立數感與圖形概念', age: '小一 ~ 小二', time: '週三/六 13:30' },
      { name: '中年級培訓班', desc: '強化四則運算與應用題解題技巧', age: '小三 ~ 小四', time: '週三/六 15:30' },
      { name: '高年級資優班', desc: '銜接國中代數與幾何，挑戰奧數題型', age: '小五 ~ 小六', time: '週三/五 18:30' },
    ]
  },
  {
    id: 'english',
    label: '美語',
    description: '艾森樂美語 (Essenjoy)，打造全美語沉浸式學習環境。結合繪本、科學與跨領域主題，讓孩子自然開口說英語，接軌國際。',
    icon: <Languages size={20} />,
    color: 'text-teal-500',
    classes: [
      { name: 'ESL 基礎班', desc: '自然發音與日常會話，培養語感', age: '小一 ~ 小二', time: '週一/四 16:30' },
      { name: 'ESL 進階班', desc: '閱讀寫作與主題探討，擴充字彙量', age: '小三 ~ 小四', time: '週二/五 16:30' },
      { name: '英檢衝刺班', desc: '針對 GEPT 與劍橋英檢，強化聽讀實力', age: '小五 ~ 小六', time: '週三/六 13:30' },
    ]
  },
  {
    id: 'chinese',
    label: '國語文',
    description: '重視閱讀素養與寫作表達。透過經典文學導讀與心智圖作文教學，提升孩子的閱讀理解力與文字駕馭能力。',
    icon: <BookOpen size={20} />,
    color: 'text-orange-500',
    classes: [
      { name: '閱讀寫作初階', desc: '看圖說故事，培養造句與段落概念', age: '小二 ~ 小三', time: '週六 10:00' },
      { name: '閱讀寫作進階', desc: '修辭技巧與各類文體練習，提升文采', age: '小四 ~ 小五', time: '週六 13:30' },
      { name: '私中作文專班', desc: '針對私中入學考題型，強化論述能力', age: '小六', time: '週日 09:00' },
    ]
  },
  {
    id: 'science',
    label: '自然科學',
    description: '強調「動手做」的科學精神。透過有趣的科學實驗，驗證課本原理，培養觀察、假設、實驗、結論的科學思維。',
    icon: <FlaskConical size={20} />,
    color: 'text-blue-500',
    classes: [
      { name: '小小科學家', desc: '生活科學實驗，激發好奇心', age: '小一 ~ 小三', time: '週六 15:30' },
      { name: '科展培訓班', desc: '專題研究與實驗設計，培養探究精神', age: '小四 ~ 小六', time: '週日 13:30' },
    ]
  },
  {
    id: 'gifted',
    label: '資優升學',
    description: '針對私中入學考與資優鑑定，提供系統化的培訓課程。精準掌握命題趨勢，協助孩子進入理想學府。',
    icon: <Rocket size={20} />,
    color: 'text-purple-500',
    classes: [
      { name: '私中特訓班', desc: '國英數全科衝刺，模擬考實戰演練', age: '小六', time: '週六/日 全天' },
      { name: '資優鑑定班', desc: '數理邏輯與性向測驗輔導', age: '小二 ~ 小六', time: '寒暑假/考前' },
    ]
  }
];

const TIMELINE_DATA = [
  { 
    grade: '低年級 (小一~小二)', 
    subtitle: '興趣啟發期', 
    goal: '建立學習習慣 × 激發好奇心', 
    courses: ['小育豪資優數學啟蒙', 'ESL 美語生活會話', '科學動手做實驗'] 
  },
  { 
    grade: '中年級 (小三~小四)', 
    subtitle: '能力養成期', 
    goal: '奠定學科基礎 × 培養邏輯思考', 
    courses: ['四則運算與應用題強化', '英語閱讀與寫作起步', '閱讀素養與短文創作'] 
  },
  { 
    grade: '高年級 (小五)', 
    subtitle: '升學準備期', 
    goal: '深化學科實力 × 探索升學方向', 
    courses: ['國小高年級數學進階', 'GEPT 英檢初級/中級培訓', '長篇閱讀與修辭寫作'] 
  },
  { 
    grade: '升國中 (小六)', 
    subtitle: '衝刺關鍵期', 
    goal: '私中錄取 × 國中課程銜接', 
    courses: ['私中入學全科衝刺班', '國中數學/生物先修課程', '資優鑑定專題輔導'] 
  },
];

const CourseRoadmap: React.FC = () => {
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
    <section ref={sectionRef} id="course-roadmap" className="py-20 bg-green-600 scroll-mt-24 relative overflow-hidden">
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-green-200 font-bold tracking-wide uppercase text-sm mb-3">育豪資優</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white">國小課程規劃</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Mobile Navigation (Arrows) */}
          <div className="md:hidden flex flex-col gap-4 mb-4">
            <div className="flex items-center justify-between bg-green-700/50 rounded-xl p-2 backdrop-blur-sm border border-green-500/30">
              <button 
                onClick={prevTab}
                className="p-3 rounded-lg text-white hover:bg-green-600 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex items-center gap-2">
                <span className={`p-2 rounded-full ${COURSE_DATA[activeTab].color.replace('text-', 'bg-').replace('500', '100').replace('400', '100')} text-green-900`}>
                  {React.cloneElement(COURSE_DATA[activeTab].icon as React.ReactElement, { size: 20, className: 'text-green-900' })}
                </span>
                <span className="text-xl font-bold text-white">{COURSE_DATA[activeTab].label}</span>
              </div>
              <button 
                onClick={nextTab}
                className="p-3 rounded-lg text-white hover:bg-green-600 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Mobile Action Buttons */}
             <div className="grid grid-cols-2 gap-3">
               <button
                onClick={() => setIsBrochureOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all bg-yellow-400 text-green-900 font-bold hover:bg-yellow-300 shadow-sm"
              >
                <FileText size={18} />
                <span>查閱簡章</span>
              </button>
              <button
                onClick={handleTogglePlan}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all font-bold shadow-sm ${isPlanOpen ? 'bg-white text-green-700' : 'bg-green-700 text-white border border-green-500'}`}
              >
                <Map size={18} />
                <span>完整規劃</span>
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
                    ? `bg-white text-green-900 shadow-lg font-bold transform scale-105` 
                    : 'bg-green-700/50 text-green-100 hover:bg-green-700 border border-green-500/30'
                }`}
              >
                <span className={`p-1.5 lg:p-2 rounded-full ${activeTab === index ? 'bg-green-100 text-green-600' : 'bg-green-800 text-green-300'} shrink-0`}>
                   {React.cloneElement(subject.icon as React.ReactElement, { size: 18 })}
                </span>
                <span className="text-sm lg:text-lg truncate">{subject.label}</span>
              </button>
            ))}

            {/* Desktop Action Buttons */}
            <button
              onClick={() => setIsBrochureOpen(true)}
              className="mt-4 flex items-center justify-center gap-2 px-6 py-4 rounded-xl transition-all bg-yellow-400 text-green-900 font-bold hover:bg-yellow-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <FileText size={20} />
              <span className="text-lg">查閱簡章</span>
            </button>

            <button
              onClick={handleTogglePlan}
              className={`mt-2 flex items-center justify-center gap-2 px-6 py-4 rounded-xl transition-all font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                isPlanOpen 
                  ? 'bg-white text-green-800 ring-2 ring-white' 
                  : 'bg-green-800 text-white hover:bg-green-700 border border-green-600'
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
               <p className="text-green-50 leading-relaxed md:leading-[1.9] text-lg md:text-xl font-medium">
                  {COURSE_DATA[activeTab].description}
               </p>
            </div>

            {/* Class Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
              {COURSE_DATA[activeTab].classes.map((cls, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-green-100 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full"
                >
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-green-600 transition-colors">
                      {cls.name}
                    </h4>

                    {/* Meta Tags: Age & Time */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-green-50 px-2.5 py-1.5 rounded-md border border-green-100">
                         <Users size={14} className="text-green-600" /> 
                         <span>{cls.age}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-green-50 px-2.5 py-1.5 rounded-md border border-green-100">
                         <Clock size={14} className="text-green-600" /> 
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
                       className="flex-1 py-2.5 rounded-lg bg-green-50 text-green-700 text-sm font-bold hover:bg-green-100 transition-colors flex items-center justify-center gap-1.5 border border-green-200"
                     >
                        查看課表 <Calendar size={14} />
                     </button>
                     <a 
                       href="#contact"
                       className="flex-1 py-2.5 rounded-lg bg-green-600 text-white text-sm font-bold hover:bg-green-700 transition-colors text-center flex items-center justify-center gap-1.5 shadow-md shadow-green-200"
                     >
                        立即報名 <ArrowRight size={14} />
                     </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full Plan Timeline Section (Vertical Centered) */}
        {isPlanOpen && (
          <div ref={timelineRef} className="mt-16 py-12 px-4 md:px-12 bg-white rounded-3xl shadow-xl animate-in fade-in slide-in-from-top-4 duration-500">
             <div className="flex flex-col items-center justify-center gap-2 mb-10">
               <div className="flex items-center gap-3">
                 <Map className="text-green-600" size={32} />
                 <h3 className="text-2xl md:text-3xl font-extrabold text-green-800 text-center">國小完整學習規劃路徑</h3>
               </div>
               <p className="text-slate-500 font-medium">六年初衷，快樂學習，自信成長</p>
             </div>
             
             {/* Timeline Container: padding-bottom 12 (48px) to reserve space for rocket */}
             <div className="relative max-w-5xl mx-auto pt-4 md:pt-10 pb-12">
                {/* Central Line (Desktop) - Ends at 24px from bottom (bottom-6) which is center of rocket */}
                <div className="absolute left-1/2 top-0 bottom-6 w-1 bg-green-100 -translate-x-1/2 rounded-full hidden md:block"></div>
                
                {/* Side Line (Mobile) - Ends at 24px from bottom (bottom-6) */}
                <div className="absolute left-6 top-0 bottom-6 w-1 bg-green-100 -translate-x-1/2 rounded-full md:hidden"></div>
                
                <div className="space-y-8 md:space-y-16 mb-8"> 
                   {TIMELINE_DATA.map((step, idx) => (
                      <div key={idx} className={`flex flex-col md:flex-row items-center md:justify-between relative ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                         
                         {/* Spacer for Desktop Alignment */}
                         <div className="hidden md:block w-5/12"></div>
                         
                         {/* Center Dot */}
                         <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-yellow-400 border-4 border-green-50 z-10 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                             <div className="w-2 h-2 bg-green-800 rounded-full"></div>
                         </div>

                         {/* Content Card */}
                         <div className={`w-[calc(100%-4rem)] ml-auto md:ml-0 md:w-5/12 group`}>
                            <div className={`bg-green-50 rounded-2xl p-6 border border-green-100 hover:bg-green-100 transition-all hover:-translate-y-1 hover:shadow-lg relative flex flex-col ${idx % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
                                
                                {/* Step Label */}
                                <span className="inline-block px-3 py-1 bg-white rounded-lg text-green-700 text-xs font-bold mb-3 border border-green-200">
                                  Step {idx + 1}
                                </span>
                                
                                <h4 className="text-xl md:text-2xl font-bold text-green-900 mb-1">{step.grade}</h4>
                                <p className="text-green-700 font-bold text-sm md:text-base mb-4 tracking-wide">{step.subtitle}</p>
                                
                                <div className={`w-16 h-1.5 bg-yellow-400 rounded-full mb-5 opacity-90`}></div>
                                
                                <div className="w-full space-y-4">
                                    {/* Goal Section */}
                                    <div className={`text-sm md:text-base bg-white p-3 rounded-xl border border-green-200 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
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
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full shrink-0"></span>
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
                  <div className="w-12 h-12 bg-white border-4 border-green-100 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <Rocket className="text-green-600 w-6 h-6" />
                  </div>
                </div>
             </div>

             {/* Collapse Button - Moved OUTSIDE the timeline container */}
             <div className="flex justify-center mt-4">
                <button 
                  onClick={handleCollapse}
                  className="flex items-center gap-2 text-slate-500 hover:text-green-700 transition-colors py-3 px-6 rounded-full hover:bg-slate-100 text-sm font-medium"
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

export default CourseRoadmap;
