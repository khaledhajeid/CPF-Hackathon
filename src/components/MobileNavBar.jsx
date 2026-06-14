// src/components/MobileNavBar.jsx
import React from 'react';
import { Home, Layers, Trophy, User, MessageSquare } from 'lucide-react';

export default function MobileNavBar({ currentPage, onNavigate, onLoginClick }) {
  const navItems = [
    { id: 'home', icon: Home, label: 'الرئيسية' },
    { id: 'programs', icon: Layers, label: 'برامجنا' },
    { id: 'success', icon: Trophy, label: 'قصص نجاح' },
    { id: 'contact', icon: MessageSquare, label: 'تواصل' },
    { id: 'dashboard', icon: User, label: 'حسابي', isAction: true }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[90] bg-white/85 backdrop-blur-xl border-t border-gray-200 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center px-4 py-2 mb-1">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => item.isAction ? onLoginClick() : onNavigate(item.id)}
              className="relative flex flex-col items-center justify-center w-14 gap-1 transition-all duration-300"
            >
              {/* Animated Icon Container */}
              <div className={`relative p-1.5 rounded-xl transition-all duration-300 ${
                isActive ? 'bg-[#721F31]/10 text-[#721F31] -translate-y-1' : 'text-gray-400 hover:text-gray-600'
              }`}>
                <Icon className={`w-6 h-6 transition-all ${isActive ? 'fill-[#721F31]/20' : ''}`} />
                
                {/* Active Indicator Dot */}
                {isActive && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#C08F2D] rounded-full animate-in zoom-in"></span>
                )}
              </div>
              
              <span className={`text-[10px] font-bold transition-all duration-300 ${
                isActive ? 'text-[#721F31] opacity-100' : 'text-gray-500 opacity-80'
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