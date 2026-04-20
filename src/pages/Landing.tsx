import { motion } from "framer-motion";
import { ArrowRight, Brain, Shield, Apple, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroIllustration from "@/assets/hero-illustration.png";

const features = [
  { icon: Brain, title: "AI-Powered Plans", desc: "Personalized meal plans generated using smart algorithms" },
  { icon: Shield, title: "Risk Alerts", desc: "Warnings for foods that conflict with your conditions" },
  { icon: Apple, title: "Nutrition Tracking", desc: "Detailed calorie and nutrient breakdowns" },
  { icon: Activity, title: "Health Monitoring", desc: "Track your dietary progress over time" },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      {/* Hero */}
      <section className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 min-h-[75vh] px-6 lg:px-16 py-12">
        <div className="relative z-10 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold border border-primary/30 text-primary mb-5 bg-primary/5">
              🌿 AI-Powered Nutrition
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold leading-tight mb-5 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Eat Smart.{" "}
            <span className="text-primary">Live Better.</span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-muted-foreground max-w-md mb-8"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Generate personalized diet plans tailored to your health conditions, goals, and dietary preferences.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-start gap-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <Button
              size="lg"
              className="coral-btn px-8 h-12 text-base shadow-lg"
              onClick={() => navigate("/planner")}
            >
              Get Your Diet Plan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/5 font-bold text-base px-8 h-12 rounded-2xl"
              onClick={() => navigate("/diets")}
            >
              Browse Diets
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-muted-foreground hover:text-primary font-bold text-base px-8 h-12 rounded-2xl"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="relative z-10 max-w-sm lg:max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <img
            src={heroIllustration}
            alt="People enjoying healthy food together"
            width={800}
            height={600}
            className="w-full h-auto"
          />
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl font-display font-extrabold text-center mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Why <span className="text-primary">SmartPlate AI</span>?
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-center mb-10 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Science-backed nutrition meets intelligent technology
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="soft-card-hover p-6 text-center"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto soft-card p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 gradient-mint" />
          <h2 className="text-2xl font-display font-extrabold mb-3">
            Ready to transform your diet?
          </h2>
          <p className="text-muted-foreground mb-6">
            Join thousands who've improved their health with AI-powered nutrition
          </p>
          <Button
            size="lg"
            className="coral-btn px-8 h-12 text-base shadow-lg"
            onClick={() => navigate("/planner")}
          >
            Start Now — It's Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-display font-extrabold text-foreground">SmartPlate AI</span>
          <span>© 2026 SmartPlate AI. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
