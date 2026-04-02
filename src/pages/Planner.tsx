import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, Check, ChevronRight, ChevronLeft } from "lucide-react";
import { diseases, diseaseIcons, dietaryPreferences, dietIcons, dietDescriptions, generateMealPlan, type UserProfile } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import healthAdvisor from "@/assets/health-advisor.png";
import healthCouple from "@/assets/health-couple.png";

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
    <div className="min-h-[calc(100vh-3.5rem)] px-5 py-8 max-w-lg mx-auto">
      {/* Mobile Header */}
      <div className="flex items-center justify-between mb-6 md:hidden">
        {step > 1 ? (
          <button onClick={() => setStep(step - 1)} className="p-1">
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
        ) : (
          <div className="w-7" />
        )}
        <h2 className="text-base font-bold font-display">
          {step === 1 ? "Health Profile" : step === 2 ? "Health Profile" : "Diet Preference"}
        </h2>
        <div className="w-7" />
      </div>

      {/* Progress */}
      <div className="mb-6">
        <p className="text-xs font-bold text-muted-foreground mb-2 text-center">
          Step {step} of {totalSteps}: {step === 1 ? "Personal Info" : step === 2 ? "Health Conditions" : "Preferences"}
        </p>
        <div className="flex gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                i < step ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
            <h1 className="text-2xl md:text-3xl font-display font-extrabold mb-1">
              Health Profile
            </h1>
            <p className="text-muted-foreground text-sm mb-6">Tell us about yourself</p>

            <div className="soft-card p-5 space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground">Your Name</Label>
                <Input
                  placeholder="Alex"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-secondary/50 border-border rounded-xl h-11"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Age</Label>
                  <Input type="number" placeholder="25" value={age} onChange={(e) => setAge(e.target.value)} className="bg-secondary/50 border-border rounded-xl h-11" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Weight (kg)</Label>
                  <Input type="number" placeholder="70" value={weight} onChange={(e) => setWeight(e.target.value)} className="bg-secondary/50 border-border rounded-xl h-11" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Height (cm)</Label>
                  <Input type="number" placeholder="170" value={height} onChange={(e) => setHeight(e.target.value)} className="bg-secondary/50 border-border rounded-xl h-11" />
                </div>
              </div>

              <Button onClick={() => setStep(2)} className="w-full coral-btn h-12 text-base shadow-lg mt-2">
                Continue <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-display font-extrabold mb-1">
                  Select Your<br />Conditions
                </h1>
                <p className="text-muted-foreground text-sm mb-6">
                  Choose your conditions to select<br />your health profile.
                </p>
              </div>
              <img src={healthAdvisor} alt="" className="w-20 h-20 md:w-24 md:h-24 object-contain -mt-2" loading="lazy" width={512} height={512} />
            </div>

            <div className="soft-card p-5 space-y-5">
              <div className="flex flex-wrap gap-2.5">
                {diseases.map((d) => (
                  <button
                    key={d}
                    onClick={() => toggleDisease(d)}
                    className={`px-4 py-2.5 rounded-2xl text-sm font-bold transition-all duration-200 border-2 flex items-center gap-1.5 ${
                      selectedDiseases.includes(d)
                        ? "bg-primary/10 border-primary text-primary scale-[1.02]"
                        : "bg-card border-border text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    <span className="text-base">{diseaseIcons[d]}</span>
                    {selectedDiseases.includes(d) && <Check className="h-3.5 w-3.5" />}
                    {d}
                  </button>
                ))}
              </div>

              <Button onClick={() => setStep(3)} className="w-full coral-btn h-12 text-base shadow-lg">
                Continue <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="flex justify-end mt-4">
              <img src={healthCouple} alt="" className="w-28 h-28 md:w-32 md:h-32 object-contain" loading="lazy" width={512} height={512} />
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
            <h1 className="text-2xl md:text-3xl font-display font-extrabold mb-1">
              Dietary Preference
            </h1>
            <p className="text-muted-foreground text-sm mb-6">Choose your diet style</p>

            <div className="soft-card p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {dietaryPreferences.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPreference(p)}
                    className={`px-4 py-4 rounded-2xl text-left font-bold transition-all duration-200 border-2 ${
                      preference === p
                        ? "bg-primary/10 border-primary text-primary scale-[1.02]"
                        : "bg-card border-border text-foreground hover:border-primary/30"
                    }`}
                  >
                    <span className="text-2xl block mb-1">{dietIcons[p]}</span>
                    <span className="text-sm font-extrabold block">{p}</span>
                    <span className="text-[11px] text-muted-foreground font-medium block mt-0.5">{dietDescriptions[p]}</span>
                    {preference === p && <Check className="h-4 w-4 mt-1 text-primary" />}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1 h-12 rounded-2xl font-bold text-base border-border">
                  Back
                </Button>
                <Button onClick={handleGenerate} disabled={loading} className="flex-1 coral-btn h-12 text-base shadow-lg">
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.span key="loading" className="flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                      </motion.span>
                    ) : (
                      <motion.span key="idle" className="flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Sparkles className="mr-2 h-4 w-4" /> Generate Plan
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
