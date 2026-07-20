// src/components/programs/detail/ProgramDonationBanner.jsx
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function ProgramDonationBanner({ donationBanner }) {
  const Icon = donationBanner.icon;
  const isMailto = donationBanner.ctaUrl?.startsWith('mailto:');

  return (
    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
      <div className="relative bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="h-[3px] w-full bg-gradient-to-l from-transparent via-[#C08F2D] to-transparent" />
        <div className="p-6 md:p-8 flex flex-col sm:flex-row items-center gap-5 md:gap-6 text-center sm:text-right">
          {Icon && (
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#C08F2D]/10 flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6 md:w-7 md:h-7 text-[#C08F2D]" />
            </div>
          )}
          <p className="text-gray-700 font-medium text-[13px] md:text-[15px] leading-relaxed flex-grow">
            {donationBanner.text}
          </p>
          <a
            href={donationBanner.ctaUrl}
            target={isMailto ? undefined : '_blank'}
            rel={isMailto ? undefined : 'noopener noreferrer'}
            className={`shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black text-[13px] md:text-sm transition-colors w-full sm:w-auto ${
              donationBanner.accent === 'gold'
                ? 'bg-[#C08F2D] hover:bg-[#a67b25] text-[#1a0409]'
                : 'bg-[#8a1538] hover:bg-[#680f2a] text-white'
            }`}
          >
            {donationBanner.ctaLabel}
          </a>
        </div>
      </div>
    </motion.section>
  );
}
