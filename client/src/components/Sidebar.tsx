import { Send, Ticket, HelpCircle, Home, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import useMobile from "@/hooks/use-mobile";
import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const isMobile = useMobile();
  const [, navigate] = useLocation();

  // Define navigation items with active state
  const generalNavItems = [
    { id: "home", icon: <Home className="h-5 w-5" />, label: "Home", path: "/" },
    { id: "users", icon: <User className="h-5 w-5" />, label: "Users", path: "/users" },
    { id: "history", icon: <HelpCircle className="h-5 w-5" />, label: "History", path: "/history" },
  ];

  const supportNavItems: { id: string; icon: React.ReactNode; label: string; path: string }[] = [];

  // Get current path to determine active item
  const [location] = useLocation();
  
  // Find active item based on current location
  const getActiveItem = () => {
    // Remove leading slash and return
    const path = location === "/" ? "home" : location.substring(1);
    return generalNavItems.some(item => item.id === path) || supportNavItems.some(item => item.id === path) ? path : "home";
  };
  
  // State to track active item
  const [activeItem, setActiveItem] = useState(getActiveItem());

  // Handler for navigation items
  const handleNavItemClick = (id: string, path: string) => {
    setActiveItem(id);
    
    if (path && path !== "#") {
      navigate(path);
    }
    
    if (isMobile) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      
      <aside 
        className={cn(
          // Responsive width for sidebar, centered vertically, height 50px less than full, no right border
          "flex flex-col bg-gradient-to-b from-[#3a2fff] via-[#5f4fff] to-[#a18fff] text-white shadow-2xl z-50 overflow-y-auto scrollbar-hide fixed md:relative min-h-[500px] h-[calc(100vh-50px)] min-w-[170px] w-[clamp(170px,19vw,230px)] max-w-[270px] my-auto",
          "backdrop-blur-xl border-l border-t border-b border-white/20 rounded-3xl md:rounded-3xl md:my-6 md:ml-4 md:shadow-2xl", // removed border-r
          isMobile && !isOpen ? "transform -translate-x-full" : "transform translate-x-0",
          "transition-transform duration-300 ease-in-out"
        )}
      >
        {/* Logo Section */}
        <div className="p-5 flex items-center gap-3 mb-8 rounded-2xl bg-white/10 shadow-inner border border-white/10">
          <Send className="h-5 w-5 text-white drop-shadow-lg" />
          <h1 className="text-xl font-extrabold tracking-widest text-white drop-shadow whitespace-nowrap overflow-hidden text-ellipsis">Wingy Coin</h1>
        </div>
        {/* Navigation Sections */}
        <div className="px-4 mb-4">
          <p className="text-xs uppercase text-neutral-200 tracking-wider mb-3 font-semibold">Menu</p>
          <nav className="sidebar-nav">
            <ul className="space-y-2">
              {generalNavItems.map((item) => (
                <li key={item.id} className="overflow-visible w-full">
                  <a
                    href="#"
                    onClick={() => handleNavItemClick(item.id, item.path)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 text-base font-semibold transition-all relative w-full",
                      activeItem === item.id
                        ? "bg-white text-[#3a2fff] shadow-xl scale-[1.04] border-none rounded-l-[999px] rounded-r-[999px] w-[calc(100%+40px)] -mr-10 after:content-[''] after:absolute after:right-[-40px] after:top-0 after:bottom-0 after:w-[40px] after:bg-gradient-to-r after:from-white after:to-transparent after:rounded-r-[999px] after:z-0"
                        : "hover:bg-white/20 hover:text-white hover:scale-[1.02] text-white/80 rounded-xl w-full",
                      "active:bg-white/30 active:text-white backdrop-blur-md"
                    )}
                    style={activeItem === item.id ? { boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)', background: '#fff', color: '#3a2fff', position: 'relative', zIndex: 1 } : {}}
                  >
                    <span className={cn("z-10 flex items-center", activeItem === item.id ? "text-[#3a2fff]" : "")}>{item.icon}</span>
                    <span className="z-10">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* Logout Button */}
        <div className="mt-auto px-4 pb-6">
          <button 
            onClick={() => {
              navigate("/login");
              localStorage.removeItem("userId");
            }}
            className="flex items-center gap-3 w-full bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] text-white py-3 px-4 rounded-xl shadow-lg hover:from-[#ff3a55] hover:to-[#ffb347] transition font-semibold backdrop-blur-md border border-white/10"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
