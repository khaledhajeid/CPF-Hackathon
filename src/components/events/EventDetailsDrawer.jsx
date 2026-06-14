// src/components/events/EventDetailsDrawer.jsx
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Award, Clock, ShieldCheck, Users, Info, Lock, Unlock, UserCheck, ChevronDown, ChevronUp } from 'lucide-react';

export default function EventDetailsDrawer({ event, isOpen, onClose, onRegister }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null); // 🟢 لحفظ الداتا عشان ينسحب الدرج بنعومة لما يسكّر

  // تفعيل البورتال
  useEffect(() => {
    setMounted(true);
  }, []);

  // تحديث الداتا والطي
  useEffect(() => {
    if (event) setActiveEvent(event);
    if (isOpen) setIsExpanded(false);
  }, [event, isOpen]);

  // منع الريندر إذا لسا مش راكب على الـ DOM
  if (!mounted) return null;

  // الداتا الحالية (سواء فاتح أو قاعد بيسكر)
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

  const drawerVariants = {
    hidden: { x: '-100%' }, 
    visible: { x: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } },
    exit: { x: '-100%', transition: { type: 'tween', duration: 0.3 } }
  };

  const dummyLongDescription = `هذه الفعالية مصممة خصيصاً للشباب الطموح لتطوير مهاراتهم وبناء قدراتهم. ستحصل على فرصة للتعلم من خبراء متخصصين، وتوسيع شبكة علاقاتك، والمساهمة في بناء مجتمعك بشكل فعال. تتضمن الفعالية ورش عمل مكثفة في مجالات متعددة، منها التفكير النقدي، مهارات التواصل الفعال، والعمل الجماعي. سيتم تقديم دراسات حالة واقعية لمناقشتها وإيجاد حلول مبتكرة لها. بالإضافة إلى ذلك، ستتمكن من لقاء شخصيات قيادية وملهمة ستشاركك قصص نجاحها وتحدياتها. نهدف من خلال هذه الفرصة إلى صقل شخصيتك وتمكينك من أخذ دور ريادي في مجتمعك وصناعة تأثير حقيقي يدوم طويلاً.`;
  
  const descriptionToShow = currentEvent.description || dummyLongDescription;
  const isLongText = descriptionToShow.length > 150;

  // 🟢 المحتوى كامل بنحطه بمتغير عشان نطلعه بالـ Portal
  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 🟢 أعطيناهم أعلى طبقة z-[9998] عشان يغطوا كل شيء بالموقع */}
          <motion.div
            variants={backdropVariants}
            initial="hidden" animate="visible" exit="hidden"
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-gray-900/40"
          />

          <motion.div
            variants={drawerVariants}
            initial="hidden" animate="visible" exit="exit"
            dir="rtl"
            className="fixed top-0 left-0 bottom-0 z-[9999] w-full max-w-md md:max-w-lg bg-white shadow-2xl flex flex-col rounded-r-3xl overflow-hidden"
          >
             <div className="relative h-64 shrink-0 bg-gray-100">
                <img src={currentEvent.image} alt={currentEvent.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />
                
                <button 
                  onClick={onClose} 
                  className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 hover:scale-110 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-6 right-6 left-6 flex justify-between items-end">
                   <span className={`${pathwayColor} text-white text-xs font-black px-4 py-1.5 rounded-lg shadow-sm border border-white/20 backdrop-blur-sm`}>
                     {currentEvent.pathway}
                   </span>
                </div>
             </div>

             <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 leading-tight">
                  {currentEvent.title}
                </h2>

                <div className="grid grid-cols-2 gap-x-4 gap-y-6 mb-10 bg-[#F8FAFC] p-5 rounded-2xl border border-gray-100">
                   <div className="flex items-start gap-3">
                     <Calendar className="w-5 h-5 text-[#721F31] mt-0.5" />
                     <div>
                       <p className="text-[10px] text-gray-400 font-bold mb-1">التاريخ</p>
                       <p className="text-sm font-black text-gray-800">{currentEvent.date}</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-3">
                     <Clock className="w-5 h-5 text-[#721F31] mt-0.5" />
                     <div>
                       <p className="text-[10px] text-gray-400 font-bold mb-1">الوقت</p>
                       <p className="text-sm font-black text-gray-800">04:00 - 06:00 م</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-3">
                     <MapPin className="w-5 h-5 text-[#721F31] mt-0.5" />
                     <div>
                       <p className="text-[10px] text-gray-400 font-bold mb-1">الموقع</p>
                       <p className="text-sm font-black text-gray-800 leading-snug">{currentEvent.city} - {currentEvent.location || 'المركز الشبابي'}</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-3">
                     <Award className="w-5 h-5 text-[#C08F2D] mt-0.5" />
                     <div>
                       <p className="text-[10px] text-[#C08F2D] font-bold mb-1">المكافأة المكتسبة</p>
                       <p className="text-sm font-black text-[#C08F2D]">+{currentEvent.points} نقطة</p>
                     </div>
                   </div>
                </div>

                <div className="mb-10">
                  <h3 className="flex items-center gap-2 text-base font-black text-gray-900 mb-3">
                    <Info className="w-5 h-5 text-[#721F31]" /> عن الفرصة
                  </h3>
                  
                  <div className="relative">
                    <motion.div 
                      initial={false}
                      animate={{ height: !isLongText || isExpanded ? "auto" : "80px" }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 text-sm font-medium leading-relaxed pb-1">
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
                      className="mt-2 text-[#C08F2D] font-black text-xs flex items-center gap-1 hover:text-[#a67b25] transition-colors"
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
                  <h3 className="flex items-center gap-2 text-base font-black text-gray-900 mb-4">
                    <Users className="w-5 h-5 text-[#721F31]" /> الشروط والأهلية
                  </h3>
                  <div className="flex flex-col gap-2.5">
                    
                    <div className="flex items-center gap-3 bg-[#F8FAFC] border border-gray-100 p-3.5 rounded-xl">
                      <UserCheck className={`w-5 h-5 ${isAgeEligible ? 'text-[#C08F2D]' : 'text-[#721F31]'}`} />
                      <span className="text-sm font-bold text-gray-700 flex-1">العمر المطلوب: {currentEvent.ageRange || '18 - 24'} سنة</span>
                      {isAgeEligible ? (
                        <span className="text-[10px] bg-white border border-gray-200 text-gray-500 px-2.5 py-1 rounded-md font-black shadow-sm">مطابق</span>
                      ) : (
                        <span className="text-[10px] bg-[#721F31]/10 text-[#721F31] px-2.5 py-1 rounded-md font-black">غير مطابق</span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 bg-[#F8FAFC] border border-gray-100 p-3.5 rounded-xl">
                      <MapPin className={`w-5 h-5 ${isCityEligible ? 'text-[#C08F2D]' : 'text-[#721F31]'}`} />
                      <span className="text-sm font-bold text-gray-700 flex-1">متاح لسكان: محافظة {currentEvent.city}</span>
                      {isCityEligible ? (
                        <span className="text-[10px] bg-white border border-gray-200 text-gray-500 px-2.5 py-1 rounded-md font-black shadow-sm">مطابق</span>
                      ) : (
                        <span className="text-[10px] bg-[#721F31]/10 text-[#721F31] px-2.5 py-1 rounded-md font-black">غير مطابق</span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 bg-[#F8FAFC] border border-gray-100 p-3.5 rounded-xl">
                      {requiredPoints === 0 ? (
                        <>
                           <Unlock className="w-5 h-5 text-gray-400" />
                           <span className="text-sm font-bold text-gray-700 flex-1">مستوى النقاط المطلوب:</span>
                           <span className="text-[10px] bg-gray-200 text-gray-600 px-2.5 py-1 rounded-md font-black">متاح للجميع</span>
                        </>
                      ) : (
                        <>
                           <Lock className={`w-5 h-5 ${userPoints >= requiredPoints ? 'text-[#C08F2D]' : 'text-[#721F31]'}`} />
                           <span className="text-sm font-bold text-gray-700 flex-1">مستوى النقاط المطلوب: {requiredPoints} نقطة</span>
                           {userPoints >= requiredPoints ? (
                             <span className="text-[10px] bg-white border border-gray-200 text-gray-500 px-2.5 py-1 rounded-md font-black shadow-sm">مؤهل</span>
                           ) : (
                             <span className="text-[10px] bg-[#721F31]/10 text-[#721F31] px-2.5 py-1 rounded-md font-black">غير مؤهل</span>
                           )}
                        </>
                      )}
                    </div>

                  </div>
                </div>
             </div>

             <div className="border-t border-gray-100 p-6 bg-white shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.03)] relative z-10">
                {canRegister ? (
                  <button 
                    onClick={() => onRegister(currentEvent)}
                    className="w-full relative overflow-hidden group bg-[#721F31] hover:bg-[#5a1826] text-white rounded-2xl font-black text-sm py-4 flex items-center justify-center gap-3 transition-all shadow-xl hover:shadow-[0_10px_30px_rgba(114,31,49,0.3)] hover:-translate-y-0.5"
                  >
                    <ShieldCheck className="w-5 h-5 text-[#C08F2D]" />
                    <span>تسجيل الدخول عبر سند للمتابعة</span>
                  </button>
                ) : (
                  <button 
                    disabled
                    className="w-full bg-gray-100 text-gray-400 rounded-2xl font-black text-sm py-4 flex items-center justify-center gap-2 cursor-not-allowed border border-gray-200"
                  >
                    <Lock className="w-4 h-4" />
                    <span>{lockReason}</span>
                  </button>
                )}
             </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // 🟢 استخراج الكود للـ DOM الرئيسي باستخدام Portal
  return createPortal(drawerContent, document.body);
}