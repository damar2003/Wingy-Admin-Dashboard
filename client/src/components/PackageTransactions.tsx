import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { 
  CreditCard, 
  AlertCircle, 
  CheckCircle, 
  Loader2 
} from "lucide-react";

// Define transaction type
interface Transaction {
  id: string;
  date: string;
  time: string;
  method: string;
  status: "pending" | "done" | "failed";
  amount: number;
}

interface PackageTransactionsProps {
  transactions: Transaction[];
}

export default function PackageTransactions({ transactions }: PackageTransactionsProps) {
  const [activeTab, setActiveTab] = useState<"today" | "week" | "month">("today");
  
  // If no transactions are provided, show empty state
  const isEmpty = transactions.length === 0;
  
  // Get payment method icon
  const getPaymentIcon = (method: string) => {
    // Map method names to colors and icons
    const methodConfig: Record<string, { color: string; icon: JSX.Element }> = {
      "Mastercard": { 
        color: "bg-amber-500", 
        icon: <CreditCard className="h-3 w-3 text-white" />
      },
      "PayPal": { 
        color: "bg-blue-500", 
        icon: <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M19.897 6.38c.107.487.107.974 0 1.462v.487c-.947 4.015-4.276 6.27-8.552 6.27h-.947c-.58 0-1.054.487-1.16 1.056l-.107.38-.633 4.114-.107.38c-.107.594-.58 1.056-1.16 1.056H4.485c-.473 0-.84-.38-.734-.867l.107-.38 1.267-8.128v-.203c.107-.594.58-1.056 1.16-1.056h2.32c5.33-.107 9.392-2.85 10.233-8.115.106-.38.16-.76.16-1.056zM17.47 0h-6.445c-.474 0-.947.38-1.16.867l-3.16 20.22c-.106.488.267.868.734.868h3.266c.474 0 .948-.38 1.16-.867l.847-5.387c.107-.487.58-.867 1.16-.867h1.374c4.81 0 7.604-2.363 8.34-7.01.32-2.04 0-3.71-.946-4.804C21.963.974 20.055 0 17.47 0z"/></svg>
      },
      "Qiwi": { 
        color: "bg-orange-500", 
        icon: <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.52 11.616c0 1.152-.648 1.584-1.176 1.584-.408 0-.768-.24-.816-.672-.48.408-1.176.672-1.992.672-1.152 0-2.16-.72-2.16-1.992s1.008-1.992 2.16-1.992c.624 0 1.2.192 1.704.432l.168-.36h1.536l-.936 2.544c0 .12.072.168.216.168.48 0 .816-.648.816-1.368 0-1.776-1.584-3.216-3.984-3.216-2.304 0-4.224 1.656-4.224 3.768 0 2.208 1.872 3.144 3.624 3.144a6.384 6.384 0 0 0 2.616-.576v1.248A6.91 6.91 0 0 1 12 15.432c-3.216 0-5.376-2.16-5.376-4.848 0-2.736 2.352-5.136 5.808-5.136 3.264.048 5.088 2.448 5.088 4.152v2.016zM10.824 11.232c0 .456.336.888.936.888.624 0 1.224-.456 1.224-1.128 0-.432-.336-.888-.936-.888-.624 0-1.224.456-1.224 1.128z"/></svg>
      },
      "Visa": { 
        color: "bg-blue-600", 
        icon: <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M16.539 4.799h-9.21C4.197 4.799 1.5 6.859 1.5 10.289c0 3.43 2.697 5.49 5.829 5.49h9.21c3.132 0 5.829-2.06 5.829-5.49 0-3.43-2.698-5.49-5.829-5.49zm-5.524 7.343l-1.799-4.2c-.453.12-.844.407-1.077.8l1.92 4.69h-1.392l-1.55-4.632c-.228.465-.353.989-.353 1.542 0 .42.08.818.218 1.188h-.61c-.143-.367-.218-.775-.218-1.188 0-1.874 1.539-3.393 3.433-3.393.703 0 1.36.205 1.908.56l-1.67 1.302 1.43 3.32h-1.24zm2.724 0h-1.26l1.338-4.277-1.855-1.256c.62-.274 1.298-.417 2.01-.417.31 0 .627.036.955.11l-1.187 5.84zm3.306 0h-1.26l1.076-5.282c1.532.436 2.657 1.812 2.657 3.441 0 .719-.214 1.384-.584 1.942h-.771c.428-.547.684-1.227.684-1.942 0-1.33-.834-2.49-2.063-2.97l-.97 4.811h1.23z"/></svg>
      },
      "default": { 
        color: "bg-gray-500", 
        icon: <CreditCard className="h-3 w-3 text-white" />
      }
    };
    
    return methodConfig[method] || methodConfig.default;
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-pending border-yellow-200">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Pending
          </Badge>
        );
      case "done":
        return (
          <Badge variant="outline" className="bg-green-100 text-success border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Done
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-100 text-error border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200">
            Unknown
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Package transactions</CardTitle>
        
        <div className="flex text-sm">
          <Button
            variant="ghost"
            className={cn(
              "px-3 py-1 h-auto",
              activeTab === "today" 
                ? "text-secondary border-b-2 border-secondary" 
                : "text-neutral-300"
            )}
            onClick={() => setActiveTab("today")}
          >
            Today
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "px-3 py-1 h-auto",
              activeTab === "week" 
                ? "text-secondary border-b-2 border-secondary" 
                : "text-neutral-300"
            )}
            onClick={() => setActiveTab("week")}
          >
            This Week
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "px-3 py-1 h-auto",
              activeTab === "month" 
                ? "text-secondary border-b-2 border-secondary" 
                : "text-neutral-300"
            )}
            onClick={() => setActiveTab("month")}
          >
            This Month
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {isEmpty ? (
            <div className="text-center py-8 text-neutral-300">
              No transactions for this period
            </div>
          ) : (
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-sm text-neutral-300">
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Method</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {/* Demo transactions if none provided */}
                {(transactions.length ? transactions : [
                  { id: '1', date: '17 Feb 2020', time: '16:30', method: 'Mastercard', status: 'pending', amount: 500 },
                  { id: '2', date: '15 Feb 2020', time: '12:39', method: 'PayPal', status: 'pending', amount: 200 },
                  { id: '3', date: '12 Feb 2020', time: '09:45', method: 'Qiwi', status: 'done', amount: 300 }
                ]).map((transaction) => {
                  const { color, icon } = getPaymentIcon(transaction.method);
                  
                  return (
                    <tr key={transaction.id} className="text-sm border-t border-neutral-100">
                      <td className="py-3">
                        <div>{transaction.date}, {transaction.time}</div>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full ${color} flex items-center justify-center mr-2`}>
                            {icon}
                          </div>
                          {transaction.method}
                        </div>
                      </td>
                      <td className="py-3">
                        {getStatusBadge(transaction.status)}
                      </td>
                      <td className="py-3 text-right">
                        ${transaction.amount.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
