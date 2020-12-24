import React from "react";
import { Section } from "../../Section/Section";

import s from "./Board.module.scss";

interface IBoard {
  data: any;
}

export const Board: React.FC<IBoard> = ({ data }) => {
  console.log(data);

  return (
    <div className={s.container}>
      {data.length ? (
        data.map((item: any) => <Section data={item} key={item._id} />)
      ) : (
        <h1 className={s.noSections}>There is no sections</h1>
      )}
    </div>
  );
};
