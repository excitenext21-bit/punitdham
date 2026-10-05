import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import Header from "./components/Header";
import Hero from "./components/Hero";
import StatsSection from "./components/StatsSection";
import AboutUs from "./components/AboutUs";
import WhyUs from "./components/WhyUs";
import OrganizationDetails from "./components/OrganizationDetails";
import Strengths from "./components/Strengths";
import Products from "./components/Products";
import Leaders from "./components/Leaders";
import Operations from "./components/Operations";
import ContactFooter from "./components/ContactFooter";
import BackToTop from "./components/BackToTop";
import ContactDrawer from "./components/ContactDrawer";
import ContactPage from "./components/ContactPage";
import { useLanguage } from "./context/LanguageContext";
import { useCMS } from "./context/CMSContext";
import CustomSection from "./components/CustomSection";
import BackgroundElements from "./components/BackgroundElements";
import SidebarSupport from "./components/SidebarSupport";
import Preloader from "./components/Preloader";
import InnerPages from "./components/InnerPages";
import { AnimatePresence } from "motion/react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProductName, setSelectedProductName] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSupportDrawerExpanded, setIsSupportDrawerExpanded] = useState(true);
  const { t, localize } = useLanguage();
  const { pages, activePageSlug, setActivePageSlug, view, setView } = useCMS();

  // Active page context from our CMS Provider
  const activePage = pages.find(p => p.slug === activePageSlug) || pages[0];

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium exponential deceleration curve
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // RequestAnimationFrame Loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Dynamic hash link click handler
    const handleHashLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      // Look for anchor links with hash pointing to current page elements
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          e.preventDefault();
          
          // Smoothly scroll using Lenis custom engine
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -80, // Safe offset for the glass sticky header
            duration: 1.6,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });

          // Silently push the hash to path state
          window.history.pushState(null, "", anchor.hash);
        }
      }
    };

    document.addEventListener("click", handleHashLinkClick, { capture: true });

    // Expose Lenis instance globally so modular buttons can coordinate scroll animations
    (window as any).lenis = lenis;

    if (isLoading) {
      lenis.stop();
    }

    // Clean up
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      (window as any).lenis = undefined;
      document.removeEventListener("click", handleHashLinkClick, { capture: true });
    };
  }, []);

  // Sync active view back to home if user changes pages in CMS, but only if they are on a guest view
  useEffect(() => {
    if (activePageSlug !== "home" && view === "contact") {
      setView("home");
    }
  }, [activePageSlug, view, setView]);

  const handleInquireProduct = (productName: string) => {
    setSelectedProductName(productName);
  };

  const clearSelectedProduct = () => {
    setSelectedProductName("");
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader 
            onComplete={() => {
              setIsLoading(false);
              setTimeout(() => {
                (window as any).lenis?.start();
              }, 50);
            }} 
          />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-brand-bg-light text-zinc-800 font-sans selection:bg-brand-accent selection:text-brand-green-dark flex overflow-x-hidden w-full relative">
      
      {/* Main Page Content Area */}
      <main id="main-content" className="flex-1 min-w-0 relative flex flex-col">
        {/* Decorative minimalist floating background elements */}
        <BackgroundElements />

        {/* Absolute Transparent Header with awareness of Sidebar Squeeze */}
        <Header 
          onOpenDrawer={() => setIsDrawerOpen(true)} 
          isSupportDrawerExpanded={isSupportDrawerExpanded}
        />

        {view === "home" ? (
          <>
            {activePageSlug === "home" ? (
              /* DYNAMIC CMS RENDERER FOR THE ACTIVE PAGE */
              <div className="flex flex-col">
                {activePage.sections.map((sec) => {
                  switch (sec.type) {
                    case "hero":
                      return <Hero key={sec.id} sectionId={sec.id} />;
                    case "stats":
                      return <StatsSection key={sec.id} />;
                    case "about":
                      return (
                        <React.Fragment key={sec.id}>
                          <AboutUs />
                          {!activePage.sections.some(s => s.type === "why-us") && <WhyUs />}
                        </React.Fragment>
                      );
                    case "why-us":
                      return <WhyUs key={sec.id} />;
                    case "strengths":
                      return <Strengths key={sec.id} />;
                    case "products":
                      return <Products key={sec.id} onInquireProduct={handleInquireProduct} />;
                    case "operations":
                      return <Operations key={sec.id} />;
                    case "leaders":
                      return <Leaders key={sec.id} />;
                    case "organization":
                      return <OrganizationDetails key={sec.id} />;
                    case "custom":
                      return <CustomSection key={sec.id} section={sec} />;
                    default:
                      return null;
                  }
                })}
              </div>
            ) : (
              <InnerPages activePageSlug={activePageSlug} onInquireProduct={handleInquireProduct} />
            )}

            {/* Corporate Sourcing & Inquiry Form Footer channel */}
            <ContactFooter 
              selectedProductName={selectedProductName}
              clearSelectedProduct={clearSelectedProduct}
            />
          </>
        ) : (
          <ContactPage onBackToHome={() => { setView("home"); setActivePageSlug("home"); }} />
        )}

        {/* Floating 'Back to Top' button */}
        <BackToTop />

        {/* Sleek Right Side Contact & Support Drawer overlay */}
        <ContactDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      </main>

      {/* Sleek RHS Collapsible Support Sider Panel */}
      <SidebarSupport 
        isExpanded={isSupportDrawerExpanded} 
        onToggle={() => setIsSupportDrawerExpanded(!isSupportDrawerExpanded)} 
      />

    </div>
  </>
  );
}
