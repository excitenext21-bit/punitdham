import { submitInquiry } from '../services/emailService';
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, Check, Loader2, Landmark, Globe, X, Award, Sparkles, Navigation, SendHorizontal } from "lucide-react";
import { ContactMessage } from "../types";
import { useLanguage } from "../context/LanguageContext";
import { useCMS } from "../context/CMSContext";

interface ContactFooterProps {
  selectedProductName: string;
  clearSelectedProduct: () => void;
}

export default function ContactFooter({ selectedProductName, clearSelectedProduct }: ContactFooterProps) {
  const { localize, language } = useLanguage();
  
  // CMS state & action hooks
  const { setView, setActivePageSlug, isBulkModalOpen, setIsBulkModalOpen } = useCMS();

  const handleNavClick = (slug: string) => {
    setView("home");
    setActivePageSlug(slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  // Inquiry Form Modal state
  const [formData, setFormData] = useState<ContactMessage>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Subscribe news state
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);


  // Synchronise selected crop details with the Modal
  useEffect(() => {
    if (selectedProductName) {
      setFormData((prev) => ({
        ...prev,
        subject: language === "hi" 
          ? `थोक विवरण और मूल्य पूछताछ: ${selectedProductName}` 
          : language === "gu" 
          ? `બલ્ક અનાજ ખરીદી ભાવપત્રક: ${selectedProductName}` 
          : `Bulk Technical Specification Inquiry: ${selectedProductName}`,
        message: language === "hi"
          ? `प्रिय पुनीतधन सेल्स टीम,\n\nमैं आपके प्रमुख उत्पाद ${selectedProductName} की पूर्ण तकनीकी विनिर्देश शीट, नमी सूचकांक और थोक मूल्य निर्धारण स्तर प्राप्त करने में रुचि रखता हूं।\n\nकृपया विस्तृत जानकारी मेरे निर्दिष्ट ईमेल पर साझा करें।\n\nसाभार,\n`
          : language === "gu"
          ? `માનનીય પુનીતધન સેલ્સ ટીમ,\n\nહું તમારા પ્રીમિયમ ઉત્પાદન ${selectedProductName} ના સ્પેશિફિકેશન અને વાજબી બલ્ક ભાવ જાણવા ઈચ્છું છું.\n\nકૃપા કરીને આ અંગેની વિગતવાર વિગત મારા ઇમેલ પર મોકલી આપો.\n\nઆભાર સહ,\n`
          : `Dear Punitdhan Sales Team,\n\nI am interested in obtaining the complete analytical and technical specification sheets, moisture indices, and bulk pricing tiers for your premium ${selectedProductName}.\n\nPlease share the detailed dossier to my designated email.\n\nWarm regards,\n`
      }));
      setIsBulkModalOpen(true);
    }
  }, [selectedProductName, language]);

  // Synchronise general bulk rates when opened without a selected product
  useEffect(() => {
    if (isBulkModalOpen && !selectedProductName) {
      setFormData((prev) => ({
        ...prev,
        subject: language === "hi" 
          ? "सामान्य थोक पूछताछ और मूल्य निर्धारण" 
          : language === "gu" 
          ? "સામાન્ય બલ્ક ખરીદી ભાવપત્રક" 
          : "General Commercial Bulk Rate Inquiry",
        message: language === "hi"
          ? "प्रिय पुनीतधन सेल्स टीम,\n\nमैं आपके उत्पादों के थोक मूल्य निर्धारण स्तर और सहयोग विकल्पों के बारे में जानकारी प्राप्त करना चाहता हूँ।\n\nकृपया अधिक विवरण साझा करें।\n\nसाभार,\n"
          : language === "gu"
          ? "માનનીય પુનીતધન સેલ્સ ટીમ,\n\nહું તમારા ઉત્પાદનોના હોલસેલ બલ્ક ભાવો, પેકેજિંગ વિકલ્પો અને સપ્લાય ચેઇન સહયોગ અંગે વિગતવાર માહિતી મેળવવા ઈચ્છું છું.\n\nકૃપા કરીને કેટલોગ અને ભાવપત્રક મોકલી આપવા વિનંતી.\n\nઆભાર સહ,\n"
          : "Dear Punitdhan Sales Team,\n\nI am writing to inquire about your wholesale commercial bulk rates, customized packaging configurations, and bulk supply chain solutions.\n\nPlease share the relevant catalog and pricing tier sheets with me.\n\nWarm regards,\n"
      }));
    }
  }, [isBulkModalOpen, selectedProductName, language]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail) return;
    submitInquiry({
      name: "Newsletter Subscriber",
      email: subscribeEmail,
      subject: "New Newsletter Subscription",
      message: `Subscriber email: ${subscribeEmail}`,
      type: "Newsletter"
    }).catch(console.error);
    setSubscribeSuccess(true);
    setSubscribeEmail("");
    setTimeout(() => {
      setSubscribeSuccess(false);
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      await submitInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject || (selectedProductName ? `Inquiry for ${selectedProductName}` : "General Inquiry"),
        message: formData.message,
        type: "Inquiry"
      });
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setTimeout(() => {
        setIsBulkModalOpen(false);
        clearSelectedProduct();
        setSubmitStatus("idle");
      }, 3000);
    } catch (err) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer 
      id="contact" 
      className="relative text-zinc-400 bg-[#06140e] pt-24 pb-12 overflow-hidden font-sans border-t border-brand-green-mid"
    >
      {/* Decorative ultra modern organic lights */}
      <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-brand-accent/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-[30rem] h-[30rem] bg-brand-green-light/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Modernist Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 border-b border-white/5">
          
          {/* Section 1: Editorial Brand & Mission (Col span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("home");
                }}
                className="inline-block group"
              >
                <img
                  src="/logo-light.png" width="219" height="48"
                  alt="Punitdhan Pulses Limited"
                  className="h-11 sm:h-13 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </a>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                {localize({
                  en: "Leading processor and corporate supplier of premium pulses and foodgrains across India. Partnered with federal defense supplies, cooperatives, and high-volume merchant channels built on rigorous standards.",
                  hi: "पूरे भारत में प्रीमियम दालों और खाद्यान्नों का प्रमुख प्रसंस्करणकर्ता और कॉर्पोरेट आपूर्तिकर्ता। कठोर मानकों पर बने रक्षा आपूर्ति और सहकारी चैनलों का विश्वसनीय साथी।",
                  gu: "સમગ્ર ભારતમાં પ્રીમિયમ અનાજ અને ગુણવત્તાયુક્ત કઠોળના અગ્રણી પ્રોસેસર અને સરકારી સંસ્થાઓના સતત ભાગીદાર."
                })}
              </p>
            </div>
          </div>

          {/* Section 2: Precise Directory Links (Col span 7) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:pl-12">
            <div className="space-y-6">
              <h4 className="text-white font-serif font-black text-base tracking-wide flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f4d068]" />
                {localize({ en: "Company Navigation", hi: "कम्पनी नेविगेशन", gu: "કંપની નેવિગેશન" })}
              </h4>
              <ul className="flex flex-col gap-3 font-mono text-xs tracking-wider">
                {[
                  { slug: "about-us", label: { en: "Corporate Profile", hi: "कॉर्पोरेट प्रोफाइल", gu: "કોર્પોરેટ પ્રોફાઇલ" } },
                  { slug: "board-of-directors", label: { en: "Board of Directors", hi: "निदेशक मंडल", gu: "બોર્ડ ઓફ ડિરેક્ટર્સ" } },
                  { slug: "services", label: { en: "Our Services", hi: "हमारी सेवाएं", gu: "અમારી સેવાઓ" } },
                  { slug: "products-specs", label: { en: "Premium Products", hi: "प्रीमियम उत्पाद", gu: "પ્રીમિયમ ઉત્પાદનો" } },
                  { slug: "alliances", label: { en: "Statutory Details", hi: "सांविधिक विवरण", gu: "વૈધાનિક વિગતો" } }
                ].map((item) => (
                  <li key={item.slug}>
                    <button
                      onClick={() => handleNavClick(item.slug)}
                      className="text-zinc-400 hover:text-[#f4d068] hover:translate-x-1.5 transition-all duration-300 flex items-center gap-2 text-left cursor-pointer focus:outline-none"
                    >
                      <span className="text-[#f4d068]/40">→</span>
                      <span>{localize(item.label)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-white font-serif font-black text-base tracking-wide flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {localize({ en: "Quick Actions", hi: "त्वरित कार्रवाई", gu: "ઝડપી કાર્યો" })}
              </h4>
              <ul className="flex flex-col gap-3 font-mono text-xs tracking-wider">
                {[
                  { slug: "careers", label: { en: "Careers", hi: "करियर", gu: "કારકિર્દી" } },
                  { slug: "connect", label: { en: "Connect Us", hi: "हमसे संपर्क करें", gu: "અમારો સંપર્ક કરો" } },
                ].map((item) => (
                  <li key={item.slug}>
                    <button
                      onClick={() => handleNavClick(item.slug)}
                      className="text-zinc-400 hover:text-[#f4d068] hover:translate-x-1.5 transition-all duration-300 flex items-center gap-2 text-left cursor-pointer focus:outline-none"
                    >
                      <span className="text-[#f4d068]/40">→</span>
                      <span>{localize(item.label)}</span>
                    </button>
                  </li>
                ))}
                
                <li className="pt-2 border-t border-white/5">
                  <button 
                    onClick={() => setIsBulkModalOpen(true)}
                    className="text-left text-zinc-200 hover:text-[#f4d068] hover:translate-x-1.5 transition-all duration-300 flex items-center gap-2 focus:outline-none cursor-pointer font-bold font-mono"
                  >
                    <span className="text-[#f4d068]">★</span>
                    <span>{localize({ en: "Open Bulk Enquiry Form", hi: "थोक पूछताछ शुरू करें", gu: "બલ્ક પુછપરછ ફોર્મ" })}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Copyright and Attribution Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
          <div className="text-zinc-500 font-medium tracking-wider text-[11px]">
            © 2025 Punitdhan. {localize({ en: "All Rights Reserved.", hi: "सर्वाधिकार सुरक्षित।", gu: "સર્વાધિકાર સુરક્ષિત." })}
          </div>

          <div className="text-zinc-500 font-medium tracking-wider text-[11px]">
            <span>Website developed - </span>
            <a 
              href="https://excitetemplate.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-[#f4d068] transition-colors underline underline-offset-2 hover:no-underline font-semibold"
            >
              Excite Template
            </a>
          </div>
        </div>

      </div>

      {/* RE-IMAGINED COMMODITY INQUIRY FORM MODAL */}
      <AnimatePresence>
        {isBulkModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
            
            {/* Dark glass curtain backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsBulkModalOpen(false); clearSelectedProduct(); }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-[#0b1f15] border border-brand-green-light/40 rounded-2xl sm:rounded-[2rem] p-6 sm:p-7 md:p-8 max-w-2xl lg:max-w-3xl w-full relative shadow-2xl z-10 text-white overflow-hidden max-h-[94vh] my-auto flex flex-col"
            >
              <button 
                onClick={() => { setIsBulkModalOpen(false); clearSelectedProduct(); }}
                className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-[#f4d068] transition-colors rounded-xl bg-white/5 focus:outline-none cursor-pointer z-20"
                aria-label="Close Inquiry Dialogue"
              >
                <X size={16} />
              </button>

              <div className="space-y-1 pr-8 shrink-0">
                <h3 className="text-xl sm:text-2xl font-serif text-white tracking-tight">
                  {localize({ en: "Submit Commodity Inquiry", hi: "वस्तु/जिंस थोक पूछताछ सबमिट करें", gu: "બલ્ક ખરીદી પુછપરછ પત્રક" })}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl">
                  {localize({
                    en: "Punitdhan Sales operates direct high-volume channels for cooperatives, industrial buyers, and wholesale bulk trade.",
                    hi: "पुनीतधन सेल्स बड़े औद्योगिक खरीदारों और सामूहिक थोक आपूर्ति के लिए सीधे चैनल संचालित करता है।",
                    gu: "ઔદ્યોગિક ખરીદદારો અને જથ્ઝાબંધ વેપારીઓ માટે પુનીતધન સીધો પુરવઠો મોકલે છે।"
                  })}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5 font-sans text-xs sm:text-sm mt-3.5 flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pr-0.5">
                
                {selectedProductName && (
                  <div className="p-2.5 bg-[#f4d068]/10 border border-[#f4d068]/30 rounded-xl text-brand-accent text-xs flex items-center justify-between leading-none font-bold">
                    <span>✓ {localize({ en: "Crop Selected:", hi: "निर्देशित उत्पाद:", gu: "પસંદ કરેલ પાક:" })} <b className="text-white text-sm">{selectedProductName}</b></span>
                    <button 
                      type="button" 
                      onClick={() => {
                        clearSelectedProduct();
                        setFormData(prev => ({ ...prev, subject: "", message: "" }));
                      }}
                      className="underline text-[9px] uppercase hover:text-white cursor-pointer hover:no-underline"
                    >
                      {localize({ en: "Clear Select", hi: "चयन हटाएं", gu: "પસંદગી રદ કરો" })}
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1 font-bold">
                      {localize({ en: "Your Name *", hi: "आपका नाम *", gu: "તમારું નામ *" })}
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-[#07170f] border border-brand-green-light/35 rounded-xl px-3.5 py-2 text-white outline-none focus:border-[#f4d068] transition-colors text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#e1e2d1] mb-1 font-bold">
                      {localize({ en: "Business Email *", hi: "व्यावसायिक ईमेल *", gu: "વ્યવસાયિક ઇમેલ *" })}
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-[#07170f] border border-brand-green-light/35 rounded-xl px-3.5 py-2 text-white outline-none focus:border-[#f4d068] transition-colors text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1 font-bold">
                      {localize({ en: "Phone Number *", hi: "फ़ोन नंबर *", gu: "મોબાઇલ નંબર *" })}
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-[#07170f] border border-brand-green-light/35 rounded-xl px-3.5 py-2 text-white outline-none focus:border-[#f4d068] transition-colors text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1 font-bold">
                      {localize({ en: "Subject Line *", hi: "पूछताछ का विषय *", gu: "પુછપરછ વિષય *" })}
                    </label>
                    <input
                      required
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full bg-[#07170f] border border-brand-green-light/35 rounded-xl px-3.5 py-2 text-white outline-none focus:border-[#f4d068] transition-colors text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1 font-bold">
                    {localize({ en: "Message Details", hi: "पूछताछ विवरण", gu: "વિગતવાર સંદેશ" })}
                  </label>
                  <textarea
                    required
                    rows={6}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-[#07170f] border border-brand-green-light/35 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-[#f4d068] transition-colors resize-none leading-relaxed text-xs min-h-[140px] sm:min-h-[150px] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                  />
                </div>

                <div className="pt-1">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-[#f4d068] hover:bg-white text-brand-green-dark font-black px-5 py-2.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-green-dark" />
                        {localize({ en: "Submitting...", hi: "सबमिट किया जा रहा है...", gu: "સબમિટ કરી રહ્યું છે..." })}
                      </>
                    ) : (
                      <>
                        <Send size={12} className="stroke-[2.5]" />
                        <span>{localize({ en: "Submit", hi: "सबमिट करें", gu: "સબમિટ કરો" })}</span>
                      </>
                    )}
                  </button>
                </div>

                {submitStatus === "success" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 rounded-xl flex items-center gap-2.5"
                  >
                    <Check size={14} className="stroke-[3] text-emerald-400" />
                    <span className="text-xs">
                      {localize({
                        en: "Inquiry successfully routed! Ticket created. Closing dialog shortly.",
                        hi: "पूछताछ संबंधित विभाग को भेजी गई! 3 सेकंड में बंद हो रहा है...",
                        gu: "પુછપરછ મોકલી દેવાઇ છે! પત્રક ટૂંક સમયમાં બંધ થશે..."
                      })}
                    </span>
                  </motion.div>
                )}

              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </footer>
  );
}
