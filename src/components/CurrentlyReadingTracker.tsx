import { BookOpen } from "lucide-react";
import { useLocal } from "@/hooks/useLocal";

interface BookData {
  title: string;
  totalPages: number;
  pagesRead: number;
}

const CurrentlyReadingTracker = () => {
  const [book, setBook] = useLocal<BookData>('rt_book', {
    title: "The Midnight Library",
    totalPages: 432,
    pagesRead: 187
  });
  
  const [goal] = useLocal<number>('rt_goal', 25);
  const [week, setWeek] = useLocal<boolean[]>('rt_week', [true, true, true, false, false, false, false]);
  const [streak, setStreak] = useLocal<number>('rt_streak', 12);

  const progress = Math.round((book.pagesRead / book.totalPages) * 100);
  const todayIndex = () => (new Date().getDay() + 6) % 7;
  const isReadToday = week[todayIndex()];

  const handleReadToday = () => {
    if (!isReadToday) {
      const newWeek = [...week];
      newWeek[todayIndex()] = true;
      setWeek(newWeek);
      setStreak(streak + 1);
      
      // Optional: nudge pages read by ~60% of daily goal
      const nudgePages = Math.floor(goal * 0.6);
      setBook({
        ...book,
        pagesRead: Math.min(book.totalPages, book.pagesRead + nudgePages)
      });
    }
  };

  return (
    <div className="rounded-2xl bg-zinc-900/80 border border-white/5 p-5 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="h-5 w-5 text-emerald-500" />
        <div>
          <p className="text-xs text-zinc-400 uppercase tracking-wide">Currently Reading</p>
          <h3 className="text-lg font-semibold text-white">{book.title}</h3>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-300">
            {book.pagesRead.toLocaleString()} of {book.totalPages.toLocaleString()} pages
          </span>
          <span className="text-sm font-medium text-emerald-500">{progress}%</span>
        </div>

        <div className="w-full bg-zinc-800 rounded-full h-3">
          <div 
            className="bg-emerald-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <button
          onClick={handleReadToday}
          disabled={isReadToday}
          className={`w-full py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 ${
            isReadToday
              ? 'bg-emerald-500/20 text-emerald-400 cursor-not-allowed'
              : 'bg-emerald-500 text-black hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25'
          }`}
        >
          {isReadToday ? 'Read today ✓' : 'Did you read today?'}
        </button>
      </div>
    </div>
  );
};

export default CurrentlyReadingTracker;