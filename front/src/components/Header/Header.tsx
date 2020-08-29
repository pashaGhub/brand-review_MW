import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import { Burger } from "../Burger/Burger";

import s from "./Header.module.scss";

export const Header: React.FC = () => {
  const { location } = useContext(AppContext);
  return (
    <header className={s.header}>
      <div className={s.container}>
        <h1>Your Brand</h1>
        {location !== "none" && <Burger />}
      </div>
    </header>
  );
};
