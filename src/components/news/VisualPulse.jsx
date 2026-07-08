// src/components/news/VisualPulse.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { pulseImages } from '../../data/newsData';

export default function VisualPulse({ onImageClick }) {
  return (
    <div className="bg-[#fff9fa] py-16 md:py-32 border-t border-gray-100 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        <div className="flex flex-col items-center justify-center text-center mb-10 md:mb-16">
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <img src="/arrow-yellow.svg" className="w-5 h-5 md:w-8 md:h-8 object-contain transform rotate-180" alt="" />
            <h2 className="text-2xl md:text-4xl font-black text-[#1a1c1d] tracking-tight">عدسة الميدان</h2>
            <img src="/arrow-yellow.svg" className="w-5 h-5 md:w-8 md:h-8 object-contain" alt="" />
          </div>
          <p className="text-gray-500 font-medium text-xs md:text-base max-w-2xl leading-relaxed px-4">
            لقطات حية توثّق شغف وإنجازات الشباب الأردني في شتى برامجنا ومبادراتنا، لأن الصورة أبلغ من ألف كلمة.
          </p>
        </div>

        {/* 🟢 الموبايل: سلايدر بأسلوب الـ Stories. الكمبيوتر: Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-4 md:grid-rows-[auto] gap-3 md:gap-5 pb-4 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {pulseImages.map((img, idx) => {
            let gridSpan = 'md:col-span-1 md:row-span-1 h-64';
            if (img.type === 'featured') gridSpan = 'md:col-span-2 md:row-span-2 h-64 md:h-full';
            if (img.type === 'tall') gridSpan = 'md:col-span-1 md:row-span-2 h-64 md:h-[calc(32rem+1.25rem)]';

            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                key={img.id}
                onClick={() => onImageClick(idx)} 
                // 🟢 جعل الكرت عمودي كشكل ستوري على الموبايل
                className={`relative rounded-2xl md:rounded-3xl overflow-hidden group shadow-sm hover:shadow-xl transition-all cursor-pointer bg-gray-200 border border-gray-200/50 
                  w-[200px] sm:w-[240px] aspect-[3/4] md:aspect-auto md:w-auto shrink-0 snap-center ${gridSpan}`}
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent md:opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute inset-0 md:bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="hidden md:flex w-12 h-12 bg-white/20 backdrop-blur-md rounded-full items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="w-5 h-5 text-white" />
                  </div>
                </div>
                
                <div className="absolute bottom-4 right-4 md:bottom-5 md:right-5 md:translate-y-4 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10 text-right">
                  <h4 className="text-white font-black text-sm md:text-lg drop-shadow-md leading-tight">{img.title}</h4>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}