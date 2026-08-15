export type Page =
  | "landing"
  | "dashboard"
  | "map"
  | "report"
  | "water"
  | "early-warning"
  | "simulator"
  | "awareness"
  | "aquaguide"
  | "alerts"
  | "health-worker"
  | "admin"
  | "about";

export type Role = "community" | "health_worker" | "admin";

export type Language = "en" | "ta" | "hi" | "bn";

export type RiskLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

export interface HourlyDataPoint {
  hour: string; // e.g. "12:00", "13:00", "14:00"
  timestamp: string;
  temperature: number; // °C
  rainfallMm: number; // mm/hr
  humidity: number; // %
  turbidity: number; // NTU
  ph: number;
  tds: number; // ppm
  coliformCount: number; // CFU/100ml
  riskScore: number; // 0-100
}

export interface WeatherCondition {
  temperature: number; // °C
  feelsLike: number; // °C
  condition: string; // e.g. "Heavy Monsoon Rain & River Runoff", "Scattered Thunderstorms", "Partly Cloudy", "Humid Heat"
  icon: "rain" | "storm" | "cloud" | "sun" | "drizzle" | "wind";
  humidity: number; // %
  rainfallMm1h: number; // mm in past hour
  rainfallMm24h: number; // mm in past 24 hours
  windSpeedKmH: number; // km/h
  aqi: number; // Air Quality Index
  uvIndex: number;
  lastHourUpdated: string;
}

export interface WaterIndicators {
  ph: number;
  turbidity: number; // in NTU (safe <= 1 to 5 NTU)
  tds: number; // in ppm (safe <= 300 to 500 ppm)
  temperature: number; // in °C
  dissolvedOxygen: number; // in mg/L
  coliformCount: number; // in CFU/100ml (0 is safe)
  residualChlorine: number; // in mg/L (0.2 - 0.5 safe)
  lastSampleTime: string;
}

export interface Community {
  id: string;
  name: string;
  subDivision: string;
  district: string;
  state: string;
  zone: "Coastal Delta" | "Kongu Nadu" | "Northern Plains" | "Southern Corridors" | "Western Ghats";
  type: "city" | "town" | "village" | "coastal_hamlet" | "hill_station";
  lat: number;
  lng: number;
  population: number;
  riskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  waterRisk: number; // 0 - 100
  symptomRisk: number; // 0 - 100
  envRisk: number; // 0 - 100
  trend: "rising" | "stable" | "declining";
  trendPercentage: number;
  lastUpdated: string;
  waterIndicators: WaterIndicators;
  weather: WeatherCondition;
  hourlyHistory: HourlyDataPoint[];
  baselineWeeklyReports: number;
  currentWeeklyReports: number;
  activeAlertsCount: number;
  recentReportsCount: number;
  waterSourceType: string;
  floodVulnerability: "High" | "Medium" | "Low";
  primaryPHC?: string;
  majorRiverBasin?: string;
  panchayatOrWard?: string;
  villageHeadOrOfficer?: string;
}

export interface HealthReport {
  id: string;
  timestamp: string;
  communityId: string;
  communityName: string;
  symptoms: string[];
  symptomSeverity: "Mild" | "Moderate" | "Severe";
  durationDays: number;
  affectedCount: number;
  waterProblems: string[];
  locationDetails: string;
  description?: string;
  photoUrl?: string;
  isAnonymous: boolean;
  reporterContact?: string;
  status: "pending" | "verified" | "escalated" | "rejected";
  triageRisk: RiskLevel;
  verifiedBy?: string;
  verifiedAt?: string;
  notes?: string;
}

export interface AlertItem {
  id: string;
  timestamp: string;
  communityId: string;
  communityName: string;
  district: string;
  severity: "INFORMATION" | "ADVISORY" | "WARNING" | "CRITICAL";
  title: string;
  message: string;
  signals: string[];
  recommendedAction: string;
  isRead: boolean;
  isAcknowledged: boolean;
  issuedBy: string;
}

export type Alert = AlertItem;

export interface EarlyWarningAnalysisResult {
  communityName: string;
  riskLevel: RiskLevel;
  riskScore: number;
  confidenceScore: number;
  summary: string;
  keyDrivers: string[];
  preventiveActions: string[];
  signals: {
    waterRisk: number;
    symptomRisk: number;
    envRisk: number;
    overallRisk: number;
  };
  anomalyIncreasePercentage: number;
  baselineComparison: {
    normalWeekly: number;
    currentWeekly: number;
  };
  disclaimer: string;
  analyzedAt: string;
}

export interface AwarenessTopic {
  id: string;
  title: string;
  category: "Water Safety" | "Hygiene" | "Disease Prevention" | "Flood Safety" | "Emergency Care";
  iconName: string;
  summary: string;
  readTime: string;
  keyPoints: string[];
  actionSteps: { step: string; detail: string }[];
  warningSigns?: string[];
  mythVsFact?: { myth: string; fact: string }[];
}

export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type DemoScenario = "normal" | "contamination" | "cluster" | "outbreak";
