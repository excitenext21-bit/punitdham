import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, ChevronLeft, ChevronRight, Copy, Check, ExternalLink, HelpCircle } from "lucide-react";
import { COMPANY_PROFILE } from "../data";
import { useLanguage } from "../context/LanguageContext";

interface SidebarSupportProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export default function SidebarSupport({ isExpanded, onToggle }: SidebarSupportProps) {
  const { localize, language } = useLanguage();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // State to track which detailed popover is open on the left
  const [activeTab, setActiveTab] = useState<"email" | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const primaryPhone = COMPANY_PROFILE.phoneNumbers[0];
  const cleanWhatsAppNumber = primaryPhone.replace(/[^0-9]/g, ""); // e.g. "917069888112"
  const whatsappUrl = `https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(
    localize({
      en: "Hello Punitdhan Pulses! I would like to inquire about your products/services.",
      hi: "नमस्ते पुनीतधन पल्सेस! मैं आपके उत्पादों/सेवाओं के बारे में पूछताछ करना चाहता हूँ।",
      gu: "નમસ્તે પુનીતધન પલ્સ! હું તમારા ઉત્પાદનો/સેવાઓ વિશે પૂછપરછ કરવા માંગુ છું."
    })
  )}`;

  return (
    <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center select-none pointer-events-none">
      
      {/* Detail Popovers (Rendered on the LEFT of the support capsule) */}
      <AnimatePresence>
        {isExpanded && activeTab && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="absolute right-16 top-1/2 -translate-y-1/2 w-80 bg-brand-green-dark/95 border-2 border-brand-gold/30 text-white shadow-2xl rounded-3xl p-6 flex flex-col justify-between overflow-hidden backdrop-blur-xl pointer-events-auto max-h-[85vh] md:max-h-[500px] z-50"
          >
            {/* Background glowing gradient decoration */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-gold/15 rounded-full blur-2xl pointer-events-none" />
            
            <div className="h-full flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-brand-gold/10 pb-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                      <Mail size={16} />
                    </div>
                    <h4 className="font-serif font-bold text-sm tracking-wide text-zinc-100">
                      {localize({ en: "Corporate Email Desks", hi: "आधिकारिक ईमेल पता", gu: "કોર્પોરેટ ઇમેઇલ ડેસ્ક" })}
                    </h4>
                  </div>
                  <button 
                    onClick={() => setActiveTab(null)} 
                    className="text-xs font-mono text-brand-sage hover:text-brand-accent transition-colors cursor-pointer"
                  >
                    ESC
                  </button>
                </div>

                <p className="text-xs text-brand-sage font-sans leading-relaxed">
                  {localize({
                    en: "Submit request sheets, laboratory dry-weight criteria, and audit proposals to our registered inboxes.",
                    hi: "गुणवत्ता विनिर्देश पत्रक, प्रयोगशाला विश्लेषण ऑडिट और थोक प्रस्ताव प्रेषित करें।",
                    gu: "નમૂના તપાસણી અહેવાલ, ઓડિટ દરખાસ્ત અને કસ્ટમ ખરીદ પત્રક ઇમેઇલ પર મોકલો."
                  })}
                </p>

                <div className="space-y-2.5 pt-1">
                  {COMPANY_PROFILE.emails.map((email, idx) => (
                    <div 
                      key={email}
                      className="bg-brand-green-mid/40 border border-brand-gold/10 rounded-2xl p-3.5 hover:border-brand-gold/35 hover:bg-brand-green-mid/60 transition-all flex items-center justify-between group"
                    >
                      <div className="flex flex-col gap-0.5 overflow-hidden">
                        <span className="text-[9px] font-mono font-bold text-brand-sage uppercase tracking-widest">
                          {localize({ en: "Official Inbox", hi: "आधिकारिक इनबॉक्स", gu: "સત્તાવાર ઇનબૉક્સ" })} 0{idx + 1}
                        </span>
                        <span className="text-xs font-mono font-semibold text-brand-accent truncate max-w-[150px]">
                          {email}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <a 
                          href={`mailto:${email}`}
                          className="p-1.5 rounded-lg border border-brand-green-light bg-brand-green-mid hover:bg-brand-green-light hover:border-brand-gold/50 transition-colors text-brand-sage hover:text-emerald-400"
                          title={localize({ en: "Compose Email", hi: "ईमेल भेजें", gu: "ઇમેઇલ મોકલો" })}
                        >
                          <ExternalLink size={13} />
                        </a>
                        <button
                          onClick={() => copyToClipboard(email, `email-${idx}`)}
                          className="p-1.5 rounded-lg border border-brand-green-light bg-brand-green-mid hover:bg-brand-green-light hover:border-brand-gold/50 transition-colors text-brand-sage hover:text-white cursor-pointer"
                          title={localize({ en: "Copy address", hi: "पता कॉपी करें", gu: "સરનામું કૉપિ કરો" })}
                        >
                          {copiedId === `email-${idx}` ? (
                            <Check size={13} className="text-emerald-500" />
                          ) : (
                            <Copy size={13} />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-brand-gold/10 pt-4 mt-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold inline-block animate-pulse" />
                <span className="text-[10px] font-mono text-brand-sage uppercase tracking-wider">
                  {localize({ en: "Active Desk Responses", hi: "सक्रिय सहायता डेस्क", gu: "સક્રિય સહાયતા ડેસ્ક" })}
                </span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Vertically-Centered Support Capsule */}
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div 
            key="expanded-capsule"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-14 bg-brand-green-dark/95 border-2 border-brand-gold/30 rounded-[32px] py-4 shadow-2xl flex flex-col items-center gap-4.5 backdrop-blur-xl pointer-events-auto relative overflow-hidden shrink-0 z-40"
          >
            {/* Ambient decoration light */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-green-light/20 via-transparent to-brand-green-mid/10 pointer-events-none" />

            {/* 1. Squeezed Close button (at the top of the capsule) */}
            <button
              onClick={onToggle}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-brand-green-mid/80 border border-brand-gold/25 text-brand-accent hover:text-brand-gold hover:border-brand-gold/50 hover:bg-brand-green-light/80 transition-all duration-300 scale-90 hover:scale-100 cursor-pointer shrink-0 z-10"
              title={localize({ en: "Minimize desk", hi: "छोटा करें", gu: "સપોર્ટ બાર સંકોચો" })}
            >
              <ChevronRight size={14} className="stroke-[2.5]" />
            </button>

            {/* Brass-colored fine divider wire */}
            <div className="h-[1px] w-5 bg-brand-gold/25 z-10 shrink-0" />

            {/* Actions List */}
            <div className="flex flex-col items-center gap-4 w-full z-10 shrink-0">

              {/* Email item trigger */}
              <div className="relative group flex items-center justify-center w-full">
                <button
                  onClick={() => setActiveTab(activeTab === "email" ? null : "email")}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300 cursor-pointer ${
                    activeTab === "email"
                      ? "bg-brand-gold/20 border-brand-gold text-brand-accent shadow-[0_0_12px_rgba(212,175,55,0.3)] scale-105"
                      : "bg-brand-green-mid/65 border-brand-gold/15 text-brand-sage hover:text-brand-accent hover:border-brand-accent/50 hover:scale-105"
                  }`}
                >
                  <Mail size={15} />
                </button>
                <div className="absolute right-14 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 pointer-events-none bg-brand-green-dark text-brand-accent text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-1 rounded-md border border-brand-gold/20 shadow-xl whitespace-nowrap z-50">
                  {localize({ en: "Email Inboxes", hi: "ईमेल सहायता", gu: "ઇમેઇલ ડેસ્ક" })}
                </div>
              </div>

              {/* WhatsApp direct launch */}
              <div className="relative group flex items-center justify-center w-full">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-green-mid/65 border border-brand-gold/15 text-brand-sage hover:text-emerald-400 hover:border-emerald-400/50 hover:scale-105 hover:shadow-[0_0_12px_rgba(16,185,129,0.2)] transition-all duration-300 cursor-pointer"
                >
                  <svg className="w-[14px] h-[14px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.632-1.023-5.105-2.883-6.97C16.536 1.916 14.062.89 11.432.889 5.998.889 1.574 5.311 1.572 10.746c0 1.706.451 3.375 1.303 4.851l-.991 3.616 3.763-.987zm13.109-10.37c-.12-.2-.435-.32-.916-.56-.48-.24-2.84-1.4-3.279-1.56-.44-.16-.76-.24-1.08.24-.32.48-1.24 1.56-1.52 1.88-.28.32-.56.36-1.04.12-.48-.24-2.03-.747-3.863-2.38-1.424-1.27-2.384-2.839-2.664-3.32-.28-.48-.03-.74.21-.979.215-.215.48-.56.72-.84.24-.28.32-.48.48-.8.16-.32.08-.6-.04-.84-.12-.24-1.08-2.6-1.48-3.56-.39-.947-.79-.817-1.08-.817-.28-.003-.6-.003-.92-.003-.32 0-.84.12-1.28.6-.44.48-1.68 1.64-1.68 4.0 0 2.36 1.72 4.64 1.96 4.96.24.32 3.385 5.169 8.2 7.25 1.144.496 2.038.791 2.735.912 1.15.183 2.196.157 3.024.033.918-.137 2.84-1.16 3.24-2.28.4-1.12.4-2.08.28-2.28z"/>
                  </svg>
                </a>
                <div className="absolute right-14 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 pointer-events-none bg-brand-green-dark text-brand-gold text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-1 rounded-md border border-brand-gold/20 shadow-xl whitespace-nowrap z-50">
                  {localize({ en: "WhatsApp", hi: "व्हाट्सएप चैट", gu: "વોટ્સએપ ગપશપ" })}
                </div>
              </div>

            </div>

            {/* Quick copyright trigger */}
            <div className="relative group flex items-center justify-center w-full z-10 mt-1 shrink-0">
              <div className="text-brand-sage hover:text-brand-accent transition-colors cursor-help p-1">
                <HelpCircle size={14} />
              </div>
              <div className="absolute right-14 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 pointer-events-none bg-brand-green-dark text-brand-gold text-[8px] font-mono tracking-wide uppercase px-2 py-1 rounded-md border border-brand-gold/20 shadow-xl whitespace-nowrap">
                &copy; 2025 PUNITDHAN
              </div>
            </div>

          </motion.div>
        ) : (
          <motion.div
            key="collapsed-launcher"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="pointer-events-auto"
          >
            <button
              onClick={onToggle}
              className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-brand-green-dark border-2 border-brand-gold text-brand-accent hover:text-brand-gold hover:border-brand-accent shadow-2xl hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] transition-all duration-300 focus:outline-none cursor-pointer"
              title={localize({ en: "Expand Support Sider", hi: "सहायता केंद्र खोलें", gu: "સપોર્ટ બાર ખોલો" })}
            >
              {/* Pulsing micro-glowing light inside */}
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-brand-accent border-2 border-brand-green-dark animate-pulse" />
              
              {/* Headset/phone icon */}
              <HelpCircle size={22} className="group-hover:rotate-12 transition-transform duration-300" />
              
              {/* Compact tooltip alongside trigger */}
              <div className="absolute right-16 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 pointer-events-none bg-brand-green-dark text-brand-gold text-[10px] font-mono font-bold tracking-wider uppercase px-3 py-1.5 rounded-lg border border-brand-gold/20 shadow-xl whitespace-nowrap z-50">
                {localize({ en: "Trade Support Desk", hi: "सहायता केंद्र", gu: "સપોર્ટ ડિપાર્ટમેન્ટ" })}
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
