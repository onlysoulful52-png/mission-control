'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/app/store';
import { FileText, Upload, Check, RefreshCw } from 'lucide-react';

export function DocumentsSection() {
  const { documents, uploadDocument, setSection } = useAppStore();
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const handleUpload = (docId: string) => {
    setUploadingId(docId);
    setTimeout(() => {
      uploadDocument(docId, `document_${docId}.pdf`);
      setUploadingId(null);
    }, 1500);
  };

  const allUploaded = documents.every((d) => d.status === 'uploaded');

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[#AB0017] text-sm font-medium tracking-wider uppercase mb-2">Documents</p>
          <h2 className="text-4xl font-bold text-white">Justificatifs</h2>
          <p className="text-[#888888] mt-2">Ils flottent en apesanteur...</p>
        </motion.div>

        {/* Documents Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {documents.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: 'spring' }}
              className="relative"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 1, 0, -1, 0],
                }}
                transition={{
                  duration: 4 + index,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className={`glass rounded-2xl p-6 border-2 transition-all duration-500 ${
                  doc.status === 'uploaded' 
                    ? 'border-[#00FF88] glow-success' 
                    : 'border-dashed border-[#AB0017]/30'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                    doc.status === 'uploaded' ? 'bg-[#00FF88]/10' : 'bg-[#AB0017]/10'
                  }`}>
                    {doc.status === 'uploaded' ? (
                      <Check className="w-8 h-8 text-[#00FF88]" />
                    ) : (
                      <FileText className="w-8 h-8 text-[#AB0017]" />
                    )}
                  </div>

                  <h3 className="text-white font-medium mb-2">{doc.name}</h3>

                  {doc.status === 'pending' ? (
                    <button
                      onClick={() => handleUpload(doc.id)}
                      disabled={uploadingId === doc.id}
                      className="flex items-center gap-2 px-4 py-2 bg-[#AB0017]/10 text-[#AB0017] 
                                 rounded-full text-sm hover:bg-[#AB0017] hover:text-white transition-all"
                    >
                      {uploadingId === doc.id ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Upload...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          Upload
                        </>
                      )}
                    </button>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-[#00FF88] text-sm"
                    >
                      {doc.fileName}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Continue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: allUploaded ? 1 : 0.3 }}
          className="text-center"
        >
          <button
            onClick={() => setSection('signature')}
            disabled={!allUploaded}
            className="px-12 py-4 bg-white text-black font-medium rounded-xl 
                       hover:bg-[#AB0017] hover:text-white transition-all duration-300
                       disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Signer le contrat →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
