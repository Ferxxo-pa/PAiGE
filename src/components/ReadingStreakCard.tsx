import React, { useEffect, useMemo, useState } from "react";
import { Flame } from "lucide-react";

const useLocal = (key, init) => {
  const [val, setVal] = useState(() => {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : init; } catch { return init; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }, [key, val]);
  return [val, setVal];
};

const WEEK = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

export default function ReadingStreakCard() {
  const [book] = useLocal("rt_book", {
    title: "The Midnight Library",
    totalPages: 432,
    pagesRead: 187,
  });
  const [dailyGoal] = useLocal("rt_goal", 25);
  const [weekHits] = useLocal("rt_week", Array(7).fill(false));
  const [streakDays] = useLocal("rt_streak", 12);

  const progress = useMemo(() => Math.min(1, (book.pagesRead % dailyGoal) / dailyGoal), [book.pagesRead, dailyGoal]);

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
        <span>{Math.min(book.pagesRead % dailyGoal, dailyGoal)}/{dailyGoal} pages today</span>
        <span>{Math.round(progress * 100)}%</span>
      </div>
      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div className="h-full bg-emerald-500" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  );
}