// src/components/Footer.jsx
import React from 'react';
import { Mail, Phone, MapPin, ArrowUpLeft } from 'lucide-react';

const FacebookIcon = (props) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>);
const InstagramIcon = (props) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>);
const LinkedinIcon = (props) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>);
const YoutubeIcon = (props) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 1.46 5.33 2.78 2.78 0 0 0 1.94 2C8.12 19.5 15 19.5 15 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 1.46-5.33 29 29 0 0 0-1.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>);
const XIcon = (props) => (<svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>);

export default function Footer({ onNavigate }) {
  
  const quickLinks = [
    { name: 'الرئيسية', id: 'home' },
    { name: 'عن المؤسسة', id: 'about' },
    { name: 'البرامج والمبادرات', id: 'programs' },
    { name: 'أحدث الأخبار', id: 'news' },
    { name: 'قصص النجاح', id: 'success' },
    { name: 'تواصل معنا', id: 'contact' }
  ];

  const initiatives = [
    { name: 'جامعة الحسين التقنية (HTU)', id: 'programs' },
    { name: 'برنامج 42 عمّان و42 إربد', id: 'programs' },
    { name: 'منصة نَحْنُ للتطوع', id: 'programs' },
    { name: 'مصنع الأفكار (TechWorks)', id: 'programs' },
    { name: 'برنامج خطى الحسين للمدارس', id: 'programs' }
  ];

  const socialLinks = [
    { icon: FacebookIcon, href: '#', name: 'Facebook' },
    { icon: XIcon, href: '#', name: 'X' },
    { icon: InstagramIcon, href: '#', name: 'Instagram' },
    { icon: LinkedinIcon, href: '#', name: 'LinkedIn' },
    { icon: YoutubeIcon, href: '#', name: 'YouTube' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // 🟢 تدرج مساحات الفوتر بشكل مريح
    <footer className="bg-[#3b1019] text-gray-200 pt-12 lg:pt-16 xl:pt-20 2xl:pt-28 pb-6 lg:pb-8 xl:pb-10 2xl:pb-14 relative overflow-hidden font-sans border-t-[6px] border-[#C08F2D]" dir="rtl">
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#8a1538]/20 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-0"
        style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '200px', backgroundRepeat: 'repeat' }}
      />

      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* قسم النشرة الإخبارية */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 pb-10 lg:pb-12 xl:pb-16 2xl:pb-20 mb-10 lg:mb-12 xl:mb-16 2xl:mb-20 border-b border-white/10">
          <div className="text-center lg:text-right w-full lg:w-1/2 lg:pe-6 xl:pe-10">
            <h3 className="text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl font-black text-white mb-2 lg:mb-3 2xl:mb-5 tracking-tight">اشترك في نشرتنا الإخبارية</h3>
            <p className="text-gray-300 text-sm lg:text-[13px] xl:text-base 2xl:text-2xl font-medium leading-relaxed px-4 lg:px-0">
              كن أول من يعلم عن أحدث الفرص، البرامج، والمبادرات التي تطلقها مؤسسة ولي العهد لدعم الشباب.
            </p>
          </div>
          <div className="w-full lg:w-1/2 flex items-center h-12 lg:h-12 xl:h-14 2xl:h-20 mt-2 lg:mt-0">
            <input 
              type="email" 
              placeholder="البريد الإلكتروني..." 
              className="w-full h-full bg-[#300d14] border border-white/10 text-white px-4 xl:px-5 2xl:px-8 rounded-r-xl focus:outline-none focus:border-[#C08F2D] transition-colors font-bold text-sm lg:text-[13px] xl:text-base 2xl:text-2xl placeholder:font-medium placeholder:text-gray-500"
            />
            <button className="h-full bg-[#C08F2D] hover:bg-[#a67b25] text-[#ffffff] font-black px-5 lg:px-6 xl:px-8 2xl:px-12 rounded-l-xl transition-colors whitespace-nowrap text-sm lg:text-[13px] xl:text-base 2xl:text-2xl shadow-md cursor-pointer">
              اشترك الآن
            </button>
          </div>
        </div>

        {/* الشبكة الرئيسية: تدرج الـ gap عشان ما تنضغط الأعمدة على الـ 13 إنش */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 xl:gap-12 2xl:gap-20 pb-10 lg:pb-12 xl:pb-16 2xl:pb-20 border-b border-white/10">
          
          <div className="space-y-5 lg:space-y-5 xl:space-y-6 2xl:space-y-8 flex flex-col items-center lg:items-start text-center lg:text-right">
            <div className="flex flex-col items-center lg:items-start gap-1">
              <img src="/logo_white.png" alt="مؤسسة ولي العهد" className="h-16 lg:h-16 xl:h-20 2xl:h-32 max-w-[280px] 2xl:max-w-md object-contain drop-shadow-lg" />
            </div>
            <p className="text-sm lg:text-[12px] xl:text-[14px] 2xl:text-xl leading-relaxed text-gray-200 font-medium lg:pe-2 xl:pe-4 px-2 lg:px-0 text-center lg:text-justify">
              مؤسسة وطنية تسعى لتمكين الشباب الأردني وتوجيه طاقاتهم نحو الابتكار، القيادة، والمشاركة الاقتصادية لبناء غدٍ مشرق للأردن طموح.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-2 xl:gap-3 2xl:gap-5 pt-2">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={idx} href={social.href} aria-label={social.name}
                    className="w-10 h-10 lg:w-9 lg:h-9 xl:w-10 xl:h-10 2xl:w-16 2xl:h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-[#C08F2D] hover:bg-[#C08F2D]/30 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 2xl:w-7 2xl:h-7" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="text-center md:text-right lg:pe-6 xl:pe-12 border-t border-white/5 md:border-t-0 pt-8 md:pt-0">
            <h4 className="text-[#C08F2D] font-black text-lg lg:text-base xl:text-xl 2xl:text-3xl mb-5 lg:mb-4 xl:mb-6 2xl:mb-8">روابط سريعة</h4>
            <ul className="space-y-3 lg:space-y-3 xl:space-y-4 2xl:space-y-6 text-[13px] lg:text-[12px] xl:text-[15px] 2xl:text-xl font-bold text-gray-200 flex flex-col items-center md:items-start">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => onNavigate && onNavigate(link.id)} 
                    className="text-gray-200 hover:text-white hover:-translate-x-1 inline-block transition-all duration-300 flex items-center gap-2 group w-fit cursor-pointer"
                  >
                    <span>{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-right lg:pe-6 xl:pe-12 border-t border-white/5 md:border-t-0 pt-8 md:pt-0">
            <h4 className="text-[#C08F2D] font-black text-lg lg:text-base xl:text-xl 2xl:text-3xl mb-5 lg:mb-4 xl:mb-6 2xl:mb-8">أبرز المبادرات</h4>
            <ul className="space-y-3 lg:space-y-3 xl:space-y-4 2xl:space-y-6 text-[13px] lg:text-[12px] xl:text-[15px] 2xl:text-xl font-bold text-gray-200 flex flex-col items-center md:items-start">
              {initiatives.map((item, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => onNavigate && onNavigate(item.id)} 
                    className="text-gray-200 hover:text-white hover:-translate-x-1 inline-block transition-all duration-300 flex items-center gap-2 group w-fit cursor-pointer"
                  >
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-right lg:pe-2 xl:pe-6 border-t border-white/5 md:border-t-0 pt-8 md:pt-0">
            <h4 className="text-[#C08F2D] font-black text-lg lg:text-base xl:text-xl 2xl:text-3xl mb-5 lg:mb-4 xl:mb-6 2xl:mb-8">معلومات الاتصال</h4>
            <ul className="space-y-4 lg:space-y-4 xl:space-y-6 2xl:space-y-8 text-[13px] lg:text-[12px] xl:text-[15px] 2xl:text-xl font-bold text-gray-200 flex flex-col items-center md:items-start">
              <li className="flex items-start justify-center md:justify-start gap-3 lg:gap-2 xl:gap-4">
                <MapPin className="w-4 h-4 lg:w-3.5 lg:h-3.5 xl:w-5 xl:h-5 2xl:w-8 2xl:h-8 text-[#C08F2D] shrink-0 mt-1" strokeWidth={2} />
                <span className="leading-relaxed font-medium">عمان، دابوق – شارع محمد السعد البطاينة</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3 lg:gap-2 xl:gap-4">
                <Phone className="w-4 h-4 lg:w-3.5 lg:h-3.5 xl:w-5 xl:h-5 2xl:w-8 2xl:h-8 text-[#C08F2D] shrink-0" strokeWidth={2} />
                <span className="font-sans font-black tracking-wider text-white pt-1" dir="ltr">+962 6 555 5555</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3 lg:gap-2 xl:gap-4">
                <Mail className="w-4 h-4 lg:w-3.5 lg:h-3.5 xl:w-5 xl:h-5 2xl:w-8 2xl:h-8 text-[#C08F2D] shrink-0" strokeWidth={2} />
                <a href="mailto:info@cpf.jo" className="hover:text-white transition-colors font-sans text-gray-200 font-bold" dir="ltr">info@cpf.jo</a>
              </li>
            </ul>
          </div>

        </div>

        {/* القسم السفلي */}
        <div className="pt-6 lg:pt-6 xl:pt-8 2xl:pt-12 flex flex-col md:flex-row-reverse items-center justify-between gap-5 md:gap-6 text-[11px] lg:text-[11px] xl:text-[13px] 2xl:text-xl font-bold text-gray-500">
          
          <button 
            onClick={scrollToTop}
            className="flex items-center justify-center w-full md:w-auto gap-2 text-gray-300 hover:text-white bg-[#300d14] hover:bg-[#a67b25] px-5 py-3 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 2xl:px-8 2xl:py-4 rounded-xl md:rounded-full transition-all border border-white/10 shadow-lg group cursor-pointer"
          >
            <span>أعلى الصفحة</span>
            <ArrowUpLeft className="w-4 h-4 2xl:w-6 2xl:h-6 transform rotate-45 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>

          <div className="flex items-center gap-4 xl:gap-6 2xl:gap-10">
            <a href="#" className="hover:text-white transition-colors">شروط الاستخدام</a>
            <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
          </div>

          <div className="text-center md:text-right font-medium">
            <span>جميع الحقوق محفوظة © ٢٠٢٦ </span>
            <span className="text-white font-bold">مؤسسة ولي العهد</span>
          </div>

        </div>

      </div>
    </footer>
  );
}