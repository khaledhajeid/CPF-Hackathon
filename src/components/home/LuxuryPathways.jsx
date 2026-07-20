// src/components/home/LuxuryPathways.jsx
import { useState, useEffect } from 'react';
import { ArrowUpLeft, Target, Users, BookOpen } from 'lucide-react';

export default function LuxuryPathways({ onPathwaySelect, onNavigate, setActiveProgramName }) {
  const [activeCard, setActiveCard] = useState(0); 
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const pathways = [
    {
      id: 'تعلّم', goal: 'أسعى إلى تطوير مهاراتي التقنية والعملية', name: 'تعلّم', shortName: 'تعلّم',
      brands: [
      'جامعة الحسين التقنية',
      '42 عمّان و42 إربد',
      'كلية التدريب المهني المتقدم في الأردن',
      'مساحة الصنّاع',
      'مبرمجو الأردن',
      'ملتقى الصناع'
      ],
      icon: BookOpen,
      bgImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000',
      closedOverlay: 'bg-[#a00023]/85', openGradient: 'from-[#2b0009] via-[#a00023]/10 to-transparent'
    },
    {
      id: 'قُد', goal: 'اسعى الى ان أكون قائدا وصانع للتغيير', name: 'قُد', shortName: 'قُد',
      brands: ['برنامج خطى الحسين', 'برنامج القيادة للمدارس', 'مركز الشباب العربي-الاردن', 'جائزة ولي العهد لأفضل تطبيق خدمات حكومية', 'منتدى تواصل'],
      icon: Target,
      bgImage: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000',
      closedOverlay: 'bg-[#2b307e]/85', openGradient: 'from-[#121433] via-[#2b307e]/10 to-transparent'
    },
    {
      id: 'اصنع الأثر', goal: 'اسعى الى التطوع و خدمة المجتمع', name: 'اصنع الأثر', shortName: 'اصنع الأثر',
      brands: ['نَحْنُ', 'الحملات المجتمعية والاستجابات الإنسانية', 'جائزة الحسين بن عبد الله الثاني للعمل التطوعي'],
      icon: Users,
      bgImage: 'https://cpf.jo/wp-content/uploads/2024/01/Nahno-%E2%94%98a%E2%95%AA%C2%A1%E2%94%98a.jpg',
      closedOverlay: 'bg-[#1f5412]/85', openGradient: 'from-[#0e2608] via-[#1f5412]/10 to-transparent'
    }
  ];

  return (
    // 🟢 تقليل الـ padding العمودي قليلاً في الـ lg ورفعه في الـ 2xl
    <div id="strategic-pathways" className="py-16 lg:py-20 xl:py-24 2xl:py-32 bg-white relative overflow-hidden w-full font-sans scroll-mt-20" dir="rtl">
      
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12 text-right mb-8 lg:mb-12 xl:mb-16 relative z-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black text-[#8a1538] tracking-tight">
          طموحك يحدد <span className="text-[#C08F2D]">مسارك</span>
        </h2>
      </div>

      {/* 🟢 التدرج السحري للارتفاع: 480px للـ 13 إنش، 550px للـ 15 إنش، و 650px للشاشات العملاقة */}
      <div className="flex flex-row lg:flex-row gap-4 lg:gap-5 xl:gap-6 2xl:gap-8 h-[450px] lg:h-[480px] xl:h-[550px] 2xl:h-[650px] w-full px-4 lg:px-8 xl:px-12 mx-auto overflow-x-auto lg:overflow-visible snap-x snap-mandatory scrollbar-hide pb-4 lg:pb-0">
        {pathways.map((path, index) => {
          const isActive = isTouchDevice ? true : activeCard === index; 
          const Icon = path.icon;

          return (
            <div
              key={path.id}
              onMouseEnter={() => { if (!isTouchDevice) setActiveCard(index); }}
              onFocus={() => { if (!isTouchDevice) setActiveCard(index); }}
              onClick={() => onPathwaySelect(path.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPathwaySelect(path.id); } }}
              tabIndex={0}
              role="button"
              aria-label={path.name}
              className={`relative rounded-[2rem] overflow-hidden cursor-pointer group transition-[flex,shadow] duration-500 ease-in-out border border-gray-100 will-change-[flex] snap-center shrink-0 w-[85vw] sm:w-[60vw] lg:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C08F2D] focus-visible:ring-offset-2
                ${isTouchDevice ? 'shadow-lg' : (isActive ? 'flex-[4] shadow-2xl z-10' : 'flex-[1] shadow-md hover:shadow-xl')}
              `}
            >
              <img 
                src={path.bgImage} alt={path.name} 
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform ${isActive ? 'scale-100' : 'scale-105'}`} 
              />
              
              <div className={`absolute inset-0 ${path.closedOverlay} transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-100'}`}></div>
              <div className={`absolute inset-0 bg-gradient-to-t ${path.openGradient} transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>

              <div className={`absolute inset-0 p-6 lg:p-6 xl:p-8 2xl:p-10 flex flex-col transition-opacity duration-300 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="flex flex-col items-center justify-center my-auto lg:mt-auto gap-3 xl:gap-4">
                  {/* 🟢 أيقونة الكرت المغلق تتدرج بالحجم */}
                  <div className="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 rounded-full bg-black/15 backdrop-blur-sm flex items-center justify-center border border-white/40 shrink-0">
                    <Icon className="w-6 h-6 lg:w-6 lg:h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-black text-[#C08F2D] text-xl lg:text-xl xl:text-2xl 2xl:text-3xl tracking-wide drop-shadow-md">{path.shortName}</h3>
                </div>
              </div>

              {/* 🟢 عرض الكرت المفتوح: 450px للـ lg عشان يتنفس، و 600px للـ xl */}
              <div className={`absolute bottom-0 right-0 p-5 lg:p-8 xl:p-10 2xl:p-14 flex flex-col justify-end lg:justify-between h-full transition-opacity duration-500 ease-out shrink-0 w-full lg:w-[450px] xl:w-[600px] 2xl:w-[700px] ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="hidden lg:flex items-center gap-3 xl:gap-4 relative z-10 mb-8 pt-4">
                  <div className="w-12 h-12 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 rounded-2xl bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl shrink-0">
                    <Icon className="w-6 h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]" />
                  </div>
                  <div className="px-4 py-1.5 xl:px-5 xl:py-2 2xl:px-6 2xl:py-3 bg-[#C08F2D] rounded-lg text-[12px] xl:text-[13px] 2xl:text-[15px] font-black text-[#1a0409] border border-white/20 shadow-md">{path.name}</div>
                </div>

                <div className="w-full relative z-10 mt-auto lg:pt-4 text-right">
                  <div className="lg:hidden w-10 h-10 bg-black/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-3">
                     <Icon className="w-5 h-5 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]" />
                  </div>

                  {/* 🟢 تدرج أحجام النصوص للكرت المفتوح */}
                  <h3 className="font-black text-white text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl leading-tight mb-4 lg:mb-5 xl:mb-6 drop-shadow-lg">{path.goal}</h3>

                  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-6 lg:mb-6 xl:mb-8 w-full">
                    {path.brands.map(brand => (
                      <button
                        key={brand}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProgramName?.(brand);
                          onNavigate?.('program_details');
                        }}
                        onKeyDown={(e) => e.stopPropagation()}
                        className="text-[9px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px] font-black text-white bg-[#C08F2D]/20 hover:bg-[#C08F2D]/40 px-2 lg:px-2.5 xl:px-3 py-1 lg:py-1.5 rounded-md border border-[#C08F2D]/40 backdrop-blur-sm truncate transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C08F2D] focus-visible:ring-offset-1"
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                  
                  <button className="flex items-center gap-2 text-white font-black text-[13px] lg:text-sm xl:text-base 2xl:text-xl hover:text-[#C08F2D] transition-colors w-fit group/btn cursor-pointer">
                    <span>استكشف المبادرات</span> 
                    <ArrowUpLeft className="w-4 h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 transform group-hover/btn:-translate-x-1 group-hover/btn:-translate-y-1 transition-transform" strokeWidth={2.5} />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}