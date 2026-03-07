'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function HeroSection({ onEnter }: { onEnter: () => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-8"
      >
        <div className="absolute inset-0 bg-[#AB0017] blur-[60px] opacity-40 animate-pulse-glow rounded-full" />
        <div className="relative w-40 h-16">
          <Image
            src="/eqdom-logo.png"
            alt="Eqdom"
            fill
            className="object-contain brightness-0 invert"
            priority
          />
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-6"
      >
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
          Votre crédit,
          <br />
          <span className="text-[#AB0017] text-glow">
            réinventé.
          </span>
        </h1>
        
        <p className="text-xl text-[#888888] max-w-md mx-auto">
          Une expérience immersive. Une minute. Zéro friction.
        </p>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          ref={buttonRef}
          onClick={onEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
          className="relative group px-12 py-5 bg-[#AB0017] text-white text-lg font-medium rounded-full 
                     transition-all duration-300 hover:bg-[#FF1A3E] glow-eqdom magnetic"
        >
          <span className="relative z-10">Entrer</span>
          <div className="absolute inset-0 rounded-full bg-[#AB0017] blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
        </button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-sm text-[#888888]">Descendez pour commencer</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-[#555555] rounded-full flex justify-center pt-2"
        >
          <motion.div 
            animate={{ opacity: [0.3, 1, 0.3], y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-[#AB0017] rounded-full"
          />
        </motion.div>
      </motion.div>

      {/* Corner Decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-[#AB0017]/30" />
      <div className="absolute top-10 right-10 w-20 h-20 border-r-2 border-t-2 border-[#AB0017]/30" />
      <div className="absolute bottom-10 left-10 w-20 h-20 border-l-2 border-b-2 border-[#AB0017]/30" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-[#AB0017]/30" />
    </section>
  );
}
