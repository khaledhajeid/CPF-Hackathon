// src/components/home/LuxuryPathways.jsx
import React, { useState, useEffect } from 'react';
import { ArrowUpLeft, Target, Users, BookOpen } from 'lucide-react';

export default function LuxuryPathways({ onPathwaySelect }) {
  const [activeCard, setActiveCard] = useState(0); // 🟢 خليت الافتراضي 0 (المسار الأول)
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // 🟢 المسارات الثلاثة الرسمية بعد تنظيف البرامج الملغية وتحديث الأسماء
  const pathways = [
    {
      id: 'تعلّم',
      goal: 'أريد تطوير مهاراتي التقنية والعملية',
      name: 'تعلّم',
      shortName: 'تعلّم',
      number: 'الأول',
      desc: 'منظومة متكاملة تهدف لإعداد الشباب لوظائف المستقبل، وتزويدهم بأحدث مهارات الابتكار والبرمجة والتصنيع الرقمي.',
      brands: [
        'جامعة الحسين التقنية', 
        'مركز التميز للريادة والابتكار', 
        '42 عمّان و42 إربد', 
        'كلية التدريب المهني المتقدم', 
        'مساحة الصنّاع', 
        'مبرمجو الأردن',
        'برنامج التدريب الدّولي'
      ],
      icon: BookOpen,
      bgImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071',
      closedOverlay: 'bg-[#2b307e]/85', 
      openGradient: 'from-[#121433] via-[#2b307e]/50 to-transparent' 
    },
    {
      id: 'قُد',
      goal: 'أريد أن أكون قائداً وصانع قرار',
      name: 'قُد',
      shortName: 'قُد',
      number: 'الثاني',
      desc: 'برامج مصممة لبناء وتطوير القدرات القيادية والمهارات الحياتية للشباب، لتمكينهم من ترك أثر إيجابي دائم في مجتمعاتهم.',
      brands: [
        'برنامج خطى الحسين', 
        'برنامج القيادة للمدارس'
      ],
      icon: Target,
      bgImage: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2049',
      closedOverlay: 'bg-[#8a1538]/85', // 🟢 توحيد اللون العنابي
      openGradient: 'from-[#3b1019] via-[#8a1538]/50 to-transparent' 
    },
    {
      id: 'اصنع الأثر',
      goal: 'أريد التطوع وخدمة مجتمعي',
      name: 'اصنع الأثر',
      shortName: 'اصنع الأثر',
      number: 'الثالث',
      desc: 'انضم لآلاف المتطوعين عبر منصة "نحن" وشارك في الحملات الإنسانية التي تخدم مجتمعك وتساهم في التنمية المستدامة في كافة المحافظات.',
      brands: ['نَحْنُ', 'الحملات والاستجابات الإنسانية', 'جائزة ولي العهد لأفضل تطبيق خدمات حكومية', 'جائزة الحسين بن عبد الله الثاني للعمل التطوعي'],
      icon: Users,
      bgImage: 'https://cpf.jo/wp-content/uploads/2024/01/Nahno-%E2%94%98a%E2%95%AA%C2%A1%E2%94%98a.jpg',
      closedOverlay: 'bg-[#1f5412]/85', 
      openGradient: 'from-[#0e2608] via-[#1f5412]/50 to-transparent'
    }
  ];

  return (
    <div 
      id="strategic-pathways" 
      className="py-20 md:py-24 bg-white relative overflow-hidden w-full font-sans scroll-mt-20 lg:scroll-mt-28" 
      dir="rtl"
    >
      
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 text-right mb-10 md:mb-16 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <img src="/arrow-yellow.svg" className="w-6 h-6 md:w-8 md:h-8 shrink-0" alt="" />
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-[#8a1538] tracking-tight">
            طموحك يحدد <span className="text-[#C08F2D]">مسارك</span>
          </h2>
        </div>
        <p className="mt-4 text-[#4c4c4c] font-medium max-w-2xl text-base md:text-lg leading-relaxed">
          لا تبحث عن المسميات، ابحث عن شغفك. اختر الهدف الذي تسعى إليه وسنقوم بتوجيهك للبرامج المناسبة.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 h-[750px] lg:h-[600px] w-full px-4 lg:px-8 mx-auto">
        {pathways.map((path, index) => {
          const isActive = activeCard === index;
          const Icon = path.icon;

          return (
            <div
              key={path.id}
              onMouseEnter={() => {
                if (!isTouchDevice) setActiveCard(index);
              }}
              onClick={() => {
                if (isActive) {
                  onPathwaySelect(path.id);
                } else {
                  setActiveCard(index);
                }
              }}
              className={`relative rounded-3xl overflow-hidden cursor-pointer group transition-[flex,shadow] duration-500 ease-in-out border border-gray-100 will-change-[flex]
                ${isActive ? 'flex-[4] shadow-2xl z-10' : 'flex-[1] shadow-md hover:shadow-xl'}
              `}
            >
              <img 
                src={path.bgImage} alt={path.name} 
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform
                  ${isActive ? 'scale-100' : 'scale-105 group-hover:scale-110'}`} 
              />
              
              <div className={`absolute inset-0 ${path.closedOverlay} transition-opacity duration-500 
                ${isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-90'}`}>
              </div>
              
              <div className={`absolute inset-0 bg-gradient-to-t ${path.openGradient} transition-opacity duration-500 
                ${isActive ? 'opacity-100' : 'opacity-0'}`}>
              </div>

              <div className={`absolute inset-0 p-6 lg:p-8 flex flex-col transition-opacity duration-300
                ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-150'}`}
              >
                {/* 🟢 توحيد لون زر المسار الصغير */}
                <div className="hidden lg:block absolute top-8 right-8 px-4 py-1.5 bg-[#8a1538] rounded-lg text-white text-[11px] font-black border border-white/20 shadow-md">
                   {`المسار ${path.number}`}
                </div>

                <div className="flex flex-row lg:flex-col items-center lg:items-start justify-center lg:justify-end my-auto lg:my-0 lg:mt-auto group-hover:-translate-y-2 transition-transform duration-500 gap-4 lg:gap-0">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-transparent flex items-center justify-center border border-white/40 lg:mb-4 group-hover:bg-white/10 transition-colors shrink-0">
                    <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-black text-[#C08F2D] text-xl lg:text-2xl tracking-wide drop-shadow-md">
                    {path.shortName}
                  </h3>
                </div>
              </div>

              <div className={`absolute bottom-0 right-0 p-6 sm:p-8 lg:p-12 flex flex-col justify-end lg:justify-between h-full transition-opacity duration-500 ease-out shrink-0 w-full lg:w-[600px]
                ${isActive ? 'opacity-100 delay-200' : 'opacity-0 pointer-events-none'}`}
              >
                <div className="hidden lg:flex items-center gap-4 relative z-10 mb-8 pt-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl shrink-0">
                    <Icon className="w-8 h-8 text-[#C08F2D]" />
                  </div>
                  <div className="px-5 py-2 bg-[#C08F2D] rounded-lg text-[13px] font-black text-white border border-white/20 shadow-md">
                    {path.name}
                  </div>
                </div>

                <div className="w-full relative z-10 mt-auto lg:pt-4 text-right">
                  <h3 className="font-black text-white text-2xl sm:text-3xl md:text-4xl leading-tight mb-3 lg:mb-4 drop-shadow-lg">
                    {path.goal}
                  </h3>
                  
                  <p className="hidden sm:block text-white/90 font-medium text-sm md:text-base leading-relaxed mb-6 lg:mb-8 drop-shadow-md">
                    {path.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6 lg:mb-8 max-w-xl">
                    {path.brands.map(brand => (
                      <span key={brand} className="text-[10px] md:text-[12px] font-black text-white bg-[#C08F2D]/20 px-3 py-1.5 md:py-2 rounded-md border border-[#C08F2D]/40 backdrop-blur-sm shadow-sm hover:bg-[#C08F2D]/30 transition-colors">
                        {brand}
                      </span>
                    ))}
                  </div>
                  
                  <button 
                    className="flex items-center gap-2 md:gap-3 text-white font-black text-sm md:text-base hover:text-[#C08F2D] transition-colors w-fit group/btn cursor-pointer"
                  >
                    <span>استكشف الفرص والمبادرات</span> 
                    <ArrowUpLeft className="w-5 h-5 md:w-6 md:h-6 transform group-hover/btn:-translate-x-1 group-hover/btn:-translate-y-1 transition-transform" strokeWidth={2.5} />
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