'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/app/store';
import { Check, Download, RotateCcw, CreditCard, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ConfirmationSection() {
  const { simulation, identity, reference, reset } = useAppStore();
  const [countdown, setCountdown] = useState(24 * 60 * 60); // 24h in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-[#00FF88] flex items-center justify-center mx-auto mb-6 glow-success"
          >
            <Check className="w-10 h-10 text-black" />
          </motion.div>

          <h2 className="text-5xl font-bold text-white mb-2">
            Crédit approuvé !
          </h2>
          
          <p className="text-[#888888] text-lg">
            Bienvenue dans la famille Eqdom
          </p>
        </motion.div>

        {/* Member Card */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 30 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative max-w-md mx-auto mb-12"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#AB0017] to-[#FFB800] blur-2xl opacity-30 rounded-3xl" />
          
          <div className="relative glass-strong rounded-3xl p-8 border border-white/20">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-wider mb-1">Membre Eqdom</p>
                <p className="text-white font-bold text-lg">{identity.firstName} {identity.lastName}</p>
              </div>
              <CreditCard className="w-8 h-8 text-[#AB0017]" />
            </div>

            <div className="mb-8">
              <p className="text-[#555555] text-xs uppercase tracking-wider mb-1">Référence</p>
              <p className="text-[#FFB800] font-mono text-xl tracking-wider">{reference}</p>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-[#555555] text-xs">Montant approuvé</p>
                <p className="text-white text-2xl font-bold">{formatAmount(simulation.amount)}</p>
              </div>
              
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#AB0017] to-[#FFB800] flex items-center justify-center">
                <span className="text-white font-bold text-xs">EQ</span>
              </div>
            </div>

            {/* Holographic stripe */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#AB0017] to-transparent opacity-50" />
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-8 mb-8 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-[#AB0017]" />
            <span className="text-[#888888]">Déblocage estimé dans</span>
          </div>
          
          <div className="text-5xl sm:text-6xl font-bold text-white font-mono tracking-wider">
            {formatTime(countdown)}
          </div>
          
          <div className="mt-4 w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 24 * 60 * 60, ease: 'linear' }}
              className="h-full bg-gradient-to-r from-[#AB0017] to-[#FFB800]"
            />
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white rounded-xl
                       hover:bg-white/5 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            Nouvelle simulation
          </button>

          <button className="flex items-center justify-center gap-2 px-8 py-4 bg-[#AB0017] text-white rounded-xl
                             hover:bg-[#FF1A3E] transition-all glow-eqdom-sm">
            <Download className="w-5 h-5" />
            Télécharger le contrat
          </button>
        </motion.div>
      </div>
    </section>
  );
}
