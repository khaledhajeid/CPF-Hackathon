// src/components/home/EcosystemPrograms.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpLeft, ArrowLeft } from 'lucide-react';

// 🟢 أضفنا onNavigate كـ Prop عشان نقدر نوجه المستخدم بسلاسة داخل التطبيق
export default function EcosystemPrograms({ onNavigate }) {
  
  const featuredPrograms = [
    { 
      id: 1, 
      name: 'جامعة الحسين التقنية', 
      category: 'التعليم التقني', 
      desc: 'جامعة تطبيقية تهدف لتعزيز التعليم التقني وتخريج جيل جاهز لسوق العمل بمعايير عالمية تلامس احتياجات المستقبل.', 
      logo: '/HTU.png', 
      bgImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000', 
      link: 'https://htu.edu.jo/ar' 
    },
    { 
      id: 2, 
      name: '42 عمّان', 
      category: 'التعليم التقني', 
      desc: 'مدرسة برمجة مجانية مبتكرة تعتمد على التعلم الذاتي وبدون معلمين، تخرج أمهر المبرمجين وتضعهم على طريق الريادة العالمية.', 
      logo: '/42Amman.png', 
      bgImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000', 
      link: 'https://42amman.com/' 
    },
    { 
      id: 3, 
      name: 'منصة نَحْنُ', 
      category: 'التطوع والمجتمع', 
      desc: 'المنصة الوطنية للتطوع ومشاركة الشباب، تربط المتطوعين بفرص حقيقية تخدم مجتمعاتهم وتصنع أثراً ملموساً في كافة المحافظات.', 
      logo: '/Nahno.png', 
      bgImage: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2000', 
      link: 'https://www.nahno.org/' 
    }
  ];

  return (
    <div className="py-24 md:py-32 bg-[#fcfcfc] relative font-sans overflow-hidden" dir="rtl">
      
      {/* خلفية النقش الفخمة */}
      <div className="absolute top-0 left-0 right-0 h-64 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '300px' }}></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* =========================================
            الترويسة (تم تعديل زر تصفح جميع البرامج هنا)
            ========================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/arrow-yellow.svg" className="w-8 h-8 shrink-0" alt="" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#721F31] tracking-tight">
                أبرز <span className="text-[#C08F2D]">برامجنا</span>
              </h2>
            </div>
            <p className="text-[#4c4c4c] font-medium max-w-2xl text-lg md:text-2xl   leading-relaxed">
              منظومة متكاملة من البرامج صُممت خصيصاً لتمكينك، تطوير مهاراتك، وإطلاق العنان لطموحك.
            </p>
          </div>
          
          {/* 🟢 الزر الجديد: حجم كبير، تفاعلي، وواضح جداً للعين */}
          <button 
            onClick={() => onNavigate && onNavigate('programs')}
            className="group hidden md:flex items-center gap-3 bg-white hover:bg-[#F8FAFC] border-2 border-gray-200 hover:border-[#8a1538] px-8 py-4 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer shrink-0"
          >
            <span className="text-[#721F31] font-black text-2xl">
              تصفح جميع البرامج
            </span>
            <ArrowLeft className="w-6 h-6 text-[#C08F2D] transform group-hover:-translate-x-2 transition-transform duration-300" strokeWidth={3.5} />
          </button>

        </div>

        {/* شبكة الكروت */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {featuredPrograms.map((program, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              key={program.id}
              className="group [perspective:1500px] h-[400px] md:h-[420px] w-full cursor-pointer"
            >
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(-180deg)] rounded-3xl shadow-lg hover:shadow-2xl">
                
                {/* الوجه الأمامي */}
                <div className="absolute inset-0 [backface-visibility:hidden] rounded-3xl overflow-hidden border border-gray-200">
                  <img src={program.bgImage} alt={program.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a070b]/90 via-[#1a070b]/40 to-transparent"></div>
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="w-28 h-28 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center p-3 mb-6 border border-white/20 shadow-xl">
                      <img src={program.logo} alt={program.name} className="max-w-full max-h-full object-contain" />
                    </div>
                    
                    <span className="text-[#C08F2D] font-black text-sm mb-2 drop-shadow-md">
                      {program.category}
                    </span>
                    <h3 className="font-black text-white text-3xl leading-tight drop-shadow-lg">
                      {program.name}
                    </h3>
                  </div>
                </div>

                {/* الوجه الخلفي */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-[#721F31] via-[#521623] to-[#3b1019] rounded-3xl p-8 flex flex-col justify-between border border-[#C08F2D]/30 shadow-inner">
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-20 h-20 bg-white/10 rounded-xl p-2 backdrop-blur-sm flex items-center justify-center border border-white/10">
                      <img src={program.logo} alt="" className="max-w-full max-h-full object-contain opacity-90" />
                    </div>
                    <span className="px-4 py-1.5 bg-white/10 text-white border border-white/20 rounded-full text-xs font-bold backdrop-blur-sm">
                      {program.category}
                    </span>
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-black text-[#C08F2D] text-2xl mb-4">{program.name}</h3>
                    <p className="text-white/90 text-base md:text-lg font-medium leading-relaxed">
                      {program.desc}
                    </p>
                  </div>

                  <a 
                    href={program.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group/btn w-full px-6 py-4 bg-[#C08F2D] hover:bg-[#a67b25] transition-colors rounded-xl mt-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-white font-black text-lg">زيارة المنصة</span>
                    <ArrowUpLeft className="w-6 h-6 text-white transform group-hover/btn:-translate-x-1 group-hover/btn:-translate-y-1 transition-transform" strokeWidth={2.5} />
                  </a>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* 🟢 زر التصفح يظهر للموبايل بالأسفل (تم تكبير الخط هنا أيضاً) */}
        <div className="mt-12 flex justify-center md:hidden">
          <button 
            onClick={() => onNavigate && onNavigate('programs')} 
            className="flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-[#721F31] text-[#721F31] hover:bg-[#721F31] hover:text-white rounded-2xl font-black text-lg transition-all w-full justify-center group"
          >
            <span>تصفح جميع البرامج</span>
            <ArrowLeft className="w-6 h-6 transform group-hover:-translate-x-2 transition-transform duration-300" strokeWidth={2.5} />
          </button>
        </div>

      </div>
    </div>
  );
}