// src/pages/NewsPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Share2, ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import EditorialNewsGrid from '../components/news/EditorialNewsGrid';
import MagazineHero from '../components/news/MagazineHero';
import VisualPulse from '../components/news/VisualPulse';
import Footer from '../components/Footer';
import { pulseImages } from '../data/newsData'; // 🟢 نحتاجها للتقليب

export default function NewsPage({ onNavigate }) {
  const [selectedNews, setSelectedNews] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // 🟢 دوال التقليب بالمعرض
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
        {/* نمرر الـ Index مش الصورة نفسها */}
        <VisualPulse onImageClick={(idx) => setSelectedImageIndex(idx)} />
      </div>

      <Footer onNavigate={onNavigate} />

      {/* ========================================= */}
      {/* 1. نافذة قراءة الخبر (نفسها بدون تعديل) */}
      {/* ========================================= */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedNews(null)}
              className="absolute inset-0 bg-[#1a0409]/80 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] z-10"
            >
              <button 
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 left-4 z-20 w-10 h-10 bg-white/20 backdrop-blur-md hover:bg-white text-gray-800 rounded-full flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-64 md:h-80 shrink-0">
                <img src={selectedNews.image} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 right-6 left-6 text-right">
                  <span className="inline-block px-3 py-1 bg-[#C08F2D] text-white font-bold text-xs rounded-md mb-3">
                    {selectedNews.category}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-black text-white leading-tight drop-shadow-md">
                    {selectedNews.title}
                  </h2>
                </div>
              </div>

              <div className="p-6 md:p-10 overflow-y-auto flex-grow text-right bg-[#fdfdfd]">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                  <span className="flex items-center gap-2 text-gray-500 font-bold text-sm">
                    <Calendar className="w-4 h-4 text-[#C08F2D]" /> {selectedNews.date}
                  </span>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-[#8a1538] transition-colors font-bold text-sm">
                    مشاركة <Share2 className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="text-gray-600 font-medium text-base md:text-lg leading-[2.2] text-justify">
                  {selectedNews.desc}
                  <br/><br/>
                  (هذا النص للعرض فقط. هنا يتم عرض التفاصيل الكاملة للخبر، بما في ذلك التصريحات الرسمية، أهداف المبادرة، وكيفية تفاعل الشباب مع هذه الفرصة. نسعى في مؤسسة ولي العهد لتقديم الدعم المستمر وتهيئة البيئة المناسبة للابتكار.)
                </p>

                <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
                  <button onClick={() => setSelectedNews(null)} className="flex items-center gap-2 bg-[#8a1538] text-white px-8 py-3 rounded-xl font-black hover:bg-[#6a0f28] transition-colors cursor-pointer">
                    إغلاق <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================= */}
      {/* 🟢 2. المعرض السينمائي (مع ميزة التقليب) */}
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
              className="absolute top-6 left-6 z-20 w-12 h-12 bg-white/10 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* 🟢 أزرار التقليب يمين ويسار */}
            <button 
              onClick={handleNextImage}
              className="absolute right-4 md:right-10 z-20 w-12 h-12 bg-white/10 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            <button 
              onClick={handlePrevImage}
              className="absolute left-4 md:left-10 z-20 w-12 h-12 bg-white/10 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <motion.div 
              key={selectedImageIndex} // Key مهم عشان الأنيميشن يشتغل بين الصور
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 w-full max-w-6xl max-h-[85vh] p-4 flex flex-col items-center justify-center pointer-events-none"
            >
              <img 
                src={pulseImages[selectedImageIndex].url} 
                alt={pulseImages[selectedImageIndex].title} 
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl pointer-events-auto select-none" 
              />
              <div className="mt-6 text-center">
                <h3 className="text-white font-black text-2xl drop-shadow-lg">{pulseImages[selectedImageIndex].title}</h3>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-[#C08F2D] font-bold text-sm">مؤسسة ولي العهد</span>
                  <span className="text-white/40 text-xs">({selectedImageIndex + 1} / {pulseImages.length})</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}