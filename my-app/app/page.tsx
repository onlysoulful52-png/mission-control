'use client';

import { useAppStore } from '@/app/store';
import { AppHeader } from '@/app/components/AppHeader';
import { StepperWizard } from '@/app/components/StepperWizard';
import { LandingPage } from '@/app/components/LandingPage';
import { SimulationStep } from '@/app/components/SimulationStep';
import { DataStep } from '@/app/components/DataStep';
import { ScoringStep } from '@/app/components/ScoringStep';
import { DocumentsStep } from '@/app/components/DocumentsStep';
import { ContractStep } from '@/app/components/ContractStep';
import { SignatureStep } from '@/app/components/SignatureStep';
import { ConfirmationStep } from '@/app/components/ConfirmationStep';
import { Toaster } from '@/components/ui/sonner';

export default function Home() {
  const { currentStep } = useAppStore();

  const renderStep = () => {
    switch (currentStep) {
      case 'landing':
        return <LandingPage />;
      case 'simulation':
        return <SimulationStep />;
      case 'donnees':
        return <DataStep />;
      case 'scoring':
        return <ScoringStep />;
      case 'justifs':
        return <DocumentsStep />;
      case 'contrat':
        return <ContractStep />;
      case 'signature':
        return <SignatureStep />;
      case 'suivi':
        return <ConfirmationStep />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <AppHeader />
      <StepperWizard />
      
      <div className={currentStep === 'landing' ? '' : 'pt-32'}>
        {renderStep()}
      </div>

      <Toaster />
    </main>
  );
}
