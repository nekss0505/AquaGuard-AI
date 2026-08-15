import { Language } from "../types";

export interface TranslationStrings {
  appName: string;
  tagline: string;
  heroSub: string;
  checkRisk: string;
  reportConcern: string;
  awarenessCenter: string;
  
  // Navigation
  navDashboard: string;
  navMap: string;
  navWater: string;
  navEarlyWarning: string;
  navSimulator: string;
  navAwareness: string;
  navAquaGuide: string;
  navAlerts: string;
  navHealthWorker: string;
  navAdmin: string;
  navAbout: string;
  moreTools: string;
  specialistTools: string;
  mainNav: string;

  // Language & UI
  languageLabel: string;
  elderModeOn: string;
  elderModeOff: string;
  elderModeBtn: string;
  elderModeTooltip: string;
  listenInVoice: string;
  stopVoice: string;
  waterSentinel: string;

  // Status & Risk
  simulatedDemoData: string;
  currentRisk: string;
  waterRisk: string;
  symptomRisk: string;
  environmentalRisk: string;
  overallRisk: string;
  analyzeRisk: string;
  whyRiskDetected: string;
  riskConfidence: string;
  disclaimerText: string;
  simulateSensor: string;
  startSimulation: string;
  stopSimulation: string;
  demoMode: string;
  loadScenario: string;
  safeStatus: string;
  cautionStatus: string;
  dangerStatus: string;
  safeStatusDesc: string;
  cautionStatusDesc: string;
  dangerStatusDesc: string;

  // Elder Safety View
  elderTitle: string;
  elderSub: string;
  elderWaterSafeQ: string;
  elderWaterSafeYes: string;
  elderWaterSafeCaution: string;
  elderWaterSafeDanger: string;
  elderAdviceYes: string;
  elderAdviceCaution: string;
  elderAdviceDanger: string;
  elderAction1Title: string;
  elderAction1Desc: string;
  elderAction2Title: string;
  elderAction2Desc: string;
  elderAction3Title: string;
  elderAction3Desc: string;
  elderAction4Title: string;
  elderAction4Desc: string;
  helplineCallBtn: string;
  helplineNumber: string;
  helplineText: string;
  tapToListen: string;

  // Report Concern
  reportTitle: string;
  reportSub: string;
  issueType: string;
  dirtyWater: string;
  vomitingDiarrhea: string;
  feverWeakness: string;
  brokenPipe: string;
  selectVillage: string;
  descriptionLabel: string;
  descriptionPlaceholder: string;
  contactLabel: string;
  contactPlaceholder: string;
  submitReportBtn: string;
  submitting: string;
  reportSuccessMsg: string;

  // AquaGuide AI
  aiTitle: string;
  aiSub: string;
  voiceSupported: string;
  aiDisclaimer: string;
  suggestedQuestions: string;
  inputPlaceholder: string;
  sendBtn: string;
  aiThinking: string;
  listenAloud: string;

  // Alerts
  alertsTitle: string;
  alertsSub: string;
  filterAll: string;
  filterUnread: string;
  filterHigh: string;
  markAsRead: string;
  acknowledgeBtn: string;
  acknowledged: string;
  noAlerts: string;

  // Water Quality
  waterQualityTitle: string;
  waterQualitySub: string;
  turbidityLabel: string;
  phLabel: string;
  tdsLabel: string;
  chlorineLabel: string;
  coliformLabel: string;
  safeLimit: string;
  liveReading: string;
  triggerSpike: string;

  // Health Worker
  healthWorkerTitle: string;
  healthWorkerSub: string;
  pendingReports: string;
  verifiedCases: string;
  highRiskClusters: string;
  verifyBtn: string;
  escalateBtn: string;
  verifiedBadge: string;
  escalatedBadge: string;

  // Admin
  adminTitle: string;
  adminSub: string;
  totalSources: string;
  totalReports: string;
  activeOutbreaks: string;
  downloadReportBtn: string;

  // Map
  mapTitle: string;
  mapSub: string;
  mapFilterAll: string;
  mapFilterBorewell: string;
  mapFilterCanal: string;
  mapFilterTank: string;
  selectedSource: string;
  sourceStatus: string;
  nearbyCases: string;

  // Simulation Scenarios
  scenarioSafe: string;
  scenarioCaution: string;
  scenarioCluster: string;
  scenarioOutbreak: string;
  scenarioSafeDesc: string;
  scenarioCautionDesc: string;
  scenarioClusterDesc: string;
  scenarioOutbreakDesc: string;
}

export const TRANSLATIONS: Record<Language, TranslationStrings> = {
  en: {
    appName: "AquaGuard",
    tagline: "Detect Early. Warn Early. Prevent Outbreaks.",
    heroSub: "An AI-powered community health intelligence platform that combines water-quality signals, community health reports and environmental data to identify potential water-borne disease risks before they become larger public-health emergencies.",
    checkRisk: "Check Community Risk",
    reportConcern: "Report a Health Concern",
    awarenessCenter: "Explore Awareness Center",
    
    navDashboard: "Home / Status",
    navMap: "Safe Water Map",
    navWater: "Water Telemetry",
    navEarlyWarning: "AI Early Warning",
    navSimulator: "Outbreak Simulator",
    navAwareness: "Health Awareness",
    navAquaGuide: "AquaGuide AI",
    navAlerts: "Alerts & Warnings",
    navHealthWorker: "Health Worker Triage",
    navAdmin: "District Analytics",
    navAbout: "About AquaGuard",
    moreTools: "More Tools",
    specialistTools: "Specialist Tools",
    mainNav: "Main Navigation",

    languageLabel: "Language",
    elderModeOn: "Simple Mode: ON",
    elderModeOff: "Simple Mode: OFF",
    elderModeBtn: "Simple View",
    elderModeTooltip: "Toggle Simple / Audio Mode",
    listenInVoice: "Listen in Voice",
    stopVoice: "Stop Audio",
    waterSentinel: "Village Water Sentinel",

    simulatedDemoData: "SIMULATED DEMO DATA",
    currentRisk: "Current Community Health Risk",
    waterRisk: "Water Quality Risk",
    symptomRisk: "Syndromic Symptom Risk",
    environmentalRisk: "Environmental & Flood Risk",
    overallRisk: "Overall Outbreak Risk Score",
    analyzeRisk: "Analyze Early Warning Risk",
    whyRiskDetected: "Why was this risk detected?",
    riskConfidence: "AI Model Confidence",
    disclaimerText: "Potential outbreak risk detected. Verification by qualified public-health professionals is required. This system provides early warning decision support.",
    simulateSensor: "Simulate Water Sensor",
    startSimulation: "Start Live Simulation",
    stopSimulation: "Stop Simulation",
    demoMode: "SIMULATION MODE",
    loadScenario: "Load Scenario",
    safeStatus: "Safe Baseline",
    cautionStatus: "Moderate Caution",
    dangerStatus: "Critical Hazard",
    safeStatusDesc: "Water sources are tested safe. Normal community health status.",
    cautionStatusDesc: "Turbidity or bacterial elevation detected. Boil water for 3+ minutes.",
    dangerStatusDesc: "Severe contamination and illness cluster! Do not drink unboiled water.",

    elderTitle: "Village Water & Health Safety",
    elderSub: "Easy-to-understand status and voice-guided rules for elders and families",
    elderWaterSafeQ: "Is your tap / well water safe to drink right now?",
    elderWaterSafeYes: "YES - Safe to drink after boiling",
    elderWaterSafeCaution: "CAUTION - Boil vigorously for 3+ minutes",
    elderWaterSafeDanger: "DANGER - Unsafe! Use official tanker water",
    elderAdviceYes: "All Cauvery delta pipelines are normal. Boil and cool before drinking as usual daily practice.",
    elderAdviceCaution: "Muddy water / turbidity detected. Boil all drinking water for at least 3 minutes before drinking.",
    elderAdviceDanger: "Contamination confirmed! Avoid local handpumps. Collect water only from medical tankers and drink boiled water.",
    elderAction1Title: "1. Boil Drinking Water",
    elderAction1Desc: "Boil water for 3 minutes to kill cholera and diarrhea germs completely.",
    elderAction2Title: "2. Make ORS Solution",
    elderAction2Desc: "1 Liter clean water + 6 teaspoons sugar + 1/2 teaspoon salt for vomiting/diarrhea.",
    elderAction3Title: "3. 1-Click Issue Report",
    elderAction3Desc: "Inform your village health nurse about muddy water or illness in your family.",
    elderAction4Title: "4. Government Medical Helpline",
    elderAction4Desc: "Call 104 (24x7 Free) for instant doctor guidance and ambulance dispatch.",
    helplineCallBtn: "Call 104 Helpline",
    helplineNumber: "104 (Toll-Free 24/7)",
    helplineText: "Government Public Health Emergency Helpline",
    tapToListen: "Tap to listen in voice",

    reportTitle: "1-Click Community Concern Report",
    reportSub: "Report dirty water, broken handpumps or family illness to village health workers immediately",
    issueType: "Select What Happened",
    dirtyWater: "Muddy / Smelly Water",
    vomitingDiarrhea: "Vomiting / Loose Motion",
    feverWeakness: "High Fever & Dehydration",
    brokenPipe: "Broken Pipe / Handpump Contamination",
    selectVillage: "Select Village / Ward",
    descriptionLabel: "Describe the issue (optional)",
    descriptionPlaceholder: "e.g. Tap water looks brown near North Street since yesterday morning...",
    contactLabel: "Your Contact Number / House ID",
    contactPlaceholder: "e.g. 9876543210 or House #14",
    submitReportBtn: "Submit Alert to Health Worker",
    submitting: "Submitting...",
    reportSuccessMsg: "Report submitted successfully! Village Health Worker (VHN) has been notified.",

    aiTitle: "AquaGuide AI Public Health Assistant",
    aiSub: "Instant voice-guided advice on water purification, home ORS and symptom first aid",
    voiceSupported: "Voice Supported",
    aiDisclaimer: "Public health education only. In severe weakness or persistent vomiting, visit nearest PHC.",
    suggestedQuestions: "Suggested Questions:",
    inputPlaceholder: "Ask anything about water boiling, ORS recipes, or diarrhea care...",
    sendBtn: "Send",
    aiThinking: "AquaGuide is analyzing health protocols...",
    listenAloud: "Listen Aloud",

    alertsTitle: "Public Health Alerts & Advisories",
    alertsSub: "Real-time advisories issued by District Health Surveillance Units",
    filterAll: "All Alerts",
    filterUnread: "Unread",
    filterHigh: "Critical Priority",
    markAsRead: "Mark Read",
    acknowledgeBtn: "Acknowledge Action",
    acknowledged: "Acknowledged",
    noAlerts: "No active alerts for this location.",

    waterQualityTitle: "Real-Time Water Sensor Telemetry",
    waterQualitySub: "Live IoT sensor feeds from Cauvery delta pipelines and community borewells",
    turbidityLabel: "Turbidity (NTU)",
    phLabel: "pH Level",
    tdsLabel: "TDS (PPM)",
    chlorineLabel: "Residual Chlorine (mg/L)",
    coliformLabel: "Coliform Count (CFU/100ml)",
    safeLimit: "Safe Threshold",
    liveReading: "Live Reading",
    triggerSpike: "Simulate Contamination Spike",

    healthWorkerTitle: "Village Health Worker (VHN / ASHA) Triage",
    healthWorkerSub: "Real-time triage of syndromic cases and chlorine dispatch log",
    pendingReports: "Pending Community Reports",
    verifiedCases: "Verified Field Cases",
    highRiskClusters: "High-Risk Households",
    verifyBtn: "Verify & Dispatch ORS",
    escalateBtn: "Escalate to Doctor / BMO",
    verifiedBadge: "Verified",
    escalatedBadge: "Escalated",

    adminTitle: "District Epidemiological Analytics",
    adminSub: "Integrated health surveillance across Cuddalore, Thanjavur, Nagapattinam & Erode",
    totalSources: "Monitored Water Sources",
    totalReports: "Total Syndromic Reports",
    activeOutbreaks: "Active High-Risk Clusters",
    downloadReportBtn: "Download PDF Incident Brief",

    mapTitle: "Safe Water & Outbreak Risk Map",
    mapSub: "Live GIS map of Cauvery delta borewells, RO plants, overhead tanks and reported illness clusters",
    mapFilterAll: "All Sources",
    mapFilterBorewell: "Borewells",
    mapFilterCanal: "Canals / Rivers",
    mapFilterTank: "Overhead Tanks",
    selectedSource: "Selected Water Source",
    sourceStatus: "Water Safety Status",
    nearbyCases: "Reported Cases Nearby",

    scenarioSafe: "1. Safe Baseline",
    scenarioCaution: "2. Water Contamination",
    scenarioCluster: "3. Illness Cluster",
    scenarioOutbreak: "4. Critical Outbreak",
    scenarioSafeDesc: "Safe Cauvery borewells, normal community reports.",
    scenarioCautionDesc: "Turbidity spike to 8.4 NTU in coastal lines.",
    scenarioClusterDesc: "14 syndromic cases reported in Bhavani canal ward.",
    scenarioOutbreakDesc: "High turbidity + 27 cases + flood inundation risk.",
  },

  ta: {
    appName: "AquaGuard (அக்வாகார்ட்)",
    tagline: "முன்கூட்டியே கண்டறிதல். முன்கூட்டியே எச்சரித்தல். நோய்த்தொற்றைத் தடுத்தல்.",
    heroSub: "குடிநீர் தரம், சமூக அறிகுறிகள் மற்றும் பருவமழை வெள்ளத் தரவுகளை AI தொழில்நுட்பத்தின் மூலம் ஒருங்கிணைத்து, நீர் சார்ந்த நோய்கள் பரவும் அபாயத்தை முன்கூட்டியே கண்டறியும் தமிழ்நாடு பொது சுகாதார கண்காணிப்பு தளம்.",
    checkRisk: "கிராமத்தின் அபாய அளவை சரிபார்க்க",
    reportConcern: "சுகாதார புகாரை பதிவு செய்ய",
    awarenessCenter: "விழிப்புணர்வு மையம்",
    
    navDashboard: "முகப்பு / நிலை",
    navMap: "பாதுகாப்பான குடிநீர் வரைபடம்",
    navWater: "சென்சார் அளவீடுகள்",
    navEarlyWarning: "AI ஆரம்ப எச்சரிக்கை",
    navSimulator: "தொற்று அபாய மாதிரி",
    navAwareness: "சுகாதார வழிகாட்டிகள்",
    navAquaGuide: "AI நல்வாழ்வு வழிகாட்டி",
    navAlerts: "எச்சரிக்கைகள் & தகவல்கள்",
    navHealthWorker: "ஆஷா / கிராம செவிலியர்",
    navAdmin: "மாவட்ட சுகாதார அறிக்கை",
    navAbout: "அக்வாகார்ட் பற்றி",
    moreTools: "கூடுதல் வசதிகள்",
    specialistTools: "சிறப்பு மருத்துவக் கருவிகள்",
    mainNav: "முக்கிய பக்கங்கள்",

    languageLabel: "மொழி",
    elderModeOn: "எளிய முறை (ஆன்)",
    elderModeOff: "எளிய முறை (ஆஃப்)",
    elderModeBtn: "எளிய வடிவம்",
    elderModeTooltip: "பெரியவர்களுக்கான எளிய / குரல் வழி வடிவம்",
    listenInVoice: "குரலில் கேட்க",
    stopVoice: "ஒலியை நிறுத்து",
    waterSentinel: "கிராம குடிநீர் பாதுகாப்பு காவலாளி",

    simulatedDemoData: "மாதிரி டெமோ தரவு",
    currentRisk: "தற்போதைய சுகாதார அபாயம்",
    waterRisk: "குடிநீர் தர அபாயம்",
    symptomRisk: "அறிகுறி அபாயம்",
    environmentalRisk: "சுற்றுச்சூழல் & வெள்ள அபாயம்",
    overallRisk: "ஒட்டுமொத்த தொற்று அபாய மதிப்பீடு",
    analyzeRisk: "அபாய பகுப்பாய்வு செய்க",
    whyRiskDetected: "இந்த அபாயம் ஏன் கண்டறியப்பட்டது?",
    riskConfidence: "AI மாதிரி நம்பகத்தன்மை",
    disclaimerText: "சாத்தியமான நோய்த்தொற்று அபாயம் கண்டறியப்பட்டுள்ளது. தகுதிவாய்ந்த பொது சுகாதார அதிகாரிகளின் சரிபார்ப்பு அவசியமானது.",
    simulateSensor: "நீர் சென்சாரை உருவகப்படுத்துக",
    startSimulation: "நேரலை சிமுலேஷனைத் தொடங்கு",
    stopSimulation: "சிமுலேஷனை நிறுத்து",
    demoMode: "சோதனை முறை",
    loadScenario: "டெமோ காட்சியைத் தேர்வுசெய்க",
    safeStatus: "பாதுகாப்பான நிலை",
    cautionStatus: "கவனிக்கப்பட வேண்டிய நிலை",
    dangerStatus: "தீவிர எச்சரிக்கை நிலை",
    safeStatusDesc: "குடிநீர் பாதுகாப்பானது. மக்கள் நல்வாழ்வு இயல்பாக உள்ளது.",
    cautionStatusDesc: "நீரில் கலங்கல் தன்மை அதிகரித்துள்ளது. 3 நிமிடங்கள் கொதிக்க வைத்து குடிக்கவும்.",
    dangerStatusDesc: "நீர் அசுத்தமடைந்துள்ளது! கொதிக்க வைக்காத நீரை குடிக்க வேண்டாம். லாரி நீரை பயன்படுத்தவும்.",

    elderTitle: "கிராம குடிநீர் & நல்வாழ்வு பாதுகாப்பு",
    elderSub: "பெரியவர்கள் மற்றும் குடும்பங்களுக்கான எளிய நிலை மற்றும் குரல் வழிகாட்டல்",
    elderWaterSafeQ: "இப்போது உங்கள் ஊர் குடிநீர் குடிக்க பாதுகாப்பானதா?",
    elderWaterSafeYes: "ஆம் - கொதிக்க வைத்து குடிக்கலாம்",
    elderWaterSafeCaution: "எச்சரிக்கை - 3 நிமிடம் நன்கு கொதிக்க வைத்து குடிக்கவும்",
    elderWaterSafeDanger: "ஆபத்து - பாதுகாப்பற்றது! அரசு லாரி நீரை மட்டுமே பயன்படுத்தவும்",
    elderAdviceYes: "காவிரி டெல்டா குழாய் நீர் சீராக உள்ளது. வழக்கம் போல் நன்கு காய்ச்சி ஆறவைத்து குடியுங்கள்.",
    elderAdviceCaution: "குழாய் நீரில் கலங்கல் தன்மை உள்ளது. தண்ணீரை குறைந்தது 3 நிமிடங்கள் கொதிக்க வைத்து பருகவும்.",
    elderAdviceDanger: "அசுத்தம் உறுதி செய்யப்பட்டுள்ளது! கைபம்பு நீரை குடிக்காதீர்கள். மருத்துவ முகாம் நீரை கொதிக்க வைத்து பயன்படுத்தவும்.",
    elderAction1Title: "1. குடிநீரை கொதிக்க வைத்தல்",
    elderAction1Desc: "காலரா மற்றும் வயிற்றுப்போக்கு கிருமிகளை அழிக்க தண்ணீரை 3 நிமிடங்கள் நன்கு கொதிக்க வைக்கவும்.",
    elderAction2Title: "2. ORS கரைசல் தயாரிப்பு",
    elderAction2Desc: "1 லிட்டர் காய்ச்சிய நீரில் 6 ஸ்பூன் சர்க்கரை + 1/2 ஸ்பூன் உப்பு கலந்து வாந்தி/வயிற்றுப்போக்குக்கு பருகவும்.",
    elderAction3Title: "3. 1-கிளிக் பிரச்சனை பதிவு",
    elderAction3Desc: "குழாயில் அசுத்த நீர் வந்தாலோ குடும்பத்தில் யாருக்காவது உடம்பு சரியில்லை என்றாலோ உடனே கிராம செவிலியருக்கு தெரிவிக்கவும்.",
    elderAction4Title: "4. அரசு இலவச மருத்துவ உதவி எண்",
    elderAction4Desc: "104 என்ற இலவச எண்ணை அழைத்து உடனடி மருத்துவர் ஆலோசனை மற்றும் ஆம்புலன்ஸ் உதவி பெறலாம்.",
    helplineCallBtn: "104 மருத்துவ உதவிக்கு அழைக்க",
    helplineNumber: "104 (இலவச எண் 24/7)",
    helplineText: "தமிழ்நாடு அரசு பொது சுகாதார அவசர உதவி மையம்",
    tapToListen: "குரலில் கேட்க தட்டவும்",

    reportTitle: "1-கிளிக் சுகாதாரப் பிரச்சனை பதிவு",
    reportSub: "அசுத்த குடிநீர் அல்லது வாந்தி/வயிற்றுப்போக்கு பாதிப்பை கிராம சுகாதார செவிலியருக்கு உடனே தெரிவியுங்கள்",
    issueType: "என்ன பிரச்சனை என்பதை தேர்வு செய்யவும்",
    dirtyWater: "கலங்கலான / துர்நாற்றமுள்ள குடிநீர்",
    vomitingDiarrhea: "வாந்தி / வயிற்றுப்போக்கு பாதிப்பு",
    feverWeakness: "அதிக காய்ச்சல் & உடல் சோர்வு",
    brokenPipe: "உடைந்த குழாய் / கைபம்பில் சாக்கடை நீர்",
    selectVillage: "உங்கள் கிராமம் / வார்டை தேர்வு செய்யவும்",
    descriptionLabel: "விவரம் (விருப்பப்பட்டால்)",
    descriptionPlaceholder: "எ.கா: வடக்கு தெருவில் நேற்று முதல் குழாயில் கலங்கலாக தண்ணீர் வருகிறது...",
    contactLabel: "தொடர்பு எண் / வீட்டு எண்",
    contactPlaceholder: "எ.கா: 9876543210 அல்லது கதவு எண் 14",
    submitReportBtn: "கிராம செவிலியருக்கு தகவல் அனுப்பு",
    submitting: "அனுப்பப்படுகிறது...",
    reportSuccessMsg: "தகவல் வெற்றிகரமாக பதிவு செய்யப்பட்டது! கிராம சுகாதார செவிலியருக்கு (VHN) தகவல் அனுப்பப்பட்டுள்ளது.",

    aiTitle: "அக்வாகைட் (AquaGuide) AI நல்வாழ்வு உதவியாளர்",
    aiSub: "குடிநீர் பாதுகாப்பு, ORS தயாரிப்பு மற்றும் முதலுதவி பற்றி தமிழில் எளிதாக கேளுங்கள்",
    voiceSupported: "குரல் வழிகாட்டல் உண்டு",
    aiDisclaimer: "பொது சுகாதார வழிகாட்டல் மட்டுமே. தீவிர மயக்கம் இருப்பின் ஆரம்ப சுகாதார நிலையத்தை அணுகவும்.",
    suggestedQuestions: "முக்கிய கேள்விகள்:",
    inputPlaceholder: "தண்ணீர் கொதிக்க வைப்பது, ORS தயாரிப்பு பற்றி தமிழில் கேளுங்கள்...",
    sendBtn: "அனுப்பு",
    aiThinking: "அக்வாகைட் வழிகாட்டலை தயார் செய்கிறது...",
    listenAloud: "ஒலி வடிவில் கேட்க",

    alertsTitle: "பொது சுகாதார எச்சரிக்கைகள் & தகவல்கள்",
    alertsSub: "மாவட்ட சுகாதார கண்காணிப்பு மையத்தால் வெளியிடப்பட்ட நேரலை எச்சரிக்கைகள்",
    filterAll: "அனைத்து எச்சரிக்கைகள்",
    filterUnread: "படிக்காதவை",
    filterHigh: "தீவிர அபாயம்",
    markAsRead: "படித்ததாக குறி",
    acknowledgeBtn: "நடவடிக்கை உறுதி செய்",
    acknowledged: "உறுதி செய்யப்பட்டது",
    noAlerts: "தற்போது புதிய எச்சரிக்கைகள் எதுவும் இல்லை.",

    waterQualityTitle: "நேரடி குடிநீர் சென்சார் அளவீடுகள்",
    waterQualitySub: "காவிரி டெல்டா விநியோக குழாய்கள் மற்றும் ஆழ்துளை கிணறுகளிலிருந்து நேரலை IoT சென்சார் தரவுகள்",
    turbidityLabel: "கலங்கல் தன்மை (Turbidity - NTU)",
    phLabel: "காரத்தன்மை (pH Level)",
    tdsLabel: "உப்புத்தன்மை (TDS - PPM)",
    chlorineLabel: "குளோரின் அளவு (Residual Chlorine)",
    coliformLabel: "பாக்டீரியா அளவு (Coliform Count)",
    safeLimit: "பாதுகாப்பான வரம்பு",
    liveReading: "தற்போதைய அளவீடு",
    triggerSpike: "நீர் அசுத்த சோதனை செய்க",

    healthWorkerTitle: "கிராம சுகாதார செவிலியர் (VHN / ஆஷா) பணி தளம்",
    healthWorkerSub: "கிராம மக்களின் புகார்கள் மீது உடனடி கள ஆய்வு மற்றும் ORS விநியோகம்",
    pendingReports: "நிலுவையில் உள்ள புகார்கள்",
    verifiedCases: "உறுதி செய்யப்பட்ட பாதிப்புகள்",
    highRiskClusters: "அதிக அபாயமுள்ள வீடுகள்",
    verifyBtn: "உறுதி செய்து ORS வழங்குக",
    escalateBtn: "மருத்துவருக்கு அனுப்புக",
    verifiedBadge: "உறுதியானது",
    escalatedBadge: "பரிந்துரைக்கப்பட்டது",

    adminTitle: "மாவட்ட தொற்றுநோய் மேலாண்மை தளம்",
    adminSub: "கடலூர், தஞ்சாவூர், நாகப்பட்டினம், ஈரோடு ஒருங்கிணைந்த சுகாதார கண்காணிப்பு",
    totalSources: "கண்காணிக்கப்படும் நீர் ஆதாரங்கள்",
    totalReports: "மொத்த சமூக அறிக்கைகள்",
    activeOutbreaks: "அபாய மண்டலங்கள்",
    downloadReportBtn: "PDF சுருக்க அறிக்கையை பதிவிறக்கு",

    mapTitle: "பாதுகாப்பான குடிநீர் & அபாய வரைபடம்",
    mapSub: "காவிரி டெல்டா ஆழ்துளை கிணறுகள், RO நிலையங்கள், மேல்நிலை தொட்டிகள் மற்றும் நோய் பாதிப்பு பகுதிகள்",
    mapFilterAll: "அனைத்து ஆதாரங்கள்",
    mapFilterBorewell: "ஆழ்துளை கிணறுகள்",
    mapFilterCanal: "கால்வாய்கள் / ஆறுகள்",
    mapFilterTank: "மேல்நிலை தொட்டிகள்",
    selectedSource: "தேர்ந்தெடுக்கப்பட்ட நீர் ஆதாரம்",
    sourceStatus: "நீர் பாதுகாப்பு நிலை",
    nearbyCases: "அருகிலுள்ள பாதிப்புகள்",

    scenarioSafe: "1. பாதுகாப்பான நிலை",
    scenarioCaution: "2. நீர் அசுத்தம்",
    scenarioCluster: "3. உடல்நலக்குறைவு",
    scenarioOutbreak: "4. தீவிர எச்சரிக்கை",
    scenarioSafeDesc: "குடிநீர் பாதுகாப்பானது, இயல்பான நிலை.",
    scenarioCautionDesc: "கலங்கல் நீர் எச்சரிக்கை (8.4 NTU).",
    scenarioClusterDesc: "14 பேருக்கு வாந்தி/வயிற்றுப்போக்கு.",
    scenarioOutbreakDesc: "அசுத்த நீர் + 27 வழக்குகள் + வெள்ள அபாயம்.",
  },

  hi: {
    appName: "AquaGuard (एक्वागार्ड)",
    tagline: "शीघ्र पहचानें। शीघ्र चेतावनी दें। प्रकोप रोकें।",
    heroSub: "एक एआई-संचालित सामुदायिक स्वास्थ्य इंटेलिजेंस प्लेटफॉर्म जो जल गुणवत्ता, सामुदायिक रिपोर्ट और मौसमी डेटा को जोड़कर जल-जनित रोगों के प्रकोप को पहले ही पहचानता है।",
    checkRisk: "सामुदायिक जोखिम जांचें",
    reportConcern: "स्वास्थ्य समस्या की रिपोर्ट करें",
    awarenessCenter: "जागरूकता केंद्र देखें",
    
    navDashboard: "मुख्य पृष्ठ / स्थिति",
    navMap: "सुरक्षित जल मानचित्र",
    navWater: "जल गुणवत्ता सेंसर",
    navEarlyWarning: "एआई प्रारंभिक चेतावनी",
    navSimulator: "प्रकोप सिम्युलेटर",
    navAwareness: "स्वास्थ्य जागरूकता",
    navAquaGuide: "एक्वागाइड एआई सहायक",
    navAlerts: "अलर्ट व चेतावनियां",
    navHealthWorker: "आशा / स्वास्थ्य कार्यकर्ता",
    navAdmin: "जिला स्वास्थ्य रिपोर्ट",
    navAbout: "एक्वागार्ड के बारे में",
    moreTools: "अन्य सुविधाएं",
    specialistTools: "विशेषज्ञ उपकरण",
    mainNav: "मुख्य नेविगेशन",

    languageLabel: "भाषा (Language)",
    elderModeOn: "सरल मोड: चालू",
    elderModeOff: "सरल मोड: बंद",
    elderModeBtn: "सरल दृश्य",
    elderModeTooltip: "वरिष्ठ नागरिकों हेतु सरल / ऑडियो मोड",
    listenInVoice: "आवाज में सुनें",
    stopVoice: "आवाज बंद करें",
    waterSentinel: "ग्रामीण जल सुरक्षा प्रहरी",

    simulatedDemoData: "सिम्युलेटेड डेमो डेटा",
    currentRisk: "वर्तमान सामुदायिक स्वास्थ्य जोखिम",
    waterRisk: "जल गुणवत्ता जोखिम",
    symptomRisk: "लक्षण जोखिम",
    environmentalRisk: "पर्यावरणीय व बाढ़ जोखिम",
    overallRisk: "कुल प्रकोप जोखिम स्कोर",
    analyzeRisk: "जोखिम विश्लेषण करें",
    whyRiskDetected: "यह जोखिम क्यों पाया गया?",
    riskConfidence: "एआई मॉडल विश्वसनीयता",
    disclaimerText: "संभावित प्रकोप जोखिम का पता चला है। योग्य सार्वजनिक स्वास्थ्य अधिकारियों द्वारा सत्यापन आवश्यक है।",
    simulateSensor: "जल सेंसर सिम्युलेट करें",
    startSimulation: "लाइव सिमुलेशन शुरू करें",
    stopSimulation: "सिमुलेशन रोकें",
    demoMode: "सिमुलेशन मोड",
    loadScenario: "परिदृश्य लोड करें",
    safeStatus: "सुरक्षित स्थिति",
    cautionStatus: "सावधानी की स्थिति",
    dangerStatus: "गंभीर चेतावनी स्थिति",
    safeStatusDesc: "पेयजल सुरक्षित है। सामान्य सामुदायिक स्वास्थ्य स्थिति।",
    cautionStatusDesc: "पानी में मैलापन बढ़ा है। पानी को 3 मिनट उबालकर पिएं।",
    dangerStatusDesc: "पानी दूषित है! बिना उबला पानी न पिएं। टैंकर के पानी का उपयोग करें।",

    elderTitle: "ग्रामीण पेयजल व स्वास्थ्य सुरक्षा",
    elderSub: "बुजुर्गों और परिवारों के लिए समझने में आसान स्थिति और आवाज मार्गदर्शन",
    elderWaterSafeQ: "क्या आपके गांव का पानी अभी पीने के लिए सुरक्षित है?",
    elderWaterSafeYes: "हाँ - उबालने के बाद पीने योग्य",
    elderWaterSafeCaution: "सावधानी - कम से कम 3 मिनट उबालकर ही पिएं",
    elderWaterSafeDanger: "खतरा - असुरक्षित! केवल सरकारी टैंकर का पानी पिएं",
    elderAdviceYes: "कावेरी डेल्टा पाइपलाइन सामान्य है। हमेशा की तरह पानी को उबालकर और ठंडा करके पिएं।",
    elderAdviceCaution: "पानी में मैलापन पाया गया है। पीने से पहले पानी को 3 मिनट तक अच्छी तरह उबालें।",
    elderAdviceDanger: "जल प्रदूषण की पुष्टि हुई है! हैंडपंप का पानी न पिएं। केवल मेडिकल टैंकर का पानी उबालकर उपयोग करें।",
    elderAction1Title: "1. पीने का पानी उबालें",
    elderAction1Desc: "हैजा और दस्त के कीटाणुओं को पूरी तरह खत्म करने के लिए पानी को 3 मिनट उबालें।",
    elderAction2Title: "2. ओआरएस (ORS) घोल बनाएं",
    elderAction2Desc: "1 लीटर उबले पानी में 6 चम्मच चीनी + आधा चम्मच नमक मिलाकर दस्त/उल्टी में पिएं।",
    elderAction3Title: "3. 1-क्लिक समस्या रिपोर्ट",
    elderAction3Desc: "गंदा पानी आने या परिवार में किसी के बीमार होने पर तुरंत स्वास्थ्य कार्यकर्ता को सूचित करें।",
    elderAction4Title: "4. सरकारी स्वास्थ्य हेल्पलाइन",
    elderAction4Desc: "तत्काल डॉक्टर सलाह और एम्बुलेंस सहायता के लिए 104 (निःशुल्क 24x7) पर कॉल करें।",
    helplineCallBtn: "104 हेल्पलाइन पर कॉल करें",
    helplineNumber: "104 (टोल-फ्री 24/7)",
    helplineText: "सरकारी सार्वजनिक स्वास्थ्य आपातकालीन हेल्पलाइन",
    tapToListen: "आवाज में सुनने के लिए टैप करें",

    reportTitle: "1-क्लिक सामुदायिक समस्या रिपोर्ट",
    reportSub: "गंदा पानी, टूटा नल या उल्टी-दस्त की सूचना तुरंत ग्रामीण स्वास्थ्य कार्यकर्ता को दें",
    issueType: "समस्या का प्रकार चुनें",
    dirtyWater: "मैला / दुर्गंधयुक्त पेयजल",
    vomitingDiarrhea: "उल्टी / दस्त की समस्या",
    feverWeakness: "तेज बुखार और कमजोरी",
    brokenPipe: "टूटा नल / गंदा पानी रिसाव",
    selectVillage: "अपना गांव / वार्ड चुनें",
    descriptionLabel: "विवरण (वैकल्पिक)",
    descriptionPlaceholder: "जैसे: कल सुबह से उत्तरी गली के नल में गंदा पानी आ रहा है...",
    contactLabel: "संपर्क नंबर / मकान नंबर",
    contactPlaceholder: "जैसे: 9876543210 या मकान नं. 14",
    submitReportBtn: "स्वास्थ्य कार्यकर्ता को अलर्ट भेजें",
    submitting: "भेजा जा रहा है...",
    reportSuccessMsg: "रिपोर्ट सफलतापूर्वक दर्ज की गई! आशा / स्वास्थ्य कार्यकर्ता को सूचित कर दिया गया है।",

    aiTitle: "एक्वागाइड (AquaGuide) एआई स्वास्थ्य सहायक",
    aiSub: "जल शुद्धिकरण, ओआरएस निर्माण और प्राथमिक उपचार पर त्वरित आवाज मार्गदर्शन",
    voiceSupported: "आवाज सुविधा उपलब्ध",
    aiDisclaimer: "केवल जनस्वास्थ्य शिक्षा हेतु। गंभीर निर्जलीकरण या बेहोशी की स्थिति में तुरंत प्राथमिक स्वास्थ्य केंद्र (PHC) जाएं।",
    suggestedQuestions: "सुझाए गए प्रश्न:",
    inputPlaceholder: "पानी उबालने, ओआरएस बनाने या दस्त के उपचार के बारे में पूछें...",
    sendBtn: "भेजें",
    aiThinking: "एक्वागाइड स्वास्थ्य प्रोटोकॉल का विश्लेषण कर रहा है...",
    listenAloud: "आवाज में सुनें",

    alertsTitle: "सार्वजनिक स्वास्थ्य अलर्ट व चेतावनियां",
    alertsSub: "जिला स्वास्थ्य निगरानी इकाई द्वारा जारी लाइव चेतावनियां",
    filterAll: "सभी अलर्ट",
    filterUnread: "अपठित",
    filterHigh: "अत्यधिक गंभीर",
    markAsRead: "पढ़ा हुआ मार्क करें",
    acknowledgeBtn: "कार्रवाई स्वीकारें",
    acknowledged: "स्वीकृत",
    noAlerts: "इस स्थान के लिए कोई सक्रिय अलर्ट नहीं है।",

    waterQualityTitle: "लाइव जल गुणवत्ता सेंसर डेटा",
    waterQualitySub: "कावेरी डेल्टा पाइपलाइन और बोरवेल से लाइव IoT सेंसर रीडिंग",
    turbidityLabel: "मैलापन (Turbidity - NTU)",
    phLabel: "पीएच स्तर (pH Level)",
    tdsLabel: "टीडीएस (TDS - PPM)",
    chlorineLabel: "क्लोरीन मात्रा (Chlorine)",
    coliformLabel: "बैक्टीरिया काउंट (Coliform)",
    safeLimit: "सुरक्षित सीमा",
    liveReading: "वर्तमान रीडिंग",
    triggerSpike: "जल प्रदूषण परीक्षण सिम्युलेट करें",

    healthWorkerTitle: "आशा / ग्रामीण स्वास्थ्य कार्यकर्ता पोर्टल",
    healthWorkerSub: "सामुदायिक रिपोर्टों का त्वरित सत्यापन और ओआरएस वितरण",
    pendingReports: "लंबित सामुदायिक रिपोर्ट",
    verifiedCases: "सत्यापित मामले",
    highRiskClusters: "अति संवेदनशील परिवार",
    verifyBtn: "सत्यापित करें व ओआरएस भेजें",
    escalateBtn: "चिकित्सा अधिकारी को भेजें",
    verifiedBadge: "सत्यापित",
    escalatedBadge: "उच्च प्राथमिकता",

    adminTitle: "जिला महामारी विज्ञान विश्लेषण",
    adminSub: "कुड्डालोर, तंजावुर, नागपट्टिनम और इरोड हेतु एकीकृत स्वास्थ्य निगरानी",
    totalSources: "निगरानी किए जा रहे जल स्रोत",
    totalReports: "कुल लक्षण रिपोर्ट",
    activeOutbreaks: "सक्रिय जोखिम क्षेत्र",
    downloadReportBtn: "पीडीएफ सारांश डाउनलोड करें",

    mapTitle: "सुरक्षित जल व प्रकोप जोखिम मानचित्र",
    mapSub: "कावेरी डेल्टा के बोरवेल, आरओ प्लांट, टंकियों और बीमारी क्लस्टर का लाइव जीआईएस मानचित्र",
    mapFilterAll: "सभी स्रोत",
    mapFilterBorewell: "बोरवेल",
    mapFilterCanal: "नहरें / नदियां",
    mapFilterTank: "पानी की टंकियां",
    selectedSource: "चयनित जल स्रोत",
    sourceStatus: "जल सुरक्षा स्थिति",
    nearbyCases: "निकटवर्ती मामले",

    scenarioSafe: "1. सुरक्षित स्थिति",
    scenarioCaution: "2. जल प्रदूषण",
    scenarioCluster: "3. बीमारी क्लस्टर",
    scenarioOutbreak: "4. गंभीर प्रकोप",
    scenarioSafeDesc: "सुरक्षित कावेरी बोरवेल, सामान्य रिपोर्ट।",
    scenarioCautionDesc: "मैलापन 8.4 NTU तक बढ़ गया है।",
    scenarioClusterDesc: "भवानी नहर वार्ड में 14 उल्टी-दस्त के मामले।",
    scenarioOutbreakDesc: "उच्च मैलापन + 27 मामले + बाढ़ का खतरा।",
  },

  bn: {
    appName: "AquaGuard (অ্যাকোয়াগার্ড)",
    tagline: "আগে শনাক্ত করুন। আগে সতর্ক করুন। প্রাদুর্ভাব রোধ করুন।",
    heroSub: "একটি এআই-চালিত জনস্বাস্থ্য প্ল্যাটফর্ম যা জলের গুণমান, উপসর্গ রিপোর্ট এবং পরিবেশগত তথ্য বিশ্লেষণ করে জলবাহিত রোগের সম্ভাব্য ঝুঁকি আগে থেকেই শনাক্ত করে।",
    checkRisk: "কমিউনিটি ঝুঁকি দেখুন",
    reportConcern: "স্বাস্থ্য সমস্যা রিপোর্ট করুন",
    awarenessCenter: "সচেতনতা কেন্দ্র দেখুন",
    
    navDashboard: "মূল পাতা / অবস্থা",
    navMap: "নিরাপদ জলের মানচিত্র",
    navWater: "জলের গুণমান সেন্সর",
    navEarlyWarning: "এআই প্রারম্ভিক সতর্কতা",
    navSimulator: "প্রাদুর্ভাব সিমুলেটর",
    navAwareness: "স্বাস্থ্য সচেতনতা",
    navAquaGuide: "অ্যাকোয়াগাইড এআই সহকারী",
    navAlerts: "সতর্কবার্তা ও বিজ্ঞপ্তি",
    navHealthWorker: "স্বাস্থ্য কর্মী / আশা",
    navAdmin: "জেলা স্বাস্থ্য প্রতিবেদন",
    navAbout: "অ্যাকোয়াগার্ড সম্পর্কে",
    moreTools: "আরও সুবিধা",
    specialistTools: "বিশেষজ্ঞ সরঞ্জাম",
    mainNav: "প্রধান নেভিগেশন",

    languageLabel: "ভাষা (Language)",
    elderModeOn: "সহজ মোড: চালু",
    elderModeOff: "সহজ মোড: বন্ধ",
    elderModeBtn: "সহজ রূপ",
    elderModeTooltip: "বয়স্কদের জন্য সহজ ও ভয়েস মোড",
    listenInVoice: "ভয়েসে শুনুন",
    stopVoice: "অডিও বন্ধ করুন",
    waterSentinel: "গ্রামীণ জল নিরাপত্তা প্রহরী",

    simulatedDemoData: "অনুকরণমূলক ডেমো তথ্য",
    currentRisk: "বর্তমান স্বাস্থ্য ঝুঁকি",
    waterRisk: "জলের গুণমান ঝুঁকি",
    symptomRisk: "উপসর্গ সংক্রান্ত ঝুঁকি",
    environmentalRisk: "পরিবেশগত ও বন্যা ঝুঁকি",
    overallRisk: "সামগ্রিক প্রাদুর্ভাব ঝুঁকি",
    analyzeRisk: "ঝুঁকি বিশ্লেষণ করুন",
    whyRiskDetected: "এই ঝুঁকি কেন শনাক্ত হলো?",
    riskConfidence: "এআই মডেলের নির্ভরযোগ্যতা",
    disclaimerText: "সম্ভাব্য প্রাদুর্ভাব ঝুঁকি শনাক্ত হয়েছে। উপযুক্ত স্বাস্থ্য কর্মকর্তাদের দ্বারা যাচাই প্রয়োজন।",
    simulateSensor: "জল সেন্সর সিমুলেট করুন",
    startSimulation: "লাইভ সিমুলেশন শুরু করুন",
    stopSimulation: "সিমুলেশন বন্ধ করুন",
    demoMode: "সিমুলেশন মোড",
    loadScenario: "পরিস্থিতি নির্বাচন করুন",
    safeStatus: "নিরাপদ অবস্থা",
    cautionStatus: "সতর্কতামূলক অবস্থা",
    dangerStatus: "জরুরি বিপজ্জনক অবস্থা",
    safeStatusDesc: "পানীয় জল নিরাপদ। স্বাভাবিক জনস্বাস্থ্য পরিস্থিতি।",
    cautionStatusDesc: "জলে ঘোলাভাব বেড়েছে। জল ৩ মিনিট ফুটিয়ে পান করুন।",
    dangerStatusDesc: "জল দূষিত হয়েছে! না ফুটিয়ে জল খাবেন না। ট্যাঙ্কারের জল ব্যবহার করুন।",

    elderTitle: "গ্রামীণ পানীয় জল ও স্বাস্থ্য নিরাপত্তা",
    elderSub: "বয়স্ক ও পরিবারের জন্য সহজে বোঝার মতো অবস্থা এবং ভয়েস নির্দেশিকা",
    elderWaterSafeQ: "আপনার গ্রামের জল কি এখন পান করার জন্য নিরাপদ?",
    elderWaterSafeYes: "হ্যাঁ - ফুটানোর পর পান করার উপযোগী",
    elderWaterSafeCaution: "সতর্কতা - অন্তত ৩ মিনিট ভালো করে ফুটিয়ে পান করুন",
    elderWaterSafeDanger: "বিপদ - অনিরাপদ! শুধুমাত্র সরকারি ট্যাঙ্কারের জল ব্যবহার করুন",
    elderAdviceYes: "কাবেড়ী ডেল্টা পাইপলাইন স্বাভাবিক। প্রতিদিনের মতো জল ফুটিয়ে ঠান্ডা করে পান করুন।",
    elderAdviceCaution: "জলে ঘোলাভাব পাওয়া গেছে। পান করার আগে জল অন্তত ৩ মিনিট ফুটিয়ে নিন।",
    elderAdviceDanger: "জল দূষণ নিশ্চিত হয়েছে! টিউবওয়েলের জল খাবেন না। শুধুমাত্র মেডিকেল ট্যাঙ্কারের জল ফুটিয়ে ব্যবহার করুন।",
    elderAction1Title: "১. পানীয় জল ফোটানো",
    elderAction1Desc: "কলেরা ও ডায়রিয়ার জীবাণু সম্পূর্ণ ধ্বংস করতে জল ৩ মিনিট ফোটান।",
    elderAction2Title: "২. ওআরএস (ORS) তৈরি",
    elderAction2Desc: "১ লিটার ফোটানো জলে ৬ চামচ চিনি + আধ চামচ লবণ মিশিয়ে বমি/ডায়রিয়ার সময় পান করুন।",
    elderAction3Title: "৩. ১-ক্লিকে সমস্যা রিপোর্ট",
    elderAction3Desc: "নোংরা জল বা পরিবারের কেউ অসুস্থ হলে অবিলম্বে স্বাস্থ্যকর্মীকে জানান।",
    elderAction4Title: "৪. সরকারি স্বাস্থ্য হেল্পলাইন",
    elderAction4Desc: "জরুরি ডাক্তার পরামর্শ এবং অ্যাম্বুলেন্সের জন্য ১০৪ (টোল-ফ্রি ২৪x৭) নম্বরে কল করুন।",
    helplineCallBtn: "১০৪ হেল্পলাইনে কল করুন",
    helplineNumber: "১০৪ (টোল-ফ্রি ২৪/৭)",
    helplineText: "সরকারি জনস্বাস্থ্য জরুরি হেল্পলাইন",
    tapToListen: "ভয়েসে শুনতে ট্যাপ করুন",

    reportTitle: "১-ক্লিকে স্বাস্থ্য সমস্যা রিপোর্ট",
    reportSub: "নোংরা জল, ভাঙা নলকূপ বা বমি-ডায়রিয়ার খবর সঙ্গে সঙ্গে স্বাস্থ্যকর্মীকে জানান",
    issueType: "সমস্যার ধরন বেছে নিন",
    dirtyWater: "ঘোলা / দুর্গন্ধযুক্ত পানীয় জল",
    vomitingDiarrhea: "বমি / ডায়রিয়ার প্রকোপ",
    feverWeakness: "উচ্চ জ্বর ও শারীরিক দুর্বলতা",
    brokenPipe: "ভাঙা পাইপ / ড্রেনের জল মিশে যাওয়া",
    selectVillage: "আপনার গ্রাম / ওয়ার্ড বেছে নিন",
    descriptionLabel: "বিবরণ (ঐচ্ছিক)",
    descriptionPlaceholder: "যেমন: কাল সকাল থেকে উত্তর পাড়ার কলে নোংরা জল আসছে...",
    contactLabel: "যোগাযোগ নম্বর / বাড়ি নম্বর",
    contactPlaceholder: "যেমন: 9876543210 বা বাড়ি নং ১৪",
    submitReportBtn: "স্বাস্থ্যকর্মীকে তথ্য পাঠান",
    submitting: "পাঠানো হচ্ছে...",
    reportSuccessMsg: "রিপোর্ট সফলভাবে জমা হয়েছে! গ্রাম স্বাস্থ্যকর্মীকে (VHN) জানানো হয়েছে।",

    aiTitle: "অ্যাকোয়াগাইড (AquaGuide) এআই স্বাস্থ্য সহকারী",
    aiSub: "জল বিশুদ্ধকরণ, ওআরএস তৈরি এবং প্রাথমিক চিকিৎসা নিয়ে সহজে পরামর্শ নিন",
    voiceSupported: "ভয়েস সুবিধা উপলব্ধ",
    aiDisclaimer: "শুধুমাত্র জনস্বাস্থ্য শিক্ষার জন্য। গুরুতর অসুস্থতায় নিকটস্থ স্বাস্থ্যকেন্দ্রে যোগাযোগ করুন।",
    suggestedQuestions: "প্রস্তাবিত প্রশ্নাবলী:",
    inputPlaceholder: "জল ফোটানো বা ওআরএস তৈরির নিয়ম সম্পর্কে জিজ্ঞাসা করুন...",
    sendBtn: "পাঠান",
    aiThinking: "অ্যাকোয়াগাইড স্বাস্থ্য নির্দেশিকা প্রস্তুত করছে...",
    listenAloud: "ভয়েসে শুনুন",

    alertsTitle: "জনস্বাস্থ্য সতর্কবার্তা ও বিজ্ঞপ্তি",
    alertsSub: "জেলা স্বাস্থ্য নজরদারি ইউনিট কর্তৃক প্রচারিত লাইভ সতর্কতা",
    filterAll: "সমস্ত সতর্কতা",
    filterUnread: "অপঠিত",
    filterHigh: "জরুরি অগ্রাধিকার",
    markAsRead: "পঠিত হিসেবে চিহ্নিত করুন",
    acknowledgeBtn: "পদক্ষেপ গ্রহণ করুন",
    acknowledged: "গৃহীত",
    noAlerts: "এই এলাকার জন্য কোনো সক্রিয় সতর্কতা নেই।",

    waterQualityTitle: "লাইভ জলের গুণমান সেন্সর ডেটা",
    waterQualitySub: "কাবেড়ী ডেল্টা পাইপলাইন ও গভীর নলকূপ থেকে সরাসরি আইওটি সেন্সর রিডিং",
    turbidityLabel: "ঘোলাভাব (Turbidity - NTU)",
    phLabel: "পিএইচ মান (pH Level)",
    tdsLabel: "টিডিএস (TDS - PPM)",
    chlorineLabel: "ক্লোরিনের মাত্রা (Chlorine)",
    coliformLabel: "ব্যাকটেরিয়া কাউন্ট (Coliform)",
    safeLimit: "নিরাপদ সীমা",
    liveReading: "বর্তমান রিডিং",
    triggerSpike: "জল দূষণ পরীক্ষা সিমুলেট করুন",

    healthWorkerTitle: "আশা / গ্রাম স্বাস্থ্যকর্মী পোর্টাল",
    healthWorkerSub: "কমিউনিটি রিপোর্টের তাৎক্ষণিক যাচাই ও ওআরএস বিতরণ",
    pendingReports: "অপেক্ষমান কমিউনিটি রিপোর্ট",
    verifiedCases: "যাচাইকৃত আক্রান্ত ব্যক্তি",
    highRiskClusters: "উচ্চ ঝুঁকিপূর্ণ পরিবার",
    verifyBtn: "যাচাই করুন ও ওআরএস পাঠান",
    escalateBtn: "মেডিকেল অফিসারের কাছে পাঠান",
    verifiedBadge: "যাচাইকৃত",
    escalatedBadge: "উচ্চ অগ্রাধিকার",

    adminTitle: "জেলা মহামারী সংক্রান্ত বিশ্লেষণ",
    adminSub: "কুড্ডালোর, তাঞ্জাভুর, নাগাপট্টিনম ও ইরোডের সমন্বিত স্বাস্থ্য নজরদারি",
    totalSources: "নজরদারিতে থাকা জলের উৎস",
    totalReports: "মোট উপসর্গ রিপোর্ট",
    activeOutbreaks: "ঝুঁকিপূর্ণ এলাকা",
    downloadReportBtn: "পিডিএফ প্রতিবেদন ডাউনলোড করুন",

    mapTitle: "নিরাপদ জল ও ঝুঁকি মানচিত্র",
    mapSub: "কাবেড়ী ডেল্টার গভীর নলকূপ, আরও প্ল্যান্ট, ওভারহেড ট্যাঙ্ক এবং অসুস্থতার লাইভ জিআইএস মানচিত্র",
    mapFilterAll: "সমস্ত উৎস",
    mapFilterBorewell: "গভীর নলকূপ",
    mapFilterCanal: "খাল / নদী",
    mapFilterTank: "জলের ট্যাঙ্ক",
    selectedSource: "নির্বাচিত জলের উৎস",
    sourceStatus: "জলের নিরাপত্তা অবস্থা",
    nearbyCases: "কাছাকাছি আক্রান্তের সংখ্যা",

    scenarioSafe: "১. নিরাপদ অবস্থা",
    scenarioCaution: "২. জল দূষণ",
    scenarioCluster: "৩. অসুস্থতার প্রকোপ",
    scenarioOutbreak: "৪. মারাত্মক প্রাদুর্ভাব",
    scenarioSafeDesc: "নিরাপদ কাবেড়ী নলকূপ, স্বাভাবিক রিপোর্ট।",
    scenarioCautionDesc: "জলে ঘোলাভাব ৮.৪ NTU পর্যন্ত বৃদ্ধি।",
    scenarioClusterDesc: "ভবানী খাল অঞ্চলে ১৪ জনের বমি/ডায়রিয়ার লক্ষণ।",
    scenarioOutbreakDesc: "উচ্চ ঘোলাভাব + ২৭ জন রোগী + বন্যার আশঙ্কা।",
  },
};
