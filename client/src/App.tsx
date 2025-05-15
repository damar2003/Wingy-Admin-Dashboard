import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import UsersPage from "@/pages/UsersPage";
import LoginPage from "@/pages/LoginPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import HistoryPage from "./pages/HistoryPage";

function Router() {
  const [location, setLocation] = useLocation();
  
  // Check if user is logged in
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId && location !== '/login') {
      setLocation('/login');
    }
  }, [location, setLocation]);
  
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/">
        {() => (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/users">
        {() => (
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/history">
        {() => (
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
