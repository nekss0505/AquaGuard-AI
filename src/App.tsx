import React, { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { DemoModeBar } from "./components/DemoModeBar";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Toast } from "./components/Toast";
import {
  LayoutDashboard,
  MapPin,
  FileEdit,
  Bot,
  Bell,
} from "lucide-react";
import { Page } from "./types";

// Pages
import { LandingPage } from "./pages/LandingPage";
import { CommunityDashboard } from "./pages/CommunityDashboard";
import { HealthRiskMap } from "./pages/HealthRiskMap";
import { WaterQualityPage } from "./pages/WaterQualityPage";
import { EarlyWarningCenter } from "./pages/EarlyWarningCenter";
import { ImpactSimulator } from "./pages/ImpactSimulator";
import { ReportConcernPage } from "./pages/ReportConcernPage";
import { AwarenessCenter } from "./pages/AwarenessCenter";
import { AquaGuideAssistant } from "./pages/AquaGuideAssistant";
import { AlertsPage } from "./pages/AlertsPage";
import { HealthWorkerDashboard } from "./pages/HealthWorkerDashboard";
import { AdminAnalyticsPage } from "./pages/AdminAnalyticsPage";
import { AboutPage } from "./pages/AboutPage";

const AppContent: React.FC = () => {
  const { page, setPage, unreadAlertsCount, language } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isTamil = language === "ta";

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <CommunityDashboard />;
      case "map":
        return <HealthRiskMap />;
      case "water":
        return <WaterQualityPage />;
      case "early-warning":
        return <EarlyWarningCenter />;
      case "simulator":
        return <ImpactSimulator />;
      case "report":
        return <ReportConcernPage />;
      case "awareness":
        return <AwarenessCenter />;
      case "aquaguide":
        return <AquaGuideAssistant />;
      case "alerts":
        return <AlertsPage />;
      case "health-worker":
        return <HealthWorkerDashboard />;
      case "admin":
        return <AdminAnalyticsPage />;
      case "about":
        return <AboutPage />;
      case "landing":
      default:
        return <CommunityDashboard />;
    }
  };

  const mobileNavItems: {
    id: Page;
    label: string;
    icon: any;
    badge?: number;
  }[] = [
    {
      id: "dashboard",
      label: isTamil ? "முகப்பு" : "Home",
      icon: LayoutDashboard,
    },
    {
      id: "map",
      label: isTamil ? "வரைபடம்" : "Map",
      icon: MapPin,
    },
    {
      id: "report",
      label: isTamil ? "பதிவு" : "Report",
      icon: FileEdit,
    },
    {
      id: "aquaguide",
      label: isTamil ? "AI உதவி" : "AI Help",
      icon: Bot,
    },
    {
      id: "alerts",
      label: isTamil ? "அறிவிப்பு" : "Alerts",
      icon: Bell,
      badge: unreadAlertsCount,
    },
  ];

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-slate-50 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] pb-20 lg:pb-8">

      {/* Interactive Scenario Bar */}
      <DemoModeBar />

      {/* Main Top Navigation Bar */}
      <Navbar onToggleSidebar={() => setIsSidebarOpen(true)} />

      {/* Slide-over Menu for Mobile & Quick Tools */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 w-full min-w-0 max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6 overflow-x-hidden">

        <main className="w-full min-w-0 max-w-full overflow-x-hidden">
          {renderPage()}
        </main>

      </div>

      {/* Mobile Bottom Navigation */}
      <nav
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 w-full max-w-full bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 px-1 sm:px-2 py-2 flex items-center justify-around shadow-lg overflow-hidden"
      >
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = page === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`flex-1 min-w-0 max-w-[90px] flex flex-col items-center justify-center py-1 px-1 sm:px-2 rounded-2xl transition cursor-pointer relative ${
                isActive
                  ? "bg-teal-50 text-teal-700 font-extrabold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <div className="relative shrink-0">
                <Icon
                  className={`w-5 h-5 ${
                    isActive
                      ? "text-teal-600 stroke-[2.5]"
                      : "text-slate-500"
                  }`}
                />

                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-red-600 text-white rounded-full text-[9px] font-black px-1 min-w-[15px] text-center shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>

              <span className="text-[10px] sm:text-[11px] mt-0.5 font-bold whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Global Non-intrusive Toast */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
