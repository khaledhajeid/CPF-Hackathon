// src/pages/HomePage.jsx
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import HomeEvents from "../components/home/HomeEvents";
import PathwayWizard from "../components/home/PathwayWizard";
import Footer from "../components/Footer";
import LuxuryHero from "../components/home/LuxuryHero";
import LuxuryPathways from "../components/home/LuxuryPathways";
import RegistrationStrip from "../components/home/RegistrationStrip";
import AlertSideTab from "../components/home/AlertSideTab";

function AnimatedNumber({ value, suffix = "", prefix = "", decimals = 0 }) {
  const [currentValue, setCurrentValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp = null;
      const duration = 2000;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 5);
        setCurrentValue(easeProgress * value);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} dir="ltr" className="inline-block">
      {prefix}
      {currentValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const RevealOnScroll = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
);

export default function HomePage({
  activeFilters,
  setActiveFilters,
  handleRegisterClick,
  onNavigate,
  setActiveProgramName,
}) {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  return (
    <div
      className="w-full bg-[#fcfcfc] text-[#4c4c4c] selection:bg-[#C08F2D] selection:text-white font-sans overflow-x-hidden"
      dir="rtl"
    >
      <AlertSideTab />

      <LuxuryHero
        onExploreClick={() => {
          document
            .getElementById("strategic-pathways")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <div className="relative z-30 -mt-10 sm:-mt-12 lg:-mt-10 xl:-mt-12 2xl:-mt-16 mx-4 sm:mx-8 xl:mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white rounded-2xl md:rounded-3xl xl:rounded-[2rem] shadow-xl p-6 sm:p-8 lg:p-6 xl:p-8 2xl:p-12 border border-gray-100 mx-auto w-full lg:w-11/12 2xl:w-10/12"
        >
          <h2 className="sr-only">الأثر الوطني بالأرقام</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 relative">

            {/* العنصر 1 */}
            <div className="flex flex-col items-center justify-center text-center border-l border-b border-gray-100 lg:border-b-0 pb-6 lg:pb-0">
              {/* 🟢 حجم الخط: text-4xl للـ xl (أنيق)، و text-6xl للشاشات العملاقة */}
              <h3 className="text-3xl sm:text-4xl lg:text-3xl xl:text-4xl 2xl:text-6xl font-black text-[#8a1538] mb-1 lg:mb-1 xl:mb-2">
                <AnimatedNumber value={2.2} decimals={1} />
              </h3>
              <p className="text-[10px] sm:text-[11px] lg:text-[11px] xl:text-[12px] 2xl:text-sm font-bold text-gray-500 uppercase tracking-wide">
                مليون مشارك
              </p>
            </div>

            {/* العنصر 2 */}
            <div className="flex flex-col items-center justify-center text-center border-b border-gray-100 lg:border-b-0 lg:border-l pb-6 lg:pb-0">
              <h3 className="text-3xl sm:text-4xl lg:text-3xl xl:text-4xl 2xl:text-6xl font-black text-[#8a1538] mb-1 lg:mb-1 xl:mb-2">
                <AnimatedNumber value={12} />
              </h3>
              <p className="text-[10px] sm:text-[11px] lg:text-[11px] xl:text-[12px] 2xl:text-sm font-bold text-gray-500 uppercase tracking-wide">
                محافظة داخل المملكة
              </p>
            </div>

            {/* العنصر 3 */}
            <div className="flex flex-col items-center justify-center text-center border-l border-gray-100 pt-6 lg:pt-0">
              <h3 className="text-3xl sm:text-4xl lg:text-3xl xl:text-4xl 2xl:text-6xl font-black text-[#8a1538] mb-1 lg:mb-1 xl:mb-2">
                <AnimatedNumber value={26} />
              </h3>
              <p className="text-[10px] sm:text-[11px] lg:text-[11px] xl:text-[12px] 2xl:text-sm font-bold text-gray-500 uppercase tracking-wide">
                مساحة ومرفق
              </p>
            </div>

            {/* العنصر 4 */}
            <div className="flex flex-col items-center justify-center text-center pt-6 lg:pt-0">
              <h3 className="text-3xl sm:text-4xl lg:text-3xl xl:text-4xl 2xl:text-6xl font-black text-[#8a1538] mb-1 lg:mb-1 xl:mb-2">
                <AnimatedNumber value={14} />
              </h3>
              <p className="text-[10px] sm:text-[11px] lg:text-[11px] xl:text-[12px] 2xl:text-sm font-bold text-gray-500 uppercase tracking-wide">
                برنامج
              </p>
            </div>

          </div>
        </motion.div>
      </div>

      <div id="strategic-pathways">
        <RevealOnScroll delay={0.1}>
          <LuxuryPathways
            onPathwaySelect={(pathwayId) => {
              setActiveFilters((prev) => ({ ...prev, pathway: pathwayId }));
              document
                .getElementById("events-section")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            onNavigate={onNavigate}
            setActiveProgramName={setActiveProgramName}
          />
        </RevealOnScroll>
      </div>

      <RevealOnScroll>
        <div className="bg-[#721F31] pt-12 pb-16 lg:pt-16 lg:pb-20 xl:pt-24 xl:pb-28 relative overflow-hidden">
          <div
            className="absolute bottom-0 left-0 right-0 h-40 z-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: "url(/the-theme.svg)",
              backgroundSize: "200px",
              backgroundRepeat: "repeat-x",
              backgroundPosition: "bottom",
            }}
          />

          <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-20 text-center flex flex-col items-center">
            <h2 className="text-xl sm:text-3xl lg:text-3xl xl:text-5xl font-black text-white leading-tight drop-shadow-sm mb-3 md:mb-5 xl:mb-6">
              محتار من وين تبدأ <span className="text-[#C08F2D]">مسارك؟</span>
            </h2>

            <p className="text-white/90 max-w-sm md:max-w-xl xl:max-w-2xl mx-auto mb-6 md:mb-8 xl:mb-10 leading-[1.6rem] sm:leading-[1.8rem] xl:leading-[2.2rem] text-[13px] sm:text-sm lg:text-[14px] xl:text-lg font-medium">
              أجب على مجموعة من الأسئلة ودع الموجّه المدعوم بالذكاء الاصطناعي يحلل اهتماماتك ليرشح لك الخيارات
            </p>

            <button
              onClick={() => setIsWizardOpen(true)}
              className="bg-[#C08F2D] hover:bg-[#a67b25] text-white px-8 py-3.5 lg:px-10 lg:py-4 xl:px-14 xl:py-5 rounded-full font-black text-[13px] sm:text-sm lg:text-[14px] xl:text-lg transition-all shadow-lg cursor-pointer hover:scale-105"
            >
              ابدأ التوجيه الذكي
            </button>
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        <RegistrationStrip onNavigate={onNavigate} setActiveProgramName={setActiveProgramName} />
      </RevealOnScroll>

      <RevealOnScroll>
        <div
          id="events-section"
          className="relative z-30 bg-[#f8fafc] pt-8 md:pt-12"
        >
          <HomeEvents
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            handleRegisterClick={handleRegisterClick}
            onNavigate={onNavigate}
          />
        </div>
      </RevealOnScroll>

      <Footer onNavigate={onNavigate} />

      <AnimatePresence>
        {isWizardOpen && (
          <PathwayWizard
            onClose={() => setIsWizardOpen(false)}
            onComplete={(wizardResult) => {
              setIsWizardOpen(false);
              if (wizardResult.type === "program") {
                setActiveProgramName(wizardResult.programName);
                onNavigate("program_details");
              } else {
                setActiveFilters({
                  location: wizardResult.location,
                  pathway: wizardResult.pathway,
                });
                const eventsSection = document.getElementById("events-section");
                if (eventsSection) {
                  eventsSection.scrollIntoView({ behavior: "smooth" });
                }
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}