// src/components/home/LuxuryHero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function LuxuryHero({ onExploreClick }) {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, 
        delayChildren: 0.1, 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } 
  };

  return (
    // 🟢 الحل الجذري هنا: استخدام max() يمنع الهيرو من الانضغاط على الشاشات القصيرة (أقل من 680px)
    // 🟢 إضافة pt (Padding Top) و pb (Padding Bottom) لضمان تمركز النص بين النافبار والكرت السفلي
    <div className="relative min-h-[max(85dvh,500px)] lg:min-h-[max(75dvh,600px)] xl:min-h-[max(80dvh,680px)] 2xl:min-h-[max(85dvh,800px)] flex items-center justify-center overflow-hidden bg-[#1a0409] font-sans pt-24 pb-16 lg:pt-28 lg:pb-24 xl:pt-32 xl:pb-32 2xl:pt-40 2xl:pb-36" dir="rtl">
      
      <div className="absolute inset-0 bg-gradient-to-br from-[#8a1538] via-[#521623] to-[#1a070b] z-0"></div>

      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0 opacity-20 hidden sm:block md:mix-blend-overlay"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cpf-arrows" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M40 20 L60 0 L80 20" stroke="#C08F2D" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M40 100 L60 120 L80 100" stroke="#ffffff" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 40 L0 60 L20 80" stroke="#C08F2D" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
              <path d="M100 40 L120 60 L100 80" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#cpf-arrows)" />
        </svg>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80" 
          alt="تمكين الشباب" 
          className="w-full h-full object-cover mix-blend-luminosity grayscale"
          loading="eager" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a070b] via-[#1a070b]/60 to-transparent"></div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        // 🟢 إزالة الـ mt المبالغ فيه لتوسيط المحتوى داخل الـ Paddings الجديدة
        className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center mt-2 lg:mt-4 xl:mt-6 2xl:mt-10"
      >
        
        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white mb-4 lg:mb-5 xl:mb-6 tracking-tight leading-[1.2]">
          شباب قادر..<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C08F2D] to-[#fcebb6]">
            لأردن طموح
          </span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-sm sm:text-base lg:text-base xl:text-lg 2xl:text-xl text-white/90 font-medium max-w-2xl xl:max-w-3xl mx-auto mb-8 lg:mb-8 xl:mb-10 2xl:mb-12 leading-relaxed px-2">
          نؤمن بأن الشباب هم المحرك الأساسي للتنمية. اكتشف منظومة متكاملة من البرامج والفرص المصممة لتمكينك، تطوير مهاراتك، وإطلاق العنان لطموحك نحو الابتكار والقيادة.
        </motion.p>

        <motion.div variants={itemVariants}>
          <button 
            onClick={onExploreClick}
            className="group relative flex items-center gap-3 lg:gap-3 xl:gap-4 2xl:gap-5 bg-transparent border-2 border-[#C08F2D] text-white px-6 lg:px-6 xl:px-8 2xl:px-12 py-3 lg:py-3 xl:py-3.5 2xl:py-5 rounded-full font-bold overflow-hidden transition-all active:scale-95 hover:scale-105 cursor-pointer"
          >
            <div className="absolute inset-0 bg-[#C08F2D] w-0 group-hover:w-full transition-all duration-500 ease-out z-0"></div>
              <span className="relative z-10 text-sm lg:text-base xl:text-lg 2xl:text-xl group-hover:text-gray-900 transition-colors duration-300 font-black">
                ابدأ رحلتك الآن
              </span>
            <div className="relative z-10 w-7 h-7 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 border border-white/30 rounded-full flex items-center justify-center group-hover:border-gray-900/30 transition-colors duration-300">
              <ArrowLeft className="w-4 h-4 lg:w-4 lg:h-4 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5 transform group-hover:-translate-x-1 transition-transform group-hover:text-gray-900" />
            </div>
          </button>
        </motion.div>

      </motion.div>

      {/* 🟢 رفع مؤشر السهم (Scroll Indicator) قليلاً للأعلى لتجنب الاصطدام بكرت الإحصائيات */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ duration: 2, delay: 2, repeat: Infinity }}
        className="hidden md:flex absolute bottom-8 lg:bottom-12 xl:bottom-16 2xl:bottom-20 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-60"
      >
        <span className="text-[11px] xl:text-[12px] text-white tracking-widest font-bold">اكتشف</span>
        <div className="w-[2px] h-8 lg:h-8 xl:h-10 2xl:h-12 bg-gradient-to-b from-[#C08F2D] to-transparent rounded-full"></div>
      </motion.div>

    </div>
  );
}