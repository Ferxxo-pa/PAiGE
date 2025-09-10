import CurrentlyReadingTracker from "./CurrentlyReadingTracker";
import ReadingStreakTracker from "./ReadingStreakTracker";

const ReadingTrackerRow = () => {
  return (
    <div className="grid gap-6">
      <CurrentlyReadingTracker />
      <ReadingStreakTracker />
    </div>
  );
};

export default ReadingTrackerRow;