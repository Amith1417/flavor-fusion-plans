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

export const exercises: Exercise[] = [
  // Diabetes
  {
    id: "ex1",
    name: "Walking Routine",
    description: "A brisk 30-minute walk to help regulate blood sugar levels and improve insulin sensitivity.",
    duration: "30 min",
    difficulty: "Beginner",
    targetConditions: ["Diabetes", "Obesity", "Heart Disease"],
    youtubeId: "njeZ29umqVE",
    category: "Cardio",
    emoji: "🚶",
  },
  {
    id: "ex2",
    name: "Chair Yoga for Diabetes",
    description: "Gentle seated yoga poses to reduce stress and improve glucose metabolism.",
    duration: "20 min",
    difficulty: "Beginner",
    targetConditions: ["Diabetes", "Hypertension"],
    youtubeId: "KEjiXtb2hRg",
    category: "Yoga",
    emoji: "🧘",
  },
  // Hypertension
  {
    id: "ex3",
    name: "Deep Breathing Exercises",
    description: "Breathing techniques that help lower blood pressure naturally.",
    duration: "15 min",
    difficulty: "Beginner",
    targetConditions: ["Hypertension", "Heart Disease"],
    youtubeId: "tybOi4hjZFQ",
    category: "Breathing",
    emoji: "🌬️",
  },
  {
    id: "ex4",
    name: "Low-Impact Cardio",
    description: "Heart-friendly cardio workout designed for people with hypertension.",
    duration: "25 min",
    difficulty: "Beginner",
    targetConditions: ["Hypertension", "Obesity"],
    youtubeId: "VWj1e86ykuE",
    category: "Cardio",
    emoji: "💓",
  },
  // PCOS
  {
    id: "ex5",
    name: "PCOS-Friendly HIIT",
    description: "Short interval training to improve hormonal balance and insulin resistance.",
    duration: "20 min",
    difficulty: "Intermediate",
    targetConditions: ["PCOS", "Obesity"],
    youtubeId: "ml6cT4AZdqI",
    category: "HIIT",
    emoji: "⚡",
  },
  {
    id: "ex6",
    name: "Strength Training Basics",
    description: "Full body strength routine to boost metabolism and manage PCOS symptoms.",
    duration: "30 min",
    difficulty: "Intermediate",
    targetConditions: ["PCOS", "Obesity", "Diabetes"],
    youtubeId: "U0bhE67HuDY",
    category: "Strength",
    emoji: "💪",
  },
  // Thyroid
  {
    id: "ex7",
    name: "Gentle Neck & Thyroid Yoga",
    description: "Yoga poses targeting the throat area to stimulate thyroid function.",
    duration: "20 min",
    difficulty: "Beginner",
    targetConditions: ["Thyroid"],
    youtubeId: "VprzBUMT1z0",
    category: "Yoga",
    emoji: "🦋",
  },
  // IBS
  {
    id: "ex8",
    name: "Digestive Yoga Flow",
    description: "Gentle twists and stretches to improve digestion and relieve IBS symptoms.",
    duration: "20 min",
    difficulty: "Beginner",
    targetConditions: ["IBS", "Celiac Disease"],
    youtubeId: "hbguV_f6VXc",
    category: "Yoga",
    emoji: "🧘‍♂️",
  },
  // Heart Disease
  {
    id: "ex9",
    name: "Heart-Safe Aerobic Workout",
    description: "Moderate aerobic exercises designed for cardiac rehabilitation.",
    duration: "25 min",
    difficulty: "Beginner",
    targetConditions: ["Heart Disease", "Cholesterol"],
    youtubeId: "VWj1e86ykuE",
    category: "Cardio",
    emoji: "❤️",
  },
  // Obesity
  {
    id: "ex10",
    name: "Full Body Fat Burn",
    description: "A comprehensive workout designed for weight management and fat loss.",
    duration: "35 min",
    difficulty: "Intermediate",
    targetConditions: ["Obesity", "Cholesterol"],
    youtubeId: "ml6cT4AZdqI",
    category: "HIIT",
    emoji: "🔥",
  },
  // General
  {
    id: "ex11",
    name: "Morning Stretching Routine",
    description: "A gentle full-body stretch to start your day with flexibility and energy.",
    duration: "15 min",
    difficulty: "Beginner",
    targetConditions: [],
    youtubeId: "g_tea8ZNk5A",
    category: "Stretching",
    emoji: "🌅",
  },
  {
    id: "ex12",
    name: "Resistance Band Workout",
    description: "Build strength with minimal equipment using resistance bands.",
    duration: "25 min",
    difficulty: "Intermediate",
    targetConditions: ["Anemia", "Obesity"],
    youtubeId: "U0bhE67HuDY",
    category: "Strength",
    emoji: "🏋️",
  },
];

export const exerciseCategories = ["All", "Cardio", "Yoga", "HIIT", "Strength", "Breathing", "Stretching"];
