// src/components/Dashboard.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, ScanLine, Ticket, MapPin, Calendar, CalendarDays, X,
  Settings, User, Bell, Lock, LogOut, CreditCard, Clock,
  CheckCircle2, CircleDashed, ArrowUpLeft, BarChart3, ChevronLeft, ChevronRight, Map
} from 'lucide-react';

const ARABIC_MONTHS = {
  'كانون الثاني': 0, 'شباط': 1, 'آذار': 2, 'نيسان': 3, 'أيار': 4, 'حزيران': 5,
  'تموز': 6, 'آب': 7, 'أيلول': 8, 'تشرين الأول': 9, 'تشرين الثاني': 10, 'كانون الأول': 11,
};

const WEEKDAY_LABELS = ['أحد', 'إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت'];

// 🟢 بيانات تجريبية لتعبئة التقويم، عناوينها من allEvents في data.js
const MOCK_CALENDAR_EVENTS = [
  { id: 'm1', title: 'برنامج إعداد القيادات الشابة وصناع القرار', date: '15 آب 2026', city: 'العقبة', pathway: 'قُد', status: 'completed' },
  { id: 'm2', title: 'معسكر التصنيع الرقمي والطباعة ثلاثية الأبعاد', date: '25 آب 2026', city: 'عمان', pathway: 'تعلّم', status: 'completed' },
  { id: 'm3', title: 'ورشة فن الخطابة والتحدث أمام الجمهور', date: '02 أيلول 2026', city: 'الزرقاء', pathway: 'قُد', status: 'upcoming' },
  { id: 'm4', title: 'ورشة الذكاء الاصطناعي في خدمة التعليم', date: '08 أيلول 2026', city: 'أونلاين', pathway: 'تعلّم', status: 'upcoming' },
  { id: 'm5', title: 'دورة أساسيات ريادة الأعمال وبناء المشاريع الناشئة', date: '10 أيلول 2026', city: 'إربد', pathway: 'تعلّم', status: 'upcoming' },
  { id: 'm6', title: 'مخيم البرمجة وتطوير تطبيقات الهواتف الذكية', date: '20 أيلول 2026', city: 'أونلاين', pathway: 'تعلّم', status: 'upcoming' },
];

function parseArabicDate(str) {
  if (!str) return null;
  const match = Object.keys(ARABIC_MONTHS).find(name => str.includes(name));
  if (!match) return null;
  const day = parseInt(str, 10);
  const yearMatch = str.match(/\d{4}/);
  const year = yearMatch ? parseInt(yearMatch[0], 10) : new Date().getFullYear();
  if (!day) return null;
  return new Date(year, ARABIC_MONTHS[match], day);
}

export default function Dashboard({ onNavigate, myTickets }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTicketForQR, setSelectedTicketForQR] = useState(null);

  const [smsNotifications, setSmsNotifications] = useState(true);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const pastEvents = [
    { id: 'p1', title: 'دورة أساسيات ريادة الأعمال', date: '10 أيار 2026', type: 'المشاركة الاقتصادية', status: 'completed' },
    { id: 'p2', title: 'مبادرة شتاء دافئ للتطوع', date: '22 شباط 2026', type: 'التنمية المجتمعية', status: 'completed' },
  ];

  const calendarEvents = [
    ...myTickets.map(t => ({ id: t.id, title: t.title, dateStr: t.date, city: t.city, pathway: t.pathway, status: 'upcoming', parsed: parseArabicDate(t.date) })),
    ...pastEvents.map(ev => ({ id: ev.id, title: ev.title, dateStr: ev.date, city: null, pathway: ev.type, status: 'completed', parsed: parseArabicDate(ev.date) })),
    ...MOCK_CALENDAR_EVENTS.map(ev => ({ id: ev.id, title: ev.title, dateStr: ev.date, city: ev.city, pathway: ev.pathway, status: ev.status, parsed: parseArabicDate(ev.date) })),
  ].filter(ev => ev.parsed);

  const monthCounts = calendarEvents.reduce((acc, ev) => {
    const key = `${ev.parsed.getFullYear()}-${ev.parsed.getMonth()}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const busiestMonthKey = Object.keys(monthCounts).reduce(
    (best, key) => (!best || monthCounts[key] > monthCounts[best] ? key : best), null
  );
  const firstEventMonth = busiestMonthKey
    ? new Date(parseInt(busiestMonthKey.split('-')[0], 10), parseInt(busiestMonthKey.split('-')[1], 10), 1)
    : new Date(2026, 7, 1);

  const [calendarMonth, setCalendarMonth] = useState(firstEventMonth);
  const [selectedDay, setSelectedDay] = useState(null);

  const monthLabel = calendarMonth.toLocaleDateString('ar-JO', { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate();
  const firstWeekday = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1).getDay();

  const eventsByDay = calendarEvents.reduce((acc, ev) => {
    if (ev.parsed.getFullYear() === calendarMonth.getFullYear() && ev.parsed.getMonth() === calendarMonth.getMonth()) {
      const d = ev.parsed.getDate();
      acc[d] = [...(acc[d] || []), ev];
    }
    return acc;
  }, {});

  const changeMonth = (offset) => {
    setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    setSelectedDay(null);
  };

  const dayCells = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const selectedDayEvents = selectedDay ? (eventsByDay[selectedDay] || []) : [];

  return (
    <div className="min-h-[100dvh] bg-[#F4F7FA] pb-24 font-sans selection:bg-[#C08F2D] selection:text-white" dir="rtl">
      
      {/* =========================================
          1. الهيدر الفخم والخلفية
          ========================================= */}
      {/* 🟢 تعديل الارتفاع للموبايل */}
      <div className="bg-[#1a0409] h-[320px] md:h-[380px] pt-24 md:pt-28 relative overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem] shadow-md">
        <div className="absolute inset-0 bg-gradient-to-b from-[#8a1538]/80 to-[#1a0409]" />
        
        <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-overlay">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="cpf-dash-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M0 60 Q 30 30 60 60 T 120 60 M60 0 Q 90 30 60 60 T 60 120" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
              <path d="M-60 60 Q -30 30 0 60 T 60 60 M0 0 Q 30 30 0 60 T 0 120" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#cpf-dash-pattern)"></rect>
          </svg>
        </div>
        
        <div className="absolute top-0 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#C08F2D]/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      </div>

      {/* 🟢 تعديل الـ Margin السالب للموبايل */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 -mt-32 md:-mt-44 relative z-20">
        
        {/* =========================================
            2. الهوية الرقمية
            ========================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="flex justify-center mb-8 md:mb-12 w-full"
        >
          {/* كرت الهوية */}
          <div className="w-full max-w-md h-[220px] md:h-[240px] relative rounded-2xl md:rounded-[2rem] p-6 md:p-8 text-white shadow-2xl shadow-[#8a1538]/20 overflow-hidden shrink-0 group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#8a1538] via-[#680f2a] to-[#2d0511]" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
            <div className="absolute -right-10 -top-10 md:-right-20 md:-top-20 w-48 h-48 md:w-64 md:h-64 bg-[#C08F2D]/20 rounded-full blur-[40px] md:blur-[50px] group-hover:bg-[#C08F2D]/30 transition-all duration-700 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                <div className="inline-flex items-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#C08F2D]" />
                  <span className="text-[10px] md:text-[11px] font-black tracking-wider">موثق عبر سند</span>
                </div>
                <CreditCard className="w-6 h-6 md:w-8 md:h-8 text-white/40" strokeWidth={1} />
              </div>

              <div>
                <p className="text-white/60 text-[10px] md:text-[11px] font-black tracking-widest mb-0.5 md:mb-1 uppercase">الرقم الوطني</p>
                <p className="text-lg md:text-xl font-bold tracking-[0.2em] md:tracking-[0.3em] font-mono text-white/90">905<span className="text-white/40">XXXX</span>123</p>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-white/60 text-[10px] md:text-[11px] font-black tracking-widest mb-0.5 md:mb-1 uppercase">حامل البطاقة</p>
                  <p className="text-lg md:text-xl font-black tracking-tight">خالد الحاج عيد</p>
                </div>
                
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center p-2 md:p-2.5 shadow-inner">
                  <img src="/The-Star.png" alt="النجمة السباعية" className="w-full h-full object-contain drop-shadow-md" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* =========================================
            3. نظام التبويبات (Tabs) - 🟢 جعلناها Scrollable ع الموبايل
            ========================================= */}
        <div className="flex gap-2 mb-8 md:mb-10 overflow-x-auto pb-2 scrollbar-hide w-full">
          {[
            { id: 'overview', label: 'المسار الزمني', icon: Clock },
            { id: 'calendar', label: 'التقويم', icon: CalendarDays },
            { id: 'wallet', label: 'التذاكر والمحفظة', icon: Ticket },
            { id: 'analytics', label: 'بصمتك', icon: BarChart3 },
            { id: 'settings', label: 'الإعدادات', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-1.5 md:gap-2 px-5 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-[12px] md:text-[13px] transition-all duration-300 whitespace-nowrap cursor-pointer shrink-0 border ${
                  isActive 
                    ? 'bg-[#8a1538] text-white shadow-lg shadow-[#8a1538]/20 border-[#8a1538]' 
                    : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900 border-gray-100 shadow-sm'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#C08F2D]' : ''}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* =========================================
            4. محتوى التبويبات
            ========================================= */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} variants={staggerContainer} initial="hidden" animate="visible" exit="hidden" className="w-full">
            
            {/* التبويب الأول: نظرة عامة والمسار الزمني */}
            {activeTab === 'overview' && (
              <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
                
                {/* كرت الترحيب والفرصة التالية (عكسنا الترتيب عالموبايل عشان الترحيب يظهر أول) */}
                <motion.div variants={fadeUpVariants} className="w-full lg:w-3/5 space-y-5 md:space-y-6 order-1 lg:order-2">
                  <div className="bg-[#8a1538] rounded-2xl md:rounded-[2rem] p-6 md:p-8 text-white relative overflow-hidden shadow-md">
                    <div className="absolute top-0 right-0 w-full h-full bg-[url('/the-theme.svg')] opacity-10 bg-repeat bg-[length:150px]" />
                    <div className="relative z-10">
                      <h2 className="text-xl md:text-2xl font-black mb-2">أهلاً بك في منصتك، خالد!</h2>
                      <p className="text-white/80 font-medium text-[13px] md:text-sm leading-relaxed max-w-md">
                        هنا تجد كل ما يخص مسارك التنموي. استمر في حضور الفعاليات وبناء شبكة علاقاتك المهنية لفتح آفاق جديدة.
                      </p>
                      <button onClick={() => onNavigate('programs')} className="mt-6 md:mt-8 bg-[#C08F2D] hover:bg-[#a57a25] text-white px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-black text-[13px] md:text-sm transition-colors flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center">
                        استكشف فعاليات جديدة <ArrowUpLeft className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {myTickets.length > 0 && (
                    <div className="bg-white rounded-2xl md:rounded-[2rem] p-5 md:p-6 border border-gray-100 shadow-sm flex items-center justify-between">
                      <div className="pr-1">
                        <p className="text-[11px] md:text-xs font-black text-gray-500 mb-0.5 md:mb-1">محطتك القادمة</p>
                        <h4 className="text-[15px] md:text-lg font-black text-gray-900 line-clamp-1">{myTickets[0].title}</h4>
                      </div>
                      <button onClick={() => setActiveTab('wallet')} className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 mr-3">
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  )}
                </motion.div>

                {/* المسار الزمني (Timeline) */}
                <motion.div variants={fadeUpVariants} className="w-full lg:w-2/5 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-sm order-2 lg:order-1">
                  <div className="flex items-center justify-between mb-6 md:mb-8">
                    <h3 className="font-black text-lg md:text-xl text-gray-900">المسار الزمني لرحلتك</h3>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-50 flex items-center justify-center">
                      <Map className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                    </div>
                  </div>

                  <div className="relative pl-3 rtl:pl-0 rtl:pr-3 border-l-2 rtl:border-l-0 rtl:border-r-2 border-gray-100 space-y-6 md:space-y-8">
                    
                    {myTickets.map((ticket, idx) => (
                      <div key={`up-${idx}`} className="relative">
                        <div className="absolute -left-[21px] md:-left-[23px] rtl:left-auto rtl:-right-[21px] md:rtl:-right-[23px] top-1 bg-white p-1 rounded-full">
                          <div className="w-3 h-3 md:w-3.5 md:h-3.5 bg-[#C08F2D] rounded-full animate-pulse shadow-[0_0_10px_rgba(192,143,45,0.6)]" />
                        </div>
                        <div className="pr-5 md:pr-6 rtl:pr-0 rtl:pl-5 md:rtl:pl-6 text-right">
                          <span className="text-[10px] md:text-[11px] font-black text-[#C08F2D] bg-[#C08F2D]/10 px-2 py-1 rounded-md mb-1.5 md:mb-2 inline-block">قادم قريباً</span>
                          <h4 className="text-[14px] md:text-[15px] font-black text-gray-900 leading-tight mb-1">{ticket.title}</h4>
                          <p className="text-[11px] md:text-xs font-bold text-gray-500">{ticket.date}</p>
                        </div>
                      </div>
                    ))}

                    {pastEvents.map((ev) => (
                      <div key={ev.id} className="relative opacity-60">
                        <div className="absolute -left-[21px] md:-left-[23px] rtl:left-auto rtl:-right-[21px] md:rtl:-right-[23px] top-1 bg-white p-1 rounded-full">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        </div>
                        <div className="pr-5 md:pr-6 rtl:pr-0 rtl:pl-5 md:rtl:pl-6 text-right">
                          <span className="text-[9px] md:text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-md mb-1.5 md:mb-2 inline-block">مكتمل</span>
                          <h4 className="text-[14px] md:text-[15px] font-black text-gray-900 leading-tight mb-1">{ev.title}</h4>
                          <p className="text-[11px] md:text-xs font-bold text-gray-500">{ev.date} • {ev.type}</p>
                        </div>
                      </div>
                    ))}

                    {myTickets.length === 0 && (
                      <div className="relative">
                        <div className="absolute -left-[21px] md:-left-[23px] rtl:left-auto rtl:-right-[21px] md:rtl:-right-[23px] top-1 bg-white p-1 rounded-full">
                          <CircleDashed className="w-4 h-4 text-gray-300" />
                        </div>
                        <div className="pr-5 md:pr-6 rtl:pr-0 rtl:pl-5 md:rtl:pl-6 text-right">
                          <h4 className="text-[14px] md:text-[15px] font-black text-gray-500 leading-tight mb-1">رحلتك تبدأ من هنا</h4>
                          <p className="text-[11px] md:text-xs font-bold text-gray-500">استكشف الفرص المتاحة وسجل فيها.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>

              </div>
            )}

            {/* تبويب التقويم */}
            {activeTab === 'calendar' && (
              <motion.div variants={fadeUpVariants} className="bg-white rounded-2xl md:rounded-[2rem] p-5 md:p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <h3 className="font-black text-lg md:text-xl text-gray-900">{monthLabel}</h3>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <button onClick={() => changeMonth(-1)} className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer">
                      <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                    </button>
                    <button onClick={() => changeMonth(1)} className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer">
                      <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2 md:mb-3">
                  {WEEKDAY_LABELS.map(label => (
                    <span key={label} className="text-center text-[10px] md:text-xs font-black text-gray-400 py-1">{label}</span>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1 md:gap-2">
                  {dayCells.map((day, idx) => {
                    if (!day) return <div key={`empty-${idx}`} />;
                    const dayEvents = eventsByDay[day] || [];
                    const hasUpcoming = dayEvents.some(ev => ev.status === 'upcoming');
                    const isSelected = selectedDay === day;
                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(isSelected ? null : day)}
                        className={`aspect-square rounded-xl md:rounded-2xl flex flex-col items-center justify-center gap-1 relative text-[12px] md:text-sm font-black transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#8a1538] text-white'
                            : dayEvents.length > 0
                              ? 'bg-[#8a1538]/5 text-gray-900 hover:bg-[#8a1538]/10'
                              : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {day}
                        {dayEvents.length > 0 && (
                          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : hasUpcoming ? 'bg-[#C08F2D]' : 'bg-green-500'}`} />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-100">
                  {selectedDay ? (
                    selectedDayEvents.length > 0 ? (
                      <div className="space-y-3 md:space-y-4">
                        {selectedDayEvents.map(ev => (
                          <div key={ev.id} className="flex items-center gap-3 md:gap-4 bg-[#F8FAFC] border border-gray-100 rounded-xl md:rounded-2xl p-3.5 md:p-4">
                            <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${ev.status === 'upcoming' ? 'bg-[#C08F2D]' : 'bg-green-500'}`} />
                            <div className="min-w-0 flex-1">
                              <h4 className="text-[13px] md:text-[15px] font-black text-gray-900 leading-tight truncate">{ev.title}</h4>
                              <p className="text-[11px] md:text-xs font-bold text-gray-500 mt-0.5">{ev.pathway}{ev.city ? ` • ${ev.city}` : ''}</p>
                            </div>
                            <span className={`text-[9px] md:text-[10px] font-black px-2 py-1 rounded-md shrink-0 ${ev.status === 'upcoming' ? 'text-[#C08F2D] bg-[#C08F2D]/10' : 'text-green-600 bg-green-50'}`}>
                              {ev.status === 'upcoming' ? 'قادم' : 'مكتمل'}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-400 text-[13px] font-bold py-4">لا توجد فعاليات في هذا اليوم.</p>
                    )
                  ) : (
                    <p className="text-center text-gray-400 text-[13px] font-bold py-4">اختر يوماً يحتوي على نقطة لعرض تفاصيل فعالياته.</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* التبويب الثاني: محفظة التذاكر */}
            {activeTab === 'wallet' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8">
                {myTickets.length > 0 ? (
                  myTickets.map((ticket) => (
                    <motion.div key={ticket.id} variants={fadeUpVariants} className="bg-white rounded-2xl md:rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row relative overflow-hidden border border-gray-100 group">
                      
                      <div className="p-5 md:p-8 flex-grow">
                        <span className="text-[9px] md:text-[10px] font-black text-[#8a1538] bg-[#8a1538]/10 px-2.5 md:px-3 py-1.5 rounded-lg mb-3 md:mb-4 inline-block">
                          {ticket.pathway}
                        </span>
                        <h3 className="font-black text-lg md:text-xl text-gray-900 mb-4 leading-tight pr-2 md:pr-4">
                          {ticket.title}
                        </h3>
                        <div className="grid grid-cols-2 gap-3 md:gap-4 bg-gray-50/50 p-3 md:p-0 md:bg-transparent rounded-xl md:rounded-none">
                          <div>
                            <p className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">التاريخ</p>
                            <p className="text-[12px] md:text-sm font-black text-gray-800 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#C08F2D]" /> {ticket.date}</p>
                          </div>
                          <div>
                            <p className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">الموقع</p>
                            <p className="text-[12px] md:text-sm font-black text-gray-800 flex items-center gap-1.5 truncate"><MapPin className="w-3.5 h-3.5 text-[#C08F2D]" /> {ticket.city}</p>
                          </div>
                        </div>
                      </div>

                      {/* فاصل التذكرة (للتصميم المكتبي والتابلت) */}
                      <div className="hidden sm:flex flex-col items-center justify-between relative w-8 bg-white z-10">
                        <div className="w-8 h-8 bg-[#F4F7FA] rounded-full absolute -top-4 shadow-inner border-b border-gray-100" />
                        <div className="h-full border-l-2 border-dashed border-gray-200" />
                        <div className="w-8 h-8 bg-[#F4F7FA] rounded-full absolute -bottom-4 shadow-inner border-t border-gray-100" />
                      </div>

                      {/* 🟢 فاصل التذكرة (للتصميم الموبايل) */}
                      <div className="sm:hidden flex items-center justify-between relative h-6 bg-white z-10 mx-5">
                        <div className="w-6 h-6 bg-[#F4F7FA] rounded-full absolute -right-3 shadow-inner border-l border-gray-100" />
                        <div className="w-full border-t-2 border-dashed border-gray-200 mt-3" />
                        <div className="w-6 h-6 bg-[#F4F7FA] rounded-full absolute -left-3 shadow-inner border-r border-gray-100" />
                      </div>

                      <div className="bg-[#F8FAFC] p-5 md:p-8 sm:w-48 flex flex-col items-center justify-center text-center shrink-0 border-t-0 sm:border-t-0 sm:border-r border-dashed border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                           onClick={() => setSelectedTicketForQR(ticket)}>
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl shadow-sm flex items-center justify-center mb-2 md:mb-3 group-hover:scale-110 transition-transform">
                          <ScanLine className="w-6 h-6 md:w-8 md:h-8 text-[#8a1538]" />
                        </div>
                        <p className="text-[11px] md:text-xs font-black text-gray-900">امسح رمز الحضور</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div variants={fadeUpVariants} className="col-span-full py-20 md:py-32 flex flex-col items-center justify-center text-center bg-white rounded-2xl md:rounded-3xl border border-dashed border-gray-200 shadow-sm px-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5 md:mb-6 border border-gray-100">
                      <Ticket className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-gray-900 font-black text-xl md:text-2xl mb-2">محفظة التذاكر فارغة</p>
                    <p className="text-gray-500 font-medium text-[13px] md:text-sm mb-6 md:mb-8">لم تقم بالتسجيل في أي فرصة حتى الآن.</p>
                    <button onClick={() => onNavigate('programs')} className="bg-[#8a1538] hover:bg-[#680f2a] text-white px-6 md:px-8 py-3 md:py-3.5 rounded-full font-black text-[13px] md:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer">
                      استكشف المبادرات
                    </button>
                  </motion.div>
                )}
              </div>
            )}

            {/* التبويب الثالث: بصمتك التنموية (Analytics) */}
            {activeTab === 'analytics' && (
              <motion.div variants={fadeUpVariants} className="bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-12 border border-gray-100 shadow-sm">
                <div className="mb-8 md:mb-10 text-center max-w-lg mx-auto">
                  <BarChart3 className="w-10 h-10 md:w-12 md:h-12 text-[#C08F2D] mx-auto mb-3 md:mb-4" />
                  <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2">بصمتك في مبادرات المؤسسة</h3>
                </div>
                
                <div className="space-y-6 md:space-y-8 max-w-3xl mx-auto px-2 md:px-0">
                  <div>
                    <div className="flex justify-between text-[13px] md:text-sm font-black mb-2">
                      <span className="text-[#8a1538]">المشاركة الاقتصادية والريادة</span>
                      <span className="text-gray-900">60%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 md:h-3 overflow-hidden">
                      <div className="bg-[#8a1538] h-full rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[13px] md:text-sm font-black mb-2">
                      <span className="text-[#1f5412]">التنمية المجتمعية والتطوع</span>
                      <span className="text-gray-900">30%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 md:h-3 overflow-hidden">
                      <div className="bg-[#1f5412] h-full rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[13px] md:text-sm font-black mb-2">
                      <span className="text-[#2b307e]">القيادة والشباب</span>
                      <span className="text-gray-900">10%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 md:h-3 overflow-hidden">
                      <div className="bg-[#2b307e] h-full rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 md:mt-12 bg-blue-50/50 border border-blue-100 rounded-xl md:rounded-2xl p-5 md:p-6 text-center max-w-2xl mx-auto">
                  <p className="text-[#2b307e] font-medium text-[13px] md:text-sm leading-relaxed">
                    💡 <span className="font-black">نصيحة المنصة:</span> يظهر أن لديك شغفاً عالياً بريادة الأعمال والتقنية. ننصحك باستكشاف فرص "مصنع الأفكار" لتطوير مهاراتك بشكل عملي.
                  </p>
                </div>
              </motion.div>
            )}

            {/* التبويب الرابع: الإعدادات والأمان */}
            {activeTab === 'settings' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-2 space-y-5 md:space-y-6">
                  <motion.div variants={fadeUpVariants} className="bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-sm">
                    <h3 className="text-base md:text-lg font-black text-gray-900 mb-5 md:mb-6 flex items-center gap-2 border-b border-gray-50 pb-3 md:pb-4">
                      <User className="w-4 h-4 md:w-5 md:h-5 text-[#8a1538]" /> البيانات المدنية
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label className="block text-[11px] md:text-xs font-black text-gray-500 mb-1.5 md:mb-2">الاسم الكامل (لا يمكن تعديله)</label>
                        <input type="text" readOnly value="خالد محمد سليم الحاج عيد" className="w-full bg-gray-50 border border-gray-100 text-gray-700 font-bold text-[13px] md:text-[15px] py-3 md:py-3.5 px-4 rounded-xl cursor-not-allowed outline-none" />
                      </div>
                      <div>
                        <label className="block text-[11px] md:text-xs font-black text-gray-500 mb-1.5 md:mb-2">الرقم الوطني</label>
                        <input type="text" readOnly value="905xxxxxxx" className="w-full bg-gray-50 border border-gray-100 text-gray-700 font-bold text-[13px] md:text-[15px] py-3 md:py-3.5 px-4 rounded-xl cursor-not-allowed outline-none tracking-widest text-left" dir="ltr" />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUpVariants} className="bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-sm">
                    <h3 className="text-base md:text-lg font-black text-gray-900 mb-5 md:mb-6 flex items-center gap-2 border-b border-gray-50 pb-3 md:pb-4">
                      <Bell className="w-4 h-4 md:w-5 md:h-5 text-[#8a1538]" /> الإشعارات والتواصل
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3.5 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100">
                        <div className="pr-1">
                          <p className="text-[13px] md:text-[15px] font-black text-gray-900 mb-0.5">تنبيهات الهاتف (SMS)</p>
                          <p className="text-[11px] md:text-xs text-gray-500 font-medium">استلام رمز الـ QR وتأكيد الحضور.</p>
                        </div>
                        <button onClick={() => setSmsNotifications(!smsNotifications)} className={`w-11 md:w-12 h-6 md:h-7 rounded-full transition-colors relative flex items-center px-1 cursor-pointer shrink-0 ${smsNotifications ? 'bg-[#8a1538]' : 'bg-gray-300'}`}>
                          <motion.div layout transition={{ type: 'spring', stiffness: 500, damping: 30 }} className="w-4 h-4 md:w-5 md:h-5 bg-white rounded-full shadow-sm" style={{ marginRight: smsNotifications ? 'auto' : '0' }} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="space-y-6">
                  <motion.div variants={fadeUpVariants} className="bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-sm flex flex-col justify-between h-full min-h-[200px] md:min-h-[250px]">
                    <div>
                      <h3 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
                        <Lock className="w-4 h-4 md:w-5 md:h-5 text-[#C08F2D]" /> أمان الحساب
                      </h3>
                    </div>
                    <button onClick={() => onNavigate('home')} className="mt-6 md:mt-8 w-full border-2 border-gray-100 hover:border-red-200 text-gray-600 hover:text-red-600 hover:bg-red-50 font-black text-[13px] md:text-sm py-3.5 md:py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer">
                      <LogOut className="w-4 h-4" /> خروج آمن
                    </button>
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 🟢 شاشة عرض الـ QR (متجاوبة للموبايل) */}
      <AnimatePresence>
        {selectedTicketForQR && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedTicketForQR(null)}
              className="fixed inset-0 z-[999990] bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999999] w-[92%] max-w-sm bg-white rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 shadow-2xl flex flex-col items-center text-center overflow-hidden"
            >
              <button onClick={() => setSelectedTicketForQR(null)} className="absolute top-4 right-4 md:top-6 md:right-6 z-10 text-white hover:text-white bg-black/30 hover:bg-black/50 p-1.5 md:p-2 rounded-full transition-colors cursor-pointer backdrop-blur-sm">
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              <h3 className="font-black text-lg md:text-xl text-gray-900 mb-1 md:mb-2 leading-tight mt-4 md:mt-6">امسح رمز الحضور</h3>
              <p className="text-gray-500 text-[11px] md:text-[13px] font-bold mb-6 md:mb-8 px-2 md:px-4 leading-relaxed">
                وجّه كاميرا هاتفك نحو رمز الـ QR عند بوابة الدخول لتأكيد حضورك.
              </p>

              <div className="w-full aspect-square bg-[#0c0c0e] rounded-2xl md:rounded-3xl shadow-sm mb-6 md:mb-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.15),transparent_60%)]" />

                <div className="absolute inset-6 md:inset-8">
                  <div className="absolute top-0 right-0 w-8 h-8 md:w-10 md:h-10 border-t-4 border-r-4 border-white rounded-tr-2xl" />
                  <div className="absolute top-0 left-0 w-8 h-8 md:w-10 md:h-10 border-t-4 border-l-4 border-white rounded-tl-2xl" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 md:w-10 md:h-10 border-b-4 border-r-4 border-white rounded-br-2xl" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 md:w-10 md:h-10 border-b-4 border-l-4 border-white rounded-bl-2xl" />

                  <motion.div
                    initial={{ y: '0%' }}
                    animate={{ y: ['0%', '100%', '0%'] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-x-0 h-[3px] bg-[#C08F2D] shadow-[0_0_12px_rgba(192,143,45,0.8)] rounded-full"
                  />
                </div>

                <div className="absolute bottom-3 md:bottom-4 inset-x-0 flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C08F2D] animate-pulse" />
                  <span className="text-white/80 text-[11px] md:text-xs font-bold">جاري البحث عن الرمز...</span>
                </div>
              </div>

              <div className="w-full bg-gray-50 rounded-xl md:rounded-2xl p-3 md:p-4 border border-gray-100 text-center">
                <p className="text-gray-900 font-black text-[13px] md:text-[15px] mb-1 md:mb-1.5 truncate px-2">{selectedTicketForQR.title}</p>
                <div className="flex justify-center items-center gap-1.5 md:gap-2 text-[11px] md:text-xs font-bold text-gray-500">
                  <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#C08F2D]" /> {selectedTicketForQR.date}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}