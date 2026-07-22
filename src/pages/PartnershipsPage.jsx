// src/pages/PartnershipsPage.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Handshake, Globe, TrendingUp, Building2, User, ArrowLeft, Send, UploadCloud, CheckCircle2 } from 'lucide-react';
import Footer from '../components/Footer';

export default function PartnershipsPage({ onNavigate, initialPartnerType }) {
  const [partnerType, setPartnerType] = useState(initialPartnerType === 'individual' ? 'individual' : 'organization');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (initialPartnerType) {
      setPartnerType(initialPartnerType);
      const timer = setTimeout(() => {
        document.getElementById('partnership-form')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [initialPartnerType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1500);
  };

  const partnersData = [
    { id: 1, name: 'Zinc', logo: 'https://zinc.jo/Content/img/zinc-logo.png', url: 'https://zinc.jo/ar' },
    { id: 2, name: 'Unicef', logo: 'https://1000logos.net/wp-content/uploads/2021/03/UNICEF-logo-1536x864.png', url: 'https://www.unicef.org/' },
    { id: 3, name: 'Zaha', logo: 'https://www.zaha.gov.jo/zahansite/images/en-logo.png', url: 'https://www.zaha.gov.jo/zahansite/ar/default.aspx' },
    { id: 4, name: 'ABJ', logo: 'https://abj.org.jo/wp-content/uploads/2024/01/logo.svg', url: 'https://abj.org.jo/ar' },
    { id: 5, name: 'HTU', logo: '/HTU.png', url: 'https://htu.edu.jo/ar' },
    { id: 6, name: 'AYC', logo: 'https://jordan.arabyouthcenter.org/storage/app/public/uploads/logo/xrFto2iHtBbycM0BeBKVvvT3FFvHlSlUd7pNFWY3.svg', url: 'https://jordan.arabyouthcenter.org/en' }
  ];

  const duplicatedPartners = [...partnersData, ...partnersData, ...partnersData, ...partnersData];

  return (
    <div className="w-full bg-[#fcfcfc] font-sans selection:bg-[#C08F2D] selection:text-white" dir="rtl">
      
      <style>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 50s linear infinite;
        }
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ================= 1. Hero Section ================= */}
      {/* 🟢 تم تقليل مسافات الـ Padding العلوية والسفلية ليكون الهيدر أقصر */}
      <div className="relative pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-28 lg:pb-16 xl:pt-32 xl:pb-20 2xl:pt-40 2xl:pb-24 bg-[#1a070b] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#721F31] via-[#3b1019] to-[#1a070b] z-0"></div>
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0" style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '400px' }}></div>
        
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-16 2xl:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* 🟢 تم تقليل المسافات السفلية (mb) بين العناصر لضغط الهيدر أكثر */}
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white mb-5 lg:mb-6 2xl:mb-8 leading-[1.2] tracking-tight">
              معاً، نصنع أثراً <span className="text-[#C08F2D]">يمتد لأجيال</span>
            </h1>
            <p className="text-[14px] sm:text-[15px] lg:text-[15px] xl:text-base 2xl:text-xl text-white/80 font-medium max-w-3xl mx-auto mb-6 lg:mb-8 2xl:mb-10 leading-relaxed">
              نؤمن في مؤسسة ولي العهد أن الشراكات الحقيقية هي المحرك الأساسي للتنمية. انضم إلى شبكتنا من الشركاء والخبراء لنساهم معاً في تمكين الشباب الأردني.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 lg:gap-4">
              <button
                onClick={() => document.getElementById('partnership-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#C08F2D] hover:bg-[#a67b25] text-[#1a0409] px-6 py-3 lg:px-7 lg:py-3.5 2xl:px-10 2xl:py-5 rounded-full font-black text-[12px] lg:text-[13px] 2xl:text-lg transition-all shadow-[0_0_20px_rgba(192,143,45,0.4)] hover:shadow-[0_0_30px_rgba(192,143,45,0.6)] flex items-center gap-2 lg:gap-3"
              >
                <span>ابدأ الشراكة</span>
                <ArrowLeft className="w-4 h-4 lg:w-4 lg:h-4 2xl:w-5 2xl:h-5" />
              </button>
              <a
                href="https://giving.htu.edu.jo/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white/40 hover:border-[#C08F2D] text-white hover:text-[#C08F2D] px-6 py-3 lg:px-7 lg:py-3.5 2xl:px-10 2xl:py-5 rounded-full font-black text-[12px] lg:text-[13px] 2xl:text-lg transition-all flex items-center gap-2 lg:gap-3"
              >
                <span>تبرع الآن</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ================= 2. شريط الشركاء المتحرك ================= */}
      <div className="py-12 lg:py-16 2xl:py-24 bg-white border-b border-gray-100 overflow-hidden">
        <div className="text-center mb-8 lg:mb-10 2xl:mb-14 px-6">
          <h2 className="text-2xl lg:text-3xl 2xl:text-4xl font-black text-[#721F31] tracking-tight mb-2 lg:mb-3 2xl:mb-4">
            شركاء <span className="text-[#8a1538]">الأثر</span>
          </h2>
          <p className="text-gray-500 font-medium text-[14px] lg:text-base 2xl:text-lg">مؤسسات رائدة آمنت برؤيتنا وشاركتنا المسير</p>
        </div>
        
        <div className="relative w-full flex overflow-x-hidden" dir="ltr">
          <div className="absolute inset-y-0 left-0 w-24 lg:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-24 lg:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="animate-infinite-scroll flex items-center gap-12 lg:gap-16 2xl:gap-24 whitespace-nowrap min-w-max px-6 lg:px-8">
            {duplicatedPartners.map((partner, idx) => (
              <a 
                key={idx} 
                href={partner.url}
                target={partner.url !== '#' ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="relative block flex-shrink-0 cursor-pointer group p-3 lg:p-4"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  loading="lazy"
                  decoding="async"
                  className="h-10 md:h-12 lg:h-14 2xl:h-18 w-auto object-contain grayscale-[30%] opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(192,143,45,0.6)] transition-all duration-300 ease-out"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ================= 3. لماذا تشاركنا؟ ================= */}
      <div className="py-16 lg:py-20 2xl:py-28 bg-[#f8fafc]">
        <div className="max-w-7xl lg:max-w-[1000px] 2xl:max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 2xl:px-6">
          <div className="text-center mb-10 lg:mb-12 2xl:mb-16">
            <h2 className="text-xl lg:text-2xl 2xl:text-4xl font-black text-[#721F31]">لماذا تعقد شراكة مع مؤسسة ولي العهد؟</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 2xl:gap-8">
            {[
              { icon: Globe, title: 'وصول واسع النطاق', desc: 'تواصل بشكل مباشر مع مئات الآلاف من الشباب الطموح في محافظات المملكة الـ 12.' },
              { icon: Handshake, title: 'المسؤولية المجتمعية (CSR)', desc: 'وجّه جهود مؤسستك نحو برامج ذات أثر تنموي مستدام ومقاس يعود بالنفع على المجتمع.' },
              { icon: TrendingUp, title: 'بيئة ابتكارية', desc: 'كن جزءاً من منظومة رائدة تدعم الابتكار، التكنولوجيا، والريادة بأعلى المعايير.' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-5 lg:p-6 2xl:p-8 rounded-2xl lg:rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="w-10 h-10 lg:w-12 lg:h-12 2xl:w-16 2xl:h-16 bg-[#721F31]/5 rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 lg:mb-4 2xl:mb-6 group-hover:bg-[#721F31] transition-colors">
                  <feature.icon className="w-5 h-5 lg:w-6 lg:h-6 2xl:w-8 2xl:h-8 text-[#721F31] group-hover:text-[#C08F2D] transition-colors" />
                </div>
                <h3 className="text-base lg:text-lg 2xl:text-2xl font-black text-[#721F31] mb-2 lg:mb-2">{feature.title}</h3>
                <p className="text-gray-500 font-medium text-[13px] lg:text-[14px] 2xl:text-base leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= 4. الفورم الذكي الموجه للأعمال (B2B Form Flow) ================= */}
      <div id="partnership-form" className="py-16 lg:py-20 2xl:py-28 relative scroll-mt-20">
        <div className="absolute inset-0 bg-[#721F31] h-[220px] lg:h-[260px] 2xl:h-[320px] z-0"></div>
        
        <div className="max-w-4xl lg:max-w-[850px] 2xl:max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 2xl:px-6 relative z-10">
          <div className="bg-white rounded-3xl lg:rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100">
            
            <div className="p-6 sm:p-8 lg:p-8 2xl:p-12">
              <AnimatePresence mode="wait">
              {isSent ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="text-center py-10">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-green-100">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="text-xl lg:text-2xl font-black text-[#721F31] mb-3">استلمنا طلب الشراكة بنجاح</h2>
                  <p className="text-gray-500 font-medium text-sm leading-relaxed mb-8 max-w-sm mx-auto">سيتواصل معكم فريق الشراكات خلال 48 ساعة عمل لتحديد موعد اجتماع.</p>
                  <button onClick={() => setIsSent(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-black text-sm transition-all cursor-pointer">
                    تعبئة نموذج آخر
                  </button>
                </motion.div>
              ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="text-center mb-8 lg:mb-10">
                <h2 className="text-xl lg:text-2xl 2xl:text-3xl font-black text-[#721F31] mb-2 lg:mb-3">نموذج التعبير عن الاهتمام (EOI)</h2>
                <p className="text-gray-500 font-medium text-[13px] lg:text-[14px] 2xl:text-base">الرجاء تعبئة البيانات المبدئية، وسيقوم فريق الشراكات بالتواصل معكم لتحديد موعد اجتماع.</p>
              </div>

              {/* أزرار التبديل */}
              <div className="flex p-1 bg-gray-100 rounded-xl lg:rounded-2xl mb-8 lg:mb-10" role="group" aria-label="نوع المتقدم للشراكة">
                <button
                  onClick={() => setPartnerType('organization')}
                  aria-pressed={partnerType === 'organization'}
                  className={`flex-1 flex items-center justify-center gap-2 min-h-11 py-2.5 lg:py-3 2xl:py-3.5 rounded-lg lg:rounded-xl font-bold text-[11px] lg:text-[12px] 2xl:text-sm transition-all ${partnerType === 'organization' ? 'bg-white text-[#721F31] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Building2 className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className="hidden sm:inline">مؤسسات / شركات</span>
                  <span className="sm:hidden">مؤسسات</span>
                </button>
                <button
                  onClick={() => setPartnerType('individual')}
                  aria-pressed={partnerType === 'individual'}
                  className={`flex-1 flex items-center justify-center gap-2 min-h-11 py-2.5 lg:py-3 2xl:py-3.5 rounded-lg lg:rounded-xl font-bold text-[11px] lg:text-[12px] 2xl:text-sm transition-all ${partnerType === 'individual' ? 'bg-white text-[#721F31] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <User className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className="hidden sm:inline">أفراد / خبراء</span>
                  <span className="sm:hidden">أفراد</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5 2xl:space-y-6">
                
                {/* الحقول الديناميكية */}
                {partnerType === 'organization' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 2xl:gap-6">
                    <div>
                      <label htmlFor="org-name" className="block mb-3 lg:mb-3.5 2xl:mb-4 text-[12px] lg:text-[13px] 2xl:text-[14px] font-bold text-gray-700">اسم الجهة / المؤسسة <span className="text-[#721F31]">*</span></label>
                      <input id="org-name" type="text" required className="w-full px-3 py-2.5 lg:px-4 lg:py-3 rounded-lg lg:rounded-xl border border-gray-200 focus:border-[#C08F2D] outline-none transition-all bg-gray-50 focus:bg-white text-[12px] lg:text-[13px] 2xl:text-[14px]" placeholder="مثال: شركة زين للاتصالات" />
                    </div>
                    <div>
                      <label htmlFor="org-website" className="block mb-3 lg:mb-3.5 2xl:mb-4 text-[12px] lg:text-[13px] 2xl:text-[14px] font-bold text-gray-700">الموقع الإلكتروني</label>
                      <input id="org-website" type="url" className="w-full px-3 py-2.5 lg:px-4 lg:py-3 rounded-lg lg:rounded-xl border border-gray-200 focus:border-[#C08F2D] outline-none transition-all bg-gray-50 focus:bg-white text-left text-[12px] lg:text-[13px] 2xl:text-[14px]" placeholder="https://www.example.com" dir="ltr" />
                    </div>
                    <div>
                      <label htmlFor="org-contact-name" className="block mb-3 lg:mb-3.5 2xl:mb-4 text-[12px] lg:text-[13px] 2xl:text-[14px] font-bold text-gray-700">اسم ضابط الارتباط (الشخص المعني) <span className="text-[#721F31]">*</span></label>
                      <input id="org-contact-name" type="text" required className="w-full px-3 py-2.5 lg:px-4 lg:py-3 rounded-lg lg:rounded-xl border border-gray-200 focus:border-[#C08F2D] outline-none transition-all bg-gray-50 focus:bg-white text-[12px] lg:text-[13px] 2xl:text-[14px]" placeholder="الاسم الكامل" />
                    </div>
                    <div>
                      <label htmlFor="org-job-title" className="block mb-3 lg:mb-3.5 2xl:mb-4 text-[12px] lg:text-[13px] 2xl:text-[14px] font-bold text-gray-700">المسمى الوظيفي <span className="text-[#721F31]">*</span></label>
                      <input id="org-job-title" type="text" required className="w-full px-3 py-2.5 lg:px-4 lg:py-3 rounded-lg lg:rounded-xl border border-gray-200 focus:border-[#C08F2D] outline-none transition-all bg-gray-50 focus:bg-white text-[12px] lg:text-[13px] 2xl:text-[14px]" placeholder="مثال: مدير العلاقات العامة" />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 2xl:gap-6">
                    <div>
                      <label htmlFor="individual-name" className="block mb-3 lg:mb-3.5 2xl:mb-4 text-[12px] lg:text-[13px] 2xl:text-[14px] font-bold text-gray-700">الاسم الرباعي <span className="text-[#721F31]">*</span></label>
                      <input id="individual-name" type="text" required className="w-full px-3 py-2.5 lg:px-4 lg:py-3 rounded-lg lg:rounded-xl border border-gray-200 focus:border-[#C08F2D] outline-none transition-all bg-gray-50 focus:bg-white text-[12px] lg:text-[13px] 2xl:text-[14px]" placeholder="الاسم الكامل" />
                    </div>
                    <div>
                      <label htmlFor="individual-expertise" className="block mb-3 lg:mb-3.5 2xl:mb-4 text-[12px] lg:text-[13px] 2xl:text-[14px] font-bold text-gray-700">مجال الخبرة <span className="text-[#721F31]">*</span></label>
                      <input id="individual-expertise" type="text" required className="w-full px-3 py-2.5 lg:px-4 lg:py-3 rounded-lg lg:rounded-xl border border-gray-200 focus:border-[#C08F2D] outline-none transition-all bg-gray-50 focus:bg-white text-[12px] lg:text-[13px] 2xl:text-[14px]" placeholder="مثال: تدريب تقني، ريادة أعمال" />
                    </div>
                  </div>
                )}

                {/* الحقول المشتركة */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 2xl:gap-6">
                  <div>
                    <label htmlFor="partner-email" className="block mb-3 lg:mb-3.5 2xl:mb-4 text-[12px] lg:text-[13px] 2xl:text-[14px] font-bold text-gray-700">البريد الإلكتروني <span className="text-[#721F31]">*</span></label>
                    <input id="partner-email" type="email" required className="w-full px-3 py-2.5 lg:px-4 lg:py-3 rounded-lg lg:rounded-xl border border-gray-200 focus:border-[#C08F2D] outline-none transition-all bg-gray-50 focus:bg-white text-left text-[12px] lg:text-[13px] 2xl:text-[14px]" placeholder="email@example.com" dir="ltr" />
                  </div>
                  <div>
                    <label htmlFor="partner-phone" className="block mb-3 lg:mb-3.5 2xl:mb-4 text-[12px] lg:text-[13px] 2xl:text-[14px] font-bold text-gray-700">رقم الهاتف المباشر <span className="text-[#721F31]">*</span></label>
                    <input id="partner-phone" type="tel" required className="w-full px-3 py-2.5 lg:px-4 lg:py-3 rounded-lg lg:rounded-xl border border-gray-200 focus:border-[#C08F2D] outline-none transition-all bg-gray-50 focus:bg-white text-left text-[12px] lg:text-[13px] 2xl:text-[14px]" placeholder="+962 7X XXX XXXX" dir="ltr" />
                  </div>
                </div>

                <div>
                  <label htmlFor="partnership-area" className="block mb-3 lg:mb-3.5 2xl:mb-4 text-[12px] lg:text-[13px] 2xl:text-[14px] font-bold text-gray-700">مجال الشراكة المقترح <span className="text-[#721F31]">*</span></label>
                  <select id="partnership-area" required className="w-full px-3 py-2.5 lg:px-4 lg:py-3 rounded-lg lg:rounded-xl border border-gray-200 focus:border-[#C08F2D] outline-none transition-all bg-gray-50 focus:bg-white text-gray-700 text-[12px] lg:text-[13px] 2xl:text-[14px]">
                    <option value="" disabled>اختر مجال الاهتمام...</option>
                    <option value="funding">دعم مالي ورعاية (Sponsorship)</option>
                    <option value="tech">تدريب وخبرات تقنية (Technical Expertise)</option>
                    <option value="venues">توفير مساحات ومرافق (Venues & Facilities)</option>
                    <option value="volunteering">فرص تطوع وتدريب للمستفيدين (Internships)</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="cooperation-idea" className="block mb-3 lg:mb-3.5 2xl:mb-4 text-[12px] lg:text-[13px] 2xl:text-[14px] font-bold text-gray-700">نبذة عن فكرة التعاون <span className="text-[#721F31]">*</span></label>
                  <textarea id="cooperation-idea" rows="3" required className="w-full px-3 py-2.5 lg:px-4 lg:py-3 rounded-lg lg:rounded-xl border border-gray-200 focus:border-[#C08F2D] outline-none transition-all bg-gray-50 focus:bg-white resize-none text-[12px] lg:text-[13px] 2xl:text-[14px]" placeholder="حدثنا باختصار عن كيف يمكننا التعاون معاً لخدمة الشباب الأردني..."></textarea>
                </div>

                <div className="pt-2">
                  <label className="flex flex-col items-center justify-center w-full h-20 lg:h-24 border-2 border-dashed border-gray-300 rounded-lg lg:rounded-xl hover:border-[#C08F2D] hover:bg-gray-50 transition-all cursor-pointer group">
                    <div className="flex flex-col items-center justify-center">
                      <UploadCloud className="w-5 h-5 lg:w-6 lg:h-6 text-gray-500 mb-1 lg:mb-2 group-hover:text-[#C08F2D] transition-colors" />
                      <p className="text-[11px] lg:text-[12px] 2xl:text-[13px] text-gray-500 font-medium group-hover:text-[#C08F2D] transition-colors">إرفاق العرض التقديمي (Pitch Deck) أو السيرة الذاتية (اختياري)</p>
                    </div>
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx,.ppt,.pptx" />
                  </label>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-[#721F31] hover:bg-[#521623] disabled:opacity-70 text-white py-3 lg:py-3.5 2xl:py-4 rounded-lg lg:rounded-xl font-black text-[13px] lg:text-[14px] 2xl:text-base transition-colors flex items-center justify-center gap-2 group mt-4 lg:mt-6 cursor-pointer">
                  {isSubmitting ? (
                    <span>جاري الإرسال...</span>
                  ) : (
                    <>
                      <span>إرسال الاهتمام (EOI)</span>
                      <Send className="w-4 h-4 lg:w-4 lg:h-4 2xl:w-5 2xl:h-5 rtl:-scale-x-100 transform group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] lg:text-[12px] 2xl:text-xs text-gray-500 mt-3 lg:mt-4 font-medium">
                  * سيتم التعامل مع كافة معلوماتكم بسرية تامة. سيتواصل معكم فريقنا خلال 48 ساعة عمل.
                </p>
              </form>
              </motion.div>
              )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}