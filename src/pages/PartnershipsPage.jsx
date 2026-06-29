// src/pages/PartnershipsPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Handshake, Globe, TrendingUp, Building2, User, ArrowLeft, Send, UploadCloud } from 'lucide-react';
import Footer from '../components/Footer';

export default function PartnershipsPage() {
  const [partnerType, setPartnerType] = useState('organization');

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
      
      {/* 🟢 حقن كود CSS مخصص لعمل حركة الشريط المستمرة مع ميزة التوقف عند الهوفر */}
      <style>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 50s linear infinite; /* بطأنا السرعة لـ 50 ثانية */
        }
        .animate-infinite-scroll:hover {
          animation-play-state: paused; /* التوقف عند وضع الماوس */
        }
      `}</style>

      {/* ================= 1. Hero Section ================= */}
      <div className="relative pt-32 pb-24 md:pt-44 md:pb-32 bg-[#1a070b] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#721F31] via-[#3b1019] to-[#1a070b] z-0"></div>
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0" style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '400px' }}></div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
              معاً، نصنع أثراً <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C08F2D] to-[#fcebb6]">يمتد لأجيال</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
              نؤمن في مؤسسة ولي العهد أن الشراكات الحقيقية هي المحرك الأساسي للتنمية. انضم إلى شبكتنا من الشركاء والخبراء لنساهم معاً في تمكين الشباب الأردني.
            </p>
            <button 
              onClick={() => document.getElementById('partnership-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#C08F2D] hover:bg-[#a67b25] text-white px-8 py-4 rounded-full font-black text-lg transition-all shadow-[0_0_20px_rgba(192,143,45,0.4)] hover:shadow-[0_0_30px_rgba(192,143,45,0.6)] flex items-center gap-3 mx-auto"
            >
              <span>ابدأ رحلة الشراكة</span>
              <ArrowLeft className="w-5 h-5 rtl:-scale-x-100" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* ================= 2. شريط الشركاء المتحرك (Infinite Marquee) ================= */}
      <div className="py-20 bg-white border-b border-gray-100 overflow-hidden">
        
        {/* 🟢 تكبير العنوان وإضافة السهم الأصفر ليتماشى مع الهوية البصرية */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/arrow-yellow.svg" className="w-6 h-6 md:w-8 md:h-8 shrink-0" alt="" />
            <h2 className="text-3xl md:text-4xl font-black text-[#721F31]">شركاء الأثر</h2>
          </div>
          <p className="text-gray-500 font-medium text-lg md:text-xl">مؤسسات رائدة آمنت برؤيتنا وشاركتنا المسير</p>
        </div>
        
        <div className="relative w-full flex overflow-x-hidden" dir="ltr">
          {/* تأثير التدرج على الأطراف */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* 🟢 استخدام كلاس الحركة المستمرة الذي برمجناه بالأعلى */}
          <div className="animate-infinite-scroll flex items-center gap-16 md:gap-24 whitespace-nowrap min-w-max px-8">
            {duplicatedPartners.map((partner, idx) => (
              <a 
                key={idx} 
                href={partner.url}
                target={partner.url !== '#' ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="relative block flex-shrink-0 cursor-pointer group p-4"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-14 md:h-18 w-auto object-contain grayscale-[30%] opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(192,143,45,0.6)] transition-all duration-300 ease-out" 
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ================= 3. لماذا تشاركنا؟ ================= */}
      <div className="py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#721F31]">لماذا تعقد شراكة مع مؤسسة ولي العهد؟</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: 'وصول واسع النطاق', desc: 'تواصل بشكل مباشر مع مئات الآلاف من الشباب الطموح في محافظات المملكة الـ 12.' },
              { icon: Handshake, title: 'المسؤولية المجتمعية (CSR)', desc: 'وجّه جهود مؤسستك نحو برامج ذات أثر تنموي مستدام ومقاس يعود بالنفع على المجتمع.' },
              { icon: TrendingUp, title: 'بيئة ابتكارية', desc: 'كن جزءاً من منظومة رائدة تدعم الابتكار، التكنولوجيا، والريادة بأعلى المعايير.' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-[#721F31]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#721F31] transition-colors">
                  <feature.icon className="w-8 h-8 text-[#721F31] group-hover:text-[#C08F2D] transition-colors" />
                </div>
                <h3 className="text-xl font-black text-[#721F31] mb-3">{feature.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= 4. الفورم الذكي الموجه للأعمال (B2B Form Flow) ================= */}
      <div id="partnership-form" className="py-24 relative scroll-mt-20">
        <div className="absolute inset-0 bg-[#721F31] h-[300px] z-0"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100">
            
            <div className="p-8 md:p-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-[#721F31] mb-4">نموذج التعبير عن الاهتمام (EOI)</h2>
                <p className="text-gray-500 font-medium">الرجاء تعبئة البيانات المبدئية، وسيقوم فريق الشراكات بالتواصل معكم لتحديد موعد اجتماع.</p>
              </div>

              {/* أزرار التبديل */}
              <div className="flex p-1 bg-gray-100 rounded-2xl mb-10">
                <button 
                  onClick={() => setPartnerType('organization')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all ${partnerType === 'organization' ? 'bg-white text-[#721F31] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Building2 className="w-5 h-5" />
                  مؤسسات / شركات
                </button>
                <button 
                  onClick={() => setPartnerType('individual')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all ${partnerType === 'individual' ? 'bg-white text-[#721F31] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <User className="w-5 h-5" />
                  أفراد / خبراء
                </button>
              </div>

              <form className="space-y-6">
                
                {/* الحقول الديناميكية */}
                {partnerType === 'organization' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">اسم الجهة / المؤسسة <span className="text-[#721F31]">*</span></label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C08F2D] outline-none transition-all bg-gray-50 focus:bg-white" placeholder="مثال: شركة زين للاتصالات" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">الموقع الإلكتروني</label>
                      <input type="url" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C08F2D] outline-none transition-all bg-gray-50 focus:bg-white text-left" placeholder="https://www.example.com" dir="ltr" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">اسم ضابط الارتباط (الشخص المعني) <span className="text-[#721F31]">*</span></label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C08F2D] outline-none transition-all bg-gray-50 focus:bg-white" placeholder="الاسم الكامل" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">المسمى الوظيفي <span className="text-[#721F31]">*</span></label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C08F2D] outline-none transition-all bg-gray-50 focus:bg-white" placeholder="مثال: مدير العلاقات العامة" />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">الاسم الرباعي <span className="text-[#721F31]">*</span></label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C08F2D] outline-none transition-all bg-gray-50 focus:bg-white" placeholder="الاسم الكامل" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">مجال الخبرة <span className="text-[#721F31]">*</span></label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C08F2D] outline-none transition-all bg-gray-50 focus:bg-white" placeholder="مثال: تدريب تقني، ريادة أعمال" />
                    </div>
                  </div>
                )}

                {/* الحقول المشتركة */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">البريد الإلكتروني <span className="text-[#721F31]">*</span></label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C08F2D] outline-none transition-all bg-gray-50 focus:bg-white text-left" placeholder="email@example.com" dir="ltr" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">رقم الهاتف المباشر <span className="text-[#721F31]">*</span></label>
                    <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C08F2D] outline-none transition-all bg-gray-50 focus:bg-white text-left" placeholder="+962 7X XXX XXXX" dir="ltr" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">مجال الشراكة المقترح <span className="text-[#721F31]">*</span></label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C08F2D] outline-none transition-all bg-gray-50 focus:bg-white text-gray-700">
                    <option value="">اختر مجال الاهتمام...</option>
                    <option value="funding">دعم مالي ورعاية (Sponsorship)</option>
                    <option value="tech">تدريب وخبرات تقنية (Technical Expertise)</option>
                    <option value="venues">توفير مساحات ومرافق (Venues & Facilities)</option>
                    <option value="volunteering">فرص تطوع وتدريب للمستفيدين (Internships)</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">نبذة عن فكرة التعاون <span className="text-[#721F31]">*</span></label>
                  <textarea rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C08F2D] outline-none transition-all bg-gray-50 focus:bg-white resize-none" placeholder="حدثنا باختصار عن كيف يمكننا التعاون معاً لخدمة الشباب الأردني..."></textarea>
                </div>

                <div className="pt-2">
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#C08F2D] hover:bg-gray-50 transition-all cursor-pointer group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="w-6 h-6 text-gray-400 mb-2 group-hover:text-[#C08F2D] transition-colors" />
                      <p className="text-sm text-gray-500 font-medium group-hover:text-[#C08F2D] transition-colors">إرفاق العرض التقديمي (Pitch Deck) أو السيرة الذاتية (اختياري)</p>
                    </div>
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx,.ppt,.pptx" />
                  </label>
                </div>

                <button type="button" className="w-full bg-[#721F31] hover:bg-[#521623] text-white py-4 rounded-xl font-black text-lg transition-colors flex items-center justify-center gap-2 group mt-6">
                  <span>إرسال الاهتمام (EOI)</span>
                  <Send className="w-5 h-5 rtl:-scale-x-100 transform group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
                <p className="text-center text-xs text-gray-400 mt-3 font-medium">
                  * سيتم التعامل مع كافة معلوماتكم بسرية تامة. سيتواصل معكم فريقنا خلال 48 ساعة عمل.
                </p>
              </form>
              
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}