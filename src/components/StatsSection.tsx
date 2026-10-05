import React from "react";
import { motion } from "motion/react";
import { Calendar, Cpu, Wheat, Truck, ShieldCheck, Award } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function StatsSection() {
  const { localize } = useLanguage();

  const title = localize({
    en: "12th Quality Mark Award Winner",
    hi: "12वां क्वालिटी मार्क अवार्ड विजेता",
    gu: "૧૨મો ક્વોલિટી માર્ક એવોર્ડ વિજેતા"
  });
  const leftCopy = localize({
    en: "Our uncompromising pursuit of manufacturing excellence was formally recognized at the 12th Quality Mark Awards, where Punitdhan Pulses Limited was presented the prestigious honor by Hon’ble Minister Mr. Shantanu Thakur (Ministry of Ports, Shipping and Waterways of India).",
    hi: "निर्माण उत्कृष्टता की हमारी प्रतिबद्धता को 12वें क्वालिटी मार्क अवार्ड्स में औपचारिक रूप से मान्यता दी गई, जहां माननीय मंत्री श्री शांतनु ठाकुर (पत्तन, पोत परिवहन और जलमार्ग मंत्रालय, भारत सरकार) द्वारा पुनीतधन पल्सेस लिमिटेड को यह प्रतिष्ठित सम्मान प्रदान किया गया।",
    gu: "મેન્યુફેક્ચરિંગ ક્ષેત્રે શ્રેષ્ઠ ગુણવત્તા બદલ ૧૨મા ક્વોલિટી માર્ક એવોર્ડ્સમાં માનનીય મંત્રી શ્રી શાંતનુ ઠાકુર (ભારત સરકાર) ના હસ્તે પુનીતધન પલ્સ લિમિટેડને આ પ્રતિષ્ઠિત સન્માન એનાયત કરવામાં આવ્યું હતું."
  });

  const stats = [
    {
      id: "heritage",
      value: localize({ en: "38+ Years", hi: "38+ वर्ष", gu: "૩૮+ વર્ષ" }),
      label: localize({ en: "Industrial Legacy", hi: "औद्योगिक विरासत", gu: "ઔદ્યોગિક વારસો" }),
      desc: localize({ en: "Est. 1988, bridging decades of trust.", hi: "स्थापना 1988, दशकों के विश्वास का प्रतीक।", gu: "સ્થાપના ૧૯૮૮, દાયકાઓનો વિશ્વાસ." }),
      icon: (
        <motion.div
          animate={{ rotate: [0, -7, 7, -4, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Calendar className="w-5 h-5 text-[#f4d068]" />
        </motion.div>
      )
    },
    {
      id: "capacity",
      value: localize({ en: "400+ MT", hi: "400+ मीट्रिक टन", gu: "૪૦૦+ મેટ્રિક ટન" }),
      label: localize({ en: "Daily Processing", hi: "दैनिक प्रसंस्करण", gu: "દૈનિક પ્રોસેસિંગ" }),
      desc: localize({ en: "High-speed automatic milling capacity.", hi: "उच्च गति स्वचालित मिलिंग क्षमता।", gu: "હાઇ-સ્પીડ ઓટોમેટિક મિલિંગ ક્ષમતા." }),
      icon: (
        <motion.div
          animate={{ scale: [1, 1.18, 1, 1.1, 1], rotate: [0, 6, -6, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        >
          <Cpu className="w-5 h-5 text-[#f4d068]" />
        </motion.div>
      )
    },
    {
      id: "volume",
      value: localize({ en: "25,000+ MT", hi: "25,000+ मीट्रिक टन", gu: "૨૫,૦૦૦+ મેટ્રિક ટન" }),
      label: localize({ en: "Annual Volume Handled", hi: "वार्षिक प्रसंस्कृत मात्रा", gu: "વાર્ષિક જથ્થો" }),
      desc: localize({ en: "Premium graded and packaged food grains.", hi: "प्रीमियम वर्गीकृत और पैक किए गए खाद्यान्न।", gu: "પ્રીમિયમ ગ્રેડિંગ અને પેકેજિંગ કરેલ અનાજ." }),
      icon: (
        <motion.div
          animate={{ rotate: [0, 12, -8, 5, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >
          <Wheat className="w-5 h-5 text-[#f4d068]" />
        </motion.div>
      )
    },
    {
      id: "logistics",
      value: localize({ en: "2,000+ Lorries", hi: "2,000+ लॉरी/ट्रक", gu: "૨,૦૦૦+ ટ્રક" }),
      label: localize({ en: "Dispatched Annually", hi: "वार्षिक प्रेषण", gu: "વાર્ષિક ડિસ્પેચ" }),
      desc: localize({ en: "Seamless logistical supply chain across India.", hi: "पूरे भारत में निर्बाध लॉजिस्टिक आपूर्ति श्रृंखला।", gu: "સમગ્ર ભારતમાં અવિરત લોજિસ્ટિક સપ્લાય ચેઇન." }),
      icon: (
        <motion.div
          animate={{ x: [0, 4, 0, -2, 0], y: [0, -1.5, 0, -1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        >
          <Truck className="w-5 h-5 text-[#f4d068]" />
        </motion.div>
      )
    },
    {
      id: "compliance",
      value: localize({ en: "ISO & HACCP", hi: "ISO एवं HACCP", gu: "ISO અને HACCP" }),
      label: localize({ en: "Certified Operations", hi: "प्रमाणित संचालन", gu: "પ્રમાણિત કામગીરી" }),
      desc: localize({ en: "ISO 9001:2015 & HACCP gold standards.", hi: "आईएसओ 9001:2015 और एचएसीसीपी स्वर्ण मानक।", gu: "ISO 9001:2015 અને HACCP સુવર્ણ ધોરણો." }),
      icon: (
        <motion.div
          animate={{ scale: [1, 1.16, 1], y: [0, -2, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          <ShieldCheck className="w-5 h-5 text-[#f4d068]" />
        </motion.div>
      )
    }
  ];

  return (
    <section 
      id="executive-trust"
      className="relative py-20 lg:py-28 bg-[#0b2418] text-white overflow-hidden border-y border-white/10"
    >
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[100px] -top-20 -left-20" />
        <div className="absolute w-[500px] h-[500px] bg-brand-sage/10 rounded-full blur-[120px] -bottom-30 -right-20" />
        {/* Subtle geometric lines */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#f4d068_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Title & Awards Text */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              {title}
            </h2>

            <div className="w-16 h-1 bg-[#f4d068] rounded-full" />

            <p className="text-gray-300 font-sans text-sm sm:text-base leading-relaxed">
              {leftCopy}
            </p>
          </div>

          {/* Right Column: High-Contrast Stats Bento Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.id}
                  className={`p-6 rounded-2xl border bg-white/5 backdrop-blur-md border-white/10 hover:bg-[#123623]/40 hover:border-[#f4d068]/30 hover:shadow-xl transition-all duration-350 relative group ${
                    idx === 4 ? "sm:col-span-2" : ""
                  }`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10 shrink-0 group-hover:bg-[#123623]/80 group-hover:border-white/15 text-[#f4d068] transition-colors mt-0.5 flex items-center justify-center"
                    >
                      {stat.icon}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-2xl sm:text-3xl font-serif font-black text-[#f4d068] tracking-tight">
                        {stat.value}
                      </span>
                      <h3 className="text-xs font-mono uppercase tracking-wider text-white font-bold mt-1">
                        {stat.label}
                      </h3>
                      <p className="text-xs text-gray-300 mt-1.5 leading-relaxed font-light">
                        {stat.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
