import React from "react";
import { AppContextProvider } from "./AppContext";
import { AuthContextProvider } from "./AuthContext";

export const ContextProvider: React.FC = (props: any) => {
  return (
    <AppContextProvider>
      <AuthContextProvider>{props.children}</AuthContextProvider>
    </AppContextProvider>
  );
};
