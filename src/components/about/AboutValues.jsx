// src/components/about/AboutValues.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Lightbulb, HeartHandshake } from 'lucide-react';

const values = [
  {
    title: 'القيادة والتميز',
    desc: 'نصنع قادة المستقبل من خلال برامج تمكن الشباب من اتخاذ القرار وتولي زمام المبادرة في مجتمعاتهم.',
    icon: Crown,
  },
  {
    title: 'الابتكار والريادة',
    desc: 'نؤمن بأن الأفكار الجريئة هي محرك الاقتصاد، لذلك نوفر البيئة الحاضنة لتحويل الأفكار إلى مشاريع واقعية.',
    icon: Lightbulb,
  },
  {
    title: 'التنمية المجتمعية',
    desc: 'نعزز روح العطاء والمسؤولية المجتمعية عبر منصات العمل التطوعي لبناء أردن متكافل ومستدام.',
    icon: HeartHandshake,
  }
];

export default function AboutValues() {
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', damping: 25, stiffness: 120 } 
    }
  };

  return (
    <section className="relative py-24 md:py-32 bg-[#721F31] overflow-hidden font-sans" dir="rtl">
      
      {/* 1. النقش الزخرفي في الخلفية */}
      <div 
        className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '200px', backgroundRepeat: 'repeat' }}
      />
      
      {/* إضاءة خلفية ناعمة */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* ترويسة القسم */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/arrow-yellow.svg" className="w-5 h-5 md:w-6 md:h-6 shrink-0" alt="" />
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              قيمنا الأساسية
            </h2>
            <img src="/arrow-yellow.svg" className="w-5 h-5 md:w-6 md:h-6 shrink-0 rotate-180" alt="" />
          </div>
          <p className="text-white/80 font-medium text-[15px] md:text-[16px] max-w-xl mx-auto">
            المبادئ التي توجه عملنا وتشكل هويتنا في دعم وتمكين الشباب الأردني.
          </p>
        </div>

        {/* شبكة الكروت الزجاجية */}
        <motion.div 
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {values.map((val, idx) => (
            <motion.div 
              key={idx}
              variants={cardVariant}
              whileHover={{ y: -10 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-10 text-center flex flex-col items-center shadow-2xl shadow-black/10 group cursor-pointer"
            >
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#C08F2D]/20 group-hover:scale-110 transition-all duration-300">
                <val.icon className="w-8 h-8 text-[#C08F2D]" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white mb-4">
                {val.title}
              </h3>
              <p className="text-white/70 font-medium text-[14px] md:text-[15px] leading-[2rem]">
                {val.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}