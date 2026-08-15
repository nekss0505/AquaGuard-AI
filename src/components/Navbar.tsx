import React, { useState, useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";
import {
  Droplets,
  Bell,
  Globe,
  Menu,
  LayoutDashboard,
  MapPin,
  FileEdit,
  Bot,
  Stethoscope,
  ChevronDown,
  BookOpen,
  Sliders,
  BarChart3,
  Check,
  Layers,
  Sparkles,
} from "lucide-react";
import { Language, Page } from "../types";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const {
    page,
    setPage,
    language,
    setLanguage,
    unreadAlertsCount,
    elderMode,
    toggleElderMode,
    t,
  } = useApp();

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const toolsMenuRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string; native: string; flag: string }[] = [
    { code: "en", label: "English", native: "English", flag: "🇬🇧" },
    { code: "ta", label: "Tamil", native: "தமிழ்", flag: "🇮🇳" },
    { code: "hi", label: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
    { code: "bn", label: "Bengali", native: "বাংলা", flag: "🇮🇳" },
  ];

  const toolsNav: { id: Page; label: string; icon: any; desc: string }[] = [
    { id: "water", label: t.navWater, icon: Droplets, desc: "IoT Sensors & Telemetry" },
    { id: "awareness", label: t.navAwareness, icon: BookOpen, desc: "Health & Boil Guides" },
    { id: "simulator", label: t.navSimulator, icon: Sliders, desc: "What-If Scenario Lab" },
    { id: "health-worker", label: t.navHealthWorker, icon: Stethoscope, desc: "ASHA / ANM Desk" },
    { id: "admin", label: t.navAdmin, icon: BarChart3, desc: "District Surveillance" },
  ];

  const currentLangObj = languages.find((l) => l.code === language) || languages[0];

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target as Node)) {
        setIsToolsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs backdrop-blur-md bg-white/95">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition cursor-pointer flex items-center justify-center"
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button
              onClick={() => setPage("dashboard")}
              className="flex items-center space-x-2.5 text-left cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-teal-600 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-teal-500/25 group-hover:scale-105 transition-transform">
                <Droplets className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 font-['Outfit',sans-serif]">
                    Aqua<span className="text-teal-600">Guard</span>
                  </span>
                  <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200/80 text-[10px] font-extrabold tracking-wide uppercase whitespace-nowrap">
                    {t.waterSentinel}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold -mt-0.5 hidden sm:block">
                  Tamil Nadu Sentinel System
                </span>
              </div>
            </button>
          </div>

          {/* Center: Clean Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setPage("dashboard")}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                page === "dashboard"
                  ? "bg-teal-600 text-white shadow-sm shadow-teal-600/30"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>{t.navDashboard}</span>
            </button>

            <button
              onClick={() => setPage("map")}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                page === "map"
                  ? "bg-teal-600 text-white shadow-sm shadow-teal-600/30"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
            >
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{t.navMap}</span>
            </button>

            <button
              onClick={() => setPage("report")}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                page === "report"
                  ? "bg-teal-600 text-white shadow-sm shadow-teal-600/30"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
            >
              <FileEdit className="w-4 h-4 shrink-0" />
              <span>{t.reportConcern}</span>
            </button>

            <button
              onClick={() => setPage("aquaguide")}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                page === "aquaguide"
                  ? "bg-teal-600 text-white shadow-sm shadow-teal-600/30"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
            >
              <Bot className="w-4 h-4 shrink-0" />
              <span>{t.navAquaGuide}</span>
            </button>

            <button
              onClick={() => setPage("alerts")}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap relative ${
                page === "alerts"
                  ? "bg-teal-600 text-white shadow-sm shadow-teal-600/30"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
            >
              <Bell className="w-4 h-4 shrink-0" />
              <span>{t.navAlerts}</span>
              {unreadAlertsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-black bg-red-600 text-white animate-pulse">
                  {unreadAlertsCount}
                </span>
              )}
            </button>

            {/* Specialist Tools Dropdown */}
            <div className="relative" ref={toolsMenuRef}>
              <button
                onClick={() => setIsToolsMenuOpen(!isToolsMenuOpen)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  isToolsMenuOpen || ["water", "awareness", "simulator", "health-worker", "admin"].includes(page)
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-700 hover:bg-slate-100/80"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{t.moreTools}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>

              {isToolsMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-slate-100 mb-1">
                    {t.specialistTools}
                  </div>
                  {toolsNav.map((tool) => {
                    const Icon = tool.icon;
                    const isActive = page === tool.id;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => {
                          setPage(tool.id);
                          setIsToolsMenuOpen(false);
                        }}
                        className={`w-full flex items-start space-x-3 p-2.5 rounded-xl text-left transition cursor-pointer ${
                          isActive
                            ? "bg-teal-50 text-teal-900 font-bold"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <div className="p-1.5 rounded-lg bg-teal-100/80 text-teal-700 shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-slate-900 truncate">
                            {tool.label}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate">
                            {tool.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Corner: Live IST Clock + Quick Elder Toggle + Global Language Dropdown */}
          <div className="flex items-center space-x-2 shrink-0">
            {/* Live IST Clock Badge */}
            <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-[11px] font-black text-slate-800">
                22:00 IST
              </span>
              <span className="text-[9px] font-bold text-teal-700 bg-teal-100/80 px-1 py-0.2 rounded">
                Live
              </span>
            </div>

            {/* Quick Simple / Elder Mode Button */}
            <button
              onClick={() => {
                toggleElderMode();
                if (page !== "dashboard") setPage("dashboard");
              }}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer border whitespace-nowrap shadow-xs ${
                elderMode
                  ? "bg-amber-500 text-white border-amber-600 shadow-amber-500/20"
                  : "bg-teal-50 text-teal-800 border-teal-200/80 hover:bg-teal-100"
              }`}
              title={t.elderModeTooltip}
            >
              <span className="text-sm">👴</span>
              <span className="hidden sm:inline">
                {elderMode ? t.elderModeOn : t.elderModeBtn}
              </span>
            </button>

            {/* Global Language Selector Dropdown */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black shadow-xs transition cursor-pointer border border-slate-700 whitespace-nowrap"
                aria-label="Change Website Language"
                title={`${t.languageLabel}: ${currentLangObj.native}`}
              >
                <Globe className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span className="tracking-wide">{currentLangObj.native}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>

              {isLangMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-slate-100 mb-1">
                    {t.languageLabel}
                  </div>
                  {languages.map((l) => {
                    const isSelected = language === l.code;
                    return (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLanguage(l.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                          isSelected
                            ? "bg-teal-600 text-white shadow-xs"
                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className="text-base">{l.flag}</span>
                          <span className="text-sm font-extrabold">{l.native}</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <span className={`text-[10px] font-semibold ${isSelected ? "text-teal-100" : "text-slate-400"}`}>
                            {l.label}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3] shrink-0" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
