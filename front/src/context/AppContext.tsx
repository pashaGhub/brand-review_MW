import React, { createContext, useState } from "react";

export const AppContext = createContext<any>(Boolean);

export function AppContextProvider(props: any): JSX.Element {
  const [sections, setSections] = useState<any>([]);
  const [mobNav, setMobNav] = useState<boolean>(false);
  const [location, setLocation] = useState<string>(""); //used to select right mobile navigation. 1.public 2.none 3.admin

  //setting current location
  const handleLocation = (props: any) => {
    const currentLocation = props.pathname.split("/")[1];

    switch (currentLocation) {
      case "admin":
        return setLocation("admin");
      case "login":
      case "register":
        return setLocation("none");
      default:
        return setLocation("public");
    }
  };

  //Mobile nav toggle functionality
  const toggleMobNav = () => {
    setMobNav((currentState: boolean) => !currentState);
  };

  const closeMobNav = () => {
    setMobNav(false);
  };

  return (
    <AppContext.Provider
      value={{
        sections,
        setSections,
        mobNav,
        toggleMobNav,
        closeMobNav,
        location,
        handleLocation,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
