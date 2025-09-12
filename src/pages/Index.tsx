import { User } from "lucide-react";
import CurrentlyReadingCard from "@/components/CurrentlyReadingCard";
import ReadingStreakCard from "@/components/ReadingStreakCard";
import BookRecommendations from "@/components/BookRecommendations";
import ReadingActivityChart from "@/components/ReadingActivityChart";

const Index = () => {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-white/5 bg-zinc-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-emerald-400">PAiGE</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm text-zinc-400">Welcome back</p>
                  <p className="font-semibold text-white">Book Lover</p>
                </div>
                <button className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors">
                  <User className="h-5 w-5 text-zinc-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto px-6 py-8">
        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Reading Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top Row - Currently Reading and Streak */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CurrentlyReadingCard />
              <ReadingStreakCard />
            </div>
            
            {/* Reading Activity - Below left cards */}
            <ReadingActivityChart />
          </div>

          {/* Right Column - AI Recommendations */}
          <div className="lg:col-span-1">
            <BookRecommendations />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;