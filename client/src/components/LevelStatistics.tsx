import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

type TimeRange = "day" | "week" | "month" | "year";

interface LevelStatisticsProps {
  className?: string;
}

interface LevelStat {
  level: number;
  count: number;
}

export default function LevelStatistics({ className }: LevelStatisticsProps) {
  const [range, setRange] = useState<TimeRange>("week");
  const [levelStats, setLevelStats] = useState<LevelStat[] | null>(null);
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
        // Convert to format suitable for chart
        const formattedData = Object.entries(data).map(([level, count]) => ({
          level: parseInt(level),
          count: count as number
        })).sort((a, b) => a.level - b.level);
        
        setLevelStats(formattedData);
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

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
          <p className="font-semibold">Level {payload[0].payload.level}</p>
          <p className="text-secondary">Users: {payload[0].value}</p>
        </div>
      );
    }
    return null;
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
        {isLoading ? (
          <div className="h-48 w-full bg-gray-100 animate-pulse rounded-md flex items-center justify-center">
            <p className="text-neutral-300">Loading statistics...</p>
          </div>
        ) : levelStats && levelStats.length > 0 ? (
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={levelStats}
                margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="level" 
                  label={{ value: 'Level', position: 'insideBottomRight', offset: -5 }}
                  tick={{ fontSize: 12, fill: '#A0A3BD' }}
                />
                <YAxis label={{ value: 'Users', angle: -90, position: 'insideLeft' }} hide />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="count" 
                  fill="hsl(var(--secondary))" 
                  radius={[4, 4, 0, 0]}
                  className="hover:opacity-80 transition-opacity"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-48 w-full flex items-center justify-center">
            <p className="text-neutral-300">No data available for this time range</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}