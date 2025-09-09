import { Target } from "lucide-react";

const GoalsTracker = () => {
  const weeklyGoal = 2;
  const booksReadThisWeek = 1;
  const progress = (booksReadThisWeek / weeklyGoal) * 100;

  return (
    <div className="widget-card text-center">
      <div className="flex items-center justify-center mb-2">
        <Target className="h-6 w-6 text-neon-blue glow-blue" />
      </div>
      <h3 className="text-sm font-medium text-muted-foreground mb-1">Weekly Goal</h3>
      <div className="text-2xl font-bold text-neon-blue mb-1">
        {booksReadThisWeek}/{weeklyGoal}
      </div>
      <div className="w-full bg-muted rounded-full h-1.5 mb-1">
        <div 
          className="bg-neon-blue h-1.5 rounded-full transition-all duration-300 glow-blue" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        {Math.round(progress)}% complete
      </p>
    </div>
  );
};

export default GoalsTracker;