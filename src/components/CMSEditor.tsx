import React, { useState } from "react";
import { useCMS, CMSSection, CMSPage } from "../context/CMSContext";
import { 
  Settings, Layers, FileText, Globe, Plus, Trash2, ArrowUp, ArrowDown, 
  RotateCcw, Download, Upload, LogOut, Check, Edit3, Type, Eye, Palette, Sparkles, ChevronRight, X,
  Users
} from "lucide-react";

export default function CMSEditor() {
  const { 
    pages, globalSettings, isAdmin, activePageSlug, setActivePageSlug, logout, view, setView,
    addPage, deletePage, updatePageSeo, updatePageTitle, addSection, deleteSection, 
    updateSection, reorderSections, updateGlobalSettings, resetCMS, exportCMS, importCMS,
    candidates, deleteCandidate, clearAllCandidates
  } = useCMS();

  const [activeTab, setActiveTab] = useState<"sections" | "pages" | "global" | "schema" | "candidates">("sections");
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  
  // Local state for candidates search and filters
  const [candidateSearch, setCandidateSearch] = useState("");
  const [candidatePositionFilter, setCandidatePositionFilter] = useState("All Positions");
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  
  // Local state for forms
  const [newPageName, setNewPageName] = useState("");
  const [newPageSlug, setNewPageSlug] = useState("");
  const [importJson, setImportJson] = useState("");
  const [importError, setImportError] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);

  if (!isAdmin) return null;

  const activePage = pages.find(p => p.slug === activePageSlug) || pages[0];

  const handleAddPageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPageName) return;
    const slug = newPageSlug || newPageName.toLowerCase().replace(/[^a-z0-9-]/g, "-");
    addPage(slug, newPageName);
    setNewPageName("");
    setNewPageSlug("");
    setActiveTab("pages");
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setImportError(false);
    setImportSuccess(false);
    const success = importCMS(importJson);
    if (success) {
      setImportSuccess(true);
      setImportJson("");
    } else {
      setImportError(true);
    }
  };

  // Helper to shift sections up or down
  const moveSection = (index: number, direction: "up" | "down") => {
    const newSections = [...activePage.sections];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    // Swap
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    reorderSections(activePage.slug, newSections.map(s => s.id));
  };

  const filteredCandidates = candidates ? candidates.filter(cand => {
    const matchesSearch = (cand.name || "").toLowerCase().includes(candidateSearch.toLowerCase()) || 
                          (cand.email || "").toLowerCase().includes(candidateSearch.toLowerCase());
    const matchesFilter = candidatePositionFilter === "All Positions" || cand.position === candidatePositionFilter;
    return matchesSearch && matchesFilter;
  }) : [];

  const selectedCandidate = candidates ? (candidates.find(c => c.id === selectedCandidateId) || filteredCandidates[0]) : null;

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      
      {/* Premium Dashboard Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 shadow-xl z-10">
        <div className="flex items-center gap-3">
          <span className="p-2 bg-[#f4d068] text-zinc-950 rounded-xl shadow-lg">
            <Settings className="w-6 h-6 animate-spin-slow" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif font-black tracking-tight text-white text-lg">PUNITDHAN</h1>
              <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">CMS Console</span>
            </div>
            <p className="text-[10px] text-zinc-400 font-mono">Professional Site Builder & Schema Management Panel</p>
          </div>
        </div>

        {/* Header Right Side Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setView("home")}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-mono text-xs font-bold rounded-xl transition-all border border-zinc-700 cursor-pointer shadow-md hover:-translate-y-0.5"
          >
            <span>← Back to Live Site</span>
          </button>
          <button 
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-950/40 hover:bg-red-900/40 border border-red-900/30 text-red-400 font-mono text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md"
          >
            <LogOut className="w-4 h-4" />
            <span>Secure Logout</span>
          </button>
        </div>
      </header>

      {/* Main Panel Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 w-full">
        
        {/* Left Side Tab Navigation */}
        <aside className="w-full lg:w-64 bg-zinc-900 border-b lg:border-b-0 lg:border-r border-zinc-800 p-4 shrink-0 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible">
          <div className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-widest px-3 mb-2 hidden lg:block">CONSOLE SERVICES</div>
          
          <button 
            onClick={() => { setActiveTab("sections"); setEditingSectionId(null); }}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 text-xs font-mono font-bold transition-all shrink-0 lg:shrink cursor-pointer ${activeTab === "sections" ? "bg-[#f4d068] text-zinc-950 shadow" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}`}
          >
            <Layers className="w-4 h-4" />
            <span>Layout Sections</span>
          </button>

          <button 
            onClick={() => { setActiveTab("pages"); setEditingSectionId(null); }}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 text-xs font-mono font-bold transition-all shrink-0 lg:shrink cursor-pointer ${activeTab === "pages" ? "bg-[#f4d068] text-zinc-950 shadow" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}`}
          >
            <FileText className="w-4 h-4" />
            <span>Pages Directory</span>
          </button>

          <button 
            onClick={() => { setActiveTab("global"); setEditingSectionId(null); }}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 text-xs font-mono font-bold transition-all shrink-0 lg:shrink cursor-pointer ${activeTab === "global" ? "bg-[#f4d068] text-zinc-950 shadow" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}`}
          >
            <Globe className="w-4 h-4" />
            <span>Global Settings</span>
          </button>

          <button 
            onClick={() => { setActiveTab("schema"); setEditingSectionId(null); }}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 text-xs font-mono font-bold transition-all shrink-0 lg:shrink cursor-pointer ${activeTab === "schema" ? "bg-[#f4d068] text-zinc-950 shadow" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}`}
          >
            <Download className="w-4 h-4" />
            <span>Export & Import</span>
          </button>

          <button 
            onClick={() => { setActiveTab("candidates"); setEditingSectionId(null); }}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 text-xs font-mono font-bold transition-all shrink-0 lg:shrink cursor-pointer ${activeTab === "candidates" ? "bg-[#f4d068] text-zinc-950 shadow" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}`}
          >
            <Users className="w-4 h-4" />
            <span className="flex items-center justify-between w-full">
              <span>Candidates Hub</span>
              {candidates && candidates.length > 0 && (
                <span className="bg-red-500 text-white text-[9px] font-sans px-1.5 py-0.5 rounded-full font-extrabold animate-pulse">
                  {candidates.length}
                </span>
              )}
            </span>
          </button>

          {/* Page switching contextual box */}
          <div className="mt-auto pt-4 border-t border-zinc-800 text-xs hidden lg:block">
            <div className="bg-zinc-950/45 p-3.5 border border-zinc-850 rounded-xl space-y-2">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Editing Target</span>
              <div className="flex items-center gap-1.5 font-mono text-zinc-350">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-bold">{activePage.title}</span>
              </div>
              <p className="text-[10px] text-zinc-500 font-mono">Slug: /{activePage.slug}</p>
            </div>
          </div>
        </aside>

        {/* Main Workspace Body */}
        <main className="flex-1 bg-zinc-950 p-6 overflow-y-auto">
          
          {/* SECTIONS TAB */}
          {activeTab === "sections" && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-fadeIn h-full">
              {/* Left Column: Sections List */}
              <div className="xl:col-span-5 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-850 pb-2.5">
                  <div>
                    <h2 className="text-sm font-mono text-zinc-400 uppercase font-black tracking-wider">Page Sections</h2>
                    <p className="text-[10px] text-zinc-500 font-mono">Active Layout structure for "{activePage.title}"</p>
                  </div>
                  
                  {/* Page Selector dropdown in the full screen panel */}
                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    <span className="text-zinc-500 text-[10px] uppercase font-bold">Target Page:</span>
                    <select
                      value={activePageSlug}
                      onChange={(e) => {
                        setActivePageSlug(e.target.value);
                        setEditingSectionId(null);
                      }}
                      className="bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-[#f4d068] cursor-pointer"
                    >
                      {pages.map(p => (
                        <option key={p.slug} value={p.slug}>{p.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Drag/reorder section listing */}
                <div className="space-y-2.5 max-h-[50vh] xl:max-h-[62vh] overflow-y-auto pr-1">
                  {activePage.sections.map((sec, idx) => {
                    const isEditing = sec.id === editingSectionId;
                    return (
                      <div 
                        key={sec.id}
                        onClick={() => setEditingSectionId(sec.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${isEditing ? "bg-zinc-900 border-[#f4d068] shadow-lg shadow-[#f4d068]/5" : "bg-zinc-900/60 border-zinc-850 hover:border-zinc-700"}`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-mono font-black bg-[#f4d068]/15 text-[#f4d068] px-2 py-0.5 rounded uppercase">
                              {sec.type}
                            </span>
                            <span className="text-[10px] text-zinc-500 font-mono">#{idx + 1}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white mt-1.5 truncate">{sec.title || "Untitled Section"}</h4>
                          <p className="text-[11px] text-zinc-500 truncate mt-0.5">{sec.subtitle || sec.content}</p>
                        </div>

                        {/* Move & Edit Controls */}
                        <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                          <button 
                            disabled={idx === 0}
                            onClick={() => moveSection(idx, "up")}
                            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors disabled:opacity-30 cursor-pointer"
                            title="Move Section Up"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button 
                            disabled={idx === activePage.sections.length - 1}
                            onClick={() => moveSection(idx, "down")}
                            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors disabled:opacity-30 cursor-pointer"
                            title="Move Section Down"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setEditingSectionId(sec.id)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${isEditing ? "bg-[#f4d068] text-zinc-950" : "text-emerald-400 hover:text-white hover:bg-emerald-950/40"}`}
                            title="Edit Content"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          {activePage.sections.length > 1 && (
                            <button 
                              onClick={() => {
                                if (window.confirm("Are you sure you want to delete this section?")) {
                                  deleteSection(activePage.slug, sec.id);
                                  if (isEditing) setEditingSectionId(null);
                                }
                              }}
                              className="p-1.5 text-red-400 hover:text-white hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                              title="Delete Section"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Add dynamic section builder block */}
                <div className="p-4 bg-zinc-900 border border-zinc-850 rounded-2xl">
                  <h5 className="text-xs font-mono font-bold text-zinc-400 flex items-center gap-1.5 mb-3">
                    <Plus className="w-4 h-4 text-[#f4d068]" />
                    <span>ADD SECTION BLOCK</span>
                  </h5>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px] font-mono">
                    {[
                      { type: "custom", label: "Custom Block" },
                      { type: "hero", label: "Hero Banner" },
                      { type: "stats", label: "Stats Matrix" },
                      { type: "about", label: "About Summary" },
                      { type: "strengths", label: "Core Strength" },
                      { type: "products", label: "Product Grid" },
                      { type: "operations", label: "Welfare Org" },
                      { type: "leaders", label: "Board Members" },
                      { type: "organization", label: "Compliance Reg" }
                    ].map(sc => (
                      <button
                        key={sc.type}
                        onClick={() => {
                          addSection(activePage.slug, sc.type as any);
                        }}
                        className="bg-zinc-850 hover:bg-[#f4d068] hover:text-zinc-950 text-zinc-300 border border-zinc-800 rounded-xl py-2 px-1 text-center transition-all cursor-pointer font-bold"
                      >
                        + {sc.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Section Properties Form */}
              <div className="xl:col-span-7 bg-zinc-900 border border-zinc-850 rounded-2xl p-5 flex flex-col min-h-[50vh] xl:min-h-[72vh]">
                {editingSectionId ? (
                  (() => {
                    const section = activePage.sections.find(s => s.id === editingSectionId);
                    if (!section) return null;
                    return (
                      <div className="space-y-4 flex-1 flex flex-col">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-black bg-[#f4d068]/15 text-[#f4d068] px-2.5 py-1 rounded-full uppercase">
                              {section.type} BLOCK
                            </span>
                            <span className="text-xs text-zinc-500 font-mono">ID: {section.id}</span>
                          </div>
                          <button 
                            onClick={() => setEditingSectionId(null)}
                            className="text-xs text-zinc-400 hover:text-white hover:underline flex items-center gap-1 font-mono cursor-pointer"
                          >
                            ✕ Close Editor
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Header/Title fields */}
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider block">Section Main Title</label>
                            <input 
                              type="text" 
                              value={section.title}
                              onChange={(e) => updateSection(activePage.slug, section.id, { title: e.target.value })}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#f4d068] transition-colors"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider block">Section Subtitle</label>
                            <input 
                              type="text" 
                              value={section.subtitle}
                              onChange={(e) => updateSection(activePage.slug, section.id, { subtitle: e.target.value })}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#f4d068] transition-colors"
                            />
                          </div>
                        </div>

                        {/* Content Area */}
                        <div className="space-y-1.5 flex-1 flex flex-col">
                          <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider block">Primary Content Body (Text/Markdown)</label>
                          <textarea 
                            rows={8}
                            value={section.content}
                            onChange={(e) => updateSection(activePage.slug, section.id, { content: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#f4d068] leading-relaxed resize-y font-sans flex-1"
                          />
                        </div>

                        {/* Video/Image settings for Hero/Custom */}
                        {(section.type === "hero" || section.type === "custom") && (
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider block">Dynamic Video URL</label>
                            <input 
                              type="text" 
                              value={section.videoUrl || ""}
                              onChange={(e) => updateSection(activePage.slug, section.id, { videoUrl: e.target.value })}
                              placeholder="Poster/Video source .mp4 link"
                              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#f4d068] transition-colors font-mono"
                            />
                          </div>
                        )}

                        {/* Button Config */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-zinc-950/40 rounded-xl border border-zinc-800">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider block">CTA Button Label</label>
                            <input 
                              type="text" 
                              value={section.buttonLabel || ""}
                              onChange={(e) => updateSection(activePage.slug, section.id, { buttonLabel: e.target.value })}
                              placeholder="Explore Products"
                              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#f4d068]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider block">CTA Button Link</label>
                            <input 
                              type="text" 
                              value={section.buttonLink || ""}
                              onChange={(e) => updateSection(activePage.slug, section.id, { buttonLink: e.target.value })}
                              placeholder="#products"
                              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#f4d068] font-mono"
                            />
                          </div>
                        </div>

                        {/* Style Customization Section */}
                        <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-4">
                          <div className="flex items-center gap-1.5 text-[#f4d068] text-xs font-mono font-bold uppercase tracking-wide">
                            <Palette className="w-4 h-4" />
                            <span>BLOCK TYPOGRAPHY & VISUALS</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Title Font Size */}
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">Main Heading Size</label>
                              <div className="grid grid-cols-5 gap-1 text-[10px]">
                                {["text-2xl", "text-3xl", "text-4xl", "text-5xl", "text-6xl"].map(sz => (
                                  <button
                                    key={sz}
                                    type="button"
                                    onClick={() => updateSection(activePage.slug, section.id, {
                                      style: { ...section.style, typography: { ...section.style.typography, titleSize: sz as any } }
                                    })}
                                    className={`py-1.5 rounded-lg text-center border font-mono transition-all font-bold cursor-pointer ${section.style.typography.titleSize === sz ? "bg-[#f4d068] text-zinc-950 border-[#f4d068]" : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"}`}
                                  >
                                    {sz.replace("text-", "")}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Font Family */}
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">Typography Pairing</label>
                              <div className="grid grid-cols-3 gap-1 text-[10px] font-mono">
                                {["font-serif", "font-sans", "font-mono"].map(f => (
                                  <button
                                    key={f}
                                    type="button"
                                    onClick={() => updateSection(activePage.slug, section.id, {
                                      style: { ...section.style, typography: { ...section.style.typography, fontFamily: f as any } }
                                    })}
                                    className={`py-1.5 rounded-lg text-center border transition-all cursor-pointer ${section.style.typography.fontFamily === f ? "bg-[#f4d068] text-zinc-950 border-[#f4d068]" : "bg-zinc-900 border-zinc-800 text-zinc-400"}`}
                                  >
                                    {f.replace("font-", "")}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Text Alignment */}
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">Text Alignment</label>
                              <div className="grid grid-cols-3 gap-1 text-[10px] font-mono">
                                {["left", "center", "right"].map(al => (
                                  <button
                                    key={al}
                                    type="button"
                                    onClick={() => updateSection(activePage.slug, section.id, {
                                      style: { ...section.style, typography: { ...section.style.typography, alignment: al as any } }
                                    })}
                                    className={`py-1.5 rounded-lg text-center border transition-all cursor-pointer uppercase ${section.style.typography.alignment === al ? "bg-[#f4d068] text-zinc-950 border-[#f4d068]" : "bg-zinc-900 border-zinc-800 text-zinc-400"}`}
                                  >
                                    {al}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Background Custom Class */}
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">Background Utility Class</label>
                              <input 
                                type="text" 
                                value={section.style.background.colorClass}
                                onChange={(e) => updateSection(activePage.slug, section.id, {
                                  style: { ...section.style, background: { ...section.style.background, colorClass: e.target.value } }
                                })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#f4d068] font-mono"
                                placeholder="bg-zinc-900, bg-brand-bg-light, etc."
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Motion Entrance */}
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">Motion Entrance Animation</label>
                              <select
                                value={section.style.animation.type}
                                onChange={(e) => updateSection(activePage.slug, section.id, {
                                  style: { ...section.style, animation: { ...section.style.animation, type: e.target.value as any } }
                                })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none font-mono"
                              >
                                <option value="fade">Fade In</option>
                                <option value="slide">Slide Up</option>
                                <option value="zoom">Zoom</option>
                                <option value="none">None</option>
                              </select>
                            </div>

                            {/* Duration (seconds) */}
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">Transition Speed (seconds)</label>
                              <input 
                                type="number"
                                step="0.1"
                                value={section.style.animation.duration}
                                onChange={(e) => updateSection(activePage.slug, section.id, {
                                  style: { ...section.style, animation: { ...section.style.animation, duration: parseFloat(e.target.value) || 1.0 } }
                                })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-zinc-500 space-y-3 font-mono">
                    <Layers className="w-12 h-12 text-zinc-700 animate-pulse" />
                    <div>
                      <p className="font-bold text-zinc-350 text-sm">Workspace Editor Idle</p>
                      <p className="text-xs max-w-sm mt-1">Select any website section block from the left-hand index layout by clicking its ✎ Edit icon to customize content, typography, button settings, and background visual styles instantly.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PAGES TAB */}
          {activeTab === "pages" && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-fadeIn">
              {/* Left Column: Pages Registry */}
              <div className="xl:col-span-6 space-y-4">
                <div>
                  <h2 className="text-sm font-mono text-zinc-400 uppercase font-black tracking-wider border-b border-zinc-850 pb-2">Unlimited Pages Directory</h2>
                  <p className="text-xs text-zinc-500 font-mono mt-1">Configure user navigation layers and customize separate, individual layout structures.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pages.map(p => (
                    <div 
                      key={p.slug}
                      className={`p-4 rounded-2xl border transition-all ${activePageSlug === p.slug ? "bg-zinc-900 border-[#f4d068] shadow-lg shadow-[#f4d068]/5" : "bg-zinc-900/45 border-zinc-850 hover:border-zinc-850"}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                            <FileText className="w-4 h-4 text-[#f4d068]" />
                            <span>{p.title}</span>
                          </h4>
                          <span className="text-[10px] text-zinc-500 font-mono mt-1 block">Slug: /{p.slug}</span>
                        </div>

                        {p.slug !== "home" && (
                          <button 
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete page "${p.title}"?`)) {
                                deletePage(p.slug);
                              }
                            }}
                            className="p-1.5 text-red-400 hover:text-white hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                            title="Delete Custom Page"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-zinc-850 flex items-center justify-between">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase">Status: Published</span>
                        <button 
                          onClick={() => setActivePageSlug(p.slug)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${activePageSlug === p.slug ? "bg-[#f4d068] text-zinc-950 shadow" : "bg-zinc-850 text-zinc-400 hover:text-white"}`}
                        >
                          {activePageSlug === p.slug ? "Viewing Page" : "Select to Edit"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Create Custom Page form inside the registry box */}
                <form onSubmit={handleAddPageSubmit} className="p-5 bg-zinc-900 border border-zinc-850 rounded-2xl space-y-4 mt-4">
                  <h5 className="text-xs font-mono font-bold text-[#f4d068] flex items-center gap-1.5 border-b border-zinc-800 pb-2">
                    <Plus className="w-4 h-4" />
                    <span>CREATE NEW DYNAMIC CUSTOM PAGE</span>
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider block">Page Title/Name</label>
                      <input 
                        type="text"
                        required
                        value={newPageName}
                        onChange={(e) => setNewPageName(e.target.value)}
                        placeholder="e.g. CSR Activities"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#f4d068] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider block">Custom URL Slug (Optional)</label>
                      <input 
                        type="text"
                        value={newPageSlug}
                        onChange={(e) => setNewPageSlug(e.target.value)}
                        placeholder="e.g. csr-activities"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#f4d068] transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#f4d068] text-zinc-950 font-black py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:scale-[1.01] transition-all font-mono"
                  >
                    <span>Create Custom Workspace Page</span>
                  </button>
                </form>
              </div>

              {/* Right Column: Page SEO Settings */}
              <div className="xl:col-span-6 bg-zinc-900 border border-zinc-850 rounded-2xl p-5 space-y-4">
                <div>
                  <h2 className="text-sm font-mono text-zinc-400 uppercase font-black tracking-wider border-b border-zinc-850 pb-2">Page SEO Meta Settings</h2>
                  <p className="text-xs text-zinc-500 font-mono mt-1">Configure search engine crawlers and metadata details for "{activePage.title}".</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider block">Meta Title</label>
                    <input 
                      type="text"
                      value={activePage.seo.metaTitle}
                      onChange={(e) => updatePageSeo(activePage.slug, { ...activePage.seo, metaTitle: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#f4d068] transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider block">Meta Description</label>
                    <textarea 
                      rows={4}
                      value={activePage.seo.metaDescription}
                      onChange={(e) => updatePageSeo(activePage.slug, { ...activePage.seo, metaDescription: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#f4d068] transition-colors leading-relaxed font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider block">Meta Keywords</label>
                    <input 
                      type="text"
                      value={activePage.seo.keywords}
                      onChange={(e) => updatePageSeo(activePage.slug, { ...activePage.seo, keywords: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#f4d068] transition-colors font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* GLOBAL TAB */}
          {activeTab === "global" && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-sm font-mono text-zinc-400 uppercase font-black tracking-wider border-b border-zinc-850 pb-2">Global Settings Management</h2>
                <p className="text-xs text-zinc-500 font-mono mt-1">Modify global organization profiles, registry ID numbers, certificates, and compliance registries.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Branding & Subtitle */}
                <div className="bg-zinc-900 border border-zinc-850 p-5 rounded-2xl space-y-4">
                  <h3 className="text-xs font-mono font-bold text-[#f4d068] flex items-center gap-1.5 border-b border-zinc-800 pb-2 uppercase tracking-wide">Branding & Corporate Title</h3>
                  
                  <div className="space-y-3 font-sans text-xs">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase block">Site/Company Name</label>
                      <input 
                        type="text"
                        value={globalSettings.siteName}
                        onChange={(e) => updateGlobalSettings({ siteName: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#f4d068]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase block">Nature of Business</label>
                      <input 
                        type="text"
                        value={globalSettings.siteSubtitle}
                        onChange={(e) => updateGlobalSettings({ siteSubtitle: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#f4d068]"
                      />
                    </div>
                  </div>
                </div>

                {/* Government registries */}
                <div className="bg-zinc-900 border border-zinc-850 p-5 rounded-2xl space-y-4">
                  <h3 className="text-xs font-mono font-bold text-[#f4d068] flex items-center gap-1.5 border-b border-zinc-800 pb-2 uppercase tracking-wide">Identity & Tax Registries</h3>
                  
                  <div className="space-y-3 font-sans text-xs">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase block">GST Number</label>
                      <input 
                        type="text"
                        value={globalSettings.gstNumber}
                        onChange={(e) => updateGlobalSettings({ gstNumber: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#f4d068] font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase block">FSSAI License (Naroda, Ahmedabad)</label>
                      <input 
                        type="text"
                        value={globalSettings.fssaiMemco}
                        onChange={(e) => updateGlobalSettings({ fssaiMemco: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#f4d068] font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase block">FSSAI License (Bavla Plant)</label>
                      <input 
                        type="text"
                        value={globalSettings.fssaiBavla}
                        onChange={(e) => updateGlobalSettings({ fssaiBavla: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#f4d068] font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Compliances and Certifications */}
                <div className="bg-zinc-900 border border-zinc-850 p-5 rounded-2xl space-y-4">
                  <h3 className="text-xs font-mono font-bold text-[#f4d068] flex items-center gap-1.5 border-b border-zinc-800 pb-2 uppercase tracking-wide">Compliances & Certificates</h3>
                  
                  <div className="space-y-3 font-sans text-xs">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase block">ISO Quality Standards</label>
                      <input 
                        type="text"
                        value={globalSettings.isoCertificate}
                        onChange={(e) => updateGlobalSettings({ isoCertificate: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#f4d068]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase block">HACCP Certificate</label>
                      <input 
                        type="text"
                        value={globalSettings.haccpCertificate}
                        onChange={(e) => updateGlobalSettings({ haccpCertificate: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#f4d068]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCHEMA & DATA ACTIONS TAB */}
          {activeTab === "schema" && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-fadeIn">
              {/* Left Column: Export schema */}
              <div className="xl:col-span-6 bg-zinc-900 border border-zinc-850 p-6 rounded-2xl space-y-5">
                <div>
                  <h2 className="text-sm font-mono text-zinc-400 uppercase font-black tracking-wider border-b border-zinc-800 pb-2 flex items-center gap-2">
                    <Download className="w-5 h-5 text-[#f4d068]" />
                    <span>Download Schema Backup</span>
                  </h2>
                  <p className="text-xs text-zinc-500 font-mono mt-1">Download the entire website layout, styles, custom pages, and settings as a standard JSON schema file.</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-xs text-zinc-400 leading-relaxed font-sans">
                    Our schema engine saves all copy and styles inside a transportable database-less client bundle. Applying this file in any installation will replicate this website build completely.
                  </div>

                  <button 
                    onClick={exportCMS}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:scale-[1.01]"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Schema File</span>
                  </button>
                </div>

                {/* Reset to original default template */}
                <div className="pt-6 border-t border-zinc-800 space-y-3">
                  <h4 className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">Danger Zone</h4>
                  <p className="text-[11px] text-zinc-500 font-mono">Revert all page configurations back to Punitdhan Pulses original template.</p>
                  <button 
                    onClick={() => {
                      if (window.confirm("Restore entire site to Punitdhan Pulses original corporate catalog? This deletes all custom pages and styles permanently.")) {
                        resetCMS();
                      }
                    }}
                    className="w-full bg-red-950/20 hover:bg-red-900/30 border border-red-900/40 text-red-400 font-mono py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset Entire Site to Factory Default</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Import schema */}
              <div className="xl:col-span-6 bg-zinc-900 border border-zinc-850 p-6 rounded-2xl space-y-4">
                <div>
                  <h2 className="text-sm font-mono text-[#f4d068] uppercase font-black tracking-wider border-b border-zinc-800 pb-2 flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    <span>Upload Website Schema</span>
                  </h2>
                  <p className="text-xs text-zinc-500 font-mono mt-1">Paste a previously downloaded JSON schema file to hot-rebuild this site live.</p>
                </div>

                <form onSubmit={handleImportSubmit} className="space-y-4">
                  <textarea 
                    rows={8}
                    required
                    value={importJson}
                    onChange={(e) => setImportJson(e.target.value)}
                    placeholder='Paste JSON schema text (starting with {"pages": ...}) here...'
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-xs font-mono text-white focus:outline-none focus:border-[#f4d068]"
                  />

                  <button 
                    type="submit"
                    className="w-full bg-zinc-800 hover:bg-[#f4d068] hover:text-zinc-950 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer font-mono"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Verify & Apply Uploaded Schema</span>
                  </button>

                  {importSuccess && (
                    <p className="text-xs text-emerald-400 font-bold mt-2 bg-emerald-950/40 p-3 border border-emerald-500/20 rounded-xl font-mono">
                      ✓ Schema successfully imported! Site rebuilt live.
                    </p>
                  )}
                  {importError && (
                    <p className="text-xs text-red-400 font-bold mt-2 bg-red-950/40 p-3 border border-red-500/20 rounded-xl font-mono">
                      ✕ Invalid schema. Please verify JSON structure and fields.
                    </p>
                  )}
                </form>
              </div>
            </div>
          )}

          {activeTab === "candidates" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn text-left">
              
              {/* Left Column: Candidates list */}
              <div className="lg:col-span-5 bg-zinc-900 border border-zinc-850 rounded-2xl p-5 flex flex-col h-[650px] space-y-4">
                
                {/* Search & Filter Header */}
                <div className="space-y-3 shrink-0">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <h2 className="text-sm font-mono text-[#f4d068] uppercase font-black tracking-wider flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      <span>Candidates Hub ({filteredCandidates.length})</span>
                    </h2>
                    {candidates && candidates.length > 0 && (
                      <button 
                        onClick={() => {
                          if (window.confirm("Are you sure you want to clear all candidate entries permanently?")) {
                            clearAllCandidates();
                            setSelectedCandidateId(null);
                          }
                        }}
                        className="text-[10px] font-mono text-red-400 hover:text-red-300 font-bold hover:underline cursor-pointer"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <input 
                      type="text"
                      value={candidateSearch}
                      onChange={(e) => setCandidateSearch(e.target.value)}
                      placeholder="Search by name or email..."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#f4d068]"
                    />

                    <select
                      value={candidatePositionFilter}
                      onChange={(e) => setCandidatePositionFilter(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-zinc-400 focus:outline-none focus:border-[#f4d068] cursor-pointer"
                    >
                      <option>All Positions</option>
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

                {/* Candidate Listings Scroll Area */}
                <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                  {filteredCandidates.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500 space-y-2">
                      <Users className="w-10 h-10 stroke-[1.5] opacity-40 text-zinc-400" />
                      <div>
                        <p className="text-xs font-bold text-zinc-400">No applications found</p>
                        <p className="text-[10px] text-zinc-600 font-mono mt-0.5">Submit candidates via the Career page.</p>
                      </div>
                    </div>
                  ) : (
                    filteredCandidates.map(cand => {
                      const isSelected = selectedCandidate?.id === cand.id;
                      return (
                        <div 
                          key={cand.id}
                          onClick={() => setSelectedCandidateId(cand.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left space-y-2 ${
                            isSelected 
                              ? "bg-[#f4d068]/10 border-[#f4d068]/30 shadow-md" 
                              : "bg-zinc-950/40 border-zinc-850 hover:bg-zinc-950 hover:border-zinc-800"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="text-xs font-bold text-white font-sans">{cand.name}</h4>
                              <p className="text-[10px] text-zinc-500 truncate max-w-[180px] font-mono mt-0.5">{cand.email}</p>
                            </div>
                            <span className="text-[9px] font-mono text-[#f4d068] bg-[#f4d068]/10 px-2 py-0.5 rounded border border-[#f4d068]/20 whitespace-nowrap">
                              {new Date(cand.submittedAt).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span className="truncate">{cand.position}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right Column: Active candidate details */}
              <div className="lg:col-span-7 bg-zinc-900 border border-zinc-850 rounded-2xl p-6 h-[650px] flex flex-col">
                {selectedCandidate ? (
                  <div className="flex flex-col h-full space-y-6 animate-fadeIn">
                    
                    {/* Candidate Identity Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-5 gap-4 shrink-0">
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#f4d068] font-bold bg-[#f4d068]/10 px-2.5 py-1 rounded border border-[#f4d068]/15">
                          {selectedCandidate.experience}
                        </span>
                        <h2 className="text-xl font-serif font-bold text-white mt-1.5">{selectedCandidate.name}</h2>
                        <p className="text-xs text-zinc-400 font-mono flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span>Applied position: <strong className="text-white">{selectedCandidate.position}</strong></span>
                        </p>
                      </div>

                      <button 
                        onClick={() => {
                          if (window.confirm(`Permanently remove ${selectedCandidate.name}'s application?`)) {
                            deleteCandidate(selectedCandidate.id);
                            setSelectedCandidateId(null);
                          }
                        }}
                        className="text-xs font-mono font-bold text-red-400 hover:text-red-300 bg-red-950/20 border border-red-900/35 px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer self-start sm:self-center hover:bg-red-950/40 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Entry</span>
                      </button>
                    </div>

                    {/* Scrolling Profile Body */}
                    <div className="flex-1 overflow-y-auto space-y-5 pr-1 custom-scrollbar text-left text-xs text-zinc-300">
                      
                      {/* Interactive Contact Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-zinc-950/50 border border-zinc-850 rounded-xl p-3.5 space-y-1">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase font-bold tracking-wider">Email Contact</span>
                          <a href={`mailto:${selectedCandidate.email}`} className="text-xs font-mono font-bold text-emerald-400 hover:underline block truncate">
                            {selectedCandidate.email}
                          </a>
                        </div>
                        <div className="bg-zinc-950/50 border border-zinc-850 rounded-xl p-3.5 space-y-1">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase font-bold tracking-wider">Phone Contact</span>
                          <a href={`tel:${selectedCandidate.phone}`} className="text-xs font-mono font-bold text-emerald-400 hover:underline block truncate">
                            {selectedCandidate.phone}
                          </a>
                        </div>
                      </div>

                      {/* Resume Download / View Card */}
                      <div className="bg-zinc-950/80 border border-emerald-500/10 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="p-3.5 bg-emerald-950/60 text-emerald-400 border border-emerald-500/25 rounded-xl">
                            <FileText className="w-7 h-7" />
                          </span>
                          <div>
                            <h4 className="text-xs font-bold text-white">Curriculum Vitae (CV)</h4>
                            <p className="text-[10px] text-zinc-400 font-mono mt-0.5">Stored successfully in local CMS sandbox</p>
                          </div>
                        </div>

                        <div className="border-t border-zinc-850 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono">
                          <div className="text-zinc-500">
                            <p className="text-zinc-400 truncate max-w-xs">{selectedCandidate.resumeName}</p>
                            <p className="text-[9px] text-zinc-600 mt-0.5">{selectedCandidate.resumeSize} • {selectedCandidate.resumeType}</p>
                          </div>
                          
                          <a 
                            href={selectedCandidate.resumeDataUrl}
                            download={selectedCandidate.resumeName}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-black px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md hover:scale-[1.02]"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download Resume</span>
                          </a>
                        </div>
                      </div>

                      {/* Statement message */}
                      <div className="space-y-2">
                        <h4 className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-wider">Candidate Statement Note</h4>
                        <div className="bg-zinc-950/40 border border-zinc-850 rounded-xl p-4 text-zinc-300 leading-relaxed font-sans whitespace-pre-wrap">
                          {selectedCandidate.message || "No custom message or cover note was attached by the candidate."}
                        </div>
                      </div>

                      {/* Metadata row */}
                      <div className="pt-4 border-t border-zinc-850 text-[10px] font-mono text-zinc-600 flex items-center justify-between">
                        <span>Candidate UUID: {selectedCandidate.id}</span>
                        <span>Filed: {new Date(selectedCandidate.submittedAt).toLocaleString()}</span>
                      </div>

                    </div>

                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500 space-y-2">
                    <Users className="w-12 h-12 stroke-[1.2] opacity-30 text-zinc-400" />
                    <div>
                      <p className="text-sm font-bold text-zinc-400">No Candidate Selected</p>
                      <p className="text-xs text-zinc-600 font-mono mt-1">Select an applicant from the left sidebar to inspect and download their resume.</p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

        </main>
      </div>

      {/* Footer controls */}
      <footer className="p-4 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between text-xs shrink-0 font-mono text-zinc-500">
        <span>Logged in: Punitdhan System Administrator</span>
        <button 
          onClick={logout}
          className="text-red-400 hover:text-red-300 flex items-center gap-1 font-bold cursor-pointer transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Secure Logout</span>
        </button>
      </footer>

    </div>
  );
}
