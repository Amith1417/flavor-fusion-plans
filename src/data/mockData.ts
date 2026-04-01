import avocadoToast from "@/assets/avocado-toast.jpg";
import salmonSalad from "@/assets/salmon-salad.jpg";
import smoothieBowl from "@/assets/smoothie-bowl.jpg";
import chickenBroccoli from "@/assets/chicken-broccoli.jpg";
import mixedNuts from "@/assets/mixed-nuts.jpg";

export const diseases = [
  "Diabetes", "Hypertension", "PCOS", "Thyroid", "Heart Disease",
  "Kidney Disease", "Obesity", "Anemia", "Cholesterol", "IBS", "Celiac Disease"
];

export const dietaryPreferences = ["Vegetarian", "Non-Vegetarian", "Vegan"];

export interface MealItem {
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  benefits: string;
  image: string;
  mealTime: string;
  warning?: string;
}

export interface MealPlan {
  breakfast: MealItem[];
  lunch: MealItem[];
  snacks: MealItem[];
  dinner: MealItem[];
  totalCalories: number;
  totalProtein: number;
  totalFat: number;
  totalCarbs: number;
  goalCalories: number;
  riskAlerts: RiskAlert[];
}

export interface RiskAlert {
  food: string;
  disease: string;
  severity: "high" | "medium" | "low";
  message: string;
}

export interface UserProfile {
  name: string;
  age: number;
  weight: number;
  height: number;
  diseases: string[];
  preference: string;
}

export function generateMealPlan(profile: UserProfile): MealPlan {
  const isVeg = profile.preference === "Vegetarian" || profile.preference === "Vegan";

  const breakfast: MealItem[] = [
    {
      name: "Avocado Toast",
      calories: 280,
      protein: 12,
      fat: 15,
      carbs: 28,
      benefits: "Low Glycemic for blood sugar control",
      image: avocadoToast,
      mealTime: "Breakfast · 7am",
    },
  ];

  const lunch: MealItem[] = [
    {
      name: isVeg ? "Quinoa Buddha Bowl" : "Salmon Salad",
      calories: 350,
      protein: 25,
      fat: 15,
      carbs: 30,
      benefits: "Low Glycemic for blood pressure",
      image: salmonSalad,
      mealTime: "Lunch · 1pm",
    },
  ];

  const snacks: MealItem[] = [
    {
      name: "Mixed Nuts & Seeds",
      calories: 170,
      protein: 6,
      fat: 14,
      carbs: 8,
      benefits: "Healthy fats for heart health",
      image: mixedNuts,
      mealTime: "Snack · 4pm",
    },
    {
      name: "Berry Smoothie Bowl",
      calories: 200,
      protein: 8,
      fat: 4,
      carbs: 36,
      benefits: "Rich in antioxidants & vitamins",
      image: smoothieBowl,
      mealTime: "Snack · 11am",
    },
  ];

  const dinner: MealItem[] = [
    {
      name: isVeg ? "Palak Paneer & Roti" : "Grilled Chicken & Broccoli",
      calories: 400,
      protein: 30,
      fat: 18,
      carbs: 32,
      benefits: "High protein for muscle recovery",
      image: chickenBroccoli,
      mealTime: "Dinner · 7pm",
    },
  ];

  const riskAlerts: RiskAlert[] = [];

  if (profile.diseases.includes("Diabetes")) {
    riskAlerts.push(
      { food: "White Rice", disease: "Diabetes", severity: "high", message: "High glycemic index. Use brown rice or quinoa instead." },
      { food: "Sugary Beverages", disease: "Diabetes", severity: "high", message: "Avoid all sugary drinks. Opt for water or green tea." },
      { food: "Processed Foods", disease: "Diabetes", severity: "medium", message: "Hidden sugars in processed foods. Always check labels." }
    );
  }
  if (profile.diseases.includes("Hypertension")) {
    riskAlerts.push(
      { food: "Excess Salt", disease: "Hypertension", severity: "high", message: "Limit sodium to less than 1,500mg/day." },
      { food: "Red Meat", disease: "Hypertension", severity: "medium", message: "May increase blood pressure. Choose lean proteins." }
    );
  }
  if (profile.diseases.includes("PCOS")) {
    riskAlerts.push(
      { food: "Dairy Products", disease: "PCOS", severity: "medium", message: "Excess dairy may worsen hormonal imbalance." },
      { food: "Refined Carbs", disease: "PCOS", severity: "high", message: "Avoid white bread, maida. Choose whole grains." }
    );
  }
  if (profile.diseases.includes("Cholesterol")) {
    riskAlerts.push(
      { food: "Fried Foods", disease: "Cholesterol", severity: "high", message: "Avoid deep-fried foods. Use air-frying or baking." }
    );
  }

  const allMeals = [...breakfast, ...lunch, ...snacks, ...dinner];
  const totalCalories = allMeals.reduce((s, m) => s + m.calories, 0);
  const totalProtein = allMeals.reduce((s, m) => s + m.protein, 0);
  const totalFat = allMeals.reduce((s, m) => s + m.fat, 0);
  const totalCarbs = allMeals.reduce((s, m) => s + m.carbs, 0);

  return {
    breakfast, lunch, snacks, dinner,
    totalCalories, totalProtein, totalFat, totalCarbs,
    goalCalories: 2000,
    riskAlerts,
  };
}

export const chatbotResponses: Record<string, string> = {
  "hello": "Hello! I'm your SmartPlate AI assistant. How can I help you with your diet today? 😊",
  "help": "I can help you with:\n• Understanding your meal plan\n• Food substitutions\n• Nutritional advice\n• Managing diet with health conditions\n\nJust ask me anything!",
  "calories": "Your daily caloric needs depend on age, weight, activity level, and health goals. Based on your profile, I've optimized your meal plan to match your needs.",
  "diabetes": "For diabetes management, focus on low-GI foods, increase fiber intake, and eat at regular intervals. Avoid white rice, sugary drinks, and processed foods.",
  "weight loss": "For healthy weight loss, maintain a caloric deficit of 300-500 cal/day. Focus on protein-rich meals, plenty of vegetables, and stay hydrated.",
  "default": "That's a great question! Based on nutritional science, I'd recommend consulting your meal plan and following the risk alerts. Want more specific advice?",
};
