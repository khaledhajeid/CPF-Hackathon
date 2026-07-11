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
    <div className="bg-[#fcfcfc] py-16 sm:py-20 md:py-24 lg:py-20 xl:py-28 2xl:py-36 border-b border-gray-100 overflow-hidden">
      <div className="max-w-[1400px] 2xl:max-w-[1700px] mx-auto px-0 md:px-8">
        
        {/* الهيدر والفلاتر */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 lg:gap-8 xl:gap-10 2xl:gap-12 mb-10 md:mb-16 lg:mb-14 xl:mb-20 2xl:mb-24 px-4 md:px-0">
          <div className="flex items-center gap-3 lg:gap-3 xl:gap-4 2xl:gap-5">
            <img src="/arrow-yellow.svg" className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-8 lg:h-8 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 shrink-0 object-contain" alt="" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black text-[#1a1c1d] tracking-tight">أحدث الأخبار والفرص</h2>
          </div>
          
          <div className="flex overflow-x-auto gap-2 sm:gap-3 justify-start bg-white p-2 lg:p-2 xl:p-2.5 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 scrollbar-hide snap-x">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveFilter(cat); setVisibleCount(5); }}
                className={`whitespace-nowrap shrink-0 snap-center px-5 sm:px-6 md:px-8 lg:px-6 xl:px-8 2xl:px-10 py-2.5 lg:py-2 xl:py-3 2xl:py-4 rounded-lg md:rounded-xl font-bold text-[13px] sm:text-sm md:text-base lg:text-[13px] xl:text-base 2xl:text-xl transition-all duration-300 cursor-pointer ${activeFilter === cat ? 'bg-[#8a1538] text-white shadow-md' : 'text-gray-500 hover:text-[#8a1538] hover:bg-gray-50'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 🟢 إضافة px-4 للـ container عالموبايل عشان الكروت ما تلزق بالشاشة، وإعطائها مساحة تتنفس */}
        <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 lg:gap-6 xl:gap-10 2xl:gap-12 pb-8 md:pb-0 scrollbar-hide px-4 md:px-0">
          {visibleNews.map((item, idx) => {
            const isFeatured = idx === 0 && activeFilter === 'الكل';

            return (
              <div
                key={item.id}
                onClick={() => onNewsClick(item)}
                className={`group relative overflow-hidden rounded-3xl md:rounded-[2rem] lg:rounded-3xl xl:rounded-[2.5rem] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 shrink-0 snap-center
                  ${isFeatured 
                    ? 'w-[85vw] sm:w-[360px] md:w-auto h-[400px] sm:h-[450px] md:h-[500px] lg:h-[450px] xl:h-[550px] 2xl:h-[650px] md:col-span-2' 
                    : 'w-[80vw] sm:w-[320px] md:w-auto h-[380px] sm:h-[420px] md:h-[500px] lg:h-[450px] xl:h-[550px] 2xl:h-[650px]'}`}
              >
                <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0409]/95 via-[#1a0409]/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-[#8a1538] mix-blend-multiply opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                
                <div className="absolute top-0 left-0 right-0 p-5 sm:p-6 md:p-8 lg:p-6 xl:p-10 2xl:p-12 flex justify-between items-start z-10">
                  <span className="bg-[#C08F2D]/90 backdrop-blur-md text-white px-3 sm:px-4 lg:px-4 xl:px-5 2xl:px-6 py-1.5 lg:py-1.5 xl:py-2 2xl:py-3 rounded-lg text-[11px] sm:text-xs lg:text-[12px] xl:text-[15px] 2xl:text-lg font-black shadow-lg">
                    {item.category}
                  </span>
                  <span className="text-white/90 bg-black/20 backdrop-blur-md px-3 sm:px-4 lg:px-3 xl:px-4 2xl:px-5 py-1.5 lg:py-1.5 xl:py-2 2xl:py-3 rounded-lg text-[11px] sm:text-xs lg:text-[11px] xl:text-[13px] 2xl:text-base font-bold flex items-center gap-1.5 shadow-sm">
                    <Calendar className="w-3.5 h-3.5 lg:w-4 lg:h-4 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5 text-[#C08F2D]" />
                    {item.date}
                  </span>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8 lg:p-6 xl:p-10 2xl:p-12 z-10 flex flex-col justify-end">
                  <h3 className={`font-black text-white leading-snug mb-3 lg:mb-3 xl:mb-4 2xl:mb-5 drop-shadow-md transition-all duration-500 
                    ${isFeatured ? 'text-xl sm:text-2xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl' : 'text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-4xl'}`}>
                    {item.title}
                  </h3>
                  
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p className={`text-white/80 font-medium leading-relaxed text-justify mt-2 
                        ${isFeatured ? 'text-[13px] sm:text-sm md:text-base lg:text-[14px] xl:text-[1.05rem] 2xl:text-xl line-clamp-3' : 'text-[12px] sm:text-[13px] md:text-sm lg:text-[13px] xl:text-[15px] 2xl:text-lg line-clamp-2 2xl:line-clamp-3'}`}>
                        {item.desc}
                      </p>
                      <div className="mt-4 sm:mt-5 md:mt-6 lg:mt-5 xl:mt-8 2xl:mt-10 flex items-center gap-2.5 text-[#C08F2D] font-black text-xs sm:text-[13px] lg:text-[12px] xl:text-[15px] 2xl:text-xl">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-7 lg:h-7 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 rounded-full bg-[#C08F2D]/20 flex items-center justify-center">
                          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-3.5 lg:h-3.5 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 text-[#C08F2D] transform group-hover:-translate-x-1 transition-transform" />
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

        {filteredNews.length > visibleCount && (
          <div className="mt-10 md:mt-16 lg:mt-14 xl:mt-20 2xl:mt-28 flex justify-center px-4 md:px-0">
            <button onClick={() => setVisibleCount(prev => prev + 3)} className="w-full md:w-auto bg-white border-2 border-gray-100 hover:border-[#8a1538] text-[#1a1c1d] hover:text-[#8a1538] px-8 sm:px-10 lg:px-10 xl:px-12 2xl:px-16 py-3.5 sm:py-4 lg:py-3.5 xl:py-5 2xl:py-6 rounded-xl md:rounded-full font-black text-[14px] sm:text-sm md:text-xl lg:text-[15px] xl:text-xl 2xl:text-2xl transition-colors flex justify-center items-center gap-2.5 shadow-sm hover:shadow-xl cursor-pointer">
              <span>عرض المزيد من الأخبار</span>
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}