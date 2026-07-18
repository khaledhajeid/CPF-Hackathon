// src/components/SearchOverlay.jsx
import { useState, useEffect, useRef } from 'react';
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
          // 🟢 100dvh لضمان عدم القفز عند ظهور كيبورد الموبايل
          className="fixed inset-0 z-[120] bg-[#1a0409]/85 flex flex-col items-center pt-20 md:pt-32 px-4 min-h-[100dvh]"
          dir="rtl"
        >
          {/* 🟢 زر الإغلاق: تصغير للحجم وموقع مريح للموبايل */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all hover:rotate-90 duration-300 cursor-pointer"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* الحاوية الزجاجية لمحرك البحث */}
          <motion.div 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`w-full max-w-4xl relative transition-all duration-500 mt-4 md:mt-0 ${isFocused ? 'scale-[1.02]' : 'scale-100'}`}
          >
            {/* 🟢 تدوير الحواف rounded-2xl لتلائم تصميم المنصة */}
            <div className="relative bg-[#0a0204]/80 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              
              <Search className={`absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-5 h-5 md:w-7 md:h-7 transition-colors duration-300 ${isFocused ? 'text-[#C08F2D]' : 'text-white/30'}`} />
              
              <input 
                ref={inputRef}
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="ابحث عن فعالية، مسار، أو محافظة..."
                dir="rtl"
                /* 🟢 تعديل الـ Padding و حجم الخط للموبايل */
                className="w-full bg-transparent border-none text-white placeholder-white/40 text-lg md:text-3xl font-medium font-sans py-5 md:py-7 pr-12 md:pr-16 pl-6 outline-none"
                style={{ 
                  letterSpacing: '0px', 
                  wordSpacing: '0px',
                  textRendering: 'optimizeLegibility' 
                }}
              />

              {/* خط التركيز الذهبي السفلي */}
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/5">
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
              // 🟢 التحكم بارتفاع النتائج لتناسب الموبايل بشكل مثالي
              className="w-full max-w-4xl mt-3 md:mt-4 bg-[#0a0204]/80 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden max-h-[50vh] md:max-h-[60vh] overflow-y-auto border border-white/10 scrollbar-hide"
            >
              {results.length === 0 ? (
                <div className="p-8 md:p-10 text-center text-white/50 font-bold flex flex-col items-center gap-3">
                  <Search className="w-6 h-6 md:w-8 md:h-8 text-white/20" />
                  <span className="text-[13px] md:text-base">لا توجد نتائج مطابقة لبحثك عن "{query}"</span>
                </div>
              ) : (
                <div className="flex flex-col">
                  {results.map((event, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}
                      key={event.id} 
                      className="p-4 md:p-5 border-b border-white/5 hover:bg-white/5 transition-colors flex items-center justify-between group cursor-pointer" 
                      onClick={() => { onClose(); handleRegisterClick(event); }}
                    >
                      <div className="flex items-center gap-3 md:gap-5 w-full">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-[#1a0409] rounded-xl overflow-hidden shrink-0 border border-white/10 relative">
                          <img src={event.image} alt={event.title} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                        </div>
                        <div className="flex-1 pr-1">
                          <h4 className="text-[13px] md:text-base font-black text-white group-hover:text-[#C08F2D] transition-colors mb-1 md:mb-1.5 line-clamp-1">{event.title}</h4>
                          <span className="text-[10px] md:text-[11px] font-bold text-white/60 bg-white/10 border border-white/5 px-2 md:px-2.5 py-1 rounded-md inline-block shadow-sm">
                            {event.pathway} • {event.city}
                          </span>
                        </div>
                      </div>
                      <ArrowUpLeft className="w-4 h-4 md:w-5 md:h-5 text-white/20 group-hover:text-[#C08F2D] transform group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all shrink-0 ml-2" />
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