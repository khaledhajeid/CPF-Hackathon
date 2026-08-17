// src/components/events/EventDetailsDrawer.jsx
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Clock, ShieldCheck, Users, Info, Lock, UserCheck, ChevronDown, ChevronUp } from 'lucide-react';

export default function EventDetailsDrawer({ event, isOpen, onClose, onRegister }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null); 

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (event) setActiveEvent(event);
    if (isOpen) {
      setIsExpanded(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [event, isOpen]);

  if (!mounted) return null;

  const currentEvent = event || activeEvent;
  if (!currentEvent) return null;

  const getPathwayColor = (pathway) => {
    switch(pathway) {
      case 'تعلّم': return 'bg-[#a00023]';
      case 'قُد': return 'bg-[#2b307e]';
      case 'اصنع الأثر': return 'bg-[#1f5412]';
      default: return 'bg-gray-800';
    }
  };

  const pathwayColor = getPathwayColor(currentEvent.pathway);
  const isCityEligible = true;
  const isAgeEligible = true;

  let lockReason = "";
  if (!isCityEligible) lockReason = "متاح فقط لسكان محافظة " + currentEvent.city;
  else if (!isAgeEligible) lockReason = "العمر غير مطابق للشروط";

  const canRegister = isCityEligible && isAgeEligible;

  const backdropVariants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    visible: { opacity: 1, backdropFilter: "blur(4px)", transition: { duration: 0.3 } }
  };

  const isMobile = window.innerWidth < 768;

  const drawerVariants = {
    hidden: isMobile ? { y: '100%', x: 0 } : { x: '-100%', y: 0 },
    visible: { y: 0, x: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } },
    exit: isMobile ? { y: '100%', x: 0 } : { x: '-100%', y: 0, transition: { type: 'tween', duration: 0.3 } }
  };

  const dummyLongDescription = `هذه الفعالية مصممة خصيصاً للشباب الطموح لتطوير مهاراتهم وبناء قدراتهم. ستحصل على فرصة للتعلم من خبراء متخصصين، وتوسيع شبكة علاقاتك، والمساهمة في بناء مجتمعك بشكل فعال. تتضمن الفعالية ورش عمل مكثفة في مجالات متعددة، منها التفكير النقدي، مهارات التواصل الفعال، والعمل الجماعي. سيتم تقديم دراسات حالة واقعية لمناقشتها وإيجاد حلول مبتكرة لها. بالإضافة إلى ذلك، ستتمكن من لقاء شخصيات قيادية وملهمة ستشاركك قصص نجاحها وتحدياتها. نهدف من خلال هذه الفرصة إلى صقل شخصيتك وتمكينك من أخذ دور ريادي في مجتمعك وصناعة تأثير حقيقي يدوم طويلاً.`;
  
  const descriptionToShow = currentEvent.description || dummyLongDescription;
  const isLongText = descriptionToShow.length > 150;

  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="hidden" animate="visible" exit="hidden"
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-gray-900/60"
          />

          <motion.div
            variants={drawerVariants}
            initial="hidden" animate="visible" exit="exit"
            dir="rtl"
            // 🟢 تدرج عرض الـ Drawer: 400px لـ lg, 480px لـ xl, و 600px لـ 2xl
            className="fixed z-[9999] bg-white shadow-2xl flex flex-col bottom-0 left-0 right-0 w-full rounded-t-3xl max-h-[90vh] md:max-h-none md:rounded-t-none md:rounded-r-3xl md:top-0 md:bottom-0 md:right-auto md:left-0 lg:w-[400px] xl:w-[480px] 2xl:w-[600px] h-full"
          >
             <div className="md:hidden w-full flex justify-center pt-3 pb-1 shrink-0 bg-white">
               <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
             </div>

             {/* 🟢 تدرج ارتفاع الصورة العلوية */}
             <div className="relative h-48 lg:h-52 xl:h-64 2xl:h-80 shrink-0 bg-gray-100">
                <img src={currentEvent.image} alt={currentEvent.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />
                
                <button 
                  onClick={onClose} 
                  className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 hover:scale-110 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6" />
                </button>

                <div className="absolute bottom-4 right-4 left-4 md:bottom-6 md:right-6 md:left-6 flex justify-between items-end">
                   <span className={`${pathwayColor} text-white text-[10px] lg:text-[11px] xl:text-xs 2xl:text-base font-black px-3 py-1 lg:px-3 lg:py-1 xl:px-4 xl:py-1.5 2xl:px-5 2xl:py-2 rounded-lg shadow-sm border border-white/20 backdrop-blur-sm`}>
                     {currentEvent.pathway}
                   </span>
                </div>
             </div>

             {/* 🟢 تدرج البادينج الداخلي للمحتوى لتوفير المساحة البيضاء */}
             <div className="flex-1 overflow-y-auto p-5 lg:p-6 xl:p-8 2xl:p-12 scrollbar-hide">
                <h2 className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-black text-gray-900 mb-4 lg:mb-5 xl:mb-6 leading-tight">
                  {currentEvent.title}
                </h2>

                <div className="grid grid-cols-2 gap-x-3 gap-y-4 lg:gap-x-3 lg:gap-y-4 xl:gap-x-4 xl:gap-y-6 2xl:gap-y-8 mb-6 lg:mb-8 xl:mb-10 2xl:mb-12 bg-[#F8FAFC] p-4 lg:p-4 xl:p-5 2xl:p-8 rounded-2xl border border-gray-100">
                   <div className="flex items-start gap-2.5 lg:gap-2.5 xl:gap-3 2xl:gap-4">
                     <Calendar className="w-4 h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 text-[#8a1538] mt-0.5 shrink-0" />
                     <div>
                       <p className="text-[9px] lg:text-[10px] xl:text-[11px] 2xl:text-sm text-gray-500 font-bold mb-0.5">التاريخ</p>
                       <p className="text-[12px] lg:text-[13px] xl:text-sm 2xl:text-lg font-black text-gray-800">{currentEvent.date}</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-2.5 lg:gap-2.5 xl:gap-3 2xl:gap-4">
                     <Clock className="w-4 h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 text-[#8a1538] mt-0.5 shrink-0" />
                     <div>
                       <p className="text-[9px] lg:text-[10px] xl:text-[11px] 2xl:text-sm text-gray-500 font-bold mb-0.5">الوقت</p>
                       <p className="text-[12px] lg:text-[13px] xl:text-sm 2xl:text-lg font-black text-gray-800">04:00 - 06:00 م</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-2.5 lg:gap-2.5 xl:gap-3 2xl:gap-4">
                     <MapPin className="w-4 h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 text-[#8a1538] mt-0.5 shrink-0" />
                     <div>
                       <p className="text-[9px] lg:text-[10px] xl:text-[11px] 2xl:text-sm text-gray-500 font-bold mb-0.5">الموقع</p>
                       <p className="text-[12px] lg:text-[13px] xl:text-sm 2xl:text-lg font-black text-gray-800 leading-snug">{currentEvent.city} - {currentEvent.location || 'المركز الشبابي'}</p>
                     </div>
                   </div>
                </div>

                <div className="mb-6 lg:mb-8 xl:mb-10 2xl:mb-12">
                  <h3 className="flex items-center gap-2 text-[14px] lg:text-[15px] xl:text-base 2xl:text-xl font-black text-gray-900 mb-2.5 lg:mb-3 2xl:mb-4">
                    <Info className="w-4 h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 text-[#8a1538]" /> عن الفرصة
                  </h3>
                  
                  <div className="relative">
                    <motion.div 
                      initial={false}
                      animate={{ height: !isLongText || isExpanded ? "auto" : "70px" }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 text-[13px] lg:text-[13px] xl:text-sm 2xl:text-lg font-medium leading-relaxed pb-1 text-justify">
                        {descriptionToShow}
                      </p>
                    </motion.div>
                    
                    {!isExpanded && isLongText && (
                      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                    )}
                  </div>

                  {isLongText && (
                    <button 
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="mt-2 text-[#C08F2D] font-black text-xs 2xl:text-sm flex items-center gap-1 hover:text-[#a67b25] transition-colors cursor-pointer"
                    >
                      {isExpanded ? (
                        <>عرض أقل <ChevronUp className="w-4 h-4 2xl:w-5 2xl:h-5" /></>
                      ) : (
                        <>اقرأ المزيد <ChevronDown className="w-4 h-4 2xl:w-5 2xl:h-5" /></>
                      )}
                    </button>
                  )}
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-[14px] lg:text-[15px] xl:text-base 2xl:text-xl font-black text-gray-900 mb-3 lg:mb-4 2xl:mb-5">
                    <Users className="w-4 h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 text-[#8a1538]" /> الشروط والأهلية
                  </h3>
                  <div className="flex flex-col gap-2.5 2xl:gap-4">
                    
                    <div className="flex items-center gap-3 bg-[#F8FAFC] border border-gray-100 p-3 2xl:p-4 rounded-xl">
                      <UserCheck className={`w-4 h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 shrink-0 ${isAgeEligible ? 'text-[#C08F2D]' : 'text-[#8a1538]'}`} />
                      <span className="text-[12px] lg:text-[13px] xl:text-sm 2xl:text-lg font-bold text-gray-700 flex-1 leading-snug">العمر المطلوب: {currentEvent.ageRange || '18 - 25'} سنة</span>
                      {isAgeEligible ? (
                        <span className="text-[9px] lg:text-[10px] xl:text-[10px] 2xl:text-sm bg-white border border-gray-200 text-gray-500 px-2 xl:px-2.5 py-1 rounded-md font-black shadow-sm shrink-0">مطابق</span>
                      ) : (
                        <span className="text-[9px] lg:text-[10px] xl:text-[10px] 2xl:text-sm bg-[#8a1538]/10 text-[#8a1538] px-2 xl:px-2.5 py-1 rounded-md font-black shrink-0">غير مطابق</span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 bg-[#F8FAFC] border border-gray-100 p-3 2xl:p-4 rounded-xl">
                      <MapPin className={`w-4 h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 shrink-0 ${isCityEligible ? 'text-[#C08F2D]' : 'text-[#8a1538]'}`} />
                      <span className="text-[12px] lg:text-[13px] xl:text-sm 2xl:text-lg font-bold text-gray-700 flex-1 leading-snug">متاح لسكان: {currentEvent.city}</span>
                      {isCityEligible ? (
                        <span className="text-[9px] lg:text-[10px] xl:text-[10px] 2xl:text-sm bg-white border border-gray-200 text-gray-500 px-2 xl:px-2.5 py-1 rounded-md font-black shadow-sm shrink-0">مطابق</span>
                      ) : (
                        <span className="text-[9px] lg:text-[10px] xl:text-[10px] 2xl:text-sm bg-[#8a1538]/10 text-[#8a1538] px-2 xl:px-2.5 py-1 rounded-md font-black shrink-0">غير مطابق</span>
                      )}
                    </div>

                  </div>
                </div>
             </div>

              {/* 🟢 زر التسجيل متدرج الحجم */}
              <div className="shrink-0 p-4 lg:p-5 xl:p-6 2xl:p-10 bg-white border-t border-gray-100 shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
                  {canRegister ? (
                  <button 
                    onClick={() => {
                      onRegister(currentEvent);
                      onClose();
                    }}
                    className="w-full relative overflow-hidden group bg-[#8a1538] hover:bg-[#680f2a] text-white rounded-xl lg:rounded-xl xl:rounded-2xl font-black text-[13px] lg:text-[13px] xl:text-sm 2xl:text-2xl py-3.5 lg:py-3.5 xl:py-4 2xl:py-6 flex items-center justify-center gap-2 lg:gap-2 xl:gap-3 transition-all shadow-md cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 text-[#C08F2D]" />
                    <span>تسجيل الدخول للمتابعة</span>
                  </button>
                ) : (
                  <button 
                    disabled
                    className="w-full bg-gray-100 text-gray-500 rounded-xl lg:rounded-xl xl:rounded-2xl font-black text-[13px] lg:text-[13px] xl:text-sm 2xl:text-2xl py-3.5 lg:py-3.5 xl:py-4 2xl:py-6 flex items-center justify-center gap-2 cursor-not-allowed border border-gray-200"
                  >
                    <Lock className="w-4 h-4 2xl:w-6 2xl:h-6 shrink-0" />
                    <span className="truncate">{lockReason}</span>
                  </button>
                )}
              </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(drawerContent, document.body);
}