// src/components/events/EventDetailsDrawer.jsx
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Award, Clock, ShieldCheck, Users, Info, Lock, Unlock, UserCheck, ChevronDown, ChevronUp } from 'lucide-react';

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
      case 'المشاركة الاقتصادية': return 'bg-[#721F31]'; 
      case 'القيادة': return 'bg-[#2b307e]'; 
      case 'التنمية المجتمعية': return 'bg-[#1f5412]'; 
      default: return 'bg-gray-800';
    }
  };

  const pathwayColor = getPathwayColor(currentEvent.pathway);
  const userPoints = 200; 
  const requiredPoints = currentEvent.requiredPoints !== undefined ? currentEvent.requiredPoints : 200; 
  const isCityEligible = true; 
  const isAgeEligible = true; 

  let lockReason = "";
  if (!isCityEligible) lockReason = "متاح فقط لسكان محافظة " + currentEvent.city;
  else if (!isAgeEligible) lockReason = "العمر غير مطابق للشروط";
  else if (userPoints < requiredPoints) lockReason = `يتطلب ${requiredPoints} نقطة (رصيدك الحالي: ${userPoints})`;

  const canRegister = isCityEligible && isAgeEligible && (userPoints >= requiredPoints);

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
            // 🟢 إجبار العنصر على الالتصاق بالشمال وإلغاء تأثير right-0 على الشاشات الكبيرة
            className="fixed z-[9999] bg-white shadow-2xl flex flex-col bottom-0 left-0 right-0 w-full rounded-t-3xl max-h-[90vh] md:max-h-none md:rounded-t-none md:rounded-r-3xl md:top-0 md:bottom-0 md:right-auto md:left-0 md:w-[450px] h-full"          >
             <div className="md:hidden w-full flex justify-center pt-3 pb-1 shrink-0 bg-white">
               <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
             </div>

             <div className="relative h-48 md:h-64 shrink-0 bg-gray-100">
                <img src={currentEvent.image} alt={currentEvent.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />
                
                <button 
                  onClick={onClose} 
                  className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 hover:scale-110 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5" />
                </button>

                <div className="absolute bottom-4 right-4 left-4 md:bottom-6 md:right-6 md:left-6 flex justify-between items-end">
                   <span className={`${pathwayColor} text-white text-[10px] md:text-xs font-black px-3 py-1 md:px-4 md:py-1.5 rounded-lg shadow-sm border border-white/20 backdrop-blur-sm`}>
                     {currentEvent.pathway}
                   </span>
                </div>
             </div>

             <div className="flex-1 overflow-y-auto p-5 md:p-8 scrollbar-hide">
                <h2 className="text-xl md:text-3xl font-black text-gray-900 mb-5 md:mb-6 leading-tight">
                  {currentEvent.title}
                </h2>

                <div className="grid grid-cols-2 gap-x-3 gap-y-4 md:gap-x-4 md:gap-y-6 mb-6 md:mb-10 bg-[#F8FAFC] p-4 md:p-5 rounded-2xl border border-gray-100">
                   <div className="flex items-start gap-2.5 md:gap-3">
                     <Calendar className="w-4 h-4 md:w-5 md:h-5 text-[#8a1538] mt-0.5 shrink-0" />
                     <div>
                       <p className="text-[9px] md:text-[10px] text-gray-400 font-bold mb-0.5 md:mb-1">التاريخ</p>
                       <p className="text-[12px] md:text-sm font-black text-gray-800">{currentEvent.date}</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-2.5 md:gap-3">
                     <Clock className="w-4 h-4 md:w-5 md:h-5 text-[#8a1538] mt-0.5 shrink-0" />
                     <div>
                       <p className="text-[9px] md:text-[10px] text-gray-400 font-bold mb-0.5 md:mb-1">الوقت</p>
                       <p className="text-[12px] md:text-sm font-black text-gray-800">04:00 - 06:00 م</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-2.5 md:gap-3">
                     <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#8a1538] mt-0.5 shrink-0" />
                     <div>
                       <p className="text-[9px] md:text-[10px] text-gray-400 font-bold mb-0.5 md:mb-1">الموقع</p>
                       <p className="text-[12px] md:text-sm font-black text-gray-800 leading-snug">{currentEvent.city} - {currentEvent.location || 'المركز الشبابي'}</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-2.5 md:gap-3">
                     <Award className="w-4 h-4 md:w-5 md:h-5 text-[#C08F2D] mt-0.5 shrink-0" />
                     <div>
                       <p className="text-[9px] md:text-[10px] text-[#C08F2D] font-bold mb-0.5 md:mb-1">المكافأة</p>
                       <p className="text-[12px] md:text-sm font-black text-[#C08F2D]">+{currentEvent.points} نقطة</p>
                     </div>
                   </div>
                </div>

                <div className="mb-6 md:mb-10">
                  <h3 className="flex items-center gap-2 text-[14px] md:text-base font-black text-gray-900 mb-2.5 md:mb-3">
                    <Info className="w-4 h-4 md:w-5 md:h-5 text-[#8a1538]" /> عن الفرصة
                  </h3>
                  
                  <div className="relative">
                    <motion.div 
                      initial={false}
                      animate={{ height: !isLongText || isExpanded ? "auto" : "70px" }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 text-[13px] md:text-sm font-medium leading-relaxed pb-1 text-justify">
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
                      className="mt-2 text-[#C08F2D] font-black text-xs flex items-center gap-1 hover:text-[#a67b25] transition-colors cursor-pointer"
                    >
                      {isExpanded ? (
                        <>عرض أقل <ChevronUp className="w-4 h-4" /></>
                      ) : (
                        <>اقرأ المزيد <ChevronDown className="w-4 h-4" /></>
                      )}
                    </button>
                  )}
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-[14px] md:text-base font-black text-gray-900 mb-3 md:mb-4">
                    <Users className="w-4 h-4 md:w-5 md:h-5 text-[#8a1538]" /> الشروط والأهلية
                  </h3>
                  <div className="flex flex-col gap-2.5">
                    
                    <div className="flex items-center gap-3 bg-[#F8FAFC] border border-gray-100 p-3 rounded-xl">
                      <UserCheck className={`w-4 h-4 md:w-5 md:h-5 shrink-0 ${isAgeEligible ? 'text-[#C08F2D]' : 'text-[#8a1538]'}`} />
                      <span className="text-[12px] md:text-sm font-bold text-gray-700 flex-1 leading-snug">العمر المطلوب: {currentEvent.ageRange || '18 - 24'} سنة</span>
                      {isAgeEligible ? (
                        <span className="text-[9px] md:text-[10px] bg-white border border-gray-200 text-gray-500 px-2 md:px-2.5 py-1 rounded-md font-black shadow-sm shrink-0">مطابق</span>
                      ) : (
                        <span className="text-[9px] md:text-[10px] bg-[#8a1538]/10 text-[#8a1538] px-2 md:px-2.5 py-1 rounded-md font-black shrink-0">غير مطابق</span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 bg-[#F8FAFC] border border-gray-100 p-3 rounded-xl">
                      <MapPin className={`w-4 h-4 md:w-5 md:h-5 shrink-0 ${isCityEligible ? 'text-[#C08F2D]' : 'text-[#8a1538]'}`} />
                      <span className="text-[12px] md:text-sm font-bold text-gray-700 flex-1 leading-snug">متاح لسكان: {currentEvent.city}</span>
                      {isCityEligible ? (
                        <span className="text-[9px] md:text-[10px] bg-white border border-gray-200 text-gray-500 px-2 md:px-2.5 py-1 rounded-md font-black shadow-sm shrink-0">مطابق</span>
                      ) : (
                        <span className="text-[9px] md:text-[10px] bg-[#8a1538]/10 text-[#8a1538] px-2 md:px-2.5 py-1 rounded-md font-black shrink-0">غير مطابق</span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 bg-[#F8FAFC] border border-gray-100 p-3 rounded-xl">
                      {requiredPoints === 0 ? (
                        <>
                           <Unlock className="w-4 h-4 md:w-5 md:h-5 shrink-0 text-gray-400" />
                           <span className="text-[12px] md:text-sm font-bold text-gray-700 flex-1 leading-snug">مستوى النقاط:</span>
                           <span className="text-[9px] md:text-[10px] bg-gray-200 text-gray-600 px-2 md:px-2.5 py-1 rounded-md font-black shrink-0">متاح للجميع</span>
                        </>
                      ) : (
                        <>
                           <Lock className={`w-4 h-4 md:w-5 md:h-5 shrink-0 ${userPoints >= requiredPoints ? 'text-[#C08F2D]' : 'text-[#8a1538]'}`} />
                           <span className="text-[12px] md:text-sm font-bold text-gray-700 flex-1 leading-snug">النقاط المطلوبة: {requiredPoints} نقطة</span>
                           {userPoints >= requiredPoints ? (
                             <span className="text-[9px] md:text-[10px] bg-white border border-gray-200 text-gray-500 px-2 md:px-2.5 py-1 rounded-md font-black shadow-sm shrink-0">مؤهل</span>
                           ) : (
                             <span className="text-[9px] md:text-[10px] bg-[#8a1538]/10 text-[#8a1538] px-2 md:px-2.5 py-1 rounded-md font-black shrink-0">غير مؤهل</span>
                           )}
                        </>
                      )}
                    </div>

                  </div>
                </div>
             </div>

              <div className="shrink-0 p-4 md:p-6 bg-white border-t border-gray-100 shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
                  {canRegister ? (
                  <button 
                    onClick={() => {
                      onRegister(currentEvent);
                      onClose();
                    }}
                    className="w-full relative overflow-hidden group bg-[#8a1538] hover:bg-[#680f2a] text-white rounded-xl md:rounded-2xl font-black text-[13px] md:text-sm py-3.5 md:py-4 flex items-center justify-center gap-2 md:gap-3 transition-all shadow-md cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-[#C08F2D]" />
                    <span>تسجيل الدخول عبر سند للمتابعة</span>
                  </button>
                ) : (
                  <button 
                    disabled
                    className="w-full bg-gray-100 text-gray-400 rounded-xl md:rounded-2xl font-black text-[13px] md:text-sm py-3.5 md:py-4 flex items-center justify-center gap-2 cursor-not-allowed border border-gray-200"
                  >
                    <Lock className="w-4 h-4 shrink-0" />
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