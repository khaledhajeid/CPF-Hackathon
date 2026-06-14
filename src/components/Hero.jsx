// src/components/Hero.jsx
import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { filters } from '../data';

export default function Hero({ activeFilter, setActiveFilter }) {
  return (
    <div className="relative pt-32 pb-28 px-4 overflow-hidden bg-[#721F31]">
      
      {/* Enterprise SVG Pattern Background 
        مستوحى من الخطوط المتداخلة في الهوية البصرية للمؤسسة
      */}
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cpf-enterprise-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M0 80L80 0ZM-20 20L20 -20ZM60 100L100 60Z" stroke="#C08F2D" strokeWidth="1" fill="none"/>
              <path d="M0 0L80 80ZM-20 60L20 100ZM60 -20L100 20Z" stroke="#ffffff" strokeWidth="0.5" fill="none" opacity="0.5"/>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#cpf-enterprise-pattern)" />
        </svg>
      </div>

      {/* Dark Gradient Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#721F31]/10 via-[#4a1420]/80 to-[#1a070b] z-0"></div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
        
        {/* Official Tagline Badge */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-[1px] w-12 bg-[#C08F2D]"></div>
          <span className="text-[#C08F2D] text-sm font-bold tracking-widest uppercase">
            البوابة الموحدة للفرص
          </span>
          <div className="h-[1px] w-12 bg-[#C08F2D]"></div>
        </div>

        {/* Main Typography */}
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
          شباب قادر..<br/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C08F2D] to-[#e6b95c]">
            لأردن طموح
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 mb-12 font-medium max-w-3xl leading-relaxed border-l-4 border-[#C08F2D] pl-6 py-2 text-right rtl:border-r-4 rtl:border-l-0 rtl:pr-6 rtl:pl-0">
          منصة مؤسسة ولي العهد الرسمية لتسجيل الشباب الأردني في المبادرات والبرامج القيادية، الاقتصادية، والمجتمعية لبناء مسار مهني متكامل.
        </p>

        {/* Enterprise Search Interface */}
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/20 shadow-2xl flex flex-col md:flex-row items-center gap-2 mb-8">
          
          <div className="flex-1 flex items-center bg-white rounded-md px-4 py-3 w-full">
            <Search className="text-[#721F31] w-5 h-5 mr-3 ml-2" />
            <input 
              type="text" 
              placeholder="ابحث عن ورشة، مسار تدريبي، أو فعالية..." 
              className="flex-1 bg-transparent border-none outline-none text-gray-900 text-lg font-bold placeholder:text-gray-400 placeholder:font-medium w-full"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-md font-bold transition-all border border-white/20 flex items-center justify-center gap-2 w-full md:w-auto">
              <SlidersHorizontal className="w-5 h-5" />
              تصفية
            </button>
            <button className="bg-[#C08F2D] hover:bg-[#a67c27] text-white px-10 py-3.5 rounded-md font-bold transition-all shadow-lg w-full md:w-auto">
              بحث
            </button>
          </div>
          
        </div>

        {/* Professional Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-4">
          <span className="text-white/60 text-sm font-bold py-2 px-2 hidden md:block">التصفية السريعة:</span>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-md font-bold text-sm transition-all duration-300 border ${
                activeFilter === filter
                  ? 'bg-[#C08F2D] border-[#C08F2D] text-white shadow-[0_0_15px_rgb(192,143,45,0.4)]'
                  : 'bg-transparent border-white/20 text-white/80 hover:bg-white/10 hover:border-white/40'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

      </div>
      
      {/* Bottom fade transition to connect with the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F8FAFC] to-transparent z-20"></div>
    </div>
  );
}