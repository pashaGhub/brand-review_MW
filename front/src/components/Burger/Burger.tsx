import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import s from "./Burger.module.scss";

export const Burger: React.FC = () => {
  const { mobNav, toggleMobNav } = useContext(AppContext);

  let topLine = `${s.burgerLine}`;
  let botLine = `${s.burgerLine}`;
  if (mobNav) {
    topLine = `${s.burgerLine} ${s.lineTop}`;
    botLine = `${s.burgerLine} ${s.lineBot}`;
  }

  return (
    <button className={s.burger} onClick={() => toggleMobNav()}>
      <div className={s.container}>
        <div className={topLine}></div>
        <div className={botLine}></div>
      </div>
    </button>
  );
};
