// src/components/programs/NationalPrograms.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpLeft, Briefcase, Target, Users, Code2, HeartHandshake, Lightbulb, GraduationCap, RefreshCcw } from 'lucide-react';

const nationalProgramsData = [
  { id: 1, title: 'جامعة الحسين التقنية', pathway: 'تعلّم', description: 'جامعة تقنية رائدة تهدف إلى تقديم تعليم عالي الجودة لتمكين الشباب الأردني في مجالات الهندسة وعلم الحاسوب.', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070', icon: GraduationCap },
  { id: 2, title: 'مركز التميز للريادة والابتكار', pathway: 'تعلّم', description: 'حاضنة للابتكار تهدف إلى دعم الأفكار الريادية للشباب وتحويلها إلى مشاريع ناجحة ومستدامة.', image: 'https://cpf.jo/wp-content/uploads/2024/01/The-Core-%E2%94%98a%E2%95%AA%E2%96%92%E2%94%98a%E2%95%AA%E2%96%93-%E2%95%AAo%E2%94%98a%E2%95%AA%C2%AC%E2%94%98a%E2%94%98e%E2%95%AA%E2%96%93-%E2%94%98a%E2%94%98a%E2%95%AA%E2%96%92%E2%94%98e%E2%95%AAo%E2%95%AA%E2%95%AA%E2%8C%90-%E2%94%98e%E2%95%AAo%E2%94%98a%E2%95%AAo%E2%95%AA%C2%BF%E2%95%AA%C2%AC%E2%94%98a%E2%95%AAo%E2%95%AA%E2%96%92_2.jpg', icon: Lightbulb },
  { id: 3, title: '42 عمّان و42 إربد', pathway: 'تعلّم', description: 'برنامج تدريبي مبتكر ومجاني لتعليم البرمجة يعتمد على التعلم النظير وبناء المشاريع السحابية بدون معلمين.', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071', icon: Code2 },
  { id: 4, title: 'كلية التدريب المهني المتقدم في الأردن', pathway: 'تعلّم', description: 'مؤسسة تعليمية توفر تدريباً مهنياً متقدماً يحاكي متطلبات سوق العمل الحديث والمهارات التقنية.', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070', icon: Briefcase },
  { id: 5, title: 'مساحة الصنّاع', pathway: 'تعلّم', description: 'مختبرات تصنيع رقمي تتيح للشباب الوصول إلى أحدث التقنيات لتحويل أفكارهم إلى نماذج أولية ومنتجات فعلية.', image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=2136', icon: Target },
  { id: 6, title: 'مبرمجو الأردن', pathway: 'تعلّم', description: 'مبادرة تسعى إلى محو الأمية الرقمية وبناء قدرات الشباب الأردني في مختلف لغات البرمجة الحديثة.', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070', icon: Code2 },
  { id: 8, title: 'برنامج التدريب الدّولي', pathway: 'قُد', description: 'يوفر فرص تدريب للشباب الأردني في كبرى الشركات والمؤسسات العالمية لصقل مهاراتهم القيادية والعملية.', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084', icon: Briefcase },
  { id: 10, title: 'برنامج القيادة للمدارس (حقق)', pathway: 'قُد', description: 'برنامج مخصص لطلبة المدارس يهدف إلى غرس مفاهيم القيادة والتفكير النقدي منذ سن مبكرة.', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132', icon: Target },
  { id: 11, title: 'برنامج خطى الحسين', pathway: 'قُد', description: 'برنامج قيادي متقدم لبناء القدرات القيادية والوطنية للشباب ليصبحوا صناع التغيير في مجتمعاتهم.', image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2049', icon: Target },
  { id: 12, title: 'نَحْنُ', pathway: 'اصنع الأثر', description: 'المنصة الوطنية لتطوع ومشاركة الشباب، تهدف لتوحيد جهود العمل التطوعي وتوثيقها بشكل رسمي.', image: 'https://nahno-new.s3.eu-west-3.amazonaws.com/page/cover-20201115-134457.png', icon: Users },
  { id: 13, title: 'الاستجابات الإنسانية', pathway: 'اصنع الأثر', description: 'تنظيم وتوجيه طاقات الشباب لدعم الحملات الإنسانية والتدخلات العاجلة محلياً وإقليمياً.', image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070', icon: HeartHandshake },
];

export default function NationalPrograms({ onNavigate, setActiveProgramName }) {
  const [activeProgramFilter, setActiveProgramFilter] = useState('الكل');
  // 🟢 State لقلب الكرت على الموبايل
  const [flippedCardId, setFlippedCardId] = useState(null);
  
  const categories = ['الكل', 'تعلّم', 'قُد', 'اصنع الأثر'];

  const filteredPrograms = activeProgramFilter === 'الكل' 
    ? nationalProgramsData 
    : nationalProgramsData.filter(p => p.pathway === activeProgramFilter);

  // 🟢 توجيه داخلي للصفحة التفصيلية
  const handleProgramClick = (programName) => {
    setActiveProgramName(programName);
    onNavigate('program_details');
    window.scrollTo(0, 0);
  };

  // 🟢 التعامل مع الكرت حسب نوع الشاشة
  const handleCardInteraction = (program) => {
    if (window.innerWidth < 1024) {
      // عالموبايل والتابلت: اقلب الكرت
      setFlippedCardId(flippedCardId === program.id ? null : program.id);
    } else {
      // عالديسكتوب: الـ Hover شغال، فلما يكبس وديه للتفاصيل فوراً
      handleProgramClick(program.title);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
      
      {/* 🟢 الفلاتر */}
      <div className="flex flex-wrap gap-2 md:gap-3 w-full mb-8 md:mb-12 justify-start lg:justify-center overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(category => {
          const isActive = activeProgramFilter === category;
          return (
            <button
              key={category} 
              onClick={() => setActiveProgramFilter(category)}
              className={`px-5 md:px-8 py-2.5 md:py-3 rounded-full font-bold text-[13px] md:text-sm transition-all duration-300 whitespace-nowrap border-2 cursor-pointer shrink-0
                ${isActive 
                  ? 'bg-[#8a1538] text-white border-[#8a1538] shadow-xl shadow-[#8a1538]/20 scale-105' 
                  : 'bg-white text-gray-500 border-gray-100 hover:border-[#C08F2D] hover:text-[#8a1538]'
                }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
        <AnimatePresence>
          {filteredPrograms.map((program, index) => {
            const PathwayIcon = program.icon;
            const isFlipped = flippedCardId === program.id;
            
            return (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={program.id} 
                onClick={() => handleCardInteraction(program)}
                className="group [perspective:1500px] h-[380px] md:h-[420px] w-full cursor-pointer"
              >
                <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] lg:group-hover:[transform:rotateY(-180deg)] ${isFlipped ? '[transform:rotateY(-180deg)]' : ''} rounded-3xl shadow-lg hover:shadow-2xl`}>
                  
                  {/* الوجه الأمامي */}
                  <div className="absolute inset-0 [backface-visibility:hidden] rounded-3xl overflow-hidden border border-gray-200 bg-gray-50">
                    <img 
                      src={program.image} alt={program.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 lg:group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a070b]/95 via-[#1a070b]/40 to-transparent"></div>
                    
                    {/* 🟢 أيقونة اضغط للتفاصيل (موبايل فقط) */}
                    <div className="absolute top-4 left-4 lg:hidden bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10 animate-pulse">
                      <RefreshCcw className="w-3.5 h-3.5 text-white" />
                      <span className="text-[10px] text-white font-bold">اضغط للتفاصيل</span>
                    </div>

                    <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center p-3 mb-4 md:mb-6 border border-white/20 shadow-xl">
                        <PathwayIcon className="w-8 h-8 text-white drop-shadow-md" />
                      </div>
                      <span className="text-[#C08F2D] font-black text-xs md:text-sm mb-1 md:mb-2 drop-shadow-md">
                        {program.pathway}
                      </span>
                      <h3 className="font-black text-white text-2xl md:text-3xl leading-tight drop-shadow-lg">
                        {program.title}
                      </h3>
                    </div>
                  </div>

                  {/* الوجه الخلفي */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-[#8a1538] via-[#521623] to-[#3b1019] rounded-3xl p-6 md:p-8 flex flex-col justify-between border border-[#C08F2D]/30 shadow-inner">
                    
                    <div className="flex justify-between items-start mb-4 md:mb-6">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 backdrop-blur-sm">
                         <PathwayIcon className="w-5 h-5 md:w-6 md:h-6 text-white opacity-80" />
                      </div>
                      <span className="px-3 md:px-4 py-1.5 bg-white/10 text-white border border-white/20 rounded-full text-[10px] md:text-xs font-bold backdrop-blur-sm">
                        {program.pathway}
                      </span>
                    </div>

                    <div className="flex-grow">
                      <h3 className="font-black text-[#C08F2D] text-xl md:text-2xl mb-2 md:mb-4">{program.title}</h3>
                      <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed line-clamp-5 md:line-clamp-none">
                        {program.description}
                      </p>
                    </div>

                    {/* 🟢 زر التوجيه للتفاصيل الداخلية */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleProgramClick(program.title); }}
                      className="flex items-center justify-between group/btn w-full px-5 md:px-6 py-3.5 md:py-4 bg-[#C08F2D] hover:bg-[#a67b25] transition-colors rounded-xl mt-4 md:mt-6 cursor-pointer relative z-20"
                    >
                      <span className="text-white font-black text-sm md:text-lg">التفاصيل والتقديم</span>
                      <ArrowUpLeft className="w-5 h-5 md:w-6 md:h-6 text-white transform group-hover/btn:-translate-x-1 group-hover/btn:-translate-y-1 transition-transform" strokeWidth={2.5} />
                    </button>

                  </div>

                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

    </motion.div>
  );
}