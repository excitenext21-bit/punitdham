import React from "react";
import { motion } from "motion/react";
import { Globe, Cpu, Leaf, Users, TrendingUp, Heart, Sparkles } from "./HandDrawnIcons";
import { STRENGTHS } from "../data";
import { useLanguage } from "../context/LanguageContext";
import { useCMS } from "../context/CMSContext";

// Helper function to render correct Lucide icon based on name string
function StrengthIcon({ name, size = 24 }: { name: string; size?: number }) {
  switch (name) {
    case "Globe":
      return <Globe size={size} />;
    case "Cpu":
      return <Cpu size={size} />;
    case "Leaf":
      return <Leaf size={size} />;
    case "Users":
      return <Users size={size} />;
    case "TrendingUp":
      return <TrendingUp size={size} />;
    case "Heart":
      return <Heart size={size} />;
    default:
      return <Sparkles size={size} />;
  }
}

export default function Strengths() {
  const { localize, language } = useLanguage();
  const { pages, activePageSlug, setIsBulkModalOpen } = useCMS();

  const activePage = pages.find(p => p.slug === activePageSlug) || pages[0];
  const section = activePage.sections.find(s => s.type === "strengths");

  const sectionTitle = language === "en" 
    ? (section?.title || "Our Key Strengths & Operational Principles")
    : localize({
        en: "Our Key Strengths & Operational Principles",
        hi: "हमारी प्रमुख ताकत और परिचालन सिद्धांत",
        gu: "અમારી મુખ્ય શક્તિઓ અને સંચાલન સિદ્ધાંતો"
      });
  const sectionSubtitle = language === "en"
    ? (section?.subtitle || "WHY CLIENTS PARTNER WITH US")
    : localize({
        en: "WHY CLIENTS PARTNER WITH US",
        hi: "ग्राहक हमारे साथ क्यों जुड़ते हैं",
        gu: "શા માટે ગ્રાહકો અમારી પસંદગી કરે છે"
      });
  const sectionContent = language === "en"
    ? (section?.content || "Combining state-of-the-art technological processing with strict ethical and sustainable supply networks, we set high benchmarks in agrarian product quality.")
    : localize({
        en: "Combining state-of-the-art technological processing with strict ethical and sustainable supply networks, we set high benchmarks in agrarian product quality.",
        hi: "सख्त नैतिक और सतत आपूर्ति नेटवर्क के साथ अत्याधुनिक तकनीकी प्रसंस्करण को मिलाकर, हम कृषि उत्पाद की गुणवत्ता में उच्च मानक स्थापित करते हैं।",
        gu: "અત્યાધુનિક ટેકનોલોજીકલ પ્રોસેસિંગ સાથે નૈતિક અને ટકાઉ સપ્લાય નેટવર્ક જોડીને અમે કૃષિ ઉત્પાદનની ગુણવત્તામાં ઉચ્ચતમ માપદંડો સ્થાપિત કરીએ છીએ."
      });

  const strengthsList = section?.items || STRENGTHS;

  const getLocalizedStrength = (id: string, defTitle: string, defDesc: string) => {
    if (language === "hi") {
      switch (id) {
        case "global-reach": return {
          title: "वैश्विक सोर्सिंग और पहुंच",
          desc: "हमने एक मजबूत वैश्विक नेटवर्क विकसित किया है, जो कृषि दालों और अनाजों की निर्बाध सोर्सिंग और प्रीमियम गुणवत्ता वितरण सुनिश्चित करता है।"
        };
        case "state-of-art": return {
          title: "अत्याधुनिक प्रसंस्करण सुविधाएं",
          desc: "हमारे आधुनिक प्रसंस्करण संयंत्र उच्चतम स्वच्छता और शुद्धता मानकों को बनाए रखने के लिए अत्याधुनिक मिलिंग और फ़िल्टरिंग तकनीकों का उपयोग करते हैं।"
        };
        case "sustainability": return {
          title: "सतत और पर्यावरण अनुकूल प्रथाएं",
          desc: "हम पर्यावरण की रक्षा करने और स्थानीय जैव-प्रणालियों को समृद्ध करने के लिए पर्यावरण-अनुकूल कृषि पद्धतियों और नैतिक, पारदर्शी खरीद को प्राथमिकता देते हैं।"
        };
        case "empowering-farmers": return {
          title: "स्थानीय किसानों का सशक्तिकरण",
          desc: "उत्पादकों और किसान सहकारी समितियों के साथ सीधा सहयोग उचित मूल्य निर्धारण, पारदर्शिता और सतत कृषि के प्रसार को सुनिश्चित करता है।"
        };
        case "economic-growth": return {
          title: "आर्थिक विकास को गति देना",
          desc: "हमारा बड़े पैमाने पर परिचालन ग्रामीण अर्थव्यवस्थाओं को उत्तेजित करता है, जिससे विश्वसनीय प्रत्यक्ष रोजगार के अवसर और औद्योगिक बुनियादी ढांचा तैयार होता है।"
        };
        case "nourishing-communities": return {
          title: "पोषक और स्वस्थ समुदाय",
          desc: "उच्च गुणवत्ता वाले, प्रोटीन युक्त और किफायती खाद्य पदार्थों का उत्पादन करके, हम लाखों लोगों के लिए पोषण सुरक्षा को मजबूत करने में सक्रिय भूमिका निभाते हैं।"
        };
        default: return { title: defTitle, desc: defDesc };
      }
    }
    if (language === "gu") {
      switch (id) {
        case "global-reach": return {
          title: "વૈશ્વિક સોર્સિંગ અને વિતરણ",
          desc: "અમે એક મજબૂત વૈશ્વિક નેટવર્ક વિકસાવ્યું છે, જે કૃષિ કઠોળ અને અનાજનું સીમલેસ સોર્સિંગ અને પ્રીમિયમ ગુણવત્તાયુક્ત વિતરણ સુનિશ્ચિત કરે છે."
        };
        case "state-of-art": return {
          title: "અત્યાધુનિક પ્રોસેસિંગ યુનિટ્સ",
          desc: "અમારા આધુનિક પ્રોસેસિંગ પ્લાન્ટ્સ સર્વોચ્ચ સ્વચ્છતા અને શુદ્ધતા જાળવવા માટે અદ્યતન મિલિંગ અને ફિલ્ટરિંગ પદ્ધતિઓનો ઉપયોગ કરે છે."
        };
        case "sustainability": return {
          title: "ટકાઉ અને હરિયાળી પ્રથાઓ",
          desc: "પર્યાવરણની સુરક્ષા અને ખેતીના વાતાવરણને પ્રોત્સાહિત કરવા માટે અમે ઇકો-ફ્રેન્ડલી ખેતી પદ્ધતિઓ અને પારદર્શક ખરીદીને પ્રાથમિકતા આપીએ છીએ."
        };
        case "empowering-farmers": return {
          title: "ખેડૂતોનું સશક્તિકરણ",
          desc: "ખેડૂતો અને વિવિધ ઉત્પાદક મંડળીઓ સાથે સીધું જોડાણ વાજબી ભાવો, પારદર્શક ખરીદી અને કૃષિ વિતરણ પ્રણાલીને વેગ આપે છે."
        };
        case "economic-growth": return {
          title: "ગ્રામીણ આર્થિક પ્રગતિ",
          desc: "અમારી વ્યાપક પ્રવૃત્તિઓ ગ્રામીણ અર્થતંત્રોને વેગ આપે છે, જેનાથી વિશ્વસનીય રોજગારી અને સદ્ધર ઈન્ફ્રાસ્ટ્રક્ચરનું નિર્માણ થાય છે."
        };
        case "nourishing-communities": return {
          title: "પોષણયુક્ત સ્વસ્થ સમુદાયો",
          desc: "ઉચ્ચ ગુણવત્તાયુક્ત, પ્રોટીનયુક્ત અને કિફાયતી અનાજના ઉત્પાદન દ્વારા અમે કરોડો પરિવારોની ન્યુટ્રિશનલ જાળવણીમાં અગ્રણી ભૂમિકા ભજવીએ છીએ."
        };
        default: return { title: defTitle, desc: defDesc };
      }
    }
    return { title: defTitle, desc: defDesc };
  };

  return (
    <section id="strengths" className="py-24 bg-brand-green-dark text-white relative overflow-hidden">
      {/* Visual background vector layers */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-accent bg-white/5 border border-white/10 px-3 py-1 bg-brand-green-mid rounded font-bold">
            {sectionSubtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
            {sectionTitle}
          </h2>
          <p className="text-brand-sage text-sm sm:text-base font-sans max-w-2xl mx-auto">
            {sectionContent}
          </p>
        </div>

        {/* 3x2 Grid for Strengths */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {strengthsList.map((strength, index) => {
            const loc = getLocalizedStrength(strength.id, strength.title || "", strength.description || "");
            const title = language === "en" ? (strength.title || loc.title) : loc.title;
            const desc = language === "en" ? (strength.description || loc.desc) : loc.desc;
            return (
              <div
                key={strength.id || index}
                className="group relative bg-[#fbfcfa] hover:bg-gradient-to-b hover:from-brand-green-mid hover:to-[#092215] border border-zinc-200/80 hover:border-brand-green-light/50 border-l-2 border-l-brand-green-mid hover:border-l-brand-accent rounded-3xl p-8 transition-all duration-400 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/25 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                <div className="space-y-5">
                  {/* Icon Container with glowing background & animated icon */}
                  <div className="p-3.5 bg-brand-green-mid/10 text-brand-green-dark border border-brand-green-mid/20 rounded-2xl w-fit group-hover:bg-brand-green-light/40 group-hover:text-brand-accent group-hover:border-brand-accent/40 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(244,208,104,0.25)] transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: index * 0.25 }}
                      className="group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300"
                    >
                      <StrengthIcon name={strength.iconName} size={24} />
                    </motion.div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-serif font-bold tracking-wide text-zinc-950 group-hover:text-white transition-colors duration-300">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-650 group-hover:text-gray-200 leading-relaxed font-sans transition-colors duration-300">
                      {desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner at bottom */}
        <div className="mt-16 bg-gradient-to-r from-brand-accent/10 to-transparent border border-brand-accent/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-sm">
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="font-serif text-lg font-semibold text-brand-accent">
              {localize({
                en: "Need detailed custom packing or bulk shipment exports?",
                hi: "क्या आपको विस्तृत कस्टम पैकिंग या थोक शिपमेंट निर्यात की आवश्यकता है?",
                gu: "શું તમારે કસ્ટમ પેકિંગ અથવા બલ્ક નિકાસ શિપમેન્ટની જરૂર છે?"
              })}
            </h4>
            <p className="text-xs sm:text-sm text-brand-sage max-w-xl font-sans">
              {localize({
                en: "Our direct association with Civil Supplies Corporation of India and NAFED enables us to handle custom packaging configurations from 400kg massive bags to 1kg household pouches.",
                hi: "भारतीय नागरिक आपूर्ति निगम और नेफेड (NAFED) के साथ हमारा सीधा संबंध हमें 400 किलोग्राम के बड़े बैग से लेकर 1 किलोग्राम के घरेलू पाउच तक कस्टम पैकेजिंग कॉन्फ़िगरेशन को संभालने में सक्षम बनाता है।",
                gu: "નાગરિક પુરવઠા નિગમ અને નાફેડ (NAFED) સાથેનો અમારો સીધો સંબંધ અમને ૪૦૦ કિલોના વિશાળ બેગથી લઈને ૧ કિલોના નાના પેકિંગ સુધીની ગુણવત્તાયુક્ત વ્યવસ્થા પૂરી પાડવા સક્ષમ બનાવે છે."
              })}
            </p>
          </div>
          <button
            onClick={() => setIsBulkModalOpen(true)}
            className="whitespace-nowrap bg-brand-accent hover:bg-brand-gold text-brand-green-dark font-bold px-6 py-3 rounded-lg shadow-md transition-all text-sm uppercase font-mono tracking-wider cursor-pointer"
          >
            {localize({
              en: "Enquire Bulk Rates",
              hi: "थोक दरों की पूछताछ करें",
              gu: "બલ્ક રેટની પૂછપરછ કરો"
            })}
          </button>
        </div>

      </div>
    </section>
  );
}
