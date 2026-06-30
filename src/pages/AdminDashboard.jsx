// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, CalendarDays, Users, Plus, 
  CheckCircle2, Clock, LogOut, FileSpreadsheet,
  X, ChevronLeft, ChevronRight, Eye, MoreHorizontal, Building2, Crown, Calendar, BarChart3, TrendingUp
} from 'lucide-react';

// ==========================================
// 🟢 بيانات وهمية للعرض (Mock Data)
// ==========================================
const adminData = {
  name: 'أحمد محمود',
  office: 'إربد',
  role: 'مدير مكتب'
};

const initialEvents = [
  { id: 1, title: 'ورشة الذكاء الاصطناعي التوليدي', type: 'المشاركة الاقتصادية', date: '2026-07-15', time: '10:00 ص', status: 'نشط', registered: 45, capacity: 50 },
  { id: 2, title: 'معسكر القيادة المتقدم', type: 'القيادة', date: '2026-07-20', time: '09:00 ص', status: 'مكتمل العدد', registered: 30, capacity: 30 },
  { id: 3, title: 'حملة بنك الدم', type: 'التنمية المجتمعية', date: '2026-06-25', time: '11:00 ص', status: 'منتهي', registered: 120, capacity: 150 },
];

const mockUsers = {
  1: [
    { id: 101, name: 'سارة خالد عبدالله', nationalId: '9981234567', phone: '079 123 4567', status: 'مقبول' },
    { id: 102, name: 'عمر محمد الرواشدة', nationalId: '9997654321', phone: '078 765 4321', status: 'قيد الانتظار' },
    { id: 103, name: 'لينا محمود حسن', nationalId: '2001122334', phone: '077 112 2334', status: 'مرفوض' },
  ]
};

const monthlyStats = [
  { month: 'فبراير', value: 40 },
  { month: 'مارس', value: 65 },
  { month: 'أبريل', value: 110 },
  { month: 'مايو', value: 85 },
  { month: 'يونيو', value: 150 },
  { month: 'يوليو', value: 195 },
];

const trackStats = [
  { name: 'القيادة', percent: 85, count: 850, color: 'bg-[#721F31]' },
  { name: 'المشاركة الاقتصادية', percent: 60, count: 600, color: 'bg-[#C08F2D]' },
  { name: 'التنمية المجتمعية', percent: 45, count: 450, color: 'bg-[#1a1c1d]' },
];

export default function AdminDashboard({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [events, setEvents] = useState(initialEvents);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedEventUsers, setSelectedEventUsers] = useState(null);

  // ==========================================
  // نافذة إضافة فعالية 
  // ==========================================
  const AddEventModal = () => {
    const [step, setStep] = useState(1);
    const [newTitle, setNewTitle] = useState('');
    const [newDate, setNewDate] = useState('2026-07-25');

    const handleSave = (e) => {
      e.preventDefault();
      const newEvent = {
        id: events.length + 1,
        title: newTitle || 'فعالية جديدة',
        type: 'المشاركة الاقتصادية',
        date: newDate,
        time: '12:00 ظهراً',
        status: 'نشط',
        registered: 0,
        capacity: 50
      };
      setEvents([newEvent, ...events]);
      setIsAddEventOpen(false);
      setActiveTab('events'); 
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a0409]/80 backdrop-blur-sm p-4">
        <motion.div initial={{ opacity: 0, scale: 0.98, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: 10 }} className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100">
          <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-[#fcfcfc]">
            <div>
              <h2 className="text-2xl font-black text-[#721F31] tracking-tight">إضافة فعالية جديدة</h2>
              <p className="text-gray-400 text-sm mt-1 font-bold">الخطوة {step} من 2: {step === 1 ? 'المعلومات الأساسية' : 'الزمان والمكان'}</p>
            </div>
            <button onClick={() => setIsAddEventOpen(false)} className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
              <X className="w-5 h-5 text-gray-500" strokeWidth={2} />
            </button>
          </div>
          <div className="p-8">
            {step === 1 ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-[13px] font-bold text-gray-500 mb-2 uppercase tracking-wide">عنوان الفعالية</label>
                  <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="مثال: ورشة التصميم الرقمي" className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-lg font-bold text-gray-900 focus:border-[#C08F2D] outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-500 mb-2 uppercase tracking-wide">المسار الاستراتيجي</label>
                  <select className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-lg font-bold text-gray-900 focus:border-[#C08F2D] outline-none transition-colors cursor-pointer">
                    <option>المشاركة الاقتصادية</option><option>القيادة</option><option>التنمية المجتمعية</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-500 mb-2 uppercase tracking-wide">التاريخ</label>
                    <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-lg font-bold text-gray-900 focus:border-[#C08F2D] outline-none transition-colors cursor-pointer" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-500 mb-2 uppercase tracking-wide">الوقت</label>
                    <input type="time" className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-lg font-bold text-gray-900 focus:border-[#C08F2D] outline-none transition-colors cursor-pointer" />
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-500 mb-2 uppercase tracking-wide">السعة الاستيعابية (مقاعد)</label>
                  <input type="number" placeholder="50" className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-lg font-bold text-gray-900 focus:border-[#C08F2D] outline-none transition-colors" />
                </div>
              </div>
            )}
            <div className="flex justify-between items-center mt-12">
              {step === 2 ? <button onClick={() => setStep(1)} className="text-gray-400 hover:text-gray-900 font-bold flex items-center gap-2 cursor-pointer"><ChevronRight className="w-4 h-4" /> رجوع</button> : <div></div>}
              {step === 1 ? <button onClick={() => setStep(2)} className="bg-[#721F31] hover:bg-[#5a1826] text-white px-8 py-3.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-md cursor-pointer">متابعة <ChevronLeft className="w-4 h-4" /></button> : <button onClick={handleSave} className="bg-[#C08F2D] hover:bg-[#a87d25] text-[#1a0409] px-8 py-3.5 rounded-xl font-black transition-all flex items-center gap-2 shadow-md cursor-pointer">حفظ ونشر الفعالية</button>}
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  // ==========================================
  // نافذة عرض المسجلين 
  // ==========================================
  const RegistrantsModal = ({ eventId }) => {
    const event = events.find(e => e.id === eventId);
    const users = mockUsers[eventId] || [];
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a0409]/80 backdrop-blur-sm p-4">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[85vh] border border-gray-100">
          <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-[#fcfcfc]">
            <div><h2 className="text-2xl font-black text-[#721F31] tracking-tight mb-1">إدارة المسجلين</h2><p className="text-[#C08F2D] font-bold text-sm">{event?.title}</p></div>
            <div className="flex items-center gap-4"><button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:border-[#8a1538] hover:text-[#8a1538] px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm cursor-pointer"><FileSpreadsheet className="w-4 h-4" strokeWidth={1.5} /> تصدير السجل</button><button onClick={() => setSelectedEventUsers(null)} className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"><X className="w-4 h-4 text-gray-500" strokeWidth={2} /></button></div>
          </div>
          <div className="overflow-y-auto p-8 flex-1 bg-white">
            {users.length > 0 ? (
              <table className="w-full text-right border-collapse">
                <thead><tr className="border-b-2 border-[#721F31]/10"><th className="pb-4 text-[13px] font-bold text-gray-400 uppercase">اسم المسجل</th><th className="pb-4 text-[13px] font-bold text-gray-400 uppercase">الرقم الوطني</th><th className="pb-4 text-[13px] font-bold text-gray-400 uppercase">رقم الهاتف</th><th className="pb-4 text-[13px] font-bold text-gray-400 uppercase">حالة الطلب</th></tr></thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-gray-50 hover:bg-[#721F31]/5 transition-colors">
                      <td className="py-5 font-black text-gray-900">{user.name}</td><td className="py-5 text-gray-500 font-medium font-mono">{user.nationalId}</td><td className="py-5 text-gray-500 font-medium font-mono" dir="ltr">{user.phone}</td>
                      <td className="py-5"><span className={`px-3 py-1.5 rounded-md text-[11px] font-bold border ${user.status === 'مقبول' ? 'bg-[#C08F2D]/10 text-[#a87d25] border-[#C08F2D]/30' : user.status === 'مرفوض' ? 'bg-[#721F31]/10 text-[#721F31] border-[#721F31]/20' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>{user.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <div className="flex flex-col items-center justify-center py-20 text-gray-300"><Users className="w-16 h-16 mb-4 stroke-[1]" /><p className="text-lg font-bold">لا يوجد مسجلين</p></div>}
          </div>
        </motion.div>
      </div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex font-sans text-[#1a1c1d]" dir="rtl">
      
      {/* ==========================================
          القائمة الجانبية (Sidebar)
          ========================================== */}
      <aside className="w-[280px] bg-[#1a0409] shadow-2xl flex flex-col hidden md:flex shrink-0 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#3a0a18] to-transparent opacity-50" />
        
        <div className="p-8 pb-6 flex flex-col items-center text-center relative z-10 border-b border-white/5">
          <img src="/logo_white.png" alt="CPF Logo" className="h-14 object-contain mb-6 drop-shadow-md" />
          <h2 className="font-bold text-white/50 text-3xl md:text-xl text-[10px] tracking-widest uppercase mb-1.5 flex items-center gap-2">
            <Crown className="w-3.5 h-3.5 text-[#C08F2D] " strokeWidth={2} /> نظام الإدارة
          </h2>
          <div className="font-black text-6xl md:text-2xl text-white">مكتب {adminData.office}</div>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-2 relative z-10">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl font-bold transition-all cursor-pointer ${activeTab === 'dashboard' ? 'bg-[#C08F2D] text-[#1a0409] shadow-lg shadow-[#C08F2D]/20' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
            <Home className="w-5 h-5" strokeWidth={activeTab === 'dashboard' ? 2.5 : 1.5} /> الإحصائيات
          </button>
          <button onClick={() => setActiveTab('events')} className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl font-bold transition-all cursor-pointer ${activeTab === 'events' ? 'bg-[#C08F2D] text-[#1a0409] shadow-lg shadow-[#C08F2D]/20' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
            <Calendar className="w-5 h-5" strokeWidth={activeTab === 'events' ? 2.5 : 1.5} /> إدارة الفعاليات
          </button>
        </nav>

        <div className="p-4 relative z-10 border-t border-white/5">
          <button onClick={() => onNavigate('home')} className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl font-bold text-white/40 hover:bg-[#8a1538] hover:text-white transition-colors border border-transparent hover:border-[#8a1538] cursor-pointer">
            <LogOut className="w-4 h-4" strokeWidth={2} /> تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* ==========================================
          المحتوى الرئيسي
          ========================================== */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 max-w-[1500px] mx-auto">
          <div>
      
            <h1 className="text-6xl md:text-4xl font-black text-[#721F31] tracking-tight">
              {activeTab === 'dashboard' ? 'لوحة تحكم الإحصائيات' : 'تقويم وجدولة الفعاليات'}
            </h1>
          </div>
          <button onClick={() => setIsAddEventOpen(true)} className="bg-[#721F31] hover:bg-[#5a1826] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer">
            <Plus className="w-4 h-4" strokeWidth={2.5} /> إضافة فعالية
          </button>
        </header>

        {/* 🟢 شاشة الإحصائيات */}
        {activeTab === 'dashboard' && (
          <motion.div variants={containerVariants} initial="hidden" animate="show" exit="hidden" className="max-w-[1500px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                <div><p className="text-4xl font-black text-[#1a1c1d] mb-1">195</p><p className="text-gray-500 font-bold text-sm">مستفيد هذا الشهر</p></div>
                <div className="w-14 h-14 bg-[#1a1c1d]/5 rounded-full flex items-center justify-center border border-[#1a1c1d]/10 shrink-0"><Users className="w-6 h-6 text-[#1a1c1d]" strokeWidth={1.5} /></div>
              </motion.div>
              <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                <div><p className="text-4xl font-black text-[#1a1c1d] mb-1">12</p><p className="text-gray-500 font-bold text-sm">طلب بانتظار المراجعة</p></div>
                <div className="w-14 h-14 bg-[#721F31]/5 rounded-full flex items-center justify-center border border-[#721F31]/10 shrink-0"><Clock className="w-6 h-6 text-[#721F31]" strokeWidth={1.5} /></div>
              </motion.div>
              <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                <div><p className="text-4xl font-black text-[#1a1c1d] mb-1">{events.length}</p><p className="text-gray-500 font-bold text-sm">فعاليات منشورة</p></div>
                <div className="w-14 h-14 bg-[#C08F2D]/10 rounded-full flex items-center justify-center border border-[#C08F2D]/20 shrink-0"><CalendarDays className="w-6 h-6 text-[#C08F2D]" strokeWidth={1.5} /></div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full flex flex-col">
                 <div className="flex justify-between items-center mb-10"><h3 className="font-black text-lg text-gray-900 flex items-center gap-2"><PieChartIcon className="w-5 h-5 text-[#C08F2D]"/> الاستفادة حسب المسار</h3></div>
                <div className="space-y-8 flex-1 justify-center flex flex-col pb-4">
                  {trackStats.map((track, i) => (
                    <div key={i} className="group">
                      <div className="flex justify-between text-[13px] font-black mb-3"><span className="text-gray-700">{track.name}</span><span className="text-gray-500">{track.percent}%</span></div>
                      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden relative"><motion.div initial={{ width: 0 }} animate={{ width: `${track.percent}%` }} transition={{ duration: 1.5, delay: 0.5 + (i * 0.2), ease: "easeOut" }} className={`h-full rounded-full ${track.color}`}/></div>
                      <p className="text-[11px] font-bold text-gray-400 mt-2 text-left">{track.count} مستفيد</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full flex flex-col">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="font-black text-lg text-gray-900 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-[#C08F2D]"/> معدل إقبال المستفيدين</h3>
                  <span className="text-xs font-bold bg-green-50 text-green-600 px-2 py-1.5 rounded-lg flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5"/> +12%</span>
                </div>
                <div className="flex items-end justify-between h-56 gap-2 flex-1 pt-4 border-b border-gray-100 pb-2">
                  {monthlyStats.map((stat, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 flex-1 group h-full justify-end">
                      <div className="w-full max-w-[48px] bg-gray-50 rounded-t-xl relative flex items-end justify-center hover:bg-gray-100 transition-colors h-full">
                        <motion.div initial={{ height: 0 }} animate={{ height: `${(stat.value / 200) * 100}%` }} transition={{ duration: 1.2, delay: 0.5 + (i * 0.1), type: "spring", stiffness: 50 }} className={`w-full rounded-t-xl relative ${i === monthlyStats.length - 1 ? 'bg-[#721F31]' : 'bg-[#C08F2D]/40 group-hover:bg-[#C08F2D]/60'}`}>
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[11px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">{stat.value}</span>
                        </motion.div>
                      </div>
                      <span className="text-[12px] font-bold text-gray-400">{stat.month}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* 🟢 شاشة تقويم الفعاليات المحسنة بالكامل (Wide Calendar View) */}
        {activeTab === 'events' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 xl:grid-cols-12 gap-8 max-w-[1500px] mx-auto">
            
            {/* التقويم العريض */}
            <div className="xl:col-span-9 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 overflow-x-auto">
              <div className="flex justify-between items-center mb-8 min-w-[900px]">
                <h2 className="text-3xl font-black text-[#721F31]">يوليو 2026</h2>
                <div className="flex gap-2">
                  <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 cursor-pointer"><ChevronRight className="w-5 h-5 text-gray-600" /></button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 cursor-pointer"><ChevronLeft className="w-5 h-5 text-gray-600" /></button>
                </div>
              </div>
              
              {/* وسعنا مساحة الجدول لتستوعب النصوص بالكامل */}
              <div className="grid grid-cols-7 gap-3 min-w-[900px]">
                {['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map(day => (
                  <div key={day} className="text-center font-black text-gray-400 text-[15px] pb-4">{day}</div>
                ))}
                
                {[28, 29, 30].map(day => (
                  <div key={`prev-${day}`} className="min-h-[140px] border border-gray-50 bg-gray-50/50 p-4 rounded-2xl text-gray-300 font-bold text-2xl">{day}</div>
                ))}
                
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                  const dayEvents = events.filter(e => e.date === `2026-07-${day < 10 ? '0'+day : day}`);
                  return (
                    <div key={day} className={`min-h-[140px] border p-4 rounded-2xl flex flex-col gap-3 transition-colors ${dayEvents.length > 0 ? 'border-[#C08F2D]/40 bg-[#C08F2D]/5 shadow-inner' : 'border-gray-100 hover:bg-gray-50'}`}>
                      <span className={`font-black text-2xl mb-1 ${dayEvents.length > 0 ? 'text-[#721F31]' : 'text-gray-400'}`}>{day}</span>
                      
                      {dayEvents.map(e => (
                       <div
                          key={e.id}
                          onClick={() => setSelectedEventUsers(e.id)}
                          className="w-full bg-white border border-[#721F31]/30 text-[#721F31]
                                     hover:bg-[#721F31] hover:text-white
                                     rounded-xl p-3 cursor-pointer transition-all
                                     shadow-sm flex flex-col gap-1.5 hover:shadow-md group"
                        >
                          <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100">
                            <Clock className="w-4 h-4 shrink-0" />
                            <span className="font-black text-[13px] md:text-[14px]">{e.time}</span>
                          </div>
                          {/* تأكدنا من إنو النص يلتف ويظهر بشكل كامل بدون ما ينقص */}
                          <span className="text-[13px] md:text-[14px] font-bold whitespace-normal break-words leading-snug">
                            {e.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* قائمة الفعاليات الجانبية */}
            <div className="xl:col-span-3 space-y-4">
              <h2 className="text-xl font-black text-gray-900 mb-6">قائمة الفعاليات</h2>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-[#C08F2D]/30 transition-all shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-black bg-[#721F31]/10 text-[#721F31] px-2.5 py-1 rounded-md">{event.date}</span>
                      {event.status === 'مكتمل العدد' && <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded">مكتمل</span>}
                    </div>
                    <h3 className="text-[15px] font-black text-gray-900 mb-2 leading-tight">{event.title}</h3>
                    <p className="text-[13px] font-bold text-gray-500 mb-5 flex items-center gap-1.5"><Clock className="w-4 h-4" /> {event.time}</p>
                    <button onClick={() => setSelectedEventUsers(event.id)} className="w-full py-3 bg-gray-50 hover:bg-[#721F31] hover:text-white text-[#721F31] border border-gray-100 rounded-xl font-bold text-[13px] transition-colors flex justify-center items-center gap-2 cursor-pointer group">
                      <Users className="w-4 h-4 group-hover:text-white text-[#721F31]" /> عرض المسجلين ({event.registered})
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}

      </main>

      <AnimatePresence>{isAddEventOpen && <AddEventModal />}</AnimatePresence>
      <AnimatePresence>{selectedEventUsers && <RegistrantsModal eventId={selectedEventUsers} />}</AnimatePresence>
    </div>
  );
}

function PieChartIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  );
}