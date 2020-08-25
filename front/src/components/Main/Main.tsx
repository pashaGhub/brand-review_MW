import React from "react";

import { Navbar } from "./Navbar/Navbar";
import { Board } from "./Board/Board";

import s from "./Main.module.scss";

export const Main: React.FC = () => {
  return (
    <div className={s.container}>
      <Navbar />
      <Board />
    </div>
  );
};
