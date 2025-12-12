
import React from 'react';
import Hero from './Hero';
import OutstandingResults from './OutstandingResults';
import StudentTestimonials from './StudentTestimonials';
import JuniorCourseRoadmap from './JuniorCourseRoadmap';
import JuniorTeacherCarousel from './JuniorTeacherCarousel';
import HonorRoll from './HonorRoll';
import ParentTestimonials from './ParentTestimonials';
import JuniorBanner from './JuniorBanner';
import { NewsItem, PageType } from '../types';
import { FileCheck } from 'lucide-react';

interface JuniorPageProps {
  heroNews: NewsItem[];
  onNavigate: (page: PageType) => void;
}

const JuniorPage: React.FC<JuniorPageProps> = ({ heroNews, onNavigate }) => {
  
  const JUNIOR_QUICK_LINKS = [
    { label: '課程班別', href: '#course-roadmap' },
    { label: '教學成果', href: '#outstanding-results' },
    { label: '師資陣容', href: '#junior-teachers' },
    { label: '家長見證', href: '#testimonials' },
  ];

  return (
    <div>
      <Hero 
        title={<>學霸起點<br/><span className="text-blue-600">育豪領航</span></>}
        topLabel="育豪資優 國中部"
        gradeLabel="國七 ~ 國九"
        courseLabel="新生先修. 國中全科. 寒暑衝刺"
        subtitle="會考衝刺首選，精準命題，弱點擊破。陪伴青春期的孩子找到讀書的方法與目標。"
        newsItems={heroNews}
        onNavigate={onNavigate}
        showQuickLinks={true}
        quickLinks={JUNIOR_QUICK_LINKS}
        theme="blue"
        secondaryBtnLabel="學歷程度測驗"
        secondaryBtnIcon={<FileCheck size={20} />}
      />

      {/* 1. Image Carousel Banner */}
      <JuniorBanner />

      {/* 2. Outstanding Results (亮眼成績 - 版面同首頁) */}
      <OutstandingResults theme="blue" />

      {/* 3. Student Testimonials (學員心得 - 版面同國小) */}
      <StudentTestimonials theme="blue" />

      {/* 4. Course Roadmap (課程規劃 - 版面同國小, 國中專屬內容) */}
      <JuniorCourseRoadmap />

      {/* 5. Teachers (師資陣容 - 版面同國小, 國中專屬圖片) */}
      <JuniorTeacherCarousel />

      {/* 6. Honor Roll (榮耀金榜 - 校排前十/會考滿分/建北錄取) */}
      <HonorRoll variant="junior" theme="blue" />

      {/* 7. Parent Testimonials (口碑推薦 - 版面同國小) */}
      <ParentTestimonials theme="blue" />

    </div>
  );
};

export default JuniorPage;
