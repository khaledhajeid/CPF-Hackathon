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
    // 🟢 زيادة الـ pt (Padding Top) ليبدأ من 7.5rem (120px) لضمان مسافة ممتازة تحت النافبار
    <div className="pt-[clamp(7.5rem,14vh,10rem)] pb-[clamp(2rem,5vh,4rem)] bg-[#fcfcfc] border-b border-gray-100" dir="rtl">
      <div className="max-w-[1400px] xl:max-w-[1150px] 2xl:max-w-[1700px] mx-auto px-[clamp(1rem,4vw,2rem)]">
        
        {/* 🟢 تصغير الارتفاع الكلي على الديسكتوب ليكون أرشق */}
        <div className="flex flex-col lg:flex-row gap-[clamp(1rem,2.5vw,2.5rem)] h-auto lg:h-[clamp(350px,55vh,550px)]">
          
          {/* القسم الأيمن (الخبر الرئيسي) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            onClick={() => onNewsClick(mainNews)}
            // 🟢 تصغير ارتفاع الموبايل إلى 240px (بدل 280) ليكون صغيراً وأنيقاً
            className="lg:w-2/3 relative rounded-[clamp(1rem,3vw,2rem)] overflow-hidden shadow-md md:shadow-xl group cursor-pointer h-[clamp(240px,40vh,400px)] lg:h-full"
          >
            <AnimatePresence mode="wait">
              <motion.div key={mainNews.id} initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0">
                {mainNews.type === 'video' ? (
                  <video ref={videoRef} src={mainNews.mediaUrl} autoPlay muted playsInline onEnded={nextSlide} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <img src={mainNews.mediaUrl} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0409]/95 via-[#1a0409]/40 to-transparent" />
                
                {/* 🟢 تصغير البادينغ الداخلي للكرت الرئيسي */}
                <div className="absolute inset-0 p-[clamp(1rem,3vw,2.5rem)] flex flex-col justify-end text-right z-10 pb-[clamp(1.25rem,4vw,2.5rem)]">
                  <span className="bg-[#8a1538] text-white font-bold text-[clamp(0.5rem,0.9vw,0.75rem)] px-[clamp(0.5rem,1.2vw,0.875rem)] py-[clamp(0.2rem,0.4vw,0.3rem)] rounded-md w-fit mb-[clamp(0.4rem,1vw,0.75rem)]">
                    {mainNews.category}
                  </span>
                  
                  {/* 🟢 تصغير خط العنوان الرئيسي */}
                  <h2 className="text-[clamp(1.1rem,2.5vw,2rem)] font-black text-white leading-tight mb-[clamp(0.4rem,1vw,0.75rem)] drop-shadow-md">
                    {mainNews.title}
                  </h2>
                  
                  {/* 🟢 تصغير خط الوصف */}
                  <p className="text-white/80 font-medium text-[clamp(0.7rem,1vw,0.95rem)] line-clamp-2 max-w-2xl 2xl:max-w-4xl mb-[clamp(0.6rem,1.5vw,1.25rem)] leading-relaxed">
                    {mainNews.desc}
                  </p>
                  
                  <div className="flex items-center gap-[clamp(0.35rem,0.8vw,0.5rem)] text-[#C08F2D] font-bold text-[clamp(0.65rem,0.9vw,0.875rem)]">
                    {mainNews.type === 'video' && <Play className="w-[clamp(0.7rem,1vw,1.1rem)] h-[clamp(0.7rem,1vw,1.1rem)]" />}
                    <span>اقرأ التفاصيل</span>
                    <ArrowUpLeft className="w-[clamp(0.7rem,1vw,1.1rem)] h-[clamp(0.7rem,1vw,1.1rem)]" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} className="absolute left-[clamp(0.5rem,1.5vw,1.5rem)] top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-[clamp(0.35rem,0.8vw,0.6rem)] rounded-full backdrop-blur-md cursor-pointer">
              <ChevronLeft className="w-[clamp(0.75rem,1.2vw,1.25rem)] h-[clamp(0.75rem,1.2vw,1.25rem)]" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} className="absolute right-[clamp(0.5rem,1.5vw,1.5rem)] top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-[clamp(0.35rem,0.8vw,0.6rem)] rounded-full backdrop-blur-md cursor-pointer">
              <ChevronRight className="w-[clamp(0.75rem,1.2vw,1.25rem)] h-[clamp(0.75rem,1.2vw,1.25rem)]" />
            </button>

            <div className="absolute bottom-[clamp(0.5rem,1.5vw,1.5rem)] left-1/2 -translate-x-1/2 flex gap-[clamp(0.2rem,0.8vw,0.4rem)] z-20">
              {heroSliderNews.map((_, index) => (
                <button key={index} onClick={(e) => { e.stopPropagation(); setCurrentSlide(index); }} className={`h-[clamp(0.25rem,0.6vw,0.35rem)] rounded-full transition-all duration-300 ${currentSlide === index ? 'w-[clamp(1rem,2.5vw,2rem)] bg-white' : 'w-[clamp(0.35rem,0.8vw,0.5rem)] bg-white/50'}`} />
              ))}
            </div>
          </motion.div>

          {/* القسم الأيسر (أبرز التحديثات) */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:w-1/3 mt-[clamp(0.25rem,1vw,0.5rem)] md:mt-0">
            {/* 🟢 تصغير حجم الكرت الأيسر */}
            <div className="bg-gray-50 rounded-[clamp(1rem,2.5vw,1.5rem)] p-[clamp(1rem,2.5vw,2rem)] h-full border border-gray-100 flex flex-col shadow-sm md:shadow-none">
              
              <div className="flex items-center gap-[clamp(0.5rem,1vw,0.75rem)] mb-[clamp(1rem,2vw,2rem)] shrink-0">
                <div className="w-[clamp(0.2rem,0.4vw,0.35rem)] h-[clamp(1rem,2vw,1.5rem)] bg-[#C08F2D] rounded-full" />
                <h3 className="text-[clamp(1rem,1.5vw,1.5rem)] font-black text-[#1a1c1d]">أبرز التحديثات</h3>
              </div>

              {/* 🟢 تقليل الفجوات بين التحديثات الجانبية */}
              <div className="flex flex-col justify-center gap-[clamp(0.75rem,2vw,1.5rem)] flex-grow">
                {sideNews.map((news) => (
                  <div 
                    key={news.id} 
                    onClick={() => onNewsClick(news)} 
                    // 🟢 تصغير المساحات للخبر الجانبي الواحد
                    className="group cursor-pointer bg-white md:bg-transparent p-[clamp(0.875rem,2vw,1.25rem)] md:p-0 rounded-[clamp(0.75rem,1.5vw,1.25rem)] md:rounded-none border border-gray-100 md:border-b md:border-x-0 md:border-t-0 md:border-gray-200 md:pb-[clamp(0.75rem,1.5vw,1.5rem)] last:border-0 last:pb-0 text-right shadow-sm md:shadow-none flex flex-col justify-center transition-all hover:shadow-md md:hover:shadow-none"
                  >
                    <span className="flex items-center gap-[clamp(0.25rem,0.4vw,0.35rem)] text-gray-400 font-bold text-[clamp(0.55rem,0.8vw,0.75rem)] mb-[clamp(0.25rem,0.6vw,0.5rem)]">
                      <Clock className="w-[clamp(0.65rem,1vw,0.875rem)] h-[clamp(0.65rem,1vw,0.875rem)]" />
                      {news.date}
                    </span>
                    {/* 🟢 تصغير خط عنوان التحديث الجانبي */}
                    <h4 className="font-black text-[#1a1c1d] group-hover:text-[#8a1538] transition-colors leading-relaxed line-clamp-2 text-[clamp(0.75rem,1.1vw,1.125rem)]">
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