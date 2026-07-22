// src/pages/PublicationsPage.jsx
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, Download, X } from 'lucide-react';
import Footer from '../components/Footer';
import { publications } from '../data/publicationsData';

const CATEGORIES = [
  { id: 'الكل', label: 'الكل' },
  { id: 'تقرير', label: 'تقارير' },
  { id: 'دراسة', label: 'دراسات' },
];

const YEARS = ['الكل', ...Array.from(new Set(publications.map((item) => item.year))).sort((a, b) => b - a)];

function PublicationCard({ item, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: (index % 3) * 0.08 }}
      className="group bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 shrink-0">
        <img
          src={item.coverImage}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
        <span className="absolute top-4 right-4 bg-[#C08F2D] text-white text-[11px] font-black px-3 py-1.5 rounded-full shadow-md">
          {item.category}
        </span>
        <span className="absolute bottom-4 right-4 text-white font-black text-sm drop-shadow-md" dir="ltr">
          {item.year}
        </span>
      </div>

      <div className="p-5 lg:p-6 flex flex-col flex-grow">
        <h3 className="font-black text-[#1a0409] text-[15px] lg:text-[17px] leading-snug mb-2 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-3 mb-5 flex-grow">
          {item.description}
        </p>

        <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-gray-500 text-[11px] font-bold">
            <FileText className="w-4 h-4 text-[#8a1538]/60 shrink-0" />
            <span dir="ltr">{item.fileType} · {item.fileSize}</span>
          </div>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-1.5 bg-[#8a1538] hover:bg-[#680f2a] text-white text-[12px] font-black px-4 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1538] focus-visible:ring-offset-2"
          >
            تحميل
            <Download className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function PublicationsPage({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [activeYear, setActiveYear] = useState('الكل');
  const [query, setQuery] = useState('');

  const featured = publications[0];

  const matchesQuery = (item, q) =>
    !q || item.title.includes(q) || item.description.includes(q);

  const filtered = useMemo(() => {
    const q = query.trim();
    return publications.filter((item) => {
      if (activeCategory !== 'الكل' && item.category !== activeCategory) return false;
      if (activeYear !== 'الكل' && item.year !== activeYear) return false;
      return matchesQuery(item, q);
    });
  }, [activeCategory, activeYear, query]);

  const isFiltering = activeCategory !== 'الكل' || activeYear !== 'الكل' || query.trim().length > 0;
  const showFeatured = !isFiltering;
  const gridItems = showFeatured ? filtered.filter((item) => item.id !== featured.id) : filtered;

  return (
    <div className="w-full bg-[#fcfcfc] font-sans selection:bg-[#C08F2D] selection:text-white" dir="rtl">
      {/* ================= 1. Hero ================= */}
      <div className="relative pt-28 pb-20 md:pt-32 md:pb-24 lg:pt-32 lg:pb-28 xl:pt-36 xl:pb-32 bg-[#1a070b] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#721F31] via-[#3b1019] to-[#1a070b] z-0" />
        <div
          className="absolute inset-0 opacity-10 pointer-events-none z-0"
          style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '400px' }}
        />

        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 2xl:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.2] tracking-tight">
              التقارير <span className="text-[#C08F2D]">والدراسات</span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* ================= 2. Filter / Search Bar ================= */}
      <div className="relative z-30 -mt-10 sm:-mt-12 xl:-mt-14 mx-4 sm:mx-8 xl:mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-gray-100"
        >
          <div className="p-4 sm:p-5 lg:p-6 flex flex-col md:flex-row items-stretch md:items-center gap-3 lg:gap-4">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 -translate-y-1/2 right-4 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث عن تقرير أو دراسة..."
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl py-3 pr-11 pl-4 text-[13px] lg:text-sm font-medium text-[#1a0409] placeholder:text-gray-500 focus:outline-none focus:bg-white focus:border-[#8a1538] focus:ring-4 focus:ring-[#8a1538]/10 transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500 hover:text-[#8a1538] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1538] focus-visible:ring-offset-2 rounded-full"
                  aria-label="مسح البحث"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0 overflow-x-auto scrollbar-hide">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    aria-pressed={isActive}
                    className={`shrink-0 whitespace-nowrap px-4 lg:px-5 py-3 rounded-xl font-black text-[12px] lg:text-[13px] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1538] focus-visible:ring-offset-2 ${
                      isActive
                        ? 'bg-[#8a1538] text-white shadow-md'
                        : 'bg-[#8a1538]/[0.06] text-[#8a1538] hover:bg-[#8a1538]/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:gap-3 px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6 pt-4 border-t border-gray-100">
            <span className="text-gray-500 font-bold text-[12px] lg:text-[13px] shrink-0">السنة:</span>
            {YEARS.map((year) => {
              const isActive = activeYear === year;
              return (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  aria-pressed={isActive}
                  dir="ltr"
                  className={`shrink-0 whitespace-nowrap px-3.5 py-2 rounded-lg font-black text-[11px] lg:text-[12px] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1538] focus-visible:ring-offset-2 ${
                    isActive
                      ? 'bg-[#8a1538] text-white shadow-sm'
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-[#1a0409]'
                  }`}
                >
                  {year}
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ================= 3. Featured Publication ================= */}
      {showFeatured && (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-4 pt-10 md:pt-14 lg:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row"
          >
            <div className="relative w-full md:w-2/5 h-56 md:h-auto shrink-0 bg-gray-100 order-1 md:order-2">
              <img src={featured.coverImage} alt={featured.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:bg-gradient-to-l md:from-black/10 md:via-transparent" />
              <span className="absolute top-5 right-5 bg-[#C08F2D] text-white text-[11px] font-black px-3 py-1.5 rounded-full shadow-md">
                {featured.category}
              </span>
            </div>

            <div className="w-full md:w-3/5 p-6 sm:p-8 lg:p-10 flex flex-col justify-center order-2 md:order-1">
              <span className="inline-block w-fit bg-[#8a1538]/[0.08] text-[#8a1538] text-[11px] font-black px-3 py-1.5 rounded-full mb-4">
                الإصدار الأحدث · {featured.year}
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#1a0409] leading-tight mb-3 lg:mb-4 tracking-tight">
                {featured.title}
              </h2>
              <p className="text-gray-500 text-[13px] lg:text-[15px] leading-relaxed mb-6 lg:mb-8 max-w-xl">
                {featured.description}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center gap-2 bg-[#8a1538] hover:bg-[#680f2a] text-white px-6 py-3 lg:px-7 lg:py-3.5 rounded-full font-black text-[13px] lg:text-sm transition-all shadow-md hover:shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1538] focus-visible:ring-offset-2"
                >
                  <span>تحميل التقرير</span>
                  <Download className="w-4 h-4" />
                </a>
                <div className="flex items-center gap-1.5 text-gray-500 text-[12px] font-bold">
                  <FileText className="w-4 h-4 text-[#8a1538]/60" />
                  <span dir="ltr">{featured.fileType} · {featured.fileSize}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ================= 4. Publications Grid ================= */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-4 py-12 md:py-14 lg:py-16">
        {gridItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {gridItems.map((item, index) => (
              <PublicationCard key={item.id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 font-bold text-sm lg:text-base">
              لا توجد نتائج مطابقة لبحثك، حاول تعديل الفلتر أو كلمة البحث.
            </p>
          </div>
        )}
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
