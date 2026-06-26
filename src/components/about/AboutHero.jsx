// src/components/about/AboutHero.jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function AboutHero() {
  const containerRef = useRef(null);
  
  // تتبع مستوى النزول في هذا القسم لربطه بتغيير الشفافية والحركة
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // تحويل قيمة السكرول إلى شفافية وحجم للنص الأول (الهيرو)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  // تحويل قيمة السكرول لتغيير الصور الخلفية (Fade between images)
  const bg1Opacity = useTransform(scrollYProgress, [0, 0.3, 0.4], [1, 1, 0]);
  const bg2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
  const bg3Opacity = useTransform(scrollYProgress, [0.6, 0.7, 1], [0, 1, 1]);

  return (
    // القسم يأخذ ارتفاع 4 شاشات (400vh) لنتمكن من عمل السكرول بداخله
    <div ref={containerRef} className="relative h-[400vh] bg-black font-sans" dir="rtl">
      
      {/* =========================================
          الخلفيات الثابتة (تتغير شفافيتها مع السكرول)
          ========================================= */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* الصورة 1: الهيرو الأساسي (شباب في بيئة تقنية/مختبر) */}
        <motion.div style={{ opacity: bg1Opacity }} className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071" alt="Youth" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0409]/80 via-[#1a0409]/40 to-black/80" />
        </motion.div>

        {/* الصورة 2: المشاركة الاقتصادية (بيئة عمل/مساحة الصنّاع) */}
        <motion.div style={{ opacity: bg2Opacity }} className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070" alt="Work" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
        </motion.div>

        {/* الصورة 3: القيادة والمجتمع (تطوع أو تجمع شبابي) */}
        <motion.div style={{ opacity: bg3Opacity }} className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070" alt="Community" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-[#721F31]/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#fcfcfc]" />
        </motion.div>

        {/* =========================================
            النصوص التي تظهر مع السكرول
            ========================================= */}
        
        {/* شاشة الهيرو الأولى */}
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <span className="text-[#C08F2D] font-black tracking-widest text-sm mb-4">مؤسسة ولي العهد</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6">
            شباب قادر <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C08F2D] to-yellow-200">لأردن طموح</span>
          </h1>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-12 text-white/50">
            <ArrowDown className="w-6 h-6" />
          </motion.div>
        </motion.div>

      </div>

      {/* =========================================
          الكلمات التي تمر أثناء النزول (Scroll Triggers)
          ========================================= */}
      <div className="relative z-10 w-full px-6 max-w-4xl mx-auto pointer-events-none">
        
        {/* المشهد الثاني */}
        <div className="h-screen flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            className="text-center bg-black/20 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10"
          >
            <h2 className="text-3xl md:text-6xl font-black text-white mb-4">أكثر من مجرد مبادرات</h2>
            <p className="text-white/80 text-lg md:text-2xl font-medium">نبني منظومة متكاملة (Ecosystem) تحتضن شغفك من الفكرة وحتى الإنجاز.</p>
          </motion.div>
        </div>

        {/* المشهد الثالث */}
        <div className="h-screen flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4">في كافة المحافظات</h2>
            <p className="text-white/90 text-xl md:text-3xl font-bold drop-shadow-lg">نصل إليك أينما كنت لنصنع التغيير معاً.</p>
          </motion.div>
        </div>

      </div>
    </div>
  );
}