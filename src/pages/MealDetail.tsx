import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { type MealItem, type MealPlan } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function NutriBadge({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="h-14 w-14 rounded-full border-[3px] flex items-center justify-center mb-1"
        style={{ borderColor: color }}
      >
        <span className="text-xs font-extrabold" style={{ color }}>{value}</span>
      </div>
      <span className="text-[10px] text-muted-foreground font-bold">{label}</span>
    </div>
  );
}

export default function MealDetail() {
  const { mealName } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState<MealItem | null>(null);

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
          <Button onClick={() => navigate("/dashboard")} variant="outline">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const ingredients = [
    `${meal.calories} kcal`,
    `${meal.protein}g Protein`,
    `${meal.fat}g Fat`,
    `${meal.carbs}g Carbs`,
    "Fresh vegetables",
  ];

  const steps = [
    { text: `Prepare ${meal.name} with fresh ingredients and spices.` },
    { text: "Season and cook to perfection for optimal nutrition." },
  ];

  return (
    <div className="min-h-screen pb-24 md:pb-8 bg-background">
      {/* Hero Image */}
      <div className="relative">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-56 sm:h-72 object-cover"
        />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 h-10 w-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-md"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
      </div>

      <div className="px-5 -mt-6 relative z-10 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="soft-card p-6 mb-4"
        >
          <h1 className="text-2xl font-display font-extrabold mb-4">{meal.name}</h1>

          {/* Nutritional badges */}
          <div className="flex justify-around mb-6">
            <NutriBadge value={`${meal.calories}`} label="kcal" color="hsl(155, 45%, 52%)" />
            <NutriBadge value={`${meal.protein}g`} label="P" color="hsl(220, 60%, 55%)" />
            <NutriBadge value={`${meal.fat}g`} label="F" color="hsl(38, 92%, 50%)" />
            <NutriBadge value={`${meal.carbs}g`} label="C" color="hsl(12, 80%, 62%)" />
          </div>
        </motion.div>

        {/* Why it's good */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="soft-card p-5 mb-4"
        >
          <h2 className="font-display font-extrabold mb-3">Why it's Good for You</h2>
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center gap-0.5 mt-1">
              <div className="h-3 w-3 rounded-full bg-destructive" />
              <div className="h-3 w-3 rounded-full bg-warning" />
              <div className="h-3 w-3 rounded-full bg-primary" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {meal.benefits}. This meal is carefully selected based on your health profile to support your dietary goals and overall wellness.
            </p>
          </div>
        </motion.div>

        {/* Ingredients & Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="soft-card p-5 mb-6"
        >
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-display font-extrabold mb-3">Ingredients</h3>
              <ul className="space-y-2.5">
                {ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-4 w-4 rounded border border-border flex items-center justify-center flex-shrink-0">
                      <Check className="h-2.5 w-2.5 text-primary opacity-0" />
                    </div>
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display font-extrabold mb-3">Instructions</h3>
              <ol className="space-y-3">
                {steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full gradient-mint flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-primary-foreground">{i + 1}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </motion.div>

        {/* Add to My Day button */}
        <Button
          className="coral-btn w-full h-14 text-lg shadow-xl mb-4"
          onClick={() => toast.success(`${meal.name} added to your day!`)}
        >
          Add to My Day
        </Button>
      </div>
    </div>
  );
}
