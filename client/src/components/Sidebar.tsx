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
          "flex flex-col w-[240px] bg-primary text-white shadow-lg z-50 overflow-y-auto scrollbar-hide fixed md:relative h-full",
          isMobile && !isOpen ? "transform -translate-x-full" : "transform translate-x-0",
          "transition-transform duration-300 ease-in-out"
        )}
      >
        {/* Logo Section */}
        <div className="p-4 flex items-center gap-2 mb-6">
          <Send className="h-6 w-6" />
          <h1 className="text-xl font-bold">Wingy Coin</h1>
        </div>
        
        {/* Navigation Sections */}
        <div className="px-4 mb-4">
          <p className="text-xs uppercase text-neutral-300 tracking-wider mb-2">MENU</p>
          <nav>
            <ul className="space-y-1">
              {generalNavItems.map((item) => (
                <li key={item.id}>
                  <a 
                    href={item.path} 
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all",
                      activeItem === item.id 
                        ? "bg-primary-light" 
                        : "hover:bg-primary-dark hover:bg-opacity-50"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavItemClick(item.id, item.path);
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
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
            className="flex items-center gap-3 w-full bg-primary-dark text-white py-2.5 px-3 rounded-lg hover:bg-opacity-90 transition"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
