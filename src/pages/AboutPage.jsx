// src/pages/AboutPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useScroll } from 'framer-motion';
import { Target, Eye, Heart, Users, ChevronDown, Milestone, BookOpen, X, Volume2, VolumeX, Briefcase } from 'lucide-react';
import Footer from '../components/Footer';

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

const LeaderModal = ({ leader, onClose }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (leader && leader.video && videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      setIsMuted(true);
      videoRef.current.play().catch(error => {
        console.log("المتصفح منع التشغيل التلقائي:", error);
      });
    }
  }, [leader]);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  if (!leader) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-6 lg:p-12 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: window.innerWidth < 768 ? '100%' : 20, opacity: window.innerWidth < 768 ? 1 : 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        exit={{ y: window.innerWidth < 768 ? '100%' : 20, opacity: window.innerWidth < 768 ? 1 : 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: window.innerWidth < 768 ? 250 : 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white overflow-hidden shadow-2xl w-full flex flex-col md:flex-row mt-auto h-[90vh] rounded-t-3xl md:h-auto md:max-h-[90vh] md:max-w-5xl md:rounded-[2rem] md:mt-0 relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-white/20 md:bg-gray-100 hover:bg-white/40 md:hover:bg-gray-200 backdrop-blur-md md:backdrop-blur-none rounded-full flex items-center justify-center transition-colors text-gray-800 md:text-gray-500 z-50 cursor-pointer shadow-sm md:shadow-none">
           <X className="w-5 h-5" />
        </button>

        <div className="md:hidden w-full absolute top-0 left-0 right-0 flex justify-center pt-3 pb-4 z-40 cursor-grab active:cursor-grabbing" onClick={onClose}>
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        <div className="w-full md:w-1/2 lg:w-[55%] p-6 pt-16 md:p-8 lg:p-12 overflow-y-auto flex flex-col scrollbar-hide pb-20 md:pb-8 relative z-10 bg-white order-last md:order-first mt-[-20px] md:mt-0 rounded-t-3xl md:rounded-none">
          <div className="inline-flex items-center gap-2 bg-[#8a1538]/10 text-[#8a1538] px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-bold text-[11px] md:text-xs w-fit mb-4">
            <Briefcase className="w-3.5 h-3.5 md:w-4 md:h-4" />
            {leader.role}
          </div>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4 md:mb-6 pr-8 md:pr-0">{leader.name}</h2>
          <div className="flex-grow">
            <p className="text-gray-700 text-[14px] md:text-base lg:text-lg leading-relaxed md:leading-[2.2rem] font-medium text-justify">
              {leader.bio || 'يتمتع بخبرة واسعة في العمل التنموي والمؤسسي، ويسهم بشكل فاعل في توجيه استراتيجيات المؤسسة نحو تمكين الشباب الأردني وتحقيق رؤية القيادة الهاشمية في بناء مستقبل واعد ومستدام.'}
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-[45%] relative h-[300px] md:h-auto shrink-0 bg-gray-900 flex-grow-0 md:flex-grow order-first md:order-last pb-6 md:pb-0">
          {leader.video ? (
            <>
              <video ref={videoRef} src={leader.video} autoPlay loop muted defaultMuted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90"/>
              <button onClick={toggleMute} className="absolute top-16 md:top-6 left-4 md:left-6 z-20 w-10 h-10 md:w-11 md:h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all duration-300 cursor-pointer shadow-md">
                {isMuted ? <VolumeX className="w-4 h-4 md:w-5 md:h-5" /> : <Volume2 className="w-4 h-4 md:w-5 md:h-5" />}
              </button>
            </>
          ) : (
            <img src={leader.image} alt={leader.name} className="absolute inset-0 w-full h-full object-cover opacity-90 object-top" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-12 md:bottom-6 left-0 right-0 px-6 md:px-8 z-10 md:hidden">
            <h3 className="text-white font-black text-xl drop-shadow-md">{leader.name}</h3>
            <p className="text-[#C08F2D] font-bold text-[10px]">{leader.role}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function AboutPage({ onNavigate }) {
  const [activeLeaderTab, setActiveLeaderTab] = useState('board');
  const [selectedLeader, setSelectedLeader] = useState(null); 
  
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start center", "end center"] });

  const tracks = [
    { icon: BookOpen, title: 'تعلّم', desc: 'تطوير المهارات التقنية والعملية للشباب، وتهيئتهم لوظائف المستقبل عبر بيئة تدعم الابتكار والريادة.' },
    { icon: Target, title: 'قُد', desc: 'بناء وتطوير القدرات القيادية للشباب الأردني، وتمكينهم من صناعة القرار وترك أثر إيجابي دائم.' },
    { icon: Users, title: 'اصنع الأثر', desc: 'توفير منصات للتطوع ومشاركة الشباب الفعالة في تنمية مجتمعاتهم المحلية بشكل مستدام.' },
  ];

  const milestones = [
    { year: '2015', title: 'الانطلاقة برؤية ملكية', desc: 'تأسيس مؤسسة ولي العهد لتكون المظلة الحاضنة لطموح وإبداع الشباب الأردني.', image: 'https://cpf.jo/wp-content/uploads/2025/08/7.jpg' },
    { year: '2017', title: 'جامعة الحسين التقنية', desc: 'إطلاق صرح علمي فريد لتعزيز التعليم التقني وتخريج جيل جاهز لسوق العمل.', image: 'https://cpfredesign.vercel.app/images/programs/HTU.png' },
    { year: '2019', title: 'منصة نحن', desc: 'إطلاق المنصة الوطنية للتطوع لبناء مجتمع شبابي مبادر ومعطاء.', image: 'https://cpf.jo/wp-content/uploads/2026/04/DSC09593.jpg' },
    { year: '2024', title: '42 عمّان وإربد', desc: 'افتتاح مدارس البرمجة المجانية المبتكرة لتمكين الشباب من لغات المستقبل.', image: 'https://rhc.jo/uploads/mig/Amman%2042-8.7.24-09-default.webp' },
  ];

  const leaders = {
    board: [
      { name: 'سعادة السيد عدي السلامين', role: 'رئيس مجلس الأمناء', image: 'https://cpf.jo/wp-content/uploads/2026/03/Adey-Salamin-1.jpg', video: 'https://res.cloudinary.com/dj1jhzfrj/video/upload/v1783511152/Video_Project_3_i3uron.mp4', bio: 'يقود سعادة السيد عدي السلامين مجلس الأمناء برؤية استراتيجية تهدف إلى توسيع نطاق برامج المؤسسة لتصل إلى كافة محافظات المملكة. "خليك متواضع شو ما تعمل، رح تضلك تتعلم أكثر، وكل ما فكرت حالك ختمت العلم رح تكتشف إنك لسا بدك تتعلم وبدك تواصل العلم."' },
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
      { name: 'الدكتورة تمام منكو', role: 'المدير التنفيذي', image: 'https://cpf.jo/wp-content/uploads/2025/10/Dr-Tamam-1-e1760652399421.jpg', bio: 'تتولى الدكتورة تمام منكو الإدارة التنفيذية للمؤسسة، وتشرف على ترجمة الرؤية الملكية إلى برامج عملية تلامس احتياجات الشباب وتفتح أمامهم آفاقاً واسعة للتميز والإبداع.' },
      { name: 'نجود سرحان', role: 'نائب المدير، مدير إدارة البرامج', image: 'https://cpf.jo/wp-content/uploads/2025/10/DSC_1224-e1760953027963.jpg' },
      { name: 'ميس الداوود', role: 'نائب المدير، مدير إدارة التطوير', image: 'https://cpf.jo/wp-content/uploads/2025/10/DSC_2186-2-1.jpg' },
      { name: 'روان خوري', role: 'مدير دائرة الاتصال', image: 'https://cpf.jo/wp-content/uploads/2025/10/DSC_2166-2-1.jpg' },
      { name: 'فارس الخطيب', role: 'مدير إدارة المالية والخدمات', image: 'https://cpf.jo/wp-content/uploads/2025/10/DSC_2189-2-1.jpg' },
    ]
  };

  return (
    <div className="w-full bg-[#fcfcfc] font-sans selection:bg-[#C08F2D] selection:text-white overflow-x-hidden" dir="rtl">
      
      {/* 1. Hero Section */}
      <div className="relative pt-28 pb-16 md:pt-48 md:pb-32 bg-gradient-to-br from-[#8a1538] via-[#521623] to-[#1a070b] overflow-hidden min-h-[60vh] md:min-h-[80vh] flex items-center">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0" style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '300px' }}></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center mt-6 md:mt-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-5 md:mb-8 leading-[1.15] tracking-tight">
              رؤية ملكية..<br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C08F2D] to-[#fcebb6] drop-shadow-sm px-2 md:px-0">بطموح شبابي</span>
            </h1>
            <p className="text-[15px] md:text-xl text-white/90 font-medium max-w-4xl mx-auto mb-8 md:mb-12 leading-relaxed px-2">
              تنفيذاً لرؤية صاحب السموّ الأمير الحسين بن عبدالله الثاني، ولي العهد المعظم. بدأنا عملنا انطلاقاً من الإيمان العميق بأن الشباب هم الأساس في تشكيل مستقبل المملكة، ليكون لهم دور فعّال، ومؤهلين لنهضة أنفسهم ومجتمعاتهم.
            </p>
            <motion.div 
              animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
              className="flex justify-center mt-6 md:mt-8 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
              onClick={() => document.getElementById('core-section').scrollIntoView({ behavior: 'smooth' })}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm shadow-md">
                <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* 2. الرؤية والرسالة */}
      <div id="core-section" className="py-12 md:py-24 bg-[#f8fafc] relative scroll-mt-16 md:scroll-mt-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white p-6 md:p-14 rounded-3xl md:rounded-[2rem] border border-gray-100 hover:border-[#C08F2D]/40 hover:shadow-2xl transition-all duration-500 group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#8a1538]/5 rounded-xl md:rounded-2xl flex items-center justify-center mb-5 md:mb-8 group-hover:bg-[#8a1538] transition-colors duration-500">
                <Eye className="w-7 h-7 md:w-8 md:h-8 text-[#8a1538] group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-[#8a1538] mb-3 md:mb-6">رؤيتنا</h2>
              <h3 className="text-lg md:text-2xl font-black text-[#C08F2D] mb-3 md:mb-4">"شباب قادر لأردن طموح"</h3>
              <p className="text-[15px] md:text-lg text-gray-600 leading-relaxed font-medium">تتمحور جهود المؤسسة حول هذه الرؤية بهدف الربط بين الشباب والمؤسسات الوطنية، لتوجيه طاقاتهم وقدرتهم على الإبداع والابتكار نحو التطوير والنمو الدائم.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white p-6 md:p-14 rounded-3xl md:rounded-[2rem] border border-gray-100 hover:border-[#8a1538]/40 hover:shadow-2xl transition-all duration-500 group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#C08F2D]/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-5 md:mb-8 group-hover:bg-[#C08F2D] transition-colors duration-500">
                <Target className="w-7 h-7 md:w-8 md:h-8 text-[#C08F2D] group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-[#8a1538] mb-3 md:mb-6">رسالتنا</h2>
              <p className="text-[15px] md:text-lg text-gray-600 leading-relaxed font-medium mt-4 md:mt-12">دعم الشباب وتمكينهم وتزويدهم بالمعرفة والخبرات اللازمة. نحن نؤمن أننا بمساعدتهم على التقدم والتطور نضمن مستقبلاً مشرقاً لهم ولعائلاتهم ومجتمعاتهم، وللأردن.</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3. إحصائيات الأثر */}
      <div className="py-12 md:py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-[2rem] md:rounded-[3rem] border border-gray-200 shadow-xl p-6 md:p-16">
            <div className="text-center mb-8 md:mb-14">
              <h2 className="text-2xl md:text-4xl font-black text-[#8a1538] mb-2 md:mb-3">نموذج وطني قوي</h2>
              <p className="text-gray-500 font-medium text-sm md:text-xl">أرقام تعكس حجم الأثر في كافة المحافظات</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 md:gap-10 md:divide-x md:divide-x-reverse divide-gray-200">
              <div className="text-center md:px-4">
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#8a1538] mb-2 md:mb-4"><AnimatedNumber value={2.2} decimals={1} suffix="M" /></h3>
                <p className="text-[11px] md:text-base font-bold text-gray-600">شاب وشابة مستفيد</p>
              </div>
              <div className="text-center md:px-4">
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#8a1538] mb-2 md:mb-4"><AnimatedNumber value={14} prefix="+" /></h3>
                <p className="text-[11px] md:text-base font-bold text-gray-600">برنامج ومبادرة</p>
              </div>
              <div className="text-center md:px-4">
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#8a1538] mb-2 md:mb-4"><AnimatedNumber value={26} prefix="+" /></h3>
                <p className="text-[11px] md:text-base font-bold text-gray-600">موقع استراتيجي</p>
              </div>
              <div className="text-center md:px-4">
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#8a1538] mb-2 md:mb-4"><AnimatedNumber value={12} /></h3>
                <p className="text-[11px] md:text-base font-bold text-gray-600">محافظة نغطيها</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. مسيرة الأثر 🟢 (تم إصلاح الـ Timeline للموبايل ليكون على جهة واحدة وواضح) */}
      <div className="py-16 md:py-32 bg-[#f8fafc] overflow-hidden border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-28 relative z-10">
            <Milestone className="w-10 h-10 md:w-14 md:h-14 text-[#C08F2D] mx-auto mb-3 md:mb-6" />
            <h2 className="text-3xl md:text-5xl font-black text-[#8a1538] mb-2 md:mb-4">مسيرة الأثر</h2>
            <p className="text-sm md:text-xl text-gray-500 font-medium">محطات صنعناها معاً، ومستمرون في العطاء</p>
          </div>

          <div className="relative max-w-6xl mx-auto" ref={timelineRef}>
            {/* خط المنتصف للكمبيوتر، وخط أقصى اليمين للموبايل */}
            <div className="absolute right-4 md:right-1/2 transform md:translate-x-1/2 top-0 bottom-0 w-1.5 bg-gray-200 rounded-full z-0"></div>
            <motion.div 
              className="absolute right-4 md:right-1/2 transform md:translate-x-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#C08F2D] to-[#8a1538] rounded-full z-0 origin-top"
              style={{ scaleY: scrollYProgress }}
            ></motion.div>

            {milestones.map((stone, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-center justify-between w-full mb-12 md:mb-28 group pr-12 md:pr-0">
                  {/* النقطة الدائرية */}
                  <div className="absolute right-[0.4rem] md:right-1/2 transform md:translate-x-1/2 w-5 h-5 md:w-8 md:h-8 rounded-full bg-white border-4 border-gray-300 z-20 flex items-center justify-center top-6 md:top-auto">
                    <motion.div 
                      initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: false, margin: "-50px" }} transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      className="w-full h-full bg-[#8a1538] rounded-full"
                    />
                  </div>

                  {/* 🟢 على الموبايل: الكرت يحتوي الصورة والنص تحت بعض. على الكمبيوتر: التخطيط التبادلي */}
                  <div className={`w-full md:w-[45%] md:pr-0 ${isEven ? 'order-2 md:order-1' : 'order-2'}`}>
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} 
                      className={`bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden hover:-translate-y-2 transition-transform duration-500 ${!isEven ? 'md:hidden' : ''}`}
                    >
                      <div className="md:hidden w-full h-40 relative">
                         <img src={stone.image} alt={stone.title} className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      <div className={`p-6 md:p-12 border-t-4 ${isEven ? 'border-t-[#8a1538]' : 'border-t-[#C08F2D] md:border-t-0'}`}>
                        <span className="text-[#C08F2D] font-black text-2xl md:text-4xl mb-2 md:mb-3 block drop-shadow-sm">{stone.year}</span>
                        <h3 className="text-xl md:text-3xl font-black text-[#8a1538] mb-2 md:mb-4">{stone.title}</h3>
                        <p className="text-gray-500 font-medium text-[14px] md:text-lg leading-relaxed">{stone.desc}</p>
                      </div>
                    </motion.div>

                    {/* الصورة الجانبية تظهر للكمبيوتر فقط */}
                    {!isEven && (
                      <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="hidden md:block relative rounded-3xl overflow-hidden shadow-2xl h-80 group">
                        <img src={stone.image} alt={stone.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a070b]/60 to-transparent"></div>
                      </motion.div>
                    )}
                  </div>

                  <div className={`hidden md:block w-full md:w-[45%] md:pr-0 ${isEven ? 'order-1 md:order-2' : 'order-1'}`}>
                    {isEven ? (
                       <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative rounded-3xl overflow-hidden shadow-2xl h-80 group">
                         <img src={stone.image} alt={stone.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                         <div className="absolute inset-0 bg-gradient-to-t from-[#1a070b]/60 to-transparent"></div>
                       </motion.div>
                    ) : (
                       <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-white p-12 rounded-3xl border border-gray-100 shadow-xl border-t-4 border-t-[#C08F2D] hover:-translate-y-2 transition-transform duration-500">
                         <span className="text-[#C08F2D] font-black text-4xl mb-3 block drop-shadow-sm">{stone.year}</span>
                         <h3 className="text-3xl font-black text-[#8a1538] mb-4">{stone.title}</h3>
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

      {/* 5. المسارات التنموية 🟢 (تم إصلاح العرض ليكون بنفس الطول بدون تقطيع) */}
      <div className="py-12 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-black text-[#8a1538] mb-3 md:mb-4">مساراتنا الاستراتيجية</h2>
            <p className="text-[15px] md:text-lg text-gray-500 font-medium max-w-3xl mx-auto px-2">
              بهدف بناء قدرات الشباب وتوفير الأدوات والمنصات اللازمة، ركزنا عملنا الميداني والمؤسسي ضمن ثلاثة مسارات أساسية.
            </p>
          </div>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-4 md:gap-8 pb-6 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 items-stretch">
            {tracks.map((track, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-[#f8fafc] p-6 md:p-10 rounded-[2rem] border border-gray-100 hover:border-[#C08F2D]/50 hover:shadow-[0_10px_30px_rgba(138,21,56,0.08)] transition-all duration-500 group w-[260px] md:w-auto md:min-w-0 snap-center shrink-0 flex flex-col h-auto"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white shadow-sm rounded-xl md:rounded-2xl flex items-center justify-center mb-5 md:mb-8 group-hover:bg-[#8a1538] transition-colors duration-500 shrink-0">
                  <track.icon className="w-6 h-6 md:w-8 md:h-8 text-[#8a1538] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg md:text-2xl font-black text-[#8a1538] mb-2 md:mb-4">{track.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed text-[14px] md:text-lg flex-grow">{track.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. قيادات المؤسسة 🟢 (تم إزالة الفراغات البيضاء/المؤثرات التي كانت تسبب التداخل) */}
      <div className="py-12 md:py-24 bg-[#f8fafc] border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-black text-[#8a1538] mb-3 md:mb-4">قيادات المؤسسة</h2>
            <p className="text-[15px] md:text-lg text-gray-500 font-medium mb-6 md:mb-10">كفاءات وطنية توجه البوصلة نحو تحقيق الرؤية الملكية</p>
            
            <div className="w-full max-w-sm mx-auto bg-gray-200/60 p-1 rounded-full mb-8 md:mb-12 flex">
              <button 
                onClick={() => setActiveLeaderTab('board')}
                className={`flex-1 py-2.5 md:py-3 rounded-full font-bold text-[13px] md:text-base transition-all duration-300 cursor-pointer ${activeLeaderTab === 'board' ? 'bg-white text-[#8a1538] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                مجلس الأمناء
              </button>
              <button 
                onClick={() => setActiveLeaderTab('executive')}
                className={`flex-1 py-2.5 md:py-3 rounded-full font-bold text-[13px] md:text-base transition-all duration-300 cursor-pointer ${activeLeaderTab === 'executive' ? 'bg-white text-[#8a1538] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                الفريق الإداري
              </button>
            </div>
          </div>

          <motion.div layout className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8 pb-6 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            <AnimatePresence mode="popLayout">
              {leaders[activeLeaderTab].map((member, idx) => (
                <motion.div 
                  key={member.name}
                  onClick={() => setSelectedLeader(member)}
                  layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}
                  className="bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 group text-center w-[150px] sm:w-[180px] md:w-auto md:min-w-0 snap-center shrink-0 cursor-pointer flex flex-col"
                >
                  <div className="relative overflow-hidden rounded-xl md:rounded-2xl mb-3 md:mb-5 aspect-[4/5] bg-gray-50">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 object-top"/>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-xs font-bold border border-white/50 px-3 py-1 rounded-full">عرض التفاصيل</span>
                    </div>
                  </div>
                  <h3 className="text-[13px] md:text-lg font-black text-[#8a1538] mb-1 leading-tight">{member.name}</h3>
                  <p className="text-[#C08F2D] font-bold text-[10px] md:text-sm leading-tight mb-1 mt-auto">{member.role}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* 7. Call to Action */}
      <div className="py-12 md:py-24 bg-white relative px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-[#8a1538] via-[#5a1826] to-[#3b1019] rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '300px' }}></div>
            
            <div className="relative z-10">
              <Heart className="w-10 h-10 md:w-12 md:h-12 text-[#C08F2D] mx-auto mb-4 md:mb-6" />
              <h2 className="text-2xl md:text-5xl font-black text-white mb-4 md:mb-6 leading-tight">
                القصة لم تكتمل بعد،<br className="hidden md:block"/>أنت من سيكتب الفصل القادم
              </h2>
              <p className="text-white/80 text-[15px] md:text-xl font-medium mb-8 md:mb-10 max-w-2xl mx-auto px-2">
                أصبحت المؤسسة منصة حيوية توحد جهود الشباب. لا تكتفِ بالقراءة، كن جزءاً من الأثر وابدأ رحلتك الآن.
              </p>
              <button 
                onClick={() => onNavigate('programs')}
                className="bg-[#C08F2D] hover:bg-[#a67b25] text-white px-8 py-3.5 md:px-10 md:py-4 rounded-full font-black text-sm md:text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 mx-auto block cursor-pointer"
              >
                استكشف برامجنا وفرصنا
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedLeader && (
          <LeaderModal 
            leader={selectedLeader} 
            onClose={() => setSelectedLeader(null)} 
          />
        )}
      </AnimatePresence>

      <Footer onNavigate={onNavigate}/>
    </div>
  );
}