import React, { useState, useEffect } from "react";
import { ChevronUp } from "./HandDrawnIcons";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function BackToTop() {
  const { localize } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      
      // Dynamic fallback for hero height
      const heroSection = document.getElementById("hero-section");
      const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;

      // Make button visible past 80% of Hero Section height
      if (currentScroll > heroHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate scroll progress percentage (capped at 100)
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (currentScroll / scrollHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger initial calculation
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    // If Lenis is integrated into window, use its smooth scroll engine, else standard smooth scroll
    const lenisInstance = (window as any).lenis;
    if (lenisInstance) {
      lenisInstance.scrollTo(0, {
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // match premium curve
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // Circular progress SVG dimension definitions
  const radius = 22;
  const strokeWidth = 3.5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-3"
        >
          {/* Localized Floating Information Tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 15, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 15, scale: 0.9 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="hidden md:block bg-[#0f2e1e] text-[#f4d068] text-xs font-mono font-bold tracking-wider uppercase px-3 py-1.5 rounded-lg border border-[#f4d068]/30 shadow-xl pointer-events-none"
              >
                {localize({
                  en: "Back to Top",
                  hi: "ऊपर वापस जाएं",
                  gu: "ઉપર પાછા જાઓ"
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Circle Button */}
          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Back to Top"
            className="relative w-14 h-14 rounded-full bg-[#0f2e1e] hover:bg-[#1d432b] text-[#f4d068] flex items-center justify-center transition-all duration-300 shadow-[0_10px_30px_rgba(15,46,30,0.3)] hover:shadow-[0_15px_35px_rgba(244,208,104,0.25)] hover:scale-105 active:scale-95 group focus:outline-none border border-white/10"
          >
            {/* SVG Background and Scroll Progress Radial Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none select-none">
              {/* Dull background ring track representing physical depth */}
              <circle
                cx="28"
                cy="28"
                r={radius}
                fill="none"
                stroke="rgba(143, 168, 155, 0.15)"
                strokeWidth={strokeWidth}
              />
              {/* Bright progress fill track */}
              <circle
                cx="28"
                cy="28"
                r={radius}
                fill="none"
                stroke="#f4d068"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-100 ease-out"
              />
            </svg>

            {/* Micro-animating upward arrow */}
            <ChevronUp
              size={22}
              className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1 group-active:translate-y-0.5 stroke-[2.5]"
            />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
