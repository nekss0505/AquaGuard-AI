import React from "react";
import { useApp } from "../context/AppContext";
import {
  Droplets,
  ShieldCheck,
  Brain,
  HeartPulse,
  Award,
  Globe,
  Sparkles,
  CheckCircle2,
  Lock,
  Layers,
  HelpCircle,
} from "lucide-react";

export const AboutPage: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
          <Award className="w-4 h-4 text-teal-600" />
          Smart India Hackathon • SIH25001
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
          About Aqua<span className="text-teal-600">Guard</span>
        </h1>

        <div className="text-sm sm:text-base font-bold text-teal-700 max-w-2xl mx-auto">
          "Smart Community Health Monitoring and Early Warning System for Water-Borne Diseases in Tamil Nadu"
        </div>

        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          AquaGuard addresses the critical public health challenge of water-borne disease outbreaks across flood-prone coastal deltas and river basins in Tamil Nadu (Cauvery Delta, Cuddalore, Nagapattinam, Madurai, and Erode). By synthesizing IoT water sensors, community syndromic reporting, and rainfall runoff data, the system provides up to <strong>72 hours of early warning lead time</strong>.
        </p>
      </div>

      {/* Core Architectural Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
            <Brain className="w-5 h-5" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
            1. Multi-Signal Sentinel Fusion
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Correlates physical water quality parameters (turbidity, pH, coliform) with grassroots symptom reports and river flood levels, avoiding single-point false positives.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
            <HeartPulse className="w-5 h-5" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
            2. Grassroots ASHA Integration
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Empowers Accredited Social Health Activists (ASHA) and Auxiliary Nurse Midwives (ANM) with rapid household verification, emergency ORS deployment, and well-chlorination triage.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center font-bold">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
            3. Native Multilingual Support
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Full support for Tamil (தமிழ்), Hindi (हिन्दी), Bengali (বাংলা), and English to ensure all community members, Village Health Nurses (VHN), and elders can report and receive urgent boil-water alerts.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
            4. Privacy-First Architecture
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Anonymous community reporting with zero public disclosure of personal identifiable information (PII). Public risk maps only render aggregated village ward heat maps.
          </p>
        </div>
      </div>

      {/* Official Hackathon Prototype Disclaimer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-3">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Hackathon Prototype & Demo Notice</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          This software is developed as an interactive functional demonstration prototype for the Smart India Hackathon (SIH25001). All sensor streams, demographic datasets, and epidemiological syndromic feeds are <strong>simulated for evaluation and workflow demonstration purposes</strong>. This system is designed to complement—not replace—official medical diagnosis and statutory water regulatory laboratories.
        </p>
      </div>
    </div>
  );
};
