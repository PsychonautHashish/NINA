import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Simulate loading user data (e.g., from localStorage or an API)
    const fetchUserData = async () => {
      // Simulate a delay (e.g., fetching user from API or localStorage)
      setTimeout(() => {
        // Here, you would fetch user data (e.g., from localStorage or an API)
        const storedUser = localStorage.getItem('user'); // For example, fetching user data from localStorage

        if (storedUser) {
          setUser(JSON.parse(storedUser)); // If user data exists, set it
        } else {
          setUser(null); // Otherwise, set as null
        }
        
        setLoading(false); // Once done, stop loading
      }, 1000); // Simulate a 1-second loading delay
    };

    fetchUserData();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage for persistence
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Clear user data from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
