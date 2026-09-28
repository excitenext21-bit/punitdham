import React from "react";
import { motion } from "motion/react";

// Curated SVG Line-Art Elements
const ElegantWheatStem = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 240"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Sleek organic stem curved gracefully */}
    <path d="M 50 230 C 50 170, 48 110, 52 10" />
    
    {/* Seed casings and awns (whisps) left side */}
    <g>
      {/* Seed 1 */}
      <path d="M 50 185 C 38 175, 30 180, 26 195 C 32 195, 42 190, 50 185" />
      <path d="M 26 195 Q 12 185, 4 182" /> {/* Whisker */}
      
      {/* Seed 2 */}
      <path d="M 50 155 C 36 145, 28 148, 24 163 C 30 164, 40 160, 50 155" />
      <path d="M 24 163 Q 10 150, 2 146" />
      
      {/* Seed 3 */}
      <path d="M 50 125 C 35 115, 26 118, 22 133 C 28 134, 38 130, 50 125" />
      <path d="M 22 133 Q 8 120, 0 115" />
      
      {/* Seed 4 */}
      <path d="M 51 95 C 36 85, 27 88, 23 103 C 29 104, 39 100, 51 95" />
      <path d="M 23 103 Q 9 90, 3 83" />

      {/* Seed 5 */}
      <path d="M 51 65 C 37 55, 29 58, 25 73 C 31 74, 40 70, 51 65" />
      <path d="M 25 73 Q 12 58, 6 51" />

      {/* Seed 6 */}
      <path d="M 52 35 C 40 25, 32 28, 28 43 C 34 44, 42 40, 52 35" />
      <path d="M 28 43 Q 16 28, 12 21" />
    </g>

    {/* Seed casings and awns right side */}
    <g>
      {/* Seed 1 */}
      <path d="M 50 185 C 62 175, 70 180, 74 195 C 68 195, 58 190, 50 185" />
      <path d="M 74 195 Q 88 185, 96 182" />
      
      {/* Seed 2 */}
      <path d="M 50 155 C 64 145, 72 148, 76 163 C 70 164, 60 160, 50 155" />
      <path d="M 76 163 Q 90 150, 98 146" />
      
      {/* Seed 3 */}
      <path d="M 50 125 C 65 115, 74 118, 78 133 C 72 134, 62 130, 50 125" />
      <path d="M 78 133 Q 92 120, 100 115" />
      
      {/* Seed 4 */}
      <path d="M 51 95 C 64 85, 73 88, 77 103 C 71 104, 61 100, 51 95" />
      <path d="M 77 103 Q 91 90, 97 83" />

      {/* Seed 5 */}
      <path d="M 51 65 C 63 55, 71 58, 75 73 C 69 74, 60 70, 51 65" />
      <path d="M 75 73 Q 88 58, 94 51" />

      {/* Seed 6 */}
      <path d="M 52 35 C 60 25, 68 28, 72 43 C 66 44, 58 40, 52 35" />
      <path d="M 72 43 Q 84 28, 88 21" />
    </g>

    {/* Topmost kernels */}
    <path d="M 52 10 C 46 -3, 38 -5, 34 8 Q 44 8, 52 10" />
    <path d="M 34 8 Q 24 -10, 20 -15" />
    
    <path d="M 52 10 C 58 -3, 66 -5, 70 8 Q 60 8, 52 10" />
    <path d="M 70 8 Q 80 -10, 84 -15" />
  </svg>
);

const DelicateFoliage = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 120 200"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
  >
    <path d="M 20 190 Q 60 140, 70 20" />
    {/* Curved minimalist organic branches */}
    <path d="M 40 142 Q 15 125, 5 130" strokeDasharray="3 3" />
    <path d="M 48 115 Q 18 90, 10 93" />
    <path d="M 56 85 Q 25 55, 18 58" />
    
    <path d="M 46 130 Q 80 115, 95 120" />
    <path d="M 54 100 Q 92 85, 105 88" strokeDasharray="3 3" />
    <path d="M 62 70 Q 100 50, 110 52" />
  </svg>
);

const MinimalPulsingGrid = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 200 200"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="0.75"
  >
    {/* Grid of micro-dots */}
    {Array.from({ length: 5 }).map((_, i) =>
      Array.from({ length: 5 }).map((_, j) => (
        <circle
          key={`${i}-${j}`}
          cx={40 + i * 30}
          cy={40 + j * 30}
          r="1"
          className="fill-current opacity-30"
        />
      ))
    )}
    <circle cx="100" cy="100" r="75" strokeDasharray="4 8" className="opacity-40 animate-[spin_60s_linear_infinite]" />
    <circle cx="100" cy="100" r="45" className="opacity-25" />
    <circle cx="100" cy="100" r="15" strokeDasharray="1 3" className="opacity-50" />
  </svg>
);

export default function BackgroundElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden select-none">
      {/* 1. Ambient Slow Floating Wheat (Top Left) */}
      <motion.div
        animate={{
          x: [0, 25, -15, 0],
          y: [0, -35, 20, 0],
          rotate: [0, 4, -4, 0],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[8%] -left-12 sm:left-[3%] w-48 sm:w-72 h-auto text-[#2c5e3f]/[0.035] md:text-[#2c5e3f]/[0.055] transition-colors duration-500"
      >
        <ElegantWheatStem />
      </motion.div>

      {/* 2. Floating Foliage branch (Mid Right) */}
      <motion.div
        animate={{
          x: [0, -30, 15, 0],
          y: [0, 40, -25, 0],
          rotate: [12, 17, 8, 12],
        }}
        transition={{
          duration: 38,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[35%] -right-16 sm:right-[2%] w-56 sm:w-80 h-auto text-[#d4af37]/[0.03] md:text-[#d4af37]/[0.05] transition-colors duration-500"
      >
        <DelicateFoliage />
      </motion.div>

      {/* 3. Concentric Ripple Pulse 1 (Bottom Left) */}
      <div className="absolute -bottom-16 -left-16 w-96 h-96 pointer-events-none">
        <span className="absolute inset-0 rounded-full border border-[#2c5e3f]/[0.04] scale-[0.6] animate-[ping-slow_8s_infinite]" />
        <span className="absolute inset-0 rounded-full border border-dashed border-[#d4af37]/[0.025] scale-[0.8] animate-[spin-slow_120s_linear_infinite]" />
        <span className="absolute inset-0 rounded-full border border-[#2c5e3f]/[0.015] scale-[1] " />
      </div>

      {/* 4. Ambient Floating Grid & Rings (Mid-Left) */}
      <motion.div
        animate={{
          y: [0, 45, -30, 0],
          x: [0, 15, -10, 0],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[55%] left-[-4%] md:left-[5%] w-40 sm:w-60 text-zinc-400/[0.04] md:text-zinc-400/[0.07]"
      >
        <MinimalPulsingGrid />
      </motion.div>

      {/* 5. Delicate Floating Wheat Stalk (Far Bottom Right) */}
      <motion.div
        animate={{
          x: [0, -20, 25, 0],
          y: [0, -45, 15, 0],
          rotate: [-5, -2, -9, -5],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[5%] -right-10 sm:right-[4%] w-44 sm:w-64 h-auto text-[#2c5e3f]/[0.03] md:text-[#2c5e3f]/[0.05] transition-colors duration-500"
      >
        <ElegantWheatStem />
      </motion.div>

      {/* 6. Central slow drift wavy contour lines (very thin, representing winds) */}
      <div className="absolute top-[22%] left-[15%] w-[70%] h-40 opacity-[0.025] pointer-events-none overflow-visible">
        <svg viewBox="0 0 1000 200" fill="none" stroke="currentColor" className="text-[#2c5e3f] w-full h-full">
          <motion.path
            d="M 0 100 Q 250 50, 500 100 T 1000 100"
            strokeWidth="1"
            animate={{
              d: [
                "M 0 100 Q 250 50, 500 100 T 1000 100",
                "M 0 100 Q 250 150, 500 100 T 1000 100",
                "M 0 100 Q 250 50, 500 100 T 1000 100",
              ]
            }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.path
            d="M 0 120 Q 200 180, 450 120 T 1000 120"
            strokeWidth="0.75"
            strokeDasharray="4 4"
            animate={{
              d: [
                "M 0 120 Q 200 180, 450 120 T 1000 120",
                "M 0 120 Q 200 60, 450 120 T 1000 120",
                "M 0 120 Q 200 180, 450 120 T 1000 120",
              ]
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>

      {/* 7. Additional concentric ring top right */}
      <div className="absolute -top-24 -right-24 w-80 h-80 pointer-events-none">
        <span className="absolute inset-0 rounded-full border border-[#d4af37]/[0.035] scale-[0.5] animate-[ping-slow_12s_infinite]" />
        <span className="absolute inset-0 rounded-full border border-dotted border-[#2c5e3f]/[0.02] scale-[0.7] animate-[spin-slow_160s_linear_infinite]" />
      </div>
    </div>
  );
}
