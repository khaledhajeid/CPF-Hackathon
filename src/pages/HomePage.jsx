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
    { name: 'The Makerspace', src: '/The-Makerspace.png', path: 'https://cpf.jo/programs/themakerspace/' },
    { name: 'Nahno', src: '/Nahno.png', path: 'https://www.nahno.org/' },
    { name: '42 Amman', src: '/42Amman.png', path: 'https://42amman.com/' },
    { name: 'HTU', src: '/HTU.png', path: 'https://htu.edu.jo/ar' },
    { name: 'Global Internship', src: '/Global-Internship-Program.png', path: 'https://cpf.jo/programs/globalinternshipprogram/' }
  ];

  return (
    <div className="w-full bg-[#F4F7FA] text-[#4c4c4c] selection:bg-[#C08F2D] selection:text-white font-sans overflow-x-hidden" dir="rtl">
      
      <LuxuryHero onExploreClick={() => { document.getElementById('programs-logos')?.scrollIntoView({ behavior: 'smooth' }); }} />

      {/* صندوق الإحصائيات - Responsive */}
      <div className="relative z-30 -mt-10 mx-4 sm:mx-6 lg:mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-6 md:p-12 border border-gray-100"
        >
          {/* 🟢 grid-cols-2 عالموبايل عشان التوازن */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
            <div className="text-center flex flex-col justify-center border-l border-gray-100 last:border-0">
              <h3 className="text-3xl md:text-5xl font-black text-[#8a1538] mb-1.5 md:mb-2">+500K</h3>
              <p className="text-[11px] md:text-[13px] font-bold text-gray-500">مستفيد</p>
            </div>
            <div className="text-center flex flex-col justify-center border-l-0 md:border-l border-gray-100 last:border-0">
              <h3 className="text-3xl md:text-5xl font-black text-[#8a1538] mb-1.5 md:mb-2">12</h3>
              <p className="text-[11px] md:text-[13px] font-bold text-gray-500">محافظة</p>
            </div>
            <div className="text-center flex flex-col justify-center border-l border-gray-100 last:border-0">
              <h3 className="text-3xl md:text-5xl font-black text-[#8a1538] mb-1.5 md:mb-2">3</h3>
              <p className="text-[11px] md:text-[13px] font-bold text-gray-500">مسارات رئيسية</p>
            </div>
            <div className="text-center flex flex-col justify-center">
              <h3 className="text-3xl md:text-5xl font-black text-[#8a1538] mb-1.5 md:mb-2">+50</h3>
              <p className="text-[11px] md:text-[13px] font-bold text-gray-500">شريك استراتيجي</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div id="programs-logos" className="pt-20 md:pt-24 pb-12 md:pb-16 bg-[#F4F7FA]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-10 md:mb-16">
            <img src="/arrow-yellow.svg" className="w-4 h-4 md:w-5 md:h-5 shrink-0" alt="" />
            <h2 className="text-lg md:text-2xl font-black text-[#8a1538]">أبرز برامج ومبادرات مؤسسة ولي العهد</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-24">
            {programLogos.map((logo, idx) => (
              <div key={idx} className="transition-transform duration-300 hover:scale-105 shrink-0">
                <a href={logo.path} target="_blank"><img src={logo.src} alt={logo.name} className="h-10 sm:h-12 lg:h-[60px] max-w-[120px] md:max-w-[180px] object-contain opacity-70 hover:opacity-100 transition-opacity" /></a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <LuxuryPathways onPathwaySelect={(pathwayId) => {
        setActiveFilters(prev => ({ ...prev, pathway: pathwayId }));
        document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' });
      }} />

      <div className="bg-[#1a0409] pt-20 pb-24 md:pt-24 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#8a1538]/80 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-20 text-center flex flex-col items-center">
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6">
            {/* 🟢 النجمة الحقيقية */}
            <img src="/arrow-yellow.svg" className="w-6 h-6 md:w-8 md:h-8 shrink-0 object-contain drop-shadow-md" alt="" />
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white leading-tight drop-shadow-sm">
              محتار من وين تبدأ <span className="text-[#C08F2D]">مسارك؟</span>
            </h2>
          </div>
          <p className="text-white/80 max-w-xl mx-auto mb-8 md:mb-10 leading-[1.8rem] md:leading-[2.2rem] text-sm md:text-lg font-bold">
            لا تضيع وقتك في البحث العشوائي. أجب على 3 أسئلة سريعة، ودع الذكاء الاصطناعي يحلل شغفك ويرشح لك الفعاليات الأنسب لك.
          </p>
          <button onClick={() => setIsWizardOpen(true)} className="bg-[#C08F2D] hover:bg-[#a67b25] text-white px-8 md:px-10 py-3.5 md:py-4 rounded-xl font-black text-sm md:text-[15px] transition-all shadow-xl hover:-translate-y-1 cursor-pointer">
            اكتشف مسارك الآن
          </button>
        </div>
      </div>

      <div id="events-section" className="relative z-30 bg-[#F4F7FA] pt-8 md:pt-12">
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