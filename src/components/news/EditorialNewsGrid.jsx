// src/components/news/EditorialNewsGrid.jsx
import React, { useState } from 'react';
import { Calendar, ArrowLeft } from 'lucide-react';
import { newsList } from '../../data/newsData';

export default function EditorialNewsGrid({ onNewsClick }) {
  const [visibleCount, setVisibleCount] = useState(5);

  // جلب الأخبار مباشرة بدون فلاتر
  const visibleNews = newsList.slice(0, visibleCount);

  return (
    <div className="bg-[#fcfcfc] py-[clamp(3rem,6vh,5rem)] border-b border-gray-100 overflow-hidden" dir="rtl">
      {/* الحاوية المرنة لضغط المحتوى في شاشات 13 إنش */}
      <div className="max-w-[1400px] xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-[clamp(1rem,4vw,2rem)]">
        
        {/* الهيدر (بدون فلاتر) */}
        <div className="flex items-center gap-[clamp(0.5rem,1vw,0.8rem)] mb-[clamp(1.5rem,4vh,3rem)]">
          <img src="/arrow-yellow.svg" className="w-[clamp(1.25rem,2.5vw,2rem)] h-[clamp(1.25rem,2.5vw,2rem)] shrink-0 object-contain" alt="" />
          <h2 className="text-[clamp(1.35rem,2.8vw,2.5rem)] font-black text-[#1a1c1d] tracking-tight leading-tight">أحدث الأخبار والفرص</h2>
        </div>

        {/* الشبكة */}
        <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,2vw,1.5rem)] pb-6 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {visibleNews.map((item, idx) => {
            // الكرت الأول دائماً يكون مميزاً (Featured)
            const isFeatured = idx === 0;

            return (
              <div
                key={item.id}
                onClick={() => onNewsClick(item)}
                className={`group relative overflow-hidden rounded-[clamp(1rem,2vw,1.5rem)] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 shrink-0 snap-center
                  ${isFeatured 
                    ? 'w-[280px] sm:w-[320px] md:w-auto h-[clamp(280px,40vh,420px)] md:col-span-2' 
                    : 'w-[260px] sm:w-[300px] md:w-auto h-[clamp(280px,40vh,420px)]'}`}
              >
                <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0409]/95 via-[#1a0409]/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-[#8a1538] mix-blend-multiply opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                
                <div className="absolute top-0 left-0 right-0 p-[clamp(1rem,2vw,1.5rem)] flex justify-between items-start z-10">
                  <span className="bg-[#C08F2D]/90 backdrop-blur-md text-white px-[clamp(0.6rem,1.2vw,0.85rem)] py-[clamp(0.2rem,0.5vw,0.3rem)] rounded-[clamp(0.35rem,0.8vw,0.5rem)] text-[clamp(0.55rem,0.8vw,0.75rem)] font-black shadow-lg">
                    {item.category}
                  </span>
                  <span className="text-white/90 bg-black/20 backdrop-blur-md px-[clamp(0.5rem,1vw,0.75rem)] py-[clamp(0.2rem,0.5vw,0.3rem)] rounded-[clamp(0.35rem,0.8vw,0.5rem)] text-[clamp(0.5rem,0.8vw,0.75rem)] font-bold flex items-center gap-[clamp(0.2rem,0.5vw,0.35rem)] shadow-sm">
                    <Calendar className="w-[clamp(0.7rem,1vw,0.85rem)] h-[clamp(0.7rem,1vw,0.85rem)] text-[#C08F2D]" />
                    {item.date}
                  </span>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-[clamp(1rem,2vw,1.5rem)] z-10 flex flex-col justify-end">
                  <h3 className={`font-black text-white leading-[1.3] mb-[clamp(0.35rem,0.8vw,0.5rem)] drop-shadow-md transition-all duration-500 
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

        {/* زر عرض المزيد */}
        {newsList.length > visibleCount && (
          <div className="mt-[clamp(1.5rem,4vh,3rem)] flex justify-center">
            <button onClick={() => setVisibleCount(prev => prev + 3)} className="w-full md:w-auto bg-white border-2 border-gray-100 hover:border-[#8a1538] text-[#1a1c1d] hover:text-[#8a1538] px-[clamp(1.25rem,2.5vw,2rem)] py-[clamp(0.6rem,1.2vw,0.875rem)] rounded-xl md:rounded-full font-black text-[clamp(0.8rem,1.2vw,1.1rem)] transition-colors flex justify-center items-center gap-[clamp(0.35rem,0.8vw,0.5rem)] shadow-sm hover:shadow-xl">
              <span>عرض المزيد من الأخبار</span>
              <ArrowLeft className="w-[clamp(0.85rem,1.2vw,1.1rem)] h-[clamp(0.85rem,1.2vw,1.1rem)]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}