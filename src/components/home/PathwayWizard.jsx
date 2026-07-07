// src/components/home/PathwayWizard.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Compass, Target, HeartHandshake, Briefcase, MapPin, Laptop, ShieldCheck, Users, Code2, Megaphone, Clock, Calendar, GraduationCap, User, ArrowLeft, BookOpen } from 'lucide-react';

export default function PathwayWizard({ onClose, onComplete }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ 
    q1_passion: '', 
    q2_learningStyle: '', 
    q3_commitment: '', 
    q4_stage: '',
    location: '' 
  });
  const [isGenerating, setIsGenerating] = useState(false);

  // 🟢 س1: الشغف (محدث ليعكس المسارات الثلاثة الجديدة)
  const question1Options = [
    { id: 'تعلّم', title: 'التكنولوجيا، البرمجة، والابتكار', desc: 'أحب بناء المشاريع والتعامل مع التقنيات الحديثة.', icon: BookOpen },
    { id: 'قُد', title: 'القيادة، التأثير، وصناعة القرار', desc: 'أطمح لتطوير شخصيتي القيادية وتوجيه فرق العمل.', icon: Target },
    { id: 'اصنع الأثر', title: 'التطوع، وخدمة المجتمع', desc: 'أشعر بالرضا عندما أساعد الآخرين في الميدان.', icon: HeartHandshake }
  ];

  // س2: أسلوب التعلم
  const question2Options = [
    { id: 'عملي', title: 'التطبيق العملي والمختبرات', desc: 'أتعلم بشكل أفضل عندما أطبق بيدي (ورش عمل، مصانع، حواسيب).', icon: Laptop },
    { id: 'تفاعلي', title: 'الحوار والنقاش الجماعي', desc: 'أفضل الجلسات الحوارية وتبادل الأفكار مع الخبراء والمسؤولين.', icon: Megaphone },
    { id: 'ميداني', title: 'النزول للميدان', desc: 'أتعلم من خلال الاحتكاك المباشر مع الناس والمجتمع المحلي.', icon: Users }
  ];

  // س3: الالتزام (السؤال الجوهري)
  const question3Options = [
    { id: 'طويل', title: 'التزام طويل يبني مسيرتي', desc: 'أنا مستعد للالتزام لعدة أشهر أو التسجيل في برنامج لبناء مهارة من الصفر.', icon: Calendar },
    { id: 'قصير', title: 'فرص سريعة لتطوير مهاراتي', desc: 'وقتي ضيق حالياً، أبحث عن ورش تدريبية مكثفة لأيام أو فعاليات سريعة.', icon: Clock }
  ];

  // س4: المرحلة
  const question4Options = [
    { id: 'مدرسة', title: 'طالب مدرسة', icon: User },
    { id: 'جامعة', title: 'طالب جامعي / حديث التخرج', icon: GraduationCap },
    { id: 'خبرة', title: 'أمتلك خبرة عملية سابقة', icon: Briefcase }
  ];

  // س5: الموقع
  const locations = [
    { id: 'عمان', label: 'إقليم الوسط (عمان، البلقاء..)', icon: MapPin },
    { id: 'إربد', label: 'إقليم الشمال (إربد، عجلون..)', icon: MapPin },
    { id: 'العقبة', label: 'إقليم الجنوب (العقبة، الكرك..)', icon: MapPin },
    { id: 'أونلاين', label: 'عن بُعد (أونلاين)', icon: Laptop }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setStep(6);
    }, 2500);
  };

  // 🟢 اللوجيك الدقيق محدث للمسارات والبرامج الحالية
  const getSmartResult = () => {
    const { q1_passion, q3_commitment, q4_stage, location } = answers;

    if (q3_commitment === 'طويل') {
      let programName = 'جامعة الحسين التقنية';
      
      if (q1_passion === 'تعلّم') {
        if (q4_stage === 'مدرسة') programName = 'مبرمجو الأردن';
        else if (q4_stage === 'جامعة') programName = '42 عمّان و42 إربد';
        else programName = 'مساحة الصنّاع';
      } else if (q1_passion === 'قُد') {
        if (q4_stage === 'مدرسة') programName = 'برنامج القيادة للمدارس (حقق)';
        else if (q4_stage === 'جامعة') programName = 'برنامج خطى الحسين';
        else programName = 'برنامج التدريب الدّولي';
      } else { // اصنع الأثر
        programName = 'نَحْنُ';
      }

      return {
        type: 'program',
        title: programName,
        desc: `لأنك تبحث عن التزام طويل الأمد يبني مسيرتك في مسار "${q1_passion}"، هذا البرنامج هو وجهتك المثالية لبدء رحلتك الحقيقية.`
      };
    } else {
      return {
        type: 'event',
        pathway: q1_passion,
        location: location === 'أونلاين' ? 'الكل' : location,
        title: `فرص وفعاليات مسار "${q1_passion}"`,
        desc: `بما أن وقتك ضيق وتفضل التطوير السريع، قمنا بفلترة أحدث الفرص والورش المتاحة حالياً في منطقتك لتناسب جدولك ضمن هذا المسار.`
      };
    }
  };

  const result = step === 6 ? getSmartResult() : null;

  const modalVariants = {
    hidden: { opacity: 0, y: window.innerWidth < 768 ? '100%' : 20, scale: window.innerWidth < 768 ? 1 : 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 25, stiffness: window.innerWidth < 768 ? 250 : 300 } },
    exit: { opacity: 0, y: window.innerWidth < 768 ? '100%' : 20, scale: window.innerWidth < 768 ? 1 : 0.95, transition: { duration: 0.2 } }
  };

  const totalSteps = 5;

  return (
    <div className="fixed inset-0 z-[120] flex items-end md:items-center justify-center p-0 md:p-6 font-sans min-h-[100dvh]" dir="rtl">
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#1a0409]/80 backdrop-blur-sm cursor-pointer" onClick={onClose} />

      <motion.div 
        variants={modalVariants} initial="hidden" animate="visible" exit="exit"
        className="relative bg-white shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col h-[90vh] md:h-auto md:min-h-[550px] rounded-t-[2rem] md:rounded-[2rem] border-t border-gray-100 md:border mt-auto md:mt-0"
      >
        <div className="md:hidden w-full flex justify-center pt-4 pb-2 shrink-0 bg-white">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        <div className="h-1.5 w-full bg-gray-100 flex shrink-0">
          <motion.div className="h-full bg-gradient-to-r from-[#8a1538] to-[#C08F2D]" initial={{ width: '0%' }} animate={{ width: `${(step / totalSteps) * 100}%` }} transition={{ duration: 0.4, ease: "easeInOut" }} />
        </div>

        <button onClick={onClose} className="absolute top-8 right-6 md:top-6 md:left-6 md:right-auto z-20 text-gray-400 hover:text-[#8a1538] bg-gray-50 hover:bg-[#8a1538]/10 p-2 rounded-full md:rounded-lg transition-colors cursor-pointer">
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div className="p-6 md:p-10 flex-1 flex flex-col relative overflow-y-auto scrollbar-hide pb-20 md:pb-10">
          
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
             <img src="/CPF-Logo.png" alt="" className="w-48 h-48 md:w-72 md:h-72 object-contain grayscale" />
          </div>

          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex-1 flex flex-col relative z-10">
                <span className="text-[#C08F2D] font-bold text-xs tracking-widest uppercase mb-2">السؤال 1 من 5</span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">أين تجد شغفك واهتمامك؟</h2>
                <div className="space-y-4 mt-6">
                  {question1Options.map(opt => (
                    <button key={opt.id} onClick={() => { setAnswers({...answers, q1_passion: opt.id}); setStep(2); }} className={`w-full text-right p-5 rounded-xl border-2 transition-all flex items-center gap-4 cursor-pointer ${answers.q1_passion === opt.id ? 'border-[#8a1538] bg-[#8a1538]/5' : 'border-gray-100 hover:border-[#C08F2D]/50 hover:bg-gray-50'}`}>
                      <div className="p-3 bg-gray-100 text-gray-500 rounded-lg"><opt.icon className="w-6 h-6" /></div>
                      <div>
                        <h3 className="text-lg font-black mb-1">{opt.title}</h3>
                        <p className="text-gray-500 text-sm">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex-1 flex flex-col relative z-10">
                <span className="text-[#C08F2D] font-bold text-xs tracking-widest uppercase mb-2">السؤال 2 من 5</span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">كيف تفضل أن تتعلم وتطور مهاراتك؟</h2>
                <div className="space-y-4 mt-6">
                  {question2Options.map(opt => (
                    <button key={opt.id} onClick={() => { setAnswers({...answers, q2_learningStyle: opt.id}); setStep(3); }} className="w-full text-right p-5 rounded-xl border-2 border-gray-100 hover:border-[#C08F2D]/50 hover:bg-gray-50 transition-all flex items-center gap-4 cursor-pointer">
                      <div className="p-3 bg-gray-100 text-gray-500 rounded-lg"><opt.icon className="w-6 h-6" /></div>
                      <div>
                        <h3 className="text-lg font-black mb-1">{opt.title}</h3>
                        <p className="text-gray-500 text-sm">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex-1 flex flex-col relative z-10">
                <span className="text-[#C08F2D] font-bold text-xs tracking-widest uppercase mb-2">السؤال 3 من 5</span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">ما هو حجم الالتزام الزمني المناسب لك؟</h2>
                <div className="space-y-4 mt-6">
                  {question3Options.map(opt => (
                    <button key={opt.id} onClick={() => { setAnswers({...answers, q3_commitment: opt.id}); setStep(4); }} className="w-full text-right p-5 rounded-xl border-2 border-gray-100 hover:border-[#C08F2D]/50 hover:bg-gray-50 transition-all flex items-center gap-4 cursor-pointer">
                      <div className="p-3 bg-gray-100 text-gray-500 rounded-lg"><opt.icon className="w-6 h-6" /></div>
                      <div>
                        <h3 className="text-lg font-black mb-1">{opt.title}</h3>
                        <p className="text-gray-500 text-sm">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex-1 flex flex-col relative z-10">
                <span className="text-[#C08F2D] font-bold text-xs tracking-widest uppercase mb-2">السؤال 4 من 5</span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">بأي مرحلة أنت حالياً؟</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  {question4Options.map(opt => (
                    <button key={opt.id} onClick={() => { setAnswers({...answers, q4_stage: opt.id}); setStep(5); }} className="text-center p-6 rounded-xl border-2 border-gray-100 hover:border-[#C08F2D]/50 hover:bg-gray-50 transition-all flex flex-col items-center gap-3 cursor-pointer">
                      <opt.icon className="w-8 h-8 text-gray-400" />
                      <span className="font-black">{opt.title}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="s5" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex-1 flex flex-col relative z-10">
                <span className="text-[#C08F2D] font-bold text-xs tracking-widest uppercase mb-2">السؤال الأخير</span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">أين تتواجد جغرافياً؟</h2>
                <div className="grid grid-cols-2 gap-4 mt-6 mb-8 flex-1 content-start">
                  {locations.map(loc => (
                    <button key={loc.id} onClick={() => setAnswers({...answers, location: loc.id})} className={`p-5 rounded-xl border-2 transition-all flex flex-col items-center gap-3 text-center cursor-pointer ${answers.location === loc.id ? 'border-[#8a1538] bg-[#8a1538]/5 text-[#8a1538]' : 'border-gray-100 hover:border-[#C08F2D] hover:bg-gray-50'}`}>
                      <loc.icon className="w-6 h-6" />
                      <span className="font-bold text-sm">{loc.label}</span>
                    </button>
                  ))}
                </div>
                <button onClick={handleGenerate} disabled={!answers.location || isGenerating} className="w-full bg-[#8a1538] disabled:bg-gray-200 text-white py-4 rounded-xl font-black text-base hover:bg-[#680f2a] transition-colors mt-auto">
                  {isGenerating ? 'جاري تحليل إجاباتك...' : 'عرض التوجيه الذكي'}
                </button>
              </motion.div>
            )}

            {/* 🟢 النتيجة الحاسمة (خيار واحد فقط لا غير!) */}
            {step === 6 && result && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col justify-center items-center py-4 relative z-10 text-center">
                
                <div className="w-20 h-20 bg-[#C08F2D]/10 border-2 border-[#C08F2D] rounded-full flex items-center justify-center mb-6">
                  <ShieldCheck className="w-10 h-10 text-[#C08F2D]" />
                </div>
                
                <span className="text-[#8a1538] font-bold text-xs tracking-widest uppercase mb-2">اكتمل التوجيه بنجاح</span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">إليك الخيار الأمثل لمسارك</h2>
                
                {/* كرت النتيجة الوحيد */}
                <div className="bg-white border-2 border-[#8a1538] rounded-2xl p-8 w-full max-w-md relative shadow-lg mb-8">
                  <div className="absolute -top-4 right-1/2 transform translate-x-1/2 bg-[#8a1538] text-white text-xs font-black px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
                    {result.type === 'program' ? 'التزام استراتيجي (برنامج)' : 'تطوير سريع (فعاليات)'}
                  </div>
                  
                  <h4 className="font-black text-gray-900 text-2xl mb-4 mt-2 text-center">{result.title}</h4>
                  <p className="text-gray-500 text-base mb-8 leading-relaxed text-center">
                    {result.desc}
                  </p>
                  
                  <button 
                    onClick={() => {
                      if (result.type === 'program') {
                        onComplete({ type: 'program', programName: result.title });
                      } else {
                        onComplete({ type: 'event', pathway: result.pathway, location: result.location });
                      }
                    }} 
                    className="w-full bg-[#8a1538] text-white py-4 rounded-xl text-sm font-black hover:bg-[#680f2a] transition-all shadow-md group flex items-center justify-center gap-2"
                  >
                    <span>{result.type === 'program' ? 'استكشف تفاصيل البرنامج' : 'تصفح الفعاليات المتاحة الآن'}</span>
                    <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                  </button>
                </div>

                <button onClick={() => { onClose(); onComplete({ type: 'event', location: 'الكل', pathway: 'الكل' }); }} className="text-gray-400 hover:text-gray-700 text-sm font-bold underline transition-colors cursor-pointer">
                  تخطي واستكشاف جميع الفرص
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}