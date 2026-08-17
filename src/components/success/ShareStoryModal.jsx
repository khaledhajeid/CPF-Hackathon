// src/components/success/ShareStoryModal.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, Upload, Sparkles, Image as ImageIcon, Link as LinkIcon, CheckCircle2 } from 'lucide-react';
import useEscapeKey from '../../hooks/useEscapeKey';

export default function ShareStoryModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fullName, setFullName] = useState('');

  useEscapeKey(onClose, isOpen);

  // إعدادات حركة التنقل بين الخطوات
  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 100 : -100, opacity: 0 })
  };
  const [direction, setDirection] = useState(1);

  const nextStep = () => { setDirection(1); setStep(step + 1); };
  const prevStep = () => { setDirection(-1); setStep(step - 1); };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // محاكاة إرسال البيانات
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (!isOpen) return null;

  const isMobileViewport = window.innerWidth < 768;

  return (
    <div className="fixed inset-0 z-[99999] flex items-end md:items-center justify-center px-0 sm:px-6 font-sans" dir="rtl">
      {/* خلفية التعتيم الزجاجية */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#1a0409]/60 backdrop-blur-md"
      />

      {/* المودال - ورقة منزلقة من الأسفل على الموبايل */}
      <motion.div
        initial={{ opacity: isMobileViewport ? 1 : 0, scale: isMobileViewport ? 1 : 0.95, y: isMobileViewport ? '100%' : 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: isMobileViewport ? 1 : 0, scale: isMobileViewport ? 1 : 0.95, y: isMobileViewport ? '100%' : 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: isMobileViewport ? 250 : 300 }}
        className="relative w-full max-w-2xl bg-white rounded-t-[2rem] md:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* زر الإغلاق */}
        {!isSuccess && (
          <button onClick={onClose} className="absolute top-6 left-6 z-20 w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors text-gray-500">
            <X className="w-5 h-5" />
          </button>
        )}

        {/* شريط التقدم العنابي */}
        {!isSuccess && (
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-100 z-20">
            <motion.div 
              className="h-full bg-[#8a1538]" 
              initial={{ width: '33%' }} animate={{ width: `${(step / 3) * 100}%` }} transition={{ duration: 0.3 }}
            />
          </div>
        )}

        <div className="p-8 md:p-12 overflow-y-auto flex-grow overflow-x-hidden relative">
          
          {isSuccess ? (
            /* =======================================
               حالة النجاح (الاحتفال)
               ======================================= */
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-10">
              <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12, delay: 0.2 }}
                className="w-24 h-24 bg-[#C08F2D]/10 rounded-full flex items-center justify-center mb-6"
              >
                <CheckCircle2 className="w-12 h-12 text-[#C08F2D]" />
              </motion.div>
              <h2 className="text-3xl font-black text-gray-900 mb-4">تم استلام قصتك بنجاح!</h2>
              <p className="text-gray-500 font-medium text-lg leading-relaxed mb-10 max-w-md mx-auto">
                شكراً لمشاركتك إلهامك معنا. سيقوم فريقنا بمراجعة القصة قريباً لتنشر وتُلهم شباب الأردن.
              </p>
              <button onClick={onClose} className="bg-gray-900 hover:bg-black text-white px-10 py-4 rounded-xl font-bold transition-all">
                العودة للقصص
              </button>
            </motion.div>
          ) : (
            /* =======================================
               نموذج إدخال القصة
               ======================================= */
            <AnimatePresence custom={direction} mode="wait">
              <motion.div key={step} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}>
                
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="mb-8">
                      <Sparkles className="w-8 h-8 text-[#C08F2D] mb-4" />
                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">من أنت؟ وكيف بدأ الأثر؟</h2>
                      <p className="text-gray-500 font-medium text-sm">أخبرنا عنك، وأي من برامجنا كانت نقطة الانطلاق.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">الاسم الكامل <span className="text-[#8a1538]">*</span></label>
                      <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="مثال: عبدالله مفلح" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:bg-white focus:border-[#8a1538] focus:ring-2 focus:ring-[#8a1538]/20 outline-none transition-all font-bold text-gray-800" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">البرنامج أو المبادرة</label>
                      <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:bg-white focus:border-[#8a1538] focus:ring-2 focus:ring-[#8a1538]/20 outline-none transition-all font-bold text-gray-800">
                        <option value="">اختر المبادرة...</option>
                        <option value="42">42 عمّان و42 إربد</option>
                        <option value="htu">جامعة الحسين التقنية</option>
                        <option value="nahno">منصة نحن</option>
                        <option value="makerspace">مساحة الصنّاع</option>
                        <option value="other">مبادرة أخرى</option>
                      </select>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="mb-8">
                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">حبكة القصة 📖</h2>
                      <p className="text-gray-500 font-medium text-sm">القصص العظيمة تُبنى على التحديات وكيفية التغلب عليها.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">عنوان لقصتك (اختياري)</label>
                      <input type="text" placeholder="مثال: من الصفر إلى هندسة البرمجيات" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:bg-white focus:border-[#8a1538] focus:ring-2 focus:ring-[#8a1538]/20 outline-none transition-all font-bold text-gray-800" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">شاركنا تجربتك</label>
                      <textarea rows={5} placeholder="ما هو التحدي الذي واجهته؟ وكيف ساهمت المبادرة في تغيير مسارك؟" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:bg-white focus:border-[#8a1538] focus:ring-2 focus:ring-[#8a1538]/20 outline-none transition-all font-medium text-gray-800 resize-none leading-relaxed" />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="mb-8">
                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">الصورة تكمل القصة 📸</h2>
                      <p className="text-gray-500 font-medium text-sm">القصص المصورة أو الفيديوهات تحظى بتفاعل أكبر بكثير.</p>
                    </div>
                    
                    {/* خيارات الرفع الشبابية */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border-2 border-dashed border-gray-200 hover:border-[#8a1538] bg-gray-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:bg-[#8a1538]/10 transition-colors">
                          <ImageIcon className="w-5 h-5 text-gray-500 group-hover:text-[#8a1538]" />
                        </div>
                        <span className="font-bold text-gray-700 text-sm mb-1">رفع صورة شخصية</span>
                        <span className="text-[11px] text-gray-500">JPG, PNG (Max 5MB)</span>
                      </div>
                      
                      <div className="border border-gray-200 bg-white rounded-2xl p-6 flex flex-col justify-center gap-3">
                        <div className="flex items-center gap-3 text-[#721F31] font-bold text-sm">
                          <LinkIcon className="w-4 h-4" /> رابط فيديو / Social Media
                        </div>
                        <input type="text" placeholder="رابط TikTok، Reels، أو LinkedIn..." className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-[#8a1538] outline-none" dir="ltr" />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}

        </div>

        {/* أزرار التحكم السفلية */}
        {!isSuccess && (
          <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between mt-auto">
            {step > 1 ? (
              <button onClick={prevStep} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold px-4 py-2 transition-colors">
                <ArrowRight className="w-4 h-4" /> السابق
              </button>
            ) : (
              <div /> // عنصر فارغ للحفاظ على التخطيط
            )}
            
            {step < 3 ? (
              <button onClick={nextStep} disabled={step === 1 && !fullName.trim()} className="flex items-center gap-2 bg-[#8a1538] hover:bg-[#680f2a] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#8a1538]">
                التالي <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={isSubmitting} className="flex items-center gap-2 bg-[#C08F2D] hover:bg-[#a67b25] text-[#1a0409] px-8 py-3.5 rounded-xl font-black transition-all shadow-md active:scale-95 disabled:opacity-70 disabled:scale-100">
                {isSubmitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                ) : (
                  <>إرسال القصة <Upload className="w-4 h-4" /></>
                )}
              </button>
            )}
          </div>
        )}

      </motion.div>
    </div>
  );
}