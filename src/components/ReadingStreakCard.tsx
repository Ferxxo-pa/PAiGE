import React, { useMemo } from "react";
import { Flame } from "lucide-react";
import { useReadingData } from "@/hooks/useReadingData";

const WEEK = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

export default function ReadingStreakCard() {
  const { books, sessions, profile, calculateStreak } = useReadingData();
  
  const currentBook = books.find(book => book.status === 'reading') || books[0];
  const dailyGoal = profile?.daily_goal || 25;
  const streakDays = calculateStreak();
  
  // Calculate today's progress based on sessions
  const today = new Date().toISOString().split('T')[0];
  const todaySessions = sessions.filter(session => session.session_date === today);
  const todayPages = todaySessions.reduce((sum, session) => sum + session.pages_read, 0);
  
  const progress = useMemo(() => Math.min(1, todayPages / dailyGoal), [todayPages, dailyGoal]);
  
  // Calculate week hits from sessions
  const weekHits = useMemo(() => {
    const hits = Array(7).fill(false);
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayIndex = (7 - i) % 7; // Current week mapping
      hits[dayIndex] = sessions.some(session => session.session_date === dateStr);
    }
    
    return hits;
  }, [sessions]);

  return (
    <div className="rounded-2xl bg-zinc-900/80 border border-white/5 p-5 flex flex-col justify-between text-white">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Flame className="h-6 w-6 text-rose-400"/>
          <div>
            <div className="text-xs text-zinc-400">STREAK</div>
            <div className="text-lg font-bold">{streakDays} DAYS</div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        {WEEK.map((d, i) => (
          <div key={d} className="flex flex-col items-center text-[10px]">
            <div className={`h-7 w-7 rounded-full flex items-center justify-center transition 
              ${weekHits[i] ? "bg-emerald-500 text-black" : "bg-zinc-800 text-zinc-400"}`}>
              {weekHits[i] ? "✓" : ""}
            </div>
            <span className="mt-1 text-zinc-500">{d}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-sm mb-1">
        <span>{todayPages}/{dailyGoal} pages today</span>
        <span>{Math.round(progress * 100)}%</span>
      </div>
      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div className="h-full bg-emerald-500" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  );
}