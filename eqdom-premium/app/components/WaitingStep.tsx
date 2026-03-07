'use client';

import { useAppStore } from '@/app/store';
import { motion } from 'framer-motion';
import { Clock, Check, FileSearch, CreditCard, FileCheck } from 'lucide-react';
import { useEffect } from 'react';

export function WaitingStep() {
  const { reference, setStep } = useAppStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep('offer');
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const steps = [
    { icon: Check, label: 'Documents reçus', done: true },
    { icon: FileSearch, label: 'Vérification', done: false },
    { icon: CreditCard, label: 'Analyse crédit', done: false },
    { icon: FileCheck, label: 'Décision', done: false },
  ];

  return (
    <div className="min-h-screen bg-[#0F1823] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-lg"
      >
        <div className="w-20 h-20 bg-[#AB0017]/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <Clock className="w-10 h-10 text-[#AB0017] animate-pulse" />
        </div>

        <h2 className="text-3xl font-bold text-white mb-4">Votre dossier est en cours d'étude</h2>
        
        <p className="text-[#86868B] mb-8">
          Référence : <span className="text-white font-mono">{reference || 'EQD-XXXXXX'}</span>
        </p>

        <div className="bg-[#1A2433] rounded-xl p-6 border border-white/10 mb-8">
          <div className="space-y-4">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  s.done ? 'bg-[#16A34A]/10 text-[#16A34A]' : 'bg-white/5 text-[#86868B]'
                }`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <span className={s.done ? 'text-white' : 'text-[#86868B]'}>{s.label}</span>
                {s.done && <Check className="w-4 h-4 text-[#16A34A] ml-auto" />}
              </div>
            ))}
          </div>
        </div>

        <p className="text-[#86868B] text-sm">
          Temps estimé : 4 à 24 heures
          <br />
          Vous serez notifié par SMS dès que votre offre est prête.
        </p>
      </motion.div>
    </div>
  );
}
