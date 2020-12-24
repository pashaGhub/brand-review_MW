import React from "react";

import beach from "../../../assets/imgs/beach.jpg";

import "./Window.scss";

interface IWindow {
  image: string;
  alt: string;
  imgText: string;
}

export const Window: React.FC<IWindow> = ({ image, alt, imgText }) => {
  return (
    <>
      <div className="imgLayout">
        <img src={image} alt={alt} />
        <p className="Img-text">{imgText}</p>
      </div>
    </>
  );
};
