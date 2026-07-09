// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Search, Menu, X, User } from 'lucide-react';

export default function Navbar({ currentPage, onNavigate, onLoginClick, onSearchClick }) {
  const [scrollPos, setScrollPos] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 🟢 حالة القائمة الجانبية

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🟢 منع السكرول للصفحة لما تكون القائمة الجانبية فاتحة
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const forceSolid = currentPage !== 'home';
  const isScrolled = forceSolid || scrollPos > 20;

  const navBg = isScrolled 
    ? 'bg-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] border-b border-gray-100' 
    : 'bg-gradient-to-b from-[#1a070b]/60 to-transparent border-transparent backdrop-blur-[2px]';
    
  const textColor = isScrolled ? 'text-[#1a1c1d]' : 'text-white';
  
  const buttonClass = isScrolled 
    ? 'bg-[#8a1538] hover:bg-[#680f2a] text-white border-transparent py-3.5 px-8' 
    : 'bg-white/10 hover:bg-white hover:text-[#8a1538] text-white border border-white/30 backdrop-blur-md py-3.5 px-8';

  const navLinks = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'programs', label: 'البرامج والفرص' },
    { id: 'news', label: 'أخبارنا' },
    { id: 'success', label: 'قصص شبابنا' },
    { id: 'partnerships', label: 'الشركاء' },
    { id: 'about', label: 'عن المؤسسة' },
    { id: 'contact', label: 'تواصل معنا' }
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out font-sans ${navBg} ${isScrolled ? 'py-4' : 'py-5 md:py-8'}`}>
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12 flex justify-between items-center">
          
          <div className="flex items-center cursor-pointer group shrink-0" onClick={() => onNavigate('home')}>
            <img 
              src={isScrolled ? "/CPF-Logo.png" : "/full_logo_white.png"} 
              alt="مؤسسة ولي العهد" 
              className="h-12 md:h-14 xl:h-[70px] object-contain transition-all duration-300"
            />
          </div>

          {/* روابط الديسكتوب */}
          <div className="hidden xl:flex items-center gap-6 xl:gap-8 font-bold text-[16px] xl:text-[17px]">
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

          <div className="flex items-center gap-2 md:gap-3 xl:gap-5 shrink-0">
            {/* زر البحث */}
            <button onClick={onSearchClick} className={`p-2.5 md:p-3 rounded-full transition-all duration-300 cursor-pointer ${isScrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}>
              <Search className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* زر تسجيل الدخول (ديسكتوب فقط) */}
            <button onClick={onLoginClick} className={`hidden xl:flex items-center gap-3 rounded-lg font-bold text-[14px] xl:text-[15px] transition-all duration-300 shadow-sm cursor-pointer ${buttonClass}`}>
              <ShieldCheck className="w-5 h-5" /> تسجيل الدخول
            </button>

            {/* 🟢 زر القائمة الجانبية (Hamburger Menu) للموبايل فقط */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className={`xl:hidden p-2 rounded-xl transition-all duration-300 cursor-pointer ${isScrolled ? 'text-[#8a1538] hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>

        </div>
      </nav>

      {/* ================== القائمة الجانبية للموبايل (Mobile Drawer) ================== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* الخلفية المعتمة */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] xl:hidden"
            />

            {/* الدرج الذي يسحب من اليمين */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#fcfcfc] shadow-2xl z-[120] xl:hidden flex flex-col overflow-hidden"
              dir="rtl"
            >
              {/* هيدر القائمة */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white shrink-0">
                <img src="/CPF-Logo.png" alt="شعار المؤسسة" className="h-10 object-contain" />
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-gray-100 text-gray-500 hover:text-[#8a1538] hover:bg-gray-200 p-2 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* الروابط */}
              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                {navLinks.map((link, index) => {
                  const isActive = currentPage === link.id;
                  return (
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                      key={link.id}
                      onClick={() => {
                        onNavigate(link.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-right p-4 rounded-2xl font-bold text-lg transition-all ${
                        isActive 
                          ? 'bg-[#8a1538]/5 text-[#8a1538] border border-[#8a1538]/10' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-[#C08F2D]'
                      }`}
                    >
                      {link.label}
                    </motion.button>
                  );
                })}
              </div>

              {/* أزرار أسفل القائمة (تسجيل الدخول والبحث) */}
              <div className="p-6 border-t border-gray-100 bg-white space-y-4 shrink-0 pb-10">
                <button 
                  onClick={() => { onSearchClick(); setIsMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 px-5 py-4 rounded-xl font-bold transition-all cursor-pointer"
                >
                  <Search className="w-5 h-5 text-gray-500" />
                  <span>بحث في الموقع</span>
                </button>
                <button 
                  onClick={() => { onLoginClick(); setIsMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 bg-[#8a1538] text-white hover:bg-[#680f2a] px-5 py-4 rounded-xl font-bold transition-all shadow-md cursor-pointer"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>تسجيل الدخول</span>
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}