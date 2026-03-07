'use client';

import { useAppStore } from '@/app/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Smartphone, User, Shield, Check, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export function DataStep() {
  const { 
    applicant, 
    setApplicant, 
    verifyPhone, 
    setStep,
    setDemoMode,
    generateDemoData
  } = useAppStore();
  
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');
  const [showEidModal, setShowEidModal] = useState(false);

  const handleVerifyPhone = () => {
    if (verifyPhone(otpCode)) {
      setOtpError('');
    } else {
      setOtpError('Code incorrect. Essayez 123456 pour la démo.');
    }
  };

  const handleEidConnect = () => {
    setShowEidModal(true);
    setTimeout(() => {
      setShowEidModal(false);
      setApplicant({
        firstName: 'Ahmed',
        lastName: 'Alami',
        birthDate: '1985-06-15',
        idNumber: 'AB123456',
      });
    }, 2000);
  };

  const handleDemoScenario = (scenario: 'VERT' | 'ORANGE' | 'ROUGE') => {
    setDemoMode(true);
    generateDemoData(scenario);
  };

  const canContinue = applicant.verified && applicant.firstName && applicant.lastName 
    && applicant.email && applicant.consents.dataProcessing;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-2xl mx-auto px-4 py-8"
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-semibold text-[#1D1D1F] mb-4">
          Vos informations
        </h1>
        <p className="text-lg text-[#86868B]">
          Nous n'avons besoin que de l'essentiel
        </p>
      </div>

      {/* Demo Mode */}
      <Card className="mb-6 border-[#F59E0B]/30 bg-[#F59E0B]/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-[#F59E0B]" />
            <span className="font-medium text-[#1D1D1F]">Mode démo (scénarios)</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['VERT', 'ORANGE', 'ROUGE'] as const).map((scenario) => (
              <Button
                key={scenario}
                variant="outline"
                size="sm"
                onClick={() => handleDemoScenario(scenario)}
                className={`rounded-full ${
                  scenario === 'VERT' ? 'border-[#16A34A] text-[#16A34A]' :
                  scenario === 'ORANGE' ? 'border-[#F59E0B] text-[#F59E0B]' :
                  'border-[#DC2626] text-[#DC2626]'
                }`}
              >
                Scénario {scenario}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Phone Verification */}
      <Card className="mb-6 border-[#E8E8ED]">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#AB0017]/10 rounded-xl flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-[#AB0017]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#1D1D1F]">Vérification téléphone</h3>
              <p className="text-sm text-[#86868B]">Code de démo: 123456</p>
            </div>
          </div>

          {!applicant.verified ? (
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="+212 6XX XXX XXX"
                  value={applicant.phone}
                  onChange={(e) => setApplicant({ phone: e.target.value })}
                  className="flex-1"
                />
                <Button 
                  variant="outline"
                  className="rounded-xl"
                >
                  Envoyer
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Code OTP"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  maxLength={6}
                  className="flex-1 text-center tracking-widest"
                />
                <Button 
                  onClick={handleVerifyPhone}
                  className="bg-[#AB0017] hover:bg-[#8A0012] rounded-xl"
                >
                  Vérifier
                </Button>
              </div>
              
              {otpError && (
                <p className="text-sm text-[#DC2626]">{otpError}</p>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2 text-[#16A34A]"
            >
              <Check className="w-5 h-5" />
              <span className="font-medium">Téléphone vérifié</span>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* e-ID Connection */}
      <Card className="mb-6 border-[#E8E8ED]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0F1823]/10 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#0F1823]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1D1D1F]">Carte d'identité</h3>
                <p className="text-sm text-[#86868B]">Récupération automatique</p>
              </div>
            </div>
            
            {!applicant.idNumber ? (
              <Button
                onClick={handleEidConnect}
                variant="outline"
                className="rounded-xl"
              >
                Connecter
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-[#16A34A]">
                <Check className="w-5 h-5" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Personal Info */}
      <Card className="mb-6 border-[#E8E8ED]">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#AB0017]/10 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-[#AB0017]" />
            </div>
            <h3 className="font-semibold text-[#1D1D1F]">Informations personnelles</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                value={applicant.firstName}
                onChange={(e) => setApplicant({ firstName: e.target.value })}
                className="mt-1.5"
              />
            </div>
            
            <div>
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                value={applicant.lastName}
                onChange={(e) => setApplicant({ lastName: e.target.value })}
                className="mt-1.5"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={applicant.email}
              onChange={(e) => setApplicant({ email: e.target.value })}
              className="mt-1.5"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="income">Revenu annuel (DH)</Label>
              <Input
                id="income"
                type="number"
                value={applicant.income || ''}
                onChange={(e) => setApplicant({ income: parseInt(e.target.value) || 0 })}
                className="mt-1.5"
              />
            </div>
            
            <div>
              <Label htmlFor="employment">Situation</Label>
              <select
                id="employment"
                value={applicant.employmentStatus}
                onChange={(e) => setApplicant({ employmentStatus: e.target.value as any })}
                className="w-full mt-1.5 px-3 py-2 border border-[#E8E8ED] rounded-xl bg-white"
              >
                <option value="salaried">Salarié</option>
                <option value="self-employed">Indépendant</option>
                <option value="retired">Retraité</option>
                <option value="other">Autre</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Consents */}
      <Card className="mb-8 border-[#E8E8ED]">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="dataProcessing"
              checked={applicant.consents.dataProcessing}
              onCheckedChange={(checked) => 
                setApplicant({ 
                  consents: { ...applicant.consents, dataProcessing: checked as boolean } 
                })
              }
            />
            <Label htmlFor="dataProcessing" className="text-sm leading-relaxed cursor-pointer">
              J'accepte le traitement de mes données personnelles dans le cadre de ma demande de crédit.
              <span className="text-[#AB0017]">*</span>
            </Label>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="creditCheck"
              checked={applicant.consents.creditCheck}
              onCheckedChange={(checked) => 
                setApplicant({ 
                  consents: { ...applicant.consents, creditCheck: checked as boolean } 
                })
              }
            />
            <Label htmlFor="creditCheck" className="text-sm leading-relaxed cursor-pointer">
              J'autorise Eqdom à consulter le bureau de crédit pour évaluer ma solvabilité.
            </Label>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="marketing"
              checked={applicant.consents.marketing}
              onCheckedChange={(checked) => 
                setApplicant({ 
                  consents: { ...applicant.consents, marketing: checked as boolean } 
                })
              }
            />
            <Label htmlFor="marketing" className="text-sm leading-relaxed cursor-pointer">
              J'accepte de recevoir des offres personnalisées du groupe Saham.
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Continue */}
      <div className="flex justify-end">
        <Button
          onClick={() => setStep('scoring')}
          disabled={!canContinue}
          size="lg"
          className="bg-[#AB0017] hover:bg-[#8A0012] disabled:bg-[#E8E8ED] disabled:text-[#86868B] text-white rounded-full px-8 py-6 text-base font-medium shadow-lg shadow-[#AB0017]/25 transition-all duration-300 group"
        >
          Continuer
          <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      {/* e-ID Modal */}
      <AnimatePresence>
        {showEidModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center"
            >
              <div className="w-16 h-16 bg-[#0F1823]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#0F1823] animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connexion e-ID</h3>
              <p className="text-[#86868B]">Récupération des données en cours...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
