'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useAppStore } from '@/app/store';

const durations = [12, 24, 36, 48, 60, 72];

export function SimulationSection() {
  const { simulation, setSimulation, setSection } = useAppStore();
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-150, 150], [15, -15]);
  const rotateY = useTransform(mouseX, [-150, 150], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const getCardGlow = () => {
    if (simulation.amount < 30000) return '0 0 60px rgba(0, 200, 255, 0.4)';
    if (simulation.amount > 100000) return '0 0 60px rgba(171, 0, 23, 0.6)';
    return '0 0 60px rgba(255, 184, 0, 0.4)';
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left - 3D Card */}
        <div 
          className="relative flex justify-center items-center h-[400px]"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            mouseX.set(0);
            mouseY.set(0);
          }}
        >
          <motion.div
            ref={cardRef}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              boxShadow: getCardGlow(),
            }}
            animate={{ 
              y: [0, -15, 0],
            }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            className="relative w-80 h-48 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] 
                       border border-white/10 p-6 cursor-pointer"
          >
            {/* Card Chip */}
            <div className="absolute top-6 left-6 w-12 h-9 rounded bg-gradient-to-br from-[#FFB800] to-[#FF8C00] 
                            flex items-center justify-center">
              <div className="w-8 h-5 border border-[#8B6914] rounded-sm" />
            </div>

            {/* Card Logo */}
            <div className="absolute top-6 right-6 text-white font-bold text-xl tracking-wider">
              EQDOM
            </div>

            {/* Card Number */}
            <div className="absolute bottom-16 left-6 font-mono text-white/80 text-lg tracking-widest">
              •••• •••• •••• 4242
            </div>

            {/* Card Holder */}
            <div className="absolute bottom-6 left-6">
              <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Titulaire</div>
              <div className="text-white text-sm tracking-wider">SARAH BENALI</div>
            </div>

            {/* Holographic Effect */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-20"
              style={{
                background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
              }}
            />
          </motion.div>

          {/* Floating Particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#AB0017]"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Right - Controls */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#AB0017] text-sm font-medium tracking-wider uppercase mb-2">Simulation</p>
            <h2 className="text-4xl font-bold text-white mb-6">
              Quel est votre projet ?
            </h2>
          </motion.div>

          {/* Amount */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <label className="text-[#888888] text-sm mb-4 block">Montant souhaité</label>
            <div className="text-5xl font-bold text-white mb-6 text-glow">
              {formatAmount(simulation.amount)}
            </div>
            
            <input
              type="range"
              min="5000"
              max="500000"
              step="5000"
              value={simulation.amount}
              onChange={(e) => setSimulation({ amount: parseInt(e.target.value) })}
              className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                         accent-[#AB0017] hover:accent-[#FF1A3E]"
              style={{
                background: `linear-gradient(to right, #AB0017 0%, #AB0017 ${(simulation.amount / 500000) * 100}%, rgba(255,255,255,0.1) ${(simulation.amount / 500000) * 100}%, rgba(255,255,255,0.1) 100%)`,
              }}
            />
            
            <div className="flex justify-between text-[#555555] text-sm mt-2">
              <span>5 000 DH</span>
              <span>500 000 DH</span>
            </div>
          </motion.div>

          {/* Duration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-6"
          >
            <label className="text-[#888888] text-sm mb-4 block">Durée</label>
            <div className="flex flex-wrap gap-3">
              {durations.map((duration) => (
                <button
                  key={duration}
                  onClick={() => setSimulation({ duration })}
                  className={`px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                    simulation.duration === duration
                      ? 'bg-[#AB0017] text-white glow-eqdom-sm'
                      : 'bg-white/5 text-[#888888] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {duration} mois
                </button>
              ))}
            </div>
          </motion.div>

          {/* Result */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-strong rounded-2xl p-6 border-[#AB0017]/30"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[#888888] text-sm">Mensualité estimée</p>
                <p className="text-4xl font-bold text-[#AB0017] text-glow">
                  {formatAmount(simulation.monthlyPayment)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[#888888] text-sm">TAEG</p>
                <p className="text-2xl font-bold text-white">4.9%</p>
              </div>
            </div>
          </motion.div>

          {/* Continue */}
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            onClick={() => setSection('identity')}
            className="w-full py-4 bg-white text-black font-medium rounded-xl 
                       hover:bg-[#AB0017] hover:text-white transition-all duration-300"
          >
            Continuer →
          </motion.button>
        </div>
      </div>
    </section>
  );
}
