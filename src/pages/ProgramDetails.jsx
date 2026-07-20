// src/pages/ProgramDetails.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Building2, LayoutGrid, LayoutTemplate, Clock, X, Target, Quote, MapPin, Newspaper, CalendarDays, ArrowUpLeft, ExternalLink, Award, Users, Languages, Circle } from 'lucide-react';

import { programsFullData, allStories } from '../data/programsData';
import RelatedProgramStories from '../components/programs/RelatedProgramStories';
import { newsList } from '../data/newsData';
import NewsDetailModal from '../components/news/NewsDetailModal';
import Footer from '../components/Footer';
import useEscapeKey from '../hooks/useEscapeKey';
import { getPathwayColor, getPathwayBadgeClass } from '../utils/pathwayColors';

// 🟢 خريطة أيقونات لحقول بطاقة البرنامج الديناميكية (metaDetails)
const metaIconMap = {
  'نوع البرنامج': LayoutGrid,
  'اللغة': Languages,
  'آلية التعلّم': Building2,
  'آلية البرنامج': Building2,
  'الشهادات': Award,
  'الفئة المناسبة': Users,
  'الفئة العمرية': Users,
  'المدة': CalendarDays,
};
const getMetaIcon = (label) => metaIconMap[label] || LayoutGrid;

const StoryModal = ({ story, onClose }) => {
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
};

export default function ProgramDetails({ onNavigate, programName = 'جامعة الحسين التقنية', setActiveProgramName }) {
  const currentProgram = programsFullData[programName] || programsFullData['جامعة الحسين التقنية'];
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedLocalStory, setSelectedStory] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null); 

  const programNews = newsList.filter(news => news.programKey === programName);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [programName]);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#1a1c1d] font-sans relative" dir="rtl">
      
      {/* الهيرو سكشن */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pt-28 md:pt-36 lg:pt-28 2xl:pt-36 pb-10 md:pb-16 lg:pb-12 2xl:pb-16">
        
        <nav className="flex flex-wrap items-center gap-2 text-[11px] md:text-[13px] font-bold text-gray-500 mb-6 md:mb-10 lg:mb-8 w-full">
          <span className="hover:text-[#8a1538] cursor-pointer transition-colors" onClick={() => onNavigate('home')}>الرئيسية</span>
          <img src="/arrow-yellow.svg" className="w-2.5 h-2.5 rotate-180 opacity-60" alt="" />
          <span className="hover:text-[#8a1538] cursor-pointer transition-colors" onClick={() => onNavigate('programs')}>برامجنا</span>
          <img src="/arrow-yellow.svg" className="w-2.5 h-2.5 rotate-180 opacity-60" alt="" />
          <span className="text-[#8a1538] font-black truncate">{currentProgram.title.split(' (')[0]}</span>
        </nav>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 2xl:gap-16">
          
          <div className="w-full lg:w-1/2 flex flex-col items-start text-right order-2 lg:order-1">
            <div className="h-16 md:h-24 lg:h-20 w-auto shrink-0 mb-4 md:mb-6 mix-blend-multiply">
              <img src={currentProgram.logo} alt={currentProgram.title} className="max-w-full h-full object-contain object-right" />
            </div>
            
            <h1 className="text-[2rem] sm:text-[2.25rem] md:text-[3rem] lg:text-[2.5rem] 2xl:text-[3rem] font-black tracking-tight text-[#8a1538] leading-tight mb-2">
              {currentProgram.title}
            </h1>
            {currentProgram.titleEn && (
              <h2 className="text-[1.1rem] md:text-[1.5rem] lg:text-[1.25rem] 2xl:text-[1.5rem] font-bold text-gray-500 font-sans tracking-wide mb-4 md:mb-6" dir="ltr" style={{ textAlign: 'left', width: '100%' }}>
                {currentProgram.titleEn}
              </h2>
            )}
            
            <p className="font-medium text-[15px] md:text-[1.1rem] lg:text-[1rem] 2xl:text-[1.1rem] leading-relaxed md:leading-[2.1rem] lg:leading-[1.9rem] 2xl:leading-[2.1rem] text-gray-600 text-justify mt-2">
              {currentProgram.about}
            </p>
          </div>

          <div className="w-full lg:w-1/2 h-[260px] sm:h-[350px] md:h-[450px] lg:h-[350px] xl:h-[380px] 2xl:h-[450px] rounded-3xl md:rounded-[2.5rem] overflow-hidden flex-shrink-0 shadow-2xl relative group border border-gray-100 order-1 lg:order-2">
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

      {/* 🟢 شريط توقيع البرنامج (جملة تحريرية بدلاً من تكرار بيانات بطاقة البرنامج) */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 mb-12 md:mb-20 lg:mb-16 2xl:mb-20">
        <div className="w-full bg-[#721F31] rounded-2xl md:rounded-[2rem] py-8 sm:py-10 md:py-14 lg:py-10 2xl:py-14 relative overflow-hidden shadow-xl shadow-[#721F31]/10">
          <div className="absolute inset-0 z-0 opacity-[0.1] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '200px' }} />
          <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-l from-transparent via-[#C08F2D] to-transparent" />
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <Quote className="w-7 h-7 md:w-8 md:h-8 text-[#C08F2D]/60 mx-auto mb-4" />
            <p className="text-white text-[1.15rem] sm:text-2xl md:text-3xl lg:text-[1.75rem] 2xl:text-3xl font-black leading-snug">
              {currentProgram.tagline || 'جزء من منظومة مؤسسة ولي العهد لتمكين الشباب الأردني'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row gap-10 lg:gap-12 2xl:gap-16">
        
        {/* المحتوى الرئيسي */}
        <div className="w-full lg:w-8/12 space-y-12 md:space-y-20 lg:space-y-16 2xl:space-y-20">
          
          {currentProgram.overview && (
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
              <h2 className="text-2xl md:text-[1.75rem] lg:text-[1.5rem] 2xl:text-[1.75rem] font-black mb-4 md:mb-6 lg:mb-4 text-[#8a1538]">
                تعرّف على البرنامج ونظرته الاستراتيجية
              </h2>
              <div className="bg-white p-6 md:p-8 lg:p-6 2xl:p-8 rounded-3xl border border-gray-100 shadow-sm">
                <p className="font-medium text-[14px] md:text-[1.1rem] lg:text-[1rem] 2xl:text-[1.1rem] leading-relaxed md:leading-[2.2rem] lg:leading-[2rem] 2xl:leading-[2.2rem] text-gray-700 text-justify">
                  {currentProgram.overview}
                </p>
              </div>
            </motion.section>
          )}

          {currentProgram.facilities && (
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
              <h2 className="text-2xl md:text-[1.75rem] lg:text-[1.5rem] 2xl:text-[1.75rem] font-black mb-4 md:mb-6 lg:mb-4 text-[#8a1538]">
                {currentProgram.facilitiesTitle || 'المزايا والمرافق الرئيسية'}
              </h2>
              <div className="bg-white p-6 md:p-8 lg:p-6 2xl:p-8 rounded-3xl border border-gray-100 shadow-sm">
                <ul className="space-y-4 lg:space-y-3 2xl:space-y-4 text-gray-700 font-medium text-[14px] md:text-[1.1rem] lg:text-[1rem] 2xl:text-[1.1rem] leading-relaxed md:leading-[2rem] lg:leading-[1.8rem] 2xl:leading-[2rem]">
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

          {currentProgram.workAreas && (
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
              <h2 className="text-2xl md:text-[1.75rem] lg:text-[1.5rem] 2xl:text-[1.75rem] font-black mb-4 md:mb-6 lg:mb-4 text-[#8a1538]">
                {currentProgram.workAreasTitle || 'مجالات العمل'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 bg-white p-6 md:p-8 lg:p-6 2xl:p-8 rounded-3xl border border-gray-100 shadow-sm">
                {currentProgram.workAreas.map((area, idx) => (
                  <div key={idx}>
                    <h3 className="font-black text-gray-900 text-[15px] md:text-[1.05rem] mb-2 pb-2 border-b-2 border-gray-200 inline-block">
                      {area.title}
                    </h3>
                    <p className="text-gray-600 font-medium text-[13px] md:text-[14px] leading-relaxed text-justify mt-2">
                      {area.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {currentProgram.iconCards && (
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
              <h2 className="text-2xl md:text-[1.75rem] lg:text-[1.5rem] 2xl:text-[1.75rem] font-black mb-4 md:mb-6 lg:mb-4 text-[#8a1538]">
                {currentProgram.iconCardsTitle || 'مبادراتنا الموسمية'}
              </h2>
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-gray-100">
                {currentProgram.iconCards.map((card, idx) => {
                  const Icon = card.icon;
                  const tint = idx % 3 === 0
                    ? { bg: 'bg-[#C08F2D]/10', text: 'text-[#C08F2D]' }
                    : idx % 3 === 1
                    ? { bg: 'bg-[#8a1538]/8', text: 'text-[#8a1538]' }
                    : { bg: 'bg-gray-100', text: 'text-gray-500' };
                  return (
                    <div key={idx} className="p-5 md:p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-9 h-9 rounded-lg ${tint.bg} flex items-center justify-center shrink-0`}>
                          <Icon className={`w-4 h-4 ${tint.text}`} />
                        </div>
                        <h3 className="font-black text-gray-900 text-[14px] md:text-[15px]">{card.title}</h3>
                      </div>
                      <p className="text-gray-600 font-medium text-[12.5px] md:text-[13px] leading-relaxed text-justify">
                        {card.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          )}

          {currentProgram.subInitiatives && (
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
              <h2 className="text-2xl md:text-[1.75rem] lg:text-[1.5rem] 2xl:text-[1.75rem] font-black mb-4 md:mb-6 lg:mb-4 text-[#8a1538]">
                {currentProgram.subInitiativesTitle || 'مبادرات ومراكز مرتبطة'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                {currentProgram.subInitiatives.map((item, idx) => {
                  const Icon = item.icon;
                  const isMailto = item.ctaUrl?.startsWith('mailto:');
                  return (
                    <div key={idx} className="bg-white p-6 md:p-7 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        {item.logo ? (
                          <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 p-2">
                            <img src={item.logo} alt={item.name} className="w-full h-full object-contain" />
                          </div>
                        ) : Icon ? (
                          <div className="w-11 h-11 rounded-xl bg-[#8a1538]/8 flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 text-[#8a1538]" />
                          </div>
                        ) : null}
                        <div>
                          <h3 className="font-black text-gray-900 text-[15px] md:text-base leading-tight">{item.name}</h3>
                          {item.subtitle && <p className="text-gray-500 font-bold text-[12px] md:text-[13px]">{item.subtitle}</p>}
                        </div>
                      </div>
                      <p className="text-gray-600 font-medium text-[13px] md:text-[14px] leading-relaxed text-justify mb-5 flex-grow">
                        {item.description}
                      </p>
                      {item.ctaUrl && (
                        <a
                          href={item.ctaUrl}
                          target={isMailto ? undefined : '_blank'}
                          rel={isMailto ? undefined : 'noopener noreferrer'}
                          className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-[#8a1538] hover:text-[#8a1538] text-gray-700 px-5 py-2.5 rounded-xl font-bold text-[13px] transition-colors w-fit shadow-sm"
                        >
                          {item.ctaLabel}
                          <ArrowUpLeft className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.section>
          )}

          {currentProgram.spotlightSection && (
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
              <div className="relative overflow-hidden rounded-3xl bg-[#721F31] px-6 py-10 md:px-10 md:py-12 text-center shadow-xl">
                <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '220px' }} />
                <div className="relative z-10 max-w-xl mx-auto">
                  <h2 className="text-xl md:text-2xl font-black text-white mb-3">{currentProgram.spotlightSection.title}</h2>
                  <p className="text-white/85 font-medium text-[14px] md:text-[15px] leading-relaxed mb-7">
                    {currentProgram.spotlightSection.text}
                  </p>
                  <button
                    onClick={() => {
                      const targetEl = document.querySelector(currentProgram.spotlightSection.ctaAnchor);
                      targetEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="inline-flex items-center gap-2 bg-transparent border-2 border-white/40 hover:border-white text-white px-6 py-3 rounded-xl font-black text-[13px] md:text-sm transition-colors cursor-pointer"
                  >
                    {currentProgram.spotlightSection.ctaLabel}
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.section>
          )}

          {programNews.length > 0 && (
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
                    onClick={() => setSelectedNews(news)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedNews(news); } }}
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
          )}

          {currentProgram.faqs && (
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
              <h2 className="text-2xl md:text-[1.75rem] lg:text-[1.5rem] 2xl:text-[1.75rem] font-black mb-4 md:mb-6 lg:mb-4 text-[#8a1538]">
                الأسئلة الأكثر تكراراً
              </h2>
              <div className="space-y-3">
                {currentProgram.faqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div key={idx} className={`rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-white border border-[#8a1538]/20 shadow-md' : 'bg-white border border-gray-100 hover:border-gray-200 shadow-sm'}`}>
                      <button onClick={() => setActiveFaq(isOpen ? null : idx)} className="w-full flex items-center justify-between p-5 lg:p-4 2xl:p-5 text-right cursor-pointer rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C08F2D] focus-visible:ring-offset-2">
                        <span className={`font-bold text-[14px] md:text-[1.05rem] lg:text-[15px] 2xl:text-[1.05rem] pl-4 transition-colors ${isOpen ? 'text-[#8a1538]' : 'text-gray-800'}`}>{faq.q}</span>
                        <div className={`w-8 h-8 lg:w-7 lg:h-7 xl:w-8 xl:h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-[#8a1538] text-white' : 'bg-gray-50 text-[#C08F2D]'}`}>
                           <span className="text-xl font-black mt-[-2px]">{isOpen ? '−' : '+'}</span>
                        </div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <div className="px-5 pb-5 pt-0 lg:px-4 lg:pb-4 2xl:px-5 2xl:pb-5 text-[13px] md:text-[1rem] lg:text-[14px] 2xl:text-[1rem] font-medium leading-relaxed md:leading-[1.9rem] text-gray-600 text-justify border-t border-gray-100 mt-2 pt-4">
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

          {currentProgram.donationBanner && (
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
              <div className="relative bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="h-[3px] w-full bg-gradient-to-l from-transparent via-[#C08F2D] to-transparent" />
                <div className="p-6 md:p-8 flex flex-col sm:flex-row items-center gap-5 md:gap-6 text-center sm:text-right">
                  {currentProgram.donationBanner.icon && (
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#C08F2D]/10 flex items-center justify-center shrink-0">
                      <currentProgram.donationBanner.icon className="w-6 h-6 md:w-7 md:h-7 text-[#C08F2D]" />
                    </div>
                  )}
                  <p className="text-gray-700 font-medium text-[13px] md:text-[15px] leading-relaxed flex-grow">
                    {currentProgram.donationBanner.text}
                  </p>
                  <a
                    href={currentProgram.donationBanner.ctaUrl}
                    target={currentProgram.donationBanner.ctaUrl?.startsWith('mailto:') ? undefined : '_blank'}
                    rel={currentProgram.donationBanner.ctaUrl?.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className={`shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black text-[13px] md:text-sm transition-colors w-full sm:w-auto ${
                      currentProgram.donationBanner.accent === 'gold'
                        ? 'bg-[#C08F2D] hover:bg-[#a67b25] text-[#1a0409]'
                        : 'bg-[#8a1538] hover:bg-[#680f2a] text-white'
                    }`}
                  >
                    {currentProgram.donationBanner.ctaLabel}
                  </a>
                </div>
              </div>
            </motion.section>
          )}
        </div>

        <div className="w-full lg:w-4/12 relative z-10 mb-8 lg:mb-0 order-first lg:order-none">
          <div className="lg:sticky lg:top-32 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 lg:p-6 2xl:p-8 text-right shadow-xl shadow-gray-100">
            <h3 className="font-black text-xl text-gray-900 mb-6 lg:mb-4 2xl:mb-6 border-b border-gray-100 pb-4">بطاقة البرنامج</h3>
            <div className="space-y-5 lg:space-y-4 2xl:space-y-5 mb-8 lg:mb-6 2xl:mb-8">
              {(currentProgram.metaDetails || [
                { label: 'آلية البرنامج', value: currentProgram.mechanism },
                { label: 'نوع البرنامج', value: currentProgram.type },
                { label: 'اللغة', value: currentProgram.languages },
              ]).map((item, idx) => {
                if (item.label === 'حالة التسجيل') {
                  const isClosed = item.value === 'مغلق';
                  return (
                    <div key={idx} className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border ${isClosed ? 'bg-gray-50 border-gray-200' : 'bg-green-50 border-green-200'}`}>
                      <span className="text-[12px] md:text-[13px] font-bold text-gray-500">{item.label}</span>
                      <span className={`inline-flex items-center gap-1.5 font-black text-[13px] md:text-[14px] ${isClosed ? 'text-gray-600' : 'text-green-700'}`}>
                        <Circle className={`w-2 h-2 fill-current ${isClosed ? 'text-gray-400' : 'text-green-500'}`} />
                        {item.value}
                      </span>
                    </div>
                  );
                }
                const Icon = getMetaIcon(item.label);
                return (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 lg:w-10 lg:h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 lg:w-4 lg:h-4 text-[#C08F2D]" />
                    </div>
                    <div>
                      <p className="text-[11px] md:text-[12px] lg:text-[11px] font-bold text-gray-500 mb-0.5">{item.label}</p>
                      <p className="text-[13px] md:text-[15px] lg:text-[13px] font-black text-gray-800">{item.value}</p>
                    </div>
                  </div>
                );
              })}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 lg:w-10 lg:h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                  <LayoutTemplate className="w-5 h-5 lg:w-4 lg:h-4 text-[#C08F2D]" />
                </div>
                <div>
                  <p className="text-[11px] md:text-[12px] lg:text-[11px] font-bold text-gray-500 mb-0.5">مسار البرنامج</p>
                  <p style={{ color: getPathwayColor(currentProgram.pathway) }} className="text-[13px] md:text-[15px] lg:text-[13px] font-black">{currentProgram.pathway}</p>
                </div>
              </div>
            </div>
            {currentProgram.ctaUrl ? (
              <>
                <a
                  href={currentProgram.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    currentProgram.registrationStatus === 'مغلق'
                      ? "w-full bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-700 px-6 py-4 lg:py-3 2xl:py-4 rounded-2xl lg:rounded-xl 2xl:rounded-2xl font-black text-[14px] md:text-[15px] lg:text-[14px] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer group"
                      : "w-full bg-[#8a1538] hover:bg-[#680f2a] text-white px-6 py-4 lg:py-3 2xl:py-4 rounded-2xl lg:rounded-xl 2xl:rounded-2xl font-black text-[14px] md:text-[15px] lg:text-[14px] transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer group"
                  }
                >
                  <ExternalLink className="w-5 h-5 lg:w-4 lg:h-4 transform group-hover:-translate-y-0.5 transition-transform" strokeWidth={2.5} />
                  <span>{currentProgram.ctaLabel || 'زيارة الموقع الرسمي'}</span>
                </a>
                {currentProgram.registrationStatus === 'مغلق' && (
                  <p className="text-center text-gray-500 font-medium text-[11px] md:text-[12px] mt-3">
                    التسجيل مغلق حالياً؛ زر الموقع الرسمي لمتابعة موعد فتح الدفعة القادمة.
                  </p>
                )}
              </>
            ) : (
              <button
                onClick={() => onNavigate('contact')}
                className="w-full bg-[#8a1538] hover:bg-[#680f2a] text-white px-6 py-4 lg:py-3 2xl:py-4 rounded-2xl lg:rounded-xl 2xl:rounded-2xl font-black text-[14px] md:text-[15px] lg:text-[14px] transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer group"
              >
                <ArrowLeft className="w-5 h-5 lg:w-4 lg:h-4 transform group-hover:-translate-x-1.5 transition-transform" strokeWidth={2.5} />
                <span>تواصل معنا للاستفسار</span>
              </button>
            )}
          </div>
        </div>

      </div>

      <div id="related-stories" className="mt-8 md:mt-12 bg-white pt-12 md:pt-16 pb-16 md:pb-24 border-t border-gray-100">
        <RelatedProgramStories
          programName={programName}
          onNavigate={onNavigate}
          onStoryClick={(storyId) => {
            const targetStory = allStories.find(s => s.id === storyId);
            if (targetStory) setSelectedStory(targetStory);
          }}
        />
      </div>

      <Footer onNavigate={onNavigate} />

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

      <AnimatePresence>
        {selectedNews && (
          <NewsDetailModal 
            news={selectedNews} 
            onClose={() => setSelectedNews(null)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}