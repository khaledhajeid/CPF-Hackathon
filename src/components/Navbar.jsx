// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Search } from 'lucide-react';

export default function Navbar({ currentPage, onNavigate, onLoginClick, onSearchClick }) {
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const forceSolid = currentPage !== 'home';
  const isScrolled = forceSolid || scrollPos > 20;

  const navBg = isScrolled 
    ? 'bg-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] border-b border-gray-100' 
    : 'bg-gradient-to-b from-[#1a070b]/60 to-transparent border-transparent backdrop-blur-[2px]';
    
  const textColor = isScrolled ? 'text-[#1a1c1d]' : 'text-white';
  
  const buttonClass = isScrolled 
    ? 'bg-[#721F31] hover:bg-[#5a1826] text-white border-transparent py-3.5 px-8' 
    : 'bg-white/10 hover:bg-white hover:text-[#721F31] text-white border border-white/30 backdrop-blur-md py-3.5 px-8';

  // 🟢 تمت إضافة "الشركاء" هنا بالترتيب المنطقي للمستخدم
  const navLinks = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'programs', label: 'البرامج والفرص' },
    { id: 'success', label: 'قصص النجاح' },
    { id: 'partnerships', label: 'الشركاء' },
    { id: 'about', label: 'عن المؤسسة' },
    { id: 'contact', label: 'تواصل معنا' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out font-sans ${navBg} ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex justify-between items-center">
        
        <div className="flex items-center cursor-pointer group" onClick={() => onNavigate('home')}>
          <img 
            src={isScrolled ? "/CPF-Logo.png" : "/full_logo_white.png"} 
            alt="مؤسسة ولي العهد" 
            className={`h-16 md:h-[75px] object-contain transition-all duration-300 ${!isScrolled ? '' : ''}`}
          />
        </div>

        <div className="hidden lg:flex items-center gap-6 xl:gap-8 font-bold text-[16px] xl:text-[17px]">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button 
                key={link.id}
                onClick={() => onNavigate(link.id)} 
                className={`relative group py-2 transition-colors duration-300 ${isActive ? 'text-[#C08F2D]' : `${textColor} hover:text-[#C08F2D]`}`}
              >
                {link.label}
                <span className={`absolute bottom-0 right-0 h-[3px] transition-all duration-300 bg-[#C08F2D] ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 xl:gap-5">
          <button onClick={onSearchClick} className={`p-3 rounded-full transition-all duration-300 cursor-pointer ${isScrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}>
            <Search className="w-6 h-6" />
          </button>

          <button onClick={onLoginClick} className={`hidden md:flex items-center gap-3 rounded-lg font-bold text-[14px] xl:text-[15px] transition-all duration-300 shadow-sm cursor-pointer ${buttonClass}`}>
            <ShieldCheck className="w-5 h-5" /> تسجيل الدخول
          </button>
        </div>

      </div>
    </nav>
  );
}