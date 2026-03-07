'use client';

import { useAppStore } from '@/app/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { ChevronRight, Shield, Check, PenLine } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function SignatureStep() {
  const { 
    signature,
    verifySignatureOtp,
    setSignature,
    setStep 
  } = useAppStore();

  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#1D1D1F';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
        const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
        ctx.beginPath();
        ctx.moveTo(x, y);
      }
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
        const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
        ctx.lineTo(x, y);
        ctx.stroke();
        setHasSignature(true);
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setHasSignature(false);
      }
    }
  };

  const handleVerifyOtp = () => {
    if (verifySignatureOtp(otpCode)) {
      setOtpError('');
    } else {
      setOtpError('Code incorrect. Essayez 654321 pour la démo.');
    }
  };

  const handleSign = () => {
    if (hasSignature && signature.otpVerified) {
      setSignature({ 
        signed: true, 
        date: new Date().toISOString() 
      });
      setTimeout(() => {
        setStep('suivi');
      }, 1000);
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
          Signature électronique
        </h1>
        <p className="text-lg text-[#86868B]">
          Sécurisez votre engagement par OTP et signature
        </p>
      </div>

      {/* OTP Verification */}
      <Card className="mb-6 border-[#E8E8ED]">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#AB0017]/10 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#AB0017]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#1D1D1F]">Vérification OTP</h3>
              <p className="text-sm text-[#86868B]">Code de démo: 654321</p>
            </div>
          </div>

          {!signature.otpVerified ? (
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Code OTP (6 chiffres)"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  maxLength={6}
                  className="flex-1 text-center tracking-widest text-lg"
                />
                <Button 
                  onClick={handleVerifyOtp}
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
              <span className="font-medium">OTP vérifié</span>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Signature Pad */}
      <Card className="mb-8 border-[#E8E8ED]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0F1823]/10 rounded-xl flex items-center justify-center">
                <PenLine className="w-5 h-5 text-[#0F1823]" />
              </div>
              <h3 className="font-semibold text-[#1D1D1F]">Votre signature</h3>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSignature}
              className="text-[#86868B]"
            >
              Effacer
            </Button>
          </div>

          <div className="relative border-2 border-dashed border-[#E8E8ED] rounded-2xl bg-[#F5F5F7] overflow-hidden">
            <canvas
              ref={canvasRef}
              width={600}
              height={200}
              className="w-full h-48 cursor-crosshair touch-none"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
            
            {!hasSignature && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-[#86868B]">Signez ici</p>
              </div>
            )}
          </div>

          <p className="text-sm text-[#86868B] mt-3">
            En signant, vous acceptez les conditions du contrat de crédit.
          </p>
        </CardContent>
      </Card>

      {/* Sign Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSign}
          disabled={!hasSignature || !signature.otpVerified}
          size="lg"
          className="bg-[#AB0017] hover:bg-[#8A0012] disabled:bg-[#E8E8ED] disabled:text-[#86868B] text-white rounded-full px-8 py-6 text-base font-medium shadow-lg shadow-[#AB0017]/25 transition-all duration-300 group"
        >
          {signature.signed ? (
            <>
              <Check className="mr-2 w-5 h-5" />
              Signé !
            </>
          ) : (
            <>
              Valider la signature
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
