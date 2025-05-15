import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

interface TotalPriceProps {
  price: number;
  pricePerGB: number;
  uploadSpeed: number;
  downloadSpeed: number;
}

export default function TotalPrice({
  price,
  pricePerGB,
  uploadSpeed,
  downloadSpeed,
}: TotalPriceProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-2xl font-semibold mb-1">${price.toFixed(2)}</h3>
        <p className="text-sm text-neutral-300 mb-6">${pricePerGB.toFixed(2)} / GB</p>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-neutral-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <ArrowUp className="h-5 w-5 text-white" />
              </div>
            </div>
            <h4 className="text-xl font-semibold">{uploadSpeed}</h4>
            <p className="text-xs text-neutral-300">Kb/s upload</p>
          </div>
          
          <div className="bg-neutral-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                <ArrowDown className="h-5 w-5 text-white" />
              </div>
            </div>
            <h4 className="text-xl font-semibold">{downloadSpeed}</h4>
            <p className="text-xs text-neutral-300">Mb/s download</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
