// src/components/Dashboard.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, QrCode, Ticket, ChevronRight, MapPin, Calendar, X, 
  Settings, User, Bell, Lock, LogOut, CreditCard, Gift, Clock, 
  CheckCircle2, CircleDashed, ArrowUpLeft, BarChart3, ChevronLeft, Map
} from 'lucide-react';

export default function Dashboard({ onNavigate, userPoints, myTickets }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTicketForQR, setSelectedTicketForQR] = useState(null);
  
  // إعدادات افتراضية
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  // بيانات وهمية لسجل النشاطات
  const pastEvents = [
    { id: 'p1', title: 'دورة أساسيات ريادة الأعمال', date: '10 أيار 2026', type: 'المشاركة الاقتصادية', status: 'completed' },
    { id: 'p2', title: 'مبادرة شتاء دافئ للتطوع', date: '22 شباط 2026', type: 'التنمية المجتمعية', status: 'completed' },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FA] pb-24 font-sans selection:bg-[#C08F2D] selection:text-white" dir="rtl">
      
      {/* =========================================
          1. الهيدر الفخم والخلفية
          ========================================= */}
      <div className="bg-[#1a0409] h-[380px] pt-28 relative overflow-hidden rounded-b-[3rem] shadow-md">
        <div className="absolute inset-0 bg-gradient-to-b from-[#8a1538]/80 to-[#1a0409]" />
        
        {/* الزخرفة الرسمية */}
        <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-overlay">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="cpf-dash-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M0 60 Q 30 30 60 60 T 120 60 M60 0 Q 90 30 60 60 T 60 120" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
              <path d="M-60 60 Q -30 30 0 60 T 60 60 M0 0 Q 30 30 0 60 T 0 120" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#cpf-dash-pattern)"></rect>
          </svg>
        </div>
        
        {/* إضاءات محيطية خفيفة */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#C08F2D]/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 -mt-44 relative z-20">
        
        {/* =========================================
            2. الهوية الرقمية (Digital ID Card)
            ========================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row gap-8 mb-12 items-end"
        >
          {/* كرت الهوية */}
          <div className="w-full lg:w-[420px] h-[240px] relative rounded-[2rem] p-8 text-white shadow-2xl shadow-[#8a1538]/20 overflow-hidden shrink-0 group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#8a1538] via-[#680f2a] to-[#2d0511]" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#C08F2D]/20 rounded-full blur-[50px] group-hover:bg-[#C08F2D]/30 transition-all duration-700" />
            
            {/* محتوى الكرت */}
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-[#C08F2D]" />
                  <span className="text-[11px] font-black tracking-wider">موثق عبر سند</span>
                </div>
                <CreditCard className="w-8 h-8 text-white/40" strokeWidth={1} />
              </div>

              <div>
                <p className="text-white/60 text-[11px] font-black tracking-widest mb-1 uppercase">الرقم الوطني</p>
                <p className="text-xl font-bold tracking-[0.3em] font-mono text-white/90">905<span className="text-white/40">XXXX</span>123</p>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-white/60 text-[11px] font-black tracking-widest mb-1 uppercase">حامل البطاقة</p>
                  <p className="text-xl font-black tracking-tight">خالد الحاج عيد</p>
                </div>
                
                {/* 🟢 لوجو مؤسسة ولي العهد (النجمة السباعية الرسمية) */}
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center p-2.5 shadow-inner">
                  <img src="/The-Star.png" alt="النجمة السباعية" className="w-full h-full object-contain drop-shadow-md" />
                </div>
              </div>
            </div>
          </div>

          {/* محفظة النقاط والمكافآت */}
          <div className="w-full bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-3xl flex items-center justify-center shadow-inner border border-gray-200 shrink-0">
                <Gift className="w-10 h-10 text-[#C08F2D]" />
              </div>
              <div>
                <p className="text-[13px] font-black text-gray-400 mb-1">الرصيد التراكمي للإنجاز</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-gray-900 tracking-tight">{userPoints}</span>
                  <span className="text-[#C08F2D] text-lg font-black">نقطة</span>
                </div>
              </div>
            </div>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#F8FAFC] hover:bg-gray-100 border border-gray-200 text-gray-700 px-6 py-4 rounded-xl font-black text-sm transition-all duration-300 group cursor-pointer">
              استبدال النقاط بالمكافآت
              <span className="bg-[#C08F2D] text-white text-[9px] px-2 py-0.5 rounded-full mr-1 group-hover:animate-pulse">قريباً</span>
            </button>
          </div>
        </motion.div>

        {/* =========================================
            3. نظام التبويبات (Tabs)
            ========================================= */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: 'overview', label: 'نظرة عامة والمسار', icon: Clock },
            { id: 'wallet', label: 'تذاكري والمحفظة', icon: Ticket },
            { id: 'analytics', label: 'بصمتك التنموية', icon: BarChart3 },
            { id: 'settings', label: 'الإعدادات', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-[13px] transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? 'bg-[#8a1538] text-white shadow-lg shadow-[#8a1538]/20' 
                    : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-gray-100 shadow-sm'
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
          <motion.div key={activeTab} variants={staggerContainer} initial="hidden" animate="visible" exit="hidden">
            
            {/* التبويب الأول: نظرة عامة والمسار الزمني */}
            {activeTab === 'overview' && (
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                
                {/* المسار الزمني (Timeline) */}
                <motion.div variants={fadeUpVariants} className="w-full lg:w-2/5 bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-black text-xl text-gray-900">المسار الزمني لرحلتك</h3>
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                      <Map className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="relative pl-4 rtl:pl-0 rtl:pr-4 border-l-2 rtl:border-l-0 rtl:border-r-2 border-gray-100 space-y-8">
                    
                    {myTickets.map((ticket, idx) => (
                      <div key={`up-${idx}`} className="relative">
                        <div className="absolute -left-[23px] rtl:left-auto rtl:-right-[23px] top-1 bg-white p-1 rounded-full">
                          <div className="w-3.5 h-3.5 bg-[#C08F2D] rounded-full animate-pulse shadow-[0_0_10px_rgba(192,143,45,0.6)]" />
                        </div>
                        <div className="pr-6 rtl:pr-0 rtl:pl-6 text-right">
                          <span className="text-[11px] font-black text-[#C08F2D] bg-[#C08F2D]/10 px-2 py-1 rounded-md mb-2 inline-block">قادم قريباً</span>
                          <h4 className="text-[15px] font-black text-gray-900 leading-tight mb-1">{ticket.title}</h4>
                          <p className="text-xs font-bold text-gray-500">{ticket.date}</p>
                        </div>
                      </div>
                    ))}

                    {pastEvents.map((ev) => (
                      <div key={ev.id} className="relative opacity-60">
                        <div className="absolute -left-[23px] rtl:left-auto rtl:-right-[23px] top-1 bg-white p-1 rounded-full">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        </div>
                        <div className="pr-6 rtl:pr-0 rtl:pl-6 text-right">
                          <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-md mb-2 inline-block">مكتمل</span>
                          <h4 className="text-[15px] font-black text-gray-900 leading-tight mb-1">{ev.title}</h4>
                          <p className="text-xs font-bold text-gray-500">{ev.date} • {ev.type}</p>
                        </div>
                      </div>
                    ))}

                    {myTickets.length === 0 && (
                      <div className="relative">
                        <div className="absolute -left-[23px] rtl:left-auto rtl:-right-[23px] top-1 bg-white p-1 rounded-full">
                          <CircleDashed className="w-4 h-4 text-gray-300" />
                        </div>
                        <div className="pr-6 rtl:pr-0 rtl:pl-6 text-right">
                          <h4 className="text-[15px] font-black text-gray-400 leading-tight mb-1">رحلتك تبدأ من هنا</h4>
                          <p className="text-xs font-bold text-gray-400">استكشف الفرص المتاحة وسجل فيها.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* كرت الترحيب والفرصة التالية */}
                <motion.div variants={fadeUpVariants} className="w-full lg:w-3/5 space-y-6">
                  <div className="bg-[#8a1538] rounded-[2rem] p-8 text-white relative overflow-hidden shadow-md">
                    <div className="absolute top-0 right-0 w-full h-full bg-[url('/the-theme.svg')] opacity-10 bg-repeat bg-[length:150px]" />
                    <div className="relative z-10">
                      <h2 className="text-2xl font-black mb-2">أهلاً بك في منصتك، خالد!</h2>
                      <p className="text-white/80 font-medium text-sm leading-relaxed max-w-md">
                        هنا تجد كل ما يخص مسارك التنموي. استمر في حضور الفعاليات وبناء شبكة علاقاتك المهنية لفتح آفاق جديدة.
                      </p>
                      <button onClick={() => onNavigate('programs')} className="mt-8 bg-[#C08F2D] hover:bg-[#a57a25] text-white px-6 py-3 rounded-xl font-black text-sm transition-colors flex items-center gap-2 cursor-pointer">
                        استكشف فعاليات جديدة <ArrowUpLeft className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {myTickets.length > 0 && (
                    <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm flex items-center justify-between">
                      <div>
                        <p className="text-xs font-black text-gray-400 mb-1">محطتك القادمة</p>
                        <h4 className="text-lg font-black text-gray-900">{myTickets[0].title}</h4>
                      </div>
                      <button onClick={() => setActiveTab('wallet')} className="w-12 h-12 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  )}
                </motion.div>

              </div>
            )}

            {/* التبويب الثاني: محفظة التذاكر (Boarding Pass Style) */}
            {activeTab === 'wallet' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {myTickets.length > 0 ? (
                  myTickets.map((ticket) => (
                    <motion.div key={ticket.id} variants={fadeUpVariants} className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row relative overflow-hidden border border-gray-100 group">
                      
                      <div className="p-8 flex-grow">
                        <span className="text-[10px] font-black text-[#8a1538] bg-[#8a1538]/10 px-3 py-1.5 rounded-lg mb-4 inline-block">
                          {ticket.pathway}
                        </span>
                        <h3 className="font-black text-xl text-gray-900 mb-4 leading-tight pr-4">
                          {ticket.title}
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">التاريخ</p>
                            <p className="text-sm font-black text-gray-800 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#C08F2D]" /> {ticket.date}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">الموقع</p>
                            <p className="text-sm font-black text-gray-800 flex items-center gap-1.5 truncate"><MapPin className="w-3.5 h-3.5 text-[#C08F2D]" /> {ticket.city}</p>
                          </div>
                        </div>
                      </div>

                      <div className="hidden sm:flex flex-col items-center justify-between relative w-8 bg-white z-10">
                        <div className="w-8 h-8 bg-[#F4F7FA] rounded-full absolute -top-4 shadow-inner border-b border-gray-100" />
                        <div className="h-full border-l-2 border-dashed border-gray-200" />
                        <div className="w-8 h-8 bg-[#F4F7FA] rounded-full absolute -bottom-4 shadow-inner border-t border-gray-100" />
                      </div>

                      <div className="bg-[#F8FAFC] p-8 sm:w-48 flex flex-col items-center justify-center text-center shrink-0 border-t sm:border-t-0 sm:border-r border-dashed border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                           onClick={() => setSelectedTicketForQR(ticket)}>
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <QrCode className="w-8 h-8 text-[#8a1538]" />
                        </div>
                        <p className="text-xs font-black text-gray-900">عرض التذكرة</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div variants={fadeUpVariants} className="col-span-full py-32 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100">
                      <Ticket className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-gray-900 font-black text-2xl mb-2">محفظة التذاكر فارغة</p>
                    <p className="text-gray-500 font-medium text-sm mb-8">لم تقم بالتسجيل في أي فرصة حتى الآن.</p>
                    <button onClick={() => onNavigate('programs')} className="bg-[#8a1538] hover:bg-[#680f2a] text-white px-8 py-3.5 rounded-full font-black text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer">
                      استكشف المبادرات
                    </button>
                  </motion.div>
                )}
              </div>
            )}

            {/* التبويب الثالث: بصمتك التنموية (Analytics) */}
            {activeTab === 'analytics' && (
              <motion.div variants={fadeUpVariants} className="bg-white rounded-[2rem] p-8 md:p-12 border border-gray-100 shadow-sm">
                <div className="mb-10 text-center max-w-lg mx-auto">
                  <BarChart3 className="w-12 h-12 text-[#C08F2D] mx-auto mb-4" />
                  <h3 className="text-2xl font-black text-gray-900 mb-2">بصمتك في مبادرات المؤسسة</h3>
                </div>
                
                <div className="space-y-8 max-w-3xl mx-auto">
                  <div>
                    <div className="flex justify-between text-sm font-black mb-2">
                      <span className="text-[#721F31]">المشاركة الاقتصادية والريادة</span>
                      <span className="text-gray-900">60%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div className="bg-[#721F31] h-3 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-black mb-2">
                      <span className="text-[#1f5412]">التنمية المجتمعية والتطوع</span>
                      <span className="text-gray-900">30%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div className="bg-[#1f5412] h-3 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-black mb-2">
                      <span className="text-[#2b307e]">القيادة والشباب</span>
                      <span className="text-gray-900">10%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div className="bg-[#2b307e] h-3 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center max-w-2xl mx-auto">
                  <p className="text-blue-900 font-bold text-sm leading-relaxed">
                    💡 <span className="font-black">نصيحة المنصة:</span> يظهر أن لديك شغفاً عالياً بريادة الأعمال والتقنية. ننصحك باستكشاف فرص "مصنع الأفكار" لتطوير مهاراتك بشكل عملي.
                  </p>
                </div>
              </motion.div>
            )}

            {/* التبويب الرابع: الإعدادات والأمان */}
            {activeTab === 'settings' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <motion.div variants={fadeUpVariants} className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-50 pb-4">
                      <User className="w-5 h-5 text-[#8a1538]" /> البيانات المدنية الموثقة
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-black text-gray-400 mb-2">الاسم الكامل (لا يمكن تعديله)</label>
                        <input type="text" readOnly value="خالد محمد سليم الحاج عيد" className="w-full bg-gray-50 border border-gray-100 text-gray-700 font-bold text-[15px] py-3.5 px-4 rounded-xl cursor-not-allowed outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-gray-400 mb-2">الرقم الوطني</label>
                        <input type="text" readOnly value="905xxxxxxx" className="w-full bg-gray-50 border border-gray-100 text-gray-700 font-bold text-[15px] py-3.5 px-4 rounded-xl cursor-not-allowed outline-none tracking-widest text-left" dir="ltr" />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUpVariants} className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-50 pb-4">
                      <Bell className="w-5 h-5 text-[#8a1538]" /> الإشعارات والتواصل
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <div>
                          <p className="text-[15px] font-black text-gray-900 mb-0.5">تنبيهات الهاتف (SMS)</p>
                          <p className="text-xs text-gray-500 font-medium">استلام رابط الـ QR وتأكيد الحضور عبر الرسائل.</p>
                        </div>
                        <button onClick={() => setSmsNotifications(!smsNotifications)} className={`w-12 h-7 rounded-full transition-colors relative flex items-center px-1 cursor-pointer ${smsNotifications ? 'bg-[#8a1538]' : 'bg-gray-300'}`}>
                          <motion.div layout transition={{ type: 'spring', stiffness: 500, damping: 30 }} className="w-5 h-5 bg-white rounded-full shadow-sm" style={{ marginRight: smsNotifications ? 'auto' : '0' }} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="space-y-6">
                  <motion.div variants={fadeUpVariants} className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between h-full min-h-[250px]">
                    <div>
                      <h3 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-[#C08F2D]" /> أمان الحساب
                      </h3>
                    </div>
                    <button onClick={() => onNavigate('home')} className="mt-8 w-full border-2 border-gray-100 hover:border-red-200 text-gray-600 hover:text-red-600 hover:bg-red-50 font-black text-sm py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer">
                      <LogOut className="w-4 h-4" /> خروج آمن
                    </button>
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* شاشة عرض الـ QR (Focus Mode) */}
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
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999999] w-[90%] max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl flex flex-col items-center text-center overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-3 bg-[#8a1538]" />
              <button onClick={() => setSelectedTicketForQR(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-16 h-16 bg-[#8a1538]/10 text-[#8a1538] rounded-2xl flex items-center justify-center mb-6 mt-6">
                <QrCode className="w-8 h-8" />
              </div>
              
              <h3 className="font-black text-xl text-gray-900 mb-2 leading-tight">بطاقة الدخول الموحدة</h3>
              <p className="text-gray-500 text-[13px] font-bold mb-8 px-4 leading-relaxed">
                اعرض هذا الرمز على المنظمين لتأكيد حضورك واكتساب <span className="text-[#C08F2D] font-black">{selectedTicketForQR.points} نقطة</span>.
              </p>
              
              <div className="w-56 h-56 bg-white border-2 border-gray-100 rounded-3xl p-4 shadow-sm mb-8 relative">
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#C08F2D] rounded-tr-[20px]" />
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#C08F2D] rounded-tl-[20px]" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#C08F2D] rounded-br-[20px]" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#C08F2D] rounded-bl-[20px]" />
                
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=CPF-TICKET-${selectedTicketForQR.id}-KHALED`} alt="QR Code" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              
              <div className="w-full bg-gray-50 rounded-2xl p-4 border border-gray-100 text-center">
                <p className="text-gray-900 font-black text-[15px] mb-1.5 truncate px-2">{selectedTicketForQR.title}</p>
                <div className="flex justify-center items-center gap-2 text-xs font-bold text-gray-500">
                  <Calendar className="w-4 h-4 text-[#C08F2D]" /> {selectedTicketForQR.date}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}