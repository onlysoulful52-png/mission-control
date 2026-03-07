'use client';

import { useAppStore } from '@/app/store';
import { motion } from 'framer-motion';
import { Check, Download, RotateCcw } from 'lucide-react';

export function SuccessStep() {
  const { reference, simulation, reset } = useAppStore();

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="min-h-screen bg-[#0F1823] flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-lg"
      >
        <div className="w-24 h-24 bg-[#16A34A] rounded-full flex items-center justify-center mx-auto mb-8">
          <Check className="w-12 h-12 text-white" />
        </div>

        <h2 className="text-4xl font-bold text-white mb-4">Crédit confirmé !</h2>
        
        <p className="text-[#86868B] text-lg mb-8">
          Votre dossier a été signé avec succès.
        </p>

        <div className="bg-[#1A2433] rounded-2xl p-8 border border-white/10 mb-8 text-left">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-[#86868B]">Référence</span>
              <span className="text-white font-mono">{reference}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#86868B]">Montant</span>
              <span className="text-white font-semibold">{formatCurrency(simulation.amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#86868B]">Déblocage</span>
              <span className="text-white">24 à 48 heures</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="w-full bg-white/10 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, delay: 0.5 }}
                className="bg-[#16A34A] h-2 rounded-full"
              />
            </div>
            <p className="text-[#86868B] text-sm mt-2 text-center">Virement en cours de préparation</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex-1 bg-[#AB0017] hover:bg-[#8A0012] text-white py-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Télécharger le contrat
          </button>

          <button
            onClick={reset}
            className="flex-1 bg-transparent hover:bg-white/5 text-white py-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 border border-white/10"
          >
            <RotateCcw className="w-5 h-5" />
            Nouvelle simulation
          </button>
        </div>
      </motion.div>
    </div>
  );
}
