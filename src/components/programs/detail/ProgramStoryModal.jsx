// src/components/programs/detail/ProgramStoryModal.jsx
import { motion } from 'framer-motion';
import { X, Target, Quote, MapPin } from 'lucide-react';
import useEscapeKey from '../../../hooks/useEscapeKey';
import { getPathwayBadgeClass } from '../../../utils/pathwayColors';

export default function ProgramStoryModal({ story, onClose }) {
  useEscapeKey(onClose, !!story);

  if (!story) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-6 lg:p-12 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: window.innerWidth < 768 ? '100%' : 20, opacity: window.innerWidth < 768 ? 1 : 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: window.innerWidth < 768 ? '100%' : 20, opacity: window.innerWidth < 768 ? 1 : 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: window.innerWidth < 768 ? 250 : 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white overflow-hidden shadow-2xl w-full flex flex-col mt-auto h-[90vh] rounded-t-3xl md:flex-row md:h-auto md:max-h-[90vh] md:max-w-5xl md:rounded-[2rem] md:mt-0"
      >
        {/* 🟢 رأس المودال للموبايل (زر إغلاق وعنوان) */}
        <div className="md:hidden w-full flex justify-between items-center p-4 bg-white shrink-0 border-b border-gray-100 rounded-t-3xl z-20">
          <h3 className="font-bold text-gray-900 text-[13px] pr-2">قصة نجاح</h3>
          <button onClick={onClose} className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 🟢 حاوية التمرير للصور والنصوص */}
        <div className="flex-1 overflow-y-auto flex flex-col md:flex-row scrollbar-hide">

          {/* 🟢 الصورة: تظهر للموبايل فوق النص (order-1)، وعلى الديسكتوب ع اليمين (order-2) */}
          <div className="w-full h-56 sm:h-64 md:h-auto md:w-2/5 relative shrink-0 bg-gray-900 order-1 md:order-2">
            <img src={story.image} alt={story.name} className="w-full h-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-0 right-0 px-4 md:bottom-10 md:px-10">
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full font-bold text-[11px] md:text-sm mb-2 md:mb-3">
                <MapPin className="w-3.5 h-3.5" />
                {story.location}، الأردن
              </div>
              <h3 className="text-white font-black text-xl md:text-2xl drop-shadow-md">{story.program}</h3>
            </div>
          </div>

          {/* 🟢 المحتوى النصي: ترتيبه تحت الصورة عالموبايل، والأول عالديسكتوب */}
          <div className="w-full md:w-3/5 p-5 md:p-8 lg:p-12 flex flex-col order-2 md:order-1">
            {/* زر الإغلاق للديسكتوب */}
            <button onClick={onClose} className="hidden md:flex absolute top-6 right-6 md:relative md:top-0 md:right-0 md:self-end w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full items-center justify-center transition-colors mb-6 text-gray-500 z-10 cursor-pointer shrink-0">
              <X className="w-5 h-5" />
            </button>

            <div className={`inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-bold text-[11px] md:text-xs w-fit mb-4 mt-2 md:mt-0 border ${getPathwayBadgeClass(story.pathway)}`}>
              <Target className="w-3.5 h-3.5 md:w-4 md:h-4" />
              {story.pathway}
            </div>

            <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-5 md:mb-8 leading-tight">{story.name}</h2>

            <div className="flex gap-3 md:gap-4 mb-6 md:mb-8 bg-gray-50 p-4 md:p-6 border border-gray-200/70 rounded-xl">
              <div className="mb-2 md:mb-4 shrink-0">
                <Quote className="w-6 h-6 md:w-8 md:h-8 text-[#C08F2D]/40" />
              </div>
              <p className="text-gray-700 text-[13px] md:text-[1.05rem] font-medium leading-relaxed md:leading-[2.1rem] text-justify relative z-10">
                "{story.quote}"
              </p>
            </div>

            <div className="flex-grow">
              <p className="text-gray-600 text-[14px] md:text-lg leading-relaxed md:leading-[2.2rem] text-justify font-medium">
                {story.fullStory}
              </p>
            </div>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}
