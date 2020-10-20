import React, { useContext } from "react";
import { EditContext } from "../../../../context";

import s from "./ColorLayout.module.scss";

export const ColorLayout: React.FC = () => {
  const {} = useContext(EditContext);
  return (
    <>
      <div className={s.imgAlt}>
        <input type="text" name="imgAlt" placeholder="   " />
        <label className={s.labelInside} htmlFor="imgAlt">
          Image alt
        </label>
      </div>
      <div className={s.colorInfo}>
        <input type="text" name="colorName" placeholder="   " />
        <label className={s.labelInside} htmlFor="colorName">
          Color name
        </label>
      </div>
      <div className={s.colorCode}>
        <input type="text" name="colorCode" placeholder="   " />
        <label className={s.labelInside} htmlFor="colorCode">
          Color code
        </label>
      </div>
      <div className={s.colorCode}>
        <input type="text" name="colorCode" placeholder="   " />
        <label className={s.labelInside} htmlFor="colorCode">
          Color code
        </label>
      </div>
      <div className={s.colorCode}>
        <input type="text" name="colorCode" placeholder="   " />
        <label className={s.labelInside} htmlFor="colorCode">
          Color code
        </label>
      </div>
      <div className={s.colorCode}>
        <input type="text" name="colorCode" placeholder="   " />
        <label className={s.labelInside} htmlFor="colorCode">
          Color code
        </label>
      </div>
    </>
  );
};
