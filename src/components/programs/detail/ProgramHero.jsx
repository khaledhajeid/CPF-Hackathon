// src/components/programs/detail/ProgramHero.jsx

export default function ProgramHero({ currentProgram, onNavigate }) {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pt-28 md:pt-36 lg:pt-28 2xl:pt-36 pb-10 md:pb-16 lg:pb-12 2xl:pb-16">

      <nav className="flex flex-wrap items-center gap-2 text-[11px] md:text-[13px] font-bold text-gray-500 mb-6 md:mb-10 lg:mb-8 w-full">
        <span className="hover:text-[#8a1538] cursor-pointer transition-colors" onClick={() => onNavigate('home')}>الرئيسية</span>
        <img src="/arrow-yellow.svg" className="w-2.5 h-2.5 rotate-180 opacity-60" alt="" />
        <span className="hover:text-[#8a1538] cursor-pointer transition-colors" onClick={() => onNavigate('programs')}>برامجنا</span>
        <img src="/arrow-yellow.svg" className="w-2.5 h-2.5 rotate-180 opacity-60" alt="" />
        <span className="text-[#8a1538] font-black truncate">{currentProgram.title.split(' (')[0]}</span>
      </nav>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 2xl:gap-16">

        <div className="w-full lg:w-1/2 flex flex-col items-start text-right order-2 lg:order-1">
          <div className="h-16 md:h-24 lg:h-20 w-auto shrink-0 mb-4 md:mb-6 mix-blend-multiply">
            <img src={currentProgram.logo} alt={currentProgram.title} className="max-w-full h-full object-contain object-right" />
          </div>

          <h1 className="text-[2rem] sm:text-[2.25rem] md:text-[3rem] lg:text-[2.5rem] 2xl:text-[3rem] font-black tracking-tight text-[#8a1538] leading-tight mb-2">
            {currentProgram.title}
          </h1>
          {currentProgram.titleEn && (
            <h2 className="text-[1.1rem] md:text-[1.5rem] lg:text-[1.25rem] 2xl:text-[1.5rem] font-bold text-gray-500 font-sans tracking-wide mb-4 md:mb-6" dir="ltr" style={{ textAlign: 'left', width: '100%' }}>
              {currentProgram.titleEn}
            </h2>
          )}

          <p className="font-medium text-[15px] md:text-[1.1rem] lg:text-[1rem] 2xl:text-[1.1rem] leading-relaxed md:leading-[2.1rem] lg:leading-[1.9rem] 2xl:leading-[2.1rem] text-gray-600 text-justify mt-2">
            {currentProgram.about}
          </p>
        </div>

        <div className="w-full lg:w-1/2 h-[260px] sm:h-[350px] md:h-[450px] lg:h-[350px] xl:h-[380px] 2xl:h-[450px] rounded-3xl md:rounded-[2.5rem] overflow-hidden flex-shrink-0 shadow-2xl relative group border border-gray-100 order-1 lg:order-2">
          {currentProgram.video ? (
            <>
              <video autoPlay loop muted playsInline className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out">
                <source src={currentProgram.video} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />
              <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] md:text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2 z-10">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> لقطات حية
              </div>
            </>
          ) : (
            <>
              <img src={currentProgram.image} alt={currentProgram.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </>
          )}
        </div>

      </div>
    </div>
  );
}
