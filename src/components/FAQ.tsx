import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle, CheckCircle } from "./HandDrawnIcons";
import { useLanguage } from "../context/LanguageContext";

interface FAQItem {
  id: string;
  question: { en: string; hi: string; gu: string };
  answer: { en: string; hi: string; gu: string };
}

interface Category {
  id: string;
  name: { en: string; hi: string; gu: string };
  faqs: FAQItem[];
}

export default function FAQ() {
  const { localize } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("agribusiness");
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>("agri-1");

  const categories: Category[] = [
    {
      id: "agribusiness",
      name: {
        en: "Agribusiness Company",
        hi: "कृषि व्यवसाय कंपनी",
        gu: "એગ્રીબિઝનેસ કંપની"
      },
      faqs: [
        {
          id: "agri-1",
          question: {
            en: "What foods are processed and supplied by Punitdhan?",
            hi: "पुनीतधन द्वारा किन खाद्य पदार्थों का प्रसंस्करण और आपूर्ति की जाती है?",
            gu: "પુનીતધન દ્વારા કઈ ખાદ્ય સામગ્રીઓનું પ્રોસેસિંગ અને સપ્લાય કરવામાં આવે છે?"
          },
          answer: {
            en: "Punitdhan specializes in premium pulses (Chana, Toor, Moong, Masoor, Urad), high-nutrition wheat grains, mustard oil, and rice crops. We provide high-standard food security solutions to institutional buyers, defense supplies, and large-scale wholesalers across India.",
            hi: "पुनीतधन प्रीमियम दालों (चना, तूर, मूंग, मसूर, उड़द), उच्च पोषण वाले गेहूं के अनाज, सरसों के तेल और चावल की फसलों में विशेषज्ञता रखता है। हम पूरे भारत में संस्थागत खरीदारों, रक्षा आपूर्ति और बड़े पैमाने पर थोक विक्रेताओं के लिए उच्च मानक खाद्य सुरक्षा समाधान प्रदान करते हैं।",
            gu: "પુનીતધન પ્રીમિયમ કઠોળ (ચણા, તુવેર, મગ, મસૂર, અડદ), ઉચ્ચ પોષણ ધરાવતા ઘઉં, સરસવનું તેલ અને ચોખાના પાકોના પ્રોસેસિંગમાં નિપુણતા ધરાવે છે. અમે ભારતમાં સંસ્થાકીય ખરીદદારો, સંરક્ષણ સપ્લાય અને મોટા જથ્થાબંધ વેપારીઓ માટે ઉચ્ચ કક્ષાના ખાદ્ય સુરક્ષા ઉકેલો પૂરા પાડીએ છીએ."
          }
        },
        {
          id: "agri-2",
          question: {
            en: "What should I do if I am allergic to certain grains?",
            hi: "यदि मुझे कुछ विशेष अनाजों से एलर्जी हो तो मुझे क्या करना चाहिए?",
            gu: "જો મને અમુક અનાજોથી એલર્જી હોય તો મારે શું કરવું જોઈએ?"
          },
          answer: {
            en: "All Punitdhan products are thoroughly cleaned, pre-graded, and sorted to eliminate cross-contamination. However, clients requiring strict allergen isolation certifications (such as pure gluten-free batches) should notify our team ahead in their custom sourcing request so we can dedicate isolated processing structures.",
            hi: "क्रॉस-संदूषण को समाप्त करने के लिए सभी पुनीतधन उत्पादों को पूरी तरह से साफ, पूर्व-वर्गीकृत और सॉर्ट किया जाता है। हालांकि, कड़ाई से एलर्जी-मुक्त प्रमाणन की आवश्यकता वाले ग्राहकों को अपनी सोर्सिंग पूछताछ में अग्रिम रूप से सूचित करना चाहिए ताकि हम समर्पित प्रसंस्करण इकाइयां आवंटित कर सकें।",
            gu: "ક્રોસ-પ્રદૂષણ ટાળવા માટે તમામ પુનીતધન ઉત્પાદનો સંપૂર્ણ સાફ, તારવેલા અને ગ્રેડિંગ કરેલા હોય છે. તેમ છતાં, ગ્લુટેન-મુક્ત કે એલર્જન-મુક્ત બેચના ચોક્કસ પ્રમાણપત્રની જરૂરિયાત ધરાવતા ગ્રાહકોએ અગાઉથી પૂછપરછમાં જણાવવું જોઈએ જેથી અલગ પ્રોસેસિંગ લાઇન ફાળવી શકાય."
          }
        },
        {
          id: "agri-3",
          question: {
            en: "What are your core corporate standards and certifications?",
            hi: "आपके मुख्य कॉर्पोरेट मानक और प्रमाणपत्र क्या हैं?",
            gu: "તમારા મુખ્ય કોર્પોરેટ ધોરણો અને પ્રમાણપત્રો કયા છે?"
          },
          answer: {
            en: "Punitdhan Pulses Limited is fully registered with FSSAI and maintains certified processes under ISO 9001:2015 for quality management, alongside ISO 22000 for standard food safety. We adhere to the highest standards of corporate governance, transparency, and modern laboratory testing.",
            hi: "पुनीतधन पल्सेस लिमिटेड खाद्य सुरक्षा नियामक FSSAI के साथ पूरी तरह से पंजीकृत है और गुणवत्ता प्रबंधन के लिए ISO 9001:2015 तथा सुरक्षित खाद्य सुरक्षा के लिए ISO 22000 प्रमाणित प्रक्रियाओं को बनाए रखता है। हम कॉर्पोरेट नैतिक शासन, पारदर्शिता और आधुनिक प्रयोगशाला परीक्षणों के उच्चतम मानदंडों का पालन करते हैं।",
            gu: "પુનીતધન પલ્સ લિમિટેડ FSSAI સાથે સંપૂર્ણપણે નોંધાયેલ છે અને ગુણવત્તા સંચાલન માટે ISO 9001:2015 તેમજ ખાદ્ય સુરક્ષા ધોરણો માટે ISO 22000 પ્રમાણપત્રો ધરાવે છે. અમે કોર્પોરેટ ગવર્નન્સ, પારદર્શિતા અને આધુનિક લેબોરેટરી ટેસ્ટિંગના ઉચ્ચતમ ધોરણોને અનુસરીએ છીએ."
          }
        },
        {
          id: "agri-4",
          question: {
            en: "How can corporate partners request custom pricing tiers?",
            hi: "कॉर्पोरेट भागीदार कस्टम मूल्य स्लैब का अनुरोध कैसे कर सकते हैं?",
            gu: "કોર્પોરેટ ભાગીદારો કસ્ટમ ભાવોના સ્લેબ માટે કેવી રીતે વિનંતી કરી શકે છે?"
          },
          answer: {
            en: "Corporate agents and institutional food panels can input their customized requirements directly inside our bottom RFQ inquiry wizard, specifying target metric tons, moisture ratings, and delivery destination. Our dedicated corporate desk forwards a official quotation sheet in under 12 hours.",
            hi: "कॉर्पोरेट एजेंट और संस्थागत खाद्य पैनल हमारे निचले आरएफक्यू पूछताछ विजार्ड में सीधे अपनी अनुकूलित आवश्यकताओं को दर्ज कर सकते हैं, जिसमें लक्षित मीट्रिक टन, नमी रेटिंग और वितरण स्थान शामिल हैं। हमारा समर्पित कॉर्पोरेट डेस्क 12 घंटे से कम समय में आधिकारिक कोटेशन शीट भेजता है।",
            gu: "કોર્પોરેટ એજન્ટો અને સંસ્થાઓ તેમના લક્ષ્ય મેટ્રિક ટન, ભેજ ગુણવત્તા અને ડિલિવરી સરનામાંની વિગતો ફુટરમાં આપેલા RFQ વિઝાર્ડમાં સીધી દાખલ કરી શકે છે. અમારી સમર્પિત ટીમ 12 કલાકની અંદર સત્તાવાર ભાવ પત્રક મોકલી આપશે."
          }
        }
      ]
    },
    {
      id: "cultivation",
      name: {
        en: "Cultivation Actors",
        hi: "खेती के भागीदार",
        gu: "ખેતીના ભાગીદારો"
      },
      faqs: [
        {
          id: "culti-1",
          question: {
            en: "How does Punitdhan support local farmer networks?",
            hi: "पुनीतधन स्थानीय किसान नेटवर्क का समर्थन कैसे करता है?",
            gu: "પુનીતધન સ્થાનિક ખેડૂત નેટવર્કને કેવી રીતે વેગ આપે છે?"
          },
          answer: {
            en: "By establishing direct sourcing checkpoints located right across agricultural mandis in Gujarat, Madhya Pradesh, and Rajasthan, Punitdhan bypasses intermediary dealer commission rates. This ensures that growers receive fair and maximized payment rates instantly.",
            hi: "गुजरात, मध्य प्रदेश और राजस्थान की कृषि मंडियों में सीधे सोर्सिंग चेकपॉइंट स्थापित करके, पुनीतधन बिचौलियों के कमीशन को पूरी तरह समाप्त कर देता है। यह सुनिश्चित करता है कि उत्पादकों को उनके काम का उचित और अधिकतम मूल्य तुरंत मिले।",
            gu: "ગુજરાત, મધ્ય પ્રદેશ અને રાજસ્થાનની કૃષિ મંડીઓમાં સીધા જ ચેકપોઇન્ટો સ્થાપીને, પુનીતધન વચેટિયાઓના કમિશન નાબૂદ કરે છે. આનાથી પાક પકવનાર ખેડૂતોને તેમના પાકના પૂરેપૂરા અને મહત્તમ ભાવો સીધા અને તુરંત મળે છે."
          }
        },
        {
          id: "culti-2",
          question: {
            en: "What standard moisture and quality indices are required?",
            hi: "सामान्यतः कितनी नमी और क्या गुणवत्ता मानक आवश्यक हैं?",
            gu: "સામાન્ય રીતે કેટલા ભેજ અને ગુણવત્તાના ધોરણો જરૂરી હોય છે?"
          },
          answer: {
            en: "We focus on a standard harvest moisture rating between 10% to 12% to guarantee longevity without quality degradation. Grains must be visual-defect free and harvested using sustainable agricultural techniques. Our regional experts provide help in grading crops prior to mandi auctions.",
            hi: "हम बिना किसी गिरावट के अनाज की लंबी उम्र सुनिश्चित करने के लिए 10% से 12% के मानक नमी रेटिंग पर ध्यान केंद्रित करते हैं। अनाज दृश्य-त्रुटियों से मुक्त होना चाहिए और टिकाऊ तरीकों से काटा जाना चाहिए। हमारे क्षेत्रीय प्रतिनिधि नीलामी से पहले ग्रेडिंग में सहायता करते हैं।",
            gu: "અમે ગુણવત્તા બગડ્યા વિના લાલાશ જાળવવા માટે 10% થી 12% ના ભેજ દર પર ધ્યાન કેન્દ્રિત કરીએ છીએ. અનાજ દેખીબા ખામીઓ વગરનું અને કુદરતી પદ્ધતિઓથી લણેલું હોવું જોઈએ. અમારા સ્થાનિક પ્રતિનિધિઓ હરાજી પહેલાં ગ્રેડિંગમાં સહાય કરે છે."
          }
        },
        {
          id: "culti-3",
          question: {
            en: "How are regional crop collections synchronized safely?",
            hi: "क्षेत्रीय फसल संग्रहों को सुरक्षित रूप से कैसे समतुल्य किया जाता है?",
            gu: "પ્રાદેશિક પાક સંગ્રહોનું સંચાલન કેવી રીતે સુરક્ષિત રીતે કરવામાં આવે છે?"
          },
          answer: {
            en: "Our central logistics platform connects direct collection points with our high-capacity processing hubs. This real-time visibility lets us align dispatch timing, minimize warehousing backlogs, and preserve freshness directly from the fields to the optical color sorting refining lines.",
            hi: "हमारा केंद्रीय रसद मंच सभी सीधे संग्रह केंद्रों को मुख्य प्रसंस्करण संयंत्रों से जोड़ता है। वास्तविक समय की यह स्पष्टता हमें प्रेषण समय को ठीक करने, भंडारण की समस्या को कम करने और सीधे खेतों की ताजगी को बनाए रखने में सक्षम बनाती है।",
            gu: "અમારું કેન્દ્રીય લોજિસ્ટિક્સ પ્લેટફોર્મ દરેક કલેક્શન કેન્દ્રોને મુખ્ય પ્રોસેસિંગ હબ સાથે જોડે છે. આને લીધે પાકની હેરફેરનો સમય યોગ્ય બને છે, સંગ્રહ સમય ઘટે છે અને પાકની તાજગી ઓપ્ટિકલ કલર સોર્ટિંગ રિફાઇનિંગ લાઇન સુધી જળવાઈ રહે છે."
          }
        }
      ]
    },
    {
      id: "assistant",
      name: {
        en: "Field Assistant",
        hi: "क्षेत्र सहायक",
        gu: "ક્ષેત્ર સહાયક"
      },
      faqs: [
        {
          id: "field-1",
          question: {
            en: "What assistance is provided to local operators and supervisors?",
            hi: "स्थानीय ऑपरेटरों और पर्यवेक्षकों को क्या सहायता प्रदान की जाती है?",
            gu: "સ્થાનિક ઓપરેટરો અને સુપરવાઈઝરોને કેવી મદદ પૂરી પાડવામાં આવે છે?"
          },
          answer: {
            en: "Our crop health supervisors and agronomy experts operate directly on the ground. We provide training for modern grain extraction, soil mineral analysis, weather distress forecasting, and organic cultivation norms, enabling teams to maintain optimal quality profiles.",
            hi: "हमारे फसल स्वास्थ्य सलाहकार और कृषि विशेषज्ञ सीधे जमीन पर कार्य करते हैं। हम आधुनिक अनाज परीक्षण, मिट्टी खनिज विश्लेषण, मौसम की चेतावनी और जैविक कृषि पद्धतियों के लिए प्रशिक्षण प्रदान करते हैं, जिससे टीम गुणवत्ता बनाए रख सके।",
            gu: "અમારા પાક સંરક્ષણ સુપરવાઈઝરો અને કૃષિ નિષ્ણાતો સીધા જમીન સ્તરે કાર્યરત છે. અમો અદ્યતન અનાજ મૂલ્યાંકન, જમીન ખનિજ ચકાસણી, હવામાન આપત્તિની આગાહી અને સજીવ ખેતીની પદ્ધતિઓની ટ્રેનિંગ આપીએ છીએ જેથી ગુણવત્તા જળવાય."
          }
        },
        {
          id: "field-2",
          question: {
            en: "How do field teams minimize storage and transport losses?",
            hi: "क्षेत्रीय टीमें भंडारण और परिवहन नुकसान को कैसे कम करती हैं?",
            gu: "ફીલ્ડ ટીમો સંગ્રહ અને પરિવહન દરમિયાન થતું નુકસાન કેવી રીતે ઘટાડે છે?"
          },
          answer: {
            en: "By employing automated digital moisture testers and implementing hermetic seed storage Bags, we prevent mold growth and insect infestation. Our strict cold-chain logistics and rapid transit coordinate grain delivery safely within critical operational hours.",
            hi: "स्वचालित डिजिटल नमी मीटर का उपयोग करके और सुरक्षित वायुरोधी बैग लागू करके, हम फफूंद और कीटों के संक्रमण को रोकते हैं। हमारी严密 कोल्ड-चेन लॉजिस्टिक्स और तीव्र परिवहन प्रणाली महत्वपूर्ण घंटों के भीतर सुरक्षित अनाज वितरण सुनिश्चित करती है।",
            gu: "નવીનતમ ડિજિટલ મોઇશ્ચર ટેસ્ટર્સ અને એર-ટાઇટ કોથળાઓના ઉપયોગથી અમે ફૂગ અને જીવાતોના ઉપદ્રવને અટકાવીએ છીએ. અમારી પ્રોફેશનલ કોલ્ડ-ચેન વ્યવસ્થા અને ઝડપી પરિવહન અનાજની સમયસર ડિલિવરી કરે છે."
          }
        }
      ]
    }
  ];

  const currentCategory = categories.find((cat) => cat.id === activeCategory) || categories[0];

  return (
    <section id="faq" className="py-24 bg-brand-bg-light relative overflow-hidden">
      {/* Decorative subtle background accents */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-brand-green-light/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main interactive banner card */}
        <div className="bg-brand-green-dark rounded-[2.5rem] shadow-2xl overflow-hidden border border-brand-green-light/30 min-h-[580px] flex flex-col lg:flex-row">
          
          {/* LEFT SIDE (Themed background with custom geometric mask on desktop) */}
          <div className="w-full lg:w-[42%] bg-brand-bg-light p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden">
            
            {/* Embedded custom SVG curve background ONLY on desktop for perfect seamless blending */}
            <div className="absolute inset-0 w-full h-full pointer-events-none lg:block hidden z-0">
              <svg 
                viewBox="0 0 460 600" 
                preserveAspectRatio="none" 
                className="absolute inset-0 w-[101%] h-full fill-[#f3f7f4]"
              >
                <path d="M 0,0 L 460,0 C 460,110 490,190 410,270 C 350,330 320,380 290,430 C 250,490 180,520 0,550 Z" />
              </svg>
            </div>

            {/* Content Container (Ensure layout stands on top of SVG) */}
            <div className="relative z-10 space-y-10">
              {/* Main Titles */}
              <div className="space-y-3">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight font-sans leading-none">
                  {localize({ en: "Got Questions?", hi: "प्रश्न हैं?", gu: "પ્રશ્નો છે?" })}
                </h2>
                <p className="text-3xl sm:text-4xl font-semibold text-zinc-700 font-sans tracking-tight">
                  {localize({ en: "We've got Answers", hi: "हमारे पास उत्तर हैं", gu: "અમારી પાસે જવાબો છે" })}
                </p>
              </div>

              {/* Vertical Category Selection Tabs */}
              <div className="flex flex-col space-y-3 sm:space-y-4 max-w-xs">
                {categories.map((category) => {
                  const isActive = activeCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setExpandedFAQ(category.faqs[0]?.id || null);
                      }}
                      className={`group flex items-center space-x-3 text-left py-3.5 px-5 rounded-2xl transition-all duration-300 border ${
                        isActive
                          ? "bg-zinc-100/85 border-zinc-200 text-zinc-900 shadow-sm font-semibold"
                          : "border-transparent text-zinc-400 hover:text-zinc-600 font-medium"
                      }`}
                    >
                      {/* Interactive Radio-Style Dot */}
                      <div className="relative flex items-center justify-center h-5 w-5 rounded-full border-2 transition-colors duration-300 flex-shrink-0"
                           style={{ borderColor: isActive ? "#d4af37" : "#cbd5e1" }}>
                        {isActive && (
                          <motion.div 
                            layoutId="activeRadioDot"
                            className="h-2.5 w-2.5 bg-brand-gold rounded-full"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </div>
                      <span className="text-base sm:text-lg transition-transform duration-300 group-hover:translate-x-0.5">
                        {localize(category.name)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hand Sprout Illustration - Aligned exactly like the original design */}
            <div className="relative z-10 mt-12 lg:absolute lg:bottom-0 lg:left-0 lg:w-[85%] lg:h-[220px] pointer-events-none select-none flex justify-center lg:justify-start lg:-ml-6 lg:-mb-4">
              <img
                src="/src/assets/images/hand_sprout_sketch_1781688887406.jpg"
                alt="Agricultural Hand Sprout illustration"
                className="w-48 sm:w-56 lg:w-full lg:h-full object-contain filter drop-shadow-md brightness-110 lg:brightness-100"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* RIGHT SIDE (Rich vibrant green background containing the animated FAQ accordions) */}
          <div className="w-full lg:w-[58%] bg-brand-green-mid lg:bg-transparent p-6 sm:p-10 lg:p-14 flex flex-col justify-center relative">
            
            {/* Small top header for the active category on mobile only */}
            <div className="mb-6 lg:hidden flex items-center space-x-2 text-brand-accent/90">
              <HelpCircle className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wider font-bold">
                {localize(currentCategory.name)}
              </span>
            </div>

            {/* Accordion Questions Stack */}
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-3.5"
                >
                  {currentCategory.faqs.map((faq) => {
                    const isExpanded = expandedFAQ === faq.id;
                    return (
                      <div
                        key={faq.id}
                        className={`transition-all duration-300 rounded-2xl overflow-hidden border ${
                          isExpanded
                            ? "bg-brand-green-dark/70 border-brand-green-light/50 shadow-xl"
                            : "border-transparent border-b-brand-green-light/20 hover:border-b-brand-green-light/40"
                        }`}
                      >
                        {/* Accordion Header Trigger */}
                        <button
                          onClick={() => setExpandedFAQ(isExpanded ? null : faq.id)}
                          className="w-full text-left py-4 px-5 sm:px-6 flex items-center justify-between space-x-4 group text-white"
                        >
                          <span className={`text-[15px] sm:text-[17px] font-medium tracking-tight transition-colors duration-300 ${
                            isExpanded ? "text-brand-accent font-semibold" : "text-zinc-100 group-hover:text-brand-accent"
                          }`}>
                            {localize(faq.question)}
                          </span>
                          
                          {/* Rotating Chevron Icon */}
                          <div className={`p-1.5 rounded-full transition-transform duration-300 flex-shrink-0 ${
                            isExpanded ? "bg-brand-green-mid text-brand-accent rotate-180" : "text-zinc-300 group-hover:text-white"
                          }`}>
                            <ChevronDown className="h-5 w-5" />
                          </div>
                        </button>

                        {/* Accordion Body Content */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <div className="pb-5 px-5 sm:px-6 text-sm sm:text-[15px] text-zinc-300/90 leading-relaxed border-t border-brand-green-light/20 pt-3">
                                {localize(faq.answer)}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Seamless Bottom Badge */}
            <div className="mt-8 pt-6 border-t border-brand-green-light/20 flex items-center justify-between text-xs text-brand-sage/80 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-brand-accent" />
                {localize({ en: "Verified Sourcing Helpdesk", hi: "सत्यापित सोर्सिंग हेल्पडेस्क", gu: "ચકાસાયેલ માહિતી કેન્દ્ર" })}
              </span>
              <span>PUNITDHAN P_S</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
