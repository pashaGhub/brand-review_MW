import React from "react";

import "./ItemsList.scss";

interface IItemsList {
  image: string;
  alt: string;
  subtitle?: string;
  imgText: string;
}

export const ItemsList: React.FC<IItemsList> = (props) => {
  const { image, alt, subtitle, imgText } = props;
  return (
    <div className="imgLayout">
      <div className="imgContainer">
        <img src={image} alt={alt} />
      </div>

      <div className="imgText">
        {subtitle !== undefined && <h3>{subtitle}</h3>}
        <p>{imgText}</p>
      </div>
    </div>
  );
};
