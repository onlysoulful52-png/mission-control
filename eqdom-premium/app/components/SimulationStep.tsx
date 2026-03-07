'use client';

import { useAppStore } from '@/app/store';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

const durations = [12, 24, 36, 48, 60];

export function SimulationStep() {
  const { simulation, setSimulation, setStep } = useAppStore();
  const [amount, setAmount] = useState(simulation.amount);
  const [duration, setDuration] = useState(simulation.duration);

  useEffect(() => {
    const monthly = Math.round((amount / duration) * 1.15);
    setSimulation({ amount, duration, monthly });
  }, [amount, duration]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="min-h-screen bg-[#0F1823] py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1A2433] rounded-2xl p-8 border border-white/10"
        >
          <div className="mb-8">
            <button
              onClick={() => setStep('hero')}
              className="text-[#86868B] hover:text-white flex items-center gap-2 mb-6"
            >
              <ChevronLeft className="w-4 h-4" /> Retour
            </button>
            <h2 className="text-3xl font-bold text-white mb-2">Simulez votre crédit</h2>
            <p className="text-[#86868B]">Ajustez le montant et la durée selon vos besoins.</p>
          </div>

          <div className="space-y-8">
            <div>
              <label className="text-[#86868B] text-sm mb-4 block">Montant souhaité</label>
              <div className="text-4xl font-bold text-white mb-4">{formatCurrency(amount)}</div>
              <input
                type="range"
                min="5000"
                max="500000"
                step="5000"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#AB0017]"
              />
              <div className="flex justify-between text-[#86868B] text-sm mt-2">
                <span>5 000 DH</span>
                <span>500 000 DH</span>
              </div>
            </div>

            <div>
              <label className="text-[#86868B] text-sm mb-4 block">Durée de remboursement</label>
              <div className="flex flex-wrap gap-3">
                {durations.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`px-5 py-3 rounded-lg font-medium transition-colors ${
                      duration === d
                        ? 'bg-[#AB0017] text-white'
                        : 'bg-white/5 text-[#86868B] hover:bg-white/10'
                    }`}
                  >
                    {d} mois
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#0F1823] rounded-xl p-6 border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[#86868B]">Mensualité estimée</span>
                <span className="text-3xl font-bold text-white">{formatCurrency(simulation.monthly)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#86868B]">TAEG</span>
                <span className="text-white">À partir de 4.9%</span>
              </div>
            </div>

            <button
              onClick={() => setStep('contact')}
              className="w-full bg-[#AB0017] hover:bg-[#8A0012] text-white py-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              Continuer
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
