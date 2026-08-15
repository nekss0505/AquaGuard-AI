import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Volume2,
  VolumeX,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  Flame,
  HeartPulse,
  Droplets,
  ShieldCheck,
} from "lucide-react";

export const ElderSafetyView: React.FC = () => {
  const {
    selectedCommunity,
    communities,
    setSelectedCommunityId,
    language,
    speakText,
    isSpeaking,
    stopSpeaking,
    addReport,
    showToast,
    t,
  } = useApp();

  const [oneClickStatus, setOneClickStatus] = useState<string | null>(null);

  const isDanger = selectedCommunity.riskLevel === "CRITICAL";
  const isCaution =
    selectedCommunity.riskLevel === "HIGH" ||
    selectedCommunity.riskLevel === "MODERATE";

  // Speech generator based on active language
  const getAudioSpeech = () => {
    if (language === "ta") {
      if (isDanger) {
        return `${selectedCommunity.name} கிராமத்திற்கு அவசர எச்சரிக்கை. குடிநீர் தற்போது பாதுகாப்பற்றது. குடிநீரை கட்டாயம் மூன்று நிமிடம் நன்றாக கொதிக்க வைத்து மட்டுமே குடிக்கவும். யாருக்காவது வாந்தி அல்லது வயிற்றுப்போக்கு இருந்தால், உடனடியாக உப்பு சர்க்கரை கரைசல் கொடுத்து கிராம சுகாதார செவிலியரை தொடர்பு கொள்ளவும்.`;
      }
      if (isCaution) {
        return `${selectedCommunity.name} கிராமத்தில் குடிநீரில் கலங்கல் தன்மை ஏற்பட்டுள்ளது. குடிநீரை மூன்று நிமிடம் கொதிக்க வைத்து வடிகட்டி குடிக்கவும். கைகளை சோப்பு போட்டு கழுவவும்.`;
      }
      return `${selectedCommunity.name} கிராமத்தில் குடிநீர் தற்போது பாதுகாப்பாக உள்ளது. வழக்கம்போல் சுத்தமான பாத்திரத்தில் மூடி வைத்து குடிக்கவும்.`;
    } else if (language === "hi") {
      if (isDanger) {
        return `${selectedCommunity.name} गांव के लिए आपातकालीन चेतावनी। पीने का पानी वर्तमान में असुरक्षित है। कृपया पानी को 3 मिनट उबालकर ही पिएं। यदि किसी को दस्त या उल्टी हो, तो ओआरएस दें और स्वास्थ्य कार्यकर्ता से संपर्क करें।`;
      }
      if (isCaution) {
        return `${selectedCommunity.name} में पानी में मैलापन पाया गया है। पीने से पहले पानी को 3 मिनट उबालें और हाथों को साबुन से धोएं।`;
      }
      return `${selectedCommunity.name} में पीने का पानी वर्तमान में सुरक्षित है। नियमित स्वच्छता बनाए रखें।`;
    } else if (language === "bn") {
      if (isDanger) {
        return `${selectedCommunity.name} গ্রামের জন্য জরুরি সতর্কতা। পানীয় জল বর্তমানে অনিরাপদ। জল ৩ মিনিট ফুটিয়ে পান করুন। কারও বমি বা ডায়রিয়া হলে ওআরএস খাওয়ান এবং স্বাস্থ্যকর্মীকে জানান।`;
      }
      if (isCaution) {
        return `${selectedCommunity.name} গ্রামে জলে ঘোলাভাব দেখা গেছে। জল ৩ মিনিট ফুটিয়ে পান করুন। সাবান দিয়ে হাত ধোবেন।`;
      }
      return `${selectedCommunity.name} গ্রামে পানীয় জল বর্তমানে নিরাপদ।`;
    } else {
      if (isDanger) {
        return `Emergency warning for ${selectedCommunity.name}. Drinking water is currently contaminated. Please boil all drinking water for at least 3 minutes before drinking. If anyone has diarrhea or vomiting, give ORS solution and contact the local health nurse immediately.`;
      }
      if (isCaution) {
        return `Caution for ${selectedCommunity.name}. Water has elevated turbidity. Please boil drinking water for 3 minutes before drinking and wash hands with soap.`;
      }
      return `Water in ${selectedCommunity.name} is currently safe for drinking. Continue regular hygiene.`;
    }
  };

  const getSpeechLang = () => {
    if (language === "ta") return "ta-IN";
    if (language === "hi") return "hi-IN";
    if (language === "bn") return "bn-IN";
    return "en-IN";
  };

  const handleToggleVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(getAudioSpeech(), getSpeechLang());
    }
  };

  const handleQuickReport = (issue: string) => {
    addReport({
      communityId: selectedCommunity.id,
      communityName: selectedCommunity.name,
      symptoms:
        issue === "vomit_diarrhea"
          ? ["Watery Diarrhea", "Vomiting"]
          : issue === "child_sick"
          ? ["Fever", "Fatigue", "Nausea"]
          : ["Mild Stomach Cramps"],
      symptomSeverity: issue === "vomit_diarrhea" ? "Severe" : "Moderate",
      durationDays: 1,
      affectedCount: 1,
      waterProblems:
        issue === "dirty_water"
          ? ["Turbid/Cloudy Water", "Foul Odor"]
          : ["Cloudy Water"],
      locationDetails: `Quick 1-Touch Report from ${selectedCommunity.name}`,
      description: `Elder quick report: ${issue}`,
      isAnonymous: true,
    });

    setOneClickStatus(issue);
    showToast(t.reportSuccessMsg, "success");

    setTimeout(() => {
      setOneClickStatus(null);
    }, 4000);
  };

  return (
    <div className="w-full min-w-0 max-w-full overflow-hidden bg-white rounded-3xl border-2 border-teal-500/25 p-4 sm:p-7 shadow-lg space-y-6">
      {/* Top Banner: Header & Location + Voice Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-teal-50/80 via-cyan-50/70 to-emerald-50/80 p-4 sm:p-5 rounded-2xl border border-teal-200/80">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-extrabold text-2xl shadow-md shadow-teal-600/20 shrink-0">
            👴
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider bg-teal-600 text-white px-2.5 py-0.5 rounded-full whitespace-nowrap">
                {t.elderTitle}
              </span>
              <span className="text-xs font-bold text-teal-800 bg-teal-100/60 px-2 py-0.5 rounded-md border border-teal-200/60">
                {selectedCommunity.district}
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif] mt-1 leading-tight break-words [overflow-wrap:anywhere]">
              {selectedCommunity.name}
            </h2>
          </div>
        </div>

        {/* Big Village Selector & Voice Button */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Village Picker */}
          <select
            value={selectedCommunity.id}
            onChange={(e) => setSelectedCommunityId(e.target.value)}
            className="w-full sm:w-auto min-w-0 max-w-full px-3 py-2 rounded-xl border-2 border-teal-500 bg-white font-extrabold text-xs sm:text-sm text-slate-900 shadow-xs cursor-pointer focus:outline-teal-600"
          >
            {communities.map((c) => (
              <option key={c.id} value={c.id}>
                📍 {c.name} ({c.riskLevel})
              </option>
            ))}
          </select>

          {/* Voice Readout Button */}
          <button
            onClick={handleToggleVoice}
            className={`px-4 py-2 rounded-xl font-extrabold text-xs sm:text-sm flex items-center space-x-2 transition cursor-pointer shadow-md whitespace-nowrap ${
              isSpeaking
                ? "bg-rose-600 text-white animate-pulse"
                : "bg-teal-700 hover:bg-teal-800 text-white shadow-teal-700/20"
            }`}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4 shrink-0" />
                <span>{t.stopVoice}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 shrink-0" />
                <span>{t.listenInVoice}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 1. Main Water Safety Traffic Light Card */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border-3 text-center transition-all ${
          isDanger
            ? "bg-red-50/90 border-red-400 text-red-950 shadow-red-100"
            : isCaution
            ? "bg-amber-50/90 border-amber-400 text-amber-950 shadow-amber-100"
            : "bg-emerald-50/90 border-emerald-400 text-emerald-950 shadow-emerald-100"
        }`}
      >
        <div className="flex justify-center mb-3">
          <div
            className={`w-18 h-18 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center text-white text-3xl shadow-lg ${
              isDanger
                ? "bg-red-600 animate-bounce"
                : isCaution
                ? "bg-amber-500"
                : "bg-emerald-600"
            }`}
          >
            {isDanger ? (
              <Flame className="w-10 h-10" />
            ) : isCaution ? (
              <AlertTriangle className="w-10 h-10" />
            ) : (
              <CheckCircle2 className="w-10 h-10" />
            )}
          </div>
        </div>

        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/80 border border-slate-300/60 shadow-xs mb-2">
          {t.elderWaterSafeQ}
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif] mt-1 leading-tight">
          {isDanger
            ? t.elderWaterSafeDanger
            : isCaution
            ? t.elderWaterSafeCaution
            : t.elderWaterSafeYes}
        </h3>

        <p className="text-sm sm:text-base font-bold opacity-90 mt-2.5 max-w-2xl mx-auto leading-relaxed">
          {isDanger
            ? t.elderAdviceDanger
            : isCaution
            ? t.elderAdviceCaution
            : t.elderAdviceYes}
        </p>
      </div>

      {/* 2. Four Golden Simple Rules */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg">🛡️</span>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
            {t.elderSub}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-stretch">
          {/* Rule 1: Boil Water */}
          <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 shadow-xs flex items-start space-x-3.5 h-full">
            <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl font-black shrink-0 shadow-sm">
              🫖
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                {t.elderAction1Title}
              </h4>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-700 mt-0.5 leading-relaxed">
                {t.elderAction1Desc}
              </p>
            </div>
          </div>

          {/* Rule 2: ORS Solution */}
          <div className="p-4 rounded-2xl bg-cyan-50/90 border border-cyan-200 shadow-xs flex items-start space-x-3.5 h-full">
            <div className="w-11 h-11 rounded-2xl bg-cyan-600 text-white flex items-center justify-center text-xl font-black shrink-0 shadow-sm">
              🧂
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                {t.elderAction2Title}
              </h4>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-700 mt-0.5 leading-relaxed">
                {t.elderAction2Desc}
              </p>
            </div>
          </div>

          {/* Rule 3: 1-Click Report */}
          <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200 shadow-xs flex items-start space-x-3.5 h-full">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl font-black shrink-0 shadow-sm">
              📢
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                {t.elderAction3Title}
              </h4>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-700 mt-0.5 leading-relaxed">
                {t.elderAction3Desc}
              </p>
            </div>
          </div>

          {/* Rule 4: Helpline */}
          <div className="p-4 rounded-2xl bg-blue-50/90 border border-blue-200 shadow-xs flex items-start space-x-3.5 h-full">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl font-black shrink-0 shadow-sm">
              📞
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                {t.elderAction4Title}
              </h4>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-700 mt-0.5 leading-relaxed">
                {t.elderAction4Desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. One-Touch Problem Reporter */}
      <div className="bg-slate-50 p-5 sm:p-6 rounded-3xl border border-slate-200/90 space-y-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-[11px] font-extrabold mb-1">
            <HeartPulse className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span>{t.reportTitle}</span>
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-['Outfit',sans-serif]">
            {t.issueType}
          </h3>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">
            {t.reportSub}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-stretch">
          {/* Button 1 */}
          <button
            onClick={() => handleQuickReport("vomit_diarrhea")}
            className={`p-4 rounded-2xl border-2 text-left flex items-center space-x-3.5 transition cursor-pointer shadow-xs hover:scale-[1.01] h-full ${
              oneClickStatus === "vomit_diarrhea"
                ? "bg-emerald-100 border-emerald-500 text-emerald-900"
                : "bg-white border-rose-200 hover:border-rose-400 text-slate-900"
            }`}
          >
            <span className="text-3xl shrink-0">🤢</span>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-extrabold font-['Outfit',sans-serif] truncate">
                {t.vomitingDiarrhea}
              </div>
              <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
                {t.elderAction2Title}
              </div>
            </div>
          </button>

          {/* Button 2 */}
          <button
            onClick={() => handleQuickReport("dirty_water")}
            className={`p-4 rounded-2xl border-2 text-left flex items-center space-x-3.5 transition cursor-pointer shadow-xs hover:scale-[1.01] h-full ${
              oneClickStatus === "dirty_water"
                ? "bg-emerald-100 border-emerald-500 text-emerald-900"
                : "bg-white border-amber-200 hover:border-amber-400 text-slate-900"
            }`}
          >
            <span className="text-3xl shrink-0">💧</span>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-extrabold font-['Outfit',sans-serif] truncate">
                {t.dirtyWater}
              </div>
              <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
                {t.brokenPipe}
              </div>
            </div>
          </button>

          {/* Button 3 */}
          <button
            onClick={() => handleQuickReport("child_sick")}
            className={`p-4 rounded-2xl border-2 text-left flex items-center space-x-3.5 transition cursor-pointer shadow-xs hover:scale-[1.01] h-full ${
              oneClickStatus === "child_sick"
                ? "bg-emerald-100 border-emerald-500 text-emerald-900"
                : "bg-white border-indigo-200 hover:border-indigo-400 text-slate-900"
            }`}
          >
            <span className="text-3xl shrink-0">👶</span>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-extrabold font-['Outfit',sans-serif] truncate">
                {t.feverWeakness}
              </div>
              <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
                {t.helplineCallBtn}
              </div>
            </div>
          </button>
        </div>

        {oneClickStatus && (
          <div className="p-3.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 font-extrabold text-xs sm:text-sm flex items-center space-x-2 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>{t.reportSuccessMsg}</span>
          </div>
        )}
      </div>

      {/* 4. Emergency Helpline Call Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Helpline 104 */}
        <a
          href="tel:104"
          className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex items-center justify-between shadow-md hover:scale-[1.01] transition cursor-pointer"
        >
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
              <PhoneCall className="w-6 h-6 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold text-blue-200 uppercase tracking-wide truncate">
                {t.helplineText}
              </div>
              <div className="text-2xl font-black font-['Outfit',sans-serif] leading-tight">
                104
              </div>
              <div className="text-xs text-blue-100 font-medium truncate">
                {t.helplineNumber}
              </div>
            </div>
          </div>
          <div className="text-xs font-black bg-white text-blue-900 px-3.5 py-2 rounded-xl shadow-xs shrink-0 whitespace-nowrap ml-2">
            {t.helplineCallBtn}
          </div>
        </a>

        {/* Ambulance 108 */}
        <a
          href="tel:108"
          className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 text-white flex items-center justify-between shadow-md hover:scale-[1.01] transition cursor-pointer"
        >
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold text-red-200 uppercase tracking-wide truncate">
                Emergency Ambulance
              </div>
              <div className="text-2xl font-black font-['Outfit',sans-serif] leading-tight">
                108
              </div>
              <div className="text-xs text-red-100 font-medium truncate">
                24x7 Emergency Medical Support
              </div>
            </div>
          </div>
          <div className="text-xs font-black bg-white text-red-900 px-3.5 py-2 rounded-xl shadow-xs shrink-0 whitespace-nowrap ml-2">
            {t.helplineCallBtn}
          </div>
        </a>
      </div>
    </div>
  );
};
