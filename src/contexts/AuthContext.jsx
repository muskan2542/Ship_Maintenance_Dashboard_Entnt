import React, { createContext, useState, useEffect } from 'react';

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Disable auto-login by NOT loading session from localStorage on app start
  useEffect(() => {
    // Commented out to prevent auto-login
    // const session = localStorage.getItem('session');
    // if (session) {
    //   setUser(JSON.parse(session));
    // }

    // Explicitly set user null on load to force login
    setUser(null);
  }, []);

  const login = (email, password) => {
    // Mocked users (or load from localStorage if you want)
    const users = [
      { id: '1', role: 'Admin', email: 'admin@entnt.in', password: 'admin123' },
      { id: '2', role: 'Inspector', email: 'inspector@entnt.in', password: 'inspect123' },
      { id: '3', role: 'Engineer', email: 'engineer@entnt.in', password: 'engine123' }
    ];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      localStorage.setItem('session', JSON.stringify(foundUser));
      setUser(foundUser);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('session');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
