// src/pages/NewsPage.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, ChevronRight, ChevronLeft, CalendarDays, ArrowLeft } from 'lucide-react';
import EditorialNewsGrid from '../components/news/EditorialNewsGrid';
import MagazineHero from '../components/news/MagazineHero';
import VisualPulse from '../components/news/VisualPulse';
// 🟢 استيراد المكون الجديد
import YouthContributions from '../components/news/YouthContributions';
import Footer from '../components/Footer';
import ErrorBoundary from '../components/ErrorBoundary';
import useEscapeKey from '../hooks/useEscapeKey';
import { pulseImages } from '../data/newsData';

export default function NewsPage({ onNavigate }) {
  const [selectedNews, setSelectedNews] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEscapeKey(() => setSelectedNews(null), !!selectedNews);
  useEscapeKey(() => setSelectedImageIndex(null), selectedImageIndex !== null);

  const handleNextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % pulseImages.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === 0 ? pulseImages.length - 1 : prev - 1));
  };

  return (
    <ErrorBoundary>
    <div className="min-h-screen bg-[#fcfcfc] text-[#4c4c4c] font-sans flex flex-col selection:bg-[#C08F2D] selection:text-white" dir="rtl">
      <h1 className="sr-only">أخبار وفرص مؤسسة ولي العهد</h1>

      <MagazineHero onNewsClick={(news) => setSelectedNews(news)} />
      
      <div className="flex-grow">
        <EditorialNewsGrid onNewsClick={(news) => setSelectedNews(news)} />
        
        {/* 🟢 قسم مشاركات شبابنا (تم إضافته هنا فوق عدسة الميدان) */}
        <YouthContributions />

        <VisualPulse onImageClick={(idx) => setSelectedImageIndex(idx)} />
      </div>

      <Footer onNavigate={onNavigate} />

      {/* ========================================= */}
      {/* 1. نافذة قراءة الخبر السريعة (Modal) */}
      {/* ========================================= */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 md:p-[clamp(1.5rem,3vw,3rem)] bg-black/80 backdrop-blur-sm">
            {/* خلفية قابلة للنقر للإغلاق */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedNews(null)}
              className="absolute inset-0 cursor-pointer"
            />
            
            <motion.div 
              initial={{ y: window.innerWidth < 768 ? '100%' : 20, opacity: window.innerWidth < 768 ? 1 : 0, scale: window.innerWidth < 768 ? 1 : 0.95 }} 
              animate={{ y: 0, opacity: 1, scale: 1 }} 
              exit={{ y: window.innerWidth < 768 ? '100%' : 20, opacity: window.innerWidth < 768 ? 1 : 0, scale: window.innerWidth < 768 ? 1 : 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: window.innerWidth < 768 ? 250 : 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white shadow-2xl w-full flex flex-col md:flex-row mt-auto h-[90vh] rounded-t-[2rem] md:h-auto md:max-h-[90vh] max-w-[1100px] md:rounded-[clamp(1.5rem,3vw,2.5rem)] md:mt-0 z-10 overflow-hidden"
            >
              
              {/* زر الإغلاق العائم للموبايل */}
              <button 
                onClick={() => setSelectedNews(null)} 
                className="md:hidden absolute top-4 right-4 w-9 h-9 bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white z-50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex-1 overflow-y-auto flex flex-col md:flex-row scrollbar-hide">
                
                {/* الصورة */}
                <div className="w-full h-[35vh] md:h-auto md:w-2/5 relative shrink-0 bg-gray-100 order-1 md:order-2">
                  <img src={selectedNews.image} alt={selectedNews.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 md:bg-gradient-to-r md:from-black/20" />
                </div>

                {/* المحتوى النصي */}
                <div className="w-full md:w-3/5 p-[clamp(1.5rem,4vw,3.5rem)] flex flex-col order-2 md:order-1 bg-[#fcfcfc]">
                  
                  {/* زر الإغلاق للديسكتوب */}
                  <div className="hidden md:flex justify-end mb-[clamp(1rem,2vw,1.5rem)]">
                    <button onClick={() => setSelectedNews(null)} className="w-[clamp(2rem,3vw,2.5rem)] h-[clamp(2rem,3vw,2.5rem)] bg-gray-100 hover:bg-gray-200 hover:text-[#8a1538] text-gray-500 rounded-full flex items-center justify-center transition-all cursor-pointer">
                      <X className="w-[clamp(1rem,1.5vw,1.25rem)] h-[clamp(1rem,1.5vw,1.25rem)]" />
                    </button>
                  </div>

                  {/* التاريخ */}
                  <div className="flex items-center gap-[clamp(0.35rem,1vw,0.5rem)] mb-[clamp(1rem,2vw,1.5rem)] mt-2 md:mt-0">
                    <div className="inline-flex items-center gap-[clamp(0.25rem,0.5vw,0.35rem)] bg-white shadow-sm border border-gray-100 text-gray-600 px-[clamp(0.75rem,1.5vw,1rem)] py-[clamp(0.35rem,0.8vw,0.5rem)] rounded-lg font-bold text-[clamp(0.7rem,1vw,0.85rem)]">
                      <CalendarDays className="w-[clamp(0.85rem,1.2vw,1rem)] h-[clamp(0.85rem,1.2vw,1rem)] text-[#C08F2D]" />
                      {selectedNews.date}
                    </div>
                  </div>

                  {/* العنوان */}
                  <h2 className="text-[clamp(1.35rem,2.8vw,2.5rem)] font-black text-[#1a1c1d] mb-[clamp(1rem,2vw,1.5rem)] leading-tight tracking-tight">
                    {selectedNews.title}
                  </h2>

                  {/* الوصف */}
                  <div className="flex-grow">
                    <p className="text-gray-600 font-medium text-[clamp(0.875rem,1.2vw,1.1rem)] leading-relaxed md:leading-[2.2] text-justify line-clamp-4 md:line-clamp-5">
                      {selectedNews.desc}
                    </p>
                  </div>
                  
                  {/* أزرار الإجراءات */}
                  <div className="mt-[clamp(1.5rem,3vw,2.5rem)] pt-[clamp(1rem,2vw,1.5rem)] border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-[#8a1538] transition-colors font-bold text-[clamp(0.75rem,1vw,0.9rem)] cursor-pointer order-2 sm:order-1 w-full sm:w-auto justify-center">
                      مشاركة الخبر <Share2 className="w-[clamp(1rem,1.2vw,1.25rem)] h-[clamp(1rem,1.2vw,1.25rem)]" />
                    </button>
                    
                    <button 
                      onClick={() => {
                        setSelectedNews(null);
                        onNavigate('news-article', { newsItem: selectedNews });
                      }} 
                      className="flex items-center justify-center gap-[clamp(0.35rem,0.8vw,0.5rem)] bg-[#8a1538] text-white px-[clamp(1.25rem,3vw,2rem)] py-[clamp(0.6rem,1.2vw,0.875rem)] rounded-xl font-black text-[clamp(0.75rem,1.1vw,1rem)] hover:bg-[#6a0f28] transition-all shadow-md hover:shadow-lg cursor-pointer group order-1 sm:order-2 w-full sm:w-auto"
                    >
                      <span>اقرأ التفاصيل الكاملة</span>
                      <ArrowLeft className="w-[clamp(1rem,1.2vw,1.25rem)] h-[clamp(1rem,1.2vw,1.25rem)] transform group-hover:-translate-x-1 transition-transform" />
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
              className="absolute top-[clamp(1.5rem,3vw,2rem)] left-[clamp(1.5rem,3vw,2rem)] z-20 w-[clamp(2.5rem,4vw,3.5rem)] h-[clamp(2.5rem,4vw,3.5rem)] bg-white/10 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-[clamp(1.25rem,2vw,1.75rem)] h-[clamp(1.25rem,2vw,1.75rem)]" />
            </button>

            <button 
              onClick={handleNextImage}
              className="absolute right-[clamp(1rem,4vw,2.5rem)] z-20 w-[clamp(2.5rem,4vw,3.5rem)] h-[clamp(2.5rem,4vw,3.5rem)] bg-white/10 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-[clamp(1.5rem,2.5vw,2rem)] h-[clamp(1.5rem,2.5vw,2rem)]" />
            </button>
            <button 
              onClick={handlePrevImage}
              className="absolute left-[clamp(1rem,4vw,2.5rem)] z-20 w-[clamp(2.5rem,4vw,3.5rem)] h-[clamp(2.5rem,4vw,3.5rem)] bg-white/10 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-[clamp(1.5rem,2.5vw,2rem)] h-[clamp(1.5rem,2.5vw,2rem)]" />
            </button>

            <motion.div 
              key={selectedImageIndex} 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative z-10 w-full max-w-[90vw] md:max-w-4xl lg:max-w-5xl 2xl:max-w-6xl h-auto flex flex-col items-center justify-center pointer-events-none"
            >
              {/* الصورة المكبرة */}
              <img 
                src={pulseImages[selectedImageIndex].url} 
                alt={pulseImages[selectedImageIndex].title} 
                className="max-w-full max-h-[65vh] md:max-h-[75vh] object-contain rounded-xl shadow-2xl pointer-events-auto select-none" 
              />
              
              {/* تفاصيل الصورة */}
              <div className="mt-[clamp(1rem,2vw,1.5rem)] text-center pointer-events-auto w-full max-w-2xl px-4">
                
                <h3 className="text-white font-black text-[clamp(1.1rem,2vw,1.5rem)] drop-shadow-lg mb-2">
                  {pulseImages[selectedImageIndex].title}
                </h3>
                
                <div className="flex items-center justify-center gap-3 text-white/80 font-bold text-[clamp(0.75rem,1vw,0.9rem)] mb-3">
                  <span className="text-[#C08F2D]">{pulseImages[selectedImageIndex].eventName || 'فعالية ميدانية'}</span>
                  <span className="w-1 h-1 rounded-full bg-white/40"></span>
                  <span>{pulseImages[selectedImageIndex].date || '2026'}</span>
                </div>

                {pulseImages[selectedImageIndex].desc && (
                  <p className="text-white/60 font-medium text-[clamp(0.85rem,1vw,0.95rem)] leading-relaxed mx-auto max-w-xl">
                    {pulseImages[selectedImageIndex].desc}
                  </p>
                )}

                <div className="mt-4 text-white/30 text-xs font-bold tracking-widest">
                  {selectedImageIndex + 1} / {pulseImages.length}
                </div>
                
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
    </ErrorBoundary>
  );
}