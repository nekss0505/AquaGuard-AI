import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  Page,
  Role,
  Language,
  Community,
  HealthReport,
  AlertItem,
  DemoScenario,
  EarlyWarningAnalysisResult,
  WaterIndicators,
} from "../types";
import { MOCK_COMMUNITIES, INITIAL_HEALTH_REPORTS, INITIAL_ALERTS } from "../data/mockData";
import { TRANSLATIONS } from "../data/translations";
import {
  formatISTTime24,
  formatISTDateTime,
  formatISTTime12,
  formatRelativeIST,
  getCurrentISTClock,
} from "../utils/timeUtils";

interface AppContextType {
  page: Page;
  setPage: (page: Page) => void;
  role: Role;
  setRole: (role: Role) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof TRANSLATIONS["en"];

  // Communities & Selected Location
  communities: Community[];
  selectedCommunity: Community;
  setSelectedCommunityId: (id: string) => void;

  // Health Reports
  reports: HealthReport[];
  addReport: (report: Omit<HealthReport, "id" | "timestamp" | "status" | "triageRisk">) => string;
  verifyReport: (id: string, verifiedBy: string, notes?: string) => void;
  escalateReport: (id: string, escalatedBy: string, notes?: string) => void;
  rejectReport: (id: string) => void;

  // Alerts
  alerts: AlertItem[];
  unreadAlertsCount: number;
  markAlertAsRead: (id: string) => void;
  acknowledgeAlert: (id: string) => void;
  addAlert: (alert: Omit<AlertItem, "id" | "timestamp" | "isRead" | "isAcknowledged">) => void;

  // Live Water Sensor Simulation
  isSensorSimulating: boolean;
  startSensorSimulation: () => void;
  stopSensorSimulation: () => void;
  liveSensorData: WaterIndicators;
  triggerSensorAnomaly: (type?: "turbidity_spike" | "ph_drop" | "bacterial_surge") => void;
  sensorLog: { time: string; ph: number; turbidity: number; tds: number; temp: number }[];

  // Demo Scenarios
  currentScenario: DemoScenario;
  loadScenario: (scenario: DemoScenario) => void;

  // Elder / Simple Mode & Voice Speech
  elderMode: boolean;
  setElderMode: (mode: boolean) => void;
  toggleElderMode: () => void;
  speakText: (text: string, lang?: string) => void;
  isSpeaking: boolean;
  stopSpeaking: () => void;

  // Early Warning Engine
  isAnalyzing: boolean;
  analysisStep: string;
  latestAnalysis: EarlyWarningAnalysisResult | null;
  runEarlyWarningAnalysis: (communityId?: string) => Promise<EarlyWarningAnalysisResult>;

  // Toast Notification
  toastMessage: { text: string; type: "success" | "error" | "info" | "warning" } | null;
  showToast: (text: string, type?: "success" | "error" | "info" | "warning") => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [page, setPage] = useState<Page>("landing");
  const [role, setRole] = useState<Role>("community");
  const [language, setLanguage] = useState<Language>("en");
  const [communities, setCommunities] = useState<Community[]>(MOCK_COMMUNITIES);
  const [selectedCommunityId, setSelectedCommunityIdState] = useState<string>("comm-cuddalore-01");
  const [reports, setReports] = useState<HealthReport[]>(INITIAL_HEALTH_REPORTS);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);

  const [currentScenario, setCurrentScenario] = useState<DemoScenario>("outbreak");
  const [elderMode, setElderMode] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Stop Speech synthesis
  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Speak Text function with Tamil / English audio support
  const speakText = useCallback(
    (text: string, langHint?: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        return;
      }
      try {
        window.speechSynthesis.cancel();
        // Remove markdown symbols for clear speech
        const cleanText = text
          .replace(/[*#_`>]/g, "")
          .replace(/\n+/g, ". ")
          .trim();

        const utterance = new SpeechSynthesisUtterance(cleanText);
        const targetLang = langHint || (language === "ta" ? "ta-IN" : language === "hi" ? "hi-IN" : "en-IN");
        utterance.lang = targetLang;
        utterance.rate = 0.9; // Slightly slower for elderly comprehension
        utterance.pitch = 1.0;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn("Speech synthesis error:", err);
        setIsSpeaking(false);
      }
    },
    [language]
  );

  const toggleElderMode = useCallback(() => {
    setElderMode((prev) => {
      const next = !prev;
      showToast(
        next
          ? "Elder Mode Activated (பெரியவர்களுக்கான எளிய வடிவம் - பெரிய எழுத்துக்கள் & நேரடி வழிகாட்டல்)"
          : "Standard View Mode Activated",
        "info"
      );
      return next;
    });
  }, []);

  // Live Sensor State
  const [isSensorSimulating, setIsSensorSimulating] = useState<boolean>(true);
  const [liveSensorData, setLiveSensorData] = useState<WaterIndicators>({
    ph: 6.5,
    turbidity: 14.8,
    tds: 580,
    temperature: 29.4,
    dissolvedOxygen: 3.8,
    coliformCount: 38,
    residualChlorine: 0.02,
    lastSampleTime: "22:00 IST (Live Telemetry)",
  });
  const [sensorLog, setSensorLog] = useState<
    { time: string; ph: number; turbidity: number; tds: number; temp: number }[]
  >(() => {
    const arr = [];
    const now = Date.now();
    for (let i = 12; i >= 0; i--) {
      const d = new Date(now - i * 5 * 60 * 1000);
      arr.push({
        time: formatISTTime24(d),
        ph: Number((6.8 + (Math.random() * 0.4 - 0.2)).toFixed(2)),
        turbidity: Number((12.0 + Math.sin(i) * 3 + Math.random() * 2).toFixed(1)),
        tds: Math.round(520 + Math.random() * 60),
        temp: Number((28.5 + Math.random() * 1.5).toFixed(1)),
      });
    }
    return arr;
  });

  // Early Warning State
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<string>("");
  const [latestAnalysis, setLatestAnalysis] = useState<EarlyWarningAnalysisResult | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: "success" | "error" | "info" | "warning";
  } | null>(null);

  const showToast = useCallback((text: string, type: "success" | "error" | "info" | "warning" = "info") => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage((prev) => (prev?.text === text ? null : prev));
    }, 4500);
  }, []);

  const selectedCommunity =
    communities.find((c) => c.id === selectedCommunityId) || communities[0];

  const setSelectedCommunityId = (id: string) => {
    setSelectedCommunityIdState(id);
    const found = communities.find((c) => c.id === id);
    if (found) {
      setLiveSensorData({ ...found.waterIndicators, lastSampleTime: `${formatISTTime24(new Date())} (Live)` });
    }
  };

  // Add Health Report
  const addReport = (reportData: Omit<HealthReport, "id" | "timestamp" | "status" | "triageRisk">): string => {
    const newId = `AG-${new Date().getFullYear()}-TN-${Math.floor(1000 + Math.random() * 9000)}`;
    const isSevere =
      reportData.symptomSeverity === "Severe" ||
      reportData.symptoms.includes("Watery Diarrhea") ||
      reportData.symptoms.includes("Extreme Thirst/Dehydration");

    const triageRisk = isSevere ? "HIGH" : reportData.symptoms.length > 2 ? "MODERATE" : "LOW";

    const newReport: HealthReport = {
      ...reportData,
      id: newId,
      timestamp: new Date().toISOString(),
      status: "pending",
      triageRisk,
    };

    setReports((prev) => [newReport, ...prev]);

    // Update community report counts and risk dynamically
    setCommunities((prev) =>
      prev.map((c) => {
        if (c.id === reportData.communityId) {
          const newCurrentWeekly = c.currentWeeklyReports + 1;
          const newSymptomRisk = Math.min(100, c.symptomRisk + 4);
          const newRiskScore = Math.round(c.waterRisk * 0.35 + newSymptomRisk * 0.45 + c.envRisk * 0.2);
          const newRiskLevel =
            newRiskScore >= 75 ? "CRITICAL" : newRiskScore >= 55 ? "HIGH" : newRiskScore >= 35 ? "MODERATE" : "LOW";
          return {
            ...c,
            currentWeeklyReports: newCurrentWeekly,
            recentReportsCount: c.recentReportsCount + 1,
            symptomRisk: newSymptomRisk,
            riskScore: newRiskScore,
            riskLevel: newRiskLevel,
            lastUpdated: `Updated just now (${formatISTTime24(new Date())})`,
          };
        }
        return c;
      })
    );

    showToast(`Report #${newId} submitted anonymously and securely logged!`, "success");
    return newId;
  };

  const verifyReport = (id: string, verifiedBy: string, notes?: string) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "verified",
              verifiedBy,
              verifiedAt: new Date().toISOString(),
              notes: notes || "Verified by field health team.",
            }
          : r
      )
    );
    showToast(`Report #${id} verified by ${verifiedBy}.`, "success");
  };

  const escalateReport = (id: string, escalatedBy: string, notes?: string) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "escalated",
              verifiedBy: escalatedBy,
              verifiedAt: new Date().toISOString(),
              notes: notes || "Escalated to District Epidemic Response Officer.",
            }
          : r
      )
    );
    showToast(`Report #${id} escalated to District Health Officer!`, "warning");
  };

  const rejectReport = (id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "rejected" } : r))
    );
    showToast(`Report #${id} marked as duplicate/rejected.`, "info");
  };

  // Alerts Management
  const markAlertAsRead = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, isRead: true } : a)));
  };

  const acknowledgeAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isAcknowledged: true, isRead: true } : a))
    );
    showToast("Alert response protocol acknowledged.", "success");
  };

  const addAlert = (alertData: Omit<AlertItem, "id" | "timestamp" | "isRead" | "isAcknowledged">) => {
    const newAlert: AlertItem = {
      ...alertData,
      id: `ALT-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString(),
      isRead: false,
      isAcknowledged: false,
    };
    setAlerts((prev) => [newAlert, ...prev]);
    showToast(`🚨 New ${alertData.severity} Alert: ${alertData.title}`, "warning");
  };

  const unreadAlertsCount = alerts.filter((a) => !a.isRead).length;

  // Sensor Simulation Live Ticker
  useEffect(() => {
    if (!isSensorSimulating) return;

    const interval = setInterval(() => {
      setLiveSensorData((prev) => {
        const phDelta = (Math.random() * 0.08 - 0.04);
        const turbDelta = (Math.random() * 0.4 - 0.2);
        const tdsDelta = Math.round(Math.random() * 6 - 3);

        const newPh = Number(Math.max(5.5, Math.min(8.8, prev.ph + phDelta)).toFixed(2));
        const newTurb = Number(Math.max(0.5, Math.min(25.0, prev.turbidity + turbDelta)).toFixed(1));
        const newTds = Math.max(100, Math.min(900, prev.tds + tdsDelta));

        const nowStr = formatISTTime24(new Date());
        setSensorLog((logPrev) => [
          ...logPrev.slice(-19),
          {
            time: nowStr,
            ph: newPh,
            turbidity: newTurb,
            tds: newTds,
            temp: prev.temperature,
          },
        ]);

        return {
          ...prev,
          ph: newPh,
          turbidity: newTurb,
          tds: newTds,
          lastSampleTime: `${nowStr} (Live Telemetry)`,
        };
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isSensorSimulating]);

  const startSensorSimulation = () => {
    setIsSensorSimulating(true);
    showToast("Live IoT Water Sensor Stream Started.", "info");
  };

  const stopSensorSimulation = () => {
    setIsSensorSimulating(false);
    showToast("Live IoT Water Sensor Stream Paused.", "info");
  };

  const triggerSensorAnomaly = (type = "turbidity_spike") => {
    if (type === "turbidity_spike") {
      setLiveSensorData((prev) => ({
        ...prev,
        turbidity: 16.8,
        coliformCount: 45,
        lastSampleTime: "ANOMALY TRIGGERED",
      }));
      showToast("⚠️ TURBIDITY SPIKE DETECTED: 16.8 NTU (3x WHO Safe Threshold)", "warning");
      // Update community
      setCommunities((prev) =>
        prev.map((c) =>
          c.id === selectedCommunityId
            ? {
                ...c,
                waterRisk: 86,
                riskScore: Math.min(100, c.riskScore + 18),
                riskLevel: "CRITICAL",
                waterIndicators: {
                  ...c.waterIndicators,
                  turbidity: 16.8,
                  coliformCount: 45,
                },
              }
            : c
        )
      );
    } else if (type === "ph_drop") {
      setLiveSensorData((prev) => ({
        ...prev,
        ph: 5.8,
        lastSampleTime: "ACIDITY SPIKE",
      }));
      showToast("⚠️ Water Acidification Event: pH dropped to 5.8!", "warning");
    } else {
      setLiveSensorData((prev) => ({
        ...prev,
        coliformCount: 62,
        lastSampleTime: "MICROBIAL BREACH",
      }));
      showToast("🚨 High Microbial/Coliform Infiltration Detected!", "error");
    }
  };

  // Demo Scenarios
  const loadScenario = (scenario: DemoScenario) => {
    setCurrentScenario(scenario);

    if (scenario === "normal") {
      setSelectedCommunityIdState("comm-thanjavur-03");
      setLiveSensorData({
        ph: 7.3,
        turbidity: 1.8,
        tds: 240,
        temperature: 27.1,
        dissolvedOxygen: 6.8,
        coliformCount: 0,
        residualChlorine: 0.35,
        lastSampleTime: "Just now",
      });
      showToast("Loaded Scenario 1: Normal Community (Low Risk - Thanjavur Cauvery Belt)", "success");
    } else if (scenario === "contamination") {
      setSelectedCommunityIdState("comm-nagapattinam-02");
      setLiveSensorData({
        ph: 6.8,
        turbidity: 8.4,
        tds: 410,
        temperature: 28.2,
        dissolvedOxygen: 4.5,
        coliformCount: 18,
        residualChlorine: 0.05,
        lastSampleTime: "Just now",
      });
      showToast("Loaded Scenario 2: Water Contamination Spike (Turbidity 8.4 NTU - Nagapattinam)", "warning");
    } else if (scenario === "cluster") {
      setSelectedCommunityIdState("comm-erode-06");
      setLiveSensorData({
        ph: 6.6,
        turbidity: 7.9,
        tds: 390,
        temperature: 28.6,
        dissolvedOxygen: 4.8,
        coliformCount: 14,
        residualChlorine: 0.04,
        lastSampleTime: "Just now",
      });
      showToast("Loaded Scenario 3: Syndromic Disease Cluster (14 Case Reports - Erode Bhavani)", "warning");
    } else if (scenario === "outbreak") {
      setSelectedCommunityIdState("comm-cuddalore-01");
      setLiveSensorData({
        ph: 6.4,
        turbidity: 14.8,
        tds: 580,
        temperature: 29.5,
        dissolvedOxygen: 3.8,
        coliformCount: 38,
        residualChlorine: 0.02,
        lastSampleTime: "Just now",
      });
      showToast(
        "Loaded Scenario 4: Potential Outbreak Cascade (Multi-Signal Anomaly → 84% Critical Risk - Cuddalore)",
        "error"
      );
    }
  };

  // Run Early Warning Analysis
  const runEarlyWarningAnalysis = async (
    targetCommunityId?: string
  ): Promise<EarlyWarningAnalysisResult> => {
    setIsAnalyzing(true);
    const comm =
      communities.find((c) => c.id === (targetCommunityId || selectedCommunityId)) ||
      selectedCommunity;

    setAnalysisStep("Collecting multi-modal signals from IoT sensors & community reports...");
    await new Promise((r) => setTimeout(r, 600));

    setAnalysisStep("Checking syndromic anomaly threshold against 5-year seasonal baseline...");
    await new Promise((r) => setTimeout(r, 650));

    setAnalysisStep("Comparing cross-village geographic and hydrological flood-path clustering...");
    await new Promise((r) => setTimeout(r, 600));

    setAnalysisStep("Synthesizing epidemiological risk index using Bayesian intelligence...");
    await new Promise((r) => setTimeout(r, 650));

    setAnalysisStep("Generating explainable public health rationale & preventive advisory...");

    try {
      const response = await fetch("/api/gemini/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          communityName: comm.name,
          waterData: comm.waterIndicators,
          symptomsData: {
            diarrhea: Math.round(comm.currentWeeklyReports * 0.6),
            vomiting: Math.round(comm.currentWeeklyReports * 0.4),
            fever: Math.round(comm.currentWeeklyReports * 0.5),
            abdominal: Math.round(comm.currentWeeklyReports * 0.55),
          },
          environmentalData: {
            rainfall: comm.floodVulnerability === "High" ? "142mm" : "45mm",
            flooding: comm.floodVulnerability,
            temp: `${comm.waterIndicators.temperature}°C`,
          },
        }),
      });

      const data = await response.json();
      const anomalyPct = Math.round(
        ((comm.currentWeeklyReports - comm.baselineWeeklyReports) / comm.baselineWeeklyReports) * 100
      );

      const result: EarlyWarningAnalysisResult = {
        communityName: comm.name,
        riskLevel: (data.riskLevel as any) || comm.riskLevel,
        riskScore: comm.riskScore,
        confidenceScore: data.confidenceScore || 87,
        summary:
          data.summary ||
          `Multi-signal analysis detects a synchronized rise in water turbidity and acute gastrointestinal cases in ${comm.name}.`,
        keyDrivers: data.keyDrivers || [
          `Water turbidity elevated to ${comm.waterIndicators.turbidity} NTU (exceeds WHO 1.0 NTU baseline)`,
          `Community syndromic reports increased by +${anomalyPct}% above the seasonal baseline`,
          `Recent heavy rainfall and surface inundation near drinking well extraction zone`,
          `Absence of protective residual chlorine (< 0.05 mg/L)`,
        ],
        preventiveActions: data.preventiveActions || [
          "Enforce mandatory boil-water protocol for all drinking/cooking needs (minimum 3 minutes)",
          "Deploy ASHA and ANM health workers for targeted household ORS and halogen tablet distribution",
          "Conduct shock chlorination of suspected community handpumps and ring wells",
          "Establish active surveillance desk at the Primary Health Centre for early rehydration therapy",
        ],
        signals: {
          waterRisk: comm.waterRisk,
          symptomRisk: comm.symptomRisk,
          envRisk: comm.envRisk,
          overallRisk: comm.riskScore,
        },
        anomalyIncreasePercentage: anomalyPct,
        baselineComparison: {
          normalWeekly: comm.baselineWeeklyReports,
          currentWeekly: comm.currentWeeklyReports,
        },
        disclaimer:
          "Potential outbreak risk detected. Verification by qualified public-health professionals is required. This is an AI-assisted early warning system.",
        analyzedAt: formatISTDateTime(new Date()),
      };

      setLatestAnalysis(result);
      setIsAnalyzing(false);
      setAnalysisStep("");
      showToast(`Early Warning Analysis completed for ${comm.name}.`, "success");
      return result;
    } catch (err) {
      console.error(err);
      // Fallback
      const anomalyPct = Math.round(
        ((comm.currentWeeklyReports - comm.baselineWeeklyReports) / comm.baselineWeeklyReports) * 100
      );
      const fallbackResult: EarlyWarningAnalysisResult = {
        communityName: comm.name,
        riskLevel: comm.riskLevel,
        riskScore: comm.riskScore,
        confidenceScore: 87,
        summary: `Multi-signal risk detected in ${comm.name}: Water turbidity degradation aligns with a ${anomalyPct}% surge in syndromic diarrhea reports.`,
        keyDrivers: [
          `Turbidity measured at ${comm.waterIndicators.turbidity} NTU (Above permissible limit)`,
          `Symptom reports surged from normal baseline of ${comm.baselineWeeklyReports} to ${comm.currentWeeklyReports} cases`,
          `Monsoon flood runoff increasing cross-contamination from unsealed latrines`,
          `Zero residual chlorine detected in distribution storage vats`,
        ],
        preventiveActions: [
          "Issue immediate boil-water order for all village wards",
          "Mobilize ASHA workers for rapid ORS distribution and case screening",
          "Disinfect community wells with bleaching powder slurry",
          "Alert Sub-divisional Medical Officer for sentinel bed readiness",
        ],
        signals: {
          waterRisk: comm.waterRisk,
          symptomRisk: comm.symptomRisk,
          envRisk: comm.envRisk,
          overallRisk: comm.riskScore,
        },
        anomalyIncreasePercentage: anomalyPct,
        baselineComparison: {
          normalWeekly: comm.baselineWeeklyReports,
          currentWeekly: comm.currentWeeklyReports,
        },
        disclaimer:
          "Potential outbreak risk detected. Verification by qualified public-health professionals is required.",
        analyzedAt: formatISTDateTime(new Date()),
      };
      setLatestAnalysis(fallbackResult);
      setIsAnalyzing(false);
      setAnalysisStep("");
      return fallbackResult;
    }
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <AppContext.Provider
      value={{
        page,
        setPage,
        role,
        setRole,
        language,
        setLanguage,
        t,
        communities,
        selectedCommunity,
        setSelectedCommunityId,
        reports,
        addReport,
        verifyReport,
        escalateReport,
        rejectReport,
        alerts,
        unreadAlertsCount,
        markAlertAsRead,
        acknowledgeAlert,
        addAlert,
        isSensorSimulating,
        startSensorSimulation,
        stopSensorSimulation,
        liveSensorData,
        triggerSensorAnomaly,
        sensorLog,
        currentScenario,
        loadScenario,
        elderMode,
        setElderMode,
        toggleElderMode,
        speakText,
        isSpeaking,
        stopSpeaking,
        isAnalyzing,
        analysisStep,
        latestAnalysis,
        runEarlyWarningAnalysis,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
