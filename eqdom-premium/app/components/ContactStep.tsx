'use client';

import { useAppStore } from '@/app/store';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export function ContactStep() {
  const { contact, setContact, setStep } = useAppStore();
  const [errors, setErrors] = useState<string[]>([]);

  const validate = () => {
    const errs: string[] = [];
    if (!contact.firstName) errs.push('Prénom requis');
    if (!contact.lastName) errs.push('Nom requis');
    if (!contact.phone || contact.phone.length < 10) errs.push('Téléphone invalide');
    if (!contact.consents[0] || !contact.consents[1] || !contact.consents[2]) {
      errs.push('Vous devez accepter les conditions');
    }
    setErrors(errs);
    return errs.length === 0;
  };

  const handleContinue = () => {
    if (validate()) setStep('documents');
  };

  const toggleConsent = (idx: number) => {
    const newConsents = [...contact.consents];
    newConsents[idx] = !newConsents[idx];
    setContact({ consents: newConsents });
  };

  return (
    <div className="min-h-screen bg-[#0F1823] py-20 px-4">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1A2433] rounded-2xl p-8 border border-white/10"
        >
          <button
            onClick={() => setStep('simulation')}
            className="text-[#86868B] hover:text-white flex items-center gap-2 mb-6"
          >
            <ChevronLeft className="w-4 h-4" /> Retour
          </button>

          <h2 className="text-3xl font-bold text-white mb-2">Vos coordonnées</h2>
          <p className="text-[#86868B] mb-8">Nous avons besoin de ces informations pour finaliser votre dossier.</p>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[#86868B] text-sm mb-2 block">Prénom *</label>
                <input
                  type="text"
                  value={contact.firstName}
                  onChange={(e) => setContact({ firstName: e.target.value })}
                  className="w-full bg-[#0F1823] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#AB0017] focus:outline-none"
                  placeholder="Sarah"
                />
              </div>
              <div>
                <label className="text-[#86868B] text-sm mb-2 block">Nom *</label>
                <input
                  type="text"
                  value={contact.lastName}
                  onChange={(e) => setContact({ lastName: e.target.value })}
                  className="w-full bg-[#0F1823] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#AB0017] focus:outline-none"
                  placeholder="Benali"
                />
              </div>
            </div>

            <div>
              <label className="text-[#86868B] text-sm mb-2 block">Téléphone *</label>
              <input
                type="tel"
                value={contact.phone}
                onChange={(e) => setContact({ phone: e.target.value })}
                className="w-full bg-[#0F1823] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#AB0017] focus:outline-none"
                placeholder="06 XX XX XX XX"
              />
            </div>

            <div>
              <label className="text-[#86868B] text-sm mb-2 block">Email (optionnel)</label>
              <input
                type="email"
                value={contact.email}
                onChange={(e) => setContact({ email: e.target.value })}
                className="w-full bg-[#0F1823] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#AB0017] focus:outline-none"
                placeholder="sarah@email.com"
              />
            </div>

            <div className="bg-[#0F1823] rounded-xl p-6 border border-white/10 space-y-4">
              <h3 className="text-white font-medium flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#AB0017]" />
                Consentements obligatoires
              </h3>

              {[
                "J'accepte la vérification de mon identité et la consultation du Bureau de Crédit.",
                "J'accepte le traitement de mes données personnelles dans le cadre de ma demande.",
                "J'accepte de recevoir des informations sur les produits du groupe Saham.",
              ].map((text, idx) => (
                <label key={idx} className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={contact.consents[idx]}
                    onChange={() => toggleConsent(idx)}
                    className="mt-1 w-5 h-5 rounded border-white/20 bg-[#0F1823] text-[#AB0017] focus:ring-[#AB0017]"
                  />
                  <span className="text-[#86868B] text-sm">{text}</span>
                </label>
              ))}
            </div>

            {errors.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
                {errors.map((e, i) => <div key={i}>{e}</div>)}
              </div>
            )}

            <button
              onClick={handleContinue}
              className="w-full bg-[#AB0017] hover:bg-[#8A0012] text-white py-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              Continuer vers les documents
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
