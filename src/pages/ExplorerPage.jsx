// src/pages/ExplorerPage.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Calendar, ShieldCheck, ArrowRight, Star, ChevronDown, Layers } from 'lucide-react';
import { allEvents } from '../data';

export default function ExplorerPage({ onNavigate, handleRegisterClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRegion, setActiveRegion] = useState('الكل');
  const [activePathway, setActivePathway] = useState('الكل');

  // محرك التصفية متعدد الأبعاد اللحظي
  const filteredData = useMemo(() => {
    return allEvents.filter(event => {
      const matchSearch = event.title.includes(searchTerm) || event.desc?.includes(searchTerm);
      const matchRegion = activeRegion === 'الكل' || event.city === activeRegion;
      const matchPathway = activePathway === 'الكل' || event.pathway.includes(activePathway);
      return matchSearch && matchRegion && matchPathway;
    });
  }, [searchTerm, activeRegion, activePathway]);

  const regions = ['الكل', 'عمان', 'إربد', 'العقبة'];
  
  // المسارات الرسمية مع ألوانها السيادية من دليل الهوية (صفحة 9)
  const pathways = [
    { name: 'الكل', color: '#721F31' }, // العنابي الأساسي
    { name: 'القيادة', color: '#2b307e' }, // الأزرق الرسمي للمسار
    { name: 'المشاركة الاقتصادية', color: '#a00023' }, // الأحمر الرسمي للمسار
    { name: 'التنمية المجتمعية', color: '#1f5412' } // الأخضر الرسمي للمسار
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans pt-20"
    >
      {/* 1. شريط التحكم العلوي - ضخم، فخم ونظيف جداً */}
      <div className="bg-white border-b-2 border-gray-200 sticky top-20 z-40 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-6 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-6">
          
          {/* الترويسة الرسمية */}
          <div className="flex items-center gap-5 shrink-0">
            <button 
              onClick={() => onNavigate('home')}
              className="w-12 h-12 bg-gray-50 hover:bg-[#721F31] border-2 border-gray-200 hover:border-[#721F31] rounded-sm flex items-center justify-center transition-all text-gray-600 hover:text-white"
              title="العودة للرئيسية"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="relative">
              {/* القوس الهيكلي الصغير فوق العنوان من روح الشعار */}
              <div className="absolute -top-4 right-0 text-[#C08F2D]">
                <svg width="20" height="8" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M2 10 A 10 10 0 0 1 22 10" strokeLinecap="round"/>
                </svg>
              </div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">المنصة الجيومكانية الموحدة</h1>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">شباب قادر.. لأردن طموح</p>
            </div>
          </div>

          {/* حقل البحث الضخم (Enterprise Input Box) */}
          <div className="flex-1 max-w-2xl relative w-full">
            <input 
              type="text" 
              placeholder="ابحث برمز الفعالية، اسم البرنامج، أو المهارة المستهدفة..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border-2 border-gray-200 focus:border-[#721F31] rounded-sm py-4 px-12 text-base font-bold outline-none transition-all shadow-inner"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

        </div>
      </div>

      {/* 2. الهيكل المنقسم (Split Layout) ممتد بالكامل */}
      <div className="flex-1 max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row items-stretch">
        
        {/* النصف الأيمن: الفلاتر الكبيرة وقائمة الفعاليات */}
        <div className="w-full lg:w-[45%] xl:w-[40%] bg-white border-l-2 border-gray-200 flex flex-col h-[calc(100vh-165px)] overflow-hidden relative z-20">
          
          {/* كتل الفلاتر الهندسية الضخمة (تمنع ضياع المستخدم) */}
          <div className="p-6 border-b border-gray-200 bg-gray-50/50 shrink-0 space-y-5">
            
            {/* فلاتر المسارات بألوان الهوية الرسمية */}
            <div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2.5">تصفية المعايير حسب المسار الاستراتيجي</span>
              <div className="grid grid-cols-2 gap-2">
                {pathways.map(p => (
                  <button 
                    key={p.name} onClick={() => setActivePathway(p.name)}
                    className="px-4 py-3 rounded-sm text-xs font-black transition-all border-2 text-right flex items-center justify-between"
                    style={{ 
                      borderColor: activePathway === p.name ? p.color : '#e5e7eb',
                      backgroundColor: activePathway === p.name ? `${p.color}0a` : '#ffffff',
                      color: activePathway === p.name ? p.color : '#4b5563'
                    }}
                  >
                    {p.name === 'الكل' ? 'جميع المسارات' : p.name}
                    {activePathway === p.name && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></div>}
                  </button>
                ))}
              </div>
            </div>

            {/* فلاتر المحافظات الكبيرة */}
            <div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2.5">النطاق الإقليمي للمملكة</span>
              <div className="flex gap-2">
                {regions.map(r => (
                  <button 
                    key={r} onClick={() => setActiveRegion(r)}
                    className={`flex-1 py-3 rounded-sm text-xs font-black border-2 transition-all ${activeRegion === r ? 'bg-[#721F31] border-[#721F31] text-white shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'}`}
                  >
                    {r === 'الكل' ? 'كل المحافظات' : r}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* منطقة الفرص القابلة للتمرير */}
          <div className="flex-1 overflow-y-auto p-6 bg-white flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-gray-900 text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#C08F2D]" /> الفرص المتاحة للتسجيل الفوري
              </h3>
              <span className="text-xs font-black text-white bg-[#721F31] px-3 py-1 rounded-sm">{filteredData.length} مبادرة</span>
            </div>

            <AnimatePresence mode="popLayout">
              {filteredData.map((event, idx) => (
                <motion.div 
                  key={event.id} layout
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-white border-2 border-gray-200/70 hover:border-[#721F31] rounded-sm transition-all overflow-hidden flex flex-col shadow-sm hover:shadow-md group"
                >
                  {/* هيدر الكرت يلتزم صراحة بـ Co-branding أحد برامج مؤسسة ولي العهد */}
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex justify-between items-center text-[10px] font-black">
                    <span className="text-gray-500">{event.pathway}</span>
                    <div className="w-[1px] h-3 bg-gray-200"></div>
                    <span className="text-[#721F31] uppercase tracking-wider">أحد برامج مؤسسة ولي العهد</span>
                  </div>

                  <div className="p-5">
                    <h4 className="font-black text-gray-900 text-lg mb-2 leading-tight group-hover:text-[#721F31] transition-colors">{event.title}</h4>
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-6">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#C08F2D]" /> {event.date}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#C08F2D]" /> {event.location}</span>
                    </div>

                    {/* زر الإجراء الضخم والواضح للمحافظات */}
                    <button 
                      onClick={() => handleRegisterClick(event)}
                      className="w-full bg-[#721F31] hover:bg-[#4a1420] text-white py-3.5 rounded-sm font-black text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 border border-[#721F31]"
                    >
                      <ShieldCheck className="w-4 h-4" /> حجز المقعد والتذكرة عبر سند
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* النصف الأيسر: الخريطة التفاعلية الجغرافية الكاملة للأردن */}
        <div className="hidden lg:flex flex-1 bg-[#1a070b] relative overflow-hidden h-[calc(100vh-165px)] sticky top-[165px]">
          
          {/* الخلفية الهندسية الرسمية المعتمدة (Patterns صفحة 10) */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <pattern id="map-geo-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M0 80L80 0ZM-20 20L20 -20ZM60 100L100 60Z" stroke="#ffffff" strokeWidth="2" fill="none"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#map-geo-pattern)" />
            </svg>
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-12">
            {/* الهيكل الحقيقي والمنحني الجغرافي للأردن بالخطوط السيادية الرفيعة */}
            <div className="w-full h-full max-w-2xl max-h-[600px] relative border-2 border-white/5 rounded-sm bg-black/20 backdrop-blur-sm shadow-2xl flex items-center justify-center">
              
              {/* رسم تخطيطي قوسي يحاكي تمدد الخارطة الاستراتيجية للمملكة */}
              <svg viewBox="0 0 200 300" className="w-full h-full max-h-[500px] text-white/[0.03] stroke-current fill-none" strokeWidth="1">
                <path d="M100 10 C120 40, 150 80, 140 120 C130 160, 160 200, 130 240 C110 270, 90 290, 85 300" />
                <path d="M80 30 C90 70, 110 110, 100 150 C90 190, 110 230, 95 270" strokeDasharray="4 4" />
              </svg>

              {/* دبوس مؤشر إقليم الشمال (إربد) */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveRegion('إربد')}
                className={`absolute top-[20%] right-[45%] flex items-center gap-3 p-3 rounded-sm border-2 transition-all ${activeRegion === 'إربد' ? 'bg-[#2b307e] border-[#2b307e] text-white shadow-[0_0_30px_rgba(43,48,126,0.5)]' : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'}`}
              >
                <div className="relative flex h-3 w-3 shrink-0">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activeRegion === 'إربد' ? 'bg-white' : 'bg-[#2b307e]'}`}></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${activeRegion === 'إربد' ? 'bg-white' : 'bg-[#2b307e]'}`}></span>
                </div>
                <span className="text-xs font-black tracking-wide">إقليم الشمال (إربد)</span>
              </motion.button>

              {/* دبوس مؤشر إقليم الوسط (عمان) */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveRegion('عمان')}
                className={`absolute top-[45%] right-[35%] flex items-center gap-3 p-3 rounded-sm border-2 transition-all ${activeRegion === 'عمان' ? 'bg-[#721F31] border-[#721F31] text-white shadow-[0_0_30px_rgba(114,31,49,0.5)]' : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'}`}
              >
                <div className="relative flex h-3 w-3 shrink-0">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activeRegion === 'عمان' ? 'bg-white' : 'bg-[#721F31]'}`}></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${activeRegion === 'عمان' ? 'bg-white' : 'bg-[#721F31]'}`}></span>
                </div>
                <span className="text-xs font-black tracking-wide">إقليم الوسط (عمان)</span>
              </motion.button>

              {/* دبوس مؤشر إقليم الجنوب (العقبة) */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveRegion('العقبة')}
                className={`absolute bottom-[25%] left-[25%] flex items-center gap-3 p-3 rounded-sm border-2 transition-all ${activeRegion === 'العقبة' ? 'bg-[#a00023] border-[#a00023] text-white shadow-[0_0_30px_rgba(160,0,35,0.5)]' : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'}`}
              >
                <div className="relative flex h-3 w-3 shrink-0">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activeRegion === 'العقبة' ? 'bg-white' : 'bg-[#a00023]'}`}></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${activeRegion === 'العقبة' ? 'bg-white' : 'bg-[#a00023]'}`}></span>
                </div>
                <span className="text-xs font-black tracking-wide">إقليم الجنوب (العقبة)</span>
              </motion.button>

              {/* اسم الطبقة الجيومكانية المثبتة بأسفل الخريطة */}
              <div className="absolute bottom-6 right-6 flex items-center gap-2 opacity-40 select-none text-white text-[10px] font-black tracking-widest uppercase">
                <span>نظام المؤشرات التفاعلي الموحد v2.0</span>
              </div>
            </div>
          </div>

          {/* لوحة بيان التوزيع الاستراتيجي الجانبية الفخمة باللون الأسود والذهبي */}
          <div className="absolute top-8 left-8 bg-[#111111]/90 backdrop-blur-md border border-white/10 p-6 rounded-sm shadow-2xl max-w-xs z-30">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 bg-[#C08F2D] rounded-sm"></div>
              <h3 className="font-black text-white text-xs uppercase tracking-wider">التوزيع الجغرافي الاستراتيجي</h3>
            </div>
            <p className="text-xs text-white/75 font-bold leading-relaxed">
              تلتزم مؤسسة ولي العهد بتوسيع نطاق المبادرات والوصول للشباب الأردني في كافة محافظات وأقاليم المملكة لضمان شمولية التنمية المستدامة وتكافؤ الفرص المتاحة[cite: 35, 36].
            </p>
          </div>

        </div>
      </div>
      
    </motion.div>
  );
}