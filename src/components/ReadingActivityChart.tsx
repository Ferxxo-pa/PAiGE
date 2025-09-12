import { Calendar } from "lucide-react";

const ReadingActivityChart = () => {
  // Generate proper GitHub-style heatmap data
  const generateHeatmapData = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    
    // Find the Monday of the first week of the year
    const jan1 = new Date(currentYear, 0, 1);
    const firstMonday = new Date(jan1);
    const dayOfWeek = jan1.getDay();
    const daysToMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek; // If Sunday, go to next Monday
    firstMonday.setDate(jan1.getDate() + (dayOfWeek === 1 ? 0 : daysToMonday));
    
    // If Jan 1 is Monday-Thursday, start from that week's Monday
    if (dayOfWeek >= 1 && dayOfWeek <= 4) {
      firstMonday.setDate(jan1.getDate() - (dayOfWeek - 1));
    }
    
    const weeks = [];
    const startDate = new Date(firstMonday);
    
    // Calculate number of weeks to show (up to 53)
    const weeksToShow = Math.min(53, Math.ceil((today.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1);
    
    for (let weekIndex = 0; weekIndex < weeksToShow; weekIndex++) {
      const week = [];
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + weekIndex * 7 + dayIndex);
        
        // Don't show future dates
        if (date > today) {
          week.push(null);
          continue;
        }
        
        // Generate random pages (0-80 range)
        const pages = Math.floor(Math.random() * 81);
        
        week.push({
          date: date.toISOString().split('T')[0],
          pages,
          dateObj: new Date(date)
        });
      }
      weeks.push(week);
    }
    
    return weeks;
  };

  const heatmapData = generateHeatmapData();
  const totalPages = heatmapData.flat().filter(Boolean).reduce((sum, day) => sum + day.pages, 0);

  // Color buckets based on pages per day
  const getPagesBucket = (pages: number) => {
    if (pages === 0) return 'bg-zinc-800';
    if (pages <= 10) return 'bg-emerald-700/70';
    if (pages <= 25) return 'bg-emerald-600';
    if (pages <= 50) return 'bg-emerald-500';
    return 'bg-emerald-400';
  };

  // Generate month labels aligned with weeks
  const getMonthLabels = () => {
    const labels = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    heatmapData.forEach((week, weekIndex) => {
      const firstDay = week.find(day => day !== null);
      if (firstDay) {
        const date = firstDay.dateObj;
        const isFirstWeekOfMonth = date.getDate() <= 7;
        if (isFirstWeekOfMonth || weekIndex === 0) {
          labels.push({
            week: weekIndex,
            month: months[date.getMonth()]
          });
        } else {
          labels.push(null);
        }
      } else {
        labels.push(null);
      }
    });
    
    return labels;
  };

  const monthLabels = getMonthLabels();
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="rounded-2xl bg-zinc-900/80 border border-white/5 p-5 backdrop-blur-sm h-full">
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
        <div className="flex gap-1 pl-8 text-xs text-zinc-500">
          {monthLabels.map((label, index) => (
            <div key={index} className="w-3 text-center">
              {label ? label.month : ''}
            </div>
          ))}
        </div>

        {/* GitHub-style heatmap grid */}
        <div className="flex flex-col gap-1">
          {days.map((day, dayIndex) => (
            <div key={day} className="flex items-center gap-1">
              <div className="w-6 text-xs text-zinc-500 text-right">
                {dayIndex % 2 === 0 ? day.slice(0, 1) : ''}
              </div>
              <div className="flex gap-1">
                {heatmapData.map((week, weekIndex) => {
                  const dayData = week[dayIndex];
                  return (
                    <div
                      key={weekIndex}
                      className={`w-3 h-3 rounded-sm ${dayData ? getPagesBucket(dayData.pages) : 'bg-zinc-800'} 
                        transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/25 cursor-pointer`}
                      title={dayData ? `${dayData.date} — ${dayData.pages} pages` : ''}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-xs text-zinc-500">Less</span>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-sm bg-zinc-800" />
            <div className="w-2 h-2 rounded-sm bg-emerald-700/70" />
            <div className="w-2 h-2 rounded-sm bg-emerald-600" />
            <div className="w-2 h-2 rounded-sm bg-emerald-500" />
            <div className="w-2 h-2 rounded-sm bg-emerald-400" />
          </div>
          <span className="text-xs text-zinc-500">More</span>
        </div>
      </div>
    </div>
  );
};

export default ReadingActivityChart;