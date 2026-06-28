// src/pages/AboutPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { Target, Eye, Heart, Briefcase, Users, Award, ChevronDown, ArrowUpLeft, Milestone } from 'lucide-react';
import Footer from '../components/Footer';

// 🟢 مكون العدادات المتحركة (Animated Counter)
function AnimatedNumber({ value, suffix = '', prefix = '', decimals = 0 }) {
  const [currentValue, setCurrentValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp = null;
      const duration = 2000;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 5);
        setCurrentValue(easeProgress * value);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, value]);

  return <span ref={ref}>{prefix}{currentValue.toFixed(decimals)}{suffix}</span>;
}

export default function AboutPage({ onNavigate }) {
  const [activeLeaderTab, setActiveLeaderTab] = useState('board');
  
  // 🟢 مرجع لقسم مسيرة الأثر عشان نربط حركة الخط بالـ Scroll
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const tracks = [
    { icon: Briefcase, title: 'مسار المشاركة الاقتصادية', desc: 'تطوير المهارات التقنية والعملية للشباب، وتهيئتهم لوظائف المستقبل عبر بيئة تدعم الابتكار والريادة.' },
    { icon: Award, title: 'مسار القيادة', desc: 'بناء وتطوير القدرات القيادية للشباب الأردني، وتمكينهم من صناعة القرار وترك أثر إيجابي دائم.' },
    { icon: Users, title: 'مسار التنمية المجتمعية', desc: 'توفير منصات للتطوع ومشاركة الشباب الفعالة في تنمية مجتمعاتهم المحلية بشكل مستدام.' },
  ];

  // 🟢 ضفنا صور فخمة لكل محطة زمنية
  const milestones = [
    { 
      year: '2015', 
      title: 'الانطلاقة برؤية ملكية', 
      desc: 'تأسيس مؤسسة ولي العهد لتكون المظلة الحاضنة لطموح وإبداع الشباب الأردني في كافة المحافظات.',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000'
    },
    { 
      year: '2017', 
      title: 'جامعة الحسين التقنية', 
      desc: 'إطلاق صرح علمي فريد لتعزيز التعليم التقني وتخريج جيل جاهز لسوق العمل بأعلى المعايير.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000'
    },
    { 
      year: '2019', 
      title: 'منصة نحن', 
      desc: 'إطلاق المنصة الوطنية للتطوع لبناء مجتمع شبابي مبادر ومعطاء يساهم في التنمية المستدامة.',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1000'
    },
    { 
      year: '2024', 
      title: '42 عمّان وإربد', 
      desc: 'افتتاح مدارس البرمجة المجانية المبتكرة لتمكين الشباب من لغات المستقبل والريادة التقنية.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000'
    },
  ];

  const leaders = {
    board: [
      { name: 'سعادة السيد عدي السلامين', role: 'رئيس مجلس الأمناء', image: 'https://cpf.jo/wp-content/uploads/2026/03/Adey-Salamin-1.jpg' },
      { name: 'سعادة السيد ثائر النجداوي', role: 'عضو مجلس الأمناء', image: 'https://cpf.jo/wp-content/uploads/2026/03/Thaer-Najdawi-1.jpg' },
      { name: 'سعادة السيدة فادية سمارة', role: 'عضو مجلس الأمناء', image: 'https://cpf.jo/wp-content/uploads/2026/03/Fadia-Samara-1.jpg' },
      { name: 'سعادة السيد عمر حمارنة', role: 'عضو مجلس الأمناء', image: 'https://cpf.jo/wp-content/uploads/2026/03/Omar-Hamarneh-1.jpg' },
      { name: 'سعادة السيد أحمد الهنداوي', role: 'عضو مجلس الأمناء', image: 'https://cpf.jo/wp-content/uploads/2026/03/Ahmad-AlHendawi-1.jpg' },
      { name: 'سعادة الدكتور أشرف بني محمد', role: 'عضو مجلس الأمناء', image: 'https://cpf.jo/wp-content/uploads/2026/03/Ashraf-Bani-Mohammad-1.jpg' },
      { name: 'سعادة السيد زيد الفرخ', role: 'عضو مجلس الأمناء', image: 'https://cpf.jo/wp-content/uploads/2026/03/Zaid-Farekh-1.jpg' },
      { name: 'سعادة السيد أسامة امسيح', role: 'عضو مجلس الأمناء', image: 'https://cpf.jo/wp-content/uploads/2026/03/Approved-Osama-Imseeh-1.jpg' },
      { name: 'سعادة السيدة كارولين الفرج', role: 'عضو مجلس الأمناء', image: 'https://cpf.jo/wp-content/uploads/2026/03/Caroline-Faraj-1.jpg' },
      { name: 'سعادة السيد فواز غانم', role: 'عضو مجلس الأمناء', image: 'https://cpf.jo/wp-content/uploads/2026/03/Approved-Fawaz-Ghanem-1.jpg' },
      { name: 'سعادة السيد طارق دروزة', role: 'عضو مجلس الأمناء', image: 'https://cpf.jo/wp-content/uploads/2026/03/Tarek-Darwazeh-1.jpg' },
    ],
    executive: [
      { name: 'تمام منكو', role: 'المدير التنفيذي', image: 'https://cpf.jo/wp-content/uploads/2025/10/Dr-Tamam-1-e1760652399421.jpg' },
      { name: 'نجود سرحان', role: 'نائب المدير، مدير إدارة البرامج', image: 'https://cpf.jo/wp-content/uploads/2025/10/DSC_1224-e1760953027963.jpg' },
      { name: 'ميس الداوود', role: 'نائب المدير، مدير إدارة التطوير', image: 'https://cpf.jo/wp-content/uploads/2025/10/DSC_2186-2-1.jpg' },
      { name: 'روان خوري', role: 'مدير دائرة الاتصال', image: 'https://cpf.jo/wp-content/uploads/2025/10/DSC_2166-2-1.jpg' },
      { name: 'فارس الخطيب', role: 'مدير إدارة المالية والخدمات', image: 'https://cpf.jo/wp-content/uploads/2025/10/DSC_2189-2-1.jpg' },
    ]
  };

  return (
    <div className="w-full bg-[#fcfcfc] font-sans selection:bg-[#C08F2D] selection:text-white" dir="rtl">
      
      {/* ================= 1. Hero Section ================= */}
      <div className="relative pt-32 pb-24 md:pt-48 md:pb-32 bg-gradient-to-br from-[#721F31] via-[#521623] to-[#1a070b] overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0" style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '300px' }}></div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center mt-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.15] tracking-tight">
              رؤية ملكية..<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C08F2D] to-[#fcebb6] drop-shadow-sm">
                بطموح شبابي
              </span>
            </h1>
            <p className="text-base md:text-xl text-white/90 font-medium max-w-4xl mx-auto mb-12 leading-relaxed">
              تنفيذاً لرؤية صاحب السموّ الأمير الحسين بن عبدالله الثاني، ولي العهد المعظم. بدأنا عملنا انطلاقاً من الإيمان العميق بأن الشباب هم الأساس في تشكيل مستقبل المملكة، ليكون لهم دور فعّال، ومؤهلين لنهضة أنفسهم ومجتمعاتهم.
            </p>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex justify-center mt-8 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
              onClick={() => document.getElementById('core-section').scrollIntoView({ behavior: 'smooth' })}
            >
              <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm shadow-md">
                <ChevronDown className="w-6 h-6 text-white" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ================= 2. الرؤية والرسالة ================= */}
      <div id="core-section" className="py-24 bg-[#f8fafc] relative scroll-mt-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white p-10 md:p-14 rounded-[2rem] border border-gray-100 hover:border-[#C08F2D]/40 hover:shadow-2xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-[#721F31]/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#721F31] transition-colors duration-500">
                <Eye className="w-8 h-8 text-[#721F31] group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[#721F31] mb-6">رؤيتنا</h2>
              <h3 className="text-2xl font-black text-[#C08F2D] mb-4">"شباب قادر لأردن طموح"</h3>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                تتمحور جهود المؤسسة حول هذه الرؤية بهدف الربط بين الشباب والمؤسسات الوطنية، لتوجيه طاقاتهم وقدرتهم على الإبداع والابتكار نحو التطوير والنمو الدائم.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white p-10 md:p-14 rounded-[2rem] border border-gray-100 hover:border-[#721F31]/40 hover:shadow-2xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-[#C08F2D]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#C08F2D] transition-colors duration-500">
                <Target className="w-8 h-8 text-[#C08F2D] group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[#721F31] mb-6">رسالتنا</h2>
              <p className="text-lg text-gray-600 leading-relaxed font-medium mt-12">
                دعم الشباب وتمكينهم وتزويدهم بالمعرفة والخبرات اللازمة. نحن نؤمن أننا بمساعدتهم على التقدم والتطور نضمن مستقبلاً مشرقاً لهم ولعائلاتهم ومجتمعاتهم، وللأردن.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ================= 3. إحصائيات الأثر ================= */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-[3rem] border border-gray-200 shadow-xl p-12 md:p-16">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black text-[#721F31] mb-3">نموذج وطني قوي</h2>
              <p className="text-gray-500 font-medium text-lg md:text-xl">أرقام تعكس حجم الأثر في كافة المحافظات</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 divide-x divide-x-reverse divide-gray-200">
              <div className="text-center px-4">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#721F31] mb-4">
                  <AnimatedNumber value={2.2} decimals={1} suffix="M" />
                </h3>
                <p className="text-sm md:text-base font-bold text-gray-600">شاب وشابة مستفيد</p>
              </div>
              <div className="text-center px-4">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#721F31] mb-4">
                  <AnimatedNumber value={14} prefix="+" />
                </h3>
                <p className="text-sm md:text-base font-bold text-gray-600">برنامج ومبادرة</p>
              </div>
              <div className="text-center px-4">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#721F31] mb-4">
                  <AnimatedNumber value={26} prefix="+" />
                </h3>
                <p className="text-sm md:text-base font-bold text-gray-600">موقع استراتيجي</p>
              </div>
              <div className="text-center px-4">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#721F31] mb-4">
                  <AnimatedNumber value={12} />
                </h3>
                <p className="text-sm md:text-base font-bold text-gray-600">محافظة نغطيها</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 4. مسيرة الأثر (Timeline التفاعلي بالصور والأنيميشن) ================= */}
      <div className="py-32 bg-[#f8fafc] overflow-hidden border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-28 relative z-10">
            <Milestone className="w-14 h-14 text-[#C08F2D] mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-black text-[#721F31] mb-4">مسيرة الأثر</h2>
            <p className="text-xl text-gray-500 font-medium">محطات صنعناها معاً، ومستمرون في العطاء</p>
          </div>

          <div className="relative max-w-6xl mx-auto" ref={timelineRef}>
            
            {/* 🟢 الخط الرمادي الثابت (بالنص للكمبيوتر، عاليمين للموبايل) */}
            <div className="absolute right-6 md:right-1/2 transform md:translate-x-1/2 top-0 bottom-0 w-1.5 bg-gray-200 rounded-full z-0"></div>
            
            {/* 🟢 الخط العنابي/الذهبي المتحرك مع النزول (Scroll) */}
            <motion.div 
              className="absolute right-6 md:right-1/2 transform md:translate-x-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#C08F2D] to-[#721F31] rounded-full z-0 origin-top"
              style={{ scaleY: scrollYProgress }}
            ></motion.div>

            {milestones.map((stone, idx) => {
              const isEven = idx % 2 === 0;
              
              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-center justify-between w-full mb-28 group">
                  
                  {/* 🟢 النقطة التفاعلية (الدائرة اللي بالنص) */}
                  <div className="absolute right-6 md:right-1/2 transform translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-gray-300 z-20 flex items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: false, margin: "-100px" }} transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      className="w-full h-full bg-[#721F31] rounded-full"
                    />
                  </div>

                  {/* 🟢 الكرت الأول (إما صورة أو نص حسب الترتيب) */}
                  <div className={`w-full md:w-[45%] pr-16 md:pr-0 ${isEven ? 'order-2 md:order-1' : 'order-2'}`}>
                    {isEven ? (
                      // النص على اليمين (للكمبيوتر)
                      <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl border-t-4 border-t-[#721F31] hover:-translate-y-2 transition-transform duration-500">
                        <span className="text-[#C08F2D] font-black text-4xl mb-3 block drop-shadow-sm">{stone.year}</span>
                        <h3 className="text-2xl md:text-3xl font-black text-[#721F31] mb-4">{stone.title}</h3>
                        <p className="text-gray-500 font-medium text-lg leading-relaxed">{stone.desc}</p>
                      </motion.div>
                    ) : (
                      // الصورة على اليمين (للكمبيوتر)
                      <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className="relative rounded-3xl overflow-hidden shadow-2xl h-64 md:h-80 group">
                        <img src={stone.image} alt={stone.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a070b]/60 to-transparent"></div>
                      </motion.div>
                    )}
                  </div>

                  {/* 🟢 الكرت الثاني (الجهة المقابلة) */}
                  <div className={`w-full md:w-[45%] pr-16 md:pr-0 mt-6 md:mt-0 ${isEven ? 'order-1 md:order-2 hidden md:block' : 'order-1 hidden md:block'}`}>
                    {isEven ? (
                       // الصورة على اليسار
                       <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className="relative rounded-3xl overflow-hidden shadow-2xl h-64 md:h-80 group">
                         <img src={stone.image} alt={stone.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                         <div className="absolute inset-0 bg-gradient-to-t from-[#1a070b]/60 to-transparent"></div>
                       </motion.div>
                    ) : (
                       // النص على اليسار
                       <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl border-t-4 border-t-[#C08F2D] hover:-translate-y-2 transition-transform duration-500">
                         <span className="text-[#C08F2D] font-black text-4xl mb-3 block drop-shadow-sm">{stone.year}</span>
                         <h3 className="text-2xl md:text-3xl font-black text-[#721F31] mb-4">{stone.title}</h3>
                         <p className="text-gray-500 font-medium text-lg leading-relaxed">{stone.desc}</p>
                       </motion.div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= 5. المسارات التنموية ================= */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#721F31] mb-4">مساراتنا الاستراتيجية</h2>
            <p className="text-lg text-gray-500 font-medium max-w-3xl mx-auto">
              بهدف بناء قدرات الشباب وتوفير الأدوات والمنصات اللازمة، ركزنا عملنا الميداني والمؤسسي ضمن ثلاثة مسارات أساسية.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tracks.map((track, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-[#f8fafc] p-10 rounded-3xl border border-gray-100 hover:border-[#C08F2D]/50 hover:shadow-[0_10px_30px_rgba(114,31,49,0.08)] transition-all duration-500 group"
              >
                <div className="w-16 h-16 bg-white shadow-sm rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#721F31] transition-colors duration-500">
                  <track.icon className="w-8 h-8 text-[#721F31] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-black text-[#721F31] mb-4">{track.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed text-lg">{track.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= 6. قيادات المؤسسة ================= */}
      <div className="py-24 bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#721F31] mb-4">قيادات المؤسسة</h2>
            <p className="text-lg text-gray-500 font-medium mb-10">كفاءات وطنية توجه البوصلة نحو تحقيق الرؤية الملكية</p>
            
            <div className="inline-flex bg-gray-200/60 p-1.5 rounded-full mb-12">
              <button 
                onClick={() => setActiveLeaderTab('board')}
                className={`px-8 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 ${activeLeaderTab === 'board' ? 'bg-white text-[#721F31] shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
              >
                مجلس الأمناء
              </button>
              <button 
                onClick={() => setActiveLeaderTab('executive')}
                className={`px-8 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 ${activeLeaderTab === 'executive' ? 'bg-white text-[#721F31] shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
              >
                الفريق الإداري
              </button>
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {leaders[activeLeaderTab].map((member, idx) => (
                <motion.div 
                  key={member.name}
                  layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}
                  className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 group text-center"
                >
                  <div className="relative overflow-hidden rounded-2xl mb-5 aspect-[4/5] bg-gray-50">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                  </div>
                  <h3 className="text-lg font-black text-[#721F31] mb-1">{member.name}</h3>
                  <p className="text-[#C08F2D] font-bold text-sm">{member.role}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* ================= 7. Call to Action ================= */}
      <div className="py-24 bg-white relative px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-[#721F31] via-[#5a1826] to-[#3b1019] rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '300px' }}></div>
            
            <div className="relative z-10">
              <Heart className="w-12 h-12 text-[#C08F2D] mx-auto mb-6" />
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                القصة لم تكتمل بعد،<br/>أنت من سيكتب الفصل القادم
              </h2>
              <p className="text-white/80 text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto">
                أصبحت المؤسسة منصة حيوية توحد جهود الشباب. لا تكتفِ بالقراءة، كن جزءاً من الأثر وابدأ رحلتك الآن.
              </p>
              <button 
                onClick={() => onNavigate('programs')}
                className="bg-[#C08F2D] hover:bg-[#a67b25] text-white px-10 py-4 rounded-full font-black text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 mx-auto"
              >
                استكشف برامجنا وفرصنا
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}