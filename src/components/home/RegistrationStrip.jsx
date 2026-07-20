// src/components/home/RegistrationStrip.jsx
import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowUpLeft, ChevronLeft, ChevronRight } from 'lucide-react';

const AUTOPLAY_SPEED = 0.55; // px per animation frame
const SCROLL_STEP = 380; // px scrolled per arrow click, ~one card + gap

// 🟢 مصفوفة جاهزة للربط بأي CMS لاحقاً — أضف/أخفِ فرصة بتعديل active فقط
const OPPORTUNITIES = [
  {
    id: 'htux',
    active: true,
    tag: 'تعلّم عن بُعد',
    title: 'كورسات HTUx',
    description: 'محتوى تدريبي رقمي يتيح لك تطوير مهاراتك بالسرعة التي تناسبك، أينما كنت.',
    cta: 'ابدأ التعلم',
    href: 'https://htux.org/',
    image: 'https://htux.org/wp-content/uploads/2023/04/Hero-Web.webp',
    logo: '/HTUx.png',
  },
  {
    id: '42-amman-irbid',
    active: true,
    tag: 'تعليم تقني',
    title: 'انضم إلى 42 عمّان أو 42 إربد',
    description: 'مدرسة برمجة مبتكرة بدون معلمين وبدون شهادة جامعية، تفتح أبوابها للمسجّلين على مدار العام.',
    cta: 'قدّم الآن',
    href: 'https://apply.42amman.com/ar/users/sign_in',
    image: 'https://cpf.jo/wp-content/uploads/2024/01/42-Amman-%E2%94%98o%E2%94%98n-%E2%95%AA%E2%95%A3%E2%94%98a%E2%95%AAo%E2%94%98a.jpg',
    logo: '/42Amman.png',
  },
  {
    id: 'nahno',
    active: true,
    tag: 'تطوّع',
    title: 'تطوّع الآن عبر نَحْنُ',
    description: 'انضم لآلاف المتطوعين وابدأ أثرك في مجتمعك اليوم، بلا انتظار موسم معيّن.',
    cta: 'سجّل تطوعك',
    href: 'https://www.nahno.org/',
    image: 'https://cpf.jo/wp-content/uploads/2024/01/Nahno-%E2%94%98a%E2%95%AA%C2%A1%E2%94%98a.jpg',
    logo: '/Nahno.png',
  },
  {
    id: 'makers-space',
    active: true,
    tag: 'إبداع وابتكار',
    title: 'توجّه إلى مساحة الصنّاع',
    description: 'حوّل أفكارك إلى نماذج حقيقية بأحدث أدوات التصنيع الرقمي، المتاحة لك على مدار العام.',
    cta: 'ابدأ الصنع',
    programName: 'مساحة الصنّاع',
    image: 'https://cpf.jo/wp-content/uploads/2024/01/The-Makerspace-%E2%94%98a%E2%95%AA%E2%94%82%E2%95%AAo%E2%95%AA%C2%A1%E2%95%AA%E2%8C%90-%E2%95%AAo%E2%94%98a%E2%95%AA%E2%95%A1%E2%94%98a%E2%95%AAo%E2%95%AA%E2%95%A3_1.jpg',
    logo: '/The-Makerspace.png',
  },
];

function OpportunityCard({ item, onNavigate, setActiveProgramName }) {
  const isExternal = item.href && item.href !== '#';
  const isCta = item.variant === 'cta';

  const handleClick = (e) => {
    if (item.onClick) {
      e.preventDefault();
      item.onClick();
    } else if (item.programName) {
      e.preventDefault();
      setActiveProgramName?.(item.programName);
      onNavigate?.('program_details');
    }
  };

  return (
    <a
      href={item.href || '#'}
      onClick={handleClick}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      draggable={false}
      className="group relative shrink-0 w-[280px] sm:w-[320px] lg:w-[340px] xl:w-[380px] bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col select-none"
    >
      <span className="absolute top-0 right-8 left-8 h-[3px] rounded-full bg-[#C08F2D] z-10" />

      {/* 🟢 حاوية بدون overflow-hidden عشان شعار العلامة يقدر يطلع تحت حدود الصورة بدون ما ينقص */}
      <div className="relative shrink-0">
        {isCta ? (
          <div className="h-40 sm:h-44 xl:h-48 rounded-t-3xl overflow-hidden bg-gradient-to-br from-[#8a1538] to-[#3b1019] flex items-center justify-center">
            <div className="w-16 h-16 xl:w-20 xl:h-20 rounded-2xl bg-white/10 ring-1 ring-[#C08F2D]/50 flex items-center justify-center">
              <ArrowUpLeft className="w-8 h-8 xl:w-10 xl:h-10 text-[#C08F2D]" strokeWidth={1.75} />
            </div>
          </div>
        ) : (
          <div className="relative h-40 sm:h-44 xl:h-48 rounded-t-3xl overflow-hidden bg-gray-100">
            <img
              src={item.image}
              alt=""
              draggable={false}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>
        )}
        {item.logo && (
          <div className="absolute -bottom-8 right-6 w-20 h-20 xl:w-24 xl:h-24 rounded-2xl bg-white shadow-xl ring-1 ring-[#C08F2D]/25 p-3 xl:p-3.5 flex items-center justify-center">
            <img src={item.logo} alt="" draggable={false} className="max-w-full max-h-full object-contain pointer-events-none" />
          </div>
        )}
      </div>

      <div className={`flex flex-col grow rounded-b-3xl overflow-hidden p-6 xl:p-7 ${item.logo ? 'pt-11 xl:pt-12' : 'pt-6 xl:pt-7'}`}>
        <span className="inline-flex w-fit items-center rounded-full bg-[#8a1538]/8 text-[#8a1538] text-xs font-bold px-3.5 py-1.5 mb-4">
          {item.tag}
        </span>
        <h3 className="font-black text-[#1a0409] text-xl xl:text-2xl leading-snug mb-2.5">
          {item.title}
        </h3>
        <p className="text-[#4c4c4c] text-sm xl:text-[15px] leading-relaxed mb-6 grow line-clamp-3">
          {item.description}
        </p>
        <span className="flex items-center gap-2 text-[#8a1538] font-black text-sm xl:text-base">
          {item.cta}
          <ArrowUpLeft
            className="w-5 h-5 xl:w-6 xl:h-6 text-[#C08F2D] transform group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
            strokeWidth={2.5}
          />
        </span>
      </div>
    </a>
  );
}

const DRAG_THRESHOLD = 6; // px of pointer movement before a mousedown counts as a drag, not a click

export default function RegistrationStrip({ onNavigate, setActiveProgramName }) {
  const trackRef = useRef(null);
  const draggingRef = useRef(false);
  const dragStateRef = useRef({ active: false, moved: false, x: 0, scrollLeft: 0, pointerId: null });
  const directionRef = useRef(-1);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const opportunities = OPPORTUNITIES.filter((item) => item.active);
  const exploreAll = {
    id: 'explore-all',
    variant: 'cta',
    tag: 'استكشف',
    title: 'اكتشف جميع الفرص',
    description: 'منظومة كاملة من البرامج والمبادرات تنتظرك، تصفح كل الفرص المتاحة الآن.',
    cta: 'تصفح الكل',
    onClick: () => onNavigate && onNavigate('programs'),
  };
  const items = [...opportunities, exploreAll];

  // 🟢 حركة تلقائية بطيئة (ping-pong) عبر scrollLeft فقط — بدون تأثير على أداء التمرير اليدوي
  useEffect(() => {
    if (shouldReduceMotion) return undefined;
    let raf;
    const step = () => {
      const el = trackRef.current;
      if (el && !isPaused && !draggingRef.current) {
        const before = el.scrollLeft;
        el.scrollLeft += directionRef.current * AUTOPLAY_SPEED;
        if (el.scrollLeft === before) {
          directionRef.current *= -1;
          el.scrollLeft += directionRef.current * AUTOPLAY_SPEED;
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isPaused, shouldReduceMotion]);

  // 🟢 لا نلتقط المؤشر أو نمنع النقر إلا بعد تجاوز عتبة حركة فعلية — عشان روابط الكروت تضل قابلة للنقر بشكل طبيعي
  const handlePointerDown = (e) => {
    if (e.pointerType !== 'mouse') return;
    const el = trackRef.current;
    if (!el) return;
    dragStateRef.current = { active: true, moved: false, x: e.clientX, scrollLeft: el.scrollLeft, pointerId: e.pointerId };
  };

  const handlePointerMove = (e) => {
    const state = dragStateRef.current;
    if (!state.active) return;
    const el = trackRef.current;
    if (!el) return;
    const delta = e.clientX - state.x;
    if (!state.moved && Math.abs(delta) > DRAG_THRESHOLD) {
      state.moved = true;
      draggingRef.current = true;
      try { el.setPointerCapture(state.pointerId); } catch { /* noop */ }
    }
    if (state.moved) {
      el.scrollLeft = state.scrollLeft + delta;
    }
  };

  const endDrag = () => {
    const state = dragStateRef.current;
    if (state.moved && trackRef.current && state.pointerId != null) {
      try { trackRef.current.releasePointerCapture(state.pointerId); } catch { /* noop */ }
    }
    state.active = false;
    draggingRef.current = false;
  };

  // مرحلة الالتقاط (capture): تمنع تفعيل رابط الكرت فقط إذا كان هناك سحب فعلي، ثم تصفّر الحالة للنقرة التالية
  const handleTrackClickCapture = (e) => {
    if (dragStateRef.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
    dragStateRef.current.moved = false;
  };

  const scrollToward = (dir) => {
    trackRef.current?.scrollBy({ left: dir * -SCROLL_STEP, behavior: 'smooth' });
  };

  return (
    <section className="relative bg-[#721F31]/[0.05] py-14 lg:py-20 xl:py-24 overflow-hidden font-sans" dir="rtl">
      <div className="relative z-10 max-w-[1500px] mx-auto px-4 md:px-6 xl:px-10 text-center mb-10 lg:mb-12 xl:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-[#8a1538] tracking-tight mb-3 md:mb-4">
          فرصتك تنتظرك <span className="text-[#C08F2D]">على مدار السنة</span>
        </h2>
        <p className="text-[#4c4c4c] max-w-2xl mx-auto text-sm lg:text-base xl:text-lg font-medium">
          برامج ومنصات مفتوحة باستمرار، لا داعي لانتظار موسم لتبدأ خطوتك القادمة.
        </p>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button
          type="button"
          aria-label="السابق"
          onClick={() => scrollToward(-1)}
          className="hidden sm:flex absolute right-2 xl:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 xl:w-12 xl:h-12 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-[#8a1538] hover:border-[#8a1538] hover:shadow-lg transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 xl:w-6 xl:h-6" strokeWidth={2.5} />
        </button>

        <button
          type="button"
          aria-label="التالي"
          onClick={() => scrollToward(1)}
          className="hidden sm:flex absolute left-2 xl:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 xl:w-12 xl:h-12 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-[#8a1538] hover:border-[#8a1538] hover:shadow-lg transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 xl:w-6 xl:h-6" strokeWidth={2.5} />
        </button>

        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={handleTrackClickCapture}
          className="relative z-10 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{
            WebkitMaskImage: 'linear-gradient(to left, transparent, black 4%, black 96%, transparent)',
            maskImage: 'linear-gradient(to left, transparent, black 4%, black 96%, transparent)',
          }}
        >
          <div className="flex gap-5 xl:gap-7 px-4 md:px-6 xl:px-10 py-2 w-max">
            {items.map((item) => (
              <OpportunityCard key={item.id} item={item} onNavigate={onNavigate} setActiveProgramName={setActiveProgramName} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
