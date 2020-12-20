import React from "react";

import s from "./Footer.module.scss";

export const Footer: React.FC = () => {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <p>@Copyright 2020</p>
        <p>
          Made by
          <a
            href="https://outer.studio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            outer Studio
          </a>
        </p>
      </div>
    </footer>
  );
};
