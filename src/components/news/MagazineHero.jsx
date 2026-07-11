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
    // 🟢 زيادة الـ White Space العلوية والسفلية بشكل متدرج
    <div className="pt-24 md:pt-32 lg:pt-28 xl:pt-36 2xl:pt-48 pb-12 md:pb-16 lg:pb-16 xl:pb-20 2xl:pb-28 bg-[#fcfcfc] border-b border-gray-100">
      <div className="max-w-[1450px] 2xl:max-w-[1700px] mx-auto px-0 md:px-8">
        
        {/* 🟢 تدرج المساحة (gap) بين الخبر الرئيسي والأخبار الجانبية */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-8 xl:gap-12 2xl:gap-16 h-auto lg:h-[480px] xl:h-[600px] 2xl:h-[700px]">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            onClick={() => onNewsClick(mainNews)}
            className="lg:w-2/3 relative rounded-none md:rounded-3xl lg:rounded-3xl xl:rounded-[2rem] overflow-hidden shadow-md md:shadow-xl group cursor-pointer h-[450px] sm:h-[500px] lg:h-full"
          >
            <AnimatePresence mode="wait">
              <motion.div key={mainNews.id} initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0">
                {mainNews.type === 'video' ? (
                  <video ref={videoRef} src={mainNews.mediaUrl} autoPlay muted playsInline onEnded={nextSlide} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <img src={mainNews.mediaUrl} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0409]/95 via-[#1a0409]/40 to-transparent" />
                
                {/* 🟢 بادينج داخلي يعطي News Card مساحة للتنفس */}
                <div className="absolute inset-0 p-6 sm:p-8 md:p-10 lg:p-10 xl:p-14 2xl:p-20 flex flex-col justify-end text-right z-10 pb-12 sm:pb-14 md:pb-12 lg:pb-10 xl:pb-14 2xl:pb-20">
                  <span className="bg-[#8a1538] text-white font-bold text-[10px] sm:text-[11px] lg:text-[11px] xl:text-[13px] 2xl:text-base px-3 py-1.5 md:px-4 md:py-2 lg:px-3 lg:py-1.5 xl:px-4 xl:py-2 rounded-md w-fit mb-3 lg:mb-3 xl:mb-4 2xl:mb-6 shadow-sm">
                    {mainNews.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-black text-white leading-tight mb-3 md:mb-4 lg:mb-3 xl:mb-5 2xl:mb-6 drop-shadow-md">
                    {mainNews.title}
                  </h2>
                  <p className="text-white/80 font-medium text-[13px] sm:text-sm md:text-base lg:text-[13px] xl:text-[15px] 2xl:text-xl line-clamp-2 max-w-2xl 2xl:max-w-4xl mb-4 lg:mb-4 xl:mb-6 2xl:mb-8 leading-relaxed">
                    {mainNews.desc}
                  </p>
                  <div className="flex items-center gap-1.5 text-[#C08F2D] font-bold text-xs sm:text-[13px] lg:text-[13px] xl:text-sm 2xl:text-lg">
                    {mainNews.type === 'video' && <Play className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 2xl:w-6 2xl:h-6" />}
                    <span>اقرأ التفاصيل</span>
                    <ArrowUpLeft className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 2xl:w-6 2xl:h-6" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* الأزرار الجانبية */}
            <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} className="absolute left-4 md:left-6 lg:left-5 xl:left-8 2xl:left-12 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-2 lg:p-2 xl:p-3 2xl:p-4 rounded-full backdrop-blur-md cursor-pointer">
              <ChevronLeft className="w-5 h-5 lg:w-4 lg:h-4 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} className="absolute right-4 md:right-6 lg:right-5 xl:right-8 2xl:right-12 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-2 lg:p-2 xl:p-3 2xl:p-4 rounded-full backdrop-blur-md cursor-pointer">
              <ChevronRight className="w-5 h-5 lg:w-4 lg:h-4 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8" />
            </button>

            <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-5 xl:bottom-8 2xl:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {heroSliderNews.map((_, index) => (
                <button key={index} onClick={(e) => { e.stopPropagation(); setCurrentSlide(index); }} className={`h-1.5 sm:h-2 lg:h-1.5 xl:h-2 2xl:h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'w-6 sm:w-8 lg:w-6 xl:w-10 2xl:w-14 bg-white' : 'w-2 sm:w-2.5 lg:w-2 xl:w-2.5 2xl:w-3 bg-white/50'}`} />
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

              <button className="w-full mt-6 md:mt-8 lg:mt-6 xl:mt-10 2xl:mt-12 py-3.5 sm:py-4 lg:py-3 xl:py-4 2xl:py-6 rounded-xl bg-white border border-gray-200 text-[#1a1c1d] font-bold text-[13px] md:text-sm lg:text-[13px] xl:text-base 2xl:text-xl hover:border-[#8a1538] hover:text-[#8a1538] shadow-sm hover:shadow-md transition-all cursor-pointer">
                عرض النشرة الإخبارية
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}