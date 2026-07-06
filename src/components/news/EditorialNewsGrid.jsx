// src/components/news/EditorialNewsGrid.jsx

import React, { useMemo, useState } from 'react';
import { Calendar, ArrowLeft } from 'lucide-react';
import { newsList } from '../../data/newsData';

export default function EditorialNewsGrid({ onNewsClick }) {

  const [activeFilter, setActiveFilter] = useState('الكل');
  const [visibleCount, setVisibleCount] = useState(5);

  const categories = [
    'الكل',
    'أخبار الفرص',
    'إنجازات الشباب',
    'شراكاتنا'
  ];

  const filteredNews = useMemo(() => {
    return activeFilter === 'الكل'
      ? newsList
      : newsList.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  const visibleNews = filteredNews.slice(0, visibleCount);

  return (
    <div className="bg-[#fcfcfc] py-24 border-b border-gray-100 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">

        {/* 🟢 Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="flex items-center gap-4">
            <img
              src="/arrow-yellow.svg"
              className="w-8 h-8 md:w-10 md:h-10 shrink-0 object-contain"
              alt="مؤسسة ولي العهد"
            />
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1a1c1d] tracking-tight">
                أحدث الأخبار والفرص
              </h2>
            </div>
          </div>

          {/* 🟢 Filters */}
          <div className="flex flex-wrap gap-2 justify-start bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  setVisibleCount(5);
                }}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 cursor-pointer
                  ${
                    activeFilter === cat
                      ? 'bg-[#8a1538] text-white shadow-md scale-100'
                      : 'bg-transparent text-gray-500 hover:bg-gray-50 hover:text-[#8a1538]'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 🟢 Grid (تم إزالة أنيميشن الفلترة لضمان الاستقرار) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {visibleNews.map((item, idx) => {
            const isFeatured = idx === 0 && activeFilter === 'الكل';

            return (
              <div
                key={item.id}
                onClick={() => onNewsClick(item)}
                className={`group relative overflow-hidden rounded-[2rem] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-700
                  ${
                    isFeatured
                      ? 'md:col-span-2 lg:col-span-2 h-[450px] md:h-[500px]'
                      : 'h-[450px] md:h-[500px]'
                  }`}
              >
                {/* 🟢 Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110"
                />

                {/* 🟢 Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0409] via-[#1a0409]/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-[#8a1538] mix-blend-multiply opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

                {/* 🟢 Top Content */}
                <div className="absolute top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-start z-10">
                  <span className="bg-[#C08F2D]/90 backdrop-blur-md text-white px-4 py-1.5 rounded-lg text-xs md:text-sm font-black shadow-lg">
                    {item.category}
                  </span>
                  <span className="text-white/90 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold flex items-center gap-1.5 shadow-sm">
                    <Calendar className="w-4 h-4 text-[#C08F2D]" />
                    {item.date}
                  </span>
                </div>

                {/* 🟢 Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 flex flex-col justify-end">
                  <h3
                    className={`font-black text-white leading-[1.4] mb-3 drop-shadow-md transition-all duration-500
                      ${
                        isFeatured
                          ? 'text-2xl md:text-4xl'
                          : 'text-xl md:text-2xl'
                      }`}
                  >
                    {item.title}
                  </h3>

                  {/* 🟢 Hover Expand */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p
                        className={`text-white/80 font-medium leading-relaxed text-justify mt-2
                          ${
                            isFeatured
                              ? 'text-sm md:text-base line-clamp-3'
                              : 'text-xs md:text-sm line-clamp-2'
                          }`}
                      >
                        {item.desc}
                      </p>
                      <div className="mt-6 flex items-center gap-2 text-[#C08F2D] font-black text-sm">
                        <div className="w-8 h-8 rounded-full bg-[#C08F2D]/20 flex items-center justify-center">
                          <ArrowLeft className="w-4 h-4 text-[#C08F2D] transform group-hover:-translate-x-1 transition-transform" />
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

        {/* 🟢 Load More */}
        {filteredNews.length > visibleCount && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setVisibleCount(prev => prev + 3)}
              className="bg-white border-2 border-gray-100 hover:border-[#8a1538] text-[#1a1c1d] hover:text-[#8a1538] hover:shadow-xl px-12 md:px-16 py-5 md:py-6 rounded-full font-black text-base md:text-xl transition-colors duration-300 cursor-pointer flex items-center gap-3 group"
            >
              <span>تحميل المزيد من التحديثات</span>
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}