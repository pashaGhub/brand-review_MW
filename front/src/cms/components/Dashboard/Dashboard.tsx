import React from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../constants";

import s from "./Dashboard.module.scss";

export const Dashboard: React.FC = () => {
  return (
    <div className={s.container}>
      <div className={s.positionSticky}>
        <NavLink to={ROUTES.ACreateSection} className={s.createSection}>
          Create Section
        </NavLink>
        <div className={s.section}>
          <NavLink
            to={ROUTES.AMainPanel}
            className={s.title}
            activeClassName={s.titleActive}
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
          >
            Logout
          </NavLink>
        </div>
      </div>
    </div>
  );
};
