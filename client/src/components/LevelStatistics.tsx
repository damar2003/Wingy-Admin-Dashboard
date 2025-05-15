import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, ChartData, ChartDataset } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

// Add prop type for refreshKey
interface LevelStatisticsProps {
  refreshKey?: number;
}

export default function LevelStatistics({ refreshKey }: LevelStatisticsProps) {
  const [range, setRange] = useState("week");
  const [chartData, setChartData] = useState<ChartData<"line"> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(`https://w-v2.glitch.me/statics/levelStats?range=${range}`);
        console.log("API Response:", response);

        if (response.data && response.data.chartData) {
          const data = response.data.chartData;
          const labels = Object.keys(data);
          const values = Object.values(data) as number[];
          const maxValue = Math.max(...values);
          const scaleFactor = maxValue >= 1000 ? 1000 : 1;
          const unit = scaleFactor === 1000 ? "k" : "";

          const datasets: ChartDataset<"line">[] = [
            {
              label: `Levels Played (${unit})`,
              data: values.map((value) => value / scaleFactor),
              borderColor: "#4F46E5",
              backgroundColor: "rgba(79, 70, 229, 0.2)",
              tension: 0.4,
            },
          ];

          setChartData({ labels, datasets });
        } else {
          console.error("Invalid data format:", response.data);
          throw new Error("Invalid data format");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [range, refreshKey]); // Add refreshKey to dependencies

  return (
    <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-md dark:bg-black">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Level Statistics</h3>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-blue-900 dark:text-white dark:border-blue-900 dark:placeholder-gray-400 dark:focus:ring-blue-800 dark:focus:border-blue-800"
        >
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>
      {loading && <p className="text-gray-500 dark:text-gray-300">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {chartData && (
        <div style={{ maxHeight: "300px", minHeight: "300px", overflow: "hidden", background: document.documentElement.classList.contains('dark') ? '#1e293b' : 'white', borderRadius: '0.75rem' }}>
          <Line
            data={{
              ...chartData,
              datasets: chartData.datasets.map(ds => ({
                ...ds,
                borderColor: document.documentElement.classList.contains('dark') ? '#60a5fa' : ds.borderColor,
                backgroundColor: document.documentElement.classList.contains('dark') ? 'rgba(96,165,250,0.2)' : ds.backgroundColor,
              }))
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: {
                    color: document.documentElement.classList.contains('dark') ? '#fff' : '#1e293b',
                  }
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: document.documentElement.classList.contains('dark') ? '#fff' : '#1e293b',
                  },
                  grid: {
                    color: document.documentElement.classList.contains('dark') ? '#334155' : '#e5e7eb',
                  }
                },
                y: {
                  ticks: {
                    color: document.documentElement.classList.contains('dark') ? '#fff' : '#1e293b',
                  },
                  grid: {
                    color: document.documentElement.classList.contains('dark') ? '#334155' : '#e5e7eb',
                  }
                }
              }
            }}
          />
        </div>
      )}
    </div>
  );
}