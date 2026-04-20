// Detailed metadata for each diet plan, used in the /diets browse page.
export interface DietPlanInfo {
  name: string;
  tagline: string;
  description: string;
  icon: string;
  goodFor: string[];     // health conditions this diet supports
  avoidIf: string[];     // conditions this diet may not be ideal for
  highlights: string[];  // bullet points
  sampleDay: { meal: string; food: string }[];
  macros: { protein: number; carbs: number; fat: number }; // %
  difficulty: "Easy" | "Moderate" | "Strict";
  color: string; // tailwind class for accent
}

export const dietPlansInfo: DietPlanInfo[] = [
  {
    name: "Vegetarian",
    tagline: "Plant-forward with dairy & eggs",
    description:
      "A balanced eating pattern based on vegetables, fruits, whole grains, legumes, dairy, and eggs. Easy to maintain, high in fiber and antioxidants.",
    icon: "🥬",
    goodFor: ["Heart Disease", "Cholesterol", "Obesity", "Diabetes"],
    avoidIf: ["Anemia"],
    highlights: ["High in fiber", "Rich in antioxidants", "Sustainable", "Beginner-friendly"],
    sampleDay: [
      { meal: "Breakfast", food: "Avocado toast with poached egg" },
      { meal: "Lunch", food: "Quinoa Buddha bowl with chickpeas" },
      { meal: "Snack", food: "Greek yogurt + berries" },
      { meal: "Dinner", food: "Palak paneer with whole-wheat roti" },
    ],
    macros: { protein: 20, carbs: 55, fat: 25 },
    difficulty: "Easy",
    color: "text-green-500",
  },
  {
    name: "Non-Vegetarian",
    tagline: "Balanced omnivore plate",
    description:
      "Includes lean meats, fish, poultry alongside vegetables and grains. Excellent for protein needs and muscle building.",
    icon: "🍗",
    goodFor: ["Anemia", "Obesity", "PCOS"],
    avoidIf: ["Cholesterol", "Heart Disease"],
    highlights: ["High-quality protein", "Iron-rich", "Omega-3 from fish", "Versatile"],
    sampleDay: [
      { meal: "Breakfast", food: "Egg-white omelette with veggies" },
      { meal: "Lunch", food: "Grilled salmon salad" },
      { meal: "Snack", food: "Greek yogurt parfait" },
      { meal: "Dinner", food: "Grilled chicken with broccoli" },
    ],
    macros: { protein: 30, carbs: 40, fat: 30 },
    difficulty: "Easy",
    color: "text-rose-500",
  },
  {
    name: "Vegan",
    tagline: "100% plant-based",
    description:
      "No animal products at all. Emphasizes whole grains, legumes, nuts, seeds, fruits, and vegetables. Strong cardiovascular and metabolic benefits.",
    icon: "🌱",
    goodFor: ["Heart Disease", "Cholesterol", "Diabetes", "Obesity"],
    avoidIf: ["Anemia", "Thyroid"],
    highlights: ["Lowest cholesterol impact", "High fiber", "Plant antioxidants", "Eco-friendly"],
    sampleDay: [
      { meal: "Breakfast", food: "Chia pudding with berries" },
      { meal: "Lunch", food: "Lentil & kale stew" },
      { meal: "Snack", food: "Hummus with veggie sticks" },
      { meal: "Dinner", food: "Tofu stir-fry with quinoa" },
    ],
    macros: { protein: 18, carbs: 60, fat: 22 },
    difficulty: "Moderate",
    color: "text-emerald-500",
  },
  {
    name: "Jain",
    tagline: "Sattvic, no root vegetables",
    description:
      "Follows the principles of non-violence — excludes onion, garlic, potatoes, and other root vegetables. Focuses on above-ground produce, legumes, and grains.",
    icon: "🙏",
    goodFor: ["IBS", "Cholesterol"],
    avoidIf: ["Anemia"],
    highlights: ["Easy to digest", "Mindful eating", "No root veggies", "Spiritual focus"],
    sampleDay: [
      { meal: "Breakfast", food: "Sabudana khichdi" },
      { meal: "Lunch", food: "Moong dal cheela" },
      { meal: "Snack", food: "Dry fruit ladoo" },
      { meal: "Dinner", food: "Paneer tikka (no onion/garlic)" },
    ],
    macros: { protein: 18, carbs: 58, fat: 24 },
    difficulty: "Moderate",
    color: "text-amber-500",
  },
  {
    name: "Keto",
    tagline: "High fat, very low carb",
    description:
      "70% fat, 25% protein, 5% carbs. Forces your body into ketosis to burn fat for fuel. Powerful for rapid weight loss and blood sugar control.",
    icon: "🥑",
    goodFor: ["Obesity", "Diabetes", "PCOS"],
    avoidIf: ["Kidney Disease", "Heart Disease", "Cholesterol"],
    highlights: ["Rapid fat loss", "Stable energy", "Reduces sugar cravings", "Mental clarity"],
    sampleDay: [
      { meal: "Breakfast", food: "Bulletproof coffee + eggs" },
      { meal: "Lunch", food: "Avocado chicken salad" },
      { meal: "Snack", food: "Cheese & almonds" },
      { meal: "Dinner", food: "Salmon with cauliflower mash" },
    ],
    macros: { protein: 25, carbs: 5, fat: 70 },
    difficulty: "Strict",
    color: "text-violet-500",
  },
  {
    name: "Mediterranean",
    tagline: "Olive oil, fish & whole grains",
    description:
      "Inspired by Greece and Southern Italy. Emphasizes olive oil, fish, whole grains, vegetables, nuts, and moderate red wine. Considered the gold standard for heart health.",
    icon: "🫒",
    goodFor: ["Heart Disease", "Cholesterol", "Diabetes", "Hypertension"],
    avoidIf: [],
    highlights: ["#1 for heart health", "Anti-inflammatory", "Sustainable lifestyle", "Delicious"],
    sampleDay: [
      { meal: "Breakfast", food: "Greek yogurt with honey & walnuts" },
      { meal: "Lunch", food: "Mediterranean grain bowl" },
      { meal: "Snack", food: "Olives & feta plate" },
      { meal: "Dinner", food: "Baked sea bass with vegetables" },
    ],
    macros: { protein: 20, carbs: 45, fat: 35 },
    difficulty: "Easy",
    color: "text-blue-500",
  },
  {
    name: "Paleo",
    tagline: "Eat like our ancestors",
    description:
      "Whole foods only — meat, fish, vegetables, fruit, nuts, seeds. Excludes grains, legumes, dairy, and processed foods. Anti-inflammatory and nutrient-dense.",
    icon: "🦴",
    goodFor: ["Obesity", "PCOS", "Celiac Disease", "IBS"],
    avoidIf: ["Kidney Disease"],
    highlights: ["No processed food", "Grain-free", "Nutrient-dense", "Stable blood sugar"],
    sampleDay: [
      { meal: "Breakfast", food: "Sweet potato hash & eggs" },
      { meal: "Lunch", food: "Grilled chicken & avocado salad" },
      { meal: "Snack", food: "Trail mix" },
      { meal: "Dinner", food: "Herb-crusted lamb with veggies" },
    ],
    macros: { protein: 30, carbs: 30, fat: 40 },
    difficulty: "Strict",
    color: "text-orange-500",
  },
  {
    name: "DASH",
    tagline: "Designed to lower blood pressure",
    description:
      "Dietary Approaches to Stop Hypertension. Low-sodium, rich in potassium, magnesium, and calcium. Clinically proven to reduce blood pressure within weeks.",
    icon: "💚",
    goodFor: ["Hypertension", "Heart Disease", "Cholesterol", "Diabetes"],
    avoidIf: [],
    highlights: ["Doctor-recommended", "Lowers BP", "Heart-healthy", "Family-friendly"],
    sampleDay: [
      { meal: "Breakfast", food: "Oatmeal with banana & flaxseed" },
      { meal: "Lunch", food: "Turkey & veggie wrap" },
      { meal: "Snack", food: "Unsalted almonds & apple" },
      { meal: "Dinner", food: "Baked cod with steamed broccoli" },
    ],
    macros: { protein: 20, carbs: 55, fat: 25 },
    difficulty: "Easy",
    color: "text-teal-500",
  },
  {
    name: "Whole30",
    tagline: "30-day reset",
    description:
      "Strict 30-day elimination of sugar, alcohol, grains, legumes, dairy, and additives. Designed to identify food sensitivities and reset eating habits.",
    icon: "🔥",
    goodFor: ["IBS", "Celiac Disease", "Obesity", "PCOS"],
    avoidIf: ["Anemia"],
    highlights: ["Clear food triggers", "Reset cravings", "30-day commitment", "Whole foods only"],
    sampleDay: [
      { meal: "Breakfast", food: "Veggie frittata (no dairy)" },
      { meal: "Lunch", food: "Grilled shrimp & zucchini noodles" },
      { meal: "Snack", food: "Cashew butter & celery" },
      { meal: "Dinner", food: "Herb roasted chicken with sweet potato" },
    ],
    macros: { protein: 28, carbs: 35, fat: 37 },
    difficulty: "Strict",
    color: "text-red-500",
  },
];
