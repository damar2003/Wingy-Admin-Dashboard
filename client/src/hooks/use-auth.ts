import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';

export interface UserData {
  id: string;
  username: string;
  email: string;
}

export function useAuth() {
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedUserId = localStorage.getItem('userId');
      
      if (!storedUserId) {
        setIsLoading(false);
        return;
      }
      
      try {
        // Verify if user is still an admin
        const response = await fetch(`https://w-v3.glitch.me/admin-check/${storedUserId}`);
        
        if (!response.ok) {
          throw new Error('Authentication failed');
        }
        
        const data = await response.json();
        setUserId(storedUserId);
        setUsername(data.user?.userData?.username || null);
        setIsAuthenticated(true);
      } catch (error) {
        // Clear invalid auth data
        localStorage.removeItem('userId');
        setUserId(null);
        setUsername(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem('userId');
    setUserId(null);
    setUsername(null);
    setIsAuthenticated(false);
    setLocation('/login');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  };

  return {
    userId,
    username,
    isLoading,
    isAuthenticated,
    logout
  };
}