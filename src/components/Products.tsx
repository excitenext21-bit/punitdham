import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Wheat, 
  Award, 
  CheckCircle, 
  HeartHandshake, 
  Zap, 
  ShieldCheck, 
  Search, 
  Filter,
  ArrowRight,
  ChevronRight
} from "./HandDrawnIcons";
import { PRODUCTS } from "../data";
import { Product } from "../types";
import { useLanguage } from "../context/LanguageContext";
import { useCMS } from "../context/CMSContext";

function ProductIcon({ name, size = 18 }: { name: string; size?: number }) {
  switch (name) {
    case "Sparkles":
      return <Sparkles size={size} />;
    case "Wheat":
      return <Wheat size={size} />;
    case "Award":
      return <Award size={size} />;
    case "CheckCircle":
      return <CheckCircle size={size} />;
    case "HeartHandshake":
      return <HeartHandshake size={size} />;
    case "Zap":
      return <Zap size={size} />;
    case "ShieldCheck":
      return <ShieldCheck size={size} />;
    default:
      return <Wheat size={size} />;
  }
}

// Highly detailed mock premium agricultural parameters for industrial buyers
const PRODUCT_SPECS: Record<string, {
  moisture: { en: string; hi: string; gu: string };
  purity: { en: string; hi: string; gu: string };
  foreignMatter: { en: string; hi: string; gu: string };
  cultivation: { en: string; hi: string; gu: string };
  gradeBadge: { en: string; hi: string; gu: string };
  recipe: { en: string; hi: string; gu: string };
  highlights: { en: string[]; hi: string[]; gu: string[] };
}> = {
  "chana-dal": {
    moisture: { en: "11.0% Max", hi: "11.0% अधिकतम", gu: "11.0% મહત્તમ" },
    purity: { en: "99.85% Min", hi: "99.85% न्यूनतम", gu: "99.85% ન્યૂનતમ" },
    foreignMatter: { en: "0.05% Max", hi: "0.05% अधिकतम", gu: "0.05% મહત્તમ" },
    cultivation: { en: "Saurashtra & Central MP Rain-fed Fields", hi: "सौराष्ट्र और मध्य प्रदेश के वर्षा सिंचित क्षेत्र", gu: "સૌરાષ્ટ્ર અને મધ્ય પ્રદેશના ખેતરો" },
    gradeBadge: { en: "Grade-A Export Superior", hi: "ग्रेड-ए निर्यात उत्कृष्ट", gu: "ગ્રેડ-એ નિકાસ ગુણવત્તા" },
    recipe: { en: "Purity Tadka Dal, Crispy Snacks, High-protein salads", hi: "तड़का दाल, खस्ता स्नैक्स, उच्च प्रोटीन सलाद", gu: "તડકા દાળ, કરકરા નાસ્તા, પ્રોટીનયુક્ત કચુંબર" },
    highlights: {
      en: ["De-husked & Air-Sifted", "No Artificial Polishing", "Zero Color Adulteration"],
      hi: ["छिलका रहित और वायु-वर्गीकृत", "कोई कृत्रिम पॉलिश नहीं", "शून्य रंग मिलावट"],
      gu: ["ફોતરા વગરની અને શુદ્ધ કરેલી", "કુદરતી પદ્ધતિ - નો પોલિશ", "શૂન્ય રંગ ભેળસેળ"]
    }
  },
  "toor-dal": {
    moisture: { en: "11.5% Max", hi: "11.5% अधिकतम", gu: "11.5% મહત્તમ" },
    purity: { en: "99.90% Min", hi: "99.90% न्यूनतम", gu: "99.90% ન્યૂનતમ" },
    foreignMatter: { en: "0.05% Max", hi: "0.05% अधिकतम", gu: "0.05% મહત્તમ" },
    cultivation: { en: "Narmada Valley Deep Black Soils", hi: "नर्मदा घाटी की गहरी काली मिट्टी", gu: "નર્મદા ખીણની કાળી કસવાળી જમીન" },
    gradeBadge: { en: "Premium Sovereign Grade", hi: "प्रीमियम सॉवरेन ग्रेड", gu: "સુપ્રીમ ગોલ્ડ ગ્રેડ" },
    recipe: { en: "Traditional Sambar, Gujarati Dal, Lentil Soups", hi: "पारंपरिक सांभर, गुजराती दाल, दाल सूप", gu: "પારંપરિક સાંભાર, સ્વાદિષ્ટ ગુજરાતી દાળ" },
    highlights: {
      en: ["Laser-Sorter Graded", "ISO Standard Dehusking", "Sweet Natural Tasting profile"],
      hi: ["लेजर-सॉर्टर श्रेणीबद्ध", "आईएसओ मानक छिलका उतारना", "मीठा प्राकृतिक स्वाद"],
      gu: ["લેસર-સોર્ટર દ્વારા પસંદગી", "આઇએસઓ સ્ટાન્ડર્ડ પ્રોસેસિંગ", "કુદરતી મીઠો સ્વાદ ધરાવતી"]
    }
  },
  "urad-whole": {
    moisture: { en: "10.8% Max", hi: "10.8% अधिकतम", gu: "10.8% મહત્તમ" },
    purity: { en: "99.80% Min", hi: "99.80% न्यूनतम", gu: "99.80% ન્યૂનતમ" },
    foreignMatter: { en: "0.10% Max", hi: "0.10% अधिकतम", gu: "0.10% મહત્તમ" },
    cultivation: { en: "Deccan Plateau Mineral-Rich Soils", hi: "दक्कन के पठार की खनिज समृद्ध मिट्टी", gu: "દક્ષિણ પઠારની ખનિજયુક્ત જમીન" },
    gradeBadge: { en: "Bold Quality Select", hi: "बोल्ड क्वालिटी सेलेक्ट", gu: "બોલ્ડ ક્વોલિટી સિલેક્ટ" },
    recipe: { en: "Creamy Dal Makhani, Rich Punjabi Gravies", hi: "क्रीमी दाल मखनी, समृद्ध पंजाबी ग्रेवी", gu: "મલાઈદાર દાળ મખની, પંજાબી રસોઈ" },
    highlights: {
      en: ["Untreated Whole Seeds", "Rich Zinc & Iron Core", "Consistent Cook Texture"],
      hi: ["अनुपचारित साबुत बीज", "समृद्ध जिंक और आयरन कोर", "लगातार पकाने की बनावट"],
      gu: ["કેમિકલ રહિત આખા અડદ", "ઝીંક અને આયર્નથી ભરપૂર", "રસોઈમાં એકસમાન સોફ્ટનેસ"]
    }
  },
  "urad-dal": {
    moisture: { en: "11.2% Max", hi: "11.2% अधिकतम", gu: "11.2% મહત્તમ" },
    purity: { en: "99.92% Min", hi: "99.92% न्यूनतम", gu: "99.92% ન્યૂનતમ" },
    foreignMatter: { en: "0.04% Max", hi: "0.04% अधिकतम", gu: "0.04% મહત્તમ" },
    cultivation: { en: "Southern & Central Indian Growers", hi: "दक्षिणी और मध्य भारतीय उत्पादक", gu: "દક્ષિણ અને મધ્ય ભારતના પ્રગતિશીલ ખેતરો" },
    gradeBadge: { en: "Ultra-White Premium", hi: "अल्ट्रा-व्हाइट प्रीमियम", gu: "અલ્ટ્રા-વ્હાઇટ પ્રીમિયમ" },
    recipe: { en: "Fluffy Idli, Crispy Vada Batter, Papad", hi: "मुलायम इडली, कुरकुरा वड़ा बैटर, पापड़", gu: "સોફ્ટ ઇડલી, કડક મેદુ વડા ખીરું, પાપડ" },
    highlights: {
      en: ["Saponin-Free Clean Wash", "Perfect for Fermentation", "Uniform Split Sizing"],
      hi: ["सैपोनिन-मुक्त स्वच्छ धुलाई", "किण्वन के लिए बिल्कुल सही", "एकसमान विभाजित आकार"],
      gu: ["સેપોનિન રહિત ચોખ્ખી ધોયેલી", "આથો આવવા માટે સર્વશ્રેષ્ઠ", "એકસમાન સાઇઝનું દળણું"]
    }
  },
  "masoor-dal": {
    moisture: { en: "11.0% Max", hi: "11.0% अधिकतम", gu: "11.0% મહત્તમ" },
    purity: { en: "99.88% Min", hi: "99.88% न्यूनतम", gu: "99.88% ન્યૂનતમ" },
    foreignMatter: { en: "0.05% Max", hi: "0.05% अधिकतम", gu: "0.05% મહત્તમ" },
    cultivation: { en: "Indo-Gangetic Fertile Silt Riversites", hi: "गंगा के मैदानी उपजाऊ कछार क्षेत्र", gu: "ગંગા કિનારાના ફળદ્રુપ કાંપવાળા મેદાનો" },
    gradeBadge: { en: "Premium Pink Select", hi: "प्रीमियम पिंक सिलेक्ट", gu: "પ્રીમિયમ પિંક મસૂર" },
    recipe: { en: "Quick Yellow-Red Soups, Light khichdies", hi: "त्वरित पीले-लाल सूप, हल्की खिचड़ी", gu: "ઝડપી પૌષ્ટિક સૂપ, ઓર્ગેનિક ખીચડી" },
    highlights: {
      en: ["Gentle Peeling Processed", "Extremely Quick-Cooking", "Folate Heavy Crop"],
      hi: ["सौम्य छीलने की प्रक्रिया", "अत्यंत त्वरित-पकाना", "फोलेट प्रचुर फसल"],
      gu: ["હળવી છાલ પ્રોસેસિંગ", "ખૂબ જ ઝડપથી પાકતી દાળ", "ફોલેટ તત્વ ધરાવતી ગુણકારી"]
    }
  },
  "chana-whole": {
    moisture: { en: "10.5% Max", hi: "10.5% अधिकतम", gu: "10.5% મહત્તમ" },
    purity: { en: "99.75% Min", hi: "99.75% न्यूनतम", gu: "99.75% ન્યૂનતમ" },
    foreignMatter: { en: "0.15% Max", hi: "0.15% अधिकतम", gu: "0.15% મહત્તમ" },
    cultivation: { en: "Semi-Arid Marwar & MP Highlands", hi: "अर्ध-शुष्क मारवाड़ और मध्य प्रदेश की उच्च भूमि", gu: "સેમી-એરિડ મારવાડ અને એમપી પહાડી ક્ષેત્ર" },
    gradeBadge: { en: "Desi Bold Grade-1", hi: "देशी बोल्ड ग्रेड-1", gu: "દેશી બોલ્ડ શ્રેણી-૧" },
    recipe: { en: "Nutritious Sprouting, Traditional Kala Chana Curry", hi: "पौष्टिक अंकुरण, पारंपरिक काला चना करी", gu: "અંકુરિત સલાડ, પરંપરાગત કાળા ચણાનું શાક" },
    highlights: {
      en: ["Excellent Sprouting Viability", "High Native Dietary Iron", "Robust Soluble Fiber"],
      hi: ["उत्कृष्ट अंकुरण व्यवहार्यता", "उच्च प्राकृतिक आहार आयरन", "मजदूत घुलनशील फाइबर"],
      gu: ["અંકુરણ ક્ષમતા ધરાવતા દાણા", "કુદરતી આયર્નનો ઉત્તમ સ્ત્રોત", "પાચનતંત્ર સુધારતા દ્રાવ્ય ફાઇબર"]
    }
  },
  "moong-dal": {
    moisture: { en: "11.2% Max", hi: "11.2% अधिकतम", gu: "11.2% મહત્તમ" },
    purity: { en: "99.90% Min", hi: "99.90% न्यूनतम", gu: "99.90% ન્યૂનતમ" },
    foreignMatter: { en: "0.05% Max", hi: "0.05% अधिकतम", gu: "0.05% મહત્તમ" },
    cultivation: { en: "North-Gujarat Agro-Climatic Zones", hi: "उत्तर-गुजरात कृषि-जलवायु क्षेत्र", gu: "ઉત્તર-ગુજરાત ક્લાઈમેટિક ઝોન્સ" },
    gradeBadge: { en: "Easy-Digest Select", hi: "आसान-पाचन चुनिंदा", gu: "સરળ પાચન સુવર્ણ ગ્રેડ" },
    recipe: { en: "Moong Sheera, Invaluable Health Diet Khichdi", hi: "मूंग शीरा, अमूल्य स्वास्थ्य आहार खिचड़ी", gu: "મગનો શીરો, સ્વાસ્થ્યપ્રદ પૌષ્ટિક ખીચડી" },
    highlights: {
      en: ["No Saponin Polish", "Gentle Tempering Clean", "Optimum Zinc Density"],
      hi: ["नो सैपोनिन पॉलिश", "सौम्य तड़के से साफ", "इष्टतम जिंक घनत्व"],
      gu: ["સેપોનિન કેમિકલ રહિત મિલિંગ", "પ્યોર ડબલ ક્લીન સિલ્ટરિંગ", "શ્રેષ્ઠ ઝીંક તત્વ"]
    }
  }
};

const getProductImage = (id: string) => {
  switch (id) {
    case "chana-dal":
      return "/products/chana-dal-whole.jpg";
    case "toor-dal":
      return "/products/toor-dal.jpg";
    case "urad-whole":
      return "/products/urad-dal-whole.jpg";
    case "urad-dal":
      return "/products/urad-dal-whole.jpg";
    case "masoor-dal":
      return "/products/masoor-moong-dal.jpg";
    case "chana-whole":
      return "/products/kala-chana.jpg";
    case "moong-dal":
      return "/products/moong-dal.jpg";
    default:
      return "/products/chana-dal-whole.jpg";
  }
};

interface ProductsProps {
  onInquireProduct: (productName: string) => void;
  key?: string;
}

export default function Products({ onInquireProduct }: ProductsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"card" | "list" | "detail">("detail");
  const [activeProductId, setActiveProductId] = useState<string>("chana-dal");
  const { localize, language } = useLanguage();

  const filterTags = ["All", "High Protein", "High Iron", "Easy Digestibility", "Fiber Plus"];

  const getLocalizedTagName = (tag: string) => {
    switch(tag) {
      case "All": return localize({ en: "All", hi: "सभी उत्पाद", gu: "બધા ઉત્પાદો" });
      case "High Protein": return localize({ en: "High Protein", hi: "उच्च प्रोटीन", gu: "ઉચ્ચ પ્રોટીન" });
      case "High Iron": return localize({ en: "High Iron", hi: "उच्च आयरन", gu: "ઉચ્ચ આયર્ન" });
      case "Easy Digestibility": return localize({ en: "Easy Digestibility", hi: "आसान पाचन", gu: "સરળ પાચન" });
      case "Fiber Plus": return localize({ en: "Fiber Plus", hi: "फाइबर प्लस", gu: "ફાઈબર પ્લસ" });
      default: return tag;
    }
  };

  const getLocalizedProductName = (prod: Product) => {
    if (language === "hi") return prod.hindiName || prod.name;
    if (language === "gu") {
      switch (prod.id) {
        case "chana-dal": return "ચણા દાળ";
        case "toor-dal": return "તુવેર દાળ (અરહર)";
        case "urad-whole": return "અડદ આખા";
        case "urad-dal": return "અડદ દાળ (ફોતરા વગરની)";
        case "masoor-dal": return "મસૂર દાળ (લાલ)";
        case "chana-whole": return "કાળા ચણા";
        case "moong-dal": return "મગ દાળ (ફોતરા વગરની)";
        default: return prod.name;
      }
    }
    return prod.name;
  };

  const getLocalizedProductDesc = (prod: Product) => {
    if (language === "hi") {
      switch (prod.id) {
        case "chana-dal": return "प्रीमियम पॉलिश-मुक्त विभाजित बंगाल ग्राम, प्रोटीन से भरपूर, कम ग्लाइसेमिक इंडेक्स, सीधे खेतों से मंगवाया गया।";
        case "toor-dal": return "अरहर दाल, भारतीय रसोइयों का एक मुख्य अंग। उत्तम स्वाद के लिए अत्याधुनिक मिलिंग के साथ प्रोसेस्ड।";
        case "urad-whole": return "पूरी उड़द, खनिज तत्वों से भरपूर। पारंपरिक और स्वादिष्ट व्यंजनों के लिए एकदम सही।";
        case "urad-dal": return "धुली और विभाजित उजली उड़द दाल, इडली और वड़ा जैसे दक्षिण भारतीय व्यंजनों के लिए सर्वोत्तम।";
        case "masoor-dal": return "लाल मसूर दाल, आवश्यक पोषक तत्वों और त्वरित पकाने के गुणों को बनाए रखने के लिए उपयुक्त तापमान पर प्रोसेस्ड।";
        case "chana-whole": return "पारंपरिक करी और उच्च प्रोटीन स्प्राउट्स सलाद के लिए आदर्श भूरे चने।";
        case "moong-dal": return "हल्की और आसानी से पचने वाली पीली मूंग दाल, स्वास्थ्यवर्धक आहार और विभिन्न व्यंजनों के लिए अनुशंसित।";
        default: return prod.description;
      }
    }
    if (language === "gu") {
      switch (prod.id) {
        case "chana-dal": return "પ્રીમિયમ પોલિશ-મુક્ત ચણા દાળ, પ્રોટીનથી ભરપૂર, ઓછી ગ્લાયકેમિક ઇન્ડેક્સ, સીધી શ્રેષ્ઠ ખેતરોમાંથી મેળવેલ.";
        case "toor-dal": return "તુવેર દાળ, ભારતીય રસોડાનું અનિવાર્ય અંગ. કુદરતી સ્વાદ જાળવવા અત્યાધુનિક મિલિંગ ટેકનોલોજી દ્વારા પ્રોસેસ કરેલ.";
        case "urad-whole": return "આખા કાળા અડદ, ખનિજો અને પોષકત્વોથી ભરપૂર. સ્વાદિષ્ટ દાળ મખની અને દેશી વાનગીઓ માટે ઉત્તમ.";
        case "urad-dal": return "ફોતરા વગરની અડદની દાળ, ઇડલી અને વડા જેવી દક્ષિણ પારંપરિક વાનગીઓ માટે શ્રેષ્ઠ ગુણવત્તાવાળી.";
        case "masoor-dal": return "લાલ મસૂર દાળ, પ્રોટીન અને પોષક તત્ત્વો જાળવી રાખવા માટે ઉત્તમ તાપમાને પ્રોસેસ કરેલ.";
        case "chana-whole": return "પરંપરાગત શાક અને પ્રોટીનયુક્ત સલાડ માટે ઉત્તમ કાળા દેશી ચણા.";
        case "moong-dal": return "સરળતાથી પચી જાય તેવી પીળી મગની દાળ, સ્વાસ્થ્યપ્રદ આહાર અને રસોઈ માટે આગ્રહણીય.";
        default: return prod.description;
      }
    }
    return prod.description;
  };

  const getLocalizedNutrient = (nutrient: string) => {
    if (language === "hi") {
      switch (nutrient) {
        case "High Fiber": return "उच्च फाइबर";
        case "Rich in Iron": return "आयरन से भरपूर";
        case "Folate Heavy": return "फ़ोलेट प्रचुर";
        case "Low Fat": return "कम वसा";
        case "Plant Protein": return "प्लांट प्रोटीन";
        case "Dietary Fiber": return "आहार फाइबर";
        case "Vitamin B Complex": return "विटामिन बी कॉम्प्लेक्स";
        case "Calcium": return "कैल्शियम";
        case "Energy Booster": return "ऊर्जा वर्धक";
        case "Strengthens Bones": return "हड्डियों को मजबूत बनाए";
        case "Digestive Friendly": return "पाचन अनुकूल";
        case "High Magnesium": return "उच्च मैग्नीशियम";
        case "High Protein": return "उच्च प्रोटीन";
        case "Rich in Potassium": return "पोटेशियम प्रचुर";
        case "Gut-Health Friendly": return "आंत स्वास्थ्य अनुकूल";
        case "Low Cholesterol": return "कम कोलेस्ट्रॉल";
        case "Heart Health": return "हृदय स्वास्थ्य";
        case "Anti-Oxidants": return "एंटी-ऑक्सीडेंट";
        case "Low Calorie": return "कम कैलोरी";
        case "Extremely High Iron": return "अत्यधिक आयरन";
        case "Muscle Growth": return "मांसपेशियों का विकास";
        case "Sustained Energy": return "सतत ऊर्जा";
        case "Zero trans-fat": return "शून्य ट्रांस-फैट";
        case "Easiest Digestibility": return "सबसे आसान पाचन";
        case "Metabolism Boost": return "मेटाबॉलिज्म बूस्ट";
        case "Rich in Zinc": return "जिंक से भरपूर";
        case "Vitamin C & A": return "विटामिन सी और ए";
        default: return nutrient;
      }
    }
    if (language === "gu") {
      switch (nutrient) {
        case "High Fiber": return "ઉચ્ચ ફાઇબર";
        case "Rich in Iron": return "આયર્નથી ભરપૂર";
        case "Folate Heavy": return "ફોલેટ થી ભરપૂર";
        case "Low Fat": return "ઓછી ચરબી";
        case "Plant Protein": return "વનસ્પતિ જન્ય પ્રોટીન";
        case "Dietary Fiber": return "આહાર ફાઇબર";
        case "Vitamin B Complex": return "વિટામિન બી કોમ્પ્લેક્સ";
        case "Calcium": return "કેલ્શિયમ";
        case "Energy Booster": return "એનર્જી બૂસ્ટર";
        case "Strengthens Bones": return "હાડકા મજબૂત કરે";
        case "Digestive Friendly": return "પાચન માટે ઉત્તમ";
        case "High Magnesium": return "ઉચ્ચ મેગ્નેશિયમ";
        case "High Protein": return "ઉચ્ચ પ્રોટીન";
        case "Rich in Potassium": return "પોટેશિયમથી ભરપૂર";
        case "Gut-Health Friendly": return "પાચનતંત્ર માટે સારું";
        case "Low Cholesterol": return "ઓછું કોલેસ્ટ્રોલ";
        case "Heart Health": return "હૃદય માટે ઉત્તમ";
        case "Anti-Oxidants": return "એન્ટી-ઓક્સિડન્ટ્સ";
        case "Low Calorie": return "ઓછી કેલરી";
        case "Extremely High Iron": return "ખૂબ જ ઊંચું આયર્ન";
        case "Muscle Growth": return "સ્નાયુઓનો વિકાસ";
        case "Sustained Energy": return "લાંબી એનર્જી";
        case "Zero trans-fat": return "ઝીરો ટ્રાન્સ-ફેટ";
        case "Easiest Digestibility": return "સરળ પાચન ક્રિયા";
        case "Metabolism Boost": return "મેટાબોલિઝમ બૂસ્ટ";
        case "Rich in Zinc": return "ઝીંકથી ભરપૂર";
        case "Vitamin C & A": return "વિટામિન સી અને એ";
        default: return nutrient;
      }
    }
    return nutrient;
  };

  const { pages, activePageSlug } = useCMS();
  const activePage = pages.find(p => p.slug === activePageSlug) || pages[0];
  const section = activePage.sections.find(s => s.type === "products");
  const productsList = section?.items || PRODUCTS;

  const sectionTitle = language === "en"
    ? (section?.title || "Range of Premium Pulses & Staple Grains")
    : localize({
        en: "Range of Premium Pulses & Staple Grains",
        hi: "प्रीमियम दालों और खाद्यान्नों की विस्तृत श्रृंखला",
        gu: "પ્રીમિયમ કઠોળ અને અનાજની વિવિધ શ્રેણી"
      });
  const sectionSubtitle = language === "en"
    ? (section?.subtitle || "OUR FINE HARVEST PORTFOLIO")
    : localize({
        en: "OUR FINE HARVEST PORTFOLIO",
        hi: "हमारा उत्कृष्ट उत्पाद पोर्टफोलियो",
        gu: "અમારો ઉત્કૃષ્ટ ઉત્પાદન પોર્ટફોલિયો"
      });
  const sectionContent = language === "en"
    ? (section?.content || "Sourced directly from local grower cooperatives. De-husked, dual-sifted, and size-filtered under ISO standards for pristine purity and optimum plant-protein density.")
    : localize({
        en: "Sourced directly from local grower cooperatives. De-husked, dual-sifted, and size-filtered under ISO standards for pristine purity and optimum plant-protein density.",
        hi: "स्थानीय किसान सहकारी समितियों से सीधे प्राप्त। प्राचीन शुद्धता और इष्टतम प्लांट-प्रोटीन घनत्व के लिए आईएसओ मानकों के तहत छिलका रहित, दोहरी छनाई और आकार-फ़िल्टर किया गया।",
        gu: "સ્થાનિક ખેડૂત મંડળીઓ પાસેથી સીધા મેળવેલ. સંપૂર્ણ શુદ્ધતા અને ઉત્તમ પ્લાન્ટ પ્રોટીન માટે ISO ધોરણો હેઠળ પ્રોસેસિંગ, ડબલ-ફિલ્ટરિંગ અને સોર્ટિંગ."
      });

  // Filter products based on search term and tagging characteristics
  const filteredProducts = productsList.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (p.hindiName && p.hindiName.includes(searchTerm));
    
    if (selectedTag === "All") return matchesSearch;
    if (selectedTag === "High Protein") {
      return matchesSearch && p.nutrients.some(n => n.toLowerCase().includes("protein"));
    }
    if (selectedTag === "High Iron") {
      return matchesSearch && p.nutrients.some(n => n.toLowerCase().includes("iron"));
    }
    if (selectedTag === "Easy Digestibility") {
      return matchesSearch && p.nutrients.some(n => n.toLowerCase().includes("digest"));
    }
    if (selectedTag === "Fiber Plus") {
      return matchesSearch && p.nutrients.some(n => n.toLowerCase().includes("fiber"));
    }
    return matchesSearch;
  });

  // Automatically keep activeProductId synchronized with the filtered products list
  useEffect(() => {
    if (filteredProducts.length > 0) {
      const exists = filteredProducts.some(p => p.id === activeProductId);
      if (!exists) {
        setActiveProductId(filteredProducts[0].id);
      }
    }
  }, [searchTerm, selectedTag, filteredProducts, activeProductId]);

  const activeProduct = productsList.find((p) => p.id === activeProductId) || productsList[0];
  const activeProductSpec = PRODUCT_SPECS[activeProduct.id] || {
    moisture: { en: "11.0%", hi: "11.0%", gu: "11.0%" },
    purity: { en: "99.8%", hi: "99.8%", gu: "99.8%" },
    foreignMatter: { en: "0.05%", hi: "0.05%", gu: "0.05%" },
    cultivation: { en: "Local Mandis", hi: "स्थानीय मंडी", gu: "સ્થાનિક મંડીઓ" },
    gradeBadge: { en: "Grade A", hi: "ग्रेड ए", gu: "શ્રેણી એ" },
    recipe: { en: "Indian Dishes", hi: "भारतीय व्यंजन", gu: "વાનગીઓ" },
    highlights: { en: ["Premium Quality"], hi: ["प्रीमियम गुणवत्ता"], gu: ["શ્રેષ્ઠ ગુણવત્તા"] }
  };

  return (
    <section id="products" className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      {/* Decorative background vectors representing soil layers and seeds */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/[0.02] rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-green-mid/[0.02] rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block with luxurious spacing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-[#1d4d33]/5 border border-[#1d4d33]/10 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green-dark animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-green-light font-bold">
                {sectionSubtitle}
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-serif text-brand-green-dark tracking-tight font-black leading-tight max-w-2xl">
              {sectionTitle}
            </h2>
            
            <p className="text-zinc-600 text-sm sm:text-base font-sans max-w-2xl leading-relaxed">
              {sectionContent}
            </p>
          </div>

          <div className="space-y-4 w-full max-w-md">
            {/* View Mode Toggle Controls */}
            <div className="flex items-center justify-between gap-1 p-1 bg-zinc-200/50 border border-zinc-300/30 rounded-xl">
              <button
                onClick={() => setViewMode("detail")}
                className={`flex-1 py-2 px-2.5 rounded-lg text-[11px] sm:text-xs font-sans font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  viewMode === "detail"
                    ? "bg-[#092215] text-[#f4d068] shadow-md"
                    : "text-zinc-600 hover:text-[#092215]"
                }`}
              >
                🌾 <span>{localize({ en: "Detail View", hi: "विस्तृत दृश्य", gu: "ઇન્ટરેક્ટિવ" })}</span>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex-1 py-2 px-2.5 rounded-lg text-[11px] sm:text-xs font-sans font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  viewMode === "list"
                    ? "bg-[#092215] text-[#f4d068] shadow-md"
                    : "text-zinc-600 hover:text-[#092215]"
                }`}
              >
                📋 <span>{localize({ en: "List View", hi: "सूची दृश्य", gu: "યાદી વ્યુ" })}</span>
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`flex-1 py-2 px-2.5 rounded-lg text-[11px] sm:text-xs font-sans font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  viewMode === "card"
                    ? "bg-[#092215] text-[#f4d068] shadow-md"
                    : "text-zinc-600 hover:text-[#092215]"
                }`}
              >
                📱 <span>{localize({ en: "Card View", hi: "कार्ड व्यू", gu: "ગ્રીડ વ્યુ" })}</span>
              </button>
            </div>

            {/* Search Input bar */}
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-4.5 h-4.5 pointer-events-none" />
              <input
                type="text"
                placeholder={localize({
                  en: "Refine by name (e.g. Toor, Moong)...",
                  hi: "तूर, चना, मूंग खोजें...",
                  gu: "તુવેર દાળ, ચણા વગેરે શોધખોળ કરો..."
                })}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white text-zinc-900 rounded-xl pl-11 pr-4 py-3 placeholder-zinc-400 border border-zinc-250 focus:border-[#092215] outline-none transition-all shadow-sm font-sans text-xs"
              />
            </div>
          </div>
        </div>

        {/* Tag Filters list with Premium styling */}
        <div className="flex flex-wrap gap-2 mb-12 items-center">
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 uppercase tracking-widest mr-3 font-bold">
            <Filter size={13} />
            {localize({ en: "Filter portfolio:", hi: "पोर्टफोलियो फ़िल्टर:", gu: "પોર્ટફોલિયો ફિલ્ટર:" })}
          </span>
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                selectedTag === tag
                  ? "bg-[#092215] text-[#f4d068] shadow-md shadow-brand-green-dark/10 ring-1 ring-[#f4d068]/20"
                  : "bg-white text-zinc-600 border border-zinc-200/80 hover:bg-zinc-155"
              }`}
            >
              {getLocalizedTagName(tag)}
            </button>
          ))}
        </div>

        {/* Dynamic Display Render */}
        {filteredProducts.length > 0 ? (
          <div>
            {viewMode === "detail" && (
              /* INTERACTIVE SPOTLIGHT ATELIER: High contrast, dark forest presentation */
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-[#092215] text-white rounded-[2.5rem] border border-[#1d4d33]/40 overflow-hidden shadow-[0_30px_75px_rgba(9,34,21,0.22)] relative"
              >
                {/* Dynamic back glowing backdrop matching the pulse category */}
                <div className={`absolute top-0 right-0 w-[450px] h-[450px] rounded-full blur-[130px] pointer-events-none -z-10 opacity-30 transition-all duration-1000 ${
                  activeProduct.id === "chana-dal" || activeProduct.id === "moong-dal" ? "bg-amber-400/30" :
                  activeProduct.id === "toor-dal" ? "bg-yellow-500/25" :
                  activeProduct.id === "masoor-dal" ? "bg-rose-500/30" :
                  activeProduct.id === "urad-whole" ? "bg-purple-500/15" : "bg-emerald-500/30"
                }`} />

                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] divide-y lg:divide-y-0 lg:divide-x divide-[#1d4d33]/30">
                  
                  {/* Left block (7 cols): Studio showcase presentation */}
                  <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8 relative">
                    
                    {/* Header Spec Tag */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                        <span className="text-[10px] font-mono font-bold tracking-widest text-[#f4d068] uppercase">
                          {localize({ en: "CROP LABORATORY SPECIFICATION", hi: "फसल प्रयोगशाला विशिष्टता", gu: "પાકની પ્રયોગશાળા વિશ્લેષણ" })}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-400 bg-emerald-950/70 px-3 py-1.5 rounded-full border border-emerald-800/25 uppercase">
                        {localize(activeProductSpec.gradeBadge)}
                      </span>
                    </div>

                    {/* Master Animated cross fade */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeProduct.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                      >
                        {/* Luxury Frame Sourced Photo */}
                        <div className="md:col-span-5 relative group">
                          <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:scale-102 duration-300 transition-all pointer-events-none z-10" />
                          <div className="absolute -inset-1 bg-gradient-to-tr from-[#f4d068]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />
                          
                          <div className="w-full h-56 md:h-64 rounded-2xl overflow-hidden border border-[#1d4d33]/50 shadow-2xl bg-zinc-900 group-hover:shadow-[#f4d068]/5 transition-all duration-500">
                            <img
                              src={getProductImage(activeProduct.id)}
                              alt={activeProduct.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = '/products/chana-dal-whole.jpg';
                              }}
                            />
                          </div>
                        </div>

                        {/* Specs overview details */}
                        <div className="md:col-span-7 space-y-4">
                          <div className="space-y-1">
                            <h3 className="text-2xl sm:text-4xl font-serif text-white font-bold tracking-tight">
                              {getLocalizedProductName(activeProduct)}
                            </h3>
                            <p className="text-lg font-mono text-[#f4d068]/90 font-black tracking-wide pl-0.5">
                              {activeProduct.hindiName}
                            </p>
                          </div>

                          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans font-normal">
                            {getLocalizedProductDesc(activeProduct)}
                          </p>

                          {/* Dials / stats bar visualization for extreme style */}
                          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                            <div>
                              <span className="text-[9px] font-mono tracking-widest text-[#f4d068] uppercase block">
                                🥣 {localize({ en: "Purity Index", hi: "सटीक शुद्धता", gu: "શુદ્ધતા પ્રમાણપત્ર" })}
                              </span>
                              <span className="text-lg font-bold text-white font-serif tracking-tight mt-0.5 block">
                                {localize(activeProductSpec.purity)}
                              </span>
                              <div className="w-full bg-[#1d4d33] h-1.5 rounded-full mt-1.5 overflow-hidden">
                                <div className="bg-emerald-400 h-full rounded-full" style={{ width: "95%" }}></div>
                              </div>
                            </div>
                            
                            <div>
                              <span className="text-[9px] font-mono tracking-widest text-[#f4d068] uppercase block">
                                💧 {localize({ en: "Moisture Cap", hi: "नमी सीमा", gu: "નમીનું પ્રમાણ" })}
                              </span>
                              <span className="text-lg font-bold text-white font-serif tracking-tight mt-0.5 block">
                                {localize(activeProductSpec.moisture)}
                              </span>
                              <div className="w-full bg-[#1d4d33] h-1.5 rounded-full mt-1.5 overflow-hidden">
                                <div className="bg-blue-400 h-full rounded-full" style={{ width: "80%" }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Sourcing details & inquiry */}
                    <div className="pt-6 border-t border-[#1d4d33]/30 flex flex-wrap items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">
                          {localize({ en: "SOIL ORIGIN & CULTIVATION", hi: "कृषि भूमि और खेती", gu: "ઉત્પત્તિ અને ખેતી" })}
                        </span>
                        <span className="text-xs font-bold text-white font-sans flex items-center gap-1.5">
                          📍 {localize(activeProductSpec.cultivation)}
                        </span>
                      </div>

                      <button
                        onClick={() => onInquireProduct(getLocalizedProductName(activeProduct))}
                        className="bg-[#f4d068] hover:bg-white text-zinc-900 px-6 py-3 rounded-xl font-bold tracking-wide text-xs sm:text-sm font-sans flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-white/10 group active:scale-95"
                      >
                        <span>{localize({ en: "Send Sourcing Inquiry", hi: "व्यावसायिक पूछताछ भेजें", gu: "વેપાર વિશિષ્ટ પૂછપરછ મોકલો" })}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>

                  </div>

                  {/* Right block (5 cols): Interactive selectors sidebar */}
                  <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#06180f]">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 uppercase">
                          {localize({ en: "SELECT CROP SHOWCASE", hi: "उत्पाद का चयन करें", gu: "પાક કલેક્શન" })}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800/10">
                          {filteredProducts.length} {localize({ en: "ITEMS MATCHED", hi: "उत्पाद", gu: "પાક હાજર" })}
                        </span>
                      </div>

                      {/* Selector Scrollbar list */}
                      <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-brand-green-mid">
                        {filteredProducts.map((prod) => {
                          const isSelected = prod.id === activeProductId;
                          return (
                            <button
                              key={prod.id}
                              onClick={() => setActiveProductId(prod.id)}
                              className={`w-full text-left p-3.5 rounded-xl transition-all relative flex items-center justify-between border cursor-pointer ${
                                isSelected
                                  ? "bg-[#103020] border-[#f4d068]/30 font-bold shadow-md shadow-black/10"
                                  : "bg-[#092215]/80 border-transparent hover:bg-[#103020]/40 hover:border-white/5"
                              }`}
                            >
                              {isSelected && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#f4d068] rounded-l-xl" />
                              )}

                              <div className="space-y-1 pl-1.5">
                                <p className={`text-sm tracking-tight leading-none ${isSelected ? "text-[#f4d068]" : "text-white group-hover:text-[#f4d068]"}`}>
                                  {getLocalizedProductName(prod)}
                                </p>
                                <p className="text-[10px] font-mono text-zinc-400">
                                  {prod.hindiName} • {localize(PRODUCT_SPECS[prod.id]?.gradeBadge || { en: "Grade A", hi: "ग्रेड ए", gu: "શ્રેણી એ" })}
                                </p>
                              </div>

                              <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                                isSelected ? "text-[#f4d068] translate-x-0.5" : "text-zinc-550"
                              }`} />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bg-[#092215] border border-[#1d4d33]/20 p-4 rounded-xl">
                      <p className="text-[11px] font-mono text-zinc-400 leading-relaxed text-center">
                        🔒 {localize({
                          en: "ISO 9001:2015 & HACCP certified grading ensure absolute zero dye-polish and perfect hygiene limits.",
                          hi: "आईएसओ 9001:2015 और एचएसीसीपी प्रमाणित ग्रेडिंग पूर्ण शून्य-डाई पॉलिश सुनिश्चित करती है।",
                          gu: "ISO પ્રમાણપત્ર અને ગુણવત્તા વિશ્લેષણ સાથે ઓર્ગેનિક ગ્રેડિંગ સિસ્ટમ."
                        })}
                      </p>
                    </div>

                  </div>

                </div>
              </motion.div>
            )}

            {viewMode === "list" && (
              /* PROFESSIONAL HIGH-DENSITY COMMERCIAL LIST VIEW */
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {filteredProducts.map((prod, index) => {
                  const spec = PRODUCT_SPECS[prod.id] || {
                    moisture: { en: "11.0%", hi: "11.0%", gu: "11.0%" },
                    purity: { en: "99.8%", hi: "99.8%", gu: "99.8%" },
                    gradeBadge: { en: "Grade A", hi: "ग्रेड ए", gu: "શ્રેણી એ" },
                    recipe: { en: "Indian Cooking", hi: "भारतीय रसोई", gu: "દેશી રસોઈ" },
                  };

                  return (
                    <motion.div
                      key={prod.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className={`bg-white rounded-2xl border border-zinc-200 border-l-4 ${index % 2 === 0 ? "border-l-brand-green-mid" : "border-l-[#f4d068]"} p-5 flex flex-col lg:flex-row items-center justify-between gap-6 hover:shadow-md hover:border-[#1d4d33]/20 hover:-translate-y-1 transition-all duration-300`}
                    >
                      {/* Product identity */}
                      <div className="flex items-center gap-5 w-full lg:w-1/3">
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-zinc-150">
                          <img 
                            src={getProductImage(prod.id)} 
                            alt={prod.name} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = '/products/chana-dal-whole.jpg';
                            }}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                              {prod.type}
                            </span>
                            <span className="text-[9px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded uppercase">
                              {localize(spec.gradeBadge)}
                            </span>
                          </div>
                          <h4 className="text-lg font-serif font-black text-brand-green-dark mt-1 leading-tight">
                            {getLocalizedProductName(prod)}
                          </h4>
                          <p className="text-xs text-zinc-400 font-mono font-bold">
                            {prod.hindiName}
                          </p>
                        </div>
                      </div>

                      {/* Specs and details */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full lg:w-1/2 text-left">
                        <div>
                          <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                            {localize({ en: "Purity standard:", hi: "शुद्धता मानक:", gu: "શુદ્ધતા ધોરણ:" })}
                          </span>
                          <span className="text-xs font-bold text-[#1d4d33] font-sans block mt-0.5">
                            ✓ {localize(spec.purity)}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                            {localize({ en: "Moisture Cap:", hi: "नमी सीमा:", gu: "નમી મર્યાદા:" })}
                          </span>
                          <span className="text-xs font-bold text-zinc-800 font-sans block mt-0.5">
                            {localize(spec.moisture)}
                          </span>
                        </div>
                        <div className="col-span-2 sm:col-span-1 space-y-1">
                          <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                            {localize({ en: "Core Nutrient", hi: "मुख्य पोषक", gu: "પોષકતત્વો" })}:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {prod.nutrients.slice(0, 2).map((n, i) => (
                              <span
                                key={i}
                                className="text-[9px] font-sans font-bold text-zinc-650 bg-zinc-50 border border-zinc-200/60 px-1.5 py-0.5 rounded"
                              >
                                {getLocalizedNutrient(n)}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-3 w-full lg:w-auto lg:justify-end shrink-0">
                        <button
                          onClick={() => {
                            setViewMode("detail");
                            setActiveProductId(prod.id);
                          }}
                          className="flex-1 lg:flex-none border border-zinc-250 hover:bg-zinc-50 text-zinc-700 font-sans font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap text-center"
                        >
                          {localize({ en: "View Specifications", hi: "विवरण देखें", gu: "વિગત જુઓ" })}
                        </button>
                        <button
                          onClick={() => onInquireProduct(getLocalizedProductName(prod))}
                          className="flex-1 lg:flex-none bg-[#f4d068] hover:bg-[#092215] hover:text-white text-zinc-950 font-sans font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap text-center shadow-xs"
                        >
                          {localize({ en: "Send Inquiry", hi: "पूछताछ भेजें", gu: "ઇન્ક્વાયરી" })}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {viewMode === "card" && (
              /* MASTERPIECE CURATED GRID: Clean, ultra-stylish, warm luxury linen cards */
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProducts.map((prod, index) => {
                  const numStr = String(index + 1).padStart(2, "0");
                  const spec = PRODUCT_SPECS[prod.id] || {
                    moisture: { en: "11.0%", hi: "11.0%", gu: "11.0%" },
                    purity: { en: "99.8%", hi: "99.8%", gu: "99.8%" },
                    gradeBadge: { en: "Grade A", hi: "ग्रेड ए", gu: "શ્રેણી એ" },
                    recipe: { en: "Indian Cooking", hi: "भारतीय रसोई", gu: "દેશી રસોઈ" },
                    highlights: { en: ["Premium Crop"], hi: ["उत्कृष्ट फसल"], gu: ["ઉત્તમ પાક"] }
                  };

                  return (
                    <motion.div
                      key={prod.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className={`group bg-white rounded-3xl border border-amber-500/10 border-l-4 ${index % 2 === 0 ? "border-l-brand-green-mid" : "border-l-[#f4d068]"} transition-all duration-500 shadow-sm hover:shadow-[0_20px_50px_rgba(9,34,21,0.04)] hover:-translate-y-2 overflow-hidden flex flex-col justify-between relative`}
                    >
                      {/* Watermarked luxury number monogram */}
                      <span className="absolute top-4 right-6 text-7xl font-serif font-black text-amber-500/[0.03] select-none pointer-events-none group-hover:scale-110 duration-500 transition-transform">
                        {numStr}
                      </span>

                      <div className="p-7 space-y-6">
                        {/* Top layout line */}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono tracking-widest text-[#1d4d33] font-black uppercase">
                            {prod.type}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/50 uppercase">
                            {localize(spec.gradeBadge)}
                          </span>
                        </div>

                        {/* Title and descriptions in elegant sizing */}
                        <div className="space-y-2.5">
                          <h3 className="text-2xl font-serif text-brand-green-dark uppercase font-black leading-tight group-hover:text-[#1d4d33] transition-colors">
                            {getLocalizedProductName(prod)}
                          </h3>
                          <p className="text-zinc-400 font-mono text-xs font-black">
                            {prod.hindiName}
                          </p>
                          <p className="text-xs text-zinc-600 leading-relaxed font-sans font-medium line-clamp-3">
                            {getLocalizedProductDesc(prod)}
                          </p>
                        </div>

                        {/* Detailed specs quick grid for industrial aesthetic */}
                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-100/80">
                          <div className="space-y-0.5">
                            <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block">
                              {localize({ en: "Moisture Cap:", hi: "नमी सीमा:", gu: "નમી મર્યાદા:" })}
                            </span>
                            <span className="text-xs font-bold text-zinc-800 font-sans block">
                              {localize(spec.moisture)}
                            </span>
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-[9px] font-mono text-[#1d4d33]/80 uppercase tracking-wider block font-bold">
                              {localize({ en: "Purity standard:", hi: "शुद्धता मानक:", gu: "શુદ્ધતા ધોરણ:" })}
                            </span>
                            <span className="text-xs font-bold text-[#1d4d33] font-sans block">
                              ✓ {localize(spec.purity)}
                            </span>
                          </div>
                        </div>

                        {/* Nutrient Pills */}
                        <div className="space-y-2 pt-1">
                          <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                            {localize({ en: "Core Nutrient Assets", hi: "पोषक तत्व मूल्य", gu: "મુખ્ય પોષકતત્વો" })}
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {prod.nutrients.map((n, i) => (
                              <span
                                key={i}
                                className="text-[9px] font-sans font-bold text-zinc-700 bg-zinc-50 border border-zinc-200/60 px-2 py-0.5 rounded"
                              >
                                {getLocalizedNutrient(n)}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Photo base with rise-up overlay details */}
                      <div className="relative h-44 overflow-hidden border-t border-zinc-100 select-none">
                        <img 
                          src={getProductImage(prod.id)} 
                          alt={prod.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Smooth bottom floating shade */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent flex items-end justify-between p-4">
                          <span className="text-[10px] font-mono text-zinc-205 font-bold text-white max-w-[70%] truncate">
                            🍽️ {localize(spec.recipe)}
                          </span>
                          
                          <button
                            onClick={() => onInquireProduct(getLocalizedProductName(prod))}
                            aria-label={`Inquire about ${prod.name}`}
                            className="bg-[#f4d068] hover:bg-white text-zinc-900 rounded-full w-9 h-9 flex items-center justify-center transition-all shadow-md cursor-pointer font-extrabold text-sm active:scale-90"
                            title={localize({ en: "Request specific certificate", hi: "विशेष विनिर्देश की जांच करें", gu: "ઇન્ક્વાયરી કરો" })}
                          >
                            →
                          </button>
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>
        ) : (
          /* Empty Search Fallback */
          <div className="text-center p-16 bg-white rounded-3xl border border-zinc-200/50 shadow-inner">
            <p className="text-zinc-500 font-sans text-sm">
              {localize({
                en: "No products matched your exact search or filter selection.",
                hi: "कोई भी उत्पाद आपकी खोज अथवा फ़िल्टर मानदंडों से मेल नहीं खाता।",
                gu: "કોઈપણ પ્રોડક્ટ તમારી શોધ અથવા ફિલ્ટર સાથે મેળ ખાતી નથી."
              })}
            </p>
            <button
              onClick={() => { setSearchTerm(""); setSelectedTag("All"); }}
              className="mt-4 text-brand-green-light hover:text-brand-green-dark font-extrabold font-mono text-xs underline cursor-pointer"
            >
              {localize({ en: "Clear search filters", hi: "खोज फ़िल्टर साफ करें", gu: "બધા ફિલ્ટર દુર કરો" })}
            </button>
          </div>
        )}

        {/* Small General Note */}
        <div className="mt-16 text-center max-w-2xl mx-auto text-xs text-zinc-500 font-sans leading-relaxed font-semibold">
          {localize({
            en: "*Beyond pulses, Punitdhan Pulses Limited actively manufactures and trades Wheat Grains, Mustard Seeds, Rice crops, and pure Mustard Oil. Sourcing is handled direct from local grower mandis to bypass secondary aggregators, returning benefits to fields.",
            hi: "*दालों के अलावा, पुनीतधन पल्सेस लिमिटेड गेहूं, सरसों के बीज, धान और शुद्ध सरसों के तेल का सक्रिय रूप से उत्पादन और व्यापार करता है। सीधे स्थानीय फसल मंडियों से खरीद की जाती है ताकि बिचौलियों को बाईपास किया जा सके।",
            gu: "*દાળ ઉપરાંત, પુનીતધન પલ્સિસ લિમિટેડ ઘઉં, રાયડો, ડાંગર અને શુદ્ધ રાઈના તેલનું ઉત્પાદન અને વેપાર કરે છે. સીધી ખેડૂત પ્રોડ્યુસર મંડળીઓ મારફતે જ સોર્સિંગ થાય છે."
          })}
        </div>

      </div>
    </section>
  );
}
