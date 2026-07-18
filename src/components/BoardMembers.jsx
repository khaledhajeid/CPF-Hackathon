// src/components/BoardMembers.jsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, Briefcase } from 'lucide-react';

const LeaderModal = ({ leader, onClose }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (leader && leader.video && videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      setIsMuted(true);
      videoRef.current.play().catch(() => {});
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
      className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-6 lg:p-8 2xl:p-12 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      dir="rtl"
    >
      <motion.div
        initial={{ y: window.innerWidth < 768 ? '100%' : 20, opacity: window.innerWidth < 768 ? 1 : 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        exit={{ y: window.innerWidth < 768 ? '100%' : 20, opacity: window.innerWidth < 768 ? 1 : 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: window.innerWidth < 768 ? 250 : 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white overflow-hidden shadow-2xl w-full flex flex-col md:flex-row mt-auto md:mt-0 h-[85vh] md:h-auto md:max-h-[80vh] 2xl:max-h-[90vh] md:max-w-3xl lg:max-w-4xl 2xl:max-w-5xl md:rounded-[2rem] relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 md:top-5 md:right-5 w-8 h-8 md:w-10 md:h-10 bg-white/20 md:bg-gray-100 hover:bg-white/40 md:hover:bg-gray-200 backdrop-blur-md md:backdrop-blur-none rounded-full flex items-center justify-center transition-colors text-gray-800 md:text-gray-500 z-50 cursor-pointer shadow-sm md:shadow-none">
           <X className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        <div className="md:hidden w-full absolute top-0 left-0 right-0 flex justify-center pt-3 pb-4 z-40 cursor-grab active:cursor-grabbing" onClick={onClose}>
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        <div className="w-full md:w-1/2 lg:w-[55%] p-5 pt-14 lg:p-8 2xl:p-12 overflow-y-auto flex flex-col scrollbar-hide pb-20 md:pb-8 relative z-10 bg-white order-last md:order-first mt-[-20px] md:mt-0 rounded-t-3xl md:rounded-none">
          <div className="inline-flex items-center gap-1.5 md:gap-2 bg-[#8a1538]/10 text-[#8a1538] px-3 py-1.5 rounded-lg font-bold text-[10px] lg:text-xs w-fit mb-3">
            <Briefcase className="w-3 h-3 md:w-3.5 md:h-3.5" />
            {leader.role}
          </div>
          <h2 className="text-lg lg:text-2xl 2xl:text-4xl font-black text-gray-900 mb-2 lg:mb-4 pr-8 md:pr-0">{leader.name}</h2>
          <div className="flex-grow">
            <p className="text-gray-700 text-[13px] lg:text-[14px] 2xl:text-lg leading-relaxed lg:leading-[1.8rem] 2xl:leading-[2.2rem] font-medium text-justify">
              {leader.bio || 'يتمتع بخبرة واسعة في العمل التنموي والمؤسسي، ويسهم بشكل فاعل في توجيه استراتيجيات المؤسسة نحو تمكين الشباب الأردني وتحقيق رؤية القيادة الهاشمية في بناء مستقبل واعد ومستدام.'}
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-[45%] relative h-[250px] lg:h-[320px] 2xl:h-[450px] shrink-0 bg-gray-900 flex-grow-0 md:flex-grow order-first md:order-last pb-6 md:pb-0">
          {leader.video ? (
            <>
              <video ref={videoRef} src={leader.video} autoPlay loop muted defaultMuted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90"/>
              <button onClick={toggleMute} className="absolute top-16 md:top-6 left-4 md:left-6 z-20 w-8 h-8 lg:w-10 lg:h-10 2xl:w-11 2xl:h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all duration-300 cursor-pointer shadow-md">
                {isMuted ? <VolumeX className="w-3.5 h-3.5 lg:w-5 lg:h-5" /> : <Volume2 className="w-3.5 h-3.5 lg:w-5 lg:h-5" />}
              </button>
            </>
          ) : (
            <img src={leader.image} alt={leader.name} className="absolute inset-0 w-full h-full object-cover opacity-90 object-top" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-12 md:bottom-6 left-0 right-0 px-5 z-10 md:hidden">
            <h3 className="text-white font-black text-lg drop-shadow-md">{leader.name}</h3>
            <p className="text-[#C08F2D] font-bold text-[9px]">{leader.role}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function BoardMembers() {
  const [activeLeaderTab, setActiveLeaderTab] = useState('board');
  const [selectedLeader, setSelectedLeader] = useState(null); 

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
    <div className="py-10 lg:py-14 2xl:py-24 bg-[#f8fafc] border-t border-gray-100 overflow-hidden" dir="rtl">
      {/* 🟢 تصغير المساحة الكلية وإضافة Padding من اليمين واليسار (lg:px-16) لتصغير الكروت وترك مساحة أنيقة */}
      <div className="max-w-[1000px] 2xl:max-w-7xl mx-auto px-6 lg:px-16 2xl:px-6">
        <div className="text-center mb-6 lg:mb-8 2xl:mb-12">
          <h2 className="text-xl lg:text-2xl 2xl:text-4xl font-black text-[#8a1538] mb-1 lg:mb-2 2xl:mb-4">قيادات المؤسسة</h2>
          <p className="text-[13px] lg:text-[14px] 2xl:text-lg text-gray-500 font-medium mb-5 lg:mb-6 2xl:mb-10">كفاءات وطنية توجه البوصلة نحو تحقيق الرؤية الملكية</p>
          
          <div className="w-full max-w-xs lg:max-w-sm mx-auto bg-gray-200/60 p-1 rounded-full mb-6 lg:mb-8 2xl:mb-12 flex">
            <button 
              onClick={() => setActiveLeaderTab('board')}
              className={`flex-1 py-1.5 lg:py-2 2xl:py-3 rounded-full font-bold text-[11px] lg:text-[12px] 2xl:text-base transition-all duration-300 cursor-pointer ${activeLeaderTab === 'board' ? 'bg-white text-[#8a1538] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              مجلس الأمناء
            </button>
            <button 
              onClick={() => setActiveLeaderTab('executive')}
              className={`flex-1 py-1.5 lg:py-2 2xl:py-3 rounded-full font-bold text-[11px] lg:text-[12px] 2xl:text-base transition-all duration-300 cursor-pointer ${activeLeaderTab === 'executive' ? 'bg-white text-[#8a1538] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              الفريق الإداري
            </button>
          </div>
        </div>

        {/* 🟢 الشبكة: 5 أعمدة في شاشات اللابتوب الصغيرة (lg:grid-cols-5) لكي تُضغط الكروت وتصغر حجمها */}
        <motion.div layout className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4 2xl:gap-8 pb-4 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
          <AnimatePresence mode="popLayout">
            {leaders[activeLeaderTab].map((member) => (
              <motion.div 
                key={member.name}
                onClick={() => setSelectedLeader(member)}
                layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}
                // 🟢 الكرت نفسه: مسافات داخلية مريحة جداً (p-3 lg:p-4) وحواف ناعمة
                className="bg-white p-3 lg:p-4 2xl:p-5 rounded-xl lg:rounded-2xl 2xl:rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 group text-center w-[140px] sm:w-[150px] md:w-auto md:min-w-0 snap-center shrink-0 cursor-pointer flex flex-col"
              >
                <div className="relative overflow-hidden rounded-lg lg:rounded-xl 2xl:rounded-2xl mb-2 lg:mb-3 2xl:mb-4 aspect-[4/5] bg-gray-50">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 object-top"/>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-[9px] lg:text-[10px] 2xl:text-xs font-bold border border-white/50 px-2 lg:px-3 py-1 rounded-full">عرض التفاصيل</span>
                  </div>
                </div>
                {/* 🟢 الخطوط بقيت كبيرة ومقروءة رغم صغر الكرت */}
                <h3 className="text-[12px] lg:text-[14px] 2xl:text-[16px] font-black text-[#8a1538] mb-1 leading-snug">{member.name}</h3>
                <p className="text-[#C08F2D] font-bold text-[9px] lg:text-[11px] 2xl:text-[13px] leading-tight mt-auto">{member.role}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedLeader && (
          <LeaderModal 
            leader={selectedLeader} 
            onClose={() => setSelectedLeader(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}