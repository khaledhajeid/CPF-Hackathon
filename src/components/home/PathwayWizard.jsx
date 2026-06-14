// src/components/home/PathwayWizard.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Compass, Target, HeartHandshake, Briefcase, MapPin, Laptop, ShieldCheck } from 'lucide-react';

export default function PathwayWizard({ onClose, onComplete }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ goal: '', interests: [], location: '' });
  const [isGenerating, setIsGenerating] = useState(false);

  // 🟢 صياغة الأهداف بلغة رسمية ومؤسسية تتطابق مع مسارات المؤسسة
  const goals = [
    { 
      id: 'المشاركة الاقتصادية', 
      title: 'المشاركة الاقتصادية والريادة', 
      desc: 'أسعى لتطوير قدراتي التقنية والمهنية، وبناء مساري الوظيفي أو مشروعي الخاص.', 
      icon: Briefcase 
    },
    { 
      id: 'القيادة', 
      title: 'القيادة وتطوير الذات', 
      desc: 'أطمح لبناء قدراتي القيادية وصناعة القرار لأكون مؤثراً وفاعلاً في مجتمعي.', 
      icon: Target 
    },
    { 
      id: 'التنمية المجتمعية', 
      title: 'التنمية المجتمعية والتطوع', 
      desc: 'أرغب في خدمة مجتمعي والمشاركة في المبادرات التطوعية والإنسانية المستدامة.', 
      icon: HeartHandshake 
    }
  ];

  const interestTags = [
    "تطوير الأنظمة (البرمجة)", "الأمن السيبراني", "الذكاء الاصطناعي", 
    "إدارة المشاريع", "ريادة الأعمال", "التصنيع الرقمي", 
    "القيادة والتواصل", "التطوع الميداني", "الثقافة المالية"
  ];

  const locations = [
    { id: 'عمان', label: 'إقليم الوسط (عمان، البلقاء..)', icon: MapPin },
    { id: 'إربد', label: 'إقليم الشمال (إربد، عجلون..)', icon: MapPin },
    { id: 'العقبة', label: 'إقليم الجنوب (العقبة، الكرك..)', icon: MapPin },
    { id: 'أونلاين', label: 'برامج عن بُعد (عبر الإنترنت)', icon: Laptop }
  ];

  const toggleInterest = (tag) => {
    setAnswers(prev => ({
      ...prev,
      interests: prev.interests.includes(tag) 
        ? prev.interests.filter(t => t !== tag)
        : [...prev.interests, tag]
    }));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setStep(4);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 font-sans" dir="rtl">
      
      {/* خلفية زجاجية داكنة لفصل المستخدم عن الموقع والتركيز */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#1a070b]/80 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col min-h-[520px] border border-gray-100"
      >
        {/* شريط التقدم بالهوية البصرية */}
        <div className="h-1.5 w-full bg-gray-100 flex">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#721F31] to-[#C08F2D]"
            initial={{ width: '25%' }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>

        {/* زر الإغلاق */}
        <button onClick={onClose} className="absolute top-5 left-5 z-20 text-gray-400 hover:text-[#721F31] bg-gray-50 hover:bg-[#721F31]/10 p-2 rounded-lg transition-colors cursor-pointer">
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 sm:p-10 flex-1 flex flex-col relative">
          
          {/* زخرفة مائية خفيفة جداً لشعار المؤسسة في الخلفية (الـ Theme) */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center pointer-events-none">
             <img src="/CPF-Logo.png" alt="" className="w-64 h-64 object-contain grayscale" />
          </div>

          <AnimatePresence mode="wait">
            
            {/* الخطوة 1: الهدف */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex-1 flex flex-col relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <Compass className="w-5 h-5 text-[#C08F2D]" />
                  <span className="text-[#C08F2D] font-bold text-xs tracking-widest uppercase">الخطوة 1 من 3</span>
                </div>
                <h2 className="text-3xl font-black text-[#1a1c1d] mb-3">حدد مسارك وطموحك</h2>
                <p className="text-gray-500 font-medium mb-8">لتوجيهك نحو المبادرات والبرامج الأنسب، يرجى اختيار الهدف الذي يعبر عن طموحك الحالي.</p>
                
                <div className="space-y-4 flex-1">
                  {goals.map(goal => {
                    const isSelected = answers.goal === goal.id;
                    return (
                      <button 
                        key={goal.id}
                        onClick={() => { setAnswers({...answers, goal: goal.id}); setStep(2); }}
                        // 🟢 توحيد الألوان للـ (عنابي) عند الاختيار ليعطي طابع مؤسسي رزين
                        className={`w-full text-right p-5 rounded-xl border-2 transition-all flex items-start gap-4 group cursor-pointer
                          ${isSelected ? 'border-[#721F31] bg-[#721F31]/5 shadow-sm' : 'border-gray-100 hover:border-[#C08F2D]/50 hover:bg-gray-50'}`}
                      >
                        <div className={`p-3 rounded-lg transition-colors shrink-0 ${isSelected ? 'bg-[#721F31] text-white' : 'bg-gray-100 text-gray-400 group-hover:text-[#C08F2D]'}`}>
                          <goal.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className={`text-lg font-black mb-1 transition-colors ${isSelected ? 'text-[#721F31]' : 'text-gray-900 group-hover:text-[#1a1c1d]'}`}>{goal.title}</h3>
                          <p className="text-gray-500 font-medium text-sm leading-relaxed">{goal.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* الخطوة 2: الاهتمامات */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex-1 flex flex-col relative z-10">
                <div className="mb-2">
                  <span className="text-[#C08F2D] font-bold text-xs tracking-widest uppercase">الخطوة 2 من 3</span>
                </div>
                <h2 className="text-3xl font-black text-[#1a1c1d] mb-3">ما هي مجالات اهتمامك؟</h2>
                <p className="text-gray-500 font-medium mb-8">اختر مجالاً أو أكثر من المجالات التي تثير شغفك لتخصيص النتائج (خطوة اختيارية).</p>
                
                <div className="flex flex-wrap gap-3 mb-8 flex-1 content-start">
                  {interestTags.map(tag => {
                    const isSelected = answers.interests.includes(tag);
                    return (
                      <button 
                        key={tag}
                        onClick={() => toggleInterest(tag)}
                        className={`px-5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-[#721F31] text-white shadow-md border-transparent' 
                            : 'bg-white text-gray-500 border border-gray-200 hover:border-[#C08F2D] hover:text-[#721F31]'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>

                <button 
                  onClick={() => setStep(3)} 
                  className="w-full bg-[#1a1c1d] text-white py-4 rounded-xl font-black text-base flex items-center justify-center gap-2 hover:bg-[#C08F2D] transition-colors shadow-md cursor-pointer"
                >
                  المتابعة <ArrowRight className="w-5 h-5 rtl:-scale-x-100" />
                </button>
              </motion.div>
            )}

            {/* الخطوة 3: الموقع */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex-1 flex flex-col relative z-10">
                <div className="mb-2">
                  <span className="text-[#C08F2D] font-bold text-xs tracking-widest uppercase">الخطوة 3 من 3</span>
                </div>
                <h2 className="text-3xl font-black text-[#1a1c1d] mb-3">أين تتواجد حالياً؟</h2>
                <p className="text-gray-500 font-medium mb-8">لنتمكن من اقتراح الفرص والبرامج المتاحة في منطقتك الجغرافية.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 flex-1">
                  {locations.map(loc => {
                    const isSelected = answers.location === loc.id;
                    return (
                      <button 
                        key={loc.id}
                        onClick={() => setAnswers({...answers, location: loc.id})}
                        className={`p-5 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-3 text-center cursor-pointer ${
                          isSelected 
                            ? 'border-[#721F31] bg-[#721F31]/5 text-[#721F31]' 
                            : 'border-gray-100 hover:border-[#C08F2D] hover:bg-gray-50 text-gray-600'
                        }`}
                      >
                        <loc.icon className={`w-8 h-8 ${isSelected ? 'text-[#721F31]' : 'text-gray-400'}`} />
                        <span className="font-bold">{loc.label}</span>
                      </button>
                    );
                  })}
                </div>

                <button 
                  onClick={handleGenerate} 
                  disabled={!answers.location || isGenerating}
                  className="w-full bg-[#721F31] disabled:bg-gray-200 disabled:text-gray-400 text-white py-4 rounded-xl font-black text-base flex items-center justify-center gap-2 hover:bg-[#5a1826] transition-colors shadow-md cursor-pointer"
                >
                  {isGenerating ? (
                    <>جاري معالجة التوجيه الاستراتيجي <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div></>
                  ) : 'عرض المسار المخصص'}
                </button>
              </motion.div>
            )}

            {/* الخطوة 4: النتيجة */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col justify-center items-center text-center py-2 relative z-10">
                <div className="w-16 h-16 bg-[#C08F2D]/10 border-2 border-[#C08F2D] rounded-full flex items-center justify-center mb-6 relative">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                    <ShieldCheck className="w-8 h-8 text-[#C08F2D]" />
                  </motion.div>
                </div>
                
                <span className="text-[#721F31] font-bold text-xs tracking-widest uppercase mb-2">اكتمل التوجيه بنجاح</span>
                <h2 className="text-3xl font-black text-[#1a1c1d] mb-8">إليك المسارات الأنسب لطموحك</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8 text-right">
                  
                  {/* الخيار الأول (التوصية الأساسية - عنابي) */}
                  <div className="bg-white border-2 border-[#721F31] rounded-xl p-5 relative shadow-sm hover:shadow-md transition-shadow">
                    <div className="absolute -top-3 right-5 bg-[#721F31] text-white text-[10px] font-black px-3 py-1 rounded-md shadow-sm">التوصية الرئيسية</div>
                    <div className="flex items-center gap-4 mb-4 mt-2">
                      <div className="w-12 h-12 bg-[#721F31]/10 rounded-lg flex items-center justify-center shrink-0 text-[#721F31]">
                        <Compass className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-black text-[#1a1c1d] text-sm leading-tight mb-1">{answers.goal} للشباب</h4>
                        <span className="text-xs text-gray-500 font-bold flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {answers.location === 'أونلاين' ? 'متاح عن بُعد' : answers.location}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => { onClose(); onComplete({ location: answers.location === 'أونلاين' ? 'الكل' : answers.location, pathway: answers.goal }); }} 
                      className="w-full bg-[#721F31] text-white py-2.5 rounded-lg text-xs font-black hover:bg-[#5a1826] transition-colors cursor-pointer"
                    >
                      استكشاف الفرص
                    </button>
                  </div>

                  {/* الخيار الثاني (الخيار المرن - ذهبي) */}
                  <div className="bg-white border-2 border-[#C08F2D]/50 rounded-xl p-5 relative hover:border-[#C08F2D] transition-colors shadow-sm hover:shadow-md">
                    <div className="absolute -top-3 right-5 bg-[#C08F2D] text-[#1a1c1d] text-[10px] font-black px-3 py-1 rounded-md shadow-sm">توصية إضافية</div>
                    <div className="flex items-center gap-4 mb-4 mt-2">
                      <div className="w-12 h-12 bg-[#C08F2D]/10 rounded-lg flex items-center justify-center shrink-0 text-[#C08F2D]">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-black text-[#1a1c1d] text-sm leading-tight mb-1">البرامج الشاملة</h4>
                        <span className="text-xs text-gray-500 font-bold flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> كافة المحافظات
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => { onClose(); onComplete({ location: 'الكل', pathway: answers.goal }); }} 
                      className="w-full bg-white border border-[#C08F2D] text-[#C08F2D] py-2.5 rounded-lg text-xs font-black hover:bg-[#C08F2D] hover:text-white transition-colors cursor-pointer"
                    >
                      استكشاف الفرص
                    </button>
                  </div>

                </div>

                <button 
                  onClick={() => { onClose(); onComplete({ location: 'الكل', pathway: 'الكل' }); }} 
                  className="text-gray-400 hover:text-[#721F31] text-sm font-bold underline decoration-gray-300 underline-offset-4 transition-colors cursor-pointer"
                >
                  عرض كافة البرامج والمبادرات المتاحة
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}