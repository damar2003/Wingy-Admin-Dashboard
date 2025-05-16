import { useEffect, useState } from "react";
import axios from "axios";

export default function TotalWingyCard() {
  const [totalWingy, setTotalWingy] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTotalWingy = async () => {
      try {
        const response = await axios.get("https://w-v3.glitch.me/statics/allWingy");
        setTotalWingy(response.data.totalWingy);
      } catch (err) {
        setError("Failed to fetch total Wingy.");
      } finally {
        setLoading(false);
      }
    };

    fetchTotalWingy();
  }, []);

  return (
    <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Wingy</h3>
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {totalWingy !== null && (
        <p className="text-3xl font-bold text-primary">{totalWingy.toFixed(2)}</p>
      )}
    </div>
  );
}