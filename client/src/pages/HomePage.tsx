import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import AdminWelcomeNote from "@/components/AdminWelcomeNote";
import UserStatistics from "@/components/UserStatistics";
import LevelStatistics from "@/components/LevelStatistics";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Sidebar from "@/components/Sidebar";
import useMobile from "@/hooks/use-mobile";
import TotalWingyCard from "@/components/TotalWingyCard";
import TotalAdsCard from "../components/TotalAdsCard";
import TotalRedeemsCard from "../components/TotalRedeemsCard";

export default function HomePage() {
  const isMobile = useMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { username, logout } = useAuth();
  // Add state to trigger LevelStatistics reload
  const [levelStatsRefresh, setLevelStatsRefresh] = useState(0);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleDarkModeToggle = () => {
    const isDarkMode = document.documentElement.classList.toggle("dark");
    localStorage.setItem("darkMode", isDarkMode.toString());
    // Increment to trigger LevelStatistics reload
    setLevelStatsRefresh((prev) => prev + 1);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-[#0a2540] dark:text-white">

      
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col min-h-[500px] h-[calc(100vh-50px)] my-auto">
            {/* Header with user info */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                {isMobile && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={toggleSidebar}
                    className="mr-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                )}
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Dashboard</h2>
              </div>
              
              <div className="flex items-center gap-4">
                <Button onClick={handleDarkModeToggle} className="bg-primary text-white px-4 py-2 rounded-md">
                  Toggle Dark Mode
                </Button>

                {/* Refresh Statistics Icon Button */}
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    // Handle action button click
                    setLevelStatsRefresh((prev) => prev + 1);
                  }}
                  className="text-primary hover:bg-primary/10"
                  aria-label="Refresh Statistics"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.13-3.36L23 10M1 14l5.36 5.36A9 9 0 0 0 20.49 15"/></svg>
                </Button>

                {/* User avatar */}
                <Avatar className="h-8 w-8 bg-secondary">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username || 'User'}`} alt="User" />
                  <AvatarFallback className="bg-secondary text-white">
                    {username?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            
            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column (2/3 width on large screens) */}
              <div className="lg:col-span-2 space-y-6">
                <AdminWelcomeNote 
                  username={username || 'User'}
                />
                
                {/* Pass refreshKey to LevelStatistics */}
                <LevelStatistics refreshKey={levelStatsRefresh} />
              </div>
              
              {/* Right Column (1/3 width on large screens) */}
              <div className="space-y-6">
                <UserStatistics />
                <TotalWingyCard />
                <TotalAdsCard />
                <TotalRedeemsCard />

                {/* Additional stats could go here */}
                
                {/* Action Button */}
                {/* <Button 
                  className="w-full bg-primary text-white py-6 rounded-xl font-medium hover:bg-primary-light h-auto"
                  onClick={() => {
                    // Handle action button click
                    console.log('Action button clicked');
                  }}
                >
                  Refresh Statistics
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}