'use client';

import { useRef, useEffect } from 'react';
import { useAppStore } from '@/app/store';
import { ParticlesBackground } from '@/app/components/ParticlesBackground';
import { HeroSection } from '@/app/components/HeroSection';
import { SimulationSection } from '@/app/components/SimulationSection';
import { IdentitySection } from '@/app/components/IdentitySection';
import { ScoringSection } from '@/app/components/ScoringSection';
import { DocumentsSection } from '@/app/components/DocumentsSection';
import { SignatureSection } from '@/app/components/SignatureSection';
import { ConfirmationSection } from '@/app/components/ConfirmationSection';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'hero', component: HeroSection },
  { id: 'simulation', component: SimulationSection },
  { id: 'identity', component: IdentitySection },
  { id: 'scoring', component: ScoringSection },
  { id: 'documents', component: DocumentsSection },
  { id: 'signature', component: SignatureSection },
  { id: 'confirmation', component: ConfirmationSection },
];

export default function Home() {
  const { currentSection, setSection } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle scroll snap
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollY = container.scrollTop;
      const windowHeight = window.innerHeight;
      const newSectionIndex = Math.round(scrollY / windowHeight);
      
      if (newSectionIndex >= 0 && newSectionIndex < sections.length) {
        const newSection = sections[newSectionIndex].id;
        if (newSection !== currentSection) {
          setSection(newSection as any);
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentSection, setSection]);

  const scrollToSection = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    
    container.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
    >
      <ParticlesBackground />

      {/* Progress Indicator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSection === section.id
                ? 'bg-[#AB0017] h-8 glow-eqdom-sm'
                : 'bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Section Indicator */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="fixed left-6 top-1/2 -translate-y-1/2 z-50"
        >
          <span className="text-[#888888] text-xs tracking-widest uppercase writing-vertical">
            {currentSection}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Scroll Container */}
      <div 
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory hide-scrollbar"
      >
        <div className="snap-section">
          <HeroSection onEnter={() => scrollToSection(1)} />
        </div>

        <div className="snap-section">
          <SimulationSection />
        </div>

        <div className="snap-section">
          <IdentitySection />
        </div>

        <div className="snap-section">
          <ScoringSection />
        </div>

        <div className="snap-section">
          <DocumentsSection />
        </div>

        <div className="snap-section">
          <SignatureSection />
        </div>

        <div className="snap-section">
          <ConfirmationSection />
        </div>
      </div>
    </motion.main>
  );
}
