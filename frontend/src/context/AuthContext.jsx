import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('ecoclean_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('ecoclean_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('ecoclean_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecoclean_user');
  };

  const isAdmin = () => user?.role === 'ADMIN';
  const isWorker = () => user?.role === 'WORKER';
  const isCitizen = () => user?.role === 'CITIZEN';

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAdmin, isWorker, isCitizen }}>
      {children}
    </AuthContext.Provider>
  );
};
