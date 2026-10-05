import React, { useState, useEffect } from "react";
import { Menu, X } from "./HandDrawnIcons";
import { useLanguage } from "../context/LanguageContext";
import { useCMS } from "../context/CMSContext";

interface HeaderProps {
  onOpenDrawer: () => void;
  isSupportDrawerExpanded?: boolean;
}

const NAV_ITEMS = [
  { slug: "about-us", label: { en: "About us", hi: "हमारे बारे में", gu: "અમારા વિશે" } },
  { slug: "board-of-directors", label: { en: "Board Of Directors", hi: "निदेशक मंडल", gu: "બોર્ડ ઓફ ડિરેક્ટર્સ" } },
  { slug: "services", label: { en: "Services", hi: "सेवाएं", gu: "સેવાઓ" } },
  { slug: "products-specs", label: { en: "Products", hi: "उत्पाद", gu: "ઉત્પાદનો" } },
  { slug: "careers", label: { en: "Careers", hi: "करियर", gu: "કારકિર્દી" } },
  { slug: "alliances", label: { en: "Statutory Details", hi: "सांविधिक विवरण", gu: "વૈધાનિક વિગતો" } }
];

export default function Header({ onOpenDrawer, isSupportDrawerExpanded }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t, localize } = useLanguage();
  const { pages, activePageSlug, setActivePageSlug, globalSettings, view, setView } = useCMS();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePageClick = (slug: string) => {
    setMobileMenuOpen(false);
    setView("home");
    setActivePageSlug(slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const LanguageSelector = () => (
    <div className="flex items-center gap-1 bg-white/10 p-1 rounded-full border border-white/20 select-none">
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase transition-all duration-200 cursor-pointer ${
          language === "en"
            ? "bg-[#f4d068] text-brand-green-dark shadow-sm"
            : "text-zinc-200 hover:text-white"
        }`}
        title="English"
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("hi")}
        className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase transition-all duration-200 cursor-pointer ${
          language === "hi"
            ? "bg-[#f4d068] text-brand-green-dark shadow-sm"
            : "text-zinc-200 hover:text-white"
        }`}
        title="हिन्दी (Hindi)"
      >
        हिन्दी
      </button>
      <button
        onClick={() => setLanguage("gu")}
        className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase transition-all duration-200 cursor-pointer ${
          language === "gu"
            ? "bg-[#f4d068] text-brand-green-dark shadow-sm"
            : "text-zinc-200 hover:text-white"
        }`}
        title="ગુજરાતી (Gujarati)"
      >
        ગુજરાતી
      </button>
    </div>
  );

  return (
    <>
      {/* Main Transparent Absolute Header with Glass Effect */}
      <header
        id="main-nav-bar"
        className="z-45 left-0 right-0 px-4 md:px-8 flex justify-center absolute top-4 py-0"
      >
        <div
          className={`w-full max-w-7xl flex items-center justify-between gap-4 transition-all duration-300 shadow-2xl ${
            isScrolled
              ? "bg-[#0b2418]/85 border-white/15 py-3 px-5 md:px-7 rounded-full md:rounded-[24px]"
              : "bg-[#0b2418]/65 border-white/10 py-4 px-6 md:px-10 rounded-full md:rounded-[24px]"
          } backdrop-blur-xl border`}
        >
          
          {/* Brand Logo & Divider Container */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick("home");
              }}
              className="flex items-center gap-2 group shrink-0"
            >
              <img
                src="/logo-light.png" width="219" height="48"
                alt={globalSettings.siteName}
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </a>

            {/* Divider line */}
            <div className="hidden md:block h-6 w-px bg-white/15" />
          </div>

          {/* Desktop Multi-Page Navigation */}
          <nav className="hidden xl:flex items-center gap-3 xl:gap-5 flex-nowrap shrink-0">
            {NAV_ITEMS.map((item) => {
              const page = pages.find(p => p.slug === item.slug);
              if (page && page.visible === false) return null;

              const isActive = activePageSlug === item.slug && view === "home";
              return (
                <a
                  key={item.slug}
                  href={item.slug === "home" ? "/" : `/${item.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageClick(item.slug);
                  }}
                  className={`font-semibold text-xs xl:text-[13px] tracking-wide transition-colors relative group py-2 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive ? "text-[#f4d068]" : "text-gray-200 hover:text-[#f4d068]"
                  }`}
                >
                  <span className="whitespace-nowrap">{localize(item.label)}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-[#f4d068] transition-all duration-300 rounded-full ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Button & Elegant Language Switcher */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSelector />
            <a
              id="header-cta-btn"
              href="/connect"
              onClick={(e) => {
                e.preventDefault();
                setView("home");
                setActivePageSlug("connect");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-[#f4d068] hover:bg-white text-brand-green-dark font-sans font-bold px-6 py-2.5 rounded-full shadow-lg hover:shadow-[#f4d068]/20 transition-all duration-300 hover:-translate-y-0.5 text-xs uppercase tracking-wider text-center cursor-pointer inline-block"
            >
              {t("getInTouch")}
            </a>
          </div>

          {/* Mobile Hamburger button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-full text-white hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer (Floating glass card underneath) */}
        {mobileMenuOpen && (
          <div className="xl:hidden absolute top-[calc(100%-8px)] left-4 right-4 bg-[#0b2418]/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl py-6 px-6 flex flex-col gap-4 animate-fadeIn max-h-[85vh] overflow-y-auto w-[calc(100%-32px)]">
            {NAV_ITEMS.map((item) => {
              const page = pages.find(p => p.slug === item.slug);
              if (page && page.visible === false) return null;

              const isActive = activePageSlug === item.slug && view === "home";
              return (
                <div key={item.slug} className="border-b border-brand-green-light/10 py-1.5">
                  <a
                    href={item.slug === "home" ? "/" : `/${item.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageClick(item.slug);
                    }}
                    className={`text-left text-base font-semibold tracking-wide block py-1.5 w-full cursor-pointer ${
                      isActive ? "text-[#f4d068]" : "text-gray-100 hover:text-[#f4d068]"
                    }`}
                  >
                    {localize(item.label)}
                  </a>
                </div>
              );
            })}
            
            {/* Mobile Language Selection Block */}
            <div className="flex flex-col gap-2 pt-2 border-b border-brand-green-light/10 pb-4">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                {localize({ en: "SELECT LANGUAGE", hi: "भाषा चुनें", gu: "ભાષા પસંદ કરો" })}
              </span>
              <div className="flex items-center gap-1.5 self-start">
                <LanguageSelector />
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <a
                href="/connect"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  setView("home");
                  setActivePageSlug("connect");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-[#f4d068] text-center text-brand-green-dark font-mono font-black py-3 rounded-lg shadow-md block uppercase tracking-wider text-sm w-full cursor-pointer"
              >
                {t("getInTouch")}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
