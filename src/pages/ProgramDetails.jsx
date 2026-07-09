// src/pages/ProgramDetails.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Building2, LayoutGrid, LayoutTemplate, Clock, X, Target, Quote, MapPin, Newspaper, CalendarDays, ArrowUpLeft } from 'lucide-react';

// استيراد البيانات الحقيقية وقصص النجاح من الملف الموحد
import { programsFullData, allStories } from '../data/programsData';
import RelatedProgramStories from '../components/programs/RelatedProgramStories';

// =========================================
// بيانات الأخبار الافتراضية للبرنامج
// =========================================
const mockProgramNews = [
  { id: 1, title: 'تخريج الفوج الجديد من طلبة البرنامج بمشاركة واسعة', date: '15 يوليو 2026', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000' },
  { id: 2, title: 'توقيع اتفاقية تعاون استراتيجية لتدريب وتوظيف الخريجين', date: '02 يونيو 2026', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000' },
  { id: 3, title: 'إطلاق مسار تدريبي جديد يواكب متطلبات سوق العمل العالمي', date: '20 مايو 2026', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000' }
];

// =========================================
// مكون المودال الفخم (StoryModal)
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
        className="bg-white overflow-hidden shadow-2xl w-full flex flex-col md:flex-row mt-auto h-[90vh] rounded-t-3xl md:h-auto md:max-h-[90vh] md:max-w-5xl md:rounded-[2rem] md:mt-0"
      >
        <div className="md:hidden w-full flex justify-center pt-4 pb-2 bg-white shrink-0 rounded-t-3xl">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        <div className="w-full md:w-3/5 p-5 md:p-8 lg:p-12 overflow-y-auto flex flex-col scrollbar-hide pb-20 md:pb-8">
          <button onClick={onClose} className="hidden md:flex absolute top-6 right-6 md:relative md:top-0 md:right-0 md:self-end w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full items-center justify-center transition-colors mb-6 text-gray-500 z-10 cursor-pointer shrink-0">
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-2 bg-[#721F31]/10 text-[#721F31] px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-bold text-[11px] md:text-xs w-fit mb-4">
            <Target className="w-3.5 h-3.5 md:w-4 md:h-4" />
            {story.pathway}
          </div>

          <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-5 md:mb-8 leading-tight">{story.name}</h2>
          
          <div className="flex gap-3 md:gap-4 mb-6 md:mb-8 bg-gray-50 p-4 md:p-6 border-r-4 border-[#C08F2D] rounded-l-xl">
            <div className="mb-2 md:mb-4 shrink-0">
              <Quote className="w-6 h-6 md:w-8 md:h-8 text-[#C08F2D]/40 rotate-180" />
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
  const [selectedLocalStory, setSelectedStory] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [programName]);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#1a1c1d] font-sans relative" dir="rtl">
      
      {/* 🟢 الهيرو سكشن المحدث */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pt-28 md:pt-36 pb-10 md:pb-16">
        
        <nav className="flex flex-wrap items-center gap-2 text-[11px] md:text-[13px] font-bold text-gray-500 mb-6 md:mb-10 w-full">
          <span className="hover:text-[#8a1538] cursor-pointer transition-colors" onClick={() => onNavigate('home')}>الرئيسية</span>
          <img src="/arrow-yellow.svg" className="w-2.5 h-2.5 rotate-180 opacity-60" alt="" />
          <span className="hover:text-[#8a1538] cursor-pointer transition-colors" onClick={() => onNavigate('programs')}>برامجنا</span>
          <img src="/arrow-yellow.svg" className="w-2.5 h-2.5 rotate-180 opacity-60" alt="" />
          <span className="text-[#8a1538] font-black truncate">{currentProgram.title.split(' (')[0]}</span>
        </nav>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          
          <div className="w-full lg:w-1/2 flex flex-col items-start text-right order-2 lg:order-1">
            <div className="h-16 md:h-24 w-auto shrink-0 mb-4 md:mb-6 mix-blend-multiply">
              <img src={currentProgram.logo} alt={currentProgram.title} className="max-w-full h-full object-contain object-right" />
            </div>
            
            <h1 className="text-[2rem] sm:text-[2.25rem] md:text-[3rem] font-black tracking-tight text-[#8a1538] leading-tight mb-2">
              {currentProgram.title}
            </h1>
            {currentProgram.titleEn && (
              <h2 className="text-[1.1rem] md:text-[1.5rem] font-bold text-gray-400 font-sans tracking-wide mb-4 md:mb-6" dir="ltr" style={{ textAlign: 'left', width: '100%' }}>
                {currentProgram.titleEn}
              </h2>
            )}
            
            <p className="font-medium text-[15px] md:text-[1.1rem] leading-relaxed md:leading-[2.1rem] text-gray-600 text-justify mt-2">
              {currentProgram.about}
            </p>
          </div>

          <div className="w-full lg:w-1/2 h-[260px] sm:h-[350px] md:h-[450px] rounded-3xl md:rounded-[2.5rem] overflow-hidden flex-shrink-0 shadow-2xl relative group border border-gray-100 order-1 lg:order-2">
            {currentProgram.video ? (
              <>
                <video autoPlay loop muted playsInline className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out">
                  <source src={currentProgram.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />
                <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] md:text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2 z-10">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> لقطات حية
                </div>
              </>
            ) : (
              <>
                <img src={currentProgram.image} alt={currentProgram.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              </>
            )}
          </div>

        </div>
      </div>

      {/* 🟢 شريط معلومات أساسية */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 mb-12 md:mb-20">
        <div className="w-full bg-[#8a1538] rounded-3xl md:rounded-[2rem] py-6 md:py-10 relative overflow-hidden shadow-xl shadow-[#8a1538]/10">
          <div className="absolute inset-0 z-0 opacity-[0.1] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '200px' }} />
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-white/10">
            <div className="pt-2 sm:pt-0 px-4">
              <p className="text-white/70 text-[11px] md:text-[13px] font-bold mb-1 md:mb-2">نوع البرنامج</p>
              <p className="text-white text-base md:text-xl font-black">{currentProgram.type}</p>
            </div>
            <div className="pt-4 sm:pt-0 px-4">
              <p className="text-white/70 text-[11px] md:text-[13px] font-bold mb-1 md:mb-2">مسار البرنامج</p>
              <p className="text-[#C08F2D] text-base md:text-xl font-black">{currentProgram.pathway}</p>
            </div>
            <div className="pt-4 sm:pt-0 px-4">
              <p className="text-white/70 text-[11px] md:text-[13px] font-bold mb-1 md:mb-2">آلية التدريب</p>
              <p className="text-white text-base md:text-xl font-black">{currentProgram.mechanism}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row gap-10 lg:gap-16">
        
        {/* المحتوى الرئيسي */}
        <div className="w-full lg:w-8/12 space-y-12 md:space-y-20">
          
          {currentProgram.overview && (
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
              <h2 className="text-2xl md:text-[1.75rem] font-black mb-4 md:mb-6 flex items-center gap-3 text-[#8a1538]">
                <img src="/arrow-yellow.svg" className="w-6 h-6 shrink-0" alt="" />
                <span>تعرّف على البرنامج ونظرته الاستراتيجية</span>
              </h2>
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
                <p className="font-medium text-[14px] md:text-[1.1rem] leading-relaxed md:leading-[2.2rem] text-gray-700 text-justify">
                  {currentProgram.overview}
                </p>
              </div>
            </motion.section>
          )}

          {currentProgram.facilities && (
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
              <h2 className="text-2xl md:text-[1.75rem] font-black mb-4 md:mb-6 flex items-center gap-3 text-[#8a1538]">
                <img src="/arrow-yellow.svg" className="w-6 h-6 shrink-0" alt="" />
                <span>{currentProgram.facilitiesTitle || 'المزايا والمرافق الرئيسية'}</span>
              </h2>
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
                <ul className="space-y-4 text-gray-700 font-medium text-[14px] md:text-[1.1rem] leading-relaxed md:leading-[2rem]">
                  {currentProgram.facilities.map((fac, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#C08F2D] mt-2 shrink-0" />
                      <span className="text-justify">{fac}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>
          )}

          {/* 🟢 قسم الأخبار المدمج الفخم */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-2xl md:text-[1.75rem] font-black flex items-center gap-3 text-[#8a1538]">
                <Newspaper className="w-6 h-6 text-[#C08F2D] shrink-0" />
                <span>أحدث أخبار البرنامج</span>
              </h2>
              <button className="hidden md:flex text-[#8a1538] font-bold text-sm items-center gap-1 hover:text-[#C08F2D] transition-colors cursor-pointer group">
                كل الأخبار <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="flex flex-row md:grid md:grid-cols-2 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 scrollbar-hide">
              {mockProgramNews.map((news) => (
                <div key={news.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer shrink-0 w-[80vw] md:w-full snap-center">
                  <div className="h-40 overflow-hidden relative">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
                      <CalendarDays className="w-3.5 h-3.5 text-[#8a1538]" />
                      <span className="text-[10px] font-bold text-gray-800">{news.date}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-black text-[14px] md:text-base text-gray-900 line-clamp-2 leading-relaxed group-hover:text-[#8a1538] transition-colors">
                      {news.title}
                    </h3>
                    <div className="mt-4 flex items-center gap-2 text-[#C08F2D] font-bold text-xs">
                      اقرأ التفاصيل <ArrowUpLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {currentProgram.faqs && (
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
              <h2 className="text-2xl md:text-[1.75rem] font-black mb-4 md:mb-6 flex items-center gap-3 text-[#8a1538]">
                <img src="/arrow-yellow.svg" className="w-6 h-6 shrink-0" alt="" />
                <span>الأسئلة الأكثر تكراراً</span>
              </h2>
              <div className="space-y-3">
                {currentProgram.faqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div key={idx} className={`rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-white border border-[#8a1538]/20 shadow-md' : 'bg-white border border-gray-100 hover:border-gray-200 shadow-sm'}`}>
                      <button onClick={() => setActiveFaq(isOpen ? null : idx)} className="w-full flex items-center justify-between p-5 text-right focus:outline-none cursor-pointer">
                        <span className={`font-bold text-[14px] md:text-[1.05rem] pl-4 transition-colors ${isOpen ? 'text-[#8a1538]' : 'text-gray-800'}`}>{faq.q}</span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-[#8a1538] text-white' : 'bg-gray-50 text-[#C08F2D]'}`}>
                           <span className="text-xl font-black mt-[-2px]">{isOpen ? '−' : '+'}</span>
                        </div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <div className="px-5 pb-5 pt-0 text-[13px] md:text-[1rem] font-medium leading-relaxed md:leading-[1.9rem] text-gray-600 text-justify border-t border-gray-100 mt-2 pt-4">
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

        {/* الكرت الجانبي الثابت */}
        <div className="w-full lg:w-4/12 relative z-10 mb-8 lg:mb-0 order-first lg:order-none">
          <div className="lg:sticky lg:top-32 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 text-right shadow-xl shadow-gray-100">
            <h3 className="font-black text-xl text-gray-900 mb-6 border-b border-gray-100 pb-4">بطاقة البرنامج</h3>
            <div className="space-y-5 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-[#C08F2D]" />
                </div>
                <div>
                  <p className="text-[11px] md:text-[12px] font-bold text-gray-400 mb-0.5">آلية البرنامج</p>
                  <p className="text-[13px] md:text-[15px] font-black text-gray-800">{currentProgram.mechanism}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                  <LayoutGrid className="w-5 h-5 text-[#C08F2D]" />
                </div>
                <div>
                  <p className="text-[11px] md:text-[12px] font-bold text-gray-400 mb-0.5">نوع البرنامج</p>
                  <p className="text-[13px] md:text-[15px] font-black text-gray-800">{currentProgram.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                  <LayoutTemplate className="w-5 h-5 text-[#C08F2D]" />
                </div>
                <div>
                  <p className="text-[11px] md:text-[12px] font-bold text-gray-400 mb-0.5">مسار البرنامج</p>
                  <p className="text-[13px] md:text-[15px] font-black text-gray-800">{currentProgram.pathway}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#C08F2D]" />
                </div>
                <div>
                  <p className="text-[11px] md:text-[12px] font-bold text-gray-400 mb-0.5">لغة التدريب</p>
                  <p className="text-[13px] md:text-[15px] font-black text-gray-800">{currentProgram.languages}</p>
                </div>
              </div>
            </div>
            <button className="w-full bg-[#8a1538] hover:bg-[#680f2a] text-white px-6 py-4 rounded-2xl font-black text-[14px] md:text-[15px] transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer group">
              <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1.5 transition-transform" strokeWidth={2.5} />
              <span>تقديم طلب واستكشاف الفرص</span>
            </button>
          </div>
        </div>

      </div>

      <div className="mt-8 md:mt-12 bg-white pt-12 md:pt-16 pb-16 md:pb-24 border-t border-gray-100">
        <RelatedProgramStories 
          programName={programName} 
          onNavigate={onNavigate} 
          onStoryClick={(storyId) => {
            const targetStory = allStories.find(s => s.id === storyId);
            if (targetStory) setSelectedStory(targetStory);
          }} 
        />
      </div>

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