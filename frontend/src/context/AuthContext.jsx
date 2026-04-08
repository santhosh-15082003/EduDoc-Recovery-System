/* eslint-disable react-refresh/only-export-components */

import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("role")
  );
  const [role, setRole] = useState(localStorage.getItem("role"));

  // const login = (userRole) => {
  //   setIsAuthenticated(true);
  //   setRole(userRole);
  //   localStorage.setItem("role", userRole);
  // };

  const login = (userRole) => {
    localStorage.setItem("role", userRole);
    setRole(userRole);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.clear();
    setRole(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
