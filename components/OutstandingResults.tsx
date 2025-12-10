
import React from 'react';
import { Trophy, Users, Star, GraduationCap, TrendingUp, Award, BookCheck, ThumbsUp } from 'lucide-react';

const STATS = [
  { icon: <Trophy />, value: '1,250+', label: '錄取第一志願', color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { icon: <Star />, value: '380+', label: '5A++ 滿級分', color: 'text-red-600', bg: 'bg-red-50' },
  { icon: <GraduationCap />, value: '100%', label: '公立高中錄取率', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: <Users />, value: '40,000+', label: '累計輔導人次', color: 'text-primary-600', bg: 'bg-primary-50' },
  { icon: <TrendingUp />, value: '98%', label: '成績進步率', color: 'text-green-600', bg: 'bg-green-50' },
  { icon: <Award />, value: 'No.1', label: '奧林匹亞金牌', color: 'text-purple-600', bg: 'bg-purple-50' },
  { icon: <BookCheck />, value: '250+', label: '醫科牙醫錄取', color: 'text-teal-600', bg: 'bg-teal-50' },
  { icon: <ThumbsUp />, value: '4.9', label: '家長滿意度', color: 'text-orange-600', bg: 'bg-orange-50' },
];

interface OutstandingResultsProps {
  theme?: 'primary' | 'green' | 'blue' | 'purple';
}

const OutstandingResults: React.FC<OutstandingResultsProps> = ({ theme = 'primary' }) => {
  const t = theme === 'primary' ? 'primary' : theme;
  
  return (
    <section id="outstanding-results" className="py-24 bg-slate-50 relative overflow-hidden scroll-mt-24">
      {/* Background Decor */}
      <div className={`absolute top-0 left-0 w-[600px] h-[600px] bg-${t}-100/50 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2`}></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl opacity-40 translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-${t}-600 font-bold tracking-wide uppercase text-sm mb-3`}>辦學績效</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">亮眼成績 • 實力見證</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {STATS.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-1"
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {React.cloneElement(stat.icon as React.ReactElement, { size: 24, className: "w-6 h-6 md:w-7 md:h-7" })}
              </div>
              <div className={`text-3xl md:text-4xl lg:text-4xl font-extrabold mb-2 ${stat.color} tracking-tight`}>
                {stat.value}
              </div>
              <div className="text-slate-500 font-medium text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OutstandingResults;
