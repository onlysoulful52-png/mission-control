'use client';

import { useAppStore } from '@/app/store';
import { Button } from '@/components/ui/button';
import { HelpCircle, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function AppHeader() {
  const { reset, currentStep } = useAppStore();

  const showRestart = currentStep !== 'landing' && currentStep !== 'suivi';

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-[#E8E8ED]/50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-28 h-10">
              <Image
                src="/eqdom-logo.png"
                alt="Eqdom"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
            <span className="hidden sm:block text-xs text-[#86868B] font-medium tracking-wide">
              Crédit en ligne
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-full px-4"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Aide</span>
            </Button>

            {showRestart && (
              <Button
                variant="ghost"
                size="sm"
                onClick={reset}
                className="text-[#86868B] hover:text-[#AB0017] hover:bg-[#FFF0F2] rounded-full px-4"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Recommencer</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
