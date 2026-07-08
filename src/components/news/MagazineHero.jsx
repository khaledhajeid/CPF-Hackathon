// src/components/news/MagazineHero.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowUpLeft, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSliderNews, newsList } from '../../data/newsData';

export default function MagazineHero({ onNewsClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef(null);

  const mainNews = heroSliderNews[currentSlide];
  const sideNews = newsList.slice(0, 3);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSliderNews.length);
  const prevSlide = () => setCurrentSlide((prev) => prev === 0 ? heroSliderNews.length - 1 : prev - 1);

  useEffect(() => {
    const currentItem = heroSliderNews[currentSlide];
    if (currentItem.type === 'image') {
      const timer = setTimeout(() => nextSlide(), 5000);
      return () => clearTimeout(timer);
    }
  }, [currentSlide]);

  return (
    // 🟢 الموبايل: بدون padding يمين/يسار، الكمبيوتر: padding طبيعي
    <div className="pt-20 md:pt-32 pb-8 md:pb-16 bg-[#fcfcfc] border-b border-gray-100">
      <div className="max-w-[1450px] mx-auto px-0 md:px-8">
        <div className="flex flex-col lg:flex-row gap-0 md:gap-8 h-auto lg:h-[600px]">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            onClick={() => onNewsClick(mainNews)}
            // 🟢 الموبايل: حواف حادة (Edge-to-edge)، الكمبيوتر: حواف دائرية
            className="lg:w-2/3 relative rounded-none md:rounded-3xl overflow-hidden shadow-md md:shadow-xl group cursor-pointer h-[400px] md:h-[450px] lg:h-full"
          >
            <AnimatePresence mode="wait">
              <motion.div key={mainNews.id} initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0">
                {mainNews.type === 'video' ? (
                  <video ref={videoRef} src={mainNews.mediaUrl} autoPlay muted playsInline onEnded={nextSlide} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <img src={mainNews.mediaUrl} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0409]/90 via-[#1a0409]/40 to-transparent" />
                
                {/* 🟢 تعديل التموضع ليتناسب مع الموبايل */}
                <div className="absolute inset-0 p-5 md:p-12 flex flex-col justify-end text-right z-10 pb-10 md:pb-12">
                  <span className="bg-[#8a1538] text-white font-bold text-[10px] md:text-xs px-3 py-1 md:px-4 md:py-1.5 rounded-md w-fit mb-3">
                    {mainNews.category}
                  </span>
                  <h2 className="text-2xl md:text-4xl lg:text-3xl font-black text-white leading-tight mb-2 md:mb-4 drop-shadow-md">
                    {mainNews.title}
                  </h2>
                  <p className="text-white/80 font-medium text-xs md:text-base line-clamp-2 max-w-2xl mb-4">
                    {mainNews.desc}
                  </p>
                  <div className="flex items-center gap-1.5 text-[#C08F2D] font-bold text-xs md:text-sm">
                    {mainNews.type === 'video' && <Play className="w-3 h-3 md:w-4 md:h-4" />}
                    <span>اقرأ التفاصيل</span>
                    <ArrowUpLeft className="w-3 h-3 md:w-4 md:h-4" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* الأزرار والمؤشرات */}
            <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-1.5 md:p-2 rounded-full backdrop-blur-md">
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-1.5 md:p-2 rounded-full backdrop-blur-md">
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            <div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
              {heroSliderNews.map((_, index) => (
                <button key={index} onClick={(e) => { e.stopPropagation(); setCurrentSlide(index); }} className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === index ? 'w-5 md:w-8 bg-white' : 'w-1.5 md:w-2 bg-white/50'}`} />
              ))}
            </div>
          </motion.div>

          {/* 🟢 الموبايل: سحب أفقي للأخبار الجانبية بدل القائمة العمودية المزعجة */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:w-1/3 mt-6 md:mt-0 px-4 md:px-0">
            <div className="bg-gray-50 rounded-2xl md:rounded-3xl p-5 md:p-8 h-full border border-gray-100 flex flex-col">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-8">
                <div className="w-1.5 h-5 md:w-2 md:h-8 bg-[#C08F2D] rounded-full" />
                <h3 className="text-lg md:text-2xl font-black text-[#1a1c1d]">أبرز التحديثات</h3>
              </div>

              {/* 🟢 Swiper للموبايل / Grid للكمبيوتر */}
              <div className="flex overflow-x-auto md:flex-col snap-x snap-mandatory gap-3 md:gap-6 flex-grow pb-4 md:pb-0 scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0">
                {sideNews.map((news) => (
                  <div key={news.id} onClick={() => onNewsClick(news)} className="group cursor-pointer bg-white md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none border md:border-b border-gray-100 md:border-gray-200 md:pb-6 last:border-0 min-w-[240px] md:min-w-0 snap-center shrink-0 text-right shadow-sm md:shadow-none">
                    <span className="flex items-center gap-1.5 text-gray-400 font-bold text-[10px] md:text-[11px] mb-1.5">
                      <Clock className="w-3 h-3" />
                      {news.date}
                    </span>
                    <h4 className="font-black text-[#1a1c1d] group-hover:text-[#8a1538] transition-colors leading-snug line-clamp-2 text-[13px] md:text-lg">
                      {news.title}
                    </h4>
                  </div>
                ))}
              </div>

              <button className="w-full mt-2 md:mt-6 py-3 rounded-xl bg-white border border-gray-200 text-[#1a1c1d] font-bold text-xs md:text-sm hover:border-[#8a1538] transition-colors">
                عرض النشرة الإخبارية
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}