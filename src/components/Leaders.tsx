import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Briefcase, 
  Award, 
  Clock, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  Check, 
  Sparkles
} from "lucide-react";
import { LEADERS } from "../data";
import { useLanguage } from "../context/LanguageContext";
import { useCMS } from "../context/CMSContext";

// Mapping of high-fidelity premium professional corporate portraits
const LEADER_IMAGES: Record<string, string> = {
  prakashchand: "/prakashchand.jpg",
  punit: "/punit.jpg",
  dhanashree: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
  chika: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800"
};

const LEADER_STATS: Record<string, {
  record: { en: string; hi: string; gu: string };
  focus: { en: string; hi: string; gu: string };
  tag: { en: string; hi: string; gu: string };
  signature: string;
}> = {
  prakashchand: {
    record: { en: "38+ Years", hi: "38+ वर्ष", gu: "૩૮+ વર્ષ" },
    focus: { en: "Strategic Growth", hi: "रणनीतिक विस्तार", gu: "વ્યૂહાત્મક સ્કેલિંગ" },
    tag: { en: "Founder & MD", hi: "संस्थापक और एमडी", gu: "સ્થાપક અને એમડી" },
    signature: "Prakashchand Bachhawat"
  },
  punit: {
    record: { en: "12+ Years", hi: "12+ वर्ष", gu: "૧૨+ વર્ષ" },
    focus: { en: "Fiduciary Control", hi: "वित्तीय नियंत्रण", gu: "નાણાકીય નિયંત્રણ" },
    tag: { en: "CFO & Director", hi: "सीएफओ और निदेशक", gu: "સીએફઓ અને ડિરેક્ટર" },
    signature: "Punit Bachhawat"
  },
  dhanashree: {
    record: { en: "8+ Years", hi: "8+ वर्ष", gu: "૮+ વર્ષ" },
    focus: { en: "People Operations", hi: "मानव संसाधन संचालन", gu: "માનવ સંસાધન સંચાલન" },
    tag: { en: "HR Principal", hi: "एचआर प्रमुख", gu: "એચઆર હેડ" },
    signature: "Dhanashree Bachhawat"
  },
  chika: {
    record: { en: "10+ Years", hi: "10+ वर्ष", gu: "૧૦+ વર્ષ" },
    focus: { en: "CSR & Ethics", hi: "सामुदायिक कल्याण", gu: "સમુદાય કલ્યાણ" },
    tag: { en: "Governance Director", hi: "शासन निदेशक", gu: "ગવર્નન્સ ડિરેક્ટર" },
    signature: "Chika Bachhawat"
  }
};

export default function Leaders() {
  const [selectedLeaderId, setSelectedLeaderId] = useState<string | null>(null);
  const { localize, language } = useLanguage();
  const { pages, activePageSlug } = useCMS();

  const activePage = pages.find(p => p.slug === activePageSlug) || pages[0];
  const section = activePage.sections.find(s => s.type === "leaders");

  const sectionTitle = section?.title || "Board of Directors";
  const sectionSubtitle = section?.subtitle || "TRUSTED STEWARDSHIP & STRATEGIC BOARD";
  const sectionContent = section?.content || "Governed by certified Chartered Accountants and human capital strategists who merge stringent physical audit systems with unmatched agrarian marketing intelligence.";

  const leadersList = section?.items || LEADERS;

  const getLocalizedLeaderName = (id: string, defName: string) => {
    if (language === "hi") {
      switch (id) {
        case "prakashchand": return "सीए प्रकाशचंद बाच्छावत";
        case "punit": return "सीए पुनीत बाच्छावत";
        case "dhanashree": return "सीए धनश्री बाच्छावत";
        case "chika": return "श्रीमती चिका बाच्छावत";
        default: return defName;
      }
    }
    if (language === "gu") {
      switch (id) {
        case "prakashchand": return "સીએ પ્રકાશચંદ બાચ્છાવત";
        case "punit": return "સીએ પુનીત બાચ્છાવત";
        case "dhanashree": return "સીએ ધનશ્રી બાચ્છાવત";
        case "chika": return "શ્રીમતી ચીકા બાચ્છાવત";
        default: return defName;
      }
    }
    return defName;
  };

  const getLocalizedLeaderTitle = (id: string, defTitle: string) => {
    if (language === "hi") {
      switch (id) {
        case "prakashchand": return "दूरदर्शी संस्थापक और प्रबंध निदेशक";
        case "punit": return "निदेशक एवं मुख्य वित्तीय अधिकारी (CFO)";
        case "dhanashree": return "मानव संसाधन प्रमुख (HR Head)";
        case "chika": return "साझेदार एवं निदेशक";
        default: return defTitle;
      }
    }
    if (language === "gu") {
      switch (id) {
        case "prakashchand": return "દૂરંદેશી સ્થાપક અને મેનેજિંગ ડિરેક્ટર";
        case "punit": return "ડિરેક્ટર અને ચીફ ફાઇનાન્સિયલ ઓફિસર (CFO)";
        case "dhanashree": return "એચઆર હેડ (HR Head)";
        case "chika": return "ભાગીદાર અને ડિરેક્ટર";
        default: return defTitle;
      }
    }
    return defTitle;
  };

  const getLocalizedLeaderRole = (id: string, defRole: string) => {
    if (language === "hi") {
      switch (id) {
        case "prakashchand": return "वह खाद्यान्न प्रसंस्करण उद्योग के प्रति गहरी रुचि रखने वाले एक अनुभवी उद्यमी हैं। 38 वर्षों से अधिक के अनुभव के साथ, उन्होंने कंपनी के विकास, पैमाने और संस्थागत सफलता को आकार देने में महत्वपूर्ण भूमिका निभाई है।";
        case "punit": return "संस्थागत विकास, कॉर्पोरेट लेखांकन, कर अनुपालन और रणनीतिक वित्तीय योजना चलाने के सिद्ध ट्रैक रिकॉर्ड वाले एक प्रतिष्ठित वित्तीय नेता।";
        case "dhanashree": return "मानव पूंजी को व्यवस्थित करने और जन-केंद्रित कार्यप्रवाहों को लागू करने पर ध्यान केंद्रित करने वाले एक सहानुभूतिपूर्ण, अत्यधिक रचनात्मक और आधुनिक नेता।";
        case "chika": return "अद्भूत मूल्य और कॉर्पोरेट प्रशासन निर्देश लाना, यह सुनिश्चित करना कि टीम नैतिकता और स्थानीयकृत सामुदायिक कल्याण सहायता में बनी रहे।";
        default: return defRole;
      }
    }
    if (language === "gu") {
      switch (id) {
        case "prakashchand": return "તેઓ ખાદ્યાન્ન પ્રોસેસિંગ ઉદ્યોગમાં ઊંડો રસ ધરાવતા અનુભવી ઉદ્યોગસાહસિક છે. ૩૮ વર્ષથી વધુના અનુભવ સાથે, તેમણે કંપનીના વિકાસ, સ્કેલ અને સંસ્થાકીય સફળતાને આકાર આપવામાં મહત્વની ભૂમિકા ભજવી છે.";
        case "punit": return "સંસ્થાકીય વૃદ્ધિ, કોર્પોરેટ એકાઉન્ટિંગ, ટેક્સ કમ્પ્લાયન્સ અને વ્યૂહાત્મક નાણાકીય આયોજન ચલાવવાના સાબિત ટ્રેક રેકોર્ડ સાથેના પ્રતિષ્ઠિત નાણાકીય અગ્રણી.";
        case "dhanashree": return "માનવ સંસાધનને વ્યવસ્થિત કરવા અને લોકો-કેન્દ્રિત કાર્યપ્રવાહના અમલીકરણ પર ધ્યાન કેન્દ્રિત કરતા એક સહાનુભૂતિશીલ, અત્યંત સર્જનાત્મક અને આધુનિક અગ્રણી.";
        case "chika": return "વિશેષ મૂલ્યો અને કોર્પોરેટ ગવર્નન્સ નિર્દેશો લાવીને, ટીમ નૈતિકતા અને સ્થાનિક સમુદાયના કલ્યાણમાં સક્રિયપણે યોગદાન આપે છે તેની ખાતરી કરે છે.";
        default: return defRole;
      }
    }
    return defRole;
  };

  const getLocalizedAchievement = (leaderId: string, idx: number, fallback: string) => {
    if (leaderId === "prakashchand") {
      if (idx === 0) return localize({
        en: "Established the foundations of premium grain milling with strict physical grain audits and clean sorting guidelines.",
        hi: "सख्त भौतिक अनाज ऑडिट और स्वच्छ छंटाई दिशानिर्देशों के साथ प्रीमियम अनाज मिलिंग की नींव स्थापित की।",
        gu: "નૈતિક અને અતિ આધુનિક અનાજ પ્રોસેસિંગના પાયાની મજબૂત સ્થાપના કરી."
      });
      if (idx === 1) return localize({
        en: "Successfully scaled our agrarian processing capacity, serving thousands of distribution networks in Western India.",
        hi: "हमारे कृषि प्रसंस्करण क्षमता को सफलतापूर्वक बढ़ाया, जिससे पश्चिमी भारत में हजारों वितरण नेटवर्क लाभान्वित हो रहे हैं।",
        gu: "પશ્ચિમ ભારતના હજારો અનાજ વિતરણ નેટવર્ક સાથે સફળ ભાગીદારી વિસ્તૃત કરી."
      });
      if (idx === 2) return localize({
        en: "Advocated directly with local farmer cooperatives to secure reliable supply chains under fair pricing models.",
        hi: "उचित मूल्य मॉडल के तहत विश्वसनीय आपूर्ति श्रृंखलाओं को सुरक्षित करने के लिए स्थानीय किसान सहकारी समितियों के साथ सीधे पैरवी की।",
        gu: "સ્થાનિક ખેડૂતો અને સંસ્થાઓ સાથે સીધા જોડાણો સ્થાપિત કરીને કિંમતો સુનિશ્ચિત કરી."
      });
    }

    if (leaderId === "punit") {
      if (idx === 0) return localize({
        en: "As CFO, CA Punit Bachhawat oversees the company's comprehensive financial planning, risk management, and capital efficiency.",
        hi: "सीएफओ के रूप में, सीए पुनीत बाच्छावत कंपनी के व्यापक वित्तीय नियोजन, जोखिम प्रबंधन और पूंजी दक्षता की देखरेख करते हैं।",
        gu: "CFO તરીકે સીએ પુનીત બાચ્છાવત કંપનીના સમગ્ર નાણાકીય આયોજન, જોખમ સંચાલન અને મૂડી દક્ષતા પર દેખરેખ રાખે છે."
      });
      if (idx === 1) return localize({
        en: "With deep, practical knowledge of the global agribusiness sector, he handles complex capital structures, treasury management, and corporate expansion plans.",
        hi: "वैश्विक कृषि व्यवसाय क्षेत्र के गहरे ज्ञान के साथ, वे जटिल पूंजी संरचनाओं और कॉर्पोरेट विस्तार योजनाओं का प्रबंधन करते हैं।",
        gu: "વૈશ્વિક કૃષિ વ્યવસાય ક્ષેત્રના ઊંડા જ્ઞાન સાથે, તેઓ જટિલ મૂડી રચનાઓ અને કોર્પોરેટ વિસ્તાર યોજનાઓનું સંચાલન કરે છે."
      });
      if (idx === 2) return localize({
        en: "He is a passionate advocate of technological integration in finance and cost efficiency, helping the brand maintain double-digit growth trajectory year-over-year.",
        hi: "वे वित्त में तकनीकी एकीकरण और लागत दक्षता के उत्साही समर्थक हैं, जो लगातार दोहरे अंकों की वृद्धि बनाए रखने में मदद करते हैं।",
        gu: "તેઓ ફાઇનાન્સમાં ટેકનોલોજીકલ એકીકરણ અને ખર્ચ દક્ષતાના સમર્થક સંચાલક છે."
      });
    }

    if (leaderId === "dhanashree") {
      if (idx === 0) return localize({
        en: "CA Dhanashree oversees comprehensive HR functions, including talent acquisition, career development, and performance appraisal metrics.",
        hi: "सीए धनश्री प्रतिभा अधिग्रहण, करियर विकास और प्रदर्शन मूल्यांकन सहित व्यापक मानव संसाधन कार्यों की देखरेख करती हैं।",
        gu: "સીએ ધનશ્રી પ્રતિભા પ્રાપ્તિ, કારકિર્દી વિકાસ અને મૂલ્યાંકન સહિત વ્યાપક માનવ સંસાધન કાર્યોની દેખરેખ રાખે છે."
      });
      if (idx === 1) return localize({
        en: "She has played a pivotal role in transitioning the company into a values-based workplace, fostering direct collaboration and professional development.",
        hi: "उन्होंने कंपनी को मूल्य-आधारित कार्यस्थल में बदलने, सीधे सहयोग और व्यावसायिक विकास को बढ़ावा देने में महत्वपूर्ण भूमिका निभाई है।",
        gu: "તેમણે કંપનીને મૂલ્ય-આધારિત કાર્યક્ષેત્રમાં પરિવર્તિત કરવામાં અને વ્યવસાયિક વિકાસને પ્રોત્સાહન આપવામાં મહત્વની ભૂમિકા ભજવી છે."
      });
      if (idx === 2) return localize({
        en: "Her initiatives align the individual growth of our 70+ skilled employees with the grand corporate projection of the enterprise.",
        hi: "उनकी पहल से 70+ योग्य कर्मचारियों की व्यक्तिगत क्षमताओं को कॉर्पोरेट लक्ष्यों के साथ संरेखित करने में मदद मिलती है।",
        gu: "તેમની પહેલથી ૭૦+ કર્મચારીઓની ક્ષમતા અને કંપનીના કોર્પોરેટ ધારાધોરણો સુસંગત બને છે."
      });
    }

    if (leaderId === "chika") {
      if (idx === 0) return localize({
        en: "Mrs. Chika Bachhawat leads CSR programs with a focus on rural nutrition and women empowerment in manufacturing areas.",
        hi: "श्रीमती चिका बाच्छावत ग्रामीण पोषण और विनिर्माण क्षेत्रों में महिला सशक्तिकरण पर ध्यान केंद्रित करते हुए सीएसआर कार्यक्रमों का नेतृत्व करती हैं।",
        gu: "શ્રીમતી ચીકા બાચ્છાવત ગ્રામીણ પોષણ અને ઉત્પાદન ક્ષેત્રોમાં મહિલા સશક્તિકરણ પર ધ્યાન કેન્દ્રિત કરતી સીએસઆર યોજનાઓનું નેતૃત્વ કરે છે."
      });
      if (idx === 1) return localize({
        en: "Her strategic counsel helps retain the values of a family legacy while scaling operations to a national corporate scale.",
        hi: "उनकी रणनीतिक सलाह राष्ट्रीय कॉर्पोरेट स्तर पर संचालन का विस्तार करते हुए पारिवारिक विरासत के मूल्यों को बनाए रखने में मदद करती है।",
        gu: "તેમની વ્યૂહાત્મક સલાહ પારિવારિક વારસાના મૂલ્યો jાળવી રાખીને રાષ્ટ્રીય સ્તરે સંગઠન વિસ્તરણમાં મદદ કરે છે."
      });
    }

    return fallback;
  };

  const getLocalizedStatLabel = (key: string) => {
    const labels: Record<string, { en: string; hi: string; gu: string }> = {
      credentials: { en: "Credentials", hi: "शैक्षिक योग्यता", gu: "લાયકાત વિગત" },
      governingRecord: { en: "Governing Record", hi: "बोर्ड अनुभव", gu: "અનુભવ શ્રેણી" },
      focusProtocol: { en: "Focus Protocol", hi: "मुख्य क्षेत्र लक्ष्य", gu: "ધ્યાन केंद्र क्षेत्र" },
      achievements: { en: "Strategic Accomplishments & Authority", hi: "रणनीतिक उपलब्धियां और मुख्य अधिकार", gu: "મુખ્ય સિદ્ધિઓ અને સત્તાવાર રેકોર્ડ" },
      statement: { en: "Visionary Board Directive", hi: "अधिशासी नीति दृष्टिकोण", gu: "મુખ્ય વક્તવ્ય" },
      signatureLabel: { en: "BOARD SIGNATURE DECREE", hi: "बोर्ड अधिकृत हस्ताक्षर", gu: "બોર્ડ સત્તાવાર સહી" },
      ctaButton: { en: "Know More", hi: "अधिक जानें", gu: "વધુ જાણો" }
    };
    return labels[key]?.[language] || labels[key]?.en || "";
  };

  const activeLeaderIndex = selectedLeaderId 
    ? LEADERS.findIndex(l => l.id === selectedLeaderId) 
    : -1;

  const handleNextLeader = () => {
    if (activeLeaderIndex !== -1) {
      const nextIdx = (activeLeaderIndex + 1) % LEADERS.length;
      setSelectedLeaderId(LEADERS[nextIdx].id);
    }
  };

  const handlePrevLeader = () => {
    if (activeLeaderIndex !== -1) {
      const prevIdx = (activeLeaderIndex - 1 + LEADERS.length) % LEADERS.length;
      setSelectedLeaderId(LEADERS[prevIdx].id);
    }
  };

  return (
    <section id="leaders" className="py-24 bg-[#FAF9F6] relative overflow-hidden font-sans border-b border-zinc-200">
      
      {/* Structural architecture faint details */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[linear-gradient(to_right,#113c2b_1px,transparent_1px),linear-gradient(to_bottom,#113c2b_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-brand-green-light/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[30rem] h-[30rem] bg-[#d1e2d3]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Modernist Editorial Header */}
        <div className="max-w-4xl mx-auto text-center mb-20 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green-dark text-brand-accent text-[10px] font-mono tracking-[0.18em] font-extrabold rounded-full uppercase shadow-xs">
            <Sparkles size={11} className="text-brand-accent animate-pulse" />
            {localize({ en: "TRUSTED STEWARDSHIP & STRATEGIC BOARD", hi: "साहसी नेतृत्व और रणनीतिक बोर्ड", gu: "સ્વપ્નદ્રષ્ટા અને સંચાલક બોર્ડ" })}
          </div>
          
          <h2 className="text-4xl sm:text-6xl font-serif text-brand-green-dark tracking-tight font-black relative">
            {localize({ en: "Board of Directors", hi: "निदेशक मंडल (बोर्ड ऑफ डायरेक्टर्स)", gu: "બોર્ડ ઓફ ડિરેક્ટર્સ (નિર્દેશક મંડળ)" })}
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-[3px] bg-brand-accent rounded-full mb-1" />
          </h2>
          
          <p className="text-gray-500 text-sm sm:text-base font-sans max-w-2xl mx-auto leading-relaxed pt-2">
            {localize({
              en: "Governed by certified Chartered Accountants and human capital strategists who merge stringent physical audit systems with unmatched agrarian marketing intelligence.",
              hi: "प्रमाणित चार्टर्ड अकाउंटेंट्स और मानव पूंजी रणनीतिकारों द्वारा निर्देशित, जो बेजोड़ कृषि विपणन खुफिया जानकारी के साथ सख्त भौतिक ऑडिट प्रणालियों को जोड़ते हैं।",
              gu: "સરકારી કાયદાઓને આધીન લાયકાત ધરાવતા સીએ નાણાકીય નિષ્ણાતો અને અનુભવી સંચાલકો દ્વારા સંચાલિત શુદ્ધ વ્યવસ્થા જે અતુટ વિશ્વાસ જાળવી રાખે છે."
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leadersList.map((leader, index) => {
            const locName = getLocalizedLeaderName(leader.id, leader.name);
            const locTitle = getLocalizedLeaderTitle(leader.id, leader.title);
            const leaderImg = LEADER_IMAGES[leader.id];
            const stats = LEADER_STATS[leader.id];

            return (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative flex flex-col bg-white rounded-[2rem] border border-zinc-200 border-l-4 ${index % 2 === 0 ? "border-l-brand-green-mid" : "border-l-[#f4d068]"} shadow-sm hover:shadow-xl hover:border-brand-green-dark/20 hover:-translate-y-1.5 transition-all duration-500 overflow-hidden cursor-pointer`}
                onClick={() => setSelectedLeaderId(leader.id)}
              >
                {/* Image Wrap - Full size photo */}
                <div className="relative aspect-[4/4.8] overflow-hidden bg-white flex items-center justify-center border-b border-zinc-100 p-2">
                  {/* Executive Tag Floating */}
                  <span className="absolute top-3 left-3 z-20 bg-brand-green-dark/90 backdrop-blur-xs text-[#f4d068] text-[9px] font-mono tracking-widest px-2.5 py-1 rounded-full uppercase border border-white/10 font-bold shadow-xs">
                    {stats.tag[language] || stats.tag.en}
                  </span>

                  <img
                    src={leaderImg}
                    alt={leader.name}
                    className="w-full h-full object-contain object-top transition-transform duration-700 ease-out group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Card footer description */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-white space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-widest text-[#b45309] bg-[#fffbeb] border border-[#fde68a] px-2.5 py-0.5 rounded-full uppercase font-bold inline-block">
                      {stats.record[language] || stats.record.en} {localize({ en: "DIRECTIVE", hi: "निदेशक", gu: "નિર્દેશક" })}
                    </span>
                    <div>
                      <h4 className="font-serif font-black text-lg tracking-tight leading-tight text-zinc-950 group-hover:text-brand-green-dark transition-colors">
                        {locName}
                      </h4>
                      <p className="text-[11px] text-brand-green-mid font-mono uppercase tracking-wider font-bold mt-0.5">
                        {locTitle}
                      </p>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3 font-medium pt-1">
                      {getLocalizedLeaderRole(leader.id, leader.role)}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-brand-green-dark group-hover:text-brand-green-light transition-colors">
                    <span className="text-[11px] font-mono tracking-wider font-extrabold uppercase">
                      {getLocalizedStatLabel("ctaButton")}
                    </span>
                    <ChevronRight size={13} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>


        {/* Dynamic Lightbox Details Modal */}
        <AnimatePresence>
          {selectedLeaderId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              
              {/* Animated Glass Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedLeaderId(null)}
                className="absolute inset-0 bg-black/75 backdrop-blur-md"
              />

              {/* Modal Core Frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.55 }}
                className="bg-white rounded-[2.5rem] w-full max-w-5xl shadow-2xl overflow-hidden relative border border-zinc-700/10 z-10 max-h-[90vh] md:max-h-none flex flex-col md:grid md:grid-cols-12"
              >
                
                {/* Top Control Rail (Absolute utility actions) */}
                <button
                  onClick={() => setSelectedLeaderId(null)}
                  className="absolute top-5 right-5 z-40 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 md:bg-zinc-100 md:hover:bg-zinc-200 border border-white/20 md:border-zinc-200 text-white md:text-zinc-600 flex items-center justify-center transition-all cursor-pointer shadow-md group/close"
                  aria-label="Close details"
                >
                  <X size={18} className="transform group-hover/close:rotate-90 transition-transform duration-300" />
                </button>

                {/* Profile Visual Display Side (Col-span 5) */}
                <div className="relative col-span-5 aspect-[4/3] md:aspect-auto md:h-full min-h-[280px] md:min-h-[550px] bg-white overflow-hidden flex flex-col justify-end">
                  <img
                    src={LEADER_IMAGES[selectedLeaderId]}
                    alt={LEADERS[activeLeaderIndex].name}
                    className="absolute inset-0 w-full h-full object-contain object-top"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle bottom shadow overlay to keep typography readable */}
                  <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10" />

                  {/* Highlight corner brackets */}
                  <div className="absolute top-6 left-6 w-5 h-5 border-t-2 border-l-2 border-zinc-300/60 z-20" />
                  <div className="absolute bottom-6 left-6 w-5 h-5 border-b-2 border-l-2 border-brand-accent/50 z-20" />

                  <div className="p-8 relative z-20 text-white space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-accent text-brand-green-dark text-[9px] font-mono tracking-widest font-black rounded-full uppercase shadow-sm">
                      ★ {LEADER_STATS[selectedLeaderId].tag[language] || LEADER_STATS[selectedLeaderId].tag.en}
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-sans text-white font-extrabold tracking-tight">
                      {getLocalizedLeaderName(selectedLeaderId, LEADERS[activeLeaderIndex].name)}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-accent font-semibold tracking-wide font-sans">
                      {getLocalizedLeaderTitle(selectedLeaderId, LEADERS[activeLeaderIndex].title)}
                    </p>
                  </div>
                </div>

                {/* Profile Narrative details side (Col-span 7) */}
                <div className="col-span-7 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto max-h-[55vh] md:max-h-[650px] bg-white">
                  <div className="space-y-6 flex-1">
                    
                    {/* Multilingual Micro Credentials Slots */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      
                      <div className="p-3.5 bg-zinc-50 border border-zinc-200/60 rounded-2xl flex items-start gap-2.5">
                        <Award size={18} className="text-brand-green-light mt-0.5" />
                        <div>
                          <span className="text-[9px] font-mono font-bold text-gray-400 block uppercase tracking-wider">
                            {getLocalizedStatLabel("credentials")}
                          </span>
                          <span className="text-xs font-bold text-brand-green-dark block mt-0.5 tracking-tight font-sans">
                            {selectedLeaderId === "prakashchand" || selectedLeaderId === "punit" || selectedLeaderId === "dhanashree" ? localize({ en: "CA (Chartered Accountant)", hi: "सीए (चार्टर्ड अकाउंटेंट)", gu: "સીએ (ચાર્ટર્ડ એકાઉન્ટન્ટ)" }) : localize({ en: "Governance Expert", hi: "प्रशासन विशेषज्ञ", gu: "ગવર્નન્સ નિષ્ણાત" })}
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 bg-zinc-50 border border-zinc-200/60 rounded-2xl flex items-start gap-2.5">
                        <Clock size={16} className="text-brand-green-light mt-0.5" />
                        <div>
                          <span className="text-[9px] font-mono font-bold text-gray-400 block uppercase tracking-wider">
                            {getLocalizedStatLabel("governingRecord")}
                          </span>
                          <span className="text-xs font-bold text-brand-green-dark block mt-0.5 tracking-tight font-sans">
                            {LEADER_STATS[selectedLeaderId].record[language] || LEADER_STATS[selectedLeaderId].record.en}
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 bg-zinc-50 border border-zinc-200/60 rounded-2xl flex items-start gap-2.5">
                        <Briefcase size={16} className="text-brand-green-light mt-0.5" />
                        <div>
                          <span className="text-[9px] font-mono font-bold text-gray-400 block uppercase tracking-wider">
                            {getLocalizedStatLabel("focusProtocol")}
                          </span>
                          <span className="text-xs font-bold text-brand-green-dark block mt-0.5 tracking-tight font-sans text-wrap">
                            {LEADER_STATS[selectedLeaderId].focus[language] || LEADER_STATS[selectedLeaderId].focus.en}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Editorial Perspective Quote Box */}
                    <div className="relative p-5 bg-radial-[circle_at_top_left,rgba(251,252,250,1),rgba(243,246,243,0.7)] rounded-2xl border border-[#d1e2d3]/50">
                      <Quote size={28} className="absolute top-3 right-4 opacity-10 text-brand-green-light" />
                      
                      <span className="text-[9px] font-mono font-extrabold text-brand-green-dark uppercase tracking-widest block mb-2">
                        {getLocalizedStatLabel("statement")}
                      </span>
                      
                      <p className="text-xs sm:text-[13px] font-sans italic text-zinc-700 leading-relaxed font-semibold">
                        "{getLocalizedLeaderRole(selectedLeaderId, LEADERS[activeLeaderIndex].role)}"
                      </p>
                    </div>

                    {/* Narrative Accomplishments */}
                    <div className="space-y-3">
                      <h5 className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest font-extrabold flex items-center gap-1.5">
                        <Award size={13} className="text-brand-green-light" />
                        {getLocalizedStatLabel("achievements")}
                      </h5>
                      
                      <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed font-medium bg-zinc-50/70 p-4 rounded-xl border border-zinc-200/20">
                        {LEADERS[activeLeaderIndex].description.map((achievement, idx) => 
                          getLocalizedAchievement(selectedLeaderId || LEADERS[activeLeaderIndex].id, idx, achievement)
                        ).join(" ")}
                      </p>
                    </div>
                  </div>

                  {/* Modal Footer (Asymmetric Signature and Carousel Controls) */}
                  <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-5">
                    
                    {/* Simulated elegant hand signature layout */}
                    <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200/50 py-2.5 px-4 rounded-xl">
                      <div className="text-left">
                        <span className="text-[11.5px] font-sans italic text-brand-green-dark block font-bold leading-tight tracking-wide">
                          {LEADER_STATS[selectedLeaderId].signature}
                        </span>
                        <span className="text-[9px] font-mono text-zinc-400 font-bold block uppercase tracking-wider mt-0.5">
                          {getLocalizedStatLabel("signatureLabel")}
                        </span>
                      </div>
                    </div>

                    {/* Micro controls to flip to another executive with 44px hit targets */}
                    <div className="flex items-center justify-end gap-2.5">
                      <button
                        onClick={handlePrevLeader}
                        className="w-11 h-11 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-all cursor-pointer group/nav"
                        aria-label="Previous executive"
                      >
                        <ChevronLeft size={18} className="transform group-hover/nav:-translate-x-0.5 transition-transform" />
                      </button>
                      
                      <span className="text-xs font-mono font-bold text-zinc-400 px-1">
                        {activeLeaderIndex + 1} / {LEADERS.length}
                      </span>

                      <button
                        onClick={handleNextLeader}
                        className="w-11 h-11 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-all cursor-pointer group/nav"
                        aria-label="Next executive"
                      >
                        <ChevronRight size={18} className="transform group-hover/nav:translate-x-0.5 transition-transform" />
                      </button>
                    </div>

                  </div>

                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
