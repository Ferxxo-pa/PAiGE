import { BarChart3, PieChart, TrendingUp, Clock, BookOpen, Zap } from "lucide-react";

const AnalyticsDashboard = () => {
  const stats = [
    {
      label: "Pages Read",
      value: "2,847",
      change: "+12%",
      icon: BookOpen,
      color: "text-neon-green",
      bgColor: "bg-neon-green/20"
    },
    {
      label: "Reading Time",
      value: "84h 32m",
      change: "+8%",
      icon: Clock,
      color: "text-neon-blue", 
      bgColor: "bg-neon-blue/20"
    },
    {
      label: "Books Finished",
      value: "23",
      change: "+15%",
      icon: TrendingUp,
      color: "text-neon-purple",
      bgColor: "bg-neon-purple/20"
    },
    {
      label: "Reading Speed",
      value: "245 wpm",
      change: "+3%",
      icon: Zap,
      color: "text-neon-yellow",
      bgColor: "bg-neon-yellow/20"
    }
  ];

  const genreData = [
    { genre: "Fiction", count: 8, color: "bg-neon-green" },
    { genre: "Sci-Fi", count: 6, color: "bg-neon-blue" },
    { genre: "Mystery", count: 4, color: "bg-neon-purple" },
    { genre: "Self-Help", count: 3, color: "bg-neon-yellow" },
    { genre: "Biography", count: 2, color: "bg-neon-red" }
  ];

  const maxGenreCount = Math.max(...genreData.map(g => g.count));

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="widget-card text-center">
            <div className={`inline-flex p-2 rounded-lg ${stat.bgColor} mb-2`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
            <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
            <div className="text-xs text-neon-green font-medium">{stat.change} this month</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Genre Distribution */}
        <div className="widget-card">
          <div className="flex items-center space-x-2 mb-4">
            <PieChart className="h-5 w-5 text-neon-purple" />
            <h3 className="text-lg font-semibold text-foreground">Genre Distribution</h3>
          </div>
          <div className="space-y-3">
            {genreData.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded ${item.color}`} />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-foreground">{item.genre}</span>
                    <span className="text-xs text-muted-foreground">{item.count} books</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${item.color} transition-all duration-300`}
                      style={{ width: `${(item.count / maxGenreCount) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reading Pace Chart */}
        <div className="widget-card">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="h-5 w-5 text-neon-blue" />
            <h3 className="text-lg font-semibold text-foreground">Reading Pace</h3>
          </div>
          <div className="space-y-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
              const height = Math.floor(Math.random() * 80) + 20;
              const isToday = index === 3; // Wednesday as today
              return (
                <div key={day} className="flex items-center space-x-3">
                  <div className="w-8 text-xs text-muted-foreground">{day}</div>
                  <div className="flex-1 flex items-center">
                    <div 
                      className={`h-4 rounded transition-all duration-300 ${
                        isToday 
                          ? 'bg-gradient-primary glow-primary' 
                          : 'bg-neon-blue/30 hover:bg-neon-blue/50'
                      }`}
                      style={{ width: `${height}%` }}
                    />
                    <span className="ml-2 text-xs text-muted-foreground">
                      {Math.floor((height / 100) * 60)} pages
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;