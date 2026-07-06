// src/components/Programs.jsx
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LayoutGrid, Target } from 'lucide-react';
import Footer from '../components/Footer';

// استدعاء المكونات الفرعية
import NationalPrograms from './programs/NationalPrograms';
import EventsExplorer from './programs/EventsExplorer';

export default function Programs({ onNavigate, setActiveProgramName, handleRegisterClick }) {
  const [activeTab, setActiveTab] = useState('programs'); 

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#fcfcfc] font-sans selection:bg-[#C08F2D] selection:text-white" dir="rtl">
      
      {/* الهيدر الثابت المندمج */}
      <div className="bg-[#1a0409] relative pt-28 pb-16 lg:pt-40 lg:pb-32 overflow-hidden shadow-md shrink-0 rounded-b-[2.5rem] md:rounded-b-[4rem]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#721F31]/90 via-[#3b1019] to-[#1a070b]" />
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '300px' }}></div>
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 md:mb-6 tracking-tight">
            البرامج <span className="text-[#C08F2D]">والفرص</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg font-bold max-w-2xl mx-auto leading-relaxed px-2">
            استكشف المبادرات الاستراتيجية لمؤسسة ولي العهد، أو ابحث في مئات الفرص والفعاليات والورش التدريبية المتاحة للشباب في مختلف المحافظات.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-10 relative z-20 flex-grow pb-16 md:pb-24">
        
        {/* التبويبات العلوية */}
        <div className="bg-white p-2 rounded-full shadow-xl border border-gray-100 flex gap-2 w-fit mb-12 mx-auto overflow-x-auto max-w-full scrollbar-hide">
          <button 
            onClick={() => setActiveTab('programs')} 
            className={`flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-black text-sm transition-all duration-300 whitespace-nowrap cursor-pointer ${activeTab === 'programs' ? 'bg-[#721F31] text-white shadow-md' : 'bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <LayoutGrid className="w-5 h-5" /> البرامج والمبادرات
          </button>
          <button 
            onClick={() => setActiveTab('events')} 
            className={`flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-black text-sm transition-all duration-300 whitespace-nowrap cursor-pointer ${activeTab === 'events' ? 'bg-[#C08F2D] text-white shadow-md' : 'bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <Target className="w-5 h-5" /> الفرص والفعاليات
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
      
      <div className="shrink-0 w-full mt-auto relative z-10">
        <Footer onNavigate="{onNavigate}"/>
      </div>
    </div>
  );
}