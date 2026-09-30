import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, Check, Loader2, Building2, ShieldCheck, ArrowRight, ArrowLeft } from "./HandDrawnIcons";
import { COMPANY_PROFILE } from "../data";
import { useLanguage } from "../context/LanguageContext";

interface ContactPageProps {
  onBackToHome: () => void;
}

export default function ContactPage({ onBackToHome }: ContactPageProps) {
  const { localize, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      // Simulate submission request
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
        setSubmitStatus("idle");
      }, 5000);
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
    <motion.div
      id="contact-page-container"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-28 pb-20 bg-zinc-950 text-zinc-100 min-h-screen relative overflow-hidden"
    >
      {/* Decorative Brand Accent Lights */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[450px] h-[450px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Navigation Breadcrumb / Control block */}
        <div className="flex items-center justify-between border-b border-zinc-800/60 pb-6">
          <button
            id="back-to-home-btn"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-zinc-400 hover:text-[#f4d068] transition-colors cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>{localize({ en: "Back to Home", hi: "मुख्य पृष्ठ पर जाएं", gu: "મુખ્ય પૃષ્ઠ પર જાઓ" })}</span>
          </button>
          
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">
            {localize({ en: "Official Communication Portal", hi: "आधिकारिक संचार पोर्टल", gu: "સત્તાવાર માહિતી પોર્ટલ" })}
          </span>
        </div>

        {/* Corporate Title Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-450 px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-extrabold border border-emerald-500/15">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-450 inline-block" />
            <span>{localize({ en: "Connect Us", hi: "हमसे जुड़ें", gu: "અમોને જોડો" })}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-none">
            {localize({ en: "Connect Us", hi: "हमसे जुड़ें", gu: "અનેક લોકોનું જોડાણ" })}
          </h1>
        </div>

        {/* Contact Page Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          
          {/* Left Column: Comprehensive Corporate Contact details (7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Address Grid Info Card */}
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#f4d068]/5 rounded-bl-full pointer-events-none" />

              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#f4d068] rounded-full inline-block" />
                {localize({ en: "Registered & Administrative Offices", hi: "पंजीकृत और प्रशासनिक कार्यालय", gu: "રજિસ્ટર્ડ અને સંચાલન ઓફિસો" })}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                
                {/* Registered Office */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[#f4d068] font-bold">
                    <Building2 size={13} />
                    <span>{localize({ en: "Registered Office", hi: "पंजीकृत कार्यालय", gu: "રજિસ્ટર્ડ ઓફિસ" })}</span>
                  </div>
                  <p className="text-sm font-bold text-white">{COMPANY_PROFILE.name}</p>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                    {COMPANY_PROFILE.registeredOffice.line1}<br />
                    {COMPANY_PROFILE.registeredOffice.line2}<br />
                    {COMPANY_PROFILE.registeredOffice.line3}
                  </p>
                </div>

                {/* Corporate Office */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[#f4d068] font-bold">
                    <Building2 size={13} />
                    <span>{localize({ en: "Corporate Board Office", hi: "कॉर्पोरेट बोर्ड कार्यालय", gu: "કોર્પોરેટ ઓફિસ" })}</span>
                  </div>
                  <p className="text-sm font-bold text-white">Administrative Plaza 406</p>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                    {COMPANY_PROFILE.corporateOffice.line1}<br />
                    {COMPANY_PROFILE.corporateOffice.line2}<br />
                    {COMPANY_PROFILE.corporateOffice.line3}
                  </p>
                </div>

              </div>
            </div>

            {/* Direct Digital Hotlines Desk */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Phone Contacts card */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#f4d068] font-bold">
                  <Phone size={14} className="text-[#f4d068]" />
                  <span>{localize({ en: "Direct Lines", hi: "सीधे संपर्क मार्ग", gu: "ટેલિફોન લાઈન" })}</span>
                </div>
                <div className="space-y-2">
                  {COMPANY_PROFILE.phoneNumbers.map((phone, i) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                    >
                      <span className="text-sm font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors">{phone}</span>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">{localize({ en: "Line", hi: "लाइन", gu: "લાઇન" })} 0{i+1}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Email Contacts card */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#f4d068] font-bold">
                  <Mail size={14} className="text-[#f4d068]" />
                  <span>{localize({ en: "Corporate Emails", hi: "कॉर्पोरेट ईमेल", gu: "કંપની ઇમેઇલ્સ" })}</span>
                </div>
                <div className="space-y-2">
                  {COMPANY_PROFILE.emails.map((email, i) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="flex flex-col p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group relative overflow-hidden"
                    >
                      <span className="text-xs font-bold text-zinc-200 group-hover:text-amber-400 transition-colors truncate">{email}</span>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 mt-1">{localize({ en: "Inbox", hi: "इनबॉक्स", gu: "ઇનબૉક્સ" })} 0{i+1}</span>
                    </a>
                  ))}
                </div>
              </div>

            </div>


            {/* Statutory details certifications list */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    {localize({ en: "Taxation & Legal Compliance", hi: "कराधान और वैधानिक अनुपालन", gu: "કરવેરા અને વૈધાનિક પાલન" })}
                  </h4>
                  <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                    GST: {COMPANY_PROFILE.gstNumber} | PAN: {COMPANY_PROFILE.panNumber}
                  </p>
                </div>
              </div>
              <div className="text-zinc-500 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-left sm:text-right">
                {localize({ en: COMPANY_PROFILE.constitution, hi: "पब्लिक लिमिटेड कंपनी", gu: "પબ્લિક લિમિટેડ કંપની" })} <br />
                {COMPANY_PROFILE.isoCertificate.split(" ")[0]}
              </div>
            </div>

          </div>

          {/* Right Column: Traditional Contact Form With No Helper Text (5 columns) */}
          <div className="lg:col-span-5 bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-[#f4d068] to-emerald-500 opacity-60" />
            
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                {localize({ en: "Send Message", hi: "सन्देश भेजें", gu: "સંદેશ મોકલો" })}
              </h2>
            </div>

            {/* Traditional Form Panel */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Full Name field */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 block">
                  {localize({ en: "Full Name", hi: "पूरा नाम", gu: "પૂરું નામ" })}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#f4d068] transition-all font-semibold font-sans"
                />
              </div>

              {/* Business Email address */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 block">
                  {localize({ en: "Email Address", hi: "ईमेल पता", gu: "ઇમેઇલ સરનામું" })}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#f4d068] transition-all font-semibold font-sans"
                />
              </div>

              {/* Mobile / Direct Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 block">
                  {localize({ en: "Phone Number", hi: "फोन नंबर", gu: "ફોન નંબર" })}
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#f4d068] transition-all font-semibold font-sans"
                />
              </div>

              {/* Subject of Inquiry */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 block">
                  {localize({ en: "Subject", hi: "विषय", gu: "વિષય" })}
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#f4d068] transition-all font-semibold font-sans"
                />
              </div>

              {/* Brief Message contents */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 block">
                  {localize({ en: "Message", hi: "सन्देश", gu: "સંદેશ" })}
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#f4d068] transition-all font-semibold font-sans resize-none"
                />
              </div>

              {/* Submission feedbacks */}
              {submitStatus === "success" && (
                <div role="alert" className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-fadeIn">
                  <Check size={18} className="shrink-0" />
                  <span>
                    {localize({
                      en: "✓ Your enquiry has been received successfully.",
                      hi: "✓ आपका संदेश सफलतापूर्वक प्राप्त हो गया है।",
                      gu: "✓ તમારી પૂછપરછ સફળતાપૂર્વક મળી ગઈ છે."
                    })}
                  </span>
                </div>
              )}

              {submitStatus === "error" && (
                <div role="alert" className="p-4 rounded-xl bg-red-950/80 border border-red-500/20 text-red-450 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-fadeIn">
                  <span className="shrink-0">✕</span>
                  <span>
                    {localize({
                      en: "An unexpected error occurred. Please try again.",
                      hi: "एक अप्रत्याशित त्रुटि हुई। कृपया पुनः प्रयास करें।",
                      gu: "ભૂલ આવી છે, કૃપા કરી ફરી પ્રયાસ કરો."
                    })}
                  </span>
                </div>
              )}

              {/* Send Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#f4d068] hover:bg-white text-brand-green-dark text-xs sm:text-sm font-extrabold uppercase tracking-widest transition-all duration-300 hover:shadow-[0_4px_25px_rgba(244,208,104,0.15)] hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>{localize({ en: "Sending...", hi: "भेजा जा रहा है...", gu: "મોકલી રહ્યું છે..." })}</span>
                  </>
                ) : (
                  <>
                    <span>{localize({ en: "Send Enquiry", hi: "पूछताछ भेजें", gu: "પૂછપરછ મોકલો" })}</span>
                    <Send size={15} />
                  </>
                )}
              </button>

            </form>

          </div>

        </div>

      </div>
    </motion.div>
  );
}
