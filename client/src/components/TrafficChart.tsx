import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface TrafficDataPoint {
  hour: number;
  value: number;
}

interface TrafficChartProps {
  data: TrafficDataPoint[];
}

export default function TrafficChart({ data }: TrafficChartProps) {
  // If no data is provided, generate some demo data
  const chartData = data.length > 0 ? data : Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    value: Math.random() * 0.8 + 0.2, // Random value between 0.2 and 1
  }));
  
  // Format x-axis labels for hours
  const formatXAxis = (hour: number) => {
    if (hour === 6) return '6am';
    if (hour === 12) return '12pm';
    if (hour === 18) return '6pm';
    if (hour === 0) return '12am';
    return '';
  };
  
  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const hour = payload[0].payload.hour;
      const value = payload[0].value;
      
      // Format time with am/pm
      const timeStr = hour === 0 ? '12am' : 
                      hour === 12 ? '12pm' : 
                      hour < 12 ? `${hour}am` : `${hour - 12}pm`;
      
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md text-xs">
          <p className="font-semibold">{timeStr}</p>
          <p className="text-secondary">{(value * 5).toFixed(2)} GB</p>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="relative h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 0, left: 0, bottom: 20 }}
          barGap={2}
          barSize={4}
        >
          <XAxis 
            dataKey="hour"
            tickFormatter={formatXAxis}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#A0A3BD' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="value" 
            fill="hsl(var(--secondary))" 
            radius={[2, 2, 0, 0]}
            className="hover:opacity-80 transition-opacity"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
