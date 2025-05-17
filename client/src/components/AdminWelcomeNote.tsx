import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface AdminWelcomeNoteProps {
  username: string;
}

export default function AdminWelcomeNote({ 
  username 
}: AdminWelcomeNoteProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-white dark:bg-black rounded-xl shadow-sm p-6 flex">
          <div className="flex-1">
            <h3 className="text-2xl font-bold dark:text-white">Welcome, {username}!</h3>
            <p className="text-blue-600 dark:text-white text-sm mb-4">
              Here's your dashboard overview for today
            </p>
          </div>
          
          <div className="hidden md:block">
             <img src="https://cdn.discordapp.com/attachments/1362358409621540935/1372704078110392320/icon.png?ex=6827bdcb&is=68266c4b&hm=a8a6e379e171a5fdd5106bf53b46e13ff300e316ffbc18a48b8e34ba8cbea9b1&" alt="Admin Icon" className="h-28 w-auto" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
