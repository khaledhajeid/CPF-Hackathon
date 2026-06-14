// src/components/Contact.jsx
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, Clock, Building2 } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-24 animate-in fade-in duration-500">
      
      {/* Enterprise Header */}
      <div className="relative pt-24 pb-20 px-4 bg-[#721F31] border-b-[6px] border-[#C08F2D]">
        <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cpf-pattern-contact" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M0 80L80 0ZM-20 20L20 -20ZM60 100L100 60Z" stroke="#ffffff" strokeWidth="1" fill="none"/>
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#cpf-pattern-contact)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-[#C08F2D] font-bold tracking-widest uppercase text-sm mb-4 block">قنوات الاتصال الرسمية</span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
              نحن هنا <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C08F2D] to-[#e6b95c]">لدعم مسارك</span>
            </h1>
          </div>
          <p className="text-lg text-white/80 max-w-lg font-medium leading-relaxed border-r-2 border-[#C08F2D] pr-4">
            فريق مؤسسة ولي العهد مكرس لدعم طموحاتك. تواصل معنا لأي استفسار، اقتراح، أو لبناء شراكات استراتيجية تخدم الشباب الأردني.
          </p>
        </div>
      </div>

      {/* Main Content - Sharp Corporate Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-20">
        <div className="bg-white rounded-sm shadow-xl border border-gray-200 flex flex-col lg:flex-row overflow-hidden">
          
          {/* Right Column: Contact Info (40%) */}
          <div className="lg:w-2/5 bg-gray-50 p-10 md:p-12 border-l border-gray-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-10">
                <Building2 className="w-8 h-8 text-[#721F31]" />
                <h2 className="text-3xl font-black text-gray-900">المقر الرئيسي</h2>
              </div>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-white border border-gray-200 rounded-sm group-hover:border-[#721F31] transition-colors text-[#721F31]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm uppercase tracking-wider text-gray-400">العنوان</h3>
                    <p className="text-gray-700 font-bold">عمان، مجمع الملك حسين للأعمال<br/>مبنى رقم 3</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-white border border-gray-200 rounded-sm group-hover:border-[#721F31] transition-colors text-[#721F31]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm uppercase tracking-wider text-gray-400">الهاتف</h3>
                    <p className="text-gray-700 font-bold" dir="ltr">+962 6 555 5555</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-white border border-gray-200 rounded-sm group-hover:border-[#721F31] transition-colors text-[#721F31]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm uppercase tracking-wider text-gray-400">البريد الإلكتروني</h3>
                    <p className="text-gray-700 font-bold">info@cpf.jo</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-white border border-gray-200 rounded-sm group-hover:border-[#721F31] transition-colors text-[#721F31]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm uppercase tracking-wider text-gray-400">ساعات العمل</h3>
                    <p className="text-gray-700 font-bold">الأحد - الخميس<br/>08:00 صباحاً - 04:00 مساءً</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
               <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">مؤسسة ولي العهد © 2026</p>
            </div>
          </div>

          {/* Left Column: Smart Form (60%) */}
          <div className="lg:w-3/5 p-10 md:p-12 bg-white">
            {isSent ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-50 border-2 border-green-500 rounded-sm flex items-center justify-center mb-6 shadow-sm">
                  <Send className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-4">تم استلام رسالتك بنجاح</h2>
                <p className="text-gray-600 font-medium text-lg mb-8 max-w-md">
                  تم تسجيل استفسارك في نظامنا. سيقوم أحد ممثلي المؤسسة بالتواصل معك عبر البريد الإلكتروني أو الهاتف قريباً.
                </p>
                <button 
                  onClick={() => setIsSent(false)}
                  className="bg-white border-2 border-[#721F31] hover:bg-[#721F31] text-[#721F31] hover:text-white px-8 py-3 rounded-sm font-bold transition-all"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-black text-gray-900 mb-2">نموذج التواصل المباشر</h2>
                <p className="text-gray-500 font-medium mb-8">يرجى تعبئة الحقول أدناه بدقة لضمان تحويل رسالتك للقسم المختص.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-900">الاسم الكامل</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-white border border-gray-300 focus:border-[#721F31] focus:ring-1 focus:ring-[#721F31] rounded-sm px-4 py-3 outline-none transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-900">رقم الهاتف</label>
                      <input 
                        type="tel" 
                        required
                        dir="rtl"
                        className="w-full bg-white border border-gray-300 focus:border-[#721F31] focus:ring-1 focus:ring-[#721F31] rounded-sm px-4 py-3 outline-none transition-all font-medium text-right"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">البريد الإلكتروني</label>
                    <input 
                      type="email" 
                      required
                      dir="ltr"
                      className="w-full bg-white border border-gray-300 focus:border-[#721F31] focus:ring-1 focus:ring-[#721F31] rounded-sm px-4 py-3 outline-none transition-all font-medium text-left"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">تصنيف الرسالة</label>
                    <select className="w-full bg-white border border-gray-300 focus:border-[#721F31] focus:ring-1 focus:ring-[#721F31] rounded-sm px-4 py-3 outline-none transition-all font-medium text-gray-900">
                      <option>استفسار عن البرامج والمبادرات</option>
                      <option>الدعم الفني والتقني (منصة سند)</option>
                      <option>بناء الشراكات والتعاون المؤسسي</option>
                      <option>المقترحات والشكاوى</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">تفاصيل الرسالة</label>
                    <textarea 
                      required
                      rows="5"
                      className="w-full bg-white border border-gray-300 focus:border-[#721F31] focus:ring-1 focus:ring-[#721F31] rounded-sm px-4 py-3 outline-none transition-all font-medium resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#721F31] hover:bg-[#4a1420] text-white py-4 rounded-sm font-bold transition-all shadow-md flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        إرسال عبر النظام الآمن
                        <Send className="w-4 h-4 rtl:-scale-x-100" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}