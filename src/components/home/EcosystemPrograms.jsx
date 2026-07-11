// src/components/home/EcosystemPrograms.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpLeft, ArrowLeft, RefreshCcw } from 'lucide-react'; // 🟢 ضفنا أيقونة الدوران للموبايل

export default function EcosystemPrograms({ onNavigate, setActiveProgramName }) {
  // 🟢 State عشان نتبع أي كرت مقلوب حالياً على الموبايل
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
    // 🟢 إذا الشاشة موبايل، الكبسة على الكرت بتقلبه
    if (window.innerWidth < 768) {
      setFlippedCardId(flippedCardId === program.id ? null : program.id);
    } else {
      // 🟢 إذا الشاشة كمبيوتر، الكبسة بتودي للتفاصيل مباشرة (لأن الـ Hover شغال)
      handleProgramClick(program.name);
    }
  };

  return (
    <div className="py-20 md:py-24 lg:py-24 xl:py-32 bg-[#fcfcfc] relative font-sans overflow-hidden" dir="rtl">
      <div className="absolute top-0 left-0 right-0 h-64 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '300px' }}></div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 xl:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <img src="/arrow-yellow.svg" className="w-6 h-6 md:w-6 md:h-6 xl:w-8 xl:h-8 shrink-0" alt="" />
              <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-[clamp(2rem,3.5vw,3rem)] font-black text-[#8a1538] tracking-tight">أبرز <span className="text-[#C08F2D]">برامجنا</span></h2>
            </div>
            <p className="text-[#4c4c4c] font-medium max-w-2xl text-base md:text-lg xl:text-xl leading-relaxed">منظومة متكاملة من البرامج صُممت خصيصاً لتمكينك، تطوير مهاراتك، وإطلاق العنان لطموحك.</p>
          </div>
           <button onClick={() => onNavigate && onNavigate('programs')} className="group hidden md:flex items-center gap-3 bg-white hover:bg-[#F8FAFC] border-2 border-gray-200 hover:border-[#8a1538] px-6 py-3 xl:px-8 xl:py-4 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer shrink-0">
             <span className="text-[#8a1538] font-black text-base xl:text-xl">تصفح جميع البرامج</span>
             <ArrowLeft className="w-5 h-5 xl:w-6 xl:h-6 text-[#C08F2D] transform group-hover:-translate-x-2 transition-transform duration-300" strokeWidth={3.5} />
           </button>
        </div>

        <div className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 xl:gap-10 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {featuredPrograms.map((program, index) => {
            const isFlipped = flippedCardId === program.id;

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: index * 0.1 }}
                key={program.id}
                onClick={() => handleCardInteraction(program)} // 🟢 التوجيه حسب نوع الجهاز
                className="group [perspective:1500px] h-[380px] md:h-[400px] xl:h-[420px] w-[85vw] md:w-full shrink-0 snap-center cursor-pointer"
              >
                <div 
                  // 🟢 الديسكتوب بيعتمد على group-hover، والموبايل بيعتمد على الـ State
                  className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] md:group-hover:[transform:rotateY(-180deg)] ${isFlipped ? '[transform:rotateY(-180deg)]' : ''} rounded-3xl shadow-md hover:shadow-2xl`}
                >
                  
                  {/* الوجه الأمامي */}
                  <div className="absolute inset-0 [backface-visibility:hidden] rounded-3xl overflow-hidden border border-gray-200 bg-black">
                    <img src={program.bgImage} alt={program.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a070b]/95 via-[#1a070b]/50 to-transparent"></div>
                    
                    {/* 🟢 مؤشر بصري للموبايل عشان يعرف إنه بيقدر يكبس ويقلب الكرت */}
                    <div className="absolute top-4 left-4 md:hidden bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10 animate-pulse">
                      <RefreshCcw className="w-3.5 h-3.5 text-white" />
                      <span className="text-[10px] text-white font-bold">اضغط للتفاصيل</span>
                    </div>

                    <div className="absolute inset-0 p-6 md:p-7 xl:p-8 flex flex-col justify-end">
                      <div className="w-20 h-20 md:w-24 md:h-24 xl:w-28 xl:h-28 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center p-3 mb-4 md:mb-5 xl:mb-6 border border-white/20 shadow-xl">
                        <img src={program.logo} alt={program.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <span className="text-[#C08F2D] font-black text-xs md:text-sm mb-1 md:mb-2">{program.category}</span>
                      <h3 className="font-black text-white text-2xl md:text-2xl xl:text-3xl leading-tight">{program.name}</h3>
                    </div>
                  </div>

                  {/* الوجه الخلفي */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-[#8a1538] via-[#521623] to-[#1a0409] rounded-3xl p-6 md:p-7 xl:p-8 flex flex-col justify-between border border-[#C08F2D]/30 shadow-inner">
                    <div className="flex justify-between items-start mb-4 md:mb-5 xl:mb-6">
                      <div className="w-16 h-16 md:w-16 md:h-16 xl:w-20 xl:h-20 bg-white/5 rounded-xl p-2 flex items-center justify-center border border-white/10">
                        <img src={program.logo} alt="" className="max-w-full max-h-full object-contain opacity-90" />
                      </div>
                      <span className="px-3 py-1 bg-white/10 text-white border border-white/20 rounded-full text-[10px] md:text-xs font-bold">{program.category}</span>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-black text-[#C08F2D] text-xl md:text-xl xl:text-2xl mb-2 md:mb-3 xl:mb-4">{program.name}</h3>
                      <p className="text-white/90 text-sm md:text-sm xl:text-base font-medium leading-relaxed line-clamp-4 md:line-clamp-none">{program.desc}</p>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleProgramClick(program.name); }}
                      className="flex items-center justify-between group/btn w-full px-5 py-3 xl:py-3.5 bg-[#C08F2D] hover:bg-[#a67b25] transition-colors rounded-xl mt-4 md:mt-5 xl:mt-6 cursor-pointer relative z-20"
                    >
                      <span className="text-white font-black text-base xl:text-lg">عرض التفاصيل</span>
                      <ArrowUpLeft className="w-5 h-5 text-white transform group-hover/btn:-translate-x-1 group-hover/btn:-translate-y-1 transition-transform" strokeWidth={2.5} />
                    </button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center md:hidden px-2">
          <button onClick={() => onNavigate && onNavigate('programs')} className="flex items-center gap-3 px-6 py-3.5 bg-transparent border-2 border-[#8a1538] text-[#8a1538] hover:bg-[#8a1538] hover:text-white rounded-xl font-black text-base transition-all w-full justify-center group cursor-pointer">
            <span>تصفح جميع البرامج</span>
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-2 transition-transform duration-300" strokeWidth={2.5} />
          </button>
        </div>

      </div>
    </div>
  );
}