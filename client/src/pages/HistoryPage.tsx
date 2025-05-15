import Sidebar from "@/components/Sidebar";
import useMobile from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import axios from "axios";

export default function HistoryPage() {
  const isMobile = useMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [history, setHistory] = useState<{ _id: string; recived_user: string; Action: string; wingy?: number; createdAt: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchHistory = async () => {
      const adminUserId = localStorage.getItem("userId");
      if (!adminUserId) {
        setError("Admin user ID not found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://w-v2.glitch.me/admin-history/${adminUserId}`);
        setHistory(response.data.history || []);
      } catch (err) {
        setError("Failed to fetch history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50 dark:bg-[#0a2540]">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col min-h-[500px] h-[calc(100vh-50px)] my-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                {isMobile && (
                  <button
                    onClick={toggleSidebar}
                    className="mr-2 p-2 rounded-md bg-gray-200 hover:bg-gray-300"
                  >
                    Menu
                  </button>
                )}
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Admin History</h2>
              </div>
            </div>

            {/* History Section */}
            <div className="mb-6">
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {history.map((record) => (
                    <div
                      key={record._id}
                      className="p-6 border border-gray-200 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <p className="text-lg font-bold text-gray-800 mb-2">
                        <span className="text-primary">Action Done To:</span> {record.recived_user}
                      </p>
                      <p className="text-md text-gray-600 mb-2">
                        <span className="text-primary">Action Type:</span> {record.Action}
                      </p>
                      {record.wingy && (
                        <p className="text-md text-gray-600">
                          <span className="text-primary">Wingy:</span> {record.wingy}
                        </p>
                      )}
                      <div className="flex justify-between items-end mt-4">
                        <p className="text-md text-gray-600">
                          <span className="text-primary">Time:</span> {new Date(record.createdAt).toLocaleTimeString('en-GB')}
                        </p>
                        <p className="text-md text-gray-600">
                          <span className="text-primary">Date:</span> {new Date(record.createdAt).toLocaleDateString('en-GB')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
