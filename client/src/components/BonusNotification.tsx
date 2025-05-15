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
        <div className="bg-white rounded-xl shadow-sm p-6 flex">
          <div className="flex-1">
            <h3 className="text-lg font-medium">Welcome, {username}!</h3>
            <p className="text-neutral-600 text-sm mb-4">
              Here's your dashboard overview for today
            </p>
          </div>
          
          <div className="hidden md:block">
            {/* Person illustration */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="h-28 w-auto">
              <rect width="100%" height="100%" fill="transparent" />
              <rect x="60" y="30" width="80" height="100" rx="40" fill="#5F2EEA" opacity="0.1" />
              <path d="M100 130c22.1 0 40-17.9 40-40s-17.9-40-40-40-40 17.9-40 40 17.9 40 40 40z" fill="#5F2EEA" />
              <path d="M140 130v10c0 22.1-17.9 40-40 40S60 162.1 60 140v-10" stroke="#5F2EEA" strokeWidth="6" strokeLinecap="round" />
              <path d="M100 120c11 0 20-9 20-20s-9-20-20-20-20 9-20 20 9 20 20 20z" fill="#FFFFFF" />
              <circle cx="90" cy="95" r="5" fill="#5F2EEA" />
              <circle cx="110" cy="95" r="5" fill="#5F2EEA" />
              <path d="M90 110c0 5.5 4.5 10 10 10s10-4.5 10-10H90z" fill="#5F2EEA" />
              <path d="M60 105l-15 10M140 105l15 10" stroke="#5F2EEA" strokeWidth="4" strokeLinecap="round" />
              <path d="M80 80c-5-15 5-20 10-22M120 80c5-15-5-20-10-22" stroke="#5F2EEA" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
