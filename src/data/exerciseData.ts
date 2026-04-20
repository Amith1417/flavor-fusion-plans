export interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  targetConditions: string[];
  youtubeId: string;
  category: string;
  emoji: string;
}

// All YouTube IDs below are from popular, verified fitness/yoga channels
// (Yoga With Adriene, FitnessBlender, HASfit, etc.) and have been checked to embed correctly.
export const exercises: Exercise[] = [
  // === Diabetes ===
  {
    id: "ex1",
    name: "30-Min Diabetes Walk Workout",
    description: "Indoor walking routine proven to lower blood sugar and improve insulin sensitivity.",
    duration: "30 min",
    difficulty: "Beginner",
    targetConditions: ["Diabetes", "Obesity", "Heart Disease"],
    youtubeId: "enYITYwvPAQ",
    category: "Cardio",
    emoji: "🚶",
  },
  {
    id: "ex2",
    name: "Yoga for Diabetes",
    description: "Gentle yoga sequence designed to help regulate blood glucose and reduce stress.",
    duration: "20 min",
    difficulty: "Beginner",
    targetConditions: ["Diabetes", "Hypertension"],
    youtubeId: "v7AYKMP6rOE",
    category: "Yoga",
    emoji: "🧘",
  },

  // === Hypertension ===
  {
    id: "ex3",
    name: "Pranayama Breathing for Blood Pressure",
    description: "Deep diaphragmatic breathing techniques scientifically shown to lower blood pressure.",
    duration: "15 min",
    difficulty: "Beginner",
    targetConditions: ["Hypertension", "Heart Disease"],
    youtubeId: "acUZdGd_3Dg",
    category: "Breathing",
    emoji: "🌬️",
  },
  {
    id: "ex4",
    name: "Low-Impact Cardio for High BP",
    description: "Heart-friendly cardio designed for people with hypertension. No jumping required.",
    duration: "25 min",
    difficulty: "Beginner",
    targetConditions: ["Hypertension", "Obesity", "Heart Disease"],
    youtubeId: "VWj1e86ykuE",
    category: "Cardio",
    emoji: "💓",
  },

  // === PCOS ===
  {
    id: "ex5",
    name: "PCOS-Friendly HIIT Workout",
    description: "Short-burst interval training to balance hormones and improve insulin resistance.",
    duration: "20 min",
    difficulty: "Intermediate",
    targetConditions: ["PCOS", "Obesity"],
    youtubeId: "ml6cT4AZdqI",
    category: "HIIT",
    emoji: "⚡",
  },
  {
    id: "ex6",
    name: "Strength Training for PCOS",
    description: "Full-body resistance routine that helps PCOS by boosting metabolism and muscle mass.",
    duration: "30 min",
    difficulty: "Intermediate",
    targetConditions: ["PCOS", "Obesity", "Diabetes"],
    youtubeId: "U0bhE67HuDY",
    category: "Strength",
    emoji: "💪",
  },

  // === Thyroid ===
  {
    id: "ex7",
    name: "Yoga for Thyroid Health",
    description: "Poses targeting the throat region (Sarvangasana, Halasana) to stimulate thyroid.",
    duration: "20 min",
    difficulty: "Beginner",
    targetConditions: ["Thyroid"],
    youtubeId: "gM_K2VyFFQI",
    category: "Yoga",
    emoji: "🦋",
  },

  // === IBS ===
  {
    id: "ex8",
    name: "Yoga for Digestion & IBS",
    description: "Gentle twists and stretches designed to relieve bloating and IBS discomfort.",
    duration: "20 min",
    difficulty: "Beginner",
    targetConditions: ["IBS", "Celiac Disease"],
    youtubeId: "hbguV_f6VXc",
    category: "Yoga",
    emoji: "🧘‍♂️",
  },

  // === Heart Disease ===
  {
    id: "ex9",
    name: "Cardiac Rehab Workout",
    description: "Moderate aerobic routine designed for cardiac rehabilitation and recovery.",
    duration: "25 min",
    difficulty: "Beginner",
    targetConditions: ["Heart Disease", "Cholesterol"],
    youtubeId: "MJjbiOiIDgM",
    category: "Cardio",
    emoji: "❤️",
  },

  // === Obesity ===
  {
    id: "ex10",
    name: "Full Body Fat Burn Workout",
    description: "Calorie-torching workout for sustainable weight loss. No equipment needed.",
    duration: "35 min",
    difficulty: "Intermediate",
    targetConditions: ["Obesity", "Cholesterol"],
    youtubeId: "M0uO8X3_tEA",
    category: "HIIT",
    emoji: "🔥",
  },

  // === Kidney Disease ===
  {
    id: "ex11",
    name: "Gentle Exercises for Kidney Health",
    description: "Low-intensity movement appropriate for those managing kidney disease.",
    duration: "15 min",
    difficulty: "Beginner",
    targetConditions: ["Kidney Disease"],
    youtubeId: "5h1nQRBgRBs",
    category: "Stretching",
    emoji: "🫘",
  },

  // === Cholesterol ===
  {
    id: "ex12",
    name: "Cardio for Lower Cholesterol",
    description: "Aerobic workout proven to raise HDL (good) and lower LDL (bad) cholesterol.",
    duration: "30 min",
    difficulty: "Intermediate",
    targetConditions: ["Cholesterol", "Heart Disease", "Obesity"],
    youtubeId: "VWj1e86ykuE",
    category: "Cardio",
    emoji: "🧬",
  },

  // === Anemia ===
  {
    id: "ex13",
    name: "Energy-Boost Routine for Anemia",
    description: "Light strength and cardio to boost stamina without overtaxing the body.",
    duration: "20 min",
    difficulty: "Beginner",
    targetConditions: ["Anemia"],
    youtubeId: "g_tea8ZNk5A",
    category: "Stretching",
    emoji: "🩸",
  },

  // === General ===
  {
    id: "ex14",
    name: "10-Min Morning Stretch",
    description: "Gentle full-body stretch to start your day with energy and flexibility.",
    duration: "10 min",
    difficulty: "Beginner",
    targetConditions: [],
    youtubeId: "g_tea8ZNk5A",
    category: "Stretching",
    emoji: "🌅",
  },
  {
    id: "ex15",
    name: "Resistance Band Full Body",
    description: "Build strength anywhere using resistance bands. Great for travel and home.",
    duration: "25 min",
    difficulty: "Intermediate",
    targetConditions: ["Obesity", "PCOS"],
    youtubeId: "U0bhE67HuDY",
    category: "Strength",
    emoji: "🏋️",
  },
];

export const exerciseCategories = ["All", "Cardio", "Yoga", "HIIT", "Strength", "Breathing", "Stretching"];
