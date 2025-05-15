import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import WelcomeCard from "@/components/BonusNotification";
import UserStatistics from "@/components/UserStatistics";
import LevelStatistics from "@/components/LevelStatistics";
import { Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Sidebar from "@/components/Sidebar";
import useMobile from "@/hooks/use-mobile";

export default function HomePage() {
  const isMobile = useMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { username, logout } = useAuth();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
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
              <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-neutral-300 hover:text-neutral-400">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-neutral-300 hover:text-neutral-400"
                onClick={logout}
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
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
              <WelcomeCard 
                username={username || 'User'}
              />
              
              <LevelStatistics />
            </div>
            
            {/* Right Column (1/3 width on large screens) */}
            <div className="space-y-6">
              <UserStatistics />
              
              {/* Additional stats could go here */}
              
              {/* Action Button */}
              <Button 
                className="w-full bg-primary text-white py-6 rounded-xl font-medium hover:bg-primary-light h-auto"
                onClick={() => {
                  // Handle action button click
                  console.log('Action button clicked');
                }}
              >
                Refresh Statistics
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}