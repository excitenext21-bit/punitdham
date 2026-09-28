import React from "react";
import { CMSSection } from "../context/CMSContext";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

interface CustomSectionProps {
  section: CMSSection;
  key?: string;
}

export default function CustomSection({ section }: CustomSectionProps) {
  const { title, subtitle, content, buttonLabel, buttonLink, style } = section;
  const { typography, background, animation } = style;

  // Animation variants
  const getAnimationProps = () => {
    if (animation.type === "none") return {};
    
    const duration = animation.duration || 1.0;
    switch (animation.type) {
      case "fade":
        return {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          transition: { duration }
        };
      case "slide":
        return {
          initial: { opacity: 0, y: 50 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration, type: "spring", stiffness: 50 }
        };
      case "zoom":
        return {
          initial: { opacity: 0, scale: 0.9 },
          whileInView: { opacity: 1, scale: 1 },
          transition: { duration }
        };
      default:
        return {};
    }
  };

  return (
    <section className={`relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${background.colorClass} min-h-[50vh] flex items-center`}>
      {/* Decorative vector background lines if custom theme */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <motion.div 
          {...getAnimationProps()}
          viewport={{ once: true }}
          className={`space-y-6 text-${typography.alignment}`}
        >
          {subtitle && (
            <div className="inline-flex items-center gap-2 bg-[#f4d068]/10 border border-[#f4d068]/20 px-3 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase font-bold text-[#f4d068]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{subtitle}</span>
            </div>
          )}

          {title && (
            <h2 className={`${typography.titleSize} ${typography.fontFamily} font-black tracking-tight leading-tight text-white`}>
              {title}
            </h2>
          )}

          {content && (
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl mx-auto whitespace-pre-wrap font-sans">
              {content}
            </p>
          )}

          {buttonLabel && (
            <div className={`pt-4 flex justify-${typography.alignment === "left" ? "start" : typography.alignment === "right" ? "end" : "center"}`}>
              <a
                href={buttonLink || "#"}
                className="bg-[#f4d068] hover:bg-white text-brand-green-dark font-sans font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-[#f4d068]/20 transition-all duration-300 hover:-translate-y-0.5 text-xs uppercase tracking-widest inline-flex items-center gap-2 group cursor-pointer"
              >
                <span>{buttonLabel}</span>
                <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1.5 transition-transform" />
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
