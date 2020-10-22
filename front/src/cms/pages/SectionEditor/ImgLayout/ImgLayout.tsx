import React, { useContext, useEffect, useState } from "react";
import { EditContext, IImg, ITopic } from "../../../../context/EditContext";
import { useDebounce } from "../../../../hooks/debounce.hook";

import s from "./ImgLayout.module.scss";

interface IImgLayout {
  layout: string;
  imgInfo: IImg;
  topicID: number;
}

export const ImgLayout: React.FC<IImgLayout> = ({
  layout,
  imgInfo,
  topicID,
}) => {
  const [alt, setAlt] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const { topics, setTopics } = useContext(EditContext);

  useEffect(() => {
    setAlt(imgInfo.alt);
    if (imgInfo.subtitle) {
      setSubtitle(imgInfo.subtitle);
    }
    if (typeof imgInfo.imgText === "string") {
      setDescription(imgInfo.imgText);
    }
  }, [imgInfo.alt, imgInfo.subtitle, imgInfo.imgText]);

  const dAlt = useDebounce(alt, 1000);
  const dSubtitle = useDebounce(subtitle, 1000);
  const dDescription = useDebounce(description, 1000);
  useEffect(() => {
    let newImgInfo = imgInfo;
    newImgInfo = {
      ...imgInfo,
      alt: dAlt,
      subtitle: dSubtitle,
      imgText: dDescription,
    };
    const findedTopic = topics.find((topic: ITopic) => topic.id === topicID);
    let uodatedImgs = findedTopic.topicImgs.filter(
      (img: IImg) => img.id !== imgInfo.id
    );
    uodatedImgs.push(newImgInfo);
    const updatedTopic = { ...findedTopic, topicImgs: uodatedImgs };
    let newTopics = topics.filter((topic: ITopic) => topic.id !== topicID);
    newTopics.push(updatedTopic);
    setTopics(newTopics);
  }, [dAlt, dSubtitle, dDescription]);

  return (
    <>
      <div className={s.imgAlt}>
        <input
          type="text"
          name="imgAlt"
          value={alt}
          placeholder="   "
          onChange={(e) => setAlt(e.target.value)}
        />
        <label className={s.labelInside} htmlFor="imgAlt">
          Image alt
        </label>
      </div>
      {layout === "itemList" && (
        <div className={s.subtitle}>
          <input
            type="text"
            name="subtitle"
            value={subtitle}
            placeholder="   "
            onChange={(e) => setSubtitle(e.target.value)}
          />
          <label className={s.labelInside} htmlFor="subtitle">
            Subtitle
          </label>
        </div>
      )}
      <div className={s.imgText}>
        <textarea
          name="imgText"
          value={description}
          placeholder="   "
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className={s.labelInside} htmlFor="imgText">
          Image description
        </label>
      </div>
    </>
  );
};
