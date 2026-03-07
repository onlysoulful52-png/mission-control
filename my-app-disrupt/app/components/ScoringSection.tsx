'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/app/store';

export function ScoringSection() {
  const { scoring, calculateScoring, setSection } = useAppStore();

  useEffect(() => {
    calculateScoring();
  }, []);

  const getStatusColor = () => {
    switch (scoring.status) {
      case 'VERT': return '#00FF88';
      case 'ORANGE': return '#FFB800';
      case 'ROUGE': return '#AB0017';
    }
  };

  const getHeartbeatSpeed = () => {
    switch (scoring.status) {
      case 'VERT': return 1;
      case 'ORANGE': return 1.5;
      case 'ROUGE': return 2.5;
    }
  };

  const getMessage = () => {
    switch (scoring.status) {
      case 'VERT': return 'Votre profil brille';
      case 'ORANGE': return 'Votre profil est solide';
      case 'ROUGE': return 'On personnalise votre offre';
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-[#AB0017] text-sm font-medium tracking-wider uppercase mb-2">Scoring</p>
          <h2 className="text-4xl font-bold text-white">Analyse de votre profil</h2>
        </motion.div>

        {/* Heart */}
        <div className="relative w-64 h-64 mx-auto mb-12">
          {/* Glow */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: getHeartbeatSpeed(),
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${getStatusColor()}40 0%, transparent 70%)`,
            }}
          />

          {/* Heart SVG */}
          <motion.svg
            viewBox="0 0 24 24"
            fill={getStatusColor()}
            className="w-full h-full relative z-10"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: getHeartbeatSpeed(),
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              filter: `drop-shadow(0 0 30px ${getStatusColor()})`,
            }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </motion.svg>

          {/* Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="text-4xl font-bold text-white">
              {scoring.score}
            </span>
          </motion.div>
        </div>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h3 
            className="text-3xl font-bold mb-2"
            style={{ color: getStatusColor(), textShadow: `0 0 20px ${getStatusColor()}40` }}
          >
            {getMessage()}
          </h3>
          
          <div className="flex items-center justify-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getStatusColor(), boxShadow: `0 0 10px ${getStatusColor()}` }}
            />
            <span className="text-[#888888]">
              Pack {scoring.pack}
            </span>
          </div>
        </motion.div>

        {/* Checklist */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <div className="space-y-3">
            {[
              'Revenus vérifiés',
              'Historique analysé',
              'Projet évalué',
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, type: 'spring' }}
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: getStatusColor() }}
                >
                  <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <span className="text-white">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => setSection('documents')}
          className="px-12 py-4 bg-white text-black font-medium rounded-xl 
                     hover:bg-[#AB0017] hover:text-white transition-all duration-300"
        >
          Continuer →
        </motion.button>
      </div>
    </section>
  );
}
