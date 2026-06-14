// src/components/SanadModal.jsx
import React from 'react';
import { X, Calendar, MapPin, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

export default function SanadModal({ isOpen, onClose, event, onConfirm }) {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-sans">
      
      {/* Enterprise Dark Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content - Sharp Edges */}
      <div className="relative bg-white rounded-md shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row transform transition-all border border-gray-200">
        
        {/* Pathway Color Top Border */}
        <div className={`absolute top-0 left-0 w-full h-1.5 ${event.pathwayColor} z-20`}></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 z-20 bg-gray-100 hover:bg-gray-200 p-2 rounded-sm transition-colors border border-gray-200"
        >
          <X className="w-4 h-4 text-gray-700" />
        </button>

        {/* Right Column: Event Details (40%) */}
        <div className="md:w-2/5 bg-gray-50 p-8 md:p-10 border-l border-gray-200 flex flex-col justify-center relative">
          
          <div className="relative z-10">
            <span className={`inline-block border ${event.pathwayColor.replace('bg-', 'border-')} ${event.pathwayColor.replace('bg-', 'text-')} text-xs font-bold px-3 py-1 rounded-sm mb-6 bg-white`}>
              {event.pathway}
            </span>
            
            <h3 className="text-2xl font-black text-gray-900 mb-6 leading-snug">
              {event.title}
            </h3>
            
            <div className="space-y-4 border-t border-gray-200 pt-6">
              <div className="flex items-center text-sm font-bold text-gray-700">
                <div className="w-8 h-8 bg-white border border-gray-200 rounded-sm flex items-center justify-center ml-3">
                  <Calendar className="w-4 h-4 text-[#721F31]" />
                </div>
                {event.date}
              </div>
              <div className="flex items-center text-sm font-bold text-gray-700">
                <div className="w-8 h-8 bg-white border border-gray-200 rounded-sm flex items-center justify-center ml-3">
                  <MapPin className="w-4 h-4 text-[#721F31]" />
                </div>
                {event.location}
              </div>
            </div>
          </div>
        </div>

        {/* Left Column: Secure Authentication (60%) */}
        <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-gray-900 mb-3">بوابة التسجيل الآمنة</h2>
            <p className="text-gray-500 font-medium leading-relaxed">
              يرجى اختيار طريقة التوثيق لإتمام عملية الحجز. إتمام العملية عبر سند يمنحك <span className="text-[#C08F2D] font-bold">+{event.points} نقطة</span> في محفظتك الموثقة.
            </p>
          </div>

          <div className="space-y-4">
            
            {/* Sanad Secure Button */}
            <button 
              onClick={onConfirm} 
              className="w-full relative group bg-white border-2 border-[#C08F2D] hover:bg-[#C08F2D] text-[#C08F2D] hover:text-white py-4 px-6 rounded-sm font-bold transition-all duration-300 flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center">
                <ShieldCheck className="w-5 h-5 ml-3" />
                التوثيق والتسجيل السريع عبر تطبيق سند
              </div>
              <ArrowRight className="w-5 h-5 rtl:-scale-x-100 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all" />
            </button>

            <div className="flex items-center py-4">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase tracking-widest">أو</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Standard Email Button */}
            <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 py-4 px-6 rounded-sm font-bold transition-all duration-300 flex items-center justify-center group">
              <Mail className="w-4 h-4 ml-3 text-gray-400 group-hover:text-gray-700 transition-colors" />
              الاستمرار كزائر (بريد إلكتروني)
            </button>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-sm flex items-start gap-3">
             <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
             <p className="text-xs text-blue-800 font-medium leading-relaxed">
               عملية التسجيل مشفرة بالكامل ومتوافقة مع المعايير الحكومية. بياناتك محمية ولن يتم مشاركتها مع أطراف ثالثة.
             </p>
          </div>

        </div>

      </div>
    </div>
  );
}