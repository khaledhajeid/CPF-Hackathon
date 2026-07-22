// src/components/Footer.jsx
import { useState } from 'react';
import { Mail, Phone, MapPin, ArrowUpLeft, ArrowLeft, MessageCircle, Check, AlertCircle } from 'lucide-react';

const FacebookIcon = (props) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>);
const InstagramIcon = (props) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>);
const LinkedinIcon = (props) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>);
const XIcon = (props) => (<svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>);

// 🟢 مررنا onNavigate كـ Prop عشان نقدر نتنقل من الفوتر للصفحات
const FOCUS_RING = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C08F2D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#3b1019]';

export default function Footer({ onNavigate }) {

  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('idle'); // idle | success | error

  const quickLinks = [
    { name: 'الرئيسية', id: 'home' },
    { name: 'عن المؤسسة', id: 'about' },
    { name: 'البرامج والمبادرات', id: 'programs' },
    { name: 'أحدث الأخبار', id: 'news' },
    { name: 'التقارير والدراسات', id: 'publications' },
    { name: 'قصص النجاح', id: 'success' },
  ];

  const socialLinks = [
    { icon: FacebookIcon, href: 'https://www.facebook.com/CPFJO', name: 'Facebook' },
    { icon: XIcon, href: 'https://x.com/cpfjo', name: 'X' },
    { icon: InstagramIcon, href: 'https://www.instagram.com/cpfjo/', name: 'Instagram' },
    { icon: LinkedinIcon, href: 'https://www.linkedin.com/company/crown-prince-foundation/posts/?feedView=all', name: 'LinkedIn' },
  ];

  const handleComingSoon = (e) => e.preventDefault();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      setSubscribeStatus('error');
      return;
    }
    setSubscribeStatus('success');
    setEmail('');
  };

  return (
    <footer className="bg-[#3b1019] text-gray-200 pt-12 md:pt-16 pb-6 md:pb-8 relative overflow-hidden font-sans border-t-[6px] border-[#C08F2D]" dir="rtl">
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#8a1538]/20 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-0"
        style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '200px', backgroundRepeat: 'repeat' }}
      />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* قسم النشرة الإخبارية */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 pb-10 md:pb-12 mb-10 md:mb-12 border-b border-white/10">
          <div className="text-center lg:text-right w-full lg:w-1/2 lg:pe-10">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-2 md:mb-3 tracking-tight">اشترك في نشرتنا الإخبارية</h3>
            <p className="text-gray-300 text-sm md:text-base font-medium leading-relaxed px-4 lg:px-0">
              كن أول من يعلم عن أحدث الفرص، البرامج، والمبادرات التي تطلقها مؤسسة ولي العهد لدعم الشباب.
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <form onSubmit={handleSubscribe} className="flex items-center h-12 md:h-14 mt-2 lg:mt-0" noValidate>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (subscribeStatus !== 'idle') setSubscribeStatus('idle'); }}
                placeholder="البريد الإلكتروني..."
                aria-invalid={subscribeStatus === 'error'}
                className={`w-full h-full bg-[#300d14] border text-white px-4 md:px-5 rounded-r-xl transition-colors font-bold text-sm md:text-base placeholder:font-medium placeholder:text-gray-300 ${FOCUS_RING} ${subscribeStatus === 'error' ? 'border-red-400' : 'border-white/10 focus:border-[#C08F2D]'}`}
              />
              <button
                type="submit"
                className={`h-full bg-[#8a1538] hover:bg-[#680f2a] text-white font-black px-5 md:px-8 rounded-l-xl transition-colors whitespace-nowrap text-sm md:text-base shadow-md cursor-pointer ${FOCUS_RING}`}
              >
                اشترك الآن
              </button>
            </form>
            {subscribeStatus === 'success' && (
              <p className="flex items-center gap-2 mt-2 text-sm font-bold text-[#C08F2D]">
                <Check className="w-4 h-4 shrink-0" strokeWidth={3} />
                تم الاشتراك بنجاح، شكراً لك!
              </p>
            )}
            {subscribeStatus === 'error' && (
              <p className="flex items-center gap-2 mt-2 text-sm font-bold text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0" strokeWidth={2} />
                يرجى إدخال بريد إلكتروني صحيح
              </p>
            )}
          </div>
        </div>

        {/* الشبكة الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.15fr_0.85fr_1fr] gap-10 lg:gap-14 xl:gap-16 pb-10 md:pb-12 border-b border-white/10">

          <div className="space-y-5 lg:space-y-6 flex flex-col items-center lg:items-start text-center lg:text-right">
            <div className="flex flex-col items-center lg:items-start gap-1">
              <img src="/full_logo_white.png" alt="مؤسسة ولي العهد" className="h-16 md:h-20 max-w-[280px] object-contain drop-shadow-lg" />
            </div>
            <p className="text-sm md:text-base leading-relaxed text-gray-200 font-medium lg:pe-8 px-2 lg:px-0 text-center lg:text-right max-w-md">
              مؤسسة وطنية تسعى لتمكين الشباب الأردني وتوجيه طاقاتهم نحو الابتكار، القيادة، والمشاركة الاقتصادية لبناء غدٍ مشرق للأردن طموح.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}
                    className={`relative w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-[#C08F2D] hover:bg-[#C08F2D]/30 transition-all duration-300 ${FOCUS_RING}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="text-center md:text-right lg:pe-6 border-t border-white/5 md:border-t-0 pt-8 md:pt-0">
            <h4 className="text-[#C08F2D] font-black text-lg md:text-xl mb-5 md:mb-6">روابط سريعة</h4>
            <ul className="space-y-3 md:space-y-4 text-[13px] md:text-base font-bold text-gray-200 flex flex-col items-center md:items-start">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate && onNavigate(link.id)}
                    className={`text-gray-200 hover:text-white hover:-translate-x-1 inline-block transition-all duration-300 flex items-center gap-2 group w-fit cursor-pointer rounded ${FOCUS_RING}`}
                  >
                    <span>{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* بطاقة تواصل معنا: نقطة الدخول الرئيسية للتواصل بعد إزالتها من القائمة العلوية */}
          <div className="border-t border-white/5 md:border-t-0 pt-8 md:pt-0 md:col-span-2 lg:col-span-1">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#8a1538] to-[#4d0c1c] border border-[#C08F2D]/25 shadow-[0_25px_50px_-20px_rgba(0,0,0,0.5)] p-6 md:p-7">
              <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#C08F2D]/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-8 w-32 h-32 rounded-full bg-white/5 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center text-center md:items-start md:text-right">
                <h4 className="inline-flex items-center gap-2 text-white font-black text-lg md:text-xl mb-2">
                  <MessageCircle className="w-5 h-5 text-[#C08F2D] shrink-0" strokeWidth={2} /> لديك استفسار؟
                </h4>
                <p className="text-white/75 text-sm font-medium leading-relaxed mb-6">
                  فريقنا جاهز للإجابة على أسئلتك ومرافقتك في كل خطوة من مسارك.
                </p>

                <ul className="space-y-3.5 text-[13px] md:text-sm font-bold text-white/85 mb-7 w-full">
                  <li className="flex items-start justify-center md:justify-start gap-3">
                    <MapPin className="w-4 h-4 text-[#C08F2D] shrink-0 mt-0.5" strokeWidth={2} />
                    <span className="leading-relaxed font-medium">عمان، دابوق – شارع محمد السعد البطاينة</span>
                  </li>
                  <li className="flex items-center justify-center md:justify-start gap-3">
                    <Phone className="w-4 h-4 text-[#C08F2D] shrink-0" strokeWidth={2} />
                    <a href="tel:+96265555555" className={`font-sans font-black tracking-wider text-white hover:text-[#C08F2D] transition-colors rounded ${FOCUS_RING}`} dir="ltr">+962 6 555 5555</a>
                  </li>
                  <li className="flex items-center justify-center md:justify-start gap-3">
                    <Mail className="w-4 h-4 text-[#C08F2D] shrink-0" strokeWidth={2} />
                    <a href="mailto:info@cpf.jo" className={`hover:text-white transition-colors font-sans rounded ${FOCUS_RING}`} dir="ltr">info@cpf.jo</a>
                  </li>
                </ul>

                <button
                  onClick={() => onNavigate && onNavigate('contact')}
                  className={`w-full flex items-center justify-center gap-2 bg-[#C08F2D] hover:bg-white text-[#1a0409] hover:text-[#8a1538] font-black px-6 py-3.5 rounded-xl transition-all duration-300 shadow-lg cursor-pointer group ${FOCUS_RING}`}
                >
                  <span>تواصل معنا</span>
                  <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* القسم السفلي */}
        <div className="pt-6 md:pt-8 flex flex-col md:flex-row-reverse items-center justify-between gap-5 md:gap-6 text-[11px] md:text-[13px] font-bold text-gray-300">

          <button
            onClick={scrollToTop}
            className={`flex items-center justify-center w-full md:w-auto gap-2 text-gray-300 hover:text-white bg-[#300d14] hover:bg-[#a67b25] px-5 py-3 md:py-2.5 rounded-xl md:rounded-full transition-all border border-white/10 shadow-lg group cursor-pointer ${FOCUS_RING}`}
          >
            <span>أعلى الصفحة</span>
            <ArrowUpLeft className="w-4 h-4 transform rotate-45 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>

          <div className="flex items-center gap-4 md:gap-6">
            <a href="#" title="قريباً" aria-disabled="true" onClick={handleComingSoon} className={`hover:text-white transition-colors rounded ${FOCUS_RING}`}>
              شروط الاستخدام <span className="sr-only">(قريباً)</span>
            </a>
            <a href="#" title="قريباً" aria-disabled="true" onClick={handleComingSoon} className={`hover:text-white transition-colors rounded ${FOCUS_RING}`}>
              سياسة الخصوصية <span className="sr-only">(قريباً)</span>
            </a>
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