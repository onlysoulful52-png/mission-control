'use client';

import { useAppStore } from '@/app/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { ChevronRight, Upload, Check, FileText, AlertTriangle, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export function DocumentsStep() {
  const { 
    documents, 
    updateDocumentStatus,
    setStep 
  } = useAppStore();

  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const handleUpload = (docId: string) => {
    setUploadingId(docId);
    setTimeout(() => {
      updateDocumentStatus(docId, 'uploaded', `document_${docId}.pdf`);
      setUploadingId(null);
    }, 1500);
  };

  const handleSimulateUnreadable = (docId: string) => {
    updateDocumentStatus(docId, 'rejected', `document_${docId}_flou.pdf`);
  };

  const allUploaded = documents.every(d => d.status === 'uploaded' || d.status === 'verified');
  const progress = Math.round((documents.filter(d => d.status === 'uploaded' || d.status === 'verified').length / documents.length) * 100);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
      case 'uploaded':
        return <div className="w-8 h-8 bg-[#16A34A]/10 rounded-full flex items-center justify-center">
          <Check className="w-4 h-4 text-[#16A34A]" />
        </div>;
      case 'rejected':
        return <div className="w-8 h-8 bg-[#DC2626]/10 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
        </div>;
      default:
        return <div className="w-8 h-8 bg-[#F5F5F7] rounded-full flex items-center justify-center">
          <FileText className="w-4 h-4 text-[#86868B]" />
        </div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-2xl mx-auto px-4 py-8"
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-semibold text-[#1D1D1F] mb-4">
          Vos documents
        </h1>
        <p className="text-lg text-[#86868B]">
          Téléchargez les justificatifs demandés
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-[#86868B]">Progression</span>
          <span className="font-medium text-[#1D1D1F]">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Document List */}
      <div className="space-y-4 mb-8">
        {documents.map((doc, index) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`border-[#E8E8ED] ${
              doc.status === 'rejected' ? 'border-[#DC2626]/50 bg-[#DC2626]/5' : ''
            }`}>
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  {getStatusIcon(doc.status)}
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-[#1D1D1F]">{doc.name}</h3>
                    
                    {doc.status === 'uploaded' && doc.fileName && (
                      <p className="text-sm text-[#16A34A]">{doc.fileName}</p>
                    )}
                    
                    {doc.status === 'rejected' && (
                      <p className="text-sm text-[#DC2626]">
                        Document illisible. Veuillez réessayer.
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {doc.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSimulateUnreadable(doc.id)}
                          className="rounded-xl text-xs"
                        >
                          Simuler illisible
                        </Button>
                        
                        <Button
                          size="sm"
                          onClick={() => handleUpload(doc.id)}
                          disabled={uploadingId === doc.id}
                          className="bg-[#AB0017] hover:bg-[#8A0012] rounded-xl"
                        >
                          {uploadingId === doc.id ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <span className="flex items-center">
                              <Upload className="w-4 h-4 mr-1" />
                              <span className="hidden sm:inline">Télécharger</span>
                            </span>
                          )}
                        </Button>
                      </div>
                    )}
                    
                    {doc.status === 'rejected' && (
                      <Button
                        size="sm"
                        onClick={() => handleUpload(doc.id)}
                        className="bg-[#AB0017] hover:bg-[#8A0012] rounded-xl"
                      >
                        <RefreshCw className="w-4 h-4 mr-1" />
                        Réessayer
                      </Button>
                    )}
                    
                    {(doc.status === 'uploaded' || doc.status === 'verified') && (
                      <span className="text-sm text-[#16A34A] font-medium">
                        Reçu ✓
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Continue */}
      <div className="flex justify-end">
        <Button
          onClick={() => setStep('contrat')}
          disabled={!allUploaded}
          size="lg"
          className="bg-[#AB0017] hover:bg-[#8A0012] disabled:bg-[#E8E8ED] disabled:text-[#86868B] text-white rounded-full px-8 py-6 text-base font-medium shadow-lg shadow-[#AB0017]/25 transition-all duration-300 group"
        >
          Continuer
          <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
}
