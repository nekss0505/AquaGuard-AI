import React from "react";
import { useApp } from "../context/AppContext";
import {
  LayoutDashboard,
  MapPin,
  Droplets,
  Sliders,
  FileEdit,
  BookOpen,
  Bot,
  Bell,
  Stethoscope,
  BarChart3,
  Info,
  X,
  ShieldAlert,
  Globe,
  Check,
} from "lucide-react";
import { Language, Page } from "../types";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { page, setPage, unreadAlertsCount, language, setLanguage, elderMode, toggleElderMode, t } = useApp();

  const languages: { code: Language; label: string; native: string; flag: string }[] = [
    { code: "en", label: "English", native: "English", flag: "🇬🇧" },
    { code: "ta", label: "Tamil", native: "தமிழ்", flag: "🇮🇳" },
    { code: "hi", label: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
    { code: "bn", label: "Bengali", native: "বাংলা", flag: "🇮🇳" },
  ];

  const mainNavItems: {
    id: Page;
    label: string;
    icon: any;
    badge?: string | number;
    badgeColor?: string;
  }[] = [
    { id: "dashboard", label: t.navDashboard, icon: LayoutDashboard },
    { id: "map", label: t.navMap, icon: MapPin },
    { id: "report", label: t.reportConcern, icon: FileEdit },
    { id: "aquaguide", label: t.navAquaGuide, icon: Bot, badge: "AI" },
    {
      id: "alerts",
      label: t.navAlerts,
      icon: Bell,
      badge: unreadAlertsCount > 0 ? unreadAlertsCount : undefined,
      badgeColor: "bg-red-500 text-white",
    },
  ];

  const toolsNavItems: {
    id: Page;
    label: string;
    icon: any;
  }[] = [
    { id: "awareness", label: t.navAwareness, icon: BookOpen },
    { id: "water", label: t.navWater, icon: Droplets },
    { id: "simulator", label: t.navSimulator, icon: Sliders },
    { id: "health-worker", label: t.navHealthWorker, icon: Stethoscope },
    { id: "admin", label: t.navAdmin, icon: BarChart3 },
    { id: "about", label: t.navAbout, icon: Info },
  ];

  const handleNavClick = (id: Page) => {
    setPage(id);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-50 transition-opacity"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-72 bg-slate-900 text-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col justify-between shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-teal-500 flex items-center justify-center text-slate-950 font-bold shadow-md">
                <Droplets className="w-5 h-5 text-slate-950 font-bold" />
              </div>
              <div>
                <span className="font-extrabold text-base text-white font-['Outfit',sans-serif]">
                  AquaGuard
                </span>
                <span className="text-[10px] text-teal-400 block font-bold">
                  {t.waterSentinel}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Language Picker in Drawer */}
          <div className="p-3 border-b border-slate-800">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5 flex items-center space-x-1">
              <Globe className="w-3 h-3 text-teal-400" />
              <span>{t.languageLabel}</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {languages.map((l) => {
                const isSelected = language === l.code;
                return (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                      isSelected
                        ? "bg-teal-500 text-slate-950 font-black shadow-xs"
                        : "bg-slate-800 hover:bg-slate-750 text-slate-300"
                    }`}
                  >
                    <span>{l.native}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Elder Mode Switch in Drawer */}
          <div className="p-3 border-b border-slate-800">
            <button
              onClick={() => {
                toggleElderMode();
                setPage("dashboard");
                onClose();
              }}
              className={`w-full p-2.5 rounded-2xl flex items-center justify-between transition cursor-pointer border text-xs font-black ${
                elderMode
                  ? "bg-amber-500 text-white border-amber-600 shadow-sm"
                  : "bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700"
              }`}
            >
              <div className="flex items-center space-x-2">
                <span>👴</span>
                <span>{t.elderModeTooltip}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950/40 font-bold">
                {elderMode ? "ON" : "OFF"}
              </span>
            </button>
          </div>

          {/* Nav items */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-260px)]">
            <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400">
              {t.mainNav}
            </div>
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = page === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    isActive
                      ? "bg-teal-500 text-slate-950 shadow-md"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-slate-950 stroke-[2.5]" : "text-teal-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${item.badgeColor || "bg-teal-500/20 text-teal-300"}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-3 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400">
              {t.specialistTools}
            </div>
            {toolsNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = page === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? "bg-teal-500 text-slate-950 shadow-md font-bold"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-slate-950" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80">
          <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-medium">
            <ShieldAlert className="w-4 h-4 text-teal-400 shrink-0" />
            <span>AquaGuard • Rural Sentinel</span>
          </div>
        </div>
      </aside>
    </>
  );
};
