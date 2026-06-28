// src/components/programs/NationalPrograms.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpLeft, Briefcase, Target, Users, Code2, HeartHandshake, Lightbulb, GraduationCap, Globe, Activity } from 'lucide-react';

const nationalProgramsData = [
  { id: 1, title: 'جامعة الحسين التقنية', pathway: 'المشاركة الاقتصادية', description: 'جامعة تقنية رائدة تهدف إلى تقديم تعليم عالي الجودة لتمكين الشباب الأردني في مجالات الهندسة وعلم الحاسوب.', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070', icon: GraduationCap },
  { id: 2, title: 'مركز التميز للريادة والابتكار', pathway: 'المشاركة الاقتصادية', description: 'حاضنة للابتكار تهدف إلى دعم الأفكار الريادية للشباب وتحويلها إلى مشاريع ناجحة ومستدامة.', image: 'https://cpf.jo/wp-content/uploads/2024/01/The-Core-%E2%94%98a%E2%95%AA%E2%96%92%E2%94%98a%E2%95%AA%E2%96%93-%E2%95%AAo%E2%94%98a%E2%95%AA%C2%AC%E2%94%98a%E2%94%98e%E2%95%AA%E2%96%93-%E2%94%98a%E2%94%98a%E2%95%AA%E2%96%92%E2%94%98e%E2%95%AAo%E2%95%AA%E2%95%AA%E2%8C%90-%E2%94%98e%E2%95%AAo%E2%94%98a%E2%95%AAo%E2%95%AA%C2%BF%E2%95%AA%C2%AC%E2%94%98a%E2%95%AAo%E2%95%AA%E2%96%92_2.jpg', icon: Lightbulb },
  { id: 3, title: '42 عمّان و42 إربد', pathway: 'المشاركة الاقتصادية', description: 'برنامج تدريبي مبتكر ومجاني لتعليم البرمجة يعتمد على التعلم النظير وبناء المشاريع السحابية بدون معلمين.', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071', icon: Code2 },
  { id: 4, title: 'كلية التدريب المهني المتقدم في الأردن', pathway: 'المشاركة الاقتصادية', description: 'مؤسسة تعليمية توفر تدريباً مهنياً متقدماً يحاكي متطلبات سوق العمل الحديث والمهارات التقنية.', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070', icon: Briefcase },
  { id: 5, title: 'مساحة الصنّاع', pathway: 'المشاركة الاقتصادية', description: 'مختبرات تصنيع رقمي تتيح للشباب الوصول إلى أحدث التقنيات لتحويل أفكارهم إلى نماذج أولية ومنتجات فعلية.', image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=2136', icon: Target },
  { id: 6, title: 'مبرمجو الأردن', pathway: 'المشاركة الاقتصادية', description: 'مبادرة تسعى إلى محو الأمية الرقمية وبناء قدرات الشباب الأردني في مختلف لغات البرمجة الحديثة.', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070', icon: Code2 },
  { id: 7, title: 'منصة التّعلم الرقمي', pathway: 'المشاركة الاقتصادية', description: 'منصة تعليمية إلكترونية تقدم مساقات ودورات متخصصة لدعم التعلم المستمر للشباب.', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974', icon: GraduationCap },
  { id: 8, title: 'برنامج التدريب الدّولي', pathway: 'المشاركة الاقتصادية', description: 'يوفر فرص تدريب للشباب الأردني في كبرى الشركات والمؤسسات العالمية لصقل مهاراتهم القيادية.', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084', icon: Briefcase },
  { id: 9, title: 'مبادرة قصي', pathway: 'المشاركة الاقتصادية', description: 'مبادرة تعنى بالقطاع الرياضي، وتهدف لرفع جاهزية المعالجين الرياضيين وتأهيلهم للتعامل مع الحوادث.', image: 'https://images.unsplash.com/photo-1576267423048-15c0040fec78?q=80&w=2070', icon: Activity },
  { id: 10, title: 'برنامج القيادة للمدارس', pathway: 'القيادة', description: 'برنامج مخصص لطلبة المدارس يهدف إلى غرس مفاهيم القيادة والتفكير النقدي منذ سن مبكرة.', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132', icon: Target },
  { id: 11, title: 'برنامج خطى الحسين', pathway: 'القيادة', description: 'برنامج قيادي متقدم لبناء القدرات القيادية والوطنية للشباب ليصبحوا صناع التغيير في مجتمعاتهم.', image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2049', icon: Target },
  { id: 12, title: 'نَحْنُ', pathway: 'التنمية المجتمعية', description: 'المنصة الوطنية لتطوع ومشاركة الشباب، تهدف لتوحيد جهود العمل التطوعي وتوثيقها بشكل رسمي.', image: 'https://nahno-new.s3.eu-west-3.amazonaws.com/page/cover-20201115-134457.png', icon: Users },
  { id: 13, title: 'الاستجابات الإنسانية', pathway: 'التنمية المجتمعية', description: 'تنظيم وتوجيه طاقات الشباب لدعم الحملات الإنسانية والتدخلات العاجلة محلياً وإقليمياً.', image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070', icon: HeartHandshake },
];

export default function NationalPrograms({ onNavigate, setActiveProgramName }) {
  const [activeProgramFilter, setActiveProgramFilter] = useState('الكل');
  const categories = ['الكل', 'المشاركة الاقتصادية', 'القيادة', 'التنمية المجتمعية'];

  const filteredPrograms = activeProgramFilter === 'الكل' 
    ? nationalProgramsData 
    : nationalProgramsData.filter(p => p.pathway === activeProgramFilter);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
      
      {/* 🟢 شريط الفلاتر بتصميم متقدم (Premium Tabs) */}
      <div className="flex flex-wrap gap-3 w-full mb-12 justify-start lg:justify-center">
        {categories.map(category => {
          const isActive = activeProgramFilter === category;
          return (
            <button
              key={category} 
              onClick={() => setActiveProgramFilter(category)}
              className={`px-6 md:px-8 py-3 rounded-full font-bold text-[13px] md:text-sm transition-all duration-300 whitespace-nowrap border-2 cursor-pointer 
                ${isActive 
                  ? 'bg-[#721F31] text-white border-[#721F31] shadow-xl shadow-[#721F31]/20 scale-105' 
                  : 'bg-white text-gray-500 border-gray-100 hover:border-[#C08F2D] hover:text-[#721F31]'
                }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* 🟢 شبكة الكروت (3D Flip Cards) */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        <AnimatePresence>
          {filteredPrograms.map((program, index) => {
            const PathwayIcon = program.icon;
            
            return (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={program.id} 
                onClick={() => { setActiveProgramName(program.title); onNavigate('program_details'); }}
                // 🟢 إعدادات المنظور (Perspective) لحركة الـ 3D
                className="group [perspective:1500px] h-[400px] md:h-[420px] w-full cursor-pointer"
              >
                {/* 🟢 الحاوية الداخلية اللي بتلف */}
                <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-3xl shadow-lg hover:shadow-2xl">
                  
                  {/* ================= الوجه الأمامي (الصورة والزجاج) ================= */}
                  <div className="absolute inset-0 [backface-visibility:hidden] rounded-3xl overflow-hidden border border-gray-200 bg-gray-50">
                    <img 
                      src={program.image} 
                      alt={program.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    {/* طبقة تعتيم متدرجة */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a070b]/95 via-[#1a070b]/40 to-transparent"></div>
                    
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      {/* أيقونة المسار داخل صندوق زجاجي فخم */}
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center p-3 mb-6 border border-white/20 shadow-xl">
                        <PathwayIcon className="w-8 h-8 text-white drop-shadow-md" />
                      </div>
                      
                      <span className="text-[#C08F2D] font-black text-sm mb-2 drop-shadow-md">
                        {program.pathway}
                      </span>
                      <h3 className="font-black text-white text-2xl md:text-3xl leading-tight drop-shadow-lg">
                        {program.title}
                      </h3>
                    </div>
                  </div>

                  {/* ================= الوجه الخلفي (الوصف والزر - هُوية عنابية موحدة) ================= */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-[#721F31] via-[#521623] to-[#3b1019] rounded-3xl p-8 flex flex-col justify-between border border-[#C08F2D]/30 shadow-inner">
                    
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 backdrop-blur-sm">
                         <PathwayIcon className="w-6 h-6 text-white opacity-80" />
                      </div>
                      <span className="px-4 py-1.5 bg-white/10 text-white border border-white/20 rounded-full text-xs font-bold backdrop-blur-sm">
                        {program.pathway}
                      </span>
                    </div>

                    <div className="flex-grow">
                      <h3 className="font-black text-[#C08F2D] text-2xl mb-4">{program.title}</h3>
                      <p className="text-white/90 text-base font-medium leading-relaxed">
                        {program.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between group/btn w-full px-6 py-4 bg-[#C08F2D] hover:bg-[#a67b25] transition-colors rounded-xl mt-6">
                      <span className="text-white font-black text-base md:text-lg">التفاصيل والتقديم</span>
                      <ArrowUpLeft className="w-6 h-6 text-white transform group-hover/btn:-translate-x-1 group-hover/btn:-translate-y-1 transition-transform" strokeWidth={2.5} />
                    </div>

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