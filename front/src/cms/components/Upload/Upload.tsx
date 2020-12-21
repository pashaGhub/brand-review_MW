import React, { useState, useContext } from "react";
import { EditContext } from "../../../context/EditContext";

import { createID } from "../../../utils/utils";

import { Button } from "../../../components/Button/Button";
import test from "../../../assets/imgs/wave.jpg";
import test2 from "../../../assets/imgs/beach.jpg";
import test3 from "../../../assets/imgs/blue.jpg";
import test4 from "../../../assets/imgs/stickers.jpg";
// @ts-ignore
import video from "../../../assets/videos/video.mp4";
// @ts-ignore
import video2 from "../../../assets/videos/sick-girl.mp4";
import s from "./Upload.module.scss";

interface IUploadItem {
  _id: number;
  path: string;
}

const images: Array<IUploadItem> = [
  {
    _id: createID(),
    path: test,
  },
  {
    _id: createID(),
    path: test2,
  },
  {
    _id: createID(),
    path: test3,
  },
  {
    _id: createID(),
    path: test4,
  },
  {
    _id: createID(),
    path: test4,
  },
  {
    _id: createID(),
    path: test2,
  },
];

const videoArr: Array<IUploadItem> = [
  {
    _id: createID(),
    path: video,
  },
  {
    _id: createID(),
    path: video2,
  },
];

export const Upload: React.FC = () => {
  const {
    setUploadOpen,
    setSelectedImg,
    setSelectedVideo,
    setUploadVideo,
    uploadVideo,
  } = useContext(EditContext);
  const [selected, setSelected] = useState<IUploadItem | null>(null);

  const selectUpload = () => {
    if (selected && !uploadVideo) {
      setSelectedImg(selected.path);
    }
    if (selected && uploadVideo) {
      setSelectedVideo(selected.path);
    }
    setUploadOpen(false);
    setUploadVideo(false);
  };

  const closeUpload = () => {
    setSelected(null);
    setUploadOpen(false);
    setUploadVideo(false);
  };

  const UploadType = () => {
    if (uploadVideo) {
      return (
        <>
          {videoArr.length &&
            videoArr.map((vid: IUploadItem) => (
              <div
                key={vid._id}
                className={s.video}
                onClick={() => setSelected(vid)}
              >
                <video width="320" height="240" key={vid._id} controls>
                  <source src={vid.path} type="video/mp4" />
                </video>
              </div>
            ))}
        </>
      );
    } else {
      return (
        <>
          {images.length &&
            images.map((img: IUploadItem) => (
              <div
                key={img._id}
                className={s.singleImage}
                onClick={() => setSelected(img)}
              >
                <img
                  className={`${
                    selected && selected._id === img._id ? s.selected : ""
                  }`}
                  src={img.path}
                  alt=""
                />
              </div>
            ))}
        </>
      );
    }
  };

  return (
    <div className={s.container}>
      <div className={s.uploadBox}>
        <div className={s.items}>
          <UploadType />
        </div>
        <div className={s.dashboard}>
          <div className={s.buttons}>
            <Button text="Upload" clickHandler={() => {}} />
            <Button text="Close" clickHandler={closeUpload} danger />
          </div>
          <div className={s.info}>
            <Button text="Select" clickHandler={selectUpload} success />
          </div>
        </div>
      </div>
    </div>
  );
};
