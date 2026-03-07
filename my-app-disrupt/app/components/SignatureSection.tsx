'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/app/store';
import { Pen, Check, Sparkles } from 'lucide-react';

export function SignatureSection() {
  const { simulation, acceptContract, setSection } = useAppStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#AB0017';
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setIsDrawing(true);
    setHasSignature(true);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleSign = () => {
    if (!hasSignature) return;
    
    setSigned(true);
    acceptContract();
    
    setTimeout(() => {
      setSection('confirmation');
    }, 2000);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4">
      <AnimatePresence mode="wait">
        {!signed ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-2xl w-full"
          >
            <div className="text-center mb-8">
              <p className="text-[#AB0017] text-sm font-medium tracking-wider uppercase mb-2">Signature</p>
              <h2 className="text-4xl font-bold text-white mb-2">Validez votre engagement</h2>
              <p className="text-[#888888]">Signez pour finaliser votre demande de {formatAmount(simulation.amount)}</p>
            </div>

            {/* Contract Preview */}
            <div className="glass rounded-2xl p-6 mb-6">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
                <span className="text-[#888888]">Montant</span>
                <span className="text-white font-bold">{formatAmount(simulation.amount)}</span>
              </div>
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
                <span className="text-[#888888]">Mensualité</span>
                <span className="text-white font-bold">{formatAmount(simulation.monthlyPayment)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#888888]">TAEG</span>
                <span className="text-white font-bold">4.9%</span>
              </div>
            </div>

            {/* Signature Pad */}
            <div className="glass rounded-2xl p-1 mb-6">
              <div className="relative bg-black/50 rounded-xl overflow-hidden">
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
                    <div className="text-center">
                      <Pen className="w-8 h-8 text-[#555555] mx-auto mb-2" />
                      <p className="text-[#555555]">Signez ici</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={clearSignature}
                className="flex-1 py-3 border border-white/20 text-white rounded-xl 
                           hover:bg-white/5 transition-all"
              >
                Effacer
              </button>
              
              <button
                onClick={handleSign}
                disabled={!hasSignature}
                className="flex-[2] py-3 bg-[#AB0017] text-white rounded-xl font-medium
                           hover:bg-[#FF1A3E] transition-all disabled:opacity-30 disabled:cursor-not-allowed
                           glow-eqdom-sm"
              >
                Valider la signature
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-24 h-24 rounded-full bg-[#00FF88] flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-12 h-12 text-black" />
            </motion.div>
            
            <h2 className="text-4xl font-bold text-white mb-2">Signé !</h2>
            <p className="text-[#888888]">Préparation de votre confirmation...</p>

            {/* Confetti particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 1, 
                  x: 0, 
                  y: 0,
                  scale: 0 
                }}
                animate={{ 
                  opacity: 0, 
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400 - 200,
                  scale: Math.random() * 2 + 1,
                  rotate: Math.random() * 360
                }}
                transition={{ duration: 1.5, delay: i * 0.05 }}
                className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full"
                style={{ 
                  backgroundColor: ['#AB0017', '#FFB800', '#00FF88'][i % 3],
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
