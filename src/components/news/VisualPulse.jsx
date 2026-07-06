// src/components/news/VisualPulse.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { pulseImages } from '../../data/newsData';

export default function VisualPulse({ onImageClick }) {
  return (
    // 🟢 خلفية فيها لمسة عنابي خفيفة جداً لكسر البياض
    <div className="bg-[#fff9fa] py-24 md:py-32 border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        <div className="flex flex-col items-center justify-center text-center mb-16">
          {/* 🟢 القوس الذهبي بالاتجاه الصحيح */}
          <div className="flex items-center gap-3 mb-4">
            <img src="/arrow-yellow.svg" className="w-6 h-6 md:w-8 md:h-8 object-contain transform rotate-180" alt="" />
            <h2 className="text-3xl md:text-4xl font-black text-[#1a1c1d] tracking-tight">عدسة الميدان</h2>
            <img src="/arrow-yellow.svg" className="w-6 h-6 md:w-8 md:h-8 object-contain" alt="" />
          </div>
          <p className="text-gray-500 font-medium text-sm md:text-base max-w-2xl leading-relaxed">
            لقطات حية توثّق شغف وإنجازات الشباب الأردني في شتى برامجنا ومبادراتنا، لأن الصورة أبلغ من ألف كلمة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-[auto] gap-4 md:gap-5">
          {pulseImages.map((img, idx) => {
            let gridSpan = 'md:col-span-1 md:row-span-1 h-64';
            if (img.type === 'featured') gridSpan = 'md:col-span-2 md:row-span-2 h-64 md:h-full';
            if (img.type === 'tall') gridSpan = 'md:col-span-1 md:row-span-2 h-64 md:h-[calc(32rem+1.25rem)]';

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={img.id}
                onClick={() => onImageClick(idx)} // 🟢 التعديل الأهم: نمرر الـ Index عشان نقدر نقلب
                className={`relative rounded-2xl overflow-hidden group shadow-sm hover:shadow-2xl transition-all cursor-pointer bg-gray-200 border border-gray-200/50 ${gridSpan}`}
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="w-5 h-5 text-white" />
                  </div>
                </div>
                
                <div className="absolute bottom-5 right-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10 text-right">
                  <h4 className="text-white font-black text-lg drop-shadow-md">{img.title}</h4>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}