import React, { useState, useEffect, useContext } from "react";
import { EditContext, ITopic, IImg } from "../../../../context/EditContext";

import { Button } from "../../../../components/Button/Button";
import { ImgsForm } from "../ImgsForm/ImgsForm";
import { VideoForm } from "../VideoForm/VideoForm";

import { useDebounce } from "../../../../hooks/debounce.hook";
import { createID } from "../../../../utils/utils";

import s from "./TopicForm.module.scss";

interface ITopicForm {
  item: ITopic;
}

export const TopicForm: React.FC<ITopicForm> = ({ item }) => {
  const { topics, setTopics } = useContext(EditContext);
  const [layout, setLayout] = useState<string>(item.layout || "window");
  const [title, setTitle] = useState<string>(item.title || "");
  const [text, setText] = useState<string>(item.text || "");

  useEffect(() => {
    setText(item.text);
    setTitle(item.title);
  }, [item.text, item.title]);

  const addImage = () => {
    let newItem = item;

    console.log("BEFORE", newItem);
    newItem.topicImgs?.push({
      _id: createID(),
      image: "",
      alt: "",
      imgText: "",
    });
    console.log("AFTER", newItem);

    let newTopics = topics.filter((topic: ITopic) => item._id !== topic._id);
    newTopics.splice(
      topics.findIndex((topic: ITopic) => item._id === topic._id),
      0,
      newItem
    );
    setTopics(newTopics);
  };

  const deleteTopic = () => {
    const result = window.confirm(
      "Topic will be deleted IRREVERSIBLY! Do you want to continue?"
    );
    if (result) {
      const newTopics = topics.filter(
        (topic: ITopic) => item._id !== topic._id
      );

      setTopics(newTopics);
    }
  };

  const dTitle = useDebounce(title, 1000);
  const dText = useDebounce(text, 1000);

  useEffect(() => {
    let newItem = item;
    newItem = { ...item, layout, title: dTitle, text: dText };
    let newTopics = topics.filter((topic: ITopic) => item._id !== topic._id);
    newTopics.splice(
      topics.findIndex((topic: ITopic) => item._id === topic._id),
      0,
      newItem
    );
    setTopics(newTopics);
  }, [layout, dTitle, dText]);

  return (
    <div className={s.container}>
      <div className={s.topicTitle}>
        <input
          type="text"
          name="topicTitle"
          placeholder="   "
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className={s.labelInside} htmlFor="topicTitle">
          Topic title
        </label>
      </div>
      <div className={s.topicText}>
        <textarea
          name="topicText"
          placeholder="   "
          value={text}
          required
          onChange={(e) => setText(e.target.value)}
        />
        <label className={s.labelInside} htmlFor="topicText">
          Topic text
        </label>
      </div>
      <div className={s.topicLayout}>
        <label htmlFor="topicLayout">Choose layout</label>
        <select
          name="topicLayout"
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
        >
          <option value="window">Window</option>
          <option value="color">Color</option>
          <option value="itemList">Item list</option>
          <option value="rail">Rail</option>
          <option value="stretch">Stretch</option>
          <option value="videoBox">Video box</option>
        </select>
      </div>
      {item &&
        item.topicImgs &&
        layout !== "videoBox" &&
        item.topicImgs.map((img: IImg) => (
          <ImgsForm
            key={img._id}
            layout={layout}
            item={img}
            topicID={item._id}
          />
        ))}

      {item && layout === "videoBox" && <VideoForm item={item} />}
      <div className={s.buttons}>
        {layout !== "videoBox" && (
          <Button text="Add image" clickHandler={addImage} success />
        )}
        <Button text="Delete Topic" clickHandler={deleteTopic} danger />
      </div>
    </div>
  );
};
