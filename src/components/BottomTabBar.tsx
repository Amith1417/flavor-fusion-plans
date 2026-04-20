import { Home, UtensilsCrossed, Dumbbell, User, Moon, Sun, BookOpen } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const tabs = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Plan", icon: UtensilsCrossed, path: "/planner" },
  { label: "Diets", icon: BookOpen, path: "/diets" },
  { label: "Exercise", icon: Dumbbell, path: "/exercises" },
  { label: "Profile", icon: User, path: "/profile" },
];

export function BottomTabBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card border-t border-border">
      <div className="flex items-center justify-around h-16 px-2 pb-safe">
        {tabs.map((tab) => {
          const active = location.pathname === tab.path;
          return (
            <button
              key={tab.label}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors min-w-[52px] ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <tab.icon className={`h-5 w-5 ${active ? "stroke-[2.5]" : ""}`} />
              <span className="text-[10px] font-bold">{tab.label}</span>
            </button>
          );
        })}
        <button
          onClick={toggleTheme}
          className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors min-w-[52px] text-muted-foreground"
        >
          {dark ? <Sun className="h-5 w-5 text-warning" /> : <Moon className="h-5 w-5" />}
          <span className="text-[10px] font-bold">Theme</span>
        </button>
      </div>
    </nav>
  );
}
