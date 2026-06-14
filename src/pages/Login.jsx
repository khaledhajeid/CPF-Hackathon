// src/pages/Login.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Fingerprint, Lock, ShieldCheck, User, Eye, EyeOff, Mail, Info } from 'lucide-react';

export default function Login({ onLogin, onNavigateBack }) {
  const [nationalId, setNationalId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onLogin) onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-white" dir="rtl">
      
      {/* النصف الأيمن: نموذج تسجيل الدخول */}
      <div className="w-full lg:w-1/2 flex flex-col relative justify-center px-8 sm:px-16 xl:px-24">
        
        {/* 🟢 زر العودة: عنابي كامل، نص أبيض، hover ذهبي */}
        <div className="absolute top-8 right-8 z-10">
          <button 
            onClick={onNavigateBack}
            className="flex items-center gap-2 bg-[#721F31] hover:bg-[#C08F2D] text-white px-6 py-2.5 rounded-full font-black text-sm transition-all duration-300 shadow-md hover:shadow-lg group"
          >
            <ArrowRight className="w-5 h-5 stroke-[2.5px] transform group-hover:translate-x-1 transition-transform" /> 
            العودة
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="w-full max-w-md mx-auto pt-16"
        >
          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-[#F8FAFC] border border-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <ShieldCheck className="w-8 h-8 text-[#C08F2D]" />
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">تسجيل الدخول</h1>
            <p className="text-gray-500 font-medium text-sm leading-relaxed max-w-sm mx-auto">
              للوصول إلى الفرص والبرامج المتاحة، يرجى إدخال بياناتك.
            </p>
          </div>

          {/* 🟢 نصوص منقحة وألوان رزينة */}
          <div className="mb-6 bg-[#C08F2D]/10 border border-[#C08F2D]/20 rounded-xl p-4 flex gap-3">
            <Info className="w-5 h-5 text-[#C08F2D] shrink-0 mt-0.5" />
            <p className="text-xs font-bold text-gray-700 leading-relaxed">
              ربط حسابك بتطبيق سند يوثق هويتك ويمنحك أولوية التسجيل في البرامج والفعاليات الحصرية.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-black text-gray-900 mb-2">الرقم الوطني</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  maxLength={10}
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value.replace(/\D/g, ''))}
                  placeholder="أدخل الرقم الوطني المكون من 10 أرقام"
                  className="w-full bg-[#F8FAFC] border border-gray-200 text-gray-900 font-bold text-sm py-4 pr-12 pl-4 rounded-xl hover:bg-gray-50 focus:bg-white focus:border-[#721F31] focus:ring-4 focus:ring-[#721F31]/10 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-black text-gray-900">كلمة المرور الخاصة بسند</label>
                <a href="#" className="text-[11px] font-black text-[#721F31] hover:underline">نسيت كلمة المرور؟</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  className="w-full bg-[#F8FAFC] border border-gray-200 text-gray-900 font-bold text-sm py-4 pr-12 pl-12 rounded-xl hover:bg-gray-50 focus:bg-white focus:border-[#721F31] focus:ring-4 focus:ring-[#721F31]/10 outline-none transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 hover:text-[#721F31] focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading || nationalId.length < 10 || !password}
                className="w-full relative overflow-hidden group bg-[#721F31] hover:bg-[#5a1826] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-black text-sm py-4 flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-[0_10px_30px_rgba(114,31,49,0.25)]"
              >
                {isLoading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <Fingerprint className="w-5 h-5 text-[#C08F2D]" />
                    <span>دخول موثق عبر سند</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-[10px] font-bold">أو الدخول بصفة غير موثقة</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs py-3 rounded-xl transition-all shadow-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs py-3 rounded-xl transition-all shadow-sm">
                <Mail className="w-5 h-5 text-gray-500" />
                البريد الإلكتروني
              </button>
            </div>
          </div>

        </motion.div>
      </div>

      {/* النصف الأيسر: نصوص منقحة وأيقونات ذهبية/بيضاء خالية من الأخضر */}
      <div className="hidden lg:flex w-1/2 relative bg-[#1a0409] overflow-hidden items-center justify-center">
        
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070" 
          alt="Jordanian Youth" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity grayscale"
        />
        
        <div className="absolute inset-0 bg-gradient-to-br from-[#721F31]/95 to-[#3b1019]/95" />

        <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none mix-blend-overlay">
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
          <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 mb-8 shadow-2xl">
            <ShieldCheck className="w-12 h-12 text-[#C08F2D]" />
          </div>
          <h2 className="text-4xl xl:text-5xl font-black text-white mb-6 leading-tight drop-shadow-lg">
            بوابة واحدة <br/> <span className="text-[#C08F2D]">لآلاف الفرص</span>
          </h2>
          <p className="text-white/80 font-medium text-lg leading-relaxed mb-10">
            سجّل دخولك لإدارة تذاكرك، متابعة رصيد نقاطك، واستكشاف مسارك بكل سهولة وأمان.
          </p>

          <div className="flex items-center justify-center gap-6 text-white/70 text-sm font-black bg-black/20 w-fit mx-auto px-6 py-3 rounded-full backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#C08F2D]" /> تشفير آمن
            </div>
            <div className="w-1.5 h-1.5 bg-white/30 rounded-full" />
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#C08F2D]" /> هوية موثقة
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}