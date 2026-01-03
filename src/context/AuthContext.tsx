import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { User, LoginRequest } from '@/types';
import { authService } from '@/services/authService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isReadOnly: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  getAuthHeader: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('hrms_user');
    const savedAuth = localStorage.getItem('hrms_auth');
    
    if (savedUser && savedAuth) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch {
        localStorage.removeItem('hrms_user');
        localStorage.removeItem('hrms_auth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (credentials: LoginRequest) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      
      if (response.roleLevel === -1) {
        throw new Error('ACCESS_DENIED');
      }
      
      setUser(response);
      
      // Store auth credentials and user info
      const authString = btoa(`${credentials.email}:${credentials.password}`);
      localStorage.setItem('hrms_auth', authString);
      localStorage.setItem('hrms_user', JSON.stringify(response));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('hrms_auth');
    localStorage.removeItem('hrms_user');
  }, []);

  const getAuthHeader = useCallback(() => {
    const auth = localStorage.getItem('hrms_auth');
    return auth ? `Basic ${auth}` : null;
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.roleLevel === 1,
    isReadOnly: user?.roleLevel === 0,
    login,
    logout,
    getAuthHeader,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
