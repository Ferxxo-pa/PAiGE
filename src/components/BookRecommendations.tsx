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
    <div className="widget-card h-fit">
      <div className="flex items-center space-x-2 mb-6">
        <Sparkles className="h-5 w-5 text-neon-yellow glow-yellow" />
        <h3 className="text-lg font-semibold text-foreground">AI Recommendations</h3>
      </div>

      <div className="space-y-4">
        {recommendations.map((book, index) => (
          <div key={index} className="p-4 bg-muted/50 rounded-lg border border-border/50 hover:border-neon-green/30 transition-all duration-300">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">{book.cover}</div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground text-sm truncate">{book.title}</h4>
                <p className="text-xs text-muted-foreground mb-1">by {book.author}</p>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs px-2 py-1 bg-neon-purple/20 text-neon-purple rounded">
                    {book.genre}
                  </span>
                  <span className="text-xs text-neon-yellow">★ {book.rating}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{book.reason}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-neon-green">
                    <DollarSign className="h-3 w-3" />
                    <span className="text-xs font-medium">{book.price}</span>
                  </div>
                  <button className="flex items-center space-x-1 text-xs text-neon-blue hover:text-neon-green transition-colors">
                    <span>View</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-2 bg-gradient-primary text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-opacity glow-primary">
        Get More Recommendations
      </button>
    </div>
  );
};

export default BookRecommendations;