// src/components/Dashboard.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Award, QrCode, Ticket, History, ChevronRight, MapPin, Calendar, X, BarChart3, Settings, Camera, User, Bell, Lock, LogOut } from 'lucide-react';

export default function Dashboard({ onNavigate, userPoints, myTickets }) {
  const [activeTab, setActiveTab] = useState('tickets');
  const [selectedTicketForQR, setSelectedTicketForQR] = useState(null);
  
  // States وهمية للإعدادات لغايات الـ UI التفاعلي
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const getPathwayColor = (pathway) => {
    switch(pathway) {
      case 'المشاركة الاقتصادية': return 'border-r-[#721F31] text-[#721F31]'; 
      case 'القيادة': return 'border-r-[#2b307e] text-[#2b307e]'; 
      case 'التنمية المجتمعية': return 'border-r-[#1f5412] text-[#1f5412]'; 
      default: return 'border-r-gray-800 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24" dir="rtl">
      
      {/* الهيدر السيادي */}
      <div className="bg-[#721F31] h-[340px] pt-28 relative overflow-hidden rounded-b-[2.5rem] shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3b1019]/40 to-transparent" />
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-overlay">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="cpf-dash-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M0 60 Q 30 30 60 60 T 120 60 M60 0 Q 90 30 60 60 T 60 120" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
              <path d="M-60 60 Q -30 30 0 60 T 60 60 M0 0 Q 30 30 0 60 T 0 120" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#cpf-dash-pattern)"></rect>
          </svg>
        </div>
      </div>

      {/* الكرت الطافي للملف الشخصي */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20">
        
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-8 border border-white mb-10 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-[#C08F2D]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-6 w-full md:w-auto relative z-10">
            
            {/* 🟢 الأفاتار التفاعلي المطور: يدعم التعديل عند الـ Hover بحركة انسيابية فخمة */}
            <div className="relative group cursor-pointer shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#C08F2D] to-[#9a7324] flex items-center justify-center text-white text-4xl font-black shadow-[0_10px_20px_rgba(192,143,45,0.25)] border-2 border-white overflow-hidden relative">
                خ
                {/* طبقة الـ Hover الرمادية الناعمة */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                  <Camera className="w-5 h-5 text-white" />
                  <span className="text-[9px] text-white/90 font-black">تعديل</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2.5">
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">خالد الحاج عيد</h1>
              
              <div className="inline-flex items-center gap-2 bg-gradient-to-l from-[#C08F2D]/10 to-transparent border border-[#C08F2D]/20 px-4 py-1.5 rounded-full shadow-sm w-fit">
                <ShieldCheck className="w-4 h-4 text-[#C08F2D]" />
                <span className="text-xs font-black text-[#C08F2D] tracking-wide">حساب موثق عبر سند</span>
              </div>
            </div>
          </div>

          {/* عداد النقاط */}
          <div className="bg-[#F8FAFC] rounded-2xl p-5 flex items-center gap-5 w-full md:w-auto border border-gray-100 shadow-sm relative z-10">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0 border border-gray-50">
              <Award className="w-7 h-7 text-[#C08F2D]" />
            </div>
            <div>
              <p className="text-[11px] font-black text-gray-400 mb-1 tracking-wider">الرصيد التراكمي</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-gray-900">{userPoints}</span>
                <span className="text-[#C08F2D] text-sm font-black">نقطة</span>
              </div>
            </div>
          </div>
        </div>

        {/* التبويبات (Tabs) - تم إضافة تبويب الإعدادات بشكل رزين */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: 'tickets', label: 'تذاكر الدخول', icon: Ticket },
            { id: 'history', label: 'سجل النشاطات', icon: History },
            { id: 'analytics', label: 'تحليل المسار', icon: BarChart3 },
            { id: 'settings', label: 'إعدادات الحساب', icon: Settings } // 🟢 التبويب الجديد
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-sm transition-all duration-300 whitespace-nowrap border-2 ${
                  isActive 
                    ? 'bg-[#721F31] border-[#721F31] text-white shadow-md shadow-[#721F31]/10' 
                    : 'bg-white border-transparent text-gray-500 hover:border-gray-200 hover:bg-gray-50 shadow-sm'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#C08F2D]' : ''}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={staggerContainer}
            initial="hidden" animate="visible" exit="hidden"
          >
            {/* 1. تبويب التذاكر */}
            {activeTab === 'tickets' && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {myTickets.length > 0 ? (
                  myTickets.map((ticket) => {
                    const tagStyle = getPathwayColor(ticket.pathway);
                    return (
                      <motion.div key={ticket.id} variants={fadeUpVariants} className="bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col relative overflow-hidden group border border-gray-100">
                        <div className={`p-7 border-r-4 ${tagStyle}`}>
                          <div className="flex justify-between items-start mb-5">
                            <span className="bg-gray-50 text-gray-600 border border-gray-100 text-[10px] font-black px-3 py-1.5 rounded-lg shadow-sm">
                              {ticket.pathway}
                            </span>
                            <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
                              <Ticket className="w-4 h-4 text-gray-400" />
                            </div>
                          </div>
                          <h3 className="font-black text-lg text-gray-900 mb-5 leading-snug line-clamp-2 h-14">
                            {ticket.title}
                          </h3>
                          <div className="space-y-3 mb-2 bg-[#F8FAFC] p-4 rounded-2xl border border-gray-50">
                            <div className="flex items-center gap-3 text-sm text-gray-600 font-bold">
                              <Calendar className="w-4 h-4 text-[#C08F2D]" /> {ticket.date}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600 font-bold">
                              <MapPin className="w-4 h-4 text-[#C08F2D]" /> <span className="truncate">{ticket.location || ticket.city}</span>
                            </div>
                          </div>
                        </div>
                        <div className="relative w-full h-8 flex items-center justify-between overflow-hidden bg-white">
                           <div className="absolute right-[-16px] w-8 h-8 bg-slate-50 rounded-full shadow-inner border border-gray-100 z-10"></div>
                           <div className="w-full border-t-[3px] border-dashed border-gray-200 mx-5 mt-1"></div>
                           <div className="absolute left-[-16px] w-8 h-8 bg-slate-50 rounded-full shadow-inner border border-gray-100 z-10"></div>
                        </div>
                        <div className="p-6 bg-white relative z-0">
                          <button
                            onClick={() => setSelectedTicketForQR(ticket)}
                            className="w-full bg-white border-2 border-gray-100 hover:border-[#C08F2D] text-gray-700 hover:text-[#C08F2D] hover:bg-[#C08F2D]/5 font-black text-sm py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 group/btn"
                          >
                            <QrCode className="w-5 h-5 text-gray-400 group-hover/btn:text-[#C08F2D] transition-colors" /> 
                            عرض تذكرة الدخول
                          </button>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <motion.div variants={fadeUpVariants} className="col-span-full py-24 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100">
                      <Ticket className="w-10 h-10 text-gray-300" />
                    </div>
                    <p className="text-gray-900 font-black text-2xl mb-3">محفظة التذاكر فارغة</p>
                    <p className="text-gray-500 font-medium max-w-md mb-8 text-sm leading-relaxed">لم تقم بالتسجيل في أي فعالية حتى الآن.</p>
                    <button onClick={() => onNavigate('home')} className="bg-[#721F31] hover:bg-[#5a1826] text-white px-8 py-3.5 rounded-xl font-black text-sm transition-all shadow-lg flex items-center gap-2">
                      استكشاف الفرص <ChevronRight className="w-4 h-4 rotate-180" />
                    </button>
                  </motion.div>
                )}
              </div>
            )}

            {/* 2. تبويب السجل */}
            {activeTab === 'history' && (
              <motion.div variants={fadeUpVariants} className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
                 <History className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                 <p className="text-gray-500 font-bold text-lg mb-2">سجل نشاطاتك فارغ</p>
                 <p className="text-gray-400 text-sm">سيتم توثيق الفعاليات التي تحضرها هنا تلقائياً.</p>
              </motion.div>
            )}
            
            {/* 3. تبويب التحليلات */}
            {activeTab === 'analytics' && (
              <motion.div variants={fadeUpVariants} className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
                 <BarChart3 className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                 <p className="text-gray-500 font-bold text-lg mb-2">لوحة التحليلات مقفلة</p>
                 <p className="text-gray-400 text-sm">سيتم تفعيل الرسوم البيانية بعد حضورك لثلاث فعاليات على الأقل.</p>
              </motion.div>
            )}

            {/* 🟢 4. تبويب الإعدادات الفخم (The Premium Settings UI) */}
            {activeTab === 'settings' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* الأقسام الفرعية */}
                <div className="lg:col-span-2 space-y-6">
                  {/* قسم بيانات الهوية الموثقة */}
                  <motion.div variants={fadeUpVariants} className="bg-white rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-50 pb-4">
                      <User className="w-5 h-5 text-[#721F31]" /> البيانات الشخصية الموثقة
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-black text-gray-400 mb-2">الاسم الكامل (حسب الأحوال المدنية)</label>
                        <input type="text" readOnly value="خالد محمد سليم الحاج عيد" className="w-full bg-gray-50 border border-gray-100 text-gray-700 font-bold text-sm py-3.5 px-4 rounded-xl cursor-not-allowed outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-gray-400 mb-2">الرقم الوطني (موثق عبر سند)</label>
                        <input type="text" readOnly value="905xxxxxxx" className="w-full bg-gray-50 border border-gray-100 text-gray-700 font-bold text-sm py-3.5 px-4 rounded-xl cursor-not-allowed outline-none tracking-widest" />
                      </div>
                    </div>
                  </motion.div>

                  {/* قسم التنبيهات الذكي */}
                  <motion.div variants={fadeUpVariants} className="bg-white rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-50 pb-4">
                      <Bell className="w-5 h-5 text-[#721F31]" /> تفضيلات الإشعارات والتنبيهات
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <div>
                          <p className="text-sm font-black text-gray-900 mb-0.5">تنبيهات الرسائل النصية (SMS)</p>
                          <p className="text-xs text-gray-400 font-medium">إرسال كود التذكرة وتأكيد الحضور عبر هاتفك الموثق.</p>
                        </div>
                        <button onClick={() => setSmsNotifications(!smsNotifications)} className={`w-12 h-7 rounded-full transition-colors relative flex items-center px-1 ${smsNotifications ? 'bg-[#721F31]' : 'bg-gray-200'}`}>
                          <motion.div layout transition={{ type: 'spring', stiffness: 500, damping: 30 }} className="w-5 h-5 bg-white rounded-full shadow-md" style={{ marginRight: smsNotifications ? 'auto' : '0' }} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <div>
                          <p className="text-sm font-black text-gray-900 mb-0.5">إشعارات البريد الإلكتروني</p>
                          <p className="text-xs text-gray-400 font-medium">تلقي النشرات الأسبوعية والتوصيات بالفرص الجديدة.</p>
                        </div>
                        <button onClick={() => setEmailNotifications(!emailNotifications)} className={`w-12 h-7 rounded-full transition-colors relative flex items-center px-1 ${emailNotifications ? 'bg-[#721F31]' : 'bg-gray-200'}`}>
                          <motion.div layout transition={{ type: 'spring', stiffness: 500, damping: 30 }} className="w-5 h-5 bg-white rounded-full shadow-md" style={{ marginRight: emailNotifications ? 'auto' : '0' }} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* القسم الجانبي (قفل الأمان وتسجيل الخروج) */}
                <div className="space-y-6">
                  <motion.div variants={fadeUpVariants} className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm flex flex-col justify-between h-full min-h-[250px]">
                    <div>
                      <h3 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-[#C08F2D]" /> أمان الحساب
                      </h3>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed">
                        حسابك مربوط بالمنصة الوطنية الموحدة. لتغيير كلمة المرور أو تحديث بياناتك المدنية، يرجى التوجه مباشرة إلى تطبيق سند الرسمي.
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => onNavigate('home')}
                      className="mt-8 w-full border border-gray-200 hover:border-red-200 text-gray-500 hover:text-red-600 hover:bg-red-50 font-black text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                    >
                      <LogOut className="w-4 h-4" /> تسجيل خروج آمن
                    </button>
                  </motion.div>
                </div>

              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* شاشة عرض الـ QR Code */}
      <AnimatePresence>
        {selectedTicketForQR && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedTicketForQR(null)}
              className="fixed inset-0 z-[999990] bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999999] w-[90%] max-w-sm bg-white rounded-[2rem] p-8 shadow-2xl flex flex-col items-center text-center border border-gray-100"
            >
              <button onClick={() => setSelectedTicketForQR(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
              <div className="bg-[#721F31]/5 text-[#721F31] p-4 rounded-2xl mb-6 mt-4">
                <QrCode className="w-8 h-8" />
              </div>
              <h3 className="font-black text-xl text-gray-900 mb-2 leading-tight">تذكرة الدخول</h3>
              <p className="text-gray-500 text-xs font-bold mb-8 px-4 leading-relaxed">
                يرجى إبراز هذا الرمز للمنظمين لتسجيل حضورك واكتساب <span className="text-[#C08F2D] font-black">{selectedTicketForQR.points} نقطة</span>.
              </p>
              <div className="w-52 h-52 bg-white border border-gray-200 rounded-3xl p-5 shadow-sm mb-8 relative">
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#C08F2D] rounded-tr-2xl"></div>
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#C08F2D] rounded-tl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#C08F2D] rounded-br-2xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#C08F2D] rounded-bl-2xl"></div>
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=CPF-TICKET-${selectedTicketForQR.id}-KHALED`} alt="QR Code" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div className="w-full bg-[#F8FAFC] rounded-2xl p-4 border border-gray-100">
                <p className="text-gray-900 font-black text-sm mb-1 line-clamp-1">{selectedTicketForQR.title}</p>
                <div className="flex justify-center items-center gap-2 text-xs font-bold text-gray-500">
                  <Calendar className="w-3.5 h-3.5 text-[#C08F2D]" /> {selectedTicketForQR.date}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}