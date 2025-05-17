import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Sidebar from "@/components/Sidebar";
import useMobile from "@/hooks/use-mobile";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import AddWingy from "@/components/AddWingy";
import VerifyDiscord from "@/components/VerifyDiscord";

export default function UsersPage() {
  const isMobile = useMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { username } = useAuth();
  const [searchType, setSearchType] = useState("username");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setUser(null);

    try {
      const endpoint =
        searchType === "username"
          ? `https://w-v3.glitch.me/username/${searchInput}`
          : searchType === "userId"
          ? `https://w-v3.glitch.me/user/${searchInput}`
          : `https://w-v3.glitch.me/balancebydiscord/${searchInput}`;

      const response = await axios.get(endpoint);
      setUser(response.data.user);
    } catch (err) {
      setError("User not found");
    } finally {
      setLoading(false);
    }
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
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Users</h2>
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
            
            {/* Search Bar Section */}
            <div className="mb-6">
              <Card className="p-4 shadow-md">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <select
                      className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      onChange={(e) => setSearchType(e.target.value)}
                    >
                      <option value="username">Username</option>
                      <option value="userId">User ID</option>
                      <option value="discordId">Discord ID</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Enter ID..."
                      className="flex-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <Button
                      onClick={handleSearch}
                      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-light"
                    >
                      Search
                    </Button>
                  </div>
                  {loading && <p className="text-sm text-gray-500">Loading...</p>}
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  {user && (
                    <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                      <h4 className="text-lg font-semibold mb-4">User Details</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(user).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="font-medium text-gray-700 capitalize">{key}:</span>
                            <span className="text-gray-900">
                              {key === 'created_at' && typeof value === 'string' ? new Date(value).toISOString().split('T')[0].split('-').reverse().join('-') : typeof value === 'number' ? value.toFixed(2) : String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Add Wingy Section */}
            <div className="mb-6">
              <AddWingy />
            </div>

            {/* Verify Username with discordId */}
            <div className="mb-6">
              <VerifyDiscord />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}