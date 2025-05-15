import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TimeRange = "day" | "week" | "month" | "year";

interface LevelStatisticsProps {
  className?: string;
}

export default function LevelStatistics({ className }: LevelStatisticsProps) {
  const [range, setRange] = useState<TimeRange>("week");
  const [totalCount, setTotalCount] = useState<number | null>(null);
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
        // Calculate total count of users across all levels
        const sum = Object.values(data).reduce((acc: number, count: any) => acc + count, 0);
        setTotalCount(sum);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching level stats:", error);
        setTotalCount(null);
        setIsLoading(false);
      });
  }, [range]);

  const timeRanges: { value: TimeRange; label: string }[] = [
    { value: "day", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "year", label: "This Year" }
  ];

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
        <div className="flex items-center justify-center p-8">
          {isLoading ? (
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-gray-200 animate-pulse mb-4"></div>
              <div className="h-8 w-32 bg-gray-200 animate-pulse rounded-md"></div>
            </div>
          ) : totalCount !== null ? (
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white">{range.charAt(0).toUpperCase()}</span>
              </div>
              <h3 className="text-3xl font-bold">{totalCount.toLocaleString()}</h3>
              <p className="text-neutral-400">Total users for this period</p>
            </div>
          ) : (
            <div className="text-neutral-400">
              No data available for this time range
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}