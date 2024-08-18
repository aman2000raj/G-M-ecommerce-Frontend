import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || null;
  });

  const logout = () => {
    setUser(null);
    window.location.href = '/login';
    localStorage.removeItem('user');
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  return (
    <UserContext.Provider value={{ user, setUser: login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;