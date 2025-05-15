import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Country {
  id: string;
  name: string;
  dataUsage: number;
  dataSpeed: number;
  direction: "up" | "down" | "bidirectional";
}

interface CountryStatsProps {
  countries: Country[];
}

export default function CountryStats({ countries }: CountryStatsProps) {
  // If no countries provided, show example countries
  const countryData = countries.length > 0 ? countries : [
    { 
      id: "1", 
      name: "United States", 
      dataUsage: 3.87, 
      dataSpeed: 10.05, 
      direction: "down" as const
    },
    { 
      id: "2", 
      name: "Argentina", 
      dataUsage: 2.95, 
      dataSpeed: 9.19, 
      direction: "up" as const 
    },
    { 
      id: "3", 
      name: "Denmark", 
      dataUsage: 0.87, 
      dataSpeed: 7.34, 
      direction: "bidirectional" as const 
    },
    { 
      id: "4", 
      name: "Great Britain", 
      dataUsage: 0.45, 
      dataSpeed: 5.23, 
      direction: "up" as const 
    }
  ];
  
  // Get color and icon based on direction
  const getDirectionInfo = (direction: string) => {
    switch (direction) {
      case "up":
        return {
          color: "bg-primary",
          icon: <ArrowUp className="h-5 w-5 text-white" />
        };
      case "down":
        return {
          color: "bg-secondary",
          icon: <ArrowDown className="h-5 w-5 text-white" />
        };
      case "bidirectional":
        return {
          color: "bg-accent",
          icon: <ArrowRight className="h-5 w-5 text-white" />
        };
      default:
        return {
          color: "bg-yellow-400",
          icon: <ArrowUp className="h-5 w-5 text-white" />
        };
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <ul className="space-y-4">
          {countryData.map((country, index) => {
            const { color, icon } = getDirectionInfo(country.direction);
            const isLast = index === countryData.length - 1;
            
            return (
              <li 
                key={country.id} 
                className={cn(
                  "flex items-center justify-between py-2",
                  !isLast && "border-b border-neutral-100"
                )}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center mr-3`}>
                    {icon}
                  </div>
                  <div>
                    <p className="font-medium">{country.name}</p>
                    <p className="text-xs text-neutral-300">
                      {country.dataUsage.toFixed(2)} GB / {country.dataSpeed.toFixed(2)} MB/s
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
