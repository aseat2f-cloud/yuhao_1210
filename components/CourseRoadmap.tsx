
import React, { useState } from 'react';
import { Calculator, Languages, BookOpen, Rocket, ArrowRight, ChevronLeft, ChevronRight, FileText, Clock, Users, Calendar, Smile } from 'lucide-react';
import BrochureViewer from './BrochureViewer';

const BROCHURE_IMAGES = [
  "https://www.dropbox.com/scl/fi/hutfjgxt2e2ju18exx28x/01-1-1030x1030.png?rlkey=bzgvpv2wdhevosm5uyrzfi6sd&raw=1",
  "https://www.dropbox.com/scl/fi/u0nmwo5nl2ydmce9c835g/01-1030x1030.png?rlkey=rm4yl9728dg0bv4ls2erjzpj7&raw=1",
  "https://www.dropbox.com/scl/fi/glxqshvfrmvemud6zl2qg/LINE_ALBUM_DM-_240923_2_02-749x1030.jpg?rlkey=hrzhxs0xaa2zi21ia84z4fdi0&raw=1"
];

const COURSE_DATA = [
  {
    id: 'math',
    label: '小育豪資優數學',
    description: '數學是孩子培養「思考及解決問題能力 」的最佳途徑。\n深耕板橋40年的育豪資優文教已孕育無數優秀學子，在小學數學中承襲國中<觀念導向>的方式教導，使學生能夠愉快並有系統的學習。從國小至國中、從基礎到資優等不同班別 ,皆由【育豪師資親授】使孩子適性養成 ，課程中引導不只單一的思者 ，藉由提問＞思考> 精準表達＞互動式教學，以明星私中、公校資優鑑定 、明星高中等目標的同學，絕對不能錯過。',
    icon: <Calculator size={20} />,
    color: 'text-blue-500', 
    bgColor: 'bg-white/10', // Adjusted for dark bg
    classes: [
      { name: '進度數學班', desc: '搭配學校進度，穩紮穩打建立觀念', age: '小一 ~ 小六', time: '週三 / 週六' },
      { name: '種子超前數學班', desc: '啟發數學思維，提前接觸高年級觀念', age: '小二 ~ 小四', time: '週六 10:00' },
      { name: '超前數學班', desc: '資優數學培訓，挑戰更深更廣的題型', age: '小五 ~ 小六', time: '週六 13:30' },
    ]
  },
  {
    id: 'english',
    label: '艾森樂美語',
    description: '營造全美語沉浸式環境，結合自然發音與繪本閱讀，讓孩子自然而然開口說英語，並逐步累積單字量與閱讀實力。',
    icon: <Languages size={20} />,
    color: 'text-purple-400', // Adjusted for dark bg
    bgColor: 'bg-white/10',
    classes: [
      { name: '美語程度分班', desc: '依能力分班教學，聽說讀寫全方位', age: '幼大 ~ 小六', time: '平日 / 週六' },
      { name: '外師發音班', desc: '純正口音訓練，自然拼讀法教學', age: '小一 ~ 小三', time: '週一/四 16:30' },
      { name: '英文閱讀班', desc: '廣泛閱讀各類文章，培養語感', age: '小三 ~ 小六', time: '週三 14:00' },
      { name: '口說美語班', desc: '全美語情境對話，敢開口說英語', age: '小一 ~ 小六', time: '週五 18:30' },
      { name: '外師寫作班', desc: '引導式寫作教學，訓練邏輯與架構', age: '小四 ~ 小六', time: '週六 15:30' },
      { name: 'KET 養成班', desc: '針對劍橋英檢 KET 級別進行培訓', age: '小五 ~ 小六', time: '週六 09:00' },
    ]
  },
  {
    id: 'chinese',
    label: '國語文閱讀寫作',
    description: '精選文學作品導讀，引導孩子觀察生活、表達情感，透過心智圖構思文章架構，提升閱讀素養與寫作能力。',
    icon: <BookOpen size={20} />,
    color: 'text-teal-400', // Adjusted for dark bg
    bgColor: 'bg-white/10',
    classes: [
      { name: '閱讀寫作班', desc: '培養閱讀理解力，寫出好文章', age: '小二 ~ 小四', time: '週五 18:30' },
      { name: '閱讀素養班', desc: '針對長篇閱讀與素養題型加強', age: '小五 ~ 小六', time: '週六 10:00' },
    ]
  },
  {
    id: 'gifted',
    label: '公私立資優班升學',
    description: '針對私中入學與國中資優班考試進行專項訓練，透過模擬試題演練與考題解析，強化應試技巧與抗壓性。',
    icon: <Rocket size={20} />,
    color: 'text-orange-400', // Adjusted for dark bg
    bgColor: 'bg-white/10',
    classes: [
      { name: '超前數學班', desc: '針對私中與資優班入學考試規劃', age: '小五 ~ 小六', time: '週六 13:30' },
      { name: '自然實驗班', desc: '動手做實驗，培養科學實作能力', age: '小三 ~ 小六', time: '週六 15:30' },
      { name: '公校黑馬營', desc: '目標公立國中資優班，考前衝刺', age: '小六', time: '寒假 / 暑假' },
      { name: '私中黑馬營', desc: '目標頂尖私中，模擬試題演練', age: '小六', time: '週日 09:00' },
    ]
  },
  {
    id: 'player',
    label: '艾森樂小玩家',
    description: '結合寓教於樂的主題營隊與多元才藝課程，激發孩子的好奇心與創造力，讓學習不只在課本裡，更在豐富的體驗中。',
    icon: <Smile size={20} />,
    color: 'text-pink-400', 
    bgColor: 'bg-white/10',
    classes: [
      { name: '艾森樂夏令營', desc: '暑期全日制營隊，探索科學、藝術與體能', age: '幼大 ~ 小六', time: '暑假期間' },
      { name: '艾森樂冬令營', desc: '寒假密集主題課程，充實假期生活', age: '幼大 ~ 小六', time: '寒假期間' },
      { name: '週六多元課程', desc: '包含桌遊邏輯、科學手作等豐富選修內容', age: '小一 ~ 小六', time: '週六' },
    ]
  }
];

const CourseRoadmap: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  const nextTab = () => {
    setActiveTab((prev) => (prev + 1) % COURSE_DATA.length);
  };

  const prevTab = () => {
    setActiveTab((prev) => (prev - 1 + COURSE_DATA.length) % COURSE_DATA.length);
  };

  return (
    <section id="course-roadmap" className="py-20 bg-green-600 scroll-mt-24 relative overflow-hidden">
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-green-200 font-bold tracking-wide uppercase text-sm mb-3">艾森樂美語 x 小育豪資優數學</h2>
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

             {/* Mobile Brochure Button */}
             <button
              onClick={() => setIsBrochureOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all bg-yellow-400 text-green-900 font-bold hover:bg-yellow-300 shadow-sm"
            >
              <FileText size={20} />
              <span>查閱簡章</span>
            </button>
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

            {/* Desktop Brochure Button */}
            <button
              onClick={() => setIsBrochureOpen(true)}
              className="mt-4 flex items-center justify-center gap-2 px-6 py-4 rounded-xl transition-all bg-yellow-400 text-green-900 font-bold hover:bg-yellow-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <FileText size={20} />
              <span className="text-lg">查閱簡章</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="md:w-3/4">
            
            {/* Category Description - Removed Title & Border */}
            <div className="mb-8 animate-in fade-in duration-300">
               <p className="text-green-50 leading-[1.75] md:leading-[1.9] text-lg md:text-xl font-normal whitespace-pre-line">
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
