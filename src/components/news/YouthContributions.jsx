// src/components/news/YouthContributions.jsx
import { useState, useRef } from 'react';
import { Upload, CalendarDays, X, ImagePlus, CheckCircle2, ChevronRight, ChevronLeft, ArrowLeft, ChevronUp } from 'lucide-react';

export default function YouthContributions() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // حالة للتحكم بفتح وعرض جميع الصور في نفس الصفحة
  const [isExpanded, setIsExpanded] = useState(false);
  
  const scrollContainerRef = useRef(null);

  // 🟢 البيانات الجديدة المحدثة
  const [contributions, setContributions] = useState([
    { 
      id: 1, 
      image: 'https://cpf.jo/wp-content/uploads/2025/05/6-3.jpg',
      title: 'تدريب الجرار بين الماضي والحاضر في الزرقاء',
      desc: 'جانب من تدريب الجرار الزراعي بين الماضي والحاضر في محافظة الزرقاء، لتعزيز مهارات الشباب في القطاع الزراعي.',
      date: '2025-05-15'
    },
    { 
      id: 2, 
      image: 'https://cpf.jo/wp-content/uploads/2025/04/18-1.jpg',
      title: 'يوم العلم الأردني',
      desc: 'مشاركتنا في احتفالات يوم العلم الأردني، تعبيراً عن الفخر والاعتزاز براية الوطن وتعميقاً للانتماء الوطني.',
      date: '2025-04-16'
    },
    { 
      id: 3, 
      image: 'https://cpf.jo/wp-content/uploads/2025/03/2-2.jpg',
      title: 'تدريب صناعة الألعاب الالكترونية في مادبا',
      desc: 'ورشة عمل متخصصة في صناعة الألعاب الإلكترونية لشباب وشابات محافظة مادبا لتطوير مهاراتهم التقنية والإبداعية.',
      date: '2025-03-22'
    },
    { 
      id: 4, 
      image: 'https://cpf.jo/wp-content/uploads/2025/02/19-1.jpg',
      title: 'ورشة صناعة المحتوى في الكرك',
      desc: 'تمكين شباب الكرك من مهارات صناعة المحتوى الرقمي المؤثر، لنقل قصص نجاحهم ومبادراتهم عبر المنصات المختلفة.',
      date: '2025-02-19'
    },
    { 
      id: 5, 
      image: 'https://cpf.jo/wp-content/uploads/2024/12/1-598.jpg',
      title: 'زيارة مشاركي خطى الحسين لمتحف صرح الشهيد',
      desc: 'مشاركو برنامج خطى الحسين في زيارة لمتحف صرح الشهيد، لاستذكار بطولات وتضحيات نشامى القوات المسلحة الأردنية.',
      date: '2024-12-10'
    },
    { 
      id: 6, 
      image: 'https://cpf.jo/wp-content/uploads/2025/01/6.jpg',
      title: 'الواقع الافتراضي والواقع المعزز-مادبا',
      desc: 'مواكبة التطور التكنولوجي من خلال تدريب مكثف على تقنيات الواقع الافتراضي والواقع المعزز في محافظة مادبا.',
      date: '2025-01-25'
    }
  ]);

  const [formData, setFormData] = useState({
    image: null,
    imagePreview: null,
    title: '',
    desc: '',
    date: ''
  });

  const fileInputRef = useRef(null);

  // دوال التقليب
  const scrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: file, imagePreview: previewUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.imagePreview || !formData.title || !formData.desc || !formData.date) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newContribution = {
        id: Date.now(),
        image: formData.imagePreview,
        title: formData.title,
        desc: formData.desc,
        date: formData.date,
      };

      setContributions([newContribution, ...contributions]);
      setIsSubmitting(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        setIsUploadModalOpen(false);
        setFormData({ image: null, imagePreview: null, title: '', desc: '', date: '' });
      }, 1500);
    }, 500);
  };

  return (
    <div className="py-16 md:py-24 bg-white relative border-t border-gray-100" dir="rtl">
      
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* الترويسة وأزرار الإجراءات */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10 md:mb-12">
          <div>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-black text-[#8a1538] mb-2 tracking-tight">مشاركات شبابنا</h2>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#C08F2D] text-[#1a0409] px-6 py-3 rounded-full font-black text-sm shadow-sm cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              أضف مشاركتك
            </button>
            
            {!isExpanded && (
              <button 
                onClick={() => setIsExpanded(true)}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-black text-sm cursor-pointer"
              >
                اطلع على المزيد
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 🟢 قسم عرض الصور */}
        <div className="relative group">
          
          {/* سهم التقليب الأيمن */}
          {!isExpanded && (
            <button 
              onClick={scrollPrev}
              className="hidden md:flex absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white text-[#8a1538] rounded-full items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-100 cursor-pointer transition-transform hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* الحاوية المتغيرة */}
          <div 
            ref={scrollContainerRef}
            className={
              isExpanded 
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 py-4" 
                : "flex overflow-x-auto hide-scrollbar gap-4 md:gap-6 py-4 snap-x snap-mandatory scroll-smooth"
            }
          >
            {contributions.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className={`
                  relative rounded-[2rem] overflow-hidden cursor-pointer shadow-md bg-gray-100 border border-gray-100 group/card transition-shadow hover:shadow-2xl
                  ${isExpanded ? 'w-full aspect-square' : 'w-[250px] sm:w-[280px] md:w-[320px] aspect-[4/5] shrink-0 snap-center'}
                `}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105" 
                />
                
                {/* تراكب لوني وعنوان - ظاهر دائماً على الموبايل، يظهر بالتحويم على الديسكتوب فقط */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover/card:opacity-100 flex flex-col justify-end p-6 transition-opacity duration-300">
                   <span className="text-white font-black text-lg drop-shadow-md translate-y-0 md:translate-y-4 md:group-hover/card:translate-y-0 transition-transform duration-300">
                     {item.title}
                   </span>
                </div>
              </div>
            ))}
            
            {/* مسافة مساعدة خفيفة في نهاية التمرير */}
            {!isExpanded && (
              <div className="shrink-0 w-2 md:w-6" aria-hidden="true" />
            )}
          </div>

          {/* سهم التقليب الأيسر */}
          {!isExpanded && (
            <button 
              onClick={scrollNext}
              className="hidden md:flex absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white text-[#8a1538] rounded-full items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-100 cursor-pointer transition-transform hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

        </div>

        {/* زر "عرض أقل" عند التوسع */}
        {isExpanded && (
          <div className="flex justify-center mt-10">
            <button 
              onClick={() => {
                setIsExpanded(false);
                if(scrollContainerRef.current) scrollContainerRef.current.scrollLeft = 0;
              }}
              className="flex items-center gap-2 bg-gray-100 text-gray-700 px-8 py-3.5 rounded-full font-black text-sm md:text-base cursor-pointer shadow-sm hover:bg-gray-200 transition-colors"
            >
              عرض أقل وإغلاق
              <ChevronUp className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>

      {/* ========================================= */}
      {/* 🟢 نافذة عرض الصورة المكبرة (فورية) */}
      {/* ========================================= */}
      {selectedImage && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md" dir="rtl">
          <div 
            onClick={() => setSelectedImage(null)}
            className="absolute inset-0 cursor-pointer"
          />

          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative z-10 flex flex-col items-center max-w-4xl w-full pointer-events-none">
            <img 
              src={selectedImage.image} 
              alt={selectedImage.title} 
              className="max-w-full max-h-[60vh] md:max-h-[70vh] object-contain rounded-2xl shadow-2xl pointer-events-auto"
            />
            
            <div className="mt-6 md:mt-8 text-center pointer-events-auto bg-black/50 px-6 py-4 rounded-3xl backdrop-blur-md border border-white/10 w-full max-w-2xl">
              <h3 className="text-white font-black text-xl md:text-2xl mb-2 drop-shadow-md">
                {selectedImage.title}
              </h3>
              <p className="text-white/80 font-medium text-sm md:text-base leading-relaxed mb-4">
                {selectedImage.desc}
              </p>
              <div className="inline-flex items-center gap-2 bg-[#C08F2D]/20 text-[#C08F2D] px-3 py-1.5 rounded-full font-bold text-xs md:text-sm">
                <CalendarDays className="w-4 h-4" />
                {selectedImage.date}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* 🟢 نافذة إضافة مشاركة (فورية) */}
      {/* ========================================= */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center p-0 md:p-6 bg-black/70 backdrop-blur-sm" dir="rtl">
          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-[2rem] md:rounded-[2rem] shadow-2xl relative">
            
            <div className="bg-[#f8fafc] px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-black text-[#8a1538] text-lg">شاركنا إنجازك</h3>
              <button 
                onClick={() => !isSubmitting && setIsUploadModalOpen(false)}
                className="w-8 h-8 bg-white border border-gray-200 text-gray-500 rounded-full flex items-center justify-center hover:text-red-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 md:p-8">
              {showSuccess ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                  <h4 className="text-xl font-black text-gray-900 mb-2">تمت المشاركة بنجاح!</h4>
                  <p className="text-gray-500">شكراً لك، تمت إضافة صورتك إلى المعرض.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block font-bold text-gray-700 text-sm mb-1.5">الصورة المُلتقطة <span className="text-red-500">*</span></label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-full h-32 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden relative ${formData.imagePreview ? 'border-[#C08F2D] bg-gray-50' : 'border-gray-300 bg-[#fcfcfc] hover:border-[#8a1538] transition-colors'}`}
                    >
                      {formData.imagePreview ? (
                        <>
                          <img src={formData.imagePreview} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <span className="text-white font-bold text-sm flex items-center gap-2"><ImagePlus className="w-4 h-4"/> تغيير الصورة</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <ImagePlus className="w-6 h-6 text-gray-400 mb-2" />
                          <span className="text-xs font-bold text-gray-600">اضغط لاختيار صورة من جهازك</span>
                        </>
                      )}
                      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" required />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 text-sm mb-1.5">عنوان المشاركة <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="مثال: مبادرة تنظيف البيئة"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-700 focus:outline-none focus:border-[#8a1538]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 text-sm mb-1.5">تاريخ الفعالية <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="date" 
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-700 focus:outline-none focus:border-[#8a1538]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 text-sm mb-1.5">القصة / الوصف <span className="text-red-500">*</span></label>
                    <textarea 
                      rows="2"
                      value={formData.desc}
                      onChange={(e) => setFormData({...formData, desc: e.target.value})}
                      placeholder="اكتب نبذة عن الفعالية وماذا حققتم..."
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-700 focus:outline-none focus:border-[#8a1538] resize-none"
                      required
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="mt-2 w-full bg-[#8a1538] text-white py-3 rounded-xl font-black text-sm md:text-base shadow-md disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer transition-colors hover:bg-[#6d1129]"
                  >
                    {isSubmitting ? 'جاري النشر...' : 'نشر المشاركة'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}   