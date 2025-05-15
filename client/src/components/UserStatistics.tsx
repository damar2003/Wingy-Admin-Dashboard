import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Users } from "lucide-react";

interface UserStatisticsProps {
  className?: string;
}

export default function UserStatistics({ className }: UserStatisticsProps) {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://w-v2.glitch.me/statics/allUsers/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user count');
        }
        return response.json();
      })
      .then((data) => {
        setUserCount(data.TotalUsers);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user count:", error);
        setUserCount(null);
        setIsLoading(false);
      });
  }, []);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>Total Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mr-4">
            <Users className="h-6 w-6 text-white" />
          </div>
          
          <div>
            {isLoading ? (
              <div className="h-9 w-24 bg-gray-200 animate-pulse rounded-md"></div>
            ) : userCount !== null ? (
              <h3 className="text-3xl font-bold">{userCount.toLocaleString()}</h3>
            ) : (
              <p className="text-sm text-red-500">Failed to load user count</p>
            )}
            <p className="text-sm text-neutral-300">Registered accounts</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}