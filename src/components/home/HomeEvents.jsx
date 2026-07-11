// src/components/home/HomeEvents.jsx
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Award, ArrowUpLeft, Target, Users, LayoutGrid, Timer, Filter, Search, ArrowLeft, ChevronDown, BookOpen, SearchX } from 'lucide-react';
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
    { id: 'تعلّم', icon: BookOpen },
    { id: 'قُد', icon: Target },
    { id: 'اصنع الأثر', icon: Users },
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

  const displayedEvents = useMemo(() => filteredEvents.slice(0, 6), [filteredEvents]);
  const isPersonalized = activeFilters.pathway !== 'الكل' || activeFilters.location !== 'الكل' || ageFilter !== 'الكل' || searchQuery !== '';

  const getTagStyle = (pathway) => {
    switch(pathway) {
      case 'تعلّم': return { bg: 'bg-[#8a1538]', text: 'text-white' };
      case 'قُد': return { bg: 'bg-[#2b307e]', text: 'text-white' };
      case 'اصنع الأثر': return { bg: 'bg-[#1f5412]', text: 'text-white' };
      default: return { bg: 'bg-gray-800', text: 'text-white' };
    }
  };

  return (
    <div id="events-section" className="py-16 md:py-20 lg:py-20 xl:py-24 bg-[#F4F7FA] relative font-sans" dir="rtl">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-6 md:mb-10 text-right">
          <div className="flex items-center gap-2 md:gap-3">
            <img src="/arrow-yellow.svg" className="w-6 h-6 md:w-6 md:h-6 xl:w-8 xl:h-8 shrink-0" alt="" />
            <h2 className="text-2xl md:text-3xl lg:text-[clamp(1.75rem,3.5vw,3rem)] font-black text-[#8a1538] tracking-tight">
              {isPersonalized ? "فرص مصممة خصيصاً لك" : "اكتشف أحدث الفرص المتاحة"}
            </h2>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 mb-8 flex flex-col xl:flex-row items-start xl:items-center gap-4 xl:gap-5 justify-start w-full">
          <div className="grid grid-cols-2 md:flex md:gap-2 w-full xl:w-auto gap-2">
            {pathwaysData.map(path => {
              const Icon = path.icon;
              const isActive = activeFilters.pathway === path.id;
              return (
                <button
                  key={path.id}
                  onClick={() => setActiveFilters(prev => ({ ...prev, pathway: path.id }))}
                  className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1.5 md:gap-2 px-2 md:px-6 py-2.5 md:py-3 rounded-xl font-bold text-[11px] md:text-sm transition-all duration-300 border-2 w-full md:w-auto text-center cursor-pointer ${
                    isActive ? 'bg-[#8a1538] border-[#8a1538] text-white shadow-md' : 'bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C08F2D]' : 'text-gray-400'}`} />
                  <span className="truncate">{path.id}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden xl:block w-px h-8 bg-gray-200 shrink-0"></div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3 w-full xl:w-auto">
             <span className="text-[12px] md:text-sm font-bold text-gray-400 flex items-center gap-1.5 shrink-0 mb-1 md:mb-0">
               <Filter className="w-4 h-4" /> العمر:
             </span>
             <div className="md:hidden relative w-full group">
               <select 
                 className="w-full bg-gray-50 border border-gray-100 text-gray-700 font-bold text-sm py-3 px-4 rounded-xl appearance-none outline-none focus:border-[#8a1538]"
                 value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}
               >
                 {ageRanges.map(age => <option key={age} value={age}>{age}</option>)}
               </select>
               <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-400"><ChevronDown className="w-4 h-4" /></div>
             </div>
             <div className="hidden md:flex gap-2 shrink-0">
               {ageRanges.map(age => (
                 <button
                   key={age} onClick={() => setAgeFilter(age)}
                   className={`whitespace-nowrap px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border-2 cursor-pointer ${
                     ageFilter === age ? 'bg-[#8a1538] border-[#8a1538] text-white shadow-md' : 'bg-transparent border-[#8a1538] text-gray-700 hover:bg-[#8a1538]/5'
                   }`}
                 >
                   {age}
                 </button>
               ))}
             </div>
          </div>

          <div className="hidden xl:block w-px h-8 bg-gray-200 shrink-0"></div>

          <div className="w-full xl:w-80 shrink-0 relative mt-2 xl:mt-0">
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
            </div>
            <input
              type="text" placeholder="ابحث عن فعالية أو مكان..."
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50/80 border border-gray-100 text-gray-900 font-bold text-[13px] md:text-sm py-3 md:py-3.5 pr-11 pl-4 rounded-xl hover:bg-gray-100 focus:bg-white focus:border-[#8a1538]/30 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 xl:gap-10 items-start">
          
          <div className="w-full lg:w-[35%] xl:w-[32%] shrink-0 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-5 md:p-6 relative flex flex-col min-h-[300px] md:min-h-[520px] xl:min-h-[600px] 2xl:min-h-[640px]">
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4 shrink-0">
                  <div>
                    <h3 className="font-black text-gray-900 text-lg md:text-xl">اختر المحافظة</h3>
                    <p className="text-[11px] md:text-xs font-bold text-gray-500 mt-1">اضغط على الخريطة للفلترة</p>
                  </div>
                  {activeFilters.location !== 'الكل' && (
                    <button 
                      onClick={() => setActiveFilters(prev => ({ ...prev, location: 'الكل' }))}
                      className="text-[10px] font-bold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full hover:bg-gray-200 cursor-pointer mt-1"
                    >
                      إلغاء التحديد
                    </button>
                  )}
                </div>
                <div className="flex-grow w-full flex items-center justify-center pt-2 pb-4">
                  <JordanMap activeLocation={activeFilters.location} onLocationSelect={(loc) => setActiveFilters(prev => ({ ...prev, location: loc }))} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[65%] xl:w-[68%] min-w-0">
            {isPersonalized && (
              <div className="mb-6 flex flex-wrap items-center gap-2 text-[11px] sm:text-sm font-bold text-gray-500 bg-white px-4 py-3 rounded-xl border border-gray-100 shadow-sm w-full">
                <span>نعرض الفرص لـ:</span>
                <span className="text-[#8a1538] truncate">{activeFilters.pathway}</span>
                {activeFilters.location !== 'الكل' && <><span className="text-gray-300">•</span><span className="text-[#8a1538]">{activeFilters.location}</span></>}
                {ageFilter !== 'الكل' && <><span className="text-gray-300">•</span><span className="text-[#8a1538]">عمر {ageFilter}</span></>}
                {searchQuery !== '' && <><span className="text-gray-300">•</span><span className="text-[#8a1538] truncate max-w-[80px]">"{searchQuery}"</span></>}
                <span className="text-gray-400 font-medium mr-auto">({filteredEvents.length} نتيجة)</span>
              </div>
            )}

            <AnimatePresence mode="wait">
              {displayedEvents.length > 0 ? (
                <div className="flex flex-col gap-6 md:gap-10">
                  <motion.div
                    key={`${activeFilters.pathway}-${activeFilters.location}-${ageFilter}-${searchQuery}`}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-row sm:grid sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-4 sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                  >
                    {displayedEvents.map((event, index) => {
                      const tagStyle = getTagStyle(event.pathway);
                      const isUrgent = index % 5 === 1;

                      return (
                        <div
                          key={event.id}
                          className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl sm:hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer w-[85vw] sm:w-full shrink-0 snap-center"
                          onClick={() => setSelectedEvent(event)}
                        >
                          <div className="relative h-40 md:h-44 xl:h-48 overflow-hidden bg-gray-100 shrink-0">
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover sm:group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                            {isUrgent && (
                              <div className="absolute top-3 left-3 bg-red-600/90 text-white px-2 py-1 rounded-md text-[10px] font-black flex items-center gap-1 shadow-md">
                                <Timer className="w-3 h-3" /> ينتهي قريباً
                              </div>
                            )}
                            <div className={`absolute top-3 right-3 px-2 py-1 text-[10px] font-black rounded-md shadow-md ${tagStyle.bg} ${tagStyle.text}`}>
                              {event.pathway}
                            </div>
                          </div>

                          <div className="p-4 md:p-5 flex flex-col flex-grow">
                            <div className="mb-4">
                              <h3 className="font-black text-[14px] md:text-base text-gray-900 mb-3 line-clamp-2 sm:group-hover:text-[#8a1538] transition-colors leading-relaxed">
                                {event.title}
                              </h3>
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-2 text-gray-500 text-[11px] md:text-xs font-bold">
                                  <Calendar className="w-3.5 h-3.5 text-gray-400" /> {event.date}
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 text-[11px] md:text-xs font-bold">
                                  <MapPin className="w-3.5 h-3.5 text-gray-400" /> <span className="truncate">{event.city} - {event.location}</span>
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
                              {/* 🟢 تم التعديل ليفتح التفاصيل بدلاً من تسجيل الدخول */}
                              <button
                                onClick={(e) => { e.stopPropagation(); setSelectedEvent(event); }}
                                className="flex items-center gap-1.5 bg-[#8a1538] hover:bg-[#680f2a] text-white px-4 py-2 rounded-xl font-black text-[11px] md:text-xs transition-colors shadow-md cursor-pointer"
                              >
                                سجل الآن
                                <ArrowUpLeft className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>

                  {filteredEvents.length > 6 && (
                    <div className="flex justify-center mt-2 md:mt-4">
                      <button
                        onClick={() => onNavigate('programs')}
                        className="flex items-center gap-2 bg-white border-2 border-[#8a1538] text-[#8a1538] hover:bg-[#8a1538] hover:text-white px-6 py-3 rounded-xl font-black text-sm md:text-base xl:text-lg transition-all w-full sm:w-auto justify-center cursor-pointer"
                      >
                        استكشف المزيد من الفرص
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 flex flex-col items-center text-center bg-white rounded-3xl border border-dashed border-gray-200">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4"><SearchX className="w-8 h-8 text-gray-300" /></div>
                  <p className="text-gray-900 font-black text-lg mb-2">لا توجد نتائج مطابقة</p>
                  <button onClick={() => { setActiveFilters({ pathway: 'الكل', location: 'الكل' }); setAgeFilter('الكل'); setSearchQuery(''); }} className="mt-4 bg-[#C08F2D] text-white px-6 py-2.5 rounded-xl font-black text-sm cursor-pointer">
                    إعادة ضبط الفلاتر
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        <EventDetailsDrawer event={selectedEvent} isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} onRegister={handleRegisterClick} />

      </div>
    </div>
  );
}