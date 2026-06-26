// src/components/about/AboutBento.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Compass, Users } from 'lucide-react';

export default function AboutBento() {
  // إعدادات حركة الظهور عند عمل Scroll (whileInView)
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="py-20 md:py-32 bg-[#F4F7FA] font-sans" dir="rtl">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        
        {/* عنوان القسم */}
        <div className="flex items-center gap-3 mb-10 md:mb-16">
          <img src="/arrow-yellow.svg" className="w-5 h-5 md:w-6 md:h-6 shrink-0" alt="سهم أصفر" />
          <h2 className="text-2xl md:text-4xl font-black text-[#721F31] tracking-tight">
            رؤيتنا ورسالتنا
          </h2>
        </div>

        {/* شبكة البينتو (Bento Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. كرت الرؤية (يأخذ عمودين على الشاشات الكبيرة) */}
          <motion.div 
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="md:col-span-2 bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-gray-200/40 border border-gray-100 flex flex-col justify-center group hover:border-[#C08F2D]/30 transition-colors"
          >
            <div className="w-14 h-14 bg-[#F8FAFC] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Compass className="w-7 h-7 text-[#C08F2D]" strokeWidth={2} />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-4">الرؤية</h3>
            <p className="text-gray-600 font-medium text-[15px] md:text-lg leading-[2rem] md:leading-[2.2rem] text-justify">
              شباب قادر، لأردن طموح. نسعى لأن يكون الشباب الأردني المحرك الأساسي للتنمية والابتكار، مسلحاً بالمهارات القيادية والتقنية التي تمكنه من المنافسة عالمياً وبناء مستقبل مزدهر لوطنه.
            </p>
          </motion.div>

          {/* 2. كرت الرسالة (كرت بارز باللون العنابي) */}
          <motion.div 
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 bg-gradient-to-br from-[#8a1538] to-[#4d0b1f] rounded-3xl p-8 md:p-10 shadow-xl shadow-[#721F31]/20 flex flex-col justify-center relative overflow-hidden"
          >
            {/* زخرفة خلفية بسيطة داخل الكرت */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
            
            <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 relative z-10">
              <Target className="w-7 h-7 text-white" strokeWidth={2} />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white mb-4 relative z-10">الرسالة</h3>
            <p className="text-white/90 font-medium text-[15px] leading-[2rem] text-justify relative z-10">
              توفير منصات وبرامج استراتيجية تطلق العنان لإمكانات الشباب، وتعزز مشاركتهم الاقتصادية والاجتماعية من خلال شراكات فاعلة ومستدامة.
            </p>
          </motion.div>

          {/* 3. كرت النهج / الفئة المستهدفة (يأخذ العرض بالكامل 3 أعمدة) */}
          <motion.div 
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3 }}
            className="md:col-span-3 bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-gray-200/40 border border-gray-100 flex flex-col md:flex-row items-center gap-8 md:gap-12"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#F8FAFC] rounded-full flex items-center justify-center shrink-0">
              <Users className="w-8 h-8 md:w-10 md:h-10 text-[#721F31]" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3 text-center md:text-right">نهجنا الاستراتيجي</h3>
              <p className="text-gray-600 font-medium text-[14px] md:text-[16px] leading-[2rem] text-center md:text-right">
                نعمل في مؤسسة ولي العهد ضمن نموذج عمل يرتكز على التكاملية. لا نقدم حلولاً مؤقتة، بل نبني بيئة مستدامة (Ecosystem) تحتضن الشاب من مرحلة المدرسة عبر "مبادرة حقق"، مروراً بالجامعة وصقل المهارات التقنية عبر "جامعة الحسين التقنية" و "42 عمّان"، وصولاً إلى تمكينه اقتصادياً وقيادياً في سوق العمل.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}