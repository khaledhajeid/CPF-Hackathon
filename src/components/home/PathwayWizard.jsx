// src/components/home/PathwayWizard.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Compass, Target, HeartHandshake, Briefcase, MapPin, Laptop, ShieldCheck, Users, Code2, Megaphone } from 'lucide-react';

export default function PathwayWizard({ onClose, onComplete }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ q1_passion: '', q2_style: '', location: '' });
  const [isGenerating, setIsGenerating] = useState(false);

  // 🟢 السؤال الأول: استكشاف الشغف
  const question1Options = [
    { 
      id: 'المشاركة الاقتصادية', 
      title: 'التكنولوجيا، البرمجة، وريادة الأعمال', 
      desc: 'أحب التعامل مع الأنظمة، التكنولوجيا، وبناء أفكار يمكن تحويلها لمشاريع.', 
      icon: Code2 
    },
    { 
      id: 'القيادة', 
      title: 'تطوير الذات، التأثير، وصناعة القرار', 
      desc: 'أحب تطوير مهاراتي الشخصية، التخطيط، وتوجيه الآخرين نحو هدف مشترك.', 
      icon: Target 
    },
    { 
      id: 'التنمية المجتمعية', 
      title: 'التطوع، العمل الإنساني، وخدمة المجتمع', 
      desc: 'أشعر بالرضا عندما أساعد الآخرين وأكون سبباً في تغيير حياتهم للأفضل.', 
      icon: HeartHandshake 
    }
  ];

  // 🟢 السؤال الثاني: بيئة العمل المفضلة
  const question2Options = [
    { 
      id: 'المشاركة الاقتصادية', 
      title: 'من خلال بناء وتأسيس المشاريع', 
      desc: 'أفضل الجلوس على جهازي أو في المختبر لبناء منتج أو تطبيق يحل مشكلة معينة.', 
      icon: Laptop 
    },
    { 
      id: 'القيادة', 
      title: 'من خلال قيادة النقاشات والفرق', 
      desc: 'أجد نفسي في التحدث أمام الجمهور، إدارة الحوارات، وقيادة فرق العمل.', 
      icon: Megaphone 
    },
    { 
      id: 'التنمية المجتمعية', 
      title: 'من خلال التواجد في الميدان', 
      desc: 'أفضل النزول للميدان والتواصل المباشر مع الناس لتلبية احتياجاتهم الفورية.', 
      icon: Users 
    }
  ];

  // السؤال الثالث: الموقع
  const locations = [
    { id: 'عمان', label: 'إقليم الوسط (عمان، البلقاء..)', icon: MapPin },
    { id: 'إربد', label: 'إقليم الشمال (إربد، عجلون..)', icon: MapPin },
    { id: 'العقبة', label: 'إقليم الجنوب (العقبة، الكرك..)', icon: MapPin },
    { id: 'أونلاين', label: 'برامج عن بُعد (أونلاين)', icon: Laptop }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setStep(4);
    }, 2000);
  };

  // 🟢 تحديد التوصيات بناءً على الإجابات
  const primaryRecommendation = answers.q1_passion;
  const secondaryRecommendation = answers.q2_style !== answers.q1_passion ? answers.q2_style : 'البرامج الشاملة';

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      y: window.innerWidth < 768 ? '100%' : 20, 
      scale: window.innerWidth < 768 ? 1 : 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { type: 'spring', damping: 25, stiffness: window.innerWidth < 768 ? 250 : 300 } 
    },
    exit: { 
      opacity: 0, 
      y: window.innerWidth < 768 ? '100%' : 20, 
      scale: window.innerWidth < 768 ? 1 : 0.95,
      transition: { duration: 0.2 } 
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-end md:items-center justify-center p-0 md:p-6 font-sans min-h-[100dvh]" dir="rtl">
      
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#1a0409]/80 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      <motion.div 
        variants={modalVariants}
        initial="hidden" animate="visible" exit="exit"
        className="relative bg-white shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col 
                   h-[85vh] md:h-auto md:min-h-[520px] rounded-t-[2rem] md:rounded-xl border-t border-gray-100 md:border mt-auto md:mt-0"
      >
        <div className="md:hidden w-full flex justify-center pt-3 pb-1 shrink-0 bg-white">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        <div className="h-1 md:h-1.5 w-full bg-gray-100 flex shrink-0">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#8a1538] to-[#C08F2D]"
            initial={{ width: '25%' }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>

        <button onClick={onClose} className="absolute top-8 right-6 md:top-5 md:left-5 md:right-auto z-20 text-gray-400 hover:text-[#8a1538] bg-gray-50 hover:bg-[#8a1538]/10 p-2 rounded-full md:rounded-lg transition-colors cursor-pointer">
          <X className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        <div className="p-6 md:p-8 sm:p-10 flex-1 flex flex-col relative overflow-y-auto scrollbar-hide pb-20 md:pb-10">
          
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
             <img src="/CPF-Logo.png" alt="" className="w-48 h-48 md:w-64 md:h-64 object-contain grayscale" />
          </div>

          <AnimatePresence mode="wait">
            
            {/* الخطوة 1: استكشاف الشغف */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex-1 flex flex-col relative z-10">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <Compass className="w-4 h-4 md:w-5 md:h-5 text-[#C08F2D]" />
                  <span className="text-[#C08F2D] font-bold text-[10px] md:text-xs tracking-widest uppercase">السؤال الأول من 3</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 md:mb-3">أين تجد شغفك؟</h2>
                <p className="text-gray-500 font-medium text-[13px] md:text-base mb-6 md:mb-8">لا تفكر كثيراً، اختر العبارة التي تعبر عن اهتماماتك بشكل أكبر.</p>
                
                <div className="space-y-3 md:space-y-4 flex-1">
                  {question1Options.map(option => {
                    const isSelected = answers.q1_passion === option.id;
                    return (
                      <button 
                        key={option.id}
                        onClick={() => { setAnswers({...answers, q1_passion: option.id}); setStep(2); }}
                        className={`w-full text-right p-4 md:p-5 rounded-xl border-2 transition-all flex items-start gap-3 md:gap-4 group cursor-pointer
                          ${isSelected ? 'border-[#8a1538] bg-[#8a1538]/5 shadow-sm' : 'border-gray-100 hover:border-[#C08F2D]/50 hover:bg-gray-50'}`}
                      >
                        <div className={`p-2.5 md:p-3 rounded-lg transition-colors shrink-0 ${isSelected ? 'bg-[#8a1538] text-white' : 'bg-gray-100 text-gray-400 group-hover:text-[#C08F2D]'}`}>
                          <option.icon className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <div>
                          <h3 className={`text-[14px] md:text-lg font-black mb-1 transition-colors ${isSelected ? 'text-[#8a1538]' : 'text-gray-900 group-hover:text-[#1a1c1d]'}`}>{option.title}</h3>
                          <p className="text-gray-500 font-medium text-[12px] md:text-sm leading-relaxed">{option.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* الخطوة 2: أسلوب العمل */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex-1 flex flex-col relative z-10">
                <div className="mb-2">
                  <span className="text-[#C08F2D] font-bold text-[10px] md:text-xs tracking-widest uppercase">السؤال الثاني من 3</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 md:mb-3">كيف تفضل أن تترك أثراً؟</h2>
                <p className="text-gray-500 font-medium text-[13px] md:text-base mb-6 md:mb-8">اختر الطريقة التي تفضلها للعمل والمساهمة في بناء مجتمعك.</p>
                
                <div className="space-y-3 md:space-y-4 flex-1">
                  {question2Options.map(option => {
                    const isSelected = answers.q2_style === option.id;
                    return (
                      <button 
                        key={option.id}
                        onClick={() => { setAnswers({...answers, q2_style: option.id}); setStep(3); }}
                        className={`w-full text-right p-4 md:p-5 rounded-xl border-2 transition-all flex items-start gap-3 md:gap-4 group cursor-pointer
                          ${isSelected ? 'border-[#8a1538] bg-[#8a1538]/5 shadow-sm' : 'border-gray-100 hover:border-[#C08F2D]/50 hover:bg-gray-50'}`}
                      >
                        <div className={`p-2.5 md:p-3 rounded-lg transition-colors shrink-0 ${isSelected ? 'bg-[#8a1538] text-white' : 'bg-gray-100 text-gray-400 group-hover:text-[#C08F2D]'}`}>
                          <option.icon className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <div>
                          <h3 className={`text-[14px] md:text-lg font-black mb-1 transition-colors ${isSelected ? 'text-[#8a1538]' : 'text-gray-900 group-hover:text-[#1a1c1d]'}`}>{option.title}</h3>
                          <p className="text-gray-500 font-medium text-[12px] md:text-sm leading-relaxed">{option.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* الخطوة 3: الموقع الجغرافي */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex-1 flex flex-col relative z-10">
                <div className="mb-2">
                  <span className="text-[#C08F2D] font-bold text-[10px] md:text-xs tracking-widest uppercase">السؤال الأخير</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 md:mb-3">أين تتواجد حالياً؟</h2>
                <p className="text-gray-500 font-medium text-[13px] md:text-base mb-6 md:mb-8">لنتمكن من اقتراح الفرص والبرامج المتاحة في منطقتك الجغرافية.</p>
                
                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8 flex-1">
                  {locations.map(loc => {
                    const isSelected = answers.location === loc.id;
                    return (
                      <button 
                        key={loc.id}
                        onClick={() => setAnswers({...answers, location: loc.id})}
                        className={`p-4 md:p-5 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 md:gap-3 text-center cursor-pointer ${
                          isSelected 
                            ? 'border-[#8a1538] bg-[#8a1538]/5 text-[#8a1538]' 
                            : 'border-gray-100 hover:border-[#C08F2D] hover:bg-gray-50 text-gray-600'
                        }`}
                      >
                        <loc.icon className={`w-6 h-6 md:w-8 md:h-8 ${isSelected ? 'text-[#8a1538]' : 'text-gray-400'}`} />
                        <span className="font-bold text-[12px] md:text-base leading-tight">{loc.label}</span>
                      </button>
                    );
                  })}
                </div>

                <button 
                  onClick={handleGenerate} 
                  disabled={!answers.location || isGenerating}
                  className="w-full bg-[#8a1538] disabled:bg-gray-200 disabled:text-gray-400 text-white py-3.5 md:py-4 rounded-xl font-black text-[13px] md:text-base flex items-center justify-center gap-2 hover:bg-[#680f2a] transition-colors shadow-md cursor-pointer mt-auto"
                >
                  {isGenerating ? (
                    <>جاري تحليل إجاباتك وبناء مسارك <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div></>
                  ) : 'عرض النتيجة'}
                </button>
              </motion.div>
            )}

            {/* الخطوة 4: النتيجة والتوجيه */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col justify-center items-center text-center py-0 md:py-2 relative z-10">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#C08F2D]/10 border-2 border-[#C08F2D] rounded-full flex items-center justify-center mb-4 md:mb-6 relative shrink-0">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                    <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-[#C08F2D]" />
                  </motion.div>
                </div>
                
                <span className="text-[#8a1538] font-bold text-[10px] md:text-xs tracking-widest uppercase mb-1 md:mb-2">اكتمل التوجيه بنجاح</span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 md:mb-8">هذه المسارات هي الأنسب لك</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-6 md:mb-8 text-right flex-1 content-start">
                  
                  {/* التوصية الأساسية (بناءً على السؤال الأول) */}
                  <div className="bg-white border-2 border-[#8a1538] rounded-xl p-4 md:p-5 relative shadow-sm">
                    <div className="absolute -top-3 right-4 md:right-5 bg-[#8a1538] text-white text-[9px] md:text-[10px] font-black px-2 md:px-3 py-1 rounded-md shadow-sm">توصيتنا الأساسية</div>
                    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4 mt-2">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#8a1538]/10 rounded-lg flex items-center justify-center shrink-0 text-[#8a1538]">
                        <Compass className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <div>
                        <h4 className="font-black text-gray-900 text-[13px] md:text-sm leading-tight mb-1">{primaryRecommendation}</h4>
                        <span className="text-[11px] md:text-xs text-gray-500 font-bold flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {answers.location === 'أونلاين' ? 'عن بُعد' : answers.location}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => { onClose(); onComplete({ location: answers.location === 'أونلاين' ? 'الكل' : answers.location, pathway: primaryRecommendation }); }} 
                      className="w-full bg-[#8a1538] text-white py-2.5 rounded-lg text-[11px] md:text-xs font-black hover:bg-[#680f2a] transition-colors cursor-pointer"
                    >
                      استكشاف الفرص والمبادرات
                    </button>
                  </div>

                  {/* التوصية المكملة (بناءً على السؤال الثاني) */}
                  <div className="bg-white border-2 border-[#C08F2D]/50 rounded-xl p-4 md:p-5 relative hover:border-[#C08F2D] transition-colors shadow-sm">
                    <div className="absolute -top-3 right-4 md:right-5 bg-[#C08F2D] text-[#1a1c1d] text-[9px] md:text-[10px] font-black px-2 md:px-3 py-1 rounded-md shadow-sm">خيار إضافي يناسبك</div>
                    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4 mt-2">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#C08F2D]/10 rounded-lg flex items-center justify-center shrink-0 text-[#C08F2D]">
                        <Briefcase className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <div>
                        <h4 className="font-black text-gray-900 text-[13px] md:text-sm leading-tight mb-1">{secondaryRecommendation}</h4>
                        <span className="text-[11px] md:text-xs text-gray-500 font-bold flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> كافة المحافظات
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => { onClose(); onComplete({ location: 'الكل', pathway: secondaryRecommendation === 'البرامج الشاملة' ? 'الكل' : secondaryRecommendation }); }} 
                      className="w-full bg-white border border-[#C08F2D] text-[#C08F2D] py-2.5 rounded-lg text-[11px] md:text-xs font-black hover:bg-[#C08F2D] hover:text-white transition-colors cursor-pointer"
                    >
                      استكشاف الفرص والمبادرات
                    </button>
                  </div>

                </div>

                <button 
                  onClick={() => { onClose(); onComplete({ location: 'الكل', pathway: 'الكل' }); }} 
                  className="text-gray-400 hover:text-[#8a1538] text-[12px] md:text-sm font-bold underline decoration-gray-300 underline-offset-4 transition-colors cursor-pointer mt-auto pb-4 md:pb-0"
                >
                  تخطي واستكشاف جميع البرامج
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}