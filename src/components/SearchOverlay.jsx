// src/components/SearchOverlay.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowUpLeft } from 'lucide-react';
import { allEvents } from '../data';

export default function SearchOverlay({ isOpen, onClose, handleRegisterClick }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setQuery('');
      setIsFocused(false);
    }
  }, [isOpen]);

  const results = query.length > 1 
    ? allEvents.filter(e => e.title.includes(query) || e.pathway.includes(query) || e.city.includes(query))
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          className="fixed inset-0 z-[100] bg-[#1a070b]/80 flex flex-col items-center pt-24 md:pt-32 px-4"
          dir="rtl"
        >
          {/* زر الإغلاق */}
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-white/40 hover:text-white transition-transform hover:rotate-90 duration-300"
          >
            <X className="w-10 h-10" />
          </button>

          {/* الحاوية الزجاجية لمحرك البحث */}
          <motion.div 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`w-full max-w-4xl relative transition-all duration-500 ${isFocused ? 'scale-[1.02]' : 'scale-100'}`}
          >
            <div className="relative bg-[#0a0204]/80 backdrop-blur-xl border border-white/10 rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              
              <Search className={`absolute right-6 top-1/2 -translate-y-1/2 w-7 h-7 transition-colors duration-300 ${isFocused ? 'text-[#C08F2D]' : 'text-white/30'}`} />
              
              <input 
                ref={inputRef}
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="ابحث عن فعالية، مسار، أو محافظة..."
                dir="rtl" // 🟢 إجبار الاتجاه مباشرة جوا الـ Input
                /* 🟢 تم إزالة font-bold واستخدام font-normal لأن الأوزان الثقيلة هي اللي بتكسر الوصلات */
                className="w-full bg-transparent border-none text-white placeholder-white/40 text-2xl md:text-3xl font-normal font-sans py-7 pr-16 pl-6 outline-none"
                style={{ 
                  letterSpacing: '0px', 
                  wordSpacing: '0px',
                  textRendering: 'optimizeLegibility' // 🟢 منع المتصفح من تشويه الحروف
                }}
              />

              {/* خط التركيز الذهبي السفلي */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: isFocused ? '100%' : '0%' }}
                  className="h-full bg-gradient-to-r from-transparent via-[#C08F2D] to-transparent"
                />
              </div>
            </div>
          </motion.div>

          {/* صندوق النتائج */}
          {query.length > 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-4xl mt-3 bg-[#0a0204]/80 backdrop-blur-xl rounded-sm shadow-2xl overflow-hidden max-h-[50vh] overflow-y-auto border border-white/10"
            >
              {results.length === 0 ? (
                <div className="p-10 text-center text-white/50 font-bold flex flex-col items-center gap-3">
                  <Search className="w-8 h-8 text-white/20" />
                  لا توجد نتائج مطابقة لبحثك عن "{query}"
                </div>
              ) : (
                <div className="flex flex-col">
                  {results.map((event, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}
                      key={event.id} 
                      className="p-5 border-b border-white/5 hover:bg-white/5 transition-colors flex items-center justify-between group cursor-pointer" 
                      onClick={() => { onClose(); handleRegisterClick(event); }}
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-[#1a070b] rounded-sm overflow-hidden shrink-0 border border-white/10 relative">
                          <img src={event.image} alt="" className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                        </div>
                        <div>
                          <h4 className="text-base font-black text-white group-hover:text-[#C08F2D] transition-colors mb-1">{event.title}</h4>
                          <span className="text-[11px] font-bold text-white/50 bg-white/5 border border-white/5 px-2 py-1 rounded-sm">{event.pathway} • {event.city}</span>
                        </div>
                      </div>
                      <ArrowUpLeft className="w-5 h-5 text-white/20 group-hover:text-[#C08F2D] transform group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}