import { BookOpen } from "lucide-react";
import ReadingTrackerRow from "@/components/ReadingTrackerRow";
import BookRecommendations from "@/components/BookRecommendations";
import CollapsibleReadingActivity from "@/components/CollapsibleReadingActivity";

const Index = () => {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-white/5 bg-zinc-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500">
                <BookOpen className="h-6 w-6 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-emerald-400">PAiGE</h1>
                <p className="text-sm text-zinc-400">AI-Powered Reading Companion</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-zinc-400">Welcome back</p>
                <p className="font-semibold text-white">Book Lover</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Reading Trackers */}
          <div className="lg:col-span-2">
            <ReadingTrackerRow />
          </div>

          {/* Right Column - AI Recommendations */}
          <div className="lg:col-span-1">
            <BookRecommendations />
          </div>
        </div>

        {/* Reading Activity - Below both columns */}
        <div className="mt-6">
          <CollapsibleReadingActivity />
        </div>
      </main>
    </div>
  );
};

export default Index;