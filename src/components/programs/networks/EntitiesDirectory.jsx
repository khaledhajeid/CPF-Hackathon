// src/components/programs/networks/EntitiesDirectory.jsx
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Mail, Phone, ArrowUpLeft, SearchX, ChevronDown } from 'lucide-react';
import { entities, ENTITY_CATEGORIES } from '../../../data/entitiesData';

const PAGE_SIZE = 6;
const MONOGRAM_STYLES = [
  { bg: 'bg-[#8a1538]', text: 'text-white' },
  { bg: 'bg-[#C08F2D]', text: 'text-[#1a0409]' },
  { bg: 'bg-[#721F31]', text: 'text-white' },
  { bg: 'bg-[#1a0409]', text: 'text-white' },
];

function EntityCard({ entity, index }) {
  const monogram = MONOGRAM_STYLES[index % MONOGRAM_STYLES.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: (index % PAGE_SIZE) * 0.05 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl transition-shadow duration-300 p-6 lg:p-7 flex flex-col"
    >
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className={`w-16 h-16 lg:w-[4.5rem] lg:h-[4.5rem] rounded-2xl ${monogram.bg} flex items-center justify-center shrink-0 shadow-md`}>
          <span className={`${monogram.text} font-black text-2xl lg:text-3xl`}>{entity.name.trim().charAt(0)}</span>
        </div>
        <span className="text-[11px] font-black text-[#8a1538] bg-[#8a1538]/[0.06] px-3 py-1.5 rounded-full shrink-0 max-w-[45%] text-center leading-snug">
          {entity.category}
        </span>
      </div>

      <h3 className="font-black text-[#1a0409] text-[17px] lg:text-lg leading-snug mb-2.5">{entity.name}</h3>
      <p className="text-gray-500 text-[13px] leading-relaxed mb-6 flex-grow">{entity.description}</p>

      <div className="flex flex-col gap-2 mb-5 pt-5 border-t border-gray-100">
        <a
          href={`mailto:${entity.email}`}
          className="flex items-center gap-2 text-gray-500 hover:text-[#8a1538] text-[12px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1538] focus-visible:ring-offset-2 rounded"
        >
          <Mail className="w-3.5 h-3.5 text-[#8a1538]/60 shrink-0" />
          <span dir="ltr" className="truncate">{entity.email}</span>
        </a>
        <a
          href={`tel:${entity.phone.replace(/\s/g, '')}`}
          className="flex items-center gap-2 text-gray-500 hover:text-[#8a1538] text-[12px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1538] focus-visible:ring-offset-2 rounded"
        >
          <Phone className="w-3.5 h-3.5 text-[#8a1538]/60 shrink-0" />
          <span dir="ltr">{entity.phone}</span>
        </a>
      </div>

      <a
        href={entity.website}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-[#8a1538] hover:bg-[#680f2a] text-white font-black text-[13px] py-3 rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1538] focus-visible:ring-offset-2"
      >
        زيارة الموقع
        <ArrowUpLeft className="w-4 h-4" />
      </a>
    </motion.article>
  );
}

export default function EntitiesDirectory() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim();
    return entities.filter((entity) => {
      const matchCategory = activeCategory === 'الكل' || entity.category === activeCategory;
      const matchQuery = !q || entity.name.includes(q) || entity.description.includes(q);
      return matchCategory && matchQuery;
    });
  }, [query, activeCategory]);

  const visibleEntities = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  const resetPaging = () => setVisibleCount(PAGE_SIZE);

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-5 mb-6 lg:mb-8 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 -translate-y-1/2 right-4 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              resetPaging();
            }}
            placeholder="ابحث باسم الجهة أو مجال عملها..."
            className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl py-3 pr-11 pl-4 text-[13px] lg:text-sm font-medium text-[#1a0409] placeholder:text-gray-500 focus:outline-none focus:bg-white focus:border-[#8a1538] focus:ring-4 focus:ring-[#8a1538]/10 transition-all"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                resetPaging();
              }}
              className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500 hover:text-[#8a1538] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1538] focus-visible:ring-offset-2 rounded-full"
              aria-label="مسح البحث"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="relative sm:w-72 shrink-0">
          <select
            value={activeCategory}
            onChange={(e) => {
              setActiveCategory(e.target.value);
              resetPaging();
            }}
            aria-label="تصفية حسب المجال"
            className="w-full appearance-none bg-[#F8FAFC] border border-gray-200 rounded-xl py-3 pr-4 pl-10 text-[13px] font-bold text-[#1a0409] cursor-pointer focus:outline-none focus:bg-white focus:border-[#8a1538] focus:ring-4 focus:ring-[#8a1538]/10 transition-all"
          >
            <option value="الكل">كل المجالات</option>
            {ENTITY_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-3.5 w-4 h-4 text-gray-400" />
        </div>
      </div>

      <p className="text-gray-500 text-[11px] lg:text-xs font-bold mb-5">
        {filtered.length} جهة {query && `مطابقة لـ"${query}"`}
      </p>

      {visibleEntities.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {visibleEntities.map((entity, index) => (
            <EntityCard key={entity.id} entity={entity} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
          <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <SearchX className="w-7 h-7 text-gray-300" />
          </div>
          <p className="text-gray-500 font-bold text-sm">لا توجد جهات مطابقة لبحثك.</p>
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center mt-6 lg:mt-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            className="bg-white border-2 border-[#8a1538] text-[#8a1538] hover:bg-[#8a1538] hover:text-white px-8 py-3 rounded-xl font-black text-sm transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1538] focus-visible:ring-offset-2"
          >
            عرض المزيد من الجهات
          </button>
        </div>
      )}
    </div>
  );
}
