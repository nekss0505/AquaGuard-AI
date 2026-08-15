import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { RiskGauge } from "../components/RiskGauge";
import { ElderSafetyView } from "../components/ElderSafetyView";
import {
  Droplets,
  AlertTriangle,
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock,
  Flame,
  FileEdit,
  ChevronDown,
  ChevronUp,
  MapPin,
  Sparkles,
  ShieldCheck,
  Thermometer,
  CloudRain,
  Wind,
  Sun,
  CloudLightning,
} from "lucide-react";

export const CommunityDashboard: React.FC = () => {
  const {
    communities,
    selectedCommunity,
    setSelectedCommunityId,
    setPage,
    t,
  } = useApp();

  const [showTechnicalDetails, setShowTechnicalDetails] = useState<boolean>(false);
  const [dashboardView, setDashboardView] = useState<"simple" | "detailed">("simple");

  const isCaution = selectedCommunity.riskLevel === "MODERATE" || selectedCommunity.riskLevel === "HIGH";
  const isDanger = selectedCommunity.riskLevel === "CRITICAL";

  return (
    <div className="space-y-6 pb-12">
      {/* Top View Toggle: Simple Elder Mode vs Detailed Dashboard */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
          <span className="text-base">👁️</span>
          <span className="font-extrabold uppercase tracking-wide text-slate-500 text-[11px]">{t.languageLabel}:</span>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={() => setDashboardView("simple")}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer flex items-center justify-center space-x-2 whitespace-nowrap ${
              dashboardView === "simple"
                ? "bg-teal-600 text-white shadow-md shadow-teal-600/20"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            <span>👴</span>
            <span>{t.elderModeBtn} ({t.listenInVoice})</span>
          </button>

          <button
            onClick={() => setDashboardView("detailed")}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer flex items-center justify-center space-x-2 whitespace-nowrap ${
              dashboardView === "detailed"
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            <span>📊</span>
            <span>{t.waterQualityTitle}</span>
          </button>
        </div>
      </div>

      {/* Main View Display */}
      {dashboardView === "simple" ? (
        <ElderSafetyView />
      ) : (
        <div className="space-y-5">
          {/* Header & Village Picker */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-600">
                  {selectedCommunity.zone} • {selectedCommunity.district} District
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[10px] font-extrabold border border-teal-200/80 whitespace-nowrap">
                  1-Hour Telemetry Active
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif] mt-1 tracking-tight">
                {selectedCommunity.name}
              </h1>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                {selectedCommunity.subDivision} • Population: {selectedCommunity.population.toLocaleString()}
              </p>
            </div>

            {/* Location Dropdown */}
            <div className="flex items-center space-x-2 bg-slate-50/80 p-2 rounded-2xl border border-slate-200 shrink-0">
              <label className="text-xs font-bold text-slate-600 shrink-0 pl-1">
                {t.selectVillage}:
              </label>
              <select
                value={selectedCommunity.id}
                onChange={(e) => setSelectedCommunityId(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-extrabold text-xs text-slate-900 focus:outline-teal-500 shadow-xs cursor-pointer"
              >
                {communities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.weather.temperature}°C, {c.riskLevel})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Current 1-Hour Climate & Weather Banner */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-3.5 rounded-2xl bg-white/10 text-teal-400">
                <Thermometer className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif]">
                    {selectedCommunity.weather.temperature}°C
                  </span>
                  <span className="text-xs text-slate-300 font-medium bg-white/10 px-2 py-0.5 rounded-md">
                    Feels like {selectedCommunity.weather.feelsLike}°C
                  </span>
                </div>
                <div className="text-xs font-bold text-teal-300 mt-0.5">
                  {selectedCommunity.weather.condition}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full md:w-auto text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-[10px] text-slate-400">1h Rainfall</div>
                <div className="font-extrabold text-white mt-0.5">
                  {selectedCommunity.weather.rainfallMm1h} mm/h
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-[10px] text-slate-400">Humidity</div>
                <div className="font-extrabold text-white mt-0.5">
                  {selectedCommunity.weather.humidity}%
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-[10px] text-slate-400">Wind</div>
                <div className="font-extrabold text-white mt-0.5">
                  {selectedCommunity.weather.windSpeedKmH} km/h
                </div>
              </div>
            </div>
          </div>

          {/* Prominent Water Safety Status Banner */}
          <div
            className={`p-5 sm:p-6 rounded-3xl border shadow-xs transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
              isDanger
                ? "bg-red-50/90 border-red-200 text-red-950"
                : isCaution
                ? "bg-amber-50/90 border-amber-200 text-amber-950"
                : "bg-emerald-50/90 border-emerald-200 text-emerald-950"
            }`}
          >
            <div className="flex items-start space-x-3.5 min-w-0">
              <div
                className={`p-3.5 rounded-2xl shrink-0 shadow-sm ${
                  isDanger
                    ? "bg-red-600 text-white"
                    : isCaution
                    ? "bg-amber-500 text-white"
                    : "bg-emerald-600 text-white"
                }`}
              >
                {isDanger ? (
                  <Flame className="w-6 h-6 animate-pulse" />
                ) : isCaution ? (
                  <AlertTriangle className="w-6 h-6" />
                ) : (
                  <CheckCircle2 className="w-6 h-6" />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full whitespace-nowrap ${
                      isDanger
                        ? "bg-red-200 text-red-900"
                        : isCaution
                        ? "bg-amber-200 text-amber-900"
                        : "bg-emerald-200 text-emerald-900"
                    }`}
                  >
                    {isDanger ? t.dangerStatus : isCaution ? t.cautionStatus : t.safeStatus}
                  </span>
                  <span className="text-xs opacity-75 font-semibold">
                    {t.overallRisk}: <strong>{selectedCommunity.riskScore}%</strong>
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold font-['Outfit',sans-serif] mt-1">
                  {isDanger
                    ? t.dangerStatusDesc
                    : isCaution
                    ? t.cautionStatusDesc
                    : t.safeStatusDesc}
                </h2>
                <p className="text-xs opacity-90 mt-1 max-w-2xl leading-relaxed font-medium">
                  {isDanger
                    ? t.elderAdviceDanger
                    : isCaution
                    ? t.elderAdviceCaution
                    : t.elderAdviceYes}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 self-end md:self-auto shrink-0 whitespace-nowrap">
              <button
                onClick={() => setPage("report")}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-extrabold hover:bg-slate-800 transition cursor-pointer shadow-xs"
              >
                {t.reportConcern}
              </button>
              <button
                onClick={() => setPage("aquaguide")}
                className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-extrabold hover:bg-slate-50 transition cursor-pointer shadow-xs"
              >
                {t.navAquaGuide}
              </button>
            </div>
          </div>

          {/* 3 Quick Community Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            {/* Action 1: Report Concern */}
            <button
              onClick={() => setPage("report")}
              className="p-5 rounded-3xl bg-white border border-slate-200/90 hover:border-rose-300 hover:shadow-md transition text-left cursor-pointer group flex flex-col justify-between h-full"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3 group-hover:scale-105 transition shadow-xs">
                  <FileEdit className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                  {t.reportTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                  {t.reportSub}
                </p>
              </div>
              <div className="mt-4 text-xs font-extrabold text-rose-600 flex items-center gap-1">
                <span>{t.reportConcern}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>

            {/* Action 2: Ask AquaGuide */}
            <button
              onClick={() => setPage("aquaguide")}
              className="p-5 rounded-3xl bg-white border border-slate-200/90 hover:border-teal-300 hover:shadow-md transition text-left cursor-pointer group flex flex-col justify-between h-full"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3 group-hover:scale-105 transition shadow-xs">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                  {t.aiTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                  {t.aiSub}
                </p>
              </div>
              <div className="mt-4 text-xs font-extrabold text-teal-600 flex items-center gap-1">
                <span>{t.navAquaGuide}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>

            {/* Action 3: Health Risk Map */}
            <button
              onClick={() => setPage("map")}
              className="p-5 rounded-3xl bg-white border border-slate-200/90 hover:border-cyan-300 hover:shadow-md transition text-left cursor-pointer group flex flex-col justify-between h-full"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-3 group-hover:scale-105 transition shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                  {t.mapTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                  {t.mapSub}
                </p>
              </div>
              <div className="mt-4 text-xs font-extrabold text-cyan-600 flex items-center gap-1">
                <span>{t.navMap}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>

          {/* Risk Analysis Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <span className="text-xs font-extrabold uppercase tracking-wider text-teal-600">
                  {t.waterSentinel}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif] mt-1">
                  {t.overallRisk}: {selectedCommunity.riskLevel} ({selectedCommunity.riskScore}%)
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md font-medium leading-relaxed">
                  {t.disclaimerText}
                </p>

                <div className="mt-4 flex items-center space-x-2 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedCommunity.lastUpdated}</span>
                </div>
              </div>

              <div className="shrink-0">
                <RiskGauge
                  score={selectedCommunity.riskScore}
                  level={selectedCommunity.riskLevel}
                  size="lg"
                />
              </div>
            </div>

            {/* Expandable Technical Sensor Details */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <button
                onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                className="flex items-center justify-between w-full text-xs font-extrabold text-slate-700 hover:text-teal-600 transition cursor-pointer p-2 rounded-xl hover:bg-slate-50"
              >
                <div className="flex items-center space-x-2">
                  <Droplets className="w-4 h-4 text-teal-600" />
                  <span>
                    {showTechnicalDetails
                      ? "Hide Sensor Telemetry"
                      : `${t.waterQualityTitle} (${t.turbidityLabel}, ${t.phLabel}, ${t.symptomRisk})`}
                  </span>
                </div>
                {showTechnicalDetails ? (
                  <ChevronUp className="w-4 h-4 text-slate-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                )}
              </button>

              {showTechnicalDetails && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in duration-200">
                  <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-100 shadow-xs">
                    <div className="text-xs font-extrabold text-cyan-900">{t.waterRisk}</div>
                    <div className="text-xl font-extrabold font-['Outfit',sans-serif] text-cyan-800 mt-1">
                      {selectedCommunity.waterIndicators.turbidity} NTU
                    </div>
                    <div className="text-[11px] font-semibold text-cyan-700 mt-1">
                      pH: {selectedCommunity.waterIndicators.ph} • TDS: {selectedCommunity.waterIndicators.tds} ppm
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 shadow-xs">
                    <div className="text-xs font-extrabold text-rose-900">{t.symptomRisk}</div>
                    <div className="text-xl font-extrabold font-['Outfit',sans-serif] text-rose-800 mt-1">
                      {selectedCommunity.currentWeeklyReports} cases
                    </div>
                    <div className="text-[11px] font-semibold text-rose-700 mt-1">
                      Weekly Baseline: {selectedCommunity.baselineWeeklyReports} reports
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 shadow-xs">
                    <div className="text-xs font-extrabold text-indigo-900">{t.environmentalRisk}</div>
                    <div className="text-xl font-extrabold font-['Outfit',sans-serif] text-indigo-800 mt-1">
                      {selectedCommunity.envRisk}%
                    </div>
                    <div className="text-[11px] font-semibold text-indigo-700 mt-1">
                      Flood Exposure: {selectedCommunity.floodVulnerability}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
