import { BookOpen, Target, Flame, BarChart3, TrendingUp } from "lucide-react";
import CurrentlyReadingWidget from "@/components/CurrentlyReadingWidget";
import StreakCounter from "@/components/StreakCounter";
import GoalsTracker from "@/components/GoalsTracker";
import BookRecommendations from "@/components/BookRecommendations";
import ContributionGrid from "@/components/ContributionGrid";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
const Index = () => {
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              
              <div>
                <h1 className="text-2xl font-bold text-neon-green">PAiGE</h1>
                
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                
                
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Main Stats */}
          <div className="lg:col-span-8 space-y-6">
            {/* Currently Reading & Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <CurrentlyReadingWidget />
              </div>
              <div className="space-y-4">
                <StreakCounter />
                <GoalsTracker />
              </div>
            </div>

            {/* Contribution Grid */}
            <ContributionGrid />

            {/* Analytics Dashboard */}
            <AnalyticsDashboard />
          </div>

          {/* Right Column - Recommendations */}
          <div className="lg:col-span-4">
            <BookRecommendations />
          </div>
        </div>
      </main>
    </div>;
};
export default Index;