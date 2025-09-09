import { Play, Pause, Book, Clock } from "lucide-react";
import { useState } from "react";

const CurrentlyReadingWidget = () => {
  const [isReading, setIsReading] = useState(false);
  const [currentPage, setCurrentPage] = useState(187);
  const totalPages = 432;
  const progress = (currentPage / totalPages) * 100;

  return (
    <div className="widget-card h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Currently Reading</h3>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">2h 34m today</span>
        </div>
      </div>

      <div className="flex items-start space-x-4">
        {/* Book Cover Placeholder */}
        <div className="flex-shrink-0 w-16 h-24 bg-gradient-secondary rounded-lg flex items-center justify-center">
          <Book className="h-8 w-8 text-white" />
        </div>

        {/* Book Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate">The Midnight Library</h4>
          <p className="text-sm text-muted-foreground mb-2">by Matt Haig</p>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="relative w-full bg-muted rounded-full h-2">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-primary rounded-full transition-all duration-300 glow-primary"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Page {currentPage} of {totalPages}</span>
              <span className="text-neon-green font-medium">{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Reading Controls */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => setIsReading(!isReading)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isReading 
                  ? 'bg-neon-red/20 text-neon-red hover:bg-neon-red/30' 
                  : 'bg-neon-green/20 text-neon-green hover:bg-neon-green/30 glow-primary'
              }`}
            >
              {isReading ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span className="text-sm font-medium">
                {isReading ? 'Pause Reading' : 'Start Reading'}
              </span>
            </button>
            
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Daily Goal</p>
              <p className="text-sm font-medium text-neon-blue">25 pages</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentlyReadingWidget;