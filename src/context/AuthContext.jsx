import { useState, useEffect, createContext, useContext, useMemo, useCallback } from 'react';
import apiInstance from '../config/axios';

const authContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  const updateInfo = useCallback(() => {
    apiInstance
      .get('/accounts/information')
      .then(res => res.data)
      .then(data => {
        console.log('User: ', data);
        setUser(data);
        setIsLoggedIn(true);
        setIsAdmin(data.is_admin);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    updateInfo();
  }, []);

  const login = useCallback((access_token, refresh_token) => {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    updateInfo();
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }, []);

  return (
    <authContext.Provider
      value={useMemo(
        () => ({
          login,
          logout,
          user,
          isLoggedIn,
          isAdmin,
        }),
        [login, logout, isLoggedIn, isAdmin, user]
      )}
    >
      {children}
    </authContext.Provider>
  );
}

const useAuth = () => useContext(authContext);

export default useAuth;
