import { useQuery } from "@tanstack/react-query";
import Dashboard from "@/components/Dashboard";
import { useState } from "react";

export default function DashboardPage() {
  const [selectedDay, setSelectedDay] = useState(2); // Default: day 02
  
  // Fetch dashboard data
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/dashboard'],
  });
  
  if (isLoading) return <div className="flex h-screen items-center justify-center">Loading dashboard...</div>;
  
  if (error) return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-red-500">Failed to load dashboard data</div>
    </div>
  );
  
  return (
    <Dashboard 
      data={data} 
      selectedDay={selectedDay}
      onDaySelect={setSelectedDay}
    />
  );
}
