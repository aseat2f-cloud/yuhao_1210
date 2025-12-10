
import React from 'react';
import Hero from './Hero';
import OutstandingResults from './OutstandingResults';
import StudentTestimonials from './StudentTestimonials';
import CourseRoadmap from './CourseRoadmap';
import TeacherCarousel from './TeacherCarousel';
import HonorRoll from './HonorRoll';
import ParentTestimonials from './ParentTestimonials';
import ElementaryBanner from './ElementaryBanner';
import { NewsItem, PageType } from '../types';
import { ClipboardList } from 'lucide-react';

interface ElementaryPageProps {
  heroNews: NewsItem[];
  onNavigate: (page: PageType) => void;
}

const ElementaryPage: React.FC<ElementaryPageProps> = ({ heroNews, onNavigate }) => {
  
  const ELEMENTARY_QUICK_LINKS = [
    { label: '課程班別', href: '#course-roadmap' },
    { label: '教學成果', href: '#outstanding-results' },
    { label: '師資陣容', href: '#teacher-carousel' },
    { label: '家長見證', href: '#testimonials' },
  ];

  return (
    <div>
      <Hero 
        title={<>雙語奠基<br/><span className="text-green-500">數理啟蒙</span></>}
        topLabel="艾森樂美語 x 小育豪資優數學"
        gradeLabel="幼兒大班 ~ 小六"
        courseLabel="國.英.數.科學.資優升學"
        subtitle="啟發學習興趣，奠定紮實基礎。我們重視品格教育與全人發展，讓孩子快樂學習，自信成長。"
        newsItems={heroNews}
        onNavigate={onNavigate}
        showQuickLinks={true}
        quickLinks={ELEMENTARY_QUICK_LINKS}
        theme="green"
        secondaryBtnLabel="學習痛點分析"
        secondaryBtnIcon={<ClipboardList size={20} />}
      />

      {/* New Banner Section */}
      <ElementaryBanner />

      {/* 1. 亮眼成績 (ID: outstanding-results) */}
      <OutstandingResults theme="green" />

      {/* 2. 學員心得 */}
      <StudentTestimonials theme="green" />

      {/* 3. 課程規劃 (ID: course-roadmap) - Has internal green theme */}
      <CourseRoadmap />

      {/* 4. 師資陣容 (ID: teacher-carousel) - Has internal green theme */}
      <TeacherCarousel />

      {/* 5. 榮耀金榜 (Elementary Specific) */}
      <HonorRoll variant="elementary" theme="green" />

      {/* 6. 口碑推薦 (Parent Testimonials) */}
      <ParentTestimonials theme="green" />

    </div>
  );
};

export default ElementaryPage;
