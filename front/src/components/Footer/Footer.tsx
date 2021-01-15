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
            href="https://github.com/pashaGhub"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Pawel Sucharew
          </a>
        </p>
      </div>
    </footer>
  );
};
