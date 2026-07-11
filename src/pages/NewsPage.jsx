// src/pages/NewsPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Share2, ArrowRight, ChevronRight, ChevronLeft, CalendarDays, Tag } from 'lucide-react';
import EditorialNewsGrid from '../components/news/EditorialNewsGrid';
import MagazineHero from '../components/news/MagazineHero';
import VisualPulse from '../components/news/VisualPulse';
import Footer from '../components/Footer';
import { pulseImages } from '../data/newsData'; 

export default function NewsPage({ onNavigate }) {
  const [selectedNews, setSelectedNews] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleNextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % pulseImages.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === 0 ? pulseImages.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#4c4c4c] font-sans flex flex-col selection:bg-[#C08F2D] selection:text-white" dir="rtl">
      
      <MagazineHero onNewsClick={(news) => setSelectedNews(news)} />
      
      <div className="flex-grow">
        <EditorialNewsGrid onNewsClick={(news) => setSelectedNews(news)} />
        <VisualPulse onImageClick={(idx) => setSelectedImageIndex(idx)} />
      </div>

      <Footer onNavigate={onNavigate} />

      {/* ========================================= */}
      {/* 1. نافذة قراءة الخبر (محدثة للموبايل ولشاشات الـ 13 إنش) */}
      {/* ========================================= */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 md:p-6 lg:p-12 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedNews(null)}
              className="absolute inset-0 cursor-pointer"
            />
            
            <motion.div 
              initial={{ y: window.innerWidth < 768 ? '100%' : 20, opacity: window.innerWidth < 768 ? 1 : 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: window.innerWidth < 768 ? '100%' : 20, opacity: window.innerWidth < 768 ? 1 : 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: window.innerWidth < 768 ? 250 : 300 }}
              onClick={(e) => e.stopPropagation()}
              // 🟢 تدرج عرض المودال (ساندويش)
              className="relative bg-white shadow-2xl w-full flex flex-col md:flex-row mt-auto h-[90vh] rounded-t-3xl md:h-auto md:max-h-[90vh] lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl md:rounded-[2rem] md:mt-0 z-10"
            >
              {/* 🟢 رأس المودال للموبايل */}
              <div className="md:hidden w-full flex justify-between items-center p-4 bg-white shrink-0 border-b border-gray-100 rounded-t-3xl z-20">
                <h3 className="font-bold text-gray-900 text-[13px] pr-2">تفاصيل الخبر</h3>
                <button onClick={() => setSelectedNews(null)} className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto flex flex-col md:flex-row scrollbar-hide">
                
                {/* 🟢 الصورة (ترتيبها 1 للموبايل لتظهر بالأعلى، وترتيبها 2 للديسكتوب) */}
                <div className="w-full h-56 sm:h-64 md:h-auto md:w-2/5 relative shrink-0 bg-gray-100 order-1 md:order-2">
                  <img src={selectedNews.image} alt={selectedNews.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50" />
                </div>

                {/* 🟢 المحتوى النصي (ترتيب 2 للموبايل، وترتيب 1 للديسكتوب) */}
                <div className="w-full md:w-3/5 p-5 md:p-8 lg:p-8 xl:p-10 2xl:p-12 flex flex-col order-2 md:order-1">
                  <button onClick={() => setSelectedNews(null)} className="hidden md:flex absolute top-6 right-6 md:relative md:top-0 md:right-0 md:self-end w-10 h-10 lg:w-8 lg:h-8 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 bg-gray-100 hover:bg-gray-200 rounded-full items-center justify-center transition-colors mb-4 lg:mb-4 xl:mb-6 text-gray-500 z-10 cursor-pointer shrink-0">
                    <X className="w-5 h-5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6" />
                  </button>

                  <div className="flex flex-wrap items-center gap-3 mb-4 lg:mb-4 xl:mb-6 mt-2 md:mt-0">
                    <div className="inline-flex items-center gap-1.5 bg-[#8a1538]/10 text-[#8a1538] px-3 py-1.5 lg:px-2 lg:py-1 xl:px-3 xl:py-1.5 2xl:px-4 2xl:py-2 rounded-lg font-bold text-[11px] lg:text-[10px] xl:text-xs 2xl:text-sm">
                      <Tag className="w-3.5 h-3.5 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5 2xl:w-4 2xl:h-4" />
                      {selectedNews.category}
                    </div>
                    <div className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-600 px-3 py-1.5 lg:px-2 lg:py-1 xl:px-3 xl:py-1.5 2xl:px-4 2xl:py-2 rounded-lg font-bold text-[11px] lg:text-[10px] xl:text-xs 2xl:text-sm border border-gray-100">
                      <CalendarDays className="w-3.5 h-3.5 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5 2xl:w-4 2xl:h-4 text-[#C08F2D]" />
                      {selectedNews.date}
                    </div>
                  </div>

                  <h2 className="text-xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-black text-gray-900 mb-4 lg:mb-4 xl:mb-6 leading-snug md:leading-tight">
                    {selectedNews.title}
                  </h2>

                  <div className="flex-grow">
                    <p className="text-gray-700 text-[13.5px] md:text-base lg:text-[13px] xl:text-base 2xl:text-lg leading-relaxed md:leading-[2.1rem] lg:leading-[1.9rem] xl:leading-[2.1rem] 2xl:leading-[2.4rem] text-justify font-medium">
                      {selectedNews.desc}
                      <br/><br/>
                      (هذا النص للعرض فقط. هنا يتم عرض التفاصيل الكاملة للخبر، بما في ذلك التصريحات الرسمية، أهداف المبادرة، وكيفية تفاعل الشباب مع هذه الفرصة. نسعى في مؤسسة ولي العهد لتقديم الدعم المستمر وتهيئة البيئة المناسبة للابتكار.)
                    </p>
                  </div>
                  
                  <div className="mt-6 lg:mt-6 xl:mt-8 pt-4 lg:pt-4 xl:pt-6 border-t border-gray-100 flex justify-between items-center">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-[#8a1538] transition-colors font-bold text-xs lg:text-[11px] xl:text-sm 2xl:text-base cursor-pointer">
                      مشاركة <Share2 className="w-4 h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5" />
                    </button>
                    <button onClick={() => setSelectedNews(null)} className="flex items-center gap-2 bg-[#8a1538] text-white px-6 py-2.5 lg:px-5 lg:py-2 xl:px-6 xl:py-2.5 2xl:px-8 2xl:py-3.5 rounded-xl font-black text-xs lg:text-[11px] xl:text-sm 2xl:text-base hover:bg-[#6a0f28] transition-colors cursor-pointer">
                      إغلاق <ArrowRight className="w-4 h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5" />
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================= */}
      {/* 2. المعرض السينمائي (مع ميزة التقليب) */}
      {/* ========================================= */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedImageIndex(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl cursor-pointer"
            />
            
            <button 
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-6 left-6 z-20 w-10 h-10 lg:w-10 lg:h-10 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 bg-white/10 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8" />
            </button>

            <button 
              onClick={handleNextImage}
              className="absolute right-4 md:right-10 z-20 w-10 h-10 lg:w-10 lg:h-10 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 bg-white/10 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 lg:w-6 lg:h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10" />
            </button>
            <button 
              onClick={handlePrevImage}
              className="absolute left-4 md:left-10 z-20 w-10 h-10 lg:w-10 lg:h-10 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 bg-white/10 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 lg:w-6 lg:h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10" />
            </button>

            <motion.div 
              key={selectedImageIndex} 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 w-full max-w-4xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl max-h-[85vh] p-4 flex flex-col items-center justify-center pointer-events-none"
            >
              <img 
                src={pulseImages[selectedImageIndex].url} 
                alt={pulseImages[selectedImageIndex].title} 
                className="max-w-full max-h-[75vh] lg:max-h-[65vh] xl:max-h-[75vh] 2xl:max-h-[80vh] object-contain rounded-xl shadow-2xl pointer-events-auto select-none" 
              />
              <div className="mt-4 lg:mt-4 xl:mt-6 text-center">
                <h3 className="text-white font-black text-xl lg:text-xl xl:text-2xl 2xl:text-4xl drop-shadow-lg">{pulseImages[selectedImageIndex].title}</h3>
                <div className="flex items-center justify-center gap-2 mt-1 xl:mt-2">
                  <span className="text-[#C08F2D] font-bold text-xs lg:text-xs xl:text-sm 2xl:text-base">مؤسسة ولي العهد</span>
                  <span className="text-white/40 text-[10px] lg:text-[10px] xl:text-xs 2xl:text-sm">({selectedImageIndex + 1} / {pulseImages.length})</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}