import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { WaterChart } from "../components/WaterChart";
import {
  Droplets,
  Activity,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Cpu,
  RefreshCw,
  Info,
  Radio,
  Zap,
} from "lucide-react";

export const WaterQualityPage: React.FC = () => {
  const {
    selectedCommunity,
    communities,
    setSelectedCommunityId,
    triggerSensorAnomaly,
    isSensorSimulating,
    t,
  } = useApp();

  const [selectedParam, setSelectedParam] = useState<
    "turbidity" | "ph" | "tds" | "temperature"
  >("turbidity");

  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d">("24h");

  const indicators = selectedCommunity.waterIndicators;

  // Compute Water Quality Index (WQI) estimate
  // WQI: 0-100 where >80 is Excellent, 60-80 Good, 40-60 Moderate, <40 Poor
  const calculateWQI = () => {
    let score = 100;
    if (indicators.turbidity > 1.0) score -= Math.min(40, (indicators.turbidity - 1) * 3);
    if (indicators.ph < 6.5 || indicators.ph > 8.5) score -= 25;
    if (indicators.tds > 500) score -= Math.min(25, (indicators.tds - 500) / 20);
    if (indicators.coliformCount > 0) score -= Math.min(30, indicators.coliformCount / 2);
    return Math.max(12, Math.round(score));
  };

  const wqi = calculateWQI();

  const getWqiStatus = (val: number) => {
    if (val >= 80) return { label: "Excellent (Potable)", color: "text-emerald-700 bg-emerald-50 border-emerald-300" };
    if (val >= 60) return { label: "Good (Safe)", color: "text-teal-700 bg-teal-50 border-teal-300" };
    if (val >= 40) return { label: "Fair / Moderate Risk", color: "text-amber-700 bg-amber-50 border-amber-300" };
    return { label: "Poor / High Contamination Risk", color: "text-red-700 bg-red-50 border-red-300" };
  };

  const wqiStatus = getWqiStatus(wqi);

  return (
    <div className="space-y-6 pb-12">
      {/* Header with Village Selector */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-cyan-100 text-cyan-800">
              <Droplets className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-700">
              Hydro-Sensory Telemetry
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-200">
              {t.simulatedDemoData}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif] mt-1">
            {t.navWater}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Continuous remote telemetry from solar IoT water quality buoys & tube well sensor heads
          </p>
        </div>

        {/* Location Dropdown */}
        <div className="flex items-center space-x-2">
          <label className="text-xs font-semibold text-slate-600">Location:</label>
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
        </div>
      </div>

      {/* Water Quality Index (WQI) Summary Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-cyan-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-cyan-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-xs font-bold uppercase">
              Calculated Composite WQI
            </span>
            <span className="text-xs text-slate-300">
              Primary Source: {selectedCommunity.waterSourceType}
            </span>
          </div>
          <div className="flex items-baseline space-x-3">
            <span className="text-4xl sm:text-5xl font-extrabold font-['Outfit',sans-serif] text-white">
              {wqi}
            </span>
            <span className="text-sm text-slate-300">/ 100 Overall Score</span>
          </div>
          <p className="text-xs text-slate-300 max-w-xl">
            Synthesized across turbidity, dissolved solids, microbiological coliform, and pH stability.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end space-y-3">
          <div className={`px-3.5 py-1.5 rounded-xl border font-bold text-xs ${wqiStatus.color}`}>
            {wqiStatus.label}
          </div>

          <button
            onClick={() => triggerSensorAnomaly("turbidity_spike")}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Simulate Sensor Turbidity Spike</span>
          </button>
        </div>
      </div>

      {/* 6 Key Water Parameters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Turbidity */}
        <div
          onClick={() => setSelectedParam("turbidity")}
          className={`p-4 rounded-2xl border cursor-pointer transition ${
            selectedParam === "turbidity"
              ? "border-amber-500 bg-amber-50/50 shadow-xs ring-1 ring-amber-400"
              : "border-slate-200 bg-white hover:bg-slate-50"
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Turbidity
          </div>
          <div className="text-xl font-extrabold text-slate-900 mt-1 font-['Outfit',sans-serif]">
            {indicators.turbidity} <span className="text-xs font-medium text-slate-500">NTU</span>
          </div>
          <div className="mt-2 text-[10px]">
            <span className={`px-1.5 py-0.5 rounded font-bold ${
              indicators.turbidity > 5 ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
            }`}>
              {indicators.turbidity > 5 ? "⚠ Alert (>5 NTU)" : "✓ Permissible"}
            </span>
          </div>
        </div>

        {/* pH Level */}
        <div
          onClick={() => setSelectedParam("ph")}
          className={`p-4 rounded-2xl border cursor-pointer transition ${
            selectedParam === "ph"
              ? "border-cyan-500 bg-cyan-50/50 shadow-xs ring-1 ring-cyan-400"
              : "border-slate-200 bg-white hover:bg-slate-50"
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            pH Level
          </div>
          <div className="text-xl font-extrabold text-slate-900 mt-1 font-['Outfit',sans-serif]">
            {indicators.ph} <span className="text-xs font-medium text-slate-500">pH</span>
          </div>
          <div className="mt-2 text-[10px]">
            <span className={`px-1.5 py-0.5 rounded font-bold ${
              indicators.ph >= 6.5 && indicators.ph <= 8.5 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
            }`}>
              {indicators.ph >= 6.5 && indicators.ph <= 8.5 ? "✓ Safe (6.5–8.5)" : "⚠ Abnormal"}
            </span>
          </div>
        </div>

        {/* TDS */}
        <div
          onClick={() => setSelectedParam("tds")}
          className={`p-4 rounded-2xl border cursor-pointer transition ${
            selectedParam === "tds"
              ? "border-purple-500 bg-purple-50/50 shadow-xs ring-1 ring-purple-400"
              : "border-slate-200 bg-white hover:bg-slate-50"
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            TDS (Solids)
          </div>
          <div className="text-xl font-extrabold text-slate-900 mt-1 font-['Outfit',sans-serif]">
            {indicators.tds} <span className="text-xs font-medium text-slate-500">ppm</span>
          </div>
          <div className="mt-2 text-[10px]">
            <span className={`px-1.5 py-0.5 rounded font-bold ${
              indicators.tds <= 500 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
            }`}>
              {indicators.tds <= 500 ? "✓ Safe (<500)" : "⚠ High TDS"}
            </span>
          </div>
        </div>

        {/* Temperature */}
        <div
          onClick={() => setSelectedParam("temperature")}
          className={`p-4 rounded-2xl border cursor-pointer transition ${
            selectedParam === "temperature"
              ? "border-emerald-500 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-400"
              : "border-slate-200 bg-white hover:bg-slate-50"
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Water Temp
          </div>
          <div className="text-xl font-extrabold text-slate-900 mt-1 font-['Outfit',sans-serif]">
            {indicators.temperature} <span className="text-xs font-medium text-slate-500">°C</span>
          </div>
          <div className="mt-2 text-[10px]">
            <span className="px-1.5 py-0.5 rounded font-bold bg-slate-100 text-slate-700">
              Normal Ambient
            </span>
          </div>
        </div>

        {/* Dissolved Oxygen */}
        <div className="p-4 rounded-2xl border border-slate-200 bg-white">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Dissolved Oxygen
          </div>
          <div className="text-xl font-extrabold text-slate-900 mt-1 font-['Outfit',sans-serif]">
            {indicators.dissolvedOxygen} <span className="text-xs font-medium text-slate-500">mg/L</span>
          </div>
          <div className="mt-2 text-[10px]">
            <span className={`px-1.5 py-0.5 rounded font-bold ${
              indicators.dissolvedOxygen >= 5 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
            }`}>
              {indicators.dissolvedOxygen >= 5 ? "✓ Good (>5)" : "⚠ Depleted"}
            </span>
          </div>
        </div>

        {/* Coliform Count */}
        <div className="p-4 rounded-2xl border border-slate-200 bg-white">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Fecal Coliform
          </div>
          <div className="text-xl font-extrabold text-slate-900 mt-1 font-['Outfit',sans-serif]">
            {indicators.coliformCount} <span className="text-xs font-medium text-slate-500">CFU</span>
          </div>
          <div className="mt-2 text-[10px]">
            <span className={`px-1.5 py-0.5 rounded font-bold ${
              indicators.coliformCount === 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
            }`}>
              {indicators.coliformCount === 0 ? "✓ 0 CFU Safe" : "⚠ Contaminated"}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Trend Chart Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold text-slate-900">
            Telemetry Time-Series Analysis
          </div>
          {/* Timeframe selector */}
          <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold">
            {(["24h", "7d", "30d"] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                  timeframe === tf ? "bg-white text-slate-900 font-bold shadow-xs" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {tf.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <WaterChart
          parameter={selectedParam}
          timeframe={timeframe}
          currentValue={
            selectedParam === "turbidity"
              ? indicators.turbidity
              : selectedParam === "ph"
              ? indicators.ph
              : selectedParam === "tds"
              ? indicators.tds
              : indicators.temperature
          }
        />
      </div>

      {/* Simulated IoT Sensor Nodes Status */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Radio className="w-5 h-5 text-teal-600 animate-pulse" />
            <h2 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              Local IoT Telemetry Nodes • {selectedCommunity.name}
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Mesh Protocol v1.4</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Node A (River Intake)</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <div className="text-xs text-slate-600">
              Turbidity: <strong>{indicators.turbidity} NTU</strong>
            </div>
            <div className="text-[11px] text-slate-400">Battery: 92% • Solar Buoy Active</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Node B (Village Handpump #4)</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <div className="text-xs text-slate-600">
              pH: <strong>{indicators.ph}</strong> • TDS: <strong>{indicators.tds} ppm</strong>
            </div>
            <div className="text-[11px] text-slate-400">Battery: 88% • Deep Aquifer Sensor</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Node C (Primary School Tap)</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <div className="text-xs text-slate-600">
              Residual Chlorine: <strong>0.2 mg/L</strong> (Adequate)
            </div>
            <div className="text-[11px] text-slate-400">Battery: 96% • Distribution Point</div>
          </div>
        </div>
      </div>
    </div>
  );
};
