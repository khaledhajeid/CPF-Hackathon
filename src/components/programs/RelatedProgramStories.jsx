// src/components/programs/RelatedProgramStories.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, ArrowLeft, ArrowUpLeft, Sparkles } from 'lucide-react';
import { allStories } from '../../data/programsData';

const getPathwayStyle = (pathway) => {
  switch(pathway) {
    case 'المشاركة الاقتصادية': return 'bg-[#721F31]/10 text-[#721F31] border-[#721F31]/20'; 
    case 'القيادة': return 'bg-[#2b307e]/10 text-[#2b307e] border-[#2b307e]/20'; 
    case 'التنمية المجتمعية': return 'bg-[#1f5412]/10 text-[#1f5412] border-[#1f5412]/20'; 
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export default function RelatedProgramStories({ programName, onNavigate, onStoryClick }) {
  const programStories = allStories
    .filter(story => story.programKey === programName)
    .slice(0, 3);

  return (
    <div className="py-12 md:py-20 bg-[#fcfcfc] relative border-t border-gray-100 mt-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 md:mb-16 gap-4 md:gap-6 text-right">
          <div>
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
              <img src="/arrow-yellow.svg" className="w-5 h-5 md:w-8 md:h-8 shrink-0 object-contain" alt="هوية المؤسسة" />
              <h2 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">
                شباب صنعوا الفارق في <span className="text-[#721F31]">{programName}</span>
              </h2>
            </div>
            <p className="text-gray-500 font-medium text-[13px] md:text-lg max-w-2xl">
              تعرف على تجارب حقيقية لشباب أردنيين استثمروا هذه الفرصة لتحقيق انطلاقة نوعية في مسيرتهم.
            </p>
          </div>

          {programStories.length > 0 && (
            <button 
              onClick={() => onNavigate('success')}
              className="group hidden md:flex items-center gap-2 text-[#721F31] hover:text-[#C08F2D] font-bold text-sm md:text-lg transition-colors shrink-0 cursor-pointer"
            >
              <span>تصفح جميع القصص</span>
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 transform group-hover:-translate-x-2 transition-transform" />
            </button>
          )}
        </div>

        {programStories.length > 0 ? (
          <div className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 scrollbar-hide">
            {programStories.map((story, idx) => {
              const tagStyle = getPathwayStyle(story.pathway);
              return (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onClick={() => onStoryClick(story.id)}
                  className="break-inside-avoid block group bg-white rounded-2xl md:rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer relative flex flex-col h-full shrink-0 w-[85vw] md:w-full snap-center"
                >
                  <div className="relative h-48 md:h-64 overflow-hidden bg-gray-100 shrink-0">
                    <img src={story.image} alt={story.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                    
                    <div className="absolute top-3 right-3 md:top-5 md:right-5 z-10">
                      <span className={`flex items-center gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-[9px] md:text-[10px] font-black backdrop-blur-md shadow-sm bg-white/95 border ${tagStyle.split(' ')[2]} ${tagStyle.split(' ')[1]}`}>
                        {story.pathway}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5 z-10 flex justify-between items-end">
                       <div>
                         <h3 className="font-black text-lg md:text-2xl text-white leading-tight drop-shadow-md">{story.name}</h3>
                         <p className="text-[#C08F2D] font-bold text-[10px] md:text-sm mt-1">{story.program}</p>
                       </div>
                       <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-300">
                         <ArrowUpLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
                       </div>
                    </div>
                  </div>

                  <div className="p-5 md:p-8 pb-6 md:pb-10 relative bg-white flex-grow flex flex-col justify-center">
                    <div className="mb-2 md:mb-4">
                      <Quote className="w-5 h-5 md:w-8 md:h-8 text-[#C08F2D]/40 rotate-180" />
                    </div>
                    <p className="text-gray-700 text-[13px] md:text-[1.05rem] font-medium leading-relaxed md:leading-[2.1rem] text-justify relative z-10">
                      "{story.quote}"
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-[2rem] p-8 md:p-16 text-center border border-dashed border-gray-200 flex flex-col items-center justify-center max-w-3xl mx-auto"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 md:mb-6">
              <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-gray-800 mb-2 md:mb-3">كن أنت القصة الأولى!</h3>
            <p className="text-gray-500 font-medium text-[13px] md:text-base mb-6 md:mb-8 max-w-md leading-relaxed">
              لا يوجد قصص منشورة لهذا البرنامج حتى الآن. ابدأ رحلتك معنا، وكن أنت الملهم القادم لشباب الأردن.
            </p>
            <button 
              onClick={() => onNavigate('success')}
              className="bg-[#C08F2D] hover:bg-[#a87d25] text-white px-6 md:px-8 py-3 md:py-3.5 rounded-xl font-black text-[13px] md:text-base transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              شارك قصتك الآن <ArrowLeft className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {programStories.length > 0 && (
          <div className="mt-8 flex justify-center md:hidden">
            <button 
              onClick={() => onNavigate('success')}
              className="flex items-center gap-2 w-full justify-center bg-transparent border-2 border-[#721F31] text-[#721F31] hover:bg-[#721F31] hover:text-white px-6 py-3 rounded-xl font-bold text-[14px] transition-all cursor-pointer"
            >
              <span>تصفح جميع القصص</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
}