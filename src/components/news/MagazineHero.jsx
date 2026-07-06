// src/components/news/MagazineHero.jsx

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  ArrowUpLeft,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

import { heroSliderNews, newsList } from '../../data/newsData';

export default function MagazineHero({ onNewsClick }) {

  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef(null);

  const mainNews = heroSliderNews[currentSlide];
  const sideNews = newsList.slice(0, 3);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSliderNews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? heroSliderNews.length - 1 : prev - 1
    );
  };

  // 🟢 Auto Slide Logic
  useEffect(() => {
    const currentItem = heroSliderNews[currentSlide];

    // الصور -> بعد 5 ثواني
    if (currentItem.type === 'image') {
      const timer = setTimeout(() => {
        nextSlide();
      }, 5000);

      return () => clearTimeout(timer);
    }

  }, [currentSlide]);

  return (
    <div className="pt-32 pb-16 bg-[#fcfcfc] border-b border-gray-100">
      <div className="max-w-[1450px] mx-auto px-4 md:px-8">

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 h-auto lg:h-[600px]">

          {/* 🟢 Hero Slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => onNewsClick(mainNews)}
            className="lg:w-2/3 relative rounded-3xl overflow-hidden shadow-xl group cursor-pointer h-[400px] lg:h-full"
          >

            <AnimatePresence mode="wait">

              <motion.div
                key={mainNews.id}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >

                {mainNews.type === 'video' ? (
                <video
                    ref={videoRef}
                    src={mainNews.mediaUrl}
                    autoPlay
                    muted
                    playsInline
                    onEnded={nextSlide}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                ) : (
                  <img
                    src={mainNews.mediaUrl}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0409]/90 via-[#1a0409]/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-right z-10">

                  <span className="bg-[#8a1538] text-white font-bold text-xs px-4 py-1.5 rounded-md w-fit mb-4">
                    {mainNews.category}
                  </span>

                  <h2 className="text-3xl md:text-4xl lg:text-3xl font-black text-white leading-tight mb-4 drop-shadow-md">
                    {mainNews.title}
                  </h2>

                  <p className="text-white/80 font-medium text-sm md:text-base line-clamp-2 max-w-2xl mb-6">
                    {mainNews.desc}
                  </p>

                  <div className="flex items-center gap-2 text-[#C08F2D] font-bold text-sm">

                    {mainNews.type === 'video' && (
                      <Play className="w-4 h-4" />
                    )}

                    <span>اقرأ التفاصيل</span>

                    <ArrowUpLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />

                  </div>
                </div>
              </motion.div>

            </AnimatePresence>

            {/* 🟢 Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* 🟢 Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* 🟢 Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">

              {heroSliderNews.map((_, index) => (

                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? 'w-8 bg-white'
                      : 'w-2 bg-white/50'
                  }`}
                />

              ))}

            </div>

          </motion.div>

          {/* 🟢 Side News */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/3 flex flex-col gap-4"
          >

            <div className="bg-gray-50 rounded-3xl p-8 h-full border border-gray-100 flex flex-col">

              <div className="flex items-center gap-3 mb-8">

                <div className="w-2 h-8 bg-[#C08F2D] rounded-full" />

                <h3 className="text-2xl font-black text-[#1a1c1d]">
                  أبرز التحديثات
                </h3>

              </div>

              <div className="flex flex-col gap-6 flex-grow justify-between">

                {sideNews.map((news) => (

                  <div
                    key={news.id}
                    onClick={() => onNewsClick(news)}
                    className="group cursor-pointer border-b border-gray-200 pb-6 last:border-0 last:pb-0 text-right"
                  >

                    <span className="flex items-center gap-1.5 text-gray-400 font-bold text-[11px] mb-2">

                      <Clock className="w-3.5 h-3.5" />

                      {news.date}

                    </span>

                    <h4 className="font-black text-[#1a1c1d] group-hover:text-[#8a1538] transition-colors leading-snug line-clamp-2 text-base md:text-lg">
                      {news.title}
                    </h4>

                  </div>

                ))}

              </div>

              <button className="w-full mt-6 py-4 rounded-xl bg-white border border-gray-200 text-[#1a1c1d] font-bold text-sm hover:border-[#8a1538] hover:text-[#8a1538] transition-colors">

                عرض النشرة الإخبارية

              </button>

            </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}

