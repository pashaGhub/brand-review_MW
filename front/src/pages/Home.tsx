import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";

import { Main } from "../components/Main/Main";
import { MobileNav } from "../components/MobileNav/MobileNav";

export const Home: React.FC = () => {
  const { handleLocation } = useContext(AppContext);

  const location = useLocation();
  useEffect(() => {
    handleLocation(location);
  }, [handleLocation, location]);
  return (
    <>
      <MobileNav />
      <Main />
    </>
  );
};
