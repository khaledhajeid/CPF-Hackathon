// src/components/home/HomeEvents.jsx
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Award, ArrowUpLeft, Briefcase, Target, Users, LayoutGrid, Timer, Filter, Search, ArrowLeft, ChevronDown } from 'lucide-react';
import EventDetailsDrawer from '../events/EventDetailsDrawer';
import JordanMap from './JordanMap';
import { allEvents } from '../../data';

export default function HomeEvents({ activeFilters, setActiveFilters, handleRegisterClick, onNavigate }) {
  const [ageFilter, setAgeFilter] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  const ageRanges = ['الكل', '13 - 17', '18 - 23', '24 - 30'];

  const pathwaysData = [
    { id: 'الكل', icon: LayoutGrid },
    { id: 'المشاركة الاقتصادية', icon: Briefcase },
    { id: 'القيادة', icon: Target },
    { id: 'التنمية المجتمعية', icon: Users },
  ];

  const filteredEvents = useMemo(() => {
    return allEvents.filter(event => {
      const matchPathway = activeFilters.pathway === 'الكل' || event.pathway === activeFilters.pathway;
      const matchLocation = activeFilters.location === 'الكل' || event.city === activeFilters.location;
      const matchAge = ageFilter === 'الكل' || (event.ageRange ? event.ageRange === ageFilter : true);
      const matchSearch = searchQuery === '' || event.title.includes(searchQuery) || event.location.includes(searchQuery) || event.city.includes(searchQuery);
      
      return matchPathway && matchLocation && matchAge && matchSearch;
    });
  }, [activeFilters, ageFilter, searchQuery]);

  const displayedEvents = useMemo(() => {
    return filteredEvents.slice(0, 6);
  }, [filteredEvents]);

  const isPersonalized = activeFilters.pathway !== 'الكل' || activeFilters.location !== 'الكل' || ageFilter !== 'الكل' || searchQuery !== '';

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  const getTagStyle = (pathway) => {
    switch(pathway) {
      case 'المشاركة الاقتصادية': return { bg: 'bg-[#721F31]', text: 'text-white' };
      case 'القيادة': return { bg: 'bg-[#2b307e]', text: 'text-white' };
      case 'التنمية المجتمعية': return { bg: 'bg-[#1f5412]', text: 'text-white' };
      default: return { bg: 'bg-gray-800', text: 'text-white' };
    }
  };

  return (
    <div id="events-section" className="py-16 md:py-24 bg-[#F4F7FA] relative font-sans" dir="rtl">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 md:mb-10 text-right">
          <div className="flex items-center gap-2 md:gap-3">
            <img src="/arrow-yellow.svg" className="w-6 h-6 md:w-8 md:h-8 shrink-0" alt="" />
            <h2 className="text-2xl md:text-5xl font-black text-[#1a1c1d] tracking-tight">
              {isPersonalized ? "فرص مصممة خصيصاً لك" : "اكتشف أحدث الفرص المتاحة"}
            </h2>
          </div>
        </div>

        {/* 🟢 شريط الفلاتر: تم إلغاء الـ Scroll المزعج وتحويله لـ Grid مرتب */}
        <div className="bg-white p-4 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 mb-8 md:mb-10 flex flex-col xl:flex-row items-start xl:items-center gap-4 xl:gap-5 justify-start w-full">
          
          {/* فلاتر المسارات (Grid 2x2 ع الموبايل بدل السحب) */}
          <div className="grid grid-cols-2 md:flex md:gap-2 w-full xl:w-auto gap-2">
            {pathwaysData.map(path => {
              const Icon = path.icon;
              const isActive = activeFilters.pathway === path.id;
              return (
                <button
                  key={path.id}
                  onClick={() => setActiveFilters(prev => ({ ...prev, pathway: path.id }))}
                  className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1.5 md:gap-2 px-2 md:px-6 py-3 rounded-xl font-bold text-[11px] md:text-sm transition-all duration-300 border-2 w-full md:w-auto text-center ${
                    isActive ? 'bg-[#721F31] border-[#721F31] text-white shadow-md' : 'bg-gray-50 border-transparent text-gray-500 hover:border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 md:w-4 md:h-4 ${isActive ? 'text-[#C08F2D]' : 'text-gray-400'}`} />
                  <span className="truncate w-full md:w-auto">{path.id}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden xl:block w-px h-8 bg-gray-200"></div>

          {/* فلاتر العمر (تحولت لـ Dropdown مرتب ع الموبايل) */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3 w-full xl:w-auto">
             <span className="text-[13px] md:text-sm font-bold text-gray-400 flex items-center gap-1.5 shrink-0 mb-1 md:mb-0">
               <Filter className="w-4 h-4" /> العمر:
             </span>
             
             {/* Dropdown للموبايل */}
             <div className="md:hidden relative w-full group">
               <select 
                 className="w-full bg-gray-50 border border-gray-100 text-gray-700 font-bold text-sm py-3 px-4 rounded-xl appearance-none outline-none focus:border-[#721F31] focus:ring-1 focus:ring-[#721F31]/20"
                 value={ageFilter}
                 onChange={(e) => setAgeFilter(e.target.value)}
               >
                 {ageRanges.map(age => (
                   <option key={age} value={age}>{age}</option>
                 ))}
               </select>
               <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-400">
                  <ChevronDown className="w-4 h-4" />
               </div>
             </div>

             {/* أزرار عادية للكمبيوتر */}
             <div className="hidden md:flex gap-2 shrink-0">
               {ageRanges.map(age => (
                 <button
                   key={age}
                   onClick={() => setAgeFilter(age)}
                   className={`whitespace-nowrap px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border-2 ${
                     ageFilter === age 
                       ? 'bg-[#721F31] border-[#721F31] text-white shadow-md' 
                       : 'bg-transparent border-[#721F31] text-gray-700 hover:bg-[#721F31]/5'
                   }`}
                 >
                   {age}
                 </button>
               ))}
             </div>
          </div>

          <div className="hidden xl:block w-px h-8 bg-gray-200"></div>

          {/* مربع البحث */}
          <div className="w-full xl:w-80 shrink-0 relative mt-2 xl:mt-0">
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="ابحث عن فعالية أو مكان..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50/80 border border-gray-100 text-gray-900 font-bold text-[13px] md:text-sm py-3.5 pr-11 pl-4 rounded-xl hover:bg-gray-100 focus:bg-white focus:border-[#721F31]/30 focus:ring-4 focus:ring-[#721F31]/5 outline-none transition-all"
            />
          </div>

        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-10 items-start">
          
          <div className="w-full lg:w-[35%] xl:w-[32%] shrink-0 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-5 md:p-6 relative flex flex-col min-h-[350px] md:min-h-[640px]">
              
              <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none rounded-3xl overflow-hidden">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#721F31" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                </svg>
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4 md:mb-6 border-b border-gray-100 pb-4 shrink-0">
                  <div>
                    <h3 className="font-black text-gray-900 text-lg md:text-xl">اختر المحافظة</h3>
                    <p className="text-[11px] md:text-xs font-bold text-gray-500 mt-1">اضغط على الخريطة لتصفية الفرص</p>
                  </div>
                  {activeFilters.location !== 'الكل' && (
                    <button 
                      onClick={() => setActiveFilters(prev => ({ ...prev, location: 'الكل' }))}
                      className="text-[10px] font-bold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors shrink-0 cursor-pointer mt-1"
                    >
                      إلغاء التحديد
                    </button>
                  )}
                </div>
                
                <div className="flex-grow w-full flex items-center justify-center pt-2 md:pt-4 pb-4">
                  <JordanMap 
                    activeLocation={activeFilters.location} 
                    onLocationSelect={(loc) => setActiveFilters(prev => ({ ...prev, location: loc }))} 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[65%] xl:w-[68%]">
            
            {isPersonalized && (
              <div className="mb-6 flex flex-wrap items-center gap-2 text-[12px] sm:text-sm font-bold text-gray-500 bg-white px-4 py-3 rounded-xl border border-gray-100 shadow-sm inline-flex w-full sm:w-auto">
                <span>نعرض الفرص لـ:</span>
                <span className="text-[#721F31] truncate max-w-[150px] sm:max-w-none">{activeFilters.pathway}</span>
                {activeFilters.location !== 'الكل' && <><span className="text-gray-300">•</span><span className="text-[#721F31]">{activeFilters.location}</span></>}
                {ageFilter !== 'الكل' && <><span className="text-gray-300">•</span><span className="text-[#721F31]">عمر {ageFilter}</span></>}
                {searchQuery !== '' && <><span className="text-gray-300">•</span><span className="text-[#721F31] truncate max-w-[100px]">"{searchQuery}"</span></>}
                <span className="text-gray-400 font-medium mr-auto sm:mr-2">({filteredEvents.length} نتيجة)</span>
              </div>
            )}

            <AnimatePresence mode="wait">
              {displayedEvents.length > 0 ? (
                <div className="flex flex-col gap-8 md:gap-10">
                  <motion.div
                    key={`${activeFilters.pathway}-${activeFilters.location}-${ageFilter}-${searchQuery}`}
                    variants={containerVariants}
                    initial="hidden" animate="show" exit="exit"
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6"
                  >
                    {displayedEvents.map((event, index) => {
                      const tagStyle = getTagStyle(event.pathway);
                      const isUrgent = index % 5 === 1;

                      return (
                        <motion.div
                          variants={cardVariants}
                          key={event.id}
                          className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full cursor-pointer"
                        >
                          <div className="relative h-44 md:h-48 overflow-hidden bg-gray-100 shrink-0">
                            <img
                              src={event.image} alt={event.title}
                              onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/600x400/721F31/FFFFFF?text=Crown+Prince+Foundation'; }}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            
                            {isUrgent && (
                              <div className="absolute top-3 left-3 bg-red-600/90 backdrop-blur-sm text-white px-2.5 py-1.5 rounded-md text-[10px] font-black flex items-center gap-1.5 shadow-lg">
                                <Timer className="w-3 h-3" /> ينتهي قريباً
                              </div>
                            )}

                            <div className={`absolute top-3 right-3 px-2.5 py-1.5 text-[10px] font-black rounded-md shadow-md ${tagStyle.bg} ${tagStyle.text}`}>
                              {event.pathway}
                            </div>
                          </div>

                          <div className="p-5 md:p-6 flex flex-col flex-grow">
                            <div className="mb-5 md:mb-6">
                              <h3 className="font-black text-[15px] md:text-base text-gray-900 mb-3 md:mb-4 line-clamp-2 group-hover:text-[#721F31] transition-colors leading-relaxed">
                                {event.title}
                              </h3>

                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-gray-500 text-xs font-bold">
                                  <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400" /> {event.date}
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 text-xs font-bold">
                                  <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400" /> <span className="truncate">{event.city} - {event.location}</span>
                                </div>
                              </div>
                            </div>

                            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                              <div className="flex flex-col">
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">المكافأة</span>
                                <div className="flex items-center gap-1">
                                  <Award className="w-4 h-4 text-[#C08F2D]" />
                                  <span className="text-[#C08F2D] font-black text-[11px] md:text-xs">+{event.points} نقطة</span>
                                </div>
                              </div>

                              <button
                                onClick={(e) => { e.stopPropagation(); setSelectedEvent(event); }}
                                className="flex items-center gap-2 bg-[#721F31] hover:bg-[#5a1826] text-white px-4 md:px-5 py-2 md:py-2.5 rounded-xl font-black text-xs transition-colors shadow-md group/btn"
                              >
                                سجل الآن
                                <ArrowUpLeft className="w-3.5 h-3.5 md:w-4 md:h-4 transform group-hover/btn:-translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>

                  {filteredEvents.length > 6 && (
                    <div className="flex justify-center mt-4 md:mt-6">
                      <button
                        onClick={() => onNavigate('programs')}
                        className="flex items-center gap-3 bg-white border-2 border-[#721F31] text-[#721F31] hover:bg-[#721F31] hover:text-white px-6 md:px-8 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black text-lg md:text-2xl transition-all duration-300 shadow-sm hover:shadow-lg group w-full sm:w-auto justify-center cursor-pointer"
                      >
                        تصفح واستكشف المزيد من الفرص
                        <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1.5 transition-transform" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="py-16 md:py-20 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-dashed border-gray-200 h-full"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5 md:mb-6">
                    <Search className="w-8 h-8 md:w-10 md:h-10 text-gray-300" />
                  </div>
                  <p className="text-gray-900 font-black text-xl md:text-2xl mb-2">لا توجد نتائج مطابقة</p>
                  <p className="text-gray-500 font-medium text-[13px] md:text-sm max-w-md mx-auto mb-6 md:mb-8 px-4">لم نتمكن من إيجاد فرص تطابق الفلاتر أو البحث الحالي. جرب كلمات مختلفة أو أعد ضبط الفلاتر.</p>
                  <button 
                    onClick={() => { setActiveFilters({ pathway: 'الكل', location: 'الكل' }); setAgeFilter('الكل'); setSearchQuery(''); }} 
                    className="bg-[#C08F2D] hover:bg-[#a67b25] text-white px-6 md:px-8 py-3 md:py-3.5 rounded-xl font-black text-[13px] md:text-sm transition-colors shadow-lg cursor-pointer"
                  >
                    إعادة ضبط الفلاتر والبحث
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        <EventDetailsDrawer 
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onRegister={(event) => {
            handleRegisterClick(event);
          }}
        />

      </div>
    </div>
  );
}