
import React, { useState, useEffect } from 'react';
import { Crown, Star, School, Languages, Medal, GraduationCap, Award } from 'lucide-react';

type HonorCategory = 'gifted' | 'cap' | 'top_school' | 'english' | 'perfect' | 'rank_10' | 'university_top3' | 'school_rank1';

interface HonorRollProps {
  variant?: 'default' | 'elementary' | 'junior' | 'senior';
  theme?: 'primary' | 'green' | 'blue' | 'purple';
}

// Helper to generate mock names with specific details
const generateNames = (count: number, category: HonorCategory) => {
  const lastNames = ['陳', '林', '黃', '張', '李', '王', '吳', '劉', '蔡', '楊', '許', '鄭'];
  const firstNames = ['O豪', 'O廷', 'O瑄', 'O宇', 'O瑋', 'O安', 'O平', 'O伶', 'O凱', 'O鈞', 'O婷', 'O文'];
  
  // School Pools
  const originElementary = ['敦化國小', '民生國小', '幸安國小', '金華國小', '仁愛國小'];
  const originJunior = ['敦化國中', '介壽國中', '仁愛國中', '中正國中', '金華國中'];
  const originSenior = ['建國中學', '北一女中', '師大附中', '中山女高', '成功高中'];

  // Target Pools
  const giftedTargets = [
    '延平中學 數理資優班', 
    '薇閣中學 數理資優班', 
    '敦化國中 數理資優班', 
    '仁愛國中 數理資優班',
    '民生國中 數理資優班'
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const name = `${lastNames[i % lastNames.length]}${firstNames[i % firstNames.length]}`;
    const year = i % 3 === 0 ? '112' : '113'; // Mix of 112 and 113 years
    
    let school = ''; // Original School
    let yearPrefix = '';
    let highlightText = '';

    if (category === 'gifted') {
      school = originElementary[i % originElementary.length];
      const target = giftedTargets[i % giftedTargets.length];
      yearPrefix = `${year}年 錄取`;
      highlightText = target;
    } else if (category === 'cap') {
      school = originJunior[i % originJunior.length];
      yearPrefix = `${year}年 會考`;
      highlightText = '5A++';
    } else if (category === 'top_school') {
      school = originJunior[i % originJunior.length];
      const target = i % 2 === 0 ? '建國中學' : '北一女中';
      yearPrefix = `${year}年 錄取`;
      highlightText = target;
    } else if (category === 'english') {
      school = i % 2 === 0 ? originElementary[i % originElementary.length] : originSenior[i % originSenior.length];
      const exams = ['GEPT 中級', 'GEPT 中高級', '多益 900分', '多益 950分'];
      yearPrefix = `${year}年 通過`;
      highlightText = exams[i % exams.length];
    } else if (category === 'perfect') {
      school = originElementary[i % originElementary.length];
      const subjects = ['數學', '英文', '國語'];
      yearPrefix = `${year}年 校內段考`;
      highlightText = `${subjects[i % subjects.length]} 100分`;
    } else if (category === 'rank_10') {
      school = originJunior[i % originJunior.length];
      yearPrefix = `${year}年 校內段考`;
      const ranks = ['第一名', '第二名', '第三名', '第四名', '第五名'];
      highlightText = `校排 ${ranks[i % ranks.length]}`;
    } else if (category === 'university_top3') {
      school = originSenior[i % originSenior.length];
      const targets = ['台灣大學', '清華大學', '交通大學', '政治大學', '陽明醫學系'];
      yearPrefix = `${year}年 錄取`;
      highlightText = targets[i % targets.length];
    } else if (category === 'school_rank1') {
      school = originSenior[i % originSenior.length];
      yearPrefix = `${year}年 校內段考`;
      highlightText = '校排 第一名';
    }

    return {
      id: `${category}-${i}`,
      name,
      school,
      yearPrefix,
      highlightText
    };
  });
};

const DATA = {
  gifted: generateNames(100, 'gifted'),
  cap: generateNames(100, 'cap'),
  top_school: generateNames(100, 'top_school'),
  english: generateNames(100, 'english'),
  perfect: generateNames(100, 'perfect'),
  rank_10: generateNames(100, 'rank_10'),
  university_top3: generateNames(100, 'university_top3'),
  school_rank1: generateNames(100, 'school_rank1'),
};

const HonorRoll: React.FC<HonorRollProps> = ({ variant = 'default', theme = 'primary' }) => {
  // Determine initial tab based on variant
  const getInitialTab = () => {
    if (variant === 'elementary') return 'english';
    if (variant === 'junior') return 'rank_10';
    if (variant === 'senior') return 'university_top3';
    return 'cap';
  };

  const [activeTab, setActiveTab] = useState<HonorCategory>(getInitialTab());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const t = theme === 'primary' ? 'primary' : theme;

  // Responsive items per page logic
  useEffect(() => {
    const handleResize = () => {
      // Mobile (< 640px): 5 items
      // Desktop (>= 640px): 24 items
      setItemsPerPage(window.innerWidth < 640 ? 5 : 24);
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset page when switching tabs or itemsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage, activeTab]);

  const currentData = DATA[activeTab];
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const displayedItems = currentData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleTabChange = (tab: HonorCategory) => {
    setActiveTab(tab);
  };

  const renderTabs = () => {
    if (variant === 'senior') {
      return (
         <>
          <button
            onClick={() => handleTabChange('english')}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'english' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Languages size={16} /> 
            <span className="sm:hidden">英檢</span>
            <span className="hidden sm:inline">英語檢定</span>
          </button>
          <button
            onClick={() => handleTabChange('university_top3')}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'university_top3' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <GraduationCap size={16} /> 
            <span className="sm:hidden">頂大</span>
            <span className="hidden sm:inline">前三志願</span>
          </button>
          <button
            onClick={() => handleTabChange('school_rank1')}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'school_rank1' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Award size={16} /> 
            <span className="sm:hidden">榜首</span>
            <span className="hidden sm:inline">各校榜首</span>
          </button>
        </>
      );
    }

    if (variant === 'junior') {
      return (
        <>
           <button
            onClick={() => handleTabChange('rank_10')}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'rank_10' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Medal size={16} /> 
            <span className="sm:hidden">校排</span>
            <span className="hidden sm:inline">校排前十</span>
          </button>
          <button
            onClick={() => handleTabChange('cap')}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'cap' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Crown size={16} /> 
            <span className="sm:hidden">滿分</span>
            <span className="hidden sm:inline">會考滿分</span>
          </button>
          <button
            onClick={() => handleTabChange('top_school')}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'top_school' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <School size={16} /> 
            <span className="sm:hidden">建北</span>
            <span className="hidden sm:inline">建北錄取</span>
          </button>
        </>
      );
    }

    if (variant === 'elementary') {
      return (
        <>
          <button
            onClick={() => handleTabChange('english')}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'english' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Languages size={16} /> 
            <span className="sm:hidden">英檢</span>
            <span className="hidden sm:inline">英語檢定</span>
          </button>
          <button
            onClick={() => handleTabChange('perfect')}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'perfect' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Crown size={16} /> 
            <span className="sm:hidden">滿分</span>
            <span className="hidden sm:inline">滿分榜</span>
          </button>
          <button
            onClick={() => handleTabChange('gifted')}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'gifted' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Star size={16} /> 
            <span className="sm:hidden">資優班</span>
            <span className="hidden sm:inline">資優班錄取</span>
          </button>
        </>
      );
    }

    // Default
    return (
      <>
        <button
          onClick={() => handleTabChange('gifted')}
          className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'gifted' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Star size={16} /> 
          <span className="sm:hidden">資優班</span>
          <span className="hidden sm:inline">資優班錄取</span>
        </button>
        <button
          onClick={() => handleTabChange('cap')}
          className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'cap' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Crown size={16} /> 
          <span className="sm:hidden">滿級分</span>
          <span className="hidden sm:inline">會考滿級分</span>
        </button>
        <button
          onClick={() => handleTabChange('top_school')}
          className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'top_school' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <School size={16} /> 
          <span className="sm:hidden">建北</span>
          <span className="hidden sm:inline">建北俱樂部</span>
        </button>
      </>
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-${t}-600 font-bold tracking-wide uppercase text-sm mb-3`}>金榜題名</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">學員金榜 • 榮耀時刻</h3>
          
          {/* Tabs */}
          <div className="flex flex-nowrap justify-center gap-2 bg-slate-100 p-1.5 rounded-full mx-auto max-w-full overflow-x-auto sm:overflow-visible">
            {renderTabs()}
          </div>
        </div>

        {/* Grid List */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-inner">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayedItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-start gap-3 hover:-translate-y-0.5 transition-transform duration-200">
                <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md ${
                   activeTab === 'gifted' ? 'bg-teal-400' 
                   : activeTab === 'cap' || activeTab === 'perfect' || activeTab === 'school_rank1' ? 'bg-red-400' 
                   : activeTab === 'english' ? 'bg-purple-400'
                   : activeTab === 'rank_10' ? 'bg-orange-400'
                   : 'bg-blue-400'
                }`}>
                  {item.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <div className="font-bold text-slate-900 text-base">{item.name}</div>
                    <div className="text-xs text-slate-400 font-medium truncate ml-2">{item.school}</div>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-xs text-slate-500 font-medium">{item.yearPrefix}</span>
                     <span className={`text-sm font-extrabold truncate ${
                        activeTab === 'gifted' ? 'text-teal-600' 
                        : activeTab === 'cap' || activeTab === 'perfect' || activeTab === 'school_rank1' ? 'text-red-600' 
                        : activeTab === 'english' ? 'text-purple-600'
                        : activeTab === 'rank_10' ? 'text-orange-600'
                        : 'text-blue-600'
                     }`}>
                       {item.highlightText}
                     </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-full text-sm font-bold transition-all ${
                  currentPage === page
                    ? `bg-${t}-600 text-white shadow-md`
                    : 'bg-white text-slate-500 hover:bg-slate-200'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HonorRoll;
