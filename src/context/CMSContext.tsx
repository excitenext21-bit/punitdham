import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { COMPANY_PROFILE, STRENGTHS, PRODUCTS, LEADERS, WELFARE_PARTNERS, WELFARE_SCHEMES, KEY_ACHIEVEMENTS } from "../data";

// Type definitions for the advanced enterprise-level CMS
export interface CandidateApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  message?: string;
  resumeName: string;
  resumeSize: string;
  resumeType: string;
  resumeDataUrl: string; // Base64 data url
  submittedAt: string;
}

export interface SectionStyle {
  typography: {
    titleSize: "text-2xl" | "text-3xl" | "text-4xl" | "text-5xl" | "text-6xl";
    fontFamily: "font-serif" | "font-sans" | "font-mono";
    alignment: "left" | "center" | "right";
  };
  background: {
    type: "solid" | "gradient" | "glass" | "image";
    colorClass: string; // e.g., "bg-brand-bg-light", "bg-brand-green-dark", "from-teal-950 to-teal-900"
  };
  animation: {
    type: "fade" | "slide" | "zoom" | "none";
    duration: number; // in seconds
  };
}

export interface CMSSection {
  id: string;
  type: "hero" | "stats" | "about" | "why-us" | "strengths" | "products" | "operations" | "leaders" | "organization" | "contact" | "custom";
  title: string;
  subtitle: string;
  content: string; // Dynamic description or markdown copy
  items?: any[]; // For grids (leaders, products, achievements, etc.)
  buttonLabel?: string;
  buttonLink?: string;
  videoUrl?: string;
  images?: string[];
  style: SectionStyle;
}

export interface CMSPage {
  slug: string; // e.g. "home", "about-us", "pulse-catalog", "custom-page"
  title: string;
  visible: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
  sections: CMSSection[];
}

export interface GlobalSettings {
  siteName: string;
  siteSubtitle: string;
  phoneNumbers: string[];
  emails: string[];
  gstNumber: string;
  panNumber: string;
  fssaiMemco: string;
  fssaiBavla: string;
  isoCertificate: string;
  haccpCertificate: string;
  registeredOffice: {
    line1: string;
    line2: string;
    line3: string;
  };
  corporateOffice: {
    line1: string;
    line2: string;
    line3: string;
  };
}

interface CMSContextProps {
  pages: CMSPage[];
  globalSettings: GlobalSettings;
  activePageSlug: string;
  setActivePageSlug: (slug: string) => void;
  view: "home" | "contact";
  setView: (v: "home" | "contact") => void;
  addPage: (slug: string, title: string, seoTitle?: string) => void;
  deletePage: (slug: string) => void;
  updatePageSeo: (slug: string, seo: CMSPage["seo"]) => void;
  updatePageTitle: (slug: string, title: string) => void;
  addSection: (slug: string, type: CMSSection["type"]) => void;
  deleteSection: (slug: string, sectionId: string) => void;
  updateSection: (slug: string, sectionId: string, updatedFields: Partial<CMSSection>) => void;
  reorderSections: (slug: string, sectionIds: string[]) => void;
  updateGlobalSettings: (settings: Partial<GlobalSettings>) => void;
  resetCMS: () => void;
  exportCMS: () => void;
  importCMS: (importedJson: string) => boolean;
  candidates: CandidateApplication[];
  submitCandidate: (candidate: Omit<CandidateApplication, "id" | "submittedAt">) => void;
  deleteCandidate: (id: string) => void;
  clearAllCandidates: () => void;
  isBulkModalOpen: boolean;
  setIsBulkModalOpen: (open: boolean) => void;
}

const CMSContext = createContext<CMSContextProps | undefined>(undefined);

const DEFAULT_SECTIONS: Record<string, CMSSection[]> = {
  home: [
    {
      id: "sec-hero",
      type: "hero",
      title: "PUNITDHAN PULSES",
      subtitle: "Nourishing Lives, Sustaining Agricultural Excellence",
      content: "Indian Grains & Pulses processing pioneer, state-of-the-art facilities, direct sourcing, national cooperative partnerships.",
      buttonLabel: "Explore Dynamic Catalog",
      buttonLink: "#products",
      videoUrl: "https://youtu.be/E_NRicYz6os",
      images: [],
      style: {
        typography: { titleSize: "text-5xl", fontFamily: "font-serif", alignment: "center" },
        background: { type: "solid", colorClass: "bg-brand-green-dark" },
        animation: { type: "zoom", duration: 1.5 }
      }
    },
    {
      id: "sec-stats",
      type: "stats",
      title: "Achievements & Operational Scale",
      subtitle: "Our Milestones",
      content: "Operational stats demonstrating our national welfare footprint and processing capacity.",
      items: KEY_ACHIEVEMENTS,
      style: {
        typography: { titleSize: "text-3xl", fontFamily: "font-serif", alignment: "center" },
        background: { type: "gradient", colorClass: "bg-gradient-to-b from-brand-green-dark to-brand-green-mid" },
        animation: { type: "fade", duration: 1.0 }
      }
    },
    {
      id: "sec-about",
      type: "about",
      title: "Pioneering the Future of Food Security",
      subtitle: "Over 38 Years of Pure Heritage",
      content: "Since our modest beginnings as Prakash Agro Mills in 1988, our focus has always been the flawless processing of high-nutrition staples. Under the vision of our founders, we have transitioned into Punitdhan Pulses Limited—now supporting national government supply chains and feeding millions of households.",
      buttonLabel: "Meet the Leadership",
      buttonLink: "#leaders",
      images: [],
      items: [
        {
          id: "pillar-1",
          title: "Quality Premium",
          description: "Zero gaps in quality ensure we offer prime graded output verified through rigorous testing, supporting clean nutrition.",
          badge: "Zero Gaps",
          iconName: "Cpu"
        },
        {
          id: "pillar-2",
          title: "Trust & Relationship",
          description: "We prioritize building and maintaining long-term, synergistic relationships with food grains, oil, rice, and pulses merchants across India.",
          badge: "Synergy Network",
          iconName: "Users"
        },
        {
          id: "pillar-3",
          title: "Direct Sourcing",
          description: "We work directly with government agencies and farmers to ensure the finest raw crops are procured at fair market prices.",
          badge: "Govt & Farmers",
          iconName: "ShieldCheck"
        },
        {
          id: "pillar-4",
          title: "Team & Scaled Output",
          description: "Our highly professional managers and production teams implement standard workflows to deliver premium graded output within stipulated timelines.",
          badge: "Prompt Delivery",
          iconName: "Globe"
        }
      ],
      style: {
        typography: { titleSize: "text-4xl", fontFamily: "font-serif", alignment: "left" },
        background: { type: "solid", colorClass: "bg-brand-bg-light" },
        animation: { type: "slide", duration: 1.2 }
      }
    },
    {
      id: "sec-why-us",
      type: "why-us",
      title: "Why Us",
      subtitle: "Four Pillars of Reliability",
      content: "Zero gaps in quality, direct sourcing, synergistic network and prompt delivery across national supply chains.",
      style: {
        typography: { titleSize: "text-4xl", fontFamily: "font-serif", alignment: "center" },
        background: { type: "solid", colorClass: "bg-brand-bg-light" },
        animation: { type: "fade", duration: 1.0 }
      }
    },
    {
      id: "sec-strengths",
      type: "strengths",
      title: "Why Elite Institutions Choose Us",
      subtitle: "Core Strengths",
      content: "Our operational foundation is anchored in six pillars of excellence, making us a trusted partner for state agencies and defense procurement.",
      items: STRENGTHS,
      style: {
        typography: { titleSize: "text-3xl", fontFamily: "font-serif", alignment: "center" },
        background: { type: "solid", colorClass: "bg-zinc-900" },
        animation: { type: "fade", duration: 1.2 }
      }
    },
    {
      id: "sec-operations",
      type: "operations",
      title: "Welfare Procurement & Strategic Partnerships",
      subtitle: "Feeding the Nation",
      content: "We take immense pride in supporting the Government of India's flagship social welfare initiatives, driving balanced nutrition to every corner of the country.",
      items: WELFARE_SCHEMES,
      style: {
        typography: { titleSize: "text-3xl", fontFamily: "font-serif", alignment: "center" },
        background: { type: "gradient", colorClass: "bg-gradient-to-b from-brand-bg-light to-brand-sage/10" },
        animation: { type: "slide", duration: 1.2 }
      }
    }
  ]
};

const INITIAL_PAGES: CMSPage[] = [
  {
    slug: "home",
    title: "Home",
    visible: true,
    seo: {
      metaTitle: "Punitdhan Pulses Limited | Premium Pulses & Food Grains processing",
      metaDescription: "Providing high-quality agricultural commodities, pulses, grains, and oil across India. Estd 1988, ISO 9001:2015 and HACCP certified processing mills.",
      keywords: "Punitdhan, pulses, grains, Chana Dal, Toor Dal, Naroda, Ahmedabad, Prakash Agro Mills, grain milling, NAFED, Bharat Dal"
    },
    sections: DEFAULT_SECTIONS.home
  },
  {
    slug: "about-us",
    title: "About",
    visible: true,
    seo: {
      metaTitle: "Corporate Profile | Punitdhan Pulses Limited",
      metaDescription: "Learn about the rich legacy of Punitdhan Pulses Limited (formerly Prakash Agro Mills), established in 1988.",
      keywords: "Punitdhan legacy, Prakash Agro Mills, CA Prakashchand Bachhawat"
    },
    sections: []
  },
  {
    slug: "board-of-directors",
    title: "Board of Directors",
    visible: true,
    seo: {
      metaTitle: "Board of Directors | Punitdhan Pulses Limited",
      metaDescription: "Meet the visionary board of directors of Punitdhan Pulses Limited leading food-grain and pulse processing across India.",
      keywords: "board of directors, CA Prakashchand Bachhawat, CA Punit Bachhawat, CA Dhanashree Bachhawat"
    },
    sections: []
  },
  {
    slug: "services",
    title: "Services",
    visible: true,
    seo: {
      metaTitle: "Institutional Mandates & Services | Punitdhan Pulses Limited",
      metaDescription: "Sovereign supply chains, national welfare schemes, Mid-day meal program, and military procurement contracts.",
      keywords: "ICDS, Mid-Day Meal, PDS, PMGKAY, Bharat Dal, Defense procurement"
    },
    sections: []
  },
  {
    slug: "products-specs",
    title: "Products",
    visible: true,
    seo: {
      metaTitle: "Product Profile & Technical Specifications | Punitdhan Pulses Limited",
      metaDescription: "Browse our premium range of pulses, whole grains, and allied food commodities with absolute purity.",
      keywords: "Chana Dal, Toor Dal, Urad Dal, Masoor Dal, Moong Dal specifications"
    },
    sections: []
  },
  {
    slug: "careers",
    title: "Careers",
    visible: true,
    seo: {
      metaTitle: "Careers & Opportunities | Punitdhan Pulses Limited",
      metaDescription: "Join our fast-growing, highly professional agribusiness processing team in Ahmedabad.",
      keywords: "Punitdhan jobs, agricultural milling careers, CA Dhanashree Bachhawat HR"
    },
    sections: []
  },
  {
    slug: "alliances",
    title: "Statutory Details",
    visible: true,
    seo: {
      metaTitle: "Statutory Details & Registry Certifications | Punitdhan Pulses Limited",
      metaDescription: "Explore the verified statutory registry codes, central government food safety licenses, and corporate compliance of Punitdhan Pulses Limited.",
      keywords: "Punitdhan GST number, PAN card, FSSAI license, ISO certification, statutory details"
    },
    sections: []
  },
  {
    slug: "connect",
    title: "Connect Us",
    visible: true,
    seo: {
      metaTitle: "Connect Us & Central Desks | Punitdhan Pulses Limited",
      metaDescription: "Get in touch with our registered corporate office or licensed milling hubs in Ahmedabad, Gujarat.",
      keywords: "Punitdhan contact, contact details, address, phone, email, inquiry form"
    },
    sections: []
  }
];

const INITIAL_SETTINGS: GlobalSettings = {
  siteName: COMPANY_PROFILE.name,
  siteSubtitle: COMPANY_PROFILE.natureOfBusiness,
  phoneNumbers: COMPANY_PROFILE.phoneNumbers,
  emails: COMPANY_PROFILE.emails,
  gstNumber: COMPANY_PROFILE.gstNumber,
  panNumber: COMPANY_PROFILE.panNumber,
  fssaiMemco: COMPANY_PROFILE.fssaiMemco,
  fssaiBavla: COMPANY_PROFILE.fssaiBavla,
  isoCertificate: COMPANY_PROFILE.isoCertificate,
  haccpCertificate: COMPANY_PROFILE.haccpCertificate,
  registeredOffice: COMPANY_PROFILE.registeredOffice,
  corporateOffice: COMPANY_PROFILE.corporateOffice
};

export function CMSProvider({ children }: { children: ReactNode }) {
  const [pages, setPages] = useState<CMSPage[]>(() => {
    const saved = localStorage.getItem("punitdhan_cms_pages");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Clean up stale slugs that are no longer in INITIAL_PAGES
        const activeInitSlugs = INITIAL_PAGES.map(ip => ip.slug);
        const filtered = parsed.filter((p: any) => activeInitSlugs.includes(p.slug));
        
        // Force-update titles and SEO fields to ensure static copy/navigation updates take effect immediately
        const updated = filtered.map((p: any) => {
          const matchingInit = INITIAL_PAGES.find(ip => ip.slug === p.slug);
          if (matchingInit) {
            // Deduplicate unique sections on load to handle any corrupted local storage state
            const seenTypes = new Set<string>();
            const uniqueSections = (p.sections || []).filter((sec: any) => {
              if (!sec || !sec.type) return false;
              // Force remove organization, products, and leaders sections from the home page
              if (p.slug === "home" && (sec.type === "organization" || sec.type === "products" || sec.type === "leaders")) {
                return false;
              }
              const isUniqueType = ["hero", "stats", "about", "why-us", "strengths", "products", "operations", "leaders", "organization"].includes(sec.type);
              if (isUniqueType) {
                if (seenTypes.has(sec.type)) {
                  return false;
                }
                seenTypes.add(sec.type);
              }
              return true;
            });

            // Ensure why-us section exists on home page
            if (p.slug === "home" && !uniqueSections.some((s: any) => s.type === "why-us")) {
              const aboutIndex = uniqueSections.findIndex((s: any) => s.type === "about");
              const whyUsSec = DEFAULT_SECTIONS.home.find(s => s.type === "why-us");
              if (whyUsSec) {
                if (aboutIndex !== -1) {
                  uniqueSections.splice(aboutIndex + 1, 0, whyUsSec);
                } else {
                  uniqueSections.push(whyUsSec);
                }
              }
            }

            return {
              ...p,
              title: matchingInit.title,
              seo: matchingInit.seo,
              sections: uniqueSections
            };
          }
          return p;
        });
        
        // Append any missing initial pages
        INITIAL_PAGES.forEach(initPage => {
          if (!updated.some((p: any) => p.slug === initPage.slug)) {
            updated.push(initPage);
          }
        });
        
        // Sort updated list to preserve order of INITIAL_PAGES
        updated.sort((a: any, b: any) => activeInitSlugs.indexOf(a.slug) - activeInitSlugs.indexOf(b.slug));
        return updated;
      } catch (e) {
        return INITIAL_PAGES;
      }
    }
    return INITIAL_PAGES;
  });

  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>(() => {
    const saved = localStorage.getItem("punitdhan_cms_settings");
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [activePageSlug, setActivePageSlugState] = useState<string>(() => {
    const path = window.location.pathname.replace(/^\//, "").replace(/\/$/, "");
    return path || "home";
  });

  const setActivePageSlug = (slug: string) => {
    setActivePageSlugState(slug);
    const targetPath = slug === "home" ? "/" : `/${slug}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, "", targetPath);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, "").replace(/\/$/, "");
      setActivePageSlugState(path || "home");
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const [view, setView] = useState<"home" | "contact">("home");

  const [candidates, setCandidates] = useState<CandidateApplication[]>(() => {
    const saved = localStorage.getItem("punitdhan_candidates");
    return saved ? JSON.parse(saved) : [];
  });

  const [isBulkModalOpen, setIsBulkModalOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("punitdhan_candidates", JSON.stringify(candidates));
  }, [candidates]);

  const submitCandidate = (cand: Omit<CandidateApplication, "id" | "submittedAt">) => {
    const newCandidate: CandidateApplication = {
      ...cand,
      id: `cand-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      submittedAt: new Date().toISOString()
    };
    setCandidates(prev => [newCandidate, ...prev]);
  };

  const deleteCandidate = (id: string) => {
    setCandidates(prev => prev.filter(c => c.id !== id));
  };

  const clearAllCandidates = () => {
    setCandidates([]);
  };

  useEffect(() => {
    localStorage.setItem("punitdhan_cms_pages", JSON.stringify(pages));
  }, [pages]);

  useEffect(() => {
    localStorage.setItem("punitdhan_cms_settings", JSON.stringify(globalSettings));
  }, [globalSettings]);

  const addPage = (slug: string, title: string, seoTitle?: string) => {
    const formattedSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, "-");
    if (pages.some(p => p.slug === formattedSlug)) return;

    const newPage: CMSPage = {
      slug: formattedSlug,
      title: title,
      visible: true,
      seo: {
        metaTitle: seoTitle || `${title} | ${globalSettings.siteName}`,
        metaDescription: `Dynamic page content for ${title} on ${globalSettings.siteName}`,
        keywords: `${title}, pulses, grains, supply chain`
      },
      sections: [
        {
          id: `sec-${Date.now()}-custom`,
          type: "custom",
          title: `Welcome to ${title}`,
          subtitle: "Enterprise Dynamic Custom Section",
          content: "Use the site builder visual sidebar to customize this section, add headers, modify layout styles, and attach interactive call-to-action buttons.",
          buttonLabel: "Get In Touch",
          buttonLink: "#contact-footer",
          style: {
            typography: { titleSize: "text-4xl", fontFamily: "font-serif", alignment: "center" },
            background: { type: "solid", colorClass: "bg-brand-bg-light" },
            animation: { type: "fade", duration: 1.0 }
          }
        }
      ]
    };

    setPages([...pages, newPage]);
    setActivePageSlug(formattedSlug);
  };

  const deletePage = (slug: string) => {
    if (slug === "home") return; // Home page cannot be deleted
    const filtered = pages.filter(p => p.slug !== slug);
    setPages(filtered);
    if (activePageSlug === slug) {
      setActivePageSlug("home");
    }
  };

  const updatePageSeo = (slug: string, seo: CMSPage["seo"]) => {
    setPages(pages.map(p => p.slug === slug ? { ...p, seo } : p));
  };

  const updatePageTitle = (slug: string, title: string) => {
    setPages(pages.map(p => p.slug === slug ? { ...p, title } : p));
  };

  const addSection = (slug: string, type: CMSSection["type"]) => {
    // Generate preset structure based on section type
    let preset: Partial<CMSSection> = {
      title: `${type.toUpperCase()} Section`,
      subtitle: "Subheading/Details",
      content: "This is a dynamic template section added via the administrator CMS builder interface."
    };

    if (type === "custom") {
      preset = {
        title: "Crafting Value with High Integrity",
        subtitle: "Enterprise Dynamic Division",
        content: "We operate at absolute quality. Our customized divisions align seamlessly with standard food distribution policies.",
        buttonLabel: "Read More Documents",
        buttonLink: "#"
      };
    } else if (type === "stats") {
      preset = {
        title: "National Welfare Impact Matrix",
        subtitle: "Key Metric Achievements",
        content: "Track our operational numbers live.",
        items: KEY_ACHIEVEMENTS
      };
    } else if (type === "strengths") {
      preset = {
        title: "Our Processing Quality Pillars",
        subtitle: "Engineered For Trust",
        content: "Sourcing, purification, and reliable storage details.",
        items: STRENGTHS
      };
    } else if (type === "products") {
      preset = {
        title: "Select Agricultural Grains Portfolio",
        subtitle: "Purity & Nutritional Standard",
        content: "Browse our dynamic crop profiles.",
        items: PRODUCTS
      };
    } else if (type === "leaders") {
      preset = {
        title: "Governance & Operations Board",
        subtitle: "Qualified Professionals",
        content: "Our directors supervise our transparent supply network.",
        items: LEADERS
      };
    } else if (type === "operations") {
      preset = {
        title: "Cooperative Partnerships",
        subtitle: "Government Alliances",
        content: "Supplying top grains to various state procurement cells.",
        items: WELFARE_SCHEMES
      };
    }

    const newSection: CMSSection = {
      id: `sec-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      type,
      title: preset.title || "New Section",
      subtitle: preset.subtitle || "",
      content: preset.content || "",
      items: preset.items,
      buttonLabel: preset.buttonLabel || "",
      buttonLink: preset.buttonLink || "",
      images: preset.images || [],
      videoUrl: preset.videoUrl || "",
      style: {
        typography: { titleSize: "text-3xl", fontFamily: "font-serif", alignment: "center" },
        background: { type: "solid", colorClass: "bg-brand-bg-light" },
        animation: { type: "fade", duration: 1.0 }
      }
    };

    setPages(pages.map(p => {
      if (p.slug === slug) {
        // Enforce uniqueness for core section types to prevent duplication (e.g. products block)
        const isUniqueType = ["hero", "stats", "about", "strengths", "products", "operations", "leaders", "organization"].includes(type);
        if (isUniqueType && p.sections.some(s => s.type === type)) {
          return p; // Section type already exists on this page, do not duplicate
        }
        return {
          ...p,
          sections: [...p.sections, newSection]
        };
      }
      return p;
    }));
  };

  const deleteSection = (slug: string, sectionId: string) => {
    setPages(pages.map(p => {
      if (p.slug === slug) {
        return {
          ...p,
          sections: p.sections.filter(s => s.id !== sectionId)
        };
      }
      return p;
    }));
  };

  const updateSection = (slug: string, sectionId: string, updatedFields: Partial<CMSSection>) => {
    setPages(pages.map(p => {
      if (p.slug === slug) {
        return {
          ...p,
          sections: p.sections.map(s => {
            if (s.id === sectionId) {
              // Handle deep merging of style fields if updatedFields contains style
              if (updatedFields.style) {
                return {
                  ...s,
                  ...updatedFields,
                  style: {
                    ...s.style,
                    ...updatedFields.style,
                    typography: {
                      ...s.style.typography,
                      ...updatedFields.style.typography
                    },
                    background: {
                      ...s.style.background,
                      ...updatedFields.style.background
                    },
                    animation: {
                      ...s.style.animation,
                      ...updatedFields.style.animation
                    }
                  }
                };
              }
              return { ...s, ...updatedFields };
            }
            return s;
          })
        };
      }
      return p;
    }));
  };

  const reorderSections = (slug: string, sectionIds: string[]) => {
    setPages(pages.map(p => {
      if (p.slug === slug) {
        // Sort sections based on the incoming order of IDs
        const sorted = [...p.sections].sort((a, b) => {
          return sectionIds.indexOf(a.id) - sectionIds.indexOf(b.id);
        });
        return {
          ...p,
          sections: sorted
        };
      }
      return p;
    }));
  };

  const updateGlobalSettings = (settings: Partial<GlobalSettings>) => {
    setGlobalSettings(prev => ({
      ...prev,
      ...settings
    }));
  };

  const resetCMS = () => {
    setPages(INITIAL_PAGES);
    setGlobalSettings(INITIAL_SETTINGS);
    setActivePageSlug("home");
    localStorage.removeItem("punitdhan_cms_pages");
    localStorage.removeItem("punitdhan_cms_settings");
  };

  const exportCMS = () => {
    const dataStr = JSON.stringify({ pages, globalSettings }, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = "punitdhan_cms_export.json";
    
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const importCMS = (importedJson: string): boolean => {
    try {
      const parsed = JSON.parse(importedJson);
      if (parsed.pages && parsed.globalSettings) {
        setPages(parsed.pages);
        setGlobalSettings(parsed.globalSettings);
        setActivePageSlug("home");
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <CMSContext.Provider value={{
      pages,
      globalSettings,
      activePageSlug,
      setActivePageSlug,
      view,
      setView,
      addPage,
      deletePage,
      updatePageSeo,
      updatePageTitle,
      addSection,
      deleteSection,
      updateSection,
      reorderSections,
      updateGlobalSettings,
      resetCMS,
      exportCMS,
      importCMS,
      candidates,
      submitCandidate,
      deleteCandidate,
      clearAllCandidates,
      isBulkModalOpen,
      setIsBulkModalOpen
    }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
}
