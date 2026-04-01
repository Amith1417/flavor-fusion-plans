import { motion } from "framer-motion";
import { ArrowRight, Brain, Shield, Apple, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const features = [
  { icon: Brain, title: "AI-Powered Plans", desc: "Personalized meal plans generated using advanced AI algorithms" },
  { icon: Shield, title: "Risk Alerts", desc: "Real-time warnings for foods that conflict with your conditions" },
  { icon: Apple, title: "Nutrition Tracking", desc: "Detailed calorie and nutrient breakdowns for every meal" },
  { icon: Activity, title: "Health Monitoring", desc: "Track your dietary progress and health improvements" },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      {/* Hero */}
      <section className="relative flex items-center justify-center min-h-[80vh] px-6 overflow-hidden">
        {/* BG glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-accent/8 blur-[100px] pointer-events-none" />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium border border-primary/30 text-primary mb-6 backdrop-blur-sm">
              AI-Powered Nutrition
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Eat Smart.{" "}
            <span className="gradient-text">Live Better.</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            Generate personalized diet plans tailored to your health conditions, goals, and dietary preferences — powered by AI.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="btn-glow bg-primary text-primary-foreground hover:bg-primary/90 font-display text-base px-8"
              onClick={() => navigate("/planner")}
            >
              Get Your Diet Plan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-secondary font-display text-base px-8"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl font-display font-bold text-center mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Why <span className="gradient-text">SmartPlate AI</span>?
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-center mb-12 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Science-backed nutrition meets intelligent technology
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="glass-card-hover p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto glass-card p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/5 blur-[80px] pointer-events-none" />
          <h2 className="text-3xl font-display font-bold mb-4 relative z-10">
            Ready to transform your diet?
          </h2>
          <p className="text-muted-foreground mb-8 relative z-10">
            Join thousands who've improved their health with AI-powered nutrition
          </p>
          <Button
            size="lg"
            className="btn-glow bg-primary text-primary-foreground hover:bg-primary/90 font-display relative z-10"
            onClick={() => navigate("/planner")}
          >
            Start Now — It's Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-display font-semibold text-foreground">SmartPlate AI</span>
          <span>© 2026 SmartPlate AI. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
