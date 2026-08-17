// src/components/programs/EventsExplorer.jsx
import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpLeft, Search, Calendar, MapPin, Timer, ChevronDown, Check } from 'lucide-react';
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
        className="w-full flex items-center justify-between bg-white border border-gray-200 text-gray-700 font-bold text-[clamp(0.75rem,1vw,0.875rem)] py-[clamp(0.6rem,0.8vw,0.875rem)] px-[clamp(0.75rem,1vw,1rem)] rounded-xl hover:border-gray-300 focus:border-[#8a1538] focus:ring-2 focus:ring-[#8a1538]/20 outline-none transition-all cursor-pointer"
      >
        <span className="truncate ml-2">{value === 'الكل' ? placeholder : value}</span>
        <ChevronDown className={`w-4 h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 text-gray-500 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
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
                className={`px-[clamp(0.75rem,1vw,1rem)] py-[clamp(0.6rem,0.8vw,0.75rem)] text-[clamp(0.7rem,0.9vw,0.875rem)] font-bold cursor-pointer transition-colors flex items-center justify-between ${
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

  const isPersonalized = eventTypeFilter !== 'الكل' || eventPathwayFilter !== 'الكل' || eventAgeFilter !== 'الكل' || eventLocation !== 'الكل' || eventSearch !== '';

  const categories = ['الكل', 'تعلّم', 'قُد', 'اصنع الأثر'];
  const eventTypes = ['الكل', 'ورشة عمل', 'فرصة تدريب', 'مسابقة وهاكاثون', 'فرصة تطوع', 'مؤتمر'];
  const ageRanges = ['الكل', '14 - 17', '18 - 25', '26 - 30', '31 - 35', '35+'];

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
      case 'تعلّم': return 'bg-[#a00023]/100 text-[#fff] border-[#a00023]/100';
      case 'قُد': return 'bg-[#2b307e]/100 text-[#fff] border-[#2b307e]/100';
      case 'اصنع الأثر': return 'bg-[#1f5412]/100 text-[#fff] border-[#1f5412]/100'; 
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const fadeUpVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
  const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} dir="rtl">
      
      <div className="mb-[clamp(1.5rem,2vw,2rem)] text-right">
        <h2 className="text-[clamp(1.35rem,3.5vw,3rem)] font-black text-[#8a1538] tracking-tight">
          اكتشف أحدث <span className="text-[#721F31]">الفرص المتاحة</span>
        </h2>
      </div>

      <div className="bg-white p-[clamp(0.75rem,1vw,1rem)] rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 mb-[clamp(1.5rem,3vw,2rem)] flex flex-col xl:flex-row items-start xl:items-center gap-[clamp(0.75rem,1vw,1rem)] w-full">
        
        {/* 🟢 xl:flex-1 عشان يمتص الحقل المساحة الزايدة وما تطلع الفلاتر برا السطر */}
        <div className="w-full xl:w-auto xl:flex-1 relative z-0">
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <Search className="h-[clamp(1rem,1.2vw,1.25rem)] w-[clamp(1rem,1.2vw,1.25rem)] text-gray-500" />
          </div>
          <input
            type="text" placeholder="ابحث عن فعالية، مدينة، أو مجال..." value={eventSearch} onChange={(e) => setEventSearch(e.target.value)}
            className="w-full bg-gray-50 border border-transparent text-gray-900 font-bold text-[clamp(0.75rem,1.1vw,0.875rem)] py-[clamp(0.6rem,0.8vw,0.875rem)] pr-11 pl-4 rounded-xl hover:bg-gray-100 focus:bg-white focus:border-[#C08F2D]/50 focus:ring-4 focus:ring-[#C08F2D]/10 outline-none transition-all"
          />
        </div>

        <div className="hidden xl:block w-px h-8 bg-gray-200 shrink-0"></div>

        <div className="w-full xl:w-auto flex flex-col sm:flex-row gap-3 relative z-40 shrink-0">
          <CustomDropdown options={eventTypes} value={eventTypeFilter} onChange={setEventTypeFilter} placeholder="نوع الفرصة" />
          <CustomDropdown options={categories} value={eventPathwayFilter} onChange={setEventPathwayFilter} placeholder="المسار" />
          <div className="sm:w-36 flex-grow relative z-30">
            <CustomDropdown options={ageRanges} value={eventAgeFilter} onChange={setEventAgeFilter} placeholder="العمر" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-[clamp(1.25rem,3vw,2.5rem)] items-start">
        <div className="w-full lg:w-[35%] xl:w-[36%] shrink-0 lg:sticky lg:top-24 z-10">
          <div className="bg-white rounded-[clamp(1rem,2vw,1.5rem)] shadow-xl border border-gray-100 p-[clamp(1rem,1.5vw,1.5rem)] relative flex flex-col min-h-[clamp(320px,55vh,640px)]">
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none rounded-[clamp(1rem,2vw,1.5rem)] overflow-hidden">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid-pattern-2" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8a1538" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid-pattern-2)" /></svg>
            </div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-[clamp(1rem,1.5vw,1.5rem)] border-b border-gray-100 pb-4 shrink-0">
                <div>
                  <h3 className="font-black text-gray-900 text-[clamp(1rem,1.5vw,1.25rem)]">الموقع الجغرافي</h3>
                  <p className="text-[clamp(0.6rem,0.8vw,0.75rem)] font-bold text-gray-500 mt-1">اختر المحافظة لتصفية الفعاليات</p>
                </div>
                {eventLocation !== 'الكل' && (
                  <button onClick={() => setEventLocation('الكل')} className="text-[0.6875rem] font-bold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors shrink-0 cursor-pointer mt-1">إلغاء</button>
                )}
              </div>
              <div className="flex-grow w-full flex items-center justify-center pt-2 pb-4">
                <JordanMap activeLocation={eventLocation} onLocationSelect={setEventLocation} />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[65%] xl:w-[68%] z-10">
          {isPersonalized && (
            <div className="mb-6 flex flex-wrap items-center gap-2 text-[11px] sm:text-[13px] xl:text-[13px] font-bold text-gray-500 bg-white px-4 py-3 rounded-xl border border-gray-100 shadow-sm w-full">
              <span>نعرض الفرص لـ:</span>
              {eventPathwayFilter !== 'الكل' && <span className="text-[#8a1538] truncate">{eventPathwayFilter}</span>}
              {eventTypeFilter !== 'الكل' && <><span className="text-gray-300">•</span><span className="text-[#8a1538] truncate">{eventTypeFilter}</span></>}
              {eventLocation !== 'الكل' && <><span className="text-gray-300">•</span><span className="text-[#8a1538]">{eventLocation}</span></>}
              {eventAgeFilter !== 'الكل' && <><span className="text-gray-300">•</span><span className="text-[#8a1538]">عمر {eventAgeFilter}</span></>}
              {eventSearch !== '' && <><span className="text-gray-300">•</span><span className="text-[#8a1538] truncate max-w-[80px]">"{eventSearch}"</span></>}
              <span className="text-gray-500 font-medium mr-auto">({filteredEvents.length} نتيجة)</span>
            </div>
          )}
          <AnimatePresence mode="wait">
            {filteredEvents.length > 0 ? (
              <motion.div key="events-grid" variants={staggerContainer} initial="hidden" animate="visible" exit="hidden" className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(1rem,1.5vw,1.5rem)]">
                {filteredEvents.map((event, index) => {
                  const tagStyle = getPathwayStyle(event.pathway);
                  const isUrgent = index % 5 === 1;

                  return (
                    <motion.div 
                      variants={fadeUpVariants} key={event.id} onClick={() => setSelectedEvent(event)} 
                      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full cursor-pointer"
                    >
                      {/* 🟢 تصغير ارتفاع صورة الكرت على الموبايل من 160px إلى 140px */}
                      <div className="relative h-[clamp(140px,20vh,192px)] overflow-hidden bg-gray-100 shrink-0">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                        {isUrgent && (
                          <div className="absolute top-3 left-3 bg-red-600/90 backdrop-blur-sm text-white px-2.5 py-1.5 rounded-md text-[0.6875rem] font-black flex items-center gap-1.5 shadow-lg"><Timer className="w-3 h-3" /> متاح الآن</div>
                        )}
                        <div className={`absolute top-3 right-3 px-2.5 py-1.5 text-[0.6875rem] font-black rounded-md shadow-sm border ${tagStyle}`}>{event.pathway}</div>
                      </div>
                      
                      {/* 🟢 تصغير الـ Padding الداخلي على الموبايل */}
                      <div className="p-[clamp(0.875rem,1.5vw,1.25rem)] flex flex-col flex-grow">
                        <div className="mb-[clamp(0.75rem,1.5vw,1.25rem)]">
                          {/* 🟢 تصغير خط عنوان الفعالية */}
                          <h3 className="font-black text-[clamp(0.8rem,1.2vw,0.9375rem)] text-gray-900 mb-[clamp(0.4rem,1vw,0.75rem)] line-clamp-2 group-hover:text-[#8a1538] transition-colors leading-relaxed">{event.title}</h3>
                          <div className="space-y-[clamp(0.25rem,0.5vw,0.5rem)]">
                            <div className="flex items-center gap-2 text-gray-500 text-[clamp(0.6rem,0.9vw,0.75rem)] font-bold"><Calendar className="w-3.5 h-3.5 text-[#C08F2D]" /> {event.date}</div>
                            <div className="flex items-center gap-2 text-gray-500 text-[clamp(0.6rem,0.9vw,0.75rem)] font-bold"><MapPin className="w-3.5 h-3.5 text-[#C08F2D]" /> <span className="truncate">{event.city} - {event.location}</span></div>
                          </div>
                        </div>
                        <div className="mt-auto pt-[clamp(0.6rem,1vw,1rem)] border-t border-gray-100 flex items-center justify-end">
                          {/* 🟢 تصغير زر التفاصيل */}
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedEvent(event); }} 
                            className="flex items-center gap-1.5 md:gap-2 bg-[#8a1538] hover:bg-[#680f2a] text-white px-[clamp(0.75rem,1.5vw,1.25rem)] py-[clamp(0.4rem,0.8vw,0.625rem)] rounded-xl font-black text-[clamp(0.6rem,0.9vw,0.75rem)] transition-colors shadow-md group/btn"
                          >
                            التفاصيل <ArrowUpLeft className="w-[clamp(0.6rem,1vw,0.875rem)] h-[clamp(0.6rem,1vw,0.875rem)] transform group-hover/btn:-translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-[clamp(3rem,5vh,5rem)] flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-dashed border-gray-200 h-full">
                <div className="w-[clamp(3.5rem,4vw,4rem)] h-[clamp(3.5rem,4vw,4rem)] bg-gray-50 rounded-full flex items-center justify-center mb-[clamp(1rem,1.5vw,1.25rem)]"><Search className="w-8 h-8 text-gray-300" /></div>
                <p className="text-gray-900 font-black text-[clamp(1.1rem,1.5vw,1.25rem)] mb-2">لا توجد نتائج مطابقة</p>
                <p className="text-gray-500 font-medium text-[clamp(0.75rem,1vw,0.875rem)] max-w-sm mx-auto mb-[clamp(1rem,2vw,1.5rem)] px-4">لم نتمكن من إيجاد فرص تطابق الفلاتر المحددة. جرب تغيير الإعدادات.</p>
                <button onClick={() => { setEventTypeFilter('الكل'); setEventPathwayFilter('الكل'); setEventAgeFilter('الكل'); setEventLocation('الكل'); setEventSearch(''); }} className="bg-[#C08F2D] hover:bg-[#a67b25] text-white px-[clamp(1.25rem,2vw,1.5rem)] py-[clamp(0.6rem,1vw,0.75rem)] rounded-xl font-black text-[clamp(0.8rem,1vw,0.875rem)] transition-colors shadow-lg cursor-pointer">إعادة ضبط جميع الفلاتر</button>
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