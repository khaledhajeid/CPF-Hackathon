// src/components/programs/detail/ProgramSubInitiatives.jsx
import { motion } from 'framer-motion';
import { ArrowUpLeft } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function ProgramSubInitiatives({ subInitiatives, subInitiativesTitle }) {
  return (
    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
      <h2 className="text-2xl md:text-[1.75rem] lg:text-[1.5rem] 2xl:text-[1.75rem] font-black mb-4 md:mb-6 lg:mb-4 text-[#8a1538]">
        {subInitiativesTitle || 'مبادرات ومراكز مرتبطة'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
        {subInitiatives.map((item, idx) => {
          const Icon = item.icon;
          const isMailto = item.ctaUrl?.startsWith('mailto:');
          return (
            <div key={idx} className="bg-white p-6 md:p-7 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                {item.logo ? (
                  <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 p-2">
                    <img src={item.logo} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                ) : Icon ? (
                  <div className="w-11 h-11 rounded-xl bg-[#8a1538]/8 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#8a1538]" />
                  </div>
                ) : null}
                <div>
                  <h3 className="font-black text-gray-900 text-[15px] md:text-base leading-tight">{item.name}</h3>
                  {item.subtitle && <p className="text-gray-500 font-bold text-[12px] md:text-[13px]">{item.subtitle}</p>}
                </div>
              </div>
              <p className="text-gray-600 font-medium text-[13px] md:text-[14px] leading-relaxed text-justify mb-5 flex-grow">
                {item.description}
              </p>
              {item.ctaUrl && (
                <a
                  href={item.ctaUrl}
                  target={isMailto ? undefined : '_blank'}
                  rel={isMailto ? undefined : 'noopener noreferrer'}
                  className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-[#8a1538] hover:text-[#8a1538] text-gray-700 px-5 py-2.5 rounded-xl font-bold text-[13px] transition-colors w-fit shadow-sm"
                >
                  {item.ctaLabel}
                  <ArrowUpLeft className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
