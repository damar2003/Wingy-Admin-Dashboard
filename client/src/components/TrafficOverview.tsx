import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import TrafficChart from "./TrafficChart";

interface TrafficDay {
  day: number;
  dayOfWeek: string;
}

interface TrafficData {
  hour: number;
  value: number;
}

interface TrafficOverviewProps {
  selectedDay: number;
  onDaySelect: (day: number) => void;
  dailyTraffic: { value: number; max: number };
  hourlyTraffic: { value: number; max: number };
  trafficData: TrafficData[];
}

export default function TrafficOverview({
  selectedDay,
  onDaySelect,
  dailyTraffic,
  hourlyTraffic,
  trafficData
}: TrafficOverviewProps) {
  // Days for the selector
  const days: TrafficDay[] = [
    { day: 27, dayOfWeek: "Fri" },
    { day: 28, dayOfWeek: "Sat" },
    { day: 29, dayOfWeek: "Sun" },
    { day: 1, dayOfWeek: "Mon" },
    { day: 2, dayOfWeek: "Tue" },
    { day: 3, dayOfWeek: "Wed" },
    { day: 4, dayOfWeek: "Thu" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily traffic overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Selector */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => (
            <button
              key={day.day}
              onClick={() => onDaySelect(day.day)}
              className={cn(
                "flex flex-col items-center py-2 rounded-full transition-colors",
                selectedDay === day.day
                  ? "bg-secondary text-white"
                  : "text-neutral-300 hover:bg-neutral-100"
              )}
            >
              <div className="text-sm mb-1">{day.day.toString().padStart(2, '0')}</div>
              <div className="text-xs">{day.dayOfWeek}</div>
            </button>
          ))}
        </div>
        
        {/* Traffic Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-baseline">
              <h4 className="text-2xl font-semibold mr-2">
                {dailyTraffic.value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </h4>
              <span className="text-sm text-neutral-300">/ {dailyTraffic.max} GB</span>
            </div>
            <p className="text-sm text-neutral-300">Daily traffic</p>
          </div>
          
          <div>
            <div className="flex items-baseline">
              <h4 className="text-2xl font-semibold mr-2">
                {hourlyTraffic.value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </h4>
              <span className="text-sm text-neutral-300">/ {hourlyTraffic.max} GB</span>
            </div>
            <p className="text-sm text-neutral-300">Hourly traffic</p>
          </div>
        </div>
        
        {/* Traffic Chart */}
        <TrafficChart data={trafficData} />
      </CardContent>
    </Card>
  );
}
