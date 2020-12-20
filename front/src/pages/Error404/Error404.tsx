import React, { useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants";

import { AppContext, AuthContext } from "../../context";

import s from "./Error404.module.scss";

export const Error404: React.FC = () => {
  const { handleLocation } = useContext(AppContext);
  const { isAuthenticated } = useContext(AuthContext);

  const location = useLocation();
  useEffect(() => {
    handleLocation(location);
  }, [handleLocation, location]);
  return (
    <div className={s.container}>
      <h1>Error 404</h1>
      <h4>Page not found</h4>
      <NavLink to={isAuthenticated ? ROUTES.AMainPanel : ROUTES.publicHome}>
        Back to main
      </NavLink>
    </div>
  );
};
