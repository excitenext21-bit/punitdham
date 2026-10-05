import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Phone, Mail, MapPin, MessageSquare, ExternalLink, Facebook, Twitter, Linkedin, Instagram, Youtube } from "./HandDrawnIcons";
import { COMPANY_PROFILE } from "../data";
import { useLanguage } from "../context/LanguageContext";

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
  const { language, localize } = useLanguage();

  const tLocal = (key: string) => {
    const data: Record<string, { en: string; hi: string; gu: string }> = {
      title: {
        en: "Corporate Contact Center",
        hi: "कॉर्पोरेट संपर्क केंद्र",
        gu: "કોર્પોરેટ સંપર્ક કેન્દ્ર"
      },
      subtitle: {
        en: "Direct communication channels to our main offices and customer support team.",
        hi: "हमारे मुख्य कार्यालयों और ग्राहक सहायता टीम के लिए सीधे संचार चैनल।",
        gu: "અમારા મુખ્ય કાર્યાલયો અને ગ્રાહક સહાય ટીમ માટે સીધા જ સંપર્ક સાધનો."
      },
      whatsappSupport: {
        en: "WhatsApp Instant Support",
        hi: "व्हाट्सएप त्वरित सहायता",
        gu: "વોટ્સએપ ઝડપી સહાય"
      },
      whatsappDesc: {
        en: "Click here to chat instantly with our support desk for supply inquiries and orders.",
        hi: "आपूर्ति पूछताछ और ऑर्डर के लिए हमारे सहायता डेस्क से तुरंत चैट करने के लिए यहां क्लिक करें।",
        gu: "પુરવઠા સંબંધી પૂછપરછ અને ઉત્તમ સેવા માટે અમારી સપોર્ટ ડેસ્ક સાથે ત્વરિત ચેટ કરવા અહીં ક્લિક કરો."
      },
      chatNow: {
        en: "Chat Now on WhatsApp",
        hi: "व्हाट्सएप पर अभी चैट करें",
        gu: "વોટ્સએપ પર અત્યારે જ ચેટ કરો"
      },
      phoneNumbers: {
        en: "Direct Phone Lines",
        hi: "सीधे फोन नंबर",
        gu: "સીધા ફોન લાઈનો"
      },
      emailAddresses: {
        en: "Corporate Email Desk",
        hi: "कॉर्पोरेट ईमेल डेस्क",
        gu: "કોર્પોરેટ ઇમેઇલ ડેસ્ક"
      },
      registeredOffice: {
        en: "Registered Office",
        hi: "पंजीकृत कार्यालय",
        gu: "રજિસ્ટર્ડ ઓફિસ"
      },
      corporateOffice: {
        en: "Corporate Office",
        hi: "कॉर्पोरेट कार्यालय",
        gu: "કોર્પોરેટ ઓફિસ"
      },
      socialChannels: {
        en: "Official Social Media Channels",
        hi: "आधिकारिक सोशल मीडिया चैनल",
        gu: "સત્તાવાર સોશિયલ મીડિયા ચેનલ્સ"
      },
      close: {
        en: "Close Panel",
        hi: "पैनल बंद करें",
        gu: "પેનલ બંધ કરો"
      }
    };
    return localize(data[key] || { en: "", hi: "", gu: "" });
  };

  // Format WhatsApp Link
  const primaryPhone = COMPANY_PROFILE.phoneNumbers[0];
  const cleanWhatsAppNumber = primaryPhone.replace(/[^0-9]/g, ""); // e.g. "917069888112"
  const whatsappUrl = `https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(
    localize({
      en: "Hello Punitdhan Pulses! I would like to inquire about your products/services.",
      hi: "नमस्ते पुनीतधन पल्सेस! मैं आपके उत्पादों/सेवाओं के बारे में पूछताछ करना चाहता हूं।",
      gu: "નમસ્તે પુનીતધન પલ્સ! હું તમારા ઉત્પાદનો/સેવાઓ વિશે પૂછપરછ કરવા માંગુ છું."
    })
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur overlay */}
          <motion.div
            id="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#06140e]/75 backdrop-blur-md cursor-pointer pointer-events-auto"
          />

          {/* Drawer content sliding from Right */}
          <motion.div
            id="drawer-panel"
            initial={{ x: "100%", opacity: 0.9 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="fixed top-0 right-0 bottom-0 z-[100] w-full max-w-md sm:max-w-lg bg-zinc-950 text-white shadow-2xl border-l border-emerald-500/10 flex flex-col h-full overflow-hidden pointer-events-auto"
          >
            {/* Top architectural design elements as subtle accents */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-brand-accent to-amber-500" />

            {/* Drawer Header */}
            <div className="p-6 border-b border-zinc-800/60 flex items-center justify-between relative mt-1">
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-zinc-100 tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-brand-accent rounded-full inline-block" />
                  {tLocal("title")}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 font-sans">
                  {tLocal("subtitle")}
                </p>
              </div>
              <button
                id="close-drawer-btn"
                  aria-label="Close Inquiry Drawer"
                onClick={onClose}
                className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0"
                title={tLocal("close")}
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content wrapper */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-zinc-800">
              
              {/* WhatsApp Spotlight Banner */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                id="whatsapp-card"
                className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-[#0b2418] to-zinc-950 p-5 shadow-[0_10px_30px_rgba(16,185,129,0.05)] group"
              >
                {/* Visual Accent Circle Grid Background */}
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-450 shadow-inner shrink-0 mt-0.5">
                    <MessageSquare size={24} className="animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-zinc-100 tracking-tight">
                      {tLocal("whatsappSupport")}
                    </h4>
                    <p className="text-xs text-zinc-455 leading-relaxed font-sans">
                      {tLocal("whatsappDesc")}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-emerald-950">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-650 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 hover:shadow-[0_4px_20px_rgba(16,185,129,0.25)] hover:-translate-y-0.5 cursor-pointer text-center"
                  >
                    <MessageSquare size={16} />
                    {tLocal("chatNow")}
                    <ExternalLink size={12} className="opacity-70" />
                  </a>
                </div>
              </motion.div>


              {/* Corporate Email Desk */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#f4d068] font-bold flex items-center gap-2">
                  <Mail size={12} />
                  {tLocal("emailAddresses")}
                </h4>
                <div className="space-y-2">
                  {COMPANY_PROFILE.emails.map((email, idx) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="p-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-900 hover:border-zinc-800 transition-all duration-200 flex items-center justify-between group"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">
                          {localize({ en: "Corporate Inbox", hi: "कॉर्पोरेट इनबॉक्स", gu: "કોર્પોરેટ ઇનબૉક્સ" })} 0{idx + 1}
                        </span>
                        <span className="text-sm font-bold text-zinc-200 group-hover:text-amber-400 transition-colors break-all">
                          {email}
                        </span>
                      </div>
                      <Mail size={16} className="text-zinc-500 group-hover:text-amber-400 transition-colors shrink-0" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Addresses Block (Registered and Corporate) */}
              <div className="space-y-4 pt-2 border-t border-zinc-800/60">
                

                {/* Corporate Office */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-zinc-100">
                    <div className="w-6 h-6 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-450 shrink-0">
                      <MapPin size={12} />
                    </div>
                    <h4 className="text-sm font-bold tracking-tight">
                      {tLocal("corporateOffice")}
                    </h4>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/50 text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans space-y-1">
                    <p>{COMPANY_PROFILE.corporateOffice.line1}</p>
                    <p>{COMPANY_PROFILE.corporateOffice.line2}</p>
                    <p>{COMPANY_PROFILE.corporateOffice.line3}</p>
                  </div>
                </div>

              </div>

              {/* Social Channels section */}
              <div className="space-y-3 pt-2 border-t border-zinc-800/60">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#f4d068] font-bold flex items-center gap-2">
                  {tLocal("socialChannels")}
                </h4>
                <div className="flex items-center gap-2.5">
                  {[
                    { icon: Facebook, label: "Facebook", href: "https://facebook.com/punitdhan" },
                    { icon: Instagram, label: "Instagram", href: "https://instagram.com/punitdhan" },
                    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/punitdhan" },
                    { icon: Twitter, label: "X / Twitter", href: "https://twitter.com/punitdhan" },
                    { icon: Youtube, label: "YouTube", href: "https://youtube.com/punitdhan" }
                  ].map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-all duration-200 flex items-center justify-center hover:-translate-y-1"
                        title={social.label}
                      >
                        <IconComponent size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Bottom Brand Indicator */}
            <div className="p-4 bg-zinc-950 border-t border-zinc-900 text-center text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
              &copy; {new Date().getFullYear()} PUNITDHAN PULSES LTD
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
