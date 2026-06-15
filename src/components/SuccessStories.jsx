// src/components/SuccessStories.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import { Quote, Sparkles, LayoutGrid, Briefcase, Target, Users, X, ArrowUpLeft, ArrowLeft, MapPin } from 'lucide-react';

const stories = [
  {
    id: 1,
    name: 'طارق المجالي',
    program: 'مساحة الصنّاع (TechWorks)',
    programKey: 'مساحة الصنّاع',
    location: 'الكرك',
    pathway: 'المشاركة الاقتصادية',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    quote: 'من خلال مساحة الصنّاع، تمكنت من تحويل فكرتي المكتوبة على ورق إلى نموذج أولي حقيقي وفعّال.',
    fullStory: 'بدأت رحلتي كطالب هندسة يمتلك فكرة لجهاز طبي يساعد كبار السن، لكنني لم أكن أملك الموارد لتصنيعه. انضممت إلى مساحة الصنّاع، وهناك وجدت كل ما أحتاجه من طابعات ثلاثية الأبعاد وخبراء وجهوني خطوة بخطوة. اليوم، شركتي الناشئة توظف 5 شباب أردنيين وبدأنا بتصدير أجهزتنا إلى السوق الإقليمي. مؤسسة ولي العهد لم تعطني مجرد مكان للعمل، بل أعطتني الثقة لأكون ريادياً.',
  },
  {
    id: 2,
    name: 'سارة العبدلله',
    program: 'مدرسة 42 عمّان',
    programKey: '42 عمّان و42 إربد',
    location: 'إربد',
    pathway: 'المشاركة الاقتصادية',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    quote: 'بيئة التعلم النظير في 42 غيرت طريقة تفكيري كلياً. لم أتعلم كتابة الكود فحسب، بل تعلمت كيف أتعلم.',
    fullStory: 'كنت أعمل في مجال بعيد تماماً عن التكنولوجيا، وكنت أظن أن البرمجة مستحيلة بالنسبة لي. دخلت معسكر التصفية (Piscine) في 42 عمّان، وكانت 4 أسابيع من التحدي والصبر. المنهجية الخالية من المعلمين جعلتني أعتمد على نفسي وعلى زملائي. بعد عام واحد فقط، حصلت على عرض عمل كمهندسة واجهات خلفية (Backend Developer) في واحدة من كبرى الشركات التقنية في الأردن.',
  },
  {
    id: 3,
    name: 'لينا حداد',
    program: 'منصة نَحْنُ',
    programKey: 'نَحْنُ',
    location: 'عمان',
    pathway: 'التنمية المجتمعية',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    quote: 'التطوع لم يغير حياة الآخرين فقط، بل غيّر مساري المهني بالكامل وأعطاني شبكة علاقات لم أتخيلها.',
    fullStory: 'بدأت بالتطوع عبر منصة "نحن" لتعبئة وقت فراغي خلال الجامعة. شاركت في أكثر من 15 مبادرة لترميم المدارس ومساعدة الأسر العفيفة. الساعات التي تم توثيقها رسمياً على المنصة كانت السبب الرئيسي في قبولي لمنحة ماجستير دولية في التنمية المستدامة، لأنها أثبتت التزامي بخدمة مجتمعي.',
  },
  {
    id: 4,
    name: 'عمر الرواشدة',
    program: 'جامعة الحسين التقنية (HTU)',
    programKey: 'جامعة الحسين التقنية',
    location: 'الزرقاء',
    pathway: 'المشاركة الاقتصادية',
    image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    quote: 'التدريب العملي المكثف في الجامعة جعلني جاهزاً لسوق العمل قبل حتى أن أستلم وثيقة تخرجي.',
    fullStory: 'اخترت جامعة الحسين التقنية لأنني كنت أبحث عن التعليم التطبيقي لا النظري. من السنة الأولى، كنا نعمل على مشاريع حقيقية لشركات في السوق الأردني. فترة التدريب الإلزامي لمدة 8 أشهر كانت بوابتي للحصول على وظيفتي الحالية كمهندس بيانات. الجامعة لم تمنحني شهادة، بل منحتني مسيرة مهنية.',
  },
  {
    id: 5,
    name: 'زيد النجار',
    program: 'مبادرة حقق',
    programKey: 'برنامج القيادة للمدارس',
    location: 'الطفيلة',
    pathway: 'القيادة',
    image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    quote: 'كنت خجولاً ومتردداً، لكن معسكرات "حقق" صقلت شخصيتي وجعلتني قائداً لفريقي في الجامعة.',
    fullStory: 'في الصف التاسع، التحقت بمبادرة حقق. كنا نذهب في معسكرات ميدانية تتطلب منا التخطيط، والعمل تحت الضغط، وحل المشكلات كفريق واحد. اليوم أنا رئيس مجلس الطلبة في جامعتي، وأدير فريقاً من 50 طالباً في مبادرة وطنية. كل هذه الثقة بدأت من شرارة أوقدتها "حقق" في داخلي.',
  },
  {
    id: 6,
    name: 'سجى سلّام',
    program: 'مبادرة قصي',
    programKey: 'مبادرة قصي',
    location: 'العقبة',
    pathway: 'القيادة',
    image: 'https://cpf.jo/wp-content/uploads/2024/05/Saja-1000x540.jpg',
    quote: 'تأهيلي كمعالجة رياضية أنقذ حياة لاعب أمام عيني. هذا الشعور لا يقدر بثمن.',
    fullStory: 'بصفتي خريجة تمريض، كنت أبحث عن تخصص دقيق يجمع بين شغفي بالطب والرياضة. انضممت لتدريبات مبادرة قصي وحصلت على الشهادة الدولية في الإسعاف الرياضي المتقدم. في إحدى المباريات المحلية، تعرض لاعب لبلع اللسان، وبفضل التدريب المكثف الذي تلقيته، تمكنت من التعامل مع الموقف في ثوانٍ معدودة.',
  },
  {
    id: 7,
    name: 'فيصل العتوم',
    program: 'برنامج التدريب الدولي',
    programKey: 'برنامج التدريب الدّولي',
    location: 'جرش',
    pathway: 'القيادة',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    quote: 'التدريب في وكالة ناسا كان حلماً تحول إلى حقيقة بفضل مؤسسة ولي العهد.',
    fullStory: 'عندما رأيت الإعلان عن التدريب الدولي، لم أكن أتوقع قبولي. مررت بمراحل تقييم صعبة، لكنني نجحت وسافرت للتدريب في مختبرات ناسا المتقدمة لمدة 4 أشهر. التجربة وسعت مداركي وجعلتني أرى الأردن قادراً على المنافسة في علوم الفضاء والبيانات المعقدة.',
  },
  {
    id: 8,
    name: 'نور الخالدي',
    program: 'مبرمجو الأردن',
    programKey: 'مبرمجو الأردن',
    location: 'المفرق',
    pathway: 'المشاركة الاقتصادية',
    image: 'https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    quote: 'تعلمت أساسيات الذكاء الاصطناعي من غرفتي في المفرق، واليوم أعمل كمستقلة مع شركات خليجية.',
    fullStory: 'لم يكن لدي فرصة للانتقال إلى العاصمة لدراسة التكنولوجيا، لكن مبادرة مبرمجو الأردن وفرت لي مساقات تفاعلية عالية الجودة عبر الإنترنت. تابعت الدروس، وبنيت معرض أعمالي (Portfolio)، والآن أعمل كمطورة ويب مستقلة (Freelancer) براتب ممتاز وأنا في مدينتي.',
  },
  {
    id: 9,
    name: 'لينا حداد',
    program: 'منصة نَحْنُ',
    programKey: 'نَحْنُ',
    location: 'عمان',
    pathway: 'التنمية المجتمعية',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    quote: 'التطوع لم يغير حياة الآخرين فقط، بل غيّر مساري المهني بالكامل وأعطاني شبكة علاقات لم أتخيلها.',
    fullStory: 'بدأت بالتطوع عبر منصة "نحن" لتعبئة وقت فراغي خلال الجامعة. شاركت في أكثر من 15 مبادرة لترميم المدارس ومساعدة الأسر العفيفة. الساعات التي تم توثيقها رسمياً على المنصة كانت السبب الرئيسي في قبولي لمنحة ماجستير دولية في التنمية المستدامة، لأنها أثبتت التزامي بخدمة مجتمعي.',
  },
];

const StoryModal = ({ story, onClose, onNavigate, setActiveProgramName }) => {
  if (!story) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-6 lg:p-12 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        // 🟢 الأنيميشن بيسحب من تحت للموبايل (Bottom Sheet) ومن النص للكمبيوتر
        initial={{ y: window.innerWidth < 768 ? '100%' : 20, opacity: window.innerWidth < 768 ? 1 : 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        exit={{ y: window.innerWidth < 768 ? '100%' : 20, opacity: window.innerWidth < 768 ? 1 : 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: window.innerWidth < 768 ? 250 : 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white overflow-hidden shadow-2xl w-full flex flex-col md:flex-row 
                   mt-auto h-[90vh] rounded-t-3xl md:h-auto md:max-h-[90vh] md:max-w-5xl md:rounded-[2rem] md:mt-0"
      >
        {/* 🟢 شريط السحب للموبايل */}
        <div className="md:hidden w-full flex justify-center pt-4 pb-2 bg-white shrink-0 rounded-t-3xl">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        <div className="w-full md:w-3/5 p-6 md:p-8 lg:p-12 overflow-y-auto flex flex-col scrollbar-hide pb-20 md:pb-8">
          <button onClick={onClose} className="hidden md:flex absolute top-6 right-6 md:relative md:top-0 md:right-0 md:self-end w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full items-center justify-center transition-colors mb-6 text-gray-500 z-10 cursor-pointer shrink-0">
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-2 bg-[#721F31]/10 text-[#721F31] px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-bold text-[11px] md:text-xs w-fit mb-4">
            <Target className="w-3.5 h-3.5 md:w-4 md:h-4" />
            {story.pathway}
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-6 md:mb-8">{story.name}</h2>
          
          <div className="flex gap-3 md:gap-4 mb-6 md:mb-8 bg-gray-50 p-5 md:p-6 rounded-2xl border-r-4 border-[#C08F2D]">
            <Quote className="w-6 h-6 md:w-8 md:h-8 text-[#C08F2D]/50 rotate-180 shrink-0" />
            <h3 className="text-base md:text-[1.2rem] lg:text-[1.35rem] font-black text-[#8a1538] leading-[1.8em]">
              {story.quote}
            </h3>
          </div>

          <p className="text-gray-700 text-sm md:text-base lg:text-[1.05rem] leading-[2.1rem] font-medium text-justify mb-8">
            {story.fullStory}
          </p>

          <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-5 bg-gray-50 p-5 md:p-6 rounded-2xl border border-gray-200/60">
            <div className="w-full sm:w-auto text-right">
              <h4 className="font-black text-gray-900 mb-1 text-sm md:text-[1.1rem]">ألهمتك قصة {story.name.split(' ')[0]}؟</h4>
              <p className="text-[11px] md:text-sm font-bold text-gray-500">ابدأ رحلتك الخاصة واكتشف فرصك في مبادرة {story.program}.</p>
            </div>
            <button
              onClick={() => {
                setActiveProgramName(story.programKey);
                onClose();
                onNavigate('program_details');
              }}
              className="w-full sm:w-auto shrink-0 bg-[#8a1538] hover:bg-[#680f2a] text-white px-6 py-3.5 md:px-7 md:py-3.5 rounded-xl font-black text-[13px] md:text-sm transition-all duration-300 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>استكشف البرنامج</span>
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1.5 transition-transform" strokeWidth={2.5} />
            </button>
          </div>

        </div>

        {/* 🟢 إخفاء الصورة كلياً عالموبايل عشان مساحة النص تكون أريح */}
        <div className="w-full md:w-2/5 relative h-64 md:h-auto shrink-0 bg-gray-900 hidden md:block">
          <img src={story.image} alt={story.name} className="w-full h-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-10 left-0 right-0 px-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full font-bold text-sm mb-3">
              <MapPin className="w-4 h-4" />
              {story.location}، الأردن
            </div>
            <h3 className="text-white font-black text-2xl drop-shadow-md">{story.program}</h3>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function SuccessStories({ onNavigate, setActiveProgramName }) {
  const [activeFilter, setActiveFilter] = useState('الكل');
  const [selectedStory, setSelectedStory] = useState(null);

  const categories = [
    { id: 'الكل', icon: LayoutGrid },
    { id: 'المشاركة الاقتصادية', icon: Briefcase },
    { id: 'القيادة', icon: Target },
    { id: 'التنمية المجتمعية', icon: Users },
  ];

  const filteredStories = activeFilter === 'الكل' 
    ? stories 
    : stories.filter(s => s.pathway === activeFilter);

  const getPathwayStyle = (pathway) => {
    switch(pathway) {
      case 'المشاركة الاقتصادية': return 'bg-[#721F31]/10 text-[#721F31] border-[#721F31]/20'; 
      case 'القيادة': return 'bg-[#2b307e]/10 text-[#2b307e] border-[#2b307e]/20'; 
      case 'التنمية المجتمعية': return 'bg-[#1f5412]/10 text-[#1f5412] border-[#1f5412]/20'; 
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FA] font-sans selection:bg-[#C08F2D] selection:text-white flex flex-col" dir="rtl">
      
      {/* الهيدر - 🟢 تصغير المسافات للموبايل */}
      <div className="bg-[#1a0409] h-[340px] md:h-[380px] pt-28 md:pt-32 pb-16 md:pb-20 relative overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem] shadow-md shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8a1538]/90 to-[#1a0409]" />
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-overlay">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="cpf-programs-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M0 60 Q 30 30 60 60 T 120 60 M60 0 Q 90 30 60 60 T 60 120" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
              <path d="M-60 60 Q -30 30 0 60 T 60 60 M0 0 Q 30 30 0 60 T 0 120" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#cpf-programs-pattern)"></rect>
          </svg>
        </div>
        
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-3 md:mb-4 tracking-tight">
            قصص <span className="text-[#C08F2D]">النجاح</span>
          </h1>
          <p className="text-white/90 text-[13px] md:text-[15px] font-bold max-w-2xl mx-auto leading-relaxed px-2">
            لم تكن البرامج يوماً مجرد محطات عابرة، بل كانت نقطة انطلاق. تعرّف على شباب أردنيين استثمروا الفرص لتحقيق تغيير جذري في مسيراتهم.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-10 relative z-20 flex-grow pb-24">
        
        {/* הפلاتر - 🟢 صارت Grid ع الموبايل بدل سحب (Scroll) يمين ويسار */}
        <div className="bg-white p-2 md:p-2.5 rounded-2xl shadow-xl shadow-gray-200/40 border border-gray-100 flex flex-wrap md:flex-nowrap gap-2 w-full md:w-fit mb-10 md:mb-16 mx-auto justify-center">
          {categories.map(category => {
            const Icon = category.icon;
            const isActive = activeFilter === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`flex items-center justify-center gap-1.5 md:gap-2 px-3 sm:px-6 py-2.5 md:py-3.5 rounded-xl font-black text-[11px] md:text-sm transition-all duration-300 w-[calc(50%-4px)] md:w-auto cursor-pointer border ${
                  isActive 
                    ? 'bg-[#8a1538] text-white shadow-md border-[#8a1538]' 
                    : 'bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900 border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isActive ? 'text-[#C08F2D]' : ''}`} />
                <span className="truncate">{category.id}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
            className="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8"
          >
            {filteredStories.map((story) => {
              const tagStyle = getPathwayStyle(story.pathway);
              
              return (
                <div 
                  key={story.id} 
                  onClick={() => setSelectedStory(story)}
                  className="break-inside-avoid block group bg-white rounded-2xl md:rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer relative flex flex-col"
                >
                  <div className="relative h-56 md:h-64 overflow-hidden bg-gray-100 shrink-0">
                    <img src={story.image} alt={story.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                    
                    <div className="absolute top-4 right-4 md:top-5 md:right-5 z-10">
                      <span className={`flex items-center gap-1.5 px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg text-[9px] md:text-[10px] font-black backdrop-blur-md shadow-sm bg-white/95 border ${tagStyle.split(' ')[2]} ${tagStyle.split(' ')[1]}`}>
                        {story.pathway}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5 z-10 flex justify-between items-end">
                       <div>
                         <h3 className="font-black text-xl md:text-2xl text-white leading-tight drop-shadow-md">{story.name}</h3>
                         <p className="text-[#C08F2D] font-bold text-[11px] md:text-sm mt-1">{story.program}</p>
                       </div>
                       <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-300">
                         <ArrowUpLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
                       </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 pb-8 md:pb-10 relative bg-white flex-grow flex flex-col justify-center">
                    <div className="mb-3 md:mb-4">
                      <Quote className="w-6 h-6 md:w-8 md:h-8 text-[#C08F2D]/40 rotate-180" />
                    </div>
                    <p className="text-gray-700 text-sm md:text-[1.05rem] font-medium leading-loose md:leading-[2.1rem] text-justify relative z-10">
                      "{story.quote}"
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

      </div>

      <AnimatePresence>
        {selectedStory && (
          <StoryModal 
            story={selectedStory} 
            onClose={() => setSelectedStory(null)} 
            onNavigate={onNavigate}
            setActiveProgramName={setActiveProgramName}
          />
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
}