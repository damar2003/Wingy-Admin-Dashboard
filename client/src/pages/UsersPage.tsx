import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Sidebar from "@/components/Sidebar";
import useMobile from "@/hooks/use-mobile";
import { Card, CardContent } from "@/components/ui/card";

export default function UsersPage() {
  const isMobile = useMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { username } = useAuth();
  
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
              <h2 className="text-lg font-semibold text-gray-800">Users</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-neutral-300 hover:text-neutral-400">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
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
          
          {/* Coming Soon Card */}
          <Card className="w-full">
            <CardContent className="p-12 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">Coming Soon</h3>
              <p className="text-neutral-500 text-center max-w-md">
                The users management page is currently under development. Check back later for updates!
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}