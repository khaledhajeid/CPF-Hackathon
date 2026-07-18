// src/components/news/EditorialNewsGrid.jsx
import { useState, useEffect, useRef } from 'react';
import { Calendar, ArrowLeft, Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { newsList } from '../../data/newsData';

export default function EditorialNewsGrid({ onNewsClick }) {
  const [visibleCount, setVisibleCount] = useState(5);
  
  // 🟢 حالات البحث والفلترة
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('الكل');
  const [isYearOpen, setIsYearOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const years = ['الكل', '2026', '2025', '2024', '2023', '2022', '2021', '2020'];

  // إغلاق قائمة السنوات عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsYearOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 🟢 دالة الفلترة (نبحث في العنوان والوصف ونطابق السنة)
  const filteredNews = newsList.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      
    // نفترض أن حقل item.date يحتوي على السنة (مثل "15 مايو 2024")
    const matchesYear = selectedYear === 'الكل' || item.date.includes(selectedYear);
    
    return matchesSearch && matchesYear;
  });

  const visibleNews = filteredNews.slice(0, visibleCount);

  return (
    <div className="bg-[#fcfcfc] py-[clamp(3rem,6vh,5rem)] border-b border-gray-100 overflow-hidden" dir="rtl">
      <div className="max-w-[1400px] xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-[clamp(1rem,4vw,2rem)]">
        
        {/* 🟢 الهيدر وشريط البحث والفلترة */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-[clamp(1rem,3vw,2rem)] mb-[clamp(1.5rem,4vh,3rem)]">
          
          <div className="flex items-center gap-[clamp(0.5rem,1vw,0.8rem)] shrink-0">
            <h2 className="text-[clamp(1.35rem,2.8vw,2.5rem)] font-black text-[#8a1538] tracking-tight leading-tight">أحدث الأخبار والفرص</h2>
          </div>

          {/* 🟢 شريط البحث العائم (Modern Pill Design) */}
          <div className="flex flex-col sm:flex-row items-center bg-white rounded-[clamp(1rem,2vw,1.5rem)] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] border border-gray-100 p-[clamp(0.25rem,0.5vw,0.35rem)] gap-2 w-full lg:w-auto z-20">
            
            {/* حقل البحث */}
            <div className="relative w-full sm:w-[250px] xl:w-[300px] flex items-center bg-gray-50/50 hover:bg-gray-50 rounded-xl px-4 py-[clamp(0.6rem,1vw,0.75rem)] transition-colors border border-transparent focus-within:border-[#C08F2D]/30 focus-within:bg-white">
              <Search className="w-[clamp(1rem,1.2vw,1.25rem)] h-[clamp(1rem,1.2vw,1.25rem)] text-gray-500 ml-3 shrink-0" />
              <input 
                type="text" 
                placeholder="ابحث في الأخبار..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none w-full text-[clamp(0.75rem,1vw,0.875rem)] font-bold text-gray-700 placeholder-gray-400" 
              />
            </div>

            {/* خط فاصل */}
            <div className="hidden sm:block w-px h-8 bg-gray-200" />

            {/* 🟢 قائمة السنوات المنسدلة (Custom Dropdown) */}
            <div className="relative w-full sm:w-[160px]" ref={dropdownRef}>
              <button 
                onClick={() => setIsYearOpen(!isYearOpen)} 
                className="w-full flex items-center justify-between px-4 py-[clamp(0.6rem,1vw,0.75rem)] bg-gray-50/50 hover:bg-gray-50 transition-colors rounded-xl cursor-pointer border border-transparent"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-[clamp(1rem,1.2vw,1.25rem)] h-[clamp(1rem,1.2vw,1.25rem)] text-[#C08F2D]" />
                  <span className="font-bold text-[clamp(0.75rem,1vw,0.875rem)] text-gray-700">
                    {selectedYear === 'الكل' ? 'كل السنوات' : selectedYear}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isYearOpen ? 'rotate-180 text-[#C08F2D]' : ''}`} />
              </button>

              <AnimatePresence>
                {isYearOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-[calc(100%+0.5rem)] left-0 w-full bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden z-50"
                  >
                    <div className="max-h-[200px] overflow-y-auto scrollbar-hide flex flex-col p-1">
                      {years.map((year) => (
                        <button
                          key={year}
                          onClick={() => {
                            setSelectedYear(year);
                            setIsYearOpen(false);
                            setVisibleCount(5); // إعادة تعيين عدد الكروت عند الفلترة
                          }}
                          className={`text-right px-4 py-2.5 rounded-lg text-[clamp(0.75rem,1vw,0.875rem)] font-bold transition-colors ${
                            selectedYear === year 
                              ? 'bg-[#8a1538]/5 text-[#8a1538]' 
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          {year === 'الكل' ? 'جميع السنوات' : year}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* 🟢 الشبكة */}
        {filteredNews.length > 0 ? (
          <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,2vw,1.5rem)] pb-6 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {visibleNews.map((item, idx) => {
              const isFeatured = idx === 0 && searchQuery === '' && selectedYear === 'الكل';

              return (
                <div
                  key={item.id}
                  onClick={() => onNewsClick(item)}
                  className={`group relative overflow-hidden rounded-[clamp(1rem,2vw,1.5rem)] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 shrink-0 snap-center
                    ${isFeatured 
                      ? 'w-[280px] sm:w-[320px] md:w-auto h-[clamp(280px,40vh,420px)] md:col-span-2' 
                      : 'w-[260px] sm:w-[300px] md:w-auto h-[clamp(280px,40vh,420px)]'}`}
                >
                  <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110 " />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0409]/95 via-[#1a0409]/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-[#8a1538] mix-blend-multiply opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                  
                  {/* 🟢 تم إزالة التاج (الفئة) وإبقاء التاريخ في الزاوية العلوية اليسرى بشكل أنيق */}
                  <div className="absolute top-0 left-0 right-0 p-[clamp(1rem,2vw,1.5rem)] flex justify-end items-start z-10">
                    <span className="text-white/90 bg-black/20 backdrop-blur-md px-[clamp(0.5rem,1vw,0.75rem)] py-[clamp(0.2rem,0.5vw,0.3rem)] rounded-[clamp(0.35rem,0.8vw,0.5rem)] text-[clamp(0.5rem,0.8vw,0.75rem)] font-bold flex items-center gap-[clamp(0.2rem,0.5vw,0.35rem)] shadow-sm">
                      <Calendar className="w-[clamp(0.7rem,1vw,0.85rem)] h-[clamp(0.7rem,1vw,0.85rem)] text-[#C08F2D]" />
                      {item.date}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-[clamp(1rem,2vw,1.5rem)] z-10 flex flex-col justify-end">
                    <h3 className={`font-black text-white leading-[1.3] mb-[clamp(0.35rem,0.8vw,0.5rem)] drop-shadow-md transition-all duration-500 text-[#8a1538]
                      ${isFeatured ? 'text-[clamp(1.1rem,2vw,1.75rem)]' : 'text-[clamp(0.9rem,1.5vw,1.25rem)]'}`}>
                      {item.title}
                    </h3>
                    
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                      <div className="overflow-hidden">
                        <p className={`text-white/80 font-medium leading-relaxed text-justify mt-[clamp(0.25rem,0.5vw,0.5rem)] 
                          ${isFeatured ? 'text-[clamp(0.8rem,1vw,0.95rem)] line-clamp-2 md:line-clamp-3' : 'text-[clamp(0.75rem,0.9vw,0.85rem)] line-clamp-2'}`}>
                          {item.desc}
                        </p>
                        <div className="mt-[clamp(0.5rem,1.2vw,1rem)] flex items-center gap-[clamp(0.35rem,0.8vw,0.5rem)] text-[#C08F2D] font-black text-[clamp(0.6rem,0.8vw,0.8rem)]">
                          <div className="w-[clamp(1.25rem,1.8vw,1.75rem)] h-[clamp(1.25rem,1.8vw,1.75rem)] rounded-full bg-[#C08F2D]/20 flex items-center justify-center">
                            <ArrowLeft className="w-[clamp(0.65rem,0.9vw,0.85rem)] h-[clamp(0.65rem,0.9vw,0.85rem)] text-[#C08F2D] transform group-hover:-translate-x-1 transition-transform" />
                          </div>
                          <span>اقرأ التفاصيل الكاملة</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* حالة عدم وجود نتائج (Empty State) */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-xl font-black text-gray-800 mb-2">لم نتمكن من العثور على نتائج</h3>
            <p className="text-sm font-bold text-gray-500">جرب البحث بكلمات أخرى أو تغيير سنة النشر.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedYear('الكل'); }}
              className="mt-6 px-6 py-2.5 bg-[#8a1538]/10 text-[#8a1538] font-bold rounded-xl hover:bg-[#8a1538]/20 transition-colors"
            >
              إعادة ضبط البحث
            </button>
          </div>
        )}

        {/* زر عرض المزيد */}
        {filteredNews.length > visibleCount && (
          <div className="mt-[clamp(1.5rem,4vh,3rem)] flex justify-center">
            <button onClick={() => setVisibleCount(prev => prev + 3)} className="w-full md:w-auto bg-white border-2 border-gray-100 hover:border-[#8a1538] text-[#1a1c1d] hover:text-[#8a1538] px-[clamp(1.25rem,2.5vw,2rem)] py-[clamp(0.6rem,1.2vw,0.875rem)] rounded-xl md:rounded-full font-black text-[clamp(0.8rem,1.2vw,1.1rem)] transition-colors flex justify-center items-center gap-[clamp(0.35rem,0.8vw,0.5rem)] shadow-sm hover:shadow-xl cursor-pointer">
              <span>عرض المزيد من الأخبار</span>
              <ArrowLeft className="w-[clamp(0.85rem,1.2vw,1.1rem)] h-[clamp(0.85rem,1.2vw,1.1rem)]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}