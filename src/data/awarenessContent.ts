import { AwarenessTopic, QuizQuestion } from "../types";

export const AWARENESS_TOPICS: AwarenessTopic[] = [
  {
    id: "topic-safe-drinking",
    title: "Safe Drinking Water & Household Purification",
    category: "Water Safety",
    iconName: "Droplets",
    summary: "Essential, low-cost water purification methods proven effective against cholera, typhoid, and rotavirus in flood-prone and rural settings.",
    readTime: "4 min read",
    keyPoints: [
      "Clear water is not always safe water: bacteria, viruses, and amoeba cannot be seen with the naked eye.",
      "Boiling vigorously for 1–3 minutes kills 99.9% of water-borne pathogens.",
      "Chlorine / Halazone tablets are the most reliable disinfection method when boiling fuel is scarce during floods.",
      "Solar Disinfection (SODIS) using transparent PET bottles exposed to direct sunlight for 6 hours can disinfect clear water in emergencies.",
    ],
    actionSteps: [
      {
        step: "1. Clarify / Settle",
        detail: "If water is muddy (turbid), allow it to settle for 2–4 hours in a bucket, or filter through a clean, folded 4-layer cotton cloth (saree filter)."
      },
      {
        step: "2. Disinfect (Boil or Chlorinate)",
        detail: "Bring water to a rolling boil for at least 3 full minutes. Alternatively, dissolve 1 chlorine tablet (20mg Halazone or 0.5g bleaching powder per 10 liters of clear water) and wait 30 minutes before drinking."
      },
      {
        step: "3. Safe Storage",
        detail: "Store in a narrow-neck, covered container with a dedicated tap or ladle. Never dip unwashed hands or cups directly into stored drinking water."
      },
    ],
    warningSigns: [
      "Cloudy or brownish water from shallow handpumps after rain",
      "Foul, swampy, or sulfur odor",
      "Sudden bad metallic taste or chemical oily sheen on water surface",
    ],
    mythVsFact: [
      {
        myth: "Clear river water is pure and doesn't need boiling.",
        fact: "Clear river water frequently carries microscopic Vibrio cholerae and Giardia parasites from upstream runoffs.",
      },
      {
        myth: "Adding alum alone makes water completely pathogen-free.",
        fact: "Alum (fitkari) only precipitates suspended dirt; it does not kill bacterial or viral pathogens. Boiling or chlorination is still required.",
      },
    ],
  },
  {
    id: "topic-ors-dehydration",
    title: "ORS Preparation & Preventing Lethal Dehydration",
    category: "Emergency Care",
    iconName: "HeartPulse",
    summary: "Dehydration from acute diarrhea can be fatal within hours, especially for infants and the elderly. Learn the exact WHO formula and homemade recipe.",
    readTime: "3 min read",
    keyPoints: [
      "Oral Rehydration Salts (ORS) replenish lost water and vital electrolytes (sodium, potassium, glucose).",
      "Give ORS after EVERY loose bowel movement or bout of vomiting.",
      "Continue feeding and breastfeeding even when suffering from diarrhea.",
      "Zinc supplementation (20mg daily for 14 days) reduces the duration and severity of diarrhea in children.",
    ],
    actionSteps: [
      {
        step: "WHO Standard Packet",
        detail: "Mix the entire contents of 1 standard ORS packet in exactly 1 Liter of clean drinking or boiled water. Stir until fully dissolved. Discard unused solution after 24 hours."
      },
      {
        step: "Homemade Emergency SSS Solution",
        detail: "If no packets are available: In 1 Liter of clean water, stir 6 level teaspoons of Sugar (approx. 30g) + 1/2 level teaspoon of Salt (approx. 2.5g). Taste should be no saltier than tears."
      },
      {
        step: "Dosing Schedule",
        detail: "Infants: 50-100ml after each stool. Children: 100-200ml. Adults: Drink as much as desired (minimum 250ml per episode)."
      },
    ],
    warningSigns: [
      "Sunken eyes and extreme thirst or inability to drink",
      "Dry tongue and absence of tears when crying in children",
      "Skin pinch on belly goes back very slowly (more than 2 seconds)",
      "High fever above 102°F or visible blood/mucus in stool (Dysentery)",
      "Extreme lethargy, confusion, or loss of consciousness",
    ],
  },
  {
    id: "topic-flood-hygiene",
    title: "Flood-Related Contamination & Sanitation",
    category: "Flood Safety",
    iconName: "ShieldAlert",
    summary: "Monsoon floods submerge shallow handpumps, ring wells, and open latrines, triggering immediate water-borne outbreaks across lowlands.",
    readTime: "5 min read",
    keyPoints: [
      "Never drink from a tube well that has been submerged by floodwater until it has been disinfected with bleaching powder.",
      "Do not walk or swim in floodwater with open wounds or sores (risk of Leptospirosis and severe skin infections).",
      "Elevate all food items, cooking utensils, and medicine above high-water flood levels.",
      "Construct temporary emergency raised latrines away from drinking water collection sources.",
    ],
    actionSteps: [
      {
        step: "Tube Well Shock-Chlorination",
        detail: "After flood waters recede, pump out dirty water until clear. Pour a slurry of 50g bleaching powder dissolved in 10 liters of water down the casing, let it stand for 12 hours, then pump until chlorine smell reduces."
      },
      {
        step: "Sanitary Hand Hygiene",
        detail: "Wash hands with soap and safe water for 20 seconds before preparing food, before eating, and after handling flood debris or defecating."
      },
      {
        step: "Cooked Food Safety",
        detail: "Eat only freshly cooked, steaming hot meals. Avoid raw salads or uncovered leftover foods during flood periods."
      },
    ],
  },
  {
    id: "topic-hand-hygiene",
    title: "Community Hand Hygiene & Sanitation",
    category: "Hygiene",
    iconName: "Sparkles",
    summary: "Handwashing with soap is the single most cost-effective public health intervention against diarrheal diseases and typhoid transmission.",
    readTime: "2 min read",
    keyPoints: [
      "Rinsing hands with plain water removes visible dirt but does not kill enteric pathogens.",
      "Soap breaks down the lipid membrane of bacteria and washes away viruses.",
      "The 5 critical handwashing moments: before eating, before feeding children, before cooking, after defecating, after cleaning a child's bottom.",
    ],
    actionSteps: [
      {
        step: "Step 1: Wet & Lather",
        detail: "Wet hands with clean water and apply soap to generate a rich lather."
      },
      {
        step: "Step 2: Scrub for 20 Seconds",
        detail: "Scrub palms, backs of hands, between fingers, and under fingernails."
      },
      {
        step: "Step 3: Rinse & Air Dry",
        detail: "Rinse thoroughly with clean running water and shake dry or dry with a clean, single-use cloth."
      },
    ],
  },
];

export const AWARENESS_QUIZZES: QuizQuestion[] = [
  {
    id: "q1",
    category: "Water Safety",
    question: "What is the single most reliable household method to kill all water-borne bacteria and viruses?",
    options: [
      "Adding raw alum (fitkari) and letting water settle",
      "Bringing water to a rolling boil for at least 1–3 minutes",
      "Filtering water through a single layer of cotton cloth",
      "Leaving water in the refrigerator overnight"
    ],
    correctIndex: 1,
    explanation: "Boiling water vigorously for 1 to 3 minutes kills 99.9% of bacteria, viruses, and parasites. Alum and cloth filters remove mud/turbidity, but do not destroy microscopic pathogens."
  },
  {
    id: "q2",
    category: "Emergency Care",
    question: "If ORS packets are not immediately available during severe diarrhea, how do you make the emergency homemade Sugar-Salt Solution (SSS)?",
    options: [
      "1 Liter water + 6 teaspoons Sugar + 1/2 teaspoon Salt",
      "1 Liter water + 10 teaspoons Salt + 1 teaspoon Sugar",
      "500ml water + 4 teaspoons Salt",
      "2 Liters water + 1 cup Honey + 1 teaspoon Baking Soda"
    ],
    correctIndex: 0,
    explanation: "The standard WHO-approved emergency solution is 6 level teaspoons of Sugar (30g) and 1/2 level teaspoon of Salt (2.5g) mixed into 1 Liter of clean drinking water."
  },
  {
    id: "q3",
    category: "Flood Safety",
    question: "What should you do with a tube well / handpump that was submerged during monsoon floods?",
    options: [
      "Drink from it immediately since underground aquifers are always sealed",
      "Paint the handle red and drink normally",
      "Pump out muddy water, disinfect with bleaching powder (shock chlorination), and test before consumption",
      "Boil only the first glass of the day"
    ],
    correctIndex: 2,
    explanation: "Submerged tube wells are frequently contaminated with surface sewage and flood runoff. They require pumping out, shock chlorination with bleaching powder, and safety testing."
  },
  {
    id: "q4",
    category: "Medical Red Flags",
    question: "Which of the following symptoms in a child with diarrhea requires IMMEDIATE transfer to a hospital / Primary Health Centre (PHC)?",
    options: [
      "Mild thirst",
      "Sunken eyes, extreme lethargy, inability to drink, or blood in stool",
      "Passing normal yellow urine",
      "Hunger for solid food"
    ],
    correctIndex: 1,
    explanation: "Sunken eyes, lethargy, inability to take fluids, and blood in stool are life-threatening red-flag indicators of severe dehydration and invasive bacterial dysentery."
  },
  {
    id: "q5",
    category: "Water Quality Testing",
    question: "What does 'Turbidity' in drinking water measure, and why is high turbidity dangerous?",
    options: [
      "Water sweetness level",
      "Cloudiness caused by suspended particles which shield harmful bacteria from chlorine disinfection",
      "Water temperature",
      "The amount of air dissolved in water"
    ],
    correctIndex: 1,
    explanation: "Turbidity measures water cloudiness. High turbidity (> 5 NTU) shields harmful bacteria and viruses from chlorine and UV disinfection, indicating runoff and pathogen intrusion."
  }
];
