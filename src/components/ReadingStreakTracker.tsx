import { Flame, Check } from "lucide-react";
import { useLocal } from "@/hooks/useLocal";

const ReadingStreakTracker = () => {
  const [goal] = useLocal<number>('rt_goal', 25);
  const [week] = useLocal<boolean[]>('rt_week', [true, true, true, false, false, false, false]);
  const [streak] = useLocal<number>('rt_streak', 12);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const todayIndex = () => (new Date().getDay() + 6) % 7;
  
  // Mock today's pages for demo
  const todayPages = week[todayIndex()] ? goal : Math.floor(goal * 0.4);
  const dailyProgress = Math.round((todayPages / goal) * 100);

  return (
    <div className="rounded-2xl bg-zinc-900/80 border border-white/5 p-5 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <Flame className="h-5 w-5 text-rose-500" />
        <div>
          <p className="text-xs text-zinc-400 uppercase tracking-wide">Streak</p>
          <h3 className="text-lg font-bold text-white">{streak} Days</h3>
        </div>
      </div>

      <div className="space-y-4">
        {/* Week pills */}
        <div className="flex justify-between gap-1">
          {days.map((day, index) => (
            <div key={day} className="text-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                  week[index]
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {week[index] ? <Check className="h-3 w-3" /> : day.charAt(0)}
              </div>
              <p className="text-xs text-zinc-500 mt-1">{day}</p>
            </div>
          ))}
        </div>

        {/* Daily progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-300">
              {todayPages}/{goal} pages today
            </span>
            <span className="text-sm font-medium text-emerald-500">{dailyProgress}%</span>
          </div>

          <div className="w-full bg-zinc-800 rounded-full h-2">
            <div 
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(dailyProgress, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingStreakTracker;