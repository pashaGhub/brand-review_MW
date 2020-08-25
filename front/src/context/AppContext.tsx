import React, { createContext, useState } from "react";

export const AppContext = createContext<any>(Boolean);

export function ContextProvider(props: any): JSX.Element {
  const [mobNav, setMobNav] = useState<boolean>(false);

  //Mobile nav toggle functionality
  const toggleMobNav = () => {
    setMobNav((currentState: boolean) => !currentState);
  };

  const closeMobNav = () => {
    setMobNav(false);
  };

  return (
    <AppContext.Provider value={{ mobNav, toggleMobNav, closeMobNav }}>
      {props.children}
    </AppContext.Provider>
  );
}
