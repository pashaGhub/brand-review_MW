import React from "react";

import wave from "../../../../assets/imgs/wave.jpg";
import chairs from "../../../../assets/imgs/chairs.jpg";

import "./Stretch.scss";

export const Stretch: React.FC = () => {
  return (
    <>
      <div className="imgLayout">
        <img src={wave} alt="" />
        <p className="imgText">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
          omnis molestias sequi labore incidunt illo corporis iusto aliquam
          tempora voluptatem repellendus accusantium ab commodi, dolore fugit
          beatae sint natus excepturi!
        </p>
      </div>
      <div className="imgLayout">
        <img src={chairs} alt="" />
        <p className="imgText">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
          omnis molestias sequi labore incidunt illo corporis iusto aliquam
          tempora voluptatem repellendus accusantium ab commodi, dolore fugit
          beatae sint natus excepturi!
        </p>
      </div>
    </>
  );
};
