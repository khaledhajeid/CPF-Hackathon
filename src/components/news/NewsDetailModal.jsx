// src/components/news/NewsDetailModal.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { X, CalendarDays, Tag } from 'lucide-react';

export default function NewsDetailModal({ news, onClose }) {
  if (!news) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-6 lg:p-12 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      dir="rtl"
    >
      <motion.div
        initial={{ y: window.innerWidth < 768 ? '100%' : 20, opacity: window.innerWidth < 768 ? 1 : 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: window.innerWidth < 768 ? '100%' : 20, opacity: window.innerWidth < 768 ? 1 : 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: window.innerWidth < 768 ? 250 : 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white overflow-hidden shadow-2xl w-full flex flex-col mt-auto h-[90vh] rounded-t-3xl md:flex-row md:h-auto md:max-h-[90vh] md:max-w-5xl md:rounded-[2rem] md:mt-0"
      >
        {/* 🟢 رأس المودال للموبايل (زر إغلاق وعنوان صغير) */}
        <div className="md:hidden w-full flex justify-between items-center p-4 bg-white shrink-0 border-b border-gray-100 rounded-t-3xl z-20">
          <h3 className="font-bold text-gray-900 text-[13px] pr-2">تفاصيل الخبر</h3>
          <button onClick={onClose} className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 🟢 حاوية التمرير للصور والنصوص */}
        <div className="flex-1 overflow-y-auto flex flex-col md:flex-row scrollbar-hide">
          
          {/* 🟢 الصورة: تظهر بالترتيب الأول على الموبايل، وتذهب لليسار (order-2) على الديسكتوب */}
          <div className="w-full h-56 sm:h-64 md:h-auto md:w-2/5 relative shrink-0 bg-gray-100 order-1 md:order-2">
            <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50 md:opacity-50" />
          </div>

          {/* 🟢 المحتوى النصي: ترتيبه الثاني على الموبايل، والأول على الديسكتوب */}
          <div className="w-full md:w-3/5 p-5 md:p-8 lg:p-10 flex flex-col order-2 md:order-1">
            {/* زر الإغلاق للديسكتوب */}
            <button onClick={onClose} className="hidden md:flex absolute top-6 right-6 md:relative md:top-0 md:right-0 md:self-end w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full items-center justify-center transition-colors mb-6 text-gray-500 z-10 cursor-pointer shrink-0">
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-6 mt-2 md:mt-0">
              <div className="inline-flex items-center gap-1.5 bg-[#8a1538]/10 text-[#8a1538] px-3 py-1.5 rounded-lg font-bold text-[11px] md:text-xs">
                <Tag className="w-3.5 h-3.5" />
                {news.category}
              </div>
              <div className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg font-bold text-[11px] md:text-xs border border-gray-100">
                <CalendarDays className="w-3.5 h-3.5 text-[#C08F2D]" />
                {news.date}
              </div>
            </div>

            <h2 className="text-lg md:text-2xl lg:text-3xl font-black text-gray-900 mb-5 md:mb-6 leading-snug md:leading-tight">
              {news.title}
            </h2>

            <div className="flex-grow">
              <p className="text-gray-700 text-[13.5px] md:text-base leading-relaxed md:leading-[2.1rem] text-justify font-medium">
                {news.desc}
                <br/><br/>
                تأتي هذه الخطوة في إطار سعي مؤسسة ولي العهد المستمر لتمكين الشباب الأردني وتوفير الفرص النوعية التي تساهم في صقل مهاراتهم وتهيئتهم لسوق العمل المستقبلي، من خلال عقد شراكات استراتيجية مع مختلف الجهات الفاعلة.
              </p>
            </div>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}