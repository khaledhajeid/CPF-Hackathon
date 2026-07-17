// src/components/home/EcosystemPrograms.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpLeft, ArrowLeft, RefreshCcw } from 'lucide-react'; 

export default function EcosystemPrograms({ onNavigate, setActiveProgramName }) {
  const [flippedCardId, setFlippedCardId] = useState(null);
  
  const featuredPrograms = [
    { 
      id: 1, name: 'جامعة الحسين التقنية', category: 'التعليم التقني', 
      desc: 'جامعة تطبيقية تهدف لتعزيز التعليم التقني وتخريج جيل جاهز لسوق العمل بمعايير عالمية تلامس احتياجات المستقبل.', 
      logo: '/HTU.png', bgImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000'
    },
    { 
      id: 2, name: '42 عمّان', category: 'التعليم التقني', 
      desc: 'مدرسة برمجة مجانية مبتكرة تعتمد على التعلم الذاتي وبدون معلمين، تخرج أمهر المبرمجين وتضعهم على طريق الريادة العالمية.', 
      logo: '/42Amman.png', bgImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000'
    },
    { 
      id: 3, name: 'منصة نَحْنُ', category: 'التطوع والمجتمع', 
      desc: 'المنصة الوطنية للتطوع ومشاركة الشباب، تربط المتطوعين بفرص حقيقية تخدم مجتمعاتهم وتصنع أثراً ملموساً.', 
      logo: '/Nahno.png', bgImage: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1000'
    }
  ];

  const handleProgramClick = (programName) => {
    if (setActiveProgramName) setActiveProgramName(programName);
    if (onNavigate) onNavigate('program_details');
    window.scrollTo(0, 0);
  };

  const handleCardInteraction = (program) => {
    if (window.innerWidth < 768) {
      setFlippedCardId(flippedCardId === program.id ? null : program.id);
    } else {
      handleProgramClick(program.name);
    }
  };

  return (
    <div className="py-16 lg:py-20 xl:py-28 2xl:py-32 bg-[#fcfcfc] relative font-sans overflow-hidden" dir="rtl">
      <div className="absolute top-0 left-0 right-0 h-64 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '300px' }}></div>

      <div className="max-w-[1500px] mx-auto px-0 md:px-6 xl:px-10 relative z-10">
        
        {/* 🟢 الهيدر محمي بـ px-4 للموبايل */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 lg:mb-12 xl:mb-16 gap-6 px-4 md:px-0">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black text-[#8a1538] tracking-tight mb-3 md:mb-4">أبرز <span className="text-[#C08F2D]">برامجنا</span></h2>
            <p className="text-[#4c4c4c] font-medium max-w-2xl text-sm lg:text-base xl:text-xl 2xl:text-2xl leading-relaxed">منظومة متكاملة من البرامج صُممت خصيصاً لتمكينك، تطوير مهاراتك، وإطلاق العنان لطموحك.</p>
          </div>
           <button onClick={() => onNavigate && onNavigate('programs')} className="group hidden md:flex items-center gap-3 bg-white hover:bg-[#F8FAFC] border-2 border-gray-200 hover:border-[#8a1538] px-6 lg:px-6 xl:px-8 2xl:px-10 py-3 lg:py-3 xl:py-4 2xl:py-5 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer shrink-0">
             <span className="text-[#8a1538] font-black text-sm lg:text-base xl:text-xl 2xl:text-2xl">تصفح جميع البرامج</span>
             <ArrowLeft className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8 text-[#C08F2D] transform group-hover:-translate-x-2 transition-transform duration-300" strokeWidth={3.5} />
           </button>
        </div>

        {/* 🟢 السر هنا للموبايل: -mx-4 عشان الكروت تلزق بالحفة وقت السحب، و px-4 عشان أول كرت يبدأ من جوا، و w-[280px] عشان يبين الكرت اللي جنبه! */}
        <div className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-6 xl:gap-8 2xl:gap-12 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {featuredPrograms.map((program, index) => {
            const isFlipped = flippedCardId === program.id;

            return (
              <motion.div
                // 🟢 أنيميشن خفيف جداً، بيشتغل لما يبين 10% من الكرت (amount: 0.1) عشان ما يعلّق السحب عالموبايل
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, amount: 0.1 }} 
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={program.id}
                onClick={() => handleCardInteraction(program)} 
                // 🟢 عرض الكرت عالموبايل 280px، هاد المقاس المثالي ليظهر 20% من الكرت التالي كـ Hint للسحب
                className="group [perspective:1500px] h-[360px] lg:h-[360px] xl:h-[420px] 2xl:h-[480px] w-[280px] sm:w-[320px] md:w-full shrink-0 snap-center cursor-pointer"
              >
                <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] md:group-hover:[transform:rotateY(-180deg)] ${isFlipped ? '[transform:rotateY(-180deg)]' : ''} rounded-3xl shadow-md hover:shadow-2xl`}>
                  
                  {/* الوجه الأمامي */}
                  <div className="absolute inset-0 [backface-visibility:hidden] rounded-3xl overflow-hidden border border-gray-200 bg-black">
                    <img src={program.bgImage} alt={program.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a070b]/95 via-[#1a070b]/50 to-transparent"></div>
                    
                    <div className="absolute top-4 left-4 md:hidden bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10 animate-pulse">
                      <RefreshCcw className="w-3.5 h-3.5 text-white" />
                      <span className="text-[10px] text-white font-bold">اضغط للتفاصيل</span>
                    </div>

                    <div className="absolute inset-0 p-6 lg:p-6 xl:p-8 2xl:p-10 flex flex-col justify-end">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-32 2xl:h-32 bg-white/10 backdrop-blur-sm rounded-xl lg:rounded-2xl flex items-center justify-center p-2 lg:p-3 mb-4 xl:mb-6 2xl:mb-8 border border-white/20 shadow-xl">
                        <img src={program.logo} alt={program.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <span className="text-[#C08F2D] font-black text-[11px] lg:text-xs xl:text-sm 2xl:text-base mb-1 xl:mb-2">{program.category}</span>
                      <h3 className="font-black text-white text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl leading-tight">{program.name}</h3>
                    </div>
                  </div>

                  {/* الوجه الخلفي */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-[#8a1538] via-[#521623] to-[#1a0409] rounded-3xl p-6 lg:p-6 xl:p-8 2xl:p-10 flex flex-col justify-between border border-[#C08F2D]/30 shadow-inner">
                    <div className="flex justify-between items-start mb-4 xl:mb-6">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 bg-white/5 rounded-xl p-2 flex items-center justify-center border border-white/10">
                        <img src={program.logo} alt="" className="max-w-full max-h-full object-contain opacity-90" />
                      </div>
                      <span className="px-3 py-1 2xl:px-4 2xl:py-1.5 bg-white/10 text-white border border-white/20 rounded-full text-[10px] lg:text-[11px] xl:text-xs 2xl:text-sm font-bold">{program.category}</span>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-black text-[#C08F2D] text-lg lg:text-xl xl:text-2xl 2xl:text-3xl mb-2 xl:mb-4">{program.name}</h3>
                      <p className="text-white/90 text-[13px] lg:text-sm xl:text-base 2xl:text-xl font-medium leading-relaxed line-clamp-4 lg:line-clamp-4 xl:line-clamp-none">{program.desc}</p>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleProgramClick(program.name); }}
                      className="flex items-center justify-between group/btn w-full px-4 lg:px-5 xl:px-6 py-3 lg:py-3.5 xl:py-4 bg-[#C08F2D] hover:bg-[#a67b25] transition-colors rounded-xl mt-4 xl:mt-6 cursor-pointer relative z-20"
                    >
                      <span className="text-white font-black text-sm lg:text-base xl:text-lg 2xl:text-2xl">عرض التفاصيل</span>
                      <ArrowUpLeft className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8 text-white transform group-hover/btn:-translate-x-1 group-hover/btn:-translate-y-1 transition-transform" strokeWidth={2.5} />
                    </button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 🟢 زر الموبايل محمي بـ px-4 */}
        <div className="mt-8 flex justify-center md:hidden px-4">
          <button onClick={() => onNavigate && onNavigate('programs')} className="flex items-center gap-3 px-6 py-3.5 bg-transparent border-2 border-[#8a1538] text-[#8a1538] hover:bg-[#8a1538] hover:text-white rounded-xl font-black text-[14px] transition-all w-full justify-center group cursor-pointer shadow-sm">
            <span>تصفح جميع البرامج</span>
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-2 transition-transform duration-300" strokeWidth={2.5} />
          </button>
        </div>

      </div>
    </div>
  );
}