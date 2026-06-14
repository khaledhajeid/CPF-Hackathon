// src/components/Programs.jsx
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LayoutGrid, Target, Sparkles } from 'lucide-react';

// استدعاء المكونات الفرعية اللي عملناها
import NationalPrograms from './programs/NationalPrograms';
import EventsExplorer from './programs/EventsExplorer';

// 🟢 التمرير هنا: استقبلنا handleRegisterClick
export default function Programs({ onNavigate, setActiveProgramName, handleRegisterClick }) {
  const [activeTab, setActiveTab] = useState('programs'); 

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-sans" dir="rtl">
      
      {/* الهيدر الثابت */}
      <div className="bg-[#721F31] relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3b1019]/50 to-transparent" />
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-overlay">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="cpf-programs-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M0 60 Q 30 30 60 60 T 120 60 M60 0 Q 90 30 60 60 T 60 120" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
              <path d="M-60 60 Q -30 30 0 60 T 60 60 M0 0 Q 30 30 0 60 T 0 120" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#cpf-programs-pattern)"></rect>
          </svg>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            البرامج <span className="text-[#C08F2D]">والفرص</span>
          </h1>
          <p className="text-white/80 text-sm md:text-base font-bold max-w-2xl mx-auto leading-relaxed">
            استكشف المبادرات الاستراتيجية لمؤسسة ولي العهد، أو ابحث في مئات الفرص والفعاليات والورش التدريبية المتاحة للشباب في مختلف المحافظات.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        
        {/* التبويبات العلوية */}
        <div className="bg-white p-2 rounded-2xl shadow-xl shadow-gray-200/40 border border-gray-100 flex gap-2 w-fit mb-12 mx-auto overflow-x-auto max-w-full scrollbar-hide">
          <button onClick={() => setActiveTab('programs')} className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-black text-sm transition-all duration-300 whitespace-nowrap ${activeTab === 'programs' ? 'bg-[#721F31] text-white shadow-md' : 'bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
            <LayoutGrid className="w-4 h-4" /> البرامج
          </button>
          <button onClick={() => setActiveTab('events')} className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-black text-sm transition-all duration-300 whitespace-nowrap ${activeTab === 'events' ? 'bg-[#C08F2D] text-white shadow-md' : 'bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
            <Target className="w-4 h-4" /> الفرص والفعاليات
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'programs' ? (
            <NationalPrograms key="national" onNavigate={onNavigate} setActiveProgramName={setActiveProgramName} />
          ) : (
            // 🟢 التمرير النهائي هنا: مررنا handleRegisterClick للـ EventsExplorer
            <EventsExplorer key="events" handleRegisterClick={handleRegisterClick} />
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}