import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { RiskGauge } from "../components/RiskGauge";
import { RiskLevel } from "../types";
import {
  Sliders,
  Sparkles,
  RefreshCw,
  Droplets,
  HeartPulse,
  CloudRain,
  AlertTriangle,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const ImpactSimulator: React.FC = () => {
  const { t } = useApp();

  const [turbidity, setTurbidity] = useState<number>(6.5);
  const [ph, setPh] = useState<number>(7.2);
  const [reports, setReports] = useState<number>(8);
  const [rainfallMm, setRainfallMm] = useState<number>(80);

  // Calculate simulated composite score
  const calculateSimulatedRisk = (): { score: number; level: RiskLevel } => {
    let score = 15;

    // Turbidity impact (weight ~35)
    if (turbidity > 1.0) {
      score += Math.min(35, (turbidity - 1.0) * 2.8);
    }

    // pH impact
    if (ph < 6.5) score += (6.5 - ph) * 15;
    if (ph > 8.5) score += (ph - 8.5) * 15;

    // Reports impact (weight ~35)
    score += Math.min(35, (reports / 20) * 35);

    // Rainfall / Flood impact (weight ~20)
    score += Math.min(20, (rainfallMm / 150) * 20);

    const finalScore = Math.min(98, Math.max(10, Math.round(score)));

    let level: RiskLevel = "LOW";
    if (finalScore >= 75) level = "CRITICAL";
    else if (finalScore >= 55) level = "HIGH";
    else if (finalScore >= 35) level = "MODERATE";

    return { score: finalScore, level };
  };

  const simResult = calculateSimulatedRisk();

  const applyPreset = (preset: "normal" | "storm" | "contamination" | "outbreak") => {
    if (preset === "normal") {
      setTurbidity(1.2);
      setPh(7.2);
      setReports(2);
      setRainfallMm(15);
    } else if (preset === "storm") {
      setTurbidity(8.5);
      setPh(6.8);
      setReports(6);
      setRainfallMm(140);
    } else if (preset === "contamination") {
      setTurbidity(14.2);
      setPh(6.4);
      setReports(12);
      setRainfallMm(90);
    } else if (preset === "outbreak") {
      setTurbidity(18.5);
      setPh(6.2);
      setReports(32);
      setRainfallMm(160);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-800">
              <Sliders className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
              Interactive What-If Scenario Lab
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-200">
              {t.simulatedDemoData}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif] mt-1">
            {t.navSimulator}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Test how changes in river turbidity, syndromic reporting volume, and rainfall impact the Early Warning model
          </p>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-500 mr-1">Presets:</span>
          <button
            onClick={() => applyPreset("normal")}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
          >
            Baseline
          </button>
          <button
            onClick={() => applyPreset("storm")}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
          >
            Flood Silt
          </button>
          <button
            onClick={() => applyPreset("contamination")}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
          >
            Well Breach
          </button>
          <button
            onClick={() => applyPreset("outbreak")}
            className="px-2.5 py-1 text-xs font-bold rounded-lg bg-red-100 hover:bg-red-200 text-red-800 transition cursor-pointer"
          >
            Critical Cascade
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders Control Panel */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              Parameter Inputs
            </h2>
            <button
              onClick={() => applyPreset("normal")}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Slider 1: Turbidity */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-amber-500" />
                <span>Water Turbidity (NTU)</span>
              </label>
              <span className="text-sm font-extrabold text-slate-900">{turbidity} NTU</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="25.0"
              step="0.1"
              value={turbidity}
              onChange={(e) => setTurbidity(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0.5 NTU (Clear)</span>
              <span className="text-red-500 font-bold">5.0 NTU Threshold</span>
              <span>25.0 NTU (Severely Silty)</span>
            </div>
          </div>

          {/* Slider 2: pH */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-cyan-500" />
                <span>Water pH Level</span>
              </label>
              <span className="text-sm font-extrabold text-slate-900">{ph} pH</span>
            </div>
            <input
              type="range"
              min="5.0"
              max="9.5"
              step="0.1"
              value={ph}
              onChange={(e) => setPh(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>5.0 (Acidic)</span>
              <span className="text-emerald-600 font-bold">6.5 – 8.5 Safe</span>
              <span>9.5 (Alkaline)</span>
            </div>
          </div>

          {/* Slider 3: Diarrhea / Symptom Reports */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-rose-500" />
                <span>Community Symptom Submissions (24h)</span>
              </label>
              <span className="text-sm font-extrabold text-slate-900">{reports} cases</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={reports}
              onChange={(e) => setReports(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0 Cases</span>
              <span className="text-amber-500 font-bold">5 Baseline</span>
              <span>50 Cases (Cluster)</span>
            </div>
          </div>

          {/* Slider 4: 48h Rainfall */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <CloudRain className="w-4 h-4 text-indigo-500" />
                <span>48-Hour Precipitation (Rainfall)</span>
              </label>
              <span className="text-sm font-extrabold text-slate-900">{rainfallMm} mm</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              step="5"
              value={rainfallMm}
              onChange={(e) => setRainfallMm(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0 mm (Dry)</span>
              <span className="text-blue-500">60 mm (Moderate)</span>
              <span className="text-indigo-600 font-bold">200 mm (Flood Surge)</span>
            </div>
          </div>
        </div>

        {/* Real-time Simulated Risk Gauge & Triggered Action */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between items-center text-center">
          <div className="w-full text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">
              Simulated Output
            </span>
            <h2 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              Predicted Outbreak Risk
            </h2>
          </div>

          <div className="my-5">
            <RiskGauge score={simResult.score} level={simResult.level} size="lg" />
          </div>

          {/* Triggered Response Tier */}
          <div className="w-full space-y-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                Automated System Actions Triggered:
              </div>
              <ul className="text-slate-600 list-disc list-inside text-[11px] space-y-0.5">
                {simResult.score >= 75 ? (
                  <>
                    <li className="text-red-700 font-bold">Dispatch ASHA emergency door-to-door ORS.</li>
                    <li className="text-red-700 font-bold">Issue urgent community boil-water SMS alert.</li>
                    <li>Notify Sub-divisional Hospital of surge risk.</li>
                  </>
                ) : simResult.score >= 55 ? (
                  <>
                    <li>Issue precautionary boil-water recommendation.</li>
                    <li>Schedule ASHA field testing for local handpumps.</li>
                  </>
                ) : (
                  <>
                    <li>Routine periodic sensor polling every 15 min.</li>
                    <li>Water quality within standard safety parameters.</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
