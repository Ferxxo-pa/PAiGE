import { useState } from "react";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useReadingData } from "@/hooks/useReadingData";
import { AuthModal } from "@/components/Auth/AuthModal";
import CurrentlyReadingCard from "@/components/CurrentlyReadingCard";
import ReadingStreakCard from "@/components/ReadingStreakCard";
import BookRecommendations from "@/components/BookRecommendations";
import ReadingActivityChart from "@/components/ReadingActivityChart";

const Index = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { loading: dataLoading } = useReadingData();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-emerald-500 rounded-full animate-pulse mx-auto"></div>
          <p className="text-zinc-400">Loading your reading journey...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto">
            <User className="h-8 w-8 text-black" />
          </div>
          <h1 className="text-4xl font-bold text-emerald-400">Welcome to PAiGE</h1>
          <p className="text-lg text-zinc-400">
            Your personal AI-powered reading companion. Track your progress, discover new books, and build lasting reading habits.
          </p>
          <Button 
            onClick={() => setShowAuthModal(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-8 py-3"
          >
            Start Reading Journey
          </Button>
        </div>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </div>
    );
  }

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
                  <p className="font-semibold text-white">{user.email?.split('@')[0] || 'Book Lover'}</p>
                </div>
                <button 
                  onClick={signOut}
                  className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5 text-zinc-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto px-6 py-8">
        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_300px] gap-6">
          {/* Left Column - Reading Cards */}
          <div className="space-y-6">
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