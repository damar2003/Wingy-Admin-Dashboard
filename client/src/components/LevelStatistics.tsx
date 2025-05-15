import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TimeRange = "day" | "week" | "month" | "year";

interface LevelStatisticsProps {
  className?: string;
}

interface LevelStats {
  totalLevels?: number;
  totalUsers?: number;
  levels?: Record<string, number>;
}

export default function LevelStatistics({ className }: LevelStatisticsProps) {
  const [range, setRange] = useState<TimeRange>("week");
  const [levelStats, setLevelStats] = useState<LevelStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://w-v2.glitch.me/statics/levelStats?range=${range}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch level stats');
        }
        return response.json();
      })
      .then((data) => {
        setLevelStats(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching level stats:", error);
        setLevelStats(null);
        setIsLoading(false);
      });
  }, [range]);

  const timeRanges: { value: TimeRange; label: string }[] = [
    { value: "day", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "year", label: "This Year" }
  ];
  
  // Helper function to get the human-readable label for a range
  const getRangeLabel = (rangeValue: TimeRange): string => {
    const rangeItem = timeRanges.find(item => item.value === rangeValue);
    return rangeItem?.label || rangeValue;
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Level Statistics</CardTitle>
        
        <div className="flex text-sm">
          {timeRanges.map((timeRange) => (
            <Button
              key={timeRange.value}
              variant="ghost"
              className={cn(
                "px-3 py-1 h-auto",
                range === timeRange.value 
                  ? "text-secondary border-b-2 border-secondary" 
                  : "text-neutral-300"
              )}
              onClick={() => setRange(timeRange.value)}
            >
              {timeRange.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
          {isLoading ? (
            <>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <div className="h-16 w-16 rounded-full bg-gray-200 animate-pulse mb-4"></div>
                <div className="h-6 w-28 bg-gray-200 animate-pulse rounded-md mb-2"></div>
                <div className="h-4 w-36 bg-gray-200 animate-pulse rounded-md"></div>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <div className="h-16 w-16 rounded-full bg-gray-200 animate-pulse mb-4"></div>
                <div className="h-6 w-28 bg-gray-200 animate-pulse rounded-md mb-2"></div>
                <div className="h-4 w-36 bg-gray-200 animate-pulse rounded-md"></div>
              </div>
            </>
          ) : levelStats ? (
            <>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">{range.charAt(0).toUpperCase()}</span>
                </div>
                <h3 className="text-3xl font-bold">{levelStats.totalLevels?.toLocaleString() || '0'}</h3>
                <p className="text-neutral-400">Total levels available</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">U</span>
                </div>
                <h3 className="text-3xl font-bold">{levelStats.totalUsers?.toLocaleString() || '0'}</h3>
                <p className="text-neutral-400">Users for {getRangeLabel(range)}</p>
              </div>
            </>
          ) : (
            <div className="col-span-2 flex items-center justify-center p-8 text-neutral-400">
              No data available for this time range
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}