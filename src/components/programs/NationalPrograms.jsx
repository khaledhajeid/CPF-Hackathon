// src/components/programs/NationalPrograms.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpLeft, Briefcase, Target, Users, Code2, HeartHandshake, Lightbulb, GraduationCap, RefreshCcw } from 'lucide-react';

const nationalProgramsData = [
  { id: 1, title: 'جامعة الحسين التقنية', pathway: 'تعلّم', description: 'جامعة تقنية رائدة تهدف إلى تقديم تعليم عالي الجودة لتمكين الشباب الأردني في مجالات الهندسة وعلم الحاسوب.', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070', icon: GraduationCap },
  { id: 2, title: 'مركز التميز للريادة والابتكار', pathway: 'تعلّم', description: 'حاضنة للابتكار تهدف إلى دعم الأفكار الريادية للشباب وتحويلها إلى مشاريع ناجحة ومستدامة.', image: 'https://cpf.jo/wp-content/uploads/2024/01/The-Core-%E2%94%98a%E2%95%AA%E2%96%92%E2%94%98a%E2%95%AA%E2%96%93-%E2%95%AAo%E2%94%98a%E2%95%AA%C2%AC%E2%94%98a%E2%94%98e%E2%95%AA%E2%96%93-%E2%94%98a%E2%94%98a%E2%95%AA%E2%96%92%E2%94%98e%E2%95%AAo%E2%95%AA%E2%95%AA%E2%8C%90-%E2%94%98e%E2%95%AAo%E2%94%98a%E2%95%AAo%E2%95%AA%C2%BF%E2%95%AA%C2%AC%E2%94%98a%E2%95%AAo%E2%95%AA%E2%96%92_2.jpg', icon: Lightbulb },
  { id: 3, title: '42 عمّان و42 إربد', pathway: 'تعلّم', description: 'برنامج تدريبي مبتكر ومجاني لتعليم البرمجة يعتمد على التعلم النظير وبناء المشاريع السحابية بدون معلمين.', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071', icon: Code2 },
  { id: 4, title: 'كلية التدريب المهني المتقدم في الأردن', pathway: 'تعلّم', description: 'مؤسسة تعليمية توفر تدريباً مهنياً متقدماً يحاكي متطلبات سوق العمل الحديث والمهارات التقنية.', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070', icon: Briefcase },
  { id: 5, title: 'مساحة الصنّاع', pathway: 'تعلّم', description: 'مختبرات تصنيع رقمي تتيح للشباب الوصول إلى أحدث التقنيات لتحويل أفكارهم إلى نماذج أولية ومنتجات فعلية.', image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=2136', icon: Target },
  { id: 6, title: 'مبرمجو الأردن', pathway: 'تعلّم', description: 'مبادرة تسعى إلى محو الأمية الرقمية وبناء قدرات الشباب الأردني في مختلف لغات البرمجة الحديثة.', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070', icon: Code2 },
  { id: 10, title: 'برنامج القيادة للمدارس', pathway: 'قُد', description: 'برنامج مخصص لطلبة المدارس يهدف إلى غرس مفاهيم القيادة والتفكير النقدي منذ سن مبكرة.', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132', icon: Target },
  { id: 11, title: 'برنامج خطى الحسين', pathway: 'قُد', description: 'برنامج قيادي متقدم لبناء القدرات القيادية والوطنية للشباب ليصبحوا صناع التغيير في مجتمعاتهم.', image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2049', icon: Target },
  { id: 14, title: 'مركز الشباب العربي-الاردن', pathway: 'قُد', description: 'مركز إقليمي يمكّن الشباب الأردني من التواصل مع نظرائهم العرب لبناء قيادات مشتركة وتبادل الخبرات إقليمياً.', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070', icon: Users },
  { id: 12, title: 'نَحْنُ', pathway: 'اصنع الأثر', description: 'المنصة الوطنية لتطوع ومشاركة الشباب، تهدف لتوحيد جهود العمل التطوعي وتوثيقها بشكل رسمي.', image: 'https://nahno-new.s3.eu-west-3.amazonaws.com/page/cover-20201115-134457.png', icon: Users },
  { id: 13, title: 'الاستجابات الإنسانية', pathway: 'اصنع الأثر', description: 'تنظيم وتوجيه طاقات الشباب لدعم الحملات الإنسانية والتدخلات العاجلة محلياً وإقليمياً.', image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070', icon: HeartHandshake },
];

export default function NationalPrograms({ onNavigate, setActiveProgramName }) {
  const [activeProgramFilter, setActiveProgramFilter] = useState('الكل');
  const [flippedCardId, setFlippedCardId] = useState(null);
  
  const categories = ['الكل', 'تعلّم', 'قُد', 'اصنع الأثر'];

  const filteredPrograms = activeProgramFilter === 'الكل' 
    ? nationalProgramsData 
    : nationalProgramsData.filter(p => p.pathway === activeProgramFilter);

  const handleProgramClick = (programName) => {
    setActiveProgramName(programName);
    onNavigate('program_details');
    window.scrollTo(0, 0);
  };

  const handleCardInteraction = (program) => {
    if (window.innerWidth < 1024) {
      setFlippedCardId(flippedCardId === program.id ? null : program.id);
    } else {
      handleProgramClick(program.title);
    }
  };

  const getPathwayStyle = (pathway) => {
    switch (pathway) {
      case 'تعلّم': return '#a00023';
      case 'قُد': return '#2b307e';
      case 'اصنع الأثر': return '#1f5412';
      default: return '#C08F2D';
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} dir="rtl">
      
      <div className="flex flex-wrap gap-[clamp(0.5rem,1vw,0.75rem)] w-full mb-[clamp(1.5rem,3vw,3rem)] justify-start lg:justify-center overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(category => {
          const isActive = activeProgramFilter === category;
          return (
            <button
              key={category} 
              onClick={() => setActiveProgramFilter(category)}
              className={`px-[clamp(1.25rem,2vw,2rem)] py-[clamp(0.6rem,1vw,0.75rem)] rounded-full font-bold text-[clamp(0.75rem,1.2vw,0.875rem)] transition-all duration-300 whitespace-nowrap border-2 cursor-pointer shrink-0
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

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,2vw,2.5rem)]">
        <AnimatePresence>
          {filteredPrograms.map((program, index) => {
            const PathwayIcon = program.icon;
            const isFlipped = flippedCardId === program.id;
            
            const pathwayColor = getPathwayStyle(program.pathway);
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={program.id}
                onClick={() => handleCardInteraction(program)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardInteraction(program); } }}
                tabIndex={0}
                role="button"
                aria-label={program.title}
                // 🟢 تصغير ارتفاع الكرت على الموبايل من 320px إلى 280px
                className="group [perspective:1500px] h-[clamp(280px,40vh,420px)] w-full cursor-pointer rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C08F2D] focus-visible:ring-offset-2"
              >
                <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] lg:group-hover:[transform:rotateY(-180deg)] lg:group-focus-within:[transform:rotateY(-180deg)] ${isFlipped ? '[transform:rotateY(-180deg)]' : ''} rounded-3xl shadow-lg hover:shadow-2xl`}>

                  {/* الوجه الأمامي */}
                  <div className="absolute inset-0 [backface-visibility:hidden] rounded-[clamp(1.25rem,2vw,1.5rem)] overflow-hidden border border-gray-200 bg-gray-50">
                    <img
                      src={program.image} alt={program.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 lg:group-hover:scale-110 lg:group-focus-within:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a070b]/95 via-[#1a070b]/40 to-transparent"></div>
                    
                    <div className="absolute top-4 left-4 lg:hidden bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10 animate-pulse">
                      <RefreshCcw className="w-3.5 h-3.5 text-white" />
                      <span className="text-[9px] text-white font-bold">اضغط للتفاصيل</span>
                    </div>

                    {/* 🟢 تصغير البادينغ الداخلي ليناسب الحجم الجديد */}
                    <div className="absolute inset-0 p-[clamp(1rem,2.5vw,2rem)] flex flex-col justify-end">
                      <div className="w-[clamp(3rem,4.5vw,4rem)] h-[clamp(3rem,4.5vw,4rem)] bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center p-[clamp(0.5rem,1vw,0.75rem)] mb-[clamp(0.75rem,2vw,1.5rem)] border border-white/20 shadow-xl">
                        <PathwayIcon className="w-[clamp(1.25rem,2.5vw,2rem)] h-[clamp(1.25rem,2.5vw,2rem)] text-white drop-shadow-md" />
                      </div>
                      <span style={{ color: pathwayColor }} className="font-black text-[clamp(0.65rem,1vw,0.875rem)] mb-[clamp(0.2rem,0.5vw,0.5rem)] drop-shadow-md">
                        {program.pathway}
                      </span>
                      {/* 🟢 تصغير خط العنوان الرئيسي */}
                      <h3 className="font-black text-white text-[clamp(1.15rem,2.5vw,1.875rem)] leading-tight drop-shadow-lg">
                        {program.title}
                      </h3>
                    </div>
                  </div>

                  {/* الوجه الخلفي */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-[#8a1538] via-[#521623] to-[#3b1019] rounded-[clamp(1.25rem,2vw,1.5rem)] p-[clamp(1rem,2.5vw,2rem)] flex flex-col justify-between border border-[#C08F2D]/30 shadow-inner">
                    
                    <div className="flex justify-between items-start mb-[clamp(0.75rem,2vw,1.5rem)]">
                      <div className="w-[clamp(2.25rem,3.5vw,3.5rem)] h-[clamp(2.25rem,3.5vw,3.5rem)] bg-white/5 rounded-xl flex items-center justify-center border border-white/10 backdrop-blur-sm">
                         <PathwayIcon className="w-[clamp(1rem,1.5vw,1.5rem)] h-[clamp(1rem,1.5vw,1.5rem)] text-white opacity-80" />
                      </div>
                      <span style={{ backgroundColor: pathwayColor, borderColor: pathwayColor }} className="px-[clamp(0.6rem,1.2vw,1rem)] py-[clamp(0.2rem,0.5vw,0.375rem)] text-white border rounded-full text-[clamp(0.55rem,0.8vw,0.75rem)] font-bold backdrop-blur-sm">
                        {program.pathway}
                      </span>
                    </div>

                    <div className="flex-grow">
                      {/* 🟢 تصغير خط العنوان في الوجه الخلفي */}
                      <h3 className="font-black text-[#C08F2D] text-[clamp(1rem,1.8vw,1.5rem)] mb-[clamp(0.35rem,1vw,1rem)]">{program.title}</h3>
                      {/* 🟢 تصغير خط الوصف ليناسب مساحة الموبايل */}
                      <p className="text-white/90 text-[clamp(0.75rem,1.1vw,1rem)] font-medium leading-relaxed line-clamp-5 lg:line-clamp-4 2xl:line-clamp-none">
                        {program.description}
                      </p>
                    </div>

                    <button 
                      onClick={(e) => { e.stopPropagation(); handleProgramClick(program.title); }}
                      className="flex items-center justify-between group/btn w-full px-[clamp(0.85rem,1.5vw,1.5rem)] py-[clamp(0.65rem,1vw,1rem)] bg-[#C08F2D] hover:bg-[#a67b25] transition-colors rounded-xl mt-[clamp(0.75rem,1.5vw,1.5rem)] cursor-pointer relative z-20"
                    >
                      {/* 🟢 تصغير خط الزر */}
                      <span className="text-white font-black text-[clamp(0.75rem,1.1vw,1.125rem)]">التفاصيل والتقديم</span>
                      <ArrowUpLeft className="w-[clamp(0.85rem,1.25vw,1.25rem)] h-[clamp(0.85rem,1.25vw,1.25rem)] text-white transform group-hover/btn:-translate-x-1 group-hover/btn:-translate-y-1 transition-transform" strokeWidth={2.5} />
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