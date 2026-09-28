import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "hi" | "gu";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  localize: (translations: { en: string; hi?: string; gu?: string }) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// Core translation dictionary for common UI buttons, headers, and section links
const dictionary: Record<string, Record<Language, string>> = {
  home: {
    en: "Home",
    hi: "मुख्य पृष्ठ",
    gu: "હોમ"
  },
  aboutUs: {
    en: "About Us",
    hi: "हमारे बारे में",
    gu: "અમારા વિશે"
  },
  coreValues: {
    en: "Core Values",
    hi: "मूल सिद्धांत",
    gu: "આદર્શ મૂલ્યો"
  },
  leaders: {
    en: "Leaders",
    hi: "नेतृत्व",
    gu: "નેતૃત્વ"
  },
  services: {
    en: "Services",
    hi: "सेवाएं",
    gu: "સેવાઓ"
  },
  products: {
    en: "Products",
    hi: "हमारे उत्पाद",
    gu: "અમારા ઉત્પાદનો"
  },
  compliance: {
    en: "Compliance",
    hi: "वैधानिक अनुपालन",
    gu: "વૈધાનિક પાલન"
  },
  certifications: {
    en: "Certifications",
    hi: "प्रमाणपत्र",
    gu: "પ્રમાણપત્રો"
  },
  strengths: {
    en: "Our Strengths",
    hi: "हमारी ताकत",
    gu: "અમારી શક્તિઓ"
  },
  operations: {
    en: "Operations",
    hi: "संचालन",
    gu: "સંચાલન"
  },
  getInTouch: {
    en: "Connect us",
    hi: "हमसे जुड़ें",
    gu: "અમારી સાથે જોડાઓ"
  },
  yearsHeritage: {
    en: "Years of Heritage",
    hi: "वर्षों की विरासत",
    gu: "વર્ષોનો વારસો"
  },
  dailyCapacity: {
    en: "Daily Processing Capacity",
    hi: "दैनिक प्रसंस्करण क्षमता",
    gu: "દૈનિક પ્રોસેસિંગ ક્ષમતા"
  },
  annualVolume: {
    en: "Annual Volume of Pulses",
    hi: "दालों की वार्षिक मात्रा",
    gu: "દાળનો વાર્ષિક જથ્થો"
  },
  lorriesDispatched: {
    en: "Lorries Dispatched Annually",
    hi: "वार्षिक प्रेषित ट्रक",
    gu: "વાર્ષિક રવાના કરાયેલા ટ્રકો"
  },
  traceableSourcing: {
    en: "Traceable Local Sourcing",
    hi: "ट्रेस करने योग्य स्थानीय सोर्सिंग",
    gu: "ટ્રેસેબલ સ્થાનિક સોર્સિંગ"
  },
  diligentEmployees: {
    en: "Highly Diligent Employees",
    hi: "अत्यधिक मेहनती कर्मचारी",
    gu: "ખૂબ જ મહેનતુ કર્મચારીઓ"
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Read initial language from localStorage if available
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("punitdhan_lang");
    if (saved === "hi" || saved === "gu" || saved === "en") {
      return saved;
    }
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("punitdhan_lang", lang);
  };

  // Helper to translate common keys
  const t = (key: string): string => {
    if (dictionary[key]) {
      return dictionary[key][language] || dictionary[key]["en"];
    }
    return key;
  };

  // Inline localization helper
  const localize = (translations: { en: string; hi?: string; gu?: string }): string => {
    return translations[language] || translations["hi"] || translations["gu"] || translations["en"];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, localize }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
