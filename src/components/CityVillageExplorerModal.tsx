import React, { useState } from "react";
import { Community } from "../types";
import { useApp } from "../context/AppContext";
import {
  X,
  MapPin,
  Thermometer,
  CloudRain,
  Wind,
  Droplets,
  Activity,
  ShieldAlert,
  Building2,
  Phone,
  UserCheck,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Clock,
  Waves,
  HeartHandshake,
  FileText,
  Volume2
} from "lucide-react";

interface CityVillageExplorerModalProps {
  community: Community | null;
  onClose: () => void;
}

export const CityVillageExplorerModal: React.FC<CityVillageExplorerModalProps> = ({
  community,
  onClose,
}) => {
  const { setSelectedCommunityId, setPage, t } = useApp();
  const [activeTab, setActiveTab] = useState<"overview" | "water" | "health" | "timeline">("overview");

  if (!community) return null;

  const speakSummary = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const text = `${community.name} in ${community.district} district. Risk level is ${community.riskLevel} with score ${community.riskScore} percent. Water turbidity is ${community.waterIndicators.turbidity} NTU, temperature is ${community.weather.temperature} degree Celsius. Rainfall in the past hour is ${community.weather.rainfallMm1h} millimeters. Primary Health Center is ${community.primaryPHC || "Local Rural PHC"}.`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const getRiskBadgeClass = (level: string) => {
    switch (level) {
      case "CRITICAL":
        return "bg-red-500 text-white shadow-xs animate-pulse";
      case "HIGH":
        return "bg-orange-500 text-white";
      case "MODERATE":
        return "bg-amber-500 text-white";
      default:
        return "bg-emerald-600 text-white";
    }
  };

  const getNodeTypeLabel = (type: string) => {
    switch (type) {
      case "city":
        return "🏢 District Headquarters / City";
      case "town":
        return "🏘️ Municipality / Town Belt";
      case "coastal_hamlet":
        return "🌊 Coastal Fisherfolk Hamlet";
      case "hill_station":
        return "⛰️ Hill Station / Western Ghats";
      default:
        return "🌾 Agricultural Village / Panchayat";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative bg-linear-to-r from-slate-900 via-slate-800 to-teal-950 text-white p-5 sm:p-6 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-400/30">
                  {community.district} District • {community.zone}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-white border border-white/20">
                  {getNodeTypeLabel(community.type)}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${getRiskBadgeClass(community.riskLevel)}`}>
                  {community.riskLevel} RISK ({community.riskScore}%)
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit',sans-serif]">
                {community.name}
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 mt-1">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  <span>{community.subDivision}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-teal-400" />
                  <span>IST Telemetry: {community.weather.lastHourUpdated}</span>
                </span>
                <span className="text-slate-400">
                  Lat: {community.lat.toFixed(4)}°, Lng: {community.lng.toFixed(4)}°
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={speakSummary}
                title="Listen to Voice Briefing (TTS)"
                className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer border border-white/20"
              >
                <Volume2 className="w-4 h-4 text-teal-300" />
              </button>
              <button
                onClick={onClose}
                className="p-2.5 rounded-2xl bg-white/10 hover:bg-red-500/80 text-white transition cursor-pointer border border-white/20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-2 mt-5 border-b border-white/15 pb-0 text-xs font-bold">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-2.5 px-3 border-b-2 transition cursor-pointer ${
                activeTab === "overview"
                  ? "border-teal-400 text-teal-300 font-extrabold"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              Overview & Climate
            </button>
            <button
              onClick={() => setActiveTab("water")}
              className={`pb-2.5 px-3 border-b-2 transition cursor-pointer ${
                activeTab === "water"
                  ? "border-teal-400 text-teal-300 font-extrabold"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              Water Quality & Sensors
            </button>
            <button
              onClick={() => setActiveTab("health")}
              className={`pb-2.5 px-3 border-b-2 transition cursor-pointer ${
                activeTab === "health"
                  ? "border-teal-400 text-teal-300 font-extrabold"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              Health Surveillance & PHC
            </button>
            <button
              onClick={() => setActiveTab("timeline")}
              className={`pb-2.5 px-3 border-b-2 transition cursor-pointer ${
                activeTab === "timeline"
                  ? "border-teal-400 text-teal-300 font-extrabold"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              24h IST Telemetry Timeline
            </button>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 text-slate-700 text-xs">
          {activeTab === "overview" && (
            <div className="space-y-5">
              {/* Climate & Environmental Quick Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80">
                  <div className="flex items-center justify-between text-amber-800 font-bold mb-1">
                    <span>Temperature</span>
                    <Thermometer className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-xl font-extrabold text-amber-950 font-['Outfit',sans-serif]">
                    {community.weather.temperature}°C
                  </div>
                  <div className="text-[10px] text-amber-700 mt-0.5">
                    Feels like {community.weather.feelsLike}°C
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-teal-50/80 border border-teal-200/80">
                  <div className="flex items-center justify-between text-teal-800 font-bold mb-1">
                    <span>1-Hour Rain</span>
                    <CloudRain className="w-4 h-4 text-teal-600" />
                  </div>
                  <div className="text-xl font-extrabold text-teal-950 font-['Outfit',sans-serif]">
                    {community.weather.rainfallMm1h} mm/h
                  </div>
                  <div className="text-[10px] text-teal-700 mt-0.5">
                    24h total: {community.weather.rainfallMm24h} mm
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-200/80">
                  <div className="flex items-center justify-between text-sky-800 font-bold mb-1">
                    <span>Humidity & Wind</span>
                    <Wind className="w-4 h-4 text-sky-600" />
                  </div>
                  <div className="text-xl font-extrabold text-sky-950 font-['Outfit',sans-serif]">
                    {community.weather.humidity}%
                  </div>
                  <div className="text-[10px] text-sky-700 mt-0.5">
                    Wind: {community.weather.windSpeedKmH} km/h
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-200/80">
                  <div className="flex items-center justify-between text-indigo-800 font-bold mb-1">
                    <span>Air Quality (AQI)</span>
                    <Activity className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="text-xl font-extrabold text-indigo-950 font-['Outfit',sans-serif]">
                    {community.weather.aqi} AQI
                  </div>
                  <div className="text-[10px] text-indigo-700 mt-0.5">
                    UV Index: {community.weather.uvIndex}
                  </div>
                </div>
              </div>

              {/* Administrative & Location Profile */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
                  <Building2 className="w-4 h-4 text-teal-600" />
                  <span>Administrative & Hydrological Profile</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">District & State</div>
                    <div className="font-extrabold text-slate-900 text-sm mt-0.5">
                      {community.district} District, {community.state}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Taluk / Block Division</div>
                    <div className="font-extrabold text-slate-900 text-sm mt-0.5">
                      {community.subDivision}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Major River Basin / Hydro Unit</div>
                    <div className="font-extrabold text-slate-900 text-sm mt-0.5">
                      {community.majorRiverBasin || "Regional Aquifer System"}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Primary Water Source</div>
                    <div className="font-extrabold text-slate-900 text-sm mt-0.5">
                      {community.waterSourceType}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Monitored Population</div>
                    <div className="font-extrabold text-slate-900 text-sm mt-0.5">
                      {community.population.toLocaleString()} Residents
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Flood Vulnerability Status</div>
                    <div className={`font-extrabold text-sm mt-0.5 ${
                      community.floodVulnerability === "High" ? "text-red-700" : community.floodVulnerability === "Medium" ? "text-amber-700" : "text-emerald-700"
                    }`}>
                      {community.floodVulnerability} Inundation Risk
                    </div>
                  </div>
                </div>
              </div>

              {/* Weather Narrative */}
              <div className="p-3.5 rounded-2xl bg-teal-50/50 border border-teal-200/80 flex items-start space-x-3">
                <CloudRain className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-extrabold text-teal-900 text-xs">Current Meteorological Condition:</div>
                  <div className="text-slate-700 text-xs mt-0.5">
                    {community.weather.condition}. Continuous 1-hour telemetry sensor updates stream through Tamil Nadu State Water Resource & Health Informatics Sentinel.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "water" && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className={`p-4 rounded-2xl border ${
                  community.waterIndicators.turbidity > 5
                    ? "bg-red-50/90 border-red-200 text-red-950"
                    : "bg-emerald-50/90 border-emerald-200 text-emerald-950"
                }`}>
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-500">Turbidity</div>
                  <div className="text-2xl font-black font-['Outfit',sans-serif] mt-1">
                    {community.waterIndicators.turbidity} <span className="text-xs font-bold">NTU</span>
                  </div>
                  <div className="text-[10px] mt-1 font-bold">
                    {community.waterIndicators.turbidity > 5 ? "⚠️ Exceeds WHO 5.0 NTU limit" : "✅ Safe clarity standard"}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-500">pH Level</div>
                  <div className="text-2xl font-black text-slate-900 font-['Outfit',sans-serif] mt-1">
                    {community.waterIndicators.ph} <span className="text-xs font-bold">pH</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 font-bold">
                    Optimal: 6.5 – 8.5
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-500">Total Dissolved Solids</div>
                  <div className="text-2xl font-black text-slate-900 font-['Outfit',sans-serif] mt-1">
                    {community.waterIndicators.tds} <span className="text-xs font-bold">ppm</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 font-bold">
                    Desirable: &lt; 500 ppm
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border ${
                  community.waterIndicators.coliformCount > 0
                    ? "bg-red-50/90 border-red-200 text-red-950"
                    : "bg-emerald-50/90 border-emerald-200 text-emerald-950"
                }`}>
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-500">Fecal Coliform</div>
                  <div className="text-2xl font-black font-['Outfit',sans-serif] mt-1">
                    {community.waterIndicators.coliformCount} <span className="text-xs font-bold">CFU/100ml</span>
                  </div>
                  <div className="text-[10px] mt-1 font-bold">
                    {community.waterIndicators.coliformCount > 0 ? "🚨 Bacterial pathogen present" : "✅ 0 CFU (Bacteriologically safe)"}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-500">Residual Chlorine</div>
                  <div className="text-2xl font-black text-slate-900 font-['Outfit',sans-serif] mt-1">
                    {community.waterIndicators.residualChlorine} <span className="text-xs font-bold">mg/L</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 font-bold">
                    Target: 0.20 – 0.50 mg/L
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-500">Dissolved Oxygen</div>
                  <div className="text-2xl font-black text-slate-900 font-['Outfit',sans-serif] mt-1">
                    {community.waterIndicators.dissolvedOxygen} <span className="text-xs font-bold">mg/L</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 font-bold">
                    Healthy: &gt; 5.0 mg/L
                  </div>
                </div>
              </div>

              {/* Water Advisory Box */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
                <div className="font-extrabold text-xs flex items-center space-x-2">
                  <ShieldAlert className="w-4 h-4 text-amber-700" />
                  <span>Automated Water Safety Protocol Recommendation</span>
                </div>
                <p className="mt-1.5 text-xs text-amber-800 leading-relaxed">
                  {community.waterIndicators.turbidity > 5 || community.waterIndicators.coliformCount > 0
                    ? `Contamination detected in ${community.name}. Advise all residents to boil drinking water for at least 3 minutes, use certified ceramic/RO filters, and ensure primary overhead storage chlorination.`
                    : `Water quality in ${community.name} is currently within safety guidelines. Maintain routine sentinel testing and verify chlorine residual twice daily.`}
                </p>
              </div>
            </div>
          )}

          {activeTab === "health" && (
            <div className="space-y-5">
              {/* Primary Health Centre Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-slate-900 text-xs flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-teal-600" />
                    <span>Nodal Primary Health Centre (PHC) & Field Team</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 text-[10px] font-extrabold">
                    24/7 Sentinel Node
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Assigned Primary Health Center</div>
                    <div className="font-extrabold text-slate-900 text-xs mt-0.5">
                      {community.primaryPHC || `${community.district} Taluk Rural PHC`}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Village Health Nurse (VHN) / Field Contact</div>
                    <div className="font-extrabold text-slate-900 text-xs mt-0.5">
                      {community.villageHeadOrOfficer || "Assigned VHN & Sector Health Inspector"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Epidemiological Surveillance Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Active Reports (7d)</div>
                  <div className="text-xl font-extrabold text-slate-900 font-['Outfit',sans-serif] mt-0.5">
                    {community.currentWeeklyReports}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Baseline: {community.baselineWeeklyReports}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Symptom Trajectory</div>
                  <div className="text-xl font-extrabold text-slate-900 font-['Outfit',sans-serif] mt-0.5 flex items-center space-x-1">
                    {community.trend === "rising" ? (
                      <>
                        <TrendingUp className="w-4 h-4 text-red-600" />
                        <span className="text-red-600">+{community.trendPercentage}%</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-600">Stable</span>
                      </>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    7-day rolling surge
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Water Contamination Risk</div>
                  <div className="text-xl font-extrabold text-teal-700 font-['Outfit',sans-serif] mt-0.5">
                    {community.waterRisk}%
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Sensor weight factor
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Active Sentinel Alerts</div>
                  <div className={`text-xl font-extrabold font-['Outfit',sans-serif] mt-0.5 ${
                    community.activeAlertsCount > 0 ? "text-red-600" : "text-emerald-600"
                  }`}>
                    {community.activeAlertsCount}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Dispatched to field teams
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "timeline" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs">
                    24-Hour Continuous Telemetry Stream (IST)
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    Hourly synchronizations of rainfall, temperature, turbidity, and calculated health risk
                  </p>
                </div>
                <span className="text-[10px] font-bold bg-teal-50 text-teal-800 px-2 py-1 rounded-md border border-teal-200">
                  24 Data Points
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[9px]">
                      <th className="pb-2 px-2">Time (IST)</th>
                      <th className="pb-2 px-2">Temp (°C)</th>
                      <th className="pb-2 px-2">Rain (mm)</th>
                      <th className="pb-2 px-2">Turbidity (NTU)</th>
                      <th className="pb-2 px-2">pH</th>
                      <th className="pb-2 px-2">TDS</th>
                      <th className="pb-2 px-2">Risk Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {community.hourlyHistory.map((h, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-2 px-2 font-black text-slate-900">{h.hour}</td>
                        <td className="py-2 px-2">{h.temperature}°C</td>
                        <td className="py-2 px-2 font-bold text-teal-700">{h.rainfallMm} mm</td>
                        <td className="py-2 px-2 font-bold">{h.turbidity} NTU</td>
                        <td className="py-2 px-2">{h.ph}</td>
                        <td className="py-2 px-2">{h.tds} ppm</td>
                        <td className="py-2 px-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                            h.riskScore >= 70 ? "bg-red-100 text-red-700" : h.riskScore >= 50 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                          }`}>
                            {h.riskScore}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-slate-500 font-medium">
            Node ID: <code className="text-slate-800 font-bold">{community.id}</code>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setSelectedCommunityId(community.id);
                setPage("report");
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-extrabold text-xs border border-slate-200 transition cursor-pointer flex items-center space-x-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-teal-600" />
              <span>Report Issue</span>
            </button>

            <button
              onClick={() => {
                setSelectedCommunityId(community.id);
                setPage("early-warning");
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-extrabold text-xs border border-teal-200 transition cursor-pointer flex items-center space-x-1.5"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-teal-600" />
              <span>AI Early Warning</span>
            </button>

            <button
              onClick={() => {
                setSelectedCommunityId(community.id);
                setPage("dashboard");
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition cursor-pointer shadow-xs flex items-center space-x-1.5"
            >
              <span>View Dashboard</span>
              <ChevronRight className="w-3.5 h-3.5 text-teal-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
