import React from "react";

import "./Rail.scss";

interface IRail {
  image: string;
  imgText: string;
}

export const Rail: React.FC<IRail> = (props) => {
  const { image, imgText } = props;

  return (
    <div className="imgLayout">
      <img src={image} alt="mountains tropic" />
      <p className="imgText"> {imgText}</p>
    </div>
  );
};
