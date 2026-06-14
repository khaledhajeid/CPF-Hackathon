// src/components/EventCard.jsx
import React from 'react';
import { MapPin, Calendar, Star, ArrowUpLeft } from 'lucide-react';

export default function EventCard({ event, onRegisterClick }) {
  return (
    <div className="bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-[0_10px_40px_rgb(0,0,0,0.08)] transition-all duration-500 group flex flex-col relative overflow-hidden">
      
      {/* شريط المسار الجانبي - لمسة مؤسسية ذكية */}
      <div className={`absolute top-0 right-0 w-1.5 h-full ${event.pathwayColor} z-10 opacity-80`}></div>
      
      {/* Image Section - Sharp & Clean */}
      <div className="h-52 relative overflow-hidden bg-gray-100">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent z-10"></div>
        
        {/* Category Badge - Sharp Edges */}
        <div className={`absolute top-4 right-4 ${event.pathwayColor} text-white text-[11px] font-bold px-3 py-1.5 shadow-md z-20 tracking-wider`}>
          {event.pathway}
        </div>
        
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out grayscale-[20%] group-hover:grayscale-0" 
        />
        
        {/* Date Overlay */}
        <div className="absolute bottom-4 right-5 z-20 flex items-center text-white">
          <Calendar className="w-4 h-4 ml-2 text-[#C08F2D]" />
          <span className="text-sm font-bold tracking-wide">{event.date}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 pr-8 flex flex-col flex-1 bg-white">
        
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center text-gray-500 text-sm font-medium">
            <MapPin className="w-4 h-4 ml-1.5 text-[#721F31]" />
            {event.location}
          </div>
          <span className="flex items-center text-xs font-bold text-[#C08F2D] bg-[#C08F2D]/10 px-2.5 py-1 rounded-sm border border-[#C08F2D]/20">
            <Star className="w-3.5 h-3.5 ml-1 fill-current" />
            +{event.points}
          </span>
        </div>
        
        <h3 className="text-xl font-black text-gray-900 mb-6 leading-snug group-hover:text-[#721F31] transition-colors line-clamp-2">
          {event.title}
        </h3>
        
        {/* Minimalist Action Button */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <button 
            onClick={() => onRegisterClick(event)}
            className="flex items-center text-[#721F31] font-bold text-sm hover:text-[#4a1420] transition-colors group/btn w-full justify-between"
          >
            <span>التفاصيل والتسجيل</span>
            <div className="w-8 h-8 rounded-sm bg-gray-50 border border-gray-200 flex items-center justify-center group-hover/btn:bg-[#721F31] group-hover/btn:border-[#721F31] group-hover/btn:text-white transition-all duration-300">
              <ArrowUpLeft className="w-4 h-4 transform group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>

      </div>
    </div>
  );
}