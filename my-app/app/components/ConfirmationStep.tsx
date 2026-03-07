'use client';

import { useAppStore } from '@/app/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, FileText, Upload, PenLine, Flag, Download, RotateCcw } from 'lucide-react';

const timelineSteps = [
  { id: 'simulation', label: 'Simulation', icon: Clock },
  { id: 'donnees', label: 'Données', icon: FileText },
  { id: 'scoring', label: 'Scoring', icon: CheckCircle },
  { id: 'justifs', label: 'Documents', icon: Upload },
  { id: 'contrat', label: 'Contrat', icon: FileText },
  { id: 'signature', label: 'Signature', icon: PenLine },
  { id: 'deblocage', label: 'Déblocage', icon: Flag },
];

export function ConfirmationStep() {
  const { 
    simulation,
    applicant,
    contract,
    signature,
    reset
  } = useAppStore();

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-3xl mx-auto px-4 py-8"
    >
      {/* Success Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="w-20 h-20 bg-[#16A34A]/10 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-[#16A34A]" />
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-semibold text-[#1D1D1F] mb-4">
          Demande envoyée !
        </h1>
        <p className="text-lg text-[#86868B] max-w-lg mx-auto">
          Votre contrat est signé. Votre crédit sera débloqué sous 24 à 48 heures ouvrées.
        </p>
      </div>

      {/* Reference Card */}
      <Card className="mb-8 bg-gradient-to-br from-[#0F1823] to-[#1D1D1F] border-0">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-[#838792] mb-1">Référence de votre dossier</p>
              <p className="text-2xl font-bold text-white tracking-wider">
                {contract.reference}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10 rounded-xl"
              >
                <Download className="w-4 h-4 mr-2" />
                Contrat
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="mb-8 border-[#E8E8ED]">
        <CardContent className="p-6">
          <h3 className="font-semibold text-[#1D1D1F] mb-6">
            Suivi de votre demande
          </h3>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#E8E8ED]" />

            <div className="space-y-6">
              {timelineSteps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = index < 6;
                const isCurrent = index === 6;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex items-center gap-4"
                  >
                    <div
                      className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? 'bg-[#16A34A] text-white'
                          : isCurrent
                          ? 'bg-[#AB0017] text-white animate-pulse'
                          : 'bg-[#E8E8ED] text-[#86868B]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1">
                      <p className={`font-medium ${
                        isCompleted || isCurrent ? 'text-[#1D1D1F]' : 'text-[#86868B]'
                      }`}>
                        {step.label}
                      </p>
                      
                      {isCompleted && (
                        <p className="text-xs text-[#86868B]">Terminé</p>
                      )}
                      
                      {isCurrent && (
                        <Badge className="mt-1 bg-[#AB0017]/10 text-[#AB0017] hover:bg-[#AB0017]/10">
                          En cours
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="mb-8 border-[#E8E8ED]">
        <CardContent className="p-6">
          <h3 className="font-semibold text-[#1D1D1F] mb-4">
            Récapitulatif
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[#86868B]">Montant</p>
              <p className="font-medium text-[#1D1D1F]">{formatAmount(simulation.amount)}</p>
            </div>
            
            <div>
              <p className="text-[#86868B]">Mensualité</p>
              <p className="font-medium text-[#1D1D1F]">{formatAmount(simulation.monthlyPayment)}</p>
            </div>
            
            <div>
              <p className="text-[#86868B]">Durée</p>
              <p className="font-medium text-[#1D1D1F]">{simulation.duration} mois</p>
            </div>
            
            <div>
              <p className="text-[#86868B]">Signature</p>
              <p className="font-medium text-[#1D1D1F]">{formatDate(signature.date || '')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={reset}
          variant="outline"
          size="lg"
          className="rounded-full px-8 py-6 border-[#E8E8ED] hover:bg-[#F5F5F7]"
        >
          <RotateCcw className="mr-2 w-5 h-5" />
          Nouvelle simulation
        </Button>

        <Button
          size="lg"
          className="bg-[#AB0017] hover:bg-[#8A0012] text-white rounded-full px-8 py-6 shadow-lg shadow-[#AB0017]/25"
        >
          <Download className="mr-2 w-5 h-5" />
          Télécharger le contrat
        </Button>
      </div>
    </motion.div>
  );
}
