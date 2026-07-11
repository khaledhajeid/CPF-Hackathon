// src/components/Contact.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import { 
  MapPin, Phone, Mail, Send, Clock, Building2, CheckCircle2, ChevronDown, 
  Briefcase, GraduationCap, UploadCloud, X
} from 'lucide-react';

// 🟢 تم إضافة onNavigate هنا لمنع انهيار الصفحة (Crash)
export default function Contact({ onNavigate }) { 
  const [activeTab, setActiveTab] = useState('contact'); // 'contact' | 'careers'
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  
  // State لفتح وإغلاق الـ Modal ومعرفة نوع المسار المختار
  const [modalType, setModalType] = useState(null); // 'job' | 'intern' | null

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      // إغلاق المودال بعد ثانيتين من النجاح
      if(modalType) {
        setTimeout(() => {
          setModalType(null);
          setIsSent(false);
        }, 2000);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans selection:bg-[#C08F2D] selection:text-white flex flex-col relative" dir="rtl">
      
      {/* =========================================
          1. الهيدر الفخم
          ========================================= */}
      {/* 🟢 تأجيل الأحجام الضخمة لـ 2xl لكي يبدو الـ 13 انش (xl) مضغوطاً وأنيقاً */}
      <div className="bg-[#1a070b] pt-28 md:pt-32 lg:pt-32 2xl:pt-40 pb-20 md:pb-24 lg:pb-24 2xl:pb-32 relative overflow-hidden rounded-b-[2.5rem] md:rounded-b-[3rem] 2xl:rounded-b-[4rem] shadow-xl shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#721F31]/90 via-[#3b1019] to-[#1a070b]" />
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '300px' }}></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-black text-white mb-4 lg:mb-5 2xl:mb-6 tracking-tight leading-tight">
            نحن هنا لنصنع <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C08F2D] to-[#fcebb6]">الأثر معاً</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-sm md:text-base lg:text-lg 2xl:text-xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
            سواء كنت تبحث عن إجابات لاستفساراتك، أو تطمح لتكون جزءاً من فريقنا لتمكين الشباب الأردني، أنت في المكان الصحيح.
          </motion.p>
        </div>
      </div>

      {/* =========================================
          2. التبويب الذكي
          ========================================= */}
      <div className="max-w-md mx-auto w-full px-6 -mt-7 md:-mt-8 relative z-30">
        <div className="bg-white p-1.5 rounded-full shadow-xl border border-gray-100 flex">
          <button 
            onClick={() => { setActiveTab('contact'); setIsSent(false); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 lg:py-3 2xl:py-3.5 rounded-full font-black text-[13px] md:text-sm 2xl:text-base transition-all duration-300 ${activeTab === 'contact' ? 'bg-[#721F31] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Mail className="w-4 h-4" />
            تواصل معنا
          </button>
          <button 
            onClick={() => { setActiveTab('careers'); setIsSent(false); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 lg:py-3 2xl:py-3.5 rounded-full font-black text-[13px] md:text-sm 2xl:text-base transition-all duration-300 ${activeTab === 'careers' ? 'bg-[#721F31] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Briefcase className="w-4 h-4" />
            انضم لفريقنا
          </button>
        </div>
      </div>

      {/* =========================================
          3. المحتوى المتغير
          ========================================= */}
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 mt-10 lg:mt-12 2xl:mt-16 mb-16 lg:mb-20 2xl:mb-24 relative z-20 flex-grow">
        <AnimatePresence mode="wait">
          
          {/* ================= TAB 1: تواصل معنا ================= */}
          {activeTab === 'contact' && (
            <motion.div 
              key="contact-tab"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl lg:rounded-[2rem] 2xl:rounded-[2.5rem] shadow-xl shadow-[#721F31]/5 flex flex-col lg:flex-row overflow-hidden border border-gray-100 min-h-0 lg:min-h-[500px] 2xl:min-h-[650px]"
            >
              <div className="lg:w-2/5 relative bg-[#1a070b] p-8 md:p-10 lg:p-10 2xl:p-14 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#721F31] to-[#3b1019]" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#C08F2D]/20 rounded-full blur-[60px]" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 lg:gap-4 mb-8 lg:mb-10 2xl:mb-12">
                    <div className="w-12 h-12 lg:w-12 lg:h-12 2xl:w-14 2xl:h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20">
                      <Building2 className="w-6 h-6 2xl:w-7 2xl:h-7 text-[#C08F2D]" />
                    </div>
                    <h2 className="text-2xl lg:text-2xl 2xl:text-3xl font-black text-white tracking-tight">المقر الرئيسي</h2>
                  </div>
                  
                  <div className="space-y-6 2xl:space-y-8">
                    {[
                      { icon: MapPin, title: 'العنوان', desc: 'عمان، دابوق – شارع محمد السعد البطاينة' },
                      { icon: Phone, title: 'الهاتف', desc: '+962 6 555 5555', ltr: true },
                      { icon: Mail, title: 'البريد الإلكتروني', desc: 'info@cpf.jo' },
                      { icon: Clock, title: 'ساعات العمل', desc: 'الأحد - الخميس (08:00 ص - 04:00 م)' }
                    ].map((info, idx) => (
                      <div key={idx} className="flex items-start gap-4 lg:gap-5 group cursor-default">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#C08F2D]/20 group-hover:border-[#C08F2D]/50 transition-all duration-300">
                          <info.icon className="w-4 h-4 lg:w-5 lg:h-5 text-white/90 group-hover:text-[#C08F2D]" />
                        </div>
                        <div className="pt-0.5 lg:pt-1">
                          <h3 className="font-bold text-[#C08F2D] text-[10px] lg:text-[11px] uppercase tracking-widest mb-1.5">{info.title}</h3>
                          <p className="text-white text-[13px] lg:text-[14px] 2xl:text-[15px] font-bold leading-relaxed" dir={info.ltr ? "ltr" : "rtl"}>{info.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:w-3/5 p-6 md:p-10 lg:p-10 2xl:p-14 bg-white relative flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {isSent ? (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="text-center py-10">
                      <div className="w-20 h-20 lg:w-24 lg:h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 lg:mb-8 shadow-inner border border-green-100 relative">
                        <CheckCircle2 className="w-10 h-10 lg:w-12 lg:h-12 text-green-500 relative z-10" />
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-black text-[#721F31] mb-4">استلمنا رسالتك بنجاح</h2>
                      <p className="text-gray-500 font-bold text-[13px] lg:text-[14px] 2xl:text-[15px] leading-relaxed mb-8 lg:mb-10 max-w-sm mx-auto">سيقوم الفريق المختص بمراجعة رسالتك والرد عليك في أقرب وقت ممكن.</p>
                      <button onClick={() => setIsSent(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 lg:px-8 py-3 lg:py-3.5 rounded-xl font-black text-[12px] lg:text-[13px] transition-all">
                        إرسال رسالة أخرى
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h2 className="text-2xl lg:text-3xl font-black text-[#721F31] mb-2">أرسل رسالتك</h2>
                      <p className="text-gray-500 font-medium text-[13px] lg:text-[14px] 2xl:text-[15px] mb-6 lg:mb-8 2xl:mb-10">دعنا نعرف كيف يمكننا مساعدتك ليتم تحويل رسالتك للقسم المختص.</p>
                      <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5 2xl:space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 2xl:gap-6">
                          <div>
                            <label className="block text-[12px] lg:text-[13px] font-bold text-gray-700 mb-1.5 lg:mb-2">الاسم الكامل <span className="text-[#721F31]">*</span></label>
                            <input required type="text" placeholder="الاسم الرباعي" className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-bold text-[13px] 2xl:text-[14px] py-2.5 lg:py-3 2xl:py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[12px] lg:text-[13px] font-bold text-gray-700 mb-1.5 lg:mb-2">رقم الهاتف <span className="text-[#721F31]">*</span></label>
                            <input required type="tel" dir="ltr" placeholder="+962 7X XXX XXXX" className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-bold text-[13px] 2xl:text-[14px] py-2.5 lg:py-3 2xl:py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all text-left" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[12px] lg:text-[13px] font-bold text-gray-700 mb-1.5 lg:mb-2">البريد الإلكتروني</label>
                          <input type="email" dir="ltr" placeholder="example@email.com" className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-bold text-[13px] 2xl:text-[14px] py-2.5 lg:py-3 2xl:py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all text-left" />
                        </div>
                        <div>
                          <label className="block text-[12px] lg:text-[13px] font-bold text-gray-700 mb-1.5 lg:mb-2">تصنيف الرسالة <span className="text-[#721F31]">*</span></label>
                          <div className="relative">
                            <select required className="w-full bg-gray-50 border border-gray-200 text-gray-700 font-bold text-[13px] 2xl:text-[14px] py-2.5 lg:py-3 2xl:py-3.5 pl-4 pr-10 rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all appearance-none">
                              <option value="" disabled selected hidden>اختر تصنيف الرسالة...</option>
                              <option value="1">استفسار عام</option>
                              <option value="2">الدعم الفني والتقني</option>
                              <option value="4">المقترحات والشكاوى</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                              <ChevronDown className="w-4 h-4 lg:w-5 lg:h-5" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[12px] lg:text-[13px] font-bold text-gray-700 mb-1.5 lg:mb-2">تفاصيل الرسالة <span className="text-[#721F31]">*</span></label>
                          <textarea required rows="3" placeholder="اكتب رسالتك هنا..." className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-bold text-[13px] 2xl:text-[14px] py-2.5 lg:py-3 2xl:py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all resize-none"></textarea>
                        </div>
                        <button type="submit" disabled={isSubmitting} className="w-full bg-[#721F31] hover:bg-[#521623] text-white rounded-xl font-black text-[14px] 2xl:text-[15px] py-3 lg:py-3.5 2xl:py-4 flex items-center justify-center gap-3 transition-all duration-300 group">
                          {isSubmitting ? "جاري الإرسال..." : <><Send className="w-4 h-4 lg:w-5 lg:h-5 rtl:-scale-x-100 transform group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" /> إرسال الرسالة</>}
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
              className="max-w-4xl mx-auto space-y-8 lg:space-y-10 2xl:space-y-12"
            >
              <div className="text-center mb-6 lg:mb-10 2xl:mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-3xl 2xl:text-4xl font-black text-[#721F31] mb-2 lg:mb-3">اختر مسارك لتنضم لقاعدة المواهب</h2>
                <p className="text-gray-500 font-medium text-sm lg:text-base 2xl:text-lg">أرسل سيرتك الذاتية وسيقوم فريقنا بالتواصل معك فور توفر فرصة تطابق شغفك.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {/* كرت أصحاب الخبرات */}
                <div className="bg-white p-6 lg:p-8 2xl:p-10 rounded-[2rem] 2xl:rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#721F31]/30 transition-all duration-500 group flex flex-col items-center text-center">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 2xl:w-20 2xl:h-20 bg-[#721F31]/5 rounded-2xl 2xl:rounded-3xl flex items-center justify-center mb-5 lg:mb-6 group-hover:bg-[#721F31] group-hover:-translate-y-2 transition-all duration-500">
                    <Briefcase className="w-7 h-7 lg:w-8 lg:h-8 2xl:w-10 2xl:h-10 text-[#721F31] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg lg:text-xl 2xl:text-2xl font-black text-gray-900 mb-3 2xl:mb-4">أصحاب الخبرات</h3>
                  <p className="text-gray-500 font-medium text-[13px] lg:text-sm 2xl:text-base leading-relaxed mb-6 2xl:mb-8 flex-grow">
                    أمتلك خبرة عملية سابقة وأبحث عن فرصة وظيفية (دوام كامل / جزئي) لإحداث نقلة نوعية في مسيرتي.
                  </p>
                  <button 
                    onClick={() => setModalType('job')}
                    className="w-full bg-gray-50 text-[#721F31] hover:bg-[#721F31] hover:text-white py-3 lg:py-3.5 2xl:py-4 rounded-xl font-black text-[13px] lg:text-sm 2xl:text-base transition-colors"
                  >
                    أرسل سيرتك الذاتية
                  </button>
                </div>

                {/* كرت التدريب */}
                <div className="bg-white p-6 lg:p-8 2xl:p-10 rounded-[2rem] 2xl:rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#C08F2D]/50 transition-all duration-500 group flex flex-col items-center text-center">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 2xl:w-20 2xl:h-20 bg-[#C08F2D]/10 rounded-2xl 2xl:rounded-3xl flex items-center justify-center mb-5 lg:mb-6 group-hover:bg-[#C08F2D] group-hover:-translate-y-2 transition-all duration-500">
                    <GraduationCap className="w-7 h-7 lg:w-8 lg:h-8 2xl:w-10 2xl:h-10 text-[#C08F2D] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg lg:text-xl 2xl:text-2xl font-black text-gray-900 mb-3 2xl:mb-4">برامج التدريب للشباب</h3>
                  <p className="text-gray-500 font-medium text-[13px] lg:text-sm 2xl:text-base leading-relaxed mb-6 2xl:mb-8 flex-grow">
                    أنا حديث التخرج أو طالب، وأبحث عن فرصة تدريب (Internship) لاكتساب مهارات عملية وبناء قدراتي.
                  </p>
                  <button 
                    onClick={() => setModalType('intern')}
                    className="w-full bg-gray-50 text-[#C08F2D] hover:bg-[#C08F2D] hover:text-white py-3 lg:py-3.5 2xl:py-4 rounded-xl font-black text-[13px] lg:text-sm 2xl:text-base transition-colors"
                  >
                    قدم كمتدرب
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <Footer onNavigate={onNavigate}/>

      {/* =========================================
          4. الـ Modal (نافذة إرسال الـ CV المنبثقة)
          ========================================= */}
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
              <div className="bg-white rounded-[2rem] p-6 lg:p-8 2xl:p-10 shadow-2xl relative overflow-hidden">
                <div className={`absolute top-0 right-0 left-0 h-2 ${modalType === 'job' ? 'bg-[#721F31]' : 'bg-[#C08F2D]'}`} />
                
                <button onClick={() => { setModalType(null); setIsSent(false); }} className="absolute top-5 left-5 lg:top-6 lg:left-6 w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full flex items-center justify-center transition-colors">
                  <X className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>

                <AnimatePresence mode="wait">
                  {isSent ? (
                    <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-6 lg:py-8">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-green-100">
                        <CheckCircle2 className="w-8 h-8 lg:w-10 lg:h-10 text-green-500" />
                      </div>
                      <h3 className="text-xl lg:text-2xl font-black text-gray-900 mb-2">تم استلام ملفك بنجاح!</h3>
                      <p className="text-[13px] lg:text-sm 2xl:text-base text-gray-500 font-medium">سنتواصل معك في حال توفر فرصة تطابق مهاراتك.</p>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="mb-6 lg:mb-8 mt-2">
                        <h3 className="text-xl lg:text-2xl font-black text-gray-900 mb-1 lg:mb-2">
                          {modalType === 'job' ? 'بوابة الوظائف والخبرات' : 'بوابة تدريب الشباب'}
                        </h3>
                        <p className="text-gray-500 font-medium text-xs lg:text-[13px] 2xl:text-sm">أرفق سيرتك الذاتية لتنضم لقاعدة بيانات المؤسسة.</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
                        <div>
                          <label className="block text-[12px] lg:text-[13px] font-bold text-gray-700 mb-1.5 lg:mb-2">الاسم الكامل <span className="text-[#721F31]">*</span></label>
                          <input required type="text" className="w-full bg-gray-50 border border-gray-200 py-2.5 lg:py-3 2xl:py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all font-bold text-[13px] lg:text-[14px]" />
                        </div>
                        <div>
                          <label className="block text-[12px] lg:text-[13px] font-bold text-gray-700 mb-1.5 lg:mb-2">مجال التخصص / الاهتمام <span className="text-[#721F31]">*</span></label>
                          <input required type="text" placeholder="مثال: تسويق، ريادة أعمال، تكنولوجيا" className="w-full bg-gray-50 border border-gray-200 py-2.5 lg:py-3 2xl:py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all font-bold text-[13px] lg:text-[14px]" />
                        </div>

                        <div>
                          <label className="block text-[12px] lg:text-[13px] font-bold text-gray-700 mb-1.5 lg:mb-2">السيرة الذاتية (CV) <span className="text-[#721F31]">*</span></label>
                          <label className="flex flex-col items-center justify-center w-full h-24 lg:h-28 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#C08F2D] hover:bg-gray-50 transition-all cursor-pointer group bg-white">
                            <div className="flex flex-col items-center justify-center">
                              <UploadCloud className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400 mb-1.5 lg:mb-2 group-hover:text-[#C08F2D] transition-colors" />
                              <p className="text-[11px] lg:text-xs 2xl:text-sm text-gray-500 font-bold group-hover:text-[#C08F2D] transition-colors">اضغط لإرفاق ملف (PDF)</p>
                            </div>
                            <input required type="file" className="hidden" accept=".pdf" />
                          </label>
                        </div>

                        <button type="submit" disabled={isSubmitting} className={`w-full text-white rounded-xl font-black text-[13px] lg:text-[14px] xl:text-[15px] py-3.5 xl:py-4 mt-2 lg:mt-4 flex items-center justify-center transition-all duration-300 ${modalType === 'job' ? 'bg-[#721F31] hover:bg-[#521623]' : 'bg-[#C08F2D] hover:bg-[#a67b25]'}`}>
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