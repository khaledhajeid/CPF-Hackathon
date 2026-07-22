// src/components/programs/networks/YouthNetworksSection.jsx
import { motion } from 'framer-motion';
import { ArrowUpLeft } from 'lucide-react';
import { youthNetworks } from '../../../data/youthNetworksData';

export default function YouthNetworksSection({ onNavigate }) {
  const handleJoin = () => {
    onNavigate('contact', { tab: 'network' });
  };

  return (
    <div>
      <p className="text-gray-500 font-medium text-[13px] lg:text-sm mb-10 lg:mb-14 max-w-2xl">
        ثلاث مبادرات شبابية قائمة بذاتها، كل واحدة منها تفتح للشباب مجالاً مستقلاً للتواصل والتأثير المستمر بعد انتهاء البرامج الرسمية.
      </p>

      <div className="flex flex-col gap-16 lg:gap-24">
        {youthNetworks.map((network, index) => {
          const isReversed = index % 2 === 1;
          return (
            <motion.div
              key={network.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
              className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-16`}
            >
              <div className="w-full lg:w-1/2 shrink-0">
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-[5/4]">
                  <img
                    src={network.image}
                    alt={network.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0409]/40 via-transparent to-transparent" />
                </div>
              </div>

              <div className="w-full lg:w-1/2 text-center lg:text-right">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#8a1538] leading-tight mb-4 lg:mb-6 tracking-tight text-balance">
                  {network.name}
                </h2>
                <p className="text-gray-500 text-[15px] lg:text-lg leading-relaxed mb-8 lg:mb-10 max-w-lg mx-auto lg:mx-0">
                  {network.brief}
                </p>
                <button
                  onClick={handleJoin}
                  className="inline-flex items-center justify-center gap-2 bg-[#8a1538] hover:bg-[#680f2a] text-white px-7 py-3.5 lg:px-8 lg:py-4 rounded-full font-black text-sm lg:text-base transition-all shadow-md hover:shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1538] focus-visible:ring-offset-2"
                >
                  <span>انضم للشبكة</span>
                  <ArrowUpLeft className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
