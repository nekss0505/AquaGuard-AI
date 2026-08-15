import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  HeartPulse,
  Droplets,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  UserX,
  Volume2,
  VolumeX,
} from "lucide-react";

export const ReportConcernPage: React.FC = () => {
  const {
    communities,
    selectedCommunity,
    addReport,
    setPage,
    t,
    language,
    speakText,
    isSpeaking,
    stopSpeaking,
  } = useApp();

  const [communityId, setCommunityId] = useState<string>(selectedCommunity.id);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState<"Mild" | "Moderate" | "Severe">("Moderate");
  const [selectedWaterProblems, setSelectedWaterProblems] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [submittedReportId, setSubmittedReportId] = useState<string | null>(null);

  const quickReportTypes = [
    {
      id: "vomiting_diarrhea",
      title: t.vomitingDiarrhea,
      icon: "🤢",
      symptom: "Watery Diarrhea",
      color: "border-rose-300 bg-rose-50/80 text-rose-950",
    },
    {
      id: "dirty_water",
      title: t.dirtyWater,
      icon: "🚰",
      problem: "Cloudy / Muddy Water",
      color: "border-amber-300 bg-amber-50/80 text-amber-950",
    },
    {
      id: "fever_cramps",
      title: t.feverWeakness,
      icon: "🌡️",
      symptom: "High Fever",
      color: "border-purple-300 bg-purple-50/80 text-purple-950",
    },
    {
      id: "broken_pipe",
      title: t.brokenPipe,
      icon: "🛠️",
      problem: "Broken Pipe",
      color: "border-cyan-300 bg-cyan-50/80 text-cyan-950",
    },
  ];

  const handleQuickSubmit = (type: any) => {
    const targetComm = communities.find((c) => c.id === communityId) || selectedCommunity;
    const reportId = addReport({
      communityId: targetComm.id,
      communityName: targetComm.name,
      symptoms: type.symptom ? [type.symptom] : selectedSymptoms,
      symptomSeverity: severity,
      durationDays: 1,
      affectedCount: 1,
      waterProblems: type.problem ? [type.problem] : selectedWaterProblems,
      locationDetails: `Quick concern report from ${targetComm.name}`,
      description: description || `Reported: ${type.title}`,
      isAnonymous: isAnonymous,
      contact: contact,
    });
    setSubmittedReportId(reportId);
  };

  const handleVoiceReadout = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const speechText = `${t.reportTitle}. ${t.reportSub}. ${t.issueType}.`;
      const speechLang = language === "ta" ? "ta-IN" : language === "hi" ? "hi-IN" : language === "bn" ? "bn-IN" : "en-IN";
      speakText(speechText, speechLang);
    }
  };

  if (submittedReportId) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-white rounded-3xl border border-emerald-200 p-8 text-center shadow-lg space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              {t.verifiedBadge}
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              {t.reportSuccessMsg}
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
              {t.healthWorkerSub}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">{t.selectVillage}:</span>
              <span className="font-bold text-slate-900">{selectedCommunity.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">Report ID:</span>
              <span className="font-mono font-bold text-teal-700">{submittedReportId}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                setSubmittedReportId(null);
                setSelectedSymptoms([]);
                setSelectedWaterProblems([]);
                setDescription("");
              }}
              className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition cursor-pointer"
            >
              {t.reportConcern}
            </button>
            <button
              onClick={() => setPage("dashboard")}
              className="flex-1 py-3 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 transition cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <span>{t.navDashboard}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1">
              <HeartPulse className="w-3.5 h-3.5" />
              <span>{t.waterSentinel}</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif] mt-1">
            {t.reportTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.reportSub}
          </p>
        </div>

        <button
          onClick={handleVoiceReadout}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition cursor-pointer ${
            isSpeaking
              ? "bg-rose-600 text-white animate-pulse"
              : "bg-slate-100 hover:bg-slate-200 text-slate-800"
          }`}
        >
          {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span>{isSpeaking ? t.stopVoice : t.listenInVoice}</span>
        </button>
      </div>

      {/* Village Picker */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <label className="text-xs font-bold text-slate-700">
          📍 {t.selectVillage}:
        </label>
        <select
          value={communityId}
          onChange={(e) => setCommunityId(e.target.value)}
          className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white font-bold text-xs text-slate-900 focus:outline-teal-500"
        >
          {communities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.district})
            </option>
          ))}
        </select>
      </div>

      {/* 1-Touch Quick Cards */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
          {t.issueType}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {quickReportTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleQuickSubmit(type)}
              className={`p-5 rounded-2xl border-2 text-left transition cursor-pointer hover:scale-[1.01] flex items-center space-x-4 shadow-xs ${type.color}`}
            >
              <span className="text-4xl">{type.icon}</span>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  {type.title}
                </h3>
                <p className="text-xs opacity-75 mt-0.5">
                  {t.submitReportBtn}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Optional Details Box */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">
          {t.descriptionLabel}
        </h3>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t.descriptionPlaceholder}
          className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:outline-teal-500 text-slate-900"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.contactLabel}
            </label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder={t.contactPlaceholder}
              className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-teal-500 text-slate-900"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={() => handleQuickSubmit({ title: description || "Detailed Report" })}
              className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition cursor-pointer shadow-xs"
            >
              {t.submitReportBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
