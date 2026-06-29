// src/App.jsx
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion'; 
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Programs from './components/Programs';
import ChatWidget from './components/ChatWidget';
import SuccessStories from './components/SuccessStories';
import Contact from './components/Contact';
import HomePage from './pages/HomePage';
import Login from './pages/Login'; 
import ProgramDetails from './pages/ProgramDetails'; 
import MobileNavBar from './components/MobileNavBar';
import SearchOverlay from './components/SearchOverlay';
import AboutPage from './pages/AboutPage';
// 🟢 1. استيراد صفحة لوحة تحكم الإدارة
import AdminDashboard from './pages/AdminDashboard'; 

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeFilters, setActiveFilters] = useState({ pathway: 'الكل', location: 'الكل' });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userPoints, setUserPoints] = useState(300); 
  const [myTickets, setMyTickets] = useState([]); 
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [savedScrollPos, setSavedScrollPos] = useState(0); 

  const [activeProgramName, setActiveProgramName] = useState('جامعة الحسين التقنية');

  const handleRegisterClick = (event) => {
    setSavedScrollPos(window.scrollY); 
    setSelectedEvent(event);
    setIsLoginOpen(true); 
  };

  // 🟢 2. تعديل دالة الدخول لتستقبل نوع الحساب (الرول) وتوجهه صح
  const handleLoginSuccess = (role = 'user') => {
    if (role === 'user' && selectedEvent) {
      const isAlreadyBooked = myTickets.find(ticket => ticket.id === selectedEvent.id);
      if (!isAlreadyBooked) {
        setMyTickets(prevTickets => [selectedEvent, ...prevTickets]);
      }
      setSelectedEvent(null);
    }
    
    // التوجيه الذكي
    if (role === 'admin') {
      setCurrentPage('admin'); // توجيه لصفحة الأدمن
    } else {
      setCurrentPage('dashboard'); // توجيه لصفحة الطالب
    }
    
    window.scrollTo(0, 0); 
    
    setTimeout(() => {
      setIsLoginOpen(false); 
    }, 400);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
    transition: { duration: 0.3, ease: "easeInOut" }
  };

  const renderPage = () => {
    if (currentPage === 'dashboard') {
      return <motion.div key="dashboard" {...pageVariants}><Dashboard onNavigate={setCurrentPage} userPoints={userPoints} myTickets={myTickets} /></motion.div>;
    }
    switch (currentPage) {
      // 🟢 3. إضافة حالة (case) لصفحة الأدمن
      case 'admin':
        return <motion.div key="admin" {...pageVariants}><AdminDashboard onNavigate={setCurrentPage} /></motion.div>;
      case 'programs': 
        return <motion.div key="programs" {...pageVariants}><Programs onNavigate={setCurrentPage} setActiveProgramName={setActiveProgramName} handleRegisterClick={handleRegisterClick} /></motion.div>;
      case 'program_details': 
        return <motion.div key="program_details" {...pageVariants}><ProgramDetails onNavigate={setCurrentPage} programName={activeProgramName} /></motion.div>; 
      case 'success': 
        return <motion.div key="success" {...pageVariants}><SuccessStories onNavigate={setCurrentPage} setActiveProgramName={setActiveProgramName} /></motion.div>;
      case 'contact': 
        return <motion.div key="contact" {...pageVariants}><Contact /></motion.div>;
      case 'about':
        return <motion.div key="about" {...pageVariants}><AboutPage onNavigate={setCurrentPage} /></motion.div>;  
      case 'home':
      default:
        return (
          <motion.div key="home" {...pageVariants}>
            <HomePage 
              activeFilters={activeFilters} 
              setActiveFilters={setActiveFilters} 
              handleRegisterClick={handleRegisterClick} 
              onNavigate={setCurrentPage} 
            />
          </motion.div>
        );
    }
  };

  // 🟢 4. متغير لمعرفة إذا كنا بصفحة الأدمن عشان نخفي عناصر الزوار
  const isAdminPage = currentPage === 'admin';

  return (
    <div dir="rtl" className="min-h-screen bg-[#F4F7FA] font-sans selection:bg-[#C08F2D] selection:text-white relative overflow-x-hidden pb-20 md:pb-0">
      
      {/* 🟢 إخفاء النافبار العلوي إذا كنا في لوحة التحكم */}
      {!isAdminPage && (
        <Navbar 
          currentPage={currentPage} 
          onNavigate={setCurrentPage} 
          onLoginClick={() => setIsLoginOpen(true)} 
          onSearchClick={() => setIsSearchOpen(true)} 
        />
      )}
      
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} handleRegisterClick={handleRegisterClick} />

      <AnimatePresence mode="wait">{renderPage()}</AnimatePresence>

      <AnimatePresence>
        {isLoginOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[99999] bg-white overflow-y-auto"
          >
            {/* 🟢 تمرير الدالة المحدثة لملف الـ Login */}
            <Login 
              onLogin={handleLoginSuccess} 
              onNavigateBack={() => {
                setIsLoginOpen(false);
                setTimeout(() => {
                  window.scrollTo({ top: savedScrollPos, behavior: 'smooth' });
                }, 100);
              }} 
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 🟢 إخفاء نافبار الموبايل والشات إذا كنا في لوحة التحكم */}
      {!isAdminPage && (
        <MobileNavBar 
          currentPage={currentPage} 
          onNavigate={setCurrentPage} 
          onLoginClick={() => setIsLoginOpen(true)} 
        />
      )}
      
      {!isAdminPage && <ChatWidget />}
    </div>
  );
}

export default App;