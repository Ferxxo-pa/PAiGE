import React, { useEffect, useMemo, useState } from "react";
import { BookOpen } from "lucide-react";

const useLocal = (key, init) => {
  const [val, setVal] = useState(() => {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : init; } catch { return init; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }, [key, val]);
  return [val, setVal];
};

const todayIndex = () => (new Date().getDay() + 6) % 7; // Mon=0

export default function CurrentlyReadingCard() {
  const [book, setBook] = useLocal("rt_book", {
    title: "The Midnight Library",
    totalPages: 432,
    pagesRead: 187,
  });
  const [dailyGoal] = useLocal("rt_goal", 25);
  const [weekHits, setWeekHits] = useLocal("rt_week", Array(7).fill(false));
  const [streakDays, setStreakDays] = useLocal("rt_streak", 12);

  const percent = useMemo(() => Math.min(100, Math.round((book.pagesRead / Math.max(1, book.totalPages)) * 100)), [book]);

  const handleReadToday = () => {
    const idx = todayIndex();
    if (!weekHits[idx]) {
      const updated = [...weekHits];
      updated[idx] = true;
      setWeekHits(updated);
      setStreakDays(streakDays + 1);
    }
    setBook({ ...book, pagesRead: Math.min(book.totalPages, book.pagesRead + Math.ceil(dailyGoal * 0.6)) });
  };

  return (
    <div className="rounded-2xl bg-zinc-900/80 border border-white/5 p-5 flex flex-col justify-between text-white">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="h-6 w-6 text-emerald-400"/>
        <div>
          <div className="text-xs text-zinc-400">CURRENTLY READING</div>
          <div className="text-lg font-semibold">{book.title}</div>
        </div>
      </div>

      <div className="mb-2 flex justify-between text-sm">
        <span>{book.pagesRead}/{book.totalPages} pages</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 rounded-full bg-zinc-800 overflow-hidden mb-6">
        <div className="h-full bg-emerald-500" style={{ width: `${percent}%` }} />
      </div>

      <button onClick={handleReadToday}
        className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition shadow-lg shadow-emerald-600/20">
        Did you read today?
      </button>
    </div>
  );
}