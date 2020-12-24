import React from "react";

import "./Stretch.scss";

interface IStretch {
  image: string;
  alt: string;
  imgText: string;
}

export const Stretch: React.FC<IStretch> = ({ image, alt, imgText }) => {
  return (
    <>
      <div className="imgLayout">
        <img src={image} alt={alt} />
        <p className="imgText">{imgText}</p>
      </div>
    </>
  );
};
