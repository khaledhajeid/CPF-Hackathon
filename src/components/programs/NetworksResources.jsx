// src/components/programs/NetworksResources.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Users2, MapPinned, ChevronRight, ArrowUpLeft } from 'lucide-react';
import EntitiesDirectory from './networks/EntitiesDirectory';
import YouthNetworksSection from './networks/YouthNetworksSection';
import MakersMap from './networks/MakersMap';

const CATEGORIES = [
  {
    id: 'directory',
    title: 'دليل الجهات',
    description: 'دليل شامل بالجهات والمنظمات الشريكة التي يمكن للشباب التواصل معها للاستفادة من برامجها وخدماتها.',
    icon: Building2,
  },
  {
    id: 'youth-networks',
    title: 'الشبكات الشبابية',
    description: 'شبكات شبابية تابعة للمؤسسة تفتح مجالاً للتواصل المستمر والأثر بعد انتهاء البرامج الرسمية.',
    icon: Users2,
  },
  {
    id: 'makers-map',
    title: 'خريطة الصنّاع',
    description: 'دليل جغرافي تفاعلي يربط الصنّاع بمساحات التصنيع والحاضنات في مختلف محافظات المملكة.',
    icon: MapPinned,
  },
];

export default function NetworksResources({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const current = CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <AnimatePresence mode="wait">
      {current ? (
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          dir="rtl"
        >
          <button
            onClick={() => setActiveCategory(null)}
            className="flex items-center gap-2 text-gray-500 hover:text-[#8a1538] font-bold text-sm mb-5 lg:mb-6 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1538] focus-visible:ring-offset-2 rounded"
          >
            <ChevronRight className="w-4 h-4" />
            رجوع إلى شبكات وموارد
          </button>

          <h2 className="text-xl lg:text-2xl font-black text-[#8a1538] mb-2 tracking-tight">{current.title}</h2>

          {current.id === 'directory' && <EntitiesDirectory />}
          {current.id === 'youth-networks' && <YouthNetworksSection onNavigate={onNavigate} />}
          {current.id === 'makers-map' && <MakersMap />}
        </motion.div>
      ) : (
        <motion.div
          key="hub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          dir="rtl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {CATEGORIES.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.08 }}
                  onClick={() => setActiveCategory(cat.id)}
                  className="group text-right bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 p-6 lg:p-8 flex flex-col cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1538] focus-visible:ring-offset-2"
                >
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-[#8a1538] group-hover:bg-[#C08F2D] transition-colors flex items-center justify-center mb-5 lg:mb-6 shadow-md shrink-0">
                    <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-white group-hover:text-[#1a0409] transition-colors" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-black text-[#1a0409] text-lg lg:text-xl mb-2 lg:mb-3">{cat.title}</h3>
                  <p className="text-gray-500 text-[13px] lg:text-sm leading-relaxed mb-6 flex-grow">{cat.description}</p>
                  <span className="flex items-center gap-2 text-[#8a1538] font-black text-sm w-fit group-hover:gap-3 transition-all">
                    استكشف
                    <ArrowUpLeft className="w-4 h-4" />
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
