// src/pages/AboutPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll } from 'framer-motion';
import { Target, Eye, Heart, Users, ChevronDown, Milestone, BookOpen } from 'lucide-react';
import Footer from '../components/Footer';

// 🟢 استيراد مكون القيادات الذي قمنا بفصله
import BoardMembers from '../components/BoardMembers';

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

  return (
    <div className="w-full bg-[#fcfcfc] font-sans selection:bg-[#C08F2D] selection:text-white overflow-x-hidden" dir="rtl">
      
      {/* ================= 1. Hero Section ================= */}
      <div className="relative pt-28 md:pt-36 lg:pt-40 2xl:pt-48 pb-16 lg:pb-24 2xl:pb-32 bg-gradient-to-br from-[#8a1538] via-[#521623] to-[#1a070b] overflow-hidden min-h-[60vh] lg:min-h-[70vh] 2xl:min-h-[80vh] flex items-center">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0" style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '300px' }}></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center mt-6 md:mt-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-black text-white mb-4 lg:mb-6 2xl:mb-8 leading-[1.15] tracking-tight">
              رؤية ملكية..<br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C08F2D] to-[#fcebb6] drop-shadow-sm px-2 md:px-0">بطموح شبابي</span>
            </h1>
            <p className="text-[15px] lg:text-lg 2xl:text-xl text-white/90 font-medium max-w-4xl mx-auto mb-8 lg:mb-10 2xl:mb-12 leading-relaxed px-2">
              تنفيذاً لرؤية صاحب السموّ الأمير الحسين بن عبدالله الثاني، ولي العهد المعظم. بدأنا عملنا انطلاقاً من الإيمان العميق بأن الشباب هم الأساس في تشكيل مستقبل المملكة، ليكون لهم دور فعّال، ومؤهلين لنهضة أنفسهم ومجتمعاتهم.
            </p>
            <motion.div 
              animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
              className="flex justify-center mt-6 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
              onClick={() => document.getElementById('core-section').scrollIntoView({ behavior: 'smooth' })}
            >
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm shadow-md">
                <ChevronDown className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ================= 2. الرؤية والرسالة ================= */}
      <div id="core-section" className="py-12 lg:py-16 2xl:py-24 bg-[#f8fafc] relative scroll-mt-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 2xl:gap-12">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white p-6 lg:p-8 2xl:p-14 rounded-3xl 2xl:rounded-[2rem] border border-gray-100 hover:border-[#C08F2D]/40 hover:shadow-2xl transition-all duration-500 group">
              <div className="w-12 h-12 lg:w-14 lg:h-14 2xl:w-16 2xl:h-16 bg-[#8a1538]/5 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-5 2xl:mb-8 group-hover:bg-[#8a1538] transition-colors duration-500">
                <Eye className="w-6 h-6 lg:w-7 lg:h-7 2xl:w-8 2xl:h-8 text-[#8a1538] group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-xl lg:text-2xl 2xl:text-4xl font-black text-[#8a1538] mb-2 lg:mb-3 2xl:mb-6">رؤيتنا</h2>
              <h3 className="text-base lg:text-lg 2xl:text-2xl font-black text-[#C08F2D] mb-2 lg:mb-3">"شباب قادر لأردن طموح"</h3>
              <p className="text-[13px] lg:text-[14px] 2xl:text-lg text-gray-600 leading-relaxed font-medium">تتمحور جهود المؤسسة حول هذه الرؤية بهدف الربط بين الشباب والمؤسسات الوطنية، لتوجيه طاقاتهم وقدرتهم على الإبداع والابتكار نحو التطوير والنمو الدائم.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white p-6 lg:p-8 2xl:p-14 rounded-3xl 2xl:rounded-[2rem] border border-gray-100 hover:border-[#8a1538]/40 hover:shadow-2xl transition-all duration-500 group">
              <div className="w-12 h-12 lg:w-14 lg:h-14 2xl:w-16 2xl:h-16 bg-[#C08F2D]/10 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-5 2xl:mb-8 group-hover:bg-[#C08F2D] transition-colors duration-500">
                <Target className="w-6 h-6 lg:w-7 lg:h-7 2xl:w-8 2xl:h-8 text-[#C08F2D] group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-xl lg:text-2xl 2xl:text-4xl font-black text-[#8a1538] mb-2 lg:mb-3 2xl:mb-6">رسالتنا</h2>
              <p className="text-[13px] lg:text-[14px] 2xl:text-lg text-gray-600 leading-relaxed font-medium mt-3 lg:mt-6 2xl:mt-12">دعم الشباب وتمكينهم وتزويدهم بالمعرفة والخبرات اللازمة. نحن نؤمن أننا بمساعدتهم على التقدم والتطور نضمن مستقبلاً مشرقاً لهم ولعائلاتهم ومجتمعاتهم، وللأردن.</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ================= 3. إحصائيات الأثر ================= */}
      <div className="py-10 lg:py-14 2xl:py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl lg:rounded-3xl 2xl:rounded-[3rem] border border-gray-200 shadow-xl p-6 lg:p-8 2xl:p-16">
            <div className="text-center mb-6 lg:mb-8 2xl:mb-14">
              <h2 className="text-xl lg:text-2xl 2xl:text-4xl font-black text-[#8a1538] mb-1 lg:mb-2">نموذج وطني قوي</h2>
              <p className="text-gray-500 font-medium text-[12px] lg:text-[14px] 2xl:text-xl">أرقام تعكس حجم الأثر في كافة المحافظات</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 lg:gap-y-8 gap-x-4 lg:gap-6 2xl:gap-10 md:divide-x md:divide-x-reverse divide-gray-200">
              <div className="text-center md:px-4">
                <h3 className="text-2xl lg:text-4xl 2xl:text-6xl font-black text-[#8a1538] mb-1 lg:mb-2"><AnimatedNumber value={2.2} decimals={1} suffix="M" /></h3>
                <p className="text-[10px] lg:text-[12px] 2xl:text-base font-bold text-gray-600">شاب وشابة مستفيد</p>
              </div>
              <div className="text-center md:px-4">
                <h3 className="text-2xl lg:text-4xl 2xl:text-6xl font-black text-[#8a1538] mb-1 lg:mb-2"><AnimatedNumber value={14} prefix="+" /></h3>
                <p className="text-[10px] lg:text-[12px] 2xl:text-base font-bold text-gray-600">برنامج ومبادرة</p>
              </div>
              <div className="text-center md:px-4">
                <h3 className="text-2xl lg:text-4xl 2xl:text-6xl font-black text-[#8a1538] mb-1 lg:mb-2"><AnimatedNumber value={26} prefix="+" /></h3>
                <p className="text-[10px] lg:text-[12px] 2xl:text-base font-bold text-gray-600">موقع استراتيجي</p>
              </div>
              <div className="text-center md:px-4">
                <h3 className="text-2xl lg:text-4xl 2xl:text-6xl font-black text-[#8a1538] mb-1 lg:mb-2"><AnimatedNumber value={12} /></h3>
                <p className="text-[10px] lg:text-[12px] 2xl:text-base font-bold text-gray-600">محافظة نغطيها</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 4. مسيرة الأثر ================= */}
      <div className="py-16 lg:py-20 2xl:py-32 bg-[#f8fafc] overflow-hidden border-y border-gray-100">
        {/* 🟢 إضافة Padding للموبايل (px-4) لضمان مساحة للمحتوى الكلي */}
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 lg:mb-20 2xl:mb-28 relative z-10 px-4 md:px-0">
            <Milestone className="w-8 h-8 lg:w-10 lg:h-10 2xl:w-14 2xl:h-14 text-[#C08F2D] mx-auto mb-2 lg:mb-3 2xl:mb-6" />
            <h2 className="text-2xl lg:text-3xl 2xl:text-5xl font-black text-[#8a1538] mb-1 lg:mb-2">مسيرة الأثر</h2>
            <p className="text-[13px] lg:text-[14px] 2xl:text-xl text-gray-500 font-medium">محطات صنعناها معاً، ومستمرون في العطاء</p>
          </div>

          <div className="relative max-w-6xl mx-auto" ref={timelineRef}>
            {/* الخط في المنتصف في الديسكتوب، وعلى اليمين في الموبايل */}
            <div className="absolute right-4 md:right-1/2 transform md:translate-x-1/2 top-0 bottom-0 w-1.5 bg-gray-200 rounded-full z-0"></div>
            <motion.div 
              className="absolute right-4 md:right-1/2 transform md:translate-x-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#C08F2D] to-[#8a1538] rounded-full z-0 origin-top"
              style={{ scaleY: scrollYProgress }}
            ></motion.div>

            {milestones.map((stone, idx) => {
  const isEven = idx % 2 === 0;

  // 🟢 إعطاء مسافة padding للموبايل من اليسار ومن اليمين حتى لا تلتصق الكروت بأطراف الشاشة
  return (
    <div
      key={idx}
      className="relative flex flex-col md:flex-row items-center justify-between w-full mb-8 lg:mb-12 xl:mb-16 2xl:mb-24 group pr-14 pl-5 sm:pl-8 sm:pr-16 md:px-0"
    >
                  {/* الدائرة المركزية للتايم لاين */}
                  <div className="absolute right-[0.4rem] md:right-1/2 transform md:translate-x-1/2 w-4 h-4 lg:w-5 lg:h-5 2xl:w-8 2xl:h-8 rounded-full bg-white border-4 border-gray-300 z-20 flex items-center justify-center top-6 md:top-auto">
                    <motion.div 
                      initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: false, margin: "-50px" }} transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      className="w-full h-full bg-[#8a1538] rounded-full"
                    />
                  </div>

                  <div className={`w-full md:w-[45%] md:pr-0 ${isEven ? 'order-2 md:order-1' : 'order-2'}`}>
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} 
                      className={`bg-white rounded-2xl lg:rounded-3xl border border-gray-100 shadow-xl overflow-hidden hover:-translate-y-2 transition-transform duration-500 ${!isEven ? 'md:hidden' : ''}`}
                    >
                      <div className="md:hidden w-full h-48 sm:h-56 relative">
                         <img src={stone.image} alt={stone.title} className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      
                      <div className={`p-6 sm:p-8 lg:p-8 xl:p-10 2xl:p-12 border-t-4 ${isEven ? 'border-t-[#8a1538]' : 'border-t-[#C08F2D] md:border-t-0'}`}>
                        <span className="text-[#C08F2D] font-black text-lg lg:text-xl 2xl:text-3xl mb-1 block drop-shadow-sm">{stone.year}</span>
                        <h3 className="text-base lg:text-lg 2xl:text-2xl font-black text-[#8a1538] mb-1 lg:mb-2">{stone.title}</h3>
                        <p className="text-gray-500 font-medium text-[13px] lg:text-[14px] 2xl:text-base leading-relaxed">{stone.desc}</p>
                      </div>
                    </motion.div>

                    {!isEven && (
                      <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="hidden md:block relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl h-[16rem] lg:h-[20rem] 2xl:h-[24rem] group">
                        <img src={stone.image} alt={stone.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a070b]/60 to-transparent"></div>
                      </motion.div>
                    )}
                  </div>

                  <div className={`hidden md:block w-full md:w-[45%] md:pr-0 ${isEven ? 'order-1 md:order-2' : 'order-1'}`}>
                    {isEven ? (
                       <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl h-[16rem] lg:h-[20rem] 2xl:h-[24rem] group">
                         <img src={stone.image} alt={stone.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                         <div className="absolute inset-0 bg-gradient-to-t from-[#1a070b]/60 to-transparent"></div>
                       </motion.div>
                    ) : (
                       <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-white p-6 lg:p-8 xl:p-10 2xl:p-12 rounded-2xl lg:rounded-3xl border border-gray-100 shadow-xl border-t-4 border-t-[#C08F2D] hover:-translate-y-2 transition-transform duration-500">
                         <span className="text-[#C08F2D] font-black text-lg lg:text-xl 2xl:text-3xl mb-1 block drop-shadow-sm">{stone.year}</span>
                         <h3 className="text-base lg:text-lg 2xl:text-2xl font-black text-[#8a1538] mb-1 lg:mb-2">{stone.title}</h3>
                         <p className="text-gray-500 font-medium text-[13px] lg:text-[14px] 2xl:text-base leading-relaxed">{stone.desc}</p>
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
      <div className="py-12 lg:py-16 2xl:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 lg:mb-10 2xl:mb-16">
            <h2 className="text-xl lg:text-2xl 2xl:text-4xl font-black text-[#8a1538] mb-1 lg:mb-2 2xl:mb-4">مساراتنا الاستراتيجية</h2>
            <p className="text-[13px] lg:text-[14px] 2xl:text-lg text-gray-500 font-medium max-w-3xl mx-auto px-2">
              بهدف بناء قدرات الشباب وتوفير الأدوات والمنصات اللازمة، ركزنا عملنا الميداني والمؤسسي ضمن ثلاثة مسارات أساسية.
            </p>
          </div>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-4 lg:gap-5 2xl:gap-8 pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 items-stretch">
            {tracks.map((track, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-[#f8fafc] p-5 lg:p-6 2xl:p-10 rounded-2xl lg:rounded-3xl 2xl:rounded-[2rem] border border-gray-100 hover:border-[#C08F2D]/50 hover:shadow-[0_10px_30px_rgba(138,21,56,0.08)] transition-all duration-500 group w-[240px] md:w-auto md:min-w-0 snap-center shrink-0 flex flex-col h-auto"
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 2xl:w-16 2xl:h-16 bg-white shadow-sm rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-5 2xl:mb-8 group-hover:bg-[#8a1538] transition-colors duration-500 shrink-0">
                  <track.icon className="w-5 h-5 lg:w-6 lg:h-6 2xl:w-8 2xl:h-8 text-[#8a1538] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-base lg:text-lg 2xl:text-2xl font-black text-[#8a1538] mb-1 lg:mb-2 2xl:mb-4">{track.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed text-[12px] lg:text-[13px] 2xl:text-lg flex-grow">{track.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= 6. قيادات المؤسسة ================= */}
      {/* 🟢 تم فصل المكون واستدعائه هنا! */}
      <BoardMembers />

      {/* ================= 7. Call to Action ================= */}
      <div className="py-10 lg:py-14 2xl:py-24 bg-white relative px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-[#8a1538] via-[#5a1826] to-[#3b1019] rounded-2xl lg:rounded-3xl 2xl:rounded-[3rem] p-6 lg:p-10 2xl:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '300px' }}></div>
            
            <div className="relative z-10">
              <Heart className="w-8 h-8 lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 text-[#C08F2D] mx-auto mb-3 lg:mb-4 2xl:mb-6" />
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl font-black text-white mb-2 lg:mb-4 2xl:mb-6 leading-tight">
                القصة لم تكتمل بعد،<br className="hidden md:block"/>أنت من سيكتب الفصل القادم
              </h2>
              <p className="text-white/80 text-[12px] lg:text-[14px] 2xl:text-xl font-medium mb-6 lg:mb-8 2xl:mb-10 max-w-2xl mx-auto px-2">
                أصبحت المؤسسة منصة حيوية توحد جهود الشباب. لا تكتفِ بالقراءة، كن جزءاً من الأثر وابدأ رحلتك الآن.
              </p>
              <button 
                onClick={() => onNavigate('programs')}
                className="bg-[#C08F2D] hover:bg-[#a67b25] text-white px-6 lg:px-8 2xl:px-10 py-2.5 lg:py-3 2xl:py-4 rounded-full font-black text-[12px] lg:text-[13px] 2xl:text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 mx-auto block cursor-pointer"
              >
                استكشف برامجنا وفرصنا
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer onNavigate={onNavigate}/>
    </div>
  );
}