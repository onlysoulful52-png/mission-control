'use client';

import { useAppStore, Step } from '@/app/store';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Check, FileText, User, Calculator, Upload, FileCheck, PenLine, Flag } from 'lucide-react';

const steps: { id: Step; label: string; icon: typeof Calculator }[] = [
  { id: 'simulation', label: 'Simulation', icon: Calculator },
  { id: 'donnees', label: 'Données', icon: User },
  { id: 'scoring', label: 'Scoring', icon: FileText },
  { id: 'justifs', label: 'Documents', icon: Upload },
  { id: 'contrat', label: 'Contrat', icon: FileCheck },
  { id: 'signature', label: 'Signature', icon: PenLine },
  { id: 'suivi', label: 'Suivi', icon: Flag },
];

export function StepperWizard() {
  const { currentStep, timeline } = useAppStore();

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  // Hide on landing
  if (currentStep === 'landing') return null;

  return (
    <div className="w-full py-6 bg-white border-b border-[#E8E8ED]">
      <div className="max-w-4xl mx-auto px-4">
        {/* Desktop Stepper */}
        <div className="hidden md:flex items-center justify-between">
          {steps.slice(0, -1).map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const isPending = index > currentStepIndex;

            return (
              <div key={step.id} className="flex items-center">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.05 : 1,
                  }}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-300',
                    isCompleted && 'bg-[#16A34A]/10',
                    isCurrent && 'bg-[#AB0017]/10',
                    isPending && 'bg-[#F5F5F7]'
                  )}
                >
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300',
                      isCompleted && 'bg-[#16A34A] text-white',
                      isCurrent && 'bg-[#AB0017] text-white',
                      isPending && 'bg-[#E8E8ED] text-[#86868B]'
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <span
                    className={cn(
                      'text-sm font-medium transition-colors duration-300',
                      isCompleted && 'text-[#16A34A]',
                      isCurrent && 'text-[#AB0017]',
                      isPending && 'text-[#86868B]'
                    )}
                  >
                    {step.label}
                  </span>
                </motion.div>

                {index < steps.length - 2 && (
                  <div
                    className={cn(
                      'w-8 h-0.5 mx-2 transition-colors duration-300',
                      isCompleted ? 'bg-[#16A34A]' : 'bg-[#E8E8ED]'
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Stepper */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-[#1D1D1F]">
              {steps[currentStepIndex]?.label}
            </span>
            <span className="text-sm text-[#86868B]">
              Étape {currentStepIndex + 1} sur {steps.length - 1}
            </span>
          </div>
          <div className="h-1 bg-[#E8E8ED] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#AB0017] to-[#DC2626] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStepIndex + 1) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
