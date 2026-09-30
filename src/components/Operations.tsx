import React from "react";
import { WELFARE_SCHEMES, WELFARE_PARTNERS } from "../data";
import { useLanguage } from "../context/LanguageContext";
import { GraduationCap, Store, HeartHandshake, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function Operations() {
  const { localize, language } = useLanguage();

  const SCHEME_DETAILS: Record<string, {
    icon: React.ComponentType<{ className?: string }>;
    tag: { en: string; hi: string; gu: string };
    accentColor: string;
  }> = {
    "mid-day": {
      icon: GraduationCap,
      tag: { en: "Youth Nutrition", hi: "बाल पोषण", gu: "બાળ પોષણ" },
      accentColor: "border-l-brand-green-mid"
    },
    "pds": {
      icon: Store,
      tag: { en: "Subsidized PDS", hi: "सब्सिडी दाल", gu: "સબ્સિડી દાળ" },
      accentColor: "border-l-[#f4d068]"
    },
    "icds": {
      icon: HeartHandshake,
      tag: { en: "Maternal Health", hi: "मातृ स्वास्थ्य", gu: "માતૃ આરોગ્ય" },
      accentColor: "border-l-brand-green-mid"
    },
    "pmgkay": {
      icon: ShieldCheck,
      tag: { en: "National Relief", hi: "राष्ट्रीय राहत", gu: "રાષ્ટ્રીય રાહત" },
      accentColor: "border-l-[#f4d068]"
    }
  };

  const getLocalizedScheme = (id: string, defTitle: string, defDesc: string) => {
    if (language === "hi") {
      switch (id) {
        case "mid-day":
          return {
            title: "मध्याह्न भोजन कार्यक्रम (Mid-Day Meal)",
            desc: "सरकारी स्कूलों के लाखों बच्चों को कुपोषण से बचाने के लिए प्रोटीन-युक्त शुद्ध दालों की पौष्टिक आपूर्ति।"
          };
        case "pds":
          return {
            title: "सार्वजनिक वितरण प्रणाली (PDS)",
            desc: "राष्ट्रीय स्तर पर उचित मूल्य की दुकानों के माध्यम से कम आय वाले परिवारों को सबसिडी दर पर स्थिर, उच्च गुणवत्ता की दाल वितरण।"
          };
        case "icds":
          return {
            title: "एकीकृत बाल विकास सेवाएं (ICDS)",
            desc: "गर्भवती महिलाओं, शिशुओं और प्राथमिक स्वास्थ्य केंद्रों को आवश्यक पोषण पूरक सामग्री का वितरण।"
          };
        case "pmgkay":
          return {
            title: "प्रधानमंत्री गरीब कल्याण अन्न योजना (PMGKAY)",
            desc: "राष्ट्रीय संकट या वैश्विक आपूर्ति बाधाओं के दौरान लाखों परिवारों की दैनिक खाद्य सुरक्षा सुरक्षित रखने में भागीदार।"
          };
        default:
          return { title: defTitle, desc: defDesc };
      }
    }
    if (language === "gu") {
      switch (id) {
        case "mid-day":
          return {
            title: "મધ્યાહ્ન ભોજન યોજના (Mid-Day Meal)",
            desc: "સરકારી શાળાઓના લાખો બાળકોને કુપોષણ સામે લડવા પ્રોટીનયુક્ત પૌષ્ટિક અનાજ પૂરું પાડવામાં સક્ષમ સહયોગ."
          };
        case "pds":
          return {
            title: "જાહેર વિતરણ વ્યવસ્થા (PDS)",
            desc: "રાષ્ટ્રીય સ્તરે સસ્તા અનાજ કેન્દ્રો દ્વારા ગરીબ પરિવારો સુધી વાજબી ભાવોએ ઉચ્ચ ગુણવત્તાવાળા કઠોળનું વિતરણ."
          };
        case "icds":
          return {
            title: "સંકલિત બાળ વિકાસ સેવાઓ (ICDS)",
            desc: "સગર્ભા મહિલાઓ, નવજાત શિશુઓ અને સ્થાનિક આરોગ્ય કેન્દ્રો સુધી પૌષ્ટિક આહાર પહોંચાડવો."
          };
        case "pmgkay":
          return {
            title: "પ્રધાનમંત્રી ગરીબ કલ્યાણ અન્ન યોજના (PMGKAY)",
            desc: "અનાજ પુરવઠા ચેનલમાં સમસ્યાઓ દરમિયાન દેશભરના લાખો પરિવારોની દૈનિક અન્ન સુરક્ષા અવિરત જાળવી રાખવી."
          };
        default:
          return { title: defTitle, desc: defDesc };
      }
    }
    return { title: defTitle, desc: defDesc };
  };

  return (
    <section id="operations" className="py-24 bg-brand-bg-light text-zinc-900 relative overflow-hidden">
      {/* Subtle radial dot pattern matching attached section */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-45 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title area */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-serif text-zinc-950 tracking-tight font-extrabold">
            {localize({
              en: "Present Operations & Welfare Integrations",
              hi: "वर्तमान संचालन और कल्याणकारी भागीदारी",
              gu: "વર્તમાન સામાજિક કલ્યાણ અને અનાજ વિતરણ સહયોગિઓ"
            })}
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base font-sans max-w-2xl mx-auto leading-relaxed">
            {localize({
              en: "Currently recognized as a premier procurement and supply partner of federal food security programs, serving healthy, protein-rich staples across India.",
              hi: "वर्तमान में केंद्रीय खाद्य सुरक्षा कार्यक्रमों के एक प्रमुख खरीद और आपूर्ति भागीदार के रूप में मान्यता प्राप्त, जो पूरे भारत में स्वास्थ्यवर्धक और प्रोटीन युक्त दालें पहुंचाते हैं।",
              gu: "ભારત સરકારના અન્ના સુરક્ષા કાર્યક્રમો અંતર્ગત રાષ્ટ્રીય સ્તરે ગુણવત્તાયુક્ત તંદુરસ્ત પ્રોટીન કઠોળ પૂરાં પાડતી મુખ્ય પ્રોસેસિંગ સંસ્થા."
            })}
          </p>
        </div>

        {/* Dual Layout: Sourcing & Institutional Affiliates + 2x2 Welfare Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left panel: Sourcing Logic & Strategic Institutional Affiliations */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-6">
            <div className="space-y-5">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 bg-brand-green-mid rounded-full animate-ping" />
                <h3 className="font-serif font-bold text-lg sm:text-xl text-zinc-950">
                  {localize({
                    en: "Sourcing & Institutional Affiliates",
                    hi: "स्रोत संग्रहण एवं संबद्ध संस्थाएं",
                    gu: "અનાજ સોર્સિંગ અને સંસ્થાઓ"
                  })}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                {localize({
                  en: "Punitdhan procures raw crops directly from local Mandis and authorized government departments. These crops are state-processed and distributed nationwide through core agencies.",
                  hi: "पुनीतधन सीधे स्थानीय मंडियों और अधिकृत सरकारी विभागों से कच्ची फसलों की खरीद करता है। इन फसलों को आधुनिक रूप से संसाधित किया जाता है और प्रमुख सरकारी एजेंसियों के माध्यम से देश भर में वितरित किया जाता है।",
                  gu: "પુનીતધન સીધા જ સ્થાનિક બજારો, મંડીઓ અને માન્ય સરકારી કેન્દ્રોમાંથી સોર્સિંગ કરી અદ્યતન પ્રોસેસિંગ કરે છે અને દેશભરમાં અગ્રણી એજન્સીઓ દ્વારા વિતરણ કરે છે."
                })}
              </p>

              {/* Strategic Supply Network Badges */}
              <div className="pt-3 space-y-2.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                  {localize({
                    en: "Key Strategic Partners",
                    hi: "प्रमुख रणनीतिक भागीदार",
                    gu: "મુખ્ય વ્યૂહાત્મક ભાગીદારો"
                  })}
                </span>
                <div className="space-y-2">
                  {WELFARE_PARTNERS.map((affil, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/60 hover:border-brand-green-mid/40 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-green-mid shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-zinc-900 leading-tight">
                          {affil.name}
                        </div>
                        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide mt-0.5">
                          {affil.category}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Defense Seal compliance footer */}
            <div className="pt-4 border-t border-zinc-200/80 text-xs text-zinc-500 font-sans leading-relaxed">
              {localize({
                en: "*Our verified procurement system with the Department of Defense (India) requires compliance with strict moisture, protein, and size profiles.",
                hi: "*रक्षा विभाग (भारत) के साथ हमारी सत्यापित खरीद प्रणाली के तहत नमी, प्रोटीन और आकार के कड़े मापदंडों का पूर्ण अनुपालन आवश्यक है।",
                gu: "*રક્ષામંત્રાલય (ભારત સરકાર) ના નિયમ અંતર્ગત ભેજ, ક્ષમતા પ્રોટીન અને અનાજના ઉચ્ચ માપદંડોનું સચોટ પાલન કરવામાં આવે છે."
              })}
            </div>
          </div>

          {/* Right panel: Balanced 2x2 Welfare Schemes Grid */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {WELFARE_SCHEMES.map((scheme) => {
                const localizedS = getLocalizedScheme(scheme.id, scheme.title, scheme.desc);
                const meta = SCHEME_DETAILS[scheme.id];
                const IconComponent = meta?.icon || ShieldCheck;
                const accentBorder = meta?.accentColor || "border-l-brand-green-mid";
                const categoryTag = meta ? localize(meta.tag) : "";

                return (
                  <div 
                    key={scheme.id}
                    className={`bg-white border border-zinc-200/80 border-l-4 ${accentBorder} rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-brand-green-mid/40 hover:-translate-y-1.5 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl group`}
                  >
                    <div>
                      {/* Top icon and category tag */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="p-2.5 rounded-xl bg-brand-green-dark/5 text-brand-green-dark group-hover:bg-brand-green-dark group-hover:text-white transition-colors duration-300">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        {categoryTag && (
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-full border border-zinc-200/60">
                            {categoryTag}
                          </span>
                        )}
                      </div>

                      <h4 className="font-serif text-base sm:text-lg font-bold text-zinc-950 mb-2 leading-snug group-hover:text-brand-green-dark transition-colors">
                        {localizedS.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
                        {localizedS.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
