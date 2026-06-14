// src/components/AccessibilityWidget.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accessibility, Check, Sun } from 'lucide-react';

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [contrast, setContrast] = useState('normal');
  const [fontSize, setFontSize] = useState('md');

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans text-right" dir="rtl">
      
      {/* القائمة التفاعلية الزجاجية الفخمة */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 20, y: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 20, y: 20 }}
            style={{ transformOrigin: 'bottom right' }}
            className="absolute bottom-16 right-0 mb-2 w-72 bg-white/95 backdrop-blur-xl border border-gray-200 p-5 rounded-sm shadow-2xl"
          >
            <div className="border-b border-gray-100 pb-3 mb-4">
              <h4 className="font-black text-gray-900 text-sm">أدوات الوصول الرقمي</h4>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">تخصيص تجربة القراءة بما يناسبك</p>
            </div>

            {/* 1. خيارات حجم الخط */}
            <div className="mb-4">
              <span className="text-[11px] font-black text-gray-500 block mb-2">حجم خط النصوص:</span>
              <div className="grid grid-cols-3 gap-1 bg-gray-50 p-1 border border-gray-200 rounded-sm">
                {['sm', 'md', 'lg'].map(size => (
                  <button 
                    key={size} onClick={() => setFontSize(size)}
                    className={`py-1.5 text-xs font-black rounded-sm transition-all ${fontSize === size ? 'bg-[#721F31] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    {size === 'sm' ? 'A-' : size === 'md' ? 'A' : 'A+'}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. خيارات التباين العالي */}
            <div>
              <span className="text-[11px] font-black text-gray-500 block mb-2">تباين الألوان والمظهر:</span>
              <button 
                onClick={() => setContrast(prev => prev === 'high' ? 'normal' : 'high')}
                className={`w-full flex items-center justify-between p-3 border rounded-sm transition-all ${contrast === 'high' ? 'border-[#721F31] bg-[#721F31]/5 text-[#721F31]' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              >
                <div className="flex items-center gap-2.5 text-xs font-black">
                  <Sun className="w-4 h-4 text-[#C08F2D]" />
                  نمط التباين العالي
                </div>
                {contrast === 'high' && <Check className="w-4 h-4 text-[#721F31]" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* الزر الدائري (Sticky Man Icon) */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gray-900 hover:bg-[#721F31] text-white border-2 border-white/20 rounded-full flex items-center justify-center shadow-2xl transition-colors relative"
      >
        <Accessibility className="w-6 h-6" />
        <span className="absolute inset-0 rounded-full border border-white/30 animate-ping opacity-20 pointer-events-none"></span>
      </motion.button>

    </div>
  );
}