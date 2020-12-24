import React from "react";

import "./Rail.scss";

interface IRail {
  image: string;
  alt: string;
  imgText: string;
}

export const Rail: React.FC<IRail> = ({ image, imgText, alt }) => {
  return (
    <div className="imgLayout">
      <img src={image} alt={alt} />
      <p className="imgText"> {imgText}</p>
    </div>
  );
};
