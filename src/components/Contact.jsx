// src/components/Contact.jsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import useEscapeKey from '../hooks/useEscapeKey';
import {
  MapPin, Phone, Mail, Send, Clock, Building2, CheckCircle2, ChevronDown,
  Briefcase, GraduationCap, UploadCloud, X, Users
} from 'lucide-react';

const governorates = [
  'عمّان', 'إربد', 'الزرقاء', 'البلقاء', 'مادبا', 'جرش', 'عجلون', 'المفرق',
  'الكرك', 'الطفيلة', 'معان', 'العقبة'
];

const interestAreas = [
  { value: 'تعلّم', label: 'تعلّم' },
  { value: 'قُد', label: 'قُد' },
  { value: 'اصنع الأثر', label: 'اصنع الأثر' }
];

const officesData = [
  { id: 'amman', name: 'المقر الرئيسي - عمّان', address: 'دابوق - شارع محمد السعد البطاينة', phone: '+962 6 5806161', ext: '412', hours: 'الأحد - الخميس (08:00 ص - 04:00 م)' },
  { id: 'irbid', name: 'مكتب إربد', address: 'شارع فراس العجلوني بالقرب من دوّار القبة', phone: '+962 6 5806161', ext: '2010 - 2011', hours: 'الأحد - الخميس (08:00 ص - 04:00 م)' },
  { id: 'zarqa', name: 'مكتب الزرقاء', address: 'شارع الأميرة سلمى - مركز الأميرة سلمى للطفولة', phone: '+962 6 5806161', ext: '2050 - 2051', hours: 'الأحد - الخميس (08:00 ص - 04:00 م)' },
  { id: 'balqa', name: 'مكتب البلقاء', address: 'طريق السلط - جسر الدبابنة - عمارة بنك الاتحاد', phone: '+962 6 5806161', ext: '2070 - 2071', hours: 'الأحد - الخميس (08:00 ص - 04:00 م)' },
  { id: 'madaba', name: 'مكتب مادبا', address: 'ش. مأدبا الغربي، مديرية عمل محافظة مادبا', phone: '+962 6 5806161', ext: '2060 - 2061', hours: 'الأحد - الخميس (08:00 ص - 04:00 م)' },
  { id: 'jerash', name: 'مكتب جرش', address: 'شارع الملك عبدالله الثاني - مقابل شركة اورنج', phone: '+962 6 5806161', ext: '2100 - 2101', hours: 'الأحد - الخميس (08:00 ص - 04:00 م)' },
  { id: 'ajloun', name: 'مكتب عجلون', address: 'شارع الحسام - المركز الثقافي - بجانب مبنى محافظة عجلون', phone: '+962 6 5806161', ext: '2110 - 2111', hours: 'الأحد - الخميس (08:00 ص - 04:00 م)' },
  { id: 'mafraq', name: 'مكتب المفرق', address: 'شارع الكرامة - بجانب جمعية الكاريتاس', phone: '+962 6 5806161', ext: '2040', hours: 'الأحد - الخميس (08:00 ص - 04:00 م)' },
  { id: 'karak', name: 'مكتب الكرك', address: 'إشارة كلية الكرك - بجانب "وزارة العمل" مديرية عمل الكرك – الطابق الثاني', phone: '+962 6 5806161', ext: '2090 - 2091', hours: 'الأحد - الخميس (08:00 ص - 04:00 م)' },
  { id: 'tafilah', name: 'مكتب الطفيلة', address: 'طريق الطفيلة - بلدية الطفيلة الجديدة – الطابق الرابع', phone: '+962 6 5806161', ext: '2080 - 2081', hours: 'الأحد - الخميس (08:00 ص - 04:00 م)' },
  { id: 'maan', name: 'مكتب معان', address: 'طريق المدورة - مركز الحسين بن عبدالله الثاني الثقافي', phone: '+962 6 5806161', ext: '2030', hours: 'الأحد - الخميس (08:00 ص - 04:00 م)' },
  { id: 'aqaba', name: 'مكتب العقبة', address: 'مجمع صندوق إدخار الملكية الأردنية – الطابق الثاني', phone: '+962 6 5806161', ext: '2020', hours: 'الأحد - الخميس (08:00 ص - 04:00 م)' },
];

export default function Contact({ onNavigate, initialTab }) {
  const [activeTab, setActiveTab] = useState(initialTab === 'network' || initialTab === 'careers' ? initialTab : 'contact');
  
  // 🟢 حالة المكتب المختار
  const [selectedOffice, setSelectedOffice] = useState(officesData[0]);
  // 🟢 حالة لفتح وإغلاق القائمة المنسدلة
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [modalType, setModalType] = useState(null);

  // 🟢 إغلاق القائمة المنسدلة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEscapeKey(() => setIsDropdownOpen(false), isDropdownOpen);
  useEscapeKey(() => { setModalType(null); setIsSent(false); }, !!modalType);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      if(modalType) {
        setTimeout(() => {
          setModalType(null);
          setIsSent(false);
        }, 2000);
      }
    }, 1500);
  };

  return (
    <div className="min-h-[100dvh] bg-[#fcfcfc] font-sans selection:bg-[#C08F2D] selection:text-white flex flex-col relative" dir="rtl">
      
      {/* 1. الهيدر الفخم */}
      <div className="bg-[#1a070b] pt-[clamp(6rem,14vh,10rem)] pb-[clamp(3rem,8vh,6rem)] relative overflow-hidden rounded-b-[clamp(1.5rem,4vw,3.5rem)] shadow-xl shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#721F31]/90 via-[#3b1019] to-[#1a070b]" />
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '300px' }}></div>
        
        <div className="max-w-[1200px] mx-auto px-[clamp(1.5rem,4vw,2rem)] relative z-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white mb-5 lg:mb-6 2xl:mb-8 leading-[1.2] tracking-tight">
            نحن هنا لنصنع <span className="text-[#C08F2D]">الأثر معاً</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[14px] sm:text-[15px] lg:text-[15px] xl:text-base 2xl:text-xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
            سواء كنت تبحث عن إجابات لاستفساراتك، أو تطمح لتكون جزءاً من فريقنا أو شبكتنا لتمكين الشباب الأردني، أنت في المكان الصحيح.
          </motion.p>
        </div>
      </div>

      {/* 2. التبويبات الرئيسية */}
      <div className="max-w-[560px] mx-auto w-full px-[clamp(1rem,4vw,1.5rem)] -mt-[clamp(1.25rem,3vw,1.75rem)] relative z-30">
        <div role="tablist" aria-label="أقسام التواصل" className="bg-white p-[clamp(0.25rem,0.8vw,0.35rem)] rounded-full shadow-xl border border-gray-100 flex">
          <button
            role="tab"
            aria-selected={activeTab === 'contact'}
            onClick={() => { setActiveTab('contact'); setIsSent(false); }}
            className={`flex-1 flex items-center justify-center gap-[clamp(0.3rem,1vw,0.5rem)] py-[clamp(0.5rem,1.5vw,0.875rem)] rounded-full font-black text-[clamp(0.62rem,1vw,0.9rem)] transition-all duration-300 ${activeTab === 'contact' ? 'bg-[#721F31] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Mail className="w-[clamp(0.8rem,1.2vw,1.25rem)] h-[clamp(0.8rem,1.2vw,1.25rem)] shrink-0" /> <span>تواصل معنا</span>
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'careers'}
            onClick={() => { setActiveTab('careers'); setIsSent(false); }}
            className={`flex-1 flex items-center justify-center gap-[clamp(0.3rem,1vw,0.5rem)] py-[clamp(0.5rem,1.5vw,0.875rem)] rounded-full font-black text-[clamp(0.62rem,1vw,0.9rem)] transition-all duration-300 ${activeTab === 'careers' ? 'bg-[#721F31] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Briefcase className="w-[clamp(0.8rem,1.2vw,1.25rem)] h-[clamp(0.8rem,1.2vw,1.25rem)] shrink-0" /> <span>انضم لفريقنا</span>
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'network'}
            onClick={() => { setActiveTab('network'); setIsSent(false); }}
            className={`flex-1 flex items-center justify-center gap-[clamp(0.3rem,1vw,0.5rem)] py-[clamp(0.5rem,1.5vw,0.875rem)] rounded-full font-black text-[clamp(0.62rem,1vw,0.9rem)] transition-all duration-300 ${activeTab === 'network' ? 'bg-[#721F31] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Users className="w-[clamp(0.8rem,1.2vw,1.25rem)] h-[clamp(0.8rem,1.2vw,1.25rem)] shrink-0" /> <span>انضم لشبكتنا</span>
          </button>
        </div>
      </div>

      {/* 3. المحتوى المتغير */}
      <div className="max-w-[1300px] xl:max-w-[1150px] 2xl:max-w-[1300px] mx-auto w-full px-[clamp(1rem,4vw,2rem)] mt-[clamp(2rem,5vh,4rem)] mb-[clamp(4rem,8vh,6rem)] relative z-20 flex-grow">
        <AnimatePresence mode="wait">
          
          {/* ================= TAB 1: تواصل معنا ================= */}
          {activeTab === 'contact' && (
            <motion.div 
              key="contact-tab"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
              className="bg-white rounded-[clamp(1.5rem,3vw,2.5rem)] shadow-xl shadow-[#721F31]/5 flex flex-col lg:flex-row overflow-visible border border-gray-100 min-h-0"
            >
              
              <div className="lg:w-2/5 relative bg-[#1a070b] p-[clamp(1.5rem,3vw,3.5rem)] flex flex-col shrink-0 rounded-t-[clamp(1.5rem,3vw,2.5rem)] lg:rounded-tr-[clamp(1.5rem,3vw,2.5rem)] lg:rounded-bl-[clamp(1.5rem,3vw,2.5rem)] lg:rounded-tl-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#721F31] to-[#3b1019]" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#C08F2D]/20 rounded-full blur-[60px]" />
                
                <div className="relative z-10 flex flex-col h-full">
                  
                  {/* 🟢 القائمة المنسدلة العصرية (Custom Dropdown) */}
                  <div className="mb-[clamp(1.5rem,3vw,2.5rem)] border-b border-white/10 pb-[clamp(1rem,2vw,1.5rem)]" ref={dropdownRef}>
                    <h4 className="text-white/80 font-bold text-[clamp(0.7rem,1vw,0.85rem)] mb-[clamp(0.5rem,1vw,0.75rem)] pr-1">اختر المحافظة لمعرفة مواقعنا:</h4>
                    
                    <div className="relative">
                      {/* زر تشغيل القائمة */}
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`w-full flex items-center justify-between bg-white/5 hover:bg-white/10 border px-[clamp(1rem,1.5vw,1.5rem)] py-[clamp(0.75rem,1.2vw,1rem)] rounded-xl transition-all duration-300 cursor-pointer backdrop-blur-sm ${isDropdownOpen ? 'border-[#C08F2D] shadow-[0_0_15px_rgba(192,143,45,0.2)]' : 'border-white/10'}`}
                      >
                        <div className="flex items-center gap-[clamp(0.5rem,1vw,0.75rem)]">
                          <Building2 className="w-[clamp(1rem,1.2vw,1.25rem)] h-[clamp(1rem,1.2vw,1.25rem)] text-[#C08F2D]" />
                          <span className="text-white font-black text-[clamp(0.85rem,1.2vw,1rem)]">{selectedOffice.name}</span>
                        </div>
                        <ChevronDown className={`w-[clamp(1rem,1.2vw,1.25rem)] h-[clamp(1rem,1.2vw,1.25rem)] text-white/70 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[#C08F2D]' : ''}`} />
                      </button>

                      {/* قائمة الخيارات المنبثقة */}
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                            className="absolute top-[calc(100%+0.5rem)] left-0 right-0 bg-[#2b0811]/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50"
                          >
                            <div className="max-h-[240px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                              {officesData.map((office) => (
                                <button
                                  key={office.id}
                                  onClick={() => {
                                    setSelectedOffice(office);
                                    setIsDropdownOpen(false);
                                  }}
                                  className={`w-full text-right px-[clamp(1rem,1.5vw,1.5rem)] py-[clamp(0.75rem,1vw,0.875rem)] transition-colors flex items-center justify-between group cursor-pointer ${
                                    selectedOffice.id === office.id 
                                      ? 'bg-[#C08F2D]/20 text-[#C08F2D]' 
                                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                                  }`}
                                >
                                  <span className="font-bold text-[clamp(0.75rem,1vw,0.9rem)]">{office.name}</span>
                                  {selectedOffice.id === office.id && <CheckCircle2 className="w-[clamp(1rem,1.2vw,1.25rem)] h-[clamp(1rem,1.2vw,1.25rem)] text-[#C08F2D]" />}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  
                  {/* التفاصيل تتغير بناءً على الاختيار */}
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={selectedOffice.id}
                      initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 15 }} transition={{ duration: 0.3 }}
                      className="space-y-[clamp(1.25rem,2.5vw,2rem)] flex-grow mt-2"
                    >
                      {[
                        { icon: MapPin, title: 'العنوان', desc: selectedOffice.address },
                        { icon: Phone, title: 'الهاتف', desc: `${selectedOffice.phone} (فرعي: ${selectedOffice.ext})`, ltr: true },
                        { icon: Mail, title: 'البريد الإلكتروني', desc: 'info@cpf.jo', ltr: true },
                        { icon: Clock, title: 'ساعات العمل', desc: selectedOffice.hours }
                      ].map((info, idx) => (
                        <div key={idx} className="flex items-start gap-[clamp(0.75rem,1.5vw,1.25rem)] group cursor-default">
                          <div className="w-[clamp(2.25rem,3.5vw,3rem)] h-[clamp(2.25rem,3.5vw,3rem)] rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#C08F2D]/20 group-hover:border-[#C08F2D]/50 transition-all duration-300 shadow-sm">
                            <info.icon className="w-[clamp(1rem,1.5vw,1.25rem)] h-[clamp(1rem,1.5vw,1.25rem)] text-white/90 group-hover:text-[#C08F2D]" />
                          </div>
                          <div className="pt-1">
                            <h3 className="font-bold text-[#C08F2D] text-[clamp(0.6rem,0.8vw,0.7rem)] uppercase tracking-widest mb-[clamp(0.2rem,0.5vw,0.35rem)]">{info.title}</h3>
                            <p className="text-white text-[clamp(0.8rem,1.1vw,1rem)] font-bold leading-relaxed" dir={info.ltr ? "ltr" : "rtl"}>{info.desc}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>

                </div>
              </div>

              {/* الفورم (نموذج الإرسال) */}
              <div className="lg:w-3/5 p-[clamp(1.5rem,4vw,3.5rem)] bg-white relative flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {isSent ? (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="text-center py-10">
                      <div className="w-[clamp(4rem,6vw,6rem)] h-[clamp(4rem,6vw,6rem)] bg-green-50 rounded-full flex items-center justify-center mx-auto mb-[clamp(1.25rem,2.5vw,2rem)] shadow-inner border border-green-100 relative">
                        <CheckCircle2 className="w-[clamp(2rem,3vw,3rem)] h-[clamp(2rem,3vw,3rem)] text-green-500 relative z-10" />
                      </div>
                      <h2 className="text-[clamp(1.25rem,2.5vw,2rem)] font-black text-[#721F31] mb-[clamp(0.75rem,1.5vw,1rem)]">استلمنا رسالتك بنجاح</h2>
                      <p className="text-gray-500 font-bold text-[clamp(0.75rem,1vw,0.9rem)] leading-relaxed mb-[clamp(1.5rem,3vw,2.5rem)] max-w-sm mx-auto">سيقوم الفريق المختص بمراجعة رسالتك والرد عليك في أقرب وقت ممكن.</p>
                      <button onClick={() => setIsSent(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-[clamp(1.5rem,3vw,2rem)] py-[clamp(0.75rem,1.5vw,1rem)] rounded-xl font-black text-[clamp(0.75rem,1vw,0.85rem)] transition-all">
                        إرسال رسالة أخرى
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h2 className="text-[clamp(1.25rem,2.5vw,2rem)] font-black text-[#721F31] mb-[clamp(0.35rem,1vw,0.5rem)]">أرسل رسالتك</h2>
                      <p className="text-gray-500 font-medium text-[clamp(0.75rem,1vw,0.9rem)] mb-[clamp(1.25rem,3vw,2rem)]">دعنا نعرف كيف يمكننا مساعدتك ليتم تحويل رسالتك للقسم المختص.</p>
                      <form onSubmit={handleSubmit} className="space-y-[clamp(1rem,2vw,1.5rem)]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(1rem,2vw,1.5rem)]">
                          <div>
                            <label className="block text-[clamp(0.7rem,0.9vw,0.85rem)] font-bold text-gray-700 mb-[clamp(0.35rem,0.8vw,0.5rem)]">الاسم الكامل <span className="text-[#721F31]">*</span></label>
                            <input required type="text" placeholder="الاسم الرباعي" className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-bold text-[clamp(0.75rem,1vw,0.9rem)] py-[clamp(0.6rem,1.2vw,0.875rem)] px-[clamp(0.875rem,1.5vw,1rem)] rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[clamp(0.7rem,0.9vw,0.85rem)] font-bold text-gray-700 mb-[clamp(0.35rem,0.8vw,0.5rem)]">رقم الهاتف <span className="text-[#721F31]">*</span></label>
                            <input required type="tel" dir="ltr" placeholder="+962 7X XXX XXXX" className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-bold text-[clamp(0.75rem,1vw,0.9rem)] py-[clamp(0.6rem,1.2vw,0.875rem)] px-[clamp(0.875rem,1.5vw,1rem)] rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all text-left" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[clamp(0.7rem,0.9vw,0.85rem)] font-bold text-gray-700 mb-[clamp(0.35rem,0.8vw,0.5rem)]">البريد الإلكتروني</label>
                          <input type="email" dir="ltr" placeholder="example@email.com" className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-bold text-[clamp(0.75rem,1vw,0.9rem)] py-[clamp(0.6rem,1.2vw,0.875rem)] px-[clamp(0.875rem,1.5vw,1rem)] rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all text-left" />
                        </div>
                        <div>
                          <label className="block text-[clamp(0.7rem,0.9vw,0.85rem)] font-bold text-gray-700 mb-[clamp(0.35rem,0.8vw,0.5rem)]">تصنيف الرسالة <span className="text-[#721F31]">*</span></label>
                          <div className="relative">
                            <select required className="w-full bg-gray-50 border border-gray-200 text-gray-700 font-bold text-[clamp(0.75rem,1vw,0.9rem)] py-[clamp(0.6rem,1.2vw,0.875rem)] pl-[clamp(0.875rem,1.5vw,1rem)] pr-[clamp(2rem,3vw,2.5rem)] rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all appearance-none cursor-pointer">
                              <option value="" disabled selected hidden>اختر تصنيف الرسالة...</option>
                              <option value="1">استفسار عام</option>
                              <option value="2">الدعم الفني والتقني</option>
                              <option value="4">المقترحات والشكاوى</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-[clamp(0.875rem,1.5vw,1rem)] flex items-center text-gray-500">
                              <ChevronDown className="w-[clamp(1rem,1.2vw,1.25rem)] h-[clamp(1rem,1.2vw,1.25rem)]" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[clamp(0.7rem,0.9vw,0.85rem)] font-bold text-gray-700 mb-[clamp(0.35rem,0.8vw,0.5rem)]">تفاصيل الرسالة <span className="text-[#721F31]">*</span></label>
                          <textarea required rows="4" placeholder="اكتب رسالتك هنا..." className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-bold text-[clamp(0.75rem,1vw,0.9rem)] py-[clamp(0.6rem,1.2vw,0.875rem)] px-[clamp(0.875rem,1.5vw,1rem)] rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all resize-none"></textarea>
                        </div>
                        <button type="submit" disabled={isSubmitting} className="w-full bg-[#721F31] hover:bg-[#521623] text-white rounded-[clamp(0.6rem,1vw,0.75rem)] font-black text-[clamp(0.8rem,1.1vw,0.9rem)] py-[clamp(0.75rem,1.5vw,1rem)] flex items-center justify-center gap-[clamp(0.5rem,1vw,0.75rem)] transition-all duration-300 group shadow-md hover:shadow-xl cursor-pointer">
                          {isSubmitting ? "جاري الإرسال..." : <><Send className="w-[clamp(1rem,1.2vw,1.25rem)] h-[clamp(1rem,1.2vw,1.25rem)] rtl:-scale-x-100 transform group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" /> إرسال الرسالة</>}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ================= TAB 2: انضم لفريقنا ================= */}
          {activeTab === 'careers' && (
            <motion.div 
              key="careers-tab"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
              className="max-w-[900px] mx-auto space-y-[clamp(1.5rem,4vw,3rem)]"
            >
              <div className="text-center mb-[clamp(1.5rem,4vw,3rem)]">
                <h2 className="text-[clamp(1.35rem,2.5vw,2.25rem)] font-black text-[#721F31] mb-[clamp(0.35rem,1vw,0.75rem)]">اختر مسارك لتنضم لقاعدة المواهب</h2>
                <p className="text-gray-500 font-medium text-[clamp(0.75rem,1.1vw,1rem)]">أرسل سيرتك الذاتية وسيقوم فريقنا بالتواصل معك فور توفر فرصة تطابق شغفك.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(1rem,2vw,2rem)]">
                <div className="bg-white p-[clamp(1.5rem,3vw,2.5rem)] rounded-[clamp(1.5rem,3vw,2.5rem)] border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#721F31]/30 transition-all duration-500 group flex flex-col items-center text-center">
                  <div className="w-[clamp(3.5rem,5vw,5rem)] h-[clamp(3.5rem,5vw,5rem)] bg-[#721F31]/5 rounded-[clamp(1rem,2vw,1.5rem)] flex items-center justify-center mb-[clamp(1rem,2vw,1.5rem)] group-hover:bg-[#721F31] group-hover:-translate-y-2 transition-all duration-500">
                    <Briefcase className="w-[clamp(1.75rem,2.5vw,2.5rem)] h-[clamp(1.75rem,2.5vw,2.5rem)] text-[#721F31] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-[clamp(1.1rem,1.5vw,1.5rem)] font-black text-gray-900 mb-[clamp(0.5rem,1vw,1rem)]">أصحاب الخبرات</h3>
                  <p className="text-gray-500 font-medium text-[clamp(0.75rem,1vw,0.95rem)] leading-relaxed mb-[clamp(1.5rem,3vw,2rem)] flex-grow">
                    أمتلك خبرة عملية سابقة وأبحث عن فرصة وظيفية (دوام كامل / جزئي) لإحداث نقلة نوعية في مسيرتي.
                  </p>
                  <button 
                    onClick={() => setModalType('job')}
                    className="w-full bg-gray-50 text-[#721F31] hover:bg-[#721F31] hover:text-white py-[clamp(0.75rem,1.5vw,1rem)] rounded-xl font-black text-[clamp(0.75rem,1vw,0.9rem)] transition-colors cursor-pointer"
                  >
                    أرسل سيرتك الذاتية
                  </button>
                </div>

                <div className="bg-white p-[clamp(1.5rem,3vw,2.5rem)] rounded-[clamp(1.5rem,3vw,2.5rem)] border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#C08F2D]/50 transition-all duration-500 group flex flex-col items-center text-center">
                  <div className="w-[clamp(3.5rem,5vw,5rem)] h-[clamp(3.5rem,5vw,5rem)] bg-[#C08F2D]/10 rounded-[clamp(1rem,2vw,1.5rem)] flex items-center justify-center mb-[clamp(1rem,2vw,1.5rem)] group-hover:bg-[#C08F2D] group-hover:-translate-y-2 transition-all duration-500">
                    <GraduationCap className="w-[clamp(1.75rem,2.5vw,2.5rem)] h-[clamp(1.75rem,2.5vw,2.5rem)] text-[#C08F2D] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-[clamp(1.1rem,1.5vw,1.5rem)] font-black text-gray-900 mb-[clamp(0.5rem,1vw,1rem)]">برامج التدريب للشباب</h3>
                  <p className="text-gray-500 font-medium text-[clamp(0.75rem,1vw,0.95rem)] leading-relaxed mb-[clamp(1.5rem,3vw,2rem)] flex-grow">
                    أنا حديث التخرج أو طالب، وأبحث عن فرصة تدريب (Internship) لاكتساب مهارات عملية وبناء قدراتي.
                  </p>
                  <button 
                    onClick={() => setModalType('intern')}
                    className="w-full bg-gray-50 text-[#C08F2D] hover:bg-[#C08F2D] hover:text-white py-[clamp(0.75rem,1.5vw,1rem)] rounded-xl font-black text-[clamp(0.75rem,1vw,0.9rem)] transition-colors cursor-pointer"
                  >
                    قدم كمتدرب
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= TAB 3: انضم لشبكتنا ================= */}
          {activeTab === 'network' && (
            <motion.div
              key="network-tab"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
              className="max-w-[720px] mx-auto"
            >
              <div className="bg-white rounded-[clamp(1.5rem,3vw,2.5rem)] shadow-xl shadow-[#721F31]/5 border border-gray-100 p-[clamp(1.5rem,4vw,3.5rem)] relative overflow-hidden">
                <div className="absolute -top-16 -left-16 w-56 h-56 bg-[#C08F2D]/10 rounded-full blur-[70px] pointer-events-none" />

                <AnimatePresence mode="wait">
                  {isSent ? (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="text-center py-10 relative z-10">
                      <div className="w-[clamp(4rem,6vw,6rem)] h-[clamp(4rem,6vw,6rem)] bg-green-50 rounded-full flex items-center justify-center mx-auto mb-[clamp(1.25rem,2.5vw,2rem)] shadow-inner border border-green-100">
                        <CheckCircle2 className="w-[clamp(2rem,3vw,3rem)] h-[clamp(2rem,3vw,3rem)] text-green-500" />
                      </div>
                      <h2 className="text-[clamp(1.25rem,2.5vw,2rem)] font-black text-[#721F31] mb-[clamp(0.75rem,1.5vw,1rem)]">أهلاً بك في شبكتنا!</h2>
                      <p className="text-gray-500 font-bold text-[clamp(0.75rem,1vw,0.9rem)] leading-relaxed mb-[clamp(1.5rem,3vw,2.5rem)] max-w-sm mx-auto">استلمنا بياناتك بنجاح، وسيتواصل معك فريقنا فور توفر فرصة أو مبادرة تناسب اهتمامك.</p>
                      <button onClick={() => setIsSent(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-[clamp(1.5rem,3vw,2rem)] py-[clamp(0.75rem,1.5vw,1rem)] rounded-xl font-black text-[clamp(0.75rem,1vw,0.85rem)] transition-all cursor-pointer">
                        تعبئة نموذج آخر
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10">
                      <div className="flex items-center gap-[clamp(0.75rem,1.5vw,1rem)] mb-[clamp(1.25rem,3vw,2rem)]">
                        <div className="w-[clamp(2.75rem,4vw,3.5rem)] h-[clamp(2.75rem,4vw,3.5rem)] bg-[#721F31]/5 rounded-2xl flex items-center justify-center shrink-0">
                          <Users className="w-[clamp(1.25rem,2vw,1.75rem)] h-[clamp(1.25rem,2vw,1.75rem)] text-[#721F31]" />
                        </div>
                        <div>
                          <h2 className="text-[clamp(1.25rem,2.5vw,2rem)] font-black text-[#721F31] leading-tight">انضم لشبكة شباب المؤسسة</h2>
                          <p className="text-gray-500 font-medium text-[clamp(0.75rem,1vw,0.9rem)]">خطوة واحدة تفصلك عن فرص وبرامج تناسب طموحك.</p>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-[clamp(1rem,2vw,1.5rem)]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(1rem,2vw,1.5rem)]">
                          <div>
                            <label className="block text-[clamp(0.7rem,0.9vw,0.85rem)] font-bold text-gray-700 mb-[clamp(0.35rem,0.8vw,0.5rem)]">الاسم الرباعي <span className="text-[#721F31]">*</span></label>
                            <input required type="text" placeholder="الاسم الكامل" className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-bold text-[clamp(0.75rem,1vw,0.9rem)] py-[clamp(0.6rem,1.2vw,0.875rem)] px-[clamp(0.875rem,1.5vw,1rem)] rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[clamp(0.7rem,0.9vw,0.85rem)] font-bold text-gray-700 mb-[clamp(0.35rem,0.8vw,0.5rem)]">الفئة العمرية <span className="text-[#721F31]">*</span></label>
                            <div className="relative">
                              <select required defaultValue="" className="w-full bg-gray-50 border border-gray-200 text-gray-700 font-bold text-[clamp(0.75rem,1vw,0.9rem)] py-[clamp(0.6rem,1.2vw,0.875rem)] pl-[clamp(0.875rem,1.5vw,1rem)] pr-[clamp(2rem,3vw,2.5rem)] rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all appearance-none cursor-pointer">
                                <option value="" disabled hidden>اختر الفئة العمرية...</option>
                                <option value="14-17">14 - 17</option>
                                <option value="18-25">18 - 25</option>
                                <option value="26-30">26 - 30</option>
                                <option value="31-35">31 - 35</option>
                                <option value="35+">35+</option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-[clamp(0.875rem,1.5vw,1rem)] flex items-center text-gray-500">
                                <ChevronDown className="w-[clamp(1rem,1.2vw,1.25rem)] h-[clamp(1rem,1.2vw,1.25rem)]" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(1rem,2vw,1.5rem)]">
                          <div>
                            <label className="block text-[clamp(0.7rem,0.9vw,0.85rem)] font-bold text-gray-700 mb-[clamp(0.35rem,0.8vw,0.5rem)]">المحافظة <span className="text-[#721F31]">*</span></label>
                            <div className="relative">
                              <select required defaultValue="" className="w-full bg-gray-50 border border-gray-200 text-gray-700 font-bold text-[clamp(0.75rem,1vw,0.9rem)] py-[clamp(0.6rem,1.2vw,0.875rem)] pl-[clamp(0.875rem,1.5vw,1rem)] pr-[clamp(2rem,3vw,2.5rem)] rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all appearance-none cursor-pointer">
                                <option value="" disabled hidden>اختر المحافظة...</option>
                                {governorates.map((gov) => (
                                  <option key={gov} value={gov}>{gov}</option>
                                ))}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-[clamp(0.875rem,1.5vw,1rem)] flex items-center text-gray-500">
                                <ChevronDown className="w-[clamp(1rem,1.2vw,1.25rem)] h-[clamp(1rem,1.2vw,1.25rem)]" />
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="block text-[clamp(0.7rem,0.9vw,0.85rem)] font-bold text-gray-700 mb-[clamp(0.35rem,0.8vw,0.5rem)]">رقم الهاتف <span className="text-[#721F31]">*</span></label>
                            <input required type="tel" dir="ltr" placeholder="+962 7X XXX XXXX" className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-bold text-[clamp(0.75rem,1vw,0.9rem)] py-[clamp(0.6rem,1.2vw,0.875rem)] px-[clamp(0.875rem,1.5vw,1rem)] rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all text-left" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[clamp(0.7rem,0.9vw,0.85rem)] font-bold text-gray-700 mb-[clamp(0.35rem,0.8vw,0.5rem)]">البريد الإلكتروني <span className="text-[#721F31]">*</span></label>
                          <input required type="email" dir="ltr" placeholder="example@email.com" className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-bold text-[clamp(0.75rem,1vw,0.9rem)] py-[clamp(0.6rem,1.2vw,0.875rem)] px-[clamp(0.875rem,1.5vw,1rem)] rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all text-left" />
                        </div>

                        <div>
                          <label className="block text-[clamp(0.7rem,0.9vw,0.85rem)] font-bold text-gray-700 mb-[clamp(0.35rem,0.8vw,0.5rem)]">مجال الاهتمام <span className="text-[#721F31]">*</span></label>
                          <div className="relative">
                            <select required defaultValue="" className="w-full bg-gray-50 border border-gray-200 text-gray-700 font-bold text-[clamp(0.75rem,1vw,0.9rem)] py-[clamp(0.6rem,1.2vw,0.875rem)] pl-[clamp(0.875rem,1.5vw,1rem)] pr-[clamp(2rem,3vw,2.5rem)] rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all appearance-none cursor-pointer">
                              <option value="" disabled hidden>اختر مجال اهتمامك...</option>
                              {interestAreas.map((area) => (
                                <option key={area.value} value={area.value}>{area.label}</option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-[clamp(0.875rem,1.5vw,1rem)] flex items-center text-gray-500">
                              <ChevronDown className="w-[clamp(1rem,1.2vw,1.25rem)] h-[clamp(1rem,1.2vw,1.25rem)]" />
                            </div>
                          </div>
                        </div>

                        <button type="submit" disabled={isSubmitting} className="w-full bg-[#721F31] hover:bg-[#521623] text-white rounded-[clamp(0.6rem,1vw,0.75rem)] font-black text-[clamp(0.8rem,1.1vw,0.9rem)] py-[clamp(0.75rem,1.5vw,1rem)] flex items-center justify-center gap-[clamp(0.5rem,1vw,0.75rem)] transition-all duration-300 group shadow-md hover:shadow-xl cursor-pointer">
                          {isSubmitting ? "جاري الإرسال..." : <><Send className="w-[clamp(1rem,1.2vw,1.25rem)] h-[clamp(1rem,1.2vw,1.25rem)] rtl:-scale-x-100 transform group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" /> انضم الآن</>}
                        </button>
                      </form>

                      <p className="text-center text-gray-500 font-medium text-[clamp(0.65rem,0.85vw,0.8rem)] mt-[clamp(1rem,2vw,1.5rem)]">
                        هل تمثل مؤسسة أو شركة وتبحث عن شراكة؟{' '}
                        <button
                          type="button"
                          onClick={() => onNavigate && onNavigate('partnerships')}
                          className="text-[#721F31] font-black hover:text-[#C08F2D] transition-colors cursor-pointer underline underline-offset-2"
                        >
                          تفضّل بزيارة صفحة الشراكات
                        </button>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <div className="shrink-0 mt-auto relative z-10">
        <Footer onNavigate={onNavigate}/>
      </div>

      {/* 4. الـ Modal (نافذة إرسال الـ CV المنبثقة) */}
      <AnimatePresence>
        {modalType && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => { setModalType(null); setIsSent(false); }}
              className="fixed inset-0 bg-[#1a070b]/60 backdrop-blur-sm z-[100]"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg 2xl:max-w-xl z-[101] px-4"
            >
              <div className="bg-white rounded-[clamp(1.5rem,3vw,2rem)] p-[clamp(1.5rem,3vw,2.5rem)] shadow-2xl relative overflow-hidden">
                <div className={`absolute top-0 right-0 left-0 h-2 ${modalType === 'job' ? 'bg-[#721F31]' : 'bg-[#C08F2D]'}`} />
                
                <button onClick={() => { setModalType(null); setIsSent(false); }} className="absolute top-[clamp(1rem,2vw,1.5rem)] left-[clamp(1rem,2vw,1.5rem)] w-[clamp(1.5rem,2.5vw,2rem)] h-[clamp(1.5rem,2.5vw,2rem)] bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                  <X className="w-[clamp(0.85rem,1.2vw,1.25rem)] h-[clamp(0.85rem,1.2vw,1.25rem)]" />
                </button>

                <AnimatePresence mode="wait">
                  {isSent ? (
                    <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-[clamp(1.5rem,3vw,2rem)]">
                      <div className="w-[clamp(4rem,6vw,5rem)] h-[clamp(4rem,6vw,5rem)] bg-green-50 rounded-full flex items-center justify-center mx-auto mb-[clamp(1rem,2vw,1.25rem)] border border-green-100">
                        <CheckCircle2 className="w-[clamp(2rem,3vw,2.5rem)] h-[clamp(2rem,3vw,2.5rem)] text-green-500" />
                      </div>
                      <h3 className="text-[clamp(1.25rem,2vw,1.5rem)] font-black text-gray-900 mb-2">تم استلام ملفك بنجاح!</h3>
                      <p className="text-[clamp(0.75rem,1vw,0.9rem)] text-gray-500 font-medium">سنتواصل معك في حال توفر فرصة تطابق مهاراتك.</p>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="mb-[clamp(1.5rem,3vw,2rem)] mt-2">
                        <h3 className="text-[clamp(1.25rem,2vw,1.5rem)] font-black text-gray-900 mb-1">
                          {modalType === 'job' ? 'بوابة الوظائف والخبرات' : 'بوابة تدريب الشباب'}
                        </h3>
                        <p className="text-gray-500 font-medium text-[clamp(0.7rem,1vw,0.85rem)]">أرفق سيرتك الذاتية لتنضم لقاعدة بيانات المؤسسة.</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-[clamp(1rem,2vw,1.25rem)]">
                        <div>
                          <label className="block text-[clamp(0.7rem,0.9vw,0.8rem)] font-bold text-gray-700 mb-[clamp(0.35rem,0.8vw,0.5rem)]">الاسم الكامل <span className="text-[#721F31]">*</span></label>
                          <input required type="text" className="w-full bg-gray-50 border border-gray-200 py-[clamp(0.6rem,1.2vw,0.875rem)] px-[clamp(0.875rem,1.5vw,1rem)] rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all font-bold text-[clamp(0.75rem,1vw,0.9rem)]" />
                        </div>
                        <div>
                          <label className="block text-[clamp(0.7rem,0.9vw,0.8rem)] font-bold text-gray-700 mb-[clamp(0.35rem,0.8vw,0.5rem)]">مجال التخصص / الاهتمام <span className="text-[#721F31]">*</span></label>
                          <input required type="text" placeholder="مثال: تسويق، ريادة أعمال، تكنولوجيا" className="w-full bg-gray-50 border border-gray-200 py-[clamp(0.6rem,1.2vw,0.875rem)] px-[clamp(0.875rem,1.5vw,1rem)] rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all font-bold text-[clamp(0.75rem,1vw,0.9rem)]" />
                        </div>

                        <div>
                          <label className="block text-[clamp(0.7rem,0.9vw,0.8rem)] font-bold text-gray-700 mb-[clamp(0.35rem,0.8vw,0.5rem)]">السيرة الذاتية (CV) <span className="text-[#721F31]">*</span></label>
                          <label className="flex flex-col items-center justify-center w-full h-[clamp(5rem,8vw,7rem)] border-2 border-dashed border-gray-300 rounded-xl hover:border-[#C08F2D] hover:bg-gray-50 transition-all cursor-pointer group bg-white">
                            <div className="flex flex-col items-center justify-center">
                              <UploadCloud className="w-[clamp(1.5rem,2vw,2rem)] h-[clamp(1.5rem,2vw,2rem)] text-gray-500 mb-2 group-hover:text-[#C08F2D] transition-colors" />
                              <p className="text-[clamp(0.65rem,0.9vw,0.85rem)] text-gray-500 font-bold group-hover:text-[#C08F2D] transition-colors">اضغط لإرفاق ملف (PDF)</p>
                            </div>
                            <input required type="file" className="hidden" accept=".pdf" />
                          </label>
                        </div>

                        <button type="submit" disabled={isSubmitting} className={`w-full rounded-xl font-black text-[clamp(0.8rem,1.1vw,0.95rem)] py-[clamp(0.75rem,1.5vw,1rem)] mt-[clamp(0.5rem,1.5vw,1rem)] flex items-center justify-center transition-all duration-300 cursor-pointer ${modalType === 'job' ? 'bg-[#721F31] hover:bg-[#521623] text-white' : 'bg-[#C08F2D] hover:bg-[#a67b25] text-[#1a0409]'}`}>
                          {isSubmitting ? "جاري الإرسال..." : "إرسال السيرة الذاتية"}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}