import React, { useState, useContext, useEffect } from "react";
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
  const {
    topics,
    setTopics,
    setUploadOpen,
    setSelectedImg,
    selectedImg,
  } = useContext(EditContext);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [selecting, setSelecting] = useState<boolean>(false);

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

  const handleUploadImg = () => {
    setUploadOpen(true);
    setSelecting(true);
  };

  useEffect(() => {
    if (selecting && selectedImg) {
      setImgSrc(selectedImg);
      setSelecting(false);
      setSelectedImg(null);
    }
  }, [selecting, selectedImg]);

  useEffect(() => {
    let newImgInfo = item;
    newImgInfo = {
      ...item,
      image: imgSrc,
    };
    const findedTopic = topics.find((topic: ITopic) => topic.id === topicID);
    let uodatedImgs = findedTopic.topicImgs.filter(
      (img: IImg) => img.id !== item.id
    );
    uodatedImgs.push(newImgInfo);
    const updatedTopic = { ...findedTopic, topicImgs: uodatedImgs };
    let newTopics = topics.filter((topic: ITopic) => topic.id !== topicID);
    newTopics.push(updatedTopic);
    setTopics(newTopics);
  }, [imgSrc]);

  return (
    <div className={s.container}>
      <div className={s.tools}>
        <Button text="Delete Image" clickHandler={deleteImg} danger />
      </div>
      <div className={s.main}>
        {imgSrc ? (
          <div
            className={s.imgContainer}
            tabIndex={0}
            onClick={() => handleUploadImg()}
          >
            <img src={imgSrc} alt="" />
            <button>Change a picture</button>
          </div>
        ) : (
          <div
            className={s.addImg}
            tabIndex={0}
            onClick={() => handleUploadImg()}
          >
            <span>
              {" "}
              Choose a picture <div className={s.plus}>+</div>
            </span>
          </div>
        )}
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
