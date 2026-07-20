// src/components/programs/detail/ProgramSpotlight.jsx
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function ProgramSpotlight({ spotlightSection }) {
  return (
    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
      <div className="relative overflow-hidden rounded-3xl bg-[#721F31] px-6 py-10 md:px-10 md:py-12 text-center shadow-xl">
        <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '220px' }} />
        <div className="relative z-10 max-w-xl mx-auto">
          <h2 className="text-xl md:text-2xl font-black text-white mb-3">{spotlightSection.title}</h2>
          <p className="text-white/85 font-medium text-[14px] md:text-[15px] leading-relaxed mb-7">
            {spotlightSection.text}
          </p>
          <button
            onClick={() => {
              const targetEl = document.querySelector(spotlightSection.ctaAnchor);
              targetEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="inline-flex items-center gap-2 bg-transparent border-2 border-white/40 hover:border-white text-white px-6 py-3 rounded-xl font-black text-[13px] md:text-sm transition-colors cursor-pointer"
          >
            {spotlightSection.ctaLabel}
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
