import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Stethoscope,
  HeartPulse,
  Droplets,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  Send,
  Package,
  Plus,
  ArrowRight,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

export const HealthWorkerDashboard: React.FC = () => {
  const {
    reports,
    verifyReport,
    selectedCommunity,
    communities,
    setSelectedCommunityId,
    t,
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  // Supply Stock state
  const [orsStock, setOrsStock] = useState<number>(140);
  const [chlorineStock, setChlorineStock] = useState<number>(450);
  const [zincStock, setZincStock] = useState<number>(90);
  const [vialsStock, setVialsStock] = useState<number>(24);

  // Verification Form state
  const [testResult, setTestResult] = useState<"Contaminated (Black H2S)" | "Safe (No H2S)">("Contaminated (Black H2S)");
  const [orsGiven, setOrsGiven] = useState<number>(2);
  const [chlorineDistributed, setChlorineDistributed] = useState<number>(10);
  const [notes, setNotes] = useState<string>("");

  const filteredReports = reports.filter((r) => {
    if (filterStatus === "ALL") return true;
    return r.status === filterStatus;
  });

  const handleVerifySubmit = (reportId: string) => {
    verifyReport(
      reportId,
      "ASHA Worker (Field Unit)",
      `Field Verified: ${testResult}. Distributed ${orsGiven} ORS packets & ${chlorineDistributed} chlorine tablets. ${notes ? `Notes: ${notes}` : "Household advised to boil all water."}`
    );
    setOrsStock((prev) => Math.max(0, prev - orsGiven));
    setChlorineStock((prev) => Math.max(0, prev - chlorineDistributed));
    setSelectedReportId(null);
    setNotes("");
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-teal-100 text-teal-800">
              <Stethoscope className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
              Field Surveillance Desk
            </span>
            <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold">
              ASHA / ANM Mode
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif] mt-1">
            {t.navHealthWorker}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Grassroots syndromic triage, field H2S bacteriological testing, and emergency supply deployment
          </p>
        </div>

        {/* Location Selector */}
        <div className="flex items-center space-x-2">
          <label className="text-xs font-semibold text-slate-600">Assigned Sector:</label>
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

      {/* Grassroots Supply Stock Counter Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-teal-400" />
            <h2 className="text-base font-extrabold font-['Outfit',sans-serif]">
              Sub-Centre Emergency Medical Inventory
            </h2>
          </div>
          <span className="text-xs text-teal-300 font-semibold">
            {selectedCommunity.name} Health Post
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <div className="text-[10px] uppercase font-bold text-slate-400">ORS Packets</div>
            <div className="text-2xl font-extrabold text-white mt-1 font-mono">{orsStock}</div>
            <div className="text-[10px] text-teal-400 mt-0.5">WHO Formula</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <div className="text-[10px] uppercase font-bold text-slate-400">Chlorine Tabs</div>
            <div className="text-2xl font-extrabold text-white mt-1 font-mono">{chlorineStock}</div>
            <div className="text-[10px] text-teal-400 mt-0.5">Halazone 0.5g</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <div className="text-[10px] uppercase font-bold text-slate-400">Zinc 20mg</div>
            <div className="text-2xl font-extrabold text-white mt-1 font-mono">{zincStock}</div>
            <div className="text-[10px] text-teal-400 mt-0.5">Pediatric strips</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <div className="text-[10px] uppercase font-bold text-slate-400">H2S Test Vials</div>
            <div className="text-2xl font-extrabold text-white mt-1 font-mono">{vialsStock}</div>
            <div className="text-[10px] text-teal-400 mt-0.5">Bacteriological kits</div>
          </div>
        </div>
      </div>

      {/* Field Triage Queue */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              Incoming Symptom Triage Queue
            </h2>
            <p className="text-xs text-slate-500">
              Community submissions requiring rapid household verification & ORS dispatch
            </p>
          </div>

          {/* Filter Status */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500 font-medium">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-teal-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="pending">Pending Verification</option>
              <option value="verified">Verified</option>
              <option value="escalated">Escalated</option>
            </select>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-3">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="p-4 rounded-2xl border border-slate-200 hover:border-teal-400 transition bg-slate-50/50 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2 flex-wrap">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                      {report.id}
                    </span>
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-teal-600" />
                      {report.communityName} • {report.locationDetails}
                    </span>
                    <span className="text-[10px] text-slate-400">{report.timestamp}</span>
                  </div>

                  {/* Symptoms & Severity */}
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    {report.symptoms.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200 text-[10px] font-semibold"
                      >
                        {s}
                      </span>
                    ))}
                    {report.waterProblems.map((w) => (
                      <span
                        key={w}
                        className="px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-800 border border-cyan-200 text-[10px] font-semibold"
                      >
                        💧 {w}
                      </span>
                    ))}
                  </div>

                  {report.description && (
                    <p className="text-xs text-slate-600 mt-2 italic">
                      "{report.description}"
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      report.status === "verified"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : report.status === "escalated"
                        ? "bg-amber-100 text-amber-800 border border-amber-300"
                        : "bg-red-100 text-red-800 border border-red-300"
                    }`}
                  >
                    {report.status}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Affected: <strong>{report.affectedCount} persons</strong>
                  </span>
                </div>
              </div>

              {/* Verified Notes if resolved/verified */}
              {report.notes && (
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-medium border border-emerald-200">
                  ✓ {report.notes} (By {report.verifiedBy || "ASHA Unit"})
                </div>
              )}

              {/* Action Button */}
              {report.status === "pending" && (
                <div className="pt-2 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={() =>
                      setSelectedReportId(selectedReportId === report.id ? null : report.id)
                    }
                    className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition cursor-pointer flex items-center space-x-1.5 shadow-xs"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>
                      {selectedReportId === report.id ? "Close Verification Form" : "Verify & Distribute ORS"}
                    </span>
                  </button>
                </div>
              )}

              {/* Inline Verification Modal / Form */}
              {selectedReportId === report.id && (
                <div className="p-4 rounded-2xl bg-white border border-teal-300 shadow-sm space-y-3 animate-in fade-in duration-200">
                  <div className="text-xs font-bold text-teal-900 uppercase tracking-wider">
                    ASHA Field Verification & Action Log
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        H2S Vial Rapid Bacterial Test
                      </label>
                      <select
                        value={testResult}
                        onChange={(e) => setTestResult(e.target.value as any)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                      >
                        <option value="Contaminated (Black H2S)">Contaminated (Black H2S Present)</option>
                        <option value="Safe (No H2S)">Safe (Clear / No H2S)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        ORS Packets Given
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={orsGiven}
                        onChange={(e) => setOrsGiven(parseInt(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Field Notes & Household Action
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Well sealed for chlorination. Household demonstrated ORS prep."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      onClick={() => setSelectedReportId(null)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleVerifySubmit(report.id)}
                      className="px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                    >
                      Complete Verification
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
