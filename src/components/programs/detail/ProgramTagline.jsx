// src/components/programs/detail/ProgramTagline.jsx
import { Quote } from 'lucide-react';

export default function ProgramTagline({ tagline }) {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 mb-12 md:mb-20 lg:mb-16 2xl:mb-20">
      <div className="w-full bg-[#721F31] rounded-2xl md:rounded-[2rem] py-8 sm:py-10 md:py-14 lg:py-10 2xl:py-14 relative overflow-hidden shadow-xl shadow-[#721F31]/10">
        <div className="absolute inset-0 z-0 opacity-[0.1] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url(/the-theme.svg)', backgroundSize: '200px' }} />
        <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-l from-transparent via-[#C08F2D] to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <Quote className="w-7 h-7 md:w-8 md:h-8 text-[#C08F2D]/60 mx-auto mb-4 rotate-180" />
          <p className="text-white text-[1.15rem] sm:text-2xl md:text-3xl lg:text-[1.75rem] 2xl:text-3xl font-black leading-snug">
            {tagline || 'جزء من منظومة مؤسسة ولي العهد لتمكين الشباب الأردني'}
          </p>
        </div>
      </div>
    </div>
  );
}
