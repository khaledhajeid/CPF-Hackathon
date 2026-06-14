// src/components/TopUtilityBar.jsx
import React from 'react';
import { Phone, Globe, Sun } from 'lucide-react';

export default function TopUtilityBar() {
  return (
    // استخدام absolute و transparent لدمجه بالكامل مع صورة الخلفية
    <div className="absolute top-0 w-full z-50 bg-transparent border-b border-white/20 text-white/90 py-2.5 px-6 lg:px-12 flex justify-between items-center text-[11px] font-bold">
      
      {/* أدوات الوصول (Accessibility) */}
      <div className="flex items-center gap-5">
        <button className="flex items-center gap-1.5 hover:text-[#C08F2D] transition-colors">
          <Globe className="w-3.5 h-3.5" /> English
        </button>
        <div className="w-[1px] h-3 bg-white/30"></div>
        <div className="flex items-center gap-3">
          <button className="hover:text-[#C08F2D] transition-colors">A+</button>
          <button className="hover:text-[#C08F2D] transition-colors">A</button>
          <button className="hover:text-[#C08F2D] transition-colors">A-</button>
        </div>
        <div className="w-[1px] h-3 bg-white/30"></div>
        <button className="flex items-center gap-1.5 hover:text-[#C08F2D] transition-colors">
          <Sun className="w-3.5 h-3.5" /> التباين العالي
        </button>
      </div>
      
      {/* الدعم الفني */}
      <div className="flex items-center gap-2">
        <span dir="ltr" className="tracking-wider">+962 6 555 5555</span>
        <Phone className="w-3.5 h-3.5 text-[#C08F2D]" />
        <span className="hidden sm:inline ml-2 text-white/80">مركز الدعم والمساعدة:</span>
      </div>
      
    </div>
  );
}