import React from "react";

import s from "./VideoForm.module.scss";

export const VideoForm: React.FC = () => {
  return (
    <div className={s.video}>
      <iframe
        title="video"
        src="https://www.youtube.com/embed/EkHTsc9PU2A"
        allowFullScreen
      ></iframe>
    </div>
  );
};
