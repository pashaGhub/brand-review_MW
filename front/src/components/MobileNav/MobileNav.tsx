import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import s from "./MobileNav.module.scss";

export const MobileNav: React.FC = () => {
  const { mobNav, closeMobNav } = useContext(AppContext);

  let navStyle = `${s.mobileNav}`;
  if (mobNav) {
    navStyle = `${s.mobileNav} ${s.open}`;
  }

  return (
    <div className={navStyle}>
      <div className={s.section}>
        <a href="/" className={`${s.title} ${s.titleActive}`}>
          Hello here!
        </a>
        <ul>
          <li className={`${s.topic} ${s.topicActive}`}>Invitation</li>
          <li className={s.topic}>Agenda</li>
          <li className={s.topic}>Something else</li>
        </ul>
      </div>
      <div className={s.section}>
        <a href="/" className={s.title}>
          Colors
        </a>
        <ul>
          <li className={s.topic}>First color</li>
          <li className={s.topic}>Second</li>
        </ul>
      </div>
    </div>
  );
};
