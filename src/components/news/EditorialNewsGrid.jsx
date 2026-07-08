// src/components/news/EditorialNewsGrid.jsx
import React, { useMemo, useState } from 'react';
import { Calendar, ArrowLeft } from 'lucide-react';
import { newsList } from '../../data/newsData';

export default function EditorialNewsGrid({ onNewsClick }) {
  const [activeFilter, setActiveFilter] = useState('الكل');
  const [visibleCount, setVisibleCount] = useState(5);

  const categories = ['الكل', 'أخبار الفرص', 'إنجازات الشباب', 'شراكاتنا'];

  const filteredNews = useMemo(() => {
    return activeFilter === 'الكل'
      ? newsList
      : newsList.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  const visibleNews = filteredNews.slice(0, visibleCount);

  return (
    <div className="bg-[#fcfcfc] py-12 md:py-24 border-b border-gray-100 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* الهيدر والفلاتر */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 md:gap-8 mb-8 md:mb-16">
          <div className="flex items-center gap-3">
            <img src="/arrow-yellow.svg" className="w-6 h-6 md:w-10 md:h-10 shrink-0 object-contain" alt="" />
            <h2 className="text-2xl md:text-5xl font-black text-[#1a1c1d] tracking-tight">أحدث الأخبار والفرص</h2>
          </div>
          
          <div className="flex overflow-x-auto gap-2 justify-start bg-white p-1.5 md:p-2 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 scrollbar-hide snap-x -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveFilter(cat); setVisibleCount(5); }}
                className={`whitespace-nowrap shrink-0 snap-center px-4 md:px-6 py-2 rounded-lg md:rounded-xl font-bold text-[12px] md:text-sm transition-all duration-300 ${activeFilter === cat ? 'bg-[#8a1538] text-white shadow-md' : 'text-gray-500 hover:text-[#8a1538]'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 🟢 التغيير الجذري: سلايدر أفقي للموبايل وشبكة للكمبيوتر */}
        <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 pb-6 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {visibleNews.map((item, idx) => {
            const isFeatured = idx === 0 && activeFilter === 'الكل';

            return (
              <div
                key={item.id}
                onClick={() => onNewsClick(item)}
                // 🟢 إعطاء الكروت عرض ثابت للموبايل للسماح بالسحب (Swipe)
                className={`group relative overflow-hidden rounded-2xl md:rounded-[2rem] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 shrink-0 snap-center
                  ${isFeatured 
                    ? 'w-[280px] sm:w-[320px] md:w-auto h-[380px] md:h-[500px] md:col-span-2' 
                    : 'w-[260px] sm:w-[300px] md:w-auto h-[380px] md:h-[500px]'}`}
              >
                {/* 🟢 صورة الخلفية */}
                <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110" />
                
                {/* 🟢 التدرج اللوني (Overlay) */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0409]/95 via-[#1a0409]/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-[#8a1538] mix-blend-multiply opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                
                {/* 🟢 التصنيف والتاريخ */}
                <div className="absolute top-0 left-0 right-0 p-5 md:p-8 flex justify-between items-start z-10">
                  <span className="bg-[#C08F2D]/90 backdrop-blur-md text-white px-3 md:px-4 py-1.5 rounded-lg text-[11px] md:text-sm font-black shadow-lg">
                    {item.category}
                  </span>
                  <span className="text-white/90 bg-black/20 backdrop-blur-md px-2.5 md:px-3 py-1.5 rounded-lg text-[10px] md:text-sm font-bold flex items-center gap-1.5 shadow-sm">
                    <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#C08F2D]" />
                    {item.date}
                  </span>
                </div>
                
                {/* 🟢 العنوان والتفاصيل في الأسفل */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 z-10 flex flex-col justify-end">
                  <h3 className={`font-black text-white leading-snug mb-2 md:mb-3 drop-shadow-md transition-all duration-500 
                    ${isFeatured ? 'text-xl md:text-4xl' : 'text-lg md:text-2xl'}`}>
                    {item.title}
                  </h3>
                  
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p className={`text-white/80 font-medium leading-relaxed text-justify mt-2 
                        ${isFeatured ? 'text-[13px] md:text-base line-clamp-3' : 'text-xs md:text-sm line-clamp-2'}`}>
                        {item.desc}
                      </p>
                      <div className="mt-4 md:mt-6 flex items-center gap-2 text-[#C08F2D] font-black text-xs md:text-sm">
                        <div className="w-6 h-6 md:w-8 h-8 rounded-full bg-[#C08F2D]/20 flex items-center justify-center">
                          <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 text-[#C08F2D] transform group-hover:-translate-x-1 transition-transform" />
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

        {/* 🟢 زر التحميل الإضافي */}
        {filteredNews.length > visibleCount && (
          <div className="mt-8 md:mt-16 flex justify-center">
            <button onClick={() => setVisibleCount(prev => prev + 3)} className="w-full md:w-auto bg-white border-2 border-gray-100 hover:border-[#8a1538] text-[#1a1c1d] hover:text-[#8a1538] px-10 py-4 rounded-xl md:rounded-full font-black text-sm md:text-xl transition-colors flex justify-center items-center gap-2 shadow-sm hover:shadow-xl">
              <span>عرض المزيد من الأخبار</span>
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}