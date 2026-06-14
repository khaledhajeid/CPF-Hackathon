// src/components/ChatWidget.jsx
import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "أهلاً بك في منصة مؤسسة ولي العهد. أنا مساعدك الذكي، كيف يمكنني مساعدتك في بناء مسارك اليوم؟", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages(prev => [...prev, { text: inputValue, isBot: false }]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        text: "رائع! بناءً على اهتمامك، أنصحك بالتسجيل في 'منتدى الفرص الاقتصادية' في العقبة. هل أضيفه إلى محفظتك؟", 
        isBot: true 
      }]);
    }, 1500);
  };

  return (
    // السر هون: bottom-24 للموبايل، و md:bottom-8 للكمبيوتر
    <div className="fixed bottom-24 md:bottom-8 left-4 md:left-8 z-[100] font-sans">
      
      {/* نافذة الدردشة */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-2xl shadow-[0_10px_40px_rgb(0,0,0,0.15)] border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 transform origin-bottom-left animate-in zoom-in-95">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#721F31] to-[#5a1826] p-4 sm:p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-base sm:text-lg leading-tight flex items-center gap-1">
                  المساعد الذكي <Sparkles className="w-3 h-3 text-[#C08F2D]" />
                </h3>
                <span className="text-white/70 text-xs font-medium">متصل الآن</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area - متجاوب مع ارتفاع الموبايل */}
          <div className="h-[50vh] max-h-[400px] sm:h-80 overflow-y-auto p-4 sm:p-5 bg-[#F8FAFC] flex flex-col gap-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm font-medium leading-relaxed ${
                  msg.isBot 
                    ? 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100' 
                    : 'bg-[#721F31] text-white rounded-br-sm shadow-md'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100 flex gap-1.5 items-center">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 sm:p-4 bg-white border-t border-gray-100 flex gap-2 items-center">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="اكتب سؤالك هنا..." 
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#721F31]/50 focus:ring-2 focus:ring-[#721F31]/10 transition-all font-medium"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim()}
              className="bg-[#C08F2D] hover:bg-[#a67c27] disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all shadow-sm"
            >
              <Send className="w-5 h-5 rtl:-scale-x-100" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-[#721F31] hover:bg-[#5a1826] text-white p-3 sm:p-4 rounded-full shadow-2xl hover:shadow-[0_10px_30px_rgb(114,31,49,0.4)] transition-all duration-300 hover:-translate-y-1 flex items-center justify-center ${isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>
    </div>
  );
}