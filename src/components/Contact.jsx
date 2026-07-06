// src/components/Contact.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import { 
  MapPin, Phone, Mail, Send, Clock, Building2, CheckCircle2, ChevronDown, 
  Briefcase, GraduationCap, UploadCloud, X
} from 'lucide-react';

export default function Contact() {
  const [activeTab, setActiveTab] = useState('contact'); // 'contact' | 'careers'
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  
  // 🟢 State لفتح وإغلاق الـ Modal ومعرفة نوع المسار المختار
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
      <div className="bg-[#1a070b] pt-32 md:pt-40 pb-28 md:pb-32 relative overflow-hidden rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-xl shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#721F31]/90 via-[#3b1019] to-[#1a070b]" />
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '300px' }}></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            نحن هنا لنصنع <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C08F2D] to-[#fcebb6]">الأثر معاً</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg md:text-xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
            سواء كنت تبحث عن إجابات لاستفساراتك، أو تطمح لتكون جزءاً من فريقنا لتمكين الشباب الأردني، أنت في المكان الصحيح.
          </motion.p>
        </div>
      </div>

      {/* =========================================
          2. التبويب الذكي
          ========================================= */}
      <div className="max-w-md mx-auto w-full px-6 -mt-8 relative z-30">
        <div className="bg-white p-1.5 rounded-full shadow-xl border border-gray-100 flex">
          <button 
            onClick={() => { setActiveTab('contact'); setIsSent(false); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-black text-sm md:text-base transition-all duration-300 ${activeTab === 'contact' ? 'bg-[#721F31] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Mail className="w-4 h-4 md:w-5 md:h-5" />
            تواصل معنا
          </button>
          <button 
            onClick={() => { setActiveTab('careers'); setIsSent(false); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-black text-sm md:text-base transition-all duration-300 ${activeTab === 'careers' ? 'bg-[#721F31] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Briefcase className="w-4 h-4 md:w-5 md:h-5" />
            انضم لفريقنا
          </button>
        </div>
      </div>

      {/* =========================================
          3. المحتوى المتغير
          ========================================= */}
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 mt-16 mb-24 relative z-20 flex-grow">
        <AnimatePresence mode="wait">
          
          {/* ================= TAB 1: تواصل معنا ================= */}
          {activeTab === 'contact' && (
            <motion.div 
              key="contact-tab"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
              className="bg-white rounded-[2.5rem] shadow-2xl shadow-[#721F31]/5 flex flex-col lg:flex-row overflow-hidden border border-gray-100 min-h-[650px]"
            >
              <div className="lg:w-2/5 relative bg-[#1a070b] p-10 md:p-14 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#721F31] to-[#3b1019]" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#C08F2D]/20 rounded-full blur-[60px]" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20">
                      <Building2 className="w-7 h-7 text-[#C08F2D]" />
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tight">المقر الرئيسي</h2>
                  </div>
                  
                  <div className="space-y-8">
                    {[
                      { icon: MapPin, title: 'العنوان', desc: 'عمان، مجمع الملك حسين للأعمال، مبنى رقم 3' },
                      { icon: Phone, title: 'الهاتف', desc: '+962 6 555 5555', ltr: true },
                      { icon: Mail, title: 'البريد الإلكتروني', desc: 'info@cpf.jo' },
                      { icon: Clock, title: 'ساعات العمل', desc: 'الأحد - الخميس (08:00 ص - 04:00 م)' }
                    ].map((info, idx) => (
                      <div key={idx} className="flex items-start gap-5 group cursor-default">
                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#C08F2D]/20 group-hover:border-[#C08F2D]/50 transition-all duration-300">
                          <info.icon className="w-5 h-5 text-white/90 group-hover:text-[#C08F2D]" />
                        </div>
                        <div className="pt-1">
                          <h3 className="font-bold text-[#C08F2D] text-[11px] uppercase tracking-widest mb-1.5">{info.title}</h3>
                          <p className="text-white text-[15px] font-bold leading-relaxed" dir={info.ltr ? "ltr" : "rtl"}>{info.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:w-3/5 p-8 md:p-14 bg-white relative flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {isSent ? (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="text-center py-10">
                      <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-green-100 relative">
                        <CheckCircle2 className="w-12 h-12 text-green-500 relative z-10" />
                      </div>
                      <h2 className="text-3xl font-black text-[#721F31] mb-4">استلمنا رسالتك بنجاح</h2>
                      <p className="text-gray-500 font-bold text-[15px] leading-relaxed mb-10 max-w-sm mx-auto">سيقوم الفريق المختص بمراجعة رسالتك والرد عليك في أقرب وقت ممكن.</p>
                      <button onClick={() => setIsSent(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3.5 rounded-xl font-black text-[13px] transition-all">
                        إرسال رسالة أخرى
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h2 className="text-3xl font-black text-[#721F31] mb-2">أرسل رسالتك</h2>
                      <p className="text-gray-500 font-medium text-[15px] mb-10">دعنا نعرف كيف يمكننا مساعدتك ليتم تحويل رسالتك للقسم المختص.</p>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[13px] font-bold text-gray-700 mb-2">الاسم الكامل <span className="text-[#721F31]">*</span></label>
                            <input required type="text" placeholder="الاسم الرباعي" className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-bold text-[14px] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[13px] font-bold text-gray-700 mb-2">رقم الهاتف <span className="text-[#721F31]">*</span></label>
                            <input required type="tel" dir="ltr" placeholder="+962 7X XXX XXXX" className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-bold text-[14px] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all text-left" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-gray-700 mb-2">البريد الإلكتروني</label>
                          <input type="email" dir="ltr" placeholder="example@email.com" className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-bold text-[14px] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all text-left" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-gray-700 mb-2">تصنيف الرسالة <span className="text-[#721F31]">*</span></label>
                          <div className="relative">
                            <select required className="w-full bg-gray-50 border border-gray-200 text-gray-700 font-bold text-[14px] py-3.5 pl-4 pr-10 rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all appearance-none">
                              <option value="" disabled selected hidden>اختر تصنيف الرسالة...</option>
                              <option value="1">استفسار عام</option>
                              <option value="2">الدعم الفني والتقني</option>
                              <option value="4">المقترحات والشكاوى</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                              <ChevronDown className="w-5 h-5" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-gray-700 mb-2">تفاصيل الرسالة <span className="text-[#721F31]">*</span></label>
                          <textarea required rows="4" placeholder="اكتب رسالتك هنا..." className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-bold text-[14px] py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all resize-none"></textarea>
                        </div>
                        <button type="submit" disabled={isSubmitting} className="w-full bg-[#721F31] hover:bg-[#521623] text-white rounded-xl font-black text-[15px] py-4 flex items-center justify-center gap-3 transition-all duration-300 group">
                          {isSubmitting ? "جاري الإرسال..." : <><Send className="w-5 h-5 rtl:-scale-x-100 transform group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" /> إرسال الرسالة</>}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ================= TAB 2: انضم لفريقنا (Talent Pool - Clean Layout) ================= */}
          {activeTab === 'careers' && (
            <motion.div 
              key="careers-tab"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto space-y-10"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-[#721F31] mb-3">اختر مسارك لتنضم لقاعدة المواهب</h2>
                <p className="text-gray-500 font-medium text-lg">أرسل سيرتك الذاتية وسيقوم فريقنا بالتواصل معك فور توفر فرصة تطابق شغفك.</p>
              </div>

              {/* 🟢 كروت الخيارات الضخمة والنظيفة */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* كرت أصحاب الخبرات */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#721F31]/30 transition-all duration-500 group flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-[#721F31]/5 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-[#721F31] group-hover:-translate-y-2 transition-all duration-500">
                    <Briefcase className="w-10 h-10 text-[#721F31] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">أصحاب الخبرات</h3>
                  <p className="text-gray-500 font-medium leading-relaxed mb-8 flex-grow">
                    أمتلك خبرة عملية سابقة وأبحث عن فرصة وظيفية (دوام كامل / جزئي) لإحداث نقلة نوعية في مسيرتي.
                  </p>
                  <button 
                    onClick={() => setModalType('job')}
                    className="w-full bg-gray-50 text-[#721F31] hover:bg-[#721F31] hover:text-white py-4 rounded-xl font-black transition-colors"
                  >
                    أرسل سيرتك الذاتية
                  </button>
                </div>

                {/* كرت التدريب */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#C08F2D]/50 transition-all duration-500 group flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-[#C08F2D]/10 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-[#C08F2D] group-hover:-translate-y-2 transition-all duration-500">
                    <GraduationCap className="w-10 h-10 text-[#C08F2D] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">برامج التدريب للشباب</h3>
                  <p className="text-gray-500 font-medium leading-relaxed mb-8 flex-grow">
                    أنا حديث التخرج أو طالب، وأبحث عن فرصة تدريب (Internship) لاكتساب مهارات عملية وبناء قدراتي.
                  </p>
                  <button 
                    onClick={() => setModalType('intern')}
                    className="w-full bg-gray-50 text-[#C08F2D] hover:bg-[#C08F2D] hover:text-white py-4 rounded-xl font-black transition-colors"
                  >
                    قدم كمتدرب
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <Footer onNavigate="{onNavigate}"/>

      {/* =========================================
          4. الـ Modal (نافذة إرسال الـ CV المنبثقة)
          ========================================= */}
      <AnimatePresence>
        {modalType && (
          <>
            {/* الخلفية الضبابية */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => { setModalType(null); setIsSent(false); }}
              className="fixed inset-0 bg-[#1a070b]/60 backdrop-blur-sm z-[100]"
            />
            
            {/* صندوق المودال */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-xl z-[101] px-4"
            >
              <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
                <div className={`absolute top-0 right-0 left-0 h-2 ${modalType === 'job' ? 'bg-[#721F31]' : 'bg-[#C08F2D]'}`} />
                
                {/* زر الإغلاق */}
                <button onClick={() => { setModalType(null); setIsSent(false); }} className="absolute top-6 left-6 w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full flex items-center justify-center transition-colors">
                  <X className="w-5 h-5" />
                </button>

                <AnimatePresence mode="wait">
                  {isSent ? (
                    <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-8">
                      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 mb-3">تم استلام ملفك بنجاح!</h3>
                      <p className="text-gray-500 font-medium">سنتواصل معك في حال توفر فرصة تطابق مهاراتك.</p>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="mb-8">
                        <h3 className="text-2xl font-black text-gray-900 mb-2">
                          {modalType === 'job' ? 'بوابة الوظائف والخبرات' : 'بوابة تدريب الشباب'}
                        </h3>
                        <p className="text-gray-500 font-medium text-sm">أرفق سيرتك الذاتية لتنضم لقاعدة بيانات المؤسسة.</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <label className="block text-[13px] font-bold text-gray-700 mb-2">الاسم الكامل <span className="text-[#721F31]">*</span></label>
                          <input required type="text" className="w-full bg-gray-50 border border-gray-200 py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all font-bold" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-gray-700 mb-2">مجال التخصص / الاهتمام <span className="text-[#721F31]">*</span></label>
                          <input required type="text" placeholder="مثال: تسويق، ريادة أعمال، تكنولوجيا" className="w-full bg-gray-50 border border-gray-200 py-3.5 px-4 rounded-xl focus:bg-white focus:border-[#C08F2D] outline-none transition-all font-bold" />
                        </div>

                        <div>
                          <label className="block text-[13px] font-bold text-gray-700 mb-2">السيرة الذاتية (CV) <span className="text-[#721F31]">*</span></label>
                          <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#C08F2D] hover:bg-gray-50 transition-all cursor-pointer group bg-white">
                            <div className="flex flex-col items-center justify-center">
                              <UploadCloud className="w-8 h-8 text-gray-400 mb-2 group-hover:text-[#C08F2D] transition-colors" />
                              <p className="text-sm text-gray-500 font-bold group-hover:text-[#C08F2D] transition-colors">اضغط لإرفاق ملف (PDF)</p>
                            </div>
                            <input required type="file" className="hidden" accept=".pdf" />
                          </label>
                        </div>

                        <button type="submit" disabled={isSubmitting} className={`w-full text-white rounded-xl font-black text-[15px] py-4 mt-4 flex items-center justify-center transition-all duration-300 ${modalType === 'job' ? 'bg-[#721F31] hover:bg-[#521623]' : 'bg-[#C08F2D] hover:bg-[#a67b25]'}`}>
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