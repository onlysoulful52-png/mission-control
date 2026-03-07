'use client';

import { useAppStore } from '@/app/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';
import { ChevronRight, FileText, Check, AlertCircle } from 'lucide-react';

export function ContractStep() {
  const { 
    simulation,
    applicant,
    scoring,
    contract,
    setContract,
    setStep 
  } = useAppStore();

  const handleAccept = () => {
    setContract({ 
      accepted: true, 
      date: new Date().toISOString(),
      reference: `EQD-${Date.now().toString(36).toUpperCase()}`,
      terms: {
        amount: simulation.amount,
        duration: simulation.duration,
        monthlyPayment: simulation.monthlyPayment,
        totalCost: simulation.monthlyPayment * simulation.duration,
        interestRate: 4.9,
        insurance: simulation.amount * 0.002,
      }
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      maximumFractionDigits: 0,
    }).format(amount);
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
          Votre contrat
        </h1>
        <p className="text-lg text-[#86868B]">
          Vérifiez les conditions avant de signer
        </p>
      </div>

      <Tabs defaultValue="summary" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 bg-[#F5F5F7] p-1 rounded-2xl">
          <TabsTrigger 
            value="summary" 
            className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Récapitulatif
          </TabsTrigger>
          <TabsTrigger 
            value="contract"
            className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Contrat complet
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <Card className="border-[#E8E8ED]">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-3 pb-6 border-b border-[#E8E8ED]">
                <div className="w-12 h-12 bg-[#AB0017]/10 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#AB0017]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1D1D1F]">Demande de crédit</h3>
                  <p className="text-sm text-[#86868B]">Réf: {contract.reference || 'En attente'}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: 'Montant', value: formatAmount(simulation.amount) },
                  { label: 'Durée', value: `${simulation.duration} mois` },
                  { label: 'Mensualité', value: formatAmount(simulation.monthlyPayment) },
                  { label: 'TAEG', value: '4,9%' },
                  { label: 'Frais de dossier', value: '0 DH' },
                  { label: 'Assurance/mois', value: formatAmount(simulation.amount * 0.002) },
                ].map((item) => (
                  <div key={item.label} className="bg-[#F5F5F7] rounded-xl p-4">
                    <p className="text-sm text-[#86868B] mb-1">{item.label}</p>
                    <p className="text-lg font-semibold text-[#1D1D1F]">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#0F1823] rounded-2xl p-6 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-[#838792]">Coût total du crédit</p>
                    <p className="text-3xl font-bold">
                      {formatAmount(simulation.monthlyPayment * simulation.duration)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#838792]">Intérêts</p>
                    <p className="text-xl font-semibold">
                      {formatAmount((simulation.monthlyPayment * simulation.duration) - simulation.amount)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contract">
          <Card className="border-[#E8E8ED]">
            <CardContent className="p-6">
              <div className="prose prose-sm max-w-none text-[#86868B] space-y-4 max-h-96 overflow-y-auto pr-2">
                <h4 className="text-[#1D1D1F] font-semibold">CONTRAT DE CRÉDIT À LA CONSOMMATION</h4>
                
                <p>
                  Entre les soussignés :
                </p>
                
                <p>
                  La société EQDOM, SA au capital de 200.000.000 DH, dont le siège social est situé à Casablanca,
                  immatriculée au registre de commerce sous le numéro 123456, représentée par son Directeur Général,
                  ci-après dénommée « le Prêteur »,
                </p>
                
                <p>Et</p>
                
                <p>
                  {applicant.firstName} {applicant.lastName}, né(e) le {applicant.birthDate},
                  titulaire de la CIN N° {applicant.idNumber},
                  demeurant à {applicant.address}, {applicant.city},
                  ci-après dénommé(e) « l'Emprunteur »,
                </p>
                
                <h5 className="text-[#1D1D1F] font-semibold mt-6">Article 1 : Objet du contrat</h5>
                
                <p>
                  Le Prêteur consent à l'Emprunteur un crédit à la consommation d'un montant de 
                  {formatAmount(simulation.amount)} pour une durée de {simulation.duration} mois.
                </p>
                
                <h5 className="text-[#1D1D1F] font-semibold mt-6">Article 2 : Conditions financières</h5>
                
                <ul className="list-disc pl-5 space-y-2">
                  <li>Montant du crédit : {formatAmount(simulation.amount)}</li>
                  <li>Durée : {simulation.duration} mois</li>
                  <li>Mensualité : {formatAmount(simulation.monthlyPayment)}</li>
                  <li>Taux Annuel Effectif Global (TAEG) : 4,9%</li>
                  <li>Coût total du crédit : {formatAmount(simulation.monthlyPayment * simulation.duration)}</li>
                </ul>
                
                <h5 className="text-[#1D1D1F] font-semibold mt-6">Article 3 : Remboursement</h5>
                
                <p>
                  L'Emprunteur s'engage à rembourser le crédit selon l'échéancier joint au présent contrat,
                  par prélèvement automatique sur le compte bancaire dont les coordonnées ont été fournies.
                </p>
                
                <h5 className="text-[#1D1D1F] font-semibold mt-6">Article 4 : Assurance</h5>
                
                <p>
                  L'Emprunteur souscrit à l'assurance décès-invalidité proposée par le Prêteur,
                  au tarif de {formatAmount(simulation.amount * 0.002)} par mois.
                </p>
                
                <h5 className="text-[#1D1D1F] font-semibold mt-6">Article 5 : Droit de rétractation</h5>
                
                <p>
                  L'Emprunteur dispose d'un délai de 14 jours calendaires à compter de la signature du contrat
                  pour exercer son droit de rétractation, sans pénalité ni justification.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Accept Checkbox */}
      <div className="mb-8">
        <Card className={`border-[#E8E8ED] ${contract.accepted ? 'border-[#16A34A]/50 bg-[#16A34A]/5' : ''}`}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Checkbox
                id="acceptContract"
                checked={contract.accepted}
                onCheckedChange={handleAccept}
                className="mt-1"
              />
              
              <label htmlFor="acceptContract" className="flex-1 cursor-pointer">
                <p className="text-[#1D1D1F] font-medium mb-1">
                  J'accepte les conditions du contrat
                </p>
                <p className="text-sm text-[#86868B]">
                  J'ai lu et compris les conditions du crédit. Je reconnais avoir reçu une copie de ce contrat
                  et des informations précontractuelles.
                </p>
              </label>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Continue */}
      <div className="flex justify-end">
        <Button
          onClick={() => setStep('signature')}
          disabled={!contract.accepted}
          size="lg"
          className="bg-[#AB0017] hover:bg-[#8A0012] disabled:bg-[#E8E8ED] disabled:text-[#86868B] text-white rounded-full px-8 py-6 text-base font-medium shadow-lg shadow-[#AB0017]/25 transition-all duration-300 group"
        >
          Signer électroniquement
          <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
}
