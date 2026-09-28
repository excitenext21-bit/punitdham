import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { 
  Wheat, ShieldCheck, CheckCircle2, Cpu, Leaf, Activity, ChevronRight, Globe, Database, X, Maximize2, TrendingUp, Heart, Users 
} from "./HandDrawnIcons";
import { useLanguage } from "../context/LanguageContext";
import { useCMS } from "../context/CMSContext";

function RunningCounter({
  target,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 2000
}: {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(easeOut * target);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration]);

  const formatted = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.round(count).toString();

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export default function AboutUs() {
  const { localize, language } = useLanguage();
  const { pages, activePageSlug, globalSettings } = useCMS();
  const [activePillarTab, setActivePillarTab] = useState<"sorting" | "eco">("sorting");
  const [activePillar, setActivePillar] = useState<number | null>(1);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActivePillar((current) => {
        if (current === null) return 1;
        const next = current === 4 ? 1 : current + 1;
        return next;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const activePage = pages.find(p => p.slug === activePageSlug) || pages[0];
  const section = activePage.sections.find(s => s.type === "about");

  const title = language === "en"
    ? (section?.title || "Our Corporate Evolution & Legacy")
    : localize({
        en: "Our Corporate Evolution & Legacy",
        hi: "हमारा कॉर्पोरेट विकास और विरासत",
        gu: "અમારો કોર્પોરેટ વિકાસ અને વારસો"
      });
  const subtitle = language === "en"
    ? (section?.subtitle || "Over 38 Years of Pure Heritage")
    : localize({
        en: "Over 38 Years of Pure Heritage",
        hi: "38+ वर्षों की शुद्ध विरासत",
        gu: "૩૮+ વર્ષનો ગૌરવશાળી વારસો"
      });
  const content = language === "en"
    ? (section?.content || "Established as Prakash Agro Mills, a family-managed partnership, our firm successfully built a reputation for excellence. To support expansion and federal-scale bulk trading under the leadership of CA Prakashchand Bachhawat, the business transitioned into a Public Limited Company on March 31, 2025, operating under the name Punitdhan Pulses Limited.")
    : localize({
        en: "Established as Prakash Agro Mills, a family-managed partnership, our firm successfully built a reputation for excellence. To support expansion and federal-scale bulk trading under the leadership of CA Prakashchand Bachhawat, the business transitioned into a Public Limited Company on March 31, 2025, operating under the name Punitdhan Pulses Limited.",
        hi: "1988 में प्रकाश एग्रो मिल्स के रूप में स्थापित, हमारे फर्म ने उत्कृष्टता की प्रतिष्ठा बनाई। सीए प्रकाशचंद बाच्छावत के नेतृत्व में राष्ट्रीय स्तर के व्यापार का समर्थन करने के लिए, 31 मार्च 2025 को यह व्यवसाय 'पुनीतधन पल्सेस लिमिटेड' नाम से पब्लिक लिमिटेड कंपनी में परिवर्तित हो गया।",
        gu: "૧૯૮૮માં પ્રકાશ એગ્રો મિલ્સ તરીકે સ્થપાયેલી અમારી પેઢીએ શ્રેષ્ઠ ગુણવત્તા માટે વિશિષ્ટ નામના મેળવી. CA પ્રકાશચંદ બચ્છાવતના નેતૃત્વ હેઠળ વ્યાપક વિકાસ અને રાષ્ટ્રીય સ્તરના વેપાર માટે, ૩૧ માર્ચ ૨૦૨૫ના રોજ આ વ્યવસાય 'પુનીતધન પલ્સ લિમિટેડ' પબ્લિક લિમિટેડ કંપનીમાં પરિવર્તિત થયો."
      });
  const aboutImage = section?.images?.[0] || "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800";

  return (
    <section id="about" className="py-24 bg-brand-bg-light relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-45 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Dynamic CMS-backed Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20 font-sans">
          {/* Left Column: Title & Badge */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-4xl sm:text-5xl font-serif text-zinc-950 tracking-tight leading-[1.12] font-semibold">
              {title}
            </h2>
          </div>

          {/* Right Column: Text Content */}
          <div className="lg:col-span-7 space-y-8 lg:pt-8">
            <p className="text-zinc-700 leading-relaxed text-sm sm:text-base lg:text-lg font-sans font-medium max-w-2xl font-semibold">
              {content}
            </p>
          </div>
        </div>

        {/* Corporate Core Pillars Card Display */}
        <div id="services-section" className="relative isolate z-0 bg-[#fbfcfa] rounded-[3rem] border border-zinc-200/60 p-6 sm:p-12 lg:p-16 overflow-hidden shadow-[0_30px_70px_rgba(15,46,30,0.04)] mb-16 text-zinc-900 transition-all duration-500">
          
          <div className="absolute inset-4 border border-dashed border-zinc-200/35 pointer-events-none rounded-[2.2rem]" />
          <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-brand-green-mid/20 pointer-events-none" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-brand-green-mid/20 pointer-events-none" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-brand-green-mid/20 pointer-events-none" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-brand-green-mid/20 pointer-events-none" />

          <div className="relative z-10 space-y-12">
            
            {/* Core Pillars Header */}
            <div className="space-y-4">
              <h3 className="text-3xl sm:text-4xl font-serif text-zinc-950 tracking-tight font-extrabold leading-tight">
                {localize({ en: "Our Corporate Core Pillars", hi: "हमारे कॉर्पोरेट मुख्य आधार स्तंभ", gu: "અમારા કોર્પોરેટ મુખ્ય આધારસ્તંભો" })}
              </h3>
              <p className="text-zinc-650 font-sans text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                Punitdhan Pulses stands firm on the principles of technological innovation, robust community partnerships, national developmental impact, and global market outreach.
              </p>

              {/* Enhanced Facets Under 1st Paragraph */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6 pt-4 border-t border-zinc-200/50 max-w-4xl">
                <div className="flex gap-3.5 items-start bg-white/50 border border-zinc-200/40 border-l-4 border-l-brand-green-mid rounded-xl p-4 hover:shadow-xs transition-all duration-300">
                  <div className="p-2 bg-brand-green-mid/10 text-brand-green-dark rounded-lg shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-mono">
                      {localize({ en: "Technological Innovation", hi: "तकनीकी नवाचार", gu: "ટેકનોલોજીકલ ઇનોવેશન" })}
                    </h4>
                    <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                      {localize({
                        en: "Your commitment to advanced processing and modern production techniques.",
                        hi: "उन्नत प्रसंस्करण और आधुनिक उत्पादन तकनीकों के प्रति हमारी प्रतिबद्धता।",
                        gu: "અદ્યતન પ્રોસેસિંગ અને આધુનિક ઉત્પાદન પદ્ધતિઓ પ્રત્યેની પ્રતિબદ્ધતા."
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start bg-white/50 border border-zinc-200/40 border-l-4 border-l-[#f4d068] rounded-xl p-4 hover:shadow-xs transition-all duration-300">
                  <div className="p-2 bg-[#f4d068]/10 text-amber-800 rounded-lg shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-mono">
                      {localize({ en: "Community Partnership", hi: "सामुदायिक साझेदारी", gu: "સામુદાયિક ભાગીદારી" })}
                    </h4>
                    <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                      {localize({
                        en: "Your robust collaboration with local growers, farmers, and community stakeholders.",
                        hi: "स्थानीय उत्पादकों, किसानों और हितधारकों के साथ हमारा मजबूत सहयोग।",
                        gu: "સ્થાનિક ખેડૂતો અને વિવિધ સમુદાયો સાથે અમારું મજબૂત જોડાણ."
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start bg-white/50 border border-zinc-200/40 border-l-4 border-l-[#f4d068] rounded-xl p-4 hover:shadow-xs transition-all duration-300">
                  <div className="p-2 bg-[#f4d068]/10 text-amber-800 rounded-lg shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-mono">
                      {localize({ en: "National Impact", hi: "राष्ट्रीय प्रभाव", gu: "રાષ્ટ્રીય યોગદાન" })}
                    </h4>
                    <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                      {localize({
                        en: "Your contribution to national developmental goals, food security, and economic growth.",
                        hi: "राष्ट्रीय विकासात्मक लक्ष्यों, खाद्य सुरक्षा और आर्थिक विकास में योगदान।",
                        gu: "રાષ્ટ્રીય વિકાસના લક્ષ્યો, ખાદ્ય સુરક્ષા અને આર્થિક પ્રગતિમાં યોગદાન."
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start bg-white/50 border border-zinc-200/40 border-l-4 border-l-brand-green-mid rounded-xl p-4 hover:shadow-xs transition-all duration-300">
                  <div className="p-2 bg-brand-green-mid/10 text-brand-green-dark rounded-lg shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-mono">
                      {localize({ en: "Operational Excellence", hi: "परिचालन उत्कृष्टता", gu: "ઓપરેશનલ શ્રેષ્ઠતા" })}
                    </h4>
                    <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                      {localize({
                        en: "Driven by your extremely efficient production team and highly diligent managers to deliver top quality within strict time frames.",
                        hi: "कुशल उत्पादन टीम और निष्ठावान प्रबंधकों द्वारा निर्धारित समय सीमा में शीर्ष गुणवत्ता प्रदान करना।",
                        gu: "કાર્યક્ષમ પ્રોડક્શન ટીમ અને સમર્પિત મેનેજરો દ્વારા સમયમર્યાદામાં શ્રેષ્ઠ ગુણવત્તાની ડિલિવરી."
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* About us dynamic secondary quote */}
          <div className="mt-16 pt-8 border-t border-zinc-200/60 text-center text-zinc-600 text-sm sm:text-base font-serif italic max-w-4xl mx-auto leading-relaxed">
            {localize({
              en: "Today, with the help of an extremely efficient production team and highly diligent managers, the firm has been successful in making the best quality of its products available for the market within the stipulated time frames.",
              hi: "आज, एक अत्यंत कुशल उत्पादन टीम और अत्यधिक मेहनती प्रबंधकों की मदद से, फर्म निर्धारित समय सीमा के भीतर बाजार के लिए अपने उत्पादों की सर्वोत्तम गुणवत्ता उपलब्ध कराने में सफल रही है।",
              gu: "આજે, અત્યંત કાર્યક્ષમ પ્રોડક્શન ટીમ અને સમર્પિત મેનેજરોના સહયોગથી, કંપની નિર્ધારિત સમયમર્યાદામાં બજાર માટે શ્રેષ્ઠ ગુણવત્તાયુક્ત ઉત્પાદનો ઉપલબ્ધ કરાવવામાં સફળ રહી છે."
            })}
          </div>

        </div>

        {/* Operational Framework & Technical Pillars */}
        <div id="tech-pillars-section" className="mt-28 bg-[#092215] text-white rounded-[2.5rem] border border-brand-green-mid/20 p-6 sm:p-10 lg:p-16 overflow-hidden shadow-[0_30px_70px_rgba(9,34,21,0.25)] relative">
          
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-gold/10 rounded-full blur-[80px] pointer-events-none -z-10 opacity-60" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-green-dark/10 rounded-full blur-[80px] pointer-events-none -z-10 opacity-70" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12 relative z-10">
            <div className="lg:col-span-6 space-y-3">
              <h3 className="text-3xl sm:text-4xl font-serif text-white tracking-tight font-extrabold leading-tight">
                {localize({ en: "Operational Excellence & Agri-Tech Pillars", hi: "परिचालन उत्कृष्टता और कृषि-तकनीक स्तंभ", gu: "ઓપરેશનલ શ્રેષ્ઠતા અને એગ્રી-ટેક આધારસ્તંભો" })}
              </h3>
            </div>

            <div className="lg:col-span-6 lg:pl-8 space-y-6">
              <p className="text-white/70 text-sm leading-relaxed font-sans font-light">
                {localize({
                  en: "Leveraging cutting-edge processing automation and rigorous quality benchmarks to ensure pristine grain refinement.",
                  hi: "अनाज के शुद्धिकरण को सुनिश्चित करने के लिए अत्याधुनिक प्रसंस्करण स्वचालन और कठोर गुणवत्ता मानकों का लाभ उठाना।",
                  gu: "શુદ્ધ અનાજ પ્રોસેસિંગ સુનિશ્ચિત કરવા અદ્યતન ઓટોમેશન અને કડક ગુણવત્તા માપદંડોનો સમન્વય."
                })}
              </p>
              
              <div className="flex flex-nowrap overflow-x-auto scrollbar-none gap-x-6 sm:gap-x-8 gap-y-2 border-b border-white/10 pb-4">
                {(["sorting", "eco"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActivePillarTab(tab)}
                    className="relative pb-3 text-xs font-mono font-medium tracking-widest uppercase transition-all duration-300 cursor-pointer"
                  >
                    <span className={activePillarTab === tab ? "text-white" : "text-white/40 hover:text-white/75"}>
                      {tab === "sorting" && localize({ en: "Milling Sorting", hi: "मिलिंग छंटाई", gu: "મિલિંગ સોર્ટિંગ" })}
                      {tab === "eco" && localize({ en: "Eco Impact", hi: "पर्यावरण प्रभाव", gu: "પર્યાવરણ પ્રભાવ" })}
                    </span>
                    {activePillarTab === tab && (
                      <motion.div
                        layoutId="activePillarTabLine"
                        className="absolute bottom-[-1px] left-0 right-0 h-[1.5px] bg-[#fcf3c6]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative min-h-[340px] pt-4">
            <AnimatePresence mode="wait">
              {activePillarTab === "sorting" && (
                <motion.div
                  key="sorting-tab"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                >
                  <div className="lg:col-span-7 space-y-6">
                    <h4 className="text-xl sm:text-2xl font-serif text-white tracking-tight font-bold">
                      {localize({ en: "Optical Color Sorting Technology", hi: "ऑप्टिकल कलर सॉर्टिंग तकनीक", gu: "ઓપ્ટિકલ કલર સોર્ટિંગ ટેકનોલોજી" })}
                    </h4>
                    <p className="text-white/75 font-sans text-sm leading-relaxed font-light max-w-xl">
                      {localize({
                        en: "Punitdhan processing structures integrate optical laser sortex and high-capacity gravity destoners. This automated layout eliminates black grain, visual defects, tiny agricultural weeds, and sand particles, offering standard grade-A+ food security solutions for institutional partners.",
                        hi: "पुनीतधन प्रसंस्करण इकाइयों में ऑप्टिकल लेजर सॉर्टेक्स और उच्च क्षमता वाले ग्रेविटी डीस्टोनर शामिल हैं। यह स्वचालित प्रणाली काले दाने, दृश्य दोष, खरपतवार और रेत के कणों को हटाती है, जो भागीदारों के लिए ग्रेड-ए+ खाद्य सुरक्षा समाधान प्रदान करती है।",
                        gu: "પુનીતધન પ્રોસેસિંગ યુનિટ્સમાં ઓપ્ટિકલ લેસર સોર્ટેક્સ અને હાઇ-કેપેસિટી ડી-સ્ટોનર્સ કાર્યરત છે. આ ઓટોમેટેડ સિસ્ટમ ખરાબ દાણા, કચરો અને કાંકરી દૂર કરી ગ્રેડ-A+ શુદ્ધતા પ્રદાન કરે છે."
                      })}
                    </p>
                    <div className="grid grid-cols-2 gap-8 pt-4 border-t border-white/5 font-sans">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block font-bold">
                          {localize({ en: "DAILY MILLING RUN", hi: "दैनिक मिलिंग क्षमता", gu: "દૈનિક મિલિંગ ક્ષમતા" })}
                        </span>
                        <p className="text-3xl font-serif text-white font-bold">
                          <RunningCounter 
                            target={400} 
                            suffix={language === "hi" ? "+ मीट्रिक टन" : language === "gu" ? "+ મેટ્રિક ટન" : "+ MT"} 
                            duration={2000} 
                          />
                        </p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block font-bold">
                          {localize({ en: "SORTEX REFINEMENT", hi: "सॉर्टेक्स परिशोधन", gu: "સોર્ટેક્સ શુદ્ધતા" })}
                        </span>
                        <p className="text-3xl font-serif text-[#fcf3c6] font-bold">
                          <RunningCounter 
                            target={99.95} 
                            decimals={2} 
                            suffix="%" 
                            duration={2200} 
                          />
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="relative overflow-hidden border border-white/15 bg-black/20 rounded-2xl shadow-2xl group/img">
                      <img 
                        src="/milling_sorting_sortex.jpg" 
                        alt="High capacity Optical Color Sortex grain refinement machine"
                        className="w-full h-64 sm:h-72 object-cover object-center transition-all duration-700 group-hover/img:scale-105"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {activePillarTab === "eco" && (
                <motion.div
                  key="eco-tab"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                >
                  <div className="lg:col-span-7 space-y-6">
                    <h4 className="text-xl sm:text-2xl font-serif text-white tracking-tight font-bold">
                      {localize({ en: "Environmental Footprint Goals", hi: "पर्यावरण अनुकूल लक्ष्य", gu: "પર્યાવરણીય ટકાઉપણું" })}
                    </h4>
                    <p className="text-white/75 font-sans text-sm leading-relaxed font-light max-w-xl">
                      {localize({
                        en: "We focus on organic growth, offering eco-conscious bi-product utilization (e.g. grain husk recycle and seed biomass conversion). Standard storage is designed with optimal natural aeration, leading to zero chemical infestation treatments and a cleaner environment.",
                        hi: "हम पर्यावरण-अनुकूल सह-उत्पाद उपयोग (जैसे भूसी पुनर्चक्रण और बीज बायोमास रूपांतरण) की पेशकश करते हुए सतत विकास पर ध्यान केंद्रित करते हैं। रासायनिक उपचार के बिना प्राकृतिक वायु संचार से स्वच्छ पर्यावरण सुनिश्चित होता है।",
                        gu: "અમે ઇકો-ફ્રેન્ડલી બાય-પ્રોડક્ટ ઉપયોગ (જેમ કે અનાજના ફોતરાંનું રિસાયક્લિંગ અને બાયોમાસ) દ્વારા ટકાઉ વિકાસ પર ભાર આપીએ છીએ. કુદરતી હવાની અવરજવર સાથે સુરક્ષિત સંગ્રહ રાખવામાં આવે છે."
                      })}
                    </p>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="relative overflow-hidden border border-white/10 bg-black/10 rounded-2xl">
                      <img 
                        src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600" 
                        alt="Eco-friendly agro processing footprint"
                        className="w-full h-56 object-cover filter grayscale transition-all duration-700 hover:grayscale-0"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
