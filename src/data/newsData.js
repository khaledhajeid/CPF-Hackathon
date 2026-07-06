// src/data/newsData.js

export const heroSliderNews = [
  {
    id: 101,
    type: 'video', 
    mediaUrl: '/HTU_video.mp4', 
    title: 'مؤسسة ولي العهد تطلق أكبر هاكاثون للابتكار التقني في الأردن',
    category: 'أخبار المؤسسة',
    date: '06 تموز 2026',
    desc: 'بمشاركة أكثر من 500 شاب وشابة من مختلف المحافظات، انطلقت فعاليات الهاكاثون الأضخم لتطوير حلول برمجية تخدم قطاع التكنولوجيا المالية (FinTech).'
  },
  {
    id: 102,
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop', 
    title: 'تخريج الفوج الأول من زمالة "خطى الحسين" لبناء القيادات',
    category: 'إنجازات الشباب',
    date: '02 تموز 2026',
    desc: 'احتفلت المؤسسة بتخريج كوكبة من القادة الشباب الذين أتموا برنامجاً تدريبياً مكثفاً لتعزيز مهاراتهم الاستراتيجية والقيادية لدعم رؤية التحديث الاقتصادي.'
  },
  {
    id: 103,
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop', 
    title: 'اتفاقية تعاون لإنشاء مختبرات تصنيع رقمي في إقليم الجنوب',
    category: 'شراكاتنا',
    date: '28 حزيران 2026',
    desc: 'تعزيزاً للامركزية، تم توقيع شراكة استراتيجية لتوفير طابعات ثلاثية الأبعاد وأدوات القطع بالليزر لشباب محافظة العقبة ومعان.'
  }
];

export const newsList = [
  {
    id: 1,
    isFeatured: true, 
    title: 'مدرسة 42 عمّان تفتح باب القبول لمعسكر التصفية البرمجي (Piscine)',
    desc: 'فرصة مجانية بالكامل لتعلم البرمجة بدون معلمين أو فصول تقليدية. التسجيل متاح الآن لمن هم فوق الـ 18 عاماً لتجاوز اختبارات المنطق عبر الإنترنت والانضمام للمخيم المكثف الذي سيقام في مجمع الملك حسين للأعمال، حيث سيتم اختيار أفضل العقول للمرحلة النهائية.',
    category: 'أخبار الفرص',
    date: '04 تموز 2026',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
    link: 'news_detail_1'
  },
  {
    id: 2,
    title: 'فريق "مساحة الصنّاع" يبتكر جهازاً لمساعدة ذوي الإعاقة البصرية',
    desc: 'بإشراف من المهندسين، تمكن شباب من تحويل فكرتهم الورقية إلى نموذج حقيقي باستخدام تقنيات الطباعة ثلاثية الأبعاد.',
    category: 'إنجازات الشباب',
    date: '01 تموز 2026',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
    link: 'news_detail_2'
  },
  {
    id: 3,
    title: 'منصة "نَحْنُ" توثق أكثر من 50 ألف ساعة تطوعية',
    desc: 'أرقام قياسية جديدة تعكس التزام الشباب الأردني بمساندة الحملات الإنسانية والبيئية وترميم المدارس في مختلف القرى.',
    category: 'إنجازات الشباب',
    date: '25 حزيران 2026',
    image: 'https://images.unsplash.com/photo-1593113580332-ceb4b62dbba4?q=80&w=2000&auto=format&fit=crop',
    link: 'news_detail_3'
  },
  {
    id: 4,
    title: 'توسيع نطاق تدريبات الذكاء الاصطناعي في المدارس الحكومية',
    desc: 'وقعت المؤسسة اتفاقية تعاون جديدة تهدف لنقل برامج محو الأمية الرقمية إلى غرف رقمية مجهزة في المحافظات.',
    category: 'شراكاتنا',
    date: '28 حزيران 2026',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop',
    link: 'news_detail_4'
  },
  {
    id: 5,
    title: 'انطلاق فعاليات مخيم مبرمجي الأردن لليافعين لصيف 2026',
    desc: 'انطلقت عبر الإنترنت ووجاهياً فعاليات المخيم الصيفي التفاعلي لتعليم المنطق البرمجي وبناء واجهات المستخدم.',
    category: 'أخبار الفرص',
    date: '20 حزيران 2026',
    image: 'https://images.unsplash.com/photo-1525926477800-7a3b10316ac6?q=80&w=2000&auto=format&fit=crop',
    link: 'news_detail_5'
  },
  {
    id: 6,
    title: 'مبادرة "قصي" تزود الملاعب بحقائب الإسعاف المتقدم',
    desc: 'اختتمت المبادرة دورة تأهيلية مكثفة للمعالجين الرياضيين حول التعامل مع حالات السكتات القلبية المفاجئة.',
    category: 'أخبار المؤسسة',
    date: '15 حزيران 2026',
    image: 'https://images.unsplash.com/photo-1576267423048-15c0040fec78?q=80&w=2070&auto=format&fit=crop',
    link: 'news_detail_6'
  },
  {
    id: 7,
    title: 'فتح باب التسجيل لورشات "الطباعة ثلاثية الأبعاد" المجانية',
    desc: 'فرصة للشباب المهتمين بالتصنيع الرقمي للانضمام لورشات عمل مكثفة تقام في مصنع الأفكار.',
    category: 'أخبار الفرص',
    date: '10 حزيران 2026',
    image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=2000&auto=format&fit=crop',
    link: 'news_detail_7'
  },
  {
    id: 8,
    title: 'شباب أردنيون يمثلون المملكة في قمة المناخ العالمية',
    desc: 'وفد شبابي مدعوم من المؤسسة يعرض حلولاً بيئية مبتكرة طوروها داخل مختبرات الابتكار.',
    category: 'إنجازات الشباب',
    date: '05 حزيران 2026',
    image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=2070&auto=format&fit=crop',
    link: 'news_detail_8'
  },
  {
    id: 9,
    title: 'إطلاق منصة إلكترونية جديدة لربط الخريجين بسوق العمل',
    desc: 'شراكة جديدة مع القطاع الخاص لتوفير فرص تدريب منتهي بالتوظيف لشباب البرامج التقنية.',
    category: 'شراكاتنا',
    date: '01 حزيران 2026',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop',
    link: 'news_detail_9'
  }
];

export const pulseImages = [
  { id: 1, type: 'featured', title: 'مختبرات التصنيع الرقمي', url: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=1200&auto=format&fit=crop' },
  { id: 2, type: 'normal', title: 'العمل الجماعي في 42', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop' },
  { id: 3, type: 'tall', title: 'حملات التطوع الميدانية', url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800&auto=format&fit=crop' },
  { id: 4, type: 'normal', title: 'توزيع القوافل الإنسانية', url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop' },
  { id: 5, type: 'normal', title: 'بناء النماذج الهندسية', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop' }
];