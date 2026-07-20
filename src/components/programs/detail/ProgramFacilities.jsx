// src/components/programs/detail/ProgramFacilities.jsx
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function ProgramFacilities({ facilities, facilitiesTitle }) {
  return (
    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
      <h2 className="text-2xl md:text-[1.75rem] lg:text-[1.5rem] 2xl:text-[1.75rem] font-black mb-4 md:mb-6 lg:mb-4 text-[#8a1538]">
        {facilitiesTitle || 'المزايا والمرافق الرئيسية'}
      </h2>
      <div className="bg-white p-6 md:p-8 lg:p-6 2xl:p-8 rounded-3xl border border-gray-100 shadow-sm">
        <ul className="space-y-4 lg:space-y-3 2xl:space-y-4 text-gray-700 font-medium text-[14px] md:text-[1.1rem] lg:text-[1rem] 2xl:text-[1.1rem] leading-relaxed md:leading-[2rem] lg:leading-[1.8rem] 2xl:leading-[2rem]">
          {facilities.map((fac, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#C08F2D] mt-2 shrink-0" />
              <span className="text-justify">{fac}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
