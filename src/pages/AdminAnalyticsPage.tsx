import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  BarChart3,
  Download,
  FileSpreadsheet,
  FileText,
  Shield,
  AlertOctagon,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Send,
  Sparkles,
} from "lucide-react";

export const AdminAnalyticsPage: React.FC = () => {
  const { communities, reports, alerts, showToast, t } = useApp();

  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [broadcastTarget, setBroadcastTarget] = useState<string>("All Districts");

  const totalPop = communities.reduce((acc, c) => acc + c.population, 0);
  const criticalCount = communities.filter((c) => c.riskLevel === "CRITICAL").length;
  const highCount = communities.filter((c) => c.riskLevel === "HIGH").length;

  const handleExportBulletin = () => {
    setIsExporting(true);
    setTimeout(() => {
      const bulletinData = {
        title: "AQUAGUARD PUBLIC HEALTH SENTINEL BULLETIN",
        problemStatement: "SIH25001 - Tamil Nadu Community Early Warning Surveillance",
        generatedAt: new Date().toISOString(),
        disclaimer: "SIMULATED PROTOTYPE DATA - NOT A REAL MEDICAL CERTIFICATE",
        summary: {
          totalMonitoredPopulation: totalPop,
          criticalSectors: criticalCount,
          highRiskSectors: highCount,
          totalReportsProcessed: reports.length,
          activeAlertsCount: alerts.length,
        },
        sectorBreakdown: communities.map((c) => ({
          community: c.name,
          district: c.district,
          riskLevel: c.riskLevel,
          riskScore: c.riskScore,
          turbidityNTU: c.waterIndicators.turbidity,
          ph: c.waterIndicators.ph,
          currentWeeklyReports: c.currentWeeklyReports,
          baselineAverage: c.baselineWeeklyReports,
          anomalyDeltaPercent: Math.round(
            ((c.currentWeeklyReports - c.baselineWeeklyReports) / c.baselineWeeklyReports) * 100
          ),
        })),
      };

      const blob = new Blob([JSON.stringify(bulletinData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `AquaGuard_Sentinel_Bulletin_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setIsExporting(false);
      showToast("District Sentinel Health Bulletin exported successfully!", "success");
    }, 800);
  };

  const handleBroadcastAlert = () => {
    showToast(`Emergency Boil Advisory broadcast dispatched to ${broadcastTarget} SMS & ASHA Gateways.`, "success");
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-slate-900 text-teal-400">
              <BarChart3 className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
              Epidemiological Intelligence & Policy Desk
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-200">
              {t.simulatedDemoData}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif] mt-1">
            {t.navAdmin}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            District Public Health Office overview, syndromic anomaly threshold tracking, and formal public bulletins
          </p>
        </div>

        {/* Export Action */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportBulletin}
            disabled={isExporting}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-2 transition cursor-pointer shadow-xs disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5 text-teal-400" />
            <span>{isExporting ? "Compiling Bulletin..." : "Export Official Bulletin"}</span>
          </button>
        </div>
      </div>

      {/* High-Level District KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Monitored Population
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
            {totalPop.toLocaleString()}
          </div>
          <div className="text-[11px] text-teal-600 font-semibold">Across 6 pilot districts</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Critical Outbreak Zones
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-red-600 font-['Outfit',sans-serif]">
            {criticalCount}
          </div>
          <div className="text-[11px] text-red-600 font-semibold">Immediate response mobilized</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            High Risk Advisory Zones
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-orange-600 font-['Outfit',sans-serif]">
            {highCount}
          </div>
          <div className="text-[11px] text-orange-600 font-semibold">Elevated turbidity tracking</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Syndromic Reports (Total)
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-['Outfit',sans-serif]">
            {reports.length}
          </div>
          <div className="text-[11px] text-indigo-600 font-semibold">Crowdsourced & field verified</div>
        </div>
      </div>

      {/* Emergency Broadcast Console */}
      <div className="bg-gradient-to-br from-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-teal-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1 rounded-md bg-teal-500/20 text-teal-300">
                <Send className="w-4 h-4" />
              </span>
              <h2 className="text-base font-extrabold font-['Outfit',sans-serif]">
                Multi-Channel Emergency Alert Broadcast Console
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Instantly push boil-water mandates and chlorine distribution orders to PHCs, ASHA networks, and SMS gateways.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={broadcastTarget}
              onChange={(e) => setBroadcastTarget(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-white focus:outline-teal-500"
            >
              <option value="All Districts">All 6 Monitored Districts</option>
              <option value="Barpeta Char Sector">Barpeta Char Sector (Critical)</option>
              <option value="Dhemaji Floodplain">Dhemaji Floodplain</option>
              <option value="Kokrajhar Gaon">Kokrajhar Gaon</option>
            </select>

            <button
              onClick={handleBroadcastAlert}
              className="px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
            >
              Dispatch Broadcast Alert
            </button>
          </div>
        </div>
      </div>

      {/* Comprehensive Surveillance Matrix */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
            Epidemiological Anomaly Matrix
          </h2>
          <span className="text-xs text-slate-400 font-mono">Algorithm: C-SUM & Bayes-EW v3.1</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3 px-3">Village / District</th>
                <th className="pb-3 px-3">Population</th>
                <th className="pb-3 px-3">Turbidity (NTU)</th>
                <th className="pb-3 px-3">pH</th>
                <th className="pb-3 px-3">7-Day Cases vs Baseline</th>
                <th className="pb-3 px-3">Anomaly Spike</th>
                <th className="pb-3 px-3">Composite Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {communities.map((c) => {
                const delta = Math.round(
                  ((c.currentWeeklyReports - c.baselineWeeklyReports) / c.baselineWeeklyReports) * 100
                );
                return (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-3 font-bold text-slate-900">
                      {c.name} ({c.district})
                    </td>
                    <td className="py-3 px-3">{c.population.toLocaleString()}</td>
                    <td className="py-3 px-3">
                      <span className={c.waterIndicators.turbidity > 5 ? "text-red-600 font-bold" : "text-emerald-600 font-bold"}>
                        {c.waterIndicators.turbidity} NTU
                      </span>
                    </td>
                    <td className="py-3 px-3">{c.waterIndicators.ph}</td>
                    <td className="py-3 px-3">
                      <strong>{c.currentWeeklyReports}</strong> vs {c.baselineWeeklyReports} baseline
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1 font-bold ${
                        delta > 100 ? "text-red-600" : delta > 30 ? "text-orange-600" : "text-emerald-600"
                      }`}>
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>+{delta}%</span>
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          c.riskLevel === "CRITICAL"
                            ? "bg-red-100 text-red-800"
                            : c.riskLevel === "HIGH"
                            ? "bg-orange-100 text-orange-800"
                            : c.riskLevel === "MODERATE"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {c.riskLevel} ({c.riskScore}%)
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
