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
    <div className="pt-24 md:pt-32 lg:pt-28 xl:pt-36 2xl:pt-48 pb-12 md:pb-16 lg:pb-16 xl:pb-20 2xl:pb-24 bg-[#fcfcfc] border-b border-gray-100" dir="rtl">
      <div className="max-w-[1400px] xl:max-w-[1500px] 2xl:max-w-[1700px] mx-auto px-4 md:px-8">
        
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-6 xl:gap-8 2xl:gap-12 h-auto lg:h-[450px] xl:h-[550px] 2xl:h-[650px]">
          
          {/* 🟢 القسم الأيمن (الخبر الرئيسي) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            onClick={() => onNewsClick(mainNews)}
            className="lg:w-2/3 relative rounded-2xl md:rounded-3xl xl:rounded-[2rem] overflow-hidden shadow-md md:shadow-xl group cursor-pointer h-[350px] sm:h-[450px] lg:h-full"
          >
            <AnimatePresence mode="wait">
              <motion.div key={mainNews.id} initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0">
                {mainNews.type === 'video' ? (
                  <video ref={videoRef} src={mainNews.mediaUrl} autoPlay muted playsInline onEnded={nextSlide} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <img src={mainNews.mediaUrl} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0409]/95 via-[#1a0409]/40 to-transparent" />
                
                <div className="absolute inset-0 p-6 md:p-10 lg:p-8 xl:p-12 2xl:p-16 flex flex-col justify-end text-right z-10 pb-10 md:pb-12 lg:pb-10 xl:pb-12 2xl:pb-16">
                  <span className="bg-[#8a1538] text-white font-bold text-[10px] md:text-xs lg:text-[11px] xl:text-xs 2xl:text-sm px-3 py-1 md:px-4 md:py-1.5 rounded-md w-fit mb-3 xl:mb-4">
                    {mainNews.category}
                  </span>
                  
                  <h2 className="text-2xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-black text-white leading-tight mb-3 lg:mb-2 xl:mb-4 drop-shadow-md">
                    {mainNews.title}
                  </h2>
                  
                  <p className="text-white/80 font-medium text-xs md:text-sm lg:text-[13px] xl:text-base 2xl:text-lg line-clamp-2 max-w-2xl 2xl:max-w-4xl mb-4 lg:mb-3 xl:mb-5 2xl:mb-6 leading-relaxed">
                    {mainNews.desc}
                  </p>
                  
                  <div className="flex items-center gap-1.5 text-[#C08F2D] font-bold text-xs md:text-sm lg:text-[13px] xl:text-sm 2xl:text-base">
                    {mainNews.type === 'video' && <Play className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5" />}
                    <span>اقرأ التفاصيل</span>
                    <ArrowUpLeft className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} className="absolute left-4 lg:left-5 xl:left-6 2xl:left-8 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-2 lg:p-2 xl:p-2.5 2xl:p-3 rounded-full backdrop-blur-md cursor-pointer">
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} className="absolute right-4 lg:right-5 xl:right-6 2xl:right-8 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-2 lg:p-2 xl:p-2.5 2xl:p-3 rounded-full backdrop-blur-md cursor-pointer">
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6" />
            </button>

            <div className="absolute bottom-4 md:bottom-6 lg:bottom-5 xl:bottom-6 2xl:bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
              {heroSliderNews.map((_, index) => (
                <button key={index} onClick={(e) => { e.stopPropagation(); setCurrentSlide(index); }} className={`h-1.5 lg:h-1.5 xl:h-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'w-6 md:w-8 lg:w-6 xl:w-8 2xl:w-10 bg-white' : 'w-2 lg:w-1.5 xl:w-2 bg-white/50'}`} />
              ))}
            </div>
          </motion.div>

          {/* 🟢 القسم الأيسر (أبرز التحديثات) بعد إزالة الزر */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:w-1/3 mt-2 md:mt-0">
            {/* 🟢 زدنا البادينج الداخلي (p-6 => p-8 مثلاً) لتعويض غياب الزر ولإضافة فخامة للكرت */}
            <div className="bg-gray-50 rounded-2xl md:rounded-3xl xl:rounded-[2rem] p-6 md:p-8 lg:p-8 xl:p-10 2xl:p-12 h-full border border-gray-100 flex flex-col shadow-sm md:shadow-none">
              
              <div className="flex items-center gap-3 lg:gap-3 xl:gap-4 mb-6 md:mb-8 lg:mb-8 xl:mb-10 2xl:mb-12 shrink-0">
                <div className="w-1.5 md:w-2 h-6 md:h-8 lg:w-1.5 lg:h-6 xl:w-2 xl:h-8 bg-[#C08F2D] rounded-full" />
                <h3 className="text-xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl font-black text-[#1a1c1d]">أبرز التحديثات</h3>
              </div>

              {/* 🟢 إضافة justify-center لتوسيط الأخبار عمودياً وترك مساحة بيضاء متساوية فوق وتحت */}
              <div className="flex flex-col justify-center gap-4 md:gap-5 lg:gap-5 xl:gap-8 2xl:gap-10 flex-grow">
                {sideNews.map((news) => (
                  <div 
                    key={news.id} 
                    onClick={() => onNewsClick(news)} 
                    // 🟢 إضافة last:pb-0 عشان الخبر الأخير ما يكون تحته فراغ يخرّب التوسيط العمودي
                    className="group cursor-pointer bg-white md:bg-transparent p-5 md:p-0 rounded-2xl md:rounded-none border border-gray-100 md:border-b md:border-x-0 md:border-t-0 md:border-gray-200 md:pb-5 lg:pb-5 xl:pb-8 2xl:pb-10 last:border-0 last:pb-0 text-right shadow-sm md:shadow-none flex flex-col justify-center transition-all hover:shadow-md md:hover:shadow-none"
                  >
                    <span className="flex items-center gap-1.5 text-gray-400 font-bold text-[11px] md:text-xs lg:text-[11px] xl:text-xs 2xl:text-sm mb-2 md:mb-2.5">
                      <Clock className="w-3.5 h-3.5 lg:w-3 lg:h-3 xl:w-4 xl:h-4" />
                      {news.date}
                    </span>
                    <h4 className="font-black text-[#1a1c1d] group-hover:text-[#8a1538] transition-colors leading-relaxed line-clamp-2 text-[14px] md:text-[16px] lg:text-[14px] xl:text-[1.1rem] 2xl:text-2xl">
                      {news.title}
                    </h4>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}