import React from "react";

import beach from "../../../../assets/imgs/beach.jpg";

import "./Window.scss";

export const Window: React.FC = () => {
  return (
    <>
      <div className="imgLayout">
        <img src={beach} alt="" />
        <p className="Img-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
          eligendi magnam odio nemo
        </p>
      </div>
      <div className="imgLayout">
        <img src={beach} alt="" />
        <p className="Img-text">Lorem ipsum dolor</p>
      </div>
      <div className="imgLayout">
        <img src={beach} alt="" />
        <p className="Img-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
          eligendi magnam odio nemo consectetur adipisicing magnam odio nemo
          consectetur adipisicing
        </p>
      </div>
    </>
  );
};
