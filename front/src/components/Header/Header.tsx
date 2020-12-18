import React, { useContext } from "react";
import { AppContext, EditContext } from "../../context/";

import { Burger } from "../Burger/Burger";

import s from "./Header.module.scss";

export const Header: React.FC = () => {
  const { location } = useContext(AppContext);
  const { uploadOpen } = useContext(EditContext);
  return (
    <header
      className={s.header}
      style={uploadOpen ? { position: "sticky" } : {}}
    >
      <div className={s.container}>
        <h1>Your Brand</h1>
        {location !== "none" && <Burger />}
      </div>
    </header>
  );
};
