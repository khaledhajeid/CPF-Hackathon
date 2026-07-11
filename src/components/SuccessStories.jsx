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
      className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-[clamp(1rem,3vw,3rem)] bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: window.innerWidth < 768 ? '100%' : 20, opacity: window.innerWidth < 768 ? 1 : 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        exit={{ y: window.innerWidth < 768 ? '100%' : 20, opacity: window.innerWidth < 768 ? 1 : 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: window.innerWidth < 768 ? 250 : 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white overflow-hidden shadow-2xl w-full flex flex-col md:flex-row mt-auto h-[92vh] rounded-t-3xl md:h-auto md:max-h-[90vh] md:max-w-[clamp(800px,80vw,1200px)] md:rounded-[2rem] md:mt-0 relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 md:top-[clamp(1rem,2vw,1.5rem)] md:right-[clamp(1rem,2vw,1.5rem)] w-[clamp(2rem,3vw,2.5rem)] h-[clamp(2rem,3vw,2.5rem)] bg-white/20 md:bg-gray-100 hover:bg-white/40 md:hover:bg-gray-200 backdrop-blur-md md:backdrop-blur-none rounded-full flex items-center justify-center transition-colors text-gray-800 md:text-gray-500 z-50 cursor-pointer shadow-sm md:shadow-none">
           <X className="w-[clamp(1rem,1.5vw,1.25rem)] h-[clamp(1rem,1.5vw,1.25rem)]" />
        </button>

        <div className="md:hidden w-full absolute top-0 left-0 right-0 flex justify-center pt-3 pb-4 z-40 cursor-grab active:cursor-grabbing" onClick={onClose}>
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        <div className="w-full md:w-1/2 lg:w-[55%] p-5 pt-12 md:p-[clamp(1.5rem,4vw,3rem)] overflow-y-auto flex flex-col scrollbar-hide pb-20 md:pb-[clamp(1.5rem,4vw,3rem)] relative z-10 bg-white order-last md:order-first mt-[-20px] md:mt-0 rounded-t-3xl md:rounded-none">
          <h2 className="text-[clamp(1.25rem,3vw,2.25rem)] font-black text-gray-900 mb-[clamp(1rem,2vw,2rem)] pr-8 md:pr-0 leading-tight">{story.name}</h2>
          
          <div className="flex gap-[clamp(0.5rem,1.5vw,1rem)] mb-[clamp(1rem,3vw,2rem)] bg-gray-50 p-[clamp(1rem,2vw,1.5rem)] rounded-xl md:rounded-2xl border-r-4 border-[#C08F2D]">
            <Quote className="w-[clamp(1.25rem,2vw,2rem)] h-[clamp(1.25rem,2vw,2rem)] text-[#C08F2D]/50 rotate-180 shrink-0 mt-1" />
            <h3 className="text-[clamp(0.85rem,1.5vw,1.35rem)] font-black text-[#8a1538] leading-[1.6em]">
              {story.quote}
            </h3>
          </div>

          <p className="text-gray-700 text-[clamp(0.85rem,1.1vw,1.05rem)] leading-[clamp(1.8rem,2.2vw,2.1rem)] font-medium text-justify mb-[clamp(1.5rem,3vw,2rem)]">
            {story.fullStory}
          </p>

          <div className="mt-auto pt-[clamp(1rem,2vw,1.5rem)] border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-[clamp(1rem,2vw,1.25rem)] bg-gray-50 p-[clamp(1rem,2vw,1.5rem)] rounded-xl md:rounded-2xl border border-gray-200/60">
            <div className="w-full sm:w-auto text-right">
              <h4 className="font-black text-gray-900 mb-1 text-[clamp(0.85rem,1.2vw,1.1rem)]">ألهمتك قصة {story.name.split(' ')[0]}؟</h4>
              <p className="text-[clamp(0.65rem,1vw,0.875rem)] font-bold text-gray-500">ابدأ رحلتك الخاصة واكتشف فرصك.</p>
            </div>
            <button
              onClick={() => {
                setActiveProgramName(story.programKey);
                onClose();
                onNavigate('program_details');
              }}
              className="w-full sm:w-auto shrink-0 bg-[#8a1538] hover:bg-[#680f2a] text-white px-[clamp(1.25rem,3vw,1.75rem)] py-[clamp(0.75rem,1.5vw,0.875rem)] rounded-xl font-black text-[clamp(0.75rem,1vw,0.875rem)] transition-all duration-300 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>استكشف البرنامج</span>
              <ArrowLeft className="w-[clamp(0.75rem,1vw,1rem)] h-[clamp(0.75rem,1vw,1rem)] transform group-hover:-translate-x-1.5 transition-transform" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-[45%] relative h-[300px] md:h-auto shrink-0 bg-gray-900 flex-grow-0 md:flex-grow order-first md:order-last pb-6 md:pb-0 aspect-square md:aspect-auto">
          
          {story.video ? (
            <>
              <video 
                ref={videoRef} src={story.video} autoPlay loop muted defaultMuted playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              />
              <button
                onClick={toggleMute}
                className="absolute top-16 md:top-[clamp(1rem,2vw,1.5rem)] left-4 md:left-[clamp(1rem,2vw,1.5rem)] z-20 w-[clamp(2.25rem,3vw,2.75rem)] h-[clamp(2.25rem,3vw,2.75rem)] rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all duration-300 cursor-pointer shadow-md"
              >
                {isMuted ? <VolumeX className="w-[clamp(1rem,1.5vw,1.25rem)] h-[clamp(1rem,1.5vw,1.25rem)]" /> : <Volume2 className="w-[clamp(1rem,1.5vw,1.25rem)] h-[clamp(1rem,1.5vw,1.25rem)]" />}
              </button>
            </>
          ) : (
            <img src={story.image} alt={story.name} className="absolute inset-0 w-full h-full object-cover opacity-90" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-12 md:bottom-[clamp(1.5rem,3vw,2.5rem)] left-0 right-0 px-6 md:px-[clamp(1.5rem,4vw,2.5rem)] z-10">
            <div className="inline-flex items-center gap-[clamp(0.35rem,1vw,0.5rem)] bg-white/20 backdrop-blur-md border border-white/30 text-white px-[clamp(0.75rem,1.5vw,1rem)] py-[clamp(0.35rem,1vw,0.5rem)] rounded-full font-bold text-[clamp(0.7rem,1vw,0.875rem)] mb-[clamp(0.5rem,1.5vw,0.75rem)]">
              <MapPin className="w-[clamp(0.85rem,1.2vw,1rem)] h-[clamp(0.85rem,1.2vw,1rem)]" />
              {story.location}، الأردن
            </div>
            <h3 className="text-white font-black text-[clamp(1.25rem,2.5vw,1.5rem)] drop-shadow-md">{story.program}</h3>
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
    <div className="min-h-[100dvh] bg-[#F4F7FA] font-sans selection:bg-[#C08F2D] selection:text-white flex flex-col" dir="rtl">
      
      {/* ההيدر */}
      <div className="bg-[#1a0409] min-h-[clamp(280px,40vh,380px)] pt-[clamp(6rem,12vh,8rem)] pb-[clamp(3rem,8vh,5rem)] relative overflow-hidden rounded-b-[clamp(1.5rem,4vw,3rem)] shadow-md shrink-0 flex items-center">
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
        
        <div className="w-full max-w-[1200px] mx-auto px-[clamp(1rem,4vw,1.5rem)] relative z-10 text-center">
          <h1 className="text-[clamp(1.875rem,5vw,3.75rem)] font-black text-white mb-[clamp(0.5rem,2vw,1rem)] tracking-tight">
            قصص <span className="text-[#C08F2D]">شبابنا</span>
          </h1>
          <p className="text-white/90 text-[clamp(0.75rem,1.5vw,0.9375rem)] font-bold max-w-2xl mx-auto leading-relaxed px-2">
            لم تكن البرامج يوماً مجرد محطات عابرة، بل كانت نقطة انطلاق. تعرّف على شباب أردنيين استثمروا الفرص لتحقيق تغيير جذري في مسيراتهم.
          </p>
        </div>
      </div>

      {/* 2. حاوية المحتوى الرئيسي */}
      <div className="max-w-[1400px] xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto w-full px-[clamp(1rem,4vw,2rem)] -mt-[clamp(2rem,4vw,2.5rem)] relative z-20 flex-grow pb-[clamp(4rem,8vh,6rem)]">
        
        {/* كرت شارك رحلتك */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-[850px] mx-auto bg-white rounded-[clamp(1rem,2vw,1.5rem)] p-[clamp(1.25rem,3vw,1.75rem)] shadow-xl shadow-gray-200/50 border border-gray-100 mb-[clamp(1.5rem,4vw,2.5rem)] flex flex-col md:flex-row items-center justify-between gap-[clamp(1rem,2vw,1.5rem)] overflow-hidden z-20"
        >
          <div className="absolute top-0 right-0 w-[clamp(5rem,10vw,8rem)] h-[clamp(5rem,10vw,8rem)] bg-[#C08F2D]/10 rounded-full blur-2xl md:blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[clamp(5rem,10vw,8rem)] h-[clamp(5rem,10vw,8rem)] bg-[#8a1538]/5 rounded-full blur-2xl md:blur-3xl pointer-events-none" />
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '150px' }} />

          <div className="relative z-10 flex flex-col text-center md:text-right w-full md:w-auto">
            <div className="flex items-center justify-center md:justify-start gap-[clamp(0.5rem,1vw,1rem)] mb-[clamp(0.2rem,0.8vw,0.5rem)]">
              <div className="w-[clamp(1.2rem,1.5vw,1.75rem)] h-[clamp(1.2rem,1.5vw,1.75rem)] hidden md:flex shrink-0 items-center justify-center">
                <img src="/arrow-yellow.svg" className="w-full h-full object-contain" alt="" />
              </div>
              <h3 className="text-[clamp(1.1rem,2.2vw,1.75rem)] font-black text-gray-900 tracking-tight leading-[1.2]">
                كل واحد إله <span className="text-[#8a1538]">قصة...</span> شو قصتك؟
              </h3>
            </div>
            
            <p className="text-gray-500 font-medium text-[clamp(0.75rem,1.1vw,0.95rem)] max-w-lg leading-relaxed px-2 md:px-0 md:pr-[clamp(1.7rem,2.5vw,2.75rem)]">
              أنت لست مجرد رقم. شاركنا تجربتك، وكيف تغلبت على التحديات، قصتك تستحق أن تُروى.
            </p>
          </div>

          <button
            onClick={() => setIsShareModalOpen(true)}
            className="w-full md:w-auto mt-2 md:mt-0 relative z-10 shrink-0 group bg-[#C08F2D] hover:bg-[#a87d25] text-white px-[clamp(1.25rem,2.5vw,1.75rem)] py-[clamp(0.6rem,1.2vw,0.875rem)] rounded-[clamp(0.5rem,1vw,0.75rem)] font-black text-[clamp(0.75rem,1.1vw,0.95rem)] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-[clamp(0.35rem,0.8vw,0.5rem)] cursor-pointer"
          >
            <span>شارك رحلتك</span>
            <ArrowLeft className="w-[clamp(0.85rem,1.2vw,1rem)] h-[clamp(0.85rem,1.2vw,1rem)] transform group-hover:-translate-x-1.5 transition-transform duration-300" strokeWidth={2.5} />
          </button>
        </motion.div>

        {/* الفلاتر */}
        <div className="flex overflow-x-auto gap-[clamp(0.5rem,1vw,0.75rem)] justify-start bg-white p-[clamp(0.35rem,1vw,0.5rem)] rounded-[clamp(0.75rem,2vw,1rem)] shadow-sm border border-gray-100 mb-[clamp(2rem,6vw,4rem)] mx-auto w-full md:w-fit scrollbar-hide snap-x -mx-4 px-4 md:mx-0 md:px-0">
          {categories.map(category => {
            const Icon = category.icon;
            const isActive = activeFilter === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`flex items-center justify-center gap-[clamp(0.35rem,1vw,0.5rem)] whitespace-nowrap shrink-0 snap-center px-[clamp(1rem,3vw,1.5rem)] py-[clamp(0.5rem,1.5vw,0.875rem)] rounded-[clamp(0.5rem,1.5vw,0.75rem)] font-black text-[clamp(0.75rem,1.2vw,0.875rem)] transition-all duration-300 cursor-pointer border ${
                  isActive 
                    ? 'bg-[#8a1538] text-white shadow-md border-[#8a1538]' 
                    : 'bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900 border-transparent'
                }`}
              >
                <Icon className={`w-[clamp(0.85rem,1.2vw,1rem)] h-[clamp(0.85rem,1.2vw,1rem)] ${isActive ? 'text-[#C08F2D]' : ''}`} />
                <span>{category.id}</span>
              </button>
            );
          })}
        </div>

        {/* القصص */}
        <AnimatePresence mode="popLayout">
          {/* 🟢 تم إرجاع الكروت إلى نظام 3 أعمدة دائمًا (lg:grid-cols-3) */}
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
            className="flex flex-row overflow-x-auto snap-x snap-mandatory gap-[clamp(1rem,2vw,1.5rem)] pb-8 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredStories.map((story) => {
              const tagStyle = getPathwayStyle(story.pathway);
              
              return (
                <motion.div 
                  layout
                  key={story.id} 
                  onClick={() => setSelectedStory(story)}
                  className="w-[280px] sm:w-[320px] md:w-full shrink-0 snap-center break-inside-avoid group bg-white rounded-[clamp(1rem,3vw,2rem)] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer relative flex flex-col"
                >
                  <div className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden bg-gray-100 shrink-0">
                    <img src={story.image} alt={story.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                    
                    <div className="absolute top-[clamp(0.75rem,1.5vw,1.25rem)] right-[clamp(0.75rem,1.5vw,1.25rem)] z-10">
                      <span className={`flex items-center gap-[clamp(0.25rem,0.5vw,0.35rem)] px-[clamp(0.5rem,1vw,0.75rem)] py-[clamp(0.25rem,0.5vw,0.35rem)] rounded-[clamp(0.35rem,0.8vw,0.5rem)] text-[clamp(0.5rem,0.8vw,0.6rem)] font-black backdrop-blur-md shadow-sm bg-white/95 border ${tagStyle.split(' ')[2]} ${tagStyle.split(' ')[1]}`}>
                        {story.pathway}
                      </span>
                    </div>

                    <div className="absolute bottom-[clamp(0.75rem,1.5vw,1.25rem)] left-[clamp(0.75rem,1.5vw,1.25rem)] right-[clamp(0.75rem,1.5vw,1.25rem)] z-10 flex justify-between items-end">
                       <div>
                         <h3 className="font-black text-[clamp(1.125rem,2vw,1.5rem)] text-white leading-tight drop-shadow-md">{story.name}</h3>
                         <p className="text-[#C08F2D] font-bold text-[clamp(0.6rem,1vw,0.875rem)] mt-1">{story.program}</p>
                       </div>
                       <div className="w-[clamp(1.75rem,3vw,2.5rem)] h-[clamp(1.75rem,3vw,2.5rem)] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-300">
                         <ArrowUpLeft className="w-[clamp(0.85rem,1.5vw,1.25rem)] h-[clamp(0.85rem,1.5vw,1.25rem)] text-white" />
                       </div>
                    </div>
                  </div>

                  <div className="p-[clamp(1.25rem,3vw,2rem)] pb-[clamp(1.5rem,4vw,2.5rem)] relative bg-white flex-grow flex flex-col justify-center">
                    <div className="mb-[clamp(0.5rem,1vw,1rem)]">
                      <Quote className="w-[clamp(1.25rem,2vw,2rem)] h-[clamp(1.25rem,2vw,2rem)] text-[#C08F2D]/40 rotate-180" />
                    </div>
                    <p className="text-gray-700 text-[clamp(0.8rem,1.1vw,1.05rem)] font-medium leading-[clamp(1.7rem,2.1vw,2.1rem)] text-justify relative z-10 line-clamp-4 md:line-clamp-none">
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