import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext, AuthContext } from "../../../context";
import { ROUTES } from "../../../constants";

import s from "./MobDashboard.module.scss";

export const MobDashboard: React.FC = () => {
  const { mobNav, closeMobNav } = useContext(AppContext);
  const { logout } = useContext(AuthContext);

  let navStyle = `${s.mobileNav}`;
  if (mobNav) {
    navStyle = `${s.mobileNav} ${s.open}`;
  }

  const handleLogout = () => {
    logout();
    closeMobNav();
  };
  return (
    <div className={navStyle}>
      <NavLink
        to={ROUTES.ACreateSection}
        exact
        className={s.createSection}
        onClick={() => closeMobNav()}
      >
        Create Section
      </NavLink>
      <div className={s.section}>
        <NavLink
          to={ROUTES.AMainPanel}
          exact
          className={s.title}
          activeClassName={s.titleActive}
          onClick={() => closeMobNav()}
        >
          Sections panel
        </NavLink>
      </div>
      <div className={s.section}>
        <NavLink
          to={ROUTES.overview}
          exact
          className={s.title}
          activeClassName={s.titleActive}
          onClick={() => closeMobNav()}
        >
          Overview content
        </NavLink>
      </div>
      <div className={s.section}>
        <NavLink
          to={ROUTES.publicHome}
          exact
          className={s.title}
          activeClassName={s.titleActive}
          onClick={() => handleLogout()}
        >
          Logout
        </NavLink>
      </div>
    </div>
  );
};
