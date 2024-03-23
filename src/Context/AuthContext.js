// AuthContext.js
import React, { createContext, useState, useContext } from 'react';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const authlogin = (userData) => {
    setUser(userData);
  };

  const authlogout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user,authlogin,authlogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
