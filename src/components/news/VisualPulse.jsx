// src/components/news/VisualPulse.jsx
import React, { useRef, useEffect } from 'react';
import { Maximize2 } from 'lucide-react';

// 🟢 الصور التجريبية لتوضيح تأثير التمرير اللانهائي
const demoImages = [
  { id: 1, title: 'ورشة عمل الذكاء الاصطناعي للشباب', url: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?q=80&w=800&auto=format&fit=crop', date: '12 مايو 2026', eventName: 'معسكر التكنولوجيا' },
  { id: 2, title: 'هاكاثون الابتكار الأردني', url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop', date: '08 مايو 2026', eventName: 'تحدي الابتكار' },
  { id: 3, title: 'فعالية ريادة الأعمال', url: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=800&auto=format&fit=crop', date: '05 مايو 2026', eventName: 'أسبوع الريادة' },
  { id: 4, title: 'لقاء حواري مع صناع القرار', url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop', date: '01 مايو 2026', eventName: 'منتدى تواصل' },
  { id: 5, title: 'تدريب المهارات القيادية', url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop', date: '28 أبريل 2026', eventName: 'برنامج القيادة' },
  { id: 6, title: 'إطلاق مبادرة مسار', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop', date: '25 أبريل 2026', eventName: 'مبادرة مسار' },
  { id: 7, title: 'معرض المشاريع الناشئة', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop', date: '20 أبريل 2026', eventName: 'معرض الشركات' },
  { id: 8, title: 'تكريم المتطوعين المتميزين', url: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=800&auto=format&fit=crop', date: '15 أبريل 2026', eventName: 'يوم التطوع' },
  { id: 9, title: 'جلسة التوجيه المهني', url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop', date: '10 أبريل 2026', eventName: 'برنامج خطوتك' },
  { id: 10, title: 'مؤتمر الشباب التقني', url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop', date: '05 أبريل 2026', eventName: 'مؤتمر TechYouth' },
];

export default function VisualPulse({ onImageClick }) {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  // حفظ الـ Index الأصلي لتفتح الصورة الصحيحة في النافذة المنبثقة
  const imagesWithIndex = demoImages.map((img, idx) => ({ ...img, originalIndex: idx }));
  
  // تقسيم الصور إلى شريطين
  const row1 = imagesWithIndex.filter((_, i) => i % 2 === 0);
  const row2 = imagesWithIndex.filter((_, i) => i % 2 !== 0);

  // 🟢 تكرار الصور 3 مرات لضمان استمرارية التمرير اللانهائي بسلاسة (Seamless Loop)
  const infiniteRow1 = [...row1, ...row1, ...row1];
  const infiniteRow2 = [...row2, ...row2, ...row2];

  // 🟢 معالج التمرير اللانهائي (Infinite Loop Logic)
  const handleScroll = (ref, rowLength) => {
    if (!ref.current) return;
    
    const scrollLeft = ref.current.scrollLeft;
    const scrollWidth = ref.current.scrollWidth;
    const clientWidth = ref.current.clientWidth;
    const oneRowWidth = scrollWidth / 3; // لأننا كررنا 3 مرات

    // إذا وصلنا للنهاية، نعود للبداية بسلاسة
    if (scrollLeft >= oneRowWidth * 2 - 10) {
      ref.current.scrollLeft = oneRowWidth - 10;
    }
    // إذا وصلنا للبداية جداً، ننتقل للصف الثاني
    else if (scrollLeft <= 10) {
      ref.current.scrollLeft = oneRowWidth + 10;
    }
  };

  // تطبيق infinite loop عند كل scroll
  useEffect(() => {
    const row1Element = row1Ref.current;
    const row2Element = row2Ref.current;

    // حالة التتبع للماوس
    let isMouseDown = false;
    let startX = 0;
    let scrollLeft = 0;

    // معالج wheel event للتمرير بالماوس (Mouse Wheel)
    const handleWheel = (e) => {
      e.preventDefault();
      const scrollAmount = e.deltaY > 0 ? 80 : -80;
      e.currentTarget.scrollLeft += scrollAmount;
      handleScroll(e.currentTarget, row1.length);
    };

    // معالج mouse down - بداية الجر
    const handleMouseDown = (e) => {
      isMouseDown = true;
      startX = e.pageX - e.currentTarget.offsetLeft;
      scrollLeft = e.currentTarget.scrollLeft;
      e.currentTarget.style.cursor = 'grabbing';
    };

    // معالج mouse move - تحريك الجر
    const handleMouseMove = (e) => {
      if (!isMouseDown) return;
      e.preventDefault();
      
      const x = e.pageX - e.currentTarget.offsetLeft;
      const walk = (x - startX) * -1; // معاكسة الاتجاه
      e.currentTarget.scrollLeft = scrollLeft + walk;
    };

    // معالج mouse up/leave - نهاية الجر
    const handleMouseUp = (e) => {
      isMouseDown = false;
      e.currentTarget.style.cursor = 'grab';
    };

    const handleMouseLeave = (e) => {
      isMouseDown = false;
      e.currentTarget.style.cursor = 'grab';
    };

    // معالج scroll للـ infinite loop
    const handleScrollEvent = (e) => {
      handleScroll(e.currentTarget, row1.length);
    };

    // معالج touch events للهواتف والتابلت (Swipe Support)
    let touchStartX = 0;
    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      const touchCurrentX = e.touches[0].clientX;
      const diff = touchStartX - touchCurrentX;
      e.currentTarget.scrollLeft += diff;
      touchStartX = touchCurrentX;
    };

    // إضافة event listeners لكل صف
    const setupEventListeners = (element) => {
      element.addEventListener('wheel', handleWheel, { passive: false });
      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseup', handleMouseUp);
      element.addEventListener('mouseleave', handleMouseLeave);
      element.addEventListener('scroll', handleScrollEvent);
      element.addEventListener('touchstart', handleTouchStart, { passive: true });
      element.addEventListener('touchmove', handleTouchMove, { passive: true });
      
      // تعيين cursor ابتدائي
      element.style.cursor = 'grab';
    };

    // إزالة event listeners
    const removeEventListeners = (element) => {
      element.removeEventListener('wheel', handleWheel);
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('scroll', handleScrollEvent);
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
    };

    if (row1Element) {
      setupEventListeners(row1Element);
    }

    if (row2Element) {
      setupEventListeners(row2Element);
    }

    return () => {
      if (row1Element) {
        removeEventListeners(row1Element);
      }
      if (row2Element) {
        removeEventListeners(row2Element);
      }
    };
  }, []);

  // 🟢 كرت الصورة
  const ImageCard = ({ item }) => (
    <div
      onClick={() => onImageClick(item.originalIndex)}
      className="relative rounded-[clamp(1rem,1.5vw,1.25rem)] overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-gray-100 shrink-0 border border-gray-200/50 
        w-[220px] h-[150px] sm:w-[260px] sm:h-[170px] md:w-[300px] md:h-[200px] lg:w-[320px] lg:h-[220px]"
    >
      <img 
        src={item.url} 
        alt={item.title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0409]/95 via-[#1a0409]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-500 ease-out border border-white/30">
          <Maximize2 className="w-5 h-5 text-white" />
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10 text-right flex flex-col gap-1">
        <span className="text-[#C08F2D] font-bold text-[10px] sm:text-xs">
          {item.eventName}
        </span>
        <h4 className="text-white font-black text-sm sm:text-base leading-tight line-clamp-2 drop-shadow-md">
          {item.title}
        </h4>
      </div>
    </div>
  );

  // مكون فرعي لإنشاء محتوى الشريط
  const RowContent = ({ items }) => (
    <div className="flex gap-[clamp(1rem,1.5vw,1.5rem)] pl-[clamp(1rem,1.5vw,1.5rem)] shrink-0">
      {items.map((img, idx) => (
        <ImageCard key={`${img.id}-${idx}`} item={img} />
      ))}
    </div>
  );

  return (
    <div className="bg-[#fcfcfc] py-[clamp(4rem,8vh,6rem)] border-t border-gray-100 overflow-hidden relative" dir="rtl">
      
      {/* 🟢 أكواد الـ CSS لتحسين تجربة التمرير */}
      <style>
        {`
          .scroll-container {
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
          }
          .scroll-container::-webkit-scrollbar {
            display: none;
          }
          .scroll-container {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      {/* الهيدر */}
      <div className="flex flex-col items-center justify-center text-center mb-[clamp(2.5rem,5vh,4rem)] px-[clamp(1rem,4vw,2rem)]">
        <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-black text-[#8a1538] tracking-tight mb-2">عدسة الميدان</h2>
      </div>

      {/* 🟢 حاويات التمرير مع ميزة التمرير اللانهائي */}
      <div className="w-full flex flex-col gap-[clamp(1rem,1.5vw,1.5rem)]">
        
        {/* الشريط الأول - قابل للتمرير يميناً ويساراً */}
        <div 
          ref={row1Ref}
          className="flex w-full overflow-x-auto scroll-container gap-[clamp(1rem,1.5vw,1.5rem)] px-[clamp(1rem,1.5vw,1.5rem)]"
        >
          {infiniteRow1.map((img, idx) => (
            <ImageCard key={`row1-${img.id}-${idx}`} item={img} />
          ))}
        </div>

        {/* الشريط الثاني - قابل للتمرير أيضاً */}
        <div 
          ref={row2Ref}
          className="flex w-full overflow-x-auto scroll-container gap-[clamp(1rem,1.5vw,1.5rem)] px-[clamp(1rem,1.5vw,1.5rem)]"
        >
          {infiniteRow2.map((img, idx) => (
            <ImageCard key={`row2-${img.id}-${idx}`} item={img} />
          ))}
        </div>

      </div>
      
    </div>
  );
}