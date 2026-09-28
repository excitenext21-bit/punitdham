import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, ShieldCheck, Award, Users, Briefcase, MapPin, Mail, Phone, 
  Compass, Goal, CheckCircle2, ArrowRight, Star, Heart, Flame, ShieldAlert,
  Globe2, Landmark, GraduationCap, ChevronRight, Scale, Calendar, Sparkles, Quote,
  Droplet, Layers, Check, Sprout, User, List, LayoutGrid, Clock, X, ChevronLeft, TrendingUp,
  UploadCloud, FileText
} from "lucide-react";
import { useCMS } from "../context/CMSContext";
import { useLanguage } from "../context/LanguageContext";
import OrganizationDetails from "./OrganizationDetails";
import { LEADERS } from "../data";

// Mapping of high-fidelity premium professional corporate portraits
const LEADER_IMAGES: Record<string, string> = {
  prakashchand: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
  punit: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
  dhanashree: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
  chika: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800"
};

// Reusable premium shimmering lights background animation for inner page banners
function ShiningLightsBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Base radial grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-[0.07] z-0" />
      
      {/* Ambient glowing gold light orb */}
      <motion.div
        className="absolute -top-44 -left-44 w-[500px] h-[500px] rounded-full bg-[#f4d068] filter blur-[120px]"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          opacity: [0.15, 0.25, 0.18, 0.15],
          scale: [1, 1.15, 0.9, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Ambient glowing emerald light orb */}
      <motion.div
        className="absolute -bottom-48 -right-48 w-[600px] h-[600px] rounded-full bg-[#10b981] filter blur-[130px]"
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
          opacity: [0.12, 0.22, 0.15, 0.12],
          scale: [1, 1.1, 0.95, 1]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Shimmering spotlight beam effect */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-[#34d399] filter blur-[110px]"
        animate={{
          opacity: [0.06, 0.14, 0.09, 0.06],
          scale: [0.8, 1.15, 0.9, 0.8]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
}

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
    record: { en: "12+ Years", hi: "12+ वर्ष", gu: "૧૨+ वर्ष" },
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

interface InnerPagesProps {
  activePageSlug: string;
  onInquireProduct?: (productName: string) => void;
}

export default function InnerPages({ activePageSlug, onInquireProduct }: InnerPagesProps) {
  const { globalSettings, pages, submitCandidate } = useCMS();
  const [productTab, setProductTab] = React.useState("all");
  const [productViewMode, setProductViewMode] = React.useState<"card" | "list" | "detail">("card");
  const [activeSpecProductId, setActiveSpecProductId] = React.useState<string>("chana");

  // Careers Form states
  const [careerForm, setCareerForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    position: "Senior Mill Operator / Milling Tech",
    experience: "1-3 Years Professional Experience",
    message: ""
  });
  const [resumeFile, setResumeFile] = React.useState<{
    name: string;
    size: string;
    type: string;
    dataUrl: string;
  } | null>(null);
  const [isSubmittingCareer, setIsSubmittingCareer] = React.useState(false);
  const [careerSubmitSuccess, setCareerSubmitSuccess] = React.useState(false);
  const [dragActive, setDragActive] = React.useState(false);
  const careerFileInputRef = React.useRef<HTMLInputElement>(null);

  // Board of Directors interactive states
  const [viewMode, setViewMode] = React.useState<"card" | "list" | "detail">("card");
  const [activeLeaderId, setActiveLeaderId] = React.useState<string>("prakashchand");
  const [selectedLeaderId, setSelectedLeaderId] = React.useState<string | null>(null);

  const { language, localize } = useLanguage();

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
        case "prakashchand": return "તેઓ ખાદ્યાન્ન પ્રોસેસિંગ ઉદ્યોગમાં ઊંડો રસ ધરાવતા અનુભવી ઉદ્યોગસાહસિક છે. ૩૮ વર્ષથી વધુના અનુભવ સાથે, તેમણે કંપનીના વિકાસ, સ્કેલ અને સંસ્થકીય સફળતાને આકાર આપવામાં મહત્વની ભૂમિકા ભજવી છે.";
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
        gu: "વૈશ્વિક કૃષિ વ્યવસાય ક્ષેત્રના ઊંડા જ્ઞાન સાથે, તેઓ જકિલ મૂડી રચનાઓ અને કોર્પોરેટ વિસ્તાર યોજનાઓનું સંચાલન કરે છે."
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
      focusProtocol: { en: "Focus Protocol", hi: "मुख्य क्षेत्र लक्ष्य", gu: "ધ્યાન केंद्र क्षेत्र" },
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

  // Form and submit states for Connect page
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<"idle" | "success" | "error">("idle");

  // Scroll handler for button CTAs
  const handleScrollToContact = (e: React.MouseEvent, productName?: string) => {
    e.preventDefault();
    if (productName && onInquireProduct) {
      onInquireProduct(productName);
    }
    const footer = document.querySelector("#contact");
    if (footer) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(footer as HTMLElement, {
          offset: -80,
          duration: 1.6,
        });
      } else {
        footer.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.4 } }
  };

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  // Render Inner Page 1: CORPORATE PROFILE (ABOUT US)
  if (activePageSlug === "about-us") {
    return (
      <motion.div 
        key="about-us"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="pb-24 bg-brand-bg-light"
      >
        {/* Banner with modern glassmorphism overlay and ambient glow */}
        <div className="bg-[#0b2418] text-white pt-36 pb-20 px-6 md:px-12 text-center relative overflow-hidden">
          <ShiningLightsBackground />
          
          <div className="max-w-4xl mx-auto space-y-5 relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-white leading-tight">
              Corporate Profile & Heritage
            </h1>
            <p className="text-gray-300 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              A journey of pure quality, trusted agro-standards, and cooperative excellence since 1988.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-20">
          
          {/* Section 1: Genesis & Evolutionary Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left Column: Genesis Callout */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-3xl border border-zinc-200/80 border-l-4 border-l-brand-green-mid p-8 md:p-10 shadow-[0_20px_50px_rgba(15,46,30,0.02)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green-light/10 rounded-full filter blur-2xl group-hover:scale-125 transition-transform duration-700" />
              <div className="space-y-6 relative z-10">
                <div className="p-3 bg-brand-green-dark/5 rounded-2xl w-fit text-brand-green-dark border border-brand-green-dark/10">
                  <Compass className="w-6 h-6 stroke-[2]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight leading-snug">
                  38+ Years of Uncompromising Purity
                </h2>
                
                {/* Custom Quote Box */}
                <div className="border-l-4 border-[#f4d068] pl-4 py-1 my-4 bg-amber-50/40 rounded-r-xl">
                  <Quote className="w-6 h-6 text-[#f4d068]/60 mb-1" />
                  <p className="text-sm font-serif italic text-zinc-800 leading-relaxed">
                    "From a single local processing plant in Gujarat to one of Western India's most trusted public corporate agro-commodity networks."
                  </p>
                </div>

                <p className="text-zinc-650 leading-relaxed text-sm sm:text-base">
                  Founded on <strong>April 1, 1988</strong>, as <em>Prakash Agro Mills</em>, our organization spent nearly four decades solidifying its positioning as a foundational leader in the Indian agrifood market. To accommodate structural scale, broaden institutional capital opportunities, and optimize governance transparency, the entity officially transitioned into its current public corporate structure as <strong>Punitdhan Pulses Limited on March 31, 2025</strong>. This milestone marks an exciting new era of global standards.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-100 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>ESTD. 1988</span>
                <span>STATE-OF-THE-ART MILLING</span>
              </div>
            </div>

            {/* Right Column: Premium Interactive Timeline */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-zinc-200/80 border-l-4 border-l-[#f4d068] p-8 md:p-10 shadow-[0_20px_50px_rgba(15,46,30,0.02)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center">
              <div className="space-y-3 mb-8">
                <span className="text-[10px] font-mono tracking-widest text-[#f4d068] uppercase font-bold bg-[#f4d068]/10 px-3 py-1 rounded-full border border-[#f4d068]/20">
                  Milestones
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-zinc-900">
                  Our Evolutionary Timeline
                </h3>
              </div>

              <div className="relative pl-6 sm:pl-8 border-l border-zinc-200/80 space-y-10 py-2">
                {[
                  {
                    year: "1988",
                    title: "The Genesis & Foundation",
                    desc: "Prakash Agro Mills is founded on April 1, pioneering local raw grain processing and standardizing grading methodologies.",
                    badge: "Prakash Agro Mills"
                  },
                  {
                    year: "2005",
                    title: "Infrastructure & National Network",
                    desc: "Expanded processing capacity to over 100 metric tons daily and built cooperative partnerships with mandis across multiple states.",
                    badge: "Scale Phase"
                  },
                  {
                    year: "2018",
                    title: "Advanced Tech Integration",
                    desc: "Implemented high-precision computerized Sortex sorting and mechanical purification systems ensuring 99.9% grain purity.",
                    badge: "Computerized Sortex"
                  },
                  {
                    year: "2025",
                    title: "Public Corporate Transition",
                    desc: "Officially incorporated as Punitdhan Pulses Limited on March 31, introducing supreme audit compliance and institutional transparency.",
                    badge: "Punitdhan Pulses"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="relative group">
                    {/* Glowing outer circle indicator */}
                    <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-brand-green-dark flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:bg-[#f4d068] group-hover:border-[#f4d068] shadow-sm z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-green-dark group-hover:bg-brand-green-dark" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-lg font-serif font-bold text-brand-green-dark bg-brand-green-dark/5 px-2.5 py-0.5 rounded-lg border border-brand-green-dark/10">
                          {item.year}
                        </span>
                        <span className="text-[10px] font-mono font-medium tracking-wide text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200/50 uppercase">
                          {item.badge}
                        </span>
                      </div>
                      <h4 className="font-bold text-zinc-900 font-sans text-sm sm:text-base group-hover:text-brand-green-dark transition-colors duration-300">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-550 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Vision, Mission & Values Bento Box */}
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-[#f4d068] uppercase font-bold bg-[#f4d068]/10 px-3 py-1 rounded-full border border-[#f4d068]/20">
                Corporate Intent
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
                Our Purpose Frameworks
              </h2>
              <p className="text-zinc-500 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                A systemized approach to food security, agrarian partnership, and institutional transparency.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Vision Card */}
              <div className="bg-white rounded-3xl border-l-4 border-l-[#f4d068] border-y border-r border-zinc-200/70 p-8 shadow-[0_20px_50px_rgba(15,46,30,0.015)] space-y-5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                <div className="flex items-center gap-3.5 relative z-10">
                  <div className="p-2.5 bg-amber-500/10 rounded-2xl text-amber-600 border border-amber-500/20">
                    <Goal className="w-5.5 h-5.5 stroke-[2.5]" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-zinc-900">
                    Corporate Vision
                  </h3>
                </div>
                <p className="text-zinc-650 text-sm sm:text-base leading-relaxed relative z-10">
                  To drive multi-tiered growth within the global food processing sector, ensuring premium-grade agricultural products remain universally accessible to all consumer demographics while structurally empowering agrarian communities through sustainable economics.
                </p>
              </div>

              {/* Mission Card */}
              <div className="bg-white rounded-3xl border-l-4 border-l-brand-green-mid border-y border-r border-zinc-200/70 p-8 shadow-[0_20px_50px_rgba(15,46,30,0.015)] space-y-5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                <div className="flex items-center gap-3.5 relative z-10">
                  <div className="p-2.5 bg-emerald-500/10 rounded-2xl text-emerald-600 border border-emerald-500/20">
                    <Award className="w-5.5 h-5.5 stroke-[2.5]" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-zinc-900">
                    Corporate Mission
                  </h3>
                </div>
                <p className="text-zinc-650 text-sm sm:text-base leading-relaxed relative z-10">
                  To remain the definitive benchmark supplier of premium, sustainably sourced food grains, pulses, and allied agricultural commodities, globally recognized for operational transparency, execution speed, and supply chain integrity.
                </p>
              </div>

              {/* Core Values Wide Card */}
              <div className="md:col-span-2 bg-[#0b2418] text-white rounded-3xl border border-white/10 p-8 md:p-10 shadow-2xl space-y-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
                <div className="flex items-center gap-3 relative z-10">
                  <Sparkles className="w-5 h-5 text-[#f4d068]" />
                  <h4 className="text-lg sm:text-xl font-serif font-bold text-white">Our Tri-Core Institutional Values</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 pt-4 border-t border-white/10">
                  <div className="space-y-3 group/value">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#f4d068]/10 text-[#f4d068] rounded-xl border border-[#f4d068]/20 group-hover/value:bg-[#f4d068] group-hover/value:text-[#0b2418] transition-all duration-300">
                        <Award className="w-5 h-5 stroke-[2]" />
                      </div>
                      <span className="text-base sm:text-lg font-serif font-bold text-white block">Unmatched Quality</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      Rigorous multi-stage sorting protocols and computer Sortex diagnostics ensuring pure, safe, and nutritious commodities.
                    </p>
                  </div>
                  <div className="space-y-3 group/value">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#f4d068]/10 text-[#f4d068] rounded-xl border border-[#f4d068]/20 group-hover/value:bg-[#f4d068] group-hover/value:text-[#0b2418] transition-all duration-300">
                        <Scale className="w-5 h-5 stroke-[2]" />
                      </div>
                      <span className="text-base sm:text-lg font-serif font-bold text-white block">Absolute Integrity</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      Sovereign compliance benchmarks, clear corporate governance audits, and fair trade practices across all mandis.
                    </p>
                  </div>
                  <div className="space-y-3 group/value">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#f4d068]/10 text-[#f4d068] rounded-xl border border-[#f4d068]/20 group-hover/value:bg-[#f4d068] group-hover/value:text-[#0b2418] transition-all duration-300">
                        <Sprout className="w-5 h-5 stroke-[2]" />
                      </div>
                      <span className="text-base sm:text-lg font-serif font-bold text-white block">Agrarian Legacy</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      Strengthening regional crop economics and ensuring farmers receive premium prices and direct technical assistance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Core Institutional Pillars & Strengths */}
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-[#f4d068] uppercase font-bold bg-[#f4d068]/10 px-3 py-1 rounded-full border border-[#f4d068]/20">
                Pillars
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
                Core Institutional Pillars & Strengths
              </h2>
              <p className="text-zinc-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Built upon multi-generational trust and absolute performance benchmarks.
              </p>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {[
                {
                  title: "Global Sourcing Network",
                  desc: "We maintain an agile, highly sophisticated logistics and sourcing architecture that guarantees seamless raw asset acquisition and localized distribution under tight deadlines.",
                  icon: Globe2,
                  color: "text-blue-600 bg-blue-50 border-blue-100/60"
                },
                {
                  title: "State-of-the-Art Processing Infrastructure",
                  desc: "Our milling environments integrate advanced computerized sortex and processing equipment, driving down downtime, eliminating human error, and maintaining complete product safety.",
                  icon: Building2,
                  color: "text-amber-600 bg-amber-50 border-amber-100/60"
                },
                {
                  title: "Agrarian Empowerment & Sourcing Integrity",
                  desc: "We operate hand-in-hand with state mandis and local producers to promote sustainable agricultural cultivation, stabilize crop pricing, and cultivate regional economic development.",
                  icon: Heart,
                  color: "text-emerald-600 bg-emerald-50 border-emerald-100/60"
                },
                {
                  title: "Socio-Economic Development Catalyst",
                  desc: "By establishing extensive manufacturing bases in semi-rural peripheries, our corporate footprint directly creates technical employment opportunities and acts as a catalyst for rural infrastructure development.",
                  icon: Landmark,
                  color: "text-purple-600 bg-purple-50 border-purple-100/60"
                }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className={`bg-white rounded-2xl border border-zinc-200/60 border-l-4 ${idx % 2 === 0 ? "border-l-brand-green-mid" : "border-l-[#f4d068]"} p-6 flex gap-5 hover:shadow-xl hover:border-brand-green-dark/20 hover:-translate-y-1 transition-all duration-300 group`}
                >
                  <div className={`p-3.5 rounded-xl border shrink-0 h-13 w-13 flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${item.color}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-zinc-900 text-sm sm:text-base font-sans group-hover:text-brand-green-dark transition-colors duration-250">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-550 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Render Inner Page: BOARD OF DIRECTORS
  if (activePageSlug === "board-of-directors") {
    return (
      <motion.div 
        key="board-of-directors"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="pb-24 bg-brand-bg-light"
      >
        {/* Modern styled page banner with interactive glass card */}
        <div className="bg-[#0b2418] text-white pt-36 pb-20 px-6 md:px-12 text-center relative overflow-hidden">
          <ShiningLightsBackground />
          
          <div className="max-w-4xl mx-auto space-y-5 relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-white leading-tight">
              The Board of Directors
            </h1>
            <p className="text-gray-300 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Steering Punitdhan Pulses with professional financial expertise, visionary industrial legacy, and uncompromising corporate oversight.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-20">
          
          {/* Executive Board of Directors Section - All Members Displayed with Interactive Views */}
          <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-200/45 pb-6">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-[#0b2418] stroke-[2.5]" />
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
                  Our Governing Board
                </h2>
              </div>

              {/* View Mode Switcher */}
              <div className="flex items-center gap-1.5 p-1 bg-zinc-100 rounded-xl self-start md:self-auto w-full md:w-auto">
                <button
                  onClick={() => setViewMode("card")}
                  className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 py-1.5 px-3.5 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
                    viewMode === "card"
                      ? "bg-[#092215] text-[#f4d068] shadow-sm"
                      : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  <LayoutGrid size={13} />
                  <span>{localize({ en: "Card View", hi: "कार्ड व्यू", gu: "કાર્ડ વ્યુ" })}</span>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 py-1.5 px-3.5 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
                    viewMode === "list"
                      ? "bg-[#092215] text-[#f4d068] shadow-sm"
                      : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  <List size={13} />
                  <span>{localize({ en: "List View", hi: "सूची दृश्य", gu: "યાદી વ્યુ" })}</span>
                </button>
                <button
                  onClick={() => setViewMode("detail")}
                  className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 py-1.5 px-3.5 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
                    viewMode === "detail"
                      ? "bg-[#092215] text-[#f4d068] shadow-sm"
                      : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  <User size={13} />
                  <span>{localize({ en: "Detail View", hi: "विस्तृत दृश्य", gu: "વિગતવાર વ્યુ" })}</span>
                </button>
              </div>
            </div>

            {/* Render Card View */}
            {viewMode === "card" && (
              <div className="space-y-12 w-full max-w-7xl mx-auto">
                {/* Board Directors (With Photographs) */}
                <div className="space-y-6">
                  <div className="flex items-center">
                    <span className="text-[10px] font-mono tracking-widest text-brand-green-light uppercase font-bold bg-[#0b2418]/5 px-3.5 py-1.5 rounded-full border border-[#0b2418]/15 inline-block">
                      {localize({ en: "BOARD DIRECTORS", hi: "बोर्ड निदेशक", gu: "બોર્ડ ડિરેક્ટર્સ" })}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
                    {LEADERS.filter(l => l.id === "prakashchand" || l.id === "punit").map((leader, index) => {
                      const locName = getLocalizedLeaderName(leader.id, leader.name);
                      const locTitle = getLocalizedLeaderTitle(leader.id, leader.title);
                      const leaderImg = LEADER_IMAGES[leader.id];
                      const stats = LEADER_STATS[leader.id];

                      return (
                        <motion.div
                          key={leader.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.15 }}
                          className={`group relative flex flex-col bg-white rounded-[2rem] border border-zinc-200/80 border-l-4 ${index % 2 === 0 ? "border-l-brand-green-mid" : "border-l-[#f4d068]"} shadow-md hover:shadow-xl hover:border-brand-green-dark/20 hover:-translate-y-1.5 transition-all duration-500 overflow-hidden cursor-pointer`}
                          onClick={() => setSelectedLeaderId(leader.id)}
                        >
                          {/* Image Wrap */}
                          <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                            {/* Decorative Frame corner brackets */}
                            <div className="absolute top-5 left-5 w-4 h-4 border-t border-l border-white/40 z-20" />
                            <div className="absolute top-5 right-5 w-4 h-4 border-t border-r border-white/40 z-20" />
                            
                            {/* Executive Tag Floating */}
                            <span className="absolute top-5 left-5 z-20 bg-[#122e20]/90 text-[#f4d068] text-[9px] font-mono tracking-widest px-3.5 py-1.5 rounded-full uppercase border border-white/10 font-bold">
                              {stats.tag[language] || stats.tag.en}
                            </span>

                            <img
                              src={leaderImg}
                              alt={leader.name}
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:filter group-hover:brightness-105 filter grayscale-[10%] brightness-95"
                              referrerPolicy="no-referrer"
                            />

                            {/* Luxurious vignette shadow gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                            
                            {/* Highlight on Hover Glow overlay */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-brand-green-dark/10 transition-opacity duration-500" />
                            
                            {/* Mini info overlay on image bottom */}
                            <div className="absolute bottom-0 left-0 w-full p-6 text-white space-y-1 z-15">
                              <span className="text-[10px] font-mono tracking-widest text-[#f4d068] uppercase block font-extrabold">
                                {stats.record[language] || stats.record.en} {localize({ en: "DIRECTIVE", hi: "निदेशक", gu: "નિર્દેશક" })}
                              </span>
                              <h4 className="font-serif font-black text-xl sm:text-2xl tracking-tight leading-tight text-white group-hover:text-brand-accent transition-colors">
                                {locName}
                              </h4>
                              <p className="text-xs text-zinc-300 font-sans tracking-wide truncate max-w-full font-medium">
                                {locTitle}
                              </p>
                            </div>
                          </div>

                          {/* Card Footer and Description */}
                          <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-white bg-radial-[circle_at_bottom_right,rgba(255,255,255,1),rgba(250,250,248,1)]">
                            <div className="space-y-4">
                              <div className="space-y-1">
                                <span className="text-[8px] font-mono tracking-widest uppercase text-zinc-450 font-bold block">
                                  {localize({ en: "Executive Profile", hi: "कार्यकारी प्रोफ़ाइल", gu: "કાર્યકારી પ્રોફાઇલ" })}
                                </span>
                                <p className="text-xs text-zinc-550 leading-relaxed font-sans font-medium">
                                  {getLocalizedLeaderRole(leader.id, leader.role)}
                                </p>
                              </div>
                            </div>

                            <div className="pt-5 mt-6 border-t border-zinc-100 flex items-center justify-between text-[#0b2418] hover:text-[#122e20] transition-colors">
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
                </div>

                {/* Stewardship & Administration (Without Photographs) */}
                <div className="space-y-6 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto items-stretch">
                    {LEADERS.filter(l => l.id === "dhanashree" || l.id === "chika").map((leader, index) => {
                      const locName = getLocalizedLeaderName(leader.id, leader.name);
                      const locTitle = getLocalizedLeaderTitle(leader.id, leader.title);
                      const stats = LEADER_STATS[leader.id];

                      return (
                        <motion.div
                          key={leader.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                          className={`group relative flex flex-col bg-white rounded-[2rem] border border-zinc-200 border-l-4 ${index % 2 === 0 ? "border-l-[#f4d068]" : "border-l-brand-green-mid"} shadow-md hover:shadow-xl hover:border-brand-green-dark/20 hover:-translate-y-1.5 transition-all duration-500 overflow-hidden cursor-pointer`}
                          onClick={() => setSelectedLeaderId(leader.id)}
                        >
                          {/* Text-focused Header replacing photo */}
                          <div className="p-6 md:p-8 bg-gradient-to-br from-[#0c2a1c] to-[#04100a] text-white space-y-4 relative overflow-hidden">
                            {/* Decorative background monogram */}
                            <div className="absolute -right-6 -bottom-6 text-9xl font-serif font-black text-white/[0.03] select-none pointer-events-none uppercase">
                              {leader.id === "dhanashree" ? "DB" : "CB"}
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="bg-[#122e20] text-brand-accent text-[9px] font-mono tracking-widest px-3.5 py-1.5 rounded-full uppercase border border-white/10 font-bold">
                                {stats.tag[language] || stats.tag.en}
                              </span>
                              <span className="text-[10px] font-mono tracking-widest text-[#f4d068] font-bold uppercase">
                                {stats.record[language] || stats.record.en} {localize({ en: "CAREER", hi: "सेवाकाल", gu: "સેવા" })}
                              </span>
                            </div>

                            <div className="space-y-1 relative z-10 pt-2">
                              <h4 className="font-serif font-black text-xl tracking-tight text-white group-hover:text-[#f4d068] transition-colors">
                                {locName}
                              </h4>
                              <p className="text-xs text-emerald-400 font-sans font-semibold tracking-wide">
                                {locTitle}
                              </p>
                            </div>
                          </div>

                          {/* Card body description */}
                          <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-white bg-radial-[circle_at_bottom_right,rgba(255,255,255,1),rgba(250,250,248,1)]">
                            <div className="space-y-4">
                              <div className="space-y-1">
                                <span className="text-[8px] font-mono tracking-widest uppercase text-zinc-450 font-bold block">
                                  {localize({ en: "Executive Profile", hi: "कार्यकारी प्रोफ़ाइल", gu: "કાર્યકારી પ્રોફાઇલ" })}
                                </span>
                                <p className="text-xs text-zinc-550 leading-relaxed font-sans font-medium">
                                  {getLocalizedLeaderRole(leader.id, leader.role)}
                                </p>
                              </div>
                            </div>

                            <div className="pt-5 mt-6 border-t border-zinc-100 flex items-center justify-between text-[#0b2418] hover:text-[#122e20] transition-colors">
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
                </div>
              </div>
            )}

            {/* Render List View */}
            {viewMode === "list" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4 max-w-5xl mx-auto"
              >
                {LEADERS.map((leader, index) => {
                  const locName = getLocalizedLeaderName(leader.id, leader.name);
                  const locTitle = getLocalizedLeaderTitle(leader.id, leader.title);
                  const leaderImg = LEADER_IMAGES[leader.id];
                  const stats = LEADER_STATS[leader.id];
                  const hasPhoto = leader.id === "prakashchand" || leader.id === "punit";

                  return (
                    <motion.div
                      key={leader.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className={`bg-white rounded-2xl border border-zinc-200 border-l-4 ${index % 2 === 0 ? "border-l-brand-green-mid" : "border-l-[#f4d068]"} p-5 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md hover:border-brand-green-dark/20 hover:-translate-y-1 transition-all cursor-pointer`}
                      onClick={() => {
                        setSelectedLeaderId(leader.id);
                        setActiveLeaderId(leader.id);
                      }}
                    >
                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-zinc-150 flex items-center justify-center bg-brand-green-dark/5">
                          {hasPhoto ? (
                            <img src={leaderImg} alt={leader.name} className="w-full h-full object-cover grayscale-[10%]" referrerPolicy="no-referrer" />
                          ) : (
                            <span className="text-brand-green-dark font-serif font-black text-sm">
                              {leader.id === "dhanashree" ? "DB" : "CB"}
                            </span>
                          )}
                        </div>
                        <div>
                          <span className="text-[9px] font-mono font-bold text-brand-green-light bg-brand-green-dark/5 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            {stats.tag[language] || stats.tag.en}
                          </span>
                          <h4 className="text-lg font-serif font-bold text-brand-green-dark mt-1">{locName}</h4>
                          <p className="text-xs text-zinc-500 font-sans">{locTitle}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-6 w-full md:w-auto md:justify-end text-xs font-medium text-zinc-600">
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-mono text-zinc-400 block uppercase tracking-wider">{getLocalizedStatLabel("focusProtocol")}</span>
                          <span className="text-xs text-brand-green-dark font-semibold">{stats.focus[language] || stats.focus.en}</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-mono text-zinc-400 block uppercase tracking-wider">{getLocalizedStatLabel("governingRecord")}</span>
                          <span className="text-xs text-zinc-800 font-semibold">{stats.record[language] || stats.record.en}</span>
                        </div>
                        <button 
                          className="bg-[#092215] text-[#f4d068] hover:bg-brand-green-dark hover:text-white px-4 py-2.5 rounded-xl text-[10px] font-mono uppercase tracking-wider font-bold transition-all ml-auto md:ml-0 cursor-pointer shadow-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLeaderId(leader.id);
                            setActiveLeaderId(leader.id);
                          }}
                        >
                          {getLocalizedStatLabel("ctaButton")}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Render Detail View */}
            {viewMode === "detail" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] border border-zinc-200 border-l-4 border-l-brand-green-mid shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-w-5xl mx-auto"
              >
                {/* Left Selection Column (Col-span 4) */}
                <div className="lg:col-span-4 bg-zinc-50 border-r border-zinc-200 p-6 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-[9px] font-mono font-bold tracking-wider text-zinc-400 uppercase block mb-3">
                      {localize({ en: "SELECT LEADER PROFILE", hi: "प्रोफ़ाइल चुनें", gu: "પસંદગી કરો" })}
                    </span>
                    <div className="space-y-2">
                      {LEADERS.map((leader) => {
                        const isSelected = leader.id === activeLeaderId;
                        const locName = getLocalizedLeaderName(leader.id, leader.name);
                        return (
                          <button
                            key={leader.id}
                            onClick={() => setActiveLeaderId(leader.id)}
                            className={`w-full text-left p-3.5 rounded-xl transition-all relative flex items-center gap-3 border cursor-pointer ${
                              isSelected
                                ? "bg-[#092215] border-[#f4d068]/30 font-bold text-[#f4d068] shadow-md"
                                : "bg-white border-zinc-200 hover:bg-zinc-100 text-zinc-750"
                            }`}
                          >
                            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-zinc-200 flex items-center justify-center bg-brand-green-dark/5">
                              {leader.id === "prakashchand" || leader.id === "punit" ? (
                                <img src={LEADER_IMAGES[leader.id]} alt={leader.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              ) : (
                                <span className="text-brand-green-dark font-serif font-black text-[10px]">
                                  {leader.id === "dhanashree" ? "DB" : "CB"}
                                </span>
                              )}
                            </div>
                            <div className="truncate">
                              <p className="text-xs font-bold leading-tight">{locName}</p>
                              <p className={`text-[9px] font-mono ${isSelected ? "text-[#f4d068]/80" : "text-zinc-400"}`}>
                                {LEADER_STATS[leader.id].tag[language] || LEADER_STATS[leader.id].tag.en}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="bg-brand-green-dark/5 p-4 rounded-xl border border-brand-green-dark/10">
                    <p className="text-[10px] font-mono text-brand-green-dark leading-relaxed text-center font-bold">
                      {localize({
                        en: "Our Board unites expert Chartered Accountants and Operations Directors under the vision of ethical value delivery.",
                        hi: "हमारा बोर्ड नैतिक मूल्य वितरण के दृष्टिकोण के तहत विशेषज्ञ चार्टर्ड अकाउंटेंट और संचालन निदेशकों को एकजुट करता है।",
                        gu: "અમારું બોર્ડ ઓફ ડિરેક્ટર્સ નાણાકીય નિષ્ણાતો અને ઓપરેશન્સ ક્ષેત્રના અગ્રણીઓનું બનેલું છે."
                      })}
                    </p>
                  </div>
                </div>

                {/* Right Content Column (Col-span 8) */}
                <div className="lg:col-span-8 p-6 sm:p-10 flex flex-col justify-between bg-white min-h-[500px]">
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-zinc-200 shrink-0 flex items-center justify-center bg-brand-green-dark/5">
                          {activeLeaderId === "prakashchand" || activeLeaderId === "punit" ? (
                            <img src={LEADER_IMAGES[activeLeaderId]} alt={activeLeaderId} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            <span className="text-brand-green-dark font-serif font-black text-sm">
                              {activeLeaderId === "dhanashree" ? "DB" : "CB"}
                            </span>
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-serif text-brand-green-dark font-extrabold tracking-tight">
                            {getLocalizedLeaderName(activeLeaderId, "")}
                          </h3>
                          <p className="text-xs text-brand-green-light font-bold">
                            {getLocalizedLeaderTitle(activeLeaderId, "")}
                          </p>
                        </div>
                      </div>
                      <span className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1 bg-brand-green-dark text-brand-accent text-[9px] font-mono tracking-widest font-black rounded-full uppercase shadow-xs">
                        {LEADER_STATS[activeLeaderId].tag[language] || LEADER_STATS[activeLeaderId].tag.en}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3 bg-zinc-50 border border-zinc-200/60 rounded-xl flex items-center gap-2">
                        <Clock size={16} className="text-brand-green-light shrink-0" />
                        <div>
                          <span className="text-[8px] font-mono font-bold text-gray-400 block uppercase tracking-wider">{getLocalizedStatLabel("governingRecord")}</span>
                          <span className="text-xs font-bold text-brand-green-dark block mt-0.5">{LEADER_STATS[activeLeaderId].record[language] || LEADER_STATS[activeLeaderId].record.en}</span>
                        </div>
                      </div>
                      <div className="p-3 bg-zinc-50 border border-zinc-200/60 rounded-xl flex items-center gap-2">
                        <Briefcase size={16} className="text-brand-green-light shrink-0" />
                        <div>
                          <span className="text-[8px] font-mono font-bold text-gray-400 block uppercase tracking-wider">{getLocalizedStatLabel("focusProtocol")}</span>
                          <span className="text-xs font-bold text-brand-green-dark block mt-0.5">{LEADER_STATS[activeLeaderId].focus[language] || LEADER_STATS[activeLeaderId].focus.en}</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative p-5 bg-zinc-50 rounded-xl border border-zinc-200/60">
                      <Quote size={20} className="absolute top-3 right-4 opacity-10 text-brand-green-light" />
                      <span className="text-[8px] font-mono font-extrabold text-brand-green-dark uppercase tracking-widest block mb-1">
                        {getLocalizedStatLabel("statement")}
                      </span>
                      <p className="text-xs sm:text-sm font-sans italic text-zinc-700 leading-relaxed font-semibold">
                        "{getLocalizedLeaderRole(activeLeaderId, "")}"
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-[9px] text-zinc-400 font-mono uppercase tracking-widest font-extrabold flex items-center gap-1.5">
                        <Award size={12} className="text-brand-green-light" />
                        {getLocalizedStatLabel("achievements")}
                      </h5>
                      <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed font-medium bg-zinc-50/50 p-4 rounded-xl border border-zinc-150">
                        {LEADERS.find(l => l.id === activeLeaderId)?.description.map((achievement, idx) => 
                          getLocalizedAchievement(activeLeaderId, idx, achievement)
                        ).join(" ")}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200/50 py-1.5 px-3 rounded-lg">
                      <span className="text-xs font-sans italic text-brand-green-dark font-bold">
                        {LEADER_STATS[activeLeaderId].signature}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedLeaderId(activeLeaderId)}
                      className="text-xs font-mono font-bold text-brand-green-dark hover:text-brand-green-light flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>{localize({ en: "View Credentials Modal", hi: "प्रमाणपत्र विवरण", gu: "લાયકાત મોડલ" })}</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

              {/* Committee & Stewardship Blueprint - Clean of heading numbering */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-zinc-200/40 pb-4">
              <ShieldCheck className="w-6 h-6 text-[#0b2418] stroke-[2.5]" />
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
                Committee & Stewardship Blueprint
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Audit & Financial Risk Committee",
                  desc: "Chaired by qualified financial administrators, ensuring total transparency across budgeting, tax compliances, asset valuations, and public accountability.",
                  bullets: ["FSSAI & GST Auditing", "Macroeconomic Sourcing Shield", "Transparent Cost Engineering"],
                  color: "border-l-3 border-amber-500"
                },
                {
                  title: "Human Capital & Culture Committee",
                  desc: "Spearheading fair-pay, workforce upskilling, and a secure professional environment for our 60+ milling technicians and administrative leaders.",
                  bullets: ["Continuous Factory Upskilling", "Inclusive Equal-Opportunity Policy", "Workplace Safety Accolades"],
                  color: "border-l-3 border-emerald-500"
                },
                {
                  title: "Operational Ethics & Governance Committee",
                  desc: "Upholding high compliance benchmarks across all national cooperative bids, corporate joint-ventures, and state distribution protocols.",
                  bullets: ["Conflict Prevention Shield", "Anti-corruption Commerce Code", "Stakeholder Value Protection"],
                  color: "border-l-3 border-blue-500"
                }
              ].map((committee, cIdx) => (
                <div key={cIdx} className={`bg-white rounded-2xl p-6 sm:p-8 border border-zinc-100 shadow-[0_12px_30px_rgba(15,46,30,0.03)] hover:shadow-[0_24px_50px_rgba(15,46,30,0.1)] hover:-translate-y-1.5 transition-all duration-300 ease-in-out space-y-4 ${committee.color}`}>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-zinc-900 tracking-tight">
                    {committee.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-550 leading-relaxed font-sans">
                    {committee.desc}
                  </p>
                  <div className="pt-2">
                    <ul className="space-y-2">
                      {committee.bullets.map((bullet, bulletIdx) => (
                        <li key={bulletIdx} className="flex items-center gap-2 text-[11px] font-sans font-bold text-brand-green-mid">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom corporate quote block */}
          <div className="bg-[#0b2418] rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-green-dark to-[#12422c] opacity-95" />
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />
            
            <div className="max-w-3xl mx-auto space-y-6 relative z-10 text-white font-sans">
              <Sparkles className="w-8 h-8 text-[#f4d068] mx-auto animate-pulse" />
              <p className="text-sm sm:text-base md:text-lg italic font-serif text-[#f4d068] leading-relaxed">
                "Our legacy has been built upon financial integrity and premium agricultural quality. As we expand across India, our board ensures that every grain processed carries this promise."
              </p>
              <div className="w-12 h-px bg-[#f4d068]/40 mx-auto" />
              <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-300 font-bold">
                The Board of Directors, Punitdhan Pulses Limited
              </p>
            </div>
          </div>

        </div>

        {/* Credentials Modal Overlay */}
        <AnimatePresence>
          {selectedLeaderId && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={() => setSelectedLeaderId(null)}
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 z-10 border border-zinc-150 max-h-[90vh] md:max-h-none"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedLeaderId(null)}
                  className="absolute top-5 right-5 z-50 bg-white/10 hover:bg-white/20 text-white hover:scale-105 rounded-xl p-2.5 transition-all cursor-pointer backdrop-blur-md border border-white/15 group/close"
                  aria-label="Close details"
                >
                  <X size={18} className="transform group-hover/close:rotate-90 transition-transform duration-300" />
                </button>

                {/* Profile Visual Display Side (Col-span 5) */}
                <div className="relative col-span-5 aspect-[4/3] md:aspect-auto md:h-full min-h-[250px] md:min-h-[550px] bg-[#0b2418] overflow-hidden flex flex-col justify-end">
                  {selectedLeaderId === "prakashchand" || selectedLeaderId === "punit" ? (
                    <img
                      src={LEADER_IMAGES[selectedLeaderId]}
                      alt={selectedLeaderId}
                      className="absolute inset-0 w-full h-full object-cover brightness-90 filter grayscale-[10%]"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0c2a1c] to-[#04100a] text-white/[0.04] text-9xl font-serif font-black select-none uppercase">
                      {selectedLeaderId === "dhanashree" ? "DB" : "CB"}
                    </div>
                  )}
                  
                  {/* Subtle brand color tone overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#092215] via-[#1e3a1e]/40 to-transparent z-10" />

                  {/* Highlight corner brackets */}
                  <div className="absolute top-6 left-6 w-5 h-5 border-t-2 border-l-2 border-[#f4d068]/50 z-20" />
                  <div className="absolute bottom-6 left-6 w-5 h-5 border-b-2 border-l-2 border-[#f4d068]/50 z-20" />

                  <div className="p-8 relative z-20 text-white space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f4d068] text-[#092215] text-[9px] font-mono tracking-widest font-black rounded-full uppercase shadow-sm animate-pulse">
                      ★ {LEADER_STATS[selectedLeaderId].tag[language] || LEADER_STATS[selectedLeaderId].tag.en}
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-sans text-white font-extrabold tracking-tight">
                      {getLocalizedLeaderName(selectedLeaderId, LEADERS.find(l => l.id === selectedLeaderId)?.name || "")}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-accent font-semibold tracking-wide font-sans">
                      {getLocalizedLeaderTitle(selectedLeaderId, LEADERS.find(l => l.id === selectedLeaderId)?.title || "")}
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
                            {selectedLeaderId === "prakashchand" || selectedLeaderId === "punit" || selectedLeaderId === "dhanashree" ? "CA (Chartered Accountant)" : "Governance Expert"}
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
                          <span className="text-xs font-bold text-[#092215] block mt-0.5 tracking-tight font-sans text-wrap">
                            {LEADER_STATS[selectedLeaderId].focus[language] || LEADER_STATS[selectedLeaderId].focus.en}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Editorial Perspective Quote Box */}
                    <div className="relative p-5 bg-radial-[circle_at_top_left,rgba(251,252,250,1),rgba(243,246,243,0.7)] rounded-2xl border border-[#d1e2d3]/50">
                      <Quote size={28} className="absolute top-3 right-4 opacity-10 text-brand-green-light" />
                      
                      <span className="text-[9px] font-mono font-extrabold text-[#092215] uppercase tracking-widest block mb-2">
                        {getLocalizedStatLabel("statement")}
                      </span>
                      
                      <p className="text-xs sm:text-[13px] font-sans italic text-zinc-700 leading-relaxed font-semibold">
                        "{getLocalizedLeaderRole(selectedLeaderId, LEADERS.find(l => l.id === selectedLeaderId)?.role || "")}"
                      </p>
                    </div>

                    {/* Narrative Accomplishments */}
                    <div className="space-y-3">
                      <h5 className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest font-extrabold flex items-center gap-1.5">
                        <Award size={13} className="text-brand-green-light" />
                        {getLocalizedStatLabel("achievements")}
                      </h5>
                      
                      <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed font-medium bg-zinc-50/70 p-4 rounded-xl border border-zinc-200/20">
                        {LEADERS.find(l => l.id === selectedLeaderId)?.description.map((achievement, idx) => 
                          getLocalizedAchievement(selectedLeaderId || "", idx, achievement)
                        ).join(" ")}
                      </p>
                    </div>
                  </div>

                  {/* Modal Footer (Asymmetric Signature and Carousel Controls) */}
                  <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-5">
                    
                    {/* Simulated elegant hand signature layout */}
                    <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200/50 py-2.5 px-4 rounded-xl">
                      <div className="text-left">
                        <span className="text-[11.5px] font-sans italic text-[#092215] block font-bold leading-tight tracking-wide">
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
      </motion.div>
    );
  }

  // Render Inner Page 2: SERVICES
  if (activePageSlug === "services") {
    return (
      <motion.div 
        key="services"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="pb-24 bg-zinc-50/70"
      >
        {/* Immersive Dark Section Header */}
        <div className="bg-[#0b2418] text-white pt-36 pb-20 px-6 md:px-12 text-center relative overflow-hidden">
          <ShiningLightsBackground />
          
          <div className="max-w-4xl mx-auto space-y-5 relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-white leading-tight">
              Services
            </h1>
            <p className="text-gray-300 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Sovereign supply chain logistics, state-regulated welfare distribution, and military-grade procurement networks across India.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12 font-sans">
          
          {/* Sourcing & Operations Statement */}
          <div className="bg-white rounded-3xl border border-zinc-200/60 border-l-4 border-l-brand-green-mid p-6 sm:p-8 md:p-10 shadow-[0_15px_40px_rgba(15,46,30,0.015)] flex flex-col lg:flex-row gap-6 items-center hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-brand-green-dark shrink-0">
              <Landmark className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-serif font-bold text-zinc-900">National Welfare & Public Sector Operations</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Punitdhan Pulses Limited is engineered to fulfill high-volume, highly complex institutional procurement contracts for public sector undertakings and national welfare frameworks. Our custom logistics network is built to handle strict delivery timelines, rigorous quality audits, and massive distribution scopes.
              </p>
            </div>
          </div>

          {/* Redesigned Welfare Cards Grid */}
          <div className="space-y-6">
            <div className="text-center md:text-left">
              <span className="text-[10px] font-mono text-brand-green-mid font-bold uppercase tracking-wider block mb-1">
                Welfare Initiatives
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900 tracking-tight">
                Government Welfare Sourcing Schemes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "The Mid-Day Meal Programme",
                  desc: "Supplying nutrient-verified, high-purity pulses to support national youth health programs across thousands of primary education institutions.",
                  points: ["Nutrient-verified whole commodities", "Zero chemical polishing", "Mass primary education support"]
                },
                {
                  title: "Public Distribution System (PDS) & PMGKAY",
                  desc: "Driving country-wide food security initiatives by routing uniform-grade commodities to vulnerable consumer cross-sections.",
                  points: ["Uniform high-purity pulses", "PDS-grade compliant packaging", "Welfare safety net logistics"]
                },
                {
                  title: "Integrated Child Development Services (ICDS Scheme)",
                  desc: "Providing highly specific agricultural outputs tailored to fulfill rigorous child and maternal dietary mandates.",
                  points: ["Custom dietary specifications", "Vitamins & mineral enrichment", "Targeted maternal-nutrition support"]
                },
                {
                  title: "Bharat Dal Yojana",
                  desc: "Serving as a primary partner in the government's centralized market-stabilization and consumer-relief commodity distribution frameworks.",
                  points: ["National brand supply partner", "Market-stabilization assistance", "Government-capped pricing programs"]
                }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className={`bg-white border border-zinc-200/50 border-l-4 ${idx % 2 === 0 ? "border-l-brand-green-mid" : "border-l-[#f4d068]"} rounded-2xl p-6 shadow-2xs hover:shadow-md hover:border-zinc-300/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-6 bg-brand-green-dark rounded-full shrink-0" />
                      <h4 className="font-serif font-bold text-zinc-900 text-base sm:text-lg">{item.title}</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">{item.desc}</p>
                  </div>
                  
                  <div className="border-t border-zinc-100 mt-4 pt-4 space-y-1.5">
                    {item.points.map((p, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-[11px] font-medium text-zinc-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ministry of Defense Procurement */}
          <div className="bg-[#0b2418] text-white rounded-3xl p-8 sm:p-10 md:p-12 relative overflow-hidden border border-emerald-900/40">
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#f4d068]/3 rounded-full pointer-events-none filter blur-2xl" />
            
            <div className="max-w-3xl space-y-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#f4d068] shrink-0">
                  <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-black tracking-tight text-white">
                  Ministry of Defense Procurement
                </h3>
              </div>
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                Our long-standing association with the <strong>Indian Department of Defense</strong> demands a zero-error logistical protocol. Punitdhan Pulses Limited ensures consistent, highly secure, and on-time delivery of premium-grade food supplies under military-grade hygiene, storage, and nutritional testing parameters.
              </p>
            </div>
          </div>

          {/* B2B Sourcing & Logistics Competency */}
          <div className="space-y-6">
            <div className="text-center md:text-left">
              <span className="text-[10px] font-mono text-brand-green-mid font-bold uppercase tracking-wider block mb-1">
                Logistical Competence
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900 tracking-tight">
                B2B Sourcing & Logistics Infrastructure
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200/50 border-l-4 border-l-brand-green-mid shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 space-y-3">
                <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-widest block">
                  Allied Sectors
                </span>
                <h4 className="font-serif font-bold text-zinc-900 text-base sm:text-lg">Bulk Sourcing Competency</h4>
                <p className="text-xs sm:text-sm text-zinc-650 leading-relaxed">
                  Timely, state-regulated procurement networks covering fine <strong>Food Grains, Pulses, Tea, and Spices</strong>. We work in sync with public mandis to acquire raw assets quickly.
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200/50 border-l-4 border-l-[#f4d068] shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 space-y-3">
                <span className="text-[10px] font-mono text-amber-600 font-bold uppercase tracking-widest block">
                  Transit Reach
                </span>
                <h4 className="font-serif font-bold text-zinc-900 text-base sm:text-lg">High-Capacity Fleet Logistics</h4>
                <p className="text-xs sm:text-sm text-zinc-650 leading-relaxed">
                  Dispatching in excess of <strong>2,000 lorries per year</strong>, backed by extensive multi-location warehousing assets that stabilize internal inventory and insulate against external market deficits.
                </p>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    );
  }

  // Render Inner Page 3: PRODUCT PROFILE & TECHNICAL SPECIFICATIONS (PRODUCTS SPECS)
  if (activePageSlug === "products-specs") {
    const REDESIGNED_PRODUCTS = [
      {
        id: "chana",
        title: "Chana Dal & Chana Whole",
        category: "pulses",
        desc: "Apex-grade Bengal Gram (Chana) sorted through advanced multi-tier optical systems. Delivers high density, dust-free whole grains, and clean split yellow dal.",
        image: "https://images.unsplash.com/photo-1545110134-75c15e518466?auto=format&fit=crop&q=80&w=800",
        bullets: [
          "FSSAI Standard Compliant",
          "De-hulled to custom specifications",
          "Zero artificial color or chemical polishing"
        ],
        specs: [
          { label: "Purity Grade", val: "99.7% Min", icon: <Layers className="w-4 h-4 text-emerald-700" /> },
          { label: "Moisture Ratio", val: "11.5% Max", icon: <Droplet className="w-4 h-4 text-blue-600" /> },
          { label: "Foreign Matter", val: "< 0.1% Max", icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> },
          { label: "Packaging Size", val: "25kg / 50kg Bags", icon: <Briefcase className="w-4 h-4 text-amber-600" /> }
        ]
      },
      {
        id: "toor",
        title: "Premium Toor Dal (Pigeon Peas)",
        category: "pulses",
        desc: "Our flagship Toor Dal is milled under low-friction dry friction parameters to protect structural protein cells, native yellow gloss, and wholesome taste.",
        image: "https://images.unsplash.com/photo-1618411640018-972400a40df8?auto=format&fit=crop&q=80&w=800",
        bullets: [
          "High protein cell protection",
          "Uniform cooking and boiling duration",
          "Processed in state-regulated plants"
        ],
        specs: [
          { label: "Purity Grade", val: "99.5% Min", icon: <Layers className="w-4 h-4 text-emerald-700" /> },
          { label: "Moisture Ratio", val: "12.0% Max", icon: <Droplet className="w-4 h-4 text-blue-600" /> },
          { label: "Foreign Matter", val: "< 0.2% Max", icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> },
          { label: "Packaging Size", val: "50kg Jute / PP", icon: <Briefcase className="w-4 h-4 text-amber-600" /> }
        ]
      },
      {
        id: "urad",
        title: "Urad Dal & Urad Whole (Black Gram)",
        category: "pulses",
        desc: "Highly-conditioned Black Gram. Polished or unpolished varieties custom-matched for premium fermentation requirements in commercial batter formulation and mills.",
        image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=800",
        bullets: [
          "Calibrated particle size profiles",
          "Superior dough volume and elasticity",
          "Extensively de-stoned during cleaning"
        ],
        specs: [
          { label: "Purity Grade", val: "99.6% Min", icon: <Layers className="w-4 h-4 text-emerald-700" /> },
          { label: "Moisture Ratio", val: "11.0% Max", icon: <Droplet className="w-4 h-4 text-blue-600" /> },
          { label: "Foreign Matter", val: "< 0.2% Max", icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> },
          { label: "Packaging Size", val: "50kg Multi-layer", icon: <Briefcase className="w-4 h-4 text-amber-600" /> }
        ]
      },
      {
        id: "masoor",
        title: "Masoor Dal & Moong Dal",
        category: "pulses",
        desc: "Pristine Split Red Lentils (Masoor) and Green Moong Dal processed under high-velocity dry polishing units to lock in natural mineral structures.",
        image: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&q=80&w=800",
        bullets: [
          "Bright uniform size seed distribution",
          "Zero chemical residues or toxic glazing",
          "Exceptional protein yields per metric ton"
        ],
        specs: [
          { label: "Purity Grade", val: "99.8% Min", icon: <Layers className="w-4 h-4 text-emerald-700" /> },
          { label: "Moisture Ratio", val: "11.5% Max", icon: <Droplet className="w-4 h-4 text-blue-600" /> },
          { label: "Foreign Matter", val: "< 0.1% Max", icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> },
          { label: "Packaging Size", val: "25kg / 50kg Bags", icon: <Briefcase className="w-4 h-4 text-amber-600" /> }
        ]
      },
      {
        id: "grains",
        title: "Grains & Basmati Rice",
        category: "diversified",
        desc: "Supreme long-grain aged Basmati and whole grains curated to satisfy dense institutional welfare mandates and high-volume state food programs.",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
        bullets: [
          "Average length > 7.4mm post-cooking",
          "Aged under climate-balanced warehouses",
          "Low broken percentage guarantees"
        ],
        specs: [
          { label: "Purity Grade", val: "99.0% Min", icon: <Layers className="w-4 h-4 text-emerald-700" /> },
          { label: "Moisture Ratio", val: "12.5% Max", icon: <Droplet className="w-4 h-4 text-blue-600" /> },
          { label: "Foreign Matter", val: "< 0.3% Max", icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> },
          { label: "Packaging Size", val: "20kg / 50kg Packs", icon: <Briefcase className="w-4 h-4 text-amber-600" /> }
        ]
      },
      {
        id: "oils",
        title: "FSSAI Grade Edible Oils",
        category: "diversified",
        desc: "Refined and raw Soybean, Mustard, and Sunflower oils processed using mechanical multi-stage expellers to meet heavy institutional catering guidelines.",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800",
        bullets: [
          "FFA levels maintained under 0.1%",
          "Tested against moisture contamination",
          "Enriched with standard Vitamin A & D"
        ],
        specs: [
          { label: "Purity Grade", val: "100% Pure", icon: <Layers className="w-4 h-4 text-emerald-700" /> },
          { label: "Moisture Ratio", val: "< 0.05% Max", icon: <Droplet className="w-4 h-4 text-blue-600" /> },
          { label: "Foreign Matter", val: "Nil Detected", icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> },
          { label: "Packaging Size", val: "15L Tins / Bottles", icon: <Briefcase className="w-4 h-4 text-amber-600" /> }
        ]
      },
      {
        id: "spices",
        title: "Selected Tea & Ground Spices",
        category: "diversified",
        desc: "Custom-blended regional tea commodities and grounded raw spices including Turmeric, Chili, and Coriander powder curated for bulk logistics.",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
        bullets: [
          "Preserved high volatile oil content",
          "Hygienically packaged to prevent dampness",
          "Free from additives and adulterants"
        ],
        specs: [
          { label: "Purity Grade", val: "99.0% Min", icon: <Layers className="w-4 h-4 text-emerald-700" /> },
          { label: "Moisture Ratio", val: "9.0% Max", icon: <Droplet className="w-4 h-4 text-blue-600" /> },
          { label: "Foreign Matter", val: "< 0.5% Max", icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> },
          { label: "Packaging Size", val: "Bulk Jute / Boxes", icon: <Briefcase className="w-4 h-4 text-amber-600" /> }
        ]
      }
    ];

    const filteredProducts = productTab === "all" 
      ? REDESIGNED_PRODUCTS 
      : REDESIGNED_PRODUCTS.filter(p => p.category === productTab);

    return (
      <motion.div 
        key="products-specs"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="pb-24 bg-zinc-50/70"
      >
        {/* Immersive Dark Section Header */}
        <div className="bg-[#0b2418] text-white pt-36 pb-20 px-6 md:px-12 text-center relative overflow-hidden">
          <ShiningLightsBackground />
          
          <div className="max-w-4xl mx-auto space-y-5 relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-white leading-tight">
              Product Profiles & Technical Specs
            </h1>
            <p className="text-gray-300 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Precision-sorted agricultural assets supplied to military, welfare, and bulk commercial sectors under strict FSSAI parameters.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12 font-sans">
          
          {/* Interactive Filter Navigation & Responsive Layout Switch */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-4 rounded-3xl border border-zinc-200/50 shadow-sm max-w-5xl mx-auto">
            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-100 rounded-2xl">
              <button
                onClick={() => setProductTab("all")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  productTab === "all"
                    ? "bg-brand-green-dark text-white shadow-md"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50"
                }`}
              >
                All Commodities
              </button>
              <button
                onClick={() => setProductTab("pulses")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  productTab === "pulses"
                    ? "bg-brand-green-dark text-white shadow-md"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50"
                }`}
              >
                Primary Pulses
              </button>
              <button
                onClick={() => setProductTab("diversified")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  productTab === "diversified"
                    ? "bg-brand-green-dark text-white shadow-md"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50"
                }`}
              >
                Diversified Sourcing
              </button>
            </div>

            {/* View Switching buttons: Card View, List View, Detail View */}
            <div className="flex items-center gap-1.5 p-1 bg-zinc-100 border border-zinc-200/80 rounded-2xl shrink-0">
              <button
                onClick={() => setProductViewMode("card")}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  productViewMode === "card"
                    ? "bg-brand-green-dark text-[#f4d068] shadow-md"
                    : "text-zinc-600 hover:text-brand-green-dark hover:bg-zinc-200/50"
                }`}
                title="Card View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Card View</span>
              </button>
              <button
                onClick={() => setProductViewMode("list")}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  productViewMode === "list"
                    ? "bg-brand-green-dark text-[#f4d068] shadow-md"
                    : "text-zinc-600 hover:text-brand-green-dark hover:bg-zinc-200/50"
                }`}
                title="List View"
              >
                <List className="w-3.5 h-3.5" />
                <span>List View</span>
              </button>
              <button
                onClick={() => setProductViewMode("detail")}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  productViewMode === "detail"
                    ? "bg-brand-green-dark text-[#f4d068] shadow-md"
                    : "text-zinc-600 hover:text-brand-green-dark hover:bg-zinc-200/50"
                }`}
                title="Detail View"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Detail View</span>
              </button>
            </div>
          </div>

          {/* Catalog Standard Box */}
          <div className="bg-white rounded-3xl border border-zinc-200/60 border-l-4 border-l-brand-green-mid p-6 sm:p-8 md:p-10 shadow-[0_15px_40px_rgba(15,46,30,0.015)] flex flex-col md:flex-row gap-6 items-center hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-brand-green-dark shrink-0">
              <Award className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-serif font-bold text-zinc-900">The Sourcing & Processing Protocol</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Every shipment processed under Punitdhan Pulses Limited undergoes strict mechanical sorting, color sortex purification, de-stoning, and micro-moisture calibrations ensuring total conformance to <strong>FSSAI standards and ISO 9001:2015</strong> mandates.
              </p>
            </div>
          </div>

          {/* Dynamic Render according to View Mode */}
          <div className="space-y-8">
            {productViewMode === "card" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`group bg-white rounded-3xl border border-zinc-200/50 border-l-4 ${product.id === 'chana' || product.id === 'toor' ? "border-l-brand-green-mid" : "border-l-[#f4d068]"} shadow-sm hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between`}
                  >
                    {/* Visual Card Top Image */}
                    <div className="relative h-56 bg-zinc-100 overflow-hidden shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-full object-cover filter brightness-95 group-hover:brightness-100 group-hover:scale-[1.03] transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-4 left-4 bg-brand-green-dark text-white text-[9px] font-mono uppercase tracking-widest font-bold px-3 py-1 rounded-full shadow-sm">
                        {product.category}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <h3 className="font-serif font-bold text-lg sm:text-xl text-zinc-900 group-hover:text-brand-green-dark transition-colors duration-200">
                            {product.title}
                          </h3>
                        </div>

                        <p className="text-xs text-zinc-600 leading-relaxed font-sans font-medium line-clamp-3">
                          {product.desc}
                        </p>
                      </div>

                      {/* Detail CTA Row */}
                      <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
                        <button
                          onClick={() => {
                            setProductViewMode("detail");
                            setActiveSpecProductId(product.id);
                          }}
                          className="flex-1 text-center bg-zinc-100 hover:bg-zinc-200/70 text-zinc-700 transition-all py-2 rounded-xl text-xs font-bold cursor-pointer"
                        >
                          Know More
                        </button>
                        <button
                          onClick={(e) => handleScrollToContact(e, product.title)}
                          className="flex-1 text-center bg-[#f4d068] hover:bg-brand-green-dark hover:text-white text-zinc-900 transition-all py-2 rounded-xl text-xs font-bold cursor-pointer"
                        >
                          Inquire
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {productViewMode === "list" && (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl border border-zinc-200/50 border-l-4 border-l-brand-green-mid p-5 flex flex-col lg:flex-row items-center justify-between gap-6 hover:shadow-md hover:border-zinc-300/60 hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Identity row block */}
                    <div className="flex items-center gap-5 w-full lg:w-auto flex-1">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-zinc-150">
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <span className="text-[8px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded uppercase tracking-wider">
                          {product.category}
                        </span>
                        <h4 className="text-base font-serif font-black text-zinc-900 mt-1 leading-tight">
                          {product.title}
                        </h4>
                        <p className="text-xs text-zinc-500 mt-1 line-clamp-1">{product.desc}</p>
                      </div>
                    </div>

                    {/* CTA row block */}
                    <div className="flex items-center gap-2.5 w-full lg:w-auto shrink-0 justify-end">
                      <button
                        onClick={() => {
                          setProductViewMode("detail");
                          setActiveSpecProductId(product.id);
                        }}
                        className="flex-1 lg:flex-none border border-zinc-250 hover:bg-zinc-50 text-zinc-700 font-sans font-bold text-xs px-4 py-2 rounded-xl transition-all whitespace-nowrap text-center cursor-pointer"
                      >
                        Know More
                      </button>
                      <button
                        onClick={(e) => handleScrollToContact(e, product.title)}
                        className="flex-1 lg:flex-none bg-[#f4d068] hover:bg-brand-green-dark hover:text-white text-zinc-950 font-sans font-extrabold text-xs px-5 py-2 rounded-xl transition-all whitespace-nowrap text-center shadow-xs cursor-pointer"
                      >
                        Inquire
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {productViewMode === "detail" && (() => {
              const isCurrentActiveInFilter = filteredProducts.some(p => p.id === activeSpecProductId);
              const resolvedActiveProductId = isCurrentActiveInFilter ? activeSpecProductId : (filteredProducts[0]?.id || "chana");
              const activeProduct = filteredProducts.find(p => p.id === resolvedActiveProductId);
              if (!activeProduct) return null;

              return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column - Master Selection Panel */}
                  <div className="lg:col-span-4 space-y-2.5">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 uppercase block pl-1">
                      Select Commodity ({filteredProducts.length})
                    </span>
                    <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1">
                      {filteredProducts.map((p) => {
                        const isSelected = p.id === activeProduct.id;
                        return (
                          <button
                            key={p.id}
                            onClick={() => setActiveSpecProductId(p.id)}
                            className={`w-full text-left p-4 rounded-2xl transition-all relative flex items-center justify-between border cursor-pointer ${
                              isSelected
                                ? "bg-white border-brand-green-dark shadow-md"
                                : "bg-white/50 border-zinc-200 hover:bg-white hover:border-zinc-300"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-zinc-100">
                                <img src={p.image} alt={p.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                              <div className="space-y-0.5">
                                <p className={`text-xs font-serif font-black ${isSelected ? "text-brand-green-dark" : "text-zinc-800"}`}>
                                  {p.title}
                                </p>
                                <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
                                  {p.category}
                                </p>
                              </div>
                            </div>
                            <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? "text-brand-green-dark translate-x-0.5" : "text-zinc-400"}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column - Detail Spec Spotlight Card */}
                  <div className="lg:col-span-8">
                    <motion.div
                      key={activeProduct.id}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white rounded-3xl border border-zinc-200/60 border-l-4 border-l-brand-green-mid shadow-sm hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    >
                      {/* Image header banner */}
                      <div className="h-64 sm:h-72 w-full relative">
                        <img src={activeProduct.image} alt={activeProduct.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 flex flex-wrap justify-between items-end gap-4">
                          <div className="space-y-1 text-white">
                            <span className="text-[9px] font-mono uppercase tracking-widest text-[#f4d068] font-bold bg-[#f4d068]/20 border border-[#f4d068]/30 px-2.5 py-1 rounded-full">
                              {activeProduct.category} Profile
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight drop-shadow-sm">
                              {activeProduct.title}
                            </h2>
                          </div>
                        </div>
                      </div>

                      {/* Info & specifications content */}
                      <div className="p-6 sm:p-8 space-y-8">
                        {/* Description */}
                        <div className="space-y-3">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                            Commodity Profile
                          </span>
                          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                            {activeProduct.desc}
                          </p>
                        </div>

                        {/* Bullet list of features & compliance guidelines */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-100">
                          <div className="space-y-3">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                              Milling Mandates
                            </span>
                            <div className="space-y-2.5">
                              {activeProduct.bullets.map((b, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-xs text-zinc-600">
                                  <span className="w-4 h-4 bg-emerald-50 rounded-full flex items-center justify-center shrink-0 text-brand-green-dark mt-0.5">
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                  </span>
                                  <span className="font-medium text-zinc-700">{b}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="bg-emerald-50/40 border border-emerald-100 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                            <div className="space-y-1.5">
                              <h4 className="text-xs font-mono uppercase tracking-wider text-brand-green-dark font-black">
                                Verified Sourcing
                              </h4>
                              <p className="text-[11px] text-zinc-600 leading-relaxed font-sans font-semibold">
                                Certified safe under standard FSSAI parameters. Batch-verified against foreign matter, internal contamination, and moisture degradation. Sourced direct from cooperative grower mandis.
                              </p>
                            </div>
                            <button
                              onClick={(e) => handleScrollToContact(e, activeProduct.title)}
                              className="w-full text-center bg-brand-green-dark text-white hover:bg-brand-green-mid hover:text-white transition-all py-2.5 px-4 rounded-xl text-xs font-bold font-sans cursor-pointer"
                            >
                              Inquire About {activeProduct.title}
                            </button>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Custom Volume Call to Action */}
          <div className="bg-[#0b2418] text-white rounded-3xl p-8 sm:p-10 md:p-12 relative overflow-hidden border border-emerald-900/40 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#f4d068]/3 rounded-full pointer-events-none filter blur-2xl" />
            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <h3 className="text-xl sm:text-2xl font-serif font-black tracking-tight text-[#f4d068]">
                Custom Technical Milling & Packing Mandates
              </h3>
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                Do you require specialized packing (e.g., 20kg consumer bags, bulk jute sacks) or customized Sortex specifications to satisfy regional tenders or state welfare contracts? Our board facilitates full tailored milling and shipping protocols.
              </p>
              <div className="pt-2">
                <a
                  href="#connect"
                  onClick={handleScrollToContact}
                  className="inline-flex items-center gap-2 text-xs font-mono font-black uppercase tracking-widest text-zinc-900 bg-[#f4d068] hover:bg-white px-6 py-3 rounded-full shadow-lg transition-all"
                >
                  <span>Submit Sourcing Tender</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    );
  }

  // Render Inner Page 5: RECRUITMENT & CAREERS (CAREERS)
  if (activePageSlug === "careers") {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        processFile(e.target.files[0]);
      }
    };

    const processFile = (file: File) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);
          setResumeFile({
            name: file.name,
            size: `${sizeInMb} MB`,
            type: file.type || "application/octet-stream",
            dataUrl: event.target.result as string
          });
        }
      };
      reader.readAsDataURL(file);
    };

    const handleDrag = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processFile(e.dataTransfer.files[0]);
      }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!resumeFile) {
        alert("Please upload your resume (PDF/Word document) to submit your application.");
        return;
      }
      setIsSubmittingCareer(true);
      
      // Simulate highly professional processing delay
      setTimeout(() => {
        if (submitCandidate) {
          submitCandidate({
            name: careerForm.name,
            email: careerForm.email,
            phone: careerForm.phone,
            position: careerForm.position,
            experience: careerForm.experience,
            message: careerForm.message,
            resumeName: resumeFile.name,
            resumeSize: resumeFile.size,
            resumeType: resumeFile.type,
            resumeDataUrl: resumeFile.dataUrl
          });
        }
        setIsSubmittingCareer(false);
        setCareerSubmitSuccess(true);
        // Clear state
        setCareerForm({
          name: "",
          email: "",
          phone: "",
          position: "Senior Mill Operator / Milling Tech",
          experience: "1-3 Years Professional Experience",
          message: ""
        });
        setResumeFile(null);
      }, 1500);
    };

    return (
      <motion.div 
        key="careers"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="pb-24 bg-brand-bg-light"
      >
        {/* Shimmering Top Banner */}
        <div className="bg-[#0b2418] text-white pt-36 pb-20 px-6 md:px-12 text-center relative overflow-hidden">
          <ShiningLightsBackground />
          
          <div className="max-w-4xl mx-auto space-y-5 relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-white leading-tight">
              Careers
            </h1>
            <p className="text-gray-300 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Cultivating Operational Leaders to Nourish the Nation
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-12 font-sans">
          {/* Introductory Stewardship Card */}
          <div className="bg-white rounded-3xl border border-zinc-200/60 border-l-4 border-l-brand-green-mid p-8 md:p-12 shadow-[0_20px_50px_rgba(15,46,30,0.02)] space-y-6 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3 text-brand-green-dark">
              <GraduationCap className="w-6 h-6 stroke-[2.5]" />
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
                Cultivating Operational Leaders
              </h2>
            </div>
            <p className="text-zinc-650 leading-relaxed text-sm sm:text-base">
              At Punitdhan Pulses Limited, our continuous corporate growth is powered entirely by the technical skill, operational focus, and professional drive of our workforce. We cultivate an inclusive, highly professional workplace environment that rewards creative thinking, operational ownership, and a shared dedication to national nutrition goals.
            </p>
          </div>

          {/* Current Opportunities & Application Redesign Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side: Hiring info & expectations */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="bg-gradient-to-br from-[#0b2418] to-[#10b981]/50 text-white rounded-3xl p-8 shadow-xl space-y-6">
                <div className="flex items-center gap-3 text-[#f4d068]">
                  <Briefcase className="w-6 h-6 stroke-[2.5]" />
                  <h3 className="text-xl font-serif font-bold tracking-tight">We Are Sourcing</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  We constantly seek technical mill operators, quality assurance specialists, supply chain logisticians, and financial compliance professionals. Working within our corporate structure gives team members hands-on exposure to massive institutional food logistics, state-level procurement frameworks, and state-of-the-art milling systems.
                </p>
                <div className="border-t border-white/10 pt-4 space-y-4">
                  <h4 className="text-xs font-mono uppercase text-[#f4d068] font-bold tracking-wider">Candidate Expectations</h4>
                  <ul className="space-y-3 text-xs text-gray-300">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#f4d068] shrink-0 mt-0.5" />
                      <span>Dedicated alignment with central and state compliance standards.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#f4d068] shrink-0 mt-0.5" />
                      <span>Sound understanding of safety-first manufacturing workflows.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#f4d068] shrink-0 mt-0.5" />
                      <span>Rigorous focus on high precision grain grading and processing.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50/50 border border-amber-200/60 rounded-3xl p-6 text-sm text-amber-900 space-y-3">
                <h4 className="font-bold font-serif text-base flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  Corporate HR Office
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                  Completed forms are routed directly to CA Dhanashree Bachhawat (Head of People Operations). Qualified profiles undergo a structural background check followed by a tech-level panel round.
                </p>
              </div>
            </div>

            {/* Right side: Interactively Redesigned Candidate Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-zinc-200/60 border-l-4 border-l-[#f4d068] p-8 shadow-[0_20px_50px_rgba(15,46,30,0.02)] space-y-8 text-left hover:-translate-y-1 transition-all duration-300">
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900">Candidate Enrollment</h3>
                <p className="text-xs text-zinc-500 font-mono mt-1">Submit your profile and resume directly into our corporate portal.</p>
              </div>

              {careerSubmitSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-8 text-center space-y-5"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-10 h-10 stroke-[2]" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-serif font-black text-zinc-900">Application Submitted!</h4>
                    <p className="text-sm text-zinc-600 leading-relaxed max-w-md mx-auto">
                      Thank you for applying. Your candidate details and uploaded resume are safely stored in our Administrative CMS database. Our HR panel will reach out if your credentials align.
                    </p>
                  </div>
                  <button 
                    onClick={() => setCareerSubmitSuccess(false)}
                    className="bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs uppercase tracking-widest font-extrabold px-6 py-3 rounded-xl transition-all cursor-pointer shadow"
                  >
                    Submit Another Application
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Basic Info Rows */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold block">Candidate Name *</label>
                      <input 
                        type="text"
                        required
                        value={careerForm.name}
                        onChange={(e) => setCareerForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green-dark focus:bg-white transition-all text-zinc-800"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold block">Email Address *</label>
                      <input 
                        type="email"
                        required
                        value={careerForm.email}
                        onChange={(e) => setCareerForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="e.g. rahul@example.com"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green-dark focus:bg-white transition-all text-zinc-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold block">Contact Phone *</label>
                      <input 
                        type="tel"
                        required
                        value={careerForm.phone}
                        onChange={(e) => setCareerForm(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green-dark focus:bg-white transition-all text-zinc-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold block">Position Applied For *</label>
                      <select
                        value={careerForm.position}
                        onChange={(e) => setCareerForm(prev => ({ ...prev, position: e.target.value }))}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green-dark focus:bg-white transition-all text-zinc-800 cursor-pointer"
                      >
                        <option>Senior Mill Operator / Milling Tech</option>
                        <option>Quality Assurance Analyst / Lab Executive</option>
                        <option>Procurement & Sourcing Manager</option>
                        <option>Logistics & Supply Chain Lead</option>
                        <option>Financial Compliance Specialist</option>
                        <option>Human Resources Executive</option>
                        <option>Other / General Application</option>
                      </select>
                    </div>
                  </div>

                  {/* Experience Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold block">Relevant Experience *</label>
                    <select
                      value={careerForm.experience}
                      onChange={(e) => setCareerForm(prev => ({ ...prev, experience: e.target.value }))}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green-dark focus:bg-white transition-all text-zinc-800 cursor-pointer"
                    >
                      <option>Entry Level / Graduate / Fresher</option>
                      <option>1-3 Years Professional Experience</option>
                      <option>3-5 Years Professional Experience</option>
                      <option>5+ Years Senior Specialist</option>
                    </select>
                  </div>

                  {/* Message Note */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold block">Statement / Cover Note (Optional)</label>
                    <textarea 
                      rows={3}
                      value={careerForm.message}
                      onChange={(e) => setCareerForm(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell us about your background or why you are applying to Punitdhan..."
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green-dark focus:bg-white transition-all text-zinc-800 resize-none"
                    />
                  </div>

                  {/* Redesigned Drag & Drop Resume Upload Box */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold block">Upload Resume (PDF, DOC, DOCX) *</label>
                    
                    {resumeFile ? (
                      /* Connected File Present */
                      <div className="bg-emerald-50/30 border border-emerald-500/20 rounded-2xl p-4 flex items-center justify-between gap-3 animate-fadeIn">
                        <div className="flex items-center gap-3">
                          <span className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                            <FileText className="w-6 h-6" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-zinc-800 truncate">{resumeFile.name}</p>
                            <p className="text-[10px] text-zinc-400 font-mono mt-0.5">{resumeFile.size} • {resumeFile.type.split("/")[1]?.toUpperCase() || "Document"}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setResumeFile(null)}
                          className="p-1.5 hover:bg-zinc-100 text-zinc-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                          title="Remove file"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      /* Drag & Drop Active Area */
                      <div
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => careerFileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                          dragActive 
                            ? "border-[#f4d068] bg-amber-50/10 scale-[1.01]" 
                            : "border-zinc-200 hover:border-[#10b981] bg-zinc-50/50 hover:bg-zinc-50"
                        }`}
                      >
                        <input 
                          type="file"
                          ref={careerFileInputRef}
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          className="hidden"
                        />
                        <div className="space-y-3">
                          <span className="inline-flex p-3 bg-zinc-100 text-zinc-500 rounded-full">
                            <UploadCloud className="w-6 h-6 text-[#10b981]" />
                          </span>
                          <div>
                            <p className="text-xs font-bold text-zinc-800">Drag & Drop Resume, or <span className="text-[#10b981] font-black hover:underline">Browse</span></p>
                            <p className="text-[10px] text-zinc-400 mt-1 font-mono">Accepts PDF, DOC, DOCX up to 5MB</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Action */}
                  <button
                    type="submit"
                    disabled={isSubmittingCareer || !resumeFile}
                    className={`w-full font-mono text-xs uppercase tracking-widest font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow ${
                      !resumeFile 
                        ? "bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200"
                        : isSubmittingCareer 
                          ? "bg-zinc-800 text-white cursor-wait"
                          : "bg-[#f4d068] hover:bg-[#ebc453] text-zinc-950 cursor-pointer hover:scale-[1.01]"
                    }`}
                  >
                    {isSubmittingCareer ? (
                      <>
                        <span className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin"></span>
                        <span>Filing Profile...</span>
                      </>
                    ) : (
                      <>
                        <span>Verify & Submit Application</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </motion.div>
    );
  }

  // Render Inner Page 6: STATUTORY DETAILS (ALLIANCES)
  if (activePageSlug === "alliances") {
    return (
      <motion.div 
        key="alliances"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="pb-24 bg-brand-bg-light"
      >
        <div className="bg-[#0b2418] text-white pt-36 pb-20 px-6 md:px-12 text-center relative overflow-hidden">
          <ShiningLightsBackground />
          
          <div className="max-w-4xl mx-auto space-y-5 relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-white leading-tight">
              {localize({ en: "Statutory Details", hi: "सांविधिक विवरण", gu: "વૈધાનिक વિगતો" })}
            </h1>
            <p className="text-gray-300 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              {localize({ 
                en: "Official Registry Codes, Central Government Approved Food Safety Licenses & Corporate Standards", 
                hi: "आधिकारिक पंजीकरण कोड, केंद्र सरकार द्वारा अनुमोदित खाद्य सुरक्षा लाइसेंस और कॉर्पोरेट मानक", 
                gu: "સત્તાવાર નોંધણી કોડ્સ, કેન્દ્ર સરકાર માન્ય ફૂડ સેફ્ટી લાઇસન્સ અને ગુણવત્તા ધોરણો" 
              })}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <OrganizationDetails />
        </div>
      </motion.div>
    );
  }

  // Render Inner Page 7: CONNECT US & GEOGRAPHIC MATRIX (CONNECT)
  if (activePageSlug === "connect") {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitStatus("idle");
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } catch (err) {
        setSubmitStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <motion.div 
        key="connect"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="pb-24 bg-brand-bg-light"
      >
        <div className="bg-[#0b2418] text-white pt-36 pb-20 px-6 md:px-12 text-center relative overflow-hidden">
          <ShiningLightsBackground />
          
          <div className="max-w-4xl mx-auto space-y-5 relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-white leading-tight">
              {localize({ en: "Connect Us", hi: "हमसे संपर्क करें", gu: "અમારો સંપર્ક કરો" })}
            </h1>
            <p className="text-gray-300 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              {localize({
                en: "Our Central Communications, Business Desks & Sourcing Channels",
                hi: "हमारे केंद्रीय संचार, व्यावसायिक डेस्क और सोर्सिंग चैनल",
                gu: "અમારા સેન્ટ્રલ કોમ્યુનિકેશન્સ, બિઝનેસ ડેસ્ક અને સોર્સિંગ ચેનલ્સ"
              })}
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-12 font-sans">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Address Details (7 columns) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Addresses Card */}
              <div className="bg-white rounded-3xl border border-zinc-200/60 border-l-4 border-l-brand-green-mid p-6 sm:p-8 shadow-[0_20px_50px_rgba(15,46,30,0.02)] space-y-6 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 text-brand-green-dark">
                  <MapPin className="w-6 h-6 stroke-[2.5]" />
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
                    Addresses & Registered Offices
                  </h2>
                </div>

                <div className="space-y-6 text-xs sm:text-sm text-zinc-650">
                  <div className="space-y-1.5 border-l-2 border-brand-accent pl-4">
                    <strong className="text-zinc-900 block font-sans">Corporate Headquarters:</strong>
                    <span className="block text-zinc-500 font-medium">406 Neelgagan Plaza, Opposite Police Commissioner Office, Shahibaug, Ahmedabad, Gujarat, India – 380004.</span>
                  </div>
                  <div className="space-y-1.5 border-l-2 border-[#f4d068] pl-4">
                    <strong className="text-zinc-900 block font-sans">Milling & Manufacturing Hub I:</strong>
                    <span className="block text-zinc-500 font-medium">Near Omkar Textile Mill, Behind Narnarayan Weigh Bridge, Memco Char Rasta, Naroda Road, Ahmedabad, Gujarat, India – 382345.</span>
                  </div>
                  <div className="space-y-1.5 border-l-2 border-emerald-600 pl-4">
                    <strong className="text-zinc-900 block font-sans">Milling & Manufacturing Hub II:</strong>
                    <span className="block text-zinc-500 font-medium">Krishna Rice Mills Compound, Behind Baba Ramdevpir Mandir, Near Patel Kanta, Daran Road, Ahmedabad, Gujarat, India – 382220.</span>
                  </div>
                </div>
              </div>

              {/* Communication Desks Card */}
              <div className="bg-white rounded-3xl border border-zinc-200/60 border-l-4 border-l-[#f4d068] p-6 sm:p-8 shadow-[0_20px_50px_rgba(15,46,30,0.02)] space-y-6 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 text-brand-green-dark">
                  <Phone className="w-6 h-6 stroke-[2.5]" />
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
                    Institutional Communication
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block font-bold">Direct Lines</span>
                    <div className="space-y-1 font-mono text-zinc-700">
                      <a href="tel:+917069888113" className="block hover:text-brand-green-mid transition-colors font-bold">+91 70698 88113</a>
                      <a href="tel:+917069888112" className="block hover:text-brand-green-mid transition-colors font-bold">+91 70698 88112</a>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block font-bold">Electronic Mail</span>
                    <div className="space-y-1 font-mono text-brand-green-mid">
                      <a href="mailto:punitdhan_pulses@yahoo.com" className="block hover:underline truncate font-bold">punitdhan_pulses@yahoo.com</a>
                      <a href="mailto:punitdhan_pulses2025@yahoo.com" className="block hover:underline truncate font-bold">punitdhan_pulses2025@yahoo.com</a>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Connect Form (5 columns) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-zinc-200/60 border-l-4 border-l-brand-green-mid p-6 sm:p-8 shadow-[0_20px_50px_rgba(15,46,30,0.02)] space-y-6 hover:-translate-y-1 transition-all duration-300">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
                  Send Us an Inquiry
                </h2>
                <p className="text-xs sm:text-sm text-zinc-550 leading-relaxed mt-1">
                  Submit your sourcing mandate or commercial query.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 border border-zinc-200 text-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/25 focus:border-brand-green-mid transition-all font-sans font-semibold"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 border border-zinc-200 text-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/25 focus:border-brand-green-mid transition-all font-sans font-semibold"
                    placeholder="name@company.com"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 border border-zinc-200 text-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/25 focus:border-brand-green-mid transition-all font-sans font-semibold"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 block">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 border border-zinc-200 text-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/25 focus:border-brand-green-mid transition-all font-sans font-semibold"
                    placeholder="Corporate supply / General Query"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 block">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 border border-zinc-200 text-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/25 focus:border-brand-green-mid transition-all font-sans font-semibold resize-none"
                    placeholder="Detail your requirements..."
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-fadeIn">
                    <span>✓</span>
                    <span>Your enquiry has been received successfully.</span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-fadeIn">
                    <span>✕</span>
                    <span>An unexpected error occurred. Please try again.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#f4d068] hover:bg-brand-green-dark hover:text-white text-brand-green-dark text-xs sm:text-sm font-extrabold uppercase tracking-widest transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Enquiry</span>
                      <ArrowRight className="w-4 h-4" />
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

  return null;
}
