import React from "react";
import { Cpu, Users, ShieldCheck, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface WhyUsItem {
  id: string;
  title: string;
  desc: string;
  badge: string;
  icon: React.ReactNode;
  iconContainerStyle: string;
  badgeStyle: string;
  borderStyle: string;
}

export default function WhyUs() {
  const { localize, language } = useLanguage();

  const getLocalizedData = (id: string, defTitle: string, defDesc: string, defBadge: string) => {
    if (language === "hi") {
      switch (id) {
        case "quality-premium":
          return {
            title: "गुणवत्ता में शून्य समझौता",
            desc: "कड़े रासायनिक और भौतिक विश्लेषण प्रयोगशाला परीक्षणों के माध्यम से हर फसल चक्र में शुद्धता सुनिश्चित करना।",
            badge: "ZERO GAPS"
          };
        case "trust-relationship":
          return {
            title: "पारस्परिक विश्वास और संबंध",
            desc: "दशकों पुराने किसान साझेदारी नेटवर्क और पारदर्शी व्यापारिक नैतिकता पर आधारित अटूट विश्वास।",
            badge: "SYNERGY NETWORK"
          };
        case "direct-sourcing":
          return {
            title: "प्रत्यक्ष किसान खरीद",
            desc: "सहकारी समितियों और स्थानीय उत्पादकों से सीधे अनाज प्राप्त करके बिचौलियों को समाप्त करना।",
            badge: "GOVT & FARMERS"
          };
        case "team-output":
          return {
            title: "सटीक और तीव्र आपूर्ति",
            desc: "प्रतिदिन 400+ मीट्रिक टन प्रसंस्करण क्षमता के साथ पूरे भारत में समय पर थोक आपूर्ति सुनिश्चित करना।",
            badge: "PROMPT DELIVERY"
          };
        default:
          return { title: defTitle, desc: defDesc, badge: defBadge };
      }
    }
    if (language === "gu") {
      switch (id) {
        case "quality-premium":
          return {
            title: "ગુણવત્તામાં કોઈ બાંધછોડ નહીં",
            desc: "લેબોરેટરી ટેસ્ટિંગ અને કડક ગુણવત્તા ધોરણો દ્વારા દરેક દાણાની સંપૂર્ણ શુદ્ધતા સુનિશ્ચિત કરવી.",
            badge: "ZERO GAPS"
          };
        case "trust-relationship":
          return {
            title: "વિશ્વાસ અને સંબંધો",
            desc: "ખેડૂતો અને વેપારીઓ સાથે દાયકાઓ જૂના સંબંધો અને નૈતિક વેપાર પર આધારિત પારદર્શિતા.",
            badge: "SYNERGY NETWORK"
          };
        case "direct-sourcing":
          return {
            title: "સીધી ખેડૂત ખરીદી",
            desc: "સ્થાનિક ખેડૂત મંડળીઓ પાસેથી સીધું અનાજ ખરીદીને ખેડૂતોને વાજબી વળતર પૂરું પાડવું.",
            badge: "GOVT & FARMERS"
          };
        case "team-output":
          return {
            title: "સમયસર વિશાળ સપ્લાય",
            desc: "દૈનિક ૪૦૦+ મેટ્રિક ટન મિલિંગ ક્ષમતા સાથે સમગ્ર દેશમાં સમયસર બલ્ક સપ્લાય સુનિશ્ચિત કરવી.",
            badge: "PROMPT DELIVERY"
          };
        default:
          return { title: defTitle, desc: defDesc, badge: defBadge };
      }
    }
    return { title: defTitle, desc: defDesc, badge: defBadge };
  };

  const items: WhyUsItem[] = [
    {
      id: "quality-premium",
      title: "Quality Premium",
      desc: "Zero gaps in quality ensure we offer prime graded output verified through rigorous testing, supporting clean nutrition.",
      badge: "ZERO GAPS",
      icon: <Cpu className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.75} />,
      iconContainerStyle: "bg-[#fffbeb] text-[#d97706] border-[#fef3c7]",
      badgeStyle: "text-[#b45309] bg-[#fffbeb] border-[#fde68a]",
      borderStyle: "border-l-[#133e29]"
    },
    {
      id: "trust-relationship",
      title: "Trust & Relationship",
      desc: "We prioritize building and maintaining long-term, synergistic relationships with food grains, oil, rice, and pulses merchants across India.",
      badge: "SYNERGY NETWORK",
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.75} />,
      iconContainerStyle: "bg-[#f0fdf4] text-[#059669] border-[#dcfce7]",
      badgeStyle: "text-[#047857] bg-[#f0fdf4] border-[#bbf7d0]",
      borderStyle: "border-l-[#f4d068]"
    },
    {
      id: "direct-sourcing",
      title: "Direct Sourcing",
      desc: "We work directly with government agencies and farmers to ensure the finest raw crops are procured at fair market prices.",
      badge: "GOVT & FARMERS",
      icon: <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.75} />,
      iconContainerStyle: "bg-[#f0fdf4] text-[#059669] border-[#dcfce7]",
      badgeStyle: "text-[#047857] bg-[#f0fdf4] border-[#bbf7d0]",
      borderStyle: "border-l-[#133e29]"
    },
    {
      id: "team-output",
      title: "Team & Scaled Output",
      desc: "Our highly professional managers and production teams implement standard workflows to deliver premium graded output within stipulated timelines.",
      badge: "PROMPT DELIVERY",
      icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.75} />,
      iconContainerStyle: "bg-[#fff7ed] text-[#c2410c] border-[#ffedd5]",
      badgeStyle: "text-[#c2410c] bg-[#fff7ed] border-[#fed7aa]",
      borderStyle: "border-l-[#f4d068]"
    }
  ];

  return (
    <section id="why-us" className="py-20 sm:py-28 bg-[#fbfdfa] relative overflow-hidden font-sans border-t border-zinc-200/50">
      {/* Subtle brand grid texture */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:18px_18px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-green-mid/10 border border-brand-green-mid/20 text-brand-green-dark text-[11px] font-mono font-bold tracking-widest uppercase">
            {localize({ en: "Core Pillars", hi: "मुख्य आधार स्तंभ", gu: "મુખ્ય આધારસ્તંભો" })}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-zinc-950 tracking-tight font-extrabold">
            {localize({
              en: "Why Us",
              hi: "हमारे साथ क्यों जुड़ें",
              gu: "શા માટે અમારી પસંદગી"
            })}
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {localize({
              en: "Our operational foundation is anchored in four uncompromising pillars of excellence, trust, and national-scale execution.",
              hi: "हमारी परिचालन नींव उत्कृष्टता, विश्वास और राष्ट्रीय स्तर के क्रियान्वयन के चार मजबूत स्तंभों पर आधारित है।",
              gu: "અમારી કાર્યકારી પ્રણાલી શ્રેષ્ઠતા, વિશ્વાસ અને રાષ્ટ્રીય સ્તરના પુરવઠાના ચાર મજબૂત આધારસ્તંભો પર નિર્ભર છે."
            })}
          </p>
        </div>

        {/* 2x2 Grid for Why Us Cards matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-8">
          {items.map((item) => {
            const loc = getLocalizedData(item.id, item.title, item.desc, item.badge);
            const title = language === "en" ? item.title : loc.title;
            const desc = language === "en" ? item.desc : loc.desc;
            const badge = language === "en" ? item.badge : loc.badge;

            return (
              <div
                key={item.id}
                className={`group bg-white border border-zinc-200/80 border-l-[4px] sm:border-l-[5px] ${item.borderStyle} rounded-3xl p-7 sm:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
              >
                <div className="space-y-6">
                  {/* Top Bar: Icon Container on Left, Pill Badge on Right */}
                  <div className="flex items-center justify-between gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${item.iconContainerStyle} border flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <span className={`text-[11px] font-mono font-bold tracking-wider uppercase ${item.badgeStyle} px-3.5 py-1.5 rounded-full border`}>
                      {badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-sans font-bold text-zinc-950 tracking-tight leading-snug">
                      {title}
                    </h3>
                    <p className="text-zinc-600 text-sm sm:text-[15px] leading-relaxed font-normal">
                      {desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
