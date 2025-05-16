import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TotalAdsCard() {
  const [totalAds, setTotalAds] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTotalAds = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get("https://w-v3.glitch.me/statics/allads");
        setTotalAds(response.data.totalAds);
      } catch (err) {
        console.error("Error fetching total ads:", err);
        setError("Failed to fetch total ads.");
      } finally {
        setLoading(false);
      }
    };

    fetchTotalAds();
  }, []);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Total Completed Ads</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {totalAds !== null && (
          <p className="text-2xl font-bold text-gray-800">{totalAds.toLocaleString()}</p>
        )}
      </CardContent>
    </Card>
  );
}
