import React, { createContext, useState, useCallback, useEffect } from "react";
import { checkAuth } from "../services/authServices";

const storageName = "userData";

export const AuthContext = createContext<any>(Boolean);

export function AuthContextProvider(props: any): JSX.Element {
  const [token, setToken] = useState<any>(null);
  const [userId, setUserId] = useState<any>(null);
  const [logoutUser, setLogoutUser] = useState<Boolean>(false);
  const isAuthenticated: Boolean = !!token;

  const login = useCallback((jwtToken: string, id: string) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      storageName,
      JSON.stringify({ userId: id, token: jwtToken })
    );
    setLogoutUser(false);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem(storageName);
    setLogoutUser(true);
  }, []);

  useEffect(() => {
    const storage = localStorage.getItem(storageName);
    if (storage) {
      const data = JSON.parse(storage);

      const fetchData = async () => {
        const response = await checkAuth(data.token);

        if (response.ok) {
          login(data.token, data.userId);
        } else {
          logout();
        }
      };

      if (data && data.token) {
        fetchData();
      }
    } else {
      logout();
    }
  }, [login]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        token,
        userId,
        isAuthenticated,
        logoutUser,
        setLogoutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
