import React, { createContext, useState, useCallback, useEffect } from "react";

const storageName = "userData";

export const AuthContext = createContext<any>(Boolean);

export function AuthContextProvider(props: any): JSX.Element {
  const [token, setToken] = useState<any>(null);
  const [userId, setUserId] = useState<any>(null);
  const isAuthenticated: Boolean = !!token;

  const login = useCallback((jwtToken: string, id: string) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      storageName,
      JSON.stringify({ userId: jwtToken, token: id })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const storage = localStorage.getItem(storageName);
    if (storage) {
      const data = JSON.parse(storage);
      if (data && data.token) {
        login(data.token, data.userId);
      }
    }
  }, [login]);

  return (
    <AuthContext.Provider
      value={{ login, logout, token, userId, isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
