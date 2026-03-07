'use client';

import { useAppStore } from '@/app/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';
import { ChevronRight, Calculator, Info } from 'lucide-react';
import { useEffect } from 'react';

const projects = [
  { id: 'personal', label: 'Projet personnel', icon: '👤' },
  { id: 'car', label: 'Véhicule', icon: '🚗' },
  { id: 'home', label: 'Aménagement', icon: '🏠' },
  { id: 'travel', label: 'Voyage', icon: '✈️' },
  { id: 'education', label: 'Éducation', icon: '🎓' },
  { id: 'health', label: 'Santé', icon: '⚕️' },
];

const durations = [12, 24, 36, 48, 60, 72, 84];

export function SimulationStep() {
  const { 
    simulation, 
    setSimulation, 
    calculateMonthlyPayment,
    setStep 
  } = useAppStore();

  useEffect(() => {
    calculateMonthlyPayment();
  }, [simulation.amount, simulation.duration]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const continueToNext = () => {
    setStep('donnees');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-3xl mx-auto px-4 py-8"
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-semibold text-[#1D1D1F] mb-4">
          Simulez votre crédit
        </h1>
        <p className="text-lg text-[#86868B]">
          Ajustez le montant et la durée selon vos besoins
        </p>
      </div>

      {/* Project Selection */}
      <div className="mb-10">
        <label className="block text-sm font-medium text-[#1D1D1F] mb-4">
          Nature du projet
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {projects.map((project) => (
            <motion.button
              key={project.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSimulation({ project: project.id })}
              className={`p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                simulation.project === project.id
                  ? 'border-[#AB0017] bg-[#FFF0F2]'
                  : 'border-[#E8E8ED] bg-white hover:border-[#D2D2D7]'
              }`}
            >
              <span className="text-2xl mb-2 block">{project.icon}</span>
              <span className={`text-sm font-medium ${
                simulation.project === project.id ? 'text-[#AB0017]' : 'text-[#1D1D1F]'
              }`}>
                {project.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Amount Slider */}
      <Card className="mb-6 border-[#E8E8ED] shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <label className="block text-sm font-medium text-[#86868B] mb-1">
                Montant souhaité
              </label>
              <p className="text-3xl font-bold text-[#1D1D1F]">
                {formatAmount(simulation.amount)}
              </p>
            </div>
            <div className="w-12 h-12 bg-[#AB0017]/10 rounded-xl flex items-center justify-center">
              <Calculator className="w-6 h-6 text-[#AB0017]" />
            </div>
          </div>

          <Slider
            value={[simulation.amount]}
            onValueChange={([value]) => setSimulation({ amount: value })}
            min={5000}
            max={500000}
            step={5000}
            className="mb-4"
          />

          <div className="flex justify-between text-sm text-[#86868B]">
            <span>5 000 DH</span>
            <span>500 000 DH</span>
          </div>
        </CardContent>
      </Card>

      {/* Duration Selection */}
      <Card className="mb-6 border-[#E8E8ED] shadow-sm">
        <CardContent className="p-6">
          <label className="block text-sm font-medium text-[#86868B] mb-4">
            Durée de remboursement
          </label>

          <div className="flex flex-wrap gap-2">
            {durations.map((duration) => (
              <motion.button
                key={duration}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSimulation({ duration })}
                className={`px-5 py-3 rounded-xl font-medium transition-all duration-200 ${
                  simulation.duration === duration
                    ? 'bg-[#AB0017] text-white shadow-lg shadow-[#AB0017]/25'
                    : 'bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#EFEFF1]'
                }`}
              >
                {duration} mois
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Result Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="mb-8 bg-gradient-to-br from-[#0F1823] to-[#1D1D1F] border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <p className="text-sm text-[#838792] mb-1">Mensualité estimée</p>
                <p className="text-4xl sm:text-5xl font-bold text-white">
                  {formatAmount(simulation.monthlyPayment)}
                </p>
                <p className="text-sm text-[#838792] mt-2">
                  TAEG indicatif : 4,9%
                </p>
              </div>

              <div className="flex items-center gap-4 text-sm text-[#838792]">
                <div className="text-center px-4">
                  <p className="text-white font-semibold">{simulation.duration} mois</p>
                  <p>Durée</p>
                </div>
                <div className="w-px h-10 bg-[#838792]/30" />
                <div className="text-center px-4">
                  <p className="text-white font-semibold">
                    {formatAmount(simulation.amount)}
                  </p>
                  <p>Montant</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Info Note */}
      <div className="flex items-start gap-3 mb-8 p-4 bg-[#F5F5F7] rounded-xl">
        <Info className="w-5 h-5 text-[#86868B] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-[#86868B]">
          Cette simulation est indicative. Le taux définitif dépendra de votre profil et sera confirmé après étude de votre dossier.
        </p>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end">
        <Button
          onClick={continueToNext}
          size="lg"
          className="bg-[#AB0017] hover:bg-[#8A0012] text-white rounded-full px-8 py-6 text-base font-medium shadow-lg shadow-[#AB0017]/25 hover:shadow-xl hover:shadow-[#AB0017]/30 transition-all duration-300 group"
        >
          Continuer
          <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
}
