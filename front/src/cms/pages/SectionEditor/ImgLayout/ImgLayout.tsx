import React, { useContext } from "react";
import { EditContext } from "../../../../context";

import s from "./ImgLayout.module.scss";

interface IImgLayout {
  layout: string;
}

export const ImgLayout: React.FC<IImgLayout> = ({ layout }) => {
  const {} = useContext(EditContext);
  return (
    <>
      <div className={s.imgAlt}>
        <input type="text" name="imgAlt" placeholder="   " />
        <label className={s.labelInside} htmlFor="imgAlt">
          Image alt
        </label>
      </div>
      {layout === "itemList" && (
        <div className={s.subtitle}>
          <input type="text" name="subtitle" placeholder="   " />
          <label className={s.labelInside} htmlFor="subtitle">
            Subtitle
          </label>
        </div>
      )}
      <div className={s.imgText}>
        <textarea name="imgText" placeholder="   " />
        <label className={s.labelInside} htmlFor="imgText">
          Image description
        </label>
      </div>
    </>
  );
};
