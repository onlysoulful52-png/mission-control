'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/app/store';
import { Scan, Check, User, Mail, Phone, CreditCard } from 'lucide-react';

export function IdentitySection() {
  const { identity, scanIdentity, setSection } = useAppStore();
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      scanIdentity();
      setTimeout(() => {
        setScanning(false);
      }, 500);
    }, 2000);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[#AB0017] text-sm font-medium tracking-wider uppercase mb-2">Identité</p>
          <h2 className="text-4xl font-bold text-white">Qui êtes-vous ?</h2>
        </motion.div>

        {!identity.scanned ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-80 h-96 mx-auto"
          >
            {/* Scanner Frame */}
            <div className="absolute inset-0 border-2 border-[#AB0017]/30 rounded-3xl">
              {/* Corner Markers */}
              <div className="absolute -top-1 -left-1 w-8 h-8 border-l-4 border-t-4 border-[#AB0017]" />
              <div className="absolute -top-1 -right-1 w-8 h-8 border-r-4 border-t-4 border-[#AB0017]" />
              <div className="absolute -bottom-1 -left-1 w-8 h-8 border-l-4 border-b-4 border-[#AB0017]" />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 border-r-4 border-b-4 border-[#AB0017]" />

              {/* Scan Line */}
              {scanning && (
                <motion.div
                  initial={{ top: '0%' }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#AB0017] to-transparent shadow-[0_0_10px_#AB0017]"
                />
              )}

              {/* Content */}
              <div className="absolute inset-4 flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  {scanning ? (
                    <motion.div
                      key="scanning"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <Scan className="w-16 h-16 text-[#AB0017] mx-auto mb-4 animate-pulse" />
                      <p className="text-white font-medium">Scan en cours...</p>
                      <div className="mt-4 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 2 }}
                          className="h-full bg-[#AB0017]"
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <div className="w-24 h-24 rounded-full bg-[#AB0017]/10 flex items-center justify-center mb-6 mx-auto">
                        <User className="w-12 h-12 text-[#AB0017]" />
                      </div>
                      <p className="text-[#888888] mb-6">Scannez votre identité</p>
                      
                      <button
                        onClick={handleScan}
                        className="px-8 py-3 bg-[#AB0017] text-white rounded-full font-medium 
                                   hover:bg-[#FF1A3E] transition-all duration-300 glow-eqdom-sm"
                      >
                        Scanner
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-md mx-auto space-y-4"
          >
            {[
              { icon: User, label: 'Nom', value: `${identity.firstName} ${identity.lastName}` },
              { icon: Mail, label: 'Email', value: identity.email },
              { icon: Phone, label: 'Téléphone', value: identity.phone },
              { icon: CreditCard, label: 'ID', value: identity.idNumber },
            ].map((field, index) => (
              <motion.div
                key={field.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-[#AB0017]/10 flex items-center justify-center">
                  <field.icon className="w-5 h-5 text-[#AB0017]" />
                </div>
                <div className="flex-1">
                  <p className="text-[#555555] text-xs uppercase">{field.label}</p>
                  <p className="text-white font-mono">{field.value}</p>
                </div>
                <Check className="w-5 h-5 text-[#00FF88]" />
              </motion.div>
            ))}

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => setSection('scoring')}
              className="w-full mt-8 py-4 bg-[#00FF88] text-black font-medium rounded-xl 
                         hover:bg-[#00FFaa] transition-all duration-300"
            >
              Continuer →
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
