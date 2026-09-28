import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, Check, Loader2, ChevronDown, ChevronUp, Building, ShieldCheck, Landmark, Globe, X, Award, Sparkles, Navigation, SendHorizontal, Lock } from "lucide-react";
import { COMPANY_PROFILE } from "../data";
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
  const { login, isAdmin, logout, setView, setActivePageSlug, isBulkModalOpen, setIsBulkModalOpen } = useCMS();
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(adminPassword);
    if (success) {
      setLoginError(false);
      setAdminPassword("");
      setShowAdminLogin(false);
      setView("admin");
    } else {
      setLoginError(true);
    }
  };

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

  // Expanded office details
  const [isAddressesExpanded, setIsAddressesExpanded] = useState(false);

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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail) return;
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
      await new Promise((resolve) => setTimeout(resolve, 1500));
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
      }, 2500);
    } catch (err) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLocalizedMillingUnit = (id: string, defName: string, defDesc: string) => {
    if (language === "hi") {
      switch(id) {
        case "unit-1": return {
          name: "प्रसंस्करण मिलिंग इकाई १",
          desc: "ओमकार टेक्सटाइल मिल के पास, नरनारायण वे ब्रिज के पीछे, मेमको चार रास्ता, नरोडा रोड, अहमदाबाद - ३८२३४५"
        };
        case "unit-2": return {
          name: "प्रसंस्करण मिलिंग इकाई २ और कृष्णा राइस मिल",
          desc: "कृष्णा राइस मिल कंपाउंड, बाबा रामदेवपीर मंदिर के पीछे, डारण रोड, अहमदाबाद - ३८२२२०"
        };
        default: return { name: defName, desc: defDesc };
      }
    } else if (language === "gu") {
      switch(id) {
        case "unit-1": return {
          name: "મિલિંગ યુનિટ ૧",
          desc: "ઓમકાર ટેક્સટાઈલ મિલ પાસે, નરનારાયણ વે બ્રિજ પાછળ, મેમકો ચાર રસ્તા, નરોડા રોડ, અમદાવાદ - ૩૮૨૩૪૫"
        };
        case "unit-2": return {
          name: "મિલિંગ યુનિટ ૨ અને કૃષ્ણા રાઈસ મિલ્સ",
          desc: "કૃષ્ણા રાઈસ મિલ્સ કમ્પાઉન્ડ, બાબ રામદેવપીર મંદિર પાછળ, પટેલ કાંટા પાસે, દારણ રોડ, અમદાવાદ - ૧૫૪૧૫૫"
        };
        default: return { name: defName, desc: defDesc };
      }
    }
    return { name: defName, desc: defDesc };
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
            <div className="space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-[#f4d068] uppercase font-bold bg-[#f4d068]/10 px-3.5 py-1.5 rounded-full border border-[#f4d068]/20 inline-block">
                {localize({
                  en: "ESTABLISHED AGRICULTURAL LEADERSHIP",
                  hi: "वैश्विक कृषि मूल्य श्रृंखला",
                  gu: "શ્રેષ્ઠ ભારતીય કૃષિ નિકાસ"
                })}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white font-extrabold tracking-tight">
                {COMPANY_PROFILE.name}
              </h3>
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

        {/* Accordion Trigger for Corporate address mapping */}
        <div className="mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs border-b border-white/5 pb-8">
          <div className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
            © 2025 Punitdhan. {localize({ en: "All Rights Reserved.", hi: "सर्वाधिकार सुरक्षित।", gu: "સર્વાધિકાર સુરક્ષિત." })}
          </div>
          
          <button 
            onClick={() => setIsAddressesExpanded(!isAddressesExpanded)}
            className="flex items-center gap-1.5 text-zinc-300 hover:text-[#f4d068] transition-colors font-bold uppercase text-[10px] bg-white/[0.03] px-4 py-2 rounded-xl border border-white/5 cursor-pointer hover:border-white/10"
          >
            <span>{isAddressesExpanded ? localize({ en: "Minimize Offices", hi: "कार्यालय सूची छिपाएं", gu: "સરનામાં વિગત છુપાવો" }) : localize({ en: "Registered Offices & Sites", hi: "कार्यालय और मिलिंग स्थल विवरण", gu: "રજિસ્ટર્ડ ઓફિસ અને સરનામાં" })}</span>
            {isAddressesExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
        </div>

        {/* Collapsible Corporate Details Panel */}
        <AnimatePresence>
          {isAddressesExpanded && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-black/30 border border-white/5 rounded-2xl p-6 my-8 space-y-6 overflow-hidden"
              style={{ contentVisibility: "auto" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-sans text-xs">
                
                {/* Registered Corporate office */}
                <div className="space-y-2 border-l border-[#f4d068]/50 pl-4">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-[#f4d068] font-bold flex items-center gap-1">
                    <Building size={11} className="shrink-0" />
                    {localize({ en: "Registered Corporate Office", hi: "पंजीकृत कॉर्पोरेट कार्यालय", gu: "રજિસ્ટર્ડ કોર્પોરેટ ઓફિસ" })}
                  </p>
                  <p className="font-bold text-white text-[13px]">Punitdhan Pulses Ltd</p>
                  <p className="text-zinc-400 leading-relaxed text-[11px]">
                    {COMPANY_PROFILE.registeredOffice.line1}<br />
                    {COMPANY_PROFILE.registeredOffice.line2}<br />
                    {COMPANY_PROFILE.registeredOffice.line3}
                  </p>
                </div>

                {/* Corporate headquarters */}
                <div className="space-y-2 border-l border-[#f4d068]/50 pl-4">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-[#f4d068] font-bold flex items-center gap-1">
                    <Building size={11} className="shrink-0" />
                    {localize({ en: "Administrative Board Office", hi: "प्रशासनिक बोर्ड कार्यालय", gu: "વહીવટી બોર્ડ ઓફિસ" })}
                  </p>
                  <p className="font-bold text-white text-[13px]">Administrative Plaza</p>
                  <p className="text-zinc-400 leading-relaxed text-[11px]">
                    {COMPANY_PROFILE.corporateOffice.line1}<br />
                    {COMPANY_PROFILE.corporateOffice.line2}<br />
                    {COMPANY_PROFILE.corporateOffice.line3}
                  </p>
                </div>

                {/* Licensed Registry references */}
                <div className="space-y-2 border-l border-[#f4d068]/50 pl-4">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-[#f4d068] font-bold flex items-center gap-1">
                    <ShieldCheck size={11} className="shrink-0" />
                    {localize({ en: "Statutory Registry Codes", hi: "सांविधिक पंजीकरण विवरण", gu: "વૈધાનિક વિગત પત્રક" })}
                  </p>
                  <div className="text-[11px] text-zinc-400 space-y-1.5 leading-snug">
                    <div className="flex justify-between border-b border-white/5 pb-1"><span>{localize({ en: "GST Number:", hi: "जीएसटी नंबर:", gu: "જીએસટી નંબર:" })}</span> <span className="font-mono text-white font-bold">{COMPANY_PROFILE.gstNumber}</span></div>
                    <div className="flex justify-between border-b border-white/5 pb-1"><span>{localize({ en: "PAN Card:", hi: "पैन नंबर:", gu: "પાન નંબર:" })}</span> <span className="font-mono text-white font-bold">{COMPANY_PROFILE.panNumber}</span></div>
                    <div className="flex justify-between"><span>{localize({ en: "ISO Standard:", hi: "आईएसओ मानक:", gu: "આઇએસઓ સ્ટાન્ડર્ડ:" })}</span> <span className="text-white font-bold">{COMPANY_PROFILE.isoCertificate.split(" ")[0]}</span></div>
                  </div>
                </div>

              </div>

              {/* Plants list */}
              <div className="pt-5 border-t border-white/5 space-y-3 font-sans">
                <p className="font-mono text-[9px] uppercase tracking-widest text-[#f4d068] font-bold">
                  {localize({ en: "Operational Milling Facilities", hi: "सक्रिय प्रसंस्करण मिलें", gu: "સક્રિય મોડર્ન મિલિંગ પ્લાન્ટ્સ" })}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {COMPANY_PROFILE.millingUnits.map((u) => {
                    const locUnit = getLocalizedMillingUnit(u.id, u.name, u.description);
                    return (
                      <div key={u.id} className="p-4 bg-white/[0.01] rounded-xl border border-white/5">
                        <p className="font-bold text-white text-[11px]">{locUnit.name}</p>
                        <p className="text-zinc-400 text-[10.5px] leading-relaxed mt-1">{locUnit.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Discreet Admin Login Reveal Panel */}
        <AnimatePresence>
          {showAdminLogin && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="mt-6 mb-4 p-5 bg-[#0b1f15] border border-brand-green-light/20 rounded-2xl max-w-sm mx-auto shadow-xl"
            >
              <form onSubmit={handleAdminLoginSubmit} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest text-[#f4d068] font-bold uppercase flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>CMS AUTHENTICATION</span>
                  </span>
                  <button 
                    type="button" 
                    onClick={() => setShowAdminLogin(false)}
                    className="text-zinc-500 hover:text-white text-[10px]"
                  >
                    {localize({ en: "Cancel", hi: "रद्द करें", gu: "રદ કરો" })}
                  </button>
                </div>
                <div className="space-y-1">
                  <input 
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder={localize({ en: "Enter Admin Password (default: admin)", hi: "एडमिन पासवर्ड दर्ज करें (डिफ़ॉल्ट: admin)", gu: "એડમિન પાસવર્ડ દાખલ કરો (ડિફોલ્ટ: admin)" })}
                    className="w-full bg-[#07170f] border border-brand-green-light/35 rounded-xl px-3 py-2 text-white outline-none focus:border-[#f4d068] transition-colors text-xs font-mono"
                  />
                  {loginError && (
                    <p className="text-[10px] text-red-400 font-bold mt-1">
                      {localize({ en: "❌ Invalid credentials. Hint: default is \"admin\"", hi: "❌ अमान्य पासवर्ड। संकेत: डिफ़ॉल्ट \"admin\" है", gu: "❌ અમાન્ય પાસવર્ડ. સંકેત: ડિફોલ્ટ \"admin\" છે" })}
                    </p>
                  )}
                </div>
                <button 
                  type="submit"
                  className="w-full bg-[#f4d068] hover:bg-white text-brand-green-dark font-bold py-2 rounded-xl text-xs uppercase tracking-wide transition-all cursor-pointer"
                >
                  {localize({ en: "Verify Key & Open Builder", hi: "सत्यापित करें और सीएमएस खोलें", gu: "પાસવર્ડ ચકાસો અને બિલ્ડર ખોલો" })}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Small Bottom Copyright Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between font-mono text-[9px] text-zinc-650 pt-4 border-t border-white/5 gap-2">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 justify-center sm:justify-start">
            <span>{localize({ en: "*Standard Trade Mark & Certified Safe Food Partner", hi: "*सत्यापित कृषि ट्रेडमार्क मूल्य श्रृंखला साझीदार", gu: "*સત્તાવાર કૃષિ ટ્રેડમાર્ક અને ગુણવત્તા નિયંત્રણ સાથી" })}</span>
            <span className="text-zinc-800 hidden sm:inline">|</span>
            {isAdmin ? (
              <button 
                onClick={logout}
                className="text-red-400 hover:text-red-300 transition-colors duration-200 font-bold cursor-pointer flex items-center gap-1"
              >
                <span>{localize({ en: "Log out CMS Admin", hi: "लॉग आउट सीएमएस", gu: "સીએમએસ લોગ આઉટ" })}</span>
              </button>
            ) : (
              <button 
                onClick={() => {
                  setShowAdminLogin(!showAdminLogin);
                  setLoginError(false);
                }}
                className="text-zinc-500 hover:text-[#f4d068] transition-colors duration-200 font-bold cursor-pointer flex items-center gap-1"
              >
                <Lock className="w-2.5 h-2.5" />
                <span>{localize({ en: "Admin Login", hi: "एडमिन लॉगिन", gu: "એડમિન લૉગિન" })}</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* RE-IMAGINED COMMODITY INQUIRY FORM MODAL */}
      <AnimatePresence>
        {isBulkModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark glass curtain backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsBulkModalOpen(false); clearSelectedProduct(); }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-[#0b1f15] border border-brand-green-light/40 rounded-[2rem] p-5 sm:p-6 md:p-7 max-w-3xl lg:max-w-4xl w-full relative shadow-2xl z-10 text-white overflow-hidden max-h-[98vh] flex flex-col"
            >
              <button 
                onClick={() => { setIsBulkModalOpen(false); clearSelectedProduct(); }}
                className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-[#f4d068] transition-colors rounded-xl bg-white/5 focus:outline-none cursor-pointer z-20"
                aria-label="Close Inquiry Dialogue"
              >
                <X size={16} />
              </button>

              <div className="space-y-0.5">
                <span className="text-[9px] text-[#f4d068] font-mono tracking-widest font-bold uppercase bg-[#f4d068]/10 px-2 py-0.5 rounded-md inline-block">
                  {localize({ en: "COMMERCIAL BULK INQUIRY", hi: "व्यावसायिक थोक पूछताछ", gu: "જથ્ઝાબંધ ખરીદી પુછપરછ" })}
                </span>
                <h3 className="text-lg sm:text-xl font-serif text-white tracking-tight pt-0.5">
                  {localize({ en: "Submit Commodity Inquiry", hi: "वस्तु/जिंस थोक पूछताछ सबमिट करें", gu: "બલ્ક ખરીદી પુછપરછ પત્રક" })}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl pt-0.5">
                  {localize({
                    en: "Punitdhan Sales operates direct high-volume channels for cooperatives, industrial buyers, and wholesale bulk trade. ",
                    hi: "पुनीतधन सेल्स बड़े औद्योगिक खरीदारों और सामूहिक थोक आपूर्ति के लिए सीधे चैनल संचालित करता है। ",
                    gu: "ઔદ્યોગિક ખરીદદારો અને જથ્ઝાબંધ વેપારીઓ માટે પુનીતધન સીધો પુરવઠો મોકલે છે। "
                  })}
                  <span className="text-[#f4d068]">
                    {localize({
                      en: "Get verified quotes response inside 12 hours.",
                      hi: "12 व्यावसायिक घंटों में मूल्य उद्धरण प्राप्त करें।",
                      gu: "૧૨ કલાકમાં ભાવપત્રક મેળવવા વિગત ભરો।"
                    })}
                  </span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 font-sans text-xs sm:text-sm mt-3.5 flex-1 overflow-y-auto pr-1">
                
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
                    {localize({ en: "Message Details & Vol *", hi: "पूछताछ विवरण और मात्रा *", gu: "જથ્થો અને વિશિષ્ટ વિગતો *" })}
                  </label>
                  <textarea
                    required
                    rows={2}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-[#07170f] border border-brand-green-light/35 rounded-xl px-3.5 py-2 text-white outline-none focus:border-[#f4d068] transition-colors resize-none leading-relaxed text-xs"
                  />
                </div>

                <div className="pt-1">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-[#f4d068] hover:bg-white text-brand-green-dark font-black px-5 py-2.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer text-xs uppercase"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-green-dark" />
                        {localize({ en: "Routing Secure Request...", hi: "सुरक्षित डेटा प्रेषण किया जा रहा है...", gu: "માહિતી મોકલી રહી છે..." })}
                      </>
                    ) : (
                      <>
                        <Send size={12} className="stroke-[2.5]" />
                        {localize({ en: "Transmit Commercial Desk", hi: "व्यावसायिक डेस्क को प्रेषित करें", gu: "વ્યાપારી ડેસ્ક પર મોકલો" })}
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
