// API response types
export interface UserData {
  name: string;
  avatar: string;
}

export interface BonusData {
  days: number;
  activated: boolean;
}

export interface TrafficData {
  hour: number;
  value: number;
}

export interface TrafficStats {
  daily: {
    value: number;
    max: number;
  };
  hourly: {
    value: number;
    max: number;
  };
  hourlyData: TrafficData[];
}

export interface TransactionData {
  id: string;
  date: string;
  time: string;
  method: string;
  status: "pending" | "done" | "failed";
  amount: number;
}

export interface CountryData {
  id: string;
  name: string;
  dataUsage: number;
  dataSpeed: number;
  direction: "up" | "down" | "bidirectional";
}

export interface DashboardData {
  packageId: string;
  user: UserData;
  bonus: BonusData;
  traffic: TrafficStats;
  transactions: TransactionData[];
  price: number;
  pricePerGB: number;
  stats: {
    upload: number;
    download: number;
  };
  countries: CountryData[];
}

// Generate traffic data
const generateTrafficData = (): TrafficData[] => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    value: Math.random() * 0.8 + 0.2, // Random value between 0.2 and 1
  }));
};

// Mock data for the dashboard
export const mockDashboardData: DashboardData = {
  packageId: "1480",
  user: {
    name: "Anthony",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anthony"
  },
  bonus: {
    days: 3,
    activated: false
  },
  traffic: {
    daily: {
      value: 8.27,
      max: 20
    },
    hourly: {
      value: 2.39,
      max: 5
    },
    hourlyData: generateTrafficData()
  },
  transactions: [
    { 
      id: "1", 
      date: "17 Feb 2020", 
      time: "16:30", 
      method: "Mastercard", 
      status: "pending", 
      amount: 500.00 
    },
    { 
      id: "2", 
      date: "15 Feb 2020", 
      time: "12:39", 
      method: "PayPal", 
      status: "pending", 
      amount: 200.00 
    },
    { 
      id: "3", 
      date: "12 Feb 2020", 
      time: "09:45", 
      method: "Qiwi", 
      status: "done", 
      amount: 300.00 
    }
  ],
  price: 496.40,
  pricePerGB: 0.09,
  stats: {
    upload: 545,
    download: 62.3
  },
  countries: [
    { 
      id: "1", 
      name: "United States", 
      dataUsage: 3.87, 
      dataSpeed: 10.05, 
      direction: "down" 
    },
    { 
      id: "2", 
      name: "Argentina", 
      dataUsage: 2.95, 
      dataSpeed: 9.19, 
      direction: "up" 
    },
    { 
      id: "3", 
      name: "Denmark", 
      dataUsage: 0.87, 
      dataSpeed: 7.34, 
      direction: "bidirectional" 
    },
    { 
      id: "4", 
      name: "Great Britain", 
      dataUsage: 0.45, 
      dataSpeed: 5.23, 
      direction: "up" 
    }
  ]
};
