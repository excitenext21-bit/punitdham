import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Wheat } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const { localize } = useLanguage();

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 1500; // Snappy 1.5 seconds loading

    const animateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const calculatedProgress = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(calculatedProgress);

      if (elapsed < duration) {
        requestAnimationFrame(animateProgress);
      } else {
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    };

    requestAnimationFrame(animateProgress);
  }, [onComplete]);

  return (
    <motion.div
      id="site-preloader"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#06140e] text-white select-none"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.02,
        transition: { duration: 0.5, ease: "easeInOut" } 
      }}
    >
      {/* Subtle Background Glow */}
      <div className="absolute w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center space-y-6">
        
        {/* Breathing Icon */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-20 h-20 rounded-full bg-[#f4d068]/10 border border-[#f4d068]/20 flex items-center justify-center text-[#f4d068] shadow-lg shadow-[#f4d068]/5"
        >
          <Wheat className="w-10 h-10" />
        </motion.div>

        {/* Brand Typography */}
        <div className="space-y-1.5">
          <h1 className="font-serif text-3xl sm:text-4xl font-black tracking-[0.2em] text-white">
            PUNITDHAN
          </h1>
          <p className="font-sans text-[10px] sm:text-xs tracking-[0.4em] text-[#f4d068] uppercase font-bold">
            {localize({ en: "Pulses & Grains Limited", hi: "दालें एवं खाद्यान्न लिमिटेड", gu: "દાળ અને અનાજ લિમિટેડ" })}
          </p>
        </div>

        {/* Minimal Progress Bar & Percentage */}
        <div className="w-48 space-y-3">
          <div className="h-[2px] bg-white/10 rounded-full overflow-hidden relative">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#f4d068] to-emerald-400 rounded-full absolute left-0 top-0"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 font-bold tracking-wider">
            <span>{localize({ en: "NOURISHING NATION", hi: "राष्ट्र का पोषण", gu: "રાષ્ટ્રનું પોષણ" })}</span>
            <span className="text-[#f4d068]">{progress}%</span>
          </div>
        </div>

        {/* Mini established tag */}
        <span className="text-[9px] font-mono text-zinc-500 tracking-[0.15em] uppercase pt-4">
          {localize({ en: "ESTD. 1988 • ISO 9001:2015 REGISTERED", hi: "स्थापना १९८८ • आईएसओ ९००१:२०१५ पंजीकृत", gu: "સ્થાપના ૧૯૮૮ • ISO 9001:2015 રજિસ્ટર્ડ" })}
        </span>

      </div>
    </motion.div>
  );
}
