import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ShieldAlert, Info, ArrowRight } from "lucide-react";
import { type MealPlan } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const severityConfig = {
  high: { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30", icon: ShieldAlert },
  medium: { color: "text-warning", bg: "bg-warning/10", border: "border-warning/30", icon: AlertTriangle },
  low: { color: "text-accent", bg: "bg-accent/10", border: "border-accent/30", icon: Info },
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
        <div className="glass-card p-10 text-center max-w-md">
          <ShieldAlert className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-display font-bold mb-2">No Risk Alerts</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            {plan ? "Your current diet plan has no risk alerts. Great!" : "Generate a diet plan to see personalized risk alerts."}
          </p>
          <Button
            onClick={() => navigate(plan ? "/dashboard" : "/planner")}
            className="btn-glow bg-primary text-primary-foreground hover:bg-primary/90 font-display"
          >
            {plan ? "View Dashboard" : "Go to Planner"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] px-6 py-10 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold mb-2">
          Risk <span className="gradient-text">Alerts</span>
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
                className={`glass-card p-5 border-l-4 ${config.border}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`h-9 w-9 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`h-4 w-4 ${config.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-semibold text-sm">{alert.food}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${config.bg} ${config.color} font-medium`}>
                        {alert.severity}
                      </span>
                      <span className="text-xs text-muted-foreground">· {alert.disease}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
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
