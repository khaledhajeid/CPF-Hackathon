// src/pages/ExplorerPage.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Calendar, ShieldCheck, ArrowRight, Layers } from 'lucide-react';
import { allEvents } from '../data';

export default function ExplorerPage({ onNavigate, handleRegisterClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRegion, setActiveRegion] = useState('الكل');
  const [activePathway, setActivePathway] = useState('الكل');

  const filteredData = useMemo(() => {
    return allEvents.filter(event => {
      const matchSearch = event.title.includes(searchTerm) || event.desc?.includes(searchTerm);
      const matchRegion = activeRegion === 'الكل' || event.city === activeRegion;
      const matchPathway = activePathway === 'الكل' || event.pathway.includes(activePathway);
      return matchSearch && matchRegion && matchPathway;
    });
  }, [searchTerm, activeRegion, activePathway]);

  const regions = ['الكل', 'عمان', 'إربد', 'العقبة'];
  
  const pathways = [
    { name: 'الكل', color: '#721F31' }, 
    { name: 'القيادة', color: '#2b307e' }, 
    { name: 'المشاركة الاقتصادية', color: '#a00023' }, 
    { name: 'التنمية المجتمعية', color: '#1f5412' } 
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      // 🟢 استخدام 100dvh للموبايل وتقليل الـ pt-20 لـ pt-16
      className="min-h-[100dvh] bg-[#F4F7FA] flex flex-col font-sans pt-16 lg:pt-20 pb-20 md:pb-0"
      dir="rtl"
    >
      {/* 1. شريط التحكم العلوي */}
      <div className="bg-white border-b border-gray-200 lg:sticky lg:top-20 z-40 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-4 lg:py-6 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4 lg:gap-6">
          
          <div className="flex items-center gap-3 lg:gap-5 shrink-0 justify-between xl:justify-start">
            <div className="flex items-center gap-3 lg:gap-5">
              <button 
                onClick={() => onNavigate('home')}
                className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-50 hover:bg-[#8a1538] border border-gray-200 hover:border-[#8a1538] rounded-xl lg:rounded-sm flex items-center justify-center transition-all text-gray-600 hover:text-white cursor-pointer"
                title="العودة للرئيسية"
              >
                <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
              <div className="relative">
                <div className="absolute -top-3 lg:-top-4 right-0 text-[#C08F2D]">
                  <svg width="16" height="6" lg:width="20" lg:height="8" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M2 10 A 10 10 0 0 1 22 10" strokeLinecap="round"/>
                  </svg>
                </div>
                <h1 className="text-lg lg:text-2xl font-black text-gray-900 tracking-tight">المنصة الجيومكانية الموحدة</h1>
                <p className="hidden sm:block text-[10px] lg:text-xs font-black text-gray-400 uppercase tracking-widest mt-0.5 lg:mt-1">شباب قادر.. لأردن طموح</p>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-2xl relative w-full">
            <input 
              type="text" 
              placeholder="ابحث برمز الفعالية، البرنامج..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:border-[#8a1538] rounded-xl lg:rounded-sm py-3.5 lg:py-4 px-10 lg:px-12 text-[13px] lg:text-base font-bold outline-none transition-all shadow-inner"
            />
            <Search className="absolute right-3.5 lg:right-4 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
          </div>

        </div>
      </div>

      {/* 2. الهيكل المنقسم (Split Layout) */}
      <div className="flex-1 max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row items-stretch">
        
        {/* النصف الأيمن: الفلاتر وقائمة الفعاليات */}
        <div className="w-full lg:w-[45%] xl:w-[40%] bg-white lg:border-l border-gray-200 flex flex-col h-auto lg:h-[calc(100vh-165px)] overflow-hidden relative z-20">
          
          <div className="p-4 lg:p-6 border-b border-gray-100 bg-gray-50/50 shrink-0 space-y-4 lg:space-y-5">
            
            <div>
              <span className="text-[9px] lg:text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">تصفية حسب المسار</span>
              {/* 🟢 Grid للمسارات عشان ما ياخذوا مساحة بالطول */}
              <div className="grid grid-cols-2 gap-2">
                {pathways.map(p => (
                  <button 
                    key={p.name} onClick={() => setActivePathway(p.name)}
                    className="px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl lg:rounded-sm text-[11px] lg:text-xs font-black transition-all border flex items-center justify-between cursor-pointer shadow-sm"
                    style={{ 
                      borderColor: activePathway === p.name ? p.color : '#e5e7eb',
                      backgroundColor: activePathway === p.name ? `${p.color}0a` : '#ffffff',
                      color: activePathway === p.name ? p.color : '#4b5563'
                    }}
                  >
                    <span className="truncate">{p.name === 'الكل' ? 'جميع المسارات' : p.name}</span>
                    {activePathway === p.name && <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full shrink-0 ml-1" style={{ backgroundColor: p.color }}></div>}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[9px] lg:text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">النطاق الإقليمي</span>
              {/* 🟢 أزرار المحافظات */}
              <div className="flex flex-wrap gap-2">
                {regions.map(r => (
                  <button 
                    key={r} onClick={() => setActiveRegion(r)}
                    className={`flex-1 min-w-[70px] py-2.5 lg:py-3 rounded-xl lg:rounded-sm text-[11px] lg:text-xs font-black border transition-all cursor-pointer shadow-sm ${activeRegion === r ? 'bg-[#8a1538] border-[#8a1538] text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                  >
                    {r === 'الكل' ? 'الكل' : r}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* 🟢 الخريطة المصغرة للموبايل (تظهر فقط للشاشات الصغيرة) */}
          <div className="lg:hidden w-full h-[200px] bg-[#1a0409] relative overflow-hidden border-b border-gray-200">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <pattern id="map-geo-pattern-mobile" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 40L40 0ZM-10 10L10 -10ZM30 50L50 30Z" stroke="#ffffff" strokeWidth="1" fill="none"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#map-geo-pattern-mobile)" />
              </svg>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="w-full h-full relative border border-white/10 rounded-xl bg-black/20 backdrop-blur-sm flex items-center justify-center">
                <svg viewBox="0 0 200 300" className="w-full h-full max-h-[150px] text-white/[0.05] stroke-current fill-none" strokeWidth="1">
                  <path d="M100 10 C120 40, 150 80, 140 120 C130 160, 160 200, 130 240 C110 270, 90 290, 85 300" />
                  <path d="M80 30 C90 70, 110 110, 100 150 C90 190, 110 230, 95 270" strokeDasharray="2 2" />
                </svg>

                {/* دبابيس الموبايل */}
                <motion.button onClick={() => setActiveRegion('إربد')} className={`absolute top-[20%] right-[40%] flex items-center gap-1.5 p-1.5 rounded-lg border transition-all ${activeRegion === 'إربد' ? 'bg-[#2b307e] border-[#2b307e] text-white' : 'bg-white/5 border-white/10 text-white/70'}`}>
                  <div className="relative flex h-2 w-2 shrink-0"><span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${activeRegion === 'إربد' ? 'bg-white' : 'bg-[#2b307e]'}`}></span><span className={`relative inline-flex rounded-full h-2 w-2 ${activeRegion === 'إربد' ? 'bg-white' : 'bg-[#2b307e]'}`}></span></div>
                  <span className="text-[9px] font-black">إربد</span>
                </motion.button>

                <motion.button onClick={() => setActiveRegion('عمان')} className={`absolute top-[45%] right-[30%] flex items-center gap-1.5 p-1.5 rounded-lg border transition-all ${activeRegion === 'عمان' ? 'bg-[#8a1538] border-[#8a1538] text-white' : 'bg-white/5 border-white/10 text-white/70'}`}>
                  <div className="relative flex h-2 w-2 shrink-0"><span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${activeRegion === 'عمان' ? 'bg-white' : 'bg-[#8a1538]'}`}></span><span className={`relative inline-flex rounded-full h-2 w-2 ${activeRegion === 'عمان' ? 'bg-white' : 'bg-[#8a1538]'}`}></span></div>
                  <span className="text-[9px] font-black">عمان</span>
                </motion.button>

                <motion.button onClick={() => setActiveRegion('العقبة')} className={`absolute bottom-[25%] left-[25%] flex items-center gap-1.5 p-1.5 rounded-lg border transition-all ${activeRegion === 'العقبة' ? 'bg-[#a00023] border-[#a00023] text-white' : 'bg-white/5 border-white/10 text-white/70'}`}>
                  <div className="relative flex h-2 w-2 shrink-0"><span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${activeRegion === 'العقبة' ? 'bg-white' : 'bg-[#a00023]'}`}></span><span className={`relative inline-flex rounded-full h-2 w-2 ${activeRegion === 'العقبة' ? 'bg-white' : 'bg-[#a00023]'}`}></span></div>
                  <span className="text-[9px] font-black">العقبة</span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* منطقة الفرص */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 bg-white flex flex-col gap-4 lg:gap-5 min-h-[400px] lg:min-h-0">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2 lg:pb-3">
              <h3 className="font-black text-gray-900 text-[13px] lg:text-sm flex items-center gap-1.5 lg:gap-2">
                <Layers className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#C08F2D]" /> المتاحة للتسجيل
              </h3>
              <span className="text-[10px] lg:text-xs font-black text-white bg-[#8a1538] px-2.5 py-1 rounded-md lg:rounded-sm shadow-sm">{filteredData.length} مبادرة</span>
            </div>

            <AnimatePresence mode="popLayout">
              {filteredData.length > 0 ? (
                filteredData.map((event, idx) => (
                  <motion.div 
                    key={event.id} layout
                    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="bg-white border border-gray-200 hover:border-[#8a1538] rounded-xl lg:rounded-sm transition-all overflow-hidden flex flex-col shadow-sm hover:shadow-md group cursor-pointer"
                    onClick={() => handleRegisterClick(event)}
                  >
                    <div className="bg-gray-50 px-3 lg:px-4 py-2 lg:py-3 border-b border-gray-100 flex justify-between items-center text-[9px] lg:text-[10px] font-black">
                      <span className="text-gray-500">{event.pathway}</span>
                      <div className="w-[1px] h-3 bg-gray-200"></div>
                      <span className="text-[#8a1538] uppercase tracking-wider">مؤسسة ولي العهد</span>
                    </div>

                    <div className="p-4 lg:p-5">
                      <h4 className="font-black text-gray-900 text-[15px] lg:text-lg mb-2 lg:mb-3 leading-tight group-hover:text-[#8a1538] transition-colors">{event.title}</h4>
                      <div className="flex flex-wrap items-center gap-3 lg:gap-4 text-[11px] lg:text-xs font-bold text-gray-500 mb-4 lg:mb-6">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#C08F2D]" /> {event.date}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#C08F2D]" /> {event.location}</span>
                      </div>

                      <button 
                        onClick={(e) => { e.stopPropagation(); handleRegisterClick(event); }}
                        className="w-full bg-[#8a1538] hover:bg-[#680f2a] text-white py-3 lg:py-3.5 rounded-lg lg:rounded-sm font-black text-[11px] lg:text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 border border-[#8a1538] cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4" /> حجز التذكرة
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                 <div className="flex flex-col items-center justify-center py-12 text-center opacity-50">
                    <Search className="w-10 h-10 text-gray-300 mb-3" />
                    <p className="text-sm font-black text-gray-500">لا توجد مبادرات تطابق الفلاتر المحددة</p>
                 </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* النصف الأيسر: الخريطة التفاعلية الجغرافية الكاملة (للكمبيوتر فقط) */}
        <div className="hidden lg:flex flex-1 bg-[#1a0409] relative overflow-hidden h-[calc(100vh-165px)] sticky top-[165px]">
          
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <pattern id="map-geo-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M0 80L80 0ZM-20 20L20 -20ZM60 100L100 60Z" stroke="#ffffff" strokeWidth="2" fill="none"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#map-geo-pattern)" />
            </svg>
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="w-full h-full max-w-2xl max-h-[600px] relative border border-white/10 rounded-xl bg-black/20 backdrop-blur-sm shadow-2xl flex items-center justify-center">
              
              <svg viewBox="0 0 200 300" className="w-full h-full max-h-[500px] text-white/[0.03] stroke-current fill-none" strokeWidth="1">
                <path d="M100 10 C120 40, 150 80, 140 120 C130 160, 160 200, 130 240 C110 270, 90 290, 85 300" />
                <path d="M80 30 C90 70, 110 110, 100 150 C90 190, 110 230, 95 270" strokeDasharray="4 4" />
              </svg>

              <motion.button whileHover={{ scale: 1.05 }} onClick={() => setActiveRegion('إربد')} className={`absolute top-[20%] right-[45%] flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${activeRegion === 'إربد' ? 'bg-[#2b307e] border-[#2b307e] text-white shadow-[0_0_30px_rgba(43,48,126,0.5)]' : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'}`}>
                <div className="relative flex h-3 w-3 shrink-0"><span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activeRegion === 'إربد' ? 'bg-white' : 'bg-[#2b307e]'}`}></span><span className={`relative inline-flex rounded-full h-3 w-3 ${activeRegion === 'إربد' ? 'bg-white' : 'bg-[#2b307e]'}`}></span></div>
                <span className="text-xs font-black tracking-wide">إقليم الشمال (إربد)</span>
              </motion.button>

              <motion.button whileHover={{ scale: 1.05 }} onClick={() => setActiveRegion('عمان')} className={`absolute top-[45%] right-[35%] flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${activeRegion === 'عمان' ? 'bg-[#8a1538] border-[#8a1538] text-white shadow-[0_0_30px_rgba(138,21,56,0.5)]' : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'}`}>
                <div className="relative flex h-3 w-3 shrink-0"><span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activeRegion === 'عمان' ? 'bg-white' : 'bg-[#8a1538]'}`}></span><span className={`relative inline-flex rounded-full h-3 w-3 ${activeRegion === 'عمان' ? 'bg-white' : 'bg-[#8a1538]'}`}></span></div>
                <span className="text-xs font-black tracking-wide">إقليم الوسط (عمان)</span>
              </motion.button>

              <motion.button whileHover={{ scale: 1.05 }} onClick={() => setActiveRegion('العقبة')} className={`absolute bottom-[25%] left-[25%] flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${activeRegion === 'العقبة' ? 'bg-[#a00023] border-[#a00023] text-white shadow-[0_0_30px_rgba(160,0,35,0.5)]' : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'}`}>
                <div className="relative flex h-3 w-3 shrink-0"><span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activeRegion === 'العقبة' ? 'bg-white' : 'bg-[#a00023]'}`}></span><span className={`relative inline-flex rounded-full h-3 w-3 ${activeRegion === 'العقبة' ? 'bg-white' : 'bg-[#a00023]'}`}></span></div>
                <span className="text-xs font-black tracking-wide">إقليم الجنوب (العقبة)</span>
              </motion.button>

              <div className="absolute bottom-6 right-6 flex items-center gap-2 opacity-40 select-none text-white text-[10px] font-black tracking-widest uppercase">
                <span>نظام المؤشرات التفاعلي الموحد v2.0</span>
              </div>
            </div>
          </div>

          <div className="absolute top-8 left-8 bg-[#111111]/90 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow-2xl max-w-xs z-30">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 bg-[#C08F2D] rounded-sm"></div>
              <h3 className="font-black text-white text-xs uppercase tracking-wider">التوزيع الجغرافي الاستراتيجي</h3>
            </div>
            <p className="text-xs text-white/75 font-bold leading-relaxed">
              تلتزم مؤسسة ولي العهد بتوسيع نطاق المبادرات والوصول للشباب الأردني في كافة محافظات وأقاليم المملكة لضمان شمولية التنمية المستدامة وتكافؤ الفرص المتاحة.
            </p>
          </div>

        </div>
      </div>
      
    </motion.div>
  );
}