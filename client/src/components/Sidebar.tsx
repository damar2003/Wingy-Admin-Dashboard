import { Send, PieChart, ArrowLeft, Globe, Link2, Ticket, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import useMobile from "@/hooks/use-mobile";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const isMobile = useMobile();

  // Define navigation items
  const generalNavItems = [
    { icon: <PieChart className="h-5 w-5" />, label: "Proxy", active: false },
    { icon: <ArrowLeft className="h-5 w-5" />, label: "Bounce", active: false },
    { icon: <Globe className="h-5 w-5" />, label: "Online check", active: true },
    { icon: <Link2 className="h-5 w-5" />, label: "Affiliate system", active: false },
  ];

  const supportNavItems = [
    { icon: <Ticket className="h-5 w-5" />, label: "Tickets", active: false },
    { icon: <HelpCircle className="h-5 w-5" />, label: "FAQ", active: false },
  ];

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
          <h1 className="text-xl font-bold">Airnow</h1>
        </div>
        
        {/* Navigation Sections */}
        <div className="px-4 mb-4">
          <p className="text-xs uppercase text-neutral-300 tracking-wider mb-2">GENERAL</p>
          <nav>
            <ul className="space-y-1">
              {generalNavItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition",
                      item.active ? "bg-primary-light" : "hover:bg-primary-light"
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        <div className="px-4 mb-4">
          <p className="text-xs uppercase text-neutral-300 tracking-wider mb-2">SUPPORT</p>
          <nav>
            <ul className="space-y-1">
              {supportNavItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition",
                      item.active ? "bg-primary-light" : "hover:bg-primary-light"
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {/* Help Center */}
        <div className="mt-auto px-4 pb-4">
          <div className="bg-primary-dark rounded-xl p-4">
            <p className="text-sm font-medium mb-1">Help Center</p>
            <p className="text-xs text-neutral-300 mb-3">Visit our help center</p>
            
            {/* Support agent illustration */}
            <div className="flex justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 240" className="h-24 w-auto">
                <rect width="100%" height="100%" fill="#4A1FB8" opacity="0.2" rx="10" />
                <path d="M150 60C121.9 60 99 82.9 99 111v35c0 28.1 22.9 51 51 51s51-22.9 51-51v-35c0-28.1-22.9-51-51-51z" fill="#5F2EEA" />
                <path d="M185 120v26c0 19.3-15.7 35-35 35s-35-15.7-35-35v-26" stroke="#ffffff" strokeWidth="6" />
                <circle cx="150" cy="111" r="38" fill="#5F2EEA" />
                <path d="M174 106c0 13.3-10.7 24-24 24s-24-10.7-24-24 10.7-24 24-24 24 10.7 24 24z" fill="#ffffff" />
                <path d="M140 116c0 5.5 4.5 10 10 10s10-4.5 10-10h-20z" fill="#4A1FB8" />
                <path d="M130 101c0 2.8 2.2 5 5 5s5-2.2 5-5-2.2-5-5-5-5 2.2-5 5z" fill="#4A1FB8" />
                <path d="M160 101c0 2.8 2.2 5 5 5s5-2.2 5-5-2.2-5-5-5-5 2.2-5 5z" fill="#4A1FB8" />
                <path d="M110 166l12 12" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
                <path d="M190 166l-12 12" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
                <path d="M150 150v20" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
                <path d="M130 180h40" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
                <path d="M140 95c-1-5-4-8-8-10" stroke="#4A1FB8" strokeWidth="3" strokeLinecap="round" />
                <path d="M160 95c1-5 4-8 8-10" stroke="#4A1FB8" strokeWidth="3" strokeLinecap="round" />
                <rect x="120" y="186" width="60" height="8" rx="4" fill="#ffffff" />
              </svg>
            </div>
            
            <button className="bg-primary-light text-white w-full py-1.5 text-xs font-medium rounded-lg hover:bg-opacity-90 transition">
              Chat
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
