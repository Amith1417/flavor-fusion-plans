import { Home, UtensilsCrossed, Search, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Meal Plan", icon: UtensilsCrossed, path: "/planner" },
  { label: "Explore", icon: Search, path: "/dashboard" },
  { label: "Profile", icon: User, path: "/profile" },
];

export function BottomTabBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card border-t border-border">
      <div className="flex items-center justify-around h-16 px-2 pb-safe">
        {tabs.map((tab) => {
          const active = location.pathname === tab.path;
          return (
            <button
              key={tab.label}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors min-w-[60px] ${
                active
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <tab.icon className={`h-5 w-5 ${active ? "stroke-[2.5]" : ""}`} />
              <span className="text-[10px] font-bold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
