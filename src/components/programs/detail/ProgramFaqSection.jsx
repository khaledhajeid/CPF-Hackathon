// src/components/programs/detail/ProgramFaqSection.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function ProgramFaqSection({ faqs }) {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
      <h2 className="text-2xl md:text-[1.75rem] lg:text-[1.5rem] 2xl:text-[1.75rem] font-black mb-4 md:mb-6 lg:mb-4 text-[#8a1538]">
        الأسئلة الأكثر تكراراً
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = activeFaq === idx;
          return (
            <div key={idx} className={`rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-white border border-[#8a1538]/20 shadow-md' : 'bg-white border border-gray-100 hover:border-gray-200 shadow-sm'}`}>
              <button onClick={() => setActiveFaq(isOpen ? null : idx)} className="w-full flex items-center justify-between p-5 lg:p-4 2xl:p-5 text-right cursor-pointer rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C08F2D] focus-visible:ring-offset-2">
                <span className={`font-bold text-[14px] md:text-[1.05rem] lg:text-[15px] 2xl:text-[1.05rem] pl-4 transition-colors ${isOpen ? 'text-[#8a1538]' : 'text-gray-800'}`}>{faq.q}</span>
                <div className={`w-8 h-8 lg:w-7 lg:h-7 xl:w-8 xl:h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-[#8a1538] text-white' : 'bg-gray-50 text-[#C08F2D]'}`}>
                   <span className="text-xl font-black mt-[-2px]">{isOpen ? '−' : '+'}</span>
                </div>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <div className="px-5 pb-5 pt-0 lg:px-4 lg:pb-4 2xl:px-5 2xl:pb-5 text-[13px] md:text-[1rem] lg:text-[14px] 2xl:text-[1rem] font-medium leading-relaxed md:leading-[1.9rem] text-gray-600 text-justify border-t border-gray-100 mt-2 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
