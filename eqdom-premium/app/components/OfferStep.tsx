'use client';

import { useAppStore } from '@/app/store';
import { motion } from 'framer-motion';
import { Check, Download, FileText, ChevronRight } from 'lucide-react';

export function OfferStep() {
  const { simulation, setStep } = useAppStore();

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="min-h-screen bg-[#0F1823] py-20 px-4">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-[#16A34A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-[#16A34A]" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Votre crédit est approuvé !</h2>
          <p className="text-[#86868B]">Voici les conditions de votre offre personnalisée.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#1A2433] rounded-2xl p-8 border border-white/10 mb-6"
        >
          <div className="space-y-4 mb-8">
            {[
              { label: 'Montant', value: formatCurrency(simulation.amount) },
              { label: 'Durée', value: `${simulation.duration} mois` },
              { label: 'Mensualité', value: formatCurrency(simulation.monthly) },
              { label: 'TAEG', value: 'À partir de 4.9%' },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-3 border-b border-white/10 last:border-0">
                <span className="text-[#86868B]">{item.label}</span>
                <span className="text-white font-semibold text-lg">{item.value}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setStep('success')}
            className="w-full bg-[#AB0017] hover:bg-[#8A0012] text-white py-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 mb-3"
          >
            Accepter et signer
            <ChevronRight className="w-5 h-5" />
          </button>

          <button className="w-full bg-transparent hover:bg-white/5 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 border border-white/10">
            <Download className="w-4 h-4" />
            Télécharger le contrat
          </button>
        </motion.div>

        <p className="text-center text-[#86868B] text-sm">
          Vous disposez de 14 jours pour vous rétracter sans frais.
        </p>
      </div>
    </div>
  );
}
