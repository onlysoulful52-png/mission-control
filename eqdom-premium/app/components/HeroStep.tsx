'use client';

import { useAppStore } from '@/app/store';
import { motion } from 'framer-motion';
import { ChevronRight, Shield, Clock, FileCheck } from 'lucide-react';

export function HeroStep() {
  const { setStep } = useAppStore();

  return (
    <div className="min-h-screen bg-[#0F1823] flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl"
      >
        <div className="mb-8">
          <span className="text-[#AB0017] font-semibold tracking-wider text-sm uppercase">
            Groupe Saham
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Votre projet,
          <br />
          <span className="text-[#AB0017]">notre financement.</span>
        </h1>

        <p className="text-[#86868B] text-xl mb-12 max-w-lg mx-auto">
          Une solution de crédit sur mesure, 100% en ligne, en quelques minutes.
        </p>

        <button
          onClick={() => setStep('simulation')}
          className="bg-[#AB0017] hover:bg-[#8A0012] text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors inline-flex items-center gap-2"
        >
          Démarrer ma simulation
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="mt-16 flex items-center justify-center gap-8 text-[#86868B] text-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Sécurisé</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>2 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4" />
            <span>Sans engagement</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
