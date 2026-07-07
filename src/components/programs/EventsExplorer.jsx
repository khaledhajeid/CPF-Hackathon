// src/components/programs/EventsExplorer.jsx
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpLeft, Search, Calendar, MapPin, Award, Timer, ChevronDown, Check } from 'lucide-react';
import JordanMap from '../home/JordanMap';
import EventDetailsDrawer from '../events/EventDetailsDrawer';
import { allEvents } from '../../data';

const CustomDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full sm:w-auto flex-grow" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white border border-gray-200 text-gray-700 font-bold text-sm py-3.5 px-4 rounded-xl hover:border-gray-300 focus:border-[#8a1538] focus:ring-2 focus:ring-[#8a1538]/20 outline-none transition-all cursor-pointer"
      >
        <span className="truncate ml-2">{value === 'الكل' ? placeholder : value}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}
            className="absolute z-50 top-full mt-2 w-full min-w-[200px] bg-[#4c4c4c] text-white rounded-xl shadow-2xl overflow-hidden border border-gray-600"
          >
            {options.map((option) => (
              <div
                key={option}
                onClick={() => { onChange(option); setIsOpen(false); }}
                className={`px-4 py-3 text-sm font-bold cursor-pointer transition-colors flex items-center justify-between ${
                  value === option ? 'bg-[#8a1538] text-white' : 'hover:bg-[#5a5a5b] text-gray-100'
                }`}
              >
                <span className="truncate">{option}</span>
                {value === option && <Check className="w-4 h-4 text-white shrink-0" />}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function EventsExplorer({ handleRegisterClick }) {
  const [eventSearch, setEventSearch] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('الكل');
  const [eventPathwayFilter, setEventPathwayFilter] = useState('الكل');
  const [eventAgeFilter, setEventAgeFilter] = useState('الكل');
  const [eventLocation, setEventLocation] = useState('الكل');
  const [selectedEvent, setSelectedEvent] = useState(null);

  // 🟢 تحديث الأقسام للمسارات الثلاثة المعتمدة
  const categories = ['الكل', 'تعلّم', 'قُد', 'اصنع الأثر'];
  const eventTypes = ['الكل', 'ورشة عمل', 'فرصة تدريب', 'مسابقة وهاكاثون', 'فرصة تطوع', 'مؤتمر'];
  const ageRanges = ['الكل', '13 - 17', '18 - 23', '24 - 30'];

  const filteredEvents = useMemo(() => {
    return allEvents.filter(event => {
      const matchPathway = eventPathwayFilter === 'الكل' || event.pathway === eventPathwayFilter;
      const matchAge = eventAgeFilter === 'الكل' || (event.ageRange ? event.ageRange === eventAgeFilter : true);
      const matchLocation = eventLocation === 'الكل' || event.city === eventLocation;
      const matchSearch = eventSearch === '' || event.title.includes(eventSearch) || event.city.includes(eventSearch) || event.location.includes(eventSearch);
      const matchType = eventTypeFilter === 'الكل' || event.title.includes(eventTypeFilter.split(' ')[0]);
      
      return matchPathway && matchAge && matchLocation && matchSearch && matchType;
    });
  }, [eventTypeFilter, eventPathwayFilter, eventAgeFilter, eventLocation, eventSearch]);

  const getPathwayStyle = (pathway) => {
    switch(pathway) {
      case 'تعلّم': return 'bg-[#2b307e]/100 text-[#fff] border-[#2b307e]/100'; 
      case 'قُد': return 'bg-[#8a1538]/100 text-[#fff] border-[#8a1538]/100'; 
      case 'اصنع الأثر': return 'bg-[#1f5412]/100 text-[#fff] border-[#1f5412]/100'; 
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const fadeUpVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
  const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
      
      <div className="bg-white p-4 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 mb-8 flex flex-col xl:flex-row items-start xl:items-center gap-4 w-full">
        
        <div className="w-full xl:w-auto xl:flex-grow relative z-0">
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text" placeholder="ابحث عن فعالية، مدينة، أو مجال..." value={eventSearch} onChange={(e) => setEventSearch(e.target.value)}
            className="w-full bg-gray-50 border border-transparent text-gray-900 font-bold text-sm py-3.5 pr-11 pl-4 rounded-xl hover:bg-gray-100 focus:bg-white focus:border-[#C08F2D]/50 focus:ring-4 focus:ring-[#C08F2D]/10 outline-none transition-all"
          />
        </div>

        <div className="hidden xl:block w-px h-8 bg-gray-200"></div>

        <div className="w-full xl:w-auto flex flex-col sm:flex-row gap-3 relative z-40">
          <CustomDropdown options={eventTypes} value={eventTypeFilter} onChange={setEventTypeFilter} placeholder="نوع الفرصة" />
          <CustomDropdown options={categories} value={eventPathwayFilter} onChange={setEventPathwayFilter} placeholder="المسار" />
          <div className="sm:w-36 flex-grow relative z-30">
            <CustomDropdown options={ageRanges} value={eventAgeFilter} onChange={setEventAgeFilter} placeholder="العمر" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
        <div className="w-full lg:w-[35%] xl:w-[36%] shrink-0 lg:sticky lg:top-24 z-10">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-5 md:p-6 relative flex flex-col min-h-[400px] lg:min-h-[640px]">
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none rounded-3xl overflow-hidden">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid-pattern-2" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8a1538" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid-pattern-2)" /></svg>
            </div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4 md:mb-6 border-b border-gray-100 pb-4 shrink-0">
                <div>
                  <h3 className="font-black text-gray-900 text-lg md:text-xl">الموقع الجغرافي</h3>
                  <p className="text-[11px] md:text-xs font-bold text-gray-500 mt-1">اختر المحافظة لتصفية الفعاليات</p>
                </div>
                {eventLocation !== 'الكل' && (
                  <button onClick={() => setEventLocation('الكل')} className="text-[10px] font-bold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors shrink-0 cursor-pointer mt-1">إلغاء</button>
                )}
              </div>
              <div className="flex-grow w-full flex items-center justify-center pt-2 pb-4">
                <JordanMap activeLocation={eventLocation} onLocationSelect={setEventLocation} />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[65%] xl:w-[68%] z-10">
          <AnimatePresence mode="wait">
            {filteredEvents.length > 0 ? (
              <motion.div key="events-grid" variants={staggerContainer} initial="hidden" animate="visible" exit="hidden" className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                {filteredEvents.map((event, index) => {
                  const tagStyle = getPathwayStyle(event.pathway);
                  const isUrgent = index % 5 === 1;

                  return (
                    <motion.div 
                      variants={fadeUpVariants} key={event.id} onClick={() => setSelectedEvent(event)} 
                      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full cursor-pointer"
                    >
                      <div className="relative h-44 md:h-48 overflow-hidden bg-gray-100 shrink-0">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                        {isUrgent && (
                          <div className="absolute top-3 left-3 bg-red-600/90 backdrop-blur-sm text-white px-2.5 py-1.5 rounded-md text-[10px] font-black flex items-center gap-1.5 shadow-lg"><Timer className="w-3 h-3" /> متاح الآن</div>
                        )}
                        <div className={`absolute top-3 right-3 px-2.5 py-1.5 text-[10px] font-black rounded-md shadow-sm border ${tagStyle}`}>{event.pathway}</div>
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="mb-5">
                          <h3 className="font-black text-[15px] text-gray-900 mb-3 line-clamp-2 group-hover:text-[#8a1538] transition-colors leading-relaxed">{event.title}</h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-500 text-xs font-bold"><Calendar className="w-3.5 h-3.5 text-[#C08F2D]" /> {event.date}</div>
                            <div className="flex items-center gap-2 text-gray-500 text-xs font-bold"><MapPin className="w-3.5 h-3.5 text-[#C08F2D]" /> <span className="truncate">{event.city} - {event.location}</span></div>
                          </div>
                        </div>
                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">المكافأة</span>
                            <div className="flex items-center gap-1"><Award className="w-4 h-4 text-[#C08F2D]" /><span className="text-[#C08F2D] font-black text-[11px] md:text-xs">+{event.points} نقطة</span></div>
                          </div>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setSelectedEvent(event); }} 
                            className="flex items-center gap-2 bg-[#8a1538] hover:bg-[#680f2a] text-white px-4 md:px-5 py-2.5 rounded-xl font-black text-[11px] md:text-xs transition-colors shadow-md group/btn"
                          >
                            التفاصيل <ArrowUpLeft className="w-3.5 h-3.5 transform group-hover/btn:-translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-20 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-dashed border-gray-200 h-full">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-5"><Search className="w-8 h-8 text-gray-300" /></div>
                <p className="text-gray-900 font-black text-xl mb-2">لا توجد نتائج مطابقة</p>
                <p className="text-gray-500 font-medium text-sm max-w-sm mx-auto mb-6 px-4">لم نتمكن من إيجاد فرص تطابق الفلاتر المحددة. جرب تغيير الإعدادات.</p>
                <button onClick={() => { setEventTypeFilter('الكل'); setEventPathwayFilter('الكل'); setEventAgeFilter('الكل'); setEventLocation('الكل'); setEventSearch(''); }} className="bg-[#C08F2D] hover:bg-[#a67b25] text-white px-6 py-3 rounded-xl font-black text-sm transition-colors shadow-lg cursor-pointer">إعادة ضبط جميع الفلاتر</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <EventDetailsDrawer 
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onRegister={(event) => { if (handleRegisterClick) { handleRegisterClick(event); } }}
      />
    </motion.div>
  );
}