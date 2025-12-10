
import React from 'react';
import { Lightbulb, Heart, Target, Trophy, GraduationCap, ShieldCheck } from 'lucide-react';
import { FeatureItem } from '../types';

const FEATURES: FeatureItem[] = [
  {
    title: '育豪的理念',
    description: '注重學生差異，鼓勵學生成功',
    icon: <Lightbulb className="w-6 h-6 text-white" />,
  },
  {
    title: '育豪的特色',
    description: '一份愛心，使我們與眾不同',
    icon: <Heart className="w-6 h-6 text-white" />,
  },
  {
    title: '育豪的目標',
    description: '每個孩子都是寶，每個孩子都要好',
    icon: <Target className="w-6 h-6 text-white" />,
  },
  {
    title: '育豪的成果',
    description: '在這裡，每個孩子都在創造奇蹟',
    icon: <Trophy className="w-6 h-6 text-white" />,
  },
  {
    title: '育豪的師資',
    description: '用情授課、用心解惑、口碑最佳',
    icon: <GraduationCap className="w-6 h-6 text-white" />,
  },
  {
    title: '育豪的承諾',
    description: '陪伴成長，見證蛻變，成就未來',
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
  }
];

const Features: React.FC = () => {
  return (
    <section id="courses" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor - Subtler */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-50 translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-primary-600 font-bold tracking-wide uppercase text-sm mb-3">為什麼選擇我們</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">育豪的六大堅持</h3>
          <p className="max-w-2xl mx-auto text-slate-500 text-lg leading-relaxed">
            我們不僅僅是補習班，更是孩子學習路上的引路人。透過系統化的教學與個別化的關懷，激發潛能，成就非凡。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {FEATURES.map((feature, index) => (
            <div 
              key={index} 
              className="group p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary-100 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform duration-300 shrink-0">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 group-hover:text-primary-700 transition-colors">{feature.title}</h4>
              </div>
              <p className="text-slate-600 leading-relaxed text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
