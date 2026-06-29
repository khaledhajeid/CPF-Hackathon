// src/pages/HomePage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import HomeEvents from '../components/home/HomeEvents';
import PathwayWizard from '../components/home/PathwayWizard';
import Footer from '../components/Footer';
import LuxuryHero from '../components/home/LuxuryHero';
import LuxuryPathways from '../components/home/LuxuryPathways';
import EcosystemPrograms from '../components/home/EcosystemPrograms';

// 🟢 العداد الذكي المطور (يدعم الكسور والسرعة المضبوطة)
function AnimatedNumber({ value, suffix = '', prefix = '', decimals = 0 }) {
  const [currentValue, setCurrentValue] = useState(0);
  const ref = useRef(null);
  // once: true يعني بيعد مرة وحدة بس لما يظهر، margin: "-50px" بضمن إنه العداد ما يبلش إلا لما يبين منيح بالشاشة
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp = null;
      const duration = 2000; // ثانيتين مدة العد
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 5); // تبطيء العد في النهاية (Smooth)
        setCurrentValue(easeProgress * value);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, value]);

  return <span ref={ref} dir="ltr" className="inline-block">{prefix}{currentValue.toFixed(decimals)}{suffix}</span>;
}

// 🟢 مكون مساعد (Wrapper) عشان نغلف فيه أي قسم بدنا إياه يظهر مع النزول (Scroll)
const RevealOnScroll = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }} // margin: -100px يعني لازم العنصر يدخل 100 بكسل بالشاشة عشان يظهر
    transition={{ duration: 0.7, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
);

export default function HomePage({ activeFilters, setActiveFilters, handleRegisterClick, onNavigate }) {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  return (
    <div className="w-full bg-[#fcfcfc] text-[#4c4c4c] selection:bg-[#C08F2D] selection:text-white font-sans" dir="rtl">
      
      {/* قسم الـ Hero (ما بنعمله Reveal لأنه أول إشي بيبين بالشاشة) */}
      <LuxuryHero onExploreClick={() => { document.getElementById('strategic-pathways')?.scrollIntoView({ behavior: 'smooth' }); }} />

      {/* 🟢 صندوق الإحصائيات المتجاوب (أضفنا whileInView ليظهر مع النزول) */}
      <div className="relative z-30 -mt-4 mx-4 sm:mx-8 lg:mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 md:p-12 border border-gray-50"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-8">
            
            {/* الأرقام الحقيقية والصحيحة المحدثة */}
            <div className="text-center flex flex-col justify-center border-l border-gray-200">
              <h3 className="text-3xl md:text-5xl font-black text-[#721F31] mb-1 md:mb-2">
                <AnimatedNumber value={2.2} decimals={1} suffix="M" />
              </h3>
              <p className="text-[11px] md:text-[12px] font-bold text-gray-500">شاب وشابة مستفيد</p>
            </div>
            
            <div className="text-center flex flex-col justify-center border-l-0 md:border-l border-gray-200">
              <h3 className="text-3xl md:text-5xl font-black text-[#721F31] mb-1 md:mb-2">
                <AnimatedNumber value={14} prefix="+" />
              </h3>
              <p className="text-[11px] md:text-[12px] font-bold text-gray-500">برنامج ومبادرة</p>
            </div>
            
            <div className="text-center flex flex-col justify-center border-l border-gray-200">
              <h3 className="text-3xl md:text-5xl font-black text-[#721F31] mb-1 md:mb-2">
                <AnimatedNumber value={26} prefix="+" />
              </h3>
              <p className="text-[11px] md:text-[12px] font-bold text-gray-500">موقع استراتيجي</p>
            </div>
            
            <div className="text-center flex flex-col justify-center">
              <h3 className="text-3xl md:text-5xl font-black text-[#721F31] mb-1 md:mb-2">
                <AnimatedNumber value={12} />
              </h3>
              <p className="text-[11px] md:text-[12px] font-bold text-gray-500">محافظة نغطيها</p>
            </div>
            
          </div>
        </motion.div>
      </div>

      {/* 🟢 القسم الخاص بالبرامج (يظهر مع السكرول) */}
      <RevealOnScroll>
        <EcosystemPrograms onNavigate={onNavigate} />
      </RevealOnScroll>

      {/* 🟢 قسم المسارات الاستراتيجية (يظهر مع السكرول) */}
      <RevealOnScroll delay={0.1}>
        <LuxuryPathways onPathwaySelect={(pathwayId) => {
          setActiveFilters(prev => ({ ...prev, pathway: pathwayId }));
          document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' });
        }} />
      </RevealOnScroll>

      {/* 🟢 دعوة لاستخدام الذكاء الاصطناعي الـ Wizard (يظهر مع السكرول) */}
      <RevealOnScroll>
        <div className="bg-[#721F31] pt-20 pb-24 md:pt-24 md:pb-28 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-40 z-0 opacity-[0.15] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '200px', backgroundRepeat: 'repeat-x', backgroundPosition: 'bottom' }} />
          <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-20 text-center flex flex-col items-center">
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6">
              <img src="/arrow-yellow.svg" className="w-6 h-6 md:w-8 md:h-8 shrink-0" alt="" />
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white leading-tight drop-shadow-sm">
                محتار من وين تبدأ <span className="text-[#C08F2D]">مسارك؟</span>
              </h2>
            </div>
            <p className="text-white/90 max-w-xl mx-auto mb-8 md:mb-10 leading-[1.8rem] md:leading-[2.2rem] text-sm md:text-lg font-medium">
              لا تضيع وقتك في البحث العشوائي. أجب على 3 أسئلة سريعة، ودع الذكاء الاصطناعي يحلل شغفك ويرشح لك الفعاليات الأنسب لك.
            </p>
            <button onClick={() => setIsWizardOpen(true)} className="bg-[#C08F2D] hover:bg-[#a67b25] text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full font-black text-sm md:text-base transition-colors shadow-md cursor-pointer">
              اكتشف مسارك الآن
            </button>
          </div>
        </div>
      </RevealOnScroll>

      {/* 🟢 قسم الفعاليات والفرص المتاحة (يظهر مع السكرول) */}
      <RevealOnScroll>
        <div id="events-section" className="relative z-30 bg-[#f8fafc] pt-8 md:pt-12">
          <HomeEvents 
            activeFilters={activeFilters} 
            setActiveFilters={setActiveFilters} 
            handleRegisterClick={handleRegisterClick} 
            onNavigate={onNavigate} 
          />
        </div>
      </RevealOnScroll>

      <Footer />

      <AnimatePresence>
        {isWizardOpen && <PathwayWizard onClose={() => setIsWizardOpen(false)} onComplete={(wizardResult) => { setActiveFilters({ location: wizardResult.location || 'الكل', pathway: wizardResult.pathway || 'الكل' }); const eventsSection = document.getElementById('events-section'); if (eventsSection) { eventsSection.scrollIntoView({ behavior: 'smooth' }); } }} />}
      </AnimatePresence>
    </div>
  );
}