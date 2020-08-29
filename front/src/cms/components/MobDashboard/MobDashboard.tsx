import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { ROUTES } from "../../../constants";

import s from "./MobDashboard.module.scss";

export const MobDashboard: React.FC = () => {
  const { mobNav, closeMobNav } = useContext(AppContext);

  let navStyle = `${s.mobileNav}`;
  if (mobNav) {
    navStyle = `${s.mobileNav} ${s.open}`;
  }
  return (
    <div className={navStyle}>
      <NavLink
        to={ROUTES.ACreateSection}
        className={s.createSection}
        onClick={() => closeMobNav()}
      >
        Create Section
      </NavLink>
      <div className={s.section}>
        <NavLink
          to={ROUTES.AMainPanel}
          className={s.title}
          activeClassName={s.titleActive}
          onClick={() => closeMobNav()}
        >
          Sections panel
        </NavLink>
      </div>
      <div className={s.section}>
        <NavLink
          to={ROUTES.publicHome}
          exact
          className={s.title}
          activeClassName={s.titleActive}
          onClick={() => closeMobNav()}
        >
          Logout
        </NavLink>
      </div>
    </div>
  );
};
