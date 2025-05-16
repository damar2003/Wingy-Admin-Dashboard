import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TotalRedeemsCard() {
  const [totalRedeemed, setTotalRedeemed] = useState<number | null>(null);
  const [redeemCount, setRedeemCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTotalRedeems = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get("https://w-v3.glitch.me/statics/allredeem");
        setTotalRedeemed(response.data.totalRedeemed);
        setRedeemCount(response.data.redeemCount);
      } catch (err) {
        console.error("Error fetching total redeems:", err);
        setError("Failed to fetch total redeems.");
      } finally {
        setLoading(false);
      }
    };

    fetchTotalRedeems();
  }, []);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Total Redeemed Amount</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {totalRedeemed !== null && redeemCount !== null && (
          <div>
            <p className="text-2xl font-bold text-gray-800">{totalRedeemed.toLocaleString()}</p>
            <p className="text-sm text-blue-600">Redeem Count: {redeemCount}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
