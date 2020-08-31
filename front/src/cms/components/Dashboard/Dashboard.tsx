import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context";
import { ROUTES } from "../../../constants";

import s from "./Dashboard.module.scss";

export const Dashboard: React.FC = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className={s.container}>
      <div className={s.positionSticky}>
        <NavLink to={ROUTES.ACreateSection} exact className={s.createSection}>
          Create Section
        </NavLink>
        <div className={s.section}>
          <NavLink
            to={ROUTES.AMainPanel}
            exact
            className={s.title}
            activeClassName={s.titleActive}
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
            onClick={() => logout()}
          >
            Logout
          </NavLink>
        </div>
      </div>
    </div>
  );
};
