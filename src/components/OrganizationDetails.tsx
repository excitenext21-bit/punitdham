import React from "react";
import { ShieldCheck, Landmark } from "lucide-react";
import { COMPANY_PROFILE } from "../data";
import { useLanguage } from "../context/LanguageContext";

export default function OrganizationDetails() {
  const { localize } = useLanguage();

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

  return (
    <section id="certifications" className="py-20 bg-[#EAF0EC]/60 relative overflow-hidden font-sans border-b border-zinc-200">
      {/* Visual grids & subtle modern background enhancements */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#0f2e1e_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-1/4 right-0 w-[45rem] h-[45rem] bg-brand-green-light/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-[35rem] h-[35rem] bg-amber-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Modernist Editorial Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-green-dark tracking-tight font-black">
            {localize({
              en: "Statutory Details of Organization",
              hi: "संगठन के वैधानिक विवरण (Statutory Details)",
              gu: "સંસ્થાની વૈધાનિક વિગતો (Statutory Details)"
            })}
          </h2>
          
          <p className="text-zinc-600 text-sm leading-relaxed max-w-xl mx-auto font-medium">
            {localize({
              en: "Punitdhan operates under absolute legal governance. Explore our verified corporate registry and legal constitution below.",
              hi: "पुनीतधन पूर्ण कानूनी शासन के तहत काम करता है। नीचे हमारे सत्यापित कॉर्पोरेट रजिस्ट्री और विधिक गठन का अन्वेषण करें।",
              gu: "પુનીતધન સરકારી નિયમો અનુસાર પારદર્શક પદ્ધતિથી કાર્ય કરે છે. નીચે અમારી સત્તાવાર રજિસ્ટ્રી વિગતો અને કાયદાકીય બંધારણ જુઓ."
            })}
          </p>
        </div>

        {/* Refined Executive Corporate Registry Showcase Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#0c2a1c] via-[#091f14] to-[#06140d] text-white rounded-3xl sm:rounded-[2.5rem] p-7 sm:p-10 md:p-12 border border-emerald-800/40 border-l-4 border-l-[#f4d068] shadow-[0_25px_60px_rgba(11,36,24,0.18)] relative overflow-hidden group hover:-translate-y-0.5 transition-all duration-300">
            
            {/* Background luxury glow effects */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#f4d068]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#f4d068]/10 transition-colors duration-700" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-8 sm:space-y-10">
              
              {/* Header row with seal & title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 pb-8">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-[#f4d068] tracking-widest uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f4d068] animate-pulse" />
                    {localize({ en: "OFFICIAL LEGAL RECORD", hi: "आधिकारिक विधिक अभिलेख", gu: "સત્તાવાર કાનૂની દસ્તાવેજ" })}
                  </span>
                  <h3 className="font-serif font-black text-2xl sm:text-3xl tracking-tight text-white">
                    {localize({
                      en: "Corporate Legal Registry",
                      hi: "कॉर्पोरेट विधिक रजिस्ट्री",
                      gu: "કોર્પોરેટ લીગલ રજિસ્ટ્રી"
                    })}
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-lg">
                    {localize({
                      en: "Authentic corporate records and legal charter verified under the Ministry of Corporate Affairs, Government of India.",
                      hi: "कॉर्पोरेट कार्य मंत्रालय, भारत सरकार के अंतर्गत सत्यापित विधिक चार्टर।",
                      gu: "ભારત સરકારના કોર્પોરેટ બાબતોના મંત્રાલય હેઠળ અધિકૃત વિગતો."
                    })}
                  </p>
                </div>
                
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl shrink-0 self-start sm:self-auto">
                  <div className="w-10 h-10 bg-[#f4d068]/10 border border-[#f4d068]/20 rounded-xl flex items-center justify-center shrink-0">
                    <Landmark className="w-5 h-5 text-[#f4d068]" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                      {localize({ en: "GOV STATUS", hi: "सरकारी स्थिति", gu: "સરકારી સ્થિતિ" })}
                    </span>
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      {localize({ en: "Active & Verified", hi: "सत्यापित", gu: "ચકાસાયેલ" })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Grid of structured statutory details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                
                {/* Registered Corporate Name - Span 2 on md */}
                <div className="md:col-span-2 p-5 sm:p-6 bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 rounded-2xl transition-all space-y-2">
                  <p className="text-[10px] text-[#f4d068] font-mono uppercase tracking-widest font-bold">
                    {localize({ en: "Registered Corporate Name", hi: "पंजीकृत कॉर्पोरेट नाम", gu: "રજિસ્ટર્ડ કંપની નામ" })}
                  </p>
                  <p className="text-xl sm:text-2xl font-serif font-black text-white tracking-wide">
                    {COMPANY_PROFILE.name}
                  </p>
                </div>

                {/* Constitution of Firm */}
                <div className="p-5 sm:p-6 bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 rounded-2xl transition-all space-y-2">
                  <p className="text-[10px] text-[#f4d068] font-mono uppercase tracking-widest font-bold">
                    {lConstitutionLabel}
                  </p>
                  <p className="text-base font-bold text-white">
                    {lConstitutionValue}
                  </p>
                </div>

                {/* Primary Location */}
                <div className="p-5 sm:p-6 bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 rounded-2xl transition-all space-y-2">
                  <p className="text-[10px] text-[#f4d068] font-mono uppercase tracking-widest font-bold">
                    {lPrimaryPlaceLabel}
                  </p>
                  <p className="text-base font-bold text-white">
                    {lPrimaryPlaceValue}
                  </p>
                </div>

                {/* Nature of Business */}
                <div className="p-5 sm:p-6 bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 rounded-2xl transition-all space-y-2">
                  <p className="text-[10px] text-[#f4d068] font-mono uppercase tracking-widest font-bold">
                    {lNatureLabel}
                  </p>
                  <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                    {lNatureValue}
                  </p>
                </div>

                {/* Incorporation Registry */}
                <div className="p-5 sm:p-6 bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 rounded-2xl transition-all space-y-2">
                  <p className="text-[10px] text-[#f4d068] font-mono uppercase tracking-widest font-bold">
                    {lIncorporationLabel}
                  </p>
                  <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                    {lIncorporationValue}
                  </p>
                </div>

              </div>

              {/* MCA Verification Footer Banner */}
              <div className="p-5 sm:p-6 bg-white/[0.04] border border-white/10 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 bg-[#f4d068]/15 text-[#f4d068] rounded-xl shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#f4d068]" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-[#f4d068] font-bold uppercase tracking-widest block">
                      {localize({ en: "GOVERNMENT APPROVED CHARTER", hi: "भारत सरकार द्वारा अनुमोदित चार्टर", gu: "ભારત સરકાર મંજૂર ચાર્ટર" })}
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

                <div className="shrink-0 pl-12 sm:pl-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    MCA Verified
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
