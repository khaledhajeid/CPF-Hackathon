// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HomeEvents from '../components/home/HomeEvents';
import PathwayWizard from '../components/home/PathwayWizard';
import Footer from '../components/Footer';
import LuxuryHero from '../components/home/LuxuryHero';
import LuxuryPathways from '../components/home/LuxuryPathways';

export default function HomePage({ activeFilters, setActiveFilters, handleRegisterClick, onNavigate }) {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const programLogos = [
    { name: 'The Makerspace', src: '/The-Makerspace.png' },
    { name: 'Nahno', src: '/Nahno.png' },
    { name: '42 Amman', src: '/42Amman.png' },
    { name: 'HTU', src: '/HTU.png' },
    { name: 'Global Internship', src: '/Global-Internship-Program.png' }
  ];

  return (
    <div className="w-full bg-[#fcfcfc] text-[#4c4c4c] selection:bg-[#C08F2D] selection:text-white font-sans" dir="rtl">
      
      <LuxuryHero onExploreClick={() => { document.getElementById('programs-logos')?.scrollIntoView({ behavior: 'smooth' }); }} />

      <div className="relative z-30 -mt-4 mx-4 sm:mx-8 lg:mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 md:p-12 border border-gray-50"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8">
            <div className="text-center flex flex-col justify-center border-l border-gray-200 last:border-0">
              <h3 className="text-4xl md:text-5xl font-black text-[#721F31] mb-2">+500K</h3>
              <p className="text-[12px] font-bold text-gray-500">مستفيد</p>
            </div>
            <div className="text-center flex flex-col justify-center border-l border-gray-200 md:border-l-0 lg:border-l last:border-0">
              <h3 className="text-4xl md:text-5xl font-black text-[#721F31] mb-2">12</h3>
              <p className="text-[12px] font-bold text-gray-500">محافظة</p>
            </div>
            <div className="text-center flex flex-col justify-center border-l border-gray-200 last:border-0">
              <h3 className="text-4xl md:text-5xl font-black text-[#721F31] mb-2">3</h3>
              <p className="text-[12px] font-bold text-gray-500">مسارات رئيسية</p>
            </div>
            <div className="text-center flex flex-col justify-center">
              <h3 className="text-4xl md:text-5xl font-black text-[#721F31] mb-2">+50</h3>
              <p className="text-[12px] font-bold text-gray-500">شريك استراتيجي</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div id="programs-logos" className="pt-24 pb-16 bg-[#fcfcfc]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-16">
            <img src="/arrow-yellow.svg" className="w-5 h-5 shrink-0" alt="" />
            <h2 className="text-2xl font-black text-[#721F31]">أبرز برامج ومبادرات مؤسسة ولي العهد</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 lg:gap-24">
            {programLogos.map((logo, idx) => (
              <div key={idx} className="transition-transform duration-300 hover:scale-105 shrink-0">
                <img src={logo.src} alt={logo.name} className="h-12 md:h-16 lg:h-[70px] max-w-[180px] object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <LuxuryPathways onPathwaySelect={(pathwayId) => {
        setActiveFilters(prev => ({ ...prev, pathway: pathwayId }));
        document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' });
      }} />

      <div className="bg-[#721F31] pt-24 pb-28 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-40 z-0 opacity-[0.15] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '200px', backgroundRepeat: 'repeat-x', backgroundPosition: 'bottom' }} />
        <div className="max-w-4xl mx-auto px-6 relative z-20 text-center flex flex-col items-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img src="/arrow-yellow.svg" className="w-6 h-6 md:w-8 md:h-8 shrink-0" alt="" />
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight drop-shadow-sm">
              محتار من وين تبدأ <span className="text-[#C08F2D]">مسارك؟</span>
            </h2>
          </div>
          <p className="text-white/90 max-w-xl mx-auto mb-10 leading-[2.2rem] text-lg font-medium">
            لا تضيع وقتك في البحث العشوائي. أجب على 3 أسئلة سريعة، ودع الذكاء الاصطناعي يحلل شغفك ويرشح لك الفعاليات الأنسب لك.
          </p>
          <button onClick={() => setIsWizardOpen(true)} className="bg-[#C08F2D] hover:bg-[#a67b25] text-[#1a1c1d] px-10 py-3.5 rounded-full font-black text-base transition-colors shadow-md cursor-pointer">
            اكتشف مسارك الآن
          </button>
        </div>
      </div>

      <div id="events-section" className="relative z-30 bg-[#f8fafc] pt-12">
        {/* 🟢 التعديل: مررنا onNavigate={onNavigate} عشان الزر الجديد يشتغل ويودي لصفحة البرامج/الفعاليات */}
        <HomeEvents 
          activeFilters={activeFilters} 
          setActiveFilters={setActiveFilters} 
          handleRegisterClick={handleRegisterClick} 
          onNavigate={onNavigate} 
        />
      </div>

      <Footer />

      <AnimatePresence>
        {isWizardOpen && <PathwayWizard onClose={() => setIsWizardOpen(false)} onComplete={(wizardResult) => { setActiveFilters({ location: wizardResult.location || 'الكل', pathway: wizardResult.pathway || 'الكل' }); const eventsSection = document.getElementById('events-section'); if (eventsSection) { eventsSection.scrollIntoView({ behavior: 'smooth' }); } }} />}
      </AnimatePresence>
    </div>
  );
}