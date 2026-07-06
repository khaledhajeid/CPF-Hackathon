// src/components/SuccessStories.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import { Quote, LayoutGrid, Briefcase, Target, Users, X, ArrowUpLeft, ArrowLeft, MapPin, Volume2, VolumeX } from 'lucide-react';
import ShareStoryModal from './success/ShareStoryModal';

// 🟢 استيراد البيانات من الملف الموحد
import { allStories } from '../data/programsData';

const getPathwayStyle = (pathway) => {
  switch(pathway) {
    case 'المشاركة الاقتصادية': return 'bg-[#721F31]/10 text-[#721F31] border-[#721F31]/20'; 
    case 'القيادة': return 'bg-[#2b307e]/10 text-[#2b307e] border-[#2b307e]/20'; 
    case 'التنمية المجتمعية': return 'bg-[#1f5412]/10 text-[#1f5412] border-[#1f5412]/20'; 
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const StoryModal = ({ story, onClose, onNavigate, setActiveProgramName }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true); // 🟢 حالة الصوت (مكتوم افتراضياً بسبب سياسات المتصفح)

  // 🟢 الكود السحري لإجبار الفيديو على التشغيل التلقائي
  useEffect(() => {
    if (story && story.video && videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      setIsMuted(true); // إعادة تعيين حالة الصوت عند فتح قصة جديدة
      videoRef.current.play().catch(error => {
        console.log("المتصفح منع التشغيل التلقائي:", error);
      });
    }
  }, [story]);

  // 🟢 دالة تبديل حالة الصوت (كتم / تشغيل)
  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

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
        className="bg-white overflow-hidden shadow-2xl w-full flex flex-col md:flex-row 
                   mt-auto h-[90vh] rounded-t-3xl md:h-auto md:max-h-[90vh] md:max-w-5xl md:rounded-[2rem] md:mt-0"
      >
        <div className="md:hidden w-full flex justify-center pt-4 pb-2 bg-white shrink-0 rounded-t-3xl z-20">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>


        <div className="w-full md:w-1/2 lg:w-[55%] p-6 md:p-8 lg:p-12 overflow-y-auto flex flex-col scrollbar-hide pb-20 md:pb-8 relative z-10 bg-white order-last md:order-first">
          <button onClick={onClose} className="hidden md:flex absolute top-6 right-6 md:relative md:top-0 md:right-0 md:self-end w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full items-center justify-center transition-colors mb-6 text-gray-500 z-10 cursor-pointer shrink-0">
            <X className="w-5 h-5" />
          </button>
          
          {/* <div className="inline-flex items-center gap-2 bg-[#721F31]/10 text-[#721F31] px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-bold text-[11px] md:text-xs w-fit mb-4">
            <Target className="w-3.5 h-3.5 md:w-4 md:h-4" />
            {story.pathway}
          </div> */}

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-6 md:mb-8">{story.name}</h2>
          
          <div className="flex gap-3 md:gap-4 mb-6 md:mb-8 bg-gray-50 p-5 md:p-6 rounded-2xl border-r-4 border-[#C08F2D]">
            <Quote className="w-6 h-6 md:w-8 md:h-8 text-[#C08F2D]/50 rotate-180 shrink-0" />
            <h3 className="text-base md:text-[1.2rem] lg:text-[1.35rem] font-black text-[#8a1538] leading-[1.8em]">
              {story.quote}
            </h3>
          </div>

          <p className="text-gray-700 text-sm md:text-base lg:text-[1.05rem] leading-[2.1rem] font-medium text-justify mb-8">
            {story.fullStory}
          </p>

          <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-5 bg-gray-50 p-5 md:p-6 rounded-2xl border border-gray-200/60">
            <div className="w-full sm:w-auto text-right">
              <h4 className="font-black text-gray-900 mb-1 text-sm md:text-[1.1rem]">ألهمتك قصة {story.name.split(' ')[0]}؟</h4>
              <p className="text-[11px] md:text-sm font-bold text-gray-500">ابدأ رحلتك الخاصة واكتشف فرصك.</p>
            </div>
            <button
              onClick={() => {
                setActiveProgramName(story.programKey);
                onClose();
                onNavigate('program_details');
              }}
              className="w-full sm:w-auto shrink-0 bg-[#8a1538] hover:bg-[#680f2a] text-white px-6 py-3.5 md:px-7 md:py-3.5 rounded-xl font-black text-[13px] md:text-sm transition-all duration-300 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>استكشف البرنامج</span>
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1.5 transition-transform" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* ==========================================
            القسم الأيسر: الفيديو الطولي أو الصورة
            ========================================== */}
        <div className="w-full md:w-1/2 lg:w-[45%] relative h-[400px] md:h-auto shrink-0 bg-gray-900 flex-grow-0 md:flex-grow order-first md:order-last">
          
          {story.video ? (
            <>
              <video 
                ref={videoRef}
                src={story.video}
                autoPlay 
                loop 
                muted 
                defaultMuted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              />

              <button
                onClick={toggleMute}
                className="absolute top-6 left-6 z-20 w-10 h-10 md:w-11 md:h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all duration-300 cursor-pointer shadow-md"
                aria-label={isMuted ? "تشغيل الصوت" : "كتم الصوت"}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </button>
            </>
          ) : (
            // 🟢 الصورة البديلة
            <img 
              src={story.image} 
              alt={story.name} 
              className="absolute inset-0 w-full h-full object-cover opacity-90" 
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
          
          {/* شارة توضح أنه فيديو */}

          <div className="absolute bottom-10 left-0 right-0 px-8 md:px-10 z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full font-bold text-sm mb-3">
              <MapPin className="w-4 h-4" />
              {story.location}، الأردن
            </div>
            <h3 className="text-white font-black text-2xl drop-shadow-md">{story.program}</h3>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function SuccessStories({ onNavigate, setActiveProgramName, initialStoryId }) {
  const [activeFilter, setActiveFilter] = useState('الكل');
  const [selectedStory, setSelectedStory] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    if (initialStoryId) {
      const storyToOpen = allStories.find(s => s.id === initialStoryId);
      if (storyToOpen) setSelectedStory(storyToOpen);
    }
    window.scrollTo(0, 0); 
  }, [initialStoryId]);

  const categories = [
    { id: 'الكل', icon: LayoutGrid },
    { id: 'المشاركة الاقتصادية', icon: Briefcase },
    { id: 'القيادة', icon: Target },
    { id: 'التنمية المجتمعية', icon: Users },
  ];

  const filteredStories = activeFilter === 'الكل' 
    ? allStories 
    : allStories.filter(s => s.pathway === activeFilter);

  return (
    <div className="min-h-screen bg-[#F4F7FA] font-sans selection:bg-[#C08F2D] selection:text-white flex flex-col" dir="rtl">
      
      {/* الهيدر */}
      <div className="bg-[#1a0409] h-[340px] md:h-[380px] pt-28 md:pt-32 pb-16 md:pb-20 relative overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem] shadow-md shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8a1538]/90 to-[#1a0409]" />
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-overlay">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="cpf-programs-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M0 60 Q 30 30 60 60 T 120 60 M60 0 Q 90 30 60 60 T 60 120" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
              <path d="M-60 60 Q -30 30 0 60 T 60 60 M0 0 Q 30 30 0 60 T 0 120" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#cpf-programs-pattern)"></rect>
          </svg>
        </div>
        
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-3 md:mb-4 tracking-tight">
            قصص <span className="text-[#C08F2D]">النجاح</span>
          </h1>
          <p className="text-white/90 text-[13px] md:text-[15px] font-bold max-w-2xl mx-auto leading-relaxed px-2">
            لم تكن البرامج يوماً مجرد محطات عابرة، بل كانت نقطة انطلاق. تعرّف على شباب أردنيين استثمروا الفرص لتحقيق تغيير جذري في مسيراتهم.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-10 relative z-20 flex-grow pb-24">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-[1000px] mx-auto bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-gray-200/50 border border-gray-100 mb-12 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden z-20"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#C08F2D]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#721F31]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '200px' }} />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start text-center md:text-right gap-4 md:gap-5 w-full md:w-auto">
            <div className="w-7 h-7 object-contain md:mt-1">
              <img src="/arrow-yellow.svg" className="w-6 h-6 md:w-7 md:h-7 object-contain" alt="" />
            </div>

            <div className="flex flex-col gap-2 md:gap-3">
              <h3 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">
                هل أنت قصة <span className="text-[#721F31]">النجاح</span> القادمة؟
              </h3>
              <p className="text-gray-500 font-medium text-base md:text-lg max-w-xl leading-relaxed">
                أنت لست مجرد رقم. شاركنا تجربتك، وكيف تغلبت على التحديات لتُلهم آلاف الشباب الأردني. قصتك تستحق أن تُروى وتصل للجميع.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsShareModalOpen(true)}
            className="relative z-10 shrink-0 group bg-[#C08F2D] hover:bg-[#a87d25] text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-black text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3 w-full md:w-auto cursor-pointer"
          >
            <span>شارك رحلتك</span>
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-2 transition-transform duration-300" strokeWidth={2.5} />
          </button>
        </motion.div>

        {/* الفلاتر */}
        <div className="bg-white p-2 md:p-2.5 rounded-2xl shadow-xl shadow-gray-200/40 border border-gray-100 flex flex-wrap md:flex-nowrap gap-2 w-full md:w-fit mb-10 md:mb-16 mx-auto justify-center">
          {categories.map(category => {
            const Icon = category.icon;
            const isActive = activeFilter === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`flex items-center justify-center gap-1.5 md:gap-2 px-3 sm:px-6 py-2.5 md:py-3.5 rounded-xl font-black text-[11px] md:text-sm transition-all duration-300 w-[calc(50%-4px)] md:w-auto cursor-pointer border ${
                  isActive 
                    ? 'bg-[#8a1538] text-white shadow-md border-[#8a1538]' 
                    : 'bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900 border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isActive ? 'text-[#C08F2D]' : ''}`} />
                <span className="truncate">{category.id}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
            className="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8"
          >
            {filteredStories.map((story) => {
              const tagStyle = getPathwayStyle(story.pathway);
              
              return (
                <div 
                  key={story.id} 
                  onClick={() => setSelectedStory(story)}
                  className="break-inside-avoid block group bg-white rounded-2xl md:rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer relative flex flex-col"
                >
                  <div className="relative h-56 md:h-64 overflow-hidden bg-gray-100 shrink-0">
                    <img src={story.image} alt={story.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
                    
                    {/* إضافة أيقونة Play إذا كان الكرت يحتوي على فيديو */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                    
                    {/* <div className="absolute top-4 right-4 md:top-5 md:right-5 z-10">
                      <span className={`flex items-center gap-1.5 px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg text-[9px] md:text-[10px] font-black backdrop-blur-md shadow-sm bg-white/95 border ${tagStyle.split(' ')[2]} ${tagStyle.split(' ')[1]}`}>
                        {story.pathway}
                      </span>
                    </div> */}

                    <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5 z-10 flex justify-between items-end">
                       <div>
                         <h3 className="font-black text-xl md:text-2xl text-white leading-tight drop-shadow-md">{story.name}</h3>
                         <p className="text-[#C08F2D] font-bold text-[11px] md:text-sm mt-1">{story.program}</p>
                       </div>
                       <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-300">
                         <ArrowUpLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
                       </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 pb-8 md:pb-10 relative bg-white flex-grow flex flex-col justify-center">
                    <div className="mb-3 md:mb-4">
                      <Quote className="w-6 h-6 md:w-8 md:h-8 text-[#C08F2D]/40 rotate-180" />
                    </div>
                    <p className="text-gray-700 text-sm md:text-[1.05rem] font-medium leading-loose md:leading-[2.1rem] text-justify relative z-10">
                      "{story.quote}"
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

      </div>

      <AnimatePresence>
        {selectedStory && (
          <StoryModal 
            story={selectedStory} 
            onClose={() => setSelectedStory(null)} 
            onNavigate={onNavigate}
            setActiveProgramName={setActiveProgramName}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isShareModalOpen && (
          <ShareStoryModal 
            isOpen={isShareModalOpen} 
            onClose={() => setIsShareModalOpen(false)} 
          />
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
}