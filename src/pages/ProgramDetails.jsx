// src/pages/ProgramDetails.jsx
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import { programsFullData, allStories } from '../data/programsData';
import { newsList } from '../data/newsData';
import RelatedProgramStories from '../components/programs/RelatedProgramStories';
import NewsDetailModal from '../components/news/NewsDetailModal';
import Footer from '../components/Footer';

import ProgramHero from '../components/programs/detail/ProgramHero';
import ProgramTagline from '../components/programs/detail/ProgramTagline';
import ProgramMetaCard from '../components/programs/detail/ProgramMetaCard';
import ProgramOverview from '../components/programs/detail/ProgramOverview';
import ProgramFacilities from '../components/programs/detail/ProgramFacilities';
import ProgramWorkAreas from '../components/programs/detail/ProgramWorkAreas';
import ProgramIconCards from '../components/programs/detail/ProgramIconCards';
import ProgramSubInitiatives from '../components/programs/detail/ProgramSubInitiatives';
import ProgramSpotlight from '../components/programs/detail/ProgramSpotlight';
import ProgramNewsSection from '../components/programs/detail/ProgramNewsSection';
import ProgramFaqSection from '../components/programs/detail/ProgramFaqSection';
import ProgramDonationBanner from '../components/programs/detail/ProgramDonationBanner';
import ProgramStoryModal from '../components/programs/detail/ProgramStoryModal';

export default function ProgramDetails({ onNavigate, programName = 'جامعة الحسين التقنية', setActiveProgramName }) {
  const currentProgram = programsFullData[programName] || programsFullData['جامعة الحسين التقنية'];
  const [selectedLocalStory, setSelectedStory] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);

  const programNews = newsList.filter(news => news.programKey === programName);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [programName]);

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#1a1c1d] font-sans relative" dir="rtl">

      <ProgramHero currentProgram={currentProgram} onNavigate={onNavigate} />
      <ProgramTagline tagline={currentProgram.tagline} />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row gap-10 lg:gap-12 2xl:gap-16">

        {/* المحتوى الرئيسي */}
        <div className="w-full lg:w-8/12 space-y-12 md:space-y-20 lg:space-y-16 2xl:space-y-20">

          {currentProgram.overview && <ProgramOverview overview={currentProgram.overview} />}

          {currentProgram.facilities && (
            <ProgramFacilities facilities={currentProgram.facilities} facilitiesTitle={currentProgram.facilitiesTitle} />
          )}

          {currentProgram.workAreas && (
            <ProgramWorkAreas workAreas={currentProgram.workAreas} workAreasTitle={currentProgram.workAreasTitle} />
          )}

          {currentProgram.iconCards && (
            <ProgramIconCards iconCards={currentProgram.iconCards} iconCardsTitle={currentProgram.iconCardsTitle} />
          )}

          {currentProgram.subInitiatives && (
            <ProgramSubInitiatives subInitiatives={currentProgram.subInitiatives} subInitiativesTitle={currentProgram.subInitiativesTitle} />
          )}

          {currentProgram.spotlightSection && <ProgramSpotlight spotlightSection={currentProgram.spotlightSection} />}

          {programNews.length > 0 && (
            <ProgramNewsSection programNews={programNews} onNewsClick={setSelectedNews} />
          )}

          {currentProgram.faqs && <ProgramFaqSection faqs={currentProgram.faqs} />}

          {currentProgram.donationBanner && <ProgramDonationBanner donationBanner={currentProgram.donationBanner} />}
        </div>

        <ProgramMetaCard currentProgram={currentProgram} onNavigate={onNavigate} />

      </div>

      <div id="related-stories" className="mt-8 md:mt-12 bg-white pt-12 md:pt-16 pb-16 md:pb-24 border-t border-gray-100">
        <RelatedProgramStories
          programName={programName}
          onNavigate={onNavigate}
          onStoryClick={(storyId) => {
            const targetStory = allStories.find(s => s.id === storyId);
            if (targetStory) setSelectedStory(targetStory);
          }}
        />
      </div>

      <Footer onNavigate={onNavigate} />

      <AnimatePresence>
        {selectedLocalStory && (
          <ProgramStoryModal
            story={selectedLocalStory}
            onClose={() => setSelectedStory(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedNews && (
          <NewsDetailModal
            news={selectedNews}
            onClose={() => setSelectedNews(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
