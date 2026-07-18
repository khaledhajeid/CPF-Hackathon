// src/components/news/MagazineHero.jsx
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowUpLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { heroSliderNews } from "../../data/newsData";

export default function MagazineHero({ onNewsClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef(null);

  const mainNews = heroSliderNews[currentSlide];

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % heroSliderNews.length);
  const prevSlide = () =>
    setCurrentSlide((prev) =>
      prev === 0 ? heroSliderNews.length - 1 : prev - 1,
    );

  useEffect(() => {
    const currentItem = heroSliderNews[currentSlide];
    if (currentItem.type === "image") {
      const timer = setTimeout(() => nextSlide(), 5000);
      return () => clearTimeout(timer);
    }
  }, [currentSlide]);

  return (
    <div
      className="pt-[clamp(7.5rem,14vh,10rem)] pb-[clamp(2rem,5vh,4rem)] bg-[#fcfcfc] border-b border-gray-100"
      dir="rtl"
    >
      <div className="max-w-[1400px] xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto px-[clamp(1rem,4vw,2rem)]">
        <div className="w-full h-auto lg:h-[clamp(450px,70vh,800px)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => onNewsClick(mainNews)}
            className="w-full relative rounded-[clamp(1rem,3vw,2rem)] overflow-hidden shadow-md md:shadow-xl group cursor-pointer h-[clamp(350px,55vh,500px)] lg:h-full"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mainNews.id}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                {mainNews.type === "video" ? (
                  <video
                    ref={videoRef}
                    src={mainNews.mediaUrl}
                    autoPlay
                    muted
                    playsInline
                    onEnded={nextSlide}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={mainNews.mediaUrl}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0409]/95 via-[#1a0409]/50 to-transparent" />

                <div className="absolute inset-0 p-[clamp(1.25rem,4vw,4rem)] flex flex-col justify-end text-right z-10 pb-[clamp(2rem,3vw,2.5rem)]">
                  <div className="w-[90%] md:w-[85%] lg:w-[75%]">
                    {/* 🟢 تم إزالة التاج (التصنيف) من هنا */}

                    <h2 className="text-[clamp(1.5rem,2.5vw,2.5rem)] font-black text-white leading-tight mb-[clamp(0.5rem,1.5vw,1.25rem)] drop-shadow-lg">
                      {mainNews.title}
                    </h2>

                    <p className="text-white/80 font-medium text-[clamp(0.85rem,1.2vw,1.25rem)] line-clamp-2 mb-[clamp(1rem,2vw,2rem)] leading-relaxed drop-shadow-md">
                      {mainNews.desc}
                    </p>

                    <div className="flex items-center gap-[clamp(0.35rem,0.8vw,0.5rem)] text-[#C08F2D] font-bold text-[clamp(0.75rem,1vw,1.1rem)]">
                      {mainNews.type === "video" && (
                        <Play className="w-[clamp(0.85rem,1.2vw,1.35rem)] h-[clamp(0.85rem,1.2vw,1.35rem)]" />
                      )}
                      <span>اقرأ التفاصيل</span>
                      <ArrowUpLeft className="w-[clamp(0.85rem,1.2vw,1.35rem)] h-[clamp(0.85rem,1.2vw,1.35rem)]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-[clamp(1rem,2vw,2.5rem)] top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/60 text-white p-[clamp(0.4rem,0.8vw,0.7rem)] rounded-full backdrop-blur-md cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-[clamp(0.9rem,1.3vw,1.5rem)] h-[clamp(0.9rem,1.3vw,1.5rem)]" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-[clamp(1rem,2vw,2.5rem)] top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/60 text-white p-[clamp(0.4rem,0.8vw,0.7rem)] rounded-full backdrop-blur-md cursor-pointer transition-colors"
            >
              <ChevronRight className="w-[clamp(0.9rem,1.3vw,1.5rem)] h-[clamp(0.9rem,1.3vw,1.5rem)]" />
            </button>
            <div className="absolute bottom-[clamp(0.75rem,1vw,1.25rem)] left-1/2 -translate-x-1/2 flex gap-[clamp(0.35rem,1vw,0.6rem)] z-20">
              {heroSliderNews.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(index);
                  }}
                  className={`h-[clamp(0.35rem,0.8vw,0.4rem)] rounded-full transition-all duration-300 ${currentSlide === index ? "w-[clamp(1.5rem,3vw,3rem)] bg-white" : "w-[clamp(0.5rem,1vw,0.75rem)] bg-white/50"}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
