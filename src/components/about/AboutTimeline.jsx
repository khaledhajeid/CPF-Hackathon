// src/components/about/AboutTimeline.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Flag, Building2, HeartHandshake, Code2 } from 'lucide-react';

const milestones = [
  {
    year: '2015',
    title: 'تأسيس مؤسسة ولي العهد',
    desc: 'انطلاق المؤسسة كحاضنة رئيسية للشباب الأردني برؤية استراتيجية واضحة لدعم الابتكار والقيادة.',
    icon: Flag,
  },
  {
    year: '2016',
    title: 'تأسيس جامعة الحسين التقنية',
    desc: 'نقلة نوعية في التعليم التقني والتطبيقي لرفد سوق العمل بالكفاءات الهندسية المتميزة وتجسير الفجوة مع الصناعة.',
    icon: Building2,
  },
  {
    year: '2019',
    title: 'إطلاق منصة نَحْنُ',
    desc: 'المنصة الوطنية لتطوع ومشاركة الشباب، بهدف مأسسة العمل التطوعي وتوثيق جهود الشباب الأردني بالتعاون مع اليونيسف.',
    icon: HeartHandshake,
  },
  {
    year: '2024',
    title: 'افتتاح مدرسة 42 عمّان',
    desc: 'ثورة في تعليم هندسة البرمجيات والبرمجة التشاركية (Peer-to-peer) لتمكين الجيل التقني القادم وتأهيله لأعقد الأنظمة البرمجية.',
    icon: Code2,
  }
];

export default function AboutTimeline() {
  return (
    <section className="py-20 md:py-32 bg-white font-sans overflow-hidden" dir="rtl">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative">
        
        {/* عنوان القسم */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <img src="/arrow-yellow.svg" className="w-5 h-5 md:w-6 md:h-6 mb-4" alt="سهم أصفر" />
          <h2 className="text-2xl md:text-4xl font-black text-[#721F31] tracking-tight mb-4">
            محطات في مسيرتنا
          </h2>
          <p className="text-gray-500 font-medium text-[15px] max-w-lg">
            خطوات ثابتة نحو تمكين الشباب وبناء منظومة متكاملة من الفرص.
          </p>
        </div>

        {/* الخط المركزي الخلفي (يظهر بلون رمادي فاتح) */}
        <div className="absolute right-[39px] md:right-1/2 md:translate-x-1/2 top-[220px] bottom-0 w-1 bg-gray-100 rounded-full z-0" />

        {/* خط الزمن التفاعلي */}
        <div className="relative z-10 space-y-12 md:space-y-24">
          {milestones.map((milestone, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className={`flex flex-col md:flex-row items-start md:items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                
                {/* 1. الكرت (المحتوى) */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                  className="w-full md:w-[45%] pl-12 pr-16 md:px-0 relative"
                >
                  <div className={`bg-[#F8FAFC] border border-gray-100 p-6 md:p-8 rounded-3xl shadow-lg shadow-gray-200/50 hover:border-[#C08F2D]/30 transition-colors ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}>
                    <span className="text-4xl font-black text-[#C08F2D]/20 absolute -top-4 -right-2 md:top-4 md:right-8 pointer-events-none select-none">
                      {milestone.year}
                    </span>
                    <h3 className="text-[17px] md:text-xl font-black text-gray-900 mb-3 relative z-10">{milestone.title}</h3>
                    <p className="text-gray-600 font-medium text-[14px] md:text-[15px] leading-[1.9rem] relative z-10">
                      {milestone.desc}
                    </p>
                  </div>
                </motion.div>

                {/* 2. النقطة المركزية (الأيقونة والدائرة) */}
                <div className="absolute right-6 md:right-1/2 md:translate-x-1/2 flex items-center justify-center mt-6 md:mt-0">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
                    className="w-12 h-12 md:w-16 md:h-16 bg-white border-4 border-[#721F31] rounded-full flex items-center justify-center z-10 shadow-xl shadow-[#721F31]/20"
                  >
                    <milestone.icon className="w-5 h-5 md:w-7 md:h-7 text-[#C08F2D]" strokeWidth={2.5} />
                  </motion.div>
                </div>

                {/* 3. مساحة فارغة للترتيب في الكمبيوتر */}
                <div className="hidden md:block w-[45%]" />
                
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}