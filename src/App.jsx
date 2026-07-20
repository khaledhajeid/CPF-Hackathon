// src/App.jsx
import { useState } from 'react';
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
import AdminDashboard from './pages/AdminDashboard';
import PartnershipsPage from './pages/PartnershipsPage'; 
import NewsPage from './pages/NewsPage';
import NewsArticlePage from './pages/NewsArticlePage'; // 🟢 1. استيراد صفحة تفاصيل الخبر

function App() {
  const [currentPage, setCurrentPage] = useState('home'); 
  const [activeFilters, setActiveFilters] = useState({ pathway: 'الكل', location: 'الكل' });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userPoints] = useState(300);
  const [myTickets, setMyTickets] = useState([]); 
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [savedScrollPos, setSavedScrollPos] = useState(0); 

  const [activeProgramName, setActiveProgramName] = useState('جامعة الحسين التقنية');
  const [activeStoryId, setActiveStoryId] = useState(null);
  
  // 🟢 2. State جديد لحفظ تفاصيل الخبر المختار
  const [activeNewsItem, setActiveNewsItem] = useState(null);

  // 🟢 3. دالة توجيه ذكية تدعم استلام البيانات (Payload) مع اسم الصفحة
  const handleNavigate = (pageId, data = null) => {
    setCurrentPage(pageId);
    
    // إذا كان هناك بيانات مرسلة (مثل خبر معين)، نقوم بحفظه
    if (data && data.newsItem) {
      setActiveNewsItem(data.newsItem);
    }
  };

  const handleRegisterClick = (event) => {
    setSavedScrollPos(window.scrollY); 
    setSelectedEvent(event);
    setIsLoginOpen(true); 
  };

  const handleLoginSuccess = (userRole) => { 
    if (selectedEvent) {
      const isAlreadyBooked = myTickets.find(ticket => ticket.id === selectedEvent.id);
      if (!isAlreadyBooked) {
        setMyTickets(prevTickets => [selectedEvent, ...prevTickets]);
      }
      setSelectedEvent(null);
    }
    
    if (userRole === 'admin') {
      handleNavigate('admin');
    } else {
      handleNavigate('dashboard');
    }
    
    // سكرول فوري لما يعمل تسجيل دخول عشان يروح للداشبورد من فوق
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

  // 🟢 4. استبدلنا كل setCurrentPage بـ handleNavigate 
  const renderPage = () => {
    if (currentPage === 'dashboard') {
      return <motion.div key="dashboard" {...pageVariants}><Dashboard onNavigate={handleNavigate} userPoints={userPoints} myTickets={myTickets} /></motion.div>;
    }
    switch (currentPage) {
      case 'admin':
        return <motion.div key="admin" {...pageVariants}><AdminDashboard onNavigate={handleNavigate} /></motion.div>;
      case 'programs': 
        return <motion.div key="programs" {...pageVariants}><Programs onNavigate={handleNavigate} setActiveProgramName={setActiveProgramName} handleRegisterClick={handleRegisterClick} /></motion.div>;
      case 'news': 
        return <motion.div key="news" {...pageVariants}><NewsPage onNavigate={handleNavigate} /></motion.div>;
      
      // 🟢 5. إضافة مسار صفحة تفاصيل الخبر وتمرير بيانات الخبر
      case 'news-article': 
        return (
          <motion.div key="news-article" {...pageVariants}>
            <NewsArticlePage onNavigate={handleNavigate} newsItem={activeNewsItem} />
          </motion.div>
        );

      case 'program_details': 
        return (
          <motion.div key="program_details" {...pageVariants}>
            <ProgramDetails 
              onNavigate={handleNavigate} 
              programName={activeProgramName} 
              onStorySelect={(id) => {
                setActiveStoryId(id);
                handleNavigate('success');
              }} 
            />
          </motion.div>
        ); 
      case 'success': 
        return (
          <motion.div key="success" {...pageVariants}>
            <SuccessStories 
              onNavigate={handleNavigate} 
              setActiveProgramName={setActiveProgramName} 
              initialStoryId={activeStoryId} 
            />
          </motion.div>
        );
        
      case 'contact': 
        return <motion.div key="contact" {...pageVariants}><Contact onNavigate={handleNavigate} /></motion.div>;
      case 'about':
        return <motion.div key="about" {...pageVariants}><AboutPage onNavigate={handleNavigate} /></motion.div>;  
      case 'partnerships': 
        return <motion.div key="partnerships" {...pageVariants}><PartnershipsPage /></motion.div>;
      case 'home':
      default:
        return (
          <motion.div key="home" {...pageVariants}>
            <HomePage 
              activeFilters={activeFilters} 
              setActiveFilters={setActiveFilters} 
              handleRegisterClick={handleRegisterClick} 
              onNavigate={handleNavigate} 
              setActiveProgramName={setActiveProgramName}
            />
          </motion.div>
        );
    }
  };
  
  const isAdminPage = currentPage === 'admin';

  return (
    <div dir="rtl" className={`min-h-screen bg-[#3b1019] font-sans selection:bg-[#C08F2D] selection:text-white relative overflow-x-hidden ${isAdminPage ? '' : 'pb-20 md:pb-0'}`}>
      
      {!isAdminPage && (
        <Navbar 
          currentPage={currentPage} 
          onNavigate={handleNavigate} 
          onLoginClick={() => setIsLoginOpen(true)} 
          onSearchClick={() => setIsSearchOpen(true)} 
        />
      )}
      
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} handleRegisterClick={handleRegisterClick} />

      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        {renderPage()}
      </AnimatePresence>

      <AnimatePresence>
        {isLoginOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[99999] bg-white overflow-y-auto"
          >
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
      
      {!isAdminPage && (
        <>
          <MobileNavBar 
            currentPage={currentPage} 
            onNavigate={handleNavigate} 
            onLoginClick={() => setIsLoginOpen(true)} 
            onSearchClick={() => setIsSearchOpen(true)} 
          />
          <ChatWidget />
        </>
      )}
      
    </div>
  );
}

export default App;