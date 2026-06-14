// src/components/SuccessStories.jsx
import React from 'react';
import { Quote, ArrowLeft, Trophy } from 'lucide-react';

export default function SuccessStories({ onNavigate }) {
  const stories = [
    {
      id: 1,
      name: 'طارق المجالي',
      program: 'هاكاثون الابتكار',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      quote: 'شاركت في الهاكاثون وطورت نظاماً برمجياً متكاملاً وركزت على بناء الواجهات الخلفية (Backend). الفوز بالمركز الأول كان نقطة التحول لتأسيس مشروعي التقني الخاص.',
      pathwayColor: 'bg-[#2b307e]', // أزرق
      tag: 'مسار القيادة'
    },
    {
      id: 2,
      name: 'سارة العبدلله',
      program: 'مصنع الأفكار (Makerspace)',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      quote: 'من خلال مصنع الأفكار، تمكنت من تحويل فكرتي إلى نموذج أولي حقيقي. اليوم، شركتي الناشئة توظف 5 شباب أردنيين وتصدر منتجاتها.',
      pathwayColor: 'bg-[#a00023]', // أحمر
      tag: 'المشاركة الاقتصادية'
    },
    {
      id: 3,
      name: 'لينا حداد',
      program: 'منصة نحن',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      quote: 'التطوع في مبادرات التنمية لم يغير حياة الآخرين فقط، بل غيّر مساري المهني بالكامل وأعطاني ثقة وشبكة علاقات لم أكن أتخيلها.',
      pathwayColor: 'bg-[#1f5412]', // أخضر
      tag: 'التنمية المجتمعية'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-24 animate-in fade-in duration-500">
      
      {/* Editorial Dark Hero */}
      <div className="bg-[#111111] pt-24 pb-20 px-4 relative overflow-hidden border-b border-gray-800">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#721F31]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-8 h-8 text-[#C08F2D]" />
              <span className="text-[#C08F2D] font-bold tracking-widest uppercase text-sm">الأثر الحقيقي</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              قصص <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">نجاح شبابنا</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium leading-relaxed">
              لم تكن البرامج يوماً مجرد شهادات، بل كانت نقطة انطلاق. تعرف على شباب أردنيين استثمروا الفرص لتحقيق تغيير جذري في مسيراتهم.
            </p>
          </div>
          
          <div className="md:w-1/3 hidden md:flex justify-end">
             {/* Abstract decorative element */}
             <div className="w-48 h-48 border-[10px] border-[#721F31]/20 rounded-sm rotate-12 relative">
               <div className="absolute inset-0 border-[10px] border-[#C08F2D]/20 rounded-sm -rotate-24 scale-110"></div>
             </div>
          </div>
        </div>
      </div>

      {/* Stories Grid - Editorial Style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {stories.map((story) => (
            <div key={story.id} className="group cursor-pointer">
              {/* Photo Frame */}
              <div className="relative h-[400px] mb-6 overflow-hidden rounded-sm bg-gray-200">
                <div className={`absolute top-0 left-0 w-full h-1.5 ${story.pathwayColor} z-20 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300`}></div>
                
                <img 
                  src={story.image} 
                  alt={story.name} 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700 ease-out"
                />
                
                {/* Overlay Name */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <span className={`inline-block px-2 py-1 mb-2 text-[10px] font-bold text-white uppercase tracking-widest ${story.pathwayColor} rounded-sm`}>
                    {story.tag}
                  </span>
                  <h3 className="text-2xl font-black text-white">{story.name}</h3>
                  <p className="text-gray-300 font-medium text-sm">{story.program}</p>
                </div>
              </div>

              {/* Quote Content */}
              <div className="relative pl-6 rtl:pl-0 rtl:pr-6 border-l-2 rtl:border-l-0 rtl:border-r-2 border-gray-200 group-hover:border-[#C08F2D] transition-colors duration-300">
                <Quote className="w-6 h-6 text-gray-300 mb-3 absolute -top-2 left-0 rtl:left-auto rtl:-right-3 bg-[#F8FAFC]" />
                <p className="text-gray-700 font-medium leading-relaxed text-lg">
                  "{story.quote}"
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}