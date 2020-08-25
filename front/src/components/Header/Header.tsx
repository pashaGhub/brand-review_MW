import React from "react";

import { Burger } from "../Burger/Burger";

import s from "./Header.module.scss";

export const Header: React.FC = () => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <h1>Your Brand</h1>
        <Burger />
      </div>
    </header>
  );
};
