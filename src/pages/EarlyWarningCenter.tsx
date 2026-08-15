import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { RiskGauge } from "../components/RiskGauge";
import {
  Brain,
  Sparkles,
  Droplets,
  HeartPulse,
  CloudRain,
  ShieldCheck,
  AlertOctagon,
  RefreshCw,
  Copy,
  Check,
  ArrowRight,
  TrendingUp,
  FileCheck,
} from "lucide-react";

export const EarlyWarningCenter: React.FC = () => {
  const {
    selectedCommunity,
    communities,
    setSelectedCommunityId,
    earlyWarningResult,
    isAnalyzing,
    runEarlyWarningAnalysis,
    t,
  } = useApp();

  const [copiedAdvisory, setCopiedAdvisory] = useState<boolean>(false);
  const [completedActions, setCompletedActions] = useState<string[]>([]);

  const toggleAction = (act: string) => {
    setCompletedActions((prev) =>
      prev.includes(act) ? prev.filter((a) => a !== act) : [...prev, act]
    );
  };

  const handleCopyAdvisory = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAdvisory(true);
    setTimeout(() => setCopiedAdvisory(false), 2000);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-teal-100 text-teal-800">
              <Brain className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
              AI Multi-Signal Epidemiological Engine
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-200">
              {t.simulatedDemoData}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif] mt-1">
            {t.navEarlyWarning}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Statistical anomaly detection correlating water sensors, syndromic reporting, and flood hydrology
          </p>
        </div>

        {/* Action button & Village Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedCommunity.id}
            onChange={(e) => setSelectedCommunityId(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-xs text-slate-900 focus:outline-teal-500 shadow-xs"
          >
            {communities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.district})
              </option>
            ))}
          </select>

          <button
            onClick={() => runEarlyWarningAnalysis(selectedCommunity.id)}
            disabled={isAnalyzing}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition flex items-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? "animate-spin" : ""}`} />
            <span>{isAnalyzing ? "Synthesizing AI Data..." : "Run Deep Analysis"}</span>
          </button>
        </div>
      </div>

      {/* Multi-Signal Fusion Explanation Cards */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="max-w-3xl mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-teal-400">
            Epidemiological Architecture
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-['Outfit',sans-serif] mt-1">
            How Multi-Signal Correlation Uncovers Hidden Outbreaks
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Traditional health systems react only after hospital admissions. AquaGuard calculates real-time risk by combining three weighted vectors:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Signal 1 */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300">
                <Droplets className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-cyan-400">Weight: 35%</span>
            </div>
            <h3 className="text-sm font-bold text-white">1. Hydro-Sensory Vector</h3>
            <p className="text-xs text-slate-300">
              Turbidity spikes (&gt;5 NTU), sudden pH acidification, and coliform bacterial indicators in tube well and river supplies.
            </p>
            <div className="pt-2 text-[11px] text-cyan-300 font-semibold">
              Current Sensor Status: {selectedCommunity.waterIndicators.turbidity} NTU ({selectedCommunity.waterRisk}% Risk)
            </div>
          </div>

          {/* Signal 2 */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-rose-500/20 text-rose-300">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-rose-400">Weight: 40%</span>
            </div>
            <h3 className="text-sm font-bold text-white">2. Syndromic Health Vector</h3>
            <p className="text-xs text-slate-300">
              Crowdsourced diarrhea/vomiting submissions and ASHA household surveillance logs exceeding 2 standard deviations from baseline.
            </p>
            <div className="pt-2 text-[11px] text-rose-300 font-semibold">
              Weekly Submissions: {selectedCommunity.currentWeeklyReports} cases ({selectedCommunity.symptomRisk}% Risk)
            </div>
          </div>

          {/* Signal 3 */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300">
                <CloudRain className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-indigo-400">Weight: 25%</span>
            </div>
            <h3 className="text-sm font-bold text-white">3. Hydro-Climatic Vector</h3>
            <p className="text-xs text-slate-300">
              Precipitation volume, river flood inundation levels, and shallow aquifer proximity in remote riverine char villages.
            </p>
            <div className="pt-2 text-[11px] text-indigo-300 font-semibold">
              Exposure Level: {selectedCommunity.floodVulnerability} ({selectedCommunity.envRisk}% Risk)
            </div>
          </div>
        </div>
      </div>

      {/* AI Analysis Output Section */}
      {earlyWarningResult && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
          {/* Main Risk Score Card */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between items-center text-center">
            <div className="w-full text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">
                Sentinel Synthesis Output
              </span>
              <h3 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                {selectedCommunity.name} Risk Assessment
              </h3>
            </div>

            <div className="my-5">
              <RiskGauge
                score={earlyWarningResult.riskScore}
                level={earlyWarningResult.riskLevel}
                size="lg"
              />
            </div>

            <div className="w-full space-y-2">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs flex items-center justify-between">
                <span className="text-slate-500 font-medium">Model Confidence:</span>
                <span className="font-bold text-teal-700">{earlyWarningResult.confidence}% High</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs flex items-center justify-between">
                <span className="text-slate-500 font-medium">Outbreak Probability:</span>
                <span className={`font-bold ${earlyWarningResult.riskLevel === "CRITICAL" ? "text-red-700" : "text-slate-900"}`}>
                  {earlyWarningResult.riskLevel === "CRITICAL" ? "High (Immediate Action)" : "Moderate"}
                </span>
              </div>
            </div>
          </div>

          {/* Details & Key Drivers */}
          <div className="lg:col-span-8 space-y-6">
            {/* Primary Key Drivers */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center space-x-2">
                <AlertOctagon className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                  Primary Anomaly Drivers
                </h3>
              </div>

              <div className="space-y-2">
                {earlyWarningResult.keyDrivers.map((driver, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs font-semibold text-amber-950 flex items-start space-x-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{driver}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Preventive Actions */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-teal-600" />
                  <h3 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                    Actionable Public Health Protocol
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {completedActions.length} / {earlyWarningResult.actions.length} Completed
                </span>
              </div>

              <div className="space-y-2">
                {earlyWarningResult.actions.map((act, idx) => {
                  const isChecked = completedActions.includes(act);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleAction(act)}
                      className={`p-3 rounded-2xl border text-xs cursor-pointer transition flex items-start space-x-3 ${
                        isChecked
                          ? "border-emerald-300 bg-emerald-50 text-emerald-900 line-through opacity-80"
                          : "border-slate-200 bg-white hover:bg-slate-50 text-slate-800"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
                      />
                      <span className="font-medium leading-relaxed">{act}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Plain-Language Household Advisory Generator */}
            <div className="bg-gradient-to-br from-teal-900 to-slate-900 text-white rounded-3xl p-6 shadow-md border border-teal-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileCheck className="w-5 h-5 text-teal-400" />
                  <h3 className="text-sm font-extrabold font-['Outfit',sans-serif]">
                    Broadcast Community Advisory (Plain Language)
                  </h3>
                </div>
                <button
                  onClick={() => handleCopyAdvisory(earlyWarningResult.plainLanguageAdvisory)}
                  className="px-3 py-1.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-400/40 text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer"
                >
                  {copiedAdvisory ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-teal-300" />
                      <span>Copy for WhatsApp / SMS</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-black/30 border border-white/10 text-xs font-mono text-teal-100 leading-relaxed">
                {earlyWarningResult.plainLanguageAdvisory}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
