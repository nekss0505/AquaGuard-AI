import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Droplets,
  HeartPulse,
  Brain,
  BellRing,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  MapPin,
  TrendingUp,
  Activity,
  CheckCircle2,
  HelpCircle,
  Clock,
  Shield,
  Layers,
  ChevronRight,
} from "lucide-react";
import { RiskGauge } from "../components/RiskGauge";

export const LandingPage: React.FC = () => {
  const { setPage, selectedCommunity, t, loadScenario } = useApp();
  const [activeTab, setActiveTab] = useState<"with" | "without">("with");

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 bg-radial-[at_top_right] from-teal-500/10 via-slate-50 to-slate-50 rounded-3xl border border-slate-200/80 p-6 sm:p-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
            Smart India Hackathon • SIH25001 Sentinel Platform
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
            Aqua<span className="text-teal-600">Guard</span>
          </h1>

          {/* Tagline */}
          <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-teal-700 tracking-tight">
            "{t.tagline}"
          </div>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            {t.heroSub}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setPage("dashboard")}
              className="px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-teal-600/20 hover:scale-[1.02] transition cursor-pointer flex items-center gap-2"
            >
              <span>{t.checkRisk}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setPage("report")}
              className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-md hover:scale-[1.02] transition cursor-pointer flex items-center gap-2"
            >
              <HeartPulse className="w-4 h-4 text-rose-400" />
              <span>{t.reportConcern}</span>
            </button>

            <button
              onClick={() => setPage("awareness")}
              className="px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-sm sm:text-base transition cursor-pointer"
            >
              {t.awarenessCenter}
            </button>
          </div>
        </div>

        {/* Animated Visual Flow Diagram */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
            Continuous Sentinel Early-Warning Pipeline
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 relative">
            {/* Step 1 */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs text-center flex flex-col items-center justify-center group hover:border-teal-400 transition">
              <div className="w-9 h-9 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-2 font-bold">
                <Droplets className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-900">WATER DATA</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Turbidity, pH, TDS, Runoff</div>
            </div>

            {/* Step 2 */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs text-center flex flex-col items-center justify-center group hover:border-teal-400 transition">
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-2 font-bold">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-900">HEALTH REPORTS</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Syndromic reports, ASHA logs</div>
            </div>

            {/* Step 3 */}
            <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-300 shadow-sm text-center flex flex-col items-center justify-center group">
              <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center mb-2 font-bold">
                <Brain className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-teal-900">AI ANALYSIS</div>
              <div className="text-[10px] text-teal-700 mt-0.5">Anomaly & baseline synthesis</div>
            </div>

            {/* Step 4 */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs text-center flex flex-col items-center justify-center group hover:border-amber-400 transition">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-2 font-bold">
                <BellRing className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-900">EARLY WARNING</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Risk tiers & geo-alerts</div>
            </div>

            {/* Step 5 */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs text-center flex flex-col items-center justify-center group hover:border-emerald-400 transition">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-900">PREVENT ACTION</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Boil water, ORS, chlorination</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem & Our Solution */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* The Problem */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
              <AlertTriangle className="w-3.5 h-3.5" />
              THE CRITICAL CHALLENGE
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              Why Water-Borne Outbreaks Escalate
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              In flood-prone coastal deltas and river basins across Tamil Nadu, contaminated water from heavy monsoon rains and canal runoff submerges borewells and ring wells. Community members fall sick over several days, but health authorities only recognize the pattern <strong>after</strong> dozens of patients reach hospitals in severe dehydration.
            </p>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start space-x-2">
                <span className="text-red-500 font-bold">✕</span>
                <span>Water tests performed only after clinical outbreak is declared.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 font-bold">✕</span>
                <span>Fragmented manual logs and delayed reporting from remote coastal hamlets.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 font-bold">✕</span>
                <span>Preventive action (chlorine distribution, boiling advisories) begins too late.</span>
              </li>
            </ul>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
            Result: Reactive containment instead of proactive prevention.
          </div>
        </div>

        {/* Our Solution */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-teal-900 to-slate-900 text-white border border-teal-800/50 shadow-md flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              THE AQUAGUARD INNOVATION
            </div>
            <h2 className="text-2xl font-extrabold text-white font-['Outfit',sans-serif]">
              Multi-Signal Early Warning Intelligence
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              AquaGuard fuses three critical data layers: <strong>Water Quality Sensors</strong> (pH, Turbidity, Coliform), <strong>Syndromic Community Health Reports</strong> (diarrhea, vomiting clusters), and <strong>Environmental Risk</strong> (rainfall, river flooding). AI detects anomalies up to <strong>72 hours earlier</strong>.
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Continuous turbidity & sensor anomaly tracking before bacteria spread.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Instant crowdsourced & ASHA syndromic reporting in 4 local languages.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Automated early alerts with plain-language household boil advisories.</span>
              </li>
            </ul>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-teal-300 font-semibold">
            <span>Vision: Proactive community protection</span>
            <button
              onClick={() => setPage("early-warning")}
              className="text-white hover:text-teal-200 flex items-center gap-1 cursor-pointer"
            >
              <span>Explore AI Engine</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works (6 Stages) */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
            System Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
            How AquaGuard Works End-to-End
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            From environmental sensor telemetry to grassroots household containment in 6 rapid stages.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              step: "01",
              title: "Collect",
              desc: "Telemetry ingested from IoT water sensor nodes, community symptom reports, and rainfall precipitation stations.",
              icon: Droplets,
              color: "bg-blue-50 text-blue-700 border-blue-200",
            },
            {
              step: "02",
              title: "Analyze",
              desc: "Statistical baseline comparisons against 5-year seasonal patterns to identify sudden rate-of-change anomalies.",
              icon: Brain,
              color: "bg-purple-50 text-purple-700 border-purple-200",
            },
            {
              step: "03",
              title: "Detect",
              desc: "Spatial clustering algorithms pinpoint correlated contamination spikes and symptom clusters in specific village wards.",
              icon: MapPin,
              color: "bg-amber-50 text-amber-700 border-amber-200",
            },
            {
              step: "04",
              title: "Alert",
              desc: "Automated risk scores trigger multi-channel alerts to Primary Health Centres (PHCs) and village residents.",
              icon: BellRing,
              color: "bg-red-50 text-red-700 border-red-200",
            },
            {
              step: "05",
              title: "Respond",
              desc: "ASHA grassroots workers receive field triage tickets for rapid household ORS distribution and well shock-chlorination.",
              icon: HeartPulse,
              color: "bg-teal-50 text-teal-700 border-teal-200",
            },
            {
              step: "06",
              title: "Prevent",
              desc: "Community boil-water guidelines prevent secondary household transmission before widespread hospital admissions occur.",
              icon: ShieldCheck,
              color: "bg-emerald-50 text-emerald-700 border-emerald-200",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-md transition space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl border ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-extrabold text-slate-300 font-mono">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* "What If We Detected It Early?" Interactive Story Section */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
            Interactive Scenario Analysis
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif]">
            What If We Detected It Early?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Compare the real-world timeline of a water-borne contamination event with and without AquaGuard.
          </p>

          {/* Toggle Tabs */}
          <div className="inline-flex p-1 rounded-xl bg-slate-800 border border-slate-700 mt-2">
            <button
              onClick={() => setActiveTab("without")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === "without"
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Without Early Warning (Delayed)
            </button>
            <button
              onClick={() => setActiveTab("with")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === "with"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              With AquaGuard (Proactive)
            </button>
          </div>
        </div>

        {/* Story Flow */}
        <div className="max-w-4xl mx-auto">
          {activeTab === "without" ? (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800/60 flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-red-900/60 text-red-300 font-bold text-xs shrink-0">
                  Day 1
                </div>
                <div>
                  <div className="text-xs font-bold text-red-200">Heavy Rainfall & Submerged Tube Well</div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    Flood runoff contaminates shallow handpump. Water appears slightly cloudy, but villagers continue drinking without treatment.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800/60 flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-red-900/60 text-red-300 font-bold text-xs shrink-0">
                  Day 3
                </div>
                <div>
                  <div className="text-xs font-bold text-red-200">Scattered Illness (Unrecognized)</div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    12 households develop acute watery diarrhea. Believed to be isolated stomach upsets; no official report reaches health authorities.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800/60 flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-red-900/60 text-red-300 font-bold text-xs shrink-0">
                  Day 6
                </div>
                <div>
                  <div className="text-xs font-bold text-red-200">Severe Outbreak & Hospital Overload</div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    Over 80 patients arrive at Sub-divisional Hospital in shock and severe dehydration. Emergency medical camps must be mobilized under severe distress.
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="p-4 rounded-2xl bg-teal-950/40 border border-teal-800/60 flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-teal-900/60 text-teal-300 font-bold text-xs shrink-0">
                  Hour 6
                </div>
                <div>
                  <div className="text-xs font-bold text-teal-200">IoT Sensor Anomaly Triggered</div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    Water turbidity spikes to 14.8 NTU following 140mm rainfall. Sentinel engine automatically flags high contamination probability.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-teal-950/40 border border-teal-800/60 flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-teal-900/60 text-teal-300 font-bold text-xs shrink-0">
                  Hour 18
                </div>
                <div>
                  <div className="text-xs font-bold text-teal-200">Syndromic Cluster Correlation</div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    4 early community diarrhea reports match the sensor anomaly. AI calculates 84% Outbreak Risk and dispatches early alert to ASHA workers.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-teal-950/40 border border-teal-800/60 flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-teal-900/60 text-teal-300 font-bold text-xs shrink-0">
                  Hour 24
                </div>
                <div>
                  <div className="text-xs font-bold text-teal-200">Preventive Containment & Safe Water</div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    ASHA distributes ORS packets and chlorine tablets door-to-door. Tube well is isolated and disinfected. Outbreak halted before hospitalizations escalate!
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Demonstrative Impact Metrics (Clearly marked SIMULATED DEMO DATA) */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              Prototype Surveillance Footprint
            </h2>
            <p className="text-xs text-slate-500">
              Simulated demonstration metrics across rural Northeast India pilot sectors
            </p>
          </div>
          <span className="self-start sm:self-auto px-2.5 py-1 rounded-md bg-amber-100 border border-amber-300 text-amber-800 text-[11px] font-bold">
            {t.simulatedDemoData}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-teal-600 font-['Outfit',sans-serif]">
              24
            </div>
            <div className="text-xs font-bold text-slate-800 mt-1">Communities Monitored</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Barpeta, Dhemaji, Majuli</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-600 font-['Outfit',sans-serif]">
              1,480+
            </div>
            <div className="text-xs font-bold text-slate-800 mt-1">Water Samples Telemetry</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Turbidity, pH, TDS, DO</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 font-['Outfit',sans-serif]">
              342
            </div>
            <div className="text-xs font-bold text-slate-800 mt-1">Health Reports Processed</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Crowdsourced & ASHA logs</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-rose-600 font-['Outfit',sans-serif]">
              18
            </div>
            <div className="text-xs font-bold text-slate-800 mt-1">Early Warnings Generated</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Average 48h lead time</div>
          </div>
        </div>
      </section>
    </div>
  );
};
