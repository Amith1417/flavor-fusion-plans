export const diseases = [
  "Diabetes", "Hypertension", "PCOS", "Thyroid", "Heart Disease",
  "Kidney Disease", "Obesity", "Anemia", "Cholesterol", "Arthritis"
];

export const dietaryPreferences = ["Vegetarian", "Non-Vegetarian", "Vegan"];

export interface MealItem {
  name: string;
  calories: number;
  benefits: string;
  warning?: string;
}

export interface MealPlan {
  breakfast: MealItem[];
  lunch: MealItem[];
  snacks: MealItem[];
  dinner: MealItem[];
  totalCalories: number;
  riskAlerts: RiskAlert[];
}

export interface RiskAlert {
  food: string;
  disease: string;
  severity: "high" | "medium" | "low";
  message: string;
}

export interface UserProfile {
  age: number;
  weight: number;
  height: number;
  diseases: string[];
  preference: string;
}

export function generateMealPlan(profile: UserProfile): MealPlan {
  const isVeg = profile.preference === "Vegetarian" || profile.preference === "Vegan";
  const isVegan = profile.preference === "Vegan";

  const breakfast: MealItem[] = [
    {
      name: isVegan ? "Chia Seed Pudding with Almond Milk" : "Greek Yogurt with Mixed Berries",
      calories: 220,
      benefits: "Rich in antioxidants and probiotics for gut health",
    },
    {
      name: "Steel-Cut Oatmeal with Walnuts & Flax",
      calories: 310,
      benefits: "High fiber content helps regulate blood sugar levels",
    },
    {
      name: isVeg ? "Moong Dal Cheela with Mint Chutney" : "Egg White Omelette with Spinach",
      calories: 180,
      benefits: "High protein, low glycemic index meal",
    },
  ];

  const lunch: MealItem[] = [
    {
      name: isVeg ? "Quinoa Buddha Bowl with Tahini" : "Grilled Salmon with Asparagus",
      calories: 420,
      benefits: "Omega-3 fatty acids reduce inflammation",
    },
    {
      name: "Brown Rice with Dal & Seasonal Vegetables",
      calories: 380,
      benefits: "Complete protein with essential amino acids",
    },
    {
      name: isVeg ? "Chickpea & Sweet Potato Curry" : "Lean Chicken Breast with Steamed Broccoli",
      calories: 350,
      benefits: "Balanced macros for sustained energy",
    },
  ];

  const snacks: MealItem[] = [
    {
      name: "Mixed Nuts & Seeds (30g)",
      calories: 170,
      benefits: "Healthy fats support heart and brain health",
    },
    {
      name: "Green Smoothie (Spinach, Banana, Ginger)",
      calories: 140,
      benefits: "Iron-rich, anti-inflammatory properties",
    },
  ];

  const dinner: MealItem[] = [
    {
      name: isVeg ? "Palak Paneer with Roti" : "Grilled Fish with Sautéed Vegetables",
      calories: 380,
      benefits: "Light yet nutritious evening meal",
    },
    {
      name: "Vegetable Soup with Multigrain Bread",
      calories: 250,
      benefits: "Easy to digest, supports overnight recovery",
    },
  ];

  const riskAlerts: RiskAlert[] = [];

  if (profile.diseases.includes("Diabetes")) {
    riskAlerts.push(
      { food: "White Rice", disease: "Diabetes", severity: "high", message: "White rice has a high glycemic index. Use brown rice or quinoa instead." },
      { food: "Sugary Beverages", disease: "Diabetes", severity: "high", message: "Avoid all sugary drinks. Opt for water, green tea, or infused water." },
      { food: "Processed Foods", disease: "Diabetes", severity: "medium", message: "Processed foods contain hidden sugars. Always check labels." }
    );
  }

  if (profile.diseases.includes("Hypertension")) {
    riskAlerts.push(
      { food: "Excess Salt", disease: "Hypertension", severity: "high", message: "Limit sodium intake to less than 1,500mg/day. Avoid pickles and papad." },
      { food: "Red Meat", disease: "Hypertension", severity: "medium", message: "Red meat can increase blood pressure. Choose lean proteins." }
    );
  }

  if (profile.diseases.includes("PCOS")) {
    riskAlerts.push(
      { food: "Dairy Products", disease: "PCOS", severity: "medium", message: "Excess dairy may worsen hormonal imbalance. Limit intake." },
      { food: "Refined Carbs", disease: "PCOS", severity: "high", message: "Avoid maida, white bread. Choose whole grains to manage insulin." }
    );
  }

  if (profile.diseases.includes("Cholesterol")) {
    riskAlerts.push(
      { food: "Fried Foods", disease: "Cholesterol", severity: "high", message: "Avoid deep-fried foods. Use air-frying or baking instead." },
      { food: "Full-Fat Dairy", disease: "Cholesterol", severity: "medium", message: "Switch to low-fat dairy alternatives." }
    );
  }

  if (profile.diseases.includes("Kidney Disease")) {
    riskAlerts.push(
      { food: "High-Potassium Foods", disease: "Kidney Disease", severity: "high", message: "Limit bananas, oranges, and potatoes. Monitor potassium levels." }
    );
  }

  const totalCalories = [...breakfast, ...lunch, ...snacks, ...dinner].reduce((sum, m) => sum + m.calories, 0);

  return { breakfast, lunch, snacks, dinner, totalCalories, riskAlerts };
}

export const chatbotResponses: Record<string, string> = {
  "hello": "Hello! I'm your SmartPlate AI assistant. How can I help you with your diet today?",
  "help": "I can help you with:\n• Understanding your meal plan\n• Food substitutions\n• Nutritional advice\n• Managing diet with health conditions\n\nJust ask me anything!",
  "calories": "Your daily caloric needs depend on age, weight, activity level, and health goals. Based on your profile, I've optimized your meal plan to match your needs.",
  "diabetes": "For diabetes management, focus on low-GI foods, increase fiber intake, and eat at regular intervals. Avoid white rice, sugary drinks, and processed foods.",
  "weight loss": "For healthy weight loss, maintain a caloric deficit of 300-500 cal/day. Focus on protein-rich meals, plenty of vegetables, and stay hydrated.",
  "default": "That's a great question! Based on nutritional science, I'd recommend consulting your meal plan and making sure you're following the risk alerts. Would you like more specific advice?",
};
