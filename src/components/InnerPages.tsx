import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, ShieldCheck, Award, Users, Briefcase, MapPin, Mail, Phone, 
  Compass, Goal, CheckCircle2, ArrowRight, Star, Heart, Flame, ShieldAlert,
  Globe2, Landmark, GraduationCap, ChevronRight, Scale, Calendar, Sparkles, Quote,
  Droplet, Layers, Check, Sprout, User, List, LayoutGrid, Clock, X, ChevronLeft, TrendingUp,
  UploadCloud, FileText, ArrowLeft
} from "lucide-react";
import { useCMS } from "../context/CMSContext";
import { useLanguage } from "../context/LanguageContext";
import OrganizationDetails from "./OrganizationDetails";
import { LEADERS } from "../data";

// Mapping of high-fidelity premium professional corporate portraits
const LEADER_IMAGES: Record<string, string> = {
  prakashchand: "/prakashchand.jpg",
  punit: "/punit.jpg",
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
              {localize({ en: "Corporate Profile & Heritage", hi: "कॉर्पोरेट प्रोफाइल और विरासत", gu: "કોર્પોરેટ પ્રોફાઇલ અને વારસો" })}
            </h1>
            <p className="text-gray-300 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              {localize({
                en: "A journey of pure quality, trusted agro-standards, and cooperative excellence since 1988.",
                hi: "1988 से शुद्ध गुणवत्ता, विश्वसनीय कृषि मानकों और सहकारी उत्कृष्टता की यात्रा।",
                gu: "૧૯૮૮ થી શુદ્ધ ગુણવત્તા, વિશ્વસનીય કૃષિ ધોરણો અને સહકારી શ્રેષ્ઠતાની સફર."
              })}
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
                  {localize({ en: "38+ Years of Uncompromising Purity", hi: "38+ वर्षों की अटूट शुद्धता", gu: "૩૮+ વર્ષની અવિરત શુદ્ધતા" })}
                </h2>
                
                {/* Custom Quote Box */}
                <div className="border-l-4 border-[#f4d068] pl-4 py-1 my-4 bg-amber-50/40 rounded-r-xl">
                  <Quote className="w-6 h-6 text-[#f4d068]/60 mb-1" />
                  <p className="text-sm font-serif italic text-zinc-800 leading-relaxed">
                    {localize({
                      en: "\"From a single local processing plant in Gujarat to one of Western India's most trusted public corporate agro-commodity networks.\"",
                      hi: "\"गुजरात में एक स्थानीय प्रसंस्करण संयंत्र से लेकर पश्चिमी भारत के सबसे भरोसेमंद सार्वजनिक कॉर्पोरेट कृषि-जिंस नेटवर्क में से एक बनने तक।\"",
                      gu: "\"ગુજરાતમાં એક નાના પ્રોસેસિંગ યુનિટથી શરૂ કરીને પશ્ચિમ ભારતના સૌથી વિશ્વસનીય જાહેર કોર્પોરેટ કૃષિ નેટવર્ક્સમાંનું એક બનવા સુધી.\""
                    })}
                  </p>
                </div>

                <p className="text-zinc-650 leading-relaxed text-sm sm:text-base">
                  {localize({
                    en: "Founded on April 1, 1988, as Prakash Agro Mills, our organization spent nearly four decades solidifying its positioning as a foundational leader in the Indian agrifood market. To accommodate structural scale, broaden institutional capital opportunities, and optimize governance transparency, the entity officially transitioned into its current public corporate structure as Punitdhan Pulses Limited on March 31, 2025. This milestone marks an exciting new era of global standards.",
                    hi: "1 अप्रैल 1988 को प्रकाश एग्रो मिल्स के रूप में स्थापित, हमारे संगठन ने भारतीय कृषि-खाद्य बाजार में एक मजबूत अग्रणी के रूप में अपनी स्थिति मजबूत करने में लगभग चार दशक बिताए। संरचनात्मक पैमाने को समायोजित करने, संस्थागत पूंजी के अवसरों को व्यापक बनाने और शासन पारदर्शिता को अनुकूलित करने के लिए, संस्था ने 31 मार्च 2025 को आधिकारिक तौर पर पुनीतधन पल्सेस लिमिटेड के रूप में अपनी वर्तमान सार्वजनिक कॉर्पोरेट संरचना में परिवर्तन किया। यह मील का पत्थर वैश्विक मानकों के एक रोमांचक नए युग का प्रतीक है।",
                    gu: "૧ એપ્રિલ ૧૯૮૮ ના રોજ પ્રકાશ એગ્રો મિલ્સ તરીકે સ્થપાયેલી અમારી સંસ્થાએ ભારતીય કૃષિ બજારમાં અગ્રણી તરીકે સ્થાન મજબૂત કરવામાં લગભગ ચાર દાયકા વિતાવ્યા. માળખાકીય સ્કેલ વધારવા, મૂડીની તકો વિસ્તૃત કરવા અને સુશાસન પારદર્શિતા વધારવા માટે, સંસ્થાએ ૩૧ માર્ચ ૨૦૨૫ ના રોજ પુનીતધન પલ્સ લિમિટેડ તરીકે જાહેર કોર્પોરેટ માળખામાં પરિવર્તન કર્યું."
                  })}
                </p>
              </div>

            </div>

            {/* Right Column: Premium Interactive Timeline */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-zinc-200/80 border-l-4 border-l-[#f4d068] p-8 md:p-10 shadow-[0_20px_50px_rgba(15,46,30,0.02)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center">
              <div className="space-y-3 mb-8">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-zinc-900">
                  {localize({ en: "Our Evolutionary Timeline", hi: "हमारी विकास यात्रा", gu: "અમારી વિકાસ યાત્રા" })}
                </h3>
              </div>

              <div className="relative pl-6 sm:pl-8 border-l border-zinc-200/80 space-y-10 py-2">
                {[
                  {
                    year: "1988",
                    title: localize({ en: "The Genesis & Foundation", hi: "शुरुआत और स्थापना", gu: "શરૂઆત અને સ્થાપના" }),
                    desc: localize({
                      en: "Prakash Agro Mills is founded on April 1, pioneering local raw grain processing and standardizing grading methodologies.",
                      hi: "1 अप्रैल को प्रकाश एग्रो मिल्स की स्थापना हुई, जिसने स्थानीय कच्चे अनाज के प्रसंस्करण और ग्रेडिंग पद्धतियों के मानकीकरण की शुरुआत की।",
                      gu: "૧ એપ્રિલના રોજ પ્રકાશ એગ્રો મિલ્સની સ્થાપના થઈ, જેણે અનાજ પ્રોસેસિંગ અને ગ્રેડિંગ પદ્ધતિઓનું માનકીકરણ કર્યું."
                    }),
                    badge: localize({ en: "Prakash Agro Mills", hi: "प्रकाश एग्रो मिल्स", gu: "પ્રકાશ એગ્રો મિલ્સ" })
                  },
                  {
                    year: "2005",
                    title: localize({ en: "Infrastructure & National Network", hi: "बुनियादी ढांचा और राष्ट्रीय नेटवर्क", gu: "ઈન્ફ્રાસ્ટ્રક્ચર અને નેશનલ નેટવર્ક" }),
                    desc: localize({
                      en: "Expanded processing capacity to over 100 metric tons daily and built cooperative partnerships with mandis across multiple states.",
                      hi: "दैनिक प्रसंस्करण क्षमता को 100 मीट्रिक टन से अधिक तक बढ़ाया और कई राज्यों की मंडियों के साथ सहकारी भागीदारी का निर्माण किया।",
                      gu: "દૈનિક પ્રોસેસિંગ ક્ષમતા વધારીને ૧૦૦ મેટ્રિક ટનથી વધુ કરી અને વિવિધ રાજ્યોની મંડીઓ સાથે સહયોગી ભાગીદારી સ્થાપી."
                    }),
                    badge: localize({ en: "Scale Phase", hi: "विस्तार चरण", gu: "વિસ્તાર તબક્કો" })
                  },
                  {
                    year: "2018",
                    title: localize({ en: "Advanced Tech Integration", hi: "उन्नत तकनीक एकीकरण", gu: "અદ્યતન ટેકનોલોજી એકીકરણ" }),
                    desc: localize({
                      en: "Implemented high-precision computerized Sortex sorting and mechanical purification systems ensuring 99.9% grain purity.",
                      hi: "उच्च-सटीक कम्प्यूटरीकृत सॉर्टेक्स छंटाई और यांत्रिक शुद्धिकरण प्रणाली लागू की, जिससे 99.9% अनाज शुद्धता सुनिश्चित हुई।",
                      gu: "ઉચ્ચ ચોકસાઇવાળા કોમ્પ્યુટરાઇઝ્ડ સોર્ટેક્સ સોર્ટિંગ અને શુદ્ધિકરણ પ્રણાલી લાગુ કરી, જેનાથી ૯૯.૯% અનાજની શુદ્ધતા સુનિશ્ચિત થઈ."
                    }),
                    badge: localize({ en: "Computerized Sortex", hi: "कम्प्यूटरीकृत सॉर्टेक्स", gu: "કમ્પ્યુટરાઇઝ્ડ સોર્ટેક્સ" })
                  },
                  {
                    year: "2025",
                    title: localize({ en: "Public Corporate Transition", hi: "पब्लिक कॉर्पोरेट परिवर्तन", gu: "પબ્લિક કોર્પોરેટ પરિવર્તન" }),
                    desc: localize({
                      en: "Officially incorporated as Punitdhan Pulses Limited on March 31, introducing supreme audit compliance and institutional transparency.",
                      hi: "31 मार्च को पुनीतधन पल्सेस लिमिटेड के रूप में आधिकारिक तौर पर निगमित, सर्वोच्च ऑडिट अनुपालन और संस्थागत पारदर्शिता पेश की।",
                      gu: "૩૧ માર્ચના રોજ પુનીતધન પલ્સ લિમિટેડ તરીકે સત્તાવાર રીતે નિગમિત, સર્વોચ્ચ ઓડિટ પાલન અને સંસ્થાકીય પારદર્શિતા રજૂ કરી."
                    }),
                    badge: localize({ en: "Punitdhan Pulses", hi: "पुनीतधन पल्सेस", gu: "પુનીતધન પલ્સ" })
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
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
                {localize({ en: "Our Purpose Frameworks", hi: "हमारे उद्देश्य का ढांचा", gu: "અમારા હેતુનું માળખું" })}
              </h2>
              <p className="text-zinc-500 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                {localize({
                  en: "A systemized approach to food security, agrarian partnership, and institutional transparency.",
                  hi: "खाद्य सुरक्षा, कृषि साझेदारी और संस्थागत पारदर्शिता के लिए एक व्यवस्थित दृष्टिकोण।",
                  gu: "અન્ન સુરક્ષા, કૃષિ ભાગીદારી અને સંસ્થાકીય પારદર્શિતા માટે એક વ્યવસ્થિત અભિગમ."
                })}
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
                    {localize({ en: "Corporate Vision", hi: "कॉर्पोरेट विज़न (दूरदर्शिता)", gu: "કોર્પોરેટ વિઝન" })}
                  </h3>
                </div>
                <p className="text-zinc-650 text-sm sm:text-base leading-relaxed relative z-10">
                  {localize({
                    en: "To drive multi-tiered growth within the global food processing sector, ensuring premium-grade agricultural products remain universally accessible to all consumer demographics while structurally empowering agrarian communities through sustainable economics.",
                    hi: "वैश्विक खाद्य प्रसंस्करण क्षेत्र में बहुस्तरीय विकास को गति देना, यह सुनिश्चित करना कि प्रीमियम-ग्रेड कृषि उत्पाद सभी उपभोक्ता वर्गों के लिए सुलभ रहें, साथ ही टिकाऊ अर्थशास्त्र के माध्यम से कृषि समुदायों को सशक्त बनाना।",
                    gu: "વૈશ્વિક ફૂડ પ્રોસેસિંગ ક્ષેત્રે બહુસ્તરીય વૃદ્ધિને વેગ આપવો, પ્રીમિયમ કૃષિ ઉત્પાદનો તમામ ગ્રાહકો સુધી પહોંચે તે સુનિશ્ચિત કરવું અને ટકાઉ અર્થતંત્ર દ્વારા ખેડૂત સમુદાયોને સશક્ત બનાવવા."
                  })}
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
                    {localize({ en: "Corporate Mission", hi: "कॉर्पोरेट मिशन (उद्देश्य)", gu: "કોર્પોરેટ મિશન" })}
                  </h3>
                </div>
                <p className="text-zinc-650 text-sm sm:text-base leading-relaxed relative z-10">
                  {localize({
                    en: "To remain the definitive benchmark supplier of premium, sustainably sourced food grains, pulses, and allied agricultural commodities, globally recognized for operational transparency, execution speed, and supply chain integrity.",
                    hi: "प्रीमियम और स्थायी रूप से प्राप्त खाद्यान्नों, दालों और कृषि उत्पादों का निश्चित बेंचमार्क आपूर्तिकर्ता बने रहना, जिसे परिचालन पारदर्शिता, निष्पादन गति और आपूर्ति श्रृंखला की विश्वसनीयता के लिए पहचाना जाए।",
                    gu: "પ્રીમિયમ અને ટકાઉ રીતે મેળવેલા અનાજ, કઠોળ અને કૃષિ પેદાશોના અગ્રણી સપ્લાયર તરીકે રહેવું, જે સંચાલન પારદર્શિતા અને સપ્લાય ચેઇન અખંડિતતા માટે ઓળખાય."
                  })}
                </p>
              </div>

              {/* Core Values Wide Card */}
              <div className="md:col-span-2 bg-[#0b2418] text-white rounded-3xl border border-white/10 p-8 md:p-10 shadow-2xl space-y-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
                <div className="flex items-center gap-3 relative z-10">
                  <Sparkles className="w-5 h-5 text-[#f4d068]" />
                  <h4 className="text-lg sm:text-xl font-serif font-bold text-white">
                    {localize({ en: "Our Tri-Core Institutional Values", hi: "हमारे तीन प्रमुख संस्थागत मूल्य", gu: "અમારા ત્રણ મુખ્ય સંસ્થાકીય મૂલ્યો" })}
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 pt-4 border-t border-white/10">
                  <div className="space-y-3 group/value">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#f4d068]/10 text-[#f4d068] rounded-xl border border-[#f4d068]/20 group-hover/value:bg-[#f4d068] group-hover/value:text-[#0b2418] transition-all duration-300">
                        <Award className="w-5 h-5 stroke-[2]" />
                      </div>
                      <span className="text-base sm:text-lg font-serif font-bold text-white block">
                        {localize({ en: "Unmatched Quality", hi: "अतुलनीय गुणवत्ता", gu: "અજોડ ગુણવત્તા" })}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {localize({
                        en: "Rigorous multi-stage sorting protocols and computer Sortex diagnostics ensuring pure, safe, and nutritious commodities.",
                        hi: "सख्त बहु-चरणीय छंटाई प्रोटोकॉल और कंप्यूटर सॉर्टेक्स परीक्षण जो शुद्ध, सुरक्षित और पौष्टिक उत्पाद सुनिश्चित करते हैं।",
                        gu: "કમ્પ્યુટર સોર્ટેક્સ અને મલ્ટી-સ્ટેજ સોર્ટિંગ જે શુદ્ધ અને પૌષ્ટિક અનાજ સુનિશ્ચિત કરે છે."
                      })}
                    </p>
                  </div>
                  <div className="space-y-3 group/value">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#f4d068]/10 text-[#f4d068] rounded-xl border border-[#f4d068]/20 group-hover/value:bg-[#f4d068] group-hover/value:text-[#0b2418] transition-all duration-300">
                        <Scale className="w-5 h-5 stroke-[2]" />
                      </div>
                      <span className="text-base sm:text-lg font-serif font-bold text-white block">
                        {localize({ en: "Absolute Integrity", hi: "पूर्ण सत्यनिष्ठा", gu: "સંપૂર્ણ અખંડિતતા" })}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {localize({
                        en: "Sovereign compliance benchmarks, clear corporate governance audits, and fair trade practices across all mandis.",
                        hi: "संप्रभु अनुपालन मानक, स्पष्ट कॉर्पोरेट प्रशासन ऑडिट और सभी मंडियों में निष्पक्ष व्यापार प्रथाएं।",
                        gu: "સરકારી ધોરણોનું પાલન, પારદર્શક કોર્પોરેટ ઓડિટ અને તમામ મંડીઓમાં ન્યાયી વેપાર પદ્ધતિઓ."
                      })}
                    </p>
                  </div>
                  <div className="space-y-3 group/value">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#f4d068]/10 text-[#f4d068] rounded-xl border border-[#f4d068]/20 group-hover/value:bg-[#f4d068] group-hover/value:text-[#0b2418] transition-all duration-300">
                        <Sprout className="w-5 h-5 stroke-[2]" />
                      </div>
                      <span className="text-base sm:text-lg font-serif font-bold text-white block">
                        {localize({ en: "Agrarian Legacy", hi: "कृषि विरासत", gu: "કૃષિ વારસો" })}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {localize({
                        en: "Strengthening regional crop economics and ensuring farmers receive premium prices and direct technical assistance.",
                        hi: "क्षेत्रीय फसल अर्थशास्त्र को मजबूत करना और किसानों को प्रीमियम मूल्य और प्रत्यक्ष तकनीकी सहायता प्राप्त होना सुनिश्चित करना।",
                        gu: "પ્રાદેશિક પાક અર્થતંત્રને મજબૂત બનાવવું અને ખેડૂતોને વાજબી ભાવો અને ટેકનિકલ સહાય મળે તે સુનિશ્ચિત કરવું."
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Core Institutional Strengths */}
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
                {localize({ en: "Core Institutional Strengths", hi: "मुख्य संस्थागत ताकत", gu: "મુખ્ય સંસ્થાકીય શક્તિઓ" })}
              </h2>
              <p className="text-zinc-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                {localize({
                  en: "Built upon multi-generational trust and absolute performance benchmarks.",
                  hi: "पीढ़ियों के विश्वास और पूर्ण प्रदर्शन मानकों पर निर्मित।",
                  gu: "પેઢીઓના વિશ્વાસ અને સર્વોચ્ચ કાર્યક્ષમતાના ધોરણો પર આધારિત."
                })}
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
                  title: localize({ en: "Global Sourcing Network", hi: "वैश्विक सोर्सिंग नेटवर्क", gu: "વૈશ્વિક સોર્સિંગ નેટવર્ક" }),
                  desc: localize({
                    en: "We maintain an agile, highly sophisticated logistics and sourcing architecture that guarantees seamless raw asset acquisition and localized distribution under tight deadlines.",
                    hi: "हम एक चुस्त, अत्यधिक परिष्कृत लॉजिस्टिक्स और सोर्सिंग ढांचा बनाए रखते हैं जो सख्त समय सीमा के तहत निर्बाध कच्चे माल के अधिग्रहण और स्थानीय वितरण की गारंटी देता है।",
                    gu: "અમે એક અત્યાધુનિક લોજિસ્ટિક્સ અને સોર્સિંગ સિસ્ટમ ધરાવીએ છીએ જે સમયસર કાચા માલની ખરીદી અને વિતરણની ખાતરી આપે છે."
                  }),
                  icon: Globe2,
                  color: "text-blue-600 bg-blue-50 border-blue-100/60"
                },
                {
                  title: localize({ en: "State-of-the-Art Processing Infrastructure", hi: "अत्याधुनिक प्रसंस्करण बुनियादी ढांचा", gu: "અત્યાધુનિક પ્રોસેસિંગ ઇન્ફ્રાસ્ટ્રક્ચર" }),
                  desc: localize({
                    en: "Our milling environments integrate advanced computerized sortex and processing equipment, driving down downtime, eliminating human error, and maintaining complete product safety.",
                    hi: "हमारे मिलिंग वातावरण में उन्नत कम्प्यूटरीकृत सॉर्टेक्स और प्रसंस्करण उपकरण शामिल हैं, जो समय की बर्बादी घटाते हैं, मानवीय त्रुटि को समाप्त करते हैं और पूर्ण उत्पाद सुरक्षा बनाए रखते हैं।",
                    gu: "અમારા મિલિંગ યુનિટ્સમાં આધુનિક કોમ્પ્યુટરાઇઝ્ડ સોર્ટેક્સ મશીનરી છે, જે ભૂલો ઘટાડીને સંપૂર્ણ ઉત્પાદન સુરક્ષા જાળવે છે."
                  }),
                  icon: Building2,
                  color: "text-amber-600 bg-amber-50 border-amber-100/60"
                },
                {
                  title: localize({ en: "Agrarian Empowerment & Sourcing Integrity", hi: "कृषक सशक्तिकरण और सोर्सिंग सत्यनिष्ठा", gu: "ખેડૂત સશક્તિકરણ અને સોર્સિંગ અખંડિતતા" }),
                  desc: localize({
                    en: "We operate hand-in-hand with state mandis and local producers to promote sustainable agricultural cultivation, stabilize crop pricing, and cultivate regional economic development.",
                    hi: "हम टिकाऊ कृषि को बढ़ावा देने, फसल मूल्य निर्धारण को स्थिर करने और क्षेत्रीय आर्थिक विकास को बढ़ावा देने के लिए राज्य मंडियों और स्थानीय उत्पादकों के साथ मिलकर काम करते हैं।",
                    gu: "અમે ટકાઉ ખેતીને પ્રોત્સાહન આપવા, પાકના ભાવો સ્થિર રાખવા અને પ્રાદેશિક આર્થિક વિકાસ માટે મંડીઓ અને ખેડૂતો સાથે મળીને કામ કરીએ છીએ."
                  }),
                  icon: Heart,
                  color: "text-emerald-600 bg-emerald-50 border-emerald-100/60"
                },
                {
                  title: localize({ en: "Socio-Economic Development Catalyst", hi: "सामाजिक-आर्थिक विकास उत्प्रेरक", gu: "સામાજિક-આર્થિક વિકાસ ઉત્પ્રેરક" }),
                  desc: localize({
                    en: "By establishing extensive manufacturing bases in semi-rural peripheries, our corporate footprint directly creates technical employment opportunities and acts as a catalyst for rural infrastructure development.",
                    hi: "अर्ध-ग्रामीण क्षेत्रों में व्यापक विनिर्माण आधार स्थापित करके, हमारी कॉर्पोरेट उपस्थिति सीधे तकनीकी रोजगार के अवसर पैदा करती है और ग्रामीण बुनियादी ढांचे के विकास के लिए एक उत्प्रेरक के रूप में कार्य करती है।",
                    gu: "ગ્રામીણ વિસ્તારોમાં મોટા મેન્યુફેક્ચરિંગ એકમો સ્થાપીને, અમારી કંપની રોજગારીની તકો ઊભી કરે છે અને ગ્રામીણ વિકાસને વેગ આપે છે."
                  }),
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
              {localize({ en: "The Board of Directors", hi: "निदेशक मंडल", gu: "બોર્ડ ઓફ ડિરેક્ટર્સ" })}
            </h1>
            <p className="text-gray-300 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              {localize({
                en: "Steering Punitdhan Pulses with professional financial expertise, visionary industrial legacy, and uncompromising corporate oversight.",
                hi: "व्यावसायिक वित्तीय विशेषज्ञता, दूरदर्शी औद्योगिक विरासत और अटूट कॉर्पोरेट निगरानी के साथ पुनीतधन पल्सेस का संचालन।",
                gu: "વ્યાવસાયિક નાણાકીય નિપુણતા, દૂરંદેશી ઔદ્યોગિક વારસો અને મજબૂત કોર્પોરેટ દેખરેખ સાથે પુનીતધન પલ્સનું સંચાલન."
              })}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-20">
          
          {/* Executive Board of Directors Section - All Members Displayed with Interactive Views */}
          <div className="space-y-10">
            <div className="flex items-center gap-3 border-b border-zinc-200/45 pb-6">
              <Users className="w-6 h-6 text-[#0b2418] stroke-[2.5]" />
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
                {localize({ en: "Our Governing Board", hi: "हमारा संचालक बोर्ड", gu: "અમારું સંચાલક મંડળ" })}
              </h2>
            </div>

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
                        {/* Image Wrap - Full size photo matching attached images */}
                        <div className="relative aspect-[4/4.6] w-full overflow-hidden bg-white flex items-center justify-center border-b border-zinc-100 p-2 sm:p-3">
                          <img
                            src={leaderImg}
                            alt={leader.name}
                            className="w-full h-full object-contain object-top transition-transform duration-700 ease-out group-hover:scale-102"
                          />
                        </div>

                        {/* Card Footer and Description */}
                        <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-white space-y-5">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <span className="text-[10px] font-mono tracking-widest text-[#b45309] bg-[#fffbeb] border border-[#fde68a] px-3 py-1 rounded-full uppercase font-bold inline-block">
                                {stats.record[language] || stats.record.en} {localize({ en: "DIRECTIVE", hi: "निदेशक", gu: "નિર્દેશક" })}
                              </span>
                              <span className="bg-[#122e20] text-[#f4d068] text-[9px] font-mono tracking-widest px-3 py-1 rounded-full uppercase border border-[#0b2418]/20 font-bold shadow-xs">
                                {stats.tag[language] || stats.tag.en}
                              </span>
                            </div>

                            <div>
                              <h4 className="font-serif font-black text-2xl sm:text-3xl tracking-tight leading-tight text-zinc-950 group-hover:text-brand-green-dark transition-colors">
                                {locName}
                              </h4>
                              <p className="text-xs sm:text-sm text-brand-green-mid font-mono uppercase tracking-wider font-bold mt-1">
                                {locTitle}
                              </p>
                            </div>

                            <div className="pt-2 border-t border-zinc-100">
                              <span className="text-[8px] font-mono tracking-widest uppercase text-zinc-400 font-bold block mb-1">
                                {localize({ en: "Executive Profile", hi: "कार्यकारी प्रोफ़ाइल", gu: "કાર્યકારી પ્રોફાઇલ" })}
                              </span>
                              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans font-normal">
                                {getLocalizedLeaderRole(leader.id, leader.role)}
                              </p>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-[#0b2418] hover:text-brand-green-mid transition-colors font-mono text-[11px] font-extrabold uppercase">
                            <span>{getLocalizedStatLabel("ctaButton")}</span>
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
            </div>

              {/* Committee & Stewardship Blueprint - Clean of heading numbering */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-zinc-200/40 pb-4">
              <ShieldCheck className="w-6 h-6 text-[#0b2418] stroke-[2.5]" />
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
                {localize({ en: "Committee & Stewardship Blueprint", hi: "समिति और शासन रूपरेखा", gu: "સમિતિ અને સંચાલન માળખું" })}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: localize({ en: "Audit & Financial Risk Committee", hi: "ऑडिट एवं वित्तीय जोखिम समिति", gu: "ઓડિટ અને નાણાકીય જોખમ સમિતિ" }),
                  desc: localize({
                    en: "Chaired by qualified financial administrators, ensuring total transparency across budgeting, tax compliances, asset valuations, and public accountability.",
                    hi: "योग्य वित्तीय प्रशासकों की अध्यक्षता में, बजट, कर अनुपालन, परिसंपत्ति मूल्यांकन और सार्वजनिक जवाबदेही में पूर्ण पारदर्शिता सुनिश्चित करना।",
                    gu: "લાયકાત ધરાવતા નાણાકીય સંચાલકોની અધ્યક્ષતામાં, બજેટિંગ, કરવેરા પાલન અને જાહેર જવાબદારીમાં સંપૂર્ણ પારદર્શિતાની ખાતરી."
                  }),
                  bullets: [
                    localize({ en: "FSSAI & GST Auditing", hi: "FSSAI और GST ऑडिटिंग", gu: "FSSAI અને GST ઓડિટિંગ" }),
                    localize({ en: "Macroeconomic Sourcing Shield", hi: "मैक्रोइकॉनॉमिक सोर्सिंग सुरक्षा", gu: "મેક્રોઇકોનોમિક સોર્સિંગ સુરક્ષા" }),
                    localize({ en: "Transparent Cost Engineering", hi: "पारदर्शी लागत इंजीनियरिंग", gu: "પારદર્શક ખર્ચ સંચાલન" })
                  ],
                  color: "border-l-3 border-amber-500"
                },
                {
                  title: localize({ en: "Human Capital & Culture Committee", hi: "मानव संसाधन एवं संस्कृति समिति", gu: "માનવ સંસાધન અને સંસ્કૃતિ સમિતિ" }),
                  desc: localize({
                    en: "Spearheading fair-pay, workforce upskilling, and a secure professional environment for our 60+ milling technicians and administrative leaders.",
                    hi: "हमारे 60+ मिलिंग तकनीशियनों और प्रशासनिक नेताओं के लिए निष्पक्ष वेतन, कार्यबल कौशल और एक सुरक्षित वातावरण का नेतृत्व।",
                    gu: "અમારા ૬૦+ ટેકનિશિયનો અને વહીવટી સ્ટાફ માટે વાજબી વેતન, કૌશલ્ય નિર્માણ અને સુરક્ષિત વાતાવરણનું નેતૃત્વ."
                  }),
                  bullets: [
                    localize({ en: "Continuous Factory Upskilling", hi: "निरंतर कारखाना कौशल विकास", gu: "કારખાના સ્તરે કૌશલ્ય વિકાસ" }),
                    localize({ en: "Inclusive Equal-Opportunity Policy", hi: "समावेशी समान अवसर नीति", gu: "સમાન તકની નીતિ" }),
                    localize({ en: "Workplace Safety Accolades", hi: "कार्यस्थल सुरक्षा मानक", gu: "કાર્યસ્થળ સુરક્ષા ધોરણો" })
                  ],
                  color: "border-l-3 border-emerald-500"
                },
                {
                  title: localize({ en: "Operational Ethics & Governance Committee", hi: "परिचालन नैतिकता एवं शासन समिति", gu: "સંચાલન નૈતિકતા અને ગવર્નન્સ સમિતિ" }),
                  desc: localize({
                    en: "Upholding high compliance benchmarks across all national cooperative bids, corporate joint-ventures, and state distribution protocols.",
                    hi: "सभी राष्ट्रीय सहकारी बोलियों, कॉर्पोरेट संयुक्त उद्यमों और राज्य वितरण प्रोटोकॉल में उच्च अनुपालन मानकों को बनाए रखना।",
                    gu: "તમામ રાષ્ટ્રીય સહકારી ટેન્ડરો અને રાજ્ય વિતરણમાં ઉચ્ચ પાલન ધોરણો જાળવી રાખવા."
                  }),
                  bullets: [
                    localize({ en: "Conflict Prevention Shield", hi: "हित-टकराव रोकथाम तंत्र", gu: "વિવાદ નિવારણ સુરક્ષા" }),
                    localize({ en: "Anti-corruption Commerce Code", hi: "भ्रष्टाचार-विरोधी व्यापार संहिता", gu: "ભ્રષ્ટાચાર-વિરોધી વ્યાપાર સંહિતા" }),
                    localize({ en: "Stakeholder Value Protection", hi: "हितधारक मूल्य संरक्षण", gu: "હિતધારકોના મૂલ્યનું રક્ષણ" })
                  ],
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
                {localize({
                  en: "\"Our legacy has been built upon financial integrity and premium agricultural quality. As we expand across India, our board ensures that every grain processed carries this promise.\"",
                  hi: "\"हमारी विरासत वित्तीय सत्यनिष्ठा और प्रीमियम कृषि गुणवत्ता पर बनी है। जैसे-जैसे हम पूरे भारत में विस्तार कर रहे हैं, हमारा बोर्ड यह सुनिश्चित करता है कि प्रसंस्कृत प्रत्येक दाना इस वादे को निभाए।\"",
                  gu: "\"અમારો વારસો નાણાકીય અખંડિતતા અને પ્રીમિયમ ગુણવત્તા પર બનેલો છે. દેશભરમાં વિસ્તરણ સાથે અમારું બોર્ડ સુનિશ્ચિત કરે છે કે દરેક દાણામાં આ વચન જળવાઈ રહે.\""
                })}
              </p>
              <div className="w-12 h-px bg-[#f4d068]/40 mx-auto" />
              <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-300 font-bold">
                {localize({
                  en: "The Board of Directors, Punitdhan Pulses Limited",
                  hi: "निदेशक मंडल, पुनीतधन पल्सेस लिमिटेड",
                  gu: "બોર્ડ ઓફ ડિરેક્ટર્સ, પુનીતધન પલ્સ લિમિટેડ"
                })}
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
                <div className="relative col-span-5 aspect-[4/3] md:aspect-auto md:h-full min-h-[280px] md:min-h-[550px] bg-white overflow-hidden flex flex-col justify-end">
                  {selectedLeaderId === "prakashchand" || selectedLeaderId === "punit" ? (
                    <img
                      src={LEADER_IMAGES[selectedLeaderId]}
                      alt={selectedLeaderId}
                      className="absolute inset-0 w-full h-full object-contain object-top"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0c2a1c] to-[#04100a] text-white/[0.04] text-9xl font-serif font-black select-none uppercase">
                      {selectedLeaderId === "dhanashree" ? "DB" : "CB"}
                    </div>
                  )}
                  
                  {/* Subtle bottom shadow overlay to keep typography readable */}
                  <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10" />

                  {/* Highlight corner brackets */}
                  <div className="absolute top-6 left-6 w-5 h-5 border-t-2 border-l-2 border-zinc-300/60 z-20" />
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
                            {selectedLeaderId === "prakashchand" || selectedLeaderId === "punit" || selectedLeaderId === "dhanashree" 
                              ? localize({ en: "CA (Chartered Accountant)", hi: "सीए (चार्टर्ड अकाउंटेंट)", gu: "સીએ (ચાર્ટર્ડ એકાઉન્ટન્ટ)" })
                              : localize({ en: "Governance Expert", hi: "शासन एवं प्रबंधन विशेषज्ञ", gu: "ગવર્નન્સ નિષ્ણાત" })}
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
              {localize({ en: "Services", hi: "सेवाएं", gu: "સેવાઓ" })}
            </h1>
            <p className="text-gray-300 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              {localize({
                en: "Sovereign supply chain logistics, state-regulated welfare distribution, and military-grade procurement networks across India.",
                hi: "पूरे भारत में संप्रभु आपूर्ति श्रृंखला लॉजिस्टिक्स, राज्य-विनियमित कल्याणकारी वितरण और सैन्य-स्तरीय खरीद नेटवर्क।",
                gu: "સમગ્ર ભારતમાં સપ્લાય ચેઇન લોજિસ્ટિક્સ, સરકારી કલ્યાણકારી વિતરણ અને ઉચ્ચ સ્તરીય ખરીદી નેટવર્ક."
              })}
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
              <h3 className="text-lg font-serif font-bold text-zinc-900">
                {localize({ en: "National Welfare & Public Sector Operations", hi: "राष्ट्रीय कल्याणकारी और सार्वजनिक क्षेत्र संचालन", gu: "રાષ્ટ્રીય કલ્યાણ અને જાહેર ક્ષેત્રની કામગીરી" })}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {localize({
                  en: "Punitdhan Pulses Limited is engineered to fulfill high-volume, highly complex institutional procurement contracts for public sector undertakings and national welfare frameworks. Our custom logistics network is built to handle strict delivery timelines, rigorous quality audits, and massive distribution scopes.",
                  hi: "पुनीतधन पल्सेस लिमिटेड को सार्वजनिक क्षेत्र के उपक्रमों और राष्ट्रीय कल्याणकारी योजनाओं के लिए उच्च मात्रा, जटिल संस्थागत खरीद अनुबंधों को पूरा करने के लिए तैयार किया गया है। हमारा लॉजिस्टिक्स नेटवर्क सख्त डिलीवरी समय सीमा, कड़े गुणवत्ता ऑडिट और बड़े पैमाने पर वितरण संभालने के लिए बनाया गया है।",
                  gu: "પુનીતધન પલ્સ લિમિટેડ જાહેર ક્ષેત્રના ઉપક્રમો અને સરકારી યોજનાઓ માટે મોટા જથ્થાના સંસ્થાકીય કરારો પૂરા કરવા સક્ષમ છે. અમારું નેટવર્ક સમયસર ડિલિવરી અને સખત ઓડિટ સંભાળવા સજ્જ છે."
                })}
              </p>
            </div>
          </div>

          {/* Redesigned Welfare Cards Grid */}
          <div className="space-y-6">
            <div className="text-center md:text-left">
              <span className="text-[10px] font-mono text-brand-green-mid font-bold uppercase tracking-wider block mb-1">
                {localize({ en: "Welfare Initiatives", hi: "कल्याणकारी पहल", gu: "કલ્યાણકારી પહેલ" })}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900 tracking-tight">
                {localize({ en: "Government Welfare Sourcing Schemes", hi: "सरकारी कल्याणकारी सोर्सिंग योजनाएं", gu: "સરકારી કલ્યાણકારી સોર્સિંગ યોજનાઓ" })}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: localize({ en: "The Mid-Day Meal Programme", hi: "मध्याह्न भोजन कार्यक्रम (Mid-Day Meal)", gu: "મધ્યાહ્ન ભોજન યોજના" }),
                  desc: localize({
                    en: "Supplying nutrient-verified, high-purity pulses to support national youth health programs across thousands of primary education institutions.",
                    hi: "हजारों प्राथमिक शिक्षा संस्थानों में राष्ट्रीय युवा स्वास्थ्य कार्यक्रमों का समर्थन करने के लिए पोषक तत्वों से भरपूर, उच्च शुद्धता वाली दालों की आपूर्ति।",
                    gu: "હજારો શાળાઓમાં બાળકોના આરોગ્ય અને પોષણને ટેકો આપવા ઉચ્ચ શુદ્ધતાવાળી કઠોળ પૂરી પાડવી."
                  }),
                  points: [
                    localize({ en: "Nutrient-verified whole commodities", hi: "पोषक तत्वों से भरपूर साबुत उत्पाद", gu: "પૌષ્ટિક અનાજ" }),
                    localize({ en: "Zero chemical polishing", hi: "शून्य रासायनिक पॉलिश", gu: "ઝીરો કેમિકલ પોલિશિંગ" }),
                    localize({ en: "Mass primary education support", hi: "व्यापक प्राथमिक शिक्षा समर्थन", gu: "શિક્ષણ સહાય સપ્લાય" })
                  ]
                },
                {
                  title: localize({ en: "Public Distribution System (PDS) & PMGKAY", hi: "सार्वजनिक वितरण प्रणाली (PDS) और PMGKAY", gu: "જાહેર વિતરણ વ્યવસ્થા (PDS) અને PMGKAY" }),
                  desc: localize({
                    en: "Driving country-wide food security initiatives by routing uniform-grade commodities to vulnerable consumer cross-sections.",
                    hi: "जरूरतमंद उपभोक्ता वर्गों को एकसमान-ग्रेड उत्पाद पहुंचाकर देशव्यापी खाद्य सुरक्षा पहलों को संचालित करना।",
                    gu: "જરૂરિયાતમંદ પરિવારો સુધી ઉચ્ચ ગુણવત્તાવાળા કઠોળ પહોંચાડી દેશવ્યાપી અન્ન સુરક્ષા સુનિશ્ચિત કરવી."
                  }),
                  points: [
                    localize({ en: "Uniform high-purity pulses", hi: "एकसमान उच्च-शुद्धता वाली दालें", gu: "એકસમાન શુદ્ધ કઠોળ" }),
                    localize({ en: "PDS-grade compliant packaging", hi: "PDS-ग्रेड अनुरूप पैकेजिंग", gu: "PDS-ગ્રેડ પેકેજિંગ" }),
                    localize({ en: "Welfare safety net logistics", hi: "कल्याणकारी सुरक्षा जाल लॉजिस्टिक्स", gu: "સુરક્ષિત લોજિસ્ટિક્સ" })
                  ]
                },
                {
                  title: localize({ en: "Integrated Child Development Services (ICDS Scheme)", hi: "एकीकृत बाल विकास सेवाएं (ICDS योजना)", gu: "સંકલિત બાળ વિકાસ સેવાઓ (ICDS)" }),
                  desc: localize({
                    en: "Providing highly specific agricultural outputs tailored to fulfill rigorous child and maternal dietary mandates.",
                    hi: "सख्त बाल और मातृ आहार संबंधी आवश्यकताओं को पूरा करने के लिए तैयार किए गए विशिष्ट कृषि उत्पाद प्रदान करना।",
                    gu: "બાળકો અને માતાઓના આહારના ધોરણો પૂરા કરવા માટે વિશેષ કૃષિ ઉત્પાદનો પૂરા પાડવા."
                  }),
                  points: [
                    localize({ en: "Custom dietary specifications", hi: "कस्टम आहार विनिर्देश", gu: "વિશેષ આહાર વિગતો" }),
                    localize({ en: "Vitamins & mineral enrichment", hi: "विटामिन और खनिज युक्त", gu: "વિટામિન્સ અને મિનરલથી ભરપૂર" }),
                    localize({ en: "Targeted maternal-nutrition support", hi: "लक्षित मातृ-पोषण सहायता", gu: "માતૃ-પોષણ સહાય" })
                  ]
                },
                {
                  title: localize({ en: "Bharat Dal Yojana", hi: "भारत दाल योजना", gu: "ભારત દાળ યોજના" }),
                  desc: localize({
                    en: "Serving as a primary partner in the government's centralized market-stabilization and consumer-relief commodity distribution frameworks.",
                    hi: "सरकार के केंद्रीकृत बाजार-स्थिरीकरण और उपभोक्ता-राहत उत्पाद वितरण ढांचे में प्राथमिक भागीदार के रूप में सेवा करना।",
                    gu: "સરકારના બજાર સ્થિરીકરણ અને ગ્રાહક રાહત વિતરણમાં મુખ્ય ભાગીદાર તરીકે સેવા આપવી."
                  }),
                  points: [
                    localize({ en: "National brand supply partner", hi: "राष्ट्रीय ब्रांड आपूर्ति भागीदार", gu: "રાષ્ટ્રીય બ્રાન્ડ સપ્લાય પાર્ટનર" }),
                    localize({ en: "Market-stabilization assistance", hi: "बाजार-स्थिरीकरण सहायता", gu: "બજાર સ્થિરતા સહાય" }),
                    localize({ en: "Government-capped pricing programs", hi: "सरकारी निर्धारित मूल्य कार्यक्रम", gu: "સરકારી ભાવ યોજનાઓ" })
                  ]
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
                  {localize({ en: "Ministry of Defense Procurement", hi: "रक्षा मंत्रालय खरीद आपूर्ति", gu: "સંરક્ષણ મંત્રાલય ખરીદ પુરવઠો" })}
                </h3>
              </div>
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                {localize({
                  en: "Our long-standing association with the Indian Department of Defense demands a zero-error logistical protocol. Punitdhan Pulses Limited ensures consistent, highly secure, and on-time delivery of premium-grade food supplies under military-grade hygiene, storage, and nutritional testing parameters.",
                  hi: "भारतीय रक्षा विभाग के साथ हमारा दीर्घकालिक जुड़ाव शून्य-त्रुटि लॉजिस्टिक प्रोटोकॉल की मांग करता है। पुनीतधन पल्सेस लिमिटेड सैन्य-ग्रेड स्वच्छता, भंडारण और पोषण परीक्षण मापदंडों के तहत प्रीमियम-ग्रेड खाद्य आपूर्ति की सुसंगत, अत्यधिक सुरक्षित और समय पर डिलीवरी सुनिश्चित करता है।",
                  gu: "ભારતીય સંરક્ષણ વિભાગ સાથે અમારું જોડાણ સંપૂર્ણ ક્ષતિરહિત લોજિસ્ટિક્સની માંગ કરે છે. પુનીતધન પલ્સ લિમિટેડ મિલિટરી ગ્રેડ સ્વચ્છતા અને સુરક્ષા હેઠળ પ્રીમિયમ ખાદ્ય પુરવઠો પહોંચાડે છે."
                })}
              </p>
            </div>
          </div>

          {/* B2B Sourcing & Logistics Competency */}
          <div className="space-y-6">
            <div className="text-center md:text-left">
              <span className="text-[10px] font-mono text-brand-green-mid font-bold uppercase tracking-wider block mb-1">
                {localize({ en: "Logistical Competence", hi: "लॉजिस्टिक क्षमता", gu: "લોજિસ્ટિક ક્ષમતા" })}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900 tracking-tight">
                {localize({ en: "B2B Sourcing & Logistics Infrastructure", hi: "B2B सोर्सिंग और लॉजिस्टिक्स बुनियादी ढांचा", gu: "B2B સોર્સિંગ અને લોજિસ્ટિક્સ ઇન્ફ્રાસ્ટ્રક્ચર" })}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200/50 border-l-4 border-l-brand-green-mid shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 space-y-3">
                <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-widest block">
                  {localize({ en: "Allied Sectors", hi: "संबद्ध क्षेत्र", gu: "સંબંધિત ક્ષેત્રો" })}
                </span>
                <h4 className="font-serif font-bold text-zinc-900 text-base sm:text-lg">
                  {localize({ en: "Bulk Sourcing Competency", hi: "थोक खरीद क्षमता", gu: "બલ્ક સોર્સિંગ ક્ષમતા" })}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-650 leading-relaxed">
                  {localize({
                    en: "Timely, state-regulated procurement networks covering fine Food Grains, Pulses, Tea, and Spices. We work in sync with public mandis to acquire raw assets quickly.",
                    hi: "उत्कृष्ट खाद्यान्न, दालें, चाय और मसालों को कवर करने वाला समय पर, राज्य-विनियमित खरीद नेटवर्क। हम कच्चे उत्पादों को तेजी से प्राप्त करने के लिए सरकारी मंडियों के साथ तालमेल में काम करते हैं।",
                    gu: "અનાજ, કઠોળ, ચા અને મસાલાઓનું સમયસર, સરકારી ધોરણો અનુસાર ખરીદી નેટવર્ક. મંડીઓ સાથે સંકલન સાધી ઝડપી ખરીદી કરીએ છીએ."
                  })}
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200/50 border-l-4 border-l-[#f4d068] shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 space-y-3">
                <span className="text-[10px] font-mono text-amber-600 font-bold uppercase tracking-widest block">
                  {localize({ en: "Transit Reach", hi: "परिवहन पहुंच", gu: "પરિવહન ક્ષમતા" })}
                </span>
                <h4 className="font-serif font-bold text-zinc-900 text-base sm:text-lg">
                  {localize({ en: "High-Capacity Fleet Logistics", hi: "उच्च क्षमता वाला बेड़ा लॉजिस्टिक्स", gu: "ઉચ્ચ ક્ષમતા ફ્લીટ લોજિસ્ટિક્સ" })}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-650 leading-relaxed">
                  {localize({
                    en: "Dispatching in excess of 2,000 lorries per year, backed by extensive multi-location warehousing assets that stabilize internal inventory and insulate against external market deficits.",
                    hi: "प्रति वर्ष 2,000 से अधिक ट्रकों का प्रेषण, व्यापक बहु-स्थान वेयरहाउसिंग परिसंपत्तियों द्वारा समर्थित जो आंतरिक सूची को स्थिर करती है और बाहरी बाजार की कमी से बचाती है।",
                    gu: "વાર્ષિક ૨,૦૦૦ થી વધુ ટ્રકોનું ડિસ્પેચ, જે મોટા વેરહાઉસિંગ નેટવર્ક દ્વારા સક્ષમ બને છે."
                  })}
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
        title: localize({ en: "Chana Dal & Chana Whole", hi: "चना दाल और साबुत चना", gu: "ચણા દાળ અને આખા ચણા" }),
        category: "pulses",
        categoryLabel: localize({ en: "Primary Pulses", hi: "प्राथमिक दालें", gu: "મુખ્ય કઠોળ" }),
        desc: localize({
          en: "Apex-grade Bengal Gram (Chana) sorted through advanced multi-tier optical systems. Delivers high density, dust-free whole grains, and clean split yellow dal.",
          hi: "अग्रणी गुणवत्ता वाला चना उन्नत मल्टी-टियर ऑप्टिकल सिस्टम से सॉर्ट किया गया। उच्च घनत्व, धूल-मुक्त साबुत अनाज और स्वच्छ चना दाल प्रदान करता है।",
          gu: "અદ્યતન મલ્ટી-ટાયર ઓપ્ટિકલ સિસ્ટમ્સ દ્વારા સૉર્ટ કરાયેલ ઉચ્ચ ગુણવત્તાવાળા ચણા. ધૂળ મુક્ત આખા દાણા અને શુદ્ધ પીળી દાળ પૂરી પાડે છે."
        }),
        image: "/products/chana-dal-whole.jpg",
        bullets: [
          localize({ en: "FSSAI Standard Compliant", hi: "FSSAI मानक के अनुरूप", gu: "FSSAI સ્ટાન્ડર્ડ અનુસાર" }),
          localize({ en: "De-hulled to custom specifications", hi: "कस्टम विनिर्देशों के अनुसार छिलका रहित", gu: "ગ્રાહકની જરૂરિયાત મુજબ ફોતરાં રહિત" }),
          localize({ en: "Zero artificial color or chemical polishing", hi: "शून्य कृत्रिम रंग या रासायनिक पॉलिशिंग", gu: "કોઈપણ કૃત્રિમ રંગ કે રાસાયણિક પોલિશ વગર" })
        ],
        specs: [
          { label: localize({ en: "Purity Grade", hi: "शुद्धता ग्रेड", gu: "શુદ્ધતા ગ્રેડ" }), val: localize({ en: "99.7% Min", hi: "99.7% न्यूनतम", gu: "૯૯.૭% ન્યૂનતમ" }), icon: <Layers className="w-4 h-4 text-emerald-700" /> },
          { label: localize({ en: "Moisture Ratio", hi: "नमी अनुपात", gu: "ભેજનું પ્રમાણ" }), val: localize({ en: "11.5% Max", hi: "11.5% अधिकतम", gu: "૧૧.૫% મહત્તમ" }), icon: <Droplet className="w-4 h-4 text-blue-600" /> },
          { label: localize({ en: "Foreign Matter", hi: "विदेशी पदार्थ", gu: "અન્ય કચરો" }), val: localize({ en: "< 0.1% Max", hi: "< 0.1% अधिकतम", gu: "< ૦.૧% મહત્તમ" }), icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> },
          { label: localize({ en: "Packaging Size", hi: "पैकेजिंग आकार", gu: "પેકેજિંગ સાઇઝ" }), val: localize({ en: "25kg / 50kg Bags", hi: "25 किग्रा / 50 किग्रा बोरी", gu: "૨૫ કિગ્રા / ૫૦ કિગ્રા બેગ" }), icon: <Briefcase className="w-4 h-4 text-amber-600" /> }
        ]
      },
      {
        id: "toor",
        title: localize({ en: "Premium Toor Dal (Pigeon Peas)", hi: "प्रीमियम तुअर दाल (अरहर)", gu: "પ્રીમિયમ તુવેર દાળ" }),
        category: "pulses",
        categoryLabel: localize({ en: "Primary Pulses", hi: "प्राथमिक दालें", gu: "મુખ્ય કઠોળ" }),
        desc: localize({
          en: "Our flagship Toor Dal is milled under low-friction dry friction parameters to protect structural protein cells, native yellow gloss, and wholesome taste.",
          hi: "हमारी प्रमुख तुअर दाल कम घर्षण वाली सूखी मिलिंग द्वारा तैयार की जाती है ताकि प्राकृतिक प्रोटीन, पीली चमक और पौष्टिक स्वाद सुरक्षित रहे।",
          gu: "અમારી ફ્લેગશિપ તુવેર દાળ પ્રોટીન સેલ્સ, કુદરતી પીળો રંગ અને સ્વાદ જાળવી રાખવા માટે લો-ફ્રિક્શન ડ્રાય પેરામીટર્સ હેઠળ તૈયાર કરવામાં આવે છે."
        }),
        image: "/products/toor-dal.jpg",
        bullets: [
          localize({ en: "High protein cell protection", hi: "उच्च प्रोटीन कोशिकाओं का संरक्षण", gu: "ઉચ્ચ પ્રોટીન સેલ સુરક્ષા" }),
          localize({ en: "Uniform cooking and boiling duration", hi: "समान पकाने और उबलने का समय", gu: "સમાન રસોઈ અને ઉકળવાનો સમય" }),
          localize({ en: "Processed in state-regulated plants", hi: "राज्य-विनियमित संयंत्रों में प्रसंस्कृत", gu: "સરકાર માન્ય પ્લાન્ટ્સમાં પ્રોસેસ થયેલ" })
        ],
        specs: [
          { label: localize({ en: "Purity Grade", hi: "शुद्धता ग्रेड", gu: "શુદ્ધતા ગ્રેડ" }), val: localize({ en: "99.5% Min", hi: "99.5% न्यूनतम", gu: "૯૯.૫% ન્યૂનતમ" }), icon: <Layers className="w-4 h-4 text-emerald-700" /> },
          { label: localize({ en: "Moisture Ratio", hi: "नमी अनुपात", gu: "ભેજનું પ્રમાણ" }), val: localize({ en: "12.0% Max", hi: "12.0% अधिकतम", gu: "૧૨.૦% મહત્તમ" }), icon: <Droplet className="w-4 h-4 text-blue-600" /> },
          { label: localize({ en: "Foreign Matter", hi: "विदेशी पदार्थ", gu: "અન્ય કચરો" }), val: localize({ en: "< 0.2% Max", hi: "< 0.2% अधिकतम", gu: "< ૦.૨% મહત્તમ" }), icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> },
          { label: localize({ en: "Packaging Size", hi: "पैकेजिंग आकार", gu: "પેકેજિંગ સાઇઝ" }), val: localize({ en: "50kg Jute / PP", hi: "50 किग्रा जूट / पीपी", gu: "૫૦ કિગ્રા શણ / પીપી" }), icon: <Briefcase className="w-4 h-4 text-amber-600" /> }
        ]
      },
      {
        id: "urad",
        title: localize({ en: "Urad Dal & Urad Whole (Black Gram)", hi: "उड़द दाल और साबुत उड़द", gu: "અડદ દાળ અને આખા અડદ" }),
        category: "pulses",
        categoryLabel: localize({ en: "Primary Pulses", hi: "प्राथमिक दालें", gu: "મુખ્ય કઠોળ" }),
        desc: localize({
          en: "Highly-conditioned Black Gram. Polished or unpolished varieties custom-matched for premium fermentation requirements in commercial batter formulation and mills.",
          hi: "उच्च-गुणवत्ता वाला उड़द। व्यावसायिक बैटर निर्माण और मिलों में प्रीमियम किण्वन आवश्यकताओं के लिए पॉलिश या अनपॉलिश किस्में।",
          gu: "શ્રેષ્ઠ અડદ. કમર્શિયલ બેટર અને મિલોમાં આથો લાવવા માટે યોગ્ય પોલિશ્ડ અથવા અનપોલિશ્ડ જાતો ઉપલબ્ધ."
        }),
        image: "/products/urad-dal-whole.jpg",
        bullets: [
          localize({ en: "Calibrated particle size profiles", hi: "सटीक कण आकार प्रोफाइल", gu: "ચોક્કસ કદનું માપન" }),
          localize({ en: "Superior dough volume and elasticity", hi: "बेहतर घोल मात्रा और लचीलापन", gu: "ઉત્કૃષ્ટ ખીરાનું પ્રમાણ અને મુલાયમતા" }),
          localize({ en: "Extensively de-stoned during cleaning", hi: "सफाई के दौरान कंकड़-पत्थर पूरी तरह हटाए गए", gu: "સફાઈ દરમિયાન કાંકરી સંપૂર્ણ મુક્ત" })
        ],
        specs: [
          { label: localize({ en: "Purity Grade", hi: "शुद्धता ग्रेड", gu: "શુદ્ધતા ગ્રેડ" }), val: localize({ en: "99.6% Min", hi: "99.6% न्यूनतम", gu: "૯૯.૬% ન્યૂનતમ" }), icon: <Layers className="w-4 h-4 text-emerald-700" /> },
          { label: localize({ en: "Moisture Ratio", hi: "नमी अनुपात", gu: "ભેજનું પ્રમાણ" }), val: localize({ en: "11.0% Max", hi: "11.0% अधिकतम", gu: "૧૧.૦% મહત્તમ" }), icon: <Droplet className="w-4 h-4 text-blue-600" /> },
          { label: localize({ en: "Foreign Matter", hi: "विदेशी पदार्थ", gu: "અન્ય કચરો" }), val: localize({ en: "< 0.2% Max", hi: "< 0.2% अधिकतम", gu: "< ૦.૨% મહત્તમ" }), icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> },
          { label: localize({ en: "Packaging Size", hi: "पैकेजिंग आकार", gu: "પેકેજિંગ સાઇઝ" }), val: localize({ en: "50kg Multi-layer", hi: "50 किग्रा मल्टी-लेयर", gu: "૫૦ કિગ્રા મલ્ટી-લેયર" }), icon: <Briefcase className="w-4 h-4 text-amber-600" /> }
        ]
      },
      {
        id: "masoor",
        title: localize({ en: "Masoor Dal & Moong Dal", hi: "मसूर दाल और मूंग दाल", gu: "મસૂર દાળ અને મગ દાળ" }),
        category: "pulses",
        categoryLabel: localize({ en: "Primary Pulses", hi: "प्राथमिक दालें", gu: "મુખ્ય કઠોળ" }),
        desc: localize({
          en: "Pristine Split Red Lentils (Masoor) and Green Moong Dal processed under high-velocity dry polishing units to lock in natural mineral structures.",
          hi: "प्राकृतिक खनिज संरचना को बनाए रखने के लिए उच्च वेग वाली ड्राई पॉलिशिंग इकाइयों के तहत प्रसंस्कृत शुद्ध लाल मसूर और हरी मूंग दाल।",
          gu: "કુદરતી ખનિજ તત્વોને જાળવી રાખવા માટે હાઇ-વેલોસિટી ડ્રાય પોલિશિંગ યુનિટ્સ હેઠળ પ્રોસેસ કરેલ લાલ મસૂર અને લીલા મગ દાળ."
        }),
        image: "/products/masoor-moong-dal.jpg",
        bullets: [
          localize({ en: "Bright uniform size seed distribution", hi: "चमकदार समान आकार के दानों का वितरण", gu: "તેજસ્વી સમાન કદના દાણા" }),
          localize({ en: "Zero chemical residues or toxic glazing", hi: "शून्य रासायनिक अवशेष या हानिकारक पॉलिश", gu: "કોઈપણ રાસાયણિક અવશેષ વગર" }),
          localize({ en: "Exceptional protein yields per metric ton", hi: "प्रति मीट्रिक टन असाधारण प्रोटीन पैदावार", gu: "પ્રતિ મેટ્રિક ટન શ્રેષ્ઠ પ્રોટીન મૂલ્ય" })
        ],
        specs: [
          { label: localize({ en: "Purity Grade", hi: "शुद्धता ग्रेड", gu: "શુદ્ધતા ગ્રેડ" }), val: localize({ en: "99.8% Min", hi: "99.8% न्यूनतम", gu: "૯૯.૮% ન્યૂનતમ" }), icon: <Layers className="w-4 h-4 text-emerald-700" /> },
          { label: localize({ en: "Moisture Ratio", hi: "नमी अनुपात", gu: "ભેજનું પ્રમાણ" }), val: localize({ en: "11.5% Max", hi: "11.5% अधिकतम", gu: "૧૧.૫% મહત્તમ" }), icon: <Droplet className="w-4 h-4 text-blue-600" /> },
          { label: localize({ en: "Foreign Matter", hi: "विदेशी पदार्थ", gu: "અન્ય કચરો" }), val: localize({ en: "< 0.1% Max", hi: "< 0.1% अधिकतम", gu: "< ૦.૧% મહત્તમ" }), icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> },
          { label: localize({ en: "Packaging Size", hi: "पैकेजिंग आकार", gu: "પેકેજિંગ સાઇઝ" }), val: localize({ en: "25kg / 50kg Bags", hi: "25 किग्रा / 50 किग्रा बोरी", gu: "૨૫ કિગ્રા / ૫૦ કિગ્રા બેગ" }), icon: <Briefcase className="w-4 h-4 text-amber-600" /> }
        ]
      },
      {
        id: "grains",
        title: localize({ en: "Grains & Basmati Rice", hi: "अनाज और बासमती चावल", gu: "અનાજ અને બાસમતી ચોખા" }),
        category: "diversified",
        categoryLabel: localize({ en: "Diversified Sourcing", hi: "विविध सोर्सिंग", gu: "વિવિધ સોર્સિંગ" }),
        desc: localize({
          en: "Supreme long-grain aged Basmati and whole grains curated to satisfy dense institutional welfare mandates and high-volume state food programs.",
          hi: "संस्थागत कल्याणकारी योजनाओं और बड़े पैमाने के राज्य खाद्य कार्यक्रमों के लिए चयनित सर्वोत्तम लंबे दाने वाले पुराने बासमती और साबुत अनाज।",
          gu: "સંસ્થાકીય કલ્યાણકારી યોજનાઓ અને મોટા પાયાના સરકારી ખાદ્ય કાર્યક્રમો માટે પસંદ કરાયેલ લાંબા દાણાવાળા બાસમતી અને અનાજ."
        }),
        image: "/products/grains-basmati.jpg",
        bullets: [
          localize({ en: "Average length > 7.4mm post-cooking", hi: "पकाने के बाद औसत लंबाई > 7.4 मिमी", gu: "રાંધ્યા પછી સરેરાશ લંબાઈ > ૭.૪ મીમી" }),
          localize({ en: "Aged under climate-balanced warehouses", hi: "जलवायु-संतुलित गोदामों में संग्रहीत", gu: "નિયંત્રિત વાતાવરણવાળા વેરહાઉસમાં સંગ્રહિત" }),
          localize({ en: "Low broken percentage guarantees", hi: "टूट-फूट का न्यूनतम प्रतिशत गारंटीकृत", gu: "ઓછા તૂટેલા દાણાની ગેરંટી" })
        ],
        specs: [
          { label: localize({ en: "Purity Grade", hi: "शुद्धता ग्रेड", gu: "શુદ્ધતા ગ્રેડ" }), val: localize({ en: "99.0% Min", hi: "99.0% न्यूनतम", gu: "૯૯.૦% ન્યૂનતમ" }), icon: <Layers className="w-4 h-4 text-emerald-700" /> },
          { label: localize({ en: "Moisture Ratio", hi: "नमी अनुपात", gu: "ભેજનું પ્રમાણ" }), val: localize({ en: "12.5% Max", hi: "12.5% अधिकतम", gu: "૧૨.૫% મહત્તમ" }), icon: <Droplet className="w-4 h-4 text-blue-600" /> },
          { label: localize({ en: "Foreign Matter", hi: "विदेशी पदार्थ", gu: "અન્ય કચરો" }), val: localize({ en: "< 0.3% Max", hi: "< 0.3% अधिकतम", gu: "< ૦.૩% મહત્તમ" }), icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> },
          { label: localize({ en: "Packaging Size", hi: "पैकेजिंग आकार", gu: "પેકેજિંગ સાઇઝ" }), val: localize({ en: "20kg / 50kg Packs", hi: "20 किग्रा / 50 किग्रा पैक", gu: "૨૦ કિગ્રા / ૫૦ કિગ્રા પેક" }), icon: <Briefcase className="w-4 h-4 text-amber-600" /> }
        ]
      },
      {
        id: "oils",
        title: localize({ en: "FSSAI Grade Edible Oils", hi: "FSSAI ग्रेड खाद्य तेल", gu: "FSSAI ગ્રેડ ખાદ્ય તેલ" }),
        category: "diversified",
        categoryLabel: localize({ en: "Diversified Sourcing", hi: "विविध सोर्सिंग", gu: "વિવિધ સોર્સિંગ" }),
        desc: localize({
          en: "Refined and raw Soybean, Mustard, and Sunflower oils processed using mechanical multi-stage expellers to meet heavy institutional catering guidelines.",
          hi: "रिफाइंड और कच्चा सोयाबीन, सरसों और सूरजमुखी का तेल, जो बड़े पैमाने के संस्थागत खानपान दिशानिर्देशों को पूरा करने के लिए तैयार किया गया है।",
          gu: "સંસ્થાકીય કેટરિંગ માર્ગદર્શિકા મુજબ મલ્ટી-સ્ટેજ એક્સપેલર્સનો ઉપયોગ કરીને તૈયાર કરાયેલ શુદ્ધ સોયાબીન, સરસવ અને સૂર્યમુખી તેલ."
        }),
        image: "/products/edible-oils.jpg",
        bullets: [
          localize({ en: "FFA levels maintained under 0.1%", hi: "FFA स्तर 0.1% से नीचे बनाए रखा गया", gu: "FFA સ્તર ૦.૧% થી ઓછું" }),
          localize({ en: "Tested against moisture contamination", hi: "नमी संदूषण के विरुद्ध पूरी तरह परीक्षित", gu: "ભેજ પ્રદૂષણ સામે ચકાસાયેલ" }),
          localize({ en: "Enriched with standard Vitamin A & D", hi: "मानक विटामिन A और D से समृद्ध", gu: "વિટામિન A અને D થી ભરપૂર" })
        ],
        specs: [
          { label: localize({ en: "Purity Grade", hi: "शुद्धता ग्रेड", gu: "શુદ્ધતા ગ્રેડ" }), val: localize({ en: "100% Pure", hi: "100% शुद्ध", gu: "૧૦૦% શુદ્ધ" }), icon: <Layers className="w-4 h-4 text-emerald-700" /> },
          { label: localize({ en: "Moisture Ratio", hi: "नमी अनुपात", gu: "ભેજનું પ્રમાણ" }), val: localize({ en: "< 0.05% Max", hi: "< 0.05% अधिकतम", gu: "< ૦.૦૫% મહત્તમ" }), icon: <Droplet className="w-4 h-4 text-blue-600" /> },
          { label: localize({ en: "Foreign Matter", hi: "विदेशी पदार्थ", gu: "અન્ય કચરો" }), val: localize({ en: "Nil Detected", hi: "शून्य", gu: "શૂન્ય" }), icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> },
          { label: localize({ en: "Packaging Size", hi: "पैकेजिंग आकार", gu: "પેકેજિંગ સાઇઝ" }), val: localize({ en: "15L Tins / Bottles", hi: "15 ली टिन / बोतलें", gu: "૧૫ લીટર ટીન / બોટલ" }), icon: <Briefcase className="w-4 h-4 text-amber-600" /> }
        ]
      },
      {
        id: "spices",
        title: localize({ en: "Selected Tea & Ground Spices", hi: "चयनित चाय और पिसे मसाले", gu: "પસંદગીની ચા અને દળેલા મસાલા" }),
        category: "diversified",
        categoryLabel: localize({ en: "Diversified Sourcing", hi: "विविध सोर्सिंग", gu: "વિવિધ સોર્સિંગ" }),
        desc: localize({
          en: "Custom-blended regional tea commodities and grounded raw spices including Turmeric, Chili, and Coriander powder curated for bulk logistics.",
          hi: "थोक लॉजिस्टिक्स के लिए विशेष रूप से तैयार क्षेत्रीय चाय और पिसे हुए शुद्ध मसाले (हल्दी, मिर्च और धनिया पाउडर)।",
          gu: "જથ્થાબંધ લોજિસ્ટિક્સ માટે તૈયાર કરાયેલ ચા અને શુદ્ધ મસાલા (હળદર, મરચું અને ધાણાજીરું પાવડર)."
        }),
        image: "/products/spices-tea.jpg",
        bullets: [
          localize({ en: "Preserved high volatile oil content", hi: "प्राकृतिक सुगंधित तेल सामग्री संरक्षित", gu: "કુદરતી સુગંધ અને તેલ તત્વો જળવાયેલ" }),
          localize({ en: "Hygienically packaged to prevent dampness", hi: "सीलन रोकने के लिए स्वच्छ रूप से पैक किया गया", gu: "ભેજ ન લાગે તે રીતે હાઇજીનિક પેકિંગ" }),
          localize({ en: "Free from additives and adulterants", hi: "मिलावट और कृत्रिम रंगों से पूर्णतः मुक्त", gu: "કોઈપણ ભેળસેળ રહિત" })
        ],
        specs: [
          { label: localize({ en: "Purity Grade", hi: "शुद्धता ग्रेड", gu: "શુદ્ધતા ગ્રેડ" }), val: localize({ en: "99.0% Min", hi: "99.0% न्यूनतम", gu: "૯૯.૦% ન્યૂનતમ" }), icon: <Layers className="w-4 h-4 text-emerald-700" /> },
          { label: localize({ en: "Moisture Ratio", hi: "नमी अनुपात", gu: "ભેજનું પ્રમાણ" }), val: localize({ en: "9.0% Max", hi: "9.0% अधिकतम", gu: "૯.૦% મહત્તમ" }), icon: <Droplet className="w-4 h-4 text-blue-600" /> },
          { label: localize({ en: "Foreign Matter", hi: "विदेशी पदार्थ", gu: "અન્ય કચरो", }), val: localize({ en: "< 0.5% Max", hi: "< 0.5% अधिकतम", gu: "< ૦.૫% મહત્તમ" }), icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> },
          { label: localize({ en: "Packaging Size", hi: "पैकेजिंग आकार", gu: "પેકેજિંગ સાઇઝ" }), val: localize({ en: "Bulk Jute / Boxes", hi: "थोक जूट बोरी / बॉक्स", gu: "જથ્થાબંધ શણ બોરી / બોક્સ" }), icon: <Briefcase className="w-4 h-4 text-amber-600" /> }
        ]
      }
    ];

    const filteredProducts = REDESIGNED_PRODUCTS;

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
              {localize({
                en: "Product Profiles & Technical Specs",
                hi: "उत्पाद प्रोफाइल और तकनीकी विनिर्देश",
                gu: "પ્રોડક્ટ પ્રોફાઇલ્સ અને ટેકનિકલ વિગતો"
              })}
            </h1>
            <p className="text-gray-300 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              {localize({
                en: "Precision-sorted agricultural assets supplied to military, welfare, and bulk commercial sectors under strict FSSAI parameters.",
                hi: "सख्त FSSAI मापदंडों के तहत सैन्य, कल्याणकारी और थोक वाणिज्यिक क्षेत्रों को आपूर्ति की जाने वाली उच्च गुणवत्ता वाली कृषि जिंसें।",
                gu: "કડક FSSAI માપદંડો હેઠળ સૈન્ય, સરકારી કલ્યાણકારી અને બલ્ક કોમર્શિયલ ક્ષેત્રોમાં સપ્લાય થતી કૃષિ પ્રોડક્ટ્સ."
              })}
            </p>
          </div>
        </div>

        <div id="products-catalog-section" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12 font-sans scroll-mt-24">
          
          {/* Catalog Standard Box */}
          <div className="bg-white rounded-3xl border border-zinc-200/60 border-l-4 border-l-brand-green-mid p-6 sm:p-8 md:p-10 shadow-[0_15px_40px_rgba(15,46,30,0.015)] flex flex-col md:flex-row gap-6 items-center hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-brand-green-dark shrink-0">
              <Award className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-serif font-bold text-zinc-900">
                {localize({
                  en: "The Sourcing & Processing Protocol",
                  hi: "सोर्सिंग और प्रसंस्करण प्रोटोकॉल",
                  gu: "સોર્સિંગ અને પ્રોસેસિંગ પ્રોટોકોલ"
                })}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {localize({
                  en: "Every shipment processed under Punitdhan Pulses Limited undergoes strict mechanical sorting, color sortex purification, de-stoning, and micro-moisture calibrations ensuring total conformance to FSSAI standards and ISO 9001:2015 mandates.",
                  hi: "पुनीतधन पल्सेस लिमिटेड के तहत प्रसंस्कृत प्रत्येक खेप यांत्रिक छंटाई, कलर सॉर्टेक्स शुद्धिकरण, डी-स्टोनिंग और सूक्ष्म-नमी अंशांकन से गुजरती है, जो FSSAI मानकों और ISO 9001:2015 आदेशों का पूर्ण अनुपालन सुनिश्चित करती है।",
                  gu: "પુનીતધન પલ્સ લિમિટેડ હેઠળ પ્રોસેસ થતો દરેક જથ્થો કડક મિકેનિકલ સોર્ટિંગ, કલર સોર્ટેક્સ પ્યોરિફિકેશન, ડી-સ્ટોનિંગ અને મોઇશ્ચર કેલિબ્રેશનમાંથી પસાર થાય છે, જે FSSAI ધોરણો અને ISO 9001:2015 ની સંપૂર્ણ ખાતરી આપે છે."
                })}
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
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/products/chana-dal-whole.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
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
                            const section = document.getElementById("products-catalog-section");
                            if (section) {
                              section.scrollIntoView({ behavior: "smooth", block: "start" });
                            }
                          }}
                          className="flex-1 text-center bg-zinc-100 hover:bg-zinc-200/70 text-zinc-700 transition-all py-2 rounded-xl text-xs font-bold cursor-pointer"
                        >
                          {localize({ en: "Know More", hi: "अधिक जानें", gu: "વધુ જાણો" })}
                        </button>
                        <button
                          onClick={(e) => handleScrollToContact(e, product.title)}
                          className="flex-1 text-center bg-[#f4d068] hover:bg-brand-green-dark hover:text-white text-zinc-900 transition-all py-2 rounded-xl text-xs font-bold cursor-pointer"
                        >
                          {localize({ en: "Inquire", hi: "पूछताछ करें", gu: "પૂછપરછ કરો" })}
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
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer" 
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/products/chana-dal-whole.jpg';
                          }}
                        />
                      </div>
                      <div>
                        <span className="text-[8px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded uppercase tracking-wider">
                          {product.categoryLabel || product.category}
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
                        {localize({ en: "Know More", hi: "अधिक जानें", gu: "વધુ જાણો" })}
                      </button>
                      <button
                        onClick={(e) => handleScrollToContact(e, product.title)}
                        className="flex-1 lg:flex-none bg-[#f4d068] hover:bg-brand-green-dark hover:text-white text-zinc-950 font-sans font-extrabold text-xs px-5 py-2 rounded-xl transition-all whitespace-nowrap text-center shadow-xs cursor-pointer"
                      >
                        {localize({ en: "Inquire", hi: "पूछताछ करें", gu: "પૂછપરછ કરો" })}
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
                <div className="space-y-6">
                  {/* Back to All Products Navigation Button */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        setProductViewMode("card");
                        const section = document.getElementById("products-catalog-section");
                        if (section) {
                          section.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }}
                      className="inline-flex items-center gap-2 bg-white hover:bg-zinc-100 text-brand-green-dark border border-zinc-200/80 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer group"
                    >
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                      <span>{localize({ en: "Back to All Products", hi: "सभी उत्पादों पर वापस जाएं", gu: "બધી પ્રોડક્ટ્સ પર પાછા જાઓ" })}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column - Master Selection Panel */}
                  <div className="lg:col-span-4 space-y-2.5">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 uppercase block pl-1">
                      {localize({ en: "Select Commodity", hi: "जिंस का चयन करें", gu: "પ્રોડક્ટ પસંદ કરો" })} ({filteredProducts.length})
                    </span>
                    <div className="flex flex-col gap-2">
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
                                <img 
                                  src={p.image} 
                                  alt={p.title} 
                                  className="w-full h-full object-cover" 
                                  referrerPolicy="no-referrer" 
                                  onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src = '/products/chana-dal-whole.jpg';
                                  }}
                                />
                              </div>
                              <div className="space-y-0.5">
                                <p className={`text-xs font-serif font-black ${isSelected ? "text-brand-green-dark" : "text-zinc-800"}`}>
                                  {p.title}
                                </p>
                                <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
                                  {p.categoryLabel || p.category}
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
                        <img 
                          src={activeProduct.image} 
                          alt={activeProduct.title} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer" 
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/products/chana-dal-whole.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 flex flex-wrap justify-between items-end gap-4">
                          <div className="text-white">
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
                            {localize({ en: "Commodity Profile", hi: "कमोडिटी प्रोफाइल", gu: "પ્રોડક્ટ પ્રોફાઇલ" })}
                          </span>
                          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                            {activeProduct.desc}
                          </p>
                        </div>

                        {/* Bullet list of features & compliance guidelines */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-100">
                          <div className="space-y-3">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                              {localize({ en: "Milling Mandates", hi: "मिलिंग मानक", gu: "મિલિંગ ધોરણો" })}
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
                                {localize({ en: "Verified Sourcing", hi: "सत्यापित सोर्सिंग", gu: "ચકાસાયેલ સોર્સિંગ" })}
                              </h4>
                              <p className="text-[11px] text-zinc-600 leading-relaxed font-sans font-semibold">
                                {localize({
                                  en: "Certified safe under standard FSSAI parameters. Batch-verified against foreign matter, internal contamination, and moisture degradation. Sourced direct from cooperative grower mandis.",
                                  hi: "मानक FSSAI मापदंडों के तहत प्रमाणित सुरक्षित। बाहरी पदार्थों, आंतरिक संदूषण और नमी गिरावट के खिलाफ बैच-सत्यापित। सहकारी उत्पादक मंडियों से सीधे खरीदा गया।",
                                  gu: "પ્રમાણભૂત FSSAI માપદંડો હેઠળ પ્રમાણિત. કચરો, આંતરિક ખામી અને ભેજ સામે બેચ-ચકાસાયેલ. સહકારી ખેડૂત મંડીઓમાંથી સીધી ખરીદી."
                                })}
                              </p>
                            </div>
                            <button
                              onClick={(e) => handleScrollToContact(e, activeProduct.title)}
                              className="w-full text-center bg-brand-green-dark text-white hover:bg-brand-green-mid hover:text-white transition-all py-2.5 px-4 rounded-xl text-xs font-bold font-sans cursor-pointer"
                            >
                              {localize({
                                en: `Inquire About ${activeProduct.title}`,
                                hi: `${activeProduct.title} के बारे में पूछताछ करें`,
                                gu: `${activeProduct.title} વિશે પૂછપરછ કરો`
                              })}
                            </button>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  </div>
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
                {localize({
                  en: "Custom Technical Milling & Packing Mandates",
                  hi: "कस्टम तकनीकी मिलिंग और पैकिंग आवश्यकताएं",
                  gu: "કસ્ટમ ટેકનિકલ મિલિંગ અને પેકિંગ વ્યવસ્થા"
                })}
              </h3>
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                {localize({
                  en: "Do you require specialized packing (e.g., 20kg consumer bags, bulk jute sacks) or customized Sortex specifications to satisfy regional tenders or state welfare contracts? Our board facilitates full tailored milling and shipping protocols.",
                  hi: "क्या आपको क्षेत्रीय निविदाओं या राज्य कल्याण अनुबंधों को पूरा करने के लिए विशेष पैकिंग (जैसे 20 किग्रा बैग, जूट की बोरियां) या अनुकूलित सॉर्टेक्स विनिर्देशों की आवश्यकता है? हमारा बोर्ड पूर्ण अनुकूलित मिलिंग और शिपिंग प्रोटोकॉल की सुविधा प्रदान करता है।",
                  gu: "શું તમને સરકારી ટેન્ડર કે વિશેષ કોન્ટ્રાક્ટ માટે કસ્ટમાઇઝ્ડ પેકિંગ અથવા સોર્ટેક્સ સ્પષ્ટીકરણોની જરૂર છે? અમારું બોર્ડ સંપૂર્ણ અનુકૂળ મિલિંગ અને શિપિંગ પ્રોટોકોલ પ્રદાન કરે છે."
                })}
              </p>
              <div className="pt-2">
                <a
                  href="#connect"
                  onClick={handleScrollToContact}
                  className="inline-flex items-center gap-2 text-xs font-mono font-black uppercase tracking-widest text-zinc-900 bg-[#f4d068] hover:bg-white px-6 py-3 rounded-full shadow-lg transition-all"
                >
                  <span>{localize({ en: "Submit Sourcing Tender", hi: "सोर्सिंग टेंडर जमा करें", gu: "સોર્સિંગ ટેન્ડર સબમિટ કરો" })}</span>
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
        alert(localize({
          en: "Please upload your resume (PDF/Word document) to submit your application.",
          hi: "कृपया अपना आवेदन जमा करने के लिए अपना बायोडाटा (PDF/Word) अपलोड करें।",
          gu: "કૃપા કરીને તમારી અરજી સબમિટ કરવા માટે તમારું રિઝ્યુમ (PDF/Word) અપલોડ કરો."
        }));
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
              {localize({ en: "Careers", hi: "करियर", gu: "કારકિર્દી" })}
            </h1>
            <p className="text-gray-300 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              {localize({
                en: "Cultivating Operational Leaders to Nourish the Nation",
                hi: "राष्ट्र को पोषण देने के लिए परिचालन नेतृत्व का निर्माण",
                gu: "રાષ્ટ્રને પોષણ આપવા ઓપરેશનલ લીડર્સનું નિર્માણ"
              })}
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-12 font-sans">
          {/* Introductory Stewardship Card */}
          <div className="bg-white rounded-3xl border border-zinc-200/60 border-l-4 border-l-brand-green-mid p-8 md:p-12 shadow-[0_20px_50px_rgba(15,46,30,0.02)] space-y-6 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3 text-brand-green-dark">
              <GraduationCap className="w-6 h-6 stroke-[2.5]" />
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
                {localize({ en: "Cultivating Operational Leaders", hi: "परिचालन नेतृत्व का विकास", gu: "ઓપરેશનલ લીડર્સનો વિકાસ" })}
              </h2>
            </div>
            <p className="text-zinc-650 leading-relaxed text-sm sm:text-base">
              {localize({
                en: "At Punitdhan Pulses Limited, our continuous corporate growth is powered entirely by the technical skill, operational focus, and professional drive of our workforce. We cultivate an inclusive, highly professional workplace environment that rewards creative thinking, operational ownership, and a shared dedication to national nutrition goals.",
                hi: "पुनीतधन पल्सेस लिमिटेड में, हमारा निरंतर कॉर्पोरेट विकास हमारे कार्यबल के तकनीकी कौशल, परिचालन फोकस और व्यावसायिक समर्पण से संचालित होता है। हम एक समावेशी, अत्यधिक पेशेवर कार्य वातावरण प्रदान करते हैं जो रचनात्मक सोच, स्वामित्व और राष्ट्रीय पोषण लक्ष्यों के प्रति प्रतिबद्धता को प्रोत्साहित करता है।",
                gu: "પુનીતધન પલ્સ લિમિટેડમાં, અમારો વિકાસ અમારા કર્મચારીઓની તકનીકી કુશળતા અને વ્યાવસાયિક પ્રતિબદ્ધતા દ્વારા સંચાલિત છે. અમે એક સર્વસમાવેશક અને વ્યાવસાયિક વાતાવરણ પ્રદાન કરીએ છીએ."
              })}
            </p>
          </div>

          {/* Current Opportunities & Application Redesign Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side: Hiring info & expectations */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="bg-gradient-to-br from-[#0b2418] to-[#10b981]/50 text-white rounded-3xl p-8 shadow-xl space-y-6">
                <div className="flex items-center gap-3 text-[#f4d068]">
                  <Briefcase className="w-6 h-6 stroke-[2.5]" />
                  <h3 className="text-xl font-serif font-bold tracking-tight">
                    {localize({ en: "We Are Sourcing", hi: "हम प्रतिभाओं की तलाश में हैं", gu: "અમે પ્રતિભા શોધી રહ્યા છીએ" })}
                  </h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {localize({
                    en: "We constantly seek technical mill operators, quality assurance specialists, supply chain logisticians, and financial compliance professionals. Working within our corporate structure gives team members hands-on exposure to massive institutional food logistics, state-level procurement frameworks, and state-of-the-art milling systems.",
                    hi: "हम निरंतर तकनीकी मिल ऑपरेटरों, गुणवत्ता आश्वासन विशेषज्ञों, आपूर्ति श्रृंखला प्रबंधकों और वित्तीय अनुपालन पेशेवरों की तलाश करते हैं। हमारी कंपनी में कार्य करने से व्यापक संस्थागत खाद्य लॉजिस्टिक्स और आधुनिक मिलिंग प्रणालियों का अनुभव प्राप्त होता है।",
                    gu: "અમે ટેકનિકલ મિલ ઓપરેટર્સ, ગુણવત્તા નિષ્ણાતો, સપ્લાય ચેઇન અને નાણાકીય અનુપાલન વ્યાવસાયિકોની સતત શોધ કરીએ છીએ."
                  })}
                </p>
                <div className="border-t border-white/10 pt-4 space-y-4">
                  <h4 className="text-xs font-mono uppercase text-[#f4d068] font-bold tracking-wider">
                    {localize({ en: "Candidate Expectations", hi: "उम्मीदवार से अपेक्षाएं", gu: "ઉમેદવાર પાસેથી અપેક્ષાઓ" })}
                  </h4>
                  <ul className="space-y-3 text-xs text-gray-300">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#f4d068] shrink-0 mt-0.5" />
                      <span>{localize({ en: "Dedicated alignment with central and state compliance standards.", hi: "केंद्रीय और राज्य अनुपालन मानकों के साथ समर्पित संरेखण।", gu: "કેન્દ્રીય અને રાજ્ય નિયમોનું ચુસ્ત પાલન." })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#f4d068] shrink-0 mt-0.5" />
                      <span>{localize({ en: "Sound understanding of safety-first manufacturing workflows.", hi: "सुरक्षा-प्रथम विनिर्माण प्रक्रियाओं की ठोस समझ।", gu: "સુરક્ષા-પ્રથમ ઉત્પાદન પ્રક્રિયાઓની ઊંડી સમજ." })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#f4d068] shrink-0 mt-0.5" />
                      <span>{localize({ en: "Rigorous focus on high precision grain grading and processing.", hi: "उच्च परिशुद्धता अनाज ग्रेडिंग और प्रसंस्करण पर कठोर ध्यान।", gu: "ઉચ્ચ ચોકસાઈવાળા અનાજ ગ્રેડિંગ અને પ્રોસેસિંગ પર ધ્યાન." })}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50/50 border border-amber-200/60 rounded-3xl p-6 text-sm text-amber-900 space-y-3">
                <h4 className="font-bold font-serif text-base flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  {localize({ en: "Corporate HR Office", hi: "कॉर्पोरेट मानव संसाधन कार्यालय", gu: "કોર્પોરેટ એચઆર ઓફિસ" })}
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                  {localize({
                    en: "Completed forms are routed directly to CA Dhanashree Bachhawat (Head of People Operations). Qualified profiles undergo a structural background check followed by a tech-level panel round.",
                    hi: "भरे हुए फॉर्म सीधे सीए धनश्री बाच्छावत (मानव संसाधन प्रमुख) को भेजे जाते हैं। योग्य प्रोफाइल की पृष्ठभूमि जांच के बाद तकनीकी पैनल साक्षात्कार होता है।",
                    gu: "ભરેલા ફોર્મ સીધા CA ધનશ્રી બચ્છાવત (એચઆર હેડ) ને મોકલવામાં આવે છે. યોગ્ય પ્રોફાઇલની ચકાસણી બાદ પેનલ ઇન્ટરવ્યુ લેવામાં આવે છે."
                  })}
                </p>
              </div>
            </div>

            {/* Right side: Interactively Redesigned Candidate Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-zinc-200/60 border-l-4 border-l-[#f4d068] p-8 shadow-[0_20px_50px_rgba(15,46,30,0.02)] space-y-8 text-left hover:-translate-y-1 transition-all duration-300">
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900">
                  {localize({ en: "Candidate Enrollment", hi: "उम्मीदवार नामांकन", gu: "ઉમેદવાર નોંધણી" })}
                </h3>
                <p className="text-xs text-zinc-500 font-mono mt-1">
                  {localize({ en: "Submit your profile and resume directly into our corporate portal.", hi: "अपनी प्रोफ़ाइल और बायोडाटा सीधे हमारे कॉर्पोरेट पोर्टल पर जमा करें।", gu: "તમારી પ્રોફાઇલ અને રિઝ્યુમ સીધા અમારા પોર્ટલ પર સબમિટ કરો." })}
                </p>
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
                    <h4 className="text-lg font-serif font-black text-zinc-900">
                      {localize({ en: "Application Submitted!", hi: "आवेदन सफलतापूर्वक जमा हुआ!", gu: "અરજી સફળતાપૂર્વક સબમિટ થઈ!" })}
                    </h4>
                    <p className="text-sm text-zinc-600 leading-relaxed max-w-md mx-auto">
                      {localize({
                        en: "Thank you for applying. Your candidate details and uploaded resume are safely stored in our Administrative CMS database. Our HR panel will reach out if your credentials align.",
                        hi: "आवेदन करने के लिए धन्यवाद। आपका विवरण और बायोडाटा सुरक्षित रूप से संग्रहीत हैं। यदि आपकी योग्यता मेल खाती है तो हमारा पैनल संपर्क करेगा।",
                        gu: "અરજી કરવા બદલ આભાર. તમારો ડેટા સુરક્ષિત સંગ્રહિત છે. અમારી HR ટીમ ટૂંક સમયમાં સંપર્ક કરશે."
                      })}
                    </p>
                  </div>
                  <button 
                    onClick={() => setCareerSubmitSuccess(false)}
                    className="bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs uppercase tracking-widest font-extrabold px-6 py-3 rounded-xl transition-all cursor-pointer shadow"
                  >
                    {localize({ en: "Submit Another Application", hi: "दूसरा आवेदन जमा करें", gu: "બીજી અરજી સબમિટ કરો" })}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Basic Info Rows */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold block">
                        {localize({ en: "Candidate Name *", hi: "उम्मीदवार का नाम *", gu: "ઉમેદવારનું નામ *" })}
                      </label>
                      <input 
                        type="text"
                        required
                        value={careerForm.name}
                        onChange={(e) => setCareerForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder={localize({ en: "e.g. Rahul Sharma", hi: "उदा. राहुल शर्मा", gu: "દા.ત. રાહુલ શર્મા" })}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green-dark focus:bg-white transition-all text-zinc-800"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold block">
                        {localize({ en: "Email Address *", hi: "ईमेल पता *", gu: "ઈમેલ સરનામું *" })}
                      </label>
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
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold block">
                        {localize({ en: "Contact Phone *", hi: "संपर्क फोन *", gu: "સંપર્ક ફોન *" })}
                      </label>
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
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold block">
                        {localize({ en: "Position Applied For *", hi: "पद जिसके लिए आवेदन किया है *", gu: "કયા પદ માટે અરજી કરી છે *" })}
                      </label>
                      <select
                        value={careerForm.position}
                        onChange={(e) => setCareerForm(prev => ({ ...prev, position: e.target.value }))}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green-dark focus:bg-white transition-all text-zinc-800 cursor-pointer"
                      >
                        <option value="Senior Mill Operator / Milling Tech">
                          {localize({ en: "Senior Mill Operator / Milling Tech", hi: "वरिष्ठ मिल ऑपरेटर / मिलिंग तकनीशियन", gu: "સિનિયર મિલ ઓપરેટર / મિલિંગ ટેક" })}
                        </option>
                        <option value="Quality Assurance Analyst / Lab Executive">
                          {localize({ en: "Quality Assurance Analyst / Lab Executive", hi: "गुणवत्ता आश्वासन विश्लेषक / लैब कार्यकारी", gu: "ગુણવત્તા વિશ્લેષક / લેબ એક્ઝિક્યુટિવ" })}
                        </option>
                        <option value="Procurement & Sourcing Manager">
                          {localize({ en: "Procurement & Sourcing Manager", hi: "खरीद और सोर्सिंग प्रबंधक", gu: "ખરીદી અને સોર્સિંગ મેનેજર" })}
                        </option>
                        <option value="Logistics & Supply Chain Lead">
                          {localize({ en: "Logistics & Supply Chain Lead", hi: "लॉजिस्टिक्स और आपूर्ति श्रृंखला प्रमुख", gu: "લોજિસ્ટિક્સ અને સપ્લાય ચેઈન લીડ" })}
                        </option>
                        <option value="Financial Compliance Specialist">
                          {localize({ en: "Financial Compliance Specialist", hi: "वित्तीय अनुपालन विशेषज्ञ", gu: "નાણાકીય અનુપાલન નિષ્ણાત" })}
                        </option>
                        <option value="Human Resources Executive">
                          {localize({ en: "Human Resources Executive", hi: "मानव संसाधन कार्यकारी", gu: "માનવ સંસાધન એક્ઝિક્યુટિવ" })}
                        </option>
                        <option value="Other / General Application">
                          {localize({ en: "Other / General Application", hi: "अन्य / सामान्य आवेदन", gu: "અન્ય / સામાન્ય અરજી" })}
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Experience Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold block">
                      {localize({ en: "Relevant Experience *", hi: "प्रासंगिक अनुभव *", gu: "સંબંધિત અનુભવ *" })}
                    </label>
                    <select
                      value={careerForm.experience}
                      onChange={(e) => setCareerForm(prev => ({ ...prev, experience: e.target.value }))}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green-dark focus:bg-white transition-all text-zinc-800 cursor-pointer"
                    >
                      <option value="Entry Level / Graduate / Fresher">
                        {localize({ en: "Entry Level / Graduate / Fresher", hi: "प्रारंभिक स्तर / स्नातक / फ्रेशर", gu: "એન્ટ્રી લેવલ / ગ્રેજ્યુએટ / ફ્રેશર" })}
                      </option>
                      <option value="1-3 Years Professional Experience">
                        {localize({ en: "1-3 Years Professional Experience", hi: "1-3 वर्ष का पेशेवर अनुभव", gu: "૧-૩ વર્ષનો વ્યાવસાયિક અનુભવ" })}
                      </option>
                      <option value="3-5 Years Professional Experience">
                        {localize({ en: "3-5 Years Professional Experience", hi: "3-5 वर्ष का पेशेवर अनुभव", gu: "૩-૫ વર્ષનો વ્યાવસાયિક અનુભવ" })}
                      </option>
                      <option value="5+ Years Senior Specialist">
                        {localize({ en: "5+ Years Senior Specialist", hi: "5+ वर्ष वरिष्ठ विशेषज्ञ", gu: "૫+ વર્ષ સિનિયર નિષ્ણાત" })}
                      </option>
                    </select>
                  </div>

                  {/* Message Note */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold block">
                      {localize({ en: "Statement / Cover Note (Optional)", hi: "कवर नोट / संक्षिप्त विवरण (वैकल्पिक)", gu: "કવર નોટ / વિગત (વૈકલ્પિક)" })}
                    </label>
                    <textarea 
                      rows={3}
                      value={careerForm.message}
                      onChange={(e) => setCareerForm(prev => ({ ...prev, message: e.target.value }))}
                      placeholder={localize({ en: "Tell us about your background or why you are applying to Punitdhan...", hi: "अपनी पृष्ठभूमि या पुनीतधन में आवेदन करने के कारण के बारे में बताएं...", gu: "તમારી પૃષ્ઠભૂમિ અથવા પુનીતધનમાં અરજી કરવાના કારણ વિશે જણાવો..." })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green-dark focus:bg-white transition-all text-zinc-800 resize-none"
                    />
                  </div>

                  {/* Redesigned Drag & Drop Resume Upload Box */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold block">
                      {localize({ en: "Upload Resume (PDF, DOC, DOCX) *", hi: "बायोडाटा अपलोड करें (PDF, DOC, DOCX) *", gu: "રિઝ્યુમ અપલોડ કરો (PDF, DOC, DOCX) *" })}
                    </label>
                    
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
                            <p className="text-xs font-bold text-zinc-800">
                              {localize({ en: "Drag & Drop Resume, or ", hi: "बायोडाटा खींचें और छोड़ें, या ", gu: "રિઝ્યુમ અહીં ડ્રેગ કરો, અથવા " })}
                              <span className="text-[#10b981] font-black hover:underline">
                                {localize({ en: "Browse", hi: "ब्राउज़ करें", gu: "બ્રાઉઝ કરો" })}
                              </span>
                            </p>
                            <p className="text-[10px] text-zinc-400 mt-1 font-mono">
                              {localize({ en: "Accepts PDF, DOC, DOCX up to 5MB", hi: "PDF, DOC, DOCX स्वीकार्य (5MB तक)", gu: "PDF, DOC, DOCX સ્વીકાર્ય (૫MB સુધી)" })}
                            </p>
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
                        <span>{localize({ en: "Filing Profile...", hi: "प्रोफ़ाइल दर्ज की जा रही है...", gu: "પ્રોફાઇલ સબમિટ થઈ રહી છે..." })}</span>
                      </>
                    ) : (
                      <>
                        <span>{localize({ en: "Verify & Submit Application", hi: "सत्यापित करें और आवेदन जमा करें", gu: "ચકાસો અને અરજી સબમિટ કરો" })}</span>
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
                en: "Official Corporate Legal Registry & Governance Framework under the Ministry of Corporate Affairs", 
                hi: "कॉर्पोरेट कार्य मंत्रालय के तहत आधिकारिक कॉर्पोरेट विधिक रजिस्ट्री और शासन ढांचा", 
                gu: "કોર્પોરેટ બાબતોના મંત્રાલય હેઠળ સત્તાવાર કોર્પોરેટ લીગલ રજિસ્ટ્રી અને ગવર્નન્સ" 
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
                    {localize({ en: "Addresses & Registered Offices", hi: "पते और पंजीकृत कार्यालय", gu: "સરનામાં અને રજિસ્ટર્ડ ઓફિસ" })}
                  </h2>
                </div>

                <div className="space-y-6 text-xs sm:text-sm text-zinc-650">
                  <div className="space-y-1.5 border-l-2 border-brand-accent pl-4">
                    <strong className="text-zinc-900 block font-sans">
                      {localize({ en: "Corporate Headquarters:", hi: "कॉर्पोरेट मुख्यालय:", gu: "કોર્પોરેટ હેડક્વાર્ટર:" })}
                    </strong>
                    <span className="block text-zinc-500 font-medium">
                      {localize({
                        en: "406 Neelgagan Plaza, Opposite Police Commissioner Office, Shahibaug, Ahmedabad, Gujarat, India – 380004.",
                        hi: "406 नीलगगन प्लाजा, पुलिस कमिश्नर कार्यालय के सामने, शाहीबाग, अहमदाबाद, गुजरात, भारत – 380004।",
                        gu: "૪૦૬ નીલગગન પ્લાઝા, પોલીસ કમિશનર ઓફિસ સામે, શાહીબાગ, અમદાવાદ, ગુજરાત, ભારત – ૩૮૦૦૦૪."
                      })}
                    </span>
                  </div>
                  <div className="space-y-1.5 border-l-2 border-[#f4d068] pl-4">
                    <strong className="text-zinc-900 block font-sans">
                      {localize({ en: "Milling & Manufacturing Hub I:", hi: "मिलिंग एवं विनिर्माण केंद्र I:", gu: "મિલિંગ અને ઉત્પાદન કેન્દ્ર ૧:" })}
                    </strong>
                    <span className="block text-zinc-500 font-medium">
                      {localize({
                        en: "Near Omkar Textile Mill, Behind Narnarayan Weigh Bridge, Memco Char Rasta, Naroda Road, Ahmedabad, Gujarat, India – 382345.",
                        hi: "ओमकार टेक्सटाइल मिल के पास, नरनारायण वे ब्रिज के पीछे, मेमको चार रास्ता, नरोडा रोड, अहमदाबाद, गुजरात, भारत – 382345।",
                        gu: "ઓમકાર ટેક્સટાઇલ મિલ પાસે, નરનારાયણ વે બ્રિજ પાછળ, મેમકો ચાર રસ્તા, નરોડા રોડ, અમદાવાદ, ગુજરાત, ભારત – ૩૮૨૩૪૫."
                      })}
                    </span>
                  </div>
                  <div className="space-y-1.5 border-l-2 border-emerald-600 pl-4">
                    <strong className="text-zinc-900 block font-sans">
                      {localize({ en: "Milling & Manufacturing Hub II:", hi: "मिलिंग एवं विनिर्माण केंद्र II:", gu: "મિલિંગ અને ઉત્પાદન કેન્દ્ર ૨:" })}
                    </strong>
                    <span className="block text-zinc-500 font-medium">
                      {localize({
                        en: "Krishna Rice Mills Compound, Behind Baba Ramdevpir Mandir, Near Patel Kanta, Daran Road, Ahmedabad, Gujarat, India – 382220.",
                        hi: "कृष्णा राइस मिल्स कंपाउंड, बाबा रामदेवपीर मंदिर के पीछे, पटेल कांटा के पास, डारन रोड, अहमदाबाद, गुजरात, भारत – 382220।",
                        gu: "ક્રિષ્ના રાઇસ મિલ્સ કમ્પાઉન્ડ, બાબા રામદેવપીર મંદિર પાછળ, પટેલ કાંટા પાસે, દારણ રોડ, અમદાવાદ, ગુજરાત, ભારત – ૩૮૨૨૨૦."
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Communication Desks Card */}
              <div className="bg-white rounded-3xl border border-zinc-200/60 border-l-4 border-l-[#f4d068] p-6 sm:p-8 shadow-[0_20px_50px_rgba(15,46,30,0.02)] space-y-6 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 text-brand-green-dark">
                  <Phone className="w-6 h-6 stroke-[2.5]" />
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
                    {localize({ en: "Institutional Communication", hi: "संस्थागत संचार", gu: "સંસ્થાકીય સંચાર" })}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block font-bold">
                      {localize({ en: "Direct Lines", hi: "सीधी दूरभाष लाइनें", gu: "ડાયરેક્ટ ફોન લાઇન" })}
                    </span>
                    <div className="space-y-1 font-mono text-zinc-700">
                      <a href="tel:+917069888113" className="block hover:text-brand-green-mid transition-colors font-bold">+91 70698 88113</a>
                      <a href="tel:+917069888112" className="block hover:text-brand-green-mid transition-colors font-bold">+91 70698 88112</a>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block font-bold">
                      {localize({ en: "Electronic Mail", hi: "ईमेल संपर्क", gu: "ઈમેલ સંપર્ક" })}
                    </span>
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
                  {localize({ en: "Send Us an Inquiry", hi: "हमें पूछताछ भेजें", gu: "અમને પૂછપરછ મોકલો" })}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-550 leading-relaxed mt-1">
                  {localize({
                    en: "Submit your sourcing mandate or commercial query.",
                    hi: "अपना सोर्सिंग विवरण या वाणिज्यिक प्रश्न दर्ज करें।",
                    gu: "તમારી સોર્સિંગ વિગત અથવા પ્રશ્ન સબમિટ કરો."
                  })}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 block">
                    {localize({ en: "Full Name", hi: "पूरा नाम", gu: "પૂરું નામ" })}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 border border-zinc-200 text-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/25 focus:border-brand-green-mid transition-all font-sans font-semibold"
                    placeholder={localize({ en: "Enter your name", hi: "अपना नाम दर्ज करें", gu: "તમારું નામ દાખલ કરો" })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 block">
                    {localize({ en: "Email Address", hi: "ईमेल पता", gu: "ઈમેલ સરનામું" })}
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
                    {localize({ en: "Phone Number", hi: "फोन नंबर", gu: "ફોન નંબર" })}
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
                    {localize({ en: "Subject", hi: "विषय", gu: "વિષય" })}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 border border-zinc-200 text-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/25 focus:border-brand-green-mid transition-all font-sans font-semibold"
                    placeholder={localize({ en: "Corporate supply / General Query", hi: "कॉर्पोरेट आपूर्ति / सामान्य प्रश्न", gu: "કોર્પોરેટ સપ્લાય / સામાન્ય પૂછપરછ" })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 block">
                    {localize({ en: "Message", hi: "संदेश", gu: "સંદેશ" })}
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 border border-zinc-200 text-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/25 focus:border-brand-green-mid transition-all font-sans font-semibold resize-none"
                    placeholder={localize({ en: "Detail your requirements...", hi: "अपनी आवश्यकताएं विस्तार से बताएं...", gu: "તમારી જરૂરિયાતો વિગતવાર જણાવો..." })}
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-fadeIn">
                    <span>✓</span>
                    <span>{localize({ en: "Your enquiry has been received successfully.", hi: "आपकी पूछताछ सफलतापूर्वक प्राप्त हो गई है।", gu: "તમારી પૂછપરછ સફળતાપૂર્વક મળી ગઈ છે." })}</span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-fadeIn">
                    <span>✕</span>
                    <span>{localize({ en: "An unexpected error occurred. Please try again.", hi: "एक अप्रत्याशित त्रुटि हुई। कृपया पुन: प्रयास करें।", gu: "કોઈ ક્ષતિ આવી. કૃપા કરીને ફરી પ્રયાસ કરો." })}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#f4d068] hover:bg-brand-green-dark hover:text-white text-brand-green-dark text-xs sm:text-sm font-extrabold uppercase tracking-widest transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>{localize({ en: "Sending...", hi: "भेजा जा रहा है...", gu: "મોકલી રહ્યું છે..." })}</span>
                  ) : (
                    <>
                      <span>{localize({ en: "Send Enquiry", hi: "पूछताछ भेजें", gu: "પૂછપરછ મોકલો" })}</span>
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
