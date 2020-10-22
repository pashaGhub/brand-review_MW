import React, { useState, useContext } from "react";
import { EditContext, IImg, ITopic } from "../../../../context/EditContext";

import { Button } from "../../../../components/Button/Button";
import { ImgLayout } from "../ImgLayout/ImgLayout";
import { ColorLayout } from "../ColorLayout/ColorLayout";
import Chair from "../../../../assets/imgs/chairs.jpg";

import s from "./ImgsForm.module.scss";

interface IImgForm {
  layout: string;
  item: IImg;
  topicID: number;
}

export const ImgsForm: React.FC<IImgForm> = ({ layout, item, topicID }) => {
  const { topics, setTopics } = useContext(EditContext);

  const deleteImg = () => {
    const findedTopic = topics.find((topic: ITopic) => topic.id === topicID);
    const filteredImgs = findedTopic.topicImgs.filter(
      (img: IImg) => img.id !== item.id
    );
    const editedTopic = { ...findedTopic, topicImgs: filteredImgs };
    let updatedTopics = topics.filter((topic: ITopic) => topic.id !== topicID);
    updatedTopics.push(editedTopic);
    setTopics(updatedTopics);
  };

  return (
    <div className={s.container}>
      <div className={s.tools}>
        <Button text="Delete Image" clickHandler={deleteImg} danger />
      </div>
      <div className={s.main}>
        <div className={s.imgContainer}>
          <img src={Chair} alt="" />
          {/* <span>
          {" "}
          Choose a picture <div className={s.plus}>+</div>
        </span> */}
          <button>Change a picture</button>
        </div>
        <div className={s.imgInfo}>
          {layout === "color" ? (
            <ColorLayout imgInfo={item} topicID={topicID} />
          ) : (
            <ImgLayout layout={layout} imgInfo={item} topicID={topicID} />
          )}
        </div>
      </div>
    </div>
  );
};
