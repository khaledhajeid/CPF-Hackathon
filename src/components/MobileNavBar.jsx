// src/components/MobileNavBar.jsx
import { Home, Compass, Sparkles, User, Search } from 'lucide-react';

export default function MobileNavBar({ currentPage, onNavigate, onLoginClick, onSearchClick }) {
  const navItems = [
    { id: 'home', icon: Home, label: 'الرئيسية' },
    { id: 'programs', icon: Compass, label: 'استكشف' },
    // 🟢 زر البحث صار بالنص، لأنه أكشن مهم جداً عالموبايل
    { id: 'search', icon: Search, label: 'بحث', isSearch: true }, 
    { id: 'success', icon: Sparkles, label: 'قصصنا' },
    { id: 'dashboard', icon: User, label: 'حسابي', isLogin: true }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[90] bg-white/90 backdrop-blur-xl border-t border-gray-200/60 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_40px_rgba(0,0,0,0.08)]" dir="rtl">
      <div className="flex justify-around items-center px-1 py-2">
        {navItems.map((item) => {
          // التشييك إذا كان الزر هو الصفحة الحالية
          const isActive = currentPage === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                // 🟢 توجيه الأكشن حسب نوع الزر
                if (item.isLogin) {
                  onLoginClick();
                } else if (item.isSearch) {
                  onSearchClick();
                } else {
                  onNavigate(item.id);
                }
              }}
              className="relative flex flex-col items-center justify-center w-[20%] h-14 gap-1 transition-all duration-300 tap-highlight-transparent group outline-none cursor-pointer"
            >
              {/* الأيقونة مع التأثير */}
              <div className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                isActive && !item.isSearch && !item.isLogin
                  ? 'bg-[#8a1538]/10 text-[#8a1538] transform -translate-y-1' 
                  : 'bg-transparent text-gray-500 group-hover:text-gray-600'
              }`}>
                <Icon 
                  className={`transition-all duration-300 ${isActive && !item.isSearch && !item.isLogin ? 'w-5 h-5 fill-[#8a1538]/20' : 'w-5 h-5'}`} 
                  strokeWidth={isActive && !item.isSearch && !item.isLogin ? 2.5 : 2} 
                />
                
                {/* النقطة الذهبية تحت الأيقونة النشطة (باستثناء البحث) */}
                {isActive && !item.isSearch && !item.isLogin && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#C08F2D] rounded-full animate-in zoom-in duration-300"></span>
                )}
              </div>
              
              {/* النص */}
              <span className={`text-[10px] font-black transition-all duration-300 tracking-wide ${
                isActive && !item.isSearch && !item.isLogin ? 'text-[#8a1538] opacity-100 transform -translate-y-0.5' : 'text-gray-500 opacity-90'
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