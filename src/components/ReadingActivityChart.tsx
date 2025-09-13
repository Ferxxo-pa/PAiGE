import { Calendar } from "lucide-react";

const ReadingActivityChart = () => {
  // Generate sample data for the last 52 weeks
  const generateContributionData = () => {
    const data = [];
    const today = new Date();
    
    for (let week = 0; week < 52; week++) {
      const weekData = [];
      for (let day = 0; day < 7; day++) {
        const date = new Date(today);
        date.setDate(today.getDate() - (51 - week) * 7 - (6 - day));
        
        // Random reading activity (0-4 levels)
        const level = Math.floor(Math.random() * 5);
        weekData.push({
          date: date.toISOString().split('T')[0],
          level,
          pages: level * 25
        });
      }
      data.push(weekData);
    }
    
    return data;
  };

  const contributionData = generateContributionData();
  const totalPages = contributionData.flat().reduce((sum, day) => sum + day.pages, 0);

  const getLevelColor = (level: number) => {
    const colors = [
      'bg-zinc-800', // No activity
      'bg-emerald-500/20', // Low
      'bg-emerald-500/40', // Medium-low  
      'bg-emerald-500/60', // Medium-high
      'bg-emerald-500'  // High
    ];
    return colors[level];
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['S', 'M', 'T', 'W', 'R', 'F', 'S'];

  return (
    <div className="rounded-2xl bg-zinc-900/80 border border-white/5 p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-emerald-500" />
          <div>
            <p className="text-xs text-zinc-400 uppercase tracking-wide">Reading Activity</p>
            <h3 className="text-lg font-semibold text-white">This Year</h3>
          </div>
        </div>
        <span className="text-sm text-zinc-400">
          {totalPages.toLocaleString()} pages this year
        </span>
      </div>

      <div className="space-y-4">
        {/* Month labels */}
        <div className="flex justify-between text-xs text-zinc-500 px-4">
          {months.map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="flex flex-col gap-1 overflow-x-auto">
          {days.map((day, dayIndex) => (
            <div key={day} className="flex items-center gap-1">
              <div className="w-4 text-xs text-zinc-500 text-center flex-shrink-0">
                {day}
              </div>
              <div className="flex gap-1 min-w-fit">
                {contributionData.map((week, weekIndex) => (
                  <div
                    key={weekIndex}
                    className={`w-3 h-3 rounded-sm ${getLevelColor(week[dayIndex]?.level || 0)} transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/25 flex-shrink-0`}
                    title={`${week[dayIndex]?.pages || 0} pages on ${week[dayIndex]?.date}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-xs text-zinc-500">Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map(level => (
              <div
                key={level}
                className={`w-2 h-2 rounded-sm ${getLevelColor(level)}`}
              />
            ))}
          </div>
          <span className="text-xs text-zinc-500">More</span>
        </div>
      </div>
    </div>
  );
};

export default ReadingActivityChart;