import React from "react";

import s from "./Navbar.module.scss";

export const Navbar: React.FC = () => {
  return (
    <div className={s.container}>
      <div className={s.positionSticky}>
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
    </div>
  );
};
