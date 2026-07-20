// src/components/programs/detail/ProgramWorkAreas.jsx
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function ProgramWorkAreas({ workAreas, workAreasTitle }) {
  return (
    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
      <h2 className="text-2xl md:text-[1.75rem] lg:text-[1.5rem] 2xl:text-[1.75rem] font-black mb-4 md:mb-6 lg:mb-4 text-[#8a1538]">
        {workAreasTitle || 'مجالات العمل'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 bg-white p-6 md:p-8 lg:p-6 2xl:p-8 rounded-3xl border border-gray-100 shadow-sm">
        {workAreas.map((area, idx) => (
          <div key={idx}>
            <h3 className="font-black text-gray-900 text-[15px] md:text-[1.05rem] mb-2 pb-2 border-b-2 border-gray-200 inline-block">
              {area.title}
            </h3>
            <p className="text-gray-600 font-medium text-[13px] md:text-[14px] leading-relaxed text-justify mt-2">
              {area.text}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
