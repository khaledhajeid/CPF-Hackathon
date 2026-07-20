// src/components/programs/detail/ProgramIconCards.jsx
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function ProgramIconCards({ iconCards, iconCardsTitle }) {
  return (
    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
      <h2 className="text-2xl md:text-[1.75rem] lg:text-[1.5rem] 2xl:text-[1.75rem] font-black mb-4 md:mb-6 lg:mb-4 text-[#8a1538]">
        {iconCardsTitle || 'مبادراتنا الموسمية'}
      </h2>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-gray-100">
        {iconCards.map((card, idx) => {
          const Icon = card.icon;
          const tint = idx % 3 === 0
            ? { bg: 'bg-[#C08F2D]/10', text: 'text-[#C08F2D]' }
            : idx % 3 === 1
            ? { bg: 'bg-[#8a1538]/8', text: 'text-[#8a1538]' }
            : { bg: 'bg-gray-100', text: 'text-gray-500' };
          return (
            <div key={idx} className="p-5 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-9 h-9 rounded-lg ${tint.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-4 h-4 ${tint.text}`} />
                </div>
                <h3 className="font-black text-gray-900 text-[14px] md:text-[15px]">{card.title}</h3>
              </div>
              <p className="text-gray-600 font-medium text-[12.5px] md:text-[13px] leading-relaxed text-justify">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
