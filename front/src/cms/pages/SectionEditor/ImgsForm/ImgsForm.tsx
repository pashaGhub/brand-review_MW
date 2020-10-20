import React, { useState, useContext } from "react";
import { EditContext } from "../../../../context";

import { ImgLayout } from "../ImgLayout/ImgLayout";
import { ColorLayout } from "../ColorLayout/ColorLayout";
import Chair from "../../../../assets/imgs/chairs.jpg";

import s from "./ImgsForm.module.scss";

interface IImgsForm {
  layout: string;
}

export const ImgsForm: React.FC<IImgsForm> = ({ layout }) => {
  const {} = useContext(EditContext);

  return (
    <div className={s.container}>
      <div className={s.imgContainer}>
        <img src={Chair} alt="" />
        {/* <span>
          {" "}
          Choose a picture <div className={s.plus}>+</div>
        </span> */}
        <button>Change a picture</button>
      </div>
      <div className={s.imgInfo}>
        {layout === "color" ? <ColorLayout /> : <ImgLayout layout={layout} />}
      </div>
    </div>
  );
};
