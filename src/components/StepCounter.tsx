import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Footprints, Target, TrendingUp, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepData {
  date: string;
  steps: number;
  goal: number;
}

function getStoredSteps(): StepData[] {
  const stored = localStorage.getItem("stepHistory");
  return stored ? JSON.parse(stored) : [];
}

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

export function StepCounter() {
  const [dailyGoal, setDailyGoal] = useState(8000);
  const [todaySteps, setTodaySteps] = useState(0);
  const [history, setHistory] = useState<StepData[]>([]);

  useEffect(() => {
    const h = getStoredSteps();
    setHistory(h);
    const today = h.find((d) => d.date === getTodayKey());
    if (today) {
      setTodaySteps(today.steps);
      setDailyGoal(today.goal);
    }
    const storedGoal = localStorage.getItem("stepGoal");
    if (storedGoal) setDailyGoal(parseInt(storedGoal));
  }, []);

  const saveSteps = (steps: number) => {
    const key = getTodayKey();
    const h = getStoredSteps();
    const idx = h.findIndex((d) => d.date === key);
    const entry: StepData = { date: key, steps, goal: dailyGoal };
    if (idx >= 0) h[idx] = entry;
    else h.push(entry);
    localStorage.setItem("stepHistory", JSON.stringify(h.slice(-30)));
    setHistory(h);
    setTodaySteps(steps);
  };

  const addSteps = (amount: number) => {
    const next = Math.max(0, todaySteps + amount);
    saveSteps(next);
  };

  const percentage = Math.min((todaySteps / dailyGoal) * 100, 100);
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (percentage / 100) * circumference;

  // Last 7 days for mini chart
  const last7 = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().split("T")[0];
    const entry = history.find((h) => h.date === key);
    return { day: d.toLocaleDateString("en", { weekday: "short" }).slice(0, 2), steps: entry?.steps || 0 };
  });
  const maxSteps = Math.max(...last7.map((d) => d.steps), dailyGoal);

  return (
    <div className="soft-card p-6">
      <h3 className="font-display font-extrabold mb-4 flex items-center gap-2">
        <Footprints className="h-4 w-4 text-primary" />
        Step Counter
      </h3>

      <div className="flex items-center gap-6">
        {/* Circular progress */}
        <div className="relative w-40 h-40 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="70" fill="none" stroke="hsl(var(--secondary))" strokeWidth="10" />
            <motion.circle
              cx="80" cy="80" r="70" fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Footprints className="h-5 w-5 text-primary mb-1" />
            <span className="text-2xl font-display font-extrabold">{todaySteps.toLocaleString()}</span>
            <span className="text-[10px] text-muted-foreground font-medium">/ {dailyGoal.toLocaleString()}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-full" onClick={() => addSteps(-500)}>
              <Minus className="h-3 w-3" />
            </Button>
            <Button className="flex-1 h-9 text-xs font-bold rounded-xl" onClick={() => addSteps(500)}>
              <Plus className="h-3 w-3 mr-1" /> Add 500 Steps
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-full" onClick={() => addSteps(1000)}>
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Target className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground font-medium">Goal:</span>
            <select
              value={dailyGoal}
              onChange={(e) => {
                const v = parseInt(e.target.value);
                setDailyGoal(v);
                localStorage.setItem("stepGoal", String(v));
              }}
              className="bg-secondary rounded-lg px-2 py-1 text-xs font-bold border-0 text-foreground"
            >
              {[5000, 6000, 8000, 10000, 12000, 15000].map((g) => (
                <option key={g} value={g}>{g.toLocaleString()} steps</option>
              ))}
            </select>
          </div>

          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-primary" />
            <span className="font-bold text-primary">{Math.round(percentage)}%</span> of daily goal
          </div>
        </div>
      </div>

      {/* Weekly mini chart */}
      <div className="mt-5 pt-4 border-t border-border">
        <p className="text-[11px] font-bold text-muted-foreground mb-2">This Week</p>
        <div className="flex items-end justify-between gap-1 h-16">
          {last7.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <div className="w-full bg-secondary rounded-t-sm relative" style={{ height: "48px" }}>
                <motion.div
                  className="absolute bottom-0 w-full bg-primary rounded-t-sm"
                  initial={{ height: 0 }}
                  animate={{ height: `${maxSteps > 0 ? (d.steps / maxSteps) * 100 : 0}%` }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                />
              </div>
              <span className="text-[9px] text-muted-foreground font-medium">{d.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
