import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ShieldAlert, Info, ArrowRight } from "lucide-react";
import { type MealPlan } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const severityConfig = {
  high: { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30", icon: ShieldAlert, label: "High Risk" },
  medium: { color: "text-warning", bg: "bg-warning/10", border: "border-warning/30", icon: AlertTriangle, label: "Medium Risk" },
  low: { color: "text-primary", bg: "bg-primary/10", border: "border-primary/30", icon: Info, label: "Low Risk" },
};

export default function Alerts() {
  const [plan, setPlan] = useState<MealPlan | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem("mealPlan");
    if (stored) setPlan(JSON.parse(stored));
  }, []);

  if (!plan || plan.riskAlerts.length === 0) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-6">
        <div className="soft-card p-10 text-center max-w-md">
          <ShieldAlert className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-display font-extrabold mb-2">No Risk Alerts</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            {plan ? "Your diet plan has no risk alerts. Great job! 🎉" : "Generate a diet plan to see personalized risk alerts."}
          </p>
          <Button
            onClick={() => navigate(plan ? "/dashboard" : "/planner")}
            className="coral-btn px-8 h-12 text-base shadow-lg"
          >
            {plan ? "View Dashboard" : "Go to Planner"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] px-6 py-10 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-extrabold mb-2">
          Risk Alerts ⚠️
        </h1>
        <p className="text-muted-foreground mb-8">
          Foods to avoid or limit based on your health conditions
        </p>

        <div className="space-y-4">
          {plan.riskAlerts.map((alert, i) => {
            const config = severityConfig[alert.severity];
            const Icon = config.icon;
            return (
              <motion.div
                key={i}
                className={`soft-card p-5 border-l-4 ${config.border}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`h-10 w-10 rounded-2xl ${config.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`h-4 w-4 ${config.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-bold text-sm">{alert.food}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${config.bg} ${config.color} font-bold`}>
                        {config.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{alert.disease}</p>
                    <p className="text-sm text-foreground/80">{alert.message}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
