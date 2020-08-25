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
            href="https://mancanweb.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            mancanweb
          </a>
        </p>
      </div>
    </footer>
  );
};
