
import React, { useState } from 'react';
import { Rocket, TrendingUp, Crown, Zap, ArrowRight, ChevronLeft, ChevronRight, FileText, Clock, Users, Calendar } from 'lucide-react';
import BrochureViewer from './BrochureViewer';

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
    description: '銜接國高中課程落差，強化核心觀念。針對新課綱素養導向，培養自主學習與探究實作能力，為高中三年打下穩固基礎。',
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
    description: '深化學科知識，面對選組分流的挑戰。加強各科深度與廣度，同步累積學習歷程檔案，為學測做好提前準備。',
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
    description: '全方位學測複習與模考演練，精準掌握命題趨勢。針對個人弱點進行補強，搭配申請入學輔導，直攻頂尖大學。',
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
    description: '把握寒暑假黃金期，集中火力衝刺。提供規律的作息安排與高強度的密集訓練，讓成績大幅躍進。',
    icon: <Zap size={20} />,
    color: 'text-red-500', 
    classes: [
      { name: '模考K書班', desc: '仿真模擬考與專人解惑輔導', age: '高一 ~ 高三', time: '考前/週日' },
      { name: '考前總複習班', desc: '重點觀念地毯式複習與猜題', age: '高三', time: '考前衝刺' },
    ]
  }
];

const SeniorCourseRoadmap: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  const nextTab = () => {
    setActiveTab((prev) => (prev + 1) % COURSE_DATA.length);
  };

  const prevTab = () => {
    setActiveTab((prev) => (prev - 1 + COURSE_DATA.length) % COURSE_DATA.length);
  };

  return (
    <section id="course-roadmap" className="py-20 bg-slate-950 scroll-mt-24 relative overflow-hidden">
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-purple-300 font-bold tracking-wide uppercase text-sm mb-3">育豪菁英</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white">高中課程規劃</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Mobile Navigation (Arrows) */}
          <div className="md:hidden flex flex-col gap-4 mb-4">
            <div className="flex items-center justify-between bg-purple-800 rounded-xl p-2 border border-purple-700">
              <button 
                onClick={prevTab}
                className="p-3 rounded-lg text-white hover:bg-purple-700 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex items-center gap-2">
                <span className={`p-2 rounded-full ${COURSE_DATA[activeTab].color.replace('text-', 'bg-').replace('500', '900')} text-white`}>
                  {React.cloneElement(COURSE_DATA[activeTab].icon as React.ReactElement, { size: 20 })}
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

            {/* Mobile Brochure Button */}
             <button
              onClick={() => setIsBrochureOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all bg-yellow-400 text-purple-900 font-bold hover:bg-yellow-300 shadow-sm"
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

            {/* Desktop Brochure Button */}
            <button
              onClick={() => setIsBrochureOpen(true)}
              className="mt-4 flex items-center justify-center gap-2 px-6 py-4 rounded-xl transition-all bg-yellow-400 text-purple-900 font-bold hover:bg-yellow-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <FileText size={20} />
              <span className="text-lg">查閱簡章</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="md:w-3/4">
            
            {/* Category Description */}
            <div className="mb-8 animate-in fade-in duration-300">
               <p className="text-purple-100 leading-relaxed md:leading-[1.9] text-lg md:text-xl font-medium">
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

export default SeniorCourseRoadmap;
