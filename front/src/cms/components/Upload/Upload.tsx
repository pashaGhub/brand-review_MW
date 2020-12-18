import React, { useState, useContext } from "react";
import { EditContext } from "../../../context/EditContext";

import { createID } from "../../../utils/utils";

import { Button } from "../../../components/Button/Button";
import test from "../../../assets/imgs/wave.jpg";
import test2 from "../../../assets/imgs/beach.jpg";
import test3 from "../../../assets/imgs/blue.jpg";
import test4 from "../../../assets/imgs/stickers.jpg";
import s from "./Upload.module.scss";

interface IImage {
  id: number;
  path: string;
}

const images: Array<IImage> = [
  {
    id: createID(),
    path: test,
  },
  {
    id: createID(),
    path: test2,
  },
  {
    id: createID(),
    path: test3,
  },
  {
    id: createID(),
    path: test4,
  },
  {
    id: createID(),
    path: test4,
  },
  {
    id: createID(),
    path: test2,
  },
];

export const Upload: React.FC = () => {
  const { setUploadOpen, setSelectedImg } = useContext(EditContext);
  const [selected, setSelected] = useState<IImage | null>(null);

  console.log("PATH", test);
  const selectUpload = () => {
    if (selected) {
      setSelectedImg(selected.path);
    }
    setUploadOpen(false);
  };

  const closeUpload = () => {
    setSelected(null);
    setUploadOpen(false);
  };

  return (
    <div className={s.container}>
      <div className={s.uploadBox}>
        <div className={s.items}>
          {images.length &&
            images.map((img: IImage) => (
              <div
                key={img.id}
                className={s.singleImage}
                onClick={() => setSelected(img)}
              >
                <img
                  className={`${
                    selected && selected.id === img.id ? s.selected : ""
                  }`}
                  src={img.path}
                  alt=""
                />
              </div>
            ))}
        </div>
        <div className={s.dashboard}>
          <div className={s.buttons}>
            <Button text="Upload" clickHandler={() => {}} />
            <Button text="Close" clickHandler={closeUpload} danger />
          </div>
          <div className={s.info}>
            <Button text="Select Image" clickHandler={selectUpload} success />
          </div>
        </div>
      </div>
    </div>
  );
};
