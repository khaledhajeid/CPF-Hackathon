// src/components/news/VisualPulse.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { pulseImages } from '../../data/newsData';

export default function VisualPulse({ onImageClick }) {
  return (
    <div className="bg-[#fff9fa] py-[clamp(4rem,8vh,8rem)] border-t border-gray-100 overflow-hidden" dir="rtl">
      {/* 🟢 حاوية مرنة أيضاً هنا */}
      <div className="max-w-[1400px] xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-[clamp(1rem,4vw,2rem)]">
        
        <div className="flex flex-col items-center justify-center text-center mb-[clamp(2.5rem,5vh,4rem)]">
          <div className="flex items-center gap-[clamp(0.5rem,1.5vw,1rem)] mb-[clamp(0.5rem,1.5vw,1rem)]">
            <img src="/arrow-yellow.svg" className="w-[clamp(1.25rem,2.5vw,2rem)] h-[clamp(1.25rem,2.5vw,2rem)] object-contain transform rotate-180" alt="" />
            <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-black text-[#1a1c1d] tracking-tight">عدسة الميدان</h2>
            <img src="/arrow-yellow.svg" className="w-[clamp(1.25rem,2.5vw,2rem)] h-[clamp(1.25rem,2.5vw,2rem)] object-contain" alt="" />
          </div>
          <p className="text-gray-500 font-medium text-[clamp(0.75rem,1.2vw,1rem)] max-w-2xl leading-relaxed px-4">
            لقطات حية توثّق شغف وإنجازات الشباب الأردني في شتى برامجنا ومبادراتنا، لأن الصورة أبلغ من ألف كلمة.
          </p>
        </div>

        {/* 🟢 الشبكة: تم استبدال الارتفاعات الثابتة بقيم clamp هندسية لتبدو مرتبة ومقصوصة بشكل جميل */}
        <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-4 md:grid-rows-[auto] gap-[clamp(0.75rem,1.5vw,1.25rem)] pb-4 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {pulseImages.map((img, idx) => {
            let gridSpan = 'md:col-span-1 md:row-span-1 h-[clamp(200px,30vh,260px)]';
            if (img.type === 'featured') gridSpan = 'md:col-span-2 md:row-span-2 h-[clamp(200px,30vh,260px)] md:h-[clamp(420px,62vh,540px)]';
            if (img.type === 'tall') gridSpan = 'md:col-span-1 md:row-span-2 h-[clamp(200px,30vh,260px)] md:h-[clamp(420px,62vh,540px)]';

            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                key={img.id}
                onClick={() => onImageClick(idx)} 
                className={`relative rounded-[clamp(1rem,2vw,1.5rem)] overflow-hidden group shadow-sm hover:shadow-xl transition-all cursor-pointer bg-gray-200 border border-gray-200/50 w-[200px] sm:w-[240px] md:w-auto shrink-0 snap-center ${gridSpan}`}
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent md:opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute inset-0 md:bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="hidden md:flex w-[clamp(2.5rem,4vw,3rem)] h-[clamp(2.5rem,4vw,3rem)] bg-white/20 backdrop-blur-md rounded-full items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="w-[clamp(1.25rem,2vw,1.5rem)] h-[clamp(1.25rem,2vw,1.5rem)] text-white" />
                  </div>
                </div>
                
                <div className="absolute bottom-[clamp(1rem,2vw,1.25rem)] right-[clamp(1rem,2vw,1.25rem)] md:translate-y-4 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10 text-right">
                  <h4 className="text-white font-black text-[clamp(0.875rem,1.5vw,1.125rem)] drop-shadow-md leading-tight">{img.title}</h4>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}