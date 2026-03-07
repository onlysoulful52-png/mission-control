'use client';

import { useAppStore } from '@/app/store';
import { HeroStep } from '@/app/components/HeroStep';
import { SimulationStep } from '@/app/components/SimulationStep';
import { ContactStep } from '@/app/components/ContactStep';
import { DocumentsStep } from '@/app/components/DocumentsStep';
import { WaitingStep } from '@/app/components/WaitingStep';
import { OfferStep } from '@/app/components/OfferStep';
import { SuccessStep } from '@/app/components/SuccessStep';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  const { currentStep } = useAppStore();

  const renderStep = () => {
    switch (currentStep) {
      case 'hero': return <HeroStep />;
      case 'simulation': return <SimulationStep />;
      case 'contact': return <ContactStep />;
      case 'documents': return <DocumentsStep />;
      case 'waiting': return <WaitingStep />;
      case 'offer': return <OfferStep />;
      case 'success': return <SuccessStep />;
      default: return <HeroStep />;
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0F1823]"
    >
      <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-white font-bold text-xl">
            EQDOM
          </div>
          <div className="text-[#86868B] text-sm">
            Société de financement — Groupe Saham
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </motion.main>
  );
}
