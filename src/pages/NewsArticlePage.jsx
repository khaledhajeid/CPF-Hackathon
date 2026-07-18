// src/pages/NewsArticlePage.jsx
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, ArrowRight, Share2, Printer } from 'lucide-react';
import Footer from '../components/Footer';

export default function NewsArticlePage({ newsItem, onNavigate }) {
  // التمرير لأعلى الصفحة عند فتح المقال
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // إذا تم الدخول للصفحة بدون خبر (عن طريق الخطأ)، نرجعه لصفحة الأخبار
  if (!newsItem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc]" dir="rtl">
        <div className="w-10 h-10 border-4 border-[#8a1538] border-t-transparent rounded-full animate-spin"></div>
        {setTimeout(() => onNavigate('news'), 500)}
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#fcfcfc] text-[#4c4c4c] font-sans flex flex-col selection:bg-[#C08F2D] selection:text-white" 
      dir="rtl"
    >
      
      {/* ========================================= */}
      {/* 1. صورة الغلاف السينمائية (Cinematic Hero) */}
      {/* ========================================= */}
      <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[75vh] xl:h-[80vh] shrink-0 overflow-hidden bg-[#1a0409]">
        
        {/* دعم الفيديو والصور مع تأثير التقريب السينمائي */}
        {newsItem.type === 'video' ? (
          <motion.video 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            src={newsItem.mediaUrl} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover" 
          />
        ) : (
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={newsItem.image || newsItem.mediaUrl} 
            alt={newsItem.title} 
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* 🟢 التدرج العلوي (لإبراز النافبار) */}
        <div className="absolute top-0 inset-x-0 h-[30vh] bg-gradient-to-b from-[#1a0409]/80 to-transparent z-10" />
        
        {/* 🟢 التدرج السفلي (لدمج الصورة مع الصندوق الأبيض بنعومة) */}
        <div className="absolute bottom-0 inset-x-0 h-[40vh] bg-gradient-to-t from-[#fcfcfc] via-[#fcfcfc]/60 to-transparent z-10" />
      </div>

      {/* ========================================= */}
      {/* 2. حاوية المقال (تطفو فوق الصورة بعمق أكبر) */}
      {/* ========================================= */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex-grow w-full max-w-[1000px] xl:max-w-[1200px] mx-auto px-[clamp(1rem,4vw,2rem)] -mt-[clamp(6rem,15vh,12rem)] relative z-20 pb-[clamp(3rem,8vh,5rem)]"
      >
        
        <div className="bg-white/95 backdrop-blur-xl rounded-[clamp(1.5rem,3vw,2.5rem)] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] p-[clamp(1.5rem,4vw,4rem)] border border-white/50">
          
          {/* 🟢 زر العودة وتاريخ النشر */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-[clamp(1.5rem,3vw,2.5rem)] pb-[clamp(1rem,2vw,1.5rem)] border-b border-gray-100">
            
            <button 
              onClick={() => onNavigate('news')}
              className="flex items-center gap-[clamp(0.35rem,0.8vw,0.5rem)] text-gray-500 hover:text-[#8a1538] transition-colors font-bold text-[clamp(0.75rem,1.1vw,0.9rem)] group w-fit cursor-pointer"
            >
              <div className="w-[clamp(1.75rem,2.5vw,2.25rem)] h-[clamp(1.75rem,2.5vw,2.25rem)] rounded-full bg-gray-50 group-hover:bg-[#8a1538]/10 flex items-center justify-center transition-colors">
                <ArrowRight className="w-[clamp(1rem,1.2vw,1.25rem)] h-[clamp(1rem,1.2vw,1.25rem)] transform group-hover:translate-x-1 transition-transform" />
              </div>
              عودة إلى الأخبار
            </button>

            <div className="inline-flex items-center gap-[clamp(0.25rem,0.5vw,0.35rem)] bg-gray-50/80 text-gray-600 px-[clamp(0.75rem,1.5vw,1rem)] py-[clamp(0.35rem,0.8vw,0.5rem)] rounded-lg font-bold text-[clamp(0.7rem,1vw,0.85rem)] w-fit border border-gray-100">
              <CalendarDays className="w-[clamp(0.85rem,1.2vw,1rem)] h-[clamp(0.85rem,1.2vw,1rem)] text-[#C08F2D]" />
              {newsItem.date}
            </div>
            
          </div>

          {/* 🟢 عنوان المقال */}
          <h1 className="text-[clamp(1.5rem,4vw,3.25rem)] font-black text-gray-900 mb-[clamp(1.5rem,3vw,2.5rem)] leading-tight tracking-tight drop-shadow-sm">
            {newsItem.title}
          </h1>

          {/* 🟢 نص المقال */}
          <div className="prose prose-lg max-w-none text-gray-700 font-medium text-[clamp(0.9rem,1.2vw,1.125rem)] leading-relaxed md:leading-[2.2] text-justify">
            
            {/* عرض الوصف المختصر كنقطة انطلاق (Intro) بخط مميز */}
            <p className="text-[clamp(1.1rem,1.5vw,1.35rem)] font-black text-[#1a1c1d] mb-8 border-r-4 border-[#C08F2D] pr-5 py-1 bg-gradient-to-l from-[#C08F2D]/5 to-transparent">
              {newsItem.desc}
            </p>
            
            <p className="mb-6">
              في إطار الرؤية الملكية السامية لتمكين الشباب الأردني، أطلقت مؤسسة ولي العهد سلسلة من المبادرات والبرامج المصممة خصيصاً لتطوير المهارات القيادية والعملية. تأتي هذه الخطوة استجابة للتطورات المتسارعة في سوق العمل العالمي والمحلي.
            </p>
            <p className="mb-6">
              وأكدت المؤسسة في بيانها الأخير أن الاستثمار في طاقات الشباب هو الركيزة الأساسية لبناء مستقبل مستدام. حيث تم توفير منصات تفاعلية تتيح للمشاركين تبادل الخبرات، العمل على مشاريع حقيقية، وبناء شبكة علاقات مهنية قوية مع الخبراء في مختلف القطاعات.
            </p>
            
            <h3 className="text-[clamp(1.25rem,2vw,1.75rem)] font-black text-[#8a1538] mt-12 mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-[#C08F2D] rounded-full inline-block"></span>
              أهداف المبادرة والخطوات القادمة
            </h3>
            
            <p className="mb-4">
              تسعى هذه الخطوة لتحقيق مجموعة من الأهداف الاستراتيجية، أبرزها:
            </p>
            
            <ul className="list-none mb-8 space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-[#C08F2D] text-xl leading-none">•</span>
                <span>تعزيز ثقافة الابتكار وريادة الأعمال بين طلبة الجامعات وحديثي التخرج.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#C08F2D] text-xl leading-none">•</span>
                <span>توفير تدريب عملي مكثف يقلص الفجوة بين المخرجات الأكاديمية ومتطلبات سوق العمل.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#C08F2D] text-xl leading-none">•</span>
                <span>بناء شراكات استراتيجية مع القطاع الخاص لتوفير فرص عمل نوعية.</span>
              </li>
            </ul>

            <p className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-gray-800 font-bold">
              وتدعو مؤسسة ولي العهد كافة الشباب المهتمين إلى متابعة منصاتها الرسمية للاستفادة من الفرص القادمة، والمشاركة بفاعلية في صنع التغيير الإيجابي في مجتمعاتهم.
            </p>
          </div>

          {/* 🟢 أدوات المقال (مشاركة وطباعة) */}
          <div className="mt-[clamp(2.5rem,5vw,4rem)] pt-[clamp(1.5rem,3vw,2rem)] border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-gray-500 font-bold text-[clamp(0.75rem,1vw,0.875rem)]">مشاركة المقال:</span>
              <button className="w-10 h-10 rounded-full bg-gray-50 hover:bg-[#8a1538] hover:text-white text-gray-600 flex items-center justify-center transition-all cursor-pointer shadow-sm">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
            
            <button className="flex items-center gap-2 text-gray-500 hover:text-[#C08F2D] transition-colors font-bold text-[clamp(0.75rem,1vw,0.875rem)] cursor-pointer bg-gray-50 hover:bg-gray-100 px-5 py-2.5 rounded-xl border border-gray-100">
              <Printer className="w-4 h-4" />
              طباعة الخبر
            </button>
          </div>

        </div>
      </motion.div>

      <Footer onNavigate={onNavigate} />

    </motion.div>
  );
}