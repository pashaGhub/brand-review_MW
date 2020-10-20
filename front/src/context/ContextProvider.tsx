import React from "react";
import { AppContextProvider } from "./AppContext";
import { AuthContextProvider } from "./AuthContext";
import { EditContextProvider } from "./EditContext";

export const ContextProvider: React.FC = (props: any) => {
  return (
    <AppContextProvider>
      <AuthContextProvider>
        <EditContextProvider>{props.children}</EditContextProvider>
      </AuthContextProvider>
    </AppContextProvider>
  );
};
