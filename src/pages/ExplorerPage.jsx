// src/pages/HomePage.jsx
import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import HomeEvents from "../components/home/HomeEvents";
import PathwayWizard from "../components/home/PathwayWizard";
import Footer from "../components/Footer";
import LuxuryHero from "../components/home/LuxuryHero";
import LuxuryPathways from "../components/home/LuxuryPathways";
import EcosystemPrograms from "../components/home/EcosystemPrograms";

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
      <LuxuryHero
        onExploreClick={() => {
          document
            .getElementById("strategic-pathways")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 🟢 الإحصائيات: السحب -mt يتدرج، والبادينج الداخلي يتدرج */}
      <div className="relative z-30 -mt-8 lg:-mt-10 xl:-mt-14 2xl:-mt-16 mx-4 sm:mx-8 lg:mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-6 lg:p-6 xl:p-10 2xl:p-12 border border-gray-50"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 lg:gap-y-0 divide-x divide-x-reverse divide-gray-100 lg:divide-x lg:divide-x-reverse">
            <div className="text-center flex flex-col justify-center">
              <h3 className="text-3xl lg:text-3xl xl:text-5xl 2xl:text-6xl font-black text-[#8a1538] mb-1 lg:mb-2">
                <AnimatedNumber value={2.2} decimals={1} suffix="M" />
              </h3>
              <p className="text-[11px] lg:text-[12px] xl:text-[14px] font-bold text-gray-500">
                شاب وشابة مستفيد
              </p>
            </div>

            <div className="text-center flex flex-col justify-center border-t border-gray-100 pt-6 mt-6 lg:border-t-0 lg:pt-0 lg:mt-0 col-span-1 lg:col-span-1">
              <h3 className="text-3xl lg:text-3xl xl:text-5xl 2xl:text-6xl font-black text-[#8a1538] mb-1 lg:mb-2">
                <AnimatedNumber value={14} prefix="+" />
              </h3>
              <p className="text-[11px] lg:text-[12px] xl:text-[14px] font-bold text-gray-500">
                برنامج ومبادرة
              </p>
            </div>

            <div className="text-center flex flex-col justify-center border-t border-gray-100 pt-6 mt-6 lg:border-t-0 lg:pt-0 lg:mt-0 col-span-1 lg:col-span-1">
              <h3 className="text-3xl lg:text-3xl xl:text-5xl 2xl:text-6xl font-black text-[#8a1538] mb-1 lg:mb-2">
                <AnimatedNumber value={26} prefix="+" />
              </h3>
              <p className="text-[11px] lg:text-[12px] xl:text-[14px] font-bold text-gray-500">
                موقع استراتيجي
              </p>
            </div>

            <div className="text-center flex flex-col justify-center">
              <h3 className="text-3xl lg:text-3xl xl:text-5xl 2xl:text-6xl font-black text-[#8a1538] mb-1 lg:mb-2">
                <AnimatedNumber value={12} />
              </h3>
              <p className="text-[11px] lg:text-[12px] xl:text-[14px] font-bold text-gray-500">
                محافظة نغطيها
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
          />
        </RevealOnScroll>
      </div>

      <RevealOnScroll>
        {/* 🟢 التوجيه الذكي: المساحات والأزرار تتدرج بذكاء */}
        <div className="bg-[#721F31] pt-16 pb-20 lg:pt-16 lg:pb-20 xl:pt-20 xl:pb-24 2xl:pt-24 2xl:pb-28 relative overflow-hidden">
          <div
            className="absolute bottom-0 left-0 right-0 h-40 z-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: "url(/the-theme.svg)",
              backgroundSize: "200px",
              backgroundRepeat: "repeat-x",
              backgroundPosition: "bottom",
            }}
          />

          <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-20 text-center flex flex-col items-center">
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6">
              <img
                src="/arrow-yellow.svg"
                className="w-6 h-6 lg:w-6 lg:h-6 xl:w-8 xl:h-8 shrink-0"
                alt=""
              />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight drop-shadow-sm">
                محتار من وين تبدأ <span className="text-[#C08F2D]">مسارك؟</span>
              </h2>
            </div>

            <p className="text-white/90 max-w-xl mx-auto mb-8 md:mb-10 leading-[1.8rem] md:leading-[2.2rem] text-sm lg:text-base xl:text-lg font-medium">
              هل تبحث عن برنامج طويل الأمد أم فعالية سريعة؟ أجب على 5 أسئلة، ودع
              الذكاء الاصطناعي يحلل شغفك ليرشح لك الخيار الأمثل لك بالضبط.
            </p>

            <button
              onClick={() => setIsWizardOpen(true)}
              className="bg-[#C08F2D] hover:bg-[#a67b25] text-white px-10 py-4 lg:px-12 lg:py-4 xl:px-14 xl:py-5 2xl:px-16 2xl:py-6 rounded-full font-black text-base lg:text-lg xl:text-xl 2xl:text-2xl transition-all shadow-lg cursor-pointer hover:scale-105"
            >
              ابدأ التوجيه الذكي
            </button>
          </div>
        </div>
      </RevealOnScroll>

      <div id="programs-section">
        <RevealOnScroll>
          <EcosystemPrograms onNavigate={onNavigate} setActiveProgramName={setActiveProgramName} />
        </RevealOnScroll>
      </div>

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