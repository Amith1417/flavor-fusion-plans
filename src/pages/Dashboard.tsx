import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Coffee, Moon, Cookie, Flame, TrendingUp, Droplets, Dumbbell, AlertTriangle } from "lucide-react";
import { type MealPlan, type MealItem, type UserProfile } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const mealSections = [
  { key: "breakfast" as const, label: "Breakfast", icon: Coffee, time: "7:00 - 8:30 AM" },
  { key: "lunch" as const, label: "Lunch", icon: Sun, time: "12:30 - 1:30 PM" },
  { key: "snacks" as const, label: "Snacks", icon: Cookie, time: "4:00 - 5:00 PM" },
  { key: "dinner" as const, label: "Dinner", icon: Moon, time: "7:30 - 8:30 PM" },
];

function MealCard({ item, index }: { item: MealItem; index: number }) {
  return (
    <motion.div
      className="glass-card-hover p-4 flex items-start justify-between gap-3"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex-1">
        <h4 className="font-medium text-sm mb-1">{item.name}</h4>
        <p className="text-xs text-muted-foreground">{item.benefits}</p>
      </div>
      <Badge variant="secondary" className="text-xs shrink-0">
        {item.calories} cal
      </Badge>
    </motion.div>
  );
}

export default function Dashboard() {
  const [plan, setPlan] = useState<MealPlan | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem("mealPlan");
    const storedProfile = sessionStorage.getItem("userProfile");
    if (stored) setPlan(JSON.parse(stored));
    if (storedProfile) setProfile(JSON.parse(storedProfile));
  }, []);

  if (!plan) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-6">
        <div className="glass-card p-10 text-center max-w-md">
          <Flame className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-display font-bold mb-2">No Diet Plan Yet</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Generate your personalized AI diet plan first
          </p>
          <Button
            onClick={() => navigate("/planner")}
            className="btn-glow bg-primary text-primary-foreground hover:bg-primary/90 font-display"
          >
            Go to Planner
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] px-6 py-10 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold mb-2">
          Your <span className="gradient-text">Diet Plan</span>
        </h1>
        <p className="text-muted-foreground mb-8">
          Personalized for {profile?.preference} diet
          {profile?.diseases.length ? ` · Managing ${profile.diseases.join(", ")}` : ""}
        </p>

        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Calories", value: `${plan.totalCalories}`, icon: Flame, unit: "kcal" },
            { label: "Water Intake", value: "3.2", icon: Droplets, unit: "liters" },
            { label: "Protein Target", value: "68", icon: Dumbbell, unit: "grams" },
            { label: "Risk Alerts", value: `${plan.riskAlerts.length}`, icon: AlertTriangle, unit: "items" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass-card p-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-display font-bold">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.unit}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Meal Sections */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {mealSections.map((section, si) => (
            <motion.div
              key={section.key}
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + si * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <section.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">{section.label}</h3>
                  <span className="text-xs text-muted-foreground">{section.time}</span>
                </div>
              </div>
              <div className="space-y-3">
                {plan[section.key].map((item, i) => (
                  <MealCard key={item.name} item={item} index={i} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Tracking (Static) */}
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Weekly Progress
          </h3>
          <div className="space-y-4">
            {[
              { label: "Calorie Goal", value: 78 },
              { label: "Hydration", value: 65 },
              { label: "Protein Intake", value: 82 },
              { label: "Fiber Intake", value: 55 },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-display font-semibold">{item.value}%</span>
                </div>
                <Progress value={item.value} className="h-2 bg-secondary" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
