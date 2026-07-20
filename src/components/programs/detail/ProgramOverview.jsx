// src/components/programs/detail/ProgramOverview.jsx
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function ProgramOverview({ overview }) {
  return (
    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
      <h2 className="text-2xl md:text-[1.75rem] lg:text-[1.5rem] 2xl:text-[1.75rem] font-black mb-4 md:mb-6 lg:mb-4 text-[#8a1538]">
        تعرّف على البرنامج ونظرته الاستراتيجية
      </h2>
      <div className="bg-white p-6 md:p-8 lg:p-6 2xl:p-8 rounded-3xl border border-gray-100 shadow-sm">
        <p className="font-medium text-[14px] md:text-[1.1rem] lg:text-[1rem] 2xl:text-[1.1rem] leading-relaxed md:leading-[2.2rem] lg:leading-[2rem] 2xl:leading-[2.2rem] text-gray-700 text-justify">
          {overview}
        </p>
      </div>
    </motion.section>
  );
}
