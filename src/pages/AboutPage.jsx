import React from 'react';
import { motion } from 'framer-motion';
import { Target, Compass, Users, Flag, Building2, Code2, Briefcase, TrendingUp, Lightbulb, CheckCircle, Heart, Star } from 'lucide-react';
// import cpfLogo from ""; // تأكد من المسار الصحيح للصورة
const milestones = [
  {
    year: '2015',
    title: 'تأسيس المؤسسة',
    desc: 'انطلقت مؤسسة ولي العهد تنفيذاً لرؤية صاحب السموّ الأمير الحسين بن عبدالله الثاني، إيماناً عميقاً بأن الشباب هم الأساس في تشكيل مستقبل المملكة.',
    icon: Flag,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070'
  },
  {
    year: '2016',
    title: 'جامعة الحسين التقنية (HTU)',
    desc: 'استثمار استراتيجي لسد الفجوة بين المخرجات الأكاديمية واحتياجات سوق العمل، لإخراج كفاءات هندسية وتقنية جاهزة للاندماج في قطاعات الصناعة المتقدمة.',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086'
  },
  {
    year: '2019',
    title: 'توسيع الأثر المجتمعي (نَحْنُ)',
    desc: 'أطلقنا المنصة الوطنية للتطوع لبناء قاعدة موثوقة لجهود الشباب، واستثمرنا في بناء شخصيات قيادية مسؤولة قادرة على إدارة تحديات المجتمع.',
    icon: TrendingUp,
    image: 'https://images.unsplash.com/photo-1593113580332-ceb4b62dbba4?q=80&w=2070'
  },
  {
    year: '2024',
    title: '42 عمّان',
    desc: 'نموذج تعليمي ثوري يعتمد على التعلم النظير (Peer-to-Peer) لإنتاج مهندسي برمجيات يتقنون بناء الأنظمة المعقدة، ويسدّون النقص العالمي في الكفاءات التقنية.',
    icon: Code2,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071'
  },
  {
    year: 'اليوم',
    title: 'أثر وطني متجذّر',
    desc: 'وصلنا إلى 2.2 مليون شاب وشابة، من خلال أكثر من 14 برنامجاً، وأكثر من 26 موقعاً استراتيجياً في جميع محافظات المملكة.',
    icon: Briefcase,
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=1932'
  }
];

const values = [
  { icon: Users, label: 'الشمولية', color: '#721F31' },
  { icon: Lightbulb, label: 'الابتكار', color: '#C08F2D' },
  { icon: CheckCircle, label: 'المصداقية', color: '#721F31' },
  { icon: Heart, label: 'الإيجابية', color: '#C08F2D' },
];

const tracks = [
  { icon: Briefcase, title: 'مسار المشاركة الاقتصادية', desc: 'تمكين الشباب من الاندماج الفعّال في سوق العمل وريادة الأعمال.' },
  { icon: Star, title: 'مسار القيادة', desc: 'بناء جيل قيادي واعٍ قادر على صنع القرار وتحمّل المسؤولية.' },
  { icon: TrendingUp, title: 'مسار التنمية المجتمعية المستدامة', desc: 'تعزيز المشاركة المجتمعية وتنمية المجتمعات المحلية في كافة المحافظات.' },
];

export default function AboutPage() {
  const breathingVariants = {
    animate: {
      rotate: [0, 360, 360, 0, 0],
      scale: [1, 1.15, 1.15, 1, 1],
      transition: {
        duration: 4,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1],
        repeat: Infinity,
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] relative overflow-hidden font-sans" dir="rtl">

      {/* خلفية ناعمة */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-gradient-to-bl from-[#721F31]/6 to-transparent blur-[130px] pointer-events-none" />
      <div className="absolute top-[50%] -left-48 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-[#C08F2D]/8 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-32 pb-24 relative z-10">

        {/* =========================================
            1. الهيرو
            ========================================= */}
        <div className="flex flex-col items-center text-center mb-28">
            {/* <motion.div
                variants={breathingVariants}
                animate="animate"
                className="mb-10 flex justify-center"
            > */}
         {/* <img
            src={cpfLogo}
            alt="CPF Logo"
            className="h-28 md:h-36 w-auto object-contain"
        /> */}
        {/* </motion.div> */}

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.25] mb-6"
          >
            شباب قادر <br />
            <span className="text-[#721F31]">لأردنٍ طموح</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg md:text-xl text-gray-500 max-w-2xl font-medium leading-relaxed"
          >
            هدفنا الرئيسي هو تمكين الشباب، وتزويدهم بالمعرفة والخبرات اللازمة، ليكون لهم دور فعّال في مجتمعهم، مؤهّلين بالمهارات التي ستساعدهم على تنمية وتطوير أنفسهم ومجتمعاتهم والمملكة.
          </motion.p>

          {/* إحصائيات سريعة */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-10 mt-14"
          >
            {[
              { number: '2.2M', label: 'شاب وشابة' },
              { number: '+14', label: 'برنامجاً' },
              { number: '+26', label: 'موقعاً استراتيجياً' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-black text-[#721F31]">{stat.number}</span>
                <span className="text-sm text-gray-400 font-medium mt-1">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* =========================================
            2. عن المؤسسة
            ========================================= */}
        <div className="grid md:grid-cols-2 gap-8 mb-28 items-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#C08F2D] font-black text-sm tracking-widest uppercase mb-4 block">من نحن</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-6">
              مؤسسة تنبع من إيمان عميق بالشباب
            </h2>
            <p className="text-gray-500 font-medium leading-loose text-[15px] mb-5">
              تنفيذاً لرؤية صاحب السموّ الأمير الحسين بن عبدالله الثاني، ولي العهد المعظم، الرامية لبناء مستقبل مشرق للشباب في الأردن، بدأت مؤسسة ولي العهد عملها عام 2015، انطلاقاً من إيمانه العميق بأن الشباب هم الأساس في تشكيل مستقبل المملكة.
            </p>
            <p className="text-gray-500 font-medium leading-loose text-[15px]">
              توجّه المؤسسة برامجها لجميع الشباب في الأردن، وتتواجد في جميع محافظات المملكة، لضمان أن يحصل كل شاب على الدعم والفرص التي يحتاج للنمو والتطور. واليوم، أصبحت المؤسسة نموذجاً وطنياً قوياً يُحتذى به.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[2rem] overflow-hidden aspect-[4/3] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100"
          >
            <img
              src="https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=2070"
              alt="شباب الأردن"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#721F31]/20 to-transparent" />
          </motion.div>
        </div>

        {/* =========================================
            3. الرؤية
            ========================================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#721F31] rounded-[2rem] p-10 md:p-16 mb-28 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#C08F2D]/10 translate-x-1/3 translate-y-1/3" />
          <div className="relative z-10">
            <span className="text-[#C08F2D] font-black text-sm tracking-widest uppercase mb-4 block">رؤيتنا</span>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
              شباب قادر لأردنٍ طموح
            </h2>
            <p className="text-white/70 font-medium leading-loose text-[15px] max-w-2xl mx-auto">
              نؤمن بأن الشباب هم أساس المستقبل. وأننا بدعمهم وتمكينهم ومساعدتهم على التقدم والتطور نضمن مستقبلاً مشرقاً لهم ولعائلاتهم ومجتمعاتهم، وللأردن. أصبحت المؤسسة منصة حيوية توحّد جهود الشباب والقطاعين العام والخاص لتوجيه طاقاتهم نحو التطوير والنمو الفعّال.
            </p>
          </div>
        </motion.div>

        {/* =========================================
            4. المسارات
            ========================================= */}
        <div className="mb-28">
          <div className="text-center mb-14">
            <span className="text-[#C08F2D] font-black text-sm tracking-widest uppercase mb-3 block">مساراتنا</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              ثلاثة مسارات لبناء القدرات
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto font-medium text-[15px] leading-relaxed">
              بهدف بناء قدرات الشباب وتوفير الأدوات والمنصّات اللازمة، ركّزنا عملنا ضمن ثلاثة مسارات أساسية.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tracks.map((track, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 flex flex-col items-start cursor-default"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#fcfcfc] border border-gray-100 flex items-center justify-center mb-6 shadow-sm">
                  <track.icon className="w-6 h-6 text-[#721F31]" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">{track.title}</h3>
                <p className="text-gray-400 font-medium leading-loose text-[14px]">{track.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* =========================================
            5. خط الزمن
            ========================================= */}
        <div className="mb-28">
          <div className="text-center mb-14">
            <span className="text-[#C08F2D] font-black text-sm tracking-widest uppercase mb-3 block">مسيرتنا</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">محطات رئيسية</h2>
          </div>

          <div className="relative max-w-[960px] mx-auto">
            {/* الخط المركزي */}
            <div className="absolute right-[39px] md:right-1/2 md:translate-x-1/2 top-8 bottom-8 w-[2px] bg-gray-100 z-0" />

            <div className="space-y-12 md:space-y-20 relative z-10">
              {milestones.map((milestone, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={idx} className={`flex flex-col md:flex-row items-start md:items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>

                    {/* الكرت النصي */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="w-full md:w-[45%] pl-12 pr-4 md:px-0"
                    >
                      <div className={`bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(114,31,49,0.06)] transition-shadow duration-300 ${isEven ? 'md:mr-auto md:ml-8' : 'md:ml-auto md:mr-8'}`}>
                        <div className="md:hidden w-full h-44 relative">
                          <img src={milestone.image} alt={milestone.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-[#721F31]/10" />
                        </div>
                        <div className="p-7">
                          <span className="text-[#C08F2D] font-black text-base mb-2 block">{milestone.year}</span>
                          <h3 className="text-xl font-black text-gray-900 mb-3">{milestone.title}</h3>
                          <p className="text-gray-400 font-medium leading-loose text-[14px]">{milestone.desc}</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* الأيقونة المركزية */}
                    <div className="absolute right-4 md:right-1/2 md:translate-x-1/2 flex items-center justify-center mt-8 md:mt-0 z-20">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, type: "spring" }}
                        className="w-12 h-12 bg-white border-2 border-gray-100 rounded-2xl flex items-center justify-center shadow-sm"
                      >
                        <milestone.icon className="w-5 h-5 text-[#721F31]" strokeWidth={2} />
                      </motion.div>
                    </div>

                    {/* الصورة الجانبية (desktop فقط) */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className={`hidden md:block w-[45%] relative group ${isEven ? 'ml-8' : 'mr-8'}`}
                    >
                      <div className="relative aspect-[4/3] rounded-[1.75rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100">
                        <div className="absolute inset-0 bg-[#721F31]/5 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
                        <img
                          src={milestone.image}
                          alt={milestone.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </motion.div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================
            6. قيمنا
            ========================================= */}
        <div className="mb-20">
          <div className="text-center mb-14">
            <span className="text-[#C08F2D] font-black text-sm tracking-widest uppercase mb-3 block">قيمنا</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">ما يحرّك عملنا</h2>
            <p className="text-gray-400 mt-4 max-w-md mx-auto font-medium text-[15px] leading-relaxed">
              نعمل ضمن مجموعة من القيم التي تؤطّر عملنا في خدمة وتمكين شباب الأردن.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 flex flex-col items-center text-center cursor-default"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${val.color}12` }}
                >
                  <val.icon className="w-7 h-7" style={{ color: val.color }} strokeWidth={2} />
                </div>
                <h3 className="text-lg font-black text-gray-900">{val.label}</h3>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}