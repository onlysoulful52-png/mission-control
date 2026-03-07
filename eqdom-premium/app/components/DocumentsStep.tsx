'use client';

import { useAppStore } from '@/app/store';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Upload, Check, FileText } from 'lucide-react';
import { useState } from 'react';

export function DocumentsStep() {
  const { documents, uploadDoc, setStep, generateRef } = useAppStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const uploadedCount = documents.filter((d) => d.status === 'uploaded').length;
  const totalCount = documents.length;
  const isComplete = uploadedCount === totalCount;

  const handleSubmit = () => {
    setIsSubmitting(true);
    generateRef();
    setTimeout(() => {
      setStep('waiting');
      setIsSubmitting(false);
    }, 1500);
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
            onClick={() => setStep('contact')}
            className="text-[#86868B] hover:text-white flex items-center gap-2 mb-6"
          >
            <ChevronLeft className="w-4 h-4" /> Retour
          </button>

          <h2 className="text-3xl font-bold text-white mb-2">Vos documents</h2>
          <p className="text-[#86868B] mb-2">Téléchargez les justificatifs demandés.</p>
          <div className="text-sm text-[#86868B] mb-8">
            {uploadedCount}/{totalCount} documents fournis
          </div>

          <div className="space-y-4 mb-8">
            {documents.map((doc, idx) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-[#0F1823] rounded-xl p-5 border ${
                  doc.status === 'uploaded' ? 'border-[#16A34A]/50' : 'border-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      doc.status === 'uploaded' ? 'bg-[#16A34A]/10' : 'bg-white/5'
                    }`}>
                      {doc.status === 'uploaded' ? (
                        <Check className="w-6 h-6 text-[#16A34A]" />
                      ) : (
                        <FileText className="w-6 h-6 text-[#86868B]" />
                      )}
                    </div>
                    <div>
                      <div className="text-white font-medium">{doc.name}</div>
                      <div className="text-sm text-[#86868B]">
                        {doc.status === 'uploaded' ? 'Document reçu' : 'En attente'}
                      </div>
                    </div>
                  </div>

                  {doc.status === 'pending' ? (
                    <button
                      onClick={() => uploadDoc(doc.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span className="hidden sm:inline">Télécharger</span>
                    </button>
                  ) : (
                    <span className="text-[#16A34A] text-sm font-medium">Reçu ✓</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleSubmit}
              disabled={!isComplete || isSubmitting}
              className="w-full bg-[#AB0017] hover:bg-[#8A0012] disabled:bg-white/10 disabled:text-[#86868B] text-white py-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>Traitement...</>
              ) : (
                <>
                  Soumettre ma demande
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>

            {!isComplete && (
              <button
                onClick={() => setStep('waiting')}
                className="text-[#86868B] hover:text-white text-sm py-2"
              >
                Sauvegarder et reprendre plus tard
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
