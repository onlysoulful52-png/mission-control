'use client';

import { useAppStore } from '@/app/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle, AlertCircle, XCircle, FileText, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ScoringStep() {
  const { 
    scoring, 
    calculateScoring, 
    applicant,
    simulation,
    setStep 
  } = useAppStore();
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      calculateScoring();
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = () => {
    switch (scoring.status) {
      case 'VERT': return 'text-[#16A34A] bg-[#16A34A]/10';
      case 'ORANGE': return 'text-[#F59E0B] bg-[#F59E0B]/10';
      case 'ROUGE': return 'text-[#DC2626] bg-[#DC2626]/10';
    }
  };

  const getStatusIcon = () => {
    switch (scoring.status) {
      case 'VERT': return <CheckCircle className="w-16 h-16 text-[#16A34A]" />;
      case 'ORANGE': return <AlertCircle className="w-16 h-16 text-[#F59E0B]" />;
      case 'ROUGE': return <XCircle className="w-16 h-16 text-[#DC2626]" />;
    }
  };

  const getPackLabel = () => {
    switch (scoring.pack) {
      case 'D0': return 'Pack minimal (ID uniquement)';
      case 'D1': return 'Pack standard (ID + RIB)';
      case 'D2': return 'Pack complet (ID + revenus)';
      case 'D3': return 'Pack renforcé (complet + pro)';
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-[#E8E8ED] rounded-full" />
            <motion.div
              className="absolute inset-0 border-4 border-[#AB0017] rounded-full border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-[#AB0017] animate-spin" />
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-2">
            Analyse en cours
          </h2>
          
          <p className="text-[#86868B]">
            Nous évaluons votre profil...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-2xl mx-auto px-4 py-8"
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-semibold text-[#1D1D1F] mb-4">
          Résultat de l'analyse
        </h1>
      </div>

      {/* Score Card */}
      <Card className="mb-6 overflow-hidden border-0 shadow-xl">
        <div className={`p-8 ${getStatusColor()}`}>
          <div className="flex flex-col items-center">
            {getStatusIcon()}
            
            <div className="mt-4 text-center">
              <p className="text-sm uppercase tracking-wider opacity-80 mb-1">
                Score de crédit
              </p>
              <p className="text-5xl font-bold">
                {scoring.score}/100
              </p>
              <div className={`inline-flex items-center gap-2 mt-2 px-4 py-1 rounded-full bg-white/80`}>
                <span className={`w-2 h-2 rounded-full ${
                  scoring.status === 'VERT' ? 'bg-[#16A34A]' :
                  scoring.status === 'ORANGE' ? 'bg-[#F59E0B]' : 'bg-[#DC2626]'
                }`} />
                <span className="font-medium">{scoring.status}</span>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <h3 className="font-semibold text-[#1D1D1F] mb-3">
            Éléments pris en compte
          </h3>
          
          <ul className="space-y-2">
            {scoring.rationale.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-[#86868B]"
              >
                <div className={`w-1.5 h-1.5 rounded-full ${
                  scoring.status === 'VERT' ? 'bg-[#16A34A]' :
                  scoring.status === 'ORANGE' ? 'bg-[#F59E0B]' : 'bg-[#DC2626]'
                }`} />
                {item}
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Document Pack */}
      <Card className="mb-8 border-[#E8E8ED]">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#AB0017]/10 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-[#AB0017]" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-[#1D1D1F]">
                Documents requis
              </h3>
              <p className="text-sm text-[#86868B]">
                {getPackLabel()}
              </p>
            </div>
            
            <div className="px-3 py-1 bg-[#F5F5F7] rounded-full text-sm font-medium text-[#1D1D1F]">
              {scoring.pack}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Continue */}
      <div className="flex justify-end">
        <Button
          onClick={() => setStep('justifs')}
          size="lg"
          className="bg-[#AB0017] hover:bg-[#8A0012] text-white rounded-full px-8 py-6 text-base font-medium shadow-lg shadow-[#AB0017]/25 transition-all duration-300 group"
        >
          Continuer
          <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
}
