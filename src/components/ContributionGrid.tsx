import { Calendar } from "lucide-react";

const ContributionGrid = () => {
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
      'bg-muted', // No activity
      'bg-neon-green/20', // Low
      'bg-neon-green/40', // Medium-low  
      'bg-neon-green/60', // Medium-high
      'bg-neon-green/80'  // High
    ];
    return colors[level];
  };

  const getLevelGlow = (level: number) => {
    if (level === 0) return '';
    return level >= 3 ? 'glow-primary' : '';
  };

  return (
    <div className="widget-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-neon-green" />
          <h3 className="text-lg font-semibold text-foreground">Reading Activity</h3>
        </div>
        <div className="text-sm text-muted-foreground">
          {totalPages.toLocaleString()} pages this year
        </div>
      </div>

      <div className="space-y-1">
        {/* Month labels */}
        <div className="flex justify-between text-xs text-muted-foreground mb-2 px-2">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
            <span key={month}>{month}</span>
          ))}
        </div>

        {/* Day labels */}
        <div className="flex flex-col space-y-1">
          {['Mon', 'Wed', 'Fri'].map((day, dayIndex) => (
            <div key={day} className="flex items-center space-x-1">
              <div className="w-6 text-xs text-muted-foreground text-right">
                {dayIndex === 1 ? day : ''}
              </div>
              <div className="flex space-x-1">
                {contributionData.map((week, weekIndex) => (
                  <div
                    key={weekIndex}
                    className={`w-3 h-3 rounded-sm ${getLevelColor(week[dayIndex * 2 + 1]?.level || 0)} ${getLevelGlow(week[dayIndex * 2 + 1]?.level || 0)} transition-all duration-200 hover:scale-110`}
                    title={`${week[dayIndex * 2 + 1]?.pages || 0} pages on ${week[dayIndex * 2 + 1]?.date}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <span className="text-xs text-muted-foreground">Less</span>
          <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map(level => (
              <div
                key={level}
                className={`w-2 h-2 rounded-sm ${getLevelColor(level)}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">More</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionGrid;