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
    <div className="pt-[clamp(5rem,12vh,8rem)] pb-[clamp(2rem,6vh,4rem)] bg-[#fcfcfc] border-b border-gray-100" dir="rtl">
      {/* 🟢 تطبيق الحاوية المرنة */}
      <div className="max-w-[1450px] xl:max-w-[1150px] 2xl:max-w-[1450px] mx-auto px-0 md:px-[clamp(1rem,4vw,2rem)]">
        <div className="flex flex-col lg:flex-row gap-[clamp(1rem,2vw,2rem)] h-auto lg:h-[clamp(400px,55vh,600px)]">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            onClick={() => onNewsClick(mainNews)}
            className="lg:w-[65%] relative rounded-none md:rounded-[clamp(1rem,3vw,2rem)] overflow-hidden shadow-md md:shadow-xl group cursor-pointer h-[clamp(350px,50vh,450px)] lg:h-full"
          >
            <AnimatePresence mode="wait">
              <motion.div key={mainNews.id} initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0">
                {mainNews.type === 'video' ? (
                  <video ref={videoRef} src={mainNews.mediaUrl} autoPlay muted playsInline onEnded={nextSlide} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <img src={mainNews.mediaUrl} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0409]/95 via-[#1a0409]/40 to-transparent" />
                
                <div className="absolute inset-0 p-[clamp(1.25rem,4vw,3rem)] flex flex-col justify-end text-right z-10 pb-[clamp(2.5rem,6vw,3rem)]">
                  <span className="bg-[#8a1538] text-white font-bold text-[clamp(0.6rem,0.9vw,0.75rem)] px-[clamp(0.5rem,1.5vw,1rem)] py-[clamp(0.2rem,0.5vw,0.35rem)] rounded-md w-fit mb-[clamp(0.5rem,1.5vw,1rem)]">
                    {mainNews.category}
                  </span>
                  <h2 className="text-[clamp(1.25rem,3vw,2.25rem)] font-black text-white leading-tight mb-[clamp(0.5rem,1.5vw,1rem)] drop-shadow-md">
                    {mainNews.title}
                  </h2>
                  <p className="text-white/80 font-medium text-[clamp(0.75rem,1.1vw,1rem)] line-clamp-2 max-w-2xl mb-[clamp(0.75rem,2vw,1rem)]">
                    {mainNews.desc}
                  </p>
                  <div className="flex items-center gap-[clamp(0.25rem,0.8vw,0.5rem)] text-[#C08F2D] font-bold text-[clamp(0.65rem,1vw,0.875rem)]">
                    {mainNews.type === 'video' && <Play className="w-[clamp(0.75rem,1.2vw,1rem)] h-[clamp(0.75rem,1.2vw,1rem)]" />}
                    <span>اقرأ التفاصيل</span>
                    <ArrowUpLeft className="w-[clamp(0.75rem,1.2vw,1rem)] h-[clamp(0.75rem,1.2vw,1rem)]" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* الأزرار والمؤشرات */}
            <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} className="absolute left-[clamp(0.5rem,1.5vw,1rem)] top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-[clamp(0.35rem,1vw,0.5rem)] rounded-full backdrop-blur-md">
              <ChevronLeft className="w-[clamp(1rem,1.5vw,1.25rem)] h-[clamp(1rem,1.5vw,1.25rem)]" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} className="absolute right-[clamp(0.5rem,1.5vw,1rem)] top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-[clamp(0.35rem,1vw,0.5rem)] rounded-full backdrop-blur-md">
              <ChevronRight className="w-[clamp(1rem,1.5vw,1.25rem)] h-[clamp(1rem,1.5vw,1.25rem)]" />
            </button>

            <div className="absolute bottom-[clamp(0.75rem,2vw,1.5rem)] left-1/2 -translate-x-1/2 flex gap-[clamp(0.25rem,0.5vw,0.35rem)] z-20">
              {heroSliderNews.map((_, index) => (
                <button key={index} onClick={(e) => { e.stopPropagation(); setCurrentSlide(index); }} className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === index ? 'w-[clamp(1.25rem,2vw,2rem)] bg-white' : 'w-1.5 md:w-2 bg-white/50'}`} />
              ))}
            </div>
          </motion.div>

          {/* 🟢 الموبايل: تحويل الأخبار لقائمة عمودية فخمة (Vertical Feed) بدل السحب المزعج */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:w-1/3 px-4 md:px-0">
            <div className="bg-gray-50 rounded-[2rem] md:rounded-3xl lg:rounded-3xl xl:rounded-[2rem] p-6 sm:p-8 md:p-10 lg:p-8 xl:p-10 2xl:p-14 h-full border border-gray-100 flex flex-col shadow-sm md:shadow-none">
              
              <div className="flex items-center gap-3 lg:gap-3 xl:gap-4 mb-6 md:mb-8 lg:mb-6 xl:mb-10 2xl:mb-12">
                <div className="w-2 h-6 md:w-2 md:h-8 lg:w-1.5 lg:h-6 xl:w-2 xl:h-8 2xl:w-3 2xl:h-10 bg-[#C08F2D] rounded-full" />
                <h3 className="text-xl md:text-2xl lg:text-xl xl:text-3xl 2xl:text-4xl font-black text-[#1a1c1d]">أبرز التحديثات</h3>
              </div>

              {/* 🟢 الحل الجذري للموبايل: flex-col للجميع، كروت بيضاء عالموبايل وشفافة عالديسكتوب */}
              <div className="flex flex-col gap-4 md:gap-6 lg:gap-5 xl:gap-8 2xl:gap-10 flex-grow">
                {sideNews.map((news) => (
                  <div 
                    key={news.id} 
                    onClick={() => onNewsClick(news)} 
                    className="group cursor-pointer bg-white md:bg-transparent p-5 md:p-0 rounded-2xl md:rounded-none border border-gray-100 md:border-b md:border-x-0 md:border-t-0 md:border-gray-200 md:pb-6 lg:pb-5 xl:pb-8 2xl:pb-10 last:border-0 text-right shadow-sm md:shadow-none flex flex-col justify-center transition-all hover:shadow-md md:hover:shadow-none"
                  >
                    <span className="flex items-center gap-1.5 text-gray-400 font-bold text-[11px] md:text-[12px] lg:text-[11px] xl:text-[13px] 2xl:text-base mb-2 2xl:mb-3">
                      <Clock className="w-3.5 h-3.5 lg:w-3 lg:h-3 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5" />
                      {news.date}
                    </span>
                    <h4 className="font-black text-[#1a1c1d] group-hover:text-[#8a1538] transition-colors leading-relaxed line-clamp-2 text-[14px] sm:text-[15px] md:text-lg lg:text-[14px] xl:text-[1.1rem] 2xl:text-2xl">
                      {news.title}
                    </h4>
                  </div>
                ))}
              </div>

              <button className="w-full mt-[clamp(0.5rem,2vw,1.5rem)] py-[clamp(0.5rem,1.5vw,0.875rem)] rounded-xl bg-white border border-gray-200 text-[#1a1c1d] font-bold text-[clamp(0.75rem,1vw,0.875rem)] hover:border-[#8a1538] transition-colors">
                عرض النشرة الإخبارية
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}