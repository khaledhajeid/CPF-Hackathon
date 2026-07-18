// src/components/AccessibilityWidget.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accessibility, Check, Sun } from 'lucide-react';

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [contrast, setContrast] = useState('normal');
  const [fontSize, setFontSize] = useState('md');

  return (
    // 🟢 رفعنا الزر عالموبايل (bottom-20) عشان ما يغطي على شريط الـ MobileNavBar
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-[95] font-sans text-right" dir="rtl">
      
      {/* القائمة التفاعلية الزجاجية الفخمة */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 20, y: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 20, y: 20 }}
            style={{ transformOrigin: 'bottom right' }}
            // 🟢 عرض متجاوب وحواف دائرية تتناسب مع تصميم الموبايل
            className="absolute bottom-16 right-0 mb-2 w-[calc(100vw-2rem)] sm:w-72 max-w-[288px] bg-white/95 backdrop-blur-xl border border-gray-200 p-4 md:p-5 rounded-2xl shadow-2xl"
          >
            <div className="border-b border-gray-100 pb-3 mb-4">
              <h4 className="font-black text-gray-900 text-[13px] md:text-sm">أدوات الوصول الرقمي</h4>
              <p className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">تخصيص تجربة القراءة بما يناسبك</p>
            </div>

            {/* 1. خيارات حجم الخط */}
            <div className="mb-4">
              <span className="text-[10px] md:text-[11px] font-black text-gray-500 block mb-2">حجم خط النصوص:</span>
              <div className="grid grid-cols-3 gap-1.5 bg-gray-50 p-1.5 border border-gray-200 rounded-xl">
                {['sm', 'md', 'lg'].map(size => (
                  <button 
                    key={size} onClick={() => setFontSize(size)}
                    className={`py-1.5 text-xs font-black rounded-lg transition-all cursor-pointer ${fontSize === size ? 'bg-[#8a1538] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    {size === 'sm' ? 'A-' : size === 'md' ? 'A' : 'A+'}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. خيارات التباين العالي */}
            <div>
              <span className="text-[10px] md:text-[11px] font-black text-gray-500 block mb-2">تباين الألوان والمظهر:</span>
              <button 
                onClick={() => setContrast(prev => prev === 'high' ? 'normal' : 'high')}
                className={`w-full flex items-center justify-between p-3 border rounded-xl transition-all cursor-pointer ${contrast === 'high' ? 'border-[#8a1538] bg-[#8a1538]/5 text-[#8a1538]' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              >
                <div className="flex items-center gap-2.5 text-[11px] md:text-xs font-black">
                  <Sun className="w-4 h-4 text-[#C08F2D]" />
                  نمط التباين العالي
                </div>
                {contrast === 'high' && <Check className="w-4 h-4 text-[#8a1538]" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* الزر الدائري */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 md:w-14 md:h-14 bg-[#1a0409] hover:bg-[#8a1538] text-white border-2 border-white/20 rounded-full flex items-center justify-center shadow-2xl transition-colors relative cursor-pointer"
      >
        <Accessibility className="w-5 h-5 md:w-6 md:h-6" />
        <span className="absolute inset-0 rounded-full border border-white/30 animate-ping opacity-20 pointer-events-none"></span>
      </motion.button>

    </div>
  );
}