import { Sparkles, ExternalLink, DollarSign } from "lucide-react";

const BookRecommendations = () => {
  const recommendations = [
    {
      title: "Project Hail Mary",
      author: "Andy Weir",
      genre: "Sci-Fi",
      rating: 4.6,
      price: "$12.99",
      reason: "Based on your love for The Martian",
      cover: "🚀"
    },
    {
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      genre: "Fiction",
      rating: 4.5,
      price: "$10.99",
      reason: "Trending in your reading community",
      cover: "✨"
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-Help",
      rating: 4.7,
      price: "$13.99",
      reason: "Matches your recent productivity reads",
      cover: "⚡"
    },
    {
      title: "The Thursday Murder Club",
      author: "Richard Osman",
      genre: "Mystery",
      rating: 4.4,
      price: "$11.99",
      reason: "New genre recommendation",
      cover: "🔍"
    }
  ];

  return (
    <div className="rounded-2xl bg-zinc-900/80 border border-white/5 p-5 backdrop-blur-sm h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="h-5 w-5 text-yellow-400" />
        <div>
          <p className="text-xs text-zinc-400 uppercase tracking-wide">AI Recommendations</p>
          <h3 className="text-lg font-semibold text-white">Personalized for You</h3>
        </div>
      </div>

      <div className="flex-1 overflow-auto space-y-4">
        {recommendations.map((book, index) => (
          <div key={index} className="p-4 bg-zinc-800/50 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-all duration-300">
            <div className="flex items-start gap-3">
              <div className="text-2xl">{book.cover}</div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-white text-sm truncate">{book.title}</h4>
                <p className="text-xs text-zinc-400 mb-1">by {book.author}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full">
                    {book.genre}
                  </span>
                  <span className="text-xs text-yellow-400">★ {book.rating}</span>
                </div>
                <p className="text-xs text-zinc-400 mb-3">{book.reason}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-emerald-400">
                    <DollarSign className="h-3 w-3" />
                    <span className="text-xs font-medium">{book.price}</span>
                  </div>
                  <button className="flex items-center gap-1 text-xs text-blue-400 hover:text-emerald-400 transition-colors">
                    <span>View</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-3 bg-emerald-500 text-black rounded-xl font-medium text-sm hover:bg-emerald-400 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25">
        Get More Recommendations
      </button>
    </div>
  );
};

export default BookRecommendations;