import React from "react";

import s from "./VideoBox.module.scss";

interface IVideoBox {
  videoSrc: string;
}

export const VideoBox: React.FC<IVideoBox> = ({ videoSrc }) => {
  return (
    <div className={s.video}>
      <iframe title="video" src={videoSrc} allowFullScreen></iframe>
    </div>
  );
};
