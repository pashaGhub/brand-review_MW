import React from "react";

import "./Color.scss";
interface IRail {
  image: string;
  imgText: Array<string>;
}

export const Color: React.FC<IRail> = (props) => {
  const { image, imgText } = props;

  return (
    <div className="imgLayout">
      <img src={image} alt="mountains tropic" />
      <div className="textContainer">
        {imgText.map((item: string, ind: number) => (
          <p className="imgText" key={ind}>
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};
