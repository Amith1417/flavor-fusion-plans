import { Flame, Trophy, Calendar } from "lucide-react";
import { useStreak } from "@/hooks/useStreak";

export function StreakCard() {
  const { currentStreak, longestStreak, last7Days } = useStreak();

  return (
    <div className="soft-card p-5">
      <h3 className="font-display font-extrabold mb-4 flex items-center gap-2 text-sm">
        <Flame className="h-4 w-4 text-accent" />
        Daily Streak
      </h3>

      <div className="flex items-center gap-6 mb-4">
        <div className="text-center">
          <div className="text-3xl font-display font-extrabold text-accent">{currentStreak}</div>
          <span className="text-[10px] text-muted-foreground font-medium">Current</span>
        </div>
        <div className="h-10 w-px bg-border" />
        <div className="text-center">
          <div className="flex items-center gap-1 text-lg font-display font-extrabold text-primary">
            <Trophy className="h-4 w-4" />
            {longestStreak}
          </div>
          <span className="text-[10px] text-muted-foreground font-medium">Best</span>
        </div>
      </div>

      {/* 7-day heatmap */}
      <div className="flex items-center justify-between gap-1">
        {last7Days.map((d) => (
          <div key={d.date} className="flex flex-col items-center gap-1">
            <div
              className={`h-7 w-7 rounded-lg flex items-center justify-center text-[10px] font-bold transition-colors ${
                d.active
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {d.active ? "✓" : "·"}
            </div>
            <span className="text-[9px] text-muted-foreground">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
