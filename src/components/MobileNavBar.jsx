// src/components/MobileNavBar.jsx
import React from 'react';
import { Home, Layers, Trophy, User, MessageSquare } from 'lucide-react';

export default function MobileNavBar({ currentPage, onNavigate, onLoginClick }) {
  const navItems = [
    { id: 'home', icon: Home, label: 'الرئيسية' },
    { id: 'programs', icon: Layers, label: 'البرامج' },
    { id: 'success', icon: Trophy, label: 'الإنجازات' },
    { id: 'contact', icon: MessageSquare, label: 'تواصل' },
    { id: 'dashboard', icon: User, label: 'حسابي', isAction: true }
  ];

  return (
    // 🟢 الـ z-index عالي، والـ pb-[env(safe-area-inset-bottom)] عشان شريط الآيفون
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[90] bg-white/90 backdrop-blur-xl border-t border-gray-200/60 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_40px_rgba(0,0,0,0.08)]" dir="rtl">
      <div className="flex justify-around items-center px-2 py-2">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => item.isAction ? onLoginClick() : onNavigate(item.id)}
              className="relative flex flex-col items-center justify-center w-16 h-14 gap-1 transition-all duration-300 tap-highlight-transparent group outline-none"
            >
              {/* 🟢 الأيقونة مع تأثير الـ Native (تكبير خفيف وتغيير لون) */}
              <div className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-[#8a1538]/10 text-[#8a1538] transform -translate-y-1' 
                  : 'bg-transparent text-gray-400 group-hover:text-gray-600'
              }`}>
                <Icon className={`transition-all duration-300 ${isActive ? 'w-5 h-5 fill-[#8a1538]/20' : 'w-5 h-5'}`} strokeWidth={isActive ? 2.5 : 2} />
                
                {/* 🟢 النقطة الذهبية تحت الأيقونة النشطة */}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#C08F2D] rounded-full animate-in zoom-in duration-300"></span>
                )}
              </div>
              
              {/* 🟢 النص (يختفي أو يخفت إذا مش نشط عشان النظافة البصرية) */}
              <span className={`text-[10px] font-black transition-all duration-300 tracking-wide ${
                isActive ? 'text-[#8a1538] opacity-100 transform -translate-y-0.5' : 'text-gray-400 opacity-90'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}