import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { type MealItem, type MealPlan } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Mock ingredient data per meal type
const ingredientSets: Record<string, { name: string; emoji: string }[]> = {
  default: [
    { name: "Fresh Greens", emoji: "🥬" },
    { name: "Olive Oil", emoji: "🫒" },
    { name: "Lemon", emoji: "🍋" },
    { name: "Garlic", emoji: "🧄" },
    { name: "Tomatoes", emoji: "🍅" },
    { name: "Black Pepper", emoji: "🌶️" },
  ],
  breakfast: [
    { name: "Oats", emoji: "🌾" },
    { name: "Banana", emoji: "🍌" },
    { name: "Honey", emoji: "🍯" },
    { name: "Almonds", emoji: "🥜" },
    { name: "Blueberries", emoji: "🫐" },
    { name: "Milk", emoji: "🥛" },
  ],
  lunch: [
    { name: "Brown Rice", emoji: "🍚" },
    { name: "Spinach", emoji: "🥬" },
    { name: "Chickpeas", emoji: "🫘" },
    { name: "Avocado", emoji: "🥑" },
    { name: "Olive Oil", emoji: "🫒" },
    { name: "Lemon", emoji: "🍋" },
  ],
  dinner: [
    { name: "Quinoa", emoji: "🌾" },
    { name: "Broccoli", emoji: "🥦" },
    { name: "Bell Pepper", emoji: "🫑" },
    { name: "Tofu", emoji: "🧈" },
    { name: "Soy Sauce", emoji: "🥫" },
    { name: "Ginger", emoji: "🫚" },
  ],
  snack: [
    { name: "Almonds", emoji: "🥜" },
    { name: "Apple", emoji: "🍎" },
    { name: "Yogurt", emoji: "🥛" },
    { name: "Chia Seeds", emoji: "🌱" },
    { name: "Coconut", emoji: "🥥" },
    { name: "Dark Choc", emoji: "🍫" },
  ],
};

const toppingOptions = [
  { name: "Raisins", emoji: "🍇" },
  { name: "Apples", emoji: "🍎" },
  { name: "Basil", emoji: "🌿" },
  { name: "Carrots", emoji: "🥕" },
  { name: "Chickpeas", emoji: "🫘" },
  { name: "Cilantro", emoji: "🌿" },
  { name: "Walnuts", emoji: "🥜" },
  { name: "Seeds", emoji: "🌻" },
  { name: "Berries", emoji: "🫐" },
];

type Tab = "bases" | "toppings" | "extras";

function getMealCategory(mealTime: string): string {
  const lower = mealTime.toLowerCase();
  if (lower.includes("breakfast")) return "breakfast";
  if (lower.includes("lunch")) return "lunch";
  if (lower.includes("dinner")) return "dinner";
  if (lower.includes("snack")) return "snack";
  return "default";
}

export default function MealDetail() {
  const { mealName } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState<MealItem | null>(null);
  const [showCustomize, setShowCustomize] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("bases");
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

  useEffect(() => {
    const stored = sessionStorage.getItem("mealPlan");
    if (stored) {
      const plan: MealPlan = JSON.parse(stored);
      const allMeals = [...plan.breakfast, ...plan.lunch, ...plan.snacks, ...plan.dinner];
      const found = allMeals.find(
        (m) => m.name.toLowerCase().replace(/\s+/g, "-") === mealName
      );
      if (found) setMeal(found);
    }
  }, [mealName]);

  if (!meal) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-6 pb-20">
        <div className="soft-card p-10 text-center">
          <p className="text-muted-foreground mb-4">Meal not found</p>
          <Button onClick={() => navigate("/dashboard")} variant="outline">Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const category = getMealCategory(meal.mealTime);
  const ingredients = ingredientSets[category] || ingredientSets.default;

  const toggleTopping = (name: string) => {
    setSelectedToppings((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : prev.length < 10 ? [...prev, name] : prev
    );
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "bases", label: "Bases" },
    { key: "toppings", label: "Toppings" },
    { key: "extras", label: "Extras" },
  ];

  return (
    <div className="min-h-screen pb-24 md:pb-8 bg-background">
      <AnimatePresence mode="wait">
        {!showCustomize ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -50 }}
          >
            {/* Hero */}
            <div className="relative bg-card">
              <button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 z-20 h-10 w-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-md"
              >
                <ArrowLeft className="h-5 w-5 text-foreground" />
              </button>
              <div className="flex items-center justify-center pt-10 pb-6 px-6">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="h-48 w-48 sm:h-56 sm:w-56 rounded-3xl object-cover shadow-2xl"
                />
              </div>
            </div>

            <div className="px-5 max-w-lg mx-auto">
              {/* Title & calories */}
              <div className="py-5">
                <h1 className="text-2xl font-display font-extrabold text-foreground">{meal.name}</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {meal.calories} cal — {meal.mealTime}
                </p>
              </div>

              {/* Ingredients grid */}
              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Ingredients</h3>
                <div className="grid grid-cols-3 gap-3">
                  {ingredients.map((ing, i) => (
                    <motion.div
                      key={ing.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="soft-card p-3 flex flex-col items-center gap-1.5 text-center"
                    >
                      <span className="text-2xl">{ing.emoji}</span>
                      <span className="text-[11px] font-bold text-foreground leading-tight">{ing.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Nutrition bar */}
              <div className="soft-card p-4 mb-6">
                <div className="flex justify-around">
                  {[
                    { label: "Protein", value: `${meal.protein}g`, color: "text-primary" },
                    { label: "Fat", value: `${meal.fat}g`, color: "text-warning" },
                    { label: "Carbs", value: `${meal.carbs}g`, color: "text-accent" },
                  ].map((n) => (
                    <div key={n.label} className="text-center">
                      <span className={`text-lg font-display font-extrabold ${n.color}`}>{n.value}</span>
                      <p className="text-[10px] text-muted-foreground font-medium">{n.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why it works */}
              <div className="soft-card p-4 mb-6">
                <h3 className="font-display font-extrabold text-sm mb-2">Why this works</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{meal.benefits}. Carefully selected for your health profile.</p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 mb-4">
                <Button
                  variant="outline"
                  className="flex-1 h-13 rounded-2xl border-2 border-foreground/20 font-bold text-foreground"
                  onClick={() => setShowCustomize(true)}
                >
                  Modify
                </Button>
                <Button
                  className="flex-1 h-13 rounded-2xl font-bold text-base bg-[hsl(160,30%,20%)] hover:bg-[hsl(160,30%,15%)] text-primary-foreground"
                  onClick={() => {
                    toast.success(`${meal.name} added to your day!`);
                    navigate("/dashboard");
                  }}
                >
                  Add to My Day
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="customize"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="min-h-screen"
          >
            {/* Customize view */}
            <div className="px-5 py-6 max-w-lg mx-auto">
              <h1 className="text-2xl font-display font-extrabold text-foreground">{meal.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">{meal.calories} cal</p>

              {/* Selected items */}
              {selectedToppings.length > 0 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {selectedToppings.map((name) => {
                    const topping = toppingOptions.find((t) => t.name === name);
                    return (
                      <div key={name} className="relative soft-card p-3 flex flex-col items-center gap-1 min-w-[72px]">
                        <button
                          onClick={() => toggleTopping(name)}
                          className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-foreground text-background rounded-full flex items-center justify-center"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <span className="text-xl">{topping?.emoji}</span>
                        <span className="text-[10px] font-bold text-foreground">{name}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tabs */}
              <div className="flex border-b border-border mt-5 mb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 py-3 text-sm font-bold transition-colors ${
                      activeTab === tab.key
                        ? "border-b-2 border-foreground text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Toppings label */}
              <p className="text-sm text-muted-foreground mb-3">
                {activeTab === "toppings"
                  ? `Toppings (${selectedToppings.length}/10)`
                  : activeTab === "bases"
                  ? "Base ingredients"
                  : "Extra add-ons"}
              </p>

              {/* Grid */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {(activeTab === "toppings" ? toppingOptions : activeTab === "bases" ? ingredients : ingredients.slice(0, 3)).map((item, i) => {
                  const isSelected = selectedToppings.includes(item.name);
                  return (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => activeTab === "toppings" && toggleTopping(item.name)}
                      className={`soft-card p-4 flex flex-col items-center gap-2 transition-all ${
                        isSelected ? "ring-2 ring-primary bg-primary/5" : ""
                      }`}
                    >
                      <span className="text-3xl">{item.emoji}</span>
                      <span className="text-[11px] font-bold text-foreground">{item.name}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Bottom buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-13 rounded-2xl border-2 border-foreground/20 font-bold"
                  onClick={() => setShowCustomize(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 h-13 rounded-2xl font-bold text-base bg-[hsl(160,30%,20%)] hover:bg-[hsl(160,30%,15%)] text-primary-foreground"
                  onClick={() => {
                    toast.success(`Customized ${meal.name} saved!`);
                    setShowCustomize(false);
                  }}
                >
                  I'm done
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
