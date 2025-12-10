
import React, { useState } from 'react';
import { Calculator, Languages, BookOpen, Rocket, ArrowRight, FlaskConical, ChevronLeft, ChevronRight, FileText, Clock, Users, Calendar } from 'lucide-react';
import BrochureViewer from './BrochureViewer';

const BROCHURE_IMAGES = [
  "https://www.dropbox.com/scl/fi/5bo3d78bk5ygpww4xx7oo/251202_-_-DM_AH_01.jpg?rlkey=n6914auenialxg11u9tlv4dv1&raw=1",
  "https://www.dropbox.com/scl/fi/18rfzi9vqv67a0j5rufhd/251202_-_-DM_AH_02.jpg?rlkey=j35bxn0slkh7ubwtp56bp7un3&raw=1"
];

const COURSE_DATA = [
  {
    id: 'math',
    label: '數學',
    description: '從代數運算到幾何證明，建立嚴謹的邏輯推演架構。針對各版本教科書重點與會考命題趨勢，提供系統化的觀念解析與題型演練。',
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
    description: '強化文法架構與閱讀測驗技巧，累積會考必備單字量。透過主題式教學提升聽力與閱讀理解，讓英文成為升學優勢科目。',
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
    description: '精選文言文與白話文閱讀篇章，提升閱讀素養與理解能力。加強寫作技巧指導，引導學生運用修辭與名言佳句，輕鬆拿下作文六級分。',
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
    description: '結合生物、理化與地科，透過圖解與實驗影片輔助教學，將抽象的科學原理具象化。強調觀念理解而非死背，輕鬆應對素養題型。',
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
    description: '利用寒暑假黃金時間，進行超前進度學習或重點複習。提供安靜舒適的K書環境與輔導機制，讓學習更有效率。',
    icon: <Rocket size={20} />,
    color: 'text-red-400', 
    classes: [
      { name: '新生銜接課程', desc: '國小升國中暑期先修，贏在起跑點', age: '小六升國七', time: '暑期 09:00' },
      { name: '模考K書班', desc: '模擬考前密集複習與解題輔導', age: '國七 ~ 國九', time: '考前週日' },
      { name: '國九考衝班', desc: '會考前最後衝刺，精準猜題', age: '國九', time: '考前一個月' },
    ]
  }
];

const JuniorCourseRoadmap: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  const nextTab = () => {
    setActiveTab((prev) => (prev + 1) % COURSE_DATA.length);
  };

  const prevTab = () => {
    setActiveTab((prev) => (prev - 1 + COURSE_DATA.length) % COURSE_DATA.length);
  };

  return (
    <section id="course-roadmap" className="py-20 bg-blue-600 scroll-mt-24 relative overflow-hidden">
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-blue-200 font-bold tracking-wide uppercase text-sm mb-3">育豪資優</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white">國中課程規劃</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Mobile Navigation (Arrows) */}
          <div className="md:hidden flex flex-col gap-4 mb-4">
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

            {/* Mobile Brochure Button */}
             <button
              onClick={() => setIsBrochureOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all bg-yellow-400 text-blue-900 font-bold hover:bg-yellow-300 shadow-sm"
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

            {/* Desktop Brochure Button */}
            <button
              onClick={() => setIsBrochureOpen(true)}
              className="mt-4 flex items-center justify-center gap-2 px-6 py-4 rounded-xl transition-all bg-yellow-400 text-blue-900 font-bold hover:bg-yellow-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <FileText size={20} />
              <span className="text-lg">查閱簡章</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="md:w-3/4">
            
            {/* Category Description */}
            <div className="mb-8 animate-in fade-in duration-300">
               <p className="text-blue-50 leading-relaxed md:leading-[1.9] text-lg md:text-xl font-medium">
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
                       onClick={() => setIsBrochureOpen(true)}
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

export default JuniorCourseRoadmap;
