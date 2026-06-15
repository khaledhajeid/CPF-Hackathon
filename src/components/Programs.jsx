// src/components/Programs.jsx
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LayoutGrid, Target, Sparkles } from 'lucide-react';
import Footer from '../components/Footer';

// استدعاء المكونات الفرعية
import NationalPrograms from './programs/NationalPrograms';
import EventsExplorer from './programs/EventsExplorer';

export default function Programs({ onNavigate, setActiveProgramName, handleRegisterClick }) {
  const [activeTab, setActiveTab] = useState('programs'); 

  return (
    <div className="min-h-screen bg-[#F4F7FA] pb-24 font-sans selection:bg-[#C08F2D] selection:text-white" dir="rtl">
      
      {/* الهيدر الثابت - 🟢 تقليل الـ Padding للموبايل */}
      <div className="bg-[#1a0409] relative pt-28 pb-16 lg:pt-40 lg:pb-32 overflow-hidden shadow-md shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8a1538]/90 to-[#1a0409]" />
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-overlay">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="cpf-programs-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M0 60 Q 30 30 60 60 T 120 60 M60 0 Q 90 30 60 60 T 60 120" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
              <path d="M-60 60 Q -30 30 0 60 T 60 60 M0 0 Q 30 30 0 60 T 0 120" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#cpf-programs-pattern)"></rect>
          </svg>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6 tracking-tight">
            البرامج <span className="text-[#C08F2D]">والفرص</span>
          </h1>
          <p className="text-white/80 text-[13px] md:text-base font-bold max-w-2xl mx-auto leading-relaxed px-2">
            استكشف المبادرات الاستراتيجية لمؤسسة ولي العهد، أو ابحث في مئات الفرص والفعاليات والورش التدريبية المتاحة للشباب في مختلف المحافظات.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-10 relative z-20 flex-grow">
        
        {/* التبويبات العلوية (قابلة للسحب Swipe عالموبايل) */}
        <div className="bg-white p-2 rounded-2xl shadow-xl shadow-[#8a1538]/5 border border-gray-100 flex gap-2 w-fit mb-8 md:mb-12 mx-auto overflow-x-auto max-w-full scrollbar-hide">
          <button onClick={() => setActiveTab('programs')} className={`flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl font-black text-[13px] sm:text-sm transition-all duration-300 whitespace-nowrap cursor-pointer ${activeTab === 'programs' ? 'bg-[#8a1538] text-white shadow-md' : 'bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
            <LayoutGrid className="w-4 h-4" /> البرامج
          </button>
          <button onClick={() => setActiveTab('events')} className={`flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl font-black text-[13px] sm:text-sm transition-all duration-300 whitespace-nowrap cursor-pointer ${activeTab === 'events' ? 'bg-[#C08F2D] text-white shadow-md' : 'bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
            <Target className="w-4 h-4" /> الفرص والفعاليات
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'programs' ? (
            <NationalPrograms key="national" onNavigate={onNavigate} setActiveProgramName={setActiveProgramName} />
          ) : (
            <EventsExplorer key="events" handleRegisterClick={handleRegisterClick} />
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}