
import React from 'react';
import { ArrowRight, Download, MapPin } from 'lucide-react';
import NewsCarousel from './NewsCarousel';
import { NewsItem, PageType } from '../types';

interface QuickLink {
  label: string;
  href: string;
}

interface HeroProps {
  title: React.ReactNode;
  subtitle: string;
  newsItems: NewsItem[];
  onCtaClick?: () => void;
  onNavigate?: (page: PageType) => void;
  topLabel?: string;
  gradeLabel?: string;
  courseLabel?: string;
  showQuickLinks?: boolean;
  quickLinks?: QuickLink[];
  theme?: 'primary' | 'green' | 'blue' | 'purple';
  secondaryBtnLabel?: string;
  secondaryBtnIcon?: React.ReactNode;
}

const ANIMATION_IMAGES = [
  "https://www.dropbox.com/scl/fi/7aw47z09uku0ol2ydxnh5/Y.svg?rlkey=2d52kglqn8nkfqs704zy3fq13&raw=1",
  "https://www.dropbox.com/scl/fi/70pcndj17wbgoujjbphzb/U.svg?rlkey=0wph677wnabdjoz0yd0cp92wm&raw=1",
  "https://www.dropbox.com/scl/fi/boiljwzvsues3ai6svtxv/H.svg?rlkey=geeqhyox3itg72o6hy9yjw496&raw=1",
  "https://www.dropbox.com/scl/fi/l0deq9hx3vji5fu6hsqi5/A.svg?rlkey=8cmggn02klwe07ujo0cgqd97i&raw=1",
  "https://www.dropbox.com/scl/fi/koia886j728lniy2ybcre/O.svg?rlkey=w27c9rjvgh08dathnw042aa1f&raw=1"
];

const Hero: React.FC<HeroProps> = ({ 
  title, 
  subtitle, 
  newsItems, 
  onCtaClick, 
  onNavigate,
  topLabel = "在地深耕40年, 板橋最優",
  gradeLabel,
  courseLabel,
  showQuickLinks = false,
  quickLinks,
  theme = 'primary',
  secondaryBtnLabel,
  secondaryBtnIcon
}) => {
  
  // Default Home Page Links
  const DEFAULT_LINKS: QuickLink[] = [
    { label: '分齡學程', href: '#program-planning' },
    { label: '教學成果', href: '#outstanding-results' },
    { label: '家長見證', href: '#testimonials' },
    { label: '學生專區', href: '#student-zone' },
  ];

  const linksToRender = quickLinks || DEFAULT_LINKS;

  const handleScrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Theme color mapping
  const themeColorMap = {
    primary: 'primary',
    green: 'green',
    blue: 'blue',
    purple: 'purple'
  };
  const t = themeColorMap[theme] || 'primary';

  // Default secondary button config
  const secLabel = secondaryBtnLabel || "下載教材試閱";
  const secIcon = secondaryBtnIcon || <Download size={20} />;

  return (
    <section className="relative pt-[40px] pb-16 lg:pt-0 lg:pb-0 lg:h-[97vh] lg:min-h-[684px] overflow-hidden bg-white bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:24px_24px]">
      <style>{`
        @keyframes complexRunHero {
          0% {
            left: 100%;
            transform: translateX(0) rotate(0deg);
          }
          /* RUN IN: Roll to ~Center Right */
          30% {
            left: 100%;
            transform: translateX(-40vw) rotate(-720deg); /* 2 turns */
          }
          
          /* BOUNCE: Jump twice */
          32% {
            left: 100%;
            transform: translateX(-42vw) translateY(-60px) rotate(-720deg);
          }
          34% {
            left: 100%;
            transform: translateX(-44vw) translateY(0) rotate(-720deg);
          }
          36% {
            left: 100%;
            transform: translateX(-46vw) translateY(-30px) rotate(-720deg);
          }
          38% {
            left: 100%;
            transform: translateX(-48vw) translateY(0) rotate(-720deg);
          }

          /* WIGGLE: Stop X movement, shake rotation */
          39% {
            left: 100%;
            transform: translateX(-48vw) rotate(-740deg);
          }
          41% {
            left: 100%;
            transform: translateX(-48vw) rotate(-700deg);
          }
          43% {
            left: 100%;
            transform: translateX(-48vw) rotate(-730deg);
          }
          45% {
            left: 100%;
            transform: translateX(-48vw) rotate(-710deg);
          }
          47% {
             left: 100%;
             transform: translateX(-48vw) rotate(-720deg); /* Back to upright */
          }

          /* RUN OUT: Roll off screen */
          100% {
            left: 100%;
            transform: translateX(-150vw) rotate(-1440deg);
          }
        }
        
        .yuhao-anim-item-hero {
          position: absolute;
          bottom: 0;
          width: 50px;
          height: 50px;
          animation: complexRunHero 15s linear infinite;
          z-index: 20;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-auto lg:h-full">
        {/* Main Flex Container: vertically centered and stretched height */}
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-center gap-12 lg:gap-16 h-auto lg:h-full">
          
          {/* Text Content Column */}
          <div className="flex-1 w-full flex flex-col justify-center lg:items-start items-center self-center lg:self-stretch">
            
            {/* 85% Height Wrapper for Desktop Vertical Alignment (Adjusted: Aligned with News at -3%) */}
            <div className="w-full h-auto lg:h-[85%] my-auto flex flex-col justify-center items-center lg:items-start lg:pl-[5%] lg:-translate-y-[3%]">
              
              <div className="w-full flex flex-col items-center lg:items-start">
                {/* Top Label */}
                <div className={`inline-flex items-center gap-2 px-5 py-2 bg-${t}-50 border border-${t}-100 rounded-full ${gradeLabel ? 'mb-4' : 'mb-6'} whitespace-nowrap shadow-sm bg-white`}>
                    <MapPin className={`text-${t}-600 w-5 h-5`} />
                    <span className={`text-${t}-700 font-bold text-base tracking-wide`}>{topLabel}</span>
                </div>

                {/* Grade & Course Labels */}
                {(gradeLabel || courseLabel) && (
                  <div className="mb-10 flex flex-nowrap justify-center lg:justify-start gap-3">
                    {gradeLabel && (
                      <span className="inline-block px-4 py-1.5 bg-slate-100 text-slate-600 font-bold rounded-md text-base border border-slate-200 whitespace-nowrap flex-shrink-0">
                        {gradeLabel}
                      </span>
                    )}
                    {courseLabel && (
                      <span className="inline-block px-4 py-1.5 bg-orange-50 text-orange-700 font-bold rounded-md text-base border border-orange-100 whitespace-nowrap flex-shrink-0">
                        {courseLabel}
                      </span>
                    )}
                  </div>
                )}

                {/* Main Title - Responsive sizing */}
                <h1 className="text-[4.5rem] md:text-[5.8rem] lg:text-[5.5vw] xl:text-[6.5rem] font-extrabold text-slate-900 tracking-tight leading-[1.05] mb-6">
                  {title}
                </h1>
                
                {/* Subtitle */}
                {/* 
                   Desktop: Reduce width to ~95% of previous 90% -> w-[85%]
                   Tablet (md): Reduce width to ~80% of previous 72% -> w-[58%]
                   Mobile: text-center
                */}
                <p className="text-lg md:text-xl text-slate-500 mb-8 w-[90%] md:w-[58%] lg:w-[85%] mx-auto lg:mx-0 leading-relaxed whitespace-pre-line font-medium text-center lg:text-left">
                  {subtitle}
                </p>

                {/* Main CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto mb-10">
                  <a 
                    href="#contact" 
                    onClick={(e) => {
                      if (onCtaClick) onCtaClick();
                      handleScrollTo(e, '#contact');
                    }}
                    className={`w-full sm:w-auto px-8 py-4 bg-${t}-600 text-white rounded-xl font-bold shadow-md shadow-${t}-500/20 hover:bg-${t}-700 hover:shadow-lg hover:shadow-${t}-600/30 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2`}
                  >
                    排隊預約試聽
                    <ArrowRight size={20} />
                  </a>
                  
                  <button 
                    className={`w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold shadow-sm hover:bg-slate-50 hover:border-${t}-200 hover:text-${t}-600 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2`}
                  >
                    {secLabel}
                    {secIcon}
                  </button>
                </div>

                {/* Quick Links */}
                {showQuickLinks && (
                  <div className="hidden lg:flex justify-center w-full sm:w-auto gap-3">
                    {linksToRender.map((link, index) => (
                      <a 
                        key={index}
                        href={link.href}
                        onClick={(e) => handleScrollTo(e, link.href)}
                        className="group w-20 h-20 bg-yellow-400 rounded-full flex flex-col items-center justify-center text-[15px] font-bold text-slate-900 hover:bg-yellow-300 hover:scale-110 transition-all cursor-pointer shadow-sm"
                      >
                         <span className="leading-tight text-center">
                            {link.label.substring(0, 2)}<br/>{link.label.substring(2)}
                         </span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: News Carousel - Adjusted to move up by 2% on desktop */}
          <div className="flex-1 w-full flex items-center justify-center lg:justify-end h-auto lg:h-full lg:-translate-y-[2%]">
            <NewsCarousel news={newsItems} onNavigate={onNavigate} />
          </div>

        </div>
      </div>

      {/* Animation Layer at the Bottom of Hero */}
      <div className="absolute bottom-0 left-0 w-full h-40 overflow-hidden pointer-events-none z-20">
        {ANIMATION_IMAGES.map((src, index) => (
          <img 
            key={index}
            src={src}
            alt="animation char"
            className="yuhao-anim-item-hero"
            style={{ 
              animationDelay: `${index * 2}s`, 
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
