'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Percent, Zap, Shield, Clock, Gift, Star } from 'lucide-react';

const offers = [
  {
    id: 1,
    title: 'Taux préférentiel',
    subtitle: 'Dès 4,9% TAEG',
    description: 'Pour les clients Saham',
    icon: Percent,
    color: 'from-[#AB0017] to-[#DC2626]',
  },
  {
    id: 2,
    title: 'Réponse express',
    subtitle: '2 minutes',
    description: 'Simulation instantanée',
    icon: Zap,
    color: 'from-[#0F1823] to-[#1D1D1F]',
  },
  {
    id: 3,
    title: 'Sans engagement',
    subtitle: '100% gratuit',
    description: 'Jusqu\'à la signature',
    icon: Shield,
    color: 'from-[#16A34A] to-[#22C55E]',
  },
  {
    id: 4,
    title: 'Déblocage rapide',
    subtitle: '24-48h',
    description: 'Après signature',
    icon: Clock,
    color: 'from-[#F59E0B] to-[#FBBF24]',
  },
  {
    id: 5,
    title: 'Offre bienvenue',
    subtitle: '1er mois offert',
    description: 'Assurance emprunteur',
    icon: Gift,
    color: 'from-[#8B5CF6] to-[#A78BFA]',
  },
  {
    id: 6,
    title: 'Programme fidélité',
    subtitle: 'Points Saham',
    description: 'Cumulez avantages',
    icon: Star,
    color: 'from-[#06B6D4] to-[#22D3EE]',
  },
];

// Duplicate for infinite scroll
const duplicatedOffers = [...offers, ...offers];

export function OffersCarousel() {
  return (
    <section className="py-16 overflow-hidden bg-[#F5F5F7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-sm font-semibold text-[#AB0017] uppercase tracking-wider mb-3">
            Nos avantages
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#1D1D1F] mb-4">
            Pourquoi choisir Eqdom ?
          </h2>
          <p className="text-lg text-[#86868B] max-w-2xl mx-auto">
            Des solutions de crédit adaptées à vos besoins, avec la rapidité et la sécurité du groupe Saham.
          </p>
        </motion.div>
      </div>

      {/* Infinite Carousel */}
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F5F5F7] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F5F5F7] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll hover:[animation-play-state:paused]">
          {duplicatedOffers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={`${offer.id}-${index}`}
                className="flex-shrink-0 mx-3"
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-72 bg-white rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-shadow duration-300">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${offer.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-[#1D1D1F] mb-1">
                    {offer.title}
                  </h3>
                  
                  <p className="text-2xl font-bold text-[#AB0017] mb-1">
                    {offer.subtitle}
                  </p>
                  
                  <p className="text-sm text-[#86868B]">
                    {offer.description}
                  </p>

                  <div className="mt-4 flex items-center text-sm text-[#AB0017] font-medium group cursor-pointer">
                    En savoir plus
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Stats Row */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '500K+', label: 'Clients satisfaits' },
            { value: '2 min', label: 'Réponse en ligne' },
            { value: '4,9%', label: 'TAEG à partir de' },
            { value: '48h', label: 'Déblocage rapide' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <p className="text-3xl sm:text-4xl font-bold text-[#1D1D1F] mb-1">{stat.value}</p>
              <p className="text-sm text-[#86868B]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
