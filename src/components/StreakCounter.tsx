import { Flame } from "lucide-react";

const StreakCounter = () => {
  const streakDays = 12;
  const maxStreak = 25;

  return (
    <div className="widget-card text-center">
      <div className="flex items-center justify-center mb-2">
        <Flame className="h-6 w-6 text-neon-red glow-red" />
      </div>
      <h3 className="text-sm font-medium text-muted-foreground mb-1">Reading Streak</h3>
      <div className="text-3xl font-bold text-neon-red mb-1">{streakDays}</div>
      <p className="text-xs text-muted-foreground">
        days • best: {maxStreak}
      </p>
    </div>
  );
};

export default StreakCounter;