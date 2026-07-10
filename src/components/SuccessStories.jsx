// src/components/SuccessStories.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import { Quote, LayoutGrid, Target, Users, X, ArrowUpLeft, ArrowLeft, MapPin, Volume2, VolumeX, BookOpen } from 'lucide-react';
import ShareStoryModal from './success/ShareStoryModal';

// استيراد البيانات من الملف الموحد
import { allStories } from '../data/programsData';

const getPathwayStyle = (pathway) => {
  switch(pathway) {
    case 'تعلّم': return 'bg-[#2b307e]/10 text-[#2b307e] border-[#2b307e]/20'; 
    case 'قُد': return 'bg-[#8a1538]/10 text-[#8a1538] border-[#8a1538]/20'; 
    case 'اصنع الأثر': return 'bg-[#1f5412]/10 text-[#1f5412] border-[#1f5412]/20'; 
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const StoryModal = ({ story, onClose, onNavigate, setActiveProgramName }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true); 

  useEffect(() => {
    if (story && story.video && videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      setIsMuted(true);
      videoRef.current.play().catch(error => {
        console.log("المتصفح منع التشغيل التلقائي:", error);
      });
    }
  }, [story]);

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
        className="bg-white overflow-hidden shadow-2xl w-full flex flex-col md:flex-row mt-auto h-[92vh] rounded-t-3xl md:h-auto md:max-h-[90vh] md:max-w-5xl md:rounded-[2rem] md:mt-0 relative"
      >
        {/* 🟢 زر الإغلاق الدائم (Mobile & Desktop) */}
        <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-white/20 md:bg-gray-100 hover:bg-white/40 md:hover:bg-gray-200 backdrop-blur-md md:backdrop-blur-none rounded-full flex items-center justify-center transition-colors text-gray-800 md:text-gray-500 z-50 cursor-pointer shadow-sm md:shadow-none">
           <X className="w-5 h-5" />
        </button>

        {/* شريط السحب للموبايل الدال على الإغلاق */}
        <div className="md:hidden w-full absolute top-0 left-0 right-0 flex justify-center pt-3 pb-4 z-40 cursor-grab active:cursor-grabbing" onClick={onClose}>
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        {/* القسم الأيمن للمودال */}
        <div className="w-full md:w-1/2 lg:w-[55%] p-5 pt-12 md:p-8 lg:p-12 overflow-y-auto flex flex-col scrollbar-hide pb-20 md:pb-8 relative z-10 bg-white order-last md:order-first mt-[-20px] md:mt-0 rounded-t-3xl md:rounded-none">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4 md:mb-8 pr-8 md:pr-0">{story.name}</h2>
          
          <div className="flex gap-2.5 md:gap-4 mb-5 md:mb-8 bg-gray-50 p-4 md:p-6 rounded-xl md:rounded-2xl border-r-4 border-[#C08F2D]">
            <Quote className="w-5 h-5 md:w-8 md:h-8 text-[#C08F2D]/50 rotate-180 shrink-0" />
            <h3 className="text-[13px] md:text-[1.2rem] lg:text-[1.35rem] font-black text-[#8a1538] leading-[1.8em]">
              {story.quote}
            </h3>
          </div>

          <p className="text-gray-700 text-[13px] md:text-base lg:text-[1.05rem] leading-[2.1rem] font-medium text-justify mb-8">
            {story.fullStory}
          </p>

          <div className="mt-auto pt-5 md:pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-5 bg-gray-50 p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-200/60">
            <div className="w-full sm:w-auto text-right">
              <h4 className="font-black text-gray-900 mb-1 text-[13px] md:text-[1.1rem]">ألهمتك قصة {story.name.split(' ')[0]}؟</h4>
              <p className="text-[10px] md:text-sm font-bold text-gray-500">ابدأ رحلتك الخاصة واكتشف فرصك.</p>
            </div>
            <button
              onClick={() => {
                setActiveProgramName(story.programKey);
                onClose();
                onNavigate('program_details');
              }}
              className="w-full sm:w-auto shrink-0 bg-[#8a1538] hover:bg-[#680f2a] text-white px-5 md:px-7 py-3 md:py-3.5 rounded-xl font-black text-xs md:text-sm transition-all duration-300 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>استكشف البرنامج</span>
              <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 transform group-hover:-translate-x-1.5 transition-transform" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* القسم الأيسر للمودال */}
        <div className="w-full md:w-1/2 lg:w-[45%] relative h-[300px] md:h-auto shrink-0 bg-gray-900 flex-grow-0 md:flex-grow order-first md:order-last pb-6 md:pb-0">
          
          {story.video ? (
            <>
              <video 
                ref={videoRef} src={story.video} autoPlay loop muted defaultMuted playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              />
              <button
                onClick={toggleMute}
                className="absolute top-16 md:top-6 left-4 md:left-6 z-20 w-9 h-9 md:w-11 md:h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all duration-300 cursor-pointer shadow-md"
              >
                {isMuted ? <VolumeX className="w-4 h-4 md:w-5 md:h-5" /> : <Volume2 className="w-4 h-4 md:w-5 md:h-5" />}
              </button>
            </>
          ) : (
            <img src={story.image} alt={story.name} className="absolute inset-0 w-full h-full object-cover opacity-90" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
          
          {/* رفع المحتوى للأعلى قليلاً على الموبايل لتجنب التداخل مع الجزء الأبيض */}
          <div className="absolute bottom-12 md:bottom-10 left-0 right-0 px-6 md:px-10 z-10">
            <div className="inline-flex items-center gap-1.5 md:gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full font-bold text-xs md:text-sm mb-2 md:mb-3">
              <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" />
              {story.location}، الأردن
            </div>
            <h3 className="text-white font-black text-xl md:text-2xl drop-shadow-md">{story.program}</h3>
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
    { id: 'تعلّم', icon: BookOpen },
    { id: 'قُد', icon: Target },
    { id: 'اصنع الأثر', icon: Users },
  ];

  const filteredStories = activeFilter === 'الكل' 
    ? allStories 
    : allStories.filter(s => s.pathway === activeFilter);

  return (
    <div className="min-h-screen bg-[#F4F7FA] font-sans selection:bg-[#C08F2D] selection:text-white flex flex-col" dir="rtl">
      
      {/* ההيدر */}
      <div className="bg-[#1a0409] h-[280px] md:h-[380px] pt-24 md:pt-32 pb-12 md:pb-20 relative overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem] shadow-md shrink-0">
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
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-2 md:mb-4 tracking-tight mt-4 md:mt-0">
            قصص <span className="text-[#C08F2D]">شبابنا</span>
          </h1>
          <p className="text-white/90 text-[12px] md:text-[15px] font-bold max-w-2xl mx-auto leading-relaxed px-2 mt-2">
            لم تكن البرامج يوماً مجرد محطات عابرة، بل كانت نقطة انطلاق. تعرّف على شباب أردنيين استثمروا الفرص لتحقيق تغيير جذري في مسيراتهم.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-10 relative z-20 flex-grow pb-16 md:pb-24">
        
        {/* كرت شارك رحلتك */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-[1000px] mx-auto bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 shadow-xl shadow-gray-200/50 border border-gray-100 mb-8 md:mb-12 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-8 overflow-hidden z-20"
        >
          <div className="absolute top-0 right-0 w-32 md:w-48 h-32 md:h-48 bg-[#C08F2D]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 md:w-48 h-32 md:h-48 bg-[#8a1538]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '200px' }} />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start text-center md:text-right gap-3 md:gap-5 w-full md:w-auto">
            <div className="w-6 h-6 md:w-7 md:h-7 object-contain md:mt-1 hidden md:block">
              <img src="/arrow-yellow.svg" className="w-full h-full object-contain" alt="" />
            </div>

            <div className="flex flex-col gap-1.5 md:gap-3">
              <h3 className="text-xl md:text-4xl font-black text-gray-900 tracking-tight">
               كل واحد إله <span className="text-[#8a1538]">قصة...</span> شو قصتك؟
              </h3>
              <p className="text-gray-500 font-medium text-[13px] md:text-lg max-w-xl leading-relaxed">
                أنت لست مجرد رقم. شاركنا تجربتك، وكيف تغلبت على التحديات، قصتك تستحق أن تُروى.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsShareModalOpen(true)}
            className="w-full md:w-auto mt-2 md:mt-0 relative z-10 shrink-0 group bg-[#C08F2D] hover:bg-[#a87d25] text-white px-6 py-3.5 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black text-sm md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 md:gap-3 cursor-pointer"
          >
            <span>شارك رحلتك</span>
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 transform group-hover:-translate-x-2 transition-transform duration-300" strokeWidth={2.5} />
          </button>
        </motion.div>

        {/* الفلاتر */}
        <div className="flex overflow-x-auto gap-2 justify-start bg-white p-1.5 md:p-2.5 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 mb-8 md:mb-16 mx-auto w-full md:w-fit scrollbar-hide snap-x -mx-4 px-4 md:mx-0 md:px-0">
          {categories.map(category => {
            const Icon = category.icon;
            const isActive = activeFilter === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`flex items-center justify-center gap-1.5 md:gap-2 whitespace-nowrap shrink-0 snap-center px-4 sm:px-6 py-2 md:py-3.5 rounded-lg md:rounded-xl font-black text-[12px] md:text-sm transition-all duration-300 cursor-pointer border ${
                  isActive 
                    ? 'bg-[#8a1538] text-white shadow-md border-[#8a1538]' 
                    : 'bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900 border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isActive ? 'text-[#C08F2D]' : ''}`} />
                <span>{category.id}</span>
              </button>
            );
          })}
        </div>

        {/* 🟢 القصص مع حل مشكلة الفلتر (إضافة key للمصفوفة) */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeFilter} // 🟢 هذا المفتاح يضمن أن Framer Motion سيعيد رسم العناصر بشكل صحيح عند تغير الفلتر
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
            className="flex flex-row overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-8 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredStories.map((story) => {
              const tagStyle = getPathwayStyle(story.pathway);
              
              return (
                <motion.div 
                  layout // 🟢 يضمن تحرك الكروت بسلاسة لملء الفراغات عند الفلترة
                  key={story.id} 
                  onClick={() => setSelectedStory(story)}
                  className="w-[280px] sm:w-[320px] md:w-full shrink-0 snap-center break-inside-avoid group bg-white rounded-2xl md:rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer relative flex flex-col"
                >
                  <div className="relative h-48 md:h-64 overflow-hidden bg-gray-100 shrink-0">
                    <img src={story.image} alt={story.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                    
                    <div className="absolute top-3 right-3 md:top-5 md:right-5 z-10">
                      <span className={`flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-md md:rounded-lg text-[9px] md:text-[10px] font-black backdrop-blur-md shadow-sm bg-white/95 border ${tagStyle.split(' ')[2]} ${tagStyle.split(' ')[1]}`}>
                        {story.pathway}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 md:bottom-5 md:left-5 md:right-5 z-10 flex justify-between items-end">
                       <div>
                         <h3 className="font-black text-lg md:text-2xl text-white leading-tight drop-shadow-md">{story.name}</h3>
                         <p className="text-[#C08F2D] font-bold text-[10px] md:text-sm mt-1">{story.program}</p>
                       </div>
                       <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-300">
                         <ArrowUpLeft className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" />
                       </div>
                    </div>
                  </div>

                  <div className="p-5 md:p-8 pb-6 md:pb-10 relative bg-white flex-grow flex flex-col justify-center">
                    <div className="mb-2 md:mb-4">
                      <Quote className="w-5 h-5 md:w-8 md:h-8 text-[#C08F2D]/40 rotate-180" />
                    </div>
                    <p className="text-gray-700 text-[13px] md:text-[1.05rem] font-medium leading-relaxed md:leading-[2.1rem] text-justify relative z-10 line-clamp-4 md:line-clamp-none">
                      "{story.quote}"
                    </p>
                  </div>
                </motion.div>
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
      
      <Footer onNavigate={onNavigate}/>
    </div>
  );
}