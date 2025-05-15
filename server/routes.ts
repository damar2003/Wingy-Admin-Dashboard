import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { mockDashboardData } from "../client/src/lib/mockData";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for dashboard data
  app.get("/api/dashboard", (req, res) => {
    // Return mock dashboard data for demo
    res.json(mockDashboardData);
  });
  
  // API route to update bonus activation status
  app.post("/api/activate-bonus", (req, res) => {
    // Update bonus activation status
    mockDashboardData.bonus.activated = true;
    res.json({ success: true, message: "Bonus activated successfully" });
  });
  
  // API route to get transaction history by period
  app.get("/api/transactions/:period", (req, res) => {
    const { period } = req.params;
    // In a real app, we would filter transactions by the period
    // For now, return the same mock data
    res.json(mockDashboardData.transactions);
  });
  
  // API route to prolong package subscription
  app.post("/api/prolong", (req, res) => {
    // In a real app, we would process the prolongation
    res.json({ success: true, message: "Package prolonged successfully" });
  });

  const httpServer = createServer(app);

  return httpServer;
}
