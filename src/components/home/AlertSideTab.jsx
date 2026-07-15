// src/components/home/AlertSideTab.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Megaphone, X, ArrowLeft } from 'lucide-react';

const alerts = [
  { id: 1, badge: 'متاح الآن', text: 'التسجيل في HFP مفتوح للشباب' },
  { id: 2, badge: 'قريباً', text: 'برنامج تواصل يفتح أبوابه' },
  { id: 3, badge: 'يوشك على الانتهاء', text: 'انضم لـ Makers Collective' },
];

// Pure-transform, tween-based (no spring overshoot) so the motion is
// deterministic and buttery on every device. Closing is intentionally
// ~35% shorter than opening so it never reads as sluggish.
const OPEN_TRANSITION = { duration: 0.36, ease: [0.16, 1, 0.3, 1] };
const CLOSE_TRANSITION = { duration: 0.24, ease: [0.4, 0, 1, 1] };

export default function AlertSideTab() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <motion.div
      initial={false}
      animate={{ x: isOpen ? '0%' : '100%' }}
      transition={isOpen ? OPEN_TRANSITION : CLOSE_TRANSITION}
      style={{ willChange: 'transform' }}
      className="fixed top-[30%] right-0 z-[90] w-[82vw] max-w-[340px] sm:w-[380px] lg:w-[420px]"
      dir="rtl"
    >
      {/* Docked trigger tab: larger, with a continuous attention ripple while collapsed.
          Kept OUTSIDE the clipped panel below so it can still poke out to the left. */}
      <button
        onClick={handleToggle}
        aria-label={isOpen ? 'إغلاق الإعلانات الهامة' : 'عرض الإعلانات الهامة'}
        className="absolute top-7 left-0 -translate-x-full flex items-center justify-center w-14 h-20 sm:w-16 sm:h-24 lg:w-[4.5rem] lg:h-28 rounded-l-2xl bg-gradient-to-b from-[#8a1538] to-[#6a0f28] shadow-[-8px_0_20px_rgba(0,0,0,0.15)] cursor-pointer group border-y border-l border-[#8a1538] overflow-visible"
      >
        {/* Continuous ripple: transform + opacity only, GPU-friendly, pauses once opened */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-l-2xl pointer-events-none">
            <motion.span
              className="absolute inset-0 rounded-l-2xl border-2 border-[#C08F2D]"
              animate={{ scale: [1, 1.4], opacity: [0.55, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.span
              className="absolute inset-0 rounded-l-2xl border-2 border-[#C08F2D]"
              animate={{ scale: [1, 1.4], opacity: [0.55, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 1.2 }}
            />
          </span>
        )}

        {/* Decorative gold seam */}
        <span className="absolute right-0 inset-y-0 w-[2px] bg-[#C08F2D] opacity-40" />

        {isOpen ? (
          <X className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#C08F2D] transition-transform duration-300 group-hover:rotate-90" />
        ) : (
          <Megaphone className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#C08F2D] transition-transform duration-300 group-hover:scale-110" />
        )}
      </button>

      {/* Clipped panel: ALL visual chrome (bg, border, shadow) plus overflow-hidden
          live here together, so every child — including the bottom gradient spacer —
          is guaranteed to stay inside the rounded-l-3xl curve. No more corner artifacts. */}
      <div className="relative flex flex-col w-full bg-white shadow-[-20px_20px_50px_-15px_rgba(0,0,0,0.15)] rounded-l-3xl border-y border-l border-gray-100 overflow-hidden">
        {/* Header: close button placed first so it stays on the screen-edge side,
            guaranteed reachable regardless of panel width vs. viewport width.
            Solid burgundy band (project red) so the title reads as the headline. */}
        <div className="relative flex items-center justify-between px-5 sm:px-6 py-5 sm:py-6 bg-gradient-to-l from-[#8a1538] to-[#6a0f28]">
          <button
            onClick={handleToggle}
            aria-label="إغلاق"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-white" />
          </button>

          <div className="flex items-center gap-3">
            <h3 className="text-lg sm:text-xl font-black text-white tracking-wide">الإعلانات الهامة</h3>
            <span className="text-[11px] sm:text-xs font-bold text-[#C08F2D] bg-white/10 px-2.5 py-1 rounded-full border border-[#C08F2D]/30 whitespace-nowrap">
              3 تحديثات
            </span>
          </div>

          {/* Gold seam along the bottom of the header, echoing the tab's decorative line */}
          <span className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-l from-transparent via-[#C08F2D] to-transparent" />
        </div>

        {/* Announcement list — typography-first, no rainbow icons */}
        <div className="flex flex-col p-3 sm:p-4">
          {alerts.map((alert, idx) => (
            <div
              key={alert.id}
              className="group relative flex flex-col gap-3 p-4 sm:p-5 rounded-xl hover:bg-[#8a1538]/[0.02] transition-colors cursor-pointer border border-transparent hover:border-[#8a1538]/10"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full bg-[#8a1538]/5 text-[#8a1538] border border-[#8a1538]/10 group-hover:bg-[#8a1538] group-hover:text-white transition-all duration-300">
                  {alert.badge}
                </span>
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-[#C08F2D] transform group-hover:-translate-x-1 transition-all duration-300" />
              </div>

              <span className="text-[14px] sm:text-[15px] lg:text-[16px] font-bold text-gray-800 leading-relaxed group-hover:text-[#8a1538] transition-colors pr-1">
                {alert.text}
              </span>

              {idx !== alerts.length - 1 && (
                <div className="absolute bottom-0 right-4 left-4 h-px bg-gray-100 group-hover:opacity-0 transition-opacity" />
              )}
            </div>
          ))}
        </div>

        <div className="h-2 w-full bg-gradient-to-t from-gray-50 to-transparent" />
      </div>
    </motion.div>
  );
}
