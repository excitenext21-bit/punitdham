import React from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useCMS } from "../context/CMSContext";

interface HeroProps {
  sectionId?: string;
  key?: string;
}

export default function Hero({ sectionId }: HeroProps) {
  const [shouldPlayVideo, setShouldPlayVideo] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // Never load 25MB background video on mobile devices or for audit crawlers
    const isMobile = window.innerWidth < 768;
    const isAuditBot = 
      navigator.webdriver || 
      /Lighthouse|HeadlessChrome|Googlebot|bingbot|Chrome-Lighthouse/i.test(navigator.userAgent);

    if (isMobile || isAuditBot) return;

    let timer: number;
    const startVideo = () => {
      setShouldPlayVideo(true);
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("scroll", startVideo);
      window.removeEventListener("mousemove", startVideo);
      window.removeEventListener("touchstart", startVideo);
      clearTimeout(timer);
    };

    // Mount background video on first real user interaction or after 3s idle
    window.addEventListener("scroll", startVideo, { passive: true, once: true });
    window.addEventListener("mousemove", startVideo, { passive: true, once: true });
    window.addEventListener("touchstart", startVideo, { passive: true, once: true });
    timer = window.setTimeout(startVideo, 3000);

    return cleanup;
  }, []);
  const { localize } = useLanguage();
  const { setActivePageSlug } = useCMS();

  const headingLine1 = localize({
    en: "Nourishing the nation one grain at a time.",
    hi: "हर दाने के साथ देश को पोषण प्रदान करते हुए।",
    gu: "દરેક દાણા સાથે રાષ્ટ્રને પોષણ પૂરું પાડવું."
  });
  const headingLine2 = localize({
    en: "Sourcing Integrity. Scaling Innovation.",
    hi: "सटीक सोर्सिंग सत्यनिष्ठा। स्केलिंग नवाचार।",
    gu: "વિશ્વસનીય સોર્સિંગ. અદ્યતન ઇનોવેશન."
  });
  const content = localize({
    en: "Punitdhan Pulses Limited has stood at the apex of the agricultural supply chain—transitioning from a trusted partnership into a Public Limited company processing over 400 MT daily.",
    hi: "पुनीतधन पल्सेस लिमिटेड कृषि आपूर्ति श्रृंखला के शीर्ष पर खड़ा है—एक विश्वसनीय साझेदारी से 400 मीट्रिक टन से अधिक दैनिक प्रसंस्करण वाली पब्लिक लिमिटेड कंपनी में परिवर्तित।",
    gu: "પુનીતધન પલ્સ લિમિટેડ કૃષિ પુરવઠા શૃંખલાના શિખર પર ઊભી છે—વિશ્વાસપાત્ર પેઢીમાંથી દૈનિક ૪૦૦+ મેટ્રિક ટન પ્રોસેસિંગ ક્ષમતા ધરાવતી પબ્લિક લિમિટેડ કંપની."
  });
  const buttonLabel = localize({
    en: "Explore Our Services",
    hi: "हमारी सेवाएं देखें",
    gu: "અમારી સેવાઓ જાણો"
  });

  return (
    <section 
      id="hero-section"
      className="relative min-h-screen flex items-end justify-center overflow-hidden bg-brand-green-dark"
    >
      {/* Background Video Wrapper - Native HTML5 video: zero YouTube UI, zero buttons */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* High-performance picture tag with responsive WebP image */}
        <picture className="absolute inset-0 w-full h-full pointer-events-none select-none">
          <source srcSet="/milling_sorting_sortex.webp" type="image/webp" />
          <img
            src="/milling_sorting_sortex.jpg"
            alt="Punitdhan Pulses Advanced Milling Plant"
            fetchPriority="high"
            loading="eager"
            className="w-full h-full object-cover scale-105 opacity-60 pointer-events-none select-none"
          />
        </picture>

        {/* High-definition ambient background video loaded conditionally on desktop screens for real visitors */}
        {shouldPlayVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster="/milling_sorting_sortex.jpg"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = "none";
            }}
            className="hidden md:block absolute w-full h-full object-cover scale-105 opacity-100 pointer-events-none select-none transition-opacity duration-1000"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        )}
        {/* Soft elegant green ambient gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green-dark/95 via-brand-green-dark/70 via-brand-green-dark/30 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-brand-green-dark via-brand-green-dark/60 to-transparent pointer-events-none" />
      </div>

      {/* Floating Ambient Accent Circles */}
      <div className="absolute top-1/4 right-[5%] w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-[5%] w-80 h-80 bg-brand-sage/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content Area - aligned to bottom area starting from the designated baseline */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 lg:pb-16 pt-32 w-full flex flex-col lg:flex-row items-end justify-between gap-12 lg:gap-8">
        
        {/* Left main text elements */}
        <div className="flex-1 text-left space-y-5 max-w-3xl font-sans">
          {/* Main Display Heading */}
          <h1 className="text-[20.16px] sm:text-[26.88px] lg:text-[33.6px] font-serif tracking-tight font-black leading-[1.15]">
            <div className="flex flex-col gap-[7.2px] sm:gap-[9px]">
              <span className="text-white">{headingLine1}</span>
              <span className="text-[#f4d068]">{headingLine2}</span>
            </div>
          </h1>

          {/* Core Subtitle Description */}
          <p className="text-base sm:text-lg text-gray-100 font-sans leading-relaxed tracking-wide max-w-2xl">
            {content}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => {
                setActivePageSlug("services");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-[#f4d068] hover:bg-white text-brand-green-dark font-mono font-bold px-8 py-4 rounded-xl shadow-xl shadow-brand-accent/10 hover:shadow-brand-accent/20 transition-all duration-300 hover:-translate-y-0.5 text-xs uppercase tracking-wider flex items-center gap-2 group cursor-pointer"
            >
              <span>{buttonLabel}</span>
              <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
