// src/components/news/VisualPulse.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { pulseImages } from '../../data/newsData';

export default function VisualPulse({ onImageClick }) {
  return (
    <div className="bg-[#fff9fa] py-16 sm:py-20 md:py-32 lg:py-24 xl:py-32 2xl:py-40 border-t border-gray-100 overflow-hidden">
      <div className="max-w-[1400px] 2xl:max-w-[1700px] mx-auto px-0 md:px-8">
        
        <div className="flex flex-col items-center justify-center text-center mb-10 sm:mb-12 md:mb-16 lg:mb-14 xl:mb-20 2xl:mb-24 px-4 md:px-0">
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-3 xl:gap-4 2xl:gap-5 mb-3 sm:mb-4 lg:mb-4 xl:mb-5 2xl:mb-8">
            <img src="/arrow-yellow.svg" className="w-6 h-6 sm:w-8 sm:h-8 lg:w-7 lg:h-7 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 object-contain transform rotate-180" alt="" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black text-[#1a1c1d] tracking-tight">عدسة الميدان</h2>
            <img src="/arrow-yellow.svg" className="w-6 h-6 sm:w-8 sm:h-8 lg:w-7 lg:h-7 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 object-contain" alt="" />
          </div>
          <p className="text-gray-500 font-medium text-[13px] sm:text-sm md:text-base lg:text-[15px] xl:text-lg 2xl:text-xl max-w-2xl xl:max-w-3xl 2xl:max-w-4xl leading-relaxed">
            لقطات حية توثّق شغف وإنجازات الشباب الأردني في شتى برامجنا ومبادراتنا، لأن الصورة أبلغ من ألف كلمة.
          </p>
        </div>

        {/* 🟢 إضافة px-4 عالموبايل للمسافات الجانبية، مع تدرج المساحات والفجوات */}
        <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-4 md:grid-rows-[auto] gap-4 sm:gap-5 md:gap-5 lg:gap-5 xl:gap-6 2xl:gap-8 pb-6 md:pb-0 scrollbar-hide px-4 md:px-0">
          {pulseImages.map((img, idx) => {
            let gridSpan = 'md:col-span-1 md:row-span-1 h-[280px] sm:h-[320px] md:h-64 lg:h-56 xl:h-72 2xl:h-80';
            if (img.type === 'featured') gridSpan = 'md:col-span-2 md:row-span-2 h-[280px] sm:h-[320px] md:h-full';
            if (img.type === 'tall') gridSpan = 'md:col-span-1 md:row-span-2 h-[280px] sm:h-[320px] md:h-[calc(32rem+1.25rem)] lg:h-[calc(28rem+1.25rem)] xl:h-[calc(36rem+1.5rem)] 2xl:h-[calc(40rem+2rem)]';

            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                key={img.id}
                onClick={() => onImageClick(idx)} 
                className={`relative rounded-3xl lg:rounded-[1.5rem] xl:rounded-[2rem] 2xl:rounded-[2.5rem] overflow-hidden group shadow-sm hover:shadow-xl transition-all cursor-pointer bg-gray-200 border border-gray-200/50 
                  w-[240px] sm:w-[280px] aspect-[3/4] md:aspect-auto md:w-auto shrink-0 snap-center ${gridSpan}`}
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent md:opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute inset-0 md:bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="hidden md:flex w-12 h-12 lg:w-10 lg:h-10 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 bg-white/20 backdrop-blur-md rounded-full items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="w-5 h-5 lg:w-4 lg:h-4 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 text-white" />
                  </div>
                </div>
                
                <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 md:bottom-5 md:right-5 lg:bottom-5 lg:right-5 xl:bottom-8 xl:right-8 2xl:bottom-10 2xl:right-10 md:translate-y-4 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10 text-right">
                  <h4 className="text-white font-black text-sm sm:text-base md:text-lg lg:text-base xl:text-xl 2xl:text-2xl drop-shadow-md leading-tight">{img.title}</h4>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}