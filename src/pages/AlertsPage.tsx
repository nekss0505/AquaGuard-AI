import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Alert } from "../types";
import {
  Bell,
  AlertTriangle,
  AlertOctagon,
  ShieldCheck,
  CheckCircle2,
  Filter,
  Clock,
  MapPin,
  Flame,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const AlertsPage: React.FC = () => {
  const { alerts, markAlertAsRead, setSelectedCommunityId, setPage, t } = useApp();
  const [filterSeverity, setFilterSeverity] = useState<string>("ALL");

  const filteredAlerts = alerts.filter((a) => {
    if (filterSeverity === "ALL") return true;
    return a.severity === filterSeverity;
  });

  const getAlertBadge = (sev: string) => {
    switch (sev) {
      case "CRITICAL":
        return {
          bg: "bg-red-50 border-red-300 text-red-900",
          icon: <Flame className="w-5 h-5 text-red-600 shrink-0" />,
          badge: "bg-red-600 text-white",
        };
      case "HIGH":
        return {
          bg: "bg-orange-50 border-orange-300 text-orange-900",
          icon: <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0" />,
          badge: "bg-orange-600 text-white",
        };
      case "MODERATE":
        return {
          bg: "bg-amber-50 border-amber-300 text-amber-900",
          icon: <AlertOctagon className="w-5 h-5 text-amber-600 shrink-0" />,
          badge: "bg-amber-600 text-white",
        };
      default:
        return {
          bg: "bg-teal-50 border-teal-300 text-teal-900",
          icon: <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0" />,
          badge: "bg-teal-600 text-white",
        };
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-red-100 text-red-800">
              <Bell className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-red-700">
              Sentinel Notification Feed
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-200">
              {t.simulatedDemoData}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif] mt-1">
            {t.navAlerts}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time automated alerts generated when water and syndromic indicators breach epidemiological safety thresholds
          </p>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-900 focus:outline-teal-500 shadow-xs"
          >
            <option value="ALL">All Severity Levels</option>
            <option value="CRITICAL">🔴 Critical Only</option>
            <option value="HIGH">🟠 High Only</option>
            <option value="MODERATE">🟡 Moderate Only</option>
            <option value="LOW">🟢 Low Only</option>
          </select>
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-xs">
            No active alerts matching the selected filter criteria.
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const style = getAlertBadge(alert.severity);
            return (
              <div
                key={alert.id}
                className={`p-5 sm:p-6 rounded-3xl border transition shadow-xs flex flex-col justify-between space-y-4 ${
                  alert.isRead
                    ? "bg-white border-slate-200 opacity-80"
                    : `${style.bg} border-2`
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start space-x-3">
                    {style.icon}
                    <div>
                      <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${style.badge}`}>
                          {alert.severity} ALERT
                        </span>
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {alert.communityName}
                        </span>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {alert.timestamp}
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold text-slate-900 mt-1 font-['Outfit',sans-serif]">
                        {alert.title}
                      </h3>
                      <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                        {alert.message}
                      </p>
                    </div>
                  </div>

                  {!alert.isRead && (
                    <button
                      onClick={() => markAlertAsRead(alert.id)}
                      className="text-[11px] font-semibold text-slate-600 hover:text-slate-900 underline shrink-0 cursor-pointer"
                    >
                      Acknowledge
                    </button>
                  )}
                </div>

                {/* Actions Bar */}
                <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-200/60 text-xs">
                  <div className="text-[11px] text-slate-500 font-medium">
                    Triggered by: Turbidity breach & syndromic cluster
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setSelectedCommunityId(alert.communityId);
                        setPage("early-warning");
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] transition cursor-pointer flex items-center space-x-1"
                    >
                      <span>Inspect AI Model</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
