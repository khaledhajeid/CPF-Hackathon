// src/components/programs/NationalPrograms.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpLeft, Briefcase, Target, Users, Code2, HeartHandshake, Lightbulb, GraduationCap, Globe, Activity } from 'lucide-react';

const nationalProgramsData = [
  { id: 1, title: 'جامعة الحسين التقنية', pathway: 'المشاركة الاقتصادية', description: 'جامعة تقنية رائدة تهدف إلى تقديم تعليم عالي الجودة لتمكين الشباب الأردني في مجالات الهندسة وعلم الحاسوب.', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070', icon: GraduationCap, color: 'from-[#721F31] to-[#3b1019]' },
  { id: 2, title: 'مركز التميز للريادة والابتكار', pathway: 'المشاركة الاقتصادية', description: 'حاضنة للابتكار تهدف إلى دعم الأفكار الريادية للشباب وتحويلها إلى مشاريع ناجحة ومستدامة.', image: 'https://cpf.jo/wp-content/uploads/2024/01/The-Core-%E2%94%98a%E2%95%AA%E2%96%92%E2%94%98a%E2%95%AA%E2%96%93-%E2%95%AAo%E2%94%98a%E2%95%AA%C2%AC%E2%94%98a%E2%94%98e%E2%95%AA%E2%96%93-%E2%94%98a%E2%94%98a%E2%95%AA%E2%96%92%E2%94%98e%E2%95%AAo%E2%95%AA%E2%95%AA%E2%8C%90-%E2%94%98e%E2%95%AAo%E2%94%98a%E2%95%AAo%E2%95%AA%C2%BF%E2%95%AA%C2%AC%E2%94%98a%E2%95%AAo%E2%95%AA%E2%96%92_2.jpg', icon: Lightbulb, color: 'from-[#721F31] to-[#3b1019]' },
  { id: 3, title: '42 عمّان و42 إربد', pathway: 'المشاركة الاقتصادية', description: 'برنامج تدريبي مبتكر ومجاني لتعليم البرمجة يعتمد على التعلم النظير وبناء المشاريع السحابية بدون معلمين.', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071', icon: Code2, color: 'from-[#721F31] to-[#3b1019]' },
  { id: 4, title: 'كلية التدريب المهني المتقدم في الأردن', pathway: 'المشاركة الاقتصادية', description: 'مؤسسة تعليمية توفر تدريباً مهنياً متقدماً يحاكي متطلبات سوق العمل الحديث والمهارات التقنية.', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070', icon: Briefcase, color: 'from-[#721F31] to-[#3b1019]' },
  { id: 5, title: 'مساحة الصنّاع', pathway: 'المشاركة الاقتصادية', description: 'مختبرات تصنيع رقمي تتيح للشباب الوصول إلى أحدث التقنيات لتحويل أفكارهم إلى نماذج أولية ومنتجات فعلية.', image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=2136', icon: Target, color: 'from-[#721F31] to-[#3b1019]' },
  { id: 6, title: 'مبرمجو الأردن', pathway: 'المشاركة الاقتصادية', description: 'مبادرة تسعى إلى محو الأمية الرقمية وبناء قدرات الشباب الأردني في مختلف لغات البرمجة الحديثة.', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070', icon: Code2, color: 'from-[#721F31] to-[#3b1019]' },
  { id: 7, title: 'منصة التّعلم الرقمي لجامعة الحسين التقنية', pathway: 'المشاركة الاقتصادية', description: 'منصة تعليمية إلكترونية تقدم مساقات ودورات متخصصة لدعم التعلم المستمر للشباب.', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974', icon: GraduationCap, color: 'from-[#721F31] to-[#3b1019]' },
  { id: 8, title: 'برنامج التدريب الدّولي', pathway: 'المشاركة الاقتصادية', description: 'يوفر فرص تدريب للشباب الأردني في كبرى الشركات والمؤسسات العالمية لصقل مهاراتهم القيادية.', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084', icon: Briefcase, color: 'from-[#721F31] to-[#3b1019]' },
  { id: 9, title: 'مبادرة قصي', pathway: 'المشاركة الاقتصادية', description: 'مبادرة تعنى بالقطاع الرياضي، وتهدف لرفع جاهزية المعالجين الرياضيين وتأهيلهم للتعامل مع الحوادث.', image: 'https://images.unsplash.com/photo-1576267423048-15c0040fec78?q=80&w=2070', icon: Activity, color: 'from-[#721F31] to-[#3b1019]' },
  { id: 10, title: 'برنامج القيادة للمدارس', pathway: 'القيادة', description: 'برنامج مخصص لطلبة المدارس يهدف إلى غرس مفاهيم القيادة والتفكير النقدي منذ سن مبكرة.', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132', icon: Target, color: 'from-[#2b307e] to-[#191c4b]' },
  { id: 11, title: 'برنامج خطى الحسين', pathway: 'القيادة', description: 'برنامج قيادي متقدم لبناء القدرات القيادية والوطنية للشباب ليصبحوا صناع التغيير في مجتمعاتهم.', image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2049', icon: Target, color: 'from-[#2b307e] to-[#191c4b]' },
  { id: 12, title: 'نَحْنُ', pathway: 'التنمية المجتمعية', description: 'المنصة الوطنية لتطوع ومشاركة الشباب، تهدف لتوحيد جهود العمل التطوعي وتوثيقها بشكل رسمي.', image: '	https://nahno-new.s3.eu-west-3.amazonaws.com/page/cover-20201115-134457.png', icon: Users, color: 'from-[#1f5412] to-[#12330a]' },
  { id: 13, title: 'الحملات والاستجابات الإنسانية', pathway: 'التنمية المجتمعية', description: 'تنظيم وتوجيه طاقات الشباب لدعم الحملات الإنسانية والتدخلات العاجلة محلياً وإقليمياً.', image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070', icon: HeartHandshake, color: 'from-[#1f5412] to-[#12330a]' },
];

export default function NationalPrograms({ onNavigate, setActiveProgramName }) {
  const [activeProgramFilter, setActiveProgramFilter] = useState('الكل');
  const categories = ['الكل', 'المشاركة الاقتصادية', 'القيادة', 'التنمية المجتمعية'];

  const filteredPrograms = activeProgramFilter === 'الكل' 
    ? nationalProgramsData 
    : nationalProgramsData.filter(p => p.pathway === activeProgramFilter);

  const getPathwayStyle = (pathway) => {
    switch(pathway) {
      case 'المشاركة الاقتصادية': return 'bg-[#721F31]/10 text-[#721F31] border-[#721F31]/20'; 
      case 'القيادة': return 'bg-[#2b307e]/10 text-[#2b307e] border-[#2b307e]/20'; 
      case 'التنمية المجتمعية': return 'bg-[#1f5412]/10 text-[#1f5412] border-[#1f5412]/20'; 
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const fadeUpVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
  const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
      <div className="flex gap-2 w-full mb-10 overflow-x-auto scrollbar-hide pb-2 justify-center">
        {categories.map(category => {
          const isActive = activeProgramFilter === category;
          return (
            <button
              key={category} onClick={() => setActiveProgramFilter(category)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 whitespace-nowrap border-2 ${isActive ? 'bg-[#721F31]/5 border-[#721F31] text-[#721F31]' : 'bg-white border-transparent text-gray-500 hover:border-gray-200 hover:bg-gray-50'}`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPrograms.map((program) => {
          const PathwayIcon = program.icon;
          const tagStyle = getPathwayStyle(program.pathway);
          
          return (
            <motion.div 
              key={program.id} variants={fadeUpVariants} 
              onClick={() => { setActiveProgramName(program.title); onNavigate('program_details'); }}
              className="group cursor-pointer bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full text-right"
            >
              <div className="relative h-56 overflow-hidden bg-gray-50 shrink-0">
                <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-5 right-5">
                  <span className={`flex items-center gap-1.5 border px-3 py-1.5 rounded-lg text-[10px] font-black backdrop-blur-md shadow-sm bg-white/90 ${tagStyle.split(' ')[1]}`}>
                    {program.pathway}
                  </span>
                </div>
                <div className={`absolute bottom-5 left-5 w-12 h-12 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center shadow-xl border-2 border-white/20 backdrop-blur-sm transform group-hover:-translate-y-2 transition-transform duration-500`}>
                  <PathwayIcon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow bg-white">
                <h3 className="font-black text-xl text-gray-900 mb-3 group-hover:text-[#721F31] transition-colors leading-tight">{program.title}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6 flex-grow">{program.description}</p>
                <div className="pt-5 border-t border-gray-50 mt-auto flex items-center justify-between w-full text-gray-800">
                  <span className="font-black text-sm group-hover:text-[#721F31] transition-colors">استكشف البرنامج</span>
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-[#721F31] transition-colors border border-gray-100 group-hover:border-[#721F31]">
                    <ArrowUpLeft className="w-4 h-4 text-gray-400 group-hover:text-[#C08F2D] transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}