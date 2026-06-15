// src/components/Contact.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';

// 🟢 شلنا أيقونات السوشيال ميديا من هون عشان ما تضرب المكتبة
import { MapPin, Phone, Mail, Send, Clock, Building2, CheckCircle2, ChevronDown } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F4F7FA] font-sans selection:bg-[#C08F2D] selection:text-white flex flex-col" dir="rtl">
      
      {/* =========================================
          1. الهيدر الفخم (نظيف ومباشر ومضبوط للموبايل)
          ========================================= */}
      <div className="bg-[#1a0409] h-[340px] md:h-[400px] pt-28 md:pt-36 pb-16 md:pb-20 relative overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem] shadow-md shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8a1538]/90 to-[#1a0409]" />
        
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-overlay">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="cpf-contact-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M0 60 Q 30 30 60 60 T 120 60 M60 0 Q 90 30 60 60 T 60 120" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
              <path d="M-60 60 Q -30 30 0 60 T 60 60 M0 0 Q 30 30 0 60 T 0 120" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#cpf-contact-pattern)"></rect>
          </svg>
        </div>

        <div className="absolute top-0 right-1/4 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-[#C08F2D]/15 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black text-white mb-2 md:mb-4 tracking-tight leading-tight w-full">
              نقف بجانب <span className="text-[#C08F2D]">طموحك</span>
            </h1>
          </div>
          <div className="w-full md:w-1/2 md:border-r-2 md:border-[#C08F2D]/30 md:pr-8">
            <p className="text-[14px] md:text-[16px] text-white/90 font-bold leading-[1.8em] md:leading-[2em] max-w-lg">
              نسعد بتواصلك معنا للإجابة عن استفساراتك أو لبحث فرص التعاون التي تخدم وتنمي مهارات الشباب الأردني
            </p>
          </div>
        </div>
      </div>

      {/* =========================================
          2. الكرت المدمج (Premium Split Card)
          ========================================= */}
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-24 relative z-20 mb-24 flex-grow">
        <div className="bg-white rounded-2xl md:rounded-[2.5rem] shadow-2xl shadow-[#8a1538]/10 flex flex-col lg:flex-row overflow-hidden border border-gray-100 min-h-[650px]">
          
          {/* القسم الأيمن: معلومات التواصل */}
          <div className="lg:w-2/5 relative bg-[#1a0409] p-8 md:p-14 flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#8a1538] to-[#4d0b1f]" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#C08F2D]/20 rounded-full blur-[60px]" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8 md:mb-12">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <Building2 className="w-5 h-5 md:w-6 md:h-6 text-[#C08F2D]" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">المقر الرئيسي</h2>
              </div>
              
              <div className="space-y-6 md:space-y-10">
                <div className="flex items-start gap-4 md:gap-5 group cursor-default">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#C08F2D]/20 group-hover:border-[#C08F2D]/50 transition-all duration-300">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-white/90 group-hover:text-[#C08F2D]" />
                  </div>
                  <div className="pt-0.5 md:pt-1">
                    <h3 className="font-bold text-white/50 text-[10px] md:text-[11px] uppercase tracking-widest mb-1 md:mb-1.5">العنوان</h3>
                    <p className="text-white text-[13px] md:text-[15px] font-bold leading-relaxed">عمان، مجمع الملك حسين للأعمال<br/>مبنى رقم 3</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 md:gap-5 group cursor-default">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#C08F2D]/20 group-hover:border-[#C08F2D]/50 transition-all duration-300">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-white/90 group-hover:text-[#C08F2D]" />
                  </div>
                  <div className="pt-0.5 md:pt-1">
                    <h3 className="font-bold text-white/50 text-[10px] md:text-[11px] uppercase tracking-widest mb-1 md:mb-1.5">الهاتف</h3>
                    <p className="text-white text-[13px] md:text-[15px] font-bold tracking-wider" dir="ltr">+962 6 555 5555</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 md:gap-5 group cursor-default">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#C08F2D]/20 group-hover:border-[#C08F2D]/50 transition-all duration-300">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-white/90 group-hover:text-[#C08F2D]" />
                  </div>
                  <div className="pt-0.5 md:pt-1">
                    <h3 className="font-bold text-white/50 text-[10px] md:text-[11px] uppercase tracking-widest mb-1 md:mb-1.5">البريد الإلكتروني</h3>
                    <p className="text-white text-[13px] md:text-[15px] font-bold">info@cpf.jo</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 md:gap-5 group cursor-default">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#C08F2D]/20 group-hover:border-[#C08F2D]/50 transition-all duration-300">
                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-white/90 group-hover:text-[#C08F2D]" />
                  </div>
                  <div className="pt-0.5 md:pt-1">
                    <h3 className="font-bold text-white/50 text-[10px] md:text-[11px] uppercase tracking-widest mb-1 md:mb-1.5">ساعات العمل</h3>
                    <p className="text-white text-[13px] md:text-[15px] font-bold leading-relaxed">الأحد - الخميس<br/>08:00 صباحاً - 04:00 مساءً</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-10 md:mt-16 pt-6 md:pt-8 border-t border-white/10 flex justify-between items-center">
               <p className="text-[10px] md:text-[11px] font-bold text-white/40 uppercase tracking-widest">مؤسسة ولي العهد © 2026</p>
               <img src="/The-Star.png" alt="النجمة" className="w-6 h-6 md:w-8 md:h-8 object-contain drop-shadow-md" />
            </div>
          </div>

          {/* القسم الأيسر: نموذج التواصل المفلتر */}
          <div className="lg:w-3/5 p-6 sm:p-10 md:p-14 bg-white relative flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {isSent ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center text-center py-10"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 md:mb-8 shadow-inner border border-green-100 relative">
                    <div className="absolute inset-0 rounded-full border-4 border-green-100 animate-ping opacity-50" />
                    <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-green-500 relative z-10" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 md:mb-4 tracking-tight">استلمنا رسالتك بنجاح</h2>
                  <p className="text-gray-500 font-bold text-[13px] md:text-[15px] leading-relaxed mb-8 md:mb-10 max-w-sm">
                    شكراً لتواصلك معنا سيقوم الفريق المختص بمراجعة رسالتك والرد عليك في أقرب وقت
                  </p>
                  <button 
                    onClick={() => setIsSent(false)}
                    className="bg-[#F8FAFC] hover:bg-gray-100 border border-gray-200 text-gray-700 px-6 md:px-8 py-3 md:py-3.5 rounded-xl font-black text-[12px] md:text-[13px] transition-all shadow-sm cursor-pointer"
                  >
                    إرسال رسالة أخرى
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 tracking-tight">أرسل رسالتك</h2>
                  <p className="text-gray-500 font-bold text-[13px] md:text-[14px] mb-8 md:mb-10">دعنا نعرف كيف يمكننا مساعدتك ليتم تحويل رسالتك للفريق المختص</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                      <div>
                        <label className="block text-[12px] md:text-[13px] font-black text-gray-900 mb-2">الاسم الكامل</label>
                        <input 
                          type="text" 
                          required
                          placeholder="أدخل اسمك من 4 مقاطع"
                          className="w-full bg-[#F8FAFC] border border-gray-200 text-gray-900 font-bold text-[13px] md:text-[14px] py-3.5 px-4 rounded-xl hover:bg-gray-50 focus:bg-white focus:border-[#8a1538] focus:ring-2 focus:ring-[#8a1538]/20 outline-none transition-all placeholder:font-bold placeholder:text-[12px] md:placeholder:text-[13px] placeholder:text-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] md:text-[13px] font-black text-gray-900 mb-2">رقم الهاتف</label>
                        <input 
                          type="tel" 
                          required
                          dir="rtl"
                          placeholder="07X XXX XXXX"
                          className="w-full bg-[#F8FAFC] border border-gray-200 text-gray-900 font-bold text-[13px] md:text-[14px] py-3.5 px-4 rounded-xl hover:bg-gray-50 focus:bg-white focus:border-[#8a1538] focus:ring-2 focus:ring-[#8a1538]/20 outline-none transition-all placeholder:font-bold placeholder:text-[12px] md:placeholder:text-[13px] placeholder:text-gray-300 text-right"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[12px] md:text-[13px] font-black text-gray-900 mb-2">البريد الإلكتروني</label>
                      <input 
                        type="email" 
                        required
                        dir="ltr"
                        placeholder="example@email.com"
                        className="w-full bg-[#F8FAFC] border border-gray-200 text-gray-900 font-bold text-[13px] md:text-[14px] py-3.5 px-4 rounded-xl hover:bg-gray-50 focus:bg-white focus:border-[#8a1538] focus:ring-2 focus:ring-[#8a1538]/20 outline-none transition-all placeholder:font-bold placeholder:text-[12px] md:placeholder:text-[13px] placeholder:text-gray-300 text-left"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] md:text-[13px] font-black text-gray-900 mb-2">تصنيف الرسالة</label>
                      <div className="relative">
                        <select required className="w-full bg-[#F8FAFC] border border-gray-200 text-gray-900 font-bold text-[13px] md:text-[14px] py-3.5 pl-4 pr-10 rounded-xl hover:bg-gray-50 focus:bg-white focus:border-[#8a1538] focus:ring-2 focus:ring-[#8a1538]/20 outline-none transition-all appearance-none cursor-pointer">
                          <option value="" disabled selected hidden>اختر تصنيف الرسالة</option>
                          <option value="1">استفسار عن البرامج والمبادرات</option>
                          <option value="2">الدعم الفني والتقني</option>
                          <option value="3">بناء الشراكات والتعاون المؤسسي</option>
                          <option value="4">المقترحات والشكاوى</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#8a1538]">
                          <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[12px] md:text-[13px] font-black text-gray-900 mb-2">تفاصيل الرسالة</label>
                      <textarea 
                        required
                        rows="4"
                        placeholder="اكتب رسالتك هنا..."
                        className="w-full bg-[#F8FAFC] border border-gray-200 text-gray-900 font-bold text-[13px] md:text-[14px] py-3.5 px-4 rounded-xl hover:bg-gray-50 focus:bg-white focus:border-[#8a1538] focus:ring-2 focus:ring-[#8a1538]/20 outline-none transition-all placeholder:font-bold placeholder:text-[12px] md:placeholder:text-[13px] placeholder:text-gray-300 resize-none"
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full relative overflow-hidden group bg-[#8a1538] hover:bg-[#680f2a] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-black text-[14px] md:text-[15px] py-3.5 md:py-4 flex items-center justify-center gap-3 transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
                      >
                        {isSubmitting ? (
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                        ) : (
                          <>
                            <span>إرسال الرسالة</span>
                            <Send className="w-4 h-4 rtl:-scale-x-100 transform group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* =========================================
          3. الفوتر
          ========================================= */}
      <Footer />

    </div>
  );
}