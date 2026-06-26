// src/components/about/AboutConclusion.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, ArrowLeft } from 'lucide-react';

export default function AboutConclusion({ onNavigate }) {
  return (
    <div className="font-sans" dir="rtl">
      
      {/* 1. قسم الاقتباس الملهم */}
      <section className="relative py-24 md:py-32 bg-[#F8FAFC] flex flex-col items-center justify-center overflow-hidden">
        {/* علامة التنصيص المائية في الخلفية */}
        <Quote className="absolute text-[#C08F2D]/5 w-64 h-64 md:w-96 md:h-96 rotate-180 z-0" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <Quote className="w-10 h-10 md:w-14 md:h-14 text-[#C08F2D] mx-auto mb-6 md:mb-8 fill-[#C08F2D]" />
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.6] md:leading-[1.7] mb-8">
            "إن رهاننا على الشباب الأردني هو رهان رابح دائماً، فهم صناع المستقبل، وقادة التغيير، والمحرك الأساسي للابتكار والإنجاز."
          </h2>
          <div className="w-16 h-[2px] bg-[#8a1538] mx-auto mb-4" />
          <p className="text-gray-500 font-bold text-sm md:text-base tracking-widest uppercase">
            رؤية مؤسسة ولي العهد
          </p>
        </motion.div>
      </section>

      {/* 2. قسم الربط العكسي (Call to Action) */}
      <section className="py-20 md:py-24 bg-white relative">
        <div className="max-w-[1000px] mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-l from-[#8a1538] to-[#4d0b1f] rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-[#721F31]/20"
          >
            {/* زخرفة هندسية للزر */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C08F2D]/10 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col items-center">
              <h3 className="text-2xl md:text-4xl font-black text-white mb-4">
                هل أنت مستعد لبدء رحلتك؟
              </h3>
              <p className="text-white/80 font-medium text-[15px] md:text-lg mb-10 max-w-2xl">
                لا تدع الفرصة تفوتك. استكشف الآن المبادرات والبرامج المصممة خصيصاً لتطوير مهاراتك ووضعك على أول طريق النجاح.
              </p>
              
              <button 
                onClick={() => onNavigate('home')}
                className="group bg-[#C08F2D] hover:bg-[#a87d25] text-white px-8 md:px-10 py-4 rounded-xl font-black text-[15px] transition-all flex items-center gap-3 shadow-lg hover:shadow-xl cursor-pointer"
              >
                <span>تصفح الفرص والمبادرات</span>
                <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-2 transition-transform duration-300" strokeWidth={2.5} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}