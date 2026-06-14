// src/components/Footer.jsx
import React from 'react';
import { Mail, Phone, MapPin, ArrowUpLeft } from 'lucide-react';

const FacebookIcon = (props) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>);
const InstagramIcon = (props) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>);
const LinkedinIcon = (props) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>);
const YoutubeIcon = (props) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 1.46 5.33 2.78 2.78 0 0 0 1.94 2C8.12 19.5 15 19.5 15 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 1.46-5.33 29 29 0 0 0-1.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>);

export default function Footer() {
  
  const quickLinks = [
    { name: 'الرئيسية', href: '#' },
    { name: 'عن المؤسسة', href: '#' },
    { name: 'البرامج والمبادرات', href: '#programs-logos' },
    { name: 'بوصلة الفرص', href: '#events-section' },
    { name: 'قصص النجاح', href: '#' },
    { name: 'تواصل معنا', href: '#' }
  ];

  const initiatives = [
    { name: 'جامعة الحسين التقنية (HTU)', href: '#' },
    { name: 'برنامج 42 عمّان و42 إربد', href: '#' },
    { name: 'منصة نَحْنُ للتطوع', href: '#' },
    { name: 'مصنع الأفكار (TechWorks)', href: '#' },
    { name: 'برنامج خطى الحسين للمدارس', href: '#' }
  ];

  const socialLinks = [
    { icon: FacebookIcon, href: '#', name: 'Facebook' },
    { icon: InstagramIcon, href: '#', name: 'Instagram' },
    { icon: LinkedinIcon, href: '#', name: 'LinkedIn' },
    { icon: YoutubeIcon, href: '#', name: 'YouTube' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // 🟢 شلنا الـ inline style من الـ Footer عشان يورث الخط النظيف
    <footer className="bg-[#3b1019] text-gray-200 pt-16 pb-8 relative border-t-4 border-[#721F31] font-sans" dir="rtl">
      
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '180px', backgroundRepeat: 'repeat' }}
      />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* قسم النشرة الإخبارية */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-12 mb-12 border-b border-white/10">
          <div className="text-right w-full lg:w-1/2 pe-10">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-3">اشترك في نشرتنا الإخبارية</h3>
            <p className="text-gray-300 text-base font-medium leading-relaxed">
              كن أول من يعلم عن أحدث الفرص، البرامج، والمبادرات التي تطلقها مؤسسة ولي العهد لدعم الشباب.
            </p>
          </div>
          <div className="w-full lg:w-1/2 flex items-center h-14">
            <input 
              type="email" 
              placeholder="البريد الإلكتروني..." 
              className="w-full h-full bg-[#300d14] border border-white/10 text-white px-5 rounded-r-xl focus:outline-none focus:border-[#C08F2D] transition-colors font-bold text-base"
            />
            <button className="h-full bg-[#C08F2D] hover:bg-[#a67b25] text-[#1a1c1d] font-black px-8 rounded-l-xl transition-colors whitespace-nowrap text-base">
              اشترك الآن
            </button>
          </div>
        </div>

        {/* الشبكة الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          
          <div className="space-y-6 text-right">
            <div className="flex flex-col items-start gap-1">
              <img src="/logo_white.png" alt="مؤسسة ولي العهد - Crown Prince Foundation" className="h-20 max-w-[250px] object-contain" />
            </div>
            <p className="text-base leading-8 text-gray-200 font-medium pe-4">
              مؤسسة وطنية تسعى لتمكين الشباب الأردني وتوجيه طاقاتهم نحو الابتكار، القيادة، والمشاركة الاقتصادية لبناء غدٍ مشرق للأردن طموح.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={idx} href={social.href} aria-label={social.name}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#C08F2D] hover:text-white hover:border-[#C08F2D] hover:bg-[#C08F2D] transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="text-right lg:pe-12">
            <h4 className="text-[#C08F2D] font-black text-xl mb-6">روابط سريعة</h4>
            <ul className="space-y-4 text-base font-bold text-gray-200">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-200 hover:text-[#C08F2D] transition-colors flex items-center gap-2 group w-fit">
                    <span className="text-[#C08F2D] transition-colors">-</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-right lg:pe-12">
            <h4 className="text-[#C08F2D] font-black text-xl mb-6">أبرز المبادرات</h4>
            <ul className="space-y-4 text-base font-bold text-gray-200">
              {initiatives.map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} className="text-gray-200 hover:text-[#C08F2D] transition-colors flex items-center gap-2 group w-fit">
                    <span className="text-[#C08F2D] transition-colors">-</span>
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-right lg:pe-6">
            <h4 className="text-[#C08F2D] font-black text-xl mb-6">معلومات الاتصال</h4>
            <ul className="space-y-6 text-base font-bold text-gray-200">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#C08F2D] shrink-0 mt-1" strokeWidth={2} />
                <span className="leading-relaxed font-medium">عمان، المملكة الأردنية الهاشمية<br /><span className="text-gray-400 text-sm">شارع الملك عبدالله الثاني</span></span>
              </li>
              <li className="flex items-center gap-4 font-sans ltr">
                <Phone className="w-5 h-5 text-[#C08F2D] shrink-0" strokeWidth={2} />
                <span className="font-sans font-black">+962 6 550 0000</span>
              </li>
              <li className="flex items-center gap-4 font-sans ltr">
                <Mail className="w-5 h-5 text-[#C08F2D] shrink-0" strokeWidth={2} />
                <a href="mailto:info@cpf.jo" className="hover:text-[#C08F2D] transition-colors font-sans text-gray-200 font-bold">info@cpf.jo</a>
              </li>
            </ul>
          </div>

        </div>

        {/* القسم السفلي */}
        <div className="pt-8 flex flex-col md:flex-row-reverse items-center justify-between gap-6 text-sm font-bold text-gray-400">
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[#C08F2D] hover:text-white bg-[#300d14] hover:bg-[#a67b25] px-5 py-2.5 rounded-full transition-all border border-white/10 shadow-lg group"
          >
            <span>أعلى الصفحة</span>
            <ArrowUpLeft className="w-4 h-4 transform rotate-45 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#C08F2D] transition-colors">شروط الاستخدام</a>
            <a href="#" className="hover:text-[#C08F2D] transition-colors">سياسة الخصوصية</a>
          </div>

          <div className="text-center md:text-right font-medium">
            <span>جميع الحقوق محفوظة © ٢٠٢٦ </span>
            <span className="text-gray-200 font-bold">مؤسسة ولي العهد</span>
          </div>

        </div>

      </div>
    </footer>
  );
}