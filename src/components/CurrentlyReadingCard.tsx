import React, { useMemo, useState } from "react";
import { BookOpen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useReadingData } from "@/hooks/useReadingData";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function CurrentlyReadingCard() {
  const { user } = useAuth();
  const { books, profile, addReadingSession, upsertBook } = useReadingData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pagesInput, setPagesInput] = useState("");
  const { toast } = useToast();

  // Get current reading book (first book with status 'reading')
  const currentBook = books.find(book => book.status === 'reading') || books[0];
  
  // Default to sample data if no books exist yet
  const displayBook = currentBook || {
    id: '',
    title: "The Midnight Library",
    author: "Matt Haig",
    total_pages: 432,
    pages_read: 187,
    status: 'reading' as const,
  };

  const percent = useMemo(() => 
    Math.min(100, Math.round((displayBook.pages_read / Math.max(1, displayBook.total_pages)) * 100)), 
    [displayBook.pages_read, displayBook.total_pages]
  );

  const handleSubmitPages = async () => {
    const pages = parseInt(pagesInput);
    if (!pages || pages <= 0) {
      toast({
        title: "Invalid input",
        description: "Please enter a valid number of pages.",
        variant: "destructive",
      });
      return;
    }

    if (!currentBook && user) {
      // Create the default book if it doesn't exist
      const newBook = await upsertBook({
        title: displayBook.title,
        author: displayBook.author,
        total_pages: displayBook.total_pages,
        pages_read: displayBook.pages_read,
        status: 'reading',
      });
      
      if (newBook) {
        await addReadingSession(newBook.id, pages);
      }
    } else if (currentBook) {
      await addReadingSession(currentBook.id, pages);
    }

    setPagesInput("");
    setDialogOpen(false);
  };

  return (
    <div className="rounded-2xl bg-zinc-900/80 border border-white/5 p-5 flex flex-col justify-between text-white">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="h-6 w-6 text-emerald-400"/>
        <div>
          <div className="text-xs text-zinc-400">CURRENTLY READING</div>
          <div className="text-lg font-semibold">{displayBook.title}</div>
          {displayBook.author && (
            <div className="text-sm text-zinc-500">by {displayBook.author}</div>
          )}
        </div>
      </div>

      <div className="mb-2 flex justify-between text-sm">
        <span>{displayBook.pages_read}/{displayBook.total_pages} pages</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 rounded-full bg-zinc-800 overflow-hidden mb-6">
        <div className="h-full bg-emerald-500" style={{ width: `${percent}%` }} />
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <button 
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition shadow-lg shadow-emerald-600/20">
            Did you read today?
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-white">How many pages did you read today?</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="pages" className="text-zinc-300">Pages read</Label>
              <Input
                id="pages"
                type="number"
                placeholder="Enter number of pages"
                value={pagesInput}
                onChange={(e) => setPagesInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmitPages();
                  }
                }}
                className="bg-zinc-800 border-zinc-700 text-white"
                autoFocus
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button 
                variant="outline" 
                onClick={() => setDialogOpen(false)}
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitPages}
                disabled={!pagesInput || parseInt(pagesInput) <= 0}
                className="bg-emerald-600 hover:bg-emerald-500 text-white"
              >
                Add Pages
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}