import { Calendar } from "lucide-react";

const ReadingActivityChart = () => {
  // Generate proper GitHub-style heatmap data
  const generateContributionData = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    
    // Find the Monday of the first week of the year
    const jan1 = new Date(currentYear, 0, 1);
    const startOfYear = new Date(jan1);
    const dayOfWeek = jan1.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Monday = 0
    startOfYear.setDate(jan1.getDate() - daysToSubtract);
    
    const weeks = [];
    const currentDate = new Date(startOfYear);
    
    // Generate up to 53 weeks
    while (currentDate <= today && weeks.length < 53) {
      const week = [];
      for (let day = 0; day < 7; day++) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const pages = Math.floor(Math.random() * 80); // 0-79 pages
        
        week.push({
          date: dateStr,
          pages,
          month: currentDate.getMonth(),
          isCurrentYear: currentDate.getFullYear() === currentYear
        });
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
      weeks.push(week);
    }
    
    return weeks;
  };

  const contributionData = generateContributionData();
  const totalPages = contributionData.flat()
    .filter(day => day.isCurrentYear)
    .reduce((sum, day) => sum + day.pages, 0);

  const getColorByPages = (pages: number) => {
    if (pages === 0) return 'bg-zinc-800';
    if (pages <= 10) return 'bg-emerald-700/70';
    if (pages <= 25) return 'bg-emerald-600';
    if (pages <= 50) return 'bg-emerald-500';
    return 'bg-emerald-400';
  };

  // Generate month labels
  const getMonthLabels = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const labels = [];
    let lastMonth = -1;
    
    contributionData.forEach((week, weekIndex) => {
      const firstDay = week[0];
      if (firstDay && firstDay.month !== lastMonth && firstDay.isCurrentYear) {
        labels.push({
          month: months[firstDay.month],
          weekIndex
        });
        lastMonth = firstDay.month;
      }
    });
    
    return labels;
  };

  const monthLabels = getMonthLabels();

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="rounded-2xl bg-zinc-900/80 border border-white/5 p-5 backdrop-blur-sm overflow-hidden w-full">
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
        <div className="relative ml-9">
          <div 
            className="grid gap-1 text-xs text-zinc-500"
            style={{ 
              gridTemplateColumns: `repeat(${contributionData.length}, clamp(9px, 1.1vw, 12px))`,
            }}
          >
            {monthLabels.map((label, index) => (
              <div 
                key={index}
                className="text-left"
                style={{ gridColumnStart: label.weekIndex + 1 }}
              >
                {label.month}
              </div>
            ))}
          </div>
        </div>

        {/* GitHub-style heatmap grid */}
        <div className="flex">
          {/* Day labels */}
          <div className="flex flex-col gap-1 w-8 text-xs text-zinc-500 text-right pr-2">
            {days.map((day, dayIndex) => (
              <div 
                key={day} 
                className="flex items-center justify-end"
                style={{ height: 'clamp(9px, 1.1vw, 12px)' }}
              >
                {dayIndex % 2 === 0 ? day : ''}
              </div>
            ))}
          </div>
          
          {/* Heatmap cells */}
          <div 
            className="grid gap-1"
            style={{ 
              gridTemplateColumns: `repeat(${contributionData.length}, clamp(9px, 1.1vw, 12px))`,
              gridTemplateRows: 'repeat(7, clamp(9px, 1.1vw, 12px))'
            }}
          >
            {contributionData.map((week, weekIndex) =>
              week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`rounded-[2px] transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/25 cursor-pointer ${getColorByPages(day.pages)}`}
                  style={{ 
                    gridColumn: weekIndex + 1,
                    gridRow: dayIndex + 1,
                    width: 'clamp(9px, 1.1vw, 12px)',
                    height: 'clamp(9px, 1.1vw, 12px)'
                  }}
                  title={`${day.date} — ${day.pages} pages`}
                />
              ))
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-xs text-zinc-500">Less</span>
          <div className="flex gap-1">
            {[0, 10, 25, 50, 75].map((pages, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-[2px] ${getColorByPages(pages)}`}
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