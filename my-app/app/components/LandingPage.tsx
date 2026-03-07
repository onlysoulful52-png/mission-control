'use client';

import { useAppStore } from '@/app/store';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Clock, Award } from 'lucide-react';
import { OffersCarousel } from './OffersCarousel';

export function LandingPage() {
  const { setStep } = useAppStore();

  const startApplication = () => {
    setStep('simulation');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F5F7] via-white to-white pointer-events-none" />
        
        {/* Floating shapes */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#AB0017]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#0F1823]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#AB0017]/10 rounded-full mb-6">
                  <span className="w-2 h-2 bg-[#AB0017] rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-[#AB0017]">Nouveau : Crédit 100% en ligne</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1D1D1F] leading-tight mb-6">
                  Votre crédit,
                  <br />
                  <span className="text-[#AB0017]">simplifié.</span>
                </h1>

                <p className="text-lg sm:text-xl text-[#86868B] mb-8 max-w-xl mx-auto lg:mx-0">
                  Simulez, demandez et signez votre crédit en quelques minutes. 
                  Une expérience moderne, sécurisée et sans papier.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    onClick={startApplication}
                    size="lg"
                    className="bg-[#AB0017] hover:bg-[#8A0012] text-white rounded-full px-8 py-6 text-base font-medium shadow-lg shadow-[#AB0017]/25 hover:shadow-xl hover:shadow-[#AB0017]/30 transition-all duration-300 group"
                  >
                    Démarrer ma simulation
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full px-8 py-6 text-base font-medium border-[#E8E8ED] hover:bg-[#F5F5F7] transition-all duration-300"
                  >
                    En savoir plus
                  </Button>
                </div>

                {/* Trust badges */}
                <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6">
                  {[
                    { icon: Shield, text: 'Sécurisé' },
                    { icon: Clock, text: '2 min' },
                    { icon: Award, text: 'Saham Group' },
                  ].map((badge, index) => (
                    <motion.div
                      key={badge.text}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-2 text-[#86868B]"
                    >
                      <badge.icon className="w-4 h-4" />
                      <span className="text-sm">{badge.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Content - Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative mx-auto w-80">
                {/* Phone frame */}
                <div className="relative bg-[#1D1D1F] rounded-[3rem] p-3 shadow-2xl">
                  <div className="bg-white rounded-[2.5rem] overflow-hidden">
                    {/* Notch */}
                    <div className="h-7 bg-[#1D1D1F] mx-auto w-32 rounded-b-2xl" />
                    
                    {/* Screen content */}
                    <div className="p-6">
                      <div className="mb-6">
                        <p className="text-xs text-[#86868B] mb-1">Montant souhaité</p>
                        <p className="text-3xl font-bold text-[#1D1D1F]">50 000 DH</p>
                      </div>

                      <div className="h-2 bg-[#E8E8ED] rounded-full mb-6">
                        <div className="h-full w-1/2 bg-[#AB0017] rounded-full" />
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {['12 mois', '24 mois', '36 mois', '48 mois'].map((duration) => (
                          <div
                            key={duration}
                            className={`text-center py-3 rounded-xl text-sm font-medium transition-colors ${
                              duration === '24 mois'
                                ? 'bg-[#AB0017] text-white'
                                : 'bg-[#F5F5F7] text-[#1D1D1F]'
                            }`}
                          >
                            {duration}
                          </div>
                        ))}
                      </div>

                      <div className="bg-[#F5F5F7] rounded-2xl p-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-[#86868B]">Mensualité estimée</span>
                          <span className="text-lg font-bold text-[#AB0017]">2 396 DH</span>
                        </div>
                        <p className="text-xs text-[#86868B]">TAEG : 4,9%</p>
                      </div>

                      <button className="w-full bg-[#AB0017] text-white py-4 rounded-xl font-medium">
                        Continuer
                      </button>
                    </div>
                  </div>

                  {/* Side button */}
                  <div className="absolute -right-1 top-24 w-1 h-12 bg-[#2C2C2E] rounded-r" />
                  <div className="absolute -right-1 top-40 w-1 h-16 bg-[#2C2C2E] rounded-r" />
                  <div className="absolute -left-1 top-32 w-1 h-8 bg-[#2C2C2E] rounded-l" />
                </div>

                {/* Floating card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="absolute -bottom-4 -left-12 bg-white rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#16A34A] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1D1D1F]">Crédit approuvé !</p>
                      <p className="text-xs text-[#86868B]">Score: 88/100</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offers Carousel */}
      <OffersCarousel />

      {/* Trust Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <p className="text-sm font-semibold text-[#AB0017] uppercase tracking-wider mb-3">
              Le groupe Saham
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1D1D1F] mb-4">
              La confiance d\'un leader
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Expertise',
                description: 'Plus de 20 ans d\'expérience dans le crédit au Maroc.',
                icon: 'M12 14l9-5-9-5-9 5 9 5z',
              },
              {
                title: 'Sécurité',
                description: 'Vos données sont cryptées et protégées selon les standards bancaires.',
                icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
              },
              {
                title: 'Transparence',
                description: 'Pas de frais cachés. Toutes les conditions sont clairement présentées.',
                icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center p-8 rounded-3xl bg-[#F5F5F7] hover:bg-[#EFEFF1] transition-colors duration-300"
              >
                <div className="w-14 h-14 mx-auto mb-6 bg-white rounded-2xl flex items-center justify-center shadow-sm"
                >
                  <svg className="w-7 h-7 text-[#AB0017]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#1D1D1F] mb-3">{item.title}</h3>
                <p className="text-[#86868B]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0F1823]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6">
              Prêt à réaliser votre projet ?
            </h2>
            
            <p className="text-lg text-[#838792] mb-10 max-w-2xl mx-auto">
              Rejoignez plus de 500 000 clients qui ont fait confiance à Eqdom pour leur crédit.
            </p>

            <Button
              onClick={startApplication}
              size="lg"
              className="bg-white hover:bg-[#F5F5F7] text-[#0F1823] rounded-full px-10 py-7 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Démarrer ma simulation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <p className="mt-6 text-sm text-[#838792]">
              Sans engagement • Gratuit • Réponse immédiate
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#F5F5F7] border-t border-[#E8E8ED]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#86868B]">
              © 2024 Eqdom. Tous droits réservés.
            </p>
            <p className="text-xs text-[#86868B]">
              Prototype – Front-end uniquement
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
