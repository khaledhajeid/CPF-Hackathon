// src/pages/Login.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Eye, EyeOff, Mail, Fingerprint } from 'lucide-react';

export default function Login({ onLogin, onNavigateBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (window.innerWidth > 768) {
        document.getElementById('emailInput')?.focus();
      }
    }, 500);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onLogin) onLogin('user');
    }, 1500);
  };

  const isFormValid = /^\S+@\S+\.\S+$/.test(email) && password.length > 0;

  return (
    <div className="min-h-[100dvh] flex bg-white font-sans" dir="rtl">
      
      {/* =========================================
          النصف الأيمن: نموذج تسجيل الدخول 
          ========================================= */}
      <div className="w-full lg:w-1/2 flex flex-col relative justify-center px-5 sm:px-10 lg:px-16 xl:px-24">
        
        <div className="absolute top-6 right-5 sm:top-8 sm:right-8 z-20">
          <button
            onClick={onNavigateBack}
            aria-label="العودة"
            className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-full flex items-center justify-center transition-colors cursor-pointer"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto pt-24 sm:pt-20 pb-10"
        >
          {/* الترويسة */}
          <div className="mb-8 sm:mb-10 text-center">
            <div className="h-14 sm:h-16 flex items-center justify-center mb-5 sm:mb-6">
              <img
                src="/CPF-Logo.png"
                alt="شعار مؤسسة ولي العهد"
                className="h-full object-contain drop-shadow-sm"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2 tracking-tight">
              تسجيل الدخول
            </h1>
            <p className="text-gray-500 font-medium text-[13px] sm:text-sm px-4">
              أدخل بياناتك للوصول إلى آلاف الفرص والبرامج المتاحة
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">

            <div>
              <label htmlFor="emailInput" className="block text-[13px] font-black text-gray-900 mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </div>
                <input
                  id="emailInput"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني"
                  className="w-full bg-[#F8FAFC] border border-gray-200 text-gray-900 font-bold text-[14px] sm:text-[15px] py-3.5 pr-10 sm:pr-11 pl-4 rounded-xl hover:bg-gray-50 focus:bg-white focus:border-[#8a1538] focus:ring-4 focus:ring-[#8a1538]/10 outline-none transition-all placeholder:font-medium placeholder:text-[12px] sm:placeholder:text-[13px]"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[13px] font-black text-gray-900">
                  كلمة المرور
                </label>
                <button type="button" className="text-[11px] font-black text-[#8a1538] hover:text-[#C08F2D] transition-colors cursor-pointer">
                  نسيت كلمة المرور؟
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  className="w-full bg-[#F8FAFC] border border-gray-200 text-gray-900 font-bold text-[14px] sm:text-[15px] py-3.5 pr-10 sm:pr-11 pl-12 rounded-xl hover:bg-gray-50 focus:bg-white focus:border-[#8a1538] focus:ring-4 focus:ring-[#8a1538]/10 outline-none transition-all placeholder:font-medium placeholder:text-[12px] sm:placeholder:text-[13px]"
                  dir="ltr"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500 hover:text-[#8a1538] focus:outline-none transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="w-full relative overflow-hidden group bg-[#8a1538] hover:bg-[#680f2a] disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed text-white rounded-xl font-black text-[14px] sm:text-[15px] py-4 flex items-center justify-center gap-3 transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
              >
                {isLoading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                ) : (
                  <span>تسجيل الدخول</span>
                )}
              </button>
            </div>
          </form>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 sm:mt-10">
            <div className="relative flex items-center py-3">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink-0 mx-4 text-gray-500 text-[10px] sm:text-[11px] font-bold">أو</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <button type="button" className="w-full flex items-center justify-center gap-2.5 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-[13px] sm:text-[14px] py-3.5 rounded-xl transition-all shadow-sm cursor-pointer">
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                الدخول عبر Google
              </button>
              <button type="button" className="w-full flex items-center justify-center gap-2.5 bg-white border border-gray-200 hover:border-[#8a1538]/30 hover:bg-[#8a1538]/5 text-gray-700 font-bold text-[13px] sm:text-[14px] py-3.5 rounded-xl transition-all shadow-sm cursor-pointer">
                <Fingerprint className="w-5 h-5 text-[#8a1538]" />
                الدخول ببصمة الإصبع (Passkey)
              </button>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* =========================================
          النصف الأيسر: الصورة الفخمة والنصوص المنقحة
          ========================================= */}
      <div className="hidden lg:flex w-1/2 relative bg-[#1a0409] overflow-hidden items-center justify-center">
        
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070" 
          alt="Jordanian Youth" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity grayscale"
        />
        
        <div className="absolute inset-0 bg-gradient-to-br from-[#8a1538]/95 to-[#4d0b1f]/95" />

        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-overlay">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="cpf-login-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M0 60 Q 30 30 60 60 T 120 60 M60 0 Q 90 30 60 60 T 60 120" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
              <path d="M-60 60 Q -30 30 0 60 T 60 60 M0 0 Q 30 30 0 60 T 0 120" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#cpf-login-pattern)"></rect>
          </svg>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C08F2D]/20 blur-[120px] pointer-events-none rounded-full" />

        <div className="relative z-10 p-16 max-w-lg text-center">
          <h2 className="text-4xl xl:text-5xl font-black text-white mb-6 leading-[1.3] drop-shadow-lg">
            بوابة واحدة <br/> <span className="text-[#C08F2D]">لآلاف الفرص</span>
          </h2>
          <p className="text-white/90 font-medium text-[1.1rem] leading-relaxed max-w-md mx-auto">
            أدر تذاكر الفعاليات واكتشف مسارك المهني والأكاديمي بخطوة واحدة
          </p>
        </div>

      </div>
    </div>
  );
}