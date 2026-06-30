// src/pages/ProgramDetails.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Building2, LayoutGrid, LayoutTemplate, Clock, X, Target, Quote, MapPin } from 'lucide-react';
// 🟢 استيراد البيانات الحقيقية وقصص النجاح من الملف الموحد
import { programsFullData, allStories } from '../data/programsData';
import RelatedProgramStories from '../components/programs/RelatedProgramStories';

// =========================================
// مكون المودال الفخم (StoryModal) معروض محلياً هنا
// =========================================
const StoryModal = ({ story, onClose, onNavigate, setActiveProgramName }) => {
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
        <div className="md:hidden w-full flex justify-center pt-4 pb-2 bg-white shrink-0 rounded-t-3xl">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        <div className="w-full md:w-3/5 p-6 md:p-8 lg:p-12 overflow-y-auto flex flex-col scrollbar-hide pb-20 md:pb-8">
          <button onClick={onClose} className="hidden md:flex absolute top-6 right-6 md:relative md:top-0 md:right-0 md:self-end w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full items-center justify-center transition-colors mb-6 text-gray-500 z-10 cursor-pointer shrink-0">
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-2 bg-[#721F31]/10 text-[#721F31] px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-bold text-[11px] md:text-xs w-fit mb-4">
            <Target className="w-3.5 h-3.5 md:w-4 md:h-4" />
            {story.pathway}
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-6 md:mb-8">{story.name}</h2>
          
          <div className="flex gap-3 md:gap-4 mb-6 md:mb-8 bg-gray-50 p-5 md:p-6 border-r-4 border-[#C08F2D]">
            <div className="mb-3 md:mb-4">
              <Quote className="w-6 h-6 md:w-8 md:h-8 text-[#C08F2D]/40 rotate-180" />
            </div>
            <p className="text-gray-700 text-sm md:text-[1.05rem] font-medium leading-loose md:leading-[2.1rem] text-justify relative z-10">
              "{story.quote}"
            </p>
          </div>

          <div className="flex-grow mt-2">
            <p className="text-gray-600 text-base md:text-lg leading-relaxed text-justify font-medium">
              {story.fullStory}
            </p>
          </div>
        </div>

        {/* جانب الصورة اللامع */}
        <div className="hidden md:block md:w-2/5 relative min-h-[400px] bg-gray-900">
          <img src={story.image} alt={story.name} className="w-full h-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-10 left-0 right-0 px-10">
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

export default function ProgramDetails({ onNavigate, programName = 'جامعة الحسين التقنية', setActiveProgramName }) {
  const currentProgram = programsFullData[programName] || programsFullData['جامعة الحسين التقنية'];
  const [activeFaq, setActiveFaq] = useState(null);
  
  // 🟢 State محلية للتحكم بالقصة المختارة وفتح المودال في نفس الصفحة
  const [selectedLocalStory, setSelectedStory] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [programName]);

  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-white text-[#1a1c1d] font-sans relative" dir="rtl">
      
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 pt-36 pb-16">
        
        {/* شريط المسار */}
        <nav className="flex items-center gap-2 text-[13px] font-bold text-gray-500 mb-10 w-full">
          <span className="hover:text-[#8a1538] cursor-pointer transition-colors" onClick={() => onNavigate('home')}>الرئيسية</span>
          <img src="/arrow-yellow.svg" className="w-2.5 h-2.5 rotate-180 opacity-60" alt="" />
          <span className="hover:text-[#8a1538] cursor-pointer transition-colors" onClick={() => onNavigate('programs')}>برامجنا</span>
          <img src="/arrow-yellow.svg" className="w-2.5 h-2.5 rotate-180 opacity-60" alt="" />
          <span className="text-gray-900 font-black">{currentProgram.title.split(' (')[0]}</span>
        </nav>

        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-24">
          
          <div className="w-full lg:w-1/2 flex flex-col items-start text-right">
            <div className="h-24 w-auto shrink-0 mb-6 mix-blend-multiply">
              <img src={currentProgram.logo} alt={currentProgram.title} className="max-w-full h-full object-contain object-right" />
            </div>
            
            <h1 className="text-[2.25rem] md:text-[2.75rem] font-black tracking-tight text-gray-900 leading-tight mb-2">
              {currentProgram.title}
            </h1>
            {currentProgram.titleEn && (
              <h2 className="text-[1.25rem] md:text-[1.5rem] font-bold text-gray-400 font-sans tracking-wide mb-6" dir="ltr" style={{ textAlign: 'left', width: '100%' }}>
                {currentProgram.titleEn}
              </h2>
            )}
            
            <p className="font-medium text-[1.1rem] leading-[2.1rem] text-gray-600 text-justify mt-2">
              {currentProgram.about}
            </p>
          </div>

          <div className="w-full lg:w-1/2 h-[320px] md:h-[400px] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden flex-shrink-0 shadow-2xl shadow-gray-200/50 relative group border border-gray-100/50">
            {currentProgram.video ? (
              <>
                <video autoPlay loop muted playsInline className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out">
                  <source src={currentProgram.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2 z-10">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> لقطات حية
                </div>
              </>
            ) : (
              <>
                <img src={currentProgram.image} alt={currentProgram.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </>
            )}
          </div>

        </div>
      </div>

      {/* شريط معلومات أساسية */}
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 mb-20">
        <div className="w-full bg-gradient-to-l from-[#8a1538] to-[#680f2a] rounded-[1.5rem] py-10 md:py-12 relative overflow-hidden shadow-md">
          <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '200px 200px', backgroundRepeat: 'repeat' }} />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="md:border-l md:border-white/10 md:pl-6">
              <p className="text-white/70 text-[13px] font-bold mb-2">نوع البرنامج</p>
              <p className="text-white text-lg md:text-xl font-black">{currentProgram.type}</p>
            </div>
            <div className="md:border-l md:border-white/10 md:px-6">
              <p className="text-white/70 text-[13px] font-bold mb-2">مسار البرنامج</p>
              <p className="text-white text-lg md:text-xl font-black">{currentProgram.pathway}</p>
            </div>
            <div className="md:pr-6">
              <p className="text-white/70 text-[13px] font-bold mb-2">آلية التدريب</p>
              <p className="text-white text-lg md:text-xl font-black">{currentProgram.mechanism}</p>
            </div>
          </div>
        </div>
      </div>

      {/* تفاصيل المحتوى والأسئلة الشائعة */}
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-16 lg:gap-20">
        <div className="w-full lg:w-8/12 space-y-16">
          {currentProgram.overview && (
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-[1.5rem] md:text-[1.75rem] font-black mb-6 flex items-center gap-3 text-gray-900">
                <img src="/arrow-yellow.svg" className="w-6 h-6 shrink-0" alt="" />
                <span>تعرّف على البرنامج ونظرته الاستراتيجية</span>
              </h2>
              <p className="font-medium text-[1.1rem] leading-[2.2rem] text-gray-600 text-justify">
                {currentProgram.overview}
              </p>
            </motion.section>
          )}

          {currentProgram.facilities && (
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-[1.5rem] md:text-[1.75rem] font-black mb-6 flex items-center gap-3 text-gray-900">
                <img src="/arrow-yellow.svg" className="w-6 h-6 shrink-0" alt="" />
                <span>{currentProgram.facilitiesTitle || 'المزايا والمرافق الرئيسية'}</span>
              </h2>
              <ul className="space-y-4 pr-2 text-gray-700 font-medium text-[1.1rem] leading-[2rem]">
                {currentProgram.facilities.map((fac, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#C08F2D] mt-2.5 shrink-0" />
                    <span className="text-justify">{fac}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {currentProgram.degrees && (
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-[1.5rem] md:text-[1.75rem] font-black mb-8 flex items-center gap-3 text-gray-900">
                <img src="/arrow-yellow.svg" className="w-6 h-6 shrink-0" alt="" />
                <span>الدرجات والشهادات التي تقدّمها</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentProgram.degrees.map((degree, idx) => (
                  <div key={idx} className="group bg-white border border-gray-100 hover:border-[#8a1538]/30 rounded-[1.2rem] p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="w-20 h-20 mb-6 flex items-center justify-center bg-gray-50 rounded-full group-hover:bg-[#8a1538]/10 transition-colors">
                      <degree.icon className="w-10 h-10 text-[#8a1538]" strokeWidth={1.5} />
                    </div>
                    <span className="font-bold text-gray-800 text-[15px] leading-relaxed group-hover:text-[#8a1538] transition-colors">{degree.label}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {currentProgram.faqs && (
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-[1.5rem] md:text-[1.75rem] font-black mb-6 flex items-center gap-3 text-gray-900">
                <img src="/arrow-yellow.svg" className="w-6 h-6 shrink-0" alt="" />
                <span>الأسئلة الأكثر تكراراً</span>
              </h2>
              <div className="space-y-3">
                {currentProgram.faqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div key={idx} className={`rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-gray-50 border border-gray-200' : 'bg-[#F8FAFC] border border-transparent'}`}>
                      <button onClick={() => setActiveFaq(isOpen ? null : idx)} className="w-full flex items-center justify-between p-5 text-right focus:outline-none cursor-pointer">
                        <span className={`font-bold text-[1.05rem] pl-4 transition-colors ${isOpen ? 'text-[#8a1538]' : 'text-gray-800'}`}>{faq.q}</span>
                        <span className="text-2xl font-black text-[#C08F2D] shrink-0">{isOpen ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <div className="px-5 pb-5 pt-0 text-[1rem] font-medium leading-[1.9rem] text-gray-600 text-justify border-t border-gray-200/50 mt-2 pt-4">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          )}
        </div>

        {/* الكرت الثابت الجانبي */}
        <div className="w-full lg:w-4/12 relative z-10">
          <div className="sticky top-32 bg-[#F8FAFC] border border-gray-100 rounded-[1.5rem] p-8 md:p-10 text-right shadow-sm">
            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                  <Building2 className="w-5 h-5 text-[#8a1538]" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-gray-400 mb-0.5">آلية البرنامج</p>
                  <p className="text-[15px] font-black text-gray-800">{currentProgram.mechanism}</p>
                </div>
              </div>
              <div className="w-full h-[1px] bg-gray-200" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                  <LayoutGrid className="w-5 h-5 text-[#8a1538]" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-gray-400 mb-0.5">نوع البرنامج</p>
                  <p className="text-[15px] font-black text-gray-800">{currentProgram.type}</p>
                </div>
              </div>
              <div className="w-full h-[1px] bg-gray-200" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                  <LayoutTemplate className="w-5 h-5 text-[#8a1538]" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-gray-400 mb-0.5">مسار البرنامج</p>
                  <p className="text-[15px] font-black text-gray-800">{currentProgram.pathway}</p>
                </div>
              </div>
              <div className="w-full h-[1px] bg-gray-200" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                  <Clock className="w-5 h-5 text-[#8a1538]" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-gray-400 mb-0.5">لغة التدريب</p>
                  <p className="text-[15px] font-black text-gray-800">{currentProgram.languages}</p>
                </div>
              </div>
            </div>
            <button className="w-full bg-[#8a1538] hover:bg-[#680f2a] text-white px-8 py-4 rounded-xl font-bold text-[15px] transition-colors flex items-center justify-center gap-3 shadow-md cursor-pointer group">
              <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1.5 transition-transform" strokeWidth={2.5} />
              <span>تقديم طلب ومتابعة الفرص</span>
            </button>
          </div>
        </div>
      </div>

      {/* 🟢 الكومبوننت الفرعي للقصص - تم تعديله ليفتح المودال محلياً هنا في نفس الصفحة */}
      <RelatedProgramStories 
        programName={programName} 
        onNavigate={onNavigate} 
        onStoryClick={(storyId) => {
          const targetStory = allStories.find(s => s.id === storyId);
          if (targetStory) setSelectedStory(targetStory);
        }} 
      />

      {/* 🟢 عرض المودال محلياً داخل الصفحة بدلاً من الانتقال لصفحة أخرى */}
      <AnimatePresence>
        {selectedLocalStory && (
          <StoryModal 
            story={selectedLocalStory} 
            onClose={() => setSelectedStory(null)} 
            onNavigate={onNavigate}
            setActiveProgramName={setActiveProgramName}
          />
        )}
      </AnimatePresence>

    </div>
  );
}