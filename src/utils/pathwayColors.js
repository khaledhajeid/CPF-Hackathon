// src/utils/pathwayColors.js
// مصدر واحد لألوان المسارات الثلاثة - نفس الألوان الرسمية المستخدمة في كل الموقع
export const pathwayHexColors = {
  'تعلّم': '#a00023',
  'قُد': '#2b307e',
  'اصنع الأثر': '#1f5412',
};

export const getPathwayColor = (pathway) => pathwayHexColors[pathway] || '#8a1538';

export const getPathwayBadgeClass = (pathway) => {
  switch (pathway) {
    case 'تعلّم': return 'bg-[#a00023]/10 text-[#a00023] border-[#a00023]/20';
    case 'قُد': return 'bg-[#2b307e]/10 text-[#2b307e] border-[#2b307e]/20';
    case 'اصنع الأثر': return 'bg-[#1f5412]/10 text-[#1f5412] border-[#1f5412]/20';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};
