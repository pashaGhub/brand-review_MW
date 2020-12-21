import React, { useContext, useEffect, useState } from "react";
import { EditContext, IImg, ITopic } from "../../../../context/EditContext";
import { useDebounce } from "../../../../hooks/debounce.hook";

import s from "./ColorLayout.module.scss";

interface IColorLayout {
  imgInfo: IImg;
  topicID: number;
}

export const ColorLayout: React.FC<IColorLayout> = ({ imgInfo, topicID }) => {
  const { topics, setTopics } = useContext(EditContext);
  const [alt, setAlt] = useState(imgInfo.alt || "");
  const [colorName, setColorName] = useState<string>(imgInfo.subtitle || "");
  const [colorCodes, setColorCodes] = useState<any>(
    imgInfo.imgText || ["", "", "", ""]
  );
  const [code0, setCode0] = useState<string>(colorCodes[0]);
  const [code1, setCode1] = useState<string>(colorCodes[1]);
  const [code2, setCode2] = useState<string>(colorCodes[2]);
  const [code3, setCode3] = useState<string>(colorCodes[3]);

  useEffect(() => {
    setAlt(imgInfo.alt);
    if (imgInfo.subtitle) {
      setColorName(imgInfo.subtitle);
    }
    if (Array.isArray(imgInfo.imgText)) {
      setColorCodes(imgInfo.imgText);
    }
  }, [imgInfo.alt, imgInfo.subtitle, imgInfo.imgText]);

  const dAlt = useDebounce(alt, 1000);
  const dColorName = useDebounce(colorName, 1000);
  const dCode0 = useDebounce(code0, 1000);
  const dCode1 = useDebounce(code1, 1000);
  const dCode2 = useDebounce(code2, 1000);
  const dCode3 = useDebounce(code3, 1000);

  useEffect(() => {
    let newImgInfo = imgInfo;
    newImgInfo = {
      ...imgInfo,
      alt: dAlt,
      subtitle: dColorName,
      imgText: [dCode0, dCode1, dCode2, dCode3],
    };
    const findedTopic = topics.find((topic: ITopic) => topic._id === topicID);
    let uodatedImgs = findedTopic.topicImgs.filter(
      (img: IImg) => img._id !== imgInfo._id
    );
    uodatedImgs.splice(
      uodatedImgs.findIndex((img: IImg) => img._id === imgInfo._id),
      0,
      newImgInfo
    );
    const updatedTopic = { ...findedTopic, topicImgs: uodatedImgs };
    let newTopics = topics.filter((topic: ITopic) => topicID !== topic._id);
    newTopics.splice(
      topics.findIndex((topic: ITopic) => topicID === topic._id),
      0,
      updatedTopic
    );
    setTopics(newTopics);
  }, [dAlt, dColorName, dCode0, dCode1, dCode2, dCode3]);

  const detectCode = (ind: number) => {
    switch (ind) {
      case 0:
        return { value: code0, event: setCode0 };
      case 1:
        return { value: code1, event: setCode1 };
      case 2:
        return { value: code2, event: setCode2 };
      case 3:
        return { value: code3, event: setCode3 };
      default:
        break;
    }
  };

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
      <div className={s.colorInfo}>
        <input
          type="text"
          name="colorName"
          value={colorName}
          placeholder="   "
          onChange={(e) => setColorName(e.target.value)}
        />
        <label className={s.labelInside} htmlFor="colorName">
          Color name
        </label>
      </div>
      {colorCodes.length &&
        colorCodes.map((code: string, ind: number) => (
          <div className={s.colorCode} key={ind}>
            <input
              type="text"
              name="colorCodes"
              value={detectCode(ind)?.value}
              placeholder="   "
              onChange={(e: any) => detectCode(ind)?.event(e.target.value)}
            />
            <label className={s.labelInside} htmlFor="colorCodes">
              Color code
            </label>
          </div>
        ))}
    </>
  );
};
