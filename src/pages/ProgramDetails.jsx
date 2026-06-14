// src/pages/ProgramDetails.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// 🟢 ضفنا أيقونات Lucide بدل الصور المكسورة
import { ArrowLeft, Building2, LayoutGrid, LayoutTemplate, Clock, GraduationCap, Award, BookOpen } from 'lucide-react';

const programsFullData = {
  'جامعة الحسين التقنية': {
    title: 'جامعة الحسين التقنية (HTU)',
    titleEn: 'Al Hussein Technical University',
    pathway: 'المشاركة الاقتصادية',
    type: 'دراسة جامعية تطبيقية',
    mechanism: 'وجاهي',
    languages: 'العربية والإنجليزية',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086',
    logo: '/HTU.png',
    about: 'هي مؤسسة تعليمية رائدة، تقدم درجات التعليم العالي في مجالات التدريب التقني والمهني في الأردن، وتهدف إلى تطويره والارتقاء به.',
    overview: 'تركز جامعة الحسين التقنية على العلوم التطبيقية في مجالات العلوم والتكنولوجيا والهندسة والرياضيات. تتبع نموذجاً تعليمياً فريداً من نوعه يتبنى التعليم من خلال نهج عملي. تؤكد الجامعة على تقييم الطلبة من خلال المشاريع وليس الامتحانات أو الاختبارات الورقية. تتيح الجامعة خيارات متعددة للطالب تمكنه من أن يبدأ دراسته وينهيها ضمن الفترة الزمنية التي تناسبه.',
    facilities: [
      'مركز التميز للريادة والابتكار: والمعروف باسم "The Core" والذي يعمل كمسرّع وحاضنة للأفكار الريادية.',
      'مركز التطور الوظيفي والتواصل المجتمعي: الذي يقدم برامج تطور مهارات الطلبة والمتدربين لربطهم بسوق العمل.',
      'مختبر الواقع الافتراضي والمعزز VR, AR: والذي أُنشئ بالتعاون مع المركز الأردني للتصميم والتطوير (JODDB).'
    ],
    // 🟢 استخدمنا أيقونات مكتبة Lucide المضمونة
    degrees: [
      { label: 'درجة البكالوريوس التقني', icon: GraduationCap },
      { label: 'الشهادة الوطنية العليا (HNC) - المستوى التقني', icon: Award },
      { label: 'الدبلوم الوطني العالي (HND) - المستوى المهني', icon: BookOpen }
    ],
    faqs: [
      { q: 'كيف يمكنني الالتحاق بجامعة الحسين التقنية؟', a: 'يمكنك الالتحاق بجامعة الحسين التقنية من خلال موقع القبول والتسجيل الإلكتروني الرسمي للجامعة عند فتح باب التسجيل لكل فصل.' },
      { q: 'هل تعتبر جامعة الحسين التقنية جامعة معتمدة؟', a: 'نعم، الجامعة معتمدة اعتماداً عاماً وخاصاً من هيئة اعتماد مؤسسات التعليم العالي وضمان جودتها.' },
      { q: 'هل يجد خريجو جامعة الحسين التقنية وظائف بسهولة؟', a: 'نعم، بفضل الشراكات الإلزامية مع القطاع الخاص وفترة التدريب الطويلة المدمجة بالدراسة، فإن نسبة تشغيل الخريجين مرتفعة جداً.' }
    ]
  },
  'مركز التميز للريادة والابتكار': {
    title: 'مركز التميز للريادة والابتكار',
    titleEn: 'Center of Excellence for Entrepreneurship',
    pathway: 'المشاركة الاقتصادية',
    type: 'مسرعة وحاضنة أعمال',
    mechanism: 'وجاهي ومدمج',
    languages: 'العربية والإنجليزية',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=1932',
    logo: '/HTU.png',
    about: 'المركز الحاضن للأفكار المبتكرة والمشاريع الناشئة (The Core)، والذي يسعى إلى تمكين رواد الأعمال الشباب وتوفير الدعم التقني واللوجستي لهم.',
    overview: 'يقدم المركز مساحات عمل مشتركة، وبرامج إرشاد وتوجيه متخصصة، ويسهل شبكات التواصل مع المستثمرين والخبراء في مختلف القطاعات التكنولوجية والصناعية لضمان نمو الشركات الناشئة وتحويل الأفكار إلى منتجات تجارية.',
    facilities: [
      'مساحات عمل مشتركة ومكاتب خاصة مجهزة بالكامل للشركات الناشئة.',
      'قاعات اجتماعات متطورة وشبكة اتصالات مفتوحة لتسهيل العروض التقديمية.',
      'جلسات إرشاد دورية مع مرشدين محليين وعالميين في مجالات الأعمال والتكنولوجيا.'
    ],
    faqs: [
      { q: 'هل يجب أن أكون طالباً في جامعة الحسين التقنية للاستفادة من المركز؟', a: 'المركز يدعم طلبة الجامعة بالإضافة إلى رواد الأعمال والمبتكرين من المجتمع المحلي والشباب الأردني بشكل عام.' },
      { q: 'ما نوع الدعم الذي يقدمه المركز؟', a: 'يقدم تدريباً مكثفاً، ومساحات عمل مجانية، واستشارات قانونية ومالية، وفرص تشبيك مع مستثمرين وصناديق تمويل.' }
    ]
  },
  '42 عمّان و42 إربد': {
    title: 'مدرسة 42 عمّان و42 إربد',
    titleEn: 'Network 42 Jordan',
    pathway: 'المشاركة الاقتصادية',
    type: 'تعليم برمجية مبتكر',
    mechanism: 'وجاهي (24/7)',
    languages: 'الإنجليزية بشكل أساسي للبرمجة',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071',
    logo: '/42Amman.png',
    about: 'جزء من شبكة 42 العالمية؛ نموذج تعليمي ثوري مجاني بالكامل لتعليم البرمجة وعلوم الحاسوب بدون معلمين، أو فصول تقليدية، أو شهادات أكاديمية مسبقة.',
    overview: 'تعتمد مدارس 42 على منهجية "التعلم القائم على المشاريع" والتعلم النظير (Peer-to-Peer). يتقدم الطالب في المنهج عبر مستويات تشبه ألعاب الفيديو، ويتعلم فيها تطوير الأنظمة، الخوارزميات، الأمن السيبراني، والذكاء الاصطناعي، بمساحات مفتوحة على مدار الساعة طوال أيام الأسبوع.',
    facilities: [
      'مختبرات حاسوبية ضخمة مجهزة بأحدث أجهزة الـ iMac المتاحة للطلاب دائماً.',
      'مساحات ترفيهية وغرف استراحة مخصصة لتعزيز بيئة التعلم المشترك المريح.',
      'أنظمة تقييم برمجية مؤتمتة متطورة تصحح المشاريع بدقة مئوية.'
    ],
    faqs: [
      { q: 'هل يشترط وجود شهادة جامعية أو خبرة في البرمجة؟', a: 'لا يشترط أي معرفة سابقة بالبرمجة ولا أي شهادة أكاديمية، الشرط الوحيد أن يكون العمر 18 عاماً فما فوق وتجاوز اختبارات المنطق عبر الإنترنت.' },
      { q: 'ما هو معسكر التصفية (Piscine)؟', a: 'هو مخيم تدريبي مكثف لمدة 4 أسابيع وجاهياً، يتم فيه اختبار قدرة المتقدم على التعلم السريع والعمل الجماعي، ومن يتجاوزه يقبل رسمياً كطالب أساسي.' }
    ]
  },
  'كلية التدريب المهني المتقدم في الأردن': {
    title: 'كلية التدريب المهني المتقدم',
    titleEn: 'Advanced Vocational Training College',
    pathway: 'المشاركة الاقتصادية',
    type: 'تعليم مهني وتقني متطور',
    mechanism: 'وجاهي تطبيقي',
    languages: 'العربية والإنجليزية التقنية',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070',
    logo: '/HTU.png',
    about: 'مؤسسة تعليمية تركز على سد الفجوة بين التعليم التقليدي والاحتياجات الفعلية للصناعة عبر برامج مهنية ميكانيكية والكترونية متقدمة.',
    overview: 'توفر الكلية مسارات تدريبية نوعية تعتمد على التجهيزات والمشاعل الهندسية الحقيقية لتمكين المتدرب من إتقان الحرف الهندسية الحديثة، والتصنيع بمساعدة الحاسوب، وصيانة الأنظمة الهيدروليكية والكهربائية للمصانع والمنشآت.',
    facilities: [
      'مشاعل هندسية وصناعية متكاملة تحاكي خطوط الإنتاج في المصانع الحقيقية.',
      'مختبرات صيانة الأجهزة الدقيقة ومعدات التحكم الصناعي المؤتمت الكهروميكانيكي.',
      'شراكات وثيقة مع نقابات وشركات صناعية كبرى لتوظيف المتدربين فور التخرج.'
    ],
    faqs: [
      { q: 'ما هي الفئات المستهدفة في هذه الكلية؟', a: 'تستهدف الشباب الراغبين في دخول المسار المهني السريع وإتقان مهارات عملية مطلوبة بشدة في القطاع الصناعي داخل وخارج الأردن.' }
    ]
  },
  'مساحة الصنّاع': {
    title: 'مساحة الصنّاع (TechWorks)',
    titleEn: 'The Makerspace - TechWorks',
    pathway: 'المشاركة الاقتصادية',
    type: 'مختبر تصنيع رقمي FabLab',
    mechanism: 'وجاهي عملي',
    languages: 'العربية والإنجليزية',
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=2136',
    logo: '/The-Makerspace.png',
    about: 'مختبر تصنيع رقمي متكامل (FabLab) تأسس لدعم المبتكرين، والمخترعين، والشركات الناشئة لإنتاج واختبار نماذجهم الأولية برمجياً وميكانيكياً.',
    overview: 'تحتوي مساحة الصنّاع على آلات وأجهزة حديثة مخصصة للنمذجة السريعة والتصنيع الرقمي، بحيث تدعم مستخدمي المساحة خلال جميع مراحل عملهم وابتكارهم، بداية من الفكرة الأولى والتصميم على الكمبيوتر، وحتى تطوير الفكرة هندسياً وإنتاجها.',
    facilities: [
      'مركز التميز للتقنيات ثلاثية الأبعاد والطباعة المجسمة المتقدمة.',
      'آلات القطع والحفر بالليزر وجهاز الفرز الميكانيكي الروبوتي CNC.',
      'مساحات عمل لإنتاج وتجميع الألواح الإلكترونية والأنظمة الذكية المصغرة.'
    ],
    faqs: [
      { q: 'هل أحتاج لتدريب مسبق لاستخدام الآلات؟', a: 'يقوم الفريق الهندسي في مساحة الصنّاع بالإشراف الكامل وتوفير دورات تدريبية سريعة لضمان قدرتك على استخدام الآلات بأمان وكفاءة.' },
      { q: 'أين تقع المساحة؟', a: 'تقع في مجمع الملك حسين للأعمال (KHBP) في عمان.' }
    ]
  },
  'مبرمجو الأردن': {
    title: 'مبادرة مبرمجو الأردن',
    titleEn: 'Jordan Programmers',
    pathway: 'المشاركة الاقتصادية',
    type: 'بناء قدرات رقمية',
    mechanism: 'عبر الإنترنت ومدمج',
    languages: 'العربية',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070',
    logo: '/HTU.png',
    about: 'مبادرة وطنية تهدف إلى نشر الوعي البرمجي الرقمي بين اليافعين والشباب وتدريبهم على مهارات المستقبل ولغات البرمجة الأكثر طلباً.',
    overview: 'تسعى المبادرة لإعداد جيل متمكن من التكنولوجيا والمنطق البرمجي من خلال معسكرات ودورات إلكترونية تفاعلية، تبدأ من أساسيات بناء مواقع الويب وتطبيقات الهواتف الذكية وتصل إلى مفاهيم قواعد البيانات الذكية.',
    facilities: [
      'منصة تعليمية تفاعلية تتيح التطبيق المباشر لكتابة الكود وفحصه من المتصفح.',
      'مجتمعات برمجية رقمية تجمع الطلاب بالمرشدين والمطورين المحترفين للإجابة على الاستفسارات.',
      'مسابقات وتحديات برمجية دورية بجوائز تحفيزية للمشاركين.'
    ],
    faqs: [
      { q: 'هل تتوفر الشهادات بعد إنهاء التدريب؟', a: 'نعم، يحصل المتدرب على شهادة إتمام رقمية معتمدة من المبادرة ومؤسسة ولي العهد بعد إنهاء المتطلبات والمشاريع.' }
    ]
  },
  'منصة التّعلم الرقمي لجامعة الحسين التقنية': {
    title: 'منصة التّعلم الرقمي لجامعة الحسين التقنية',
    titleEn: 'HTU Digital Learning Platform',
    pathway: 'المشاركة الاقتصادية',
    type: 'منصة تعليم إلكتروني',
    mechanism: 'عبر الإنترنت بالكامل',
    languages: 'العربية والإنجليزية',
    image: 'https://images.unsplash.com/photo-101504905252-473c47e087f8?q=80&w=1974',
    logo: '/HTU.png',
    about: 'الذراع الرقمي الأكاديمي لجامعة الحسين التقنية، والذي يهدف إلى توفير برامج تدريبية ومساقات تكنولوجية معتمدة عبر الإنترنت لكافة الشباب.',
    overview: 'تتيح المنصة وصولاً مرناً وعالمي المستوى لمساقات مصممة بالتعاون مع كبرى الشركات التكنولوجية، مما يتيح للطلاب والموظفين تطوير مهاراتهم في مجالات تحليل البيانات، شبكات الحاسوب، ريادة الأعمال، والمهارات الحياتية.',
    facilities: [
      'محتوى مرئي عالي الجودة مقسم لوحدات تعليمية قصيرة ومركزة للتعلّم المرن.',
      'اختبارات تقييمية ومشاريع عملية مبنية وفقاً لأحدث معايير التعليم الرقمي المفتوح.',
      'لوحة تحكم ذكية لمتابعة التقدم الشخصي ومعدل الإنجاز وساعات التدريب.'
    ],
    faqs: [
      { q: 'هل المساقات مجانية؟', a: 'توفر المنصة باقات واسعة من البرامج والمساقات المجانية المدعومة بالكامل للشباب الأردني لدعم جاهزيتهم الرقمية.' }
    ]
  },
  'برنامج التدريب الدّولي': {
    title: 'برنامج التدريب الدّولي',
    titleEn: 'Global Internship Program',
    pathway: 'القيادة',
    type: 'تدريب خارجي دولي متميز',
    mechanism: 'وجاهي (خارج المملكة)',
    languages: 'الإنجليزية والفرنسية حسب الوجهة',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084',
    logo: '/Global-Internship-Program.png',
    about: 'برنامج استراتيجي يمنح الشباب الأردني المتميز فرص تدريبية عملية فريدة من نوعها داخل كبرى الشركات ومعاهد الأبحاث العالمية.',
    overview: 'يستهدف البرنامج الطلاب المتفوقين في مجالات الهندسة والتكنولوجيا المتقدمة، حيث ترتبط مؤسسة ولي العهد باتفاقيات تعاون مع جهات رائدة مثل شركة إيرباص (Airbus)، المركز الوطني الفرنسي لدراسات الفضاء (CNES)، ووكالة ناسا الفضائية (NASA).',
    facilities: [
      'فرص معايشة عملية داخل مختبرات ومصانع عالمية متقدمة تكنولوجياً.',
      'تغطية شاملة وتسهيلات لوجستية تشمل السفر، الإقامة، وبدل المعيشة للطلاب المقبولين.',
      'شبكة خريجين دوليين تفتح آفاق العمل الأكاديمي والمهني المتقدم داخل وخارج الأردن.'
    ],
    faqs: [
      { q: 'ما هي معايير الاختيار للبرنامج الدولي؟', a: 'يتم الاختيار بناءً على التميز الأكاديمي العالي، وإتقان اللغات، وتجاوز المقابلات الفنية والشخصية الصارمة التي تعقدها لجنة مشتركة.' }
    ]
  },
  'مبادرة قصي': {
    title: 'مبادرة قصي',
    titleEn: 'Qusai Initiative',
    pathway: 'القيادة',
    type: 'تأهيل وتدريب طبي رياضي',
    mechanism: 'وجاهي ونظري مدمج',
    languages: 'العربية والإنجليزية الطبية',
    image: 'https://images.unsplash.com/photo-1576267423048-15c0040fec78?q=80&w=2070',
    logo: '/Global-Internship-Program.png',
    about: 'مبادرة أطلقت تخليداً لذكرى اللاعب قصي الخوالدة، وتهدف إلى رفع كفاءة المعالجين الرياضيين وفرق الإسعاف في الملاعب الأردنية لحماية حياة اللاعبين.',
    overview: 'تعمل مبادرة قصي بالتعاون مع الجهات الطبية والرياضية على تقديم برامج تدريبية دولية متقدمة في مجال الإسعاف الأولي المتقدم، والتعامل مع الإصابات الحرجة في الملاعب وحالات السكتات القلبية المفاجئة لضمان سلامة البيئة الرياضية الوطنية.',
    facilities: [
      'دورات تدريبية عملية بالتعاون مع جمعية القلب الأمريكية والاتحادات الطبية الدولية.',
      'تزويد الملاعب والنوادي بحقائب طبية متكاملة وأجهزة إنعاش قلبي مؤتمتة (AED).',
      'منصة بيانات لتوثيق وتتبع المعالجين الرياضيين المرخصين والمعتمدين بالمملكة.'
    ],
    faqs: [
      { q: 'من هم المستفيدون من المبادرة؟', a: 'المستفيدون هم خريجو كليات التربية الرياضية، العلاج الطبيعي، والتمريض، بالإضافة إلى الكوادر الطبية العاملة بالاتحادات والأندية الرياضية.' }
    ]
  },
  'برنامج القيادة للمدارس': {
    title: 'برنامج القيادة للمدارس (مبادرة حقق)',
    titleEn: 'School Leadership Program - Haqeq',
    pathway: 'القيادة',
    type: 'بناء مهارات قيادية وحياتية',
    mechanism: 'وجاهي في المدارس والمعسكرات',
    languages: 'العربية',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132',
    logo: '/Global-Internship-Program.png',
    about: 'برنامج يهدف لغرس قيم المواطنة الصالحة والعمل الجماعي والمهارات القيادية لدى طلبة المدارس لبناء جيل مسؤول وواعٍ.',
    overview: 'يعمل البرنامج من خلال مجالس ومجموعات طلابية في مختلف مدارس المملكة، حيث يمر الطالب بمراحل تدريبية متتالية تشمل التفكير النقدي، التخطيط للمشاريع المجتمعية، وإدارة الفرق، وتتوج بمعسكرات ميدانية تفاعلية.',
    facilities: [
      'ورش عمل وأنشطة تفاعلية تطبق داخل المدارس تحت إشراف مشرفين مدربين.',
      'معسكرات قيادية سنوية تجمع الطلاب المتميزين لتطوير مهارات الاعتماد على الذات والتحمل.',
      'دعم وتمويل مبادرات مجتمعية صغيرة يصممها وينفذها الطلاب بأنفسهم لخدمة مناطقهم.'
    ],
    faqs: [
      { q: 'كيف يشارك طلبة المدارس في البرنامج؟', a: 'يتم التنسيق والاشتراك بالتعاون المباشر مع وزارة التربية والتعليم في المدارس الحكومية والخاصة المستهدفة بكل محافظة.' }
    ]
  },
  'برنامج خطى الحسين': {
    title: 'برنامج خطى الحسين القيادي',
    titleEn: 'Khuta Al-Hussein Fellowship',
    pathway: 'القيادة',
    type: 'برنامج زمالة قيادي متقدم',
    mechanism: 'وجاهي وميداني مكثف',
    languages: 'العربية والإنجليزية',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2049',
    logo: '/Global-Internship-Program.png',
    about: 'برنامج قيادي نوعي ونخبة موجه للشباب الجامعي الأردني لبناء قدراتهم السياسية، الاقتصادية، والاجتماعية ليكونوا صناع قرار مستقبليين.',
    overview: 'يركز برنامج خطى الحسين على تعميق الفهم بالهوية الوطنية والتحديات الاستراتيجية للمملكة. يشمل البرنامج لقاءات مع قادة فكر ومسؤولين، وتدريبات على مهارات الحوار والمناظرة، وصياغة أوراق السياسات العامة والحلول التنموية.',
    facilities: [
      'جلسات حوارية ومناقشات مغلقة مع كبار صناع القرار والوزراء والخبراء في المملكة.',
      'معسكرات تدريبية متقدمة في الإدارة القيادية والتخطيط الاستراتيجي بالتعاون مع معاهد دولية.',
      'فرص لتقديم ومناقشة مقترحات السياسات أمام لجان وطنية رفيعة المستوى.'
    ],
    faqs: [
      { q: 'هل البرنامج متاح لجميع التخصصات الجامعية؟', a: 'نعم، متاح لجميع الطلاب والشباب الجامعيين من شتى التخصصات، حيث نركز على الشغف، الإمكانات القيادية، والالتزام بإحداث تغيير إيجابي.' }
    ]
  },
  'نَحْنُ': {
    title: 'نَحْنُ - المنصة الوطنية للتطوع',
    titleEn: 'Nahno - National Volunteer Platform',
    pathway: 'التنمية المجتمعية',
    type: 'منصة رقمية تطوعية وطنية',
    mechanism: 'إلكتروني وميداني وجاهي',
    languages: 'العربية',
    image: 'https://images.unsplash.com/photo-1593113580332-ceb4b62dbba4?q=80&w=2070',
    logo: '/Nahno.png',
    about: 'المنصة الوطنية لتطوع ومشاركة الشباب، إحدى مبادرات مؤسسة ولي العهد بالشراكة مع اليونيسف، وتهدف لمأسسة وتوثيق العمل التطوعي بالمملكة.',
    overview: 'تربط منصة "نحن" الشباب الراغبين في التطوع بالفرص المتاحة من قبل مؤسسات المجتمع المدني، الشركات، والجهات الحكومية. تضمن المنصة حقوق المتطوعين وتوثق ساعاتهم التطوعية بشكل رسمي للحصول على شهادات معتمدة تسهم في بناء مسيرتهم المهنية والأكاديمية.',
    facilities: [
      'نظام رقمي ذكي لإصدار شهادات التطوع الرسمية الموثقة بساعات العمل الفعلية.',
      'لوحة تحكم متكاملة للمؤسسات الشريكة لطرح الفرص التطوعية وإدارتها بسهولة.',
      'محفظة رقمية للمتطوع (Volunteer Portfolio) تجمع كل إنجازاته ومشاركاته المجتمعية.'
    ],
    faqs: [
      { q: 'كيف تحتسب الساعات وهل هناك عائد مادي؟', a: 'التطوع عمل غير مدفوع الأجر، لكن العائد يكون معنوياً ومهارياً؛ حيث تحتسب الساعات إلكترونياً وتوثق بشهادة رسمية تفيدك في سيرتك الذاتية وتنافسيتك بسوق العمل.' },
      { q: 'ما هو العمر المسموح للتسجيل بالمنصة؟', a: 'المنصة متاحة لكافة الفئات العمرية من الشباب ابتداءً من عمر 15 عاماً فما فوق.' }
    ]
  },
  'الحملات والاستجابات الإنسانية': {
    title: 'الحملات والاستجابات الإنسانية',
    titleEn: 'Humanitarian Campaigns & Responses',
    pathway: 'التنمية المجتمعية',
    type: 'مبادرات إغاثية وتنموية عاجلة',
    mechanism: 'ميداني وجاهي',
    languages: 'العربية',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070',
    logo: '/Nahno.png',
    about: 'إطار تنظيمي يهدف إلى حشد جهود وطاقات الشباب الأردني وتوجيهها للمشاركة في حملات الإغاثة الإنسانية والتنمية المجتمعية الطارئة.',
    overview: 'تعمل المبادرة على تنظيم وتدريب فرق شبابية متطوعة قادرة على الاستجابة السريعة بالتعاون مع الهيئة الخيرية الأردنية الهاشمية والمؤسسات الوطنية، لتعبئة وإرسال المساعدات، والمشاركة في حملات التبرع بالدم، وإسناد الفئات الأكثر تضرراً محلياً وإقليمياً.',
    facilities: [
      'مراكز لوجستية مجهزة لتعبئة وتغليف وتجهيز قوافل المساعدات الإنسانية.',
      'برامج تدريبية متخصصة للشباب حول إدارة الأزمات والإسعافات الأولية والدعم اللوجستي الميداني.',
      'شبكة تواصل وتنسيق سريعة مع المنظمات الإغاثية الرسمية لضمان كفاءة التوزيع.'
    ],
    faqs: [
      { q: 'كيف يمكنني الانضمام لفرق الاستجابة الميدانية؟', a: 'يتم طرح طلبات الانضمام والحملات الطارئة عبر التبويب المخصص للفرص بالمنصة، ويمكن للشباب المؤهلين التسجيل فوراً للمساندة الميدانية.' }
    ]
  }
};

export default function ProgramDetails({ onNavigate, programName = 'جامعة الحسين التقنية' }) {
  const currentProgram = programsFullData[programName] || programsFullData['جامعة الحسين التقنية'];
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [programName]);

  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    // 🟢 التعديل الأهم: شلنا الخط الإجباري، ورجعنا الـ font-sans اللي بيقرأ من الـ Tailwind.config تبعك
    <div className="min-h-screen bg-white pb-32 text-[#1a1c1d] font-sans" dir="rtl">
      
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 pt-36 pb-16">
        
        {/* شريط المسار */}
        <nav className="flex items-center gap-2 text-[13px] font-bold text-gray-500 mb-10 w-full">
          <span className="hover:text-[#8a1538] cursor-pointer transition-colors" onClick={() => onNavigate('home')}>الرئيسية</span>
          <img src="/arrow-yellow.svg" className="w-2.5 h-2.5 rotate-180 opacity-60" alt="" />
          <span className="hover:text-[#8a1538] cursor-pointer transition-colors" onClick={() => onNavigate('programs')}>برامجنا</span>
          <img src="/arrow-yellow.svg" className="w-2.5 h-2.5 rotate-180 opacity-60" alt="" />
          <span className="text-gray-900 font-black">{currentProgram.title.split(' (')[0]}</span>
        </nav>

        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-24">
          
          <div className="w-full lg:w-1/2 flex flex-col items-start text-right">
            <div className="h-24 w-auto shrink-0 mb-6 mix-blend-multiply">
              <img src={currentProgram.logo} alt={currentProgram.title} className="max-w-full h-full object-contain object-right" />
            </div>
            
            <h1 className="text-[2.25rem] md:text-[2.75rem] font-black tracking-tight text-gray-900 leading-tight mb-2">
              {currentProgram.title}
            </h1>
            {currentProgram.titleEn && (
              <h2 className="text-[1.25rem] md:text-[1.5rem] font-bold text-gray-400 font-sans tracking-wide mb-6" dir="ltr" style={{ textAlign: 'left', width: '100%' }}>
                {currentProgram.titleEn}
              </h2>
            )}
            
            <p className="font-medium text-[1.1rem] leading-[2.1rem] text-gray-600 text-justify mt-2">
              {currentProgram.about}
            </p>
          </div>

          <div className="w-full lg:w-1/2 h-[320px] md:h-[380px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden flex-shrink-0 shadow-lg shadow-gray-200/50">
            <img src={currentProgram.image} alt={currentProgram.title} className="w-full h-full object-cover" />
          </div>

        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 mb-20">
        <div className="w-full bg-gradient-to-l from-[#8a1538] to-[#680f2a] rounded-[1.5rem] py-10 md:py-12 relative overflow-hidden shadow-md">
          <div 
            className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
            style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '200px 200px', backgroundRepeat: 'repeat' }}
          />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="md:border-l md:border-white/10 md:pl-6">
              <p className="text-white/70 text-[13px] font-bold mb-2">نوع البرنامج</p>
              <p className="text-white text-lg md:text-xl font-black">{currentProgram.type}</p>
            </div>
            <div className="md:border-l md:border-white/10 md:px-6">
              <p className="text-white/70 text-[13px] font-bold mb-2">مسار البرنامج</p>
              <p className="text-white text-lg md:text-xl font-black">{currentProgram.pathway}</p>
            </div>
            <div className="md:pr-6">
              <p className="text-white/70 text-[13px] font-bold mb-2">آلية التدريب</p>
              <p className="text-white text-lg md:text-xl font-black">{currentProgram.mechanism}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-16 lg:gap-20">
        
        <div className="w-full lg:w-8/12 space-y-16">
          
          {currentProgram.overview && (
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-[1.5rem] md:text-[1.75rem] font-black mb-6 flex items-center gap-3 text-gray-900">
                <img src="/arrow-yellow.svg" className="w-6 h-6 shrink-0" alt="" />
                <span>تعرّف على البرنامج ونظرته الاستراتيجية</span>
              </h2>
              <p className="font-medium text-[1.1rem] leading-[2.2rem] text-gray-600 text-justify">
                {currentProgram.overview}
              </p>
            </motion.section>
          )}

          {currentProgram.facilities && (
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-[1.5rem] md:text-[1.75rem] font-black mb-6 flex items-center gap-3 text-gray-900">
                <img src="/arrow-yellow.svg" className="w-6 h-6 shrink-0" alt="" />
                <span>{currentProgram.facilitiesTitle || 'المزايا والمرافق الرئيسية'}</span>
              </h2>
              <ul className="space-y-4 pr-2 text-gray-700 font-medium text-[1.1rem] leading-[2rem]">
                {currentProgram.facilities.map((fac, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#C08F2D] mt-2.5 shrink-0" />
                    <span className="text-justify">{fac}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {/* 🟢 تعديل ريندر الأيقونات (Lucide Icons بدلاً من الصور) */}
          {programName === 'جامعة الحسين التقنية' && currentProgram.degrees && (
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-[1.5rem] md:text-[1.75rem] font-black mb-8 flex items-center gap-3 text-gray-900">
                <img src="/arrow-yellow.svg" className="w-6 h-6 shrink-0" alt="" />
                <span>الدرجات والشهادات التي تقدّمها</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentProgram.degrees.map((degree, idx) => (
                  <div key={idx} className="group bg-white border border-gray-100 hover:border-[#8a1538]/30 rounded-[1.2rem] p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="w-20 h-20 mb-6 flex items-center justify-center bg-gray-50 rounded-full group-hover:bg-[#8a1538]/10 transition-colors">
                      {/* عرض أيقونة Lucide هنا */}
                      <degree.icon className="w-10 h-10 text-[#8a1538]" strokeWidth={1.5} />
                    </div>
                    <span className="font-bold text-gray-800 text-[15px] leading-relaxed group-hover:text-[#8a1538] transition-colors">{degree.label}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {currentProgram.faqs && (
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-[1.5rem] md:text-[1.75rem] font-black mb-6 flex items-center gap-3 text-gray-900">
                <img src="/arrow-yellow.svg" className="w-6 h-6 shrink-0" alt="" />
                <span>الأسئلة الأكثر تكراراً</span>
              </h2>
              <div className="space-y-3">
                {currentProgram.faqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div key={idx} className={`rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-gray-50 border border-gray-200' : 'bg-[#F8FAFC] border border-transparent'}`}>
                      <button 
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-5 text-right focus:outline-none cursor-pointer"
                      >
                        <span className={`font-bold text-[1.05rem] pl-4 transition-colors ${isOpen ? 'text-[#8a1538]' : 'text-gray-800'}`}>{faq.q}</span>
                        <span className="text-2xl font-black text-[#C08F2D] shrink-0">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <div className="px-5 pb-5 pt-0 text-[1rem] font-medium leading-[1.9rem] text-gray-600 text-justify border-t border-gray-200/50 mt-2 pt-4">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          )}

        </div>

        <div className="w-full lg:w-4/12 relative z-10">
          <div className="sticky top-32 bg-[#F8FAFC] border border-gray-100 rounded-[1.5rem] p-8 md:p-10 text-right shadow-sm">
            
            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                  <Building2 className="w-5 h-5 text-[#8a1538]" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-gray-400 mb-0.5">آلية البرنامج</p>
                  <p className="text-[15px] font-black text-gray-800">{currentProgram.mechanism}</p>
                </div>
              </div>
              
              <div className="w-full h-[1px] bg-gray-200" />

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                  <LayoutGrid className="w-5 h-5 text-[#8a1538]" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-gray-400 mb-0.5">نوع البرنامج</p>
                  <p className="text-[15px] font-black text-gray-800">{currentProgram.type}</p>
                </div>
              </div>

              <div className="w-full h-[1px] bg-gray-200" />

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                  <LayoutTemplate className="w-5 h-5 text-[#8a1538]" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-gray-400 mb-0.5">مسار البرنامج</p>
                  <p className="text-[15px] font-black text-gray-800">{currentProgram.pathway}</p>
                </div>
              </div>

              <div className="w-full h-[1px] bg-gray-200" />

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                  <Clock className="w-5 h-5 text-[#8a1538]" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-gray-400 mb-0.5">لغة التدريب</p>
                  <p className="text-[15px] font-black text-gray-800">{currentProgram.languages}</p>
                </div>
              </div>
            </div>

            <button className="w-full bg-[#8a1538] hover:bg-[#680f2a] text-white px-8 py-4 rounded-xl font-bold text-[15px] transition-colors flex items-center justify-center gap-3 shadow-md cursor-pointer group">
              <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1.5 transition-transform" strokeWidth={2.5} />
              <span>تقديم طلب ومتابعة الفرص</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}