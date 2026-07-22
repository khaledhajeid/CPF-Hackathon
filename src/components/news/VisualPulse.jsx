// src/components/news/VisualPulse.jsx
import { useRef, useEffect } from 'react';
import { Maximize2 } from 'lucide-react';
import { pulseImages } from '../../data/newsData';

export default function VisualPulse({ onImageClick }) {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const isPaused1 = useRef(false);
  const isPaused2 = useRef(false);

  // حفظ الـ Index الأصلي لتفتح الصورة الصحيحة في النافذة المنبثقة (نفس مصدر البيانات المستخدم في المعرض المنبثق بصفحة الأخبار)
  const imagesWithIndex = pulseImages.map((img, idx) => ({ ...img, originalIndex: idx }));
  
  // تقسيم الصور إلى شريطين
  const row1 = imagesWithIndex.filter((_, i) => i % 2 === 0);
  const row2 = imagesWithIndex.filter((_, i) => i % 2 !== 0);

  // 🟢 تكرار الصور 3 مرات لضمان استمرارية التمرير اللانهائي بسلاسة (Seamless Loop)
  const infiniteRow1 = [...row1, ...row1, ...row1];
  const infiniteRow2 = [...row2, ...row2, ...row2];

  // 🟢 معالج التمرير اللانهائي (Infinite Loop Logic)
  const handleScroll = (ref) => {
    if (!ref.current) return;

    const scrollLeft = ref.current.scrollLeft;
    const scrollWidth = ref.current.scrollWidth;
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

  // تطبيق infinite loop عند كل scroll + وضع البداية في منتصف الشريط المكرر
  useEffect(() => {
    const row1Element = row1Ref.current;
    const row2Element = row2Ref.current;

    // 🟢 نضع نقطة البداية في منتصف الشريط (الصف الثاني من التكرار) حتى يقدر يتحرك بالاتجاهين بدون توقف
    if (row1Element) {
      const oneRowWidth = row1Element.scrollWidth / 3;
      row1Element.scrollLeft = oneRowWidth;
    }
    if (row2Element) {
      const oneRowWidth = row2Element.scrollWidth / 3;
      row2Element.scrollLeft = oneRowWidth;
    }

    // حالة التتبع للماوس
    let isMouseDown = false;
    let startX = 0;
    let scrollLeft = 0;

    // معالج wheel event للتمرير بالماوس (Mouse Wheel)
    const handleWheel = (e) => {
      e.preventDefault();
      const scrollAmount = e.deltaY > 0 ? 80 : -80;
      e.currentTarget.scrollLeft += scrollAmount;
      handleScroll(e.currentTarget);
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
      handleScroll(e.currentTarget);
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
    const setupEventListeners = (element, pausedRef) => {
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

      // 🟢 إيقاف التحرك التلقائي أثناء تفاعل المستخدم، واستئنافه بعد فترة قصيرة
      const pause = () => { pausedRef.current = true; };
      const resumeLater = () => {
        clearTimeout(element._resumeTimer);
        element._resumeTimer = setTimeout(() => { pausedRef.current = false; }, 1500);
      };

      element.addEventListener('mouseenter', pause);
      element.addEventListener('mouseleave', resumeLater);
      element.addEventListener('touchstart', pause, { passive: true });
      element.addEventListener('touchend', resumeLater, { passive: true });
      element.addEventListener('wheel', resumeLater, { passive: true });

      element._pauseHandler = pause;
      element._resumeHandler = resumeLater;
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
      element.removeEventListener('mouseenter', element._pauseHandler);
      element.removeEventListener('mouseleave', element._resumeHandler);
      element.removeEventListener('touchstart', element._pauseHandler);
      element.removeEventListener('touchend', element._resumeHandler);
      element.removeEventListener('wheel', element._resumeHandler);
      clearTimeout(element._resumeTimer);
    };

    if (row1Element) {
      setupEventListeners(row1Element, isPaused1);
    }

    if (row2Element) {
      setupEventListeners(row2Element, isPaused2);
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

  // 🟢 الحركة التلقائية المستمرة بالاتجاهين (الشريط الأول لليسار، الثاني لليمين)
  useEffect(() => {
    let frameId;
    const SPEED = 0.6; // بكسل لكل فريم — تحكم بالسرعة من هنا

    const step = () => {
      if (row1Ref.current && !isPaused1.current) {
        row1Ref.current.scrollLeft += SPEED;
        handleScroll(row1Ref);
      }
      if (row2Ref.current && !isPaused2.current) {
        row2Ref.current.scrollLeft -= SPEED;
        handleScroll(row2Ref);
      }
      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // 🟢 كرت الصورة
  const ImageCard = ({ item }) => (
    <div
      onClick={() => onImageClick(item.originalIndex)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onImageClick(item.originalIndex); } }}
      tabIndex={0}
      role="button"
      aria-label={item.title}
      className="relative rounded-[clamp(1rem,1.5vw,1.25rem)] overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-gray-100 shrink-0 border border-gray-200/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C08F2D] focus-visible:ring-offset-2
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
        {item.eventName && (
          <span className="text-[#C08F2D] font-bold text-[10px] sm:text-xs">
            {item.eventName}
          </span>
        )}
        <p className="text-white font-black text-sm sm:text-base leading-tight line-clamp-2 drop-shadow-md">
          {item.title}
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-[#fcfcfc] py-[clamp(4rem,8vh,6rem)] border-t border-gray-100 overflow-hidden relative" dir="rtl">
      
      {/* 🟢 أكواد الـ CSS لتحسين تجربة التمرير */}
      <style>
        {`
          .scroll-container {
            scroll-behavior: auto;
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

      {/* 🟢 حاويات التمرير مع الحركة التلقائية وتلاشي الحواف */}
      <div className="w-full flex flex-col gap-[clamp(1rem,1.5vw,1.5rem)]">
        
        {/* الشريط الأول - يتحرك تلقائياً لليسار */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-[#fcfcfc] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-[#fcfcfc] to-transparent z-10" />
          <div 
            ref={row1Ref}
            className="flex w-full overflow-x-auto scroll-container gap-[clamp(1rem,1.5vw,1.5rem)] px-[clamp(1rem,1.5vw,1.5rem)]"
          >
            {infiniteRow1.map((img, idx) => (
              <ImageCard key={`row1-${img.id}-${idx}`} item={img} />
            ))}
          </div>
        </div>

        {/* الشريط الثاني - يتحرك تلقائياً لليمين (اتجاه معاكس) */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-[#fcfcfc] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-[#fcfcfc] to-transparent z-10" />
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
      
    </div>
  );
}