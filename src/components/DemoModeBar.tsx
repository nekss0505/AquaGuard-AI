import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Zap, ChevronDown, ChevronUp, Check } from "lucide-react";
import { DemoScenario } from "../types";

export const DemoModeBar: React.FC = () => {
  const { currentScenario, loadScenario, triggerSensorAnomaly, t } = useApp();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const scenarios: { id: DemoScenario; title: string; label: string; desc: string; color: string }[] = [
    {
      id: "normal",
      title: t.scenarioSafe,
      label: "Thanjavur (18%)",
      desc: t.scenarioSafeDesc,
      color: "border-emerald-400 bg-emerald-50 text-emerald-900",
    },
    {
      id: "contamination",
      title: t.scenarioCaution,
      label: "Nagapattinam (68%)",
      desc: t.scenarioCautionDesc,
      color: "border-amber-400 bg-amber-50 text-amber-900",
    },
    {
      id: "cluster",
      title: t.scenarioCluster,
      label: "Erode (66%)",
      desc: t.scenarioClusterDesc,
      color: "border-orange-400 bg-orange-50 text-orange-900",
    },
    {
      id: "outbreak",
      title: t.scenarioOutbreak,
      label: "Cuddalore (84%)",
      desc: t.scenarioOutbreakDesc,
      color: "border-red-400 bg-red-50 text-red-900",
    },
  ];

  const currentObj = scenarios.find((s) => s.id === currentScenario) || scenarios[0];

  return (
    <div className="bg-slate-900 text-white text-xs border-b border-slate-800 transition">
      <div className="max-w-6xl mx-auto px-4 py-1.5 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-teal-400 px-1.5 py-0.5 rounded bg-teal-950 border border-teal-800">
            {t.demoMode}
          </span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-1.5 text-xs font-bold text-slate-200 hover:text-white transition cursor-pointer"
          >
            <span>{currentObj.title} ({currentObj.label})</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-teal-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => triggerSensorAnomaly("turbidity_spike")}
            className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-[11px] font-bold transition cursor-pointer flex items-center space-x-1"
            title="Simulate contamination spike"
          >
            <Zap className="w-3 h-3 text-amber-400" />
            <span>{t.triggerSpike}</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="bg-slate-950 border-t border-slate-800 px-4 py-3 animate-in slide-in-from-top-1 duration-150">
          <div className="max-w-6xl mx-auto">
            <div className="text-[11px] text-slate-400 font-bold mb-2">
              {t.loadScenario}:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {scenarios.map((sc) => {
                const isSelected = currentScenario === sc.id;
                return (
                  <button
                    key={sc.id}
                    onClick={() => {
                      loadScenario(sc.id);
                      setIsOpen(false);
                    }}
                    className={`text-left p-3 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? `${sc.color} ring-2 ring-teal-400 font-bold shadow-xs`
                        : "border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-xs font-black">{sc.title}</span>
                      {isSelected && <Check className="w-4 h-4 text-teal-600 font-bold" />}
                    </div>
                    <div className="text-xs font-semibold text-slate-700">{sc.label}</div>
                    <div className="text-[11px] opacity-80 mt-1">{sc.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
