// src/components/programs/detail/ProgramNewsSection.jsx
import { motion } from 'framer-motion';
import { Newspaper, ArrowLeft, ArrowUpLeft, CalendarDays } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function ProgramNewsSection({ programNews, onNewsClick }) {
  return (
    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
      <div className="flex items-center justify-between mb-4 md:mb-6 lg:mb-4">
        <h2 className="text-2xl md:text-[1.75rem] lg:text-[1.5rem] 2xl:text-[1.75rem] font-black flex items-center gap-3 text-[#8a1538]">
          <Newspaper className="w-6 h-6 lg:w-5 lg:h-5 text-[#C08F2D] shrink-0" />
          <span>أحدث أخبار البرنامج</span>
        </h2>
        <button className="hidden md:flex text-[#8a1538] font-bold text-sm items-center gap-1 hover:text-[#C08F2D] transition-colors cursor-pointer group">
          كل الأخبار <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="flex flex-row md:grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-5 2xl:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 scrollbar-hide">
        {programNews.map((news) => (
          <div
            key={news.id}
            onClick={() => onNewsClick(news)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNewsClick(news); } }}
            tabIndex={0}
            role="button"
            aria-label={news.title}
            className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer shrink-0 w-[80vw] md:w-full snap-center flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C08F2D] focus-visible:ring-offset-2"
          >
            <div className="h-40 lg:h-36 2xl:h-40 overflow-hidden relative shrink-0">
              <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
                <CalendarDays className="w-3.5 h-3.5 text-[#8a1538]" />
                <span className="text-[10px] font-bold text-gray-800">{news.date}</span>
              </div>
            </div>
            <div className="p-5 lg:p-4 2xl:p-5 flex flex-col flex-grow">
              <h3 className="font-black text-[14px] md:text-base lg:text-[13px] 2xl:text-base text-gray-900 line-clamp-2 leading-relaxed group-hover:text-[#8a1538] transition-colors mb-2">
                {news.title}
              </h3>
              <div className="mt-auto pt-2 flex items-center gap-2 text-[#721F31] font-bold text-xs lg:text-[11px] 2xl:text-xs">
                اقرأ التفاصيل <ArrowUpLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
