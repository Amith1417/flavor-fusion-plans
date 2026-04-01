import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, Check, ChevronRight } from "lucide-react";
import { diseases, dietaryPreferences, generateMealPlan, type UserProfile } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

export default function Planner() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
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
    setLoading(true);
    const profile: UserProfile = {
      name: name || "Alex",
      age: parseInt(age) || 25,
      weight: parseFloat(weight) || 70,
      height: parseFloat(height) || 170,
      diseases: selectedDiseases,
      preference,
    };

    setTimeout(() => {
      const plan = generateMealPlan(profile);
      setLoading(false);
      sessionStorage.setItem("mealPlan", JSON.stringify(plan));
      sessionStorage.setItem("userProfile", JSON.stringify(profile));
      navigate("/dashboard");
    }, 2500);
  };

  const totalSteps = 3;

  return (
    <div className="min-h-[calc(100vh-3.5rem)] px-6 py-10 max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Progress */}
        <div className="mb-8">
          <p className="text-xs font-bold text-muted-foreground mb-3">
            Step {step} of {totalSteps}: {step === 1 ? "Personal Info" : step === 2 ? "Health Conditions" : "Preferences"}
          </p>
          <div className="flex gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i < step ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="text-3xl font-display font-extrabold mb-2">
                Health Profile
              </h1>
              <p className="text-muted-foreground mb-8">Tell us about yourself</p>

              <div className="soft-card p-6 space-y-5">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-muted-foreground">Your Name</Label>
                  <Input
                    placeholder="Alex"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-secondary/50 border-border rounded-xl h-11"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-muted-foreground">Age</Label>
                    <Input
                      type="number"
                      placeholder="25"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="bg-secondary/50 border-border rounded-xl h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-muted-foreground">Weight (kg)</Label>
                    <Input
                      type="number"
                      placeholder="70"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="bg-secondary/50 border-border rounded-xl h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-muted-foreground">Height (cm)</Label>
                    <Input
                      type="number"
                      placeholder="170"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="bg-secondary/50 border-border rounded-xl h-11"
                    />
                  </div>
                </div>

                <Button
                  onClick={() => setStep(2)}
                  className="w-full coral-btn h-12 text-base shadow-lg"
                >
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="text-3xl font-display font-extrabold mb-2">
                Select Your Conditions
              </h1>
              <p className="text-muted-foreground mb-8">Choose your health conditions</p>

              <div className="soft-card p-6 space-y-5">
                <div className="flex flex-wrap gap-3">
                  {diseases.map((d) => (
                    <button
                      key={d}
                      onClick={() => toggleDisease(d)}
                      className={`px-4 py-2.5 rounded-2xl text-sm font-bold transition-all duration-200 border-2 ${
                        selectedDiseases.includes(d)
                          ? "bg-primary/10 border-primary text-primary"
                          : "bg-card border-border text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      {selectedDiseases.includes(d) && <Check className="inline h-3.5 w-3.5 mr-1.5" />}
                      {d}
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 h-12 rounded-2xl font-bold text-base border-border"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    className="flex-1 coral-btn h-12 text-base shadow-lg"
                  >
                    Continue
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="text-3xl font-display font-extrabold mb-2">
                Dietary Preference
              </h1>
              <p className="text-muted-foreground mb-8">Choose your diet style</p>

              <div className="soft-card p-6 space-y-5">
                <div className="space-y-3">
                  {dietaryPreferences.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPreference(p)}
                      className={`w-full px-5 py-4 rounded-2xl text-left font-bold transition-all duration-200 border-2 flex items-center justify-between ${
                        preference === p
                          ? "bg-primary/10 border-primary text-primary"
                          : "bg-card border-border text-foreground hover:border-primary/30"
                      }`}
                    >
                      <span>{p === "Vegetarian" ? "🥬" : p === "Vegan" ? "🌱" : "🍗"} {p}</span>
                      {preference === p && <Check className="h-4 w-4" />}
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="flex-1 h-12 rounded-2xl font-bold text-base border-border"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="flex-1 coral-btn h-12 text-base shadow-lg"
                  >
                    <AnimatePresence mode="wait">
                      {loading ? (
                        <motion.span key="loading" className="flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </motion.span>
                      ) : (
                        <motion.span key="idle" className="flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate Plan
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
