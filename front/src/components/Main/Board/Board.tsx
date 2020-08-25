import React from "react";

import { Section } from "../../Section/Section";

import s from "./Board.module.scss";

export const Board: React.FC = () => {
  return (
    <div className={s.container}>
      <Section />
    </div>
  );
};
