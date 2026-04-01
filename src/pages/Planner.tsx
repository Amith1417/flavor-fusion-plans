import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, Check } from "lucide-react";
import { diseases, dietaryPreferences, generateMealPlan, type UserProfile, type MealPlan } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

export default function Planner() {
  const navigate = useNavigate();
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);
  const [preference, setPreference] = useState("Vegetarian");
  const [loading, setLoading] = useState(false);

  const toggleDisease = (d: string) => {
    setSelectedDiseases((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  };

  const handleGenerate = () => {
    if (!age || !weight || !height) return;

    setLoading(true);
    const profile: UserProfile = {
      age: parseInt(age),
      weight: parseFloat(weight),
      height: parseFloat(height),
      diseases: selectedDiseases,
      preference,
    };

    setTimeout(() => {
      const plan = generateMealPlan(profile);
      setLoading(false);
      // Store in sessionStorage for dashboard
      sessionStorage.setItem("mealPlan", JSON.stringify(plan));
      sessionStorage.setItem("userProfile", JSON.stringify(profile));
      navigate("/dashboard");
    }, 2500);
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] px-6 py-10 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold mb-2">
          Diet <span className="gradient-text">Planner</span>
        </h1>
        <p className="text-muted-foreground mb-8">
          Tell us about yourself and we'll create a personalized meal plan
        </p>

        <div className="glass-card p-6 sm:p-8 space-y-8">
          {/* Body Metrics */}
          <div>
            <h3 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              Body Metrics
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Age</Label>
                <Input
                  type="number"
                  placeholder="25"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Weight (kg)</Label>
                <Input
                  type="number"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Height (cm)</Label>
                <Input
                  type="number"
                  placeholder="170"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="bg-secondary border-border"
                />
              </div>
            </div>
          </div>

          {/* Health Conditions */}
          <div>
            <h3 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              Health Conditions
            </h3>
            <div className="flex flex-wrap gap-2">
              {diseases.map((d) => (
                <button
                  key={d}
                  onClick={() => toggleDisease(d)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    selectedDiseases.includes(d)
                      ? "bg-primary/15 border-primary/40 text-primary"
                      : "bg-secondary border-border text-muted-foreground hover:border-primary/20"
                  }`}
                >
                  {selectedDiseases.includes(d) && <Check className="inline h-3 w-3 mr-1" />}
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Dietary Preference */}
          <div>
            <h3 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              Dietary Preference
            </h3>
            <div className="flex gap-3">
              {dietaryPreferences.map((p) => (
                <button
                  key={p}
                  onClick={() => setPreference(p)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    preference === p
                      ? "bg-primary/15 border-primary/40 text-primary"
                      : "bg-secondary border-border text-muted-foreground hover:border-primary/20"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={loading || !age || !weight || !height}
            className="w-full btn-glow bg-primary text-primary-foreground hover:bg-primary/90 font-display text-base h-12"
            size="lg"
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.span key="loading" className="flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Your Plan...
                </motion.span>
              ) : (
                <motion.span key="idle" className="flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate AI Diet Plan
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
