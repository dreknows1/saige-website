import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { adminLogin } from '../lib/supabase';

interface AdminUser {
  id: string;
  email: string;
  name: string;
}

interface AdminContextType {
  admin: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('saige_admin');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await adminLogin(email, password);
      const adminData = {
        id: user.id,
        email: user.email,
        name: user.name || 'Admin'
      };
      setAdmin(adminData);
      localStorage.setItem('saige_admin', JSON.stringify(adminData));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setAdmin(null);
    localStorage.removeItem('saige_admin');
  }, []);

  return (
    <AdminContext.Provider value={{
      admin,
      isLoading,
      login,
      logout,
      isAuthenticated: !!admin
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
}
