// src/components/programs/networks/MakersMap.jsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  MapPin,
  Globe,
  SearchX,
  Cpu,
  GraduationCap,
  Rocket,
  Box,
  Scissors,
  Layers,
  ChevronDown,
  Navigation,
  Check,
} from 'lucide-react';
import { makerSpaces, MAKER_CATEGORIES, JORDAN_MAP_CENTER } from '../../../data/makerSpacesData';
import useEscapeKey from '../../../hooks/useEscapeKey';

const CATEGORY_ICONS = {
  'digital-fab': Cpu,
  training: GraduationCap,
  incubators: Rocket,
  'printing-3d': Box,
  'laser-cnc': Scissors,
  materials: Layers,
};

const GOVERNORATES = ['إربد', 'العقبة', 'مأدبا', 'الكرك', 'الطفيلة', 'عمان', 'الزرقاء', 'عجلون', 'جرش', 'معان', 'البلقاء', 'المفرق'];

const buildEmbedSrc = ({ lat, lng, zoom }) => `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
const buildDirectionsUrl = ({ lat, lng }) => `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

export default function MakersMap() {
  const [activeGovernorate, setActiveGovernorate] = useState('الكل');
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isGovDropdownOpen, setIsGovDropdownOpen] = useState(false);
  const mapRef = useRef(null);
  const govDropdownRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (govDropdownRef.current && !govDropdownRef.current.contains(e.target)) {
        setIsGovDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEscapeKey(() => setIsGovDropdownOpen(false), isGovDropdownOpen);

  const filteredSpaces = useMemo(() => {
    return makerSpaces.filter((space) => {
      const matchGovernorate = activeGovernorate === 'الكل' || space.governorate === activeGovernorate;
      const matchCategory = activeCategory === 'الكل' || space.category === activeCategory;
      return matchGovernorate && matchCategory;
    });
  }, [activeGovernorate, activeCategory]);

  useEffect(() => {
    if (selectedSpace && !filteredSpaces.some((space) => space.id === selectedSpace.id)) {
      setSelectedSpace(null);
    }
  }, [filteredSpaces, selectedSpace]);

  const mapView = selectedSpace ? { lat: selectedSpace.lat, lng: selectedSpace.lng, zoom: 15 } : JORDAN_MAP_CENTER;
  const embedSrc = buildEmbedSrc(mapView);

  useEffect(() => {
    setMapLoaded(false);
  }, [embedSrc]);

  const isFiltering = activeGovernorate !== 'الكل' || activeCategory !== 'الكل';

  const handleSelectSpace = (space) => {
    setSelectedSpace((prev) => (prev?.id === space.id ? null : space));
    if (window.innerWidth < 1024) {
      requestAnimationFrame(() => {
        mapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  };

  return (
    <div>
      <p className="text-gray-500 font-medium text-[13px] lg:text-sm mb-6 lg:mb-8 max-w-2xl">
        دليل تفاعلي يربط الصنّاع والمبتكرين بمساحات التصنيع، مراكز التدريب، والحاضنات المنتشرة في مختلف محافظات المملكة. اختر مساحة من القائمة لتظهر مباشرة على الخريطة.
      </p>

      <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-6 lg:mb-8">
        <div className="relative sm:w-64 shrink-0" ref={govDropdownRef}>
          <button
            type="button"
            onClick={() => setIsGovDropdownOpen((prev) => !prev)}
            aria-haspopup="listbox"
            aria-expanded={isGovDropdownOpen}
            aria-label="تصفية حسب المحافظة"
            className={`w-full flex items-center justify-between gap-2 bg-white border rounded-xl py-3 px-4 text-[13px] font-bold text-[#1a0409] cursor-pointer transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1538] focus-visible:ring-offset-2 ${
              isGovDropdownOpen ? 'border-[#8a1538] ring-4 ring-[#8a1538]/10' : 'border-gray-200'
            }`}
          >
            <span className="truncate">{activeGovernorate === 'الكل' ? 'كل المحافظات' : activeGovernorate}</span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${
                isGovDropdownOpen ? 'rotate-180 text-[#8a1538]' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {isGovDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                role="listbox"
                className="absolute top-[calc(100%+0.5rem)] right-0 left-0 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden z-50"
              >
                <div className="max-h-64 overflow-y-auto py-1.5">
                  <button
                    type="button"
                    role="option"
                    aria-selected={activeGovernorate === 'الكل'}
                    onClick={() => {
                      setActiveGovernorate('الكل');
                      setIsGovDropdownOpen(false);
                    }}
                    className={`w-full text-right px-4 py-2.5 flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                      activeGovernorate === 'الكل' ? 'bg-[#8a1538]/[0.06] text-[#8a1538]' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-bold text-[13px]">كل المحافظات</span>
                    {activeGovernorate === 'الكل' && <Check className="w-4 h-4 shrink-0" />}
                  </button>
                  {GOVERNORATES.map((gov) => {
                    const isActive = activeGovernorate === gov;
                    return (
                      <button
                        key={gov}
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onClick={() => {
                          setActiveGovernorate(gov);
                          setIsGovDropdownOpen(false);
                        }}
                        className={`w-full text-right px-4 py-2.5 flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                          isActive ? 'bg-[#8a1538]/[0.06] text-[#8a1538]' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="font-bold text-[13px]">{gov}</span>
                        {isActive && <Check className="w-4 h-4 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 flex-wrap overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveCategory('الكل')}
            aria-pressed={activeCategory === 'الكل'}
            className={`shrink-0 whitespace-nowrap px-4 py-2.5 rounded-xl font-black text-[12px] lg:text-[13px] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1538] focus-visible:ring-offset-2 ${
              activeCategory === 'الكل' ? 'bg-[#8a1538] text-white shadow-md' : 'bg-[#8a1538]/[0.06] text-[#8a1538] hover:bg-[#8a1538]/10'
            }`}
          >
            كل الفئات
          </button>
          {MAKER_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id];
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                aria-pressed={isActive}
                className={`flex items-center gap-1.5 shrink-0 whitespace-nowrap px-4 py-2.5 rounded-xl font-black text-[12px] lg:text-[13px] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1538] focus-visible:ring-offset-2 ${
                  isActive ? 'bg-[#8a1538] text-white shadow-md' : 'bg-[#8a1538]/[0.06] text-[#8a1538] hover:bg-[#8a1538]/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 xl:gap-8 items-start">
        <div ref={mapRef} className="w-full lg:w-[42%] xl:w-[38%] shrink-0 lg:sticky lg:top-24 scroll-mt-24">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
              <div>
                <h3 className="font-black text-gray-900 text-lg">الخريطة التفاعلية</h3>
                <p className="text-[11px] font-bold text-gray-500 mt-1">اختر مساحة من القائمة لتحديد موقعها</p>
              </div>
              {selectedSpace && (
                <button
                  onClick={() => setSelectedSpace(null)}
                  className="text-[10px] font-bold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full hover:bg-gray-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1538]"
                >
                  عرض الكل
                </button>
              )}
            </div>

            <div className="relative w-full h-[300px] lg:h-[420px] bg-gray-100 shrink-0">
              <iframe
                key={embedSrc}
                src={embedSrc}
                onLoad={() => setMapLoaded(true)}
                title="خريطة الصنّاع"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${mapLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ border: 0 }}
              />

              {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-[#8a1538]/20 border-t-[#8a1538] rounded-full animate-spin" />
                </div>
              )}

              <AnimatePresence>
                {selectedSpace && mapLoaded && (
                  <motion.div
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.96 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="absolute top-3 inset-x-3 bg-white rounded-xl shadow-lg border border-gray-100 p-3 flex items-center justify-between gap-2 pointer-events-none"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-8 h-8 rounded-lg bg-[#8a1538] flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-white" />
                      </span>
                      <span className="font-black text-[#1a0409] text-[13px] truncate">{selectedSpace.name}</span>
                    </div>
                    <a
                      href={buildDirectionsUrl(selectedSpace)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[#8a1538] hover:text-[#680f2a] text-[11px] font-black shrink-0 pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1538] focus-visible:ring-offset-2 rounded"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      الاتجاهات
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[58%] xl:w-[62%] min-w-0">
          {isFiltering && (
            <div className="mb-5 flex flex-wrap items-center gap-2 text-[12px] font-bold text-gray-500 bg-white px-4 py-3 rounded-xl border border-gray-100 shadow-sm w-full">
              <span>عرض نتائج:</span>
              {activeCategory !== 'الكل' && (
                <span className="text-[#8a1538]">{MAKER_CATEGORIES.find((c) => c.id === activeCategory)?.label}</span>
              )}
              {activeGovernorate !== 'الكل' && <span className="text-[#8a1538]">{activeGovernorate}</span>}
              <span className="text-gray-500 font-medium mr-auto">({filteredSpaces.length} نتيجة)</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {filteredSpaces.length > 0 ? (
              <motion.div
                key={`${activeGovernorate}-${activeCategory}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5"
              >
                {filteredSpaces.map((space) => {
                  const Icon = CATEGORY_ICONS[space.category];
                  const categoryLabel = MAKER_CATEGORIES.find((c) => c.id === space.category)?.label;
                  const isSelected = selectedSpace?.id === space.id;
                  return (
                    <button
                      key={space.id}
                      onClick={() => handleSelectSpace(space)}
                      aria-pressed={isSelected}
                      className={`text-right bg-white rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 p-5 flex flex-col cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1538] focus-visible:ring-offset-2 ${
                        isSelected ? 'border-[#8a1538] ring-2 ring-[#8a1538]/30' : 'border-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-9 h-9 rounded-lg bg-[#8a1538]/[0.08] flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-[#8a1538]" />
                        </span>
                        <span className="text-[11px] font-black text-[#8a1538] bg-[#8a1538]/[0.06] px-2.5 py-1 rounded-full truncate">
                          {categoryLabel}
                        </span>
                        {isSelected && <MapPin className="w-4 h-4 text-[#8a1538] mr-auto shrink-0" />}
                      </div>
                      <h3 className="font-black text-[#1a0409] text-[15px] leading-snug mb-2">{space.name}</h3>
                      <p className="text-gray-500 text-[13px] leading-relaxed mb-4 flex-grow">{space.description}</p>
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-gray-500 text-[11px] font-bold min-w-0">
                          <MapPin className="w-3.5 h-3.5 text-[#8a1538]/60 shrink-0" />
                          <span className="truncate">{space.address}</span>
                        </div>
                        <span className="flex items-center gap-1 text-[#8a1538] text-[11px] font-black shrink-0">
                          <Globe className="w-3.5 h-3.5" />
                          {space.website.replace('https://www.', '')}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 flex flex-col items-center text-center bg-white rounded-3xl border border-dashed border-gray-200"
              >
                <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <SearchX className="w-7 h-7 text-gray-300" />
                </div>
                <p className="text-gray-900 font-black text-base mb-2">لا توجد نتائج مطابقة</p>
                <button
                  onClick={() => {
                    setActiveGovernorate('الكل');
                    setActiveCategory('الكل');
                  }}
                  className="mt-2 bg-[#C08F2D] text-[#1a0409] px-6 py-2.5 rounded-xl font-black text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1538] focus-visible:ring-offset-2"
                >
                  إعادة ضبط الفلاتر
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
