import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Copy, Check, FileCheck, Landmark, Globe, Sparkles, Building, Bookmark } from "lucide-react";
import { COMPANY_PROFILE } from "../data";
import { useLanguage } from "../context/LanguageContext";

export default function OrganizationDetails() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { localize, language } = useLanguage();

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Localized Labels
  const lConstitutionLabel = localize({ en: "Constitution of Firm", hi: "गठन की प्रकृति", gu: "પેઢીનું બંધારણ" });
  const lConstitutionValue = localize({ en: "Public Limited Company", hi: "पब्लिक लिमिटेड कंपनी", gu: "પબ્લિક લિમિટેડ કંપની" });
  
  const lNatureLabel = localize({ en: "Nature of Business", hi: "व्यवसाय की प्रकृति", gu: "વ્યવસાયનો પ્રકાર" });
  const lNatureValue = localize({ 
    en: "Milling, Processing & Multi-Tier Trade of Pulses, Rice & Foodgrains", 
    hi: "दालों, खाद्यान्न, तेल, चावल आदि का विनिर्माण एवं व्यापार।", 
    gu: "દાળ, અનાજ, તેલ, ચોખા વગેરેનું પ્રોસેસિંગ અને વેપાર." 
  });

  const lPrimaryPlaceLabel = localize({ en: "Primary Location", hi: "मुख्य स्थान", gu: "મુખ્ય સ્થાન" });
  const lPrimaryPlaceValue = localize({ en: "PAN INDIA Operations", hi: "अखिल भारतीय (PAN INDIA)", gu: "સમગ્ર ભારત (PAN INDIA)" });

  const lIncorporationLabel = localize({ en: "Incorporation Registry", hi: "पंजीकरण विवरण", gu: "પંજીકરણ વિગત" });
  const lIncorporationValue = localize({ 
    en: "Incorporated in 2025 (Legacy of Prakash Agro Mills since 1988)", 
    hi: "2025 में शामिल (1988 से प्रकाश एग्रो मिल्स की विरासत)", 
    gu: "૨૦૨૫ માં સ્થાપિત (૧૯૮૮ થી પ્રકાશ એગ્રો મિલ્સનો વારસો)" 
  });

  const registryCards = [
    {
      id: "gst",
      label: localize({ en: "GST Registration Number", hi: "जीएसटी पंजीकरण संख्या", gu: "GST નોંધણી નંબર" }),
      value: COMPANY_PROFILE.gstNumber,
      status: localize({ en: "Active & Verified", hi: "सत्यापित", gu: "ચકાસાયેલ" }),
      badgeColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/10",
      description: localize({ en: "Federal Indirect Tax Compliance Code", hi: "संघीय अप्रत्यक्ष कर अनुपालन कोड", gu: "ફેડરલ પરોક્ષ ટેક્સ કોડ" })
    },
    {
      id: "pan",
      label: localize({ en: "PAN Corporate Code", hi: "पैन नंबर", gu: "PAN કોર્પોરેટ નંબર" }),
      value: COMPANY_PROFILE.panNumber,
      status: localize({ en: "Active & Verified", hi: "सत्यापित", gu: "ચકાસાયેલ" }),
      badgeColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/10",
      description: localize({ en: "National Treasury Legal Entity ID", hi: "राष्ट्रीय ट्रेजरी कानूनी इकाई आईडी", gu: "કોર્પોરેટ આવકવેરા આઈડી" })
    }
  ];

  const complianceCards = [
    {
      id: "fssai-memco",
      label: localize({ en: "FSSAI License (Memco Unit)", hi: "एफएसएसएआई लाइसेंस (मेमको)", gu: "FSSAI લાઇસન્સ (મેમકો)" }),
      value: COMPANY_PROFILE.fssaiMemco,
      authority: localize({ en: "Food Safety and Standards Authority of India", hi: "भारतीय खाद्य सुरक्षा और मानक प्राधिकरण", gu: "ભારતીય ખાદ્ય સુરક્ષા અને માનક સત્તામંડળ" }),
      status: localize({ en: "Central Gov Approved", hi: "केंद्र सरकार स्वीकृत", gu: "કેન્દ્ર સરકાર મંજૂર" }),
      statusColor: "text-amber-700 bg-amber-50"
    },
    {
      id: "fssai-bavla",
      label: localize({ en: "FSSAI License (Bavla Unit)", hi: "एफएसएसएआई लाइसेंस (बावला)", gu: "FSSAI લાઇસન્સ (બાવળા)" }),
      value: COMPANY_PROFILE.fssaiBavla,
      authority: localize({ en: "Food Safety and Standards Authority of India", hi: "भारतीय खाद्य सुरक्षा और मानक प्राधिकरण", gu: "ભારતીય ખાદ્ય સુરક્ષા અને માનક સત્તામંડળ" }),
      status: localize({ en: "Central Gov Approved", hi: "केंद्र सरकार स्वीकृत", gu: "કેન્દ્ર સરકાર મંજૂર" }),
      statusColor: "text-amber-700 bg-amber-50"
    },
    {
      id: "iso",
      label: localize({ en: "ISO 9001:2015 Quality Certification", hi: "आईएसओ 9001:2015 गुणवत्ता प्रमाणपत्र", gu: "ISO 9001:2015 ક્વોલિટી સર્ટિફિકેટ" }),
      value: COMPANY_PROFILE.isoCertificate.split(" ")[0],
      authority: localize({ en: "International Quality Management Standard", hi: "अंतर्राष्ट्रीय गुणवत्ता प्रबंधन मानक", gu: "આંતરરાષ્ટ્રીય ગુણવત્તા સંચાલન ધોરણ" }),
      status: localize({ en: "Certified Standard", hi: "प्रमाणित मानक", gu: "પ્રમાણિત ધોરણ" }),
      statusColor: "text-blue-700 bg-blue-50"
    },
    {
      id: "haccp",
      label: localize({ en: "HACCP Safety Standard Certification", hi: "एचएसीसीपी खाद्य सुरक्षा मानक", gu: "HACCP ફૂડ સેફ્ટી કમ્પ્લાયન્સ" }),
      value: COMPANY_PROFILE.haccpCertificate.split(" ")[0],
      authority: localize({ en: "Chemical and Hazard Control Protocol", hi: "रासायनिक एवं खतरा नियंत्रण प्रोटोकॉल", gu: "રાસાયણિક અને જોખમ નિયંત્રણ પ્રોટોકોલ" }),
      status: localize({ en: "Certified Standard", hi: "प्रमाणित मानक", gu: "પ્રમાણિત ધોરણ" }),
      statusColor: "text-indigo-700 bg-indigo-50"
    }
  ];

  return (
    <section id="certifications" className="py-24 bg-[#EAF0EC]/60 relative overflow-hidden font-sans border-b border-zinc-200">
      {/* Visual grids & subtle modern background enhancements */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#0f2e1e_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-1/4 right-0 w-[45rem] h-[45rem] bg-brand-green-light/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-[35rem] h-[35rem] bg-amber-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Modernist Editorial Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green-dark text-brand-accent text-[10px] font-mono tracking-widest font-extrabold rounded-full uppercase shadow-xs">
            <Sparkles size={11} className="text-brand-accent animate-pulse" />
            {localize({
              en: "STATUTORY AUTHENTICITY & COMPLIANCE",
              hi: "वैधानिक साख और सरकारी प्रमाणपत्र",
              gu: "વૈધાનિક વિગતો અને ગુણવત્તા પ્રમાણપત્રો"
            })}
          </div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-5xl font-serif text-brand-green-dark tracking-tight font-black">
            {localize({
              en: "Statutory Details of Organization",
              hi: "संगठन के वैधानिक विवरण (Statutory Details)",
              gu: "સંસ્થાની વૈધાનિક વિગતો (Statutory Details)"
            })}
          </h2>
          
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xl mx-auto">
            {localize({
              en: "Punitdhan operates under absolute legal governance. Explore our verified corporate registry, taxation codes, and central food safety credentials below.",
              hi: "पुनीतधन पूर्ण कानूनी शासन के तहत काम करता है। नीचे हमारे सत्यापित कॉर्पोरेट रजिस्ट्री, कर कोड और केंद्रीय खाद्य सुरक्षा प्रमाण पत्र देखें।",
              gu: "પુનીતધન સરકારી નિયમો અનુસાર પારદર્શક પદ્ધતિથી કાર્ય કરે છે. નીચે અમારી સત્તાવાર રજિસ્ટ્રી વિગતો અને કાયદાકીય પરવાના જુઓ."
            })}
          </p>
        </div>

        {/* Ultra Modern Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* COLUMN 1: Editorial Corporate Identity (Span 5) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-green-dark to-[#091f14] text-white rounded-[2rem] p-8 sm:p-10 border border-brand-green-dark/20 border-l-4 border-l-[#f4d068] flex flex-col justify-between shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            
            {/* Background luxury gradient patch */}
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-accent/10 transition-colors duration-700" />
            
            <div className="space-y-8">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono font-bold text-brand-accent tracking-widest uppercase">
                    {localize({ en: "OFFICIAL REVENUE SEAL", hi: "आधिकारिक राजस्व मुहर", gu: "સત્તાવાર મહેસૂલ મહોર" })}
                  </span>
                  <h3 className="font-serif font-black text-xl tracking-wide text-white">
                    {localize({
                      en: "Corporate Legal Registry",
                      hi: "कॉर्पोरेट विधिक रजिस्ट्री",
                      gu: "કોર્પોરેટ લીગલ રજિસ્ટ્રી"
                    })}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Landmark className="w-5 h-5 text-brand-accent" />
                </div>
              </div>

              {/* Precise Minimalist Core Statutory Profile */}
              <div className="space-y-6">
                
                <div className="space-y-1.5 font-sans">
                  <p className="text-[9px] text-[#f4d068] font-mono uppercase tracking-widest font-bold">
                    {localize({ en: "Registered Corporate Name", hi: "पंजीकृत कॉर्पोरेट नाम", gu: "રજિસ્ટર્ડ કંપની નામ" })}
                  </p>
                  <p className="text-lg font-bold text-white tracking-tight leading-snug">
                    {COMPANY_PROFILE.name}
                  </p>
                </div>

                <div className="space-y-1.5 font-sans border-t border-white/5 pt-4">
                  <p className="text-[9px] text-[#f4d068] font-mono uppercase tracking-widest font-bold">
                    {lConstitutionLabel}
                  </p>
                  <p className="text-sm font-bold text-white/95">
                    {lConstitutionValue}
                  </p>
                </div>

                <div className="space-y-1.5 font-sans border-t border-white/5 pt-4">
                  <p className="text-[9px] text-[#f4d068] font-mono uppercase tracking-widest font-bold">
                    {lNatureLabel}
                  </p>
                  <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                    {lNatureValue}
                  </p>
                </div>

                <div className="space-y-1.5 font-sans border-t border-white/5 pt-4">
                  <p className="text-[9px] text-[#f4d068] font-mono uppercase tracking-widest font-bold">
                    {lPrimaryPlaceLabel}
                  </p>
                  <p className="text-sm font-bold text-white">
                    {lPrimaryPlaceValue}
                  </p>
                </div>

                <div className="space-y-1.5 font-sans border-t border-white/5 pt-4">
                  <p className="text-[9px] text-[#f4d068] font-mono uppercase tracking-widest font-bold">
                    {lIncorporationLabel}
                  </p>
                  <p className="text-xs text-zinc-300 font-medium leading-relaxed">
                    {lIncorporationValue}
                  </p>
                </div>

              </div>

            </div>

            {/* MCA Minister Seal block */}
            <div className="mt-8 p-5 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-3.5">
              <div className="p-2 bg-brand-accent/20 text-[#f4d068] rounded-xl shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5 text-brand-accent" />
              </div>
              <div className="space-y-1 font-sans">
                <span className="text-[9px] font-mono text-brand-accent font-bold uppercase tracking-widest">
                  {localize({ en: "GOVERNMENT APPROVED", hi: "भारत सरकार द्वारा स्वीकृत", gu: "ભારત સરકાર મંજૂર" })}
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                  {localize({
                    en: "Registered under strict corporate guidelines by Ministry of Corporate Affairs (MCA), Government of India.",
                    hi: "कॉर्पोरेट कार्य मंत्रालय (MCA), भारत सरकार के सख्त कॉर्पोरेट दिशानिर्देशों के तहत पंजीकृत।",
                    gu: "ભારત સરકારના કોર્પોરેટ બાબતોના મંત્રાલય દ્વારા અગ્રણી મંજૂરી મેળવી સત્તાવાર સ્થાપિત."
                  })}
                </p>
              </div>
            </div>

          </div>

          {/* COLUMN 2 & 3: Interactive Tax & Safety ID Panels (Span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6 md:gap-8">
            
            {/* Top Row: Tax & Governance Codes (GST & PAN) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {registryCards.map((card) => (
                <div 
                  key={card.id} 
                  className={`bg-white border border-zinc-200 border-l-4 ${card.id === 'gst' ? "border-l-brand-green-mid" : "border-l-[#f4d068]"} rounded-[2rem] p-6 shadow-xs hover:shadow-md hover:border-brand-green-light/20 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
                >
                  <div className="space-y-3 font-sans">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
                        {card.label}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold text-center ${card.badgeColor}`}>
                        {card.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-zinc-50 border border-zinc-100 rounded-xl p-3 mt-1.5">
                      <code className="text-base font-mono font-bold text-zinc-900 tracking-wider">
                        {card.value}
                      </code>
                      
                      <button
                        onClick={() => copyToClipboard(card.value, card.id)}
                        className="p-2 rounded-lg text-zinc-450 hover:bg-zinc-100 transition-all border border-zinc-200/50 hover:text-brand-green-dark hover:scale-105 cursor-pointer"
                        title="Copy code"
                      >
                        {copiedId === card.id ? (
                          <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-zinc-500 font-medium">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Row: Food Safety and Quality Specifications */}
            <div className="bg-white border border-zinc-200 border-l-4 border-l-brand-green-mid rounded-[2rem] p-6 sm:p-8 flex-1 flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                  <h4 className="font-serif font-black text-lg text-brand-green-dark">
                    {localize({
                      en: "Safety Standards & Accreditations",
                      hi: "सुरक्षा मानक और सरकारी मान्यता",
                      gu: "ખાદ્ય સુરક્ષા પરવાના અને માન્યતાઓ"
                    })}
                  </h4>
                  <Building className="w-5 h-5 text-zinc-400" />
                </div>

                {/* Grid list of certifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {complianceCards.map((comp) => (
                    <div 
                      key={comp.id} 
                      className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl hover:border-brand-green-light/20 hover:bg-zinc-50/50 transition-all font-sans flex flex-col justify-between"
                    >
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block font-bold leading-tight">
                          {comp.label}
                        </span>
                        
                        <div className="flex items-center justify-between pt-1">
                          <code className="text-sm font-mono font-bold text-zinc-900 tracking-wide">
                            {comp.value}
                          </code>
                          <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md ${comp.statusColor}`}>
                            {comp.status}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-zinc-200/50 flex items-center justify-between text-[10px] text-zinc-500 font-medium">
                        <span className="truncate max-w-[150px]">{comp.authority}</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-brand-green-dark opacity-75 inline ml-1.5 shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-zinc-100 flex items-center gap-2 text-zinc-500 text-xs font-medium leading-relaxed">
                <div className="w-1.5 h-1.5 rounded-full bg-[#f4d068] shrink-0" />
                <p>
                  {localize({
                    en: "Certified by certified bodies with periodic surveillance audits to keep high chemical precision, hygiene standard and safety.",
                    hi: "उच्च रासायनिक शुद्धता, स्वच्छता मानक और सुरक्षा बनाए रखने के लिए समय-समय पर गुणवत्ता लेखा परीक्षा की जाती है।",
                    gu: "પ્રોસેસિંગ યુનિટ્સમાં શ્રેષ્ઠ ગુણવત્તા અને કડક સ્વચ્છતાની મોનિટરિંગ માટે નિયમિત સરકારી ઓડિટ થાય છે."
                  })}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
