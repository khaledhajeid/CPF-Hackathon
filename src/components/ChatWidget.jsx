// src/components/ChatWidget.jsx
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, ChevronLeft } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // 🟢 رسالة الترحيب
  const [messages, setMessages] = useState([
    { 
      text: "أهلاً بك يا صديقي! أنا عون، رفيقك الذكي في مؤسسة ولي العهد. كيف يمكنني إرشادك اليوم لتكتشف شغفك وتبني مسارك؟", 
      isBot: true 
    }
  ]);

  // 🟢 أسئلة مقترحة (Quick Replies)
  const quickReplies = [
    "كيف أحدد المسار الأنسب لي؟",
    "كيف يعمل نظام النقاط؟",
    "ما هي مبادرة 42 عمّان؟"
  ];

  // نزول تلقائي لآخر رسالة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // 🟢 محاكاة للذكاء الاصطناعي (بتلقط الكلمات المفتاحية)
  const generateBotResponse = (userText) => {
    const text = userText.toLowerCase();
    if (text.includes('مسار') || text.includes('شغف')) {
      return "لتحديد مسارك بدقة، أحتاج لمعرفة المزيد عنك. هل تميل أكثر للعمل مع التكنولوجيا والأرقام، أم تفضل العمل الميداني ومساعدة المجتمع؟";
    } else if (text.includes('نقاط')) {
      return "نظام النقاط صُمم لمكافأتك! في كل مرة تمسح فيها كود الـ QR عند حضورك لفعالية، ستحصل على نقاط تضاف لمحفظتك الرقمية، ويمكنك استبدالها لاحقاً بفرص حصرية.";
    } else if (text.includes('42')) {
      return "مدرسة 42 عمّان هي مدرسة برمجة ثورية! لا تعتمد على المعلمين ولا المحاضرات، بل على التعلم الذاتي وحل المشكلات كفريق. هل أنت مهتم بالتسجيل في معسكر التصفية القادم؟";
    } else {
      return "فهمت عليك! لضمان تقديم الدعم الأفضل لك، هل ترغب أن أحولك لصفحة 'بوصلة الفرص' لتستكشف البرامج المتاحة بنفسك، أم تفضل أن أقترح عليك مبادرة محددة؟";
    }
  };

  const handleSend = (text) => {
    if (!text.trim()) return;

    // إضافة رسالة المستخدم
    setMessages(prev => [...prev, { text, isBot: false }]);
    setInputValue("");
    setIsTyping(true);

    // تأخير وهمي لمحاكاة التفكير
    setTimeout(() => {
      setIsTyping(false);
      const botReply = generateBotResponse(text);
      setMessages(prev => [...prev, { text: botReply, isBot: true }]);
    }, 1500);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    handleSend(inputValue);
  };

  return (
    <div className="fixed bottom-24 md:bottom-8 left-4 md:left-8 z-[100] font-sans" dir="rtl">
      
      {/* نافذة الدردشة */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 w-[calc(100vw-2rem)] sm:w-[380px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 transform origin-bottom-left animate-in zoom-in-95">
          
          {/* Header الفخم (الاسم: عون فقط) */}
          <div className="bg-[#1a0409] relative p-5 flex items-center justify-between border-b-[4px] border-[#C08F2D]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8a1538]/80 to-transparent pointer-events-none" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm p-1.5 shadow-inner">
                <img src="/full_white_star.png" alt="عون" className="w-full h-full object-contain drop-shadow-md" />
              </div>
              <div>
                <h3 className="text-white font-black text-[17px] leading-tight flex items-center gap-1.5">
                 عون 
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-white/60 text-[11px] font-bold">متصل لمساعدتك</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="relative z-10 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* منطقة الرسائل */}
          <div className="h-[50vh] max-h-[420px] overflow-y-auto p-5 bg-[#F4F7FA] flex flex-col gap-4">
            
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                {msg.isBot && (
                  <div className="w-6 h-6 rounded-full bg-[#8a1538] flex items-center justify-center shrink-0 ml-2 mt-auto mb-1 border border-white shadow-sm">
                    <img src="/full_white_star.png" alt="عون" className="w-3 h-3 object-contain" />
                  </div>
                )}
                <div className={`max-w-[80%] p-3.5 text-[13px] font-bold leading-[1.8em] shadow-sm ${
                  msg.isBot 
                    ? 'bg-white text-gray-700 rounded-2xl rounded-br-sm border border-gray-100' 
                    : 'bg-[#8a1538] text-white rounded-2xl rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* مؤشر الكتابة (Typing Indicator) */}
            {isTyping && (
              <div className="flex justify-start items-end gap-2">
                <div className="w-6 h-6 rounded-full bg-[#8a1538] flex items-center justify-center shrink-0 mb-1 border border-white shadow-sm">
                  <img src="/full_white_star.png" alt="عون" className="w-3 h-3 object-contain" />
                </div>
                <div className="bg-white px-4 py-3.5 rounded-2xl rounded-br-sm shadow-sm border border-gray-100 flex gap-1.5 items-center h-10">
                  <div className="w-1.5 h-1.5 bg-[#C08F2D] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-[#C08F2D] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-[#C08F2D] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}

            {/* أزرار الاقتراحات السريعة */}
            {!isTyping && messages.length === 1 && (
              <div className="flex flex-col gap-2 mt-2">
                {quickReplies.map((reply, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSend(reply)}
                    className="bg-white border border-[#C08F2D]/30 hover:border-[#C08F2D] hover:bg-[#C08F2D]/5 text-[#8a1538] text-[12px] font-black py-2.5 px-4 rounded-xl text-right transition-all flex items-center justify-between group cursor-pointer shadow-sm"
                  >
                    <span>{reply}</span>
                    <ChevronLeft className="w-4 h-4 text-[#C08F2D] transform group-hover:-translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* منطقة الإدخال */}
          <form onSubmit={onSubmitForm} className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="تحدث مع عون..." 
              className="flex-1 bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#8a1538] focus:ring-2 focus:ring-[#8a1538]/10 transition-all font-bold placeholder:font-medium placeholder:text-gray-400"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="bg-[#C08F2D] hover:bg-[#a67c27] disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all shadow-sm cursor-pointer shrink-0"
            >
              <Send className="w-5 h-5 rtl:-scale-x-100" />
            </button>
          </form>
        </div>
      )}

      {/* 🟢 الزر العائم - تم استبدال الأيقونة بشعار النجمة السباعية الرسمية */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-[#8a1538] hover:bg-[#680f2a] text-white p-3.5 rounded-full shadow-2xl hover:shadow-[#8a1538]/40 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center cursor-pointer border-2 border-white ${isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
      >
        <img src="/full_white_star.png" alt="عون AI" className="w-8 h-8 object-contain drop-shadow-md" />
      </button>
    </div>
  );
}